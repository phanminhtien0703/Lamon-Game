# QUY TẮC PHÁT TRIỂN DỰ ÁN PHP MVC DÀNH CHO AI

> **Version:** 1.2 — **Last updated:** 2026-09-08
> **Scope:** PHP MVC projects (pure PHP, no framework)
> **Applies to:** AI coding assistant — mọi ngôn ngữ

---

## QUICK CHECKLIST — trước khi viết bất kỳ code nào

```text
□ File này thuộc layer nào? (Controller / Service / Repository / Model / View)
□ Layer nào chịu trách nhiệm cho logic này?
□ Có function/component nào làm việc này chưa? → Reuse trước
□ File đã gần đến ngưỡng số dòng chưa? → Xem Rule 11
□ Có duplicate code không?
□ Có dùng Prepared Statement không?
□ Có validate input ở Backend không?
□ Nếu feature lớn → đã phân tích data flow chưa? (Rule 20)
□ Nếu thay đổi DB → đã tạo migration file chưa? (Rule 5b)
□ Nếu business logic thay đổi → có thể giải thích tại sao cần thay đổi không?
```

---

## 1. Công nghệ và kiến trúc

Dự án sử dụng:

- PHP thuần, không sử dụng Laravel hoặc framework PHP khác nếu chưa được yêu cầu.
- Kiến trúc MVC.
- HTML.
- CSS.
- JavaScript.
- Bootstrap.
- MySQL hoặc PostgreSQL tùy cấu hình dự án.

Kiến trúc mở rộng được sử dụng:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database

Controller
    ↓
View
    ↓
CSS / JavaScript
```

AI phải tuân thủ cấu trúc và convention hiện có của dự án.

Không tự ý thay đổi kiến trúc dự án.

---

## 2. Nguyên tắc cốt lõi

### Mỗi file chỉ nên có một trách nhiệm rõ ràng.

Không được đặt code vào một file chỉ vì việc đó thuận tiện.

Trước khi thêm code, phải xác định:

1. Code này thuộc chức năng nào?
2. Thuộc layer nào?
3. File nào chịu trách nhiệm cho logic này?
4. Logic này đã tồn tại ở nơi khác hay chưa?

Nếu một tính năng mới khiến file hiện tại phải đảm nhận thêm một trách nhiệm khác, phải xem xét tách thành file/module riêng.

---

## 3. Phân chia trách nhiệm theo layer

### Controller

Controller chịu trách nhiệm:

- Nhận HTTP Request.
- Nhận GET/POST parameters.
- Gọi Service.
- Nhận kết quả từ Service.
- Trả View.
- Trả JSON.
- Redirect.

Controller phải được giữ đơn giản và ngắn gọn.

Controller KHÔNG được chứa:

- SQL.
- Truy vấn database trực tiếp.
- Business logic phức tạp.
- Logic xử lý tồn kho.
- Logic workflow.
- Logic approval.
- HTML.
- CSS.
- JavaScript.

Luồng chuẩn:

```text
Request
↓
Controller
↓
Service
↓
Controller
↓
View / JSON / Redirect
```

---

## 4. Service

Service chịu trách nhiệm xử lý Business Logic.

Ví dụ:

- Kiểm tra điều kiện nghiệp vụ.
- Kiểm tra tồn kho.
- Tính toán dữ liệu.
- Workflow.
- Approval logic.
- Transaction logic.
- Xử lý trạng thái.
- Quy tắc cấp phát.
- Quy tắc kiểm tra dữ liệu.
- Audit logic.

Không được duplicate business logic ở nhiều Controller.

Nếu cùng một logic được sử dụng ở nhiều nơi, phải đưa logic đó về Service hoặc một thành phần dùng chung phù hợp.

### Transaction Boundary

- Service quyết định **transaction boundary**.
- Nếu một operation cần nhiều query INSERT/UPDATE/DELETE liên quan đến nhau, Service phải wrap trong transaction và rollback khi có lỗi.

Ví dụ:

```php
// trong Service
$db->beginTransaction();
try {
    $this->repo->updateStock($itemId, $newQty);
    $this->repo->insertLog($itemId, $action);
    $db->commit();
} catch (Exception $e) {
    $db->rollBack();
    throw $e;
}
```

- Nếu chỉ có một query đơn giản, không bắt buộc phải dùng transaction.

### Concurrency & Pessimistic Locking (Khóa tồn kho)

- Đối với các nghiệp vụ xuất/nhập/cấp phát tồn kho nhiều người dùng thao tác đồng thời, Service phải kết hợp transaction với cơ chế khóa hàng (**Pessimistic Lock**):
  ```sql
  SELECT quantity FROM inventory_balances WHERE item_id = :id AND warehouse_id = :wh FOR UPDATE;
  ```
- Điều này nhằm tránh tranh chấp tài nguyên (Race Condition) dẫn đến số lượng tồn kho bị sai lệch hoặc âm kho.

---

## 5. Repository

Repository chịu trách nhiệm giao tiếp với Database.

Bao gồm:

- SELECT.
- INSERT.
- UPDATE.
- DELETE.
- Các database query khác.

SQL chỉ nên được đặt trong Repository.

Không được viết SQL trực tiếp trong:

- Controller.
- View.
- JavaScript.
- CSS.
- Helper không liên quan đến database.

Mọi truy vấn nhận dữ liệu từ người dùng phải sử dụng:

```text
Prepared Statement
```

Không nối trực tiếp dữ liệu người dùng vào SQL.

---

## 5b. Quy tắc Database Schema Change

Khi cần thêm column, sửa column, thêm index, hoặc thay đổi cấu trúc table:

- Không ALTER table trực tiếp trên production mà không tạo **migration file**.
- Migration file đặt tại `database/migrations/`, đặt tên theo thứ tự số và mô tả ngắn:

```text
database/migrations/
    001_create_spare_parts.sql
    002_add_stock_columns.sql
    003_create_service_orders.sql
