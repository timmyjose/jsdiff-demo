#!/usr/bin/env bash

set -euxo pipefail

yarn install

echo "Performing prebuild..."
rm -rf android ios
npx expo prebuild