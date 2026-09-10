/**
 * Footer Component
 * 
 * Cách sử dụng:
 * 1. Thêm <div id="footer-root"></div> vào HTML
 * 2. Thêm <script src="/components/footer.js"></script>
 * 3. Gọi renderFooter() (không cần config vì footer giống nhau ở mọi trang)
 */

function renderFooter() {
    const root = document.getElementById('footer-root');
    if (!root) {
        console.warn('[footer] Không tìm thấy #footer-root');
        return;
    }

    root.innerHTML = `
        <footer class="footer">
            <div class="container bg-footer">
                <div class="mainfooter">
                    <div class="d-flex flex-column align-items-center detail">
                        <ul class="listCertify">
                            <li>Giấy phép cung cấp dịch vụ trò chơi điện tử G1 trên mạng số 349/GP-BTTTT, do Bộ
                                <br>Thông tin và Truyền thông cấp ngày 12/7/2022.
                            </li>
                            <li>Giấy chứng nhận cung cấp dịch vụ trò chơi điện tử trên mạng số 91/GP-BTTT do Cục
                                <br>Phát thanh, truyền hình và thông tin điện tử cấp ngày 12/7/2022.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>`;
}

window.renderFooter = renderFooter;
