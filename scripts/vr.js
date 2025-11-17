/**
 * VR Controls Module
 * Enables Cardboard VR mode for Google Street View Panorama
 * Creates split-screen by rendering left/right eye views with slight horizontal offset
 */

import { panorama } from './streetView.js';

export class VRController {
  constructor() {
    this.isVRActive = false;
    this.vrButton = null;
    this.deviceOrientationHandler = null;
    this.originalStyles = {};
    this.vrContainer = null;
    this.leftEyePano = null;
    this.rightEyePano = null;
    this._calibrated = false;
    this._initialAlpha = null;
    this._initialBeta = null;
    this._initialHeading = null;
    this._initialPitch = null;
    // Debug & emulation helpers
    this.debugPanel = null;
    this.logs = [];
    this._lastDeviceEvent = null;
    this._emulationActive = false;
    this._emulationState = { active: false, startX: 0, startY: 0, lastX: 0, lastY: 0 };
    this._mouseHandlers = null;
  }

  /**
   * Initialize VR controls and setup button listener
   */
  init(vrButtonElement) {
    this.vrButton = vrButtonElement;
    if (!this.vrButton) {
      console.warn('VR button element not found');
      return;
    }

    this.vrButton.addEventListener('click', () => this.toggleVR());
    console.log('✓ VR Controller initialized');
  }

  /**
   * Toggle VR mode on/off
   */
  toggleVR() {
    if (this.isVRActive) {
      this.exitVR();
    } else {
      this.enterVR();
    }
  }

