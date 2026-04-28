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
    const initial = { status: null, sessions: [], error: null, refreshedAt: null };
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
              refreshedAt: new Date().toISOString(),
            });
          })
          .catch(function (error) {
            if (cancelled) return;
            setData(function (previous) {
              previous = previous || initial;
              return {
                status: previous.status,
                sessions: Array.isArray(previous.sessions) ? previous.sessions : [],
                error: error,
                refreshedAt: previous.refreshedAt || null,
              };
            });
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

  function errorMessage(error) {
    if (!error) return "";
    if (error.message) return String(error.message);
    return String(error);
  }

  function formatAge(minutes) {
    if (minutes < 1) return "now";
    if (minutes < 60) return minutes + "m";
    return Math.floor(minutes / 60) + "h";
  }

  function freshnessState(refreshedAt, nowMs) {
    if (!refreshedAt) return { label: "No refresh", tone: "muted" };
    const refreshedMs = Date.parse(refreshedAt);
    if (!Number.isFinite(refreshedMs)) return { label: "No refresh", tone: "muted" };
    const currentMs = typeof nowMs === "number" ? nowMs : Date.now();
    const ageMinutes = Math.max(0, Math.floor((currentMs - refreshedMs) / 60000));
    const stale = ageMinutes >= 10;
    return {
      label: (stale ? "Stale " : "Updated ") + formatAge(ageMinutes),
      tone: stale ? "warn" : "muted",
    };
  }

  const ASSISTANT_ROLES = ["assistant", "agent", "ai", "model"];
  const ERROR_OR_STALL_STATES = ["blocked", "degraded", "error", "failed", "failure", "interrupted", "stale", "stalled", "waiting"];

  function compactText(value) {
    if (value == null) return "";
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value).trim();
    if (Array.isArray(value)) {
      return value.map(function (item) { return compactText(item); }).filter(Boolean).join(" ").trim();
    }
    if (typeof value === "object") {
      return compactText(value.text || value.content || value.message || value.value || value.role || value.name || value.title || value.preview || "");
    }
    return "";
  }

  function firstTextField(object, fields) {
    if (!object) return "";
    for (let i = 0; i < fields.length; i += 1) {
      const text = compactText(object[fields[i]]);
      if (text) return text;
    }
    return "";
  }

  function roleName(message) {
    if (!message) return "";
    if (typeof message === "string") return "";
    return firstTextField(message, ["role", "sender", "author", "speaker", "type"]).toLowerCase();
  }

  function messageText(message) {
    if (!message) return "";
    if (typeof message === "string") return message.trim();
    return firstTextField(message, ["content", "text", "message", "body", "summary", "preview", "title"]);
  }

  function latestMeaningfulMessage(session) {
    if (!session) return null;
    const messageFields = ["messages", "recent_messages", "recentMessages", "turns", "conversation", "events"];
    for (let i = 0; i < messageFields.length; i += 1) {
      const value = session[messageFields[i]];
      if (!Array.isArray(value)) continue;
      for (let j = value.length - 1; j >= 0; j -= 1) {
        const candidate = value[j];
        if (messageText(candidate) || roleName(candidate)) return candidate;
      }
    }
    const fallbackRole = firstTextField(session, ["last_message_role", "lastMessageRole", "latest_role", "latestRole", "last_role"]);
    const fallbackText = firstTextField(session, ["last_message", "lastMessage", "latest_message", "latestMessage", "latest_text", "latestText", "preview"]);
    if (fallbackRole || fallbackText) return { role: fallbackRole, content: fallbackText };
    return null;
  }

  function looksQuestionLike(text) {
    const normalized = String(text || "").toLowerCase();
    if (!normalized) return false;
    return /\?/.test(normalized) || /\b(should i|should we|shall i|shall we|do you want|would you like|want me to|can i|may i|which|choose|pick|approve|confirm|decision|decide|waiting for approval)\b/.test(normalized);
  }

  function sessionErrorOrStallEvidence(session) {
    if (!session) return null;
    if (session.waiting_on_human === true || session.waitingOnHuman === true || session.requires_action === true || session.requiresAction === true) {
      return "explicit attention field present";
    }
    const attentionState = firstTextField(session, ["attention_state", "attentionState"]);
    if (/waiting|blocked|requires|attention/.test(attentionState.toLowerCase())) return "attention state: " + attentionState;
    const stateText = firstTextField(session, ["status", "state", "phase", "lifecycle"]);
    const normalizedState = stateText.toLowerCase();
    if (ERROR_OR_STALL_STATES.some(function (state) { return normalizedState.indexOf(state) >= 0; })) return "session state: " + stateText;
    const errorText = firstTextField(session, ["error", "last_error", "lastError", "error_message", "errorMessage", "failure", "failureReason", "blocked_reason", "blockedReason"]);
    if (errorText) return "session error/stall evidence";
    if (Array.isArray(session.failed_tools) && session.failed_tools.length) return "failed tool evidence";
    if (Array.isArray(session.failedTools) && session.failedTools.length) return "failed tool evidence";
    return null;
  }

  function sessionMessageAttentionEvidence(session) {
    const latest = latestMeaningfulMessage(session);
    if (!latest) return null;
    const role = roleName(latest);
    const text = messageText(latest);
    const assistantLike = ASSISTANT_ROLES.indexOf(role) >= 0;
    if (assistantLike && looksQuestionLike(text)) return "assistant question-like turn";
    return null;
  }

  function possibleAttentionHint(sessions) {
    const list = Array.isArray(sessions) ? sessions : [];
    for (let i = 0; i < list.length; i += 1) {
      const evidence = sessionErrorOrStallEvidence(list[i]) || sessionMessageAttentionEvidence(list[i]);
      if (evidence) {
        const title = recentTitle(list[i]);
        return {
          label: "Possibly waiting",
          tone: "attention",
          title: "Hedged attention hint: " + evidence + " in " + title + ". Not an authoritative priority signal.",
        };
      }
    }
    return null;
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
      {
        className: props.tone ? "nousromancer-now-item nousromancer-now-item--" + props.tone : "nousromancer-now-item",
        title: props.title,
      },
      props.children,
    );
  }

  function NowAction(props) {
    return h(
      "a",
      { className: "nousromancer-now-action", href: props.href, title: props.title, "aria-label": props.title },
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
    const apiError = data.error ? errorMessage(data.error) : "";
    const hasApiError = Boolean(apiError);
    const freshness = freshnessState(data.refreshedAt, data.nowMs);
    const attentionHint = possibleAttentionHint(sessions);
    const actionHref = gatewayLive && !hasApiError ? "/sessions" : "/logs";
    const actionLabel = gatewayLive && !hasApiError ? "Trace" : "Open logs";
    const actionTitle = hasApiError
      ? "Dashboard API error: " + apiError
      : gatewayLive
        ? "Open recent Hermes sessions"
        : "Open dashboard logs for gateway status";
    const gatewayLabel = hasApiError ? "API error" : gatewayLive ? "Gateway live" : "Gateway offline";

    return h(
      "div",
      { className: "nousromancer-surface nousromancer-hud-card nousromancer-now-bar" },
      h("div", { className: "nousromancer-now-label" }, "Now"),
      h(NowItem, { tone: gatewayLive && !hasApiError ? "live" : "warn" }, gatewayLabel),
      h(NowItem, { tone: count ? "active" : "muted" }, count + " active"),
      h(NowItem, { tone: freshness.tone }, freshness.label),
      attentionHint ? h(NowItem, { tone: attentionHint.tone, title: attentionHint.title }, attentionHint.label) : null,
      h("span", { className: "nousromancer-now-trace", title: latestTitle }, "Last trace: ", latestTitle),
      h(NowAction, { href: actionHref, title: actionTitle }, actionLabel, " →"),
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
