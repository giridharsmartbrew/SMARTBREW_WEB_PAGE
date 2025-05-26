#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}===== SMARTBREW Cache Cleaner =====${NC}"
echo -e "${YELLOW}Cleaning all cache files...${NC}"

# Remove Vite cache directories
echo -e "${YELLOW}Removing Vite cache directories...${NC}"
rm -rf node_modules/.vite
rm -rf .vite_cache
rm -rf dist

# Clear npm cache
echo -e "${YELLOW}Clearing npm cache...${NC}"
npm cache clean --force

# Remove browser caches if in Windows
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  echo -e "${YELLOW}Detected Windows system. Attempting to clear Chrome cache...${NC}"
  # Chrome cache on Windows
  rm -rf "$APPDATA/Local/Google/Chrome/User Data/Default/Cache"
  rm -rf "$APPDATA/Local/Google/Chrome/User Data/Default/Code Cache"
fi

echo -e "${GREEN}Cache cleaning complete!${NC}"
echo -e "${BLUE}To start development server with fresh cache, run:${NC}"
echo -e "${GREEN}npm run clean-dev${NC}" 