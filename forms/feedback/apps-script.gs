/** @OnlyCurrentDoc */
// Google Apps Script: saves form responses to the Google Sheet this script is attached to.
// It can only ADD rows. Nothing here sends Sheet data back out, so the public link can't be used to read responses.
//
// Setup:
// 1. In the Sheet: Extensions > Apps Script. Delete what's there and paste this file.
// 2. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone.
// 3. Authorize, then copy the Web app URL (ends in /exec) into index.html: const ENDPOINT = "...";
// Updating later without changing the URL: Deploy > Manage deployments > pencil icon > Version: New version > Deploy.

const HEADERS = [
  "timestamp",
  "reach", "reach_other",
  "role", "role_other",
  "level", "level_other",
  "want", "want_other",
  "topics", "topics_other",
  "days", "times",
  "kinds", "kinds_other",
  "volunteer", "volunteer_other",
  "name", "email", "social", "social_handle",
  "help", "help_other",
  "camera", "camera_other",
  "newsletter",
];

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

    // Only known columns are saved; the server sets its own timestamp
    const row = HEADERS.map(h => h === "timestamp" ? new Date() : clean(data[h]));
    if (row.slice(1).every(v => v === "")) return reply("rejected");

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
      if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
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
