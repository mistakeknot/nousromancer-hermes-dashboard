# Nousromancer Hermes Dashboard

Nousromancer is a minimal noir operations skin for Hermes Agent: a black technical ledger with ACRONYM-like labeling discipline, Veilance restraint, mono metadata, readable sans content, thin rules, and operational color only where state matters. It includes both hackathon tracks:

- Theme: `theme/nousromancer.yaml`
- Plugin: `plugins/nousromancer-mission-control/`

The theme keeps the dashboard in the standard layout to avoid sidebar collisions with other installed plugins. The companion plugin adds a persistent Now Bar above every page: gateway health, active runs, latest trace, latest session source, data freshness, explicit Hermes session attention evidence when available, conservative `Possibly waiting` fallback hints, and the next useful action in one restrained strip. It distinguishes live gateway, stale refresh, API-error states, source context such as `src:discord`, evidence-backed attention contract signals, assistant-question fallback hints, and session error/stall evidence in text instead of color alone. It also adds a small header crest and night-ops status pill.

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

- A full dashboard theme using palette, typography, standard layout, restrained component chrome, color overrides, and custom CSS.
- A no-build dashboard plugin using `window.__HERMES_PLUGIN_SDK__`.
- Slot injection into `pre-main`, `header-left`, and `header-right`.
- A persistent Now Bar that keeps gateway health, active runs, latest trace, latest session source, data freshness, API-error state, explicit Hermes attention contract evidence, conservative `Possibly waiting` fallback hints, and the next useful action visible across routes.
- Session-list polish that clarifies search copy, marks source chips and explicit attention context as quiet metadata, and demotes delete controls until intent.
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

## Screenshots

![Nousromancer Status dashboard](screenshots/nousromancer-dashboard-status.png)

![Nousromancer Analytics dashboard](screenshots/nousromancer-dashboard-analytics.png)

## License

MIT
