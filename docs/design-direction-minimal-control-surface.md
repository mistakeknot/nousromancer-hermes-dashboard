# Nousromancer Design Direction — Minimal Control Surface

Status: working design brief for hackathon refinement.

## Core question

For the Hermes Dashboard hackathon, “most awesome and useful” should not mean maximal neon or dense sci-fi HUD chrome.

In the context of Hermes Agent, the stronger interpretation is:

> Make Hermes feel like a precise instrument, not a toy cockpit.

Nousromancer should be minimal, tasteful, and immediately useful.

## Working thesis

> Nousromancer is a minimal night-mode operations skin for Hermes Agent: a calmer, sharper dashboard that keeps live agent state visible without getting in the way.

Shorter:

> A noir control surface for local agents.

## What “awesome” means here

Awesome should mean:

- the dashboard feels meaningfully transformed without feeling gimmicky;
- the theme has taste and restraint;
- the extension system feels powerful because the change is coherent;
- the user can imagine keeping it installed after the hackathon;
- the plugin feels like a clean reference implementation, not a novelty widget.

The desired reaction:

> I didn’t know the Hermes dashboard could feel this different — and I would actually use this.

## What “useful” means here

Hermes users need fast orientation:

- Is my agent alive?
- Is the gateway alive?
- What was I just doing?
- What should I resume?
- Are logs/config/skills one click away?
- Is there a warning I should act on?

Nousromancer should add orientation, not lore.

## Design mantra

> Less cockpit. More control surface.

## Utility mantra

> Always show what Hermes is doing now.

## Visual system: black glass, three signals

The visual direction should be restrained:

- near-black glass base;
- quiet panels;
- generous negative space;
- thin borders;
- low visual noise;
- rare, meaningful color.

### Signal colors

| Color | Use |
| --- | --- |
| Millennial pink | identity, selected state, primary accent |
| Electric blue | live signal, links, active information |
| Violet | depth, ambient glow, focus |
| Amber / red-pink | warning and offline states only |

Suggested visual ratio:

```text
82% black / charcoal
10% off-white / muted text
4% pink
3% blue
1% warning color
```

Warnings should be rare enough to matter.

## Copy principle

Cut copy hard.

Prefer one- or two-word operational labels:

```text
Now
Live
Offline
Recent
Trace
Resume
Gateway
Sessions
Logs
Config
Skills
```

Avoid long all-caps explanatory strings in the UI.

### Replace verbose mission copy

Instead of:

```text
Nousromancer MISSION DECK
LIVE DASHBOARD SIGNAL FROM HERMES STATUS + RECENT SESSIONS APIS.
```

Use something closer to:

```text
Now
Gateway offline · 0 active · Last trace: Uploading Nousromancer Skin Theme
```

or:

```text
Night Ops
Offline gateway · 0 active sessions · last trace 1h ago
```

The README and submission can explain the concept. The UI should stay terse.

## Plugin shape: the Now Bar

The highest-value minimal plugin is a persistent **Now Bar** above every page.

Example:

```text
Nousromancer   Gateway offline   0 active   Last trace: Uploading Nousromancer Skin Theme   Logs →
```

This is useful because it gives persistent orientation everywhere.

It is awesome because it demonstrates slot injection cleanly and tastefully.

### Route-aware microcopy

The Now Bar may use one short route label:

| Route | Label |
| --- | --- |
| Sessions | Traces |
| Analytics | Heat |
| Logs | Tape |
| Cron | Timers |
| Skills | Kit |
| Config | Controls |
| Keys / Env | Vault |

Keep this as a small label, not a sentence.

## Sidebar direction

The cockpit sidebar should be quieter.

Target shape:

```text
Nousromancer
● live/offline

Gateway
Sessions
Last trace

Quick
Logs
Config
Skills
```

Avoid a huge hero panel unless it carries real operational information.

If telemetry bars remain, limit them to two or three:

- Agent
- Gateway
- Sessions

Even those should be subtle.

## Slot strategy

A slot-only plugin is stronger than a novelty tab.

Recommended slots:

- `header-left`: tiny Nousromancer crest/wordmark.
- `header-right`: one compact status pill.
- `pre-main`: Now Bar.
- `sidebar`: quiet cockpit index when cockpit layout is active.

This says:

> The plugin improves the dashboard itself instead of making users visit a toy page.

## Things to reduce or remove

Reduce:

- big decorative skyline overlays;
- heavy scanlines;
- verbose mission copy;
- excessive glow;
- too many bordered boxes;
- huge sidebar hero panel;
- all-caps paragraphs;
- hackathon/OpenRouter copy inside the product UI.

The submission docs can mention hackathon context. The dashboard should feel like something a Hermes user would keep.

## Design references, filtered

Good references:

- Linear-style restraint;
- Panic Nova / Transmit taste;
- Arc Browser dark glass;
- LA at 1:17am after rain;
- hotel security desk monitor;
- downtown parking garage elevator panel;
- black Mercedes dashboard at night;
- boutique terminal emulator.

Avoid generic “Blade Runner HUD” maximalism.

## Desired screenshot

The ideal screenshot should communicate in two seconds:

1. beautiful skin;
2. not noisy;
3. live operational value;
4. practical dashboard improvement.

Target composition:

```text
Sidebar:
HERMES
AGENT

Nousromancer
Sessions
Analytics
Logs
Cron
Skills
Config

Bottom:
● Gateway offline
v0.11.0

Main:
Sessions

[ Nousromancer | Gateway offline | 0 active | Last trace: Uploading Nousromancer Skin Theme | Logs → ]

Recent Sessions
[clean cards...]
```

## Refined pitch

> Nousromancer is a minimal noir operations skin for Hermes Dashboard. It uses a restrained black-glass palette with pink, blue, and violet signal colors, plus a no-build plugin that adds a persistent Now Bar: gateway state, active sessions, last trace, and quick navigation. It demonstrates dashboard themes and slots without turning the dashboard into a novelty UI.

## Evaluation hypothesis

A winning Nousromancer submission should be judged as:

- more tasteful than a typical hackathon theme;
- more useful than a decorative reskin;
- more reusable than a one-off demo;
- a strong reference example for Hermes dashboard extensibility.

The project should optimize for the reaction:

> This is small, polished, and obviously useful. I want this as my dashboard skin.
