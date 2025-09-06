# 🛒 BJ's Coupon Auto-Clipper

![Node.js](https://img.shields.io/badge/node.js-22.18+-5FA04E?logo=nodedotjs&logoColor=5FA04E&label=Node.js) <!-- https://nodejs.org/en/about/branding -->
![Python](https://img.shields.io/badge/python-3.13+-306998?logo=python&logoColor=FFD43B&label=Python) <!-- https://brandpalettes.com/python-logo-colors -->

Automatically clips all coupons on [BJ's Wholesale](https://www.bjs.com/myCoupons) without having to click them one by one.  
Works as a **Tampermonkey userscript** (recommended) or as a one-time script you paste into the browser console.

<p align="center">
<img alt="Node.js® Logo" src="https://nodejs.org/static/logos/nodejsDark.svg" width="267" height="80">
<img alt="Node.js® Mascot" src="https://nodejs.org/static/images/node-mascot.svg" width="100" height="80">  
</p>

---

## ✨ Features

- ✅ Auto-clips all coupons on page load  
- ✅ Detects new coupons as you scroll (no refresh needed)  
- ✅ Lightweight and efficient (uses `MutationObserver`)  
- ✅ Works in both **Tampermonkey** and **browser console**  

---

## ⚙️ Installation (Tampermonkey – Recommended)

1. Install [Tampermonkey](https://www.tampermonkey.net/) extension for your browser.  
   - [Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - [Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
2. Click the Tampermonkey icon → **Create a new script**.  
3. Delete the default template and paste in the script from [`bjs-coupon-autoclip.js`](bjs-coupon-autoclip.js).  
4. Save the script (`Ctrl+S`).  
5. Navigate to [BJ’s Coupons Page](https://www.bjs.com/myCoupons).  
6. Coupons will now clip automatically as they load 🎉  

---

## ⚡ One-Time Use (Browser Console)

If you don’t want to install Tampermonkey, you can run it manually:

1. Open [BJ’s Coupons Page](https://www.bjs.com/myCoupons).  
2. Press `F12` (or `Ctrl+Shift+I` / `Cmd+Opt+I` on Mac) to open **Developer Tools**.  
3. Go to the **Console** tab.  
4. Paste in the script. <!-- (without the Tampermonkey metadata block). -->
5. Hit **Enter** → coupons will start clipping.  

> [!IMPORTANT]
> Depending on browser settings, you may need to `allow pasting` before step 4.
<!-- IGNORE [`MD028` - Blank line inside blockquote](https://github.com/DavidAnson/markdownlint/blob/v0.38.0/doc/md028.md) -->
> [!WARNING]
> You’ll need to re-paste the script each time you refresh <br/>
> the webpage when using Browser Console method.

---

## 🛠 Script

```js
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

```

## 🙏 Credits

This project was inspired by [BJs](https://github.com/YesInAJiffy/BJs.git) GitHub repository created by [YesInAJiffy](https://github.com/YesInAJiffy).

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