```

- Migration phải mô tả rõ **UP** (thay đổi gì) và **DOWN** (rollback nếu có thể).
- Trước khi chạy migration, phải kiểm tra column/table đã tồn tại chưa để tránh lỗi chạy lại.
- Chỉ tạo file migration — **không chạy migration tự động**. User tự chạy.

---

## 5c. Quy tắc Config và Constants

### Database Config

- Database credentials đặt tại `config/database.php` hoặc `.env` (nếu dự án dùng).
- Không hardcode username, password, host trong code.

### Constants

- Các giá trị cố định dùng nhiều lần phải đặt tại `config/constants.php` hoặc class `Constant`.
- Ví dụ:

```php
// config/constants.php
define('STATUS_ACTIVE', 1);
define('STATUS_INACTIVE', 0);
define('ROLE_ADMIN', 'admin');
define('ROLE_USER', 'user');
```

### Không được:

- Hardcode URL, port, credentials trong Controller/Service.
- Hardcode status codes, magic numbers trong code logic.
- Viết `if ($status == 1)` mà không dùng constant — phải `if ($status == STATUS_ACTIVE)`.

---

## 5d. Quy tắc Routing

### Cấu trúc Route

- Route file đặt tại `routes/web.php` hoặc `public/index.php` (tùy dự án).
- Mỗi route phải gán rõ: **URL pattern → Controller@method**.

### Naming Convention

```text
GET  /spare-parts          → SparePartController@index
GET  /spare-parts/create   → SparePartController@create
POST /spare-parts/store    → SparePartController@store
GET  /spare-parts/{id}     → SparePartController@show
GET  /spare-parts/{id}/edit → SparePartController@edit
PUT  /spare-parts/{id}     → SparePartController@update
DELETE /spare-parts/{id}   → SparePartController@destroy
```

### Auth Check

- Các route yêu cầu đăng nhập phải kiểm tra session **trước khi** gọi Controller.
- Nếu dự án có middleware/route filter, dùng middleware.
- Nếu không, kiểm tra session ở đầu Controller hoặc ở route definition.

---

## 6. Model

Model đại diện cho dữ liệu hoặc đối tượng nghiệp vụ của hệ thống.

Model không được biến thành nơi chứa hàng loạt:

- SQL không liên quan.
- Business logic không liên quan.
- Helper function không liên quan.

Nếu dự án sử dụng Repository thì phần truy cập database nên ưu tiên đặt tại Repository.

### Lưu ý cho dự án Pure PHP (Repository-first):

- Nếu dự án hiện tại sử dụng Repository trả về mảng kết hợp (`associative array`) trực tiếp từ PDO, **không bắt buộc phải tạo class Model rỗng**.
- Chỉ tạo class Model khi cần đóng gói hành vi dữ liệu thực sự (ví dụ: entity có methods tính toán riêng).

---

## 7. View

View chịu trách nhiệm hiển thị giao diện.

View có thể chứa:

- HTML.
- PHP loop đơn giản.
- PHP condition đơn giản.
- Hiển thị dữ liệu.
- Component giao diện.

View KHÔNG được chứa:

- SQL.
- Database connection.
- Business logic.
- Logic xử lý nghiệp vụ phức tạp.
- Tính toán dữ liệu lớn.
- Xử lý workflow.

Controller hoặc Service phải chuẩn bị dữ liệu trước khi truyền sang View.

---

## 8. Quy tắc CSS

Không được đưa toàn bộ CSS của hệ thống vào một file duy nhất.

Cấu trúc khuyến nghị:

```text
public/assets/css/

