/** @OnlyCurrentDoc */
// Google Apps Script for an Ottawa Blockchain form: saves each response as a row in this Sheet.
// It can only ADD rows. Nothing here sends Sheet data back out, so the public link can't be used to read responses.
// Works for any OBC form without edits: it fills the columns named in row 1 and ignores anything else.
//
// Setup:
// 1. Make a Google Sheet. In row 1, paste the form's column names, one per cell.
//    (Open the form with #columns at the end of its address to get the list.)
// 2. In the Sheet: Extensions > Apps Script. Delete what's there and paste this file. Save.
// 3. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone.
// 4. Authorize, then copy the Web app URL (ends in /exec) into the form page as its endpoint.
// Updating later without changing the URL: Deploy > Manage deployments > pencil icon > Version: New version > Deploy.
// Never put passwords or keys in this file. Use Project Settings > Script Properties for secrets.

const MAX_BODY = 20000;     // a real response is ~1-2 KB
const MAX_FIELD = 500;      // longest allowed answer per column
const MAX_PER_MINUTE = 30;  // simple flood guard across all visitors

function doPost(e) {
  try {
    const body = (e && e.postData && e.postData.contents) || "";
    if (!body || body.length > MAX_BODY) return reply("rejected");

    // Flood guard: if someone scripts thousands of submissions, stop writing for the rest of the minute
    const cache = CacheService.getScriptCache();
    const key = "n" + Math.floor(Date.now() / 60000);
    const n = Number(cache.get(key) || 0) + 1;
    cache.put(key, String(n), 120);
    if (n > MAX_PER_MINUTE) return reply("busy");

    const data = JSON.parse(body);
    if (!data || typeof data !== "object") return reply("rejected");

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      if (sheet.getLastRow() === 0) return reply("no header row"); // row 1 must list the columns first
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);

      // Only the columns in row 1 are saved; the server sets its own timestamp
      const row = headers.map(h => h === "timestamp" ? new Date() : clean(data[h]));
      if (row.every((v, k) => headers[k] === "timestamp" || v === "")) return reply("rejected");
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }
    return reply("ok");
  } catch (err) {
    return reply("error");
  }
}

// Plain text only, length-capped, and never interpreted as a spreadsheet formula
function clean(v) {
  if (v === undefined || v === null) return "";
  let s = String(v).replace(/[\u0000-\u001f]/g, " ").trim().slice(0, MAX_FIELD);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function reply(msg) {
  return ContentService.createTextOutput(msg);
}
