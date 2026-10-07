/**
 * mulahmoo.in form backend: Compensation report requests and
 * Backstage Creators Club requests.
 *
 * Paste this into Extensions > Apps Script of a new Google Sheet
 * (suggested name: "mulahmoo.in leads"). Full steps: apps-script/README.md
 *
 * Each submission:
 *   1. is written as a row in its own tab (created with headers on first use),
 *   2. is emailed to NOTIFY_EMAIL,
 *   3. gets a short confirmation email sent to the person who filled it in.
 */

// ---------------------------------------------------------------- settings

const NOTIFY_EMAIL = 'Rohit@mulahmoo.com';

// Link to the full compensation report (a Google Drive PDF shared as
// "Anyone with the link can view"). Leave empty and the confirmation email
// says the report will follow, so you can send it by hand.
const REPORT_URL = '';

const BCC_INSTAGRAM = 'https://www.instagram.com/backstagecreatorsclub/';

// Tab name, then columns in order. Keys match what the site sends.
const TABS = {
  'comp-report': {
    tab: 'Compensation report',
    cols: [
      ['submitted_at', 'Submitted at'], ['name', 'Name'], ['email', 'Email'], ['company', 'Company'],
      ['role', 'Role'], ['hiring', 'Hiring for'], ['market', 'Markets'], ['source', 'Source'],
    ],
  },
  'bcc-request': {
    tab: 'BCC requests',
    cols: [
      ['submitted_at', 'Submitted at'], ['intent', 'Wants to'], ['name', 'Name'], ['email', 'Email'],
      ['phone', 'WhatsApp'], ['city', 'City'], ['role', 'Role'], ['company', 'Company'],
      ['experience', 'Experience'], ['link', 'LinkedIn or Instagram'], ['note', 'Note'], ['source', 'Source'],
    ],
  },
};

// ------------------------------------------------------------------ web app

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply_('bad request');
  }
  const spec = TABS[data.form_type];
  if (!spec) return reply_('unknown form');

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = tab_(spec);
    sheet.appendRow(spec.cols.map(([key]) => clean_(data[key])));
  } finally {
    lock.releaseLock();
  }

  // Emails are best effort: a failed email never loses the row.
  try { notify_(data, spec); } catch (err) { console.error(err); }
  try { confirm_(data); } catch (err) { console.error(err); }
  return reply_('ok');
}

// Lets you open the web app URL in a browser to check it is live.
function doGet() {
  return reply_('mulahmoo.in forms are live');
}

// Run once from the editor to create both tabs with their headers.
function setup() {
  Object.keys(TABS).forEach((k) => tab_(TABS[k]));
}

// ------------------------------------------------------------------ helpers

function tab_(spec) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(spec.tab);
  if (!sheet) {
    sheet = ss.insertSheet(spec.tab);
    sheet.appendRow(spec.cols.map(([, label]) => label));
    sheet.getRange(1, 1, 1, spec.cols.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Stops a value starting with = + - @ from being read as a formula.
function clean_(v) {
  if (v === undefined || v === null) return '';
  const s = String(v).slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function notify_(data, spec) {
  const lines = spec.cols.map(([key, label]) => label + ': ' + (data[key] || ''));
  const what = data.form_type === 'bcc-request' ? 'BCC ' + (data.intent || 'request') : 'Compensation report';
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: data.email || NOTIFY_EMAIL,
    subject: 'New ' + what + ': ' + (data.name || '') + (data.company ? ', ' + data.company : ''),
    body: lines.join('\n'),
  });
}

function confirm_(data) {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || '')) return;
  const first = String(data.name || '').trim().split(' ')[0] || 'there';
  let subject, body;

  if (data.form_type === 'comp-report') {
    subject = 'Your Mulah Moo compensation report';
    body = REPORT_URL
      ? 'Hi ' + first + ',\n\nHere is the full compensation report for marketing and content roles across the US, the UK and India:\n' +
        REPORT_URL + '\n\nIf you are hiring for any of these roles, reply to this email and we will set up a call.\n\nRohit\nMulah Moo'
      : 'Hi ' + first + ',\n\nThanks for asking for the compensation report. It will reach you within one working day.\n\n' +
        'If you are hiring now, reply to this email and we will set up a call.\n\nRohit\nMulah Moo';
  } else if (data.form_type === 'bcc-request') {
    subject = 'Backstage Creators Club: we have your request';
    const intent = data.intent || 'Attend';
    const next = intent === 'Attend'
      ? 'Every request is read by a person. When the next room opens in your city, we will reach out on WhatsApp.'
      : intent === 'Partner'
        ? 'We will send the partner deck and the next edition dates within two working days.'
        : 'We will reach out to plan a first room in your city.';
    body = 'Hi ' + first + ',\n\nThanks for reaching out to Backstage Creators Club. ' + next +
      '\n\nUntil then, follow the club on Instagram: ' + BCC_INSTAGRAM + '\n\nRohit\nBackstage Creators Club';
  } else {
    return;
  }

  MailApp.sendEmail({ to: data.email, replyTo: NOTIFY_EMAIL, name: 'Rohit, Mulah Moo', subject: subject, body: body });
}

function reply_(text) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT);
}