base/
    variables.css
    global.css

components/
    button.css
    table.css
    modal.css
    form.css

pages/
    spare-parts.css
    requests.css
    dashboard.css
```

Phân loại:

```text
CSS toàn hệ thống
→ base/

CSS component dùng lại
→ components/

CSS chỉ dành cho một module/page
→ pages/
```

Không đưa CSS của một tính năng cụ thể vào `global.css`.

Hạn chế:

```html
style=""
```

Không sử dụng inline CSS nếu không thực sự cần thiết.

Nếu một style được sử dụng nhiều lần, phải tạo class.

---

## 9. Quy tắc JavaScript

Không được đưa toàn bộ JavaScript của hệ thống vào một file `app.js` hoặc `main.js` quá lớn.

Cấu trúc khuyến nghị:

```text
public/assets/js/

core/
    api.js
    utils.js

components/
    modal.js
    table.js
    dropdown.js

pages/
    spare-parts.js
    requests.js
    dashboard.js
```

Phân loại:

```text
JavaScript dùng toàn hệ thống
→ core/

JavaScript component tái sử dụng
→ components/

JavaScript của một page/module
→ pages/
```

Không sử dụng inline event nếu có thể tránh:

```html
onclick=""
onchange=""
onkeyup=""
```

Ưu tiên:

```javascript
addEventListener()
```

Logic JavaScript sử dụng nhiều lần phải được tách thành function/module dùng chung.

Không copy cùng một đoạn JavaScript sang nhiều file khác nhau.

### Scope và Module

Nếu dự án sử dụng vanilla JS (không bundler), JavaScript pages phải được bọc trong **IIFE** hoặc **DOMContentLoaded** để tránh污染 global scope:

```javascript
// pages/spare-parts.js
(function() {
    'use strict';

    // page-specific logic here
    document.addEventListener('DOMContentLoaded', function() {
        // init
    });
})();
```

Nếu dự án có dùng ES modules (`type="module"` trên script tag), ưu tiên `import/export`.

Không khai báo biến toàn cục (không `window.xxx = ...`) trừ khi thực sự cần thiết cho cross-module communication.

---

## 10. Quy tắc cấu trúc Feature

Mỗi feature phải được cô lập rõ ràng.

Ví dụ feature:

```text
Spare Part
```

Có thể gồm:

```text
Controllers/
    SparePartController.php

