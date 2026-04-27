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

Nousromancer becomes special when it improves the operator's human-in-the-loop decisions, not when it adds more atmosphere.

Primary pain point:

> Hermes operators need to know which agent most needs their input, why that input matters now, and how to think clearly enough to answer the agent well. Re-orientation still matters, but as the substrate: the dashboard should show what is alive, what changed, what is blocked, and what decision the human is being asked to make before the operator has to reconstruct context across dashboard pages, logs, Discord, CLI sessions, and memory.

Product promise:

> Nousromancer turns the Hermes dashboard into an agent-input triage surface: a calm black-ledger console that ranks human-needed decisions, exposes the reasoning context, and helps the operator respond precisely.

North star:

```text
which agent → why now → how to answer
```

Persona and pain-point matrix: [`docs/operator-personas-and-pain-points.md`](operator-personas-and-pain-points.md).

A good Nousromancer element answers at least one of:

1. Which agent/session is waiting on me?
2. How important or urgent is that input relative to the rest?
3. What decision am I actually being asked to make?
4. What context or evidence do I need before answering?
5. What would a good answer unlock, prevent, or clarify?

## Visual metaphor

Not:

> sci-fi cockpit

Closer:

> a technical garment label sewn onto an agent operations index

or:

> a black ledger for live agent state

## Implementation implications

- The Now Bar should graduate from generic status into the persistent human-input queue: top waiting agent, urgency/stakes, and the next response target when available.
- The Sessions page should be the first proof of taste: readable rows, quiet source metadata, clear search, hidden destructive actions, and enough decision context to choose answer now, ask a follow-up, defer, or clean up.
- Future screenshot work should show human-in-the-loop usefulness before mood.
- Future visual work should remove duplicate chrome before adding new components.

## Next interview track

The next unresolved decision is the **density and row-structure mode** for Sessions: how much ledger/index structure should appear in each session row before it stops helping the operator decide which agent needs input and how to answer.
