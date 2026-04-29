# Nousromancer design philosophy

Status: accepted direction. V1/demo promise is **staged attention**: truthful orientation today plus conservative possible-waiting hints, not an authoritative full-triage claim.

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

V1 public/demo promise:

> Nousromancer gives Hermes a calm black-ledger operator console for runtime health, session freshness, source-aware traces, and conservative “possibly waiting” attention hints—laying the groundwork for true human-input triage across agent sessions.

Claim boundary:

- **Truthful now:** health, freshness, active-session counts, latest source, traceability, and hedged possible-attention hints when backed by a tested heuristic.
- **North-star, not yet a precise public claim:** authoritative priority, `blocked on you`, `needs input`, or ranked human-needed decisions.

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

## Accepted Sessions row structure

Decision bead: `nousrmncr-lr8.3`.

Accepted mode:

> **Input-priority hybrid rows** — readable decision content first, quiet technical metadata second.

This chooses the product-correct middle path between minimal product rows and dense ledger rows:

1. **Primary readable content:** session title, best-known ask, or decision summary in neutral sans.
2. **Hedged attention/status signal:** `Possibly waiting` only when a tested heuristic or upstream attention field supports it; otherwise use truthful state such as active, stale, degraded, failed, or recently changed.
3. **Quiet mono metadata:** source, recency, model/tool/session state, freshness, and any known stakes or evidence labels.
4. **One next-response state:** answer now, ask follow-up, defer, investigate, or clean up.

The row should look like an agent-operations index, but only where the index structure improves attention arbitration or answer quality. Product-spec rhythm belongs in metadata and labels, not in compressed functional content.

Boundary:

- Do **not** claim authoritative `needs input`, `blocked on you`, `highest priority`, or ranked human-needed decisions until Hermes exposes explicit attention-state fields.
- Treat adaptive attention rows as the later evolution once upstream `attention_state`, response target, blocked reason, urgency, and stakes are available.

## Implementation implications

- The Now Bar should first prove truthful health/freshness/source orientation, then add a hedged `Possibly waiting` attention hint only where a tested heuristic or upstream signal supports it.
- The Sessions page should be the first proof of taste: input-priority hybrid rows, quiet source metadata, clear search, hidden destructive actions, and enough decision context to choose answer now, ask a follow-up, defer, investigate, or clean up without pretending to know priority more precisely than the data allows.
- Future screenshot work should show human-in-the-loop usefulness before mood.
- Future visual work should remove duplicate chrome before adding new components.

## Future interview track

The next design question is not whether Sessions rows should be minimal or ledger-dense; that is settled. The next unresolved question is how far to push **adaptive attention rows** once Hermes exposes stronger upstream attention fields.