Services/
    SparePartService.php

Repositories/
    SparePartRepository.php

Models/
    SparePart.php

Views/
    spare-parts/
        index.php
        create.php
        edit.php
        detail.php

public/assets/css/pages/
    spare-parts.css

public/assets/js/pages/
    spare-parts.js
```

Code chỉ phục vụ Spare Part không được đưa vào file global nếu không có lý do hợp lý.

---

## 10b. Quy tắc đặt tên trong Feature

Phân loại file:

```text
Controller: {Feature}Controller.php
Service:    {Feature}Service.php
Repository: {Feature}Repository.php
Model:      {Feature}.php
```

View folder dùng **kebab-case, số nhiều**:

```text
Views/spare-parts/index.php
Views/spare-parts/create.php
Views/service-orders/detail.php
```

JavaScript và CSS page files tuân theo cùng pattern kebab-case:

```text
public/assets/js/pages/spare-parts.js
public/assets/css/pages/spare-parts.css
```

---

## 11. Quy tắc độ dài file

Số dòng không phải luật tuyệt đối nhưng phải được sử dụng làm cảnh báo về thiết kế.

Ngưỡng tham khảo:

```text
Controller       ~ 250 dòng
Service          ~ 300 dòng
Repository       ~ 300 dòng
View             ~ 250 dòng
JavaScript       ~ 300 dòng
CSS              ~ 400 dòng
Function/Method  ~ 40-60 dòng
```

Khi file chuẩn bị vượt ngưỡng:

AI KHÔNG được tự động tiếp tục nhồi thêm code.

AI phải kiểm tra:

- File có đang xử lý nhiều trách nhiệm không?
- Có thể tách component không?
- Có thể tách Service không?
- Có thể tách Repository không?
- Có thể tách JavaScript module không?
- Có thể tách CSS component không?
- Có logic nào đang bị duplicate không?

Nếu file chứa nhiều responsibility thì phải refactor trước khi tiếp tục.

Không được tách file một cách máy móc chỉ vì vượt số dòng.

Việc tách file phải dựa trên trách nhiệm của code.

---

## 12. Quy tắc Function và Method

Mỗi function/method chỉ nên thực hiện một nhiệm vụ rõ ràng.

Không tạo function dạng:

```text
processEverything()
handleAll()
doEverything()
```

Nếu một function:

- Validate.
- Query database.
- Tính toán.
- Update database.
- Gửi notification.
- Ghi audit.

trong cùng một function thì cần xem xét tách.

Tên function phải thể hiện rõ mục đích.

---

## 13. Không duplicate code

Trước khi tạo mới:

- Function.
- Helper.
- Component.
- CSS.
- JavaScript utility.
- Database query.
- Modal.
- Table.
- API handler.

AI phải kiểm tra xem dự án đã có chức năng tương tự chưa.

Nếu đã có thì:

```text
Reuse
hoặc
Extend
```

Không tạo thêm một implementation mới không cần thiết.

---

## 14. Quy tắc Component

Các UI được sử dụng nhiều lần phải được xem xét chuyển thành component.

Ví dụ:

- Modal.
- Alert.
- Pagination.
- Table.
- Badge.
- Button.
- Search box.
- Confirm dialog.
- Loading indicator.

Không copy cùng một đoạn HTML dài sang nhiều View.

---

## 15. Quy tắc Global

Không đưa code vào global file chỉ vì muốn sử dụng nhanh.

Global file chỉ chứa những thành phần thực sự được sử dụng rộng rãi trong toàn hệ thống.

Ví dụ không được:

```text
spare-parts.css
→ đưa vào global.css

