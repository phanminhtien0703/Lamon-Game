/**
 * =========================================================
 * LAMON GAME — MMORPG PORTAL HOME INTERACTION LOGIC
 * Tập tin: assets/js/pages/home.js
 * Tuân thủ: AI_RULES_PHP_MVC.md (Rule 9)
 * =========================================================
 */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        // === 1. Hero Banner Slider ===
        const slider = document.getElementById('portalHeroSlider');
        if (!slider) return;

        const slides = Array.from(slider.querySelectorAll('.portal-hero-slide'));
        const dotsContainer = document.getElementById('portalSliderDots');
        const btnPrev = document.getElementById('portalSliderPrev');
        const btnNext = document.getElementById('portalSliderNext');

        if (slides.length <= 1) return;

        let currentIdx = 0;
        let timer = null;

        // Render Navigation Dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach(function (_, i) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'portal-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Chuyển banner ' + (i + 1));
                dot.addEventListener('click', function () {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            });
        }

        const arrowPrev = document.getElementById('heroArrowPrev');
        const arrowNext = document.getElementById('heroArrowNext');
        const counterCurrent = document.getElementById('heroCounterCurrent');
        const counterTotal = document.getElementById('heroCounterTotal');

        if (counterTotal) {
            counterTotal.textContent = (slides.length < 10 ? '0' : '') + slides.length;
        }

        function updateCounter() {
            if (counterCurrent) {
                counterCurrent.textContent = (currentIdx + 1 < 10 ? '0' : '') + (currentIdx + 1);
            }
        }
        updateCounter();

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
            updateCounter();
            resetAutoPlay();
        }

        function nextSlide() { goToSlide(currentIdx + 1); }
        function prevSlide() { goToSlide(currentIdx - 1); }

        if (btnNext) btnNext.addEventListener('click', nextSlide);
        if (btnPrev) btnPrev.addEventListener('click', prevSlide);
        if (arrowNext) arrowNext.addEventListener('click', nextSlide);
        if (arrowPrev) arrowPrev.addEventListener('click', prevSlide);

        function startAutoPlay() {
            if (timer) clearInterval(timer);
            timer = setInterval(function () {
                if (!document.hidden) {
                    nextSlide();
                }
            }, 6500);
        }

        function resetAutoPlay() {
            startAutoPlay();
        }

        // Delay starting autoplay until page is fully settled so LCP settles cleanly
        if (document.readyState === 'complete') {
            setTimeout(startAutoPlay, 3500);
        } else {
            window.addEventListener('load', function () {
                setTimeout(startAutoPlay, 3000);
            });
        }

        // Preload next slides in idle time
        function preloadOtherSlides() {
            slides.forEach(function (slide, idx) {
                if (idx === 0) return;
                var imgs = slide.querySelectorAll('img');
                imgs.forEach(function (img) {
                    if (img.loading === 'lazy') {
                        img.loading = 'eager';
                    }
                });
            });
        }
        if ('requestIdleCallback' in window) {
            requestIdleCallback(preloadOtherSlides, { timeout: 3000 });
        } else {
            window.addEventListener('load', function () {
                setTimeout(preloadOtherSlides, 1000);
            });
        }

        // Touch Swipe Handling on Mobile
        let startX = 0;
        slider.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
        }, { passive: true });

        slider.addEventListener('touchend', function (e) {
            const diff = e.changedTouches[0].clientX - startX;
            if (diff > 45) {
                prevSlide();
            } else if (diff < -45) {
                nextSlide();
            }
        }, { passive: true });

        // === 2. Clickable Game Cards (Chuyển nhanh sang giao diện tải game) ===
        const gameCards = document.querySelectorAll('.portal-game-card');
        gameCards.forEach(function (card) {
            card.addEventListener('click', function (e) {
                // Không can thiệp nếu người dùng click trực tiếp vào các nút hành động con (.portal-game-actions)
                if (e.target.closest('.portal-game-actions a, .portal-game-actions button')) {
                    return;
                }

                const url = card.getAttribute('data-download-url');
                if (!url) return;

                const isBlank = card.getAttribute('data-target') === '_blank' || e.ctrlKey || e.metaKey;
                if (isBlank) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                } else {
                    window.location.href = url;
                }
            });
        });
    });
})();
