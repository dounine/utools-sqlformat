#!/bin/bash
yarn run build && cp -rf utools/* build/ && cp ./README.md build/ && sed 's/\/static\//.\/static\//g' build/index.html > build/index.tmp && rm -rf build/index.html && mv build/index.tmp build/index.html
