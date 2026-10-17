/**
 * Thần Ma Giáng Thế - Interactive Landing Page Script
 * File: assets/js/pages/than-ma-giang-the.js
 */
document.addEventListener('DOMContentLoaded', function () {
    // === 1. Header scroll effect ===
    const header = document.querySelector('.tmgt-header');
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
    const thumbItems = document.querySelectorAll('.tmgt-thumb-item');
    const desktopScenes = [
        '/images/tmgt/tmgt-scene-3.webp',
        '/images/tmgt/tmgt-banner.webp',
        '/images/tmgt/tmgt-scene-1.webp',
        '/images/tmgt/tmgt-scene-2.webp'
    ];
    const mobileScenes = [
        '/images/tmgt/tmgt-scene-3-mobile.webp',
        '/images/tmgt/tmgt-banner-mobile.webp',
        '/images/tmgt/tmgt-scene-1-mobile.webp',
        '/images/tmgt/tmgt-scene-2-mobile.webp'
    ];
    let currentSceneIdx = 0;

    function switchScene(idx) {
        if (!heroBg || idx < 0 || idx >= desktopScenes.length) return;
        currentSceneIdx = idx;
        const activeList = window.innerWidth <= 768 ? mobileScenes : desktopScenes;
        const newBg = `url('${activeList[idx]}')`;
        heroBg.style.backgroundImage = newBg;
        heroBg.style.setProperty('background-image', newBg, 'important');
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

    // === 3. Platform Switcher in Hero ===
    const platBtns = document.querySelectorAll('.tmgt-plat-btn');
    platBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            platBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
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
        const targetBtn = document.querySelector(`.tmgt-plat-btn[data-platform="${detected}"]`);
        if (targetBtn) {
            platBtns.forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
        }
    })();

    // === 4. Gallery Slider / Carousel Logic ===
    const galleryTrack = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');

    if (galleryTrack && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const card = galleryTrack.querySelector('.tmgt-gallery-card');
            const cardWidth = card ? card.offsetWidth + 18 : 320;
            galleryTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const card = galleryTrack.querySelector('.tmgt-gallery-card');
            const cardWidth = card ? card.offsetWidth + 18 : 320;
            galleryTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
    }

    const viewAllBtn = document.getElementById('viewAllGallery');
    if (viewAllBtn && galleryTrack) {
        viewAllBtn.addEventListener('click', () => {
            const firstCard = galleryTrack.querySelector('.tmgt-gallery-card');
            if (firstCard) {
                firstCard.click();
            }
        });
    }

    // === 5. Lightbox Logic ===
    const lightbox = document.getElementById('tmgtLightbox');
    const lightboxImg = document.getElementById('tmgtLightboxImg');
    const lightboxClose = document.getElementById('tmgtLightboxClose');
    const galleryCards = document.querySelectorAll('.tmgt-gallery-card');

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
        if (lightboxImg) lightboxImg.src = '';
    }

    galleryCards.forEach(card => {
        card.addEventListener('click', function () {
            const fullSrc = this.getAttribute('data-full') || this.querySelector('img').src;
            if (lightbox && lightboxImg) {
                lightboxImg.src = fullSrc;
                lightbox.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // === 6. Install Guide Modal Logic ===
    const guideModal = document.getElementById('guideModal');
    const openGuideBtns = document.querySelectorAll('.open-guide-btn');
    const closeGuideBtn = document.getElementById('closeGuideBtn');
    const modalTabs = document.querySelectorAll('.tmgt-modal-tab-btn');
    const modalTabContents = document.querySelectorAll('.tmgt-modal-content');

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

    // === 7. Download Platform Selection Modal Logic ===
    const downloadModal = document.getElementById('downloadModal');
    const closeDownloadModalBtn = document.getElementById('closeDownloadModalBtn');
    const downloadTriggerBtns = document.querySelectorAll('.open-download-modal, #downloadCta');
    const dlCards = document.querySelectorAll('.tmgt-dl-card');

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
            if (lightbox && lightbox.classList.contains('open')) closeLightbox();
            if (guideModal && guideModal.classList.contains('open')) guideModal.classList.remove('open');
            if (downloadModal && downloadModal.classList.contains('open')) closeDownloadModal();
        }
    });
});
