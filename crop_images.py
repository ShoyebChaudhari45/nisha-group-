from PIL import Image
import os

output_dir = r"c:\Shoyeb\nisha group\assets\images"

# Crop the logo from page 1 (center area with lotus/bird-of-paradise)
page1 = Image.open(os.path.join(output_dir, "page_1.png"))
w, h = page1.size
# Logo is centered, roughly in the middle third
logo = page1.crop((w*0.27, h*0.25, w*0.78, h*0.72))
logo.save(os.path.join(output_dir, "logo.png"))
print(f"Logo saved: {logo.size}")

# Also save the full logo with transparent bg from page 1
# The logo area is approximately the bird-of-paradise + text area
logo_area = page1.crop((w*0.30, h*0.28, w*0.75, h*0.68))
logo_area.save(os.path.join(output_dir, "logo_full.png"))

# Crop project images from the specific pages
# Page 7 - Jai Sereneity (completed)
page7 = Image.open(os.path.join(output_dir, "page_7.png"))
w7, h7 = page7.size
jai_serenity = page7.crop((w7*0.30, h7*0.35, w7*0.88, h7*0.95))
jai_serenity.save(os.path.join(output_dir, "project_jai_serenity.jpg"), quality=90)
print(f"Jai Serenity saved: {jai_serenity.size}")

# Page 8 - Nisha's Pride Landmark (completed)
page8 = Image.open(os.path.join(output_dir, "page_8.png"))
w8, h8 = page8.size
pride_landmark = page8.crop((w8*0.30, h8*0.35, w8*0.88, h8*0.95))
pride_landmark.save(os.path.join(output_dir, "project_pride_landmark.jpg"), quality=90)
print(f"Pride Landmark saved: {pride_landmark.size}")

# Page 9 - JP Heights (completed)
page9 = Image.open(os.path.join(output_dir, "page_9.png"))
w9, h9 = page9.size
jp_heights = page9.crop((w9*0.30, h9*0.35, w9*0.88, h9*0.95))
jp_heights.save(os.path.join(output_dir, "project_jp_heights.jpg"), quality=90)
print(f"JP Heights saved: {jp_heights.size}")

# Page 10 - Mulay Tapadia Complex (completed)
page10 = Image.open(os.path.join(output_dir, "page_10.png"))
w10, h10 = page10.size
mulay_tapadia = page10.crop((w10*0.30, h10*0.30, w10*0.88, h10*0.90))
mulay_tapadia.save(os.path.join(output_dir, "project_mulay_tapadia.jpg"), quality=90)
print(f"Mulay Tapadia saved: {mulay_tapadia.size}")

# Page 11 - Hotel Stay Inn (completed)
page11 = Image.open(os.path.join(output_dir, "page_11.png"))
w11, h11 = page11.size
hotel_stay_inn = page11.crop((w11*0.30, h11*0.30, w11*0.88, h11*0.90))
hotel_stay_inn.save(os.path.join(output_dir, "project_hotel_stay_inn.jpg"), quality=90)
print(f"Hotel Stay Inn saved: {hotel_stay_inn.size}")

# Page 12 - Ekdant (ongoing)
page12 = Image.open(os.path.join(output_dir, "page_12.png"))
w12, h12 = page12.size
ekdant = page12.crop((w12*0.30, h12*0.30, w12*0.95, h12*0.90))
ekdant.save(os.path.join(output_dir, "project_ekdant.jpg"), quality=90)
print(f"Ekdant saved: {ekdant.size}")

# Page 13 - Jai Nilaya (ongoing)
page13 = Image.open(os.path.join(output_dir, "page_13.png"))
w13, h13 = page13.size
jai_nilaya = page13.crop((w13*0.35, h13*0.30, w13*0.95, h13*0.95))
jai_nilaya.save(os.path.join(output_dir, "project_jai_nilaya.jpg"), quality=90)
print(f"Jai Nilaya saved: {jai_nilaya.size}")

# Page 14 - Gokuldham (ongoing)
page14 = Image.open(os.path.join(output_dir, "page_14.png"))
w14, h14 = page14.size
gokuldham = page14.crop((w14*0.35, h14*0.25, w14*0.95, h14*0.95))
gokuldham.save(os.path.join(output_dir, "project_gokuldham.jpg"), quality=90)
print(f"Gokuldham saved: {gokuldham.size}")

print("\nAll images cropped successfully!")
