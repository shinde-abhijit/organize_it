#!/bin/bash

echo "Building Vite app"
npm run build

echo "Starting static server"
exec serve -s dist -l 3000
