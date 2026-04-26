/**
 * DTLA Mission Control — Hermes dashboard slot plugin.
 *
 * No build step: this is a plain IIFE that uses the dashboard Plugin SDK.
 * It pairs with theme/dtla.yaml, but degrades safely on any dashboard.
 */
(function () {
  "use strict";

  const SDK = window.__HERMES_PLUGIN_SDK__;
  const PLUGINS = window.__HERMES_PLUGINS__;
  if (!SDK || !PLUGINS || !PLUGINS.registerSlot) return;

  const React = SDK.React;
  const hooks = SDK.hooks || React;
  const useEffect = hooks.useEffect;
  const useState = hooks.useState;
  const api = SDK.api || {};
  const h = React.createElement;
  const NAME = "dtla-mission-control";

  function cssVar(name, fallback) {
    if (typeof document === "undefined") return fallback || "";
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback || "";
  }

  function countPlatforms(status) {
    const platforms = status && status.gateway_platforms ? status.gateway_platforms : {};
    return Object.keys(platforms).length;
  }

  function recentTitle(session) {
    if (!session) return "Untitled session";
    return session.title || session.preview || session.id || "Untitled session";
  }

  function useMissionData() {
    const initial = { status: null, sessions: [], error: null };
    const state = useState(initial);
    const data = state[0];
    const setData = state[1];

    useEffect(function () {
      let cancelled = false;
      function load() {
        const statusPromise = api.getStatus ? api.getStatus() : Promise.resolve(null);
        const sessionsPromise = api.getSessions ? api.getSessions(5) : Promise.resolve({ sessions: [] });
        Promise.all([statusPromise, sessionsPromise])
          .then(function (values) {
            if (cancelled) return;
            const status = values[0];
            const sessionsResponse = values[1] || { sessions: [] };
            setData({
              status: status,
              sessions: Array.isArray(sessionsResponse.sessions) ? sessionsResponse.sessions : [],
              error: null,
            });
          })
          .catch(function (error) {
            if (!cancelled) setData({ status: null, sessions: [], error: error });
          });
      }
      load();
      const id = setInterval(load, 15000);
      return function () {
        cancelled = true;
        clearInterval(id);
      };
    }, []);

    return data;
  }

  function TelemetryBar(props) {
    const label = props.label;
    const value = Math.max(0, Math.min(100, props.value || 0));
    const color = props.color || "#55C7FF";
    return h(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: 5 } },
      h(
        "div",
        { style: { display: "flex", justifyContent: "space-between", fontSize: "0.62rem", letterSpacing: "0.12em", color: "var(--color-muted-foreground)" } },
        h("span", null, label),
        h("span", { style: { color: color, fontWeight: 800 } }, value + "%"),
      ),
      h(
        "div",
        { style: { display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 2 } },
        Array.from({ length: 12 }).map(function (_, i) {
          const filled = Math.ceil((value / 100) * 12) > i;
          return h("span", {
            key: i,
            style: {
              height: 9,
              borderRadius: 2,
              background: filled ? color : "rgba(255,255,255,0.055)",
              boxShadow: filled ? "0 0 9px " + color + "55" : "none",
              clipPath: "polygon(3px 0, 100% 0, calc(100% - 3px) 100%, 0 100%)",
            },
          });
        }),
      ),
    );
  }

  function Field(props) {
    return h(
      "div",
      { style: { display: "flex", justifyContent: "space-between", gap: 8, borderBottom: "1px solid rgba(243,166,200,0.10)", paddingBottom: 5 } },
      h("span", { style: { color: "var(--color-muted-foreground)", fontSize: "0.62rem", letterSpacing: "0.12em" } }, props.label),
      h("span", { style: { color: props.color || "var(--color-card-foreground)", fontSize: "0.68rem", fontWeight: 700, textAlign: "right" } }, props.value),
    );
  }

  function QuickLink(props) {
    return h(
      "a",
      {
        href: props.href,
        style: {
          border: "1px solid rgba(243,166,200,0.22)",
          borderRadius: 10,
          color: "#F6EAF2",
          background: "rgba(243,166,200,0.06)",
          padding: "7px 8px",
          textDecoration: "none",
          fontSize: "0.62rem",
          letterSpacing: "0.09em",
          textTransform: "uppercase",
        },
      },
      props.children,
    );
  }

  function SidebarSlot() {
    const data = useMissionData();
    const status = data.status;
    const sessions = data.sessions || [];
    const gateway = status && status.gateway_running;
    const platformCount = countPlatforms(status);
    const activeSessions = status && typeof status.active_sessions === "number" ? status.active_sessions : sessions.filter(function (s) { return s.is_active; }).length;
    const agentBar = status ? 96 : 38;
    const gatewayBar = gateway ? 92 : 24;
    const sessionBar = Math.min(100, 28 + activeSessions * 18 + sessions.length * 6);
    const hero = cssVar("--theme-asset-hero", "");

    return h(
      "aside",
      {
        className: "dtla-cockpit-only",
        style: {
          padding: "1rem 0.8rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.9rem",
          fontFamily: "var(--theme-font-display, var(--font-sans, sans-serif))",
          textTransform: "uppercase",
        },
      },
      h(
        "div",
        { className: "dtla-hud-card", style: { padding: "0.85rem", display: "flex", flexDirection: "column", gap: "0.8rem", overflow: "hidden", position: "relative" } },
        h("div", { className: "dtla-scanline", style: { position: "absolute", top: 0, left: 0, width: "100%", height: 1 } }),
        h(
          "div",
          { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } },
          h("div", null,
            h("div", { style: { color: "#F3A6C8", fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.08em" }, className: "dtla-neon-text" }, "DTLA"),
            h("div", { style: { color: "var(--color-muted-foreground)", fontSize: "0.58rem", letterSpacing: "0.16em" } }, "mission control"),
          ),
          h("span", { className: "dtla-pulse-dot", title: gateway ? "Gateway online" : "Gateway offline" }),
        ),
        h("div", {
          style: {
            minHeight: 118,
            border: "1px solid rgba(85,199,255,0.18)",
            borderRadius: 12,
            backgroundImage: hero || "radial-gradient(circle at 50% 16%, rgba(85,199,255,0.40), transparent 18%), linear-gradient(150deg, rgba(243,166,200,0.10), rgba(124,92,255,0.18), rgba(5,5,8,0.72))",
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "inset 0 0 38px rgba(5,5,8,0.46)",
          },
          "aria-label": "DTLA neon skyline hero panel",
        }),
        h(Field, { label: "agent", value: status ? "online" : "probing", color: status ? "#7EE0B5" : "#C6A0FF" }),
        h(Field, { label: "version", value: status && status.version ? status.version : "unknown" }),
        h(Field, { label: "sessions", value: String(activeSessions), color: "#55C7FF" }),
        h(Field, { label: "platforms", value: String(platformCount), color: platformCount ? "#F3A6C8" : "#B89AA6" }),
        h(TelemetryBar, { label: "agent signal", value: agentBar, color: "#F3A6C8" }),
        h(TelemetryBar, { label: "gateway relay", value: gatewayBar, color: "#55C7FF" }),
        h(TelemetryBar, { label: "session heat", value: sessionBar, color: "#7C5CFF" }),
      ),
      h(
        "div",
        { className: "dtla-hud-card dtla-link-grid", style: { padding: "0.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 } },
        h(QuickLink, { href: "/sessions" }, "Sessions"),
        h(QuickLink, { href: "/logs" }, "Logs"),
        h(QuickLink, { href: "/config" }, "Config"),
        h(QuickLink, { href: "/skills" }, "Skills"),
      ),
      h(
        "div",
        { className: "dtla-hud-card", style: { padding: "0.75rem", display: "flex", flexDirection: "column", gap: 8 } },
        h("div", { style: { color: "#55C7FF", fontWeight: 800, fontSize: "0.68rem", letterSpacing: "0.12em" } }, "recent radar"),
        sessions.slice(0, 3).map(function (session) {
          return h(
            "div",
            { key: session.id || recentTitle(session), style: { fontSize: "0.60rem", lineHeight: 1.35, color: "var(--color-muted-foreground)", borderTop: "1px solid rgba(85,199,255,0.10)", paddingTop: 6 } },
            recentTitle(session).slice(0, 80),
          );
        }),
        sessions.length ? null : h("div", { style: { color: "var(--color-muted-foreground)", fontSize: "0.60rem" } }, data.error ? "Status API unavailable" : "No recent sessions yet"),
      ),
    );
  }

  function HeaderCrestSlot() {
    return h(
      "div",
      { className: "dtla-cockpit-only", style: { display: "flex", alignItems: "center", gap: 8, paddingLeft: 10, color: "#F3A6C8" } },
      h("svg", { width: 30, height: 30, viewBox: "0 0 30 30", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true },
        h("path", { d: "M15 2 L27 15 L15 28 L3 15 Z" }),
        h("path", { d: "M15 7 L23 15 L15 23 L7 15 Z", stroke: "#55C7FF" }),
        h("circle", { cx: 15, cy: 15, r: 2.6, fill: "currentColor", stroke: "none" }),
      ),
      h("span", { className: "dtla-neon-text", style: { fontWeight: 800, fontSize: "0.76rem", letterSpacing: "0.18em" } }, "DTLA"),
    );
  }

  function HeaderRightSlot() {
    return h(
      "div",
      { className: "dtla-cockpit-only", style: { display: "flex", alignItems: "center", gap: 7, marginRight: 8, border: "1px solid rgba(85,199,255,0.26)", borderRadius: 999, padding: "5px 9px", background: "rgba(85,199,255,0.07)", color: "#55C7FF", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase" } },
      h("span", { className: "dtla-pulse-dot", style: { width: 6, height: 6 } }),
      "night ops",
    );
  }

  function FooterRightSlot() {
    return h(
      "span",
      { className: "dtla-cockpit-only dtla-neon-text", style: { fontFamily: "var(--theme-font-mono, ui-monospace, monospace)", fontSize: "0.62rem", letterSpacing: "0.16em", color: "#B89AA6", textTransform: "uppercase" } },
      "DTLA / Hermes Hackathon / OpenRouter orbit",
    );
  }

  function PreMainSlot() {
    const data = useMissionData();
    const status = data.status;
    const sessions = data.sessions || [];
    const count = status && typeof status.active_sessions === "number" ? status.active_sessions : 0;
    const gateway = status && status.gateway_running ? "online" : "offline";
    return h(
      "div",
      { className: "dtla-cockpit-only dtla-hud-card", style: { marginBottom: "1rem", padding: "0.85rem 1rem", display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) repeat(3, auto)", alignItems: "center", gap: "1rem" } },
      h("div", null,
        h("div", { style: { color: "#F3A6C8", fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase" } }, "DTLA mission deck"),
        h("div", { style: { color: "var(--color-muted-foreground)", fontSize: "0.78rem" } }, "Live dashboard signal from Hermes status + recent sessions APIs."),
      ),
      h("div", { style: { textAlign: "right" } },
        h("div", { style: { color: "#55C7FF", fontWeight: 800, fontSize: "1.15rem" } }, String(count)),
        h("div", { style: { color: "var(--color-muted-foreground)", fontSize: "0.58rem", letterSpacing: "0.12em" } }, "active"),
      ),
      h("div", { style: { textAlign: "right" } },
        h("div", { style: { color: gateway === "online" ? "#7EE0B5" : "#C6A0FF", fontWeight: 800, fontSize: "0.82rem", textTransform: "uppercase" } }, gateway),
        h("div", { style: { color: "var(--color-muted-foreground)", fontSize: "0.58rem", letterSpacing: "0.12em" } }, "gateway"),
      ),
      h("div", { style: { color: "#B89AA6", fontSize: "0.68rem", maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, sessions.length ? recentTitle(sessions[0]) : "No recent session signal"),
    );
  }

  function HiddenPage() {
    return h(
      "div",
      { className: "dtla-hud-card", style: { margin: "2rem", padding: "1rem", color: "var(--color-card-foreground)" } },
      "DTLA Mission Control is a slot-only plugin. Enable the DTLA dashboard theme to see the cockpit sidebar, header crest, footer line, and sessions radar.",
    );
  }

  PLUGINS.register(NAME, HiddenPage);
  PLUGINS.registerSlot(NAME, "sidebar", SidebarSlot);
  PLUGINS.registerSlot(NAME, "pre-main", PreMainSlot);
  PLUGINS.registerSlot(NAME, "header-left", HeaderCrestSlot);
  PLUGINS.registerSlot(NAME, "header-right", HeaderRightSlot);
})();
