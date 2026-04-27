# Nousromancer operator personas and pain points

Status: accepted working framing for the typography/design lane.

## Primary pain point

Hermes operators lose orientation across fragmented agent work. After an interruption or surface shift, they need to know what is alive, what changed, what matters next, and where to resume without hunting across dashboard pages, logs, Discord, CLI sessions, and memory.

## Product promise

Nousromancer turns the Hermes dashboard into a re-orientation surface: a calm black-ledger console that shows live agent state, recent work, risks, and the next useful action at a glance.

North star:

```text
orientation → triage → resumption
```

## Persona / situation matrix

| Persona / situation | Trigger | Anxiety / unanswered question | Evidence needed at a glance | Next action to make obvious | Failure mode to avoid |
| --- | --- | --- | --- | --- | --- |
| **Returning interrupted operator** | Opens Hermes after stepping away, switching threads, or losing context. | “Where was I, what is still alive, and what changed?” | Gateway health, active sessions, most recent trace, stale/failing items, changed-since-last-look cues. | Resume the right session, inspect logs if degraded, or ignore cleanly if nothing needs attention. | Beautiful but decorative UI that still requires memory archaeology. |
| **Multi-surface operator** | Moves between Discord, CLI, browser dashboard, logs, cron, and Beads. | “Which surface owns the next move?” | Source chips, route-aware context, session origin, linked action target, current dashboard route. | Jump to Sessions / Logs / Cron / Skills with the right context preserved. | Duplicate panels or lore labels that obscure the actual source of truth. |
| **Task triager** | Checks the dashboard to decide what deserves attention now. | “What needs intervention versus what can wait?” | Blocked/stale/offline/risky badges, active counts, recency, severity, and next-action labels. | Investigate risk, resume active work, or defer/archive stale noise. | Flat visual hierarchy where every row looks equally urgent. |
| **Runtime maintainer** | Verifies whether Hermes/dashboard/plugin/runtime is healthy. | “Is the system itself working or silently degraded?” | Dashboard/plugin discovery, gateway state, service/offline states, last successful trace, logs action. | Open logs, restart/rescan when appropriate, or confirm healthy state. | Color-only status, ambiguous health language, hidden failure signals. |
| **Public judge / new user** | Evaluates the theme/plugin without prior private context. | “What does this extension do besides look different?” | Persistent Now Bar, readable screenshots, visible Hermes-native state, clear install/use copy. | Understand the 10-second usefulness claim and try the extension. | Private-context widgets, opaque lore, or novelty chrome that does not demonstrate utility. |

## Design requirements derived from the matrix

1. **Every persistent surface should answer one orientation question.** Prefer “what is alive / what changed / what needs attention / where to resume” over mood copy.
2. **Use visual density as a triage tool, not as identity by itself.** Rows can become ledger-like only where the added structure helps choose resume, ignore, investigate, or clean up.
3. **Separate readable content from machine metadata.** Session titles, controls, and search remain readable neutral sans; IDs, timestamps, source chips, counts, and states carry the product-spec mono rhythm.
4. **Make status actionable and non-color-only.** Health, stale, blocked, degraded, and offline states need text labels and a clear next action.
5. **Keep the public artifact safe and legible.** Public screenshots and repo copy should prove Hermes-native usefulness without leaking private ops-plane context.

## Implications for the next styling pass

- The Now Bar is the primary proof of persistent re-orientation.
- Sessions rows should be judged by whether a returning operator can decide: resume, ignore, investigate, or clean up.
- Analytics should show changed-since-last-look and health/usage signal before decorative chart atmosphere.
- Typography choices are successful only if they reduce re-entry friction; technical-garment flavor should come from labels, spacing, and metadata discipline rather than making functional content harder to read.
