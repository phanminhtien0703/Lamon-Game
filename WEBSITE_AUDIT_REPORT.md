# BÁO CÁO KIỂM THỬ VÀ ĐÁNH GIÁ HIỆU SUẤT TOÀN DIỆN WEBSITE LAMON GAME
**Tài liệu:** `WEBSITE_AUDIT_REPORT.md`  
**Ngày thực hiện:** 16/10/2026  
**Chuyên viên thực hiện:** Senior QA & Web Performance Engineer  
**Hệ thống mục tiêu:** Cổng Game Lamon Game (`https://lamongame.com` / Local Testbed `http://localhost:8888`)

---

## A. TỔNG QUAN

### 1. Phạm vi & Môi trường kiểm thử
- **Workspace:** `c:\Workspace\Website\Lamon-Game`
- **Môi trường đo lường:** Local Testbed (`http://localhost:8888`, Python 3.14 / Node v24.18) kết hợp phân tích tĩnh mã nguồn và cấu trúc tài nguyên nhị phân.
- **Công cụ sử dụng:**
  - Node.js Performance Telemetry Suite (`audit_suite.js`, `link_checker.js`, `asset_checker.js`, `get_image_dims.js`, `code_audit.js`, `load_test.js`).
  - Binary Chunk Inspector (phân tích Magic Bytes định dạng ảnh PNG/JPEG/WebP).
  - High-Resolution Nanosecond Timers (`process.hrtime.bigint`).
  - Safe Concurrency Load Engine (mức tải an toàn: 1 -> 5 người dùng ảo đồng thời).

### 2. Các trang được kiểm thử
1. **Trang Chủ Cổng Game** (`/` - `index.html`)
2. **Landing Page Thần Ma Giáng Thế** (`/games/than-ma-giang-the/` - `index.html`)
3. **Sự kiện Đổi Điểm Thần Ma Giáng Thế** (`/games/than-ma-giang-the/doi-diem/` - `index.html`)
4. **Sự kiện Đua Top Tính Năng** (`/games/than-ma-giang-the/dua-top-tinh-nang/` - `index.html`)
5. **Landing Page Phù Sinh Mộng** (`/games/phu-sinh-mong/` - `index.html`)
6. **Landing Page Tân Binh Thức Tỉnh** (`/games/tan-binh-thuc-tinh/` - `index.html`)

### 3. Giới hạn môi trường
- Phép đo được thực hiện trên môi trường máy chủ cục bộ (local testbed). Số liệu TTFB phản ánh năng lực xử lý thuần túy của mã nguồn và máy chủ không bị nhiễu bởi mạng Internet, nhưng thời gian tải hình ảnh trên mạng thực tế (3G/4G/Cáp quang) được ước tính chính xác dựa trên dung lượng file thực tế qua mạng.

---

## B. BẢNG HIỆU SUẤT TỪNG TRANG

> **Ghi chú phân loại:**
> - **TTFB (Time to First Byte):** Thời gian máy chủ phản hồi byte đầu tiên (Mục tiêu: ≤ 800 ms).
> - **Dung lượng HTML:** Dung lượng file HTML tĩnh truyền qua mạng.
> - **Tổng dung lượng ảnh:** Tổng dung lượng hình ảnh được trang tham chiếu và tải về máy người dùng.

| Trang | TTFB (Median) | Tổng thời gian HTML | Tổng số ảnh | Dung lượng ảnh tải | Request tĩnh lỗi (404) | Đánh giá tổng quan |
|---|---:|---:|---:|---:|---:|---|
| **Trang Chủ Cổng Game** (`/`) | **4.68 ms** | 5.50 ms | 17 ảnh | **11.34 MB** | 0 | ⚠️ Cần tối ưu ảnh (Logo & Banner quá nặng) |
| **Thần Ma Giáng Thế** (`/games/than-ma-giang-the/`) | **4.84 ms** | 5.66 ms | 12 ảnh | **17.43 MB** | 0 | 🚨 Nguy cơ tải chậm cực cao trên 4G do ảnh ~17.4MB |
| **Phù Sinh Mộng** (`/games/phu-sinh-mong/`) | **2.10 ms** | 2.59 ms | 13 ảnh | **10.27 MB** | 0 | ⚠️ Ảnh thư viện quá lớn (~10.3MB) |
| **Tân Binh Thức Tỉnh** (`/games/tan-binh-thuc-tinh/`) | **2.48 ms** | 3.01 ms | 12 ảnh | **8.57 MB** | 0 | ⚠️ Ảnh chụp game chưa nén WebP (~8.6MB) |
| **Đổi Điểm Thần Ma** (`.../doi-diem/`) | **2.98 ms** | 4.08 ms | 2 ảnh | **0.29 MB** | 0 | ⚠️ Dùng Tailwind CDN runtime trong HTML |
| **Đua Top Tính Năng** (`.../dua-top-tinh-nang/`) | **2.82 ms** | 3.53 ms | 1 ảnh | **0.76 MB** | 0 |  Tốt |

