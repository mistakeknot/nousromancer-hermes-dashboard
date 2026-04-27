# Nousromancer design philosophy

Status: provisional but accepted direction after the first visual critique pass.

## Core thesis

Nousromancer should not feel like a generic cyber/HUD skin. It should feel like a serious operator surface shaped by technical clothing, operational indexes, and black-ledger restraint.

Accepted direction:

> Technical garment/spec-sheet language, organized like an agent ops index, disciplined by a black ledger aesthetic.

In shorthand:

```text
B + C under A's restraint
```

Where:

- **A — black technical ledger:** sparse, neutral, credible, table-first, hierarchy by brightness rather than decoration.
- **B — technical garment/spec sheet:** ACRONYM/Veilance-adjacent labeling, product-code rhythm, material discipline, expert-user compression.
- **C — agent ops index:** Bloomberg / airport-board / database utility; fast scan, live state, rows that answer operational questions.

## What this rules out

- Generic cyberpunk cockpit chrome.
- Decorative HUD panels that do not change operator behavior.
- Serif/all-caps display typography applied to functional content.
- Neon glow as the primary identity system.
- Duplicate session lists or ornamental panels that compete with the real workflow.
- Labels that sound like lore when they should be interface.

## Typography doctrine

Accepted compression model:

> Readable by default; dense/code-like only for metadata, IDs, status, and machine-state.

Accepted readable-sans personality:

> Hybrid: readable neutral sans for content, product-spec mono for labels, metadata, IDs, status, and machine state.

This is an **adaptive split**, not a blanket style.

- Brand moments may be stylized; functional surfaces must be legible first.
- Use mono for labels, states, IDs, timestamps, counts, source chips, and metadata.
- Use readable neutral sans for session titles, descriptions, search, controls, and longer user-facing content.
- Let the product-spec rhythm come from labels, metadata, row structure, and spacing rather than compressing every text surface.
- Use uppercase/tracking as a labeling device, not a blanket treatment.
- Keep session titles and actions readable at screenshot scale.
- Let contrast, alignment, and spacing carry hierarchy before color or glow.

## Product doctrine

Nousromancer becomes special when it improves orientation, not when it adds more atmosphere.

A good Nousromancer element answers at least one of:

1. What is Hermes doing now?
2. Is anything blocked, stale, offline, or risky?
3. What session/context should I resume?
4. What is the next useful action?
5. What changed since I last looked?

## Visual metaphor

Not:

> sci-fi cockpit

Closer:

> a technical garment label sewn onto an agent operations index

or:

> a black ledger for live agent state

## Implementation implications

- The Now Bar remains the useful persistent surface.
- The Sessions page should be the first proof of taste: readable rows, quiet source metadata, clear search, hidden destructive actions, and live state without noise.
- Future screenshot work should show usefulness before mood.
- Future visual work should remove duplicate chrome before adding new components.

## Next interview track

The next unresolved decision is the **density and row-structure mode** for Sessions: how much ledger/index structure should appear in each session row before it starts feeling overdesigned.
