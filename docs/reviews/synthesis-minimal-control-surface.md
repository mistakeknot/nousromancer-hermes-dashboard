# Nousromancer Review Synthesis — Hackathon Winning Direction

Sources:

- `docs/design-direction-minimal-control-surface.md`
- `docs/reviews/claude-code-minimal-control-surface.md`
- `docs/reviews/oracle-minimal-control-surface.md`

## Consensus verdict

The minimal-control-surface pivot is correct, but it only wins if the plugin is **operationally alive**, not merely tasteful.

Both reviews converge on the same point:

> The Now Bar is the submission.

The dark theme is necessary for first impression, but the winning “awesome + useful” move is a persistent, Hermes-specific status/action strip that follows users across the dashboard.

## Strongest claim

> Hermes users should not hunt across pages to know what their agent is doing.

Nousromancer should solve that with a small persistent surface showing:

- gateway health;
- active run/session state;
- latest trace/session context;
- relevant warning or freshness state;
- one next action.

## What makes it novel for Hermes

A generic dark dashboard status bar is not enough. Nousromancer becomes Hermes-native when it understands agent-operation pain:

- session resumption friction;
- gateway/log/config fragmentation;
- stale status uncertainty;
- background/cron visibility;
- warning-to-action routing;
- screenshot-safe redaction;
- live run awareness.

The novel idea is:

> Make live agent state persistent across the dashboard instead of trapping it inside individual pages.

## Signature demo moment

The demo should show one clear live state transition.

Ideal sequence:

1. Dashboard opens in restrained Nousromancer black-glass theme.
2. Now Bar shows healthy state:
   ```text
   Gateway live · 1 active · Running: Build Nousromancer plugin · Trace →
   ```
3. User navigates to another page; Now Bar remains visible.
4. A failure/degraded mock state appears:
   ```text
   Gateway degraded · Last trace failed 2m ago · Open logs →
   ```
5. User clicks the action and lands on the relevant dashboard page.

This demonstrates theme, plugin slots, live data, persistence, and practical agent UX in under 30 seconds.

## Implementation implications

### Keep

- restrained black-glass palette;
- pink/blue/violet signal colors;
- terse copy;
- hidden slot-only plugin shape;
- `pre-main` Now Bar;
- tiny header identity/status;
- quiet cockpit/sidebar support.

### Cut or reduce

- decorative skyline overlays;
- heavy scanlines;
- verbose mission-deck language;
- decorative telemetry without real state;
- big sidebar hero panel;
- route aliases as primary labels;
- hackathon/OpenRouter copy inside the dashboard UI.

### Add

A concrete Now Bar state model:

```text
Gateway: live / degraded / offline / unknown / stale
Agent: idle / running / blocked / failed
Sessions: active count + most recent
Trace: latest trace/session title + status + timestamp
Cron: next run or last failure
Config: healthy / warning
Action: trace / logs / config / vault / resume
```

Clickable behavior:

```text
Gateway pill → status/logs
Active count → active sessions
Latest trace → exact session/trace if available
Logs CTA → logs page, ideally filtered by recent failure
Config/Vault warning → config or keys page
Cron warning → cron page
```

Demo states:

```text
Healthy
Running
Gateway offline
Missing key
Trace failed
Cron failed
Stale status
```

Acceptance criteria:

- no secrets or raw env values displayed;
- warning state uses text labels, not color alone;
- status includes freshness/staleness;
- Now Bar works across main dashboard routes;
- empty/loading/error states are designed;
- reduced-motion mode is respected;
- polling is bounded and does not spam APIs.

## Submission copy

Fast version:

> Nousromancer turns Hermes into a calm ops console: live gateway, active runs, last trace, and logs on every page.

More explicit version:

> Hermes users should not hunt across pages to know what their agent is doing. Nousromancer adds a persistent Now Bar that shows gateway health, active runs, latest trace, and the next useful action from every dashboard route.

Technical proof line:

> Built as a Hermes dashboard theme plus no-build slot plugin using the Plugin SDK: `header-left`, `header-right`, `pre-main`, and cockpit/sidebar surfaces.

## Next build target

Refactor the existing Nousromancer Mission Deck into a minimal live Now Bar and make the screenshot/demo center that single interaction.

Priority order:

1. Now Bar with real/mocked live state.
2. Clickable action routing to Sessions/Logs/Config/Cron.
3. Minimal theme polish: less glow, more contrast, cleaner spacing.
4. Header pill and crest refinement.
5. Quiet sidebar only if it strengthens the screenshot.
6. README update with GIF/screenshot and 10-second usefulness claim.