  /**
   * Enter VR mode - create actual split-screen containers with separate panorama instances
   */
  async enterVR() {
    try {
      const panoContainer = document.getElementById('pano');
      if (!panoContainer) {
        console.error('Panorama container not found');
        return;
      }

      console.log('Entering VR mode...');

      // Add body class to hide UI elements
      document.body.classList.add('vr-active');

      // Request device orientation permission (iOS 13+ requirement)
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission !== 'granted') {
            console.warn('Device orientation permission denied');
            document.body.classList.remove('vr-active');
            return;
          }
          console.log('✓ Device orientation permission granted');
        } catch (err) {
          console.warn('Device orientation permission request failed:', err);
        }
      } else {
        console.log('✓ Device orientation available (non-iOS or older iOS)');
      }

      // Store original styles
      this.originalStyles = {
        display: panoContainer.style.display,
        position: panoContainer.style.position,
        width: panoContainer.style.width,
        height: panoContainer.style.height,
        top: panoContainer.style.top,
        left: panoContainer.style.left,
        zIndex: panoContainer.style.zIndex,
        margin: panoContainer.style.margin,
        padding: panoContainer.style.padding,
      };

      // Hide original panorama
      panoContainer.style.display = 'none';

      // Create VR container
      this.vrContainer = document.createElement('div');
      this.vrContainer.id = 'vr-container';
      this.vrContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        z-index: 9998;
        background: #000;
        margin: 0;
        padding: 0;
      `;

      // Create left eye container
      const leftEyeDiv = document.createElement('div');
      leftEyeDiv.id = 'vr-eye-left';
      leftEyeDiv.style.cssText = `
        flex: 1;
        width: 50%;
        height: 100%;
        position: relative;
        overflow: hidden;
      `;

      // Create right eye container
      const rightEyeDiv = document.createElement('div');
      rightEyeDiv.id = 'vr-eye-right';
      rightEyeDiv.style.cssText = `
        flex: 1;
        width: 50%;
        height: 100%;
        position: relative;
        overflow: hidden;
        border-left: 3px solid rgba(0, 0, 0, 0.5);
      `;

      // Create panorama divs for each eye
      const panoLeft = document.createElement('div');
      panoLeft.id = 'pano-left';
      panoLeft.style.cssText = 'width: 100%; height: 100%;';

      const panoRight = document.createElement('div');
      panoRight.id = 'pano-right';
      panoRight.style.cssText = 'width: 100%; height: 100%;';

      // Append panoramas to eye containers
      leftEyeDiv.appendChild(panoLeft);
      rightEyeDiv.appendChild(panoRight);

      // Append eye containers to VR container
      this.vrContainer.appendChild(leftEyeDiv);
      this.vrContainer.appendChild(rightEyeDiv);

      // Insert VR container into page
      document.body.appendChild(this.vrContainer);

      // Create Street View instances for each eye
      const currentPov = panorama.getPov();
      const currentPosition = panorama.getPosition();
      const currentZoom = currentPov.zoom || 1;

      // Left eye: slight left offset in heading
      this.leftEyePano = new google.maps.StreetViewPanorama(panoLeft, {
        position: currentPosition,
        pov: {
          heading: currentPov.heading - 2, // Slight left offset for stereoscopic effect
          pitch: currentPov.pitch,
        },
        zoom: currentZoom,
        addressControlOptions: { enabled: false },
        zoomControl: false,
        panControlOptions: { enabled: false },
        linksControl: false,
        enableCloseButton: false,
        fullscreenControl: false,
      });

      // Right eye: slight right offset in heading
      this.rightEyePano = new google.maps.StreetViewPanorama(panoRight, {
        position: currentPosition,
        pov: {
          heading: currentPov.heading + 2, // Slight right offset for stereoscopic effect
          pitch: currentPov.pitch,
        },
        zoom: currentZoom,
        addressControlOptions: { enabled: false },
        zoomControl: false,
        panControlOptions: { enabled: false },
        linksControl: false,
        enableCloseButton: false,
        fullscreenControl: false,
      });

      console.log('✓ Left and right eye Street Views created');

      // Request fullscreen on the VR container
      try {
        if (this.vrContainer.requestFullscreen) {
          await this.vrContainer.requestFullscreen({ navigationUI: 'hide' });
        } else if (this.vrContainer.webkitRequestFullscreen) {
          this.vrContainer.webkitRequestFullscreen();
        } else if (this.vrContainer.mozRequestFullScreen) {
          this.vrContainer.mozRequestFullScreen();
        } else if (this.vrContainer.msRequestFullscreen) {
          this.vrContainer.msRequestFullscreen();
        }
        console.log('✓ Fullscreen requested');
      } catch (err) {
        console.warn('Fullscreen request failed:', err);
      }

      // Lock screen orientation to landscape
      if (screen.orientation && screen.orientation.lock) {
        try {
          await screen.orientation.lock('landscape').catch(() => {
            return screen.orientation.lock('landscape-primary');
          });
          console.log('✓ Screen orientation locked to landscape');
        } catch (err) {
          console.warn('Could not lock orientation:', err);
        }
      }

      // Enable device orientation listener for cardboard head tracking
      this.enableDeviceOrientation();

      this.isVRActive = true;
      this.updateVRButton();
      console.log('✓ VR mode enabled - Split screen active');
    } catch (err) {
      console.error('Failed to enter VR:', err);
      document.body.classList.remove('vr-active');
    }
  }

  /**
   * Exit VR mode - restore original panorama and cleanup
   */
  async exitVR() {
    try {
      const panoContainer = document.getElementById('pano');
      if (!panoContainer) {
        console.error('Panorama container not found');
        return;
      }

      console.log('Exiting VR mode...');

      // Remove VR-active class from body (show UI elements)
      document.body.classList.remove('vr-active');

      // Restore panorama visibility
      panoContainer.style.display = this.originalStyles.display;

      // Remove VR container
      if (this.vrContainer && this.vrContainer.parentNode) {
        this.vrContainer.parentNode.removeChild(this.vrContainer);
        this.vrContainer = null;
        this.leftEyePano = null;
        this.rightEyePano = null;
      }

      // Exit fullscreen
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (document.webkitFullscreenElement) {
        await document.webkitExitFullscreen();
      } else if (document.mozFullScreenElement) {
        await document.mozCancelFullScreen();
      } else if (document.msFullscreenElement) {
        await document.msExitFullscreen();
      }

      // Unlock orientation
      if (screen.orientation && screen.orientation.unlock) {
        try {
          screen.orientation.unlock();
          console.log('✓ Screen orientation unlocked');
        } catch (err) {
          console.warn('Could not unlock orientation:', err);
        }
      }

      // Disable device orientation
      this.disableDeviceOrientation();

      this.isVRActive = false;
      this.updateVRButton();
      console.log('✓ VR mode disabled');
    } catch (err) {
      console.error('Failed to exit VR:', err);
    }
  }

  /**
   * Enable device orientation tracking for cardboard head movement
   */
  enableDeviceOrientation() {
    if (!panorama && !this.leftEyePano) {
      console.warn('Panorama not initialized yet');
      return;
    }

    this._calibrated = false;
    this._initialAlpha = null;
    this._initialBeta = null;
    this._initialHeading = null;
    this._initialPitch = null;

    this.deviceOrientationHandler = this.handleDeviceOrientation.bind(this);
    window.addEventListener('deviceorientation', this.deviceOrientationHandler, false);
    console.log('✓ Device orientation tracking enabled (listening for events)');
    // Show debug panel if present
    this._ensureDebugPanel();
    if (this.debugPanel) this.debugPanel.classList.add('visible');
  }

  /**
   * Disable device orientation tracking
   */
  disableDeviceOrientation() {
    if (this.deviceOrientationHandler) {
      window.removeEventListener('deviceorientation', this.deviceOrientationHandler);
      this.deviceOrientationHandler = null;
      console.log('✓ Device orientation tracking disabled');
    }
    // hide debug if present
    if (this.debugPanel) this.debugPanel.classList.remove('visible');
  }

  /**
   * Create or attach to the debug overlay in the page and wire debug controls
   */
  _ensureDebugPanel() {
    if (this.debugPanel) return;
    const dbg = document.getElementById('vr-debug');
    if (!dbg) return; // index.html might not include it
    this.debugPanel = dbg;
    // cache elements
    this._dbg = {
      alpha: dbg.querySelector('#dbg-alpha'),
      beta: dbg.querySelector('#dbg-beta'),
      heading: dbg.querySelector('#dbg-heading'),
      pitch: dbg.querySelector('#dbg-pitch'),
      cal: dbg.querySelector('#dbg-cal'),
      last: dbg.querySelector('#dbg-last'),
      recenter: dbg.querySelector('#dbg-recenter'),
      toggleEmu: dbg.querySelector('#dbg-toggle-emulation'),
      exportBtn: dbg.querySelector('#dbg-export'),
    };

    if (this._dbg.recenter) this._dbg.recenter.addEventListener('click', () => this.reCenter());
    if (this._dbg.toggleEmu) this._dbg.toggleEmu.addEventListener('click', () => {
      this._emulationActive = !this._emulationActive;
      this._dbg.toggleEmu.textContent = this._emulationActive ? 'Mouse emulation: ON' : 'Toggle mouse emulation';
      if (this._emulationActive) this.enableMouseEmulation(); else this.disableMouseEmulation();
    });
    if (this._dbg.exportBtn) this._dbg.exportBtn.addEventListener('click', () => {
      const data = JSON.stringify(this.logs.slice(-200));
      // prompt with encoded string for copy/paste
      const w = window.open('about:blank');
      if (w) {
        w.document.body.innerText = data;
      } else {
        console.log('Exported logs:', data);
        alert('Logs copied to console (or a new tab).');
      }
    });
  }

  _log(msg, meta) {
    const entry = { t: Date.now(), msg, meta };
    this.logs.push(entry);
    if (this.logs.length > 500) this.logs.shift();
    if (this._dbg && this._dbg.last) this._dbg.last.textContent = msg;
    console.debug('[VR_DBG]', msg, meta || '');
  }

  /**
   * Re-center / recalibrate using current sensor or panorama state
   */
  reCenter() {
    // If we have a recent device event, use it
    if (this._lastDeviceEvent) {
      this._initialAlpha = this._lastDeviceEvent.alpha;
      this._initialBeta = this._lastDeviceEvent.beta;
    }
    if (panorama && panorama.getPov) {
      const pov = panorama.getPov();
      this._initialHeading = pov.heading || 0;
      this._initialPitch = pov.pitch || 0;
    }
    this._calibrated = true;
    if (this._dbg && this._dbg.cal) this._dbg.cal.textContent = 'yes';
    this._log('Re-centered calibration', { initialAlpha: this._initialAlpha, initialBeta: this._initialBeta, heading: this._initialHeading, pitch: this._initialPitch });
  }

  /**
   * Apply delta changes (degrees) and update both eye panoramas and main panorama.
   * This extracts the core movement logic so mouse/touch emulation can reuse it.
   */
  applyDeltas(deltaAlpha, deltaBeta) {
    // If not calibrated, ignore
    if (!this._calibrated) return;

    const yawSensitivity = 1.0;
    const pitchSensitivity = 1.0;
    const heading = this._initialHeading + deltaAlpha * yawSensitivity;
    const pitch = this._initialPitch + deltaBeta * pitchSensitivity;
    const clampedPitch = Math.max(-90, Math.min(90, pitch));
    const stereoOffset = 3;

    try {
      if (this.leftEyePano) this.leftEyePano.setPov({ heading: heading - stereoOffset, pitch: clampedPitch });
      if (this.rightEyePano) this.rightEyePano.setPov({ heading: heading + stereoOffset, pitch: clampedPitch });
      if (panorama) panorama.setPov({ heading: heading, pitch: clampedPitch });
    } catch (e) {
      // ignore if not ready
    }

    if (this._dbg) {
      if (this._dbg.heading) this._dbg.heading.textContent = Math.round(heading * 10) / 10;
      if (this._dbg.pitch) this._dbg.pitch.textContent = Math.round(clampedPitch * 10) / 10;
    }
  }

  /**
   * Enable mouse/touch emulation for desktop testing
   */
  enableMouseEmulation() {
    if (!this.vrContainer) return;
    if (this._mouseHandlers) return; // already enabled

    const onDown = (e) => {
      const p = (e.touches && e.touches[0]) ? e.touches[0] : e;
      this._emulationState.active = true;
      this._emulationState.startX = p.clientX;
      this._emulationState.startY = p.clientY;
      this._emulationState.lastX = p.clientX;
      this._emulationState.lastY = p.clientY;
    };

    const onMove = (e) => {
      if (!this._emulationState.active) return;
      const p = (e.touches && e.touches[0]) ? e.touches[0] : e;
      const dx = p.clientX - this._emulationState.lastX;
      const dy = p.clientY - this._emulationState.lastY;
      this._emulationState.lastX = p.clientX;
      this._emulationState.lastY = p.clientY;

      // Map pixels to degrees (tweakable)
      const pxToDeg = 0.25; // 0.25° per pixel
      const deltaAlpha = -dx * pxToDeg; // horizontal drag -> yaw
      const deltaBeta = -dy * pxToDeg; // vertical drag -> pitch

      // If not calibrated, set initial anchor
      if (!this._calibrated) this.reCenter();

      // Apply cumulative deltas relative to initial orientation
      // We accumulate by adjusting initialAlpha/pitch so repeated drags move view
      // Simpler: call applyDeltas with deltaAlpha/deltaBeta applied to initial
      this.applyDeltas(this._angleDiff((this._initialAlpha || 0) + deltaAlpha, (this._initialAlpha || 0)), deltaBeta);
    };

    const onUp = () => { this._emulationState.active = false; };

    this.vrContainer.addEventListener('mousedown', onDown, { passive: true });
    window.addEventListener('mousemove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp, { passive: true });
    this.vrContainer.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp, { passive: true });

    this._mouseHandlers = { onDown, onMove, onUp };
    this._log('Mouse/touch emulation enabled');
  }

  disableMouseEmulation() {
    if (!this._mouseHandlers || !this.vrContainer) return;
    const { onDown, onMove, onUp } = this._mouseHandlers;
    this.vrContainer.removeEventListener('mousedown', onDown);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
    this.vrContainer.removeEventListener('touchstart', onDown);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('touchend', onUp);
    this._mouseHandlers = null;
    this._log('Mouse/touch emulation disabled');
  }

  /**
   * Handle device orientation changes (accelerometer/gyroscope data)
   * Updates both left and right eye panoramas with stereoscopic offset
   */
  handleDeviceOrientation(event) {
    if (!this.isVRActive || (!panorama && !this.leftEyePano)) return;

    const alpha = (event && event.alpha !== undefined && event.alpha !== null) ? event.alpha : null;
    const beta = (event && event.beta !== undefined && event.beta !== null) ? event.beta : null;

    if (alpha === null || beta === null) return; // no usable data

    // remember last event for manual re-center
    this._lastDeviceEvent = { alpha, beta, ts: Date.now() };

    // ensure debug UI exists and update live fields
    this._ensureDebugPanel();
    if (this._dbg && this._dbg.alpha) this._dbg.alpha.textContent = Math.round(alpha * 10) / 10;
    if (this._dbg && this._dbg.beta) this._dbg.beta.textContent = Math.round(beta * 10) / 10;

    // Calibrate on first event: capture initial device orientation and panorama pov
    if (!this._calibrated) {
      this._initialAlpha = alpha;
      this._initialBeta = beta;
      const pov = (panorama && panorama.getPov) ? panorama.getPov() : { heading: 0, pitch: 0 };
      this._initialHeading = pov.heading || 0;
      this._initialPitch = pov.pitch || 0;
      this._calibrated = true;
      if (this._dbg && this._dbg.cal) this._dbg.cal.textContent = 'yes';
      this._log('VR calibrated', { initialAlpha: this._initialAlpha, initialBeta: this._initialBeta, initialHeading: this._initialHeading, initialPitch: this._initialPitch });
      return; // wait for next event to apply movement
    }

    // Compute deltas relative to initial device orientation
    const deltaAlpha = this._angleDiff(alpha, this._initialAlpha);
    const deltaBeta = beta - this._initialBeta;

    // Use helper to apply movement logic
    this.applyDeltas(deltaAlpha, deltaBeta);
  }

  // Helper: shortest signed angle difference (degrees)
  _angleDiff(a, b) {
    let diff = a - b;
    while (diff < -180) diff += 360;
    while (diff > 180) diff -= 360;
    return diff;
  }

  /**
   * Update VR button appearance based on VR state
   */
  updateVRButton() {
    if (!this.vrButton) return;

    if (this.isVRActive) {
      this.vrButton.classList.add('vr-active');
      this.vrButton.textContent = '🥽 Exit VR';
      this.vrButton.title = 'Exit VR mode';
    } else {
      this.vrButton.classList.remove('vr-active');
      this.vrButton.textContent = '🥽 Enter VR';
      this.vrButton.title = 'Enter VR mode (Cardboard)';
    }
  }
}

// Export singleton instance
export const vrController = new VRController();
