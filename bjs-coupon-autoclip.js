// ==UserScript==
// @name         BJ's Coupon Auto-Clipper
// @namespace    https://www.tampermonkey.net
// @version      1.0.1
// @description  Automatically clips BJ's coupons as they load
// @author       Johnny J. Ayissi
// @match        https://www.bjs.com/myCoupons
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  let clipCount = 0;
  let counterBox = null;
  const clickQueue = [];
  let processing = false;

  function addCounter() {
    counterBox = document.createElement('div');
    Object.assign(counterBox.style, {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: 'rgba(0, 128, 0, 0.85)',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '14px',
      zIndex: '999999',
      fontFamily: 'Arial, sans-serif',
    });
    counterBox.textContent = 'Coupons clipped: 0';
    document.body.appendChild(counterBox);
  }

  function updateCounter() {
    if (counterBox) counterBox.textContent = `Coupons clipped: ${clipCount}`;
  }

  function enqueueButton(btn) {
    if (!btn || btn.dataset.clicked || btn.dataset.enqueued) return;
    btn.dataset.enqueued = 'true';
    clickQueue.push(btn);
  }

  function processQueue(delayMs = 150) {
    if (processing) return;
    processing = true;

    function next() {
      if (clickQueue.length === 0) {
        processing = false;
        return;
      }
      const btn = clickQueue.shift();
      try {
        if (btn && !btn.dataset.clicked) {
          btn.click();
          btn.dataset.clicked = 'true';
          clipCount++;
          updateCounter();
          console.log('✅ Clipped a coupon:', btn.innerText || btn.textContent || btn);
        }
      } catch (err) {
        console.warn('Click error:', err);
      }
      setTimeout(next, delayMs);
    }

    next();
  }

  function scanAndEnqueue() {
    const sel = [
      'button[name="clipToCard"]',
      'button.Buttonstyle__StyledButton-sc-1p91mnj-0.cyDgas',
    ].join(',');

    const buttons = document.querySelectorAll(sel);
    buttons.forEach(enqueueButton);

    processQueue(120);
  }

  function main() {
    addCounter();
    scanAndEnqueue();

    const observer = new MutationObserver(scanAndEnqueue);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  main();
})();
