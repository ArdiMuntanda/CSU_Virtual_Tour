/**
 * API Key Injector
 * 
 * This script injects the Google Maps API key from environment variables
 * into the window object for use in client-side scripts.
 * 
 * Usage: Place this in index.html BEFORE loading other scripts
 */

(function() {
  // This script is intended to run in the browser. Do NOT use `process.env` here.
  // Instead, deployment should inject `window.__GOOGLE_MAPS_API_KEY__` before loading app scripts,
  // or you can assign it manually in `index.html` for local testing.

  const apiKey = typeof window !== 'undefined' ? window.__GOOGLE_MAPS_API_KEY__ : null;

  if (apiKey) {
    // expose under a stable global that other scripts read
    window.apiKey = apiKey;
  } else {
    console.warn('inject-api-key: no API key found on window.__GOOGLE_MAPS_API_KEY__');
  }
})();
