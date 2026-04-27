/**
 * Nousromancer Mission Control — Hermes dashboard slot plugin.
 *
 * No build step: this is a plain IIFE that uses the dashboard Plugin SDK.
 * It pairs with theme/nousromancer.yaml, but degrades safely on any dashboard.
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
  const NAME = "nousromancer-mission-control";

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

  function HeaderCrestSlot() {
    return h(
      "div",
      { className: "nousromancer-surface", style: { display: "flex", alignItems: "center", gap: 8, paddingLeft: 10, color: "#D8A6BA" } },
      h("svg", { width: 30, height: 30, viewBox: "0 0 30 30", fill: "none", stroke: "currentColor", strokeWidth: 1.6, "aria-hidden": true },
        h("path", { d: "M15 2 L27 15 L15 28 L3 15 Z" }),
        h("path", { d: "M15 7 L23 15 L15 23 L7 15 Z", stroke: "#8EA0A8" }),
        h("circle", { cx: 15, cy: 15, r: 2.6, fill: "currentColor", stroke: "none" }),
      ),
      h("span", { className: "nousromancer-mark", style: { fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.18em" } }, "Nousromancer"),
    );
  }

  function HeaderRightSlot() {
    return h(
      "div",
      { className: "nousromancer-surface", style: { display: "flex", alignItems: "center", gap: 7, marginRight: 8, border: "1px solid rgba(232,232,226,0.14)", borderRadius: 999, padding: "5px 9px", background: "rgba(232,232,226,0.035)", color: "#8EA0A8", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase" } },
      h("span", { className: "nousromancer-pulse-dot", style: { width: 6, height: 6 } }),
      "night ops",
    );
  }

  function FooterRightSlot() {
    return h(
      "span",
      { className: "nousromancer-surface nousromancer-neon-text", style: { fontFamily: "var(--theme-font-mono, ui-monospace, monospace)", fontSize: "0.62rem", letterSpacing: "0.16em", color: "#B89AA6", textTransform: "uppercase" } },
      "Nousromancer / Hermes Hackathon / OpenRouter orbit",
    );
  }

  function isGatewayLive(status) {
    if (!status) return false;
    return status.gateway_running === true || status.gateway_online === true;
  }

  function activeSessionCount(status, sessions) {
    if (status && typeof status.active_sessions === "number") return status.active_sessions;
    if (Array.isArray(status && status.active_sessions)) return status.active_sessions.length;
    return (sessions || []).filter(function (session) { return session && session.is_active; }).length;
  }

  const SESSION_SOURCES = ["cli", "telegram", "discord", "slack", "whatsapp", "cron", "local"];

  function sessionSource(text) {
    const normalized = String(text || "").trim().toLowerCase();
    if (normalized.indexOf("src:") === 0) return normalized.slice(4).trim();
    return SESSION_SOURCES.indexOf(normalized) >= 0 ? normalized : null;
  }

  function polishSessionsDom() {
    if (typeof document === "undefined") return;

    const searchInput =
      document.querySelector('main input[data-nousromancer-search-polished="true"]') ||
      document.querySelector('main input[placeholder="Search message content..."]');
    if (searchInput) {
      searchInput.placeholder = "Search session text";
      searchInput.dataset.nousromancerSearchPolished = "true";
      searchInput.setAttribute("aria-label", "Search across session messages");
      searchInput.setAttribute("title", "Search across session messages");
    }

    const deleteButtons = document.querySelectorAll('main button[aria-label="Delete session"]');
    deleteButtons.forEach(function (button) {
      button.dataset.nousromancerDangerAction = "delete";
      button.setAttribute("title", "Delete session");

      const rail = button.parentElement;
      if (!rail || !rail.querySelector) return;
      const sourceBadge = rail.querySelector('[data-nousromancer-source-chip="true"], .inline-flex.items-center.border');
      const source = sessionSource(sourceBadge && (sourceBadge.dataset.nousromancerSourceOriginal || sourceBadge.textContent));
      if (!source) return;

      sourceBadge.dataset.nousromancerSourceOriginal = source;
      sourceBadge.dataset.nousromancerSourceChip = "true";
      sourceBadge.textContent = "src:" + source;
      sourceBadge.setAttribute("aria-label", "Session source: " + source);
      sourceBadge.setAttribute("title", "Session source: " + source);
    });
  }

  function useSessionListPolish() {
    useEffect(function () {
      polishSessionsDom();
      const Observer = typeof MutationObserver !== "undefined" ? MutationObserver : window.MutationObserver;
      if (!Observer || typeof document === "undefined" || !document.body) return undefined;
      const observer = new Observer(polishSessionsDom);
      observer.observe(document.body, { childList: true, subtree: true });
      return function () {
        observer.disconnect();
      };
    }, []);
  }

  function NowItem(props) {
    return h(
      "span",
      { className: props.tone ? "nousromancer-now-item nousromancer-now-item--" + props.tone : "nousromancer-now-item" },
      props.children,
    );
  }

  function NowAction(props) {
    return h(
      "a",
      { className: "nousromancer-now-action", href: props.href },
      props.children,
    );
  }

  function PreMainSlot() {
    useSessionListPolish();
    const data = useMissionData();
    const status = data.status;
    const sessions = data.sessions || [];
    const count = activeSessionCount(status, sessions);
    const gatewayLive = isGatewayLive(status);
    const latest = sessions[0];
    const latestTitle = sessions.length ? recentTitle(latest).slice(0, 72) : "No recent trace";
    const actionHref = gatewayLive ? "/sessions" : "/logs";
    const actionLabel = gatewayLive ? "Trace" : "Open logs";

    return h(
      "div",
      { className: "nousromancer-surface nousromancer-hud-card nousromancer-now-bar" },
      h("div", { className: "nousromancer-now-label" }, "Now"),
      h(NowItem, { tone: gatewayLive ? "live" : "warn" }, gatewayLive ? "Gateway live" : "Gateway offline"),
      h(NowItem, { tone: count ? "active" : "muted" }, count + " active"),
      h("span", { className: "nousromancer-now-trace", title: latestTitle }, "Last trace: ", latestTitle),
      h(NowAction, { href: actionHref }, actionLabel, " →"),
    );
  }

  function HiddenPage() {
    return h(
      "div",
      { className: "nousromancer-hud-card", style: { margin: "2rem", padding: "1rem", color: "var(--color-card-foreground)" } },
      "Nousromancer Mission Control is a slot-only plugin. Enable the Nousromancer dashboard theme to see the persistent Now Bar, header crest, and night-ops status pill.",
    );
  }

  PLUGINS.register(NAME, HiddenPage);
  PLUGINS.registerSlot(NAME, "pre-main", PreMainSlot);
  PLUGINS.registerSlot(NAME, "header-left", HeaderCrestSlot);
  PLUGINS.registerSlot(NAME, "header-right", HeaderRightSlot);
})();
