/**
 * Download Notice & Giftcode Modal Component
 * 
 * Tự động hiển thị popup thông báo game đang tải về máy cho Android và Windows (PC),
 * đồng thời gợi ý người chơi nhận Giftcode tân thủ tại Fanpage / Messenger.
 * 
 * Tương thích với:
 * - Thần Ma Giáng Thế (/games/than-ma-giang-the/ & sự kiện đua top)
 * - Nhất Kiếm Phù Sinh (/games/nhat-kiem-phu-sinh/)
 * - Chiến Binh Thức Tỉnh (/games/chien-binh-thuc-tinh/)
 * - Era of Warfare (/games/era-of-warfare/)
 */

(function () {
    'use strict';

    // Cấu hình thông tin game & fanpage nhận code
    var GAME_CONFIGS = {
        'than-ma-giang-the': {
            name: 'Thần Ma Giáng Thế',
            lang: 'vi',
            title: 'Game Đang Được Tải Về!',
            desc: 'Tệp cài đặt đang được tải về thiết bị của bạn.<br>Trong lúc chờ đợi, bạn có muốn <strong>nhận Giftcode tân thủ</strong> không?',
            fanpageText: 'Fanpage',
            messengerText: 'Messenger',
            messengerUrl: 'https://m.me/lamongame?text=M%C3%ACnh%20mu%E1%BB%91n%20nh%E1%BA%ADn%20code%20game%20Th%E1%BA%A7n%20Ma%20Gi%C3%A1ng%20Th%E1%BA%BF',
            fanpageUrl: 'https://www.facebook.com/lamongame/'
        },
        'nhat-kiem-phu-sinh': {
            name: 'Nhất Kiếm Phù Sinh',
            lang: 'vi',
            title: 'Game Đang Được Tải Về!',
            desc: 'Tệp cài đặt đang được tải về thiết bị của bạn.<br>Trong lúc chờ đợi, bạn có muốn <strong>nhận Giftcode tân thủ</strong> không?',
            fanpageText: 'Fanpage',
            messengerText: 'Messenger',
            messengerUrl: 'https://m.me/NhatKiemPhuSinh.LamonGame?text=M%C3%ACnh%20mu%E1%BB%91n%20nh%E1%BA%ADn%20code%20game%20Nh%E1%BA%A5t%20Ki%E1%BA%BFm%20Ph%C3%B9%20Sinh',
            fanpageUrl: 'https://www.facebook.com/NhatKiemPhuSinh.LamonGame/'
        },
        'chien-binh-thuc-tinh': {
            name: 'Chiến Binh Thức Tỉnh',
            lang: 'vi',
            title: 'Game Đang Được Tải Về!',
            desc: 'Tệp cài đặt đang được tải về thiết bị của bạn.<br>Trong lúc chờ đợi, bạn có muốn <strong>nhận Giftcode tân thủ</strong> không?',
            fanpageText: 'Fanpage',
            messengerText: 'Messenger',
            messengerUrl: 'https://m.me/ChienBinhThucTinh.LamonGame?text=M%C3%ACnh%20mu%E1%BB%91n%20nh%E1%BA%ADn%20code%20game%20Chi%E1%BA%BFn%20Binh%20Th%E1%BB%A9c%20T%E1%BB%89nh',
            fanpageUrl: 'https://www.facebook.com/ChienBinhThucTinh.LamonGame/'
        },
        'era-of-warfare': {
            name: 'Era of Warfare',
            lang: 'en',
            title: 'Game is Downloading!',
            desc: 'The game installer is downloading to your device.<br>While waiting, would you like to receive an exclusive <strong>Starter Giftcode</strong>?',
            fanpageText: 'Fanpage',
            messengerText: 'Messenger',
            messengerUrl: 'https://m.me/Era.of.Warfare.Private?text=I%20want%20to%20receive%20code%20for%20Era%20of%20Warfare',
            fanpageUrl: 'https://www.facebook.com/Era.of.Warfare.Private'
        }
    };

    // Xác định game hiện tại dựa theo đường dẫn URL
    function getCurrentGameKey() {
        var path = (window.location.pathname || '').toLowerCase();
        if (path.indexOf('nhat-kiem-phu-sinh') !== -1 || path.indexOf('phu-sinh-mong') !== -1) {
            return 'nhat-kiem-phu-sinh';
        }
        if (path.indexOf('chien-binh-thuc-tinh') !== -1 || path.indexOf('tan-binh-thuc-tinh') !== -1) {
            return 'chien-binh-thuc-tinh';
        }
        if (path.indexOf('era-of-warfare') !== -1) {
            return 'era-of-warfare';
        }
        return 'than-ma-giang-the';
    }

    // CSS styling nhúng trực tiếp
    var STYLES = `
        .dl-notice-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(4, 7, 15, 0.82);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition: opacity 0.28s ease, visibility 0.28s ease;
        }

        .dl-notice-backdrop.open {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        .dl-notice-box {
            position: relative;
            max-width: 460px;
            width: 100%;
            background: linear-gradient(155deg, #13192a 0%, #0a0d18 100%);
            border: 1px solid rgba(56, 189, 248, 0.35);
            border-radius: 22px;
            padding: 32px 26px 26px 26px;
            box-shadow: 0 25px 65px rgba(0, 0, 0, 0.85), 0 0 45px rgba(56, 189, 248, 0.2);
            color: #ffffff;
            text-align: center;
            transform: scale(0.9) translateY(12px);
            transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            box-sizing: border-box;
        }

        .dl-notice-backdrop.open .dl-notice-box {
            transform: scale(1) translateY(0);
        }

        .dl-notice-close {
            position: absolute;
            top: 14px;
            right: 16px;
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.14);
            color: #94a3b8;
            font-size: 20px;
            line-height: 1;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            outline: none;
            padding: 0;
        }

        .dl-notice-close:hover {
            background: rgba(255, 255, 255, 0.18);
            color: #ffffff;
            transform: scale(1.08);
        }

        /* Icon Animation Wrapper */
        .dl-notice-icon-wrapper {
            position: relative;
            width: 76px;
            height: 76px;
            margin: 0 auto 18px auto;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .dl-notice-pulse {
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(56, 189, 248, 0) 70%);
            animation: dlNoticePulseAnim 2.2s ease-in-out infinite;
        }

        @keyframes dlNoticePulseAnim {
            0% { transform: scale(0.92); opacity: 0.5; }
            50% { transform: scale(1.15); opacity: 0.9; }
            100% { transform: scale(0.92); opacity: 0.5; }
        }

        .dl-notice-icon-circle {
            position: relative;
            z-index: 2;
            width: 66px;
            height: 66px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(14, 165, 233, 0.08) 100%);
            border: 1.5px solid rgba(56, 189, 248, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #38bdf8;
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.35);
        }

        .dl-notice-icon-circle svg {
            animation: dlNoticeBounceDown 1.8s ease-in-out infinite;
        }

        @keyframes dlNoticeBounceDown {
            0%, 100% { transform: translateY(-2px); }
            50% { transform: translateY(3px); }
        }

        .dl-notice-gift-badge {
            position: absolute;
            bottom: -2px;
            right: -2px;
            z-index: 3;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: linear-gradient(135deg, #38bdf8, #0284c7);
            border: 2px solid #0d121e;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(56, 189, 248, 0.5);
            animation: dlNoticeGiftWiggle 2.5s ease-in-out infinite;
        }

        @keyframes dlNoticeGiftWiggle {
            0%, 100% { transform: rotate(0deg); }
            20% { transform: rotate(-12deg); }
            40% { transform: rotate(12deg); }
            60% { transform: rotate(-8deg); }
            80% { transform: rotate(8deg); }
        }

        .dl-notice-title {
            font-size: 21px;
            font-weight: 800;
            color: #ffffff;
            margin: 0 0 10px 0;
            letter-spacing: 0.3px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
        }

        .dl-notice-desc {
            font-size: 14px;
            line-height: 1.6;
            color: #cbd5e1;
            margin: 0 0 24px 0;
        }

        .dl-notice-desc strong {
            color: #38bdf8;
            font-weight: 700;
        }

        /* Action Buttons */
        .dl-notice-actions {
            display: flex;
            gap: 12px;
            width: 100%;
        }

        .dl-notice-btn {
            appearance: none;
            -webkit-appearance: none;
            border: none;
            outline: none;
            border-radius: 12px;
            font-size: 14.5px;
            font-weight: 700;
            padding: 13px 18px;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.22s ease;
            box-sizing: border-box;
            line-height: 1.25;
            flex: 1;
        }

        .dl-notice-btn-fanpage {
            background: linear-gradient(135deg, rgba(24, 119, 242, 0.25) 0%, rgba(14, 165, 233, 0.18) 100%);
            color: #ffffff !important;
            border: 1px solid rgba(56, 189, 248, 0.45);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
        }

        .dl-notice-btn-fanpage:hover {
            transform: translateY(-2px);
            background: linear-gradient(135deg, rgba(24, 119, 242, 0.4) 0%, rgba(14, 165, 233, 0.3) 100%);
            border-color: #38bdf8;
            box-shadow: 0 6px 20px rgba(56, 189, 248, 0.35);
            color: #ffffff !important;
        }

        .dl-notice-btn-messenger {
            background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%);
            color: #ffffff !important;
            box-shadow: 0 4px 18px rgba(56, 189, 248, 0.42);
            border: 1px solid rgba(186, 230, 253, 0.4);
        }

        .dl-notice-btn-messenger:hover {
            transform: translateY(-2px);
            background: linear-gradient(135deg, #7dd3fc 0%, #0369a1 100%);
            box-shadow: 0 8px 26px rgba(56, 189, 248, 0.6);
            filter: brightness(1.06);
            color: #ffffff !important;
        }

        @media (max-width: 520px) {
            .dl-notice-box {
                padding: 26px 18px 20px 18px;
                border-radius: 18px;
            }
            .dl-notice-title {
                font-size: 19px;
            }
            .dl-notice-desc {
                font-size: 13px;
                margin-bottom: 20px;
            }
            .dl-notice-actions {
                flex-direction: row;
                gap: 10px;
            }
            .dl-notice-btn {
                padding: 12px 14px;
                font-size: 13.5px;
            }
        }
    `;

    // Khởi tạo HTML và gắn vào DOM
    function injectModalDOM() {
        if (document.getElementById('downloadNoticeModal')) return;

        // Nhúng Stylesheet
        var styleEl = document.createElement('style');
        styleEl.id = 'downloadNoticeStyles';
        styleEl.innerHTML = STYLES;
        document.head.appendChild(styleEl);

        // Tạo Modal Backdrop
        var backdrop = document.createElement('div');
        backdrop.id = 'downloadNoticeModal';
        backdrop.className = 'dl-notice-backdrop';
        backdrop.setAttribute('role', 'dialog');
        backdrop.setAttribute('aria-modal', 'true');
        backdrop.setAttribute('aria-labelledby', 'dlNoticeTitle');

        var gameKey = getCurrentGameKey();
        var cfg = GAME_CONFIGS[gameKey] || GAME_CONFIGS['than-ma-giang-the'];

        backdrop.innerHTML = `
            <div class="dl-notice-box">
                <button type="button" class="dl-notice-close" id="dlNoticeCloseBtn" aria-label="Đóng">&times;</button>
                
                <div class="dl-notice-icon-wrapper">
                    <div class="dl-notice-pulse"></div>
                    <div class="dl-notice-icon-circle">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                    </div>
                    <div class="dl-notice-gift-badge">🎁</div>
                </div>

                <h3 id="dlNoticeTitle" class="dl-notice-title">${cfg.title}</h3>
                <p id="dlNoticeDesc" class="dl-notice-desc">${cfg.desc}</p>

                <div class="dl-notice-actions">
                    <a id="dlNoticeFanpageBtn" href="${cfg.fanpageUrl}" target="_blank" rel="noopener noreferrer" class="dl-notice-btn dl-notice-btn-fanpage" data-track="download-modal-fanpage">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span id="dlNoticeFanpageText">${cfg.fanpageText}</span>
                    </a>
                    <a id="dlNoticeMessengerBtn" href="${cfg.messengerUrl}" target="_blank" rel="noopener noreferrer" class="dl-notice-btn dl-notice-btn-messenger" data-track="download-modal-messenger">
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.093.303 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.056-3.26-5.963 3.26 6.559-6.963 3.13 3.26 5.89-3.26-6.56 6.963z"/>
                        </svg>
                        <span id="dlNoticeMessengerText">${cfg.messengerText}</span>
                    </a>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);

        // Gắn sự kiện đóng modal
        var closeBtn = document.getElementById('dlNoticeCloseBtn');
        var fanpageBtn = document.getElementById('dlNoticeFanpageBtn');
        var messengerBtn = document.getElementById('dlNoticeMessengerBtn');

        if (closeBtn) {
            closeBtn.addEventListener('click', hideDownloadNotice);
        }
        if (fanpageBtn) {
            fanpageBtn.addEventListener('click', function () {
                recordDownloadEvent('fanpage', gameKey);
                setTimeout(hideDownloadNotice, 350);
            });
        }
        if (messengerBtn) {
            messengerBtn.addEventListener('click', function () {
                recordDownloadEvent('messenger', gameKey);
                setTimeout(hideDownloadNotice, 350);
            });
        }

        // Bấm ra nền tối để đóng
        backdrop.addEventListener('click', function (e) {
            if (e.target === backdrop) {
                hideDownloadNotice();
            }
        });
    }

    // Hiển thị modal
    function showDownloadNotice(customConfig) {
        injectModalDOM();
        var backdrop = document.getElementById('downloadNoticeModal');
        if (!backdrop) return;

        var gameKey = getCurrentGameKey();
        var cfg = Object.assign({}, GAME_CONFIGS[gameKey] || GAME_CONFIGS['than-ma-giang-the'], customConfig || {});

        var titleEl = document.getElementById('dlNoticeTitle');
        var descEl = document.getElementById('dlNoticeDesc');
        var fanpageBtn = document.getElementById('dlNoticeFanpageBtn');
        var messengerBtn = document.getElementById('dlNoticeMessengerBtn');
        var fanpageTextEl = document.getElementById('dlNoticeFanpageText');
        var messengerTextEl = document.getElementById('dlNoticeMessengerText');

        if (titleEl) titleEl.innerText = cfg.title;
        if (descEl) descEl.innerHTML = cfg.desc;
        if (fanpageBtn) fanpageBtn.href = cfg.fanpageUrl;
        if (messengerBtn) messengerBtn.href = cfg.messengerUrl;
        if (fanpageTextEl) fanpageTextEl.innerText = cfg.fanpageText;
        if (messengerTextEl) messengerTextEl.innerText = cfg.messengerText;

        // Đóng các modal tải nền tảng trước đó (nếu đang mở) để giao diện thoáng sạch
        var existingModals = document.querySelectorAll('#downloadModal, .tmgt-modal-backdrop.open, .psm-modal-backdrop.open, .tbtt-modal-backdrop.open');
        existingModals.forEach(function (m) {
            if (m.id !== 'downloadNoticeModal') {
                m.classList.remove('open');
            }
        });

        backdrop.classList.add('open');
    }

    // Đóng modal
    function hideDownloadNotice() {
        var backdrop = document.getElementById('downloadNoticeModal');
        if (backdrop) {
            backdrop.classList.remove('open');
        }
    }

    // Lưu sự kiện click tải game vào localStorage để Dashboard theo dõi
    function recordDownloadEvent(eventType, gameKey) {
        try {
            var key = 'lamon_dl_events';
            var list = [];
            var raw = localStorage.getItem(key);
            if (raw) {
                list = JSON.parse(raw);
                if (!Array.isArray(list)) list = [];
            }
            list.push({
                type: eventType, // 'android' | 'ios' | 'pc' | 'messenger' | 'fanpage'
                game: gameKey || getCurrentGameKey(),
                timestamp: Date.now()
            });
            if (list.length > 500) {
                list = list.slice(-500);
            }
            localStorage.setItem(key, JSON.stringify(list));
        } catch (e) {}
    }

    // Lắng nghe sự kiện click tải game (Android, Windows PC, iOS)
    function attachDownloadTriggers() {
        var pendingIosNotice = false;

        document.addEventListener('click', function (e) {
            var el = e.target.closest('a, button');
            if (!el) return;

            // Bỏ qua các nút trong chính modal thông báo này
            if (el.id === 'dlNoticeFanpageBtn' || el.id === 'dlNoticeMessengerBtn' || el.id === 'dlNoticeCloseBtn' || el.closest('#downloadNoticeModal')) {
                return;
            }

            // 1. Tuyệt đối bỏ qua các nút MỞ modal chọn thiết bị hoặc ĐÓNG modal
            // (để người dùng mở popup chọn thiết bị Windows / Android / iOS bình thường)
            var isModalTrigger = el.id === 'downloadCta' ||
                el.classList.contains('open-download-modal') ||
                el.closest('.open-download-modal') ||
                el.closest('#downloadCta') ||
                el.id === 'closeDownloadModalBtn' ||
                el.closest('#closeDownloadModalBtn');

            if (isModalTrigger) {
                return;
            }

            var href = (el.getAttribute('href') || '').trim();
            var hrefLower = href.toLowerCase();
            var platform = (el.getAttribute('data-platform') || '').toLowerCase();
            var track = (el.getAttribute('data-track') || '').toLowerCase();
            var className = (el.className || '').toString().toLowerCase();

            // Bỏ qua nếu href là javascript, # hoặc rỗng (không phải link tải file/store)
            if (!href || href === '#' || hrefLower === 'javascript:void(0)' || hrefLower.indexOf('javascript:') === 0 || (href.charAt(0) === '#' && href.length > 1)) {
                return;
            }

            // Bỏ qua các tab switcher ở hero (đây là nút chuyển tab nền tảng để xem thông tin, không phải nút tải thực sự)
            if (el.classList.contains('tmgt-plat-btn') || el.classList.contains('psm-plat-btn') || el.classList.contains('tbtt-plat-btn') || el.closest('.tmgt-platforms') || el.closest('.psm-platforms') || el.closest('.tbtt-platforms')) {
                return;
            }

            // Nhận diện xem click có xuất phát từ bên trong modal chọn thiết bị (#downloadModal) không
            var isInsideDownloadModal = !!el.closest('#downloadModal');
            var isDownloadCard = className.indexOf('dl-card') !== -1;

            // 1. Nhận diện nút tải iOS
            var isIosDownload = platform === 'ios' ||
                track.indexOf('ios') !== -1 ||
                hrefLower.indexOf('apps.apple.com') !== -1 ||
                hrefLower.indexOf('yxtgym.com') !== -1 ||
                (className.indexOf('ios') !== -1 && (className.indexOf('cta-action-btn') !== -1 || isDownloadCard));

            // 2. Nhận diện nút tải Android hoặc PC/Windows
            var isApkDownload = hrefLower.indexOf('.apk') !== -1;
            var isExeOrZip = hrefLower.indexOf('.exe') !== -1 || hrefLower.indexOf('.zip') !== -1;
            var isPlatformAndroidOrPc = platform === 'android' || platform === 'windows' || platform === 'pc';
            var isTrackAndroidOrPc = track.indexOf('android') !== -1 || track.indexOf('windows') !== -1 || track.indexOf('pc') !== -1;

            var isAndroidOrPcDownload = isApkDownload || isExeOrZip || (isInsideDownloadModal && isPlatformAndroidOrPc) || (isDownloadCard && isPlatformAndroidOrPc);

            if (isAndroidOrPcDownload) {
                var detectedOs = (platform === 'windows' || platform === 'pc' || track.indexOf('pc') !== -1 || track.indexOf('windows') !== -1 || isExeOrZip)
                    ? 'pc'
                    : 'android';
                recordDownloadEvent(detectedOs);

                // File bắt đầu tải qua hành vi tự nhiên của trình duyệt.
                // Nếu click từ trong modal chọn nền tảng, đợi modal đóng trước (400ms) rồi mới hiển thị popup sau 600ms
                var delay = isInsideDownloadModal ? 600 : 450;
                setTimeout(function () {
                    showDownloadNotice();
                }, delay);
            } else if (isIosDownload) {
                recordDownloadEvent('ios');

                // Đối với iOS: link mở sang tab mới tải game / App Store.
                var delayIos = isInsideDownloadModal ? 600 : 450;
                setTimeout(function () {
                    showDownloadNotice();
                }, delayIos);

                // Đặt cờ để khi người dùng chuyển tab quay lại web, popup chắc chắn hiển thị đón sẵn
                pendingIosNotice = true;
            }
        });

        // Khi người dùng chuyển tab đi tải game rồi quay lại tab web
        function handleTabReturn() {
            if (pendingIosNotice) {
                pendingIosNotice = false;
                setTimeout(function () {
                    showDownloadNotice();
                }, 200);
            }
        }

        document.addEventListener('visibilitychange', function () {
            if (document.visibilityState === 'visible') {
                handleTabReturn();
            }
        });

        window.addEventListener('focus', function () {
            handleTabReturn();
        });

        // Đóng bằng phím ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                hideDownloadNotice();
            }
        });
    }

    // Khởi tạo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            injectModalDOM();
            attachDownloadTriggers();
        });
    } else {
        injectModalDOM();
        attachDownloadTriggers();
    }

    // Expose API toàn cục
    window.showDownloadNoticeModal = showDownloadNotice;
    window.hideDownloadNoticeModal = hideDownloadNotice;
})();
