# Plans

Shared planning docs for `crownedcode-website`. Either founder can drop a plan in, the other pulls it, iterates, and pushes back.

## Convention

- **One plan per file.** Markdown. Filename prefixed with the date the plan was drafted: `YYYY-MM-<short-slug>.md`. Example: `2026-05-cinematic-home.md`.
- **First line of every plan**: a `Status:` field — `active`, `completed`, `shelved`, or `superseded-by: <other-file>`.
- **Plans are intent + design, not status updates.** Day-to-day progress lives in commit messages and the task list inside Claude. Use plans for "here's what we're going to build and why."
- **Edit freely.** A plan is not a contract. Change it as you learn — that's the point. Just commit your changes so the other person sees them.
- **Mark completed plans `Status: completed`** when done. Don't delete — historical plans are the record of what we decided and why.

## Workflow

```
# Steven drafts a plan
echo "..." > plans/2026-06-hub-mvp.md
git add plans/ && git commit -m "plan: hub MVP draft" && git push

# Rich pulls + comments by editing + commits + pushes
git pull
# (edits the file inline with comments or counter-proposals)
git add plans/ && git commit -m "plan: hub MVP — security model questions" && git push
```

When a plan crystallizes into actual work, the work happens in normal app code. The plan stays as the record of *why* we built it that way.

## Index

- `2026-05-cinematic-home.md` · **completed** · Cinematic home page upgrade (Lenis, film grain, 3D hero, scroll-driven sections).