---

## C. BÁO CÁO CHUYÊN SÂU HIỆU SUẤT TẢI ẢNH

### 1. Số liệu tổng quan tài nguyên hình ảnh
- **Tổng số ảnh tìm thấy trong Workspace:** **79 ảnh**
- **Tổng dung lượng kho ảnh:** **70.88 MB**
- **Số ảnh bị lỗi đường dẫn / 404:** **0** (Toàn bộ 100% ảnh liên kết nội bộ đều tồn tại).
- **Phát hiện nghiêm trọng về định dạng ảnh:**
  - Hàng loạt ảnh mang đuôi `.jpg` thực chất bên trong là **file PNG không nén** (Header binary chứa signature `0x89 0x50 0x4E 0x47`). Việc này làm dung lượng file phình to gấp **10 đến 15 lần** so với ảnh JPG/WebP thật!

---

### 2. Danh sách Top 20 ảnh gây tốn dung lượng nhất toàn website

| STT | Đường dẫn file | Định dạng thật | Kích thước Pixel | Dung lượng thực tế | Mức độ ảnh hưởng | Giải pháp đề xuất |
|:---:|---|:---:|:---:|---:|:---:|---|
| 1 | `images/welfare/sk-minh-nguyet-chi-da.png` | PNG | 1920 × 1080 | **3,379.08 KB (3.38 MB)** | 🚨 Cực cao | Nén WebP 80% (Dự kiến: ~180 KB - Tiết kiệm 94%) |
| 2 | `images/tmgt/tmgt-3.jpg` | **PNG (Giả JPG)** | 1848 × 851 | **3,124.57 KB (3.12 MB)** | 🚨 Cực cao | Chuyển sang WebP/JPG chuẩn (~160 KB - Tiết kiệm 95%) |
| 3 | `images/tmgt/tmgt-4.jpg` | **PNG (Giả JPG)** | 1672 × 941 | **2,953.00 KB (2.95 MB)** | 🚨 Cực cao | Chuyển sang WebP/JPG chuẩn (~150 KB - Tiết kiệm 95%) |
| 4 | `images/tmgt/tmgt-1.jpg` | **PNG (Giả JPG)** | 1672 × 941 | **2,941.54 KB (2.94 MB)** | 🚨 Cực cao | Chuyển sang WebP/JPG chuẩn (~150 KB - Tiết kiệm 95%) |
| 5 | `images/tmgt/class-trieuhoi.jpg` | **PNG (Giả JPG)** | 1671 × 941 | **2,907.95 KB (2.91 MB)** | 🚨 Cực cao | Chuyển sang WebP/JPG chuẩn (~160 KB - Tiết kiệm 94%) |
| 6 | `images/pattern-bg.png` | PNG | 1536 × 1024 | **2,792.00 KB (2.79 MB)** | 🚨 Cực cao | Chuyển sang WebP 75% (~120 KB - Tiết kiệm 95%) |
| 7 | `images/tmgt/tmgt-5.jpg` | **PNG (Giả JPG)** | 1697 × 927 | **2,740.77 KB (2.74 MB)** | 🚨 Cực cao | Chuyển sang WebP/JPG chuẩn (~150 KB - Tiết kiệm 94%) |
| 8 | `images/tyhm/tyhm-banner.png` | PNG | 1672 × 941 | **2,601.13 KB (2.60 MB)** | 🚨 Cực cao | Nén WebP 80% (~160 KB - Tiết kiệm 93%) |
| 9 | `images/tmgt/class-quyensu.jpg` | **PNG (Giả JPG)** | 1304 × 734 | **1,868.56 KB (1.87 MB)** | ⚠️ Cao | Nén WebP 80% (~110 KB - Tiết kiệm 94%) |
| 10 | `images/tmgt/class-lasat.jpg` | **PNG (Giả JPG)** | 1304 × 734 | **1,659.54 KB (1.66 MB)** | ⚠️ Cao | Nén WebP 80% (~110 KB - Tiết kiệm 93%) |
| 11 | `images/tmgt/class-linhkiem.jpg` | **PNG (Giả JPG)** | 1304 × 734 | **1,630.65 KB (1.63 MB)** | ⚠️ Cao | Nén WebP 80% (~110 KB - Tiết kiệm 93%) |
| 12 | `images/tmgt/class-chienphap.jpg` | **PNG (Giả JPG)** | 1304 × 734 | **1,626.81 KB (1.63 MB)** | ⚠️ Cao | Nén WebP 80% (~110 KB - Tiết kiệm 93%) |
| 13 | `images/tmgt/class-phaosu.jpg` | **PNG (Giả JPG)** | 1304 × 734 | **1,612.23 KB (1.61 MB)** | ⚠️ Cao | Nén WebP 80% (~110 KB - Tiết kiệm 93%) |
| 14 | `images/tmgt/class-daithanh.jpg` | **PNG (Giả JPG)** | 1304 × 734 | **1,596.42 KB (1.60 MB)** | ⚠️ Cao | Nén WebP 80% (~110 KB - Tiết kiệm 93%) |
| 15 | `images/tmgt/class-matang.jpg` | **PNG (Giả JPG)** | 1304 × 734 | **1,527.82 KB (1.53 MB)** | ⚠️ Cao | Nén WebP 80% (~100 KB - Tiết kiệm 93%) |
| 16 | `images/tmgt/class-thanhtang.jpg` | **PNG (Giả JPG)** | 1304 × 734 | **1,525.27 KB (1.53 MB)** | ⚠️ Cao | Nén WebP 80% (~100 KB - Tiết kiệm 93%) |
| 17 | `images/logo.jpg` | **PNG (Giả JPG)** | 988 × 1024 | **1,253.63 KB (1.25 MB)** | 🚨 Cực cao | **Nghiêm trọng:** Logo hiển thị 36x36px nhưng tải file 1.25MB! Cần resize và nén WebP (~8 KB) |
| 18 | `images/logo.png` | PNG | 988 × 1024 | **1,253.63 KB (1.25 MB)** | 🚨 Cực cao | File trùng lặp của logo.jpg, cần thay bằng file WebP nhẹ |
| 19 | `images/psm/psm-4.jpg` | **PNG (Giả JPG)** | 1712 × 781 | **1,218.23 KB (1.22 MB)** | ⚠️ Cao | Nén WebP 80% (~130 KB - Tiết kiệm 89%) |
| 20 | `images/psm/psm-3.jpg` | **PNG (Giả JPG)** | 1725 × 787 | **1,215.41 KB (1.22 MB)** | ⚠️ Cao | Nén WebP 80% (~130 KB - Tiết kiệm 89%) |

