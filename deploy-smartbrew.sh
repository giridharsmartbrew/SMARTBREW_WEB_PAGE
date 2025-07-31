#!/bin/bash

# SmartBrew Deployment Script with Advanced Cache Busting
# This script performs a complete rebuild and deployment with proper cache invalidation

# Exit on error
set -e

# Configuration
BUCKET_NAME=${1:-"smartbrew.in"}
CLOUDFRONT_ID=${2:-""}
TIMESTAMP=$(date +%s)

echo "🧹 Cleaning caches and previous builds..."
rm -rf node_modules/.vite dist .vite_cache

echo "🔨 Building project with cache-busting timestamp: $TIMESTAMP"
VITE_CACHE_BUST=$TIMESTAMP npm run build

echo "🚀 Deploying to S3 bucket: $BUCKET_NAME"
aws s3 sync dist/ s3://$BUCKET_NAME --delete

echo "⚙️ Setting aggressive cache control headers for HTML files..."
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html \
  --metadata-directive REPLACE \
  --cache-control "max-age=0, no-cache, no-store, must-revalidate, proxy-revalidate"

echo "⚙️ Setting cache headers for asset files..."
aws s3 cp s3://$BUCKET_NAME/assets/ s3://$BUCKET_NAME/assets/ \
  --recursive \
  --metadata-directive REPLACE \
  --cache-control "max-age=31536000, public"

# Special handling for critical files
echo "⚙️ Setting special cache headers for career page..."
if [ -f dist/careers.html ]; then
  aws s3 cp s3://$BUCKET_NAME/careers.html s3://$BUCKET_NAME/careers.html \
    --metadata-directive REPLACE \
    --cache-control "max-age=0, no-cache, no-store, must-revalidate, proxy-revalidate"
fi

# Handle SPA routing - ensure all HTML routes have proper cache settings
echo "⚙️ Setting cache headers for SPA routes..."
aws s3 cp s3://$BUCKET_NAME/ s3://$BUCKET_NAME/ \
  --recursive \
  --exclude "*" \
  --include "*.html" \
  --metadata-directive REPLACE \
  --cache-control "max-age=0, no-cache, no-store, must-revalidate, proxy-revalidate"

# Clear browser caches via CloudFront invalidation
if [ -n "$CLOUDFRONT_ID" ]; then
  echo "🔄 Invalidating CloudFront distribution: $CLOUDFRONT_ID"
  aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_ID \
    --paths "/*"
else
  echo "⚠️ No CloudFront distribution ID provided, skipping invalidation"
fi

echo "✅ Deployment complete!"
echo "🌐 Visit https://$BUCKET_NAME to see your changes" 