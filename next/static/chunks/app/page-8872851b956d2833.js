(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [974], {
        18945: (e, s, a) => {
            "use strict";
            a.d(s, {
                A: () => n
            });
            var i = a(95155),
                t = a(6874),
                l = a.n(t);
            let n = e => {
                let { title: s, isHidden: a, href: t } = e;
                return (0,
                    i.jsxs)("div", {
                        className: "d-flex justify-content-between align-items-center mb-3 text-white",
                        children: [(0,
                            i.jsx)("h3", {
                                className: "text-title",
                                children: s
                            }), !a && (0,
                                i.jsxs)(l(), {
                                    href: t,
                                    className: "d-flex align-items-center gap-2",
                                    style: {
                                        color: "#6C727F"
                                    },
                                    children: []
                                })]
                    })
            }
        },
        27430: (e, s, a) => {
            "use strict";
            a.d(s, {
                A: () => r
            });
            var i = a(95155),
                t = a(27677),
                l = a(67269),
                n = a(6874),
                c = a.n(n);
            const data = {
                data: [
                    { image: '/images/tmgt/tmgt-banner-mobile.jpg', link: 'https://new.yxtgym.com/y92.0l110/EdIf1XkalZCqknYO0sCRwA/Icch.html' },
                    { image: './images/psm/psm-banner-mobile.jpg', link: 'https://t.skeideng.com/oRZS82.html' }
                ],
                note: false // Hoặc true nếu muốn style khác cho pagination
            };
            let r = () => {
                let { data: s, note: a } = data;
                return (0,
                    i.jsx)("section", {
                        className: "wrapper-slider",
                        children: (0,
                            i.jsx)(t.RC, {
                                autoplay: {
                                    delay: 1e20,
                                    disableOnInteraction: !1,
                                    pauseOnMouseEnter: !0
                                },
                                loop: !0,
                                keyboard: !0,
                                rewind: !0,
                                noSwiping: !0,
                                pagination: {
                                    clickable: !0,
                                    renderBullet: function (data, s) {
                                        return a ? '<span class="'.concat(s, ' custom-pagination-detailsGame"></span>') : '<span class="'.concat(s, ' custom-pagination-item"></span>')
                                    }
                                },
                                slidesPerView: 1,
                                modules: [l.Ij, l.dK],
                                children: s.map((item, index) =>
                                    (0, i.jsx)(t.qr, {
                                        children: (0, i.jsx)(c(), {
                                            href: item.link || "#",
                                            target: "_blank",
                                            className: "item-banner",
                                            children: (0, i.jsx)("img", {
                                                className: "object-fit-cover h-100 w-100",
                                                src: item.image || "",
                                                alt: ""
                                            })
                                        })
                                    }, index)
                                )

                            })
                    })
            };
        },
        47925: (e, s, a) => {
            "use strict";
            a.d(s, {
                default: () => N
            });
            var i = a(95155),
                t = a(57383),
                l = a(12115),
                n = a(76188),
                c = a(27677),
                r = a(67269),
                d = a(35695),
                o = a(96834),
                m = a(27430),
                h = a(18945),
                p = a(53180),
                x = a(6874),
                j = a.n(x);
            let u = (0,
                l.memo)(e => {
                    let { data: s } = e;
                    return (0,
                        i.jsx)("a", {
                            className: "promo_item",
                            href: s.targetUrl,
                            target: s.targetType,
                            children: (0,
                                i.jsx)("img", {
                                    src: s.imageUrl,
                                    alt: s.name
                                })
                        })
                });
            var g = a(40364),
                v = a(66766);

            // Fanpage ID mapping
            const dataIDFanpage = {
                tmgt: "lamongame",
                tbtt: "gametanbinhthuctinh",
                psm: "gamephusinhmong",
                ik: "lamongame",
                es: "lamongame",
                tyhm: "tranyeuhangma"
            };

            const dataGame = [
                {
                    id: 5,
                    name: "Trấn Yêu Hàng Ma",
                    logoImage: "./images/tyhm/tyhm-logo.jpg",
                    type: 4,
                    gameType: { name: "game mới ra" },
                    href: "https://p.googlelik.com/?p=Jje6Fj",
                    gameKey: "tyhm"
                },
                {
                    id: 1,
                    name: "Thần Ma Giáng Thế",
                    logoImage: "./images/tmgt/tmgt-logo.png",
                    type: 1,
                    gameType: { name: "game hot" },
                    href: "https://new.yxtgym.com/y92.0l110/EdIf1XkalZCqknYO0sCRwA/Icch.html",
                    gameKey: "tmgt"
                },
                {
                    id: 2,
                    name: "Tân Binh Thức Tỉnh",
                    logoImage: "./images/tbtt/tbtt-logo.jpg",
                    type: 2,
                    gameType: { name: "game hot" },
                    href: "https://t.skeideng.com/MHoxs.html",
                    gameKey: "tbtt"
                },
                {
                    id: 3,
                    name: "Phù Sinh Mộng",
                    logoImage: "./images/psm/psm-logo.jpg",
                    type: 2,
                    gameType: { name: "Game hot" },
                    href: "https://t.skeideng.com/oRZS82.html",
                    gameKey: "psm"
                },
                {
                    id: 4,
                    name: "Infinity Kingdom",
                    logoImage: "./images/ik/ik-logo.png",
                    type: 3,
                    gameType: { name: "game hot" },
                    href: "https://yzdpik.onelink.me/Llhn?af_xp=social&pid=IK-CPS&c=IFK-CPS-13902&af_dp=yzdpik%3A%2F%2F",
                    gameKey: "ik"
                },
                {
                    id: 5,
                    name: "Ethereal Slayer",
                    logoImage: "./images/es/es-logo.jpg",
                    type: 4,
                    gameType: { name: "game hot" },
                    href: "https://app.adjust.com/1sokpzx5",
                    gameKey: "es"
                }
            ];

            const dataGiftcode = [
                {
                    id: 6,
                    name: "Trấn Yêu Hàng Ma",
                    image: "./images/tyhm/tyhm-logo.jpg",
                    totalGiftcode: 10000,
                    totalReceived: 2352,
                    type: 4,
                    text: "Mình muốn nhận code game Trấn Yêu Hàng Ma",
                    value: "Nhận code",
                    gameKey: "tyhm"
                },
                {
                    id: 1,
                    name: "Thần Ma Giáng Thế",
                    image: "./images/tmgt/tmgt-logo.png",
                    totalGiftcode: 50000,
                    totalReceived: 47322,
                    type: 1,
                    text: "Mình muốn nhận code game Thần Ma Giáng Thế",
                    value: "Nhận code",
                    gameKey: "tmgt"
                },
                {
                    id: 2,
                    name: "Tân Binh Thức Tỉnh",
                    image: "./images/tbtt/tbtt-logo.jpg",
                    totalGiftcode: 10000,
                    totalReceived: 6274,
                    type: 2,
                    text: "Mình muốn nhận code game Tân Binh Thức Tỉnh",
                    value: "Nhận code",
                    gameKey: "tbtt"
                },
                {
                    id: 3,
                    name: "Phù Sinh Mộng",
                    image: "./images/psm/psm-logo.jpg",
                    totalGiftcode: 10000,
                    totalReceived: 9254,
                    type: 2,
                    text: "Mình muốn nhận code game Phù Sinh Mộng",
                    value: "Nhận code",
                    gameKey: "psm"
                },
                {
                    id: 4,
                    name: "Infinity Kingdom",
                    image: "./images/ik/ik-logo.png",
                    totalGiftcode: 20000,
                    totalReceived: 15321,
                    type: 3,
                    text: "Mình muốn nhận code game Infinity Kingdom",
                    value: "Nhận code",
                    gameKey: "ik"
                },
                {
                    id: 5,
                    name: "Ethereal Slayer",
                    image: "./images/es/es-logo.jpg",
                    totalGiftcode: 20000,
                    totalReceived: 10734,
                    type: 4,
                    text: "Mình muốn nhận code game Ethereal Slayer",
                    value: "Nhận code",
                    gameKey: "es"
                }
            ];

            const dataWelfare = [
                {
                    id: 1,
                    title: "Hỗ trợ nạp x4",
                    image: "./images/welfare/ho-tro-nap-x4.png",
                    href: "https://www.facebook.com/share/p/16XdXvQTcm/"
                },
                {
                    id: 2,
                    title: "Người cũ quay về",
                    image: "./images/welfare/nguoi-cu-quay-ve.png",
                    href: "https://www.facebook.com/share/p/18Cjx6PyqD/"
                }
            ];

            const dataNews = [
                {
                    id: 5,
                    name: "Trấn Yêu Hàng Ma",
                    title: "Trấn Yêu Hàng Ma - Open Server 1 lúc: **13:00 ngày 11-05-2026**.",
                    image: "./images/tyhm/tyhm-banner.jpg",
                    tag: [
                        { id: "tag4", name: "Cập nhật: 10-05-2026" }
                    ],
                    href: "https://p.googlelik.com/?p=Jje6Fj",
                    gameKey: "tyhm"
                },
                {
                    id: 1,
                    name: "Thần Ma Giáng Thế",
                    title: "Thần Ma Giáng Thế - Khai mở server lúc 13:00 Thứ 3-5-7 hàng tuần",
                    image: "./images/tmgt/tmgt-banner1.png",
                    tag: [
                        { id: "tag1", name: "Cập nhật: 10-05-2026" }
                    ],
                    href: "https://new.yxtgym.com/y92.0l110/EdIf1XkalZCqknYO0sCRwA/Icch.html",
                    gameKey: "tmgt"
                },
                {
                    id: 2,
                    name: "Tân Binh Thức Tỉnh",
                    title: "Tân Binh Thức Tỉnh - Khai mở server vào lúc 00:15' thứ 4 hàng tuần",
                    image: "./images/tbtt/tbtt-banner.jpg",
                    tag: [
                        { id: "tag2", name: "Cập nhật: 10-03-2026" }
                    ],
                    href: "https://t.skeideng.com/oRZS82.html",
                    gameKey: "tbtt"
                },
                {
                    id: 3,
                    name: "Phù Sinh Mộng",
                    title: "Phù Sinh Mộng - Khai mở server lúc 13:00 Thứ 3-6 hàng tuần",
                    image: "./images/psm/psm-banner.jpg",
                    tag: [
                        { id: "tag2", name: "Cập nhật: 10-05-2026" }
                    ],
                    href: "https://t.skeideng.com/oRZS82.html",
                    gameKey: "psm"
                },
                {
                    id: 4,
                    name: "Infinity Kingdom",
                    title: "Infinity Kingdom - is a real-time strategy game based in a land of magic and alchemy.",
                    image: "./images/ik/ik-banner.png",
                    tag: [
                        { id: "tag3", name: "Cập nhật: 15-09-2025" }
                    ],
                    href: "https://yzdpik.onelink.me/Llhn?af_xp=social&pid=IK-CPS&c=IFK-CPS-13902&af_dp=yzdpik%3A%2F%2F",
                    gameKey: "ik"
                },
                {
                    id: 5,
                    name: "Ethereal Slayer",
                    title: "Ethereal Slayer - A Xianxia-inspired 3D MMORPG with real-time aerial combat, 100+ skills, and epic realms to explore.",
                    image: "./images/es/es-banner.jpg",
                    tag: [
                        { id: "tag4", name: "Cập nhật: 15-09-2025" }
                    ],
                    href: "https://app.adjust.com/1sokpzx5",
                    gameKey: "es"
                }
            ];

            const dataMenu = [{
                id: 1,
                name: "Hỗ trợ",
                link: "https://www.facebook.com/lamongame"
            },]

            // Show a popup listing available games to receive giftcode
            function showGiftcodePopup() {
                try {
                    const list = Array.isArray(dataGiftcode) ? dataGiftcode : [];
                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;background:rgba(0,0,0,0.82);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;box-sizing:border-box;overflow-y:auto;';

                    const inner = document.createElement('div');
                    inner.style.cssText = 'background:linear-gradient(180deg,#1f1f1f 0%,#171717 100%);padding:18px 18px 20px;border:1px solid rgba(255,255,255,0.08);border-radius:18px;max-width:980px;width:100%;color:#fff;max-height:calc(100vh - 40px);overflow:auto;box-shadow:0 20px 45px rgba(0,0,0,0.55);margin:auto;';

                    const title = document.createElement('h3');
                    title.textContent = 'Chọn game nhận Giftcode';
                    title.style.cssText = 'margin:0 0 6px;font-size:20px;font-weight:700;color:#fff;text-align:center;letter-spacing:0.2px;';
                    inner.appendChild(title);

                    const container = document.createElement('div');
                    container.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;align-items:stretch;width:100%;';

                    list.forEach(g => {
                        const row = document.createElement('div');
                        row.style.cssText = 'display:flex;align-items:center;justify-content:flex-start;text-align:left;gap:12px;background:linear-gradient(180deg,#161616 0%,#111 100%);padding:12px;border:1px solid rgba(255,255,255,0.06);border-radius:12px;min-width:0;width:100%;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.02);';

                        const img = document.createElement('img');
                        img.src = g.image || 'https://via.placeholder.com/64';
                        img.alt = g.name || '';
                        img.style.cssText = 'width:62px;height:62px;object-fit:cover;border-radius:10px;flex:0 0 62px;border:1px solid rgba(255,255,255,0.08);background:#0f0f0f;';

                        const info = document.createElement('div');
                        info.style.cssText = 'flex:1;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;min-width:0;';

                        const nameEl = document.createElement('div');
                        nameEl.textContent = g.name || '';
                        nameEl.style.cssText = 'font-weight:700;font-size:14px;margin-bottom:6px;color:#fff;line-height:1.2;text-align:center;width:100%;';

                        const btnWrap = document.createElement('div');
                        btnWrap.style.cssText = 'display:flex;justify-content:center;align-items:center;width:100%;';

                        const page = dataIDFanpage[g.gameKey] || '';
                        const msg = g.text || `Mình muốn nhận code game ${g.name || ''}`;
                        const link = document.createElement('a');
                        link.href = `https://m.me/${page}?text=${encodeURIComponent(msg)}`;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.setAttribute('data-track', `giftcode-popup-${g.gameKey || 'game'}`);
                        link.textContent = `🎁 Nhận code ${g.name || ''}`;
                        link.style.cssText = 'background:linear-gradient(135deg,#00a2ff 0%,#0078ff 100%);color:#fff;padding:8px 12px;border-radius:999px;text-decoration:none;display:inline-block;font-size:13px;font-weight:600;box-shadow:0 8px 16px rgba(0, 120, 255, 0.25);';

                        btnWrap.appendChild(link);
                        info.appendChild(nameEl);
                        info.appendChild(btnWrap);

                        row.appendChild(img);
                        row.appendChild(info);
                        container.appendChild(row);
                    });

                    inner.appendChild(container);

                    const footer = document.createElement('div');
                    footer.style.cssText = 'display:flex;justify-content:flex-end;margin-top:14px;';
                    const closeBtn = document.createElement('button');
                    closeBtn.id = 'giftcodeCloseBtn';
                    closeBtn.setAttribute('data-track', 'giftcode-popup-close');
                    closeBtn.textContent = 'Đóng';
                    closeBtn.style.cssText = 'background:#2a2a2a;color:#fff;border:1px solid rgba(255,255,255,0.08);padding:8px 12px;border-radius:999px;cursor:pointer;font-weight:600;';
                    footer.appendChild(closeBtn);
                    inner.appendChild(footer);

                    overlay.appendChild(inner);

                    overlay.addEventListener('click', function (e) {
                        if (e.target === overlay) {
                            document.body.removeChild(overlay);
                        }
                    });

                    closeBtn.addEventListener('click', function () {
                        if (overlay.parentNode) document.body.removeChild(overlay);
                    });

                    document.body.appendChild(overlay);
                } catch (err) {
                    console.error('showGiftcodePopup error', err);
                }
            }

            // Show a popup listing available games to request support
            function showSupportPopup() {
                try {
                    const list = Array.isArray(dataGiftcode) ? dataGiftcode : [];
                    const overlay = document.createElement('div');
                    overlay.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;background:rgba(0,0,0,0.82);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;box-sizing:border-box;overflow-y:auto;';

                    const inner = document.createElement('div');
                    inner.style.cssText = 'background:linear-gradient(180deg,#1f1f1f 0%,#171717 100%);padding:18px 18px 20px;border:1px solid rgba(255,255,255,0.08);border-radius:18px;max-width:980px;width:100%;color:#fff;max-height:calc(100vh - 40px);overflow:auto;box-shadow:0 20px 45px rgba(0,0,0,0.55);margin:auto;';

                    const title = document.createElement('h3');
                    title.textContent = 'Chọn game cần hỗ trợ';
                    title.style.cssText = 'margin:0 0 6px;font-size:20px;font-weight:700;color:#fff;text-align:center;letter-spacing:0.2px;';
                    inner.appendChild(title);

                    const container = document.createElement('div');
                    container.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px;align-items:stretch;width:100%;';

                    list.forEach(g => {
                        const row = document.createElement('div');
                        row.style.cssText = 'display:flex;align-items:center;justify-content:flex-start;text-align:left;gap:12px;background:linear-gradient(180deg,#161616 0%,#111 100%);padding:12px;border:1px solid rgba(255,255,255,0.06);border-radius:12px;min-width:0;width:100%;box-shadow:inset 0 0 0 1px rgba(255,255,255,0.02);';

                        const img = document.createElement('img');
                        img.src = g.image || 'https://via.placeholder.com/64';
                        img.alt = g.name || '';
                        img.style.cssText = 'width:62px;height:62px;object-fit:cover;border-radius:10px;flex:0 0 62px;border:1px solid rgba(255,255,255,0.08);background:#0f0f0f;';

                        const info = document.createElement('div');
                        info.style.cssText = 'flex:1;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;text-align:left;min-width:0;';

                        const nameEl = document.createElement('div');
                        nameEl.textContent = g.name || '';
                        nameEl.style.cssText = 'font-weight:700;font-size:14px;margin-bottom:6px;color:#fff;line-height:1.2;text-align:center;width:100%;';

                        const btnWrap = document.createElement('div');
                        btnWrap.style.cssText = 'display:flex;justify-content:center;align-items:center;width:100%;';

                        const page = dataIDFanpage[g.gameKey] || '';
                        const msg = `Mình cần hỗ trợ game ${g.name || ''}`;
                        const link = document.createElement('a');
                        link.href = `https://m.me/${page}?text=${encodeURIComponent(msg)}`;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        link.setAttribute('data-track', `support-popup-${g.gameKey || 'game'}`);
                        link.textContent = `💬 Hỗ trợ ${g.name || ''}`;
                        link.style.cssText = 'background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#fff;padding:8px 12px;border-radius:999px;text-decoration:none;display:inline-block;font-size:13px;font-weight:600;box-shadow:0 8px 16px rgba(16, 185, 129, 0.25);';

                        btnWrap.appendChild(link);
                        info.appendChild(nameEl);
                        info.appendChild(btnWrap);

                        row.appendChild(img);
                        row.appendChild(info);
                        container.appendChild(row);
                    });

                    inner.appendChild(container);

                    const footer = document.createElement('div');
                    footer.style.cssText = 'display:flex;justify-content:flex-end;margin-top:14px;';
                    const closeBtn = document.createElement('button');
                    closeBtn.id = 'supportCloseBtn';
                    closeBtn.setAttribute('data-track', 'support-popup-close');
                    closeBtn.textContent = 'Đóng';
                    closeBtn.style.cssText = 'background:#2a2a2a;color:#fff;border:1px solid rgba(255,255,255,0.08);padding:8px 12px;border-radius:999px;cursor:pointer;font-weight:600;';
                    footer.appendChild(closeBtn);
                    inner.appendChild(footer);

                    overlay.appendChild(inner);

                    overlay.addEventListener('click', function (e) {
                        if (e.target === overlay) {
                            document.body.removeChild(overlay);
                        }
                    });

                    closeBtn.addEventListener('click', function () {
                        if (overlay.parentNode) document.body.removeChild(overlay);
                    });

                    document.body.appendChild(overlay);
                } catch (err) {
                    console.error('showSupportPopup error', err);
                }
            }

            let N = () => {
                let e = (0,
                    n.A)(),
                    s = (0,
                        d.useRouter)();
                e.user,
                    (0,
                        d.usePathname)();
                let [a, x] = (0,
                    l.useState)([]), [N, f] = (0,
                        l.useState)([]), [w, b] = (0,
                            l.useState)(!1), [y, k] = (0,
                                l.useState)(99), [A, I] = (0,
                                    l.useState)(window.innerWidth), [C, H] = (0,
                                        l.useState)([]), [_, S] = (0,
                                            l.useState)([]), [T, E] = (0,
                                                l.useState)([]), [G, P] = (0,
                                                    l.useState)([]), [M, O] = (0,
                                                        l.useState)([]), { isPlayVideo: U, setLoading: q, handle: { onPlayVideo: R, onPauseVideo: V }, activeIdVideo: B } = e, F = e => {
                                                            e && s.push(e)
                                                        }, K = async () => {
                                                            let e = (await (0,
                                                                o.zz)()).find(e => "HOME" === e.pagePosition);
                                                            if (e && e.listImageItem.length > 0) {
                                                                if (t.A.get("popupHomeHistory"))
                                                                    return void O([]);
                                                                //O(e.listImageItem),
                                                                (0,
                                                                    g.QH)("popupHomeHistory", "show")
                                                            }
                                                        };
                return (0,
                    l.useEffect)(() => {
                        q(!0);
                        let e = t.A.get("game_token");
                        return (0,
                            o.Zi)().then(e => (q(!1),
                                x(null == e ? void 0 : e.sort((e, s) => e.sort < s.sort ? -1 : +(e.sort < s.sort))))),
                            (0,
                                o.$p)().then(e => f(e)),
                            (0,
                                o.Yg)().then(e => H(e)),
                            K(),
                            (0,
                                o.qG)({
                                    accessToken: e
                                }).then(e => S(e)),
                            (0,
                                o.KP)().then(e => P(null == e ? void 0 : e.data)),
                            (0,
                                o.yF)(1, 4).then(e => E(null == e ? void 0 : e.data)),
                            () => {
                                V()
                            }
                    }, []),
                    (0,
                        l.useEffect)(() => {
                            A < 500 ? !0 == w ? k(99) : k(6) : A >= 500 && A < 700 ? !0 == w ? k(99) : k(8) : !0 == w ? k(99) : k(10)
                        }, [A, w]),
                    (0,
                        l.useEffect)(() => {
                            let e = document.body;
                            M.length > 0 ? e.classList.add("not-scroll") : e.classList.remove("not-scroll")
                        }, [M]),
                    (0,
                        i.jsxs)(i.Fragment, {
                            children: [(0,
                                i.jsx)(m.A, {
                                    data: a
                                }), (0,
                                    i.jsxs)("div", {
                                        className: "home_menu",
                                        children: [(0,
                                            i.jsxs)(j(), {
                                                href: "#",
                                                onClick: function (e) {
                                                    e.preventDefault();
                                                    try { showSupportPopup(); } catch (err) { console.error(err); }
                                                },
                                                className: "item",
                                                "data-track": "home-support",
                                                children: [(0,
                                                    i.jsx)(p.VA, {}), " ", (0,
                                                        i.jsx)("span", {
                                                            children: "Hỗ trợ"
                                                        })]
                                            }), (0,
                                                i.jsxs)(j(), {
                                                    href: "#",
                                                    onClick: function () {
                                                        try { showGiftcodePopup(); } catch (err) { console.error(err); }
                                                    },
                                                    className: "item",
                                                    "data-track": "home-giftcode",
                                                    children: [(0,
                                                        i.jsx)(p.ok, {}), " ", (0,
                                                            i.jsx)("span", {
                                                                children: "Giftcode"
                                                            })]
                                                })]
                                    }), (0,
                                        i.jsxs)("div", {
                                            className: "d-flex flex-column gap-5 mt-5",
                                            style: {
                                                margin: "0 12px"
                                            },
                                            children: [(0,
                                                i.jsxs)("div", {
                                                    children: [(0,
                                                        i.jsx)(h.A, {
                                                            title: "GAME ĐỀ XUẤT",
                                                            isHidden: !1,
                                                            href: "/games"
                                                        }), (0, i.jsx)("div", {
                                                            className: "product_list",
                                                            children: dataGame.map((e, s) =>
                                                                (0, i.jsxs)("div", {
                                                                    className: "item ".concat(s >= y ? "d-none" : ""),
                                                                    "data-track": `game-item-${e.gameKey}`,
                                                                    onClick: () => {
                                                                        const page = dataIDFanpage[e.gameKey]; // 👉 lấy username hoặc ID fanpage từ mapping
                                                                        const msg = `Mình muốn nhận code game ${e.name}`;
                                                                        const messengerUrl = `https://m.me/${page}?text=${encodeURIComponent(msg)}`;
                                                                        const download = e.href || (e.type === 3 ? `/play/${e.id}` : `/games/${e.id}`);

                                                                        // 🔹 Tạo popup hỏi người dùng
                                                                        const overlay = document.createElement("div");
                                                                        overlay.innerHTML = `
                                                                            <div style="
                                                                                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                                                                                background: rgba(0,0,0,0.75); color: white;
                                                                                display: flex; align-items: center; justify-content: center;
                                                                                z-index: 9999; font-family: sans-serif;
                                                                            ">
                                                                                <div style="
                                                                                background: #222; padding: 20px 25px; border-radius: 12px;
                                                                                max-width: 90%; text-align: center; box-shadow: 0 0 15px rgba(0,0,0,0.5);
                                                                                ">
                                                                                <h3 style="margin-bottom: 15px; font-size: 18px;">Nhận code tại đây</h3>
                                                                                <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                                                                                    <button id="btnGetCode" data-track="popup-get-code-${e.gameKey}" style="
                                                                                    background: #0099ff; color: white; border: none; padding: 10px 18px;
                                                                                    border-radius: 8px; cursor: pointer; font-size: 16px;
                                                                                    ">
                                                                                    🎁 Nhận code
                                                                                    </button>
                                                                                    <button id="btnDownload" data-track="popup-download-${e.gameKey}" style="
                                                                                    background: #444; color: white; border: none; padding: 10px 18px;
                                                                                    border-radius: 8px; cursor: pointer; font-size: 16px;
                                                                                    ">
                                                                                    ⬇️ Tiếp tục tải game
                                                                                    </button>
                                                                                </div>
                                                                                </div>
                                                                            </div>
                                                                            `;
                                                                        document.body.appendChild(overlay);

                                                                        // 👉 Lấy button
                                                                        const btnGetCode = overlay.querySelector("#btnGetCode");
                                                                        const btnDownload = overlay.querySelector("#btnDownload");

                                                                        // 🔹 Nhận code trước
                                                                        btnGetCode.addEventListener("click", () => {
                                                                            window.location.href = messengerUrl;
                                                                            document.body.removeChild(overlay);
                                                                        });

                                                                        // 🔹 Tiếp tục tải game
                                                                        btnDownload.addEventListener("click", () => {
                                                                            window.location.href = download;
                                                                            document.body.removeChild(overlay);
                                                                        });

                                                                        // 🔹 Click ngoài popup để đóng
                                                                        overlay.addEventListener("click", (event) => {
                                                                            if (event.target === overlay) document.body.removeChild(overlay);
                                                                        });
                                                                    },

                                                                    children: [
                                                                        (0, i.jsx)("div", {
                                                                            className: "img",
                                                                            children: (0, i.jsx)("img", {
                                                                                src: e.logoImage || "/images/imgGift.png",
                                                                                alt: e.name || ""
                                                                            })
                                                                        }),
                                                                        (0, i.jsxs)("div", {
                                                                            className: "desc",
                                                                            children: [
                                                                                (0, i.jsx)("h3", {
                                                                                    className: "text-cover title-product ",
                                                                                    children: e.name
                                                                                }),
                                                                                (0, i.jsx)("p", { children: e.gameType?.name || "" })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }, s)
                                                            )
                                                        })
                                                        , (0,
                                                            i.jsxs)("div", {
                                                                className: "view_more",
                                                                children: [(0,
                                                                    i.jsx)("span", {
                                                                        className: "left"
                                                                    }), !1 == w && (0,
                                                                        i.jsxs)("span", {
                                                                            className: "center",
                                                                            onClick: () => b(!0),
                                                                            children: ["Xem th\xeam ", (0,
                                                                                i.jsx)(p.k5, {})]
                                                                        }), !0 == w && (0,
                                                                            i.jsxs)("span", {
                                                                                className: "center",
                                                                                onClick: () => b(!1),
                                                                                children: ["Thu gọn ", (0,
                                                                                    i.jsx)(p.Hd, {})]
                                                                            }), (0,
                                                                                i.jsx)("span", {
                                                                                    className: "right"
                                                                                })]
                                                            })
                                                    ]
                                                }),
                                            // (0, i.jsxs)("div", {
                                            //     className: "welfare",
                                            //     children: [
                                            //         (0, i.jsxs)("div", {
                                            //             className: "d-flex justify-content-between align-items-center mb-3 text-white",
                                            //             children: [
                                            //                 (0, i.jsx)("h3", {
                                            //                     className: "text-title",
                                            //                     children: "KHUYẾN MÃI"
                                            //                 })
                                            //             ]
                                            //         }),
                                            //         (0, i.jsx)("div", {
                                            //             className: "list-product-info",
                                            //             children: (0, i.jsx)(c.RC, { // RC = Swiper
                                            //                 spaceBetween: 24,
                                            //                 slidesPerView: "auto",
                                            //                 freeMode: !0,
                                            //                 keyboard: !0,
                                            //                 noSwiping: !0,
                                            //                 children: dataWelfare.map((e) =>
                                            //                     (0, i.jsx)(c.qr, { // qr = SwiperSlide
                                            //                         children: (0, i.jsx)("a", {
                                            //                             className: "promo_item",
                                            //                             href: e.href,
                                            //                             target: "_blank",
                                            //                             children: (0, i.jsx)("img", {
                                            //                                 src: e.image,
                                            //                                 alt: e.title,
                                            //                                 style: {
                                            //                                     maxWidth: "505px",
                                            //                                     maxHeight: "266px",
                                            //                                     objectFit: "cover",
                                            //                                     borderRadius: "8px"
                                            //                                 }
                                            //                             })
                                            //                         })
                                            //                     }, e.id)
                                            //                 )
                                            //             })
                                            //         })
                                            //     ]
                                            // }),

                                            (0, i.jsxs)("div", {
                                                className: "giftcode_list",
                                                children: [
                                                    // Header
                                                    (0, i.jsxs)("div", {
                                                        className: "d-flex justify-content-between align-items-center mb-3 text-white",
                                                        children: [
                                                            (0, i.jsx)("h3", {
                                                                className: "text-title",
                                                                children: "GIFTCODE"
                                                            }),
                                                        ]
                                                    }),

                                                    // List Giftcode
                                                    (0, i.jsx)("div", {
                                                        className: "row",
                                                        children: dataGiftcode.map((e, s) =>
                                                            (0, i.jsx)("div", {
                                                                className: "col-12 col-sm-6",
                                                                children: (0, i.jsxs)("a", {
                                                                    className: "item d-flex",
                                                                    href: `https://m.me/${dataIDFanpage[e.gameKey]}?text=${encodeURIComponent(e.text)}`,
                                                                    target: "_blank",
                                                                    rel: "noopener noreferrer",
                                                                    style: { textDecoration: "none", color: "inherit" },
                                                                    children: [
                                                                        (0, i.jsx)("div", {
                                                                            className: "img",
                                                                            children: (0, i.jsx)("img", {
                                                                                src: e.image || "https://via.placeholder.com/80x80",
                                                                                alt: e.name || "giftcode image"
                                                                            })
                                                                        }),
                                                                        (0, i.jsxs)("div", {
                                                                            className: "detail",
                                                                            children: [
                                                                                (0, i.jsx)("h2", { children: e.name }),
                                                                                (0, i.jsx)("p", { children: `Giftcode: ${e.totalGiftcode || 0}` }),
                                                                                (0, i.jsx)("p", { children: `Người nhận: ${e.totalReceived || 0}` }),
                                                                                (0, i.jsx)("span", {
                                                                                    className: "btn",
                                                                                    "data-track": `giftcode-${e.gameKey}`,
                                                                                    children: `${e.value}`
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                })
                                                            }, s)
                                                        )
                                                    })
                                                ]
                                            }),

                                            (0, i.jsxs)("div", {
                                                className: "news-in-home",
                                                children: [
                                                    (0, i.jsx)(h.A, {
                                                        title: "TIN TỨC",
                                                        href: "",
                                                        isHidden: !1
                                                    }),
                                                    (0, i.jsx)("div", {
                                                        className: "row",
                                                        children: dataNews.map(news =>
                                                            (0, i.jsx)("div", {
                                                                className: "col-sm-6 mb-3",
                                                                style: { cursor: "pointer" },
                                                                onClick: () => {
                                                                    const page = dataIDFanpage[news.gameKey]; // 👉 lấy username hoặc ID fanpage từ mapping
                                                                    const msg = `Mình muốn nhận code game ${news.name}`;
                                                                    const messengerUrl = `https://m.me/${page}?text=${encodeURIComponent(msg)}`;

                                                                    // 🔹 Tạo popup hỏi người dùng
                                                                    const overlay = document.createElement("div");
                                                                    overlay.innerHTML = `
                                                                        <div style="
                                                                            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                                                                            background: rgba(0,0,0,0.75); color: white;
                                                                            display: flex; align-items: center; justify-content: center;
                                                                            z-index: 9999; font-family: sans-serif;
                                                                        ">
                                                                            <div style="
                                                                            background: #222; padding: 20px 25px; border-radius: 12px;
                                                                            max-width: 90%; text-align: center; box-shadow: 0 0 15px rgba(0,0,0,0.5);
                                                                            ">
                                                                            <h3 style="margin-bottom: 15px; font-size: 18px;">Bạn có muốn nhận code trước khi xem bài viết không?</h3>
                                                                            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                                                                                <button id="btnGetCode" data-track="popup-get-code-${news.gameKey}" style="
                                                                                background: #0099ff; color: white; border: none; padding: 10px 18px;
                                                                                border-radius: 8px; cursor: pointer; font-size: 16px;
                                                                                ">
                                                                                🎁 Nhận code trước
                                                                                </button>
                                                                                <button id="btnContinue" data-track="popup-continue-${news.gameKey}" style="
                                                                                background: #444; color: white; border: none; padding: 10px 18px;
                                                                                border-radius: 8px; cursor: pointer; font-size: 16px;
                                                                                ">
                                                                                📖 Tiếp tục xem bài viết
                                                                                </button>
                                                                            </div>
                                                                            </div>
                                                                        </div>
                                                                        `;
                                                                    document.body.appendChild(overlay);

                                                                    // 👉 Lấy button
                                                                    const btnGetCode = overlay.querySelector("#btnGetCode");
                                                                    const btnContinue = overlay.querySelector("#btnContinue");

                                                                    // 🔹 Nhận code trước (mở Messenger trong cùng tab)
                                                                    btnGetCode.addEventListener("click", () => {
                                                                        document.body.removeChild(overlay);
                                                                        window.location.href = messengerUrl; // 👉 mở Messenger ngay trên tab hiện tại
                                                                    });

                                                                    // 🔹 Tiếp tục xem bài viết
                                                                    btnContinue.addEventListener("click", () => {
                                                                        F(news.href); // 👉 gọi router điều hướng sang bài viết
                                                                        document.body.removeChild(overlay);
                                                                    });

                                                                    // 🔹 Click ngoài popup để đóng
                                                                    overlay.addEventListener("click", (event) => {
                                                                        if (event.target === overlay) document.body.removeChild(overlay);
                                                                    });
                                                                },

                                                                children: (0, i.jsxs)("div", {
                                                                    className: "news-item overflow-hidden",
                                                                    children: [
                                                                        (0, i.jsx)("div", {
                                                                            className: "news-item-image",
                                                                            children: (0, i.jsx)("img", {
                                                                                src: news.image,
                                                                                alt: news.title,
                                                                                loading: "lazy"
                                                                            })
                                                                        }),
                                                                        (0, i.jsxs)("div", {
                                                                            className: "news-item-content",
                                                                            children: [
                                                                                (0, i.jsx)("p", {
                                                                                    className: "news-item-title text-cover",
                                                                                    children: news.title
                                                                                }),
                                                                                (0, i.jsx)("div", {
                                                                                    className: "d-flex gap-2 flex-wrap mt-2",
                                                                                    children: (news.tag || []).map(tag =>
                                                                                        (0, i.jsx)("span", {
                                                                                            className: "news-item-info",
                                                                                            children: tag.name
                                                                                        }, tag.id)
                                                                                    )
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                })
                                                            }, "news" + news.id)
                                                        )
                                                    }),


                                                ]
                                            })
                                            ]
                                        }), M.length > 0 && (0,
                                            i.jsx)("div", {
                                                className: "popup-slider-container",
                                                onClick: () => {
                                                    O([])
                                                },
                                                children: (0,
                                                    i.jsx)
                                            })]

                        })

            }
        },
        61485: (e, s, a) => {
            Promise.resolve().then(a.bind(a, 47925))
        }
    },
    e => {
        var s = s => e(e.s = s);
        e.O(0, [586, 942, 540, 677, 269, 212, 834, 8, 180, 441, 684, 358], () => s(61485)),
            _N_E = e.O()
    }
]);