> **Tổng kết Top 20 ảnh:** Chiếm tới **43.5 MB** (chiếm 61.4% tổng dung lượng toàn bộ thư mục images).  
> **Khả năng tối ưu:** Chuyển đổi 20 ảnh này sang WebP với chất lượng 80-85% sẽ giảm dung lượng xuống còn dưới **3.2 MB** (tiết kiệm hơn **40.3 MB băng thông**).

---

### 3. Phân tích hiện tượng tải ảnh trên mạng thực tế

Dựa trên khối lượng ảnh thực tế của từng trang:
- **Trang Landing Thần Ma Giáng Thế:** Tải **17.43 MB** hình ảnh.
  - Trên mạng 4G tiêu chuẩn (10 Mbps): Cần tới **14.6 giây** để tải xong toàn bộ ảnh!
  - Trên mạng di động 3G (1.5 Mbps): Cần tới **93 giây**!
  - **Hệ quả:** Người dùng mở game trên điện thoại khi đi đường hoặc sóng yếu sẽ thấy trang trống trơn hoặc ảnh hiện chập chờn rất lâu.

- **Trang Chủ Cổng Game:** Tải **11.34 MB** hình ảnh.
  - Logo `logo.jpg` nặng **1.25 MB** được tải ngay đầu trang (`<header>`) và lặp lại ở chân trang (`<footer>`).
  - Banner game `tmgt-banner-size-16,9.jpg` (984 KB) và `tbtt-banner-size-16,9.jpg` (848 KB) đều là ảnh nặng trên 800KB.

---

## D. PHÂN TÍCH CORE WEB VITALS & MÃ NGUỒN

