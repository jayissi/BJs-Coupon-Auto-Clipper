# 🛠 README Generator for BJ's Coupon Auto-Clipper

This setup keeps your `README.md` automatically in sync with your script file (`bjs-coupon-autoclip.js`).  
Instead of copy-pasting code manually, a Python script injects your JavaScript into a README template, `README-template.md`.

---

## 📂 Files Overview

- **`bjs-coupon-autoclip.js`**  
  Your Tampermonkey userscript. This JavaScript code is the source of truth.  

- **`README.template.md`**  
  A Markdown template for your README.  
  It contains all text **except the script code**, with a placeholder:  

  ```markdown
  <!-- INSERT CODE HERE -->
  ```

- **`update_readme.py`**  
  A Python script that:

  1. Reads the JavaScript file.  
  2. Reads the README template.  
  3. Replaces `<!-- INSERT CODE HERE -->` with the script in a fenced code block.  
  4. Saves the final output as `README.md`.  

---

## ⚡ Usage

1. Edit your script in **`bjs-coupon-autoclip.js`**.  
2. Run the Python update script:

   ```bash
   python update_readme.py
   ```

3. A new **`README.md`** will be generated with the latest code included.  

---

## ✨ Benefits

- No more manual copy-pasting code into the `README.md`.  
- Keeps documentation **always up-to-date**.  
- Easy to maintain when the script changes.  
