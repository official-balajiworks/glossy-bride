import os
import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

srcs = re.findall(r'(?:src|srcset)="([^"]+)"', html)
missing = []
found = []
for s in srcs:
    clean = s.split('?')[0]
    if clean.startswith(('http', '#', 'data:')):
        continue
    if not os.path.exists(clean):
        missing.append(clean)
    else:
        found.append(clean)

print(f"Total local references checked: {len(found) + len(missing)}")
print(f"Missing files ({len(missing)}): {missing}")
print(f"Found files count: {len(found)}")

# List all categories and images
image_categories = ['hero', 'artist', 'bridal', 'nails', 'events', 'photoshoots', 'details']
for cat in image_categories:
    cat_dir = os.path.join('assets', 'images', cat)
    if os.path.exists(cat_dir):
        files = os.listdir(cat_dir)
        print(f"Category {cat}: {len(files)} files -> {files}")
    else:
        print(f"Category {cat}: MISSING DIRECTORY!")

