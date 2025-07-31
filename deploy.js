#!/usr/bin/env node

/**
 * SmartBrew AWS S3 Deployment Script with Cache Invalidation
 * 
 * This script:
 * 1. Cleans all caches
 * 2. Builds the project
 * 3. Deploys to S3
 * 4. Invalidates CloudFront cache (if applicable)
 * 
 * Usage: node deploy.js [bucket-name] [cloudfront-id]
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

// Get bucket name from command line args or use default
const bucketName = process.argv[2] || 'your-bucket-name';
const cloudfrontId = process.argv[3] || '';

async function run(cmd) {
  try {
    const { stdout, stderr } = await execAsync(cmd);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    return true;
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    return false;
  }
}

async function deploy() {
  console.log('🧹 Cleaning cache...');
  await run('rimraf node_modules/.vite dist .vite_cache');
  
  console.log('🔨 Building project...');
  const buildSuccess = await run('vite build');
  if (!buildSuccess) {
    console.error('❌ Build failed');
    process.exit(1);
  }
  
  console.log('🚀 Deploying to S3...');
  await run(`aws s3 sync dist/ s3://${bucketName} --delete`);
  
  // Set Cache-Control headers for different file types
  console.log('⚙️ Setting cache headers...');
  await run(`aws s3 cp s3://${bucketName}/index.html s3://${bucketName}/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate`);
  await run(`aws s3 cp s3://${bucketName}/assets/ s3://${bucketName}/assets/ --recursive --metadata-directive REPLACE --cache-control max-age=31536000,public`);
  
  // Invalidate CloudFront if an ID was provided
  if (cloudfrontId) {
    console.log('🔄 Invalidating CloudFront cache...');
    await run(`aws cloudfront create-invalidation --distribution-id ${cloudfrontId} --paths "/*"`);
  }
  
  console.log('✅ Deployment complete!');
}

deploy().catch(error => {
  console.error('❌ Deployment failed:', error);
  process.exit(1);
}); 