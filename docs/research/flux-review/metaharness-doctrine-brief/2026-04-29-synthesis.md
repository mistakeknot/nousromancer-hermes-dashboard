---
artifact_type: review-synthesis
method: flux-review
target: "docs/reviews/2026-04-29-metaharness-doctrine-brief.md"
target_description: "Doctrine brief proposing Nousromancer as Hermes Agent metaharness for Sylveste-grade work"
tracks: 3
quality: economy
track_a_agents: [fd-product-doctrine-mission, fd-platform-boundary-strategist, fd-operator-surface-designer, fd-public-private-positioning, fd-doctrine-bloat-auditor]
track_b_agents: [fd-broadcast-control-room, fd-library-catalog-governance, fd-charter-drafting, fd-diplomatic-protocol]
track_c_agents: [fd-cartography-projection, fd-heraldry-blazon, fd-monastic-scriptorium, fd-lighthouse-trinity-house]
date: 2026-04-29
---

# Synthesis: Nousromancer Metaharness Doctrine Brief

## Critical Findings (P0/P1)

**P0-A — No light-failure / absent-data protocol.**
The brief specifies which signals are permitted when upstream data is present (lines 38–42) but says nothing about what the surface emits when upstream attention-state data is absent, stale, or of unknown provenance. This is the highest-severity gap because an implementation default of last-known-good emits a stale signal that operators cannot distinguish from a live one.

Surfaced by: fd-lighthouse-trinity-house (Track C), corroborated structurally by fd-broadcast-control-room's feed-promotion finding (Track B).

Fix: Add a three-state light-failure protocol to the PHILOSOPHY.md proposal: (a) "no upstream data" — blank/neutral display with label; (b) "stale data" — last-known with explicit staleness marker; (c) "fresh upstream data" — normal signal. One paragraph. This closes the gap without requiring upstream infrastructure changes.

---

**P0-B — Mission sentence contains no named suppression declaration.**
Line 80's candidate mission sentence states that Nousromancer makes Hermes "a usable metaharness for Sylveste-grade agent work" without naming a single Sylveste property it deliberately does not expose. A future agent reads this as a complete representation of Sylveste state, routes governance decisions through Nousromancer, and is not wrong per the sentence.

Surfaced by: fd-cartography-projection (Track C) as missing projection label; fd-monastic-scriptorium (Track C) as missing provenance/exemplar statement; fd-product-doctrine-mission (Track A) as missing refusal clause.

Fix: Append one sentence to the mission candidate (line 80): "It exposes routing urgency and handoff state; it does not expose Sylveste governance depth, canon arbitration, or Intercore/Interspect authority, and it does not own or govern Sylveste artifacts directly." This is the projection label, the refusal clause, and the provenance boundary in one sentence.

---

**P1-A — Anti-interpolation rule is in the wrong doctrinal tier.**
Constraint 4 (line 94 — "do not overclaim attention triage") is stated as a reviewer constraint, binding only this review. It is not carried forward into any proposed canon document. A future agent writing PHILOSOPHY.md without reading this brief has no instruction against inferring agent state from absence of signal or prior-session data.

Surfaced by: fd-lighthouse-trinity-house (Track C); structurally corroborated by fd-broadcast-control-room's feed-promotion rule (Track B) and fd-monastic-scriptorium's working-copy-gloss finding (Track C).

Fix: Promote constraint 4 verbatim to a first-class PHILOSOPHY.md principle. One sentence suffices: "The operator surface emits only what upstream attention-state fields have explicitly recorded; it does not infer agent state from absence of signal, timing patterns, or prior-session data without a named heuristic backed by tested evidence."

---

**P1-B — PHILOSOPHY.md will duplicate `docs/design-philosophy.md` without a supersession rule.**
The brief proposes PHILOSOPHY.md to cover "visual/product doctrine, anti-goals" (line 73) while line 28 lists `docs/design-philosophy.md` as accepted visual/product doctrine. Two authoritative philosophy sources with no stated relationship create irreconcilable authority for future agents.