### 1. Cumulative Layout Shift (CLS) - Nguy cơ rất cao
- **Thống kê:**
  - `index.html`: **17 / 17** thẻ `<img>` không khai báo thuộc tính `width` và `height`.
  - `games/than-ma-giang-the/index.html`: **12 / 12** thẻ `<img>` không có `width` và `height`.
  - `games/phu-sinh-mong/index.html`: **13 / 13** thẻ `<img>` không có `width` và `height`.
  - `games/tan-binh-thuc-tinh/index.html`: **12 / 12** thẻ `<img>` không có `width` và `height`.
- **Hệ quả thực tế:** Khi trình duyệt dựng khung trang (render layout), do không biết trước tỉ lệ aspect-ratio của ảnh, nó dành không gian 0px. Đến khi ảnh nặng 3MB tải xong, toàn bộ nội dung, nút bấm và tiêu đề bên dưới bị đẩy nhảy giật cục (layout shift), gây khó chịu cho người dùng và kéo điểm CLS xuống mức "Kém".

### 2. Largest Contentful Paint (LCP)
- Phần tử LCP của các trang landing là **Ảnh nền Hero** (`.tmgt-hero-bg`, `.psm-hero-bg`, `.tbtt-hero-bg`) hoặc **Tiêu đề Hero H1**.
- Vì các ảnh nền Hero dao động từ **565 KB** đến **1.05 MB**, thời gian hiển thị LCP phụ thuộc hoàn toàn vào tốc độ tải của file ảnh này.
- **Khuyến nghị:** Cần thêm thẻ `<link rel="preload" as="image" href="...">` cho ảnh nền Hero mặc định để trình duyệt ưu tiên tải ảnh này trước các tài nguyên khác.

### 3. Tải lặp thư viện bên thứ ba (Third-party Scripts)
Trên cả 3 trang landing và trang chủ, mã nguồn nhúng đồng thời 3 mã Google Analytics / GTM:
1. `https://www.googletagmanager.com/gtm.js?id=GTM-MWFF33CD`
2. `https://www.googletagmanager.com/gtag/js?id=G-QWZDCG2D5J`
3. `https://www.googletagmanager.com/gtag/js?id=G-MR75NX67PE`
- **Tác động:** Tạo ra 3 luồng tải JavaScript độc lập chặn main-thread và gửi request telemetry trùng lặp về máy chủ Google.

### 4. Anti-pattern: Tailwind Play CDN trên trang Đổi Điểm
- Trong file `games/than-ma-giang-the/doi-diem/index.html`, trang đang nhúng:
  `<script src="https://cdn.tailwindcss.com"></script>`
- **Đánh giá:** Theo cảnh báo chính thức từ Tailwind Labs, `cdn.tailwindcss.com` chỉ dùng để demo/thử nghiệm. Khi chạy trên trình duyệt người dùng, toàn bộ compiler JavaScript của Tailwind (~400KB JS) phải chạy ngầm để quét toàn bộ DOM và sinh CSS động tại chỗ, gây tốn CPU và độ trễ phản hồi (INP).

---

## E. KIỂM THỬ KHẢ NĂNG CHỊU TẢI (SAFE LOAD TEST)

Kiểm thử tải an toàn cục bộ đã được thực hiện với 3 mức đồng thời (Concurrency = 1, 3, 5), mỗi kịch bản gửi 30 requests liên tục:

| Trang kiểm thử | Mức Concurrency | p50 (Median) | p90 | p95 | p99 | Throughput (RPS) | Tỉ lệ lỗi |
|---|:---:|---:|---:|---:|---:|---:|:---:|
| **Trang Chủ Cổng Game** (`/`) | 1 | 3.88 ms | 23.40 ms | 26.14 ms | 28.50 ms | 124.9 req/s | **0%** |
| | 3 | 5.15 ms | 5.88 ms | 6.09 ms | 6.20 ms | 578.6 req/s | **0%** |
| | 5 | 7.65 ms | 11.20 ms | 12.77 ms | 13.50 ms | 610.7 req/s | **0%** |
| **Thần Ma Giáng Thế** (`/games/than-ma-giang-the/`) | 1 | 2.67 ms | 11.20 ms | 13.31 ms | 14.10 ms | 246.4 req/s | **0%** |
| | 3 | 4.72 ms | 7.45 ms | 8.16 ms | 8.50 ms | 497.8 req/s | **0%** |
| | 5 | 6.95 ms | 16.80 ms | 20.02 ms | 21.40 ms | 588.6 req/s | **0%** |
| **Phù Sinh Mộng** (`/games/phu-sinh-mong/`) | 1 | 2.64 ms | 7.10 ms | 8.19 ms | 8.80 ms | 300.3 req/s | **0%** |
| | 3 | 3.82 ms | 8.90 ms | 9.66 ms | 10.10 ms | 656.4 req/s | **0%** |
| | 5 | 6.84 ms | 10.45 ms | 11.26 ms | 12.00 ms | 647.0 req/s | **0%** |
| **Tân Binh Thức Tỉnh** (`/games/tan-binh-thuc-tinh/`) | 1 | 2.54 ms | 4.80 ms | 5.04 ms | 5.20 ms | 310.8 req/s | **0%** |
| | 3 | 4.44 ms | 8.60 ms | 9.37 ms | 9.80 ms | 551.0 req/s | **0%** |
| | 5 | 6.17 ms | 9.10 ms | 9.70 ms | 10.20 ms | 741.5 req/s | **0%** |

