# Set up the mulahmoo.in forms backend (about 5 minutes)

This saves the **Compensation report** form and the **Backstage Creators Club**
form into one Google Sheet, emails you each one, and sends the person a
confirmation. The **Send a mandate** form keeps using your existing sheet and
needs nothing here.

1. Go to sheets.google.com and create a blank sheet. Name it `mulahmoo.in leads`.
2. In that sheet: **Extensions > Apps Script**.
3. Delete everything in `Code.gs`, paste the whole of `apps-script/Code.gs`, and click **Save**.
4. Optional: in the settings at the top of the file, paste a link to the full
   compensation report PDF into `REPORT_URL`. With a link, people get the report
   by email straight away. Without one, they are told it follows within one
   working day.
5. Choose `setup` in the function dropdown and click **Run**. Google asks for
   permission: pick your account, then **Advanced > Go to project > Allow**. Two
   tabs appear in the sheet: *Compensation report* and *BCC requests*.
6. Click **Deploy > New deployment**. Click the gear and choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
7. Send that URL to Claude, or paste it into `FORMS_URL` in
   `src/comic/data.ts` and push. That is the only change the site needs.

To change the script later, use **Deploy > Manage deployments > Edit > New
version**. That keeps the same URL.
