# Ottawa Blockchain website

Source for https://ottawablockchain.ca. Vite + React app in `src/`, static files in `public/`.
Pushing to `main` deploys to GitHub Pages straight away (`.github/workflows/deploy.yml`), so all work goes through a PR.

## Working on this repo

- Branch from the latest `main` (`git fetch` first). Name branches by kind: `feat/…`, `fix/…`, `event/…`.
- Before pushing to a PR branch, check the PR is still open. Commits pushed after a merge go nowhere.
- Make the smallest change that does the job and edit files in place. Don't paste whole files over existing ones, and don't reformat lines you aren't changing. Check `git diff` shows only what you meant.
- Keep moves and behaviour changes in separate commits so each diff is easy to review.
- Run `npm run build` before opening a PR.
- Never commit secrets (keys, passwords, tokens). The repo is public.

## Commits and PRs

- Write like a person: short and plain. A PR description is one to three sentences. No emojis, no heavy headings or checklists, no "Generated with Claude Code" line.
- A `Co-Authored-By` trailer on commits is fine.

## Brand

- Colors: beige `#E8DED3`, charcoal `#2C2C2C`, red `#CE3937` (darker `#b02e2c` behind white text), gold `#C8A44C`.
- Font: Satoshi (Fontshare), Inter as fallback.
- Use real icons (Lucide line icons, Simple Icons brand logos), not emoji, in anything people see.
- Check new pages on a 360px-wide phone screen, in light and dark mode, and inside in-app browsers (Instagram, LinkedIn, Discord).

## Forms

Forms live in `public/forms/` and share one engine in `public/forms/_engine/`. `/feedback` is the first one and stays at that address.
To make a new form, follow `.claude/skills/obc-form/SKILL.md`.
