// Load API key from environment variables
// In development, load from .env file
// In production, set via environment variables or config management service

/**
 * API Configuration
 * 
 * IMPORTANT: Never commit actual API keys to the repository!
 * 
 * For development:
 * 1. Copy .env.example to .env
 * 2. Add your Google Maps API key to the .env file
 * 3. The key will be injected at build time
 * 
 * For production:
 * 1. Set VITE_GOOGLE_MAPS_API_KEY environment variable on your server
 * 2. Or use a backend proxy to inject the key securely
 */

// Get API key from window object (set by build process or index.html)
// Expose apiKey as a browser global variable so other client scripts can use it.
// This file runs in the browser, so avoid Node/CommonJS (`module.exports`) or
// `process.env` calls here.
;(function () {
  const keyFromWindow = typeof window !== 'undefined' ? window.__GOOGLE_MAPS_API_KEY__ : null;

  // Fallback: if a global `__APP_CONFIG__` object exists, read from it.
  const keyFromAppConfig = typeof window !== 'undefined' && window.__APP_CONFIG__ ? window.__APP_CONFIG__.VITE_GOOGLE_MAPS_API_KEY : null;

  const apiKey = keyFromWindow || keyFromAppConfig || null;

  if (!apiKey) {
    console.warn('⚠️  Warning: Google Maps API key is not configured.');
    console.warn('   - Development: add your key to `.env` and inject it at build time.');
    console.warn('   - Temporary: you can set `window.__GOOGLE_MAPS_API_KEY__` before loading this script.');
  }

  // Expose a simple global `apiKey` variable (used by index.html loader)
  try {
    if (typeof window !== 'undefined') window.apiKey = apiKey;
  } catch (e) {
    // noop in non-browser environments
  }
})();