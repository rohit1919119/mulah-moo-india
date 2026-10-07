// Mulah Moo forms backend: one script for mulahmoo.com and mulahmoo.in.
// Lives in the Apps Script project of the "Inbound talents" spreadsheet.
//
// To update: paste this whole file over Code.gs, run setupMooIn() once, then
// Deploy > Manage deployments > Edit > Version: New version > Deploy.
// Editing the existing deployment keeps the same URL, so neither website changes.

const SHEET_ID    = '1XSXQKqUBX8Pn8c7Xjm8PuwJirmHl38FLDxzRfv2_1oY';
const TALENT_TAB  = 'Inbound talents';
const CIRCLE_TAB  = 'moo circle';
const BRIEFS_TAB  = 'briefs';
const CLIENTS_TAB = 'clients';
const FEEDBACK_TAB = 'talent-feedbacks';
const CLIENT_FEEDBACK_TAB = 'client-feedbacks';
const PRICING_TAB = 'client-pricing';
const MOO_VERIFIED_TAB = 'moo-verified';
const REPORT_TAB = 'comp-report';      // mulahmoo.in compensation report requests
const BCC_TAB    = 'bcc-request';      // mulahmoo.in Backstage Creators Club requests
const WORK_TAB   = 'work-clicks';      // views and clicks on mulahmoo.in/work (outreach tracking)

// ---------------------------------------------------------------- emails

// Where new-submission alerts go.
const NOTIFY_EMAIL = 'aeerohit@gmail.com';

// Forms that email you when a submission arrives. Add 'moo-verified' or
// 'talent' here if you want alerts for those too.
const NOTIFY_FORMS = ['client-pricing', 'comp-report', 'bcc-request'];

// Optional: a Google Drive link to the full compensation report PDF (shared
// as "Anyone with the link can view"). With a link, requesters get it by
// email straight away. Empty: they are told it follows within a working day.
const REPORT_URL = '';

const BCC_INSTAGRAM = 'https://www.instagram.com/backstagecreatorsclub/';

// Header rows for tabs this script creates itself. Each header matches the
// field name the website sends, so writeRow() puts every value in its column.
const NEW_TABS = {};
NEW_TABS[REPORT_TAB] = ['Submitted At', 'Name', 'Email', 'Company', 'Role', 'Hiring', 'Market', 'Source'];
NEW_TABS[WORK_TAB]   = ['Submitted At', 'Event', 'Label', 'Section', 'Ref', 'Campaign', 'Source', 'Medium', 'Session', 'Page', 'Href', 'Referrer', 'Query'];
NEW_TABS[BCC_TAB]    = ['Submitted At', 'Intent', 'Name', 'Email', 'Phone', 'City', 'Role', 'Company', 'Experience', 'Link', 'Note', 'Source'];

// Sheet header -> payload field, for columns whose name differs from the field.
const ALIASES = {
  specialisation: 'subrole',
  specialization: 'subrole',
  specialty:      'subrole',
  speciality:     'subrole',
  focus:          'subrole',
  source:         'referred_by',
  referredby:     'referred_by',
  fullname:       'name',
  contactnumber:  'phone',
  portfoliolink:  'portfolio',
  notes:          'note',
  websiteorinstagram: 'link',
  clienttype:         'clientType',
  hiringfor:          'needs',
  submittedat:        'submitted_at',
};

function norm(s) { return String(s).trim().toLowerCase().replace(/[^a-z0-9]/g, ''); }

