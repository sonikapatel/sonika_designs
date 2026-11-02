#!/bin/bash
# Builds build/intake.app for the iOS Simulator from ../mira-intake.html.
set -euo pipefail
cd "$(dirname "$0")"

OUT=build/intake.app
rm -rf build && mkdir -p "$OUT/web"

SDK=$(xcrun --sdk iphonesimulator --show-sdk-path)
xcrun --sdk iphonesimulator swiftc -target "$(uname -m)-apple-ios17.0-simulator" -sdk "$SDK" -O main.swift -o "$OUT/intake"
cp Info.plist "$OUT/"
swift make-icon.swift "$OUT/AppIcon60x60@2x.png" 120
swift make-icon.swift "$OUT/AppIcon60x60@3x.png" 180

# Wrap the artifact page in a full document. The app runs edge to edge, so the page pads for the status bar itself.
{
  printf '<!doctype html>\n<html lang="en"><head><meta charset="utf-8">'
  printf '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">'
  printf '<style>[hidden]{display:none!important}html{box-sizing:border-box;height:100%%;padding-top:env(safe-area-inset-top);background:var(--bg-top);-webkit-user-select:none;-webkit-touch-callout:none}input,textarea{-webkit-user-select:text}</style>'
  printf '</head><body>\n'
  cat ../mira-intake.html
  printf '\n</body></html>\n'
} > "$OUT/web/index.html"

# Files written here can carry Finder metadata, which codesign rejects.
xattr -cr "$OUT"
codesign --force --sign - "$OUT" >/dev/null
echo "Built $OUT"