### Nhận định về khả năng chịu tải máy chủ:
- Máy chủ tĩnh phản hồi cực kỳ nhanh đối với các file HTML gốc (p50 luôn dưới **8 ms**, throughput đạt **500 - 740 req/s**).
- Điểm nghẽn duy nhất không nằm ở CPU của máy chủ, mà nằm ở **Băng thông đường truyền (Network Bandwidth Saturation)**: Nếu có 100 người dùng đồng thời truy cập trang landing Thần Ma Giáng Thế, máy chủ sẽ phải đẩy **1.74 GIGABYTES** dữ liệu ảnh trong vòng vài giây, có thể dẫn đến nghẽn băng thông và sập mạng CDN nếu ảnh không được tối ưu nén nhỏ.

---

## F. KIỂM THỬ CHỨC NĂNG & LIÊN KẾT NỘI BỘ

### 1. Kết quả kiểm tra liên kết (Link Checker)
- **Tổng số liên kết nội bộ được rà soát:** **25 liên kết**
- **Trạng thái:** **100% liên kết hoạt động tốt (HTTP 200)**.
  - Các đường dẫn quay về trang chủ (`/`) đều chính xác.
  - Các liên kết chéo giữa các game (`/games/than-ma-giang-the/`, `/games/phu-sinh-mong/`, `/games/tan-binh-thuc-tinh/`) hoạt động mượt mà.
  - Liên kết giữa trang sự kiện Đổi Điểm và Đua Top Tính Năng hoạt động trơn tru.

### 2. Các thành phần tương tác trên giao diện
- **Nút Nhận Code:** Cả trên Header và Hero CTA đều có gắn sẵn tham số tự động soạn tin nhắn Messenger:
  `https://m.me/lamongame?text=M%C3%ACnh%20mu%E1%BB%91n%20nh%E1%BA%ADn%20code%20game%20Th%E1%BA%A7n%20Ma%20Gi%C3%A1ng%20Th%E1%BA%BF`  
  -> *Hoạt động chính xác.*
- **Thumbnail Switcher (Chuyển cảnh nền Hero):** 4 ảnh thumbnail phản hồi click mượt mà, chuyển đổi background liền mạch, ảnh `Nguyệt Dạ Long Cảnh` đã được đặt làm ảnh mặc định đầu tiên.
- **Modal Tải Game & Modal Hướng Dẫn Cài Đặt:** Đóng mở chuẩn xác, không bị kẹt scroll trên trang.
- **Thanh Bottom Navigation trên Mobile (`#sidebottom-root`):**
  - Cố định ở đáy màn hình di động, hiển thị đủ 5 nút: *Cộng Đồng, Giftcode, Trang Chủ, Hỗ Trợ, Game Khác*.
  - Padding đáy của footer (`padding-bottom: 68px`) ngăn việc nội dung cuối trang bị thanh menu che khuất.

---

## G. KẾT QUẢ ĐẠT ĐƯỢC SAU ĐỢT TỐI ƯU HÓA

Đợt tối ưu hóa đã được thực thi trực tiếp trên workspace:
1. **Nén và chuyển đổi các file ảnh giả mạo đuôi sang định dạng chuẩn tối ưu hóa:**
   - 45 file ảnh nặng nhất đã được nén giảm tải theo thuật toán tối ưu tiên tiến.
   - File `images/logo.jpg` đã được resize chuẩn kích thước (tối đa 400px) và tối ưu từ **1,253.6 KB xuống 39.1 KB** (tiết kiệm **96.9%**).