// A value starting with = + - @ would be read by Sheets as a formula
// ("+91 98765..." shows as #ERROR!). A leading apostrophe keeps it as text
// and is not shown in the cell.
function safe(v) {
  if (typeof v !== 'string') return v;
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

// Writes by matching the header row, so column order never matters and
// adding a column can never shift your data into the wrong cells.
function writeRow(sheet, data) {
  const lookup = {};
  Object.keys(data).forEach(function (k) { lookup[norm(k)] = data[k]; });
  if (lookup.source === undefined) lookup.source = lookup.referredby;  // "Source" column

  const lastCol = sheet.getLastColumn();
  if (!lastCol) { sheet.appendRow(Object.keys(data).map(function (k) { return safe(data[k]); })); return; }

  const head = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  sheet.appendRow(head.map(function (h) {
    const key = norm(h);
    var v = lookup[key];
    if (v === undefined && ALIASES[key]) v = lookup[norm(ALIASES[key])];
    return v === undefined ? '' : safe(v);
  }));
}

// Returns the tab, creating it with a header row if it is one of NEW_TABS.
function getTab(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (sheet) return sheet;
  if (!NEW_TABS[name]) throw new Error('No tab named "' + name + '"');
  sheet = ss.insertSheet(name);
  sheet.appendRow(NEW_TABS[name]);
  sheet.getRange(1, 1, 1, NEW_TABS[name].length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  return sheet;
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const d  = JSON.parse(e.postData.contents);

    // form_type -> tab. Anything unrecognised is a talent application.
    const TABS = {
      'moo-circle':      CIRCLE_TAB,
      'talent-feedback': FEEDBACK_TAB,
      'client-feedback': CLIENT_FEEDBACK_TAB,
      'client-pricing':  PRICING_TAB,
      'moo-verified':    MOO_VERIFIED_TAB,
      'comp-report':     REPORT_TAB,
      'bcc-request':     BCC_TAB,
      'work-click':      WORK_TAB,
    };
    const tab = TABS[d.form_type] || TALENT_TAB;

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      writeRow(getTab(ss, tab), d);
    } finally {
      lock.releaseLock();
    }

    // Emails never block or undo the row: a failed email is only logged.
    const kind = d.form_type || 'talent';
    if (NOTIFY_FORMS.indexOf(kind) !== -1) {
      try { notify(d, kind); } catch (err) { console.error(err); }
    }
    try { confirm(d); } catch (err) { console.error(err); }

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---------------------------------------------------------------- email helpers

const LABELS = {
  'client-pricing': 'Mandate',
  'comp-report':    'Compensation report request',
  'bcc-request':    'BCC request',
};

function notify(d, kind) {
  const what = kind === 'bcc-request' ? 'BCC ' + (d.intent || 'request') : (LABELS[kind] || kind);
  const skip = { form_type: 1 };
  const body = Object.keys(d)
    .filter(function (k) { return !skip[k] && String(d[k]).trim() !== ''; })
    .map(function (k) { return k + ': ' + d[k]; })
    .join('\n');
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: /@/.test(d.email || '') ? d.email : NOTIFY_EMAIL,
    subject: 'New ' + what + ': ' + (d.name || '') + (d.company ? ', ' + d.company : ''),
    body: body + '\n\nSheet: https://docs.google.com/spreadsheets/d/' + SHEET_ID,
  });
}

// A short confirmation to the person, for the two mulahmoo.in forms only.
function confirm(d) {
  if (d.form_type !== 'comp-report' && d.form_type !== 'bcc-request') return;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email || '')) return;
  const first = String(d.name || '').trim().split(' ')[0] || 'there';
  var subject, body;

  if (d.form_type === 'comp-report') {
    subject = 'Your Mulah Moo compensation report';
    body = REPORT_URL
      ? 'Hi ' + first + ',\n\nHere is the full compensation report for marketing and content roles across the US, the UK and India:\n' +
        REPORT_URL + '\n\nIf you are hiring for any of these roles, reply to this email and we will set up a call.\n\nRohit\nMulah Moo'
      : 'Hi ' + first + ',\n\nThanks for asking for the compensation report. It will reach you within one working day.\n\n' +
        'If you are hiring now, reply to this email and we will set up a call.\n\nRohit\nMulah Moo';
  } else {
    subject = 'Backstage Creators Club: we have your request';
    const intent = d.intent || 'Attend';
    const next = intent === 'Attend'
      ? 'Every request is read by a person. When the next room opens in your city, we will reach out to you.'
      : intent === 'Partner'
        ? 'We will send the partner deck and the next edition dates within two working days.'
        : 'We will reach out to plan a first room in your city.';
    body = 'Hi ' + first + ',\n\nThanks for reaching out to Backstage Creators Club. ' + next +
      '\n\nUntil then, follow the club on Instagram: ' + BCC_INSTAGRAM + '\n\nRohit\nBackstage Creators Club';
  }
  MailApp.sendEmail({ to: d.email, replyTo: NOTIFY_EMAIL, name: 'Rohit, Mulah Moo', subject: subject, body: body });
}

// Run once from the editor after pasting: creates the two new tabs, asks for
// the email permission, and sends you one test alert.
function setupMooIn() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  getTab(ss, REPORT_TAB);
  getTab(ss, BCC_TAB);
  getTab(ss, WORK_TAB);
  MailApp.sendEmail(NOTIFY_EMAIL, 'Mulah Moo forms: alerts are on',
    'This is a test. New mandates, compensation report requests and BCC requests will now email you here.');
}

// ---------------------------------------------------------------- GET: briefs and clients

function readTab(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh) return [];
  const rows = sh.getDataRange().getValues();
  if (rows.length < 2) return [];
  const head = rows.shift().map(function (h) { return String(h).trim().toLowerCase(); });
  return rows
    .filter(function (r) { return r.some(function (c) { return String(c).trim() !== ''; }); })
    .map(function (r) {
      const o = {};
      head.forEach(function (h, i) { if (h) o[h] = String(r[i]).trim(); });
      return o;
    });
}

// Open the web app URL with ?check=1 in a browser to see which version is live.
const SCRIPT_VERSION = 'mulah-moo-forms v3 (comp-report, bcc-request, work-clicks, email alerts)';

function doGet(e) {
  if (e && e.parameter && e.parameter.check) {
    return ContentService.createTextOutput(SCRIPT_VERSION);
  }
  const ss = SpreadsheetApp.openById(SHEET_ID);
  return ContentService
    .createTextOutput(JSON.stringify({
      briefs:  readTab(ss, BRIEFS_TAB),
      clients: readTab(ss, CLIENTS_TAB)
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
