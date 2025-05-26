# SMARTBREW Website

## Development

### Cache Issues

If you're experiencing cache issues where changes aren't appearing in the browser:

1. **Clear Vite cache and restart the development server:**
   ```bash
   npm run clean-dev
   ```

2. **For more persistent issues, clear all caches:**
   ```bash
   npm run clean-all
   ```

3. **In your browser:**
   - Open DevTools (F12)
   - Right-click on the refresh button
   - Select "Empty Cache and Hard Reload"

### Additional Troubleshooting

If you still encounter issues after clearing the cache:

1. Check your browser's developer tools for errors
2. Ensure you're not running multiple instances of the dev server
3. Try disabling browser extensions that might interfere with development

## Available Scripts

- `npm run dev` - Start the development server
- `npm run clean-dev` - Clear Vite cache and start dev server
- `npm run clean-all` - Clear all caches and start dev server with forced bundling
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build locally 