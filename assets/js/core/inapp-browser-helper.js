/**
 * In-App Browser Helper (Messenger, TikTok, Facebook, Zalo, Instagram...)
 * Tự động chuyển hướng sang Google Chrome trên Android khi mở link từ mạng xã hội
 * hoặc khi bấm tải game (file .apk) để tránh lỗi "Định dạng tập tin không được hỗ trợ".
 * 
 * File: assets/js/core/inapp-browser-helper.js
 */
(function () {
    'use strict';

    var ua = navigator.userAgent || navigator.vendor || window.opera || '';
    var isAndroid = /android/i.test(ua);
    var isInApp = /FBAN|FBAV|FB_IAB|Messenger|Orca|Instagram|musical_ly|ByteLocale|ByteFullApp|TikTok|Zalo|Line\/|MicroMessenger/i.test(ua);

    // Chỉ áp dụng khi người dùng dùng Android và đang trong trình duyệt nhúng của ứng dụng
    if (!isAndroid || !isInApp) return;

    // Helper: Tạo Android Intent URL ép mở qua Google Chrome
    function getChromeIntentUrl(targetUrl) {
        var clean = targetUrl.replace(/^https?:\/\//, '');
        var fallback = encodeURIComponent(targetUrl);
        return 'intent://' + clean + '#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=' + fallback + ';end;';
    }

    // 1. Tự động thử chuyển toàn bộ trang web sang Chrome (1 lần mỗi phiên)
    try {
        var sessionKey = '_inapp_chrome_tried';
        if (!sessionStorage.getItem(sessionKey)) {
            sessionStorage.setItem(sessionKey, '1');
            window.location.href = getChromeIntentUrl(window.location.href);
        }
    } catch (e) {}

    // 2. Chặn các liên kết tải APK để mở bằng Chrome Intent tránh lỗi định dạng
    function handleApkClick(e) {
        var target = e.target && e.target.closest ? e.target.closest('a') : null;
        if (!target) return;

        var href = target.getAttribute('href') || '';
        var isAndroidPlat = target.getAttribute('data-platform') === 'android';
        var isApk = /\.apk(\?.*)?$/i.test(href) || isAndroidPlat;

        if (isApk && href && !href.startsWith('javascript:') && !href.startsWith('#')) {
            e.preventDefault(); // Ngăn trình duyệt nhúng cố mở trực tiếp APK
            var intentUrl = getChromeIntentUrl(target.href);
            showToast('🚀 Đang mở Google Chrome để tải game...');
            setTimeout(function () {
                window.location.href = intentUrl;
            }, 150);
        }
    }

    document.addEventListener('click', handleApkClick, true);

    // 3. Hiển thị thông báo nhỏ hỗ trợ người dùng ở đầu trang
    function createHelperBanner() {
        try {
            if (sessionStorage.getItem('_inapp_banner_closed')) return;
        } catch (e) {}

        if (document.getElementById('inapp-helper-banner')) return;

        var banner = document.createElement('div');
        banner.id = 'inapp-helper-banner';
        banner.innerHTML = [
            '<div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">',
            '  <span style="font-size:16px;line-height:1;">🚀</span>',
            '  <div style="font-size:12px;line-height:1.35;color:#f8fafc;">',
            '    Đang mở trong ứng dụng. Nhấn <strong>Mở Chrome</strong> để tải game không lỗi.',
            '  </div>',
            '</div>',
            '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">',
            '  <button id="inapp-btn-open-chrome" type="button" style="background:linear-gradient(135deg,#38bdf8,#0284c7);color:#ffffff;border:none;padding:5px 12px;font-size:12px;font-weight:700;border-radius:6px;cursor:pointer;white-space:nowrap;box-shadow:0 2px 8px rgba(56,189,248,0.35);">Mở Chrome</button>',
            '  <button id="inapp-btn-close-banner" type="button" aria-label="Đóng" style="background:transparent;color:#94a3b8;border:none;font-size:18px;padding:0 6px;cursor:pointer;line-height:1;">&times;</button>',
            '</div>'
        ].join('');

        banner.style.cssText = [
            'position:fixed',
            'top:0',
            'left:0',
            'right:0',
            'z-index:999999',
            'background:rgba(15,23,42,0.96)',
            'backdrop-filter:blur(8px)',
            '-webkit-backdrop-filter:blur(8px)',
            'border-bottom:1px solid rgba(56,189,248,0.4)',
            'padding:9px 12px',
            'display:flex',
            'align-items:center',
            'justify-content:space-between',
            'box-shadow:0 4px 16px rgba(0,0,0,0.6)',
            'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'
        ].join(';');

        document.body.appendChild(banner);

        var btnOpen = document.getElementById('inapp-btn-open-chrome');
        if (btnOpen) {
            btnOpen.addEventListener('click', function () {
                window.location.href = getChromeIntentUrl(window.location.href);
            });
        }

        var btnClose = document.getElementById('inapp-btn-close-banner');
        if (btnClose) {
            btnClose.addEventListener('click', function () {
                banner.remove();
                try { sessionStorage.setItem('_inapp_banner_closed', '1'); } catch (e) {}
            });
        }
    }

    // 4. Toast phản hồi nhanh khi bấm tải
    function showToast(msg) {
        var existing = document.getElementById('inapp-helper-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.id = 'inapp-helper-toast';
        toast.textContent = msg;
        toast.style.cssText = [
            'position:fixed',
            'bottom:90px',
            'left:50%',
            'transform:translateX(-50%)',
            'background:rgba(15,23,42,0.96)',
            'color:#38bdf8',
            'border:1px solid #38bdf8',
            'padding:10px 18px',
            'border-radius:8px',
            'font-size:13px',
            'font-weight:600',
            'z-index:9999999',
            'box-shadow:0 8px 24px rgba(0,0,0,0.7)',
            'text-align:center',
            'max-width:90%',
            'pointer-events:none',
            'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
            'transition:opacity 0.25s ease'
        ].join(';');

        document.body.appendChild(toast);
        setTimeout(function () {
            if (toast) {
                toast.style.opacity = '0';
                setTimeout(function () {
                    if (toast && toast.parentNode) toast.remove();
                }, 300);
            }
        }, 3000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createHelperBanner);
    } else {
        createHelperBanner();
    }
})();
