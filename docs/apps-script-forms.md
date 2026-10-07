# mulahmoo.in forms and the Google Apps Script

Every form on mulahmoo.in posts JSON to the shared Apps Script (`SHEET_URL` in
`src/comic/data.ts`). Each row carries `form_type`, `source: "mulahmoo.in"` and
`submitted_at`. The script decides the tab from `form_type`.

| Form | Where it opens | form_type | Tab | Script status |
| --- | --- | --- | --- | --- |
| Send a mandate | Home: nav "Hire with us", hero, closing section, footer | `client-pricing` | client-pricing (existing) | Already handled |
| Compensation report | Home: Report section | `comp-report` | comp-report | **Needs the branch below** |
| BCC request (attend, partner, host) | /bcc: every invite, partner and host button; /bcc#invite opens it | `bcc-request` | bcc-request | **Needs the branch below** |

The mandate form keeps the old pricing form's keys (name, email, company, link,
clientType, needs, timeline, notes). Its new answers (phone, seniority, budget)
are sent as their own keys and are also written into `notes`, so they appear in
the existing tab without any script change.

## Add the two new tabs to the script

1. Open the Apps Script project behind `SHEET_URL`.
2. Paste this block at the bottom of the file:

```js
// mulahmoo.in forms that get their own tab. The header row is written the
// first time a tab is used.
const MM_IN_TABS = {
  'comp-report': ['submitted_at', 'name', 'email', 'company', 'role', 'hiring', 'market', 'source'],
  'bcc-request': ['submitted_at', 'intent', 'name', 'email', 'phone', 'city', 'role', 'company', 'experience', 'link', 'note', 'source'],
};

function appendMmIn_(data) {
  const cols = MM_IN_TABS[data.form_type];
  if (!cols) return false;
  // If your script uses SpreadsheetApp.openById(...), use that same line here.
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(data.form_type);
  if (!sh) { sh = ss.insertSheet(data.form_type); sh.appendRow(cols); }
  sh.appendRow(cols.map((c) => (data[c] === undefined ? '' : data[c])));
  return true;
}
```

3. At the top of `doPost`, right after the line that parses the body
   (usually `const data = JSON.parse(e.postData.contents);`), add:

```js
if (appendMmIn_(data)) return ContentService.createTextOutput('ok');
```

4. Deploy, then Manage deployments, edit the existing deployment, and choose
   **New version**. Editing the existing deployment keeps the same URL. A brand
   new deployment would change the URL and the site would need updating.
5. Submit each form once on the live site and check that a row appears.

## Optional: an email when a request arrives

Inside `appendMmIn_`, before `return true;`:

```js
MailApp.sendEmail('Rohit@mulahmoo.com', `New ${data.form_type}: ${data.name}`, JSON.stringify(data, null, 2));
```
