---
name: obc-form
description: Make or change an Ottawa Blockchain form (survey, signup, RSVP, volunteer or feedback form) on ottawablockchain.ca using the shared story-card form engine, and connect it to a Google Sheet. Use whenever someone asks for a new OBC form, wants to add or edit questions on an existing one, or needs a form's responses saved to a Sheet.
---

# Ottawa Blockchain forms

Every OBC form uses one shared engine, so they all look and behave the same: one question per full-screen card, story-style progress bars, brand colors, light/dark mode, and answers saved to a Google Sheet.

- `public/forms/_engine/form.css`, `form.js`, `logo.png`: the shared engine. Change it only when every form should change.
- `forms/_template/index.html`: starter page for a new form (not deployed).
- `forms/_template/apps-script.gs`: the Google Sheet script. It works for any form without edits.
- `public/feedback/index.html`: the first real form, a good example. It stays at `/feedback`.

Follow the repo rules in `CLAUDE.md` (branch from `main`, small diffs, plain PR text).

## Make a new form

1. Branch from the latest `main`, for example `feat/volunteer-form`.
2. Copy `forms/_template/index.html` to `public/forms/<form-name>/index.html`. The address becomes `ottawablockchain.ca/forms/<form-name>/`.
3. Replace every `CHANGE`: page title, share text, `STEPS` (the questions) and `text` (intro, contact, done wording).
4. Leave `ENDPOINT` empty while building. The form runs in preview mode and saves nothing.

### Writing questions

- One card per step. Types: `intro`, `single` (one tap, moves on by itself), `multi` (pick several; `max` limits it, `ranked: true` saves the tap order as priority), `when` (days and times), `contact` (name, email, social handle), `newsletter`, `done`.
- The step `id` becomes the Sheet column name. Keep it short, lowercase, no spaces.
- Prefer taps over typing. Add `OTHER` to a list when people might not fit the options. It opens a text box saved to `<id>_other`.
- Use `when: a => …` to show a card only after certain answers (for example only ask volunteers for contact details).
- Use `theme: "red"` for the intro, done and one or two important cards. Too many red cards stop standing out.
- No emoji in labels. Each option gets a colored line-icon tile from its label via `OPT_ICON` in `form.js`.

### Icons for new options

- Brand logos (as the first item of an option): `substack`, `discord`, `instagram`, `linkedin`, `x`, `telegram`, `whatsapp`.
- Line icons already bundled: arrow-left-right, bitcoin, book-open, book-open-text, bot, briefcase, briefcase-business, calendar-check, camera, circle-help, circle-off, clock, code-xml, coins, compass, flame, gavel, graduation-cap, hammer, landmark, laptop, layers, mail, megaphone, messages-square, mic, moon, network, newspaper, palette, party-popper, pen-tool, plus, presentation, rocket, scale, smartphone, sprout, sun, sunrise, users.
- To give a new label an icon, add one line to `OPT_ICON` in `form.js`: `"Label": ["icon-name", "tint"]`. Tints: red, gold, blue, purple, green, teal, orange, gray.
- For an icon that isn't bundled, copy its shapes from Lucide (`https://cdn.jsdelivr.net/npm/lucide-static@0.460.0/icons/<name>.svg`) into `LU`. That is an engine change, so keep it in its own commit.

## Connect a Google Sheet

1. Open the form with `#columns` at the end of its address (locally or on a preview) to get its column list.
2. Make a Google Sheet in Nolan's Ottawa Blockchain Drive folder and paste the columns into row 1. Keep it private: response Sheets hold names and emails, so don't share them.
3. In the Sheet: Extensions > Apps Script, paste `forms/_template/apps-script.gs`, save.
4. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Google warns that the app isn't verified; that's normal for your own script.
5. Copy the `/exec` URL into the form's `ENDPOINT`.
6. Send one test response and check it lands in the right columns, then delete the test row.

"Anyone" only lets people add rows. The script never sends data back out. The URL is visible in the page source like any web form's; the script limits columns, length and rate and blocks spreadsheet formulas. Never put secrets in the script; use Script Properties.

## Check before opening the PR

- Click through every card, including each branch made by `when`.
- Test with a 360px-wide phone screen: nothing runs off the edge, buttons are easy to tap, tapping an option doesn't flicker.
- Test light and dark mode with the button at the top right.
- With the endpoint set, block real sending while testing (or delete test rows after).
- `npm run build` passes.
- If you changed the engine, run through `/feedback` too and check its answers still save the same way.

## Changing an existing form

Edit only that form's `public/forms/<name>/index.html` (or `public/feedback/index.html`). If you rename a step `id` or add a question, add the matching column to row 1 of its Sheet first, or the new answers won't be saved.
