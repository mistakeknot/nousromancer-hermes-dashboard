#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HERMES_HOME="${HERMES_HOME:-$HOME/.hermes}"

echo "Installing Nousromancer dashboard theme and plugin into $HERMES_HOME"
mkdir -p "$HERMES_HOME/dashboard-themes" "$HERMES_HOME/plugins"

cp "$ROOT/theme/nousromancer.yaml" "$HERMES_HOME/dashboard-themes/nousromancer.yaml"
rm -rf "$HERMES_HOME/plugins/nousromancer-mission-control"
cp -R "$ROOT/plugins/nousromancer-mission-control" "$HERMES_HOME/plugins/nousromancer-mission-control"

if command -v hermes >/dev/null 2>&1; then
  hermes config set dashboard.theme nousromancer >/dev/null 2>&1 || true
fi

if command -v curl >/dev/null 2>&1; then
  curl --max-time 3 -fsS http://127.0.0.1:9119/api/dashboard/plugins/rescan >/dev/null 2>&1 || true
fi

echo "Installed. Start or refresh: hermes dashboard"
echo "Then choose Nousromancer from the dashboard palette switcher if it is not already active."
