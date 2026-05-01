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
  const DISCORD_URL_RE = /https?:\/\/(?:canary\.|ptb\.)?discord(?:app)?\.com\/\S+/i;
  const SNOWFLAKE_RE = /\b\d{17,20}\b/;
  const TOKENISH_RE = /\b(?:github_pat_|ghp_|sk-[A-Za-z0-9_-]{8,}|token|secret|password|webhook)\b/i;
  // Suppress authoritative attention/priority variants before they can appear in row metadata or tooltips.
  const FORBIDDEN_ATTENTION_COPY_RE = /\b(?:(?:needs?|requires?|awaiting|waiting(?:[\s-]+for)?)(?:[\s-]+\w+){0,4}[\s-]+(?:input|response|reply|action|attention)|blocked[\s-]+on[\s-]+(?:you|the[\s-]+user|user|@[A-Za-z0-9_-]+)|(?:highest|top|critical|urgent)[\s-]+priority|priority\s*#?\s*[01]|p[01]|top[\s-]+of[\s-]+the[\s-]+queue|most[\s-]+important)\b/i;

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

  function hasUnsafeText(value) {
    const text = String(value || "");
    return DISCORD_URL_RE.test(text) || SNOWFLAKE_RE.test(text) || TOKENISH_RE.test(text);
  }

  function safeDisplayText(value, fallback) {
    const text = compactText(value);
    if (!text || hasUnsafeText(text)) return fallback || "";
    return text;
  }

  function safeAttentionDetailText(value, fallback) {
    const text = safeDisplayText(value, "");
    if (!text || FORBIDDEN_ATTENTION_COPY_RE.test(text)) return fallback || "";
    return text;
  }

  function safeResponseTargetPath(responseTarget) {
    if (!responseTarget || typeof responseTarget !== "object") return "";
    const path = String(responseTarget.path || "").trim();
    if (!path || hasUnsafeText(path)) return "";
    if (path.indexOf("/") !== 0 || path.indexOf("//") === 0) return "";
    return path;
  }

  function safeAttentionEvidenceSummary(items) {
    if (!Array.isArray(items)) return "";
    const summaries = [];
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      if (!item || typeof item !== "object") continue;
      const summary = safeAttentionDetailText(item.summary || item.label || item.type || item.source, "");
      if (summary) summaries.push(summary);
      if (summaries.length >= 2) break;
    }
    return summaries.join("; ");
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

  function normalizeAttentionState(value) {
    return String(value || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
  }

  function attentionReasonLabel(state, reason) {
    const normalizedReason = String(reason || "").toLowerCase();
    if (state === "waiting_on_human" && /approv|confirm|decision|decide|consent|merge/.test(normalizedReason)) return "approval";
    if (state === "waiting_on_human") return "requested";
    if (state === "blocked") return "blocked";
    if (state === "error") return "error";
    if (state === "possibly_waiting") return "waiting";
    return "attention";
  }

  function explicitAttentionSignal(session) {
    if (!session) return null;
    let state = normalizeAttentionState(firstTextField(session, ["attention_state", "attentionState"]));
    if (!state && (session.waiting_on_human === true || session.waitingOnHuman === true || session.requires_action === true || session.requiresAction === true)) {
      state = "waiting_on_human";
    }
    if (!state || state === "unknown" || state === "none" || state === "normal") return null;
    if (["possibly_waiting", "waiting_on_human", "blocked", "error"].indexOf(state) < 0) return null;

    const reason = safeAttentionDetailText(
      firstTextField(session, ["attention_reason", "attentionReason", "blocked_reason", "blockedReason", "error", "last_error", "lastError"]),
      "",
    );
    const evidence = safeAttentionEvidenceSummary(session.attention_evidence || session.attentionEvidence);
    const title = safeDisplayText(recentTitle(session), "Untitled session");
    const detailParts = [];
    if (reason) detailParts.push(reason);
    if (evidence) detailParts.push("Evidence: " + evidence);
    const label = state === "possibly_waiting" ? "Possibly waiting" : "Attention: " + attentionReasonLabel(state, reason);
    const tooltip = "Evidence-backed attention signal from Hermes session contract" +
      (detailParts.length ? ": " + detailParts.join(" · ") : "") +
      " in " + title + ". Not a global priority ranking.";

    return {
      label: label,
      tone: state === "error" || state === "blocked" ? "warn" : "attention",
      title: tooltip,
      actionHref: safeResponseTargetPath(session.response_target || session.responseTarget),
      actionLabel: "Respond",
    };
  }

  function heuristicAttentionHint(sessions) {
    const list = Array.isArray(sessions) ? sessions : [];
    for (let i = 0; i < list.length; i += 1) {
      const evidence = sessionErrorOrStallEvidence(list[i]) || sessionMessageAttentionEvidence(list[i]);
      if (evidence) {
        const title = safeDisplayText(recentTitle(list[i]), "Untitled session");
        return {
          label: "Possibly waiting",
          tone: "attention",
          title: "Hedged attention hint: " + evidence + " in " + title + ". Not an authoritative priority signal.",
          actionHref: "",
          actionLabel: "Trace",
        };
      }
    }
    return null;
  }

  function possibleAttentionHint(sessions) {
    const list = Array.isArray(sessions) ? sessions : [];
    for (let i = 0; i < list.length; i += 1) {
      const signal = explicitAttentionSignal(list[i]);
      if (signal) return signal;
    }
    return heuristicAttentionHint(list);
  }

  const SESSION_SOURCES = ["cli", "telegram", "discord", "slack", "whatsapp", "cron", "local"];

  function sessionSource(text) {
    const normalized = String(text || "").trim().toLowerCase();
    if (normalized.indexOf("src:") === 0) return normalized.slice(4).trim();
    return SESSION_SOURCES.indexOf(normalized) >= 0 ? normalized : null;
  }

  function latestSessionSource(session) {
    const raw = firstTextField(session, ["source", "platform", "origin", "input_source", "inputSource", "session_source", "sessionSource"]);
    const source = sessionSource(raw);
    return SESSION_SOURCES.indexOf(source) >= 0 ? source : null;
  }

  function queryAll(selector) {
    if (typeof document === "undefined" || !document.querySelectorAll) return [];
    try {
      return Array.prototype.slice.call(document.querySelectorAll(selector) || []);
    } catch (error) {
      return [];
    }
  }

  function queryOne(selector) {
    if (typeof document === "undefined" || !document.querySelector) return null;
    try {
      return document.querySelector(selector);
    } catch (error) {
      return null;
    }
  }

  function datasetValue(row, key) {
    if (!row || !row.dataset) return "";
    return String(row.dataset[key] || "").trim();
  }

  function rowAttributeValue(row, attributeName, datasetKey) {
    if (!row) return "";
    if (row.getAttribute) {
      const value = row.getAttribute(attributeName);
      if (value) return String(value).trim();
    }
    return datasetValue(row, datasetKey);
  }

  function rowSessionId(row) {
    return rowAttributeValue(row, "data-session-id", "sessionId") ||
      rowAttributeValue(row, "data-session", "session");
  }

  function findSessionRow(session) {
    if (typeof document === "undefined" || !session) return null;
    const id = safeDisplayText(firstTextField(session, ["id", "session_id", "sessionId"]), "");
    if (!id) return null;

    const candidates = queryAll('main [data-session-id], main [data-session]');
    for (let i = 0; i < candidates.length; i += 1) {
      if (rowSessionId(candidates[i]) === id) return candidates[i];
    }
    return null;
  }

  function rowAttentionContext(session) {
    if (!session) return null;
    let state = normalizeAttentionState(firstTextField(session, ["attention_state", "attentionState"]));
    if (!state && (session.waiting_on_human === true || session.waitingOnHuman === true || session.requires_action === true || session.requiresAction === true)) {
      state = "waiting_on_human";
    }
    if (!state || state === "unknown" || state === "none" || state === "normal") return null;
    if (["possibly_waiting", "waiting_on_human", "blocked", "error"].indexOf(state) < 0) return null;

    const reason = safeAttentionDetailText(
      firstTextField(session, ["attention_reason", "attentionReason", "blocked_reason", "blockedReason", "error", "last_error", "lastError"]),
      "",
    );
    const evidence = safeAttentionEvidenceSummary(session.attention_evidence || session.attentionEvidence);
    const title = safeDisplayText(recentTitle(session), "Untitled session");
    const attentionLabel = state === "possibly_waiting" ? "waiting" : attentionReasonLabel(state, reason);
    const source = latestSessionSource(session);
    const textParts = ["attn:" + attentionLabel];
    if (source) textParts.push("src:" + source);

    const detailParts = [];
    if (reason) detailParts.push(reason);
    if (evidence) detailParts.push("Evidence: " + evidence);
    const tooltip = "Evidence-backed Hermes attention signal" +
      (detailParts.length ? ": " + detailParts.join(" · ") : "") +
      " in " + title + ". Not a global priority ranking.";

    let actionLabel = "";
    if (state === "waiting_on_human") actionLabel = "Respond";
    if (state === "blocked" || state === "error") actionLabel = "Inspect";

    return {
      label: attentionLabel,
      text: textParts.join(" · "),
      title: tooltip,
      actionHref: actionLabel ? safeResponseTargetPath(session.response_target || session.responseTarget) : "",
      actionLabel: actionLabel,
    };
  }

  function upsertRowAttentionContext(row, context) {
    if (!row || !row.querySelector) return null;
    const existing = row.querySelector('[data-nousromancer-attention-context="true"]');
    if (!context) {
      if (existing && existing.remove) existing.remove();
      return null;
    }
    if (typeof document === "undefined" || !document.createElement || !row.appendChild) return null;

    const ariaLabel = "Hermes attention context: " + context.label;
    if (existing &&
        existing.textContent === context.text &&
        existing.getAttribute &&
        existing.getAttribute("aria-label") === ariaLabel &&
        existing.getAttribute("title") === context.title) {
      return existing;
    }

    const chip = existing || document.createElement("span");
    chip.dataset.nousromancerAttentionContext = "true";
    chip.className = "nousromancer-row-attention-context";
    if (chip.textContent !== context.text) chip.textContent = context.text;
    if (!chip.getAttribute || chip.getAttribute("aria-label") !== ariaLabel) chip.setAttribute("aria-label", ariaLabel);
    if (!chip.getAttribute || chip.getAttribute("title") !== context.title) chip.setAttribute("title", context.title);
    if (!existing) row.appendChild(chip);
    return chip;
  }

  function stopRowActionPropagation(event) {
    if (event && event.stopPropagation) event.stopPropagation();
  }

  function upsertRowResponseAction(row, context) {
    if (!row || !row.querySelector) return null;
    const existing = row.querySelector('[data-nousromancer-response-action="true"]');
    if (!context || !context.actionHref || !context.actionLabel) {
      if (existing && existing.remove) existing.remove();
      return null;
    }
    if (typeof document === "undefined" || !document.createElement || !row.appendChild) return null;

    const text = context.actionLabel + " →";
    const ariaLabel = context.actionLabel === "Respond"
      ? "Respond from Hermes attention context"
      : "Inspect Hermes attention context";
    const title = "Open the dashboard-local response target from the explicit Hermes attention contract. Not a global priority ranking.";
    if (existing &&
        existing.textContent === text &&
        existing.getAttribute &&
        existing.getAttribute("href") === context.actionHref &&
        existing.getAttribute("aria-label") === ariaLabel &&
        existing.getAttribute("title") === title) {
      if (existing.onclick !== stopRowActionPropagation) existing.onclick = stopRowActionPropagation;
      return existing;
    }

    const action = existing || document.createElement("a");
    action.dataset.nousromancerResponseAction = "true";
    action.className = "nousromancer-row-response-action";
    if (action.textContent !== text) action.textContent = text;
    if (!action.getAttribute || action.getAttribute("href") !== context.actionHref) action.setAttribute("href", context.actionHref);
    if (!action.getAttribute || action.getAttribute("aria-label") !== ariaLabel) action.setAttribute("aria-label", ariaLabel);
    if (!action.getAttribute || action.getAttribute("title") !== title) action.setAttribute("title", title);
    action.onclick = stopRowActionPropagation;
    if (!existing) row.appendChild(action);
    return action;
  }

  function polishSessionAttentionRows(sessions) {
    const list = Array.isArray(sessions) ? sessions : [];
    const activeRows = typeof Set !== "undefined" ? new Set() : null;

    for (let i = 0; i < list.length; i += 1) {
      const row = findSessionRow(list[i]);
      if (!row) continue;
      const context = rowAttentionContext(list[i]);
      if (context && activeRows) activeRows.add(row);
      upsertRowAttentionContext(row, context);
      upsertRowResponseAction(row, context);
    }

    if (activeRows) {
      const chips = queryAll('main [data-nousromancer-attention-context="true"], main [data-nousromancer-response-action="true"]');
      chips.forEach(function (chip) {
        if (chip && chip.parentElement && !activeRows.has(chip.parentElement) && chip.remove) chip.remove();
      });
    }
  }

  function polishSessionsDom(sessions) {
    if (typeof document === "undefined") return;

    const searchInput =
      queryOne('main input[data-nousromancer-search-polished="true"]') ||
      queryOne('main input[placeholder="Search message content..."]');
    if (searchInput) {
      searchInput.placeholder = "Search session text";
      searchInput.dataset.nousromancerSearchPolished = "true";
      searchInput.setAttribute("aria-label", "Search across session messages");
      searchInput.setAttribute("title", "Search across session messages");
    }

    const deleteButtons = queryAll('main button[aria-label="Delete session"]');
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

    polishSessionAttentionRows(sessions);
  }

  function useSessionListPolish(sessions) {
    useEffect(function () {
      function runPolish() {
        polishSessionsDom(sessions);
      }
      runPolish();
      const Observer = typeof MutationObserver !== "undefined" ? MutationObserver : window.MutationObserver;
      if (!Observer || typeof document === "undefined" || !document.body) return undefined;
      const observer = new Observer(runPolish);
      observer.observe(document.body, { childList: true, subtree: true });
      return function () {
        observer.disconnect();
      };
    }, [sessions]);
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
    const data = useMissionData();
    const status = data.status;
    const sessions = data.sessions || [];
    useSessionListPolish(sessions);
    const count = activeSessionCount(status, sessions);
    const gatewayLive = isGatewayLive(status);
    const latest = sessions[0];
    const latestTitle = sessions.length ? recentTitle(latest).slice(0, 72) : "No recent trace";
    const latestSource = latestSessionSource(latest);
    const apiError = data.error ? errorMessage(data.error) : "";
    const hasApiError = Boolean(apiError);
    const freshness = freshnessState(data.refreshedAt, data.nowMs);
    const attentionHint = possibleAttentionHint(sessions);
    const attentionHref = attentionHint && attentionHint.actionHref;
    const actionHref = gatewayLive && !hasApiError ? (attentionHref || "/sessions") : "/logs";
    const actionLabel = gatewayLive && !hasApiError ? (attentionHint ? (attentionHint.actionLabel || "Respond") : "Trace") : "Open logs";
    const actionTitle = hasApiError
      ? "Dashboard API error: " + apiError
      : gatewayLive
        ? (attentionHint ? attentionHint.title : "Open recent Hermes sessions")
        : "Open dashboard logs for gateway status";
    const gatewayLabel = hasApiError ? "API error" : gatewayLive ? "Gateway live" : "Gateway offline";

    return h(
      "div",
      { className: "nousromancer-surface nousromancer-hud-card nousromancer-now-bar" },
      h("div", { className: "nousromancer-now-label" }, "Now"),
      h(NowItem, { tone: gatewayLive && !hasApiError ? "live" : "warn" }, gatewayLabel),
      h(NowItem, { tone: count ? "active" : "muted" }, count + " active"),
      h(NowItem, { tone: freshness.tone }, freshness.label),
      latestSource ? h(NowItem, { tone: "muted", title: "Latest session source: " + latestSource }, "Latest: src:" + latestSource) : null,
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
