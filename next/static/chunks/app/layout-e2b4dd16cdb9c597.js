(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [177], {
        1749: () => {},
        2252: () => {},
        5542: e => {
            e.exports = {
                style: {
                    fontFamily: "'Manrope', 'Manrope Fallback'",
                    fontStyle: "normal"
                },
                className: "__className_73ee6c"
            }
        },
        15685: () => {},
        25288: (e, l, s) => {
            "use strict";
            s.d(l, {
                A: () => c
            });
            var t = s(95155),
                n = s(12115),
                a = s(6874),
                i = s.n(a);
            let c = (0,
                n.memo)(e => {
                var l, s;
                let { data: n, onPlayVideo: a, idVideo: c, onUrl: r, isPlayVideo: d, isPageEvent: o, valueSearch: h } = e, u = Number(null == n ? void 0 : n.id) === Number(c);
                return (0,
                    t.jsx)("div", {
                    className: "item-product-info ",
                    children: (0,
                        t.jsxs)("div", {
                        className: "wrapper-product",
                        children: [(0,
                            t.jsx)("div", {
                            className: "position-relative w-100 config",
                            children: u ? (0,
                                t.jsx)("iframe", {
                                allow: d ? "autoplay" : "",
                                className: "object-fit-cover w-100 h-100",
                                src: "https://www.youtube.com/embed/".concat(r(), "?autoplay=1"),
                                loading: "lazy",
                                allowFullScreen: !0
                            }) : (0,
                                t.jsxs)(t.Fragment, {
                                children: [(0,
                                    t.jsx)("img", {
                                    className: "object-fit-cover w-100 h-100",
                                    src: null == n ? void 0 : n.thumbnail,
                                    alt: ""
                                }), (0,
                                    t.jsx)("div", {
                                    className: "wrapper-play",
                                    onClick: a,
                                    children: (0,
                                        t.jsx)("img", {
                                        className: "object-fit-cover",
                                        src: "/icons/icon-play.svg",
                                        alt: ""
                                    })
                                })]
                            })
                        }), (0,
                            t.jsxs)("div", {
                            className: "d-flex gap-2 content-product-info",
                            children: [(0,
                                t.jsx)("div", {
                                className: "avatar",
                                onClick: () => {
                                    (null == h ? void 0 : h.isSearch) && (null == h || h.onToggleSearch())
                                },
                                children: (0,
                                    t.jsx)(i(), {
                                    href: "/games/".concat(null == n ? void 0 : n.gameId),
                                    children: (0,
                                        t.jsx)("img", {
                                        className: "object-fit-cover w-100 h-100",
                                        src: (null == n || null == (l = n.game) ? void 0 : l.logo) || "/images/product-info-avatar.png",
                                        alt: ""
                                    })
                                })
                            }), (0,
                                t.jsxs)("div", {
                                className: "d-flex flex-column justify-content-center gap-sm-1",
                                children: [(0,
                                    t.jsx)("h4", {
                                    className: "title-product-info mb-0 ",
                                    children: null == n ? void 0 : n.title
                                }), (0,
                                    t.jsx)("h5", {
                                    className: "text-product-info text-line-clamp-1",
                                    children: null == n || null == (s = n.game) ? void 0 : s.name
                                })]
                            })]
                        })]
                    })
                })
            })
        },
        28946: (e, l, s) => {
            Promise.resolve().then(s.t.bind(s, 69243, 23)),
                Promise.resolve().then(s.t.bind(s, 5542, 23)),
                Promise.resolve().then(s.t.bind(s, 2252, 23)),
                Promise.resolve().then(s.t.bind(s, 56970, 23)),
                Promise.resolve().then(s.t.bind(s, 15685, 23)),
                Promise.resolve().then(s.bind(s, 68393)),
                Promise.resolve().then(s.bind(s, 76188)),
                Promise.resolve().then(s.t.bind(s, 37587, 23)),
                Promise.resolve().then(s.t.bind(s, 1749, 23))
        },
        35695: (e, l, s) => {
            "use strict";
            var t = s(18999);
            s.o(t, "usePathname") && s.d(l, {
                    usePathname: function() {
                        return t.usePathname
                    }
                }),
                s.o(t, "useRouter") && s.d(l, {
                    useRouter: function() {
                        return t.useRouter
                    }
                })
        },
        37587: () => {},
        42714: (e, l) => {
            "use strict";
            Object.defineProperty(l, "__esModule", {
                    value: !0
                }),
                Object.defineProperty(l, "setAttributesFromProps", {
                    enumerable: !0,
                    get: function() {
                        return a
                    }
                });
            let s = {
                    acceptCharset: "accept-charset",
                    className: "class",
                    htmlFor: "for",
                    httpEquiv: "http-equiv",
                    noModule: "noModule"
                },
                t = ["onLoad", "onReady", "dangerouslySetInnerHTML", "children", "onError", "strategy", "stylesheets"];

            function n(e) {
                return ["async", "defer", "noModule"].includes(e)
            }

            function a(e, l) {
                for (let [a, i] of Object.entries(l)) {
                    if (!l.hasOwnProperty(a) || t.includes(a) || void 0 === i)
                        continue;
                    let c = s[a] || a.toLowerCase();
                    "SCRIPT" === e.tagName && n(c) ? e[c] = !!i : e.setAttribute(c, String(i)),
                        (!1 === i || "SCRIPT" === e.tagName && n(c) && (!i || "false" === i)) && (e.setAttribute(c, ""),
                            e.removeAttribute(c))
                }
            }
            ("function" == typeof l.default || "object" == typeof l.default && null !== l.default) && void 0 === l.default.__esModule && (Object.defineProperty(l.default, "__esModule", {
                    value: !0
                }),
                Object.assign(l.default, l),
                e.exports = l.default)
        },
        56970: () => {},
        68393: (e, l, s) => {
            "use strict";
            s.d(l, {
                default: () => k
            });
            var t = s(95155),
                n = s(12115),
                a = s(76188),
                i = s(40364),
                c = s(6874),
                r = s.n(c),
                d = s(53180);
            let o = () => (0,
                    t.jsxs)("svg", {
                    xmlns: "",
                    width: "130",
                    height: "35",
                    viewBox: "0 0 130 35",
                    fill: "none",
                    children: [(0,
                        t.jsxs)("g", {
                        clipPath: "url(#clip0_5345_33122)",
                        children: []
                    }), (0,
                        t.jsx)("defs", {
                        children: (0,
                            t.jsx)("clipPath", {
                            id: "clip0_5345_33122",
                            children: (0,
                                t.jsx)("rect", {
                                width: "130",
                                height: "34.4132",
                                fill: "white"
                            })
                        })
                    })]
                }),
                h = () => (0,
                    t.jsxs)("svg", {
                    id: "Layer_2",
                    "data-name": "Layer 2",
                    viewBox: "0 0 241.46 63.91",
                    children: [(0,
                        t.jsx)("defs", {
                        children: (0,
                            t.jsx)("style", {
                            dangerouslySetInnerHTML: {
                                __html: "\n                .cls-1 {\n                    fill: #d91f26;\n                }\n\n                .cls-2 {\n                    fill: #2b338c;\n                }\n            "
                            }
                        })
                    }), (0,
                        t.jsx)("g", {
                        id: "Layer_1-2",
                        "data-name": "Layer 1",
                        children: (0,
                            t.jsxs)("g", {
                            children: [(0,
                                t.jsxs)("g", {
                                children: [(0,
                                    t.jsx)("path", {
                                    className: "cls-1",
                                    d: "M237.75,38.38l-42.6,24.59c-4.58,2.65-10.31-.66-10.31-5.96V6.89c0-5.29,5.73-8.6,10.32-5.95h0c2.13,1.23,3.44,3.5,3.44,5.95v29.52c0,3.3,3.57,5.36,6.43,3.71l25.3-14.61c2.3-1.33,5.13-1.33,7.43,0h0c4.95,2.86,4.95,10.01,0,12.87Z"
                                }), (0,
                                    t.jsx)("path", {
                                    className: "cls-1",
                                    d: "M222.05,16.41l-11.5-6.64c-1.2-.69-2.7.17-2.7,1.56v13.28c0,1.39,1.5,2.25,2.7,1.56l11.5-6.64c1.2-.69,1.2-2.43,0-3.12Z"
                                })]
                            }), (0,
                                t.jsxs)("g", {
                                children: [(0,
                                    t.jsx)("path", {
                                    className: "cls-2",
                                    d: "M30.79,46.57c-.24.9-.7,1.62-1.38,2.16-.68.54-1.5.81-2.44.81h-9.84c-.94,0-1.76-.27-2.44-.81-.68-.54-1.14-1.26-1.38-2.16L0,.71h11.11l8.85,35.25c.47,1.89.87,3.71,1.2,5.45h1.77c.14-.89.54-2.71,1.2-5.45L32.91.71h11.11l-13.24,45.86Z"
                                }), (0,
                                    t.jsx)("path", {
                                    className: "cls-2",
                                    d: "M76.62,18.47c1.91,3.16,2.87,7.81,2.87,13.94,0,4.53-.5,8.12-1.49,10.76-.99,2.64-2.44,4.52-4.35,5.63-1.91,1.11-4.4,1.66-7.47,1.66-4.72,0-8.61-1.13-11.68-3.4.23,2.41.31,4.91.21,7.5v9.27h-10.4V14.65h8.49l.78,5.1c1.42-1.75,3.42-3.19,6.02-4.32,2.59-1.13,5.21-1.7,7.86-1.7,4.2,0,7.25,1.58,9.17,4.74ZM66.28,41.9c.82-.52,1.44-1.51,1.84-2.97s.6-3.63.6-6.51-.18-4.93-.53-6.44c-.35-1.51-.92-2.56-1.7-3.15-.78-.59-1.85-.88-3.22-.88s-2.76.26-4.03.78c-1.27.52-2.79,1.37-4.53,2.55v16c.38.1,1.11.28,2.19.57s2.09.5,3.01.64c.92.14,1.83.21,2.72.21,1.6,0,2.82-.26,3.65-.78Z"
                                }), (0,
                                    t.jsx)("path", {
                                    className: "cls-2",
                                    d: "M94.42,38.15c0,2.36,1.32,3.54,3.96,3.54h2.83l1.2,7.29c-.8.42-2.07.77-3.79,1.03-1.72.26-3.24.39-4.57.39-3.11,0-5.57-.84-7.36-2.51-1.79-1.67-2.69-4.05-2.69-7.11V0h10.4v38.15Z"
                                }), (0,
                                    t.jsx)("path", {
                                    className: "cls-2",
                                    d: "M135.61,16.53c2.22,1.91,3.33,5.23,3.33,9.94v23.07h-8.28l-1.06-5.31c-1.46,1.75-3.28,3.21-5.45,4.39-2.17,1.18-4.65,1.77-7.43,1.77-3.35,0-6.09-.88-8.21-2.65s-3.19-4.23-3.19-7.4v-3.54c0-2.78.94-4.95,2.83-6.51,1.89-1.56,4.51-2.34,7.86-2.34h12.46v-1.56c-.05-1.79-.46-2.99-1.24-3.61-.78-.61-2.28-.92-4.49-.92-3.87,0-8.78.19-14.72.57l-.99-7.08c2.55-.47,5.61-.87,9.2-1.2,3.59-.33,6.58-.5,8.99-.5,4.72,0,8.19.95,10.4,2.87ZM116.64,41.65c.66.59,1.7.88,3.11.88,1.27,0,2.69-.29,4.25-.88,1.56-.59,3.04-1.43,4.46-2.51v-4.88h-9.41c-1.23.05-2.1.35-2.62.92-.52.57-.78,1.37-.78,2.41v1.34c0,1.23.33,2.14.99,2.72Z"
                                }), (0,
                                    t.jsx)("path", {
                                    className: "cls-2",
                                    d: "M179.07,14.65l-12.39,35.39c-1.37,3.87-3.41,7.15-6.12,9.84-2.71,2.69-6.29,4.03-10.72,4.03-.47,0-1.27-.05-2.41-.14l-.85-6.16c2.83-.76,5.05-1.73,6.65-2.94s2.86-2.82,3.75-4.85l.14-.28h-1.98c-.8,0-1.51-.22-2.12-.67-.61-.45-1.04-1.07-1.27-1.88l-11.4-32.35h11.18l6.51,22.58c.42,1.65.78,3.4,1.06,5.24h.92c.42-1.37.89-3.12,1.42-5.24l6.44-22.58h11.18Z"
                                })]
                            })]
                        })
                    })]
                }),
                u = e => {
                    let { isShow: l, onToggleSidebar: s, goLogout: a, isUser: c } = e, [h, u] = (0,
                        n.useState)(!1), [m, x] = (0,
                        n.useState)(!1), p = () => {
                        u(e => !e)
                    }, j = () => {
                        x(e => !e)
                    }, f = e => {
                        window.location.href = e
                    };
                    return (0,
                        t.jsxs)("div", {
                        className: "sidebar ".concat(l ? "show" : "hidden"),
                        onClick: s,
                        children: [(0,
                            t.jsx)("div", {
                            className: "sidebar_close",
                            children: (0,
                                t.jsx)(d.hO, {})
                        }), (0,
                            t.jsx)("div", {
                            className: "sidebar-blur ".concat(l ? "show" : "hidden"),
                            onClick: e => e.stopPropagation(),
                            children: (0,
                                t.jsxs)("div", {
                                className: "sidebar-content",
                                onClick: e => e.stopPropagation(),
                                children: [(0,
                                    t.jsx)("a", {
                                    href: "/",
                                    className: "logo",
                                    children: (0,
                                        t.jsx)(o, {})
                                }), (0,
                                    t.jsxs)("ul", {
                                    children: [(0,
                                        t.jsxs)("li", {
                                        children: [(0,
                                            t.jsxs)("div", {
                                            role: "button",
                                            className: "d-flex align-items-center justify-content-between px-3 py-3",
                                            children: [(0,
                                                t.jsxs)("label", {
                                                onClick: () => {
                                                    f(("https://zalo.me/g/kbqnel556")())
                                                },
                                                role: "button",
                                                children: [" ", (0,
                                                    t.jsx)("https://zalo.me/g/kbqnel556", {}), " Cộng Đồng"]
                                            }), (0,
                                                t.jsx)("i", {
                                                className: "fa fa-chevron-".concat(h ? "up" : "down"),
                                                "aria-hidden": "true",
                                                onClick: e => {
                                                    e.stopPropagation(),
                                                        p()
                                                }
                                            })]
                                        }), h && (0,
                                            t.jsxs)("div", {
                                            className: "drawerSubItemNap",
                                            children: [(0,
                                                t.jsx)(r(), {
                                                href: (0,
                                                    i.UM)(),
                                                className: "subItemLink",
                                                children: "- Lịch sử giao dịch"
                                            }), (0,
                                                t.jsx)(r(), {
                                                href: (0,
                                                    i.XG)(),
                                                className: "subItemLink",
                                                children: "- Hướng dẫn nạp"
                                            })]
                                        })]
                                    }), (0,
                                        t.jsx)("li", {
                                        children: (0,
                                            t.jsx)("div", {
                                            role: "button",
                                            className: "d-flex align-items-center justify-content-between px-3 py-3",
                                            onClick: () => {
                                                f((0,
                                                    i.lA)())
                                            },
                                            children: (0,
                                                t.jsxs)("label", {
                                                role: "button",
                                                children: [(0,
                                                    t.jsx)("https://rebrand.ly/gms-p", {}), " Hỗ trợ"]
                                            })
                                        })
                                    }), (0,
                                        t.jsxs)("li", {
                                        children: [(0,
                                            t.jsxs)("div", {
                                            role: "button",
                                            className: "d-flex align-items-center justify-content-between px-3 py-3",
                                            children: [(0,
                                                t.jsxs)("label", {
                                                onClick: () => {
                                                    f((0,
                                                        i.XV)())
                                                },
                                                role: "button",
                                                children: [(0,
                                                    t.jsx)(d.DL, {}), " Giftcode"]
                                            }), (0,
                                                t.jsx)("i", {
                                                className: "fa fa-chevron-".concat(m ? "up" : "down"),
                                                "aria-hidden": "true",
                                                onClick: e => {
                                                    e.stopPropagation(),
                                                        j()
                                                }
                                            })]
                                        }), m && (0,
                                            t.jsx)("div", {
                                            className: "drawerSubItemGift",
                                            children: (0,
                                                t.jsx)(r(), {
                                                href: (0,
                                                    i.fs)(),
                                                className: "subItemLink",
                                                children: "- Lịch sử giftcode"
                                            })
                                        })]
                                    }), (0,
                                        t.jsx)("li", {
                                        children: (0,
                                            t.jsx)("div", {
                                            role: "button",
                                            className: "d-flex align-items-center justify-content-between px-3 py-3",
                                            onClick: () => {
                                                f((0,
                                                    i.R0)())
                                            },
                                            children: (0,
                                                t.jsxs)("label", {
                                                role: "button",
                                                children: [(0,
                                                    t.jsx)(d._O, {}), " Tin tức"]
                                            })
                                        })
                                    }), (0,
                                        t.jsx)("li", {
                                        children: (0,
                                            t.jsx)("div", {
                                            role: "button",
                                            className: "d-flex align-items-center justify-content-between px-3 py-3",
                                            onClick: () => {
                                                f((0,
                                                    i.fT)())
                                            },
                                            children: (0,
                                                t.jsxs)("label", {
                                                role: "button",
                                                children: [(0,
                                                    t.jsx)(d.I_, {}), " T\xe0i khoản"]
                                            })
                                        })
                                    }), c && (0,
                                        t.jsx)("li", {
                                        children: (0,
                                            t.jsx)("div", {
                                            role: "button",
                                            className: "d-flex align-items-center justify-content-between px-3 py-3",
                                            onClick: a,
                                            children: (0,
                                                t.jsxs)("label", {
                                                role: "button",
                                                children: [(0,
                                                    t.jsx)(d.t0, {}), "Đăng xuất"]
                                            })
                                        })
                                    })]
                                })]
                            })
                        })]
                    })
                };
            var m = s(27677),
                x = s(25288);
            let p = e => {
                let { value: l, onClick: s, isFullWidth: n } = e;
                return (0,
                    t.jsx)("button", {
                    className: "btn-commom ".concat(n && "full-width", " "),
                    type: "button",
                    onClick: s,
                    children: l
                })
            };
            var j = s(96834),
                f = s(54329);
            let g = e => {
                let { onToggleSearch: l, isSearch: s } = e, { activeIdVideo: c, isPlayVideo: r, handle: { onPlayVideo: d } } = (0,
                    a.A)(), [o, h] = (0,
                    n.useState)(""), [u, g] = (0,
                    n.useState)(null), [v, b] = (0,
                    n.useState)(!1), [C, N] = (0,
                    n.useState)(0), y = e => {
                    e.preventDefault(),
                        o && b(!0)
                };
                return (0,
                        n.useEffect)(() => {
                        let e;
                        return v && o && (e = setTimeout(() => {
                                (0,
                                    j.DW)(o).then(e => {
                                        g(null == e ? void 0 : e.data)
                                    }),
                                    v && b(!1)
                            }, 1e3)),
                            () => {
                                e && clearTimeout(e)
                            }
                    }, [v, o]),
                    console.log(u),
                    (0,
                        t.jsxs)("div", {
                        className: "search-app",
                        children: [(0,
                            t.jsx)("div", {
                            style: {
                                padding: "16px 12px"
                            },
                            children: (0,
                                t.jsxs)("div", {
                                className: "search-header",
                                children: [(0,
                                    t.jsx)("div", {
                                    className: "action-icon",
                                    onClick: l,
                                    children: (0,
                                        t.jsx)("img", {
                                        src: "/icons/arrow_left.svg",
                                        alt: ""
                                    })
                                }), (0,
                                    t.jsx)("form", {
                                    onSubmit: y,
                                    className: "form-search",
                                    children: (0,
                                        t.jsxs)("div", {
                                        className: "d-flex align-items-center gap-2 w-100",
                                        children: [(0,
                                            t.jsx)("label", {
                                            htmlFor: "for-search",
                                            children: (0,
                                                t.jsx)("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "17",
                                                height: "16",
                                                viewBox: "0 0 17 16",
                                                fill: "none",
                                                children: (0,
                                                    t.jsx)("path", {
                                                    d: "M12.1562 10.3439C12.947 9.2673 13.4141 7.9382 13.4141 6.5C13.4141 2.91015 10.5039 0 6.91406 0C3.32421 0 0.414062 2.91015 0.414062 6.5C0.414062 10.0899 3.32421 13 6.91406 13C8.35265 13 9.68208 12.5327 10.7588 11.7415L10.7579 11.7422C10.7874 11.7822 10.8203 11.8204 10.8565 11.8566L14.707 15.7071C15.0975 16.0976 15.7306 16.0976 16.1212 15.7071C16.5117 15.3166 16.5117 14.6834 16.1212 14.2929L12.2707 10.4424C12.2345 10.4062 12.1962 10.3734 12.1562 10.3439ZM12.4141 6.5C12.4141 9.53757 9.95163 12 6.91406 12C3.8765 12 1.41406 9.53757 1.41406 6.5C1.41406 3.46243 3.8765 1 6.91406 1C9.95163 1 12.4141 3.46243 12.4141 6.5Z",
                                                    fill: "#6C727F"
                                                })
                                            })
                                        }), (0,
                                            t.jsx)("input", {
                                            onChange: e => h(e.target.value),
                                            value: o,
                                            type: "text",
                                            name: "search",
                                            autoComplete: "off",
                                            id: "for-search",
                                            autoFocus: !0,
                                            className: "input-search",
                                            placeholder: "Nhập từ kh\xf3a để t\xecm kiếm"
                                        })]
                                    })
                                }), (0,
                                    t.jsx)("div", {
                                    className: "action-icon",
                                    onClick: y,
                                    children: (0,
                                        t.jsx)("img", {
                                        src: "/icons/icon-search.svg",
                                        alt: ""
                                    })
                                })]
                            })
                        }), (0,
                            t.jsx)("div", {
                            className: "search-result",
                            children: (0,
                                t.jsx)("div", {
                                className: "wrapper-search-result",
                                children: !!u && (0,
                                    t.jsxs)(t.Fragment, {
                                    children: [(0,
                                        t.jsx)("nav", {
                                        children: (0,
                                            t.jsx)("ul", {
                                            className: "nav-wrapper",
                                            style: {
                                                margin: "28px 0 12px"
                                            },
                                            children: (0,
                                                t.jsxs)(m.RC, {
                                                spaceBetween: 24,
                                                slidesPerView: "auto",
                                                children: [(0,
                                                    t.jsx)(m.qr, {
                                                    children: (0,
                                                        t.jsx)("li", {
                                                        onClick: () => {
                                                            0 !== C && N(0)
                                                        },
                                                        className: "".concat(0 === C ? "active" : ""),
                                                        style: {
                                                            cursor: "pointer"
                                                        },
                                                        children: (0,
                                                            t.jsx)("span", {
                                                            children: "Trải nghiệm game"
                                                        })
                                                    })
                                                }), (0,
                                                    t.jsx)(m.qr, {
                                                    children: (0,
                                                        t.jsx)("li", {
                                                        onClick: () => {
                                                            1 !== C && N(1)
                                                        },
                                                        className: "".concat(1 === C ? "active" : ""),
                                                        style: {
                                                            cursor: "pointer"
                                                        },
                                                        children: (0,
                                                            t.jsx)("span", {
                                                            children: "Tin tức mới nhất"
                                                        })
                                                    })
                                                })]
                                            })
                                        })
                                    }), 0 === C && (null == u ? void 0 : u.video) && (0,
                                        t.jsxs)(t.Fragment, {
                                        children: [(0,
                                            t.jsx)("div", {
                                            className: "d-flex flex-column gap-4",
                                            children: null == u ? void 0 : u.video.map((e, n) => (0,
                                                t.jsx)(x.A, {
                                                data: e,
                                                valueSearch: {
                                                    isSearch: s,
                                                    onToggleSearch: l
                                                },
                                                isPlayVideo: r,
                                                idVideo: c,
                                                onPlayVideo: () => d(e.id),
                                                onUrl: () => (0,
                                                    i.pM)(null == e ? void 0 : e.videoUrl),
                                                isPageEvent: !0,
                                                animationClass: !0,
                                                isActive: n > 0
                                            }, e.id))
                                        }), !(null == u ? void 0 : u.video.length) && (0,
                                            t.jsxs)("div", {
                                            className: "search-err",
                                            children: [(0,
                                                t.jsx)("div", {
                                                className: "banner-err",
                                                children: (0,
                                                    t.jsx)("img", {
                                                    src: "/images/img-error.png",
                                                    alt: ""
                                                })
                                            }), (0,
                                                t.jsx)("p", {
                                                className: "title-product text-center",
                                                children: "Kh\xf4ng c\xf3 kết quả t\xecm kiếm theo từ kho\xe1 y\xeau cầu !"
                                            }), (0,
                                                t.jsx)(p, {
                                                value: "quay lại mục tin tức",
                                                onClick: l,
                                                isFullWidth: !1
                                            })]
                                        })]
                                    }), 1 === C && (null == u ? void 0 : u.news) && (0,
                                        t.jsxs)(t.Fragment, {
                                        children: [(0,
                                            t.jsx)("div", {
                                            className: "d-flex flex-column gap-4",
                                            style: {
                                                margin: "0 -1rem"
                                            },
                                            children: null == u ? void 0 : u.news.map(e => (0,
                                                t.jsx)("div", {
                                                onClick: () => {
                                                    s && l()
                                                },
                                                children: (0,
                                                    t.jsx)(f.A, {
                                                    data: e,
                                                    href: "/news/".concat(null == e ? void 0 : e.id)
                                                }, e.id)
                                            }))
                                        }), !(null == u ? void 0 : u.news.length) && (0,
                                            t.jsxs)("div", {
                                            className: "search-err",
                                            children: [(0,
                                                t.jsx)("div", {
                                                className: "banner-err",
                                                children: (0,
                                                    t.jsx)("img", {
                                                    src: "/images/img-error.png",
                                                    alt: ""
                                                })
                                            }), (0,
                                                t.jsx)("p", {
                                                className: "title-product text-center",
                                                children: "Kh\xf4ng c\xf3 kết quả t\xecm kiếm theo từ kho\xe1 y\xeau cầu !"
                                            }), (0,
                                                t.jsx)(p, {
                                                value: "quay lại mục tin tức",
                                                onClick: l,
                                                isFullWidth: !1
                                            })]
                                        })]
                                    })]
                                })
                            })
                        })]
                    })
            };
            var v = s(35695);
            let b = () => {
                var e;
                let l = (0,
                        a.A)(),
                    s = (0,
                        v.usePathname)();
                console.log("=======", l);
                let { isSearch: c, handle: { onToggleSearch: r } } = l, [h, m] = (0,
                    n.useState)(!1), [x, p] = (0,
                    n.useState)(!1);
                (0,
                    n.useEffect)(() => {
                    console.log("store===", l)
                }, [l.isAuthenticated]);
                let j = () => {
                    x || p(!0),
                        m(!h)
                };
                return (0,
                        n.useEffect)(() => {
                        h || c ? document.body.classList.add("no-scroll") : document.body.classList.contains("no-scroll") && document.body.classList.remove("no-scroll")
                    }, [h, c]),
                    console.log(s),
                    (0,
                        t.jsxs)(t.Fragment, {
                        children: [(0,
                            t.jsxs)("div", {
                            className: "mainheader py-4 px-2",
                            children: [(0,
                                t.jsxs)("div", {
                                className: "left-header",
                                children: [(0,
                                    t.jsx)("div", {
                                    className: "sidenav",
                                    children: (0,
                                        t.jsx)(d.ZB, {})
                                }), (0,
                                    t.jsx)("a", {
                                    href: "/",
                                    className: "logo-app",
                                    children: (0,
                                        t.jsx)(o, {})
                                })]
                            }), (0,
                                t.jsx)]
                        }), x && (0,
                            t.jsx)(u, {
                            isShow: h,
                            isUser: l.isAuthenticated,
                            onToggleSidebar: j,
                            goLogout: () => {
                                (0,
                                    i.TV)("logout_redirect", "/events/cham-bong-cham-qua", "1h"),
                                l.logout()
                            }
                        }), c && (0,
                            t.jsx)(g, {
                            onToggleSearch: r,
                            isSearch: c
                        })]
                    })
            };
            var C = s(64705);
            let N = e => {
                let { isMountFooter: l, isHiddenFooter: s } = e, { isSearch: n, handle: { onToggleSearch: i } } = (0,
                    a.A)(), c = (0,
                    v.usePathname)(), r = "";
                return c.includes("/news") && (r = "/tin-tuc"),
                    c.includes("/games") && (r = "/games"),
                    (0,
                        t.jsx)(t.Fragment, {
                        children: !s && (0,
                            t.jsxs)(t.Fragment, {
                            children: [!l && (0,
                                    t.jsx)("footer", {
                                    className: "footer",
                                    children: (0,
                                        t.jsx)("div", {
                                        className: "container bg-footer",
                                        children: (0,
                                            t.jsxs)("div", {
                                            className: "mainfooter",
                                            children: [(0,
                                                t.jsxs)("div", {
                                                className: "d-flex flex-column align-items-center detail",
                                                children: [(0,
                                                    t.jsxs)("ul", {
                                                    className: "listCertify",
                                                    children: [(0,
                                                        t.jsxs)("li", {
                                                        children: ["Giấy ph\xe9p cung cấp dịch vụ tr\xf2 chơi điện tử G1 tr\xean mạng số 349/GP-BTTTT, do Bộ ", (0,
                                                            t.jsx)("br", {}), "Th\xf4ng tin v\xe0 Truyền th\xf4ng cấp ng\xe0y 12/7/2022."]
                                                    }), (0,
                                                        t.jsxs)("li", {
                                                        children: ["Giấy chứng nhận cung cấp dịch vụ tr\xf2 chơi điện tử tr\xean mạng số 91/GP-BTTT do Cục ", (0,
                                                            t.jsx)("br", {}), "Ph\xe1t thanh, truyền h\xecnh v\xe0 th\xf4ng tin điện tử cấp ng\xe0y 12/7/2022."]
                                                    })]
                                                })]
                                            })]
                                        })
                                    })
                                }), (0,
                                    t.jsx)
                                ("div", {
                                    className: "sidebottom fixed-bottom",
                                    children: (0,
                                        t.jsx)("div", {
                                        className: "container bg-color",
                                        children: (0,
                                            t.jsx)("ul", {
                                            className: "",
                                            children: C.oc.map((e, l) => {
                                                let { name: s, icon: a, path: d, giftCode: o } = e;
                                                return (0,
                                                    t.jsx)("li", {
                                                    onClick: e => {
                                                        n && i()
                                                    },
                                                    children: (0,
                                                        t.jsxs)("a", {
                                                        href: d,
                                                        className: "".concat(d === c || c.includes(l > 0 ? d : null) || d === r ? "active" : null),
                                                        children: [(0,
                                                            t.jsx)(a, {
                                                            color: (d === c || c.includes(l > 0 ? d : null),
                                                                "#ffffff")
                                                        }), (0,
                                                            t.jsx)("span", {
                                                            children: s
                                                        })]
                                                    })
                                                }, s)
                                            })
                                        })
                                    })
                                })
                            ]
                        })
                    })
            };
            var y = s(13057),
                w = s(74681);

            function k(e) {
                let { children: l } = e, [i, c] = (0,
                    n.useState)(""), [r, d] = (0,
                    n.useState)(!1), o = (0,
                    n.useRef)(null), h = (0,
                    v.usePathname)();
                if ("/callback/auth" == h)
                    return (0,
                        t.jsx)(t.Fragment, {
                        children: l
                    });
                let u = (0,
                        a.A)(),
                    { handle: { onCloseModalVideo: m, onTogglePopupGiftcode: x, onTogglePopupConfirmGiftcode: p, confirmRedeemGiftCode: j, setIsHuman: f, handleShowPopupDate: g, handleShowLoginRequired: C } } = u;
                (0,
                    n.useEffect)(() => {
                    s.e(531).then(s.t.bind(s, 81531, 23))
                }, []),
                (0,
                    n.useEffect)(() => {
                    k()
                }, [h]),
                (0,
                    n.useEffect)(() => {
                    k()
                }, [u.layout]),
                (0,
                    n.useEffect)(() => {
                    k()
                }, [o.current]);
                let k = () => {
                    o.current && (Number(o.current.offsetHeight) + 60 + 38 + 227 + 60 + 55 < window.innerHeight ? c("fix") : c(""))
                };
                (0,
                    n.useEffect)(() => {
                    if (u.loadingLayout)
                        return void d(!1);
                    d(!0)
                }, [u.loadingLayout]);
                let _ = (0,
                        n.useMemo)(() => "/profile" === h, [h]),
                    L = (0,
                        n.useMemo)(() => "/tin-tuc/gift-code/history" === h, [h]),
                    M = () => {
                        p(!1),
                            f(!0)
                    },
                    P = () => {
                        "/tin-tuc/doi-gift-code" == h ? x(0) : window.location.reload()
                    },
                    T = () => {
                        "/tin-tuc/doi-gift-code" == h ? (C(!1),
                            history.back()) : window.location.reload()
                    },
                    S = () => {
                        u.login(h)
                    },
                    I = () => {
                        "/tin-tuc/doi-gift-code" == h ? x(0) : window.location.reload()
                    };
                return (0,
                    t.jsxs)(t.Fragment, {
                    children: [r && (0,
                        t.jsxs)("div", {
                        className: "vplay-wrap",
                        style: {
                            minHeight: L ? "100vh" : "calc(100vh - 60px)"
                        },
                        children: [(0,
                            t.jsx)(b, {}), (0,
                            t.jsx)("div", {
                            className: "vplay-content",
                            style: {
                                background: "#fff"
                            },
                            ref: o,
                            children: l
                        }), (0,
                            t.jsx)(N, {
                            oter: !0,
                            footerFix: i,
                            isMountFooter: _,
                            isHiddenFooter: L
                        }), u.alert && (0,
                            t.jsx)("div", {
                            className: "modal fade show app_alert",
                            tabIndex: -1,
                            role: "dialog",
                            children: (0,
                                t.jsx)("div", {
                                className: "modal-dialog",
                                role: "document",
                                children: (0,
                                    t.jsx)("div", {
                                    className: "modal-content popup-hotline",
                                    children: (0,
                                        t.jsxs)("div", {
                                        className: "modal-body ",
                                        children: [(0,
                                            t.jsx)("div", {
                                            className: "close-popup",
                                            onClick: () => u.setAlert(null),
                                            children: (0,
                                                t.jsx)("img", {
                                                src: "../../images/close-popup-hotline.png",
                                                alt: ""
                                            })
                                        }), (0,
                                            t.jsxs)("div", {
                                            className: "wrapper-popup-content",
                                            children: [(0,
                                                t.jsx)("h3", {
                                                children: u.alert.phone
                                            }), (0,
                                                t.jsx)("button", {
                                                onClick: () => u.setAlert(null),
                                                children: (0,
                                                    t.jsx)("span", {
                                                    children: "đ\xf3ng"
                                                })
                                            })]
                                        })]
                                    })
                                })
                            })
                        }), u.modalVideo && (0,
                            t.jsx)("div", {
                            className: "modal fade app_popup-video",
                            id: "exampleModal",
                            onClick: m,
                            tabIndex: -1,
                            "aria-labelledby": "exampleModalLabel",
                            "aria-hidden": "true",
                            children: (0,
                                t.jsx)("div", {
                                className: "modal-dialog",
                                children: (0,
                                    t.jsxs)("div", {
                                    className: "modal-content bg-transparent border-0",
                                    onClick: e => e.stopPropagation(),
                                    children: [(0,
                                        t.jsx)("div", {
                                        className: "modal-header bg-transparent",
                                        children: (0,
                                            t.jsx)("button", {
                                            type: "button",
                                            className: "close",
                                            "data-bs-dismiss": "modal",
                                            "aria-label": "Close",
                                            onClick: m,
                                            children: (0,
                                                t.jsx)("img", {
                                                src: "/icons/close_ring.svg",
                                                alt: ""
                                            })
                                        })
                                    }), (0,
                                        t.jsx)("div", {
                                        className: "modal-body",
                                        children: (0,
                                            t.jsx)("iframe", {
                                            allow: "autoplay",
                                            className: "object-fit-cover w-100 h-100",
                                            src: "https://www.youtube.com/embed/".concat(u.modalVideo.url, "?autoplay=1"),
                                            loading: "lazy"
                                        })
                                    })]
                                })
                            })
                        }), u.popup && (0,
                            t.jsx)("div", {
                            className: "modal fade app-popup-alert",
                            id: "exampleModalCenter",
                            tabIndex: -1,
                            role: "dialog",
                            "aria-labelledby": "exampleModalCenterTitle",
                            "aria-hidden": "true",
                            children: (0,
                                t.jsx)("div", {
                                className: "modal-dialog modal-dialog-centered",
                                role: "document",
                                children: (0,
                                    t.jsxs)("div", {
                                    className: "modal-content",
                                    children: [(0,
                                        t.jsx)("div", {
                                        className: "modal-header",
                                        children: (0,
                                            t.jsx)("h5", {
                                            className: "modal-title",
                                            id: "exampleModalLongTitle",
                                            children: u.popup.title
                                        })
                                    }), (0,
                                        t.jsxs)("div", {
                                        className: "modal-body text-center",
                                        children: [(0,
                                            t.jsx)("p", {
                                            children: u.popup.message
                                        }), (0,
                                            t.jsx)("div", {
                                            className: "d-flex justify-content-center align-items-center",
                                            children: u.popup.action && "LOGIN" == u.popup.action && (0,
                                                t.jsx)("button", {
                                                onClick: () => null == u ? void 0 : u.login(),
                                                children: "X\xe1c nhận"
                                            })
                                        })]
                                    })]
                                })
                            })
                        }), !!u.popupGiftcode && (0,
                            t.jsx)("div", {
                            className: "modal fade app-popup-alert",
                            onClick: () => x(0),
                            id: "exampleModalCenter",
                            tabIndex: -1,
                            role: "dialog",
                            "aria-labelledby": "exampleModalCenterTitle",
                            "aria-hidden": "true",
                            children: (0,
                                t.jsx)("div", {
                                className: "modal-dialog modal-dialog-centered",
                                role: "document",
                                onClick: e => e.stopPropagation(),
                                children: (0,
                                    t.jsxs)("div", {
                                    className: "modal-content",
                                    children: [(0,
                                        t.jsxs)("div", {
                                        className: "modal-header",
                                        children: [(0,
                                            t.jsx)("h5", {
                                            className: "modal-title",
                                            id: "exampleModalLongTitle",
                                            children: "Th\xf4ng b\xe1o"
                                        }), (0,
                                            t.jsx)("button", {
                                            type: "button",
                                            className: "close",
                                            "data-dismiss": "modal",
                                            "aria-label": "Close",
                                            onClick: () => x(0),
                                            children: (0,
                                                t.jsx)("span", {
                                                "aria-hidden": "true",
                                                children: (0,
                                                    t.jsx)(w.A, {
                                                    width: "24px",
                                                    height: "24px",
                                                    onClick: () => I()
                                                })
                                            })
                                        })]
                                    }), (0,
                                        t.jsxs)("div", {
                                        className: "modal-body text-center",
                                        children: [1 === u.popupGiftcode ? (0,
                                            t.jsx)("img", {
                                            src: "/icons/success.svg",
                                            alt: "Th\xe0nh c\xf4ng"
                                        }) : 2 === u.popupGiftcode ? (0,
                                            t.jsx)("img", {
                                            src: "/icons/failed.svg",
                                            alt: "Thất bại"
                                        }) : (0,
                                            t.jsx)(t.Fragment, {}), (0,
                                            t.jsx)("p", {
                                            children: u.messageGiftcode
                                        }), (0,
                                            t.jsx)("button", {
                                            onClick: () => P(),
                                            children: "Xong"
                                        })]
                                    })]
                                })
                            })
                        }), !!u.confirmGiftcode && (0,
                            t.jsx)("div", {
                            className: "modal fade app-popup-alert",
                            onClick: () => x(0),
                            id: "exampleModalCenter",
                            tabIndex: -1,
                            role: "dialog",
                            "aria-labelledby": "exampleModalCenterTitle",
                            "aria-hidden": "true",
                            children: (0,
                                t.jsx)("div", {
                                className: "modal-dialog modal-dialog-centered",
                                role: "document",
                                onClick: e => e.stopPropagation(),
                                children: (0,
                                    t.jsxs)("div", {
                                    className: "modal-content",
                                    children: [(0,
                                        t.jsxs)("div", {
                                        className: "modal-header",
                                        children: [(0,
                                            t.jsx)("h5", {
                                            className: "modal-title",
                                            id: "exampleModalLongTitle",
                                            children: "Th\xf4ng b\xe1o"
                                        }), (0,
                                            t.jsx)("button", {
                                            type: "button",
                                            className: "close",
                                            "data-dismiss": "modal",
                                            "aria-label": "Close",
                                            onClick: () => M(),
                                            children: (0,
                                                t.jsx)("span", {
                                                "aria-hidden": "true",
                                                children: (0,
                                                    t.jsx)(w.A, {
                                                    width: "24px",
                                                    height: "24px"
                                                })
                                            })
                                        })]
                                    }), (0,
                                        t.jsxs)("div", {
                                        className: "modal-body text-center",
                                        children: [(0,
                                            t.jsx)("p", {
                                            children: "Bạn chắc chắn muốn đổi lấy OnG kh\xf4ng?"
                                        }), (0,
                                            t.jsxs)("div", {
                                            className: "d-flex justify-content-center align-items-center",
                                            children: [(0,
                                                t.jsx)("button", {
                                                onClick: () => j(),
                                                children: "X\xe1c nhận"
                                            }), (0,
                                                t.jsx)("button", {
                                                className: "btn-cancel",
                                                onClick: () => M(),
                                                children: "Hủy"
                                            })]
                                        })]
                                    })]
                                })
                            })
                        }), u.isLoginRequired && (0,
                            t.jsx)("div", {
                            className: "modal fade app-popup-alert",
                            onClick: () => x(0),
                            id: "exampleModalCenter",
                            tabIndex: -1,
                            role: "dialog",
                            "aria-labelledby": "exampleModalCenterTitle",
                            "aria-hidden": "true",
                            children: (0,
                                t.jsx)("div", {
                                className: "modal-dialog modal-dialog-centered",
                                role: "document",
                                onClick: e => e.stopPropagation(),
                                children: (0,
                                    t.jsxs)("div", {
                                    className: "modal-content",
                                    children: [(0,
                                        t.jsxs)("div", {
                                        className: "modal-header",
                                        children: [(0,
                                            t.jsx)("h5", {
                                            className: "modal-title",
                                            id: "exampleModalLongTitle",
                                            children: "Th\xf4ng b\xe1o"
                                        }), (0,
                                            t.jsx)("button", {
                                            type: "button",
                                            className: "close",
                                            "data-dismiss": "modal",
                                            "aria-label": "Close",
                                            onClick: () => T(),
                                            children: (0,
                                                t.jsx)("span", {
                                                "aria-hidden": "true",
                                                children: (0,
                                                    t.jsx)(w.A, {
                                                    width: "24px",
                                                    height: "24px"
                                                })
                                            })
                                        })]
                                    }), (0,
                                        t.jsxs)("div", {
                                        className: "modal-body text-center",
                                        children: [(0,
                                            t.jsx)("p", {
                                            children: "Bạn cần phải đăng nhập"
                                        }), (0,
                                            t.jsx)("div", {
                                            className: "d-flex justify-content-center align-items-center",
                                            children: (0,
                                                t.jsx)("button", {
                                                onClick: () => S(),
                                                children: "Đăng nhập"
                                            })
                                        })]
                                    })]
                                })
                            })
                        }), u.isPopUpDate && (0,
                            t.jsx)("div", {
                            className: "modal fade app-popup-alert",
                            onClick: () => x(0),
                            id: "exampleModalCenter",
                            tabIndex: -1,
                            role: "dialog",
                            "aria-labelledby": "exampleModalCenterTitle",
                            "aria-hidden": "true",
                            children: (0,
                                t.jsx)("div", {
                                className: "modal-dialog modal-dialog-centered",
                                role: "document",
                                onClick: e => e.stopPropagation(),
                                children: (0,
                                    t.jsxs)("div", {
                                    className: "modal-content",
                                    children: [(0,
                                        t.jsxs)("div", {
                                        className: "modal-header",
                                        children: [(0,
                                            t.jsx)("h5", {
                                            className: "modal-title",
                                            id: "exampleModalLongTitle",
                                            children: "Th\xf4ng b\xe1o"
                                        }), (0,
                                            t.jsx)("button", {
                                            type: "button",
                                            className: "close",
                                            "data-dismiss": "modal",
                                            "aria-label": "Close",
                                            onClick: () => g(!1),
                                            children: (0,
                                                t.jsx)("span", {
                                                "aria-hidden": "true",
                                                children: (0,
                                                    t.jsx)(w.A, {
                                                    width: "24px",
                                                    height: "24px"
                                                })
                                            })
                                        })]
                                    }), (0,
                                        t.jsxs)("div", {
                                        className: "modal-body text-center",
                                        children: [(0,
                                            t.jsx)("p", {
                                            children: "Ng\xe0y kết th\xfac kh\xf4ng được nhỏ hơn ng\xe0y bắt đầu"
                                        }), (0,
                                            t.jsx)("div", {
                                            className: "d-flex justify-content-center align-items-center",
                                            children: (0,
                                                t.jsx)("button", {
                                                onClick: () => g(!1),
                                                children: "OK"
                                            })
                                        })]
                                    })]
                                })
                            })
                        })]
                    }), (0,
                        t.jsx)(y.A, {})]
                })
            }
        },
        69243: (e, l, s) => {
            "use strict";
            Object.defineProperty(l, "__esModule", {
                value: !0
            }), ! function(e, l) {
                for (var s in l)
                    Object.defineProperty(e, s, {
                        enumerable: !0,
                        get: l[s]
                    })
            }(l, {
                default: function() {
                    return g
                },
                handleClientScriptLoad: function() {
                    return p
                },
                initScriptLoader: function() {
                    return j
                }
            });
            let t = s(88229),
                n = s(6966),
                a = s(95155),
                i = t._(s(47650)),
                c = n._(s(12115)),
                r = s(82830),
                d = s(42714),
                o = s(92374),
                h = new Map,
                u = new Set,
                m = e => {
                    if (i.default.preinit)
                        return void e.forEach(e => {
                            i.default.preinit(e, {
                                as: "style"
                            })
                        }); {
                        let l = document.head;
                        e.forEach(e => {
                            let s = document.createElement("link");
                            s.type = "text/css",
                                s.rel = "stylesheet",
                                s.href = e,
                                l.appendChild(s)
                        })
                    }
                },
                x = e => {
                    let {
                        src: l,
                        id: s,
                        onLoad: t = () => {},
                        onReady: n = null,
                        dangerouslySetInnerHTML: a,
                        children: i = "",
                        strategy: c = "afterInteractive",
                        onError: r,
                        stylesheets: o
                    } = e, x = s || l;
                    if (x && u.has(x))
                        return;
                    if (h.has(l)) {
                        u.add(x),
                            h.get(l).then(t, r);
                        return
                    }
                    let p = () => {
                            n && n(),
                                u.add(x)
                        },
                        j = document.createElement("script"),
                        f = new Promise((e, l) => {
                            j.addEventListener("load", function(l) {
                                    e(),
                                        t && t.call(this, l),
                                        p()
                                }),
                                j.addEventListener("error", function(e) {
                                    l(e)
                                })
                        }).catch(function(e) {
                            r && r(e)
                        });
                    a ? (j.innerHTML = a.__html || "",
                            p()) : i ? (j.textContent = "string" == typeof i ? i : Array.isArray(i) ? i.join("") : "",
                            p()) : l && (j.src = l,
                            h.set(l, f)),
                        (0,
                            d.setAttributesFromProps)(j, e),
                        "worker" === c && j.setAttribute("type", "text/partytown"),
                        j.setAttribute("data-nscript", c),
                        o && m(o),
                        document.body.appendChild(j)
                };

            function p(e) {
                let { strategy: l = "afterInteractive" } = e;
                "lazyOnload" === l ? window.addEventListener("load", () => {
                    (0,
                        o.requestIdleCallback)(() => x(e))
                }) : x(e)
            }

            function j(e) {
                e.forEach(p), [...document.querySelectorAll('[data-nscript="beforeInteractive"]'), ...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e => {
                    let l = e.id || e.getAttribute("src");
                    u.add(l)
                })
            }

            function f(e) {
                let {
                    id: l,
                    src: s = "",
                    onLoad: t = () => {},
                    onReady: n = null,
                    strategy: d = "afterInteractive",
                    onError: h,
                    stylesheets: m,
                    ...p
                } = e, { updateScripts: j, scripts: f, getIsSsr: g, appDir: v, nonce: b } = (0,
                    c.useContext)(r.HeadManagerContext), C = (0,
                    c.useRef)(!1);
                (0,
                    c.useEffect)(() => {
                    let e = l || s;
                    C.current || (n && e && u.has(e) && n(),
                        C.current = !0)
                }, [n, l, s]);
                let N = (0,
                    c.useRef)(!1);
                if ((0,
                        c.useEffect)(() => {
                        if (!N.current) {
                            if ("afterInteractive" === d)
                                x(e);
                            else
                                "lazyOnload" === d && ("complete" === document.readyState ? (0,
                                    o.requestIdleCallback)(() => x(e)) : window.addEventListener("load", () => {
                                    (0,
                                        o.requestIdleCallback)(() => x(e))
                                }));
                            N.current = !0
                        }
                    }, [e, d]),
                    ("beforeInteractive" === d || "worker" === d) && (j ? (f[d] = (f[d] || []).concat([{
                            id: l,
                            src: s,
                            onLoad: t,
                            onReady: n,
                            onError: h,
                            ...p
                        }]),
                        j(f)) : g && g() ? u.add(l || s) : g && !g() && x(e)),
                    v) {
                    if (m && m.forEach(e => {
                            i.default.preinit(e, {
                                as: "style"
                            })
                        }),
                        "beforeInteractive" === d)
                        if (!s)
                            return p.dangerouslySetInnerHTML && (p.children = p.dangerouslySetInnerHTML.__html,
                                    delete p.dangerouslySetInnerHTML),
                                (0,
                                    a.jsx)("script", {
                                    nonce: b,
                                    dangerouslySetInnerHTML: {
                                        __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([0, {
                                            ...p,
                                            id: l
                                        }]) + ")"
                                    }
                                });
                        else
                            return i.default.preload(s, p.integrity ? {
                                    as: "script",
                                    integrity: p.integrity,
                                    nonce: b,
                                    crossOrigin: p.crossOrigin
                                } : {
                                    as: "script",
                                    nonce: b,
                                    crossOrigin: p.crossOrigin
                                }),
                                (0,
                                    a.jsx)("script", {
                                    nonce: b,
                                    dangerouslySetInnerHTML: {
                                        __html: "(self.__next_s=self.__next_s||[]).push(" + JSON.stringify([s, {
                                            ...p,
                                            id: l
                                        }]) + ")"
                                    }
                                });
                        "afterInteractive" === d && s && i.default.preload(s, p.integrity ? {
                        as: "script",
                        integrity: p.integrity,
                        nonce: b,
                        crossOrigin: p.crossOrigin
                    } : {
                        as: "script",
                        nonce: b,
                        crossOrigin: p.crossOrigin
                    })
                }
                return null
            }
            Object.defineProperty(f, "__nextScript", {
                value: !0
            });
            let g = f;
            ("function" == typeof l.default || "object" == typeof l.default && null !== l.default) && void 0 === l.default.__esModule && (Object.defineProperty(l.default, "__esModule", {
                    value: !0
                }),
                Object.assign(l.default, l),
                e.exports = l.default)
        },
        74681: (e, l, s) => {
            "use strict";
            s.d(l, {
                A: () => n
            });
            var t = s(95155);
            let n = e => {
                let { width: l, height: s, onClick: n } = e;
                return (0,
                    t.jsxs)("svg", {
                    width: l,
                    height: s,
                    viewBox: "0 0 17 16",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    onClick: n,
                    children: [(0,
                        t.jsxs)("g", {
                        clipPath: "url(#clip0_3038_17534)",
                        children: [(0,
                            t.jsx)("path", {
                            d: "M12.415 4L4.41504 12",
                            stroke: "#D3D3D3",
                            strokeLinecap: "square",
                            strokeLinejoin: "round"
                        }), (0,
                            t.jsx)("path", {
                            d: "M4.41504 4L12.415 12",
                            stroke: "#D3D3D3",
                            strokeLinecap: "square",
                            strokeLinejoin: "round"
                        })]
                    }), (0,
                        t.jsx)("defs", {
                        children: (0,
                            t.jsx)("clipPath", {
                            id: "clip0_3038_17534",
                            children: (0,
                                t.jsx)("rect", {
                                x: "0.415039",
                                width: "16",
                                height: "16",
                                rx: "4",
                                fill: "white"
                            })
                        })
                    })]
                })
            }
        },
        92374: (e, l) => {
            "use strict";
            Object.defineProperty(l, "__esModule", {
                value: !0
            }), ! function(e, l) {
                for (var s in l)
                    Object.defineProperty(e, s, {
                        enumerable: !0,
                        get: l[s]
                    })
            }(l, {
                cancelIdleCallback: function() {
                    return t
                },
                requestIdleCallback: function() {
                    return s
                }
            });
            let s = "undefined" != typeof self && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(e) {
                    let l = Date.now();
                    return self.setTimeout(function() {
                        e({
                            didTimeout: !1,
                            timeRemaining: function() {
                                return Math.max(0, 50 - (Date.now() - l))
                            }
                        })
                    }, 1)
                },
                t = "undefined" != typeof self && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(e) {
                    return clearTimeout(e)
                };
            ("function" == typeof l.default || "object" == typeof l.default && null !== l.default) && void 0 === l.default.__esModule && (Object.defineProperty(l.default, "__esModule", {
                    value: !0
                }),
                Object.assign(l.default, l),
                e.exports = l.default)
        }
    },
    e => {
        var l = l => e(e.s = l);
        e.O(0, [83, 411, 740, 554, 334, 586, 942, 540, 677, 834, 8, 180, 353, 441, 684, 358], () => l(28946)),
            _N_E = e.O()
    }
]);