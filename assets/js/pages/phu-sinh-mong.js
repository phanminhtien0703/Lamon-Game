/**
 * Phù Sinh Mộng - Tiên Hiệp Vực Interactive Script
 * File: assets/js/pages/phu-sinh-mong.js
 */
document.addEventListener('DOMContentLoaded', function () {
    // === 1. Header scroll effect ===
    const header = document.querySelector('.psm-header');
    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // === 2. Hero Background & Thumbnail Switcher ===
    const heroBg = document.getElementById('heroBg');
    const thumbItems = document.querySelectorAll('.psm-thumb-item');
    const scenes = [
        '/images/psm/psm-hero-xianxia.jpg?v=2',
        '/images/psm/psm-scene-portal.jpg',
        '/images/psm/psm-scene-dragon.jpg',
        '/images/psm/psm-scene-halo.jpg'
    ];
    let currentSceneIdx = 0;

    function switchScene(idx) {
        if (!heroBg || idx < 0 || idx >= scenes.length) return;
        currentSceneIdx = idx;
        heroBg.style.backgroundImage = `url('${scenes[idx]}')`;
        thumbItems.forEach((thumb, i) => {
            if (i === idx) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }

    thumbItems.forEach(thumb => {
        thumb.addEventListener('click', function () {
            const idx = parseInt(this.getAttribute('data-index'), 10);
            switchScene(idx);
        });
    });

    // === 3. Platform Switcher & Download CTA Dynamic Linking ===
    const platBtns = document.querySelectorAll('.psm-plat-btn');
    const downloadCta = document.getElementById('downloadCta');
    const downloadPlatforms = {
        'android': {
            url: 'https://down.skeideng.com/apk/mnghoalc/93e8aaac362ce4345501c09f8ecd5853.apk',
            label: 'TẢI GAME BẢN ANDROID',
            target: '_self'
        },
        'ios': {
            url: 'https://t.skeideng.com/S2Pxl3.html',
            label: 'TẢI GAME BẢN IOS',
            target: '_blank'
        },
        'windows': {
            url: 'https://down.skeideng.com/apk/mnghoalc/93e8aaac362ce4345501c09f8ecd5853.apk',
            label: 'TẢI BẢN GIẢ LẬP PC',
            target: '_self',
            guideTab: 'pc'
        }
    };

    let activePlatform = 'android';

    platBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const plat = this.getAttribute('data-platform');
            platBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activePlatform = plat;

            if (downloadCta && downloadPlatforms[plat]) {
                const conf = downloadPlatforms[plat];
                downloadCta.href = conf.url;
                if (conf.target) {
                    downloadCta.target = conf.target;
                } else {
                    downloadCta.removeAttribute('target');
                }
            }
        });
    });

    // Auto-detect OS on page load (highlights detected platform without triggering download)
    (function detectUserDevice() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        let detected = 'android';
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
            detected = 'ios';
        } else if (/Win|Windows/.test(ua)) {
            detected = 'windows';
        }
        const targetBtn = document.querySelector(`.psm-plat-btn[data-platform="${detected}"]`);
        if (targetBtn) {
            platBtns.forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
            activePlatform = detected;
            if (downloadCta && downloadPlatforms[detected]) {
                const conf = downloadPlatforms[detected];
                downloadCta.href = conf.url;
                if (conf.target) {
                    downloadCta.target = conf.target;
                } else {
                    downloadCta.removeAttribute('target');
                }
            }
        }
    })();

    // === 4. Gallery Carousel Navigation & Lightbox ===
    const galleryTrack = document.getElementById('galleryTrack');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');

    if (galleryTrack && galleryPrev && galleryNext) {
        function getScrollStep() {
            const card = galleryTrack.querySelector('.psm-gallery-card');
            return card ? (card.offsetWidth + 16) : 360;
        }

        galleryPrev.addEventListener('click', () => {
            galleryTrack.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
        });
        galleryNext.addEventListener('click', () => {
            galleryTrack.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
        });

        const viewAllGallery = document.getElementById('viewAllGallery');
        if (viewAllGallery) {
            viewAllGallery.addEventListener('click', () => {
                galleryTrack.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
            });
        }
    }

    // Lightbox Logic
    const lightbox = document.getElementById('psmLightbox');
    const lightboxImg = document.getElementById('psmLightboxImg');
    const lightboxClose = document.getElementById('psmLightboxClose');
    const galleryCards = document.querySelectorAll('.psm-gallery-card');

    galleryCards.forEach(card => {
        card.addEventListener('click', function () {
            const fullSrc = this.getAttribute('data-full') || this.querySelector('img').src;
            if (lightbox && lightboxImg) {
                lightboxImg.src = fullSrc;
                lightbox.classList.add('open');
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('open');
        });
    }

    // === 5. Install Guide Modal Logic ===
    const guideModal = document.getElementById('guideModal');
    const openGuideBtns = document.querySelectorAll('.open-guide-btn');
    const closeGuideBtn = document.getElementById('closeGuideBtn');
    const modalTabs = document.querySelectorAll('.psm-modal-tab-btn');
    const modalTabContents = document.querySelectorAll('.psm-modal-content');

    function openGuide(tabName = 'android') {
        if (!guideModal) return;
        guideModal.classList.add('open');
        switchModalTab(tabName);
    }

    function closeGuide() {
        if (guideModal) guideModal.classList.remove('open');
    }

    function switchModalTab(tabName) {
        modalTabs.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        modalTabContents.forEach(content => {
            if (content.getAttribute('data-content') === tabName) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    }

    openGuideBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const tab = this.getAttribute('data-guide-tab') || 'android';
            openGuide(tab);
        });
    });

    modalTabs.forEach(tabBtn => {
        tabBtn.addEventListener('click', function () {
            switchModalTab(this.getAttribute('data-tab'));
        });
    });

    if (closeGuideBtn) closeGuideBtn.addEventListener('click', closeGuide);
    if (guideModal) {
        guideModal.addEventListener('click', (e) => {
            if (e.target === guideModal) closeGuide();
        });
    }

    // === 6. Download Platform Selection Modal Logic ===
    const downloadModal = document.getElementById('downloadModal');
    const closeDownloadModalBtn = document.getElementById('closeDownloadModalBtn');
    const downloadTriggerBtns = document.querySelectorAll('.open-download-modal, #downloadCta');
    const dlCards = document.querySelectorAll('.psm-dl-card');

    function openDownloadModal() {
        if (!downloadModal) return;
        downloadModal.classList.add('open');
    }

    function closeDownloadModal() {
        if (downloadModal) downloadModal.classList.remove('open');
    }

    downloadTriggerBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            openDownloadModal();
        });
    });

    if (closeDownloadModalBtn) {
        closeDownloadModalBtn.addEventListener('click', closeDownloadModal);
    }

    if (downloadModal) {
        downloadModal.addEventListener('click', (e) => {
            if (e.target === downloadModal) closeDownloadModal();
        });
    }

    dlCards.forEach(card => {
        card.addEventListener('click', function () {
            setTimeout(closeDownloadModal, 400);
        });
    });

    // ESC key closes all modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightbox && lightbox.classList.contains('open')) lightbox.classList.remove('open');
            if (guideModal && guideModal.classList.contains('open')) guideModal.classList.remove('open');
            if (downloadModal && downloadModal.classList.contains('open')) closeDownloadModal();
        }
    });
});
