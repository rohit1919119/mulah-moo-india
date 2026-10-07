# Updating the forms Apps Script (about 3 minutes)

`Code.gs` is the complete script behind every form on mulahmoo.com and
mulahmoo.in. It is your existing script plus:

- two new tabs, `comp-report` and `bcc-request`, created automatically
- an email to aeerohit@gmail.com for each new mandate, report request and BCC request
- a short confirmation email to people who request the report or a BCC seat
- phone numbers starting with + no longer show as #ERROR! in the sheet

1. Open the "Inbound talents" spreadsheet, then **Extensions > Apps Script**.
2. Select everything in `Code.gs`, delete it, paste the whole new `Code.gs`, and click **Save**.
3. In the function dropdown next to **Run**, pick `setupMooIn` and click **Run**.
   Google asks for permission to send email: choose aeerohit@gmail.com,
   **Advanced > Go to project (unsafe) > Allow**. You get a test email and two
   new tabs appear in the sheet.
4. **Deploy > Manage deployments**, click the pencil (Edit) on the existing
   deployment, set **Version** to **New version**, click **Deploy**.
   Do not use "New deployment": that would create a new URL and both websites
   would stop saving forms.

Optional: paste a Google Drive link to the compensation report PDF into
`REPORT_URL` (step 2) and requesters get it by email straight away.
To get alerts for more forms, add their names to `NOTIFY_FORMS`.
