#!/bin/bash
# sync-products.sh
# Automatically syncs product catalog from frontend to backend

echo "🔄 Syncing product catalog from frontend to backend..."

SOURCE="./src/data/productlist.js"
DESTINATION="./backend/productlist.js"

if [ ! -f "$SOURCE" ]; then
  echo "❌ Error: Source file not found at $SOURCE"
  exit 1
fi

cp "$SOURCE" "$DESTINATION"

if [ $? -eq 0 ]; then
  echo "✅ Product catalog synced successfully!"
  echo "📍 Source: $SOURCE"
  echo "📍 Destination: $DESTINATION"
else
  echo "❌ Error: Failed to sync product catalog"
  exit 1
fi
