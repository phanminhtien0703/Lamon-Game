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
            desc: 'Tệp cài đặt đang được tải về thiết bị của bạn.<br>Trong lúc chờ đợi, bạn có muốn <strong>nhận Giftcode tân thủ</strong> tại Fanpage không?',
            claimText: 'Nhận Code Tại Fanpage',
            dismissText: 'Đóng',
            claimUrl: 'https://m.me/lamongame?text=M%C3%ACnh%20mu%E1%BB%91n%20nh%E1%BA%ADn%20code%20game%20Th%E1%BA%A7n%20Ma%20Gi%C3%A1ng%20Th%E1%BA%BF',
            fanpageUrl: 'https://www.facebook.com/lamongame/'
        },
        'nhat-kiem-phu-sinh': {
            name: 'Nhất Kiếm Phù Sinh',
            lang: 'vi',
            title: 'Game Đang Được Tải Về!',
            desc: 'Tệp cài đặt đang được tải về thiết bị của bạn.<br>Trong lúc chờ đợi, bạn có muốn <strong>nhận Giftcode tân thủ</strong> tại Fanpage không?',
            claimText: 'Nhận Code Tại Fanpage',
            dismissText: 'Đóng',
            claimUrl: 'https://m.me/NhatKiemPhuSinh.LamonGame?text=M%C3%ACnh%20mu%E1%BB%91n%20nh%E1%BA%ADn%20code%20game%20Nh%E1%BA%A5t%20Ki%E1%BA%BFm%20Ph%C3%B9%20Sinh',
            fanpageUrl: 'https://www.facebook.com/NhatKiemPhuSinh.LamonGame/'
        },
        'chien-binh-thuc-tinh': {
            name: 'Chiến Binh Thức Tỉnh',
            lang: 'vi',
            title: 'Game Đang Được Tải Về!',
            desc: 'Tệp cài đặt đang được tải về thiết bị của bạn.<br>Trong lúc chờ đợi, bạn có muốn <strong>nhận Giftcode tân thủ</strong> tại Fanpage không?',
            claimText: 'Nhận Code Tại Fanpage',
            dismissText: 'Đóng',
            claimUrl: 'https://m.me/ChienBinhThucTinh.LamonGame?text=M%C3%ACnh%20mu%E1%BB%91n%20nh%E1%BA%ADn%20code%20game%20Chi%E1%BA%BFn%20Binh%20Th%E1%BB%A9c%20T%E1%BB%89nh',
            fanpageUrl: 'https://www.facebook.com/ChienBinhThucTinh.LamonGame/'
        },
        'era-of-warfare': {
            name: 'Era of Warfare',
            lang: 'en',
            title: 'Game is Downloading!',
            desc: 'The game installer is downloading to your device.<br>While waiting, would you like to receive an exclusive <strong>Starter Giftcode</strong> on our Fanpage?',
            claimText: 'Claim Code on Fanpage',
            dismissText: 'Close',
            claimUrl: 'https://m.me/Era.of.Warfare.Private?text=I%20want%20to%20receive%20code%20for%20Era%20of%20Warfare',
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
            background: radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, rgba(245, 158, 11, 0) 70%);
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
            background: linear-gradient(135deg, #f59e0b, #ea580c);
            border: 2px solid #0d121e;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            box-shadow: 0 4px 10px rgba(245, 158, 11, 0.45);
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
            color: #fbbf24;
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
        }

        .dl-notice-btn-claim {
            flex: 1.35;
            background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
            color: #ffffff !important;
            box-shadow: 0 4px 16px rgba(245, 158, 11, 0.4);
            border: 1px solid rgba(254, 215, 170, 0.3);
        }

        .dl-notice-btn-claim:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(245, 158, 11, 0.55);
            filter: brightness(1.08);
            color: #ffffff !important;
        }

        .dl-notice-btn-dismiss {
            flex: 1;
            background: rgba(255, 255, 255, 0.08);
            color: #e2e8f0 !important;
            border: 1px solid rgba(255, 255, 255, 0.16);
        }

        .dl-notice-btn-dismiss:hover {
            background: rgba(255, 255, 255, 0.15);
            color: #ffffff !important;
            transform: translateY(-1px);
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
                flex-direction: column-reverse;
                gap: 10px;
            }
            .dl-notice-btn {
                width: 100%;
                padding: 12px 16px;
                font-size: 14px;
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
                    <button type="button" id="dlNoticeDismissBtn" class="dl-notice-btn dl-notice-btn-dismiss">
                        ${cfg.dismissText}
                    </button>
                    <a id="dlNoticeClaimBtn" href="${cfg.claimUrl}" target="_blank" rel="noopener noreferrer" class="dl-notice-btn dl-notice-btn-claim" data-track="download-modal-claim-giftcode">
                        <span>🎁</span>
                        <span id="dlNoticeClaimText">${cfg.claimText}</span>
                    </a>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);

        // Gắn sự kiện đóng modal
        var closeBtn = document.getElementById('dlNoticeCloseBtn');
        var dismissBtn = document.getElementById('dlNoticeDismissBtn');
        var claimBtn = document.getElementById('dlNoticeClaimBtn');

        if (closeBtn) {
            closeBtn.addEventListener('click', hideDownloadNotice);
        }
        if (dismissBtn) {
            dismissBtn.addEventListener('click', hideDownloadNotice);
        }
        if (claimBtn) {
            claimBtn.addEventListener('click', function () {
                setTimeout(hideDownloadNotice, 400);
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
        var claimTextEl = document.getElementById('dlNoticeClaimText');
        var claimBtn = document.getElementById('dlNoticeClaimBtn');
        var dismissBtn = document.getElementById('dlNoticeDismissBtn');

        if (titleEl) titleEl.innerText = cfg.title;
        if (descEl) descEl.innerHTML = cfg.desc;
        if (claimTextEl) claimTextEl.innerText = cfg.claimText;
        if (dismissBtn) dismissBtn.innerText = cfg.dismissText;
        if (claimBtn) claimBtn.href = cfg.claimUrl;

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

    // Lắng nghe sự kiện click tải game (Android / Windows APK)
    function attachDownloadTriggers() {
        document.addEventListener('click', function (e) {
            var el = e.target.closest('a, button');
            if (!el) return;

            // Kiểm tra xem link có phải tải game Android hoặc PC/Windows hay không
            var href = (el.getAttribute('href') || '').toLowerCase();
            var platform = (el.getAttribute('data-platform') || '').toLowerCase();
            var track = (el.getAttribute('data-track') || '').toLowerCase();
            var className = (el.className || '').toString().toLowerCase();

            // Bỏ qua nút nhận code trong chính modal này
            if (el.id === 'dlNoticeClaimBtn' || el.id === 'dlNoticeDismissBtn' || el.id === 'dlNoticeCloseBtn') {
                return;
            }

            // Bỏ qua nền tảng iOS (vì iOS mở App Store hoặc trang cấu hình, không phải tệp APK tải về máy)
            if (platform === 'ios' || track.indexOf('ios') !== -1 || href.indexOf('apps.apple.com') !== -1 || href.indexOf('yxtgym.com') !== -1) {
                return;
            }

            // Điều kiện nhận diện nút tải Android hoặc PC/Windows
            var isApkDownload = href.indexOf('.apk') !== -1;
            var isPlatformAndroidOrPc = platform === 'android' || platform === 'windows' || platform === 'pc';
            var isTrackAndroidOrPc = track.indexOf('android') !== -1 || track.indexOf('windows') !== -1 || track.indexOf('pc') !== -1;
            var isCtaAndroid = className.indexOf('cta-action-btn') !== -1 && className.indexOf('android') !== -1;

            if (isApkDownload || isPlatformAndroidOrPc || isTrackAndroidOrPc || isCtaAndroid) {
                // File bắt đầu tải qua hành vi tự nhiên của trình duyệt,
                // Hiển thị popup sau 450ms để người chơi thấy rõ file đang được tải
                setTimeout(function () {
                    showDownloadNotice();
                }, 450);
            }
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