Surfaced by: fd-doctrine-bloat-auditor (Track A); structurally corroborated by fd-library-catalog-governance's authority-record vs. local-practice-note distinction (Track B).

Fix: Add one line to the brief under the PHILOSOPHY.md entry: "PHILOSOPHY.md absorbs and supersedes `docs/design-philosophy.md`. The existing file is archived upon PHILOSOPHY.md publication."

---

**P1-C — Layer boundary is stated but has no promotion gate or decision rule.**
Lines 64–67 list three identity layers (public face / operator role / strategic role) as a flat enumeration. No document is tasked with providing a condition under which a feature belongs to one layer versus another. Every new capability will re-litigate layer assignment independently.

Surfaced by: fd-broadcast-control-room (Track B) as missing cut-rule; fd-charter-drafting (Track B) as missing bylaw translation of constitutional layer claim; fd-platform-boundary-strategist (Track A) as missing binary seam test; fd-heraldry-blazon (Track C) as tincture-on-tincture (operator and strategic role indistinguishable).

Fix: Add a mandate to the brief that AGENTS.md must contain a decision table — one row per layer, one "Feature belongs here if:" condition column. Separate the operator role and strategic role by scope: operator role = synchronous human judgment (which agent needs a decision now); strategic role = asynchronous workflow state (handoffs, receipts, reviews, routes). This makes the two charges visually distinct.

---

## Cross-Track Convergence

### 1. Mission sentence under-specification — missing refusal / suppression clause
**Convergence: 3/3 tracks**

Track A (fd-product-doctrine-mission): The candidate mission sentence (line 80) is not self-rejecting — a future agent can use it to justify importing Sylveste governance into Nousromancer because the boundary is stated only in the constraints section (line 92), not in the mission sentence itself.

Track B (fd-broadcast-control-room): The mission sentence spans all three layers in a single sentence with no break, making it impossible to derive layer assignment from the sentence alone.

Track C (fd-cartography-projection, fd-monastic-scriptorium): The sentence names no suppressed Sylveste properties (missing projection label) and names no upstream exemplar (missing provenance statement).

Why this matters: MISSION.md is the document all future agents will read without co-reading the constraints section. If the constraint is not embedded in the sentence, it is invisible from the authoritative document.

---

### 2. Layer boundary not operationalized — no promotion gates, cut rules, or decision table
**Convergence: 3/3 tracks**

Track A (fd-platform-boundary-strategist, fd-operator-surface-designer): The brief names the layers but provides no binary test for layer assignment; every future capability expansion will re-derive the seam independently.

Track B (fd-broadcast-control-room, fd-charter-drafting): Broadcast: no cut-rule — the brief has a director's monitor wall but no named promotion gate. Charter: constitutional layer claim has no bylaw translation; the layer boundary is unenforceable.

Track C (fd-heraldry-blazon): Operator role and strategic role are tincture-on-tincture — both describe a Hermes-facing control surface for Sylveste work, indistinguishable at reading distance.

Why this matters: Without a promotion gate, the public surface will accumulate operator-layer and strategic-layer features by default because no document says otherwise.

---

### 3. Public/private wording and Sylveste naming authorization
**Convergence: 3/3 tracks**

Track A (fd-public-private-positioning): The brief does not designate which proposed root-canon files are public-facing; MISSION.md committed to the public repo with line 85 internal doctrine ("Sylveste is the primary canonical target") violates the boundary at first git push.

Track B (fd-diplomatic-protocol): The naming-authorization test is not applied. Line 80 names Sylveste in a constraint context ("without collapsing Sylveste's deeper canon") which implies Nousromancer has standing to describe Sylveste's scope — a commitment on Sylveste's behalf that has not been authorized.

Track C (fd-heraldry-blazon): "Sylveste-grade work" in the public blazon (line 60) is not self-reconstructable without Sylveste context; non-Sylveste contributors will treat it as marketing copy.

