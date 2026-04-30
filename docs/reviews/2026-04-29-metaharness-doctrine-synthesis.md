# Nousromancer metaharness doctrine review synthesis

Status: dual-reviewed recommendation, **not canon**. Use this to guide the next doctrine interview and first root-canon pass.

Review bead: `nousrmncr-lr8.5`.

Reviewed inputs:

- `docs/reviews/2026-04-29-metaharness-doctrine-brief.md`
- `README.md`
- `docs/design-philosophy.md`
- `docs/operator-personas-and-pain-points.md`
- `docs/functionality-data-contract.md`

Reviewer artifacts:

- Oracle: `docs/reviews/2026-04-29-metaharness-doctrine-oracle.md`
- Claude Code /interflux synthesis: `docs/research/flux-review/metaharness-doctrine-brief/2026-04-29-synthesis.md`
- Claude Code /interflux track notes: `docs/research/flux-drive/2026-04-29-metaharness-doctrine-brief/`

Run notes:

- Oracle `gpt-5.4-pro` API mode was attempted first but failed for OpenRouter credit/max-token limits. Oracle review completed with API `gpt-5.4` and saved the output.
- Claude Code `/interflux:flux-review ... --quality=balanced` started successfully but crashed in Bun after launching early background agents. A second `/interflux:flux-review ... --quality=light` run completed after substituting economy mode because `light` is not a documented interflux quality level.

## Core convergence

Both Oracle and Claude Code support the metaharness framing **only if it is constrained**.

Recommended identity:

> **Nousromancer is the Hermes-facing operator metaharness for Sylveste-grade work, not Sylveste itself.**

Public-facing wording should stay plainer:

> **Nousromancer is a Hermes operator dashboard for multi-agent work.**

Internal doctrine can say that Sylveste is the primary canonical target, but the public README / public mission wording should not require Sylveste literacy.

## What survives review

The reviewed framing is directionally correct:

1. Nousromancer has outgrown “theme/plugin” as its only identity.
2. Its stable product north star remains `which agent → why now → how to answer`.
3. It can be the Hermes-facing adapter/control surface for Sylveste-grade work.
4. It must not become the substrate, system of record, governance layer, or canonical home of Sylveste/Intercore/Interspect state.

## Main risks

### 1. Layer collapse

The phrase “metaharness for Sylveste” can sound as though Nousromancer owns or represents Sylveste itself. Root docs must instead frame Nousromancer as a **surface, adapter, and projection** over upstream systems.

Guardrail:

> Nousromancer may expose and represent Sylveste-grade work from Hermes; it must not absorb, govern, or become the canonical source for Sylveste artifacts.

Claude’s flux-review preferred replacing “expose and operate” with **“expose and represent”** to avoid co-sovereign implications.

### 2. Missing refusal / suppression clause

The mission sentence must say not only what Nousromancer does, but what it deliberately does **not** expose or own.

Recommended mission addendum:

> It exposes routing urgency and handoff state; it does not expose Sylveste governance depth, canon arbitration, or Intercore/Interspect authority, and it does not own or govern Sylveste artifacts directly.

### 3. Public/private legibility

Public docs should be comprehensible to Hermes users who have never heard of Sylveste. Internal doctrine can name Sylveste and the broader substrate boundary.

Rule:

- Public wording: Hermes operator dashboard / multi-agent work.
- Internal doctrine: Hermes-facing metaharness for Sylveste-grade workflows.

### 4. Attention overclaim

Metaharness language must not become rhetorical cover for fake priority or “waiting on you” assertions.

Promote this to root `PHILOSOPHY.md` as a first-class principle:

> The operator surface emits only what upstream attention-state fields have explicitly recorded; it does not infer agent state from absence of signal, timing patterns, or prior-session data without a named heuristic backed by tested evidence.

### 5. No absent-data / stale-data protocol yet

Claude Code’s strongest added finding was the “light-failure protocol”: the doctrine needs explicit behavior for absent, stale, and fresh upstream data.

Root philosophy should include:

