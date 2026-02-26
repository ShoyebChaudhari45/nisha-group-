import fitz  # PyMuPDF
import os

pdf_path = r"c:\Shoyeb\nisha group\Nisha Profile.pdf"
output_dir = r"c:\Shoyeb\nisha group\assets\images"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)

print(f"Total pages: {doc.page_count}")
print("="*80)

# Extract text from each page
for page_num in range(doc.page_count):
    page = doc[page_num]
    text = page.get_text()
    print(f"\n--- PAGE {page_num + 1} ---")
    print(text)
    print("="*80)

# Extract images from each page - render pages as images
for page_num in range(doc.page_count):
    page = doc[page_num]
    # Render the page at high resolution
    mat = fitz.Matrix(2, 2)  # 2x zoom for quality
    pix = page.get_pixmap(matrix=mat)
    img_path = os.path.join(output_dir, f"page_{page_num + 1}.png")
    pix.save(img_path)
    print(f"Saved page {page_num + 1} as {img_path}")

# Also extract embedded images
img_count = 0
for page_num in range(doc.page_count):
    page = doc[page_num]
    image_list = page.get_images(full=True)
    for img_index, img_info in enumerate(image_list):
        xref = img_info[0]
        try:
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            img_width = base_image["width"]
            img_height = base_image["height"]
            # Only save larger images (likely project photos, logos)
            if img_width > 100 and img_height > 100:
                img_count += 1
                img_path = os.path.join(output_dir, f"extracted_p{page_num+1}_img{img_index}.{image_ext}")
                with open(img_path, "wb") as f:
                    f.write(image_bytes)
                print(f"Extracted image from page {page_num+1}: {img_width}x{img_height} -> {img_path}")
        except Exception as e:
            print(f"Error extracting image from page {page_num+1}, xref {xref}: {e}")

print(f"\nTotal extracted images: {img_count}")
doc.close()
