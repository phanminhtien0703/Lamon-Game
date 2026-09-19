# Admin Click Tracking Dashboard (Next.js & Google Sheets API)

Hệ thống Web Dashboard nội bộ dành riêng cho Quản trị viên (Admin) để theo dõi số lượt click vào link của người dùng theo thời gian thực (real-time/lifetime) lấy nguồn trực tiếp từ Google Sheets.

## 🚀 Tính năng nổi bật
- **Bảo mật chuyên sâu (Route Guard)**: Toàn bộ cổng `/admin/*` được bảo vệ bằng JWT qua HttpOnly Cookie (`jose`). Người dùng thông thường vào `/` sẽ nhận mã 404 để giấu hoàn toàn đường dẫn nội bộ.
- **Tích hợp Google Sheets API v4**: Kết nối trực tiếp qua Google Cloud Service Account ở Server-side (không để lộ API credentials ra client).
- **Chế độ Demo Fallback**: Tự động hiển thị dữ liệu mô phỏng sinh động khi chưa cấu hình Key Google Sheets, giúp kiểm tra giao diện và tính năng ngay lập tức.
- **Thời gian thực (Live Heartbeat Polling)**: Tự động cập nhật số liệu mỗi 8 giây và hỗ trợ nút Refresh thủ công.
- **Giao diện Quản trị Đẳng cấp**: Thiết kế Dark theme Glassmorphism cao cấp, responsive, tích hợp 3 thẻ KPI tổng quan, thanh tìm kiếm tức thì và tính năng sắp xếp clicks tăng/giảm.

---

## 🛠️ Hướng dẫn cài đặt & Chạy ứng dụng

### 1. Cài đặt các gói phụ thuộc (Dependencies)
Di chuyển vào thư mục `admin-dashboard`:
```bash
cd admin-dashboard
npm install
```

### 2. Cấu hình biến môi trường
File `.env.local` đã được tạo sẵn để chạy thử nghiệm:
- **Tài khoản**: `admin`
- **Mật khẩu**: `Admin@2026!`

### 3. Chạy môi trường phát triển (Development Server)
```bash
npm run dev
```
Mở trình duyệt và truy cập: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 📋 Kết nối Google Sheets thật

1. Vào **Google Cloud Console** > Kích hoạt **Google Sheets API**.
2. Tạo một **Service Account** và tải file JSON Key về máy.
3. Mở Google Sheet mẫu và nhấn nút **Chia sẻ (Share)** cho email của Service Account với quyền **Viewer (Người xem)**.
4. Cập nhật các thông số vào file `.env.local`:
   ```env
   GOOGLE_SHEET_ID=1a2b3c4d5e6f7g8h9i0j_SpreadsheetID
   GOOGLE_SHEET_RANGE=Sheet1!A2:E
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASC...\n-----END PRIVATE KEY-----\n"
   ```
5. Khởi động lại server (`npm run dev`), hệ thống sẽ tự động chuyển từ chế độ Demo sang dữ liệu trực tiếp từ Google Sheet!
