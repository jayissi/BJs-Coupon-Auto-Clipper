#!/usr/bin/env python3

import os

# File paths
js_file = os.path.join(os.path.dirname(__file__), '../bjs-coupon-autoclip.js')
template_file = os.path.join(os.path.dirname(__file__), 'README-template.md')
output_file = os.path.join(os.path.dirname(__file__), '../README.md')

# Read JS file
with open(js_file, 'r', encoding='utf-8') as f:
    js_code = f.read()

# Read template
with open(template_file, 'r', encoding='utf-8') as f:
    readme_template = f.read()

# Replace placeholder with fenced JS code
readme_content = readme_template.replace(
    '<!-- INSERT CODE HERE -->',
    f'```js\n{js_code}\n```'
)

# Write the updated README.md
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(readme_content)

print("✅ README.md updated with latest script!")