Why this matters: The public/private split is the brief's most explicit design intention (lines 84–85) and it remains a design note, not a governing rule with audience definitions and naming permissions.

---

### 4. Truthful attention emission when data is absent — light-failure protocol
**Convergence: 2/3 tracks (B and C; partially Track A)**

Track A (fd-operator-surface-designer): The V1/demo boundary (lines 39–41) is not carried forward into the proposed doctrine documents; a future agent writing PHILOSOPHY.md from the proposed section alone will not find it.

Track B (fd-broadcast-control-room): The "Possibly waiting" hint lacks an explicit evidence gate — hedged signal language without a named condition constitutes a feed-promotion rule with no confirmation step.

Track C (fd-lighthouse-trinity-house): Highest-structural-transfer finding: the brief has no light-failure protocol for the absent-data case; the anti-interpolation rule is in the wrong doctrinal tier.

Why this matters: The absent-data case is the most common state at session start and handoff gaps. Defaulting to last-known-good without a staleness marker is the most operationally dangerous unspecified behavior in the brief.

---

### 5. Doctrine bloat / authority-level contamination in canon spine
**Convergence: 3/3 tracks**

Track A (fd-doctrine-bloat-auditor): "Lean" is not operationalized; the four-layer identity creates structural pressure for 16 mandatory sections before content is added; existing accepted docs are left in undefined relationship to the new spine.

Track B (fd-library-catalog-governance, fd-charter-drafting): Catalog: PHILOSOPHY.md conflates authority records (permanent principles) with local practice notes (V1 policy); session IDs risk migration into permanent documents. Charter: the six constraints (lines 89–96) are mixed authority levels — constitutional, bylaw, and policy constraints in a flat list.

Track C (fd-monastic-scriptorium): Without a colophon rule (closing scope statement per document), marginalia and operational caveats will accumulate inside MISSION.md and PHILOSOPHY.md.

Why this matters: A canon spine that does not separate permanent principles from V1 policy requires amendment every time an integration term changes, defeating the stated purpose of providing stable guidance for future agents.

---

## Domain-Expert Insights (Track A only)

**1. The public/internal mission split creates two semi-authoritative sources without a change-propagation rule** (fd-product-doctrine-mission). README.md and MISSION.md will diverge under independent editing unless MISSION.md is designated the single canonical source and README.md is explicitly declared a derivative. One line in AGENTS.md/CLAUDE.md suffices.

**2. "Route decisions" in the strategic role layer is the highest-risk capability for plugin/platform inversion** (fd-platform-boundary-strategist). If Nousromancer exposes route decisions that agents then act on, removing or disabling the plugin can break agent workflows. The brief must clarify: displayed for operator action (read-only), or executed by Nousromancer (write). The current text (line 66) is silent.

**3. The V1/demo attention boundary is accepted doctrine stranded in the "Current context" section** (fd-operator-surface-designer). Lines 39–41 are the binding operator UX constraint for PHILOSOPHY.md but are not referenced in the proposed doctrine documents section (lines 72–76). A future agent writing PHILOSOPHY.md from the proposed section will not find them.

**4. "Where" has been silently added to the north-star question** (fd-operator-surface-designer). Line 35 states "which agent / why now / how to answer"; line 65 states "which agent needs judgment, why now, and where/how to answer." Either "where" is a deliberate, meaningful addition (which surface to respond on) or accidental drift. If deliberate, it must be canonized; if not, it must be removed. The brief does not acknowledge the discrepancy.

**5. "Lean" is a social norm, not a structural constraint** (fd-doctrine-bloat-auditor). Without a testable lean definition (maximum section count per document, total reading time, exclusion list), every future agent calibrates "lean" independently. Suggested operationalization: each root-canon document holds at most one section per identity layer; total root-canon reading time is under 10 minutes.

---