request.js
→ đưa vào app.js
```

chỉ vì muốn giảm số file.

Ưu tiên maintainability hơn việc giảm số lượng file.

---

## 16. Quy tắc Security

AI phải mặc định tuân thủ các nguyên tắc bảo mật sau.

Database:

- Sử dụng Prepared Statements.
- Không nối trực tiếp input vào SQL.

Input:

- Validate dữ liệu ở Backend.
- Không tin dữ liệu gửi từ Browser.

Output:

- Escape dữ liệu trước khi hiển thị HTML khi cần thiết.

Authentication:

- Kiểm tra session phía server.

Authorization:

- Phải kiểm tra quyền phía Backend.
- Không chỉ ẩn button bằng JavaScript.

JavaScript validation chỉ phục vụ UX.

JavaScript validation KHÔNG thay thế Backend validation.

---

## 16b. Quy tắc Error Handling

### Service Layer

- Service phải throw Exception khi business logic fail.
- Không silence error bằng `@` hoặc empty `catch {}`.
- Nếu một operation cần nhiều query liên quan đến nhau, Service phải wrap trong **transaction** và rollback khi có lỗi.

### Controller Layer

Controller bắt Exception từ Service và trả response phù hợp:

```text
Request JSON (AJAX)  → trả JSON { success: false, message: "..." }
Request form thường  → redirect với flash message lỗi
```

### Flash Message Convention

```text
success → $_SESSION['flash_success']
error   → $_SESSION['flash_error']
info    → $_SESSION['flash_info']
```

Nếu dự án đã có convention flash message khác thì tuân theo.

---

## 16c. Quy tắc Logging

- Không silence error bằng `@` hoặc empty `catch {}` — phải log ít nhất bằng `error_log()`.
- Nếu dự án có logging library/config, dùng logging library.
- Log phải chứa: **timestamp + context + message**.
- **Không log sensitive data**: password, token, session ID, credit card.

Khi debug, ưu tiên log tại:

```text
Service   → business logic error, transaction rollback
Controller → request handling error
Repository → query error (nếu cần)
```

---

## 16d. Quy tắc Testing

- Viết code phải **testable**: function nên nhận input và trả output, không side-effect ẩn.
- Nếu dự án có testing framework, viết test cho business logic phức tạp.
- Nếu không có testing framework, ít nhất viết code theo cách có thể test thủ công dễ dàng.
- Ưu tiên test cho: **Service layer** (business logic) và **Repository layer** (database queries).
- Không test cho: View (trừ integration test), CSS, routing cơ bản.

---

## 16e. Quy tắc xử lý File Excel và Dữ liệu lớn (Big Data / Batch Import)

- Đối với các tác vụ import/export file Excel lớn (hàng chục MB hoặc hàng chục ngàn dòng như file ADM/LOG):
  - **Không nạp toàn bộ vào bộ nhớ** dưới dạng Object/Model để tránh lỗi tràn RAM (`Allowed memory size exhausted`).
  - Sử dụng batch/chunking hoặc raw Prepared Statement (`INSERT INTO ... ON DUPLICATE KEY UPDATE` theo lô) để tối ưu tốc độ và giải phóng bộ nhớ sau mỗi batch.
  - Cấu hình tạm thời giới hạn thời gian thực thi (`set_time_limit`) hoặc phân đoạn chunk size hợp lý khi xử lý import dữ liệu lớn.

---

## 17. Quy tắc sửa code hiện có

Trước khi sửa code, AI phải:

1. Đọc cấu trúc dự án.
2. Xác định các file liên quan.
3. Hiểu flow hiện tại.
4. Kiểm tra component/function hiện có.
5. Xác định layer chịu trách nhiệm.
6. Chỉ sửa những phần cần thiết.

Không được tự ý:

- Rewrite toàn bộ file.
- Rewrite toàn bộ module.
- Đổi tên hàng loạt file.
- Di chuyển folder.
- Thay đổi architecture.
- Xóa code đang hoạt động.
- Thay library.
- Thêm framework.
- Thêm dependency mới.

trừ khi được yêu cầu rõ ràng.

### Refactor vs Edit — Quy tắc phân biệt

Khi cần thay đổi code hiện có, phải xác định đúng loại hành động:

**EDIT** — chỉ sửa phần cần thiết, giữ nguyên cấu trúc:
- File < ngưỡng số dòng (Rule 11) và logic mới thuộc cùng responsibility.
- File > ngưỡng nhưng logic mới thuộc cùng responsibility, chỉ thêm method/function mới.

**REFACTOR trước, rồi mới thêm** — thay đổi cấu trúc trước khi thêm:
- File > ngưỡng và logic mới là **responsibility mới** → tách file trước.
- File đang chứa logic thuộc layer khác → chuyển về đúng layer trước.

**KHÔNG refactor** — không được refactor chỉ vì:
- "Code cũ xấu" mà không cần thêm functionality mới.
- "Muốn code đẹp hơn" mà function hiện tại vẫn hoạt động tốt.
- "Thấy có thể improve" mà user không yêu cầu.

**Nếu không chắc chắn** → Hỏi user trước khi refactor.

---

## 18. Không làm ảnh hưởng chức năng hiện tại

Khi triển khai feature mới:

```text
Existing functionality must remain working.
```

AI phải hạn chế thay đổi những khu vực không liên quan.

Ưu tiên:

```text
Minimum necessary change
```

Không refactor toàn bộ hệ thống chỉ để triển khai một chức năng nhỏ.

---

## 19. Quy tắc thêm thư viện

Không tự ý:

- Cài package.
- Sử dụng Composer package.
- Thêm JavaScript library.
- Thêm CSS framework.
- Thêm PHP framework.

Nếu muốn sử dụng dependency mới, phải giải thích:

- Tại sao cần.
- Nó giải quyết vấn đề gì.
- Có thể thực hiện bằng công cụ hiện tại hay không.

Nếu không thực sự cần thì sử dụng công nghệ hiện có.

---

## 20. Quy tắc trước khi code một Feature lớn

Đối với feature không đơn giản, không được bắt đầu viết code ngay.

Trước tiên phải phân tích:

### Feature

```text
Tên tính năng
```

### Files cần tạo

```text
FILES TO CREATE
```

### Files cần sửa

```text
FILES TO MODIFY
```

### Trách nhiệm từng file

```text
RESPONSIBILITY OF EACH FILE
```

### Data Flow

Ví dụ:

```text
User
↓
Route
↓
Controller
↓
Service
↓
Repository
↓
Database
↓
Service
↓
Controller
↓
View / JSON
```

Sau khi xác định được cấu trúc mới triển khai code.

---

## 21. Quy tắc khi AI phát hiện kiến trúc không tốt

Nếu yêu cầu mới khiến AI phải:

- Nhét thêm quá nhiều code vào một file.
- Duplicate code.
- Đưa SQL vào Controller.
- Đưa business logic vào View.
- Đưa toàn bộ JS vào một file.
- Đưa toàn bộ CSS vào một file.
- Tạo function quá lớn.
- Làm một class đảm nhận quá nhiều trách nhiệm.

AI phải ưu tiên đề xuất hoặc thực hiện refactor phù hợp.

Không tiếp tục mở rộng một cấu trúc đã rõ ràng không tốt.

---

## 21b. Khi nào STOP và hỏi user

AI PHẢI dừng lại và hỏi user trước khi thực hiện:

| Tình huống | Hành động |
|---|---|
| Cần thay đổi DB schema | Hỏi user trước khi tạo migration |
| Business logic mà rules không cover | Hỏi user để xác nhận yêu cầu |
| Refactor lớn có thể phá chức năng hiện tại | Hỏi user trước khi refactor |
| Cần thêm dependency mới | Giải thích lý do và hỏi user |
| Phát hiện security potential issue | Hỏi user trước khi proceed |
| Không chắc layer nào chịu trách nhiệm | Hỏi user trước khi viết code |
| Code hiện tại có vẻ sai nhưng vẫn hoạt động | Hỏi user — có thể có lý do lịch sử |

**Nguyên tắc chung:** Khi hành động có thể khó reverse hoặc ảnh hưởng đến functionality hiện tại → **hỏi trước, code sau.**

---

## 22. Quy tắc không Over-engineering

Không được tạo kiến trúc phức tạp không cần thiết.

Không tự động thêm:

```text
DTO
Factory
Adapter
Provider
Contract
Interface
Mapper
UseCase
Command
Event Bus
Dependency Injection Container
```

nếu hệ thống chưa thực sự cần.

Đối với đa số module của dự án, ưu tiên:

```text
Controller
Service
Repository
Model
View
JavaScript
CSS
```

Chỉ thêm abstraction khi nó giải quyết một vấn đề thực tế.

---

## 23. Quy tắc đặt tên

Tên:

- File.
- Class.
- Function.
- Variable.
- Database field.
- JavaScript function.
- CSS class.

phải thể hiện rõ ý nghĩa.

Không sử dụng tên mơ hồ như:

```text
data1
data2
temp
test
abc
handleData
processData
doSomething
```

nếu có thể đặt tên cụ thể hơn.

### Naming Convention tham khảo

Áp dụng thống nhất trong dự án, tuân theo convention hiện có:

```text
PHP Method/Variable   → camelCase       ($getUserById, $totalPrice)
PHP Class             → PascalCase      (SparePartService)
DB table              → snake_case, plural (spare_parts, service_orders)
DB column             → snake_case      (created_at, min_stock)
CSS class             → kebab-case      (.table-header, .btn-primary)
CSS BEM (nếu dùng)   → block__element  (.modal__body, .modal__close)
JavaScript function   → camelCase       (formatDate, loadInventory)
JavaScript constant   → UPPER_SNAKE_CASE (API_BASE_URL, STATUS_ACTIVE)
```

Dự án đã có convention khác thì tuân theo convention hiện tại, không đổi.

---

## 24. Quy tắc ưu tiên Maintainability

Khi có nhiều cách triển khai, ưu tiên theo thứ tự:

1. Đúng nghiệp vụ.
2. Không phá chức năng hiện tại.
3. Dễ đọc.
4. Dễ maintain.
5. Dễ debug.
6. Dễ mở rộng.
7. Ít duplicate.
8. Phù hợp architecture hiện tại.
9. Sau cùng mới xét việc viết ít code hơn.

Không hy sinh cấu trúc chỉ để code nhanh hơn.

---

## 25. Quy tắc cốt lõi cuối cùng

Luôn áp dụng mapping sau:

```text
HTTP Request / Response
→ Controller

Business Logic
→ Service

Database / SQL
→ Repository

Data Object
→ Model

HTML
→ View

Page Interaction
→ JavaScript Page

Reusable JavaScript
→ JavaScript Component / Core

Page Styling
→ CSS Page

Reusable Styling
→ CSS Component / Base
```

Và luôn ghi nhớ:

> Mỗi file chỉ có một trách nhiệm rõ ràng. Code phải được đặt theo trách nhiệm của nó, không được đặt theo sự tiện lợi.

Nếu một chức năng mới khiến file hiện tại đảm nhận thêm một trách nhiệm khác, hãy tách responsibility đó sang đúng layer/module trước khi tiếp tục phát triển.

Mục tiêu cuối cùng là giữ cho dự án có cấu trúc rõ ràng, dễ đọc, dễ debug, dễ bảo trì và không bị biến thành các file PHP, CSS hoặc JavaScript hàng nghìn dòng do AI liên tục nối thêm code.