1. **No upstream data:** neutral/blank display with explicit absence label.
2. **Stale upstream data:** last-known value only with explicit staleness marker.
3. **Fresh upstream data:** normal signal.

This prevents stale “last known good” from masquerading as live operator truth.

### 6. Root canon bloat

If root docs duplicate `docs/design-philosophy.md`, future agents will face competing philosophy sources.

Recommended handling:

- Root `PHILOSOPHY.md` should absorb and supersede `docs/design-philosophy.md` once accepted.
- Existing accepted design doctrine can be archived or reclassified as historical/supporting material.
- Do not create root doctrine that repeats all four identity layers in every file.

## Recommended next artifact sequence

The review changed my ordering.

### 1. Mission interview, not immediate mission draft

Two questions still need human acceptance before root canon:

1. Should public root docs name Sylveste directly, or reserve that for internal doctrine sections?
2. What upstream artifact is the datum/reference for the projection — current candidate: the Hermes attention-state contract from `nousrmncr-t0q.4` / Hermes Agent `hermes-tp4`.

### 2. Boundary / promotion-gate stub

Before full `MISSION.md`, write a small boundary contract or repo-local `AGENTS.md` stub with:

- layer decision table;
- public/internal naming rule;
- light-failure protocol;
- anti-interpolation rule;
- authority order: `MISSION.md > PHILOSOPHY.md > VISION.md > AGENTS.md/CLAUDE.md`.

### 3. MISSION.md draft

Only after the mission interview. It must include:

- public-facing purpose;
- internal Sylveste-grade metaharness role;
- refusal/suppression clause;
- “not Sylveste itself” boundary.

### 4. PHILOSOPHY.md

Absorb existing `docs/design-philosophy.md`, then add:

- layer discipline;
- anti-interpolation principle;
- light-failure protocol;
- public/private and public-safe boundaries;
- anti-goals.

### 5. VISION.md

Keep staged and conditional:

- truthful orientation;
- evidence-backed attention state;
- handoff/review/receipt surfaces when upstream contracts exist.

Do not phrase external integrations as promises owned by Nousromancer. Use conditional wording: “When upstream contract X exists, Nousromancer surfaces Y.”

## Reject / narrow conditions

The metaharness framing should be rejected or narrowed if:

1. Nousromancer cannot maintain a stable read-model seam with Sylveste without write-back authority.
2. Nousromancer route decisions become executable authority instead of read-only operator guidance.
3. Public docs become unreadable without private Sylveste literacy.
4. Attention-state claims outrun explicit upstream evidence.
5. Nousromancer starts acting as a system of record for workflow truth, governance, or canon.
6. “Metaharness” becomes a license for roadmap sprawl across orchestration, memory, governance, planning, and canon-hosting.

## Hermes synthesis

Adopt the framing as **candidate doctrine**, not canon:

> Nousromancer is the Hermes-facing operator metaharness for Sylveste-grade work: a public Hermes dashboard extension and a private/control-surface doctrine for making multi-agent work legible through Hermes. It represents upstream work through safe read models, attention evidence, handoff/review/receipt projections, and operator asks; it does not become Sylveste, own Sylveste artifacts, or invent governance/attention truth.

## 2026-04-30 follow-up: direct Sylveste naming accepted

mk accepted direct Sylveste naming for root/public canon and asked for browser Oracle rather than API-only Oracle. The browser Oracle attempt is documented separately in `docs/reviews/2026-04-30-metaharness-doctrine-oracle-browser-attempt.md`; it was blocked by the zklw browser environment because no visible Oracle Chrome/XRDP lane was available and the temporary headless Chrome path hit Cloudflare.

The naming decision supersedes the prior open question. The next canon pass should name Sylveste directly, while preserving the reviewed boundary:

> Nousromancer is the Hermes-facing operator metaharness for Sylveste-grade work, not Sylveste itself.

Public/root canon should therefore be direct but bounded: name Sylveste, define Nousromancer as the Hermes-facing representation/control surface, and state what it refuses to own or expose.
