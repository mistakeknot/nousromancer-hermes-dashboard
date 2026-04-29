# Nousromancer operator personas and pain points

Status: accepted working framing for the typography/design lane. V1/demo promise is staged attention (**B+C**): orientation plus hedged possible-waiting hints, not authoritative priority.

## Primary pain point

Hermes operators need to know which agent most needs their input, why that input matters now, and how to think clearly enough to answer the agent well. Re-orientation still matters, but as the substrate: the dashboard should show what is alive, what changed, what is blocked, and what decision the human is being asked to make before the operator has to reconstruct context across dashboard pages, logs, Discord, CLI sessions, and memory.

## Product promise

Nousromancer gives Hermes a calm black-ledger operator console for runtime health, session freshness, source-aware traces, and conservative “possibly waiting” attention hints—laying the groundwork for true human-input triage across agent sessions.

Boundary: v1 can help the operator orient and notice possible attention demand. It should not claim authoritative `needs input`, `blocked on you`, or `highest priority` status until Hermes exposes a real attention contract.

North star:

```text
which agent → why now → how to answer
```

## Persona / situation matrix

| Persona / situation | Trigger | Anxiety / unanswered question | Evidence needed at a glance | Next action to make obvious | Failure mode to avoid |
| --- | --- | --- | --- | --- | --- |
| **Returning interrupted operator** | Opens Hermes after stepping away, switching threads, or losing context. | “Which agent needs me most, and what decision am I expected to make?” | Human-input-needed markers, active sessions, most recent trace, changed-since-last-look cues, blocking status, and a short decision frame. | Answer the right agent, ask a follow-up, defer intentionally, or inspect logs if the ask depends on degraded state. | Beautiful but decorative UI that still requires memory archaeology before the human can answer. |
| **Multi-surface operator** | Moves between Discord, CLI, browser dashboard, logs, cron, and Beads. | “Which surface owns the agent ask, and where do I answer?” | Source chips, route-aware context, session origin, linked response target, current dashboard route, and whether the agent is waiting on the human. | Jump to the right surface with enough context to respond well. | Duplicate panels or lore labels that obscure the source of truth or response channel. |
| **Task triager** | Checks the dashboard to decide what deserves attention now. | “Which human decision is highest leverage versus background noise?” | Waiting-on-me badges, blocked/stale/offline/risky state, active counts, recency, severity, stakes, and next-action labels. | Answer now, investigate risk, ask for clarification, or defer/archive stale noise. | Flat visual hierarchy where every row looks equally urgent. |
| **Runtime maintainer** | Verifies whether Hermes/dashboard/plugin/runtime is healthy. | “Is the system itself working or silently degraded?” | Dashboard/plugin discovery, gateway state, service/offline states, last successful trace, logs action. | Open logs, restart/rescan when appropriate, or confirm healthy state. | Color-only status, ambiguous health language, hidden failure signals. |
| **Public judge / new user** | Evaluates the theme/plugin without prior private context. | “What does this extension do besides look different?” | Persistent Now Bar, readable screenshots, visible Hermes-native state, clear install/use copy. | Understand the 10-second usefulness claim and try the extension. | Private-context widgets, opaque lore, or novelty chrome that does not demonstrate utility. |

## Design requirements derived from the matrix

1. **Every persistent surface should support one human-input triage question.** Prefer “which agent needs me / why now / what decision / how should I answer” over mood copy, while being explicit when v1 only has orientation signals.
2. **Prioritize human-needed agents above background activity when the signal exists.** Until then, show truthful recency, freshness, source, and hedged possible-waiting hints rather than fake certainty.
3. **Show the decision frame, not just state.** Rows and persistent bars should expose the best available ask, stakes, relevant context, response target, and evidence; missing attention data should remain visible as a product gap.
4. **Use visual density as a triage tool, not as identity by itself.** Rows can become ledger-like only where the added structure helps choose answer now, ask a follow-up, defer, investigate, or clean up.
5. **Separate readable content from machine metadata.** Session titles, controls, decision summaries, and proposed response cues remain readable neutral sans; IDs, timestamps, source chips, counts, and states carry the product-spec mono rhythm.
6. **Make status actionable and non-color-only.** Health, stale, blocked, degraded, and offline states need text labels and a clear next action.
7. **Keep the public artifact safe and legible.** Public screenshots and repo copy should prove Hermes-native usefulness without leaking private ops-plane context.

## Accepted Sessions row mode

Decision bead: `nousrmncr-lr8.3` closed the row-density question as **C — input-priority hybrid rows**.

Practical row hierarchy:

1. readable session title / best-known ask / decision summary;
2. hedged attention or status signal, especially `Possibly waiting` when supported by tested evidence;
3. quiet mono source, recency, freshness, model/tool/session metadata, and stakes/evidence labels;
4. one obvious next-response state: answer now, ask follow-up, defer, investigate, or clean up.

This keeps rows public-legible while making them operationally useful. Dense ledger/spec treatment is allowed only where it helps triage or response quality. Adaptive attention rows become the future direction once Hermes exposes stronger upstream attention-state data.

## Implications for the next styling pass

- The Now Bar is the primary proof of staged attention: health, freshness, latest source, and possibly-waiting hints before any authoritative priority claim.
- Sessions rows should be judged by whether a returning operator can decide: answer now, ask a follow-up, defer, investigate, or clean up, while preserving uncertainty when attention signals are heuristic.
- Analytics should show changed-since-last-look, possible attention demand, and health/usage signal before decorative chart atmosphere.
- Typography choices are successful only if they reduce response friction; technical-garment flavor should come from labels, spacing, and metadata discipline rather than making functional content harder to read.