## Parallel-Discipline Insights (Track B only)

**1. Feed-promotion rule as layer-assignment mechanism** (fd-broadcast-control-room). The broadcast lens reframes the layer ambiguity as a routing problem with a missing cut-rule. The concrete operational fix: convert the three-layer list (lines 64–67) into a routing table with explicit columns — Output surface / Who sees it / Promotion condition. This is more actionable than a narrative description of layers.

**2. Authority-record vs. local-practice-note separation** (fd-library-catalog-governance). PHILOSOPHY.md must distinguish between permanent constraining principles (authority records: cannot be changed without formal revision) and V1 policy workarounds (local practice notes: expected to rotate). Proposed mechanism: sections labeled [PERMANENT] vs. [V1 POLICY]. Without this label, an agent reading "Possibly waiting hints only" cannot determine whether this is a permanent anti-overclaim principle or a constraint expected to lift when upstream evidence matures.

**3. Authority hierarchy must be stated explicitly before documents are created** (fd-charter-drafting). The brief proposes four documents but assigns no authority levels. The constitutional order needed: MISSION.md > PHILOSOPHY.md > VISION.md > AGENTS.md/CLAUDE.md. Claims in higher-authority documents constrain lower-authority; amendment requires explicit revision of the constraining document. The six constraints (lines 89–96) should be sorted by authority level before being distributed across the spine — constraints 1–3 are constitutional, constraint 4 is bylaw, constraints 5–6 are policy.

**4. Naming-authorization test before Sylveste appears in any public document** (fd-diplomatic-protocol). The question at line 101 ("should the root mission name Sylveste explicitly?") is framed as a preference question. The diplomatic protocol framing converts it to a binary: does Nousromancer have authorization from Sylveste/Intercore to name Sylveste in a public sentence that describes Sylveste's scope or boundary? If authorization is uncertain, use generic form. The verb "operate" in line 67 should be replaced with "represent" — "operate" implies co-sovereign authority; "represent" correctly scopes the liaison mandate.

**5. VISION.md integration milestones imply third-party commitments** (fd-diplomatic-protocol). "Beads / CASS / review/receipt integrations" as milestones in VISION.md read as Nousromancer commitments to achieve integrations that depend on external decisions. The protocol fix: reframe as conditions — "When [external capability] becomes available via Hermes-facing contract, Nousromancer will surface [specific output]." This preserves the directional intent while making external dependency explicit.

---

## Structural Insights (Track C only)

**fd-cartography-projection — Named distortion policy**

Source mechanism: Every cartographic projection must name which spatial property it preserves and which it distorts; distributing a Mercator map with no projection label causes navigational error when readers plan routes on distorted topology.

Mapping: The Nousromancer dashboard preserves routing urgency (which agent, why now, how to answer) and suppresses Sylveste governance depth. This trade-off is encoded implicitly in line 11 and constrained in lines 88–96, but nowhere is it stated as a named, deliberate projection choice.

Doctrine move: Add one datum sentence to PHILOSOPHY.md naming the fixed Sylveste reference artifact that anchors the projection (e.g., the attention-state contract from `nousrmncr-t0q.4`). State that when this datum changes, the projection must be re-evaluated. This is a concrete, testable doctrinal addition.

The equal-area vs. conformal framing (V1 boundary as a scope choice) is the thinnest sub-point — the actual implication is real but the cartographic vocabulary adds little beyond what a plain "stated trade-off" framing gives. The agent acknowledged this.

---

**fd-monastic-scriptorium — Provenance chain and colophon rule**

Source mechanism: Every copy must name its exemplar and close with a colophon declaring scope; a copy that claims authority it did not derive from a named source corrupts later work.

Mapping: The three-tier stack (Sylveste autograph / Nousromancer fair copy / operator surface working copy) maps precisely onto the brief's layer structure. MISSION.md has no provenance statement — it names no upstream Sylveste artifact or contract it derives from. Root-canon documents have no colophon rule — no closing scope boundary telling future agents where canon ends and commentary begins.

