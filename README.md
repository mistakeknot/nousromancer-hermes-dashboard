# Nousromancer Hermes Dashboard

Nousromancer helps Hermes operators resume live agent work after interruptions: it turns runtime and session data into truthful orientation, conservative attention hints, and safe next-action affordances. When an operator returns from Discord, CLI, cron, browser work, or a parallel agent lane, the dashboard should make it easier to see what is alive, what changed, what may need human judgment, and where to inspect or respond without inventing priority or routing authority.

The public package is also a minimal noir operations skin for Hermes Agent: a black technical ledger with ACRONYM-like labeling discipline, Veilance restraint, mono metadata, readable sans content, thin rules, and operational color only where state matters. It includes both hackathon tracks:

- Theme: `theme/nousromancer.yaml`
- Plugin: `plugins/nousromancer-mission-control/`

The theme keeps the dashboard in the standard layout to avoid sidebar collisions with other installed plugins. The companion plugin adds a persistent Now Bar above every page: gateway health, active runs, latest trace, latest session source, data freshness, explicit Hermes session attention evidence when available, conservative `Possibly waiting` fallback hints, and the next useful action in one restrained strip. It distinguishes live gateway, stale refresh, API-error states, source context such as `src:discord`, evidence-backed attention contract signals, assistant-question fallback hints, and session error/stall evidence in text instead of color alone. On Sessions rows with stable session IDs, the plugin also adds quiet `attn:*` metadata and a bounded `Respond →` / `Inspect →` affordance only when explicit actionable contract evidence includes a safe dashboard-local `response_target.path`; hedged `possibly_waiting` row metadata stays non-actionable. It also adds a small header crest and night-ops status pill.

## Install

```bash
git clone https://github.com/mistakeknot/nousromancer.git
cd nousromancer
./scripts/install.sh
hermes dashboard
```

Then open the dashboard, click the palette icon, and select `Nousromancer`.

If the dashboard is already running, force plugin discovery without restart:

```bash
curl --max-time 3 -fsS http://127.0.0.1:9119/api/dashboard/plugins/rescan
```

## Manual install

```bash
mkdir -p ~/.hermes/dashboard-themes ~/.hermes/plugins
cp theme/nousromancer.yaml ~/.hermes/dashboard-themes/nousromancer.yaml
cp -R plugins/nousromancer-mission-control ~/.hermes/plugins/nousromancer-mission-control
```

Refresh `hermes dashboard`, select `Nousromancer`, and the Now Bar appears above each page.

## What it demonstrates

- A first-use product wedge: interruption recovery for Hermes operators returning to live multi-surface agent work.
- A full dashboard theme using palette, typography, standard layout, restrained component chrome, color overrides, and custom CSS.
- A no-build dashboard plugin using `window.__HERMES_PLUGIN_SDK__`.
- Slot injection into `pre-main`, `header-left`, and `header-right`.
- A persistent Now Bar that keeps gateway health, active runs, latest trace, latest session source, data freshness, API-error state, explicit Hermes attention contract evidence, conservative `Possibly waiting` fallback hints, and the next useful action visible across routes.
- Session-list polish that clarifies search copy, marks source chips and explicit attention context as quiet metadata, adds safe row-level `Respond →` / `Inspect →` affordances from actionable `response_target.path` contracts, and demotes delete controls until intent.
- Conservative attention-hint infrastructure that prefers explicit upstream `attention_state` / `attention_reason` / `response_target` / `attention_evidence` fields, falls back to assistant question-like turns and session error/stall evidence, and preserves the no-authoritative-priority copy boundary.
- Live data from `SDK.api.getStatus()` and `SDK.api.getSessions()`.
- Theme/plugin composition without forking Hermes or running an npm build.
## Files

```text
theme/nousromancer.yaml
plugins/nousromancer-mission-control/dashboard/manifest.json
plugins/nousromancer-mission-control/dashboard/dist/index.js
plugins/nousromancer-mission-control/dashboard/dist/style.css
scripts/install.sh
```

## Project docs

- `MISSION.md`, `PHILOSOPHY.md`, `VISION.md` — root project canon.
- `AGENTS.md`, `CLAUDE.md` — agent operating guidance.
- `docs/architecture.md` — theme/plugin/data-flow boundaries.
- `docs/functionality-data-contract.md` — Hermes dashboard fields and attention-signal boundaries.
- `docs/canon/public-private-operator-context-boundary.md` — public/private operator-context field boundary.
- `docs/canon/workstream-evidence-strip-contract.md` — boundary-safe future workstream evidence pattern.
- `docs/roadmap.md` — post-hackathon product sequence.
- `docs/cujs/operator-reorientation.md` — primary operator journey.
- `docs/canon/doc-structure.md` — where project doctrine belongs.
- `docs/glossary.md` — ecosystem terms for non-local readers.

## Screenshots

![Nousromancer Status dashboard](screenshots/nousromancer-dashboard-status.png)

![Nousromancer Analytics dashboard](screenshots/nousromancer-dashboard-analytics.png)

## License

MIT
