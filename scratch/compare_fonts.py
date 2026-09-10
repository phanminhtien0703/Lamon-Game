import urllib.request
from PIL import Image, ImageDraw, ImageFont

ttf_dict = {
    "Cinzel Viet Hoa (Custom)": "Cinzel-VietHoa-Bold.ttf",
    "Alegreya SC (Google Fonts)": "https://fonts.gstatic.com/s/alegreyasc/v28/taiTGmRtCJ62-O0HhNEa-ZYI_7Ux.ttf",
    "Cormorant SC (Google Fonts)": "https://fonts.gstatic.com/s/cormorantsc/v19/0ybmGD4kxqXBmOVLG30OGwsmEBUU_Q.ttf",
    "Bona Nova SC (Google Fonts)": "https://fonts.gstatic.com/s/bonanovasc/v1/memmYaShyGWDiYdPG_c1Af4G6c1MAg.ttf",
    "Playfair Display SC (Google Fonts)": "https://fonts.gstatic.com/s/playfairdisplaysc/v18/ke80OhoaMkR6-hSn7kbHVoFf7ZfgMPr_nTorNcs.ttf",
    "Grenze Gotisch (Google Fonts)": "https://fonts.gstatic.com/s/grenzegotisch/v20/Fh4hPjjqNDz1osh_jX9YfjudpBJBNV5y5wf_k1i5yDhUcA.ttf"
}

img = Image.new("RGB", (1240, 1080), color=(8, 12, 22))
draw = ImageDraw.Draw(img)

test_title = "BÁT ĐẠI MÔN PHÁI — TỰ DO CHUYỂN PHÁI"
test_event = "ĐUA TOP TÍNH NĂNG NHẬN THẦN TRANG MMORPG"

y = 30
for name, path_or_url in ttf_dict.items():
    fn = name.split()[0].lower() + ".ttf"
    if path_or_url.startswith("http"):
        try:
            urllib.request.urlretrieve(path_or_url, fn)
            font_path = fn
        except Exception as e:
            print(f"Error downloading {name}: {e}")
            continue
    else:
        font_path = path_or_url

    try:
        font_large = ImageFont.truetype(font_path, 30)
        font_small = ImageFont.truetype(font_path, 21)
        font_label = ImageFont.truetype("arial.ttf", 16)
        
        draw.text((40, y), f"FONT: {name}", fill=(245, 158, 11), font=font_label)
        draw.text((40, y + 26), test_title, fill=(255, 255, 255), font=font_large)
        draw.text((40, y + 68), test_event, fill=(252, 211, 77), font=font_small)
        draw.line([(40, y + 105), (1200, y + 105)], fill=(30, 41, 59), width=1)
        y += 122
    except Exception as e:
        print(f"Error rendering {name}: {e}")

img.save("font_comparison.png")
print("Comparison image saved to font_comparison.png")