Doctrine move: Add a provenance statement to each proposed root-canon document naming the upstream artifact it derives from. Add a colophon rule: each document closes with "This document covers [X]. Operational detail and agent-specific guidance belong in [AGENTS.md / linked bead]." This is the enforcement mechanism that constraint 6 (line 96) describes but does not specify.

This is among the tightest isomorphisms in the batch — 4 of 6 mapping points transfer with structural rigor.

---

**fd-lighthouse-trinity-house — Light-failure protocol**

Source mechanism: A lighthouse that emits stale last-known-good state in a changed channel is more dangerous than darkness; the anti-interpolation rule prohibits inferring safe passage from partial data.

Mapping: The brief's attention-signal doctrine maps directly — the V1 boundary (lines 38–42) is the assigned light characteristic; constraint 4 (line 94) is the anti-interpolation rule. The missing element is the light-failure protocol: what the surface emits when upstream data is absent or stale. This is a currently-absent, concrete doctrine element — not a metaphor for a vague concern.

Doctrine move: Add the three-state light-failure protocol to PHILOSOPHY.md (see P0-A above). Promote the anti-interpolation rule from reviewer constraint to first-class PHILOSOPHY.md principle (see P1-A above).

This lens earned the highest structural transfer of the four Track C agents — 5 of 6 mapping points are genuine structural correspondences.

---

**fd-heraldry-blazon — Tincture-on-tincture finding**

Source mechanism: Heraldic law of tincture prohibits placing a charge on a field of the same tincture because the result cannot be read at distance.

Mapping: The operator role (line 65, synchronous triage) and strategic role (line 66, metaharness for Sylveste/Interverse workflows) use near-identical language, making them indistinguishable to a future agent assigning a new feature to a layer. The anti-bloat / overcrowded-shield sub-point is the weakest transfer — the brief's constraint 6 already names this concern in plain language and the heraldic framing adds vocabulary without analytical depth beyond it. The agent acknowledged this explicitly.

Doctrine move: Differentiate the operator and strategic roles by scope — synchronous judgment vs. asynchronous workflow state. This is actionable and does not require heraldic vocabulary to justify.

---

## Synthesis Assessment

**Overall verdict:** The framing "Nousromancer = Hermes metaharness for Sylveste-grade work, not Sylveste itself" survives review. The layered-identity structure is correct, the boundary aspiration is sound, and the anti-overclaim doctrine is directionally right. The framing does not need to be rejected; it needs to be operationalized — specifically, its implicit choices must be named and its constraints must be placed in the right doctrinal tier before canon documents are written.

**Strongest alternative framing:** fd-diplomatic-protocol surfaced the clearest reframing pressure: change "expose and operate" (line 67) to "expose and represent." The liaison mandate framing — Nousromancer as the Hermes-side representation surface for Sylveste work, not a co-sovereign operator of it — is more precise and closes the seam-creep risk without requiring structural changes to the layer model. If the current framing drifts, this is the fallback.

**Highest-leverage single change:** Promote constraint 4 (line 94, anti-interpolation / anti-overclaim) from reviewer constraint to first-class PHILOSOPHY.md principle, and simultaneously add the three-state light-failure protocol for the absent-data case. These are a single logical move: they complete the attention-signal doctrine. Every other gap (mission sentence, layer boundary, public/private split) can be addressed in the MISSION.md draft stage. The attention-signal doctrine gap is pre-draft — it will be implemented in code before MISSION.md exists, and the wrong default (last-known-good without staleness marker) is already the path of least resistance.