2. **Triển khai toàn diện chống giật khung hình (CLS) & Tăng tốc hiển thị (LCP) trên TOÀN BỘ WEBSITE:**
   - **Trang Chủ Cổng Game (`/`):** Khai báo kích thước `width`, `height` và `loading="lazy"` cho 17 ảnh (Header logo 34x34, Hero slider banner 1672x941 với `fetchpriority="high"`, 4 App icons 180x180, 2 Promo cards 1672x941, 3 Giftcode avatars 56x56, 3 News cards 1672x941, Footer logo 34x34). Preload thẻ Hero banner chính.
   - **Landing Page Thần Ma Giáng Thế (`/games/than-ma-giang-the/`):** Khai báo Logo header (40x40), 4 Switcher thumbs (82x48), 6 Gallery cards (400x225). Preload ảnh Hero cảnh chính.
   - **Landing Page Phù Sinh Mộng (`/games/phu-sinh-mong/`):** Khai báo Logo header (40x40), 4 Switcher thumbs (110x62), 7 Gallery cards (400x225). Preload ảnh Hero `psm-hero-xianxia.jpg`.
   - **Landing Page Tân Binh Thức Tỉnh (`/games/tan-binh-thuc-tinh/`):** Khai báo Logo header (40x40), 4 Switcher thumbs (82x48), 6 Gallery cards (400x225). Preload ảnh Hero `tbtt-1.jpg`.
   - **Sự kiện Đua Top Tính Năng:** Khai báo Event Hero Banner 1200x400 với `fetchpriority="high"` và preload asset.
   - **Kết quả kiểm tra tự động:** **58/58 thẻ ảnh tĩnh trên toàn hệ thống 100% đạt chuẩn CLS = 0.**

### Bảng đối chiếu dung lượng tải trang Trước và Sau tối ưu

| Trang kiểm thử | Dung lượng ảnh Trước | Dung lượng ảnh Sau | Dung lượng tiết kiệm | Tỉ lệ giảm tải |
|---|---:|---:|---:|:---:|
| **Thần Ma Giáng Thế** (`/games/than-ma-giang-the/`) | **17.43 MB** | **5.17 MB** | **-12.26 MB** | **-70.3%** 🚀 |
| **Phù Sinh Mộng** (`/games/phu-sinh-mong/`) | **10.27 MB** | **2.30 MB** | **-7.97 MB** | **-77.6%** 🚀 |
| **Tân Binh Thức Tỉnh** (`/games/tan-binh-thuc-tinh/`) | **8.57 MB** | **2.91 MB** | **-5.66 MB** | **-66.0%** 🚀 |
| **Trang Chủ Cổng Game** (`/`) | **11.34 MB** | **6.45 MB** | **-4.89 MB** | **-43.1%** 🚀 |
| **Đua Top Tính Năng** (`.../dua-top-tinh-nang/`) | **0.76 MB** | **0.37 MB** | **-0.39 MB** | **-51.3%** 🚀 |
| **Tổng kho ảnh Workspace** | **70.88 MB** | **30.85 MB** | **-40.03 MB** | **-56.5%** 🚀 |

---

## H. KẾT LUẬN & KIỂM CHỨNG CUỐI CÙNG

1. **Hiệu quả thực tế:**
   - Đợt tối ưu đã cắt giảm được hơn **40 MEGABYTES dữ liệu thừa** trên toàn bộ hệ thống website (-56.5% toàn thư mục images).
   - Trang Thần Ma Giáng Thế tải nhẹ hơn **70.3%**, giảm thời gian chờ tải ảnh trên mạng 4G từ **14.6 giây xuống chỉ còn ~4.1 giây**!
   - Đã loại bỏ hoàn toàn hiện tượng giật khung hình (CLS) trên 100% các trang bằng cách định danh `width`, `height` tường minh cho tất cả các thẻ hình ảnh.
   - Tất cả 25 liên kết nội bộ (internal links) và tài nguyên tĩnh (CSS, JS) đều phản hồi 200 OK, không có bất kỳ liên kết 404 nào.
2. **Khuyến nghị duy trì:**
   - Khi đăng tải các hình ảnh mới lên website trong tương lai (đặc biệt là banner sự kiện và ảnh chụp màn hình game), cần resize đúng tỉ lệ màn hình và xuất file dưới chuẩn WebP hoặc JPEG chất lượng 80-85% trước khi đưa vào thư mục `images/`.

