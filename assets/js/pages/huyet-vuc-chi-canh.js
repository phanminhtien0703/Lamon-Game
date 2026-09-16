(function () {
            const carousel = document.querySelector('.carousel');
            if (!carousel) return;
            const slides = Array.from(carousel.querySelectorAll('.slide'));
            const dotsContainer = carousel.querySelector('.dots');
            let idx = slides.findIndex(s => s.classList.contains('active'));
            if (idx < 0) idx = 0;
            const updateDots = () => {
                if (!dotsContainer) return;
                const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
                dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            };
            const show = i => { slides.forEach((s, j) => s.classList.toggle('active', j === i)); idx = i; updateDots(); };
            const next = () => { show((idx + 1) % slides.length); };
            const prev = () => { show((idx - 1 + slides.length) % slides.length); };

            // build dots
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                slides.forEach((s, i) => {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'dot' + (i === idx ? ' active' : '');
                    btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                    btn.addEventListener('click', () => show(i));
                    dotsContainer.appendChild(btn);
                });
            }

            // controls
            const btnNext = carousel.querySelector('.control-btn.next');
            const btnPrev = carousel.querySelector('.control-btn.prev');
            if (btnNext) btnNext.addEventListener('click', () => next());
            if (btnPrev) btnPrev.addEventListener('click', () => prev());

            // keyboard support
            document.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); });

            // touch / swipe support
            let startX = 0, delta = 0;
            carousel.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; });
            carousel.addEventListener('touchmove', function (e) { delta = e.touches[0].clientX - startX; });
            carousel.addEventListener('touchend', function () { if (delta > 40) prev(); else if (delta < -40) next(); delta = 0; });
        })();
