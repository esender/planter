#!/usr/bin/env python3
"""Generate QR code images for all plant pages."""

import os
import qrcode
from PIL import Image, ImageDraw, ImageFont

BASE_URL = "https://qrooted.marat.dev"
PLANTS_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "content", "plants")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "qr")

# Fixed image dimensions for consistent sizing
IMG_WIDTH = 400
IMG_HEIGHT = 480
QR_SIZE = 360
PADDING = 20
BG_COLOR = "white"
TEXT_COLOR = "black"


def get_plants():
    """Read plant markdown files and extract slug + title."""
    plants = []
    for filename in sorted(os.listdir(PLANTS_DIR)):
        if not filename.endswith(".md"):
            continue
        slug = filename.replace(".md", "")
        filepath = os.path.join(PLANTS_DIR, filename)
        with open(filepath, "r") as f:
            for line in f:
                line = line.strip()
                if line.startswith("title:"):
                    title = line.split("title:", 1)[1].strip()
                    if (title.startswith('"') and title.endswith('"')) or \
                       (title.startswith("'") and title.endswith("'")):
                        title = title[1:-1]
                    plants.append((slug, title))
                    break
    return plants


def generate_qr_image(url, title, output_path):
    """Generate a QR code image with plant name below it."""
    # Generate QR code
    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=2,
    )
    qr.add_data(url)
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white").convert("RGB")
    qr_img = qr_img.resize((QR_SIZE, QR_SIZE), Image.NEAREST)

    # Create final image
    img = Image.new("RGB", (IMG_WIDTH, IMG_HEIGHT), BG_COLOR)
    # Center QR code horizontally
    qr_x = (IMG_WIDTH - QR_SIZE) // 2
    qr_y = PADDING
    img.paste(qr_img, (qr_x, qr_y))

    # Draw plant name below QR code
    draw = ImageDraw.Draw(img)

    # Try to find a good font, fall back to default
    font = None
    font_size = 24
    for font_path in [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
        "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf",
    ]:
        if os.path.exists(font_path):
            font = ImageFont.truetype(font_path, font_size)
            break

    if font is None:
        font = ImageFont.load_default()

    # Measure text and reduce font size if needed to fit width
    while font_size > 12:
        bbox = draw.textbbox((0, 0), title, font=font)
        text_width = bbox[2] - bbox[0]
        if text_width <= IMG_WIDTH - 2 * PADDING:
            break
        font_size -= 1
        for font_path in [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
            "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
            "/usr/share/fonts/TTF/DejaVuSans-Bold.ttf",
        ]:
            if os.path.exists(font_path):
                font = ImageFont.truetype(font_path, font_size)
                break

    bbox = draw.textbbox((0, 0), title, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    text_x = (IMG_WIDTH - text_width) // 2
    text_y = qr_y + QR_SIZE + (IMG_HEIGHT - qr_y - QR_SIZE - text_height) // 2

    draw.text((text_x, text_y), title, fill=TEXT_COLOR, font=font)

    img.save(output_path, "PNG")


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    plants = get_plants()

    for slug, title in plants:
        url = f"{BASE_URL}/plants/{slug}"
        output_path = os.path.join(OUTPUT_DIR, f"{slug}.png")
        generate_qr_image(url, title, output_path)
        print(f"Generated: {output_path}  ({title} -> {url})")

    print(f"\nDone! Generated {len(plants)} QR code images in {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
