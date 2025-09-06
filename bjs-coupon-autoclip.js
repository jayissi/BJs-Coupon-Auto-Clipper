/*
#!/usr/bin/env node

==UserScript==
@name         BJ's Coupon Auto-Clipper
@namespace    https://www.tampermonkey.net
@version      1.0
@description  Automatically clips all BJ's coupons as they load on the page, with counter display
@author       Johnny J. Ayissi
@match        https://www.bjs.com/myCoupons
@grant        none
==/UserScript==
*/

(function() {
    'use strict';

    let clipCount = 0;
    let counterBox;

    // Add a floating counter to the page
    function addCounter() {
        counterBox = document.createElement("div");
        counterBox.style.position = "fixed";
        counterBox.style.bottom = "20px";
        counterBox.style.right = "20px";
        counterBox.style.background = "rgba(0, 128, 0, 0.8)";
        counterBox.style.color = "#fff";
        counterBox.style.padding = "8px 12px";
        counterBox.style.borderRadius = "8px";
        counterBox.style.fontSize = "14px";
        counterBox.style.zIndex = "99999";
        counterBox.style.fontFamily = "Arial, sans-serif";
        counterBox.textContent = "Coupons clipped: 0";
        document.body.appendChild(counterBox);
    }

    // Update the floating counter
    function updateCounter() {
        if (counterBox) {
            counterBox.textContent = `Coupons clipped: ${clipCount}`;
        }
    }

    // Function to clip coupons
    function clipCoupons() {
        const buttons = document.querySelectorAll(
            'button.Buttonstyle__StyledButton-sc-1p91mnj-0.cyDgas'
        );

        buttons.forEach(btn => {
            if (!btn.dataset.clicked) {
                btn.click();
                btn.dataset.clicked = "true"; // mark so we don't double click
                clipCount++;
                updateCounter();
                console.log("✅ Coupons clipped:", clipCount);
            }
        });
    }

    // Main entry point
    function main() {
        // Run once on page load
        addCounter();
        clipCoupons();

        // Watch for dynamically loaded coupons
        const observer = new MutationObserver(() => {
            clipCoupons();
        });

        // Start observing the body for added/removed elements
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Run script
    main();
})();
