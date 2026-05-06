# AGENTS.md — Nousromancer

This file is the repo-local operating guide for agents working in Nousromancer.

## Canon status

Root doctrine for this repo lives in:

- `MISSION.md`
- `PHILOSOPHY.md`
- `VISION.md`
- `README.md`
- `docs/design-philosophy.md`
- `docs/operator-personas-and-pain-points.md`
- `docs/functionality-data-contract.md`
- `docs/canon/public-private-operator-context-boundary.md`
- `docs/canon/workstream-evidence-strip-contract.md`

Supporting project-docs spine:

- `CLAUDE.md` — Claude Code execution guidance only.
- `docs/architecture.md` — theme/plugin/Hermes dashboard boundaries.
- `docs/roadmap.md` — post-hackathon product sequence.
- `docs/cujs/operator-reorientation.md` — primary operator journey.
- `docs/canon/doc-structure.md` — where doctrine and operational notes belong.
- `docs/glossary.md` — ecosystem terms for outside readers and future agents.

The metaharness review record behind the current root canon is:

- `docs/reviews/2026-04-29-metaharness-doctrine-synthesis.md`
- `docs/reviews/2026-04-30-metaharness-doctrine-oracle-browser.md`

Use those review files as rationale, not as a substitute for the root canon.

## Project identity

Nousromancer is the Hermes-facing operator metaharness for Sylveste-grade work, not Sylveste itself.

It is a public Hermes Agent dashboard theme/plugin stack and an operator surface for live session/workstream state. It may represent Sylveste-grade workflows through Hermes, but it must not become Sylveste's system of record, governance layer, routing authority, or artifact owner.

For non-Sylveste readers: read "Sylveste-grade" as durable, multi-agent work where continuity, provenance, review, and human judgment matter.

## Layer boundaries

Agents must preserve these boundaries:

- **Hermes** exposes runtime/session/dashboard data.
- **Nousromancer** presents, orients, and stages operator action over Hermes data.
- **Beads** tracks project work and issue state.
- **Sylveste / Interverse / Ockham / Clavain / future substrate layers** may own deeper canon, governance, routing, provenance, review, or durable coordination semantics.

Use `docs/canon/public-private-operator-context-boundary.md` before adding richer operator-context fields from Beads, Masaq/GSV, Sylveste, Ockham, Clavain, Interverse, or future coordination substrates to public dashboard copy, screenshots, or product claims.

Do not add code or copy that implies Nousromancer owns durable Sylveste truth unless an upstream contract explicitly grants that role.

Prefer verbs like `show`, `project`, `represent`, `orient`, `hint`, `prepare`, and `surface`.

Avoid verbs like `govern`, `own`, `authorize`, `route`, `decide`, or `certify` except in refusal/boundary text or when implementing an explicit upstream contract.

## Attention-claim rules

Current public/demo Nousromancer supports staged attention, not authoritative triage.

Allowed when backed by current Hermes data:

- runtime health;
- freshness and recency;
- source/mirror orientation;
- visible message/workstream context;
- hedged `Possibly waiting` hints.

Do not claim any of the following unless explicit upstream fields and evidence exist:

- `needs input`;
- `blocked on you`;
- `highest priority`;
- definitive human-input requirement;
- authoritative route/assignment/recommendation;
- governance, approval, or consent state.

Future stronger attention claims should depend on upstream fields such as `attention_state`, `attention_reason`, `response_target`, and `attention_evidence`.

## Absent/stale/fresh behavior

When implementing UI or copy:

- **Absent data:** show unknown/empty state or suppress the claim.
- **Stale data:** show age/freshness and reduce confidence.
- **Fresh data:** show the value with source/context.

Never hide missing evidence behind confident prose.

## Work tracking

Use repo-local Beads for project work.

- Project path: `/home/mk/projects/nousromancer`
- Current tracker prefix: `nousrmncr`
- Before implementation, check `bd context` and the relevant bead.
- For `bd note`/`bd update` warnings like `auto-export: git add failed`, verify the Beads mutation before retrying; the write may have succeeded.
- After Beads mutations, push tracker state with `bd dolt push`.

Do not use GitHub Issues unless explicitly requested.

## Development hygiene

- Work in `/home/mk/projects/nousromancer` on `zklw`.
- Do not work under `/mnt/c` or an incidental local workspace.
- Verify git root before edits: `git rev-parse --show-toplevel` should be `/home/mk/projects/nousromancer`.
- Keep unrelated work out of the commit.
- Prefer small, reviewable docs/code increments tied to Beads IDs.

## Verification expectations

For docs-only changes:

- run `git diff --check`;
- inspect overclaim language before committing;
- verify root docs still align with the two metaharness review artifacts.

For code/plugin changes, add or run the narrowest relevant tests first, then broader tests where available. This repo currently uses `.mjs` test files under `tests/`; inspect the test harness before assuming a package command exists.

## Promotion gates

Before promoting a UI hint, data field, or workflow behavior into stronger canon, confirm:

1. the upstream data contract exists;
2. the owning layer is correct;
3. the failure behavior is explicit;
4. the public copy remains readable;
5. the behavior does not make Nousromancer the accidental system of record.

If a proposed feature crosses the boundary into durable routing, governance, consent, provenance, or artifact authority, stop and create a design/review bead before implementing.