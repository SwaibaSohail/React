#!/usr/bin/env bash
set -euo pipefail

# Assembles a single deploy: a static landing page at the root, with each
# Vite app built into its own subfolder (/shopping-cart, /memory-card, /cv-builder).

echo "==> Assembling combined portfolio build"
rm -rf dist
mkdir -p dist

# Landing page — static, no build step
cp landing/index.html dist/index.html

for app in shopping-cart memory-card cv-builder; do
  echo "==> Building $app"
  ( cd "$app" && npm ci && npm run build )
  mkdir -p "dist/$app"
  cp -r "$app/dist/." "dist/$app/"
done

echo "==> Build complete: dist/ has the landing page + 3 apps"
