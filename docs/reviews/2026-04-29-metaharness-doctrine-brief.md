# Nousromancer metaharness doctrine review brief

Status: frozen review brief for `nousrmncr-lr8.5`. This is **not canon**; it is a proposal to pressure-test before root `MISSION.md`, `PHILOSOPHY.md`, or `VISION.md` are created.

## Review question

Should Nousromancer be framed as the **Hermes Agent metaharness for Sylveste-grade work**?

The current candidate framing is:

> Nousromancer is the Hermes-facing metaharness for Sylveste-grade agent work: a public dashboard extension on the surface, and internally an operator control surface that makes agents, Beads, handoffs, attention state, receipts, routes, reviews, and human judgment legible without collapsing Sylveste’s deeper canon into Hermes core.

## Current context

Nousromancer began as a Hermes Dashboard theme/plugin hackathon project. It has since moved beyond “skin” into operator attention and live-agent triage.

Canonical current repo details:

- Repo: `mistakeknot/nousromancer`
- Local path: `/home/mk/projects/nousromancer`
- Plugin: `nousromancer-mission-control`
- Beads prefix: `nousrmncr`

Important current docs:

- `README.md` — public install/use surface.
- `docs/design-philosophy.md` — accepted visual/product doctrine.
- `docs/operator-personas-and-pain-points.md` — accepted persona matrix and primary pain point.
- `docs/functionality-data-contract.md` — public dashboard API/attention-boundary contract.

Current accepted product north star:

```text
which agent → why now → how to answer
```

Current accepted V1/demo boundary:

- truthful health, freshness, source orientation, active counts, traceability;
- conservative `Possibly waiting` hints only when backed by tested heuristic or explicit upstream evidence;
- no authoritative `needs input`, `blocked on you`, `highest priority`, or ranked human-needed decisions without explicit upstream attention-state fields.

Recent decisions:

- `nousrmncr-lr8.3` accepted **input-priority hybrid rows**: readable ask/decision content first, hedged attention/status second, quiet mono metadata third, one next-response state last.
- `nousrmncr-t0q.4` was implemented upstream in Hermes Agent as an attention-state contract and documented downstream in Nousromancer. Another session may still be working adjacent follow-up; avoid duplicating that lane.

## Proposed doctrine shift

The earlier doctrine option was:

> Public extension now, operator-attention doctrine/prototype underneath.

The stronger user-proposed shift is:

> Nousromancer is the Hermes Agent metaharness for Sylveste.

Suggested refinement:

> Nousromancer is the Hermes Agent metaharness for Sylveste-grade work, not Sylveste itself.

This implies a layered identity:

1. **Public face** — a tasteful Hermes Dashboard theme/plugin demonstrating a calm black-ledger runtime surface.
2. **Operator role** — a live control surface for agent-input triage: which agent needs judgment, why now, and where/how to answer.
3. **Strategic role** — the Hermes-side metaharness for Sylveste/Interverse workflows: Beads, CASS recall, handoff packets, review state, route decisions, receipts, and operator asks.
4. **Boundary** — Sylveste/Intercore/Interspect remain the deeper substrate/canon/governance layer; Nousromancer should expose and operate that work from Hermes without absorbing or duplicating it.

## Possible root-canon shape

If this framing survives review, the repo likely needs a lean root canon spine:

- `MISSION.md` — why Nousromancer exists.
- `PHILOSOPHY.md` — metaharness principles, visual/product doctrine, anti-goals.
- `VISION.md` — medium-term direction after attention-state / Beads / CASS / review/receipt integrations.
- `AGENTS.md` / `CLAUDE.md` — repo-local guidance so future agents do not rediscover the boundaries from chat history.

Possible mission sentence:

> Nousromancer exists to make Hermes Agent a usable metaharness for Sylveste-grade agent work: a live operator surface that shows which agents, tasks, and workflows need human judgment, why they matter now, and how to answer without collapsing Sylveste’s deeper canon into Hermes.

Possible public/internal split:

- Public wording: “a Hermes dashboard metaharness for multi-agent operator work.”
- Internal doctrine: Sylveste is the primary canonical target; Nousromancer is the Hermes-facing adapter/control surface.

## Constraints / boundaries

Reviewers should preserve these constraints unless they argue explicitly against them:

1. **Do not make Nousromancer Sylveste itself.** It is a Hermes-facing metaharness/adaptor/control surface.
2. **Do not import all Sylveste canon into Hermes or Nousromancer.** Prefer adapter seams, artifacts, and read models.
3. **Do not erase the public extension identity.** The repo is still public-facing and should stay comprehensible to non-Sylveste users.
4. **Do not overclaim attention triage.** Use truthful signals and explicit upstream evidence.
5. **Keep public/private boundaries clear.** No raw Discord IDs, private workstream cards, internal governance secrets, or private repo assumptions in public UI/docs.
6. **Avoid doctrine bloat.** Root canon should reduce ambiguity for future agents, not become a cathedral.

## Questions for reviewers

1. Is “Hermes Agent metaharness for Sylveste-grade work” the right identity level for Nousromancer, or does it overfit a dashboard plugin into a platform role?
2. Should the root mission name **Sylveste** explicitly, or use layered public/internal wording?
3. What are the strongest risks of this framing?
4. What boundaries must be written into `MISSION.md`, `PHILOSOPHY.md`, and `VISION.md` so future agents do not collapse layers?
5. What should be the next concrete doc/bead after review: mission interview, architecture doc, roadmap, or implementation plan?

## Requested reviewer output

Please produce:

- a clear recommendation;
- strongest alternative framing;
- risks/tradeoffs;
- specific wording improvements;
- “do not do this” guardrails;
- suggested next artifact sequence;
- anything that would make you reject the metaharness framing.
