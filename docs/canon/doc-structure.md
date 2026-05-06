# Nousromancer Canon — Document Structure

Status: canonical project-docs spine for `nousrmncr-lr8.8`. This file defines where project knowledge belongs so future agents do not scatter doctrine across chat logs or implementation comments.

## Canon layers

### Root doctrine

Root doctrine defines identity and durable boundaries:

- `MISSION.md` — why Nousromancer exists and what it refuses to become.
- `PHILOSOPHY.md` — design principles, anti-goals, and layer discipline.
- `VISION.md` — medium/long-term direction and restraint.
- `README.md` — public entry point and install/use orientation.

These files are canon. Patch them deliberately and keep wording aligned with metaharness review artifacts.

### Agent operation

Agent-facing workflow lives in:

- `AGENTS.md` — repo-local operating guide for all agents.
- `CLAUDE.md` — Claude Code execution guidance only.

Keep broad project doctrine out of `CLAUDE.md`; point Claude back to `AGENTS.md` and root/docs canon.

### Architecture and contracts

Use these files for stable implementation boundaries:

- `docs/architecture.md` — system layout, layer ownership, data sources, UI surfaces, and testing seams.
- `docs/functionality-data-contract.md` — Hermes dashboard fields and attention-signal boundaries.
- `docs/canon/` — stable standards/contracts that future docs and code should obey.
  - `docs/canon/public-private-operator-context-boundary.md` — public/private operator-context field boundary.
  - `docs/canon/workstream-evidence-strip-contract.md` — boundary-safe future workstream evidence pattern.

A new `docs/canon/*` file should define a repeated rule, schema, contract, or promotion gate. Do not put one-off notes here.

### User journeys and product sequence

Use:

- `docs/cujs/` — critical user journeys and acceptance framing.
- `docs/roadmap.md` — sequenced product/doc work; Beads remains live task state.
- `docs/operator-personas-and-pain-points.md` — operator situations and design requirements.

CUJs should drive product decisions more than aesthetic novelty.

### Design doctrine

Use:

- `docs/design-philosophy.md` — visual/product doctrine that supports the root philosophy.
- `docs/design-direction-*.md` — focused design direction notes or reviewed alternatives.

Design docs should preserve the black-ledger/operator-surface taste while staying evidence-bounded.

### Reviews and research

Use:

- `docs/reviews/` — durable reviewer/oracle/synthesis artifacts.
- `docs/research/` — research inputs and exploratory material.

Review and research files are rationale, not automatic canon. Promote stable conclusions into root docs, architecture, contracts, or canon files.

### Glossary

Use `docs/glossary.md` for ecosystem terms that would otherwise make the project unreadable to outside users or future agents.

## Status labels

Prefer explicit status notes at the top of important docs:

- `canonical` — accepted operating doctrine for the repo.
- `working contract` — active but may change as upstream APIs mature.
- `provisional` — useful draft pending user review or upstream confirmation.
- `review/rationale` — supporting evidence, not canon by itself.
- `historical` — preserved context; not current guidance.

Do not imply every generated doc is final canon. Label uncertainty.

## Promotion rule

Promote a claim into canon only when it has:

1. stable wording or interface shape;
2. correct layer ownership;
3. explicit failure behavior;
4. evidence that it helps operator work;
5. no accidental claim to Sylveste authority.

If a claim concerns durable truth, routing, governance, consent, provenance, or artifact authority, the default owner is upstream of Nousromancer.

## Linking rule

- Root docs should link to supporting docs when a reader needs operational detail.
- `AGENTS.md` should list the current canon spine and point to specific docs for architecture, roadmap, and CUJs.
- `README.md` should stay public and concise; avoid turning it into the whole doctrine stack.
- Beads IDs may appear in status notes or changelog-like context, but Beads remains the live task source of truth.

## Anti-patterns

- Putting durable doctrine only in chat summaries.
- Copying all review artifacts into root docs without synthesis.
- Using Nousromancer docs to assign authority that belongs to Hermes, Beads, Sylveste, Ockham, Clavain, or future substrate layers.
- Letting public README copy leak private workstream names, Discord IDs, or internal-only governance semantics.
- Adding a new doc when an existing canon file should be patched instead.