**Surprising cross-track emergent finding:** Three tracks independently converged on the same structural problem from entirely different angles: the brief's constraints are load-bearing but are systematically placed one doctrinal tier too low. Track A noted the refusal clause is in the constraints section, not the mission sentence. Track B (charter) sorted the constraints by constitutional / bylaw / policy and found them mixed. Track C (lighthouse) found the anti-interpolation rule in reviewer constraints rather than philosophy. No single track would have produced the general principle: the brief has correctly identified its constraints but placed them in documents that do not bind future agents. The structural fix is not to rewrite the constraints — it is to promote each constraint to the correct tier before canon documents are written.

**Semantic-distance value check:** Track C earned its place. fd-lighthouse-trinity-house produced the P0-A finding (light-failure protocol) with a specificity and concreteness that Track A missed entirely — Track A's operator-surface-designer noted the V1 boundary was stranded in the wrong section, but did not surface the absent-data case as a distinct gap. fd-monastic-scriptorium produced the colophon rule and provenance-statement additions, which are more precise than Track A's "operationalize lean" recommendation. fd-cartography-projection's datum concept and named-suppression-declaration finding reinforced the Track A refusal-clause finding with a different structural argument, increasing confidence. fd-heraldry-blazon's unique contribution is the tincture-on-tincture finding (operator/strategic role indistinguishability), which Track A circled around (layer overlap risk) but did not articulate as sharply. The anti-bloat sub-point from heraldry was accurately self-assessed as redundant. Track A was necessary but not sufficient; Track C added four concrete doctrine moves that Track A would not have produced.

---

## Suggested Next Artifact Sequence

**First artifact: Mission interview, not mission draft.**

fd-charter-drafting framed this correctly: the proposed next-artifact list (line 104 — mission interview, architecture doc, roadmap, implementation plan) conflates constitutional and policy levels. These are sequential, not alternatives.

The mission interview must come first because two unresolved questions remain that cannot be answered by the review agents: (1) Does Nousromancer have authorization from Sylveste/Intercore to name Sylveste in a public document? (2) What is the fixed Sylveste reference artifact that anchors the projection (the datum)? Both require a cross-boundary conversation, not a doc-writing session.

**Second artifact: Boundary contract / promotion-gate doctrine.** A single-page AGENTS.md stub containing the layer decision table (one row per layer, one "Feature belongs here if:" condition), the light-failure protocol states, and the authority hierarchy (MISSION > PHILOSOPHY > VISION > AGENTS). This document must exist before MISSION.md is written because it encodes the operational rules that MISSION.md's constitutional claims will depend on.

**Third artifact: MISSION.md draft** — written with the refusal clause, suppression declaration, and provenance statement built into the mission sentence from the start.

---

## Reject-the-Framing Test

The metaharness framing would need to be rejected if any of the following conditions held:

**Primary reject condition:** If Nousromancer cannot maintain a stable seam with Sylveste without ongoing renegotiation. The framing presupposes that a Hermes-facing read model of Sylveste state is sufficient — that a projection is useful without write-back authority. If Sylveste workflows consistently require Nousromancer to make writes, route decisions, or governance calls on Sylveste's behalf, the liaison mandate breaks and Nousromancer becomes a co-sovereign. The brief's "route decisions" capability (line 66) is the canary: if it turns out that route decisions must be executed by Nousromancer (not just displayed), the framing is wrong at the seam.

**Secondary reject condition:** If the public-extension identity cannot coexist with the Sylveste-specific operator surface. The brief's constraint 3 (line 93) requires the repo to remain "comprehensible to non-Sylveste users." If the Sylveste-specific operator features require surfacing enough Sylveste vocabulary and governance context to be useful, the public surface becomes either incomprehensible (too much internal vocabulary) or useless (stripped of meaningful signal). This is the dimidiation risk: the public wording cuts out Sylveste; the internal doctrine requires Sylveste; no third position is defined.

**What would have to fail:** The framing survives as long as (a) the Nousromancer/Sylveste seam can be governed by read models and structured artifacts without write-back authority, and (b) the public and internal surfaces can be maintained as genuinely separate legibility layers without one eroding the other. If either condition fails in implementation, the framing needs revision, not the canon spine.
