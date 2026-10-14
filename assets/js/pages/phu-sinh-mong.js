/**
 * Phù Sinh Mộng - Interactive Script
 * File: assets/js/pages/phu-sinh-mong.js
 */
(function () {
    // === 1. Hero Carousel Logic ===
    const viewport = document.getElementById('tmgtCarousel');
    if (viewport) {
        const slides = Array.from(viewport.querySelectorAll('.tmgt-slide'));
        const dotsContainer = document.getElementById('carouselDots');
        const btnPrev = document.getElementById('prevSlide');
        const btnNext = document.getElementById('nextSlide');
        let currentIdx = 0;
        let timer = null;

        // Render Dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'tmgt-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
        }

        function goToSlide(idx) {
            slides[currentIdx].classList.remove('active');
            if (dotsContainer && dotsContainer.children[currentIdx]) {
                dotsContainer.children[currentIdx].classList.remove('active');
            }
            currentIdx = (idx + slides.length) % slides.length;
            slides[currentIdx].classList.add('active');
            if (dotsContainer && dotsContainer.children[currentIdx]) {
                dotsContainer.children[currentIdx].classList.add('active');
            }
            resetAutoPlay();
        }

        function nextSlide() { goToSlide(currentIdx + 1); }
        function prevSlide() { goToSlide(currentIdx - 1); }

        if (btnNext) btnNext.addEventListener('click', nextSlide);
        if (btnPrev) btnPrev.addEventListener('click', prevSlide);

        function resetAutoPlay() {
            if (timer) clearInterval(timer);
            timer = setInterval(nextSlide, 5000);
        }
        resetAutoPlay();

        // Touch swipe support
        let startX = 0;
        viewport.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
        viewport.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].clientX - startX;
            if (diff > 45) prevSlide();
            else if (diff < -45) nextSlide();
        }, { passive: true });
    }

    // === 2. Interactive Character Class Switcher ===
    const classData = [
        {
            name: 'Kiếm Tôn',
            role: 'Cận Chiến / Bạo Kích Sát Thương',
            desc: 'Ngự kiếm xuất trần, kiếm khí tung hoành Tam Giới. Sở hữu tốc độ xuất chiêu chớp nhoáng, chuỗi combo biến hóa khôn lường và sát thương bạo kích đơn mục tiêu đứng đầu.',
            atk: '95%', def: '70%', cc: '75%', diff: '70%',
            img: '/images/psm/psm-banner.jpg'
        },
        {
            name: 'Cầm Sư',
            role: 'Ma Pháp / Trị Liệu Trận Pháp',
            desc: 'Dùng tiếng đàn dẫn dắt linh khí đất trời. Vừa có khả năng trị liệu hồi phục diện rộng cho đồng đội trong phụ bản, vừa có thể gảy khúc đoạn trường sát thương kẻ địch từ xa.',
            atk: '85%', def: '65%', cc: '95%', diff: '60%',
            img: '/images/psm/psm-banner-mobile.jpg'
        },
        {
            name: 'Linh Vũ',
            role: 'Xạ Thủ / Tầm Xa Nhanh Nhẹn',
            desc: 'Tên phát như sao băng rơi rụng. Giữ cự ly tác chiến hoàn hảo, thả diều đối thủ và gây sát thương liên tục từ khoảng cách an toàn bậc nhất chiến trường.',
            atk: '90%', def: '50%', cc: '80%', diff: '75%',
            img: '/images/psm/psm-logo.jpg'
        },
        {
            name: 'Địa Tạng',
            role: 'Phòng Ngự / Kim Cang Bất Hoại',
            desc: 'Thân thể kim cang ngưng tụ linh lực thiên địa. Là tấm lá chắn bất hoại gánh chịu mọi đòn sát thương khốc liệt nhất, bảo vệ vững chắc cho toàn bộ tiên lữ trong bang hội.',
            atk: '70%', def: '100%', cc: '85%', diff: '55%',
            img: '/images/psm/psm-banner.jpg'
        }
    ];

    const tabs = document.querySelectorAll('.tmgt-class-tab');
    const className = document.getElementById('className');
    const classRole = document.getElementById('classRole');
    const classDesc = document.getElementById('classDesc');
    const statAtk = document.getElementById('statAtk');
    const statDef = document.getElementById('statDef');
    const statCc = document.getElementById('statCc');
    const statDiff = document.getElementById('statDiff');
    const classImg = document.getElementById('classImg');

    if (tabs.length > 0) {
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const data = classData[index];
                if (data) {
                    if (className) className.textContent = data.name;
                    if (classRole) classRole.textContent = data.role;
                    if (classDesc) classDesc.textContent = data.desc;
                    if (statAtk) statAtk.style.width = data.atk;
                    if (statDef) statDef.style.width = data.def;
                    if (statCc) statCc.style.width = data.cc;
                    if (statDiff) statDiff.style.width = data.diff;
                    if (classImg) {
                        classImg.style.opacity = '0';
                        setTimeout(() => {
                            classImg.src = data.img;
                            classImg.alt = data.name + ' — Phù Sinh Mộng';
                            classImg.style.opacity = '1';
                        }, 200);
                    }
                }
            });
        });
    }

    // === 3. Features Slide Navigation (Mobile) ===
    const featuresGrid = document.getElementById('featuresGrid');
    const fDots = document.querySelectorAll('.tmgt-f-dot');
    const btnFeatPrev = document.getElementById('featPrev');
    const btnFeatNext = document.getElementById('featNext');

    if (featuresGrid && fDots.length > 0) {
        let fIndex = 0;
        const cards = featuresGrid.querySelectorAll('.tmgt-feature-card');

        function updateFeatureSlide(idx) {
            fIndex = (idx + cards.length) % cards.length;
            cards.forEach((c, i) => {
                c.classList.toggle('active-slide', i === fIndex);
            });
            fDots.forEach((d, i) => {
                d.classList.toggle('active', i === fIndex);
            });
        }

        fDots.forEach((d, i) => {
            d.addEventListener('click', () => updateFeatureSlide(i));
        });

        if (btnFeatPrev) btnFeatPrev.addEventListener('click', () => updateFeatureSlide(fIndex - 1));
        if (btnFeatNext) btnFeatNext.addEventListener('click', () => updateFeatureSlide(fIndex + 1));
    }
})();
