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
            timer = setInterval(nextSlide, 4500);
        }
        resetAutoPlay();

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
    });
})();
