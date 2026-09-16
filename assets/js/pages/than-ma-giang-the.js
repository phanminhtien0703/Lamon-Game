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
                    if (dotsContainer) {
                        dotsContainer.children[currentIdx].classList.remove('active');
                    }
                    currentIdx = (idx + slides.length) % slides.length;
                    slides[currentIdx].classList.add('active');
                    if (dotsContainer) {
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
                    name: 'Đại Thánh',
                    role: 'Tiên Phong / Phòng Ngự Vô Song',
                    desc: 'Thân thể kim cang bất hoại, luôn là lá chắn kiên cố cho đồng đội trong mọi phụ bản và chiến trường PvP nghìn người. Sở hữu khả năng khiêu khích và phản đòn cực kỳ khó chịu.',
                    atk: '75%', def: '100%', cc: '85%', diff: '60%',
                    img: '/images/tmgt/class-daithanh.jpg'
                },
                {
                    name: 'Ma Tăng',
                    role: 'Sát Thương / Cuồng Nộ Bạt Sơn',
                    desc: 'Nhập ma đắc đạo, sức mạnh cuồng bạo áp đảo càn khôn. Chuyên áp sát, gây choáng và thiêu đốt sinh lực đối thủ bằng những chuỗi combo liên hoàn cuồng nhiệt.',
                    atk: '95%', def: '70%', cc: '80%', diff: '75%',
                    img: '/images/tmgt/class-matang.jpg'
                },
                {
                    name: 'La Sát',
                    role: 'Thích Khách / Đoạt Hồn Bạo Kích',
                    desc: 'Bóng ma trên chiến trường, thoắt ẩn thoắt hiện. Tốc độ di chuyển và tỷ lệ bạo kích đạt cảnh giới tối thượng, hạ gục mục tiêu chủ lực chỉ trong một chớp mắt.',
                    atk: '100%', def: '50%', cc: '65%', diff: '90%',
                    img: '/images/tmgt/class-lasat.jpg'
                },
                {
                    name: 'Quyền Sư',
                    role: 'Cận Chiến / Quyền Kình Vô Song',
                    desc: 'Luyện quyền đạt đến đỉnh cao, phá vỡ mọi lớp giáp kiên cố nhất. Sở hữu khả năng hồi phục nội tại bền bỉ và lực khống chế diện rộng khi đối đầu số đông.',
                    atk: '85%', def: '80%', cc: '75%', diff: '65%',
                    img: '/images/tmgt/class-quyensu.jpg'
                },
                {
                    name: 'Chiến Pháp',
                    role: 'Ma Pháp / Vạn Kiếm Quy Tông',
                    desc: 'Bậc thầy điều khiển nguyên tố tự nhiên, triệu hoán sấm sét và kiếm trận quét sạch chiến trường. Lượng sát thương diện rộng (AOE) thuộc hàng khủng nhất game.',
                    atk: '95%', def: '55%', cc: '90%', diff: '70%',
                    img: '/images/tmgt/class-chienphap.jpg'
                },
                {
                    name: 'Pháo Sư',
                    role: 'Xạ Thủ / Tầm Bắn Siêu Xa',
                    desc: 'Vũ khí cơ giới hỏa lực thần công, cự ly tác chiến xa nhất trong các phái. Liên tục dội pháo kích và bẫy nổ khống chế bước tiến của kẻ thù từ khoảng cách an toàn.',
                    atk: '90%', def: '50%', cc: '70%', diff: '70%',
                    img: '/images/tmgt/class-phaosu.jpg'
                },
                {
                    name: 'Triệu Hồi',
                    role: 'Ngự Thú / Hỗ Trợ Toàn Diện',
                    desc: 'Giao cảm cùng linh thú thần thánh, triệu hoán chiến thú trợ chiến và hồi phục sinh lực đồng đội. Đóng vai trò hạt nhân không thể thiếu trong mọi hoạt động Bang hội.',
                    atk: '70%', def: '75%', cc: '85%', diff: '55%',
                    img: '/images/tmgt/class-trieuhoi.jpg'
                },
                {
                    name: 'Linh Kiếm',
                    role: 'Kiếm Thuật / Biến Hóa Khôn Lường',
                    desc: 'Phong thái phiêu diêu, kiếm khí tung hoành Tam Giới. Sở hữu bộ kỹ năng lướt và né tránh siêu việt, chuyển hóa linh hoạt giữa tấn công dồn dập và rút lui an toàn.',
                    atk: '90%', def: '65%', cc: '75%', diff: '80%',
                    img: '/images/tmgt/class-linhkiem.jpg'
                },
                {
                    name: 'Thánh Tăng',
                    role: 'Class Thần Thoại / Mở Khóa Đột Phá',
                    desc: 'Môn phái siêu cấp ẩn giấu, chỉ có thể mở khóa khi nhân vật đạt cảnh giới đột phá tối cao. Dung hợp cả Phật pháp và Thần lực, sở hữu bộ kỹ năng và chỉ số chiến đấu vượt trội.',
                    atk: '100%', def: '95%', cc: '95%', diff: '85%',
                    img: '/images/tmgt/class-thanhtang.jpg'
                }
            ];

            const tabs = document.querySelectorAll('.tmgt-class-tab');
            const nameEl = document.getElementById('className');
            const roleEl = document.getElementById('classRole');
            const descEl = document.getElementById('classDesc');
            const statAtk = document.getElementById('statAtk');
            const statDef = document.getElementById('statDef');
            const statCc = document.getElementById('statCc');
            const statDiff = document.getElementById('statDiff');
            const classImg = document.getElementById('classImg');

            // Preload class images for instantaneous switching
            classData.forEach(function (c) {
                if (c.img) {
                    const img = new Image();
                    img.src = c.img;
                }
            });

            tabs.forEach((tab) => {
                tab.addEventListener('click', function () {
                    tabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    const idx = parseInt(this.getAttribute('data-class'), 10);
                    const d = classData[idx];
                    if (!d) return;

                    if (nameEl) nameEl.textContent = d.name;
                    if (roleEl) roleEl.textContent = d.role;
                    if (descEl) descEl.textContent = d.desc;
                    if (statAtk) statAtk.style.width = d.atk;
                    if (statDef) statDef.style.width = d.def;
                    if (statCc) statCc.style.width = d.cc;
                    if (statDiff) statDiff.style.width = d.diff;

                    if (classImg && d.img) {
                        classImg.classList.add('fade-out');
                        setTimeout(function () {
                            classImg.src = d.img;
                            classImg.alt = d.name + ' — Thần Ma Giáng Thế';
                            classImg.classList.remove('fade-out');
                        }, 120);
                    }
                });
            });

            // === 3. Infinite Loop Features Slider (Mobile) ===
            const featuresWrap = document.getElementById('featuresWrap');
            const featuresGrid = document.getElementById('featuresGrid');
            const featDots = document.querySelectorAll('.tmgt-f-dot');
            const featPrev = document.getElementById('featPrev');
            const featNext = document.getElementById('featNext');

            if (featuresWrap && featuresGrid) {
                const originalCards = Array.from(featuresGrid.children);
                const count = originalCards.length; // 4

                // Tag real index
                originalCards.forEach((c, i) => {
                    c.setAttribute('data-real', i);
                });

                // Create clones: 2 prepended, 2 appended
                const clonePre2 = originalCards[count - 2].cloneNode(true);
                const clonePre1 = originalCards[count - 1].cloneNode(true);
                const clonePost1 = originalCards[0].cloneNode(true);
                const clonePost2 = originalCards[1].cloneNode(true);

                [clonePre2, clonePre1, clonePost1, clonePost2].forEach(c => {
                    c.classList.add('is-clone');
                });
                clonePre2.setAttribute('data-real', count - 2);
                clonePre1.setAttribute('data-real', count - 1);
                clonePost1.setAttribute('data-real', 0);
                clonePost2.setAttribute('data-real', 1);

                featuresGrid.insertBefore(clonePre1, featuresGrid.firstChild);
                featuresGrid.insertBefore(clonePre2, featuresGrid.firstChild);
                featuresGrid.appendChild(clonePost1);
                featuresGrid.appendChild(clonePost2);

                // Track indices:
                // 0: Clone 2
                // 1: Clone 3
                // 2: Real 0  (Initial)
                // 3: Real 1
                // 4: Real 2
                // 5: Real 3
                // 6: Clone 0
                // 7: Clone 1
                let currentTrackIdx = 2;
                let isAnimating = false;
                let autoPlayTimer = null;

                function getCardOffset(idx) {
                    const allCards = featuresGrid.querySelectorAll('.tmgt-feature-card');
                    const card = allCards[idx];
                    if (!card) return 0;
                    const wrapWidth = featuresWrap.clientWidth;
                    const cardWidth = card.offsetWidth;
                    const cardLeft = card.offsetLeft;
                    return (wrapWidth - cardWidth) / 2 - cardLeft;
                }

                function updateCardStates(idx) {
                    const allCards = featuresGrid.querySelectorAll('.tmgt-feature-card');
                    allCards.forEach((c, i) => {
                        c.classList.toggle('active-slide', i === idx);
                    });
                    const realIdx = ((idx - 2) % count + count) % count;
                    featDots.forEach((dot, dIdx) => {
                        dot.classList.toggle('active', dIdx === realIdx);
                    });
                }

                function moveToTrack(idx, animated = true) {
                    if (window.innerWidth > 860) return;
                    currentTrackIdx = idx;
                    const targetX = getCardOffset(currentTrackIdx);
                    if (animated) {
                        isAnimating = true;
                        featuresGrid.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
                    } else {
                        featuresGrid.style.transition = 'none';
                    }
                    featuresGrid.style.transform = `translateX(${targetX}px)`;
                    updateCardStates(currentTrackIdx);
                }

                // Seamless infinite loop reset on transitionend
                featuresGrid.addEventListener('transitionend', function (e) {
                    if (e.target !== featuresGrid) return;
                    isAnimating = false;

                    // If on Clone 0 (track index 6), jump instantly to Real 0 (track index 2)
                    if (currentTrackIdx === count + 2) {
                        currentTrackIdx = 2;
                        featuresGrid.style.transition = 'none';
                        featuresGrid.style.transform = `translateX(${getCardOffset(2)}px)`;
                        updateCardStates(2);
                    }
                    // If on Clone 1 (track index 7), jump instantly to Real 1 (track index 3)
                    else if (currentTrackIdx === count + 3) {
                        currentTrackIdx = 3;
                        featuresGrid.style.transition = 'none';
                        featuresGrid.style.transform = `translateX(${getCardOffset(3)}px)`;
                        updateCardStates(3);
                    }
                    // If on Clone 3 (track index 1), jump instantly to Real 3 (track index 5)
                    else if (currentTrackIdx === 1) {
                        currentTrackIdx = count + 1; // 5
                        featuresGrid.style.transition = 'none';
                        featuresGrid.style.transform = `translateX(${getCardOffset(5)}px)`;
                        updateCardStates(5);
                    }
                    // If on Clone 2 (track index 0), jump instantly to Real 2 (track index 4)
                    else if (currentTrackIdx === 0) {
                        currentTrackIdx = count; // 4
                        featuresGrid.style.transition = 'none';
                        featuresGrid.style.transform = `translateX(${getCardOffset(4)}px)`;
                        updateCardStates(4);
                    }
                });

                function slideNext() {
                    if (isAnimating) return;
                    moveToTrack(currentTrackIdx + 1, true);
                    resetAutoPlay();
                }

                function slidePrev() {
                    if (isAnimating) return;
                    moveToTrack(currentTrackIdx - 1, true);
                    resetAutoPlay();
                }

                if (featNext) featNext.addEventListener('click', slideNext);
                if (featPrev) featPrev.addEventListener('click', slidePrev);

                // Dot click navigation
                featDots.forEach((dot, dIdx) => {
                    dot.addEventListener('click', function (e) {
                        e.stopPropagation();
                        if (isAnimating) return;
                        moveToTrack(dIdx + 2, true);
                        resetAutoPlay();
                    });
                });

                // Click on any card (including peeking cards)
                featuresGrid.addEventListener('click', function (e) {
                    const card = e.target.closest('.tmgt-feature-card');
                    if (!card) return;
                    const allCards = Array.from(featuresGrid.querySelectorAll('.tmgt-feature-card'));
                    const clickedTrackIdx = allCards.indexOf(card);
                    if (clickedTrackIdx !== -1 && clickedTrackIdx !== currentTrackIdx) {
                        moveToTrack(clickedTrackIdx, true);
                        resetAutoPlay();
                    }
                });

                // Touch swipe handling with real-time tracking
                let touchStartX = 0;
                let touchStartY = 0;
                let touchBaseX = 0;
                let isDragging = false;
                let isHorizontal = null;

                featuresWrap.addEventListener('touchstart', function (e) {
                    if (window.innerWidth > 860) return;
                    if (isAnimating) return;
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                    touchBaseX = getCardOffset(currentTrackIdx);
                    isDragging = true;
                    isHorizontal = null;
                    featuresGrid.style.transition = 'none';
                    if (autoPlayTimer) clearInterval(autoPlayTimer);
                }, { passive: true });

                featuresWrap.addEventListener('touchmove', function (e) {
                    if (!isDragging) return;
                    const currentX = e.touches[0].clientX;
                    const currentY = e.touches[0].clientY;
                    const diffX = currentX - touchStartX;
                    const diffY = currentY - touchStartY;

                    if (isHorizontal === null) {
                        isHorizontal = Math.abs(diffX) > Math.abs(diffY);
                    }

                    if (isHorizontal) {
                        featuresGrid.style.transform = `translateX(${touchBaseX + diffX}px)`;
                    }
                }, { passive: true });

                featuresWrap.addEventListener('touchend', function (e) {
                    if (!isDragging) return;
                    isDragging = false;
                    const diffX = e.changedTouches[0].clientX - touchStartX;
                    if (isHorizontal && Math.abs(diffX) > 40) {
                        if (diffX < 0) {
                            moveToTrack(currentTrackIdx + 1, true);
                        } else {
                            moveToTrack(currentTrackIdx - 1, true);
                        }
                    } else {
                        moveToTrack(currentTrackIdx, true);
                    }
                    resetAutoPlay();
                }, { passive: true });

                // Auto-play timer
                function resetAutoPlay() {
                    if (autoPlayTimer) clearInterval(autoPlayTimer);
                    autoPlayTimer = setInterval(function () {
                        if (window.innerWidth <= 860 && !isDragging && !isAnimating) {
                            moveToTrack(currentTrackIdx + 1, true);
                        }
                    }, 4500);
                }

                // Initializer & Resize handler
                function initSlider() {
                    if (window.innerWidth <= 860) {
                        moveToTrack(2, false);
                        resetAutoPlay();
                    } else {
                        if (autoPlayTimer) clearInterval(autoPlayTimer);
                        featuresGrid.style.transform = '';
                        featuresGrid.style.transition = '';
                    }
                }

                window.addEventListener('resize', function () {
                    initSlider();
                });

                // Launch initial state
                initSlider();
            }

            // === 4. Guide Click-to-Center (Mobile) ===
            const guideGrid = document.querySelector('.tmgt-guide-grid');
            const guideCards = document.querySelectorAll('.tmgt-guide-card');
            guideCards.forEach(function (card) {
                card.addEventListener('click', function () {
                    if (!guideGrid) return;
                    const gridWidth = guideGrid.clientWidth;
                    const cardLeft = card.offsetLeft;
                    const cardWidth = card.offsetWidth;
                    const targetScroll = cardLeft - (gridWidth - cardWidth) / 2;
                    guideGrid.scrollTo({
                        left: Math.max(0, targetScroll),
                        behavior: 'smooth'
                    });
                });
            });
        })();
