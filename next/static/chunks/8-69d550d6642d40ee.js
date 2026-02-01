(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[8], {
    13057: (e, t, n) => {
        "use strict";
        n.d(t, {
            A: () => l
        });
        var a = n(95155)
          , o = n(76188);
        let l = () => {
            let e = (0,
            o.A)();
            return (0,
            a.jsx)(a.Fragment, {
                children: e.loading && (0,
                a.jsxs)("div", {
                    className: "loading-page",
                    children: [(0,
                    a.jsx)("div", {
                        className: "img-loading",
                        children: (0,
                        a.jsx)("img", {
                            src: "/images/loading.png"
                        })
                    }), (0,
                    a.jsx)("div", {
                        className: "loading"
                    })]
                })
            })
        }
    }
    ,
    40364: (e, t, n) => {
        "use strict";
        n.d(t, {
            Bq: () => _,
            K2: () => h,
            Lg: () => f,
            QH: () => w,
            R0: () => A,
            Rq: () => p,
            TV: () => u,
            UM: () => k,
            XG: () => j,
            XV: () => S,
            Yj: () => d,
            ZV: () => c,
            cF: () => m,
            fT: () => T,
            fs: () => x,
            lA: () => y,
            pM: () => v,
            rE: () => D,
            z1: () => g
        });
        var a = n(57383)
          , o = n(82940)
          , l = n.n(o)
          , s = n(32109)
          , i = n.n(s);
        let r = n(44246)
          , c = e => e ? e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") : "0"
          , u = (e, t, n) => {
            let o = 1;
            "5p" == n && (o = 1 / 24 / 12),
            "1h" == n && (o = 1 / 24),
            "7d" == n && (o = 7),
            "0" == n && (o = 0),
            a.A.set(e, t, {
                domain: "vplay.onlive.vn",
                secure: !0,
                expires: o
            })
        }
          , d = e => {
            document.cookie = e + "=; domain=.".concat("vplay.onlive.vn", "; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;")
        }
          , h = () => {
            let e = ""
              , t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
              , n = t.length
              , a = 0;
            for (; a < 50; )
                e += t.charAt(Math.floor(Math.random() * n)),
                a += 1;
            return "https://id.onlive.vn/api-core/v2/oidc-service/oauth2/auth?client_id=97158af7fd8e46f8&protocol=oauth2&response_type=code&redirect_uri=https://vplay.onlive.vn/callback/auth&state=" + r(e) + "&prompt=consent&scope=email+phone+passport+offline_access+api_profile_get+api_security_get+api_topupgo+api_usecard+api_gate+api_transaction_get_all"
        }
          , g = () => "https://id.onlive.vn/api-core/v2/oidc-service/oauth2/session/end?client_id=97158af7fd8e46f8&post_logout_redirect_uri=https://vplay.onlive.vn/callback/auth"
          , p = e => {
            let t = l()(e).format("dddd, DD/MM/YYYY - HH:mm").split(",")
              , n = t[0]
              , a = t[t.length - 1]
              , o = [{
                text: "Monday",
                renderText: "Thứ 2"
            }, {
                text: "Tuesday",
                renderText: "Thứ 3"
            }, {
                text: "Wednesday",
                renderText: "Thứ 4"
            }, {
                text: "Thursday",
                renderText: "Thứ 5"
            }, {
                text: "Friday",
                renderText: "Thứ 6"
            }, {
                text: "Saturday",
                renderText: "Thứ 7"
            }, {
                text: "Sunday",
                renderText: "Chủ Nhật"
            }].find(e => {
                let {text: t} = e;
                return t === n
            }
            );
            return "".concat(o.renderText, " ").concat(a)
        }
          , v = e => {
            let t = e.split("v=")
              , n = t[t.length - 1]
              , a = n.indexOf("&");
            return -1 === a ? n : n.substring(0, a)
        }
          , f = e => localStorage.getItem(e)
          , m = (e, t) => {
            localStorage.setItem(e, String(t))
        }
          , _ = () => "https://nap.onlive.vn"
          , S = () => "https://giftcode.onlive.vn"
          , x = () => "https://giftcode.onlive.vn/history"
          , y = () => "https://id.onlive.vn/ho-tro"
          , T = () => "https://id.onlive.vn/thong-tin-tai-khoan"
          , A = () => "https://vplay.onlive.vn/tin-tuc/tin-tuc-moi-nhat"
          , k = () => "https://id.onlive.vn/lich-su-nap"
          , j = () => "https://nap.onlive.vn/instructionpay"
          , w = (e, t) => {
            let n = new Date
              , o = (new Date(n.getFullYear(),n.getMonth(),n.getDate() + 1).getTime() - n.getTime()) / 864e5;
            a.A.set(e, t, {
                domain: "vplay.onlive.vn",
                secure: !0,
                expires: o
            })
        }
          , D = e => encodeURIComponent(i().AES.encrypt(e, "d25c68e73a1c498c9caab24222a8d243").toString())
    }
    ,
    50477: () => {}
    ,
    76188: (e, t, n) => {
        "use strict";
        n.d(t, {
            AuthProvider: () => p,
            A: () => v
        });
        var a = n(95155)
          , o = n(12115)
          , l = n(57383)
          , s = n(96834)
          , i = n(40364)
          , r = n(13057)
          , c = n(35695)
          , u = n(6874)
          , d = n.n(u);
        let h = () => "/" !== (0,
        c.usePathname)() ? (0,
        a.jsx)(o.Fragment, {}) : (0,
        a.jsx)(d(), {
            href: "https://yeuho.vplay.vn/dEqz/trangnoibo",
            className: "lucky_whell_btn"
        })
          , g = (0,
        o.createContext)({})
          , p = e => {
            let {children: t} = e
              , n = (0,
            c.usePathname)()
              , [u,d] = (0,
            o.useState)(null)
              , [p,v] = (0,
            o.useState)(null)
              , [f,m] = (0,
            o.useState)(!1)
              , [_,S] = (0,
            o.useState)(!0)
              , [x,y] = (0,
            o.useState)(null)
              , [T,A] = (0,
            o.useState)("0")
              , [k,j] = (0,
            o.useState)("0")
              , [w,D] = (0,
            o.useState)(0)
              , [I,V] = (0,
            o.useState)(!1)
              , b = l.A.get("game_token")
              , [C,M] = (0,
            o.useState)("")
              , [E,G] = (0,
            o.useState)(0)
              , [P,Y] = (0,
            o.useState)(!1)
              , [N,R] = (0,
            o.useState)(!1)
              , [L,q] = (0,
            o.useState)(!1)
              , [F,H] = (0,
            o.useState)("")
              , [O,z] = (0,
            o.useState)(null)
              , [Z,K] = (0,
            o.useState)(0)
              , [U,W] = (0,
            o.useState)(!1)
              , [X,B] = (0,
            o.useState)(!1)
              , J = (0,
            c.useRouter)()
              , Q = (0,
            o.useMemo)( () => (null == u ? void 0 : u.error) ? null == u ? void 0 : u.error : b, [u]);
            (0,
            o.useEffect)( () => {
                Q && b !== Q && y({
                    title: "th\xf4ng b\xe1o",
                    message: "Lỗi đăng nhập, vui l\xf2ng đăng nhập lại!",
                    action: "LOGIN"
                })
            }
            , [Q, b]),
            (0,
            o.useEffect)( () => {}
            , [b]);
            let $ = () => {
                (0,
                i.Yj)("game_token"),
                (0,
                i.Yj)("game_refresh_token"),
                (0,
                i.Yj)("portal_redirect");
                let e = (0,
                i.z1)();
                window.location.href = e
            }
              , ee = e => {
                e ? (0,
                i.TV)("portal_redirect", e, "1h") : (0,
                i.TV)("portal_redirect", "/", "1h");
                let t = (0,
                i.K2)();
                window.location.href = t
            }
            ;
            (0,
            o.useEffect)( () => {
                let e = l.A.get("game_token")
                  , t = l.A.get("_SAID");
                if (e || t ? !e && t ? "/events/cham-bong-cham-qua" === n ? ee(n) : ee() : e && !t ? $() : (0,
                s.ug)({
                    accessToken: e
                }).then(async t => {
                    if ((null == t ? void 0 : t.AccountID) != l.A.get("_SAID"))
                        return void ee();
                    x && y(null);
                    let n = await (0,
                    s.V2)(e, null == t ? void 0 : t.AccountID);
                    d({
                        ...t,
                        avatar: n
                    }),
                    S(!1),
                    (0,
                    s.r1)({
                        accessToken: e
                    }).then(e => {
                        A((0,
                        i.ZV)(e))
                    }
                    )
                }
                ) : S(!1),
                !e) {
                    let e = l.A.get("logout_redirect");
                    console.log("logoutRedirect", e),
                    e && ((0,
                    i.Yj)("logout_redirect"),
                    J.push(e))
                }
            }
            , []);
            let et = async () => {
                let e = l.A.get("game_token")
                  , t = await (0,
                s.ug)({
                    accessToken: e
                });
                if ((null == t ? void 0 : t.AccountID) != l.A.get("_SAID"))
                    return void ee();
                d(t)
            }
              , en = (e, t) => {
                D(e),
                ei(t)
            }
              , ea = () => {
                W(!1),
                K(0)
            }
            ;
            (0,
            o.useEffect)( () => {
                X || ea()
            }
            , [X]);
            let eo = async e => {
                M(e),
                m(!0);
                try {
                    let t = await (0,
                    s.wV)(b, e);
                    200 === t.status ? t.data.IsSuccessed ? el(1) : en(2, t.data.message) : en(2, "Thất bại"),
                    m(!1)
                } catch (e) {
                    console.log(e),
                    m(!1)
                }
            }
              , el = e => {
                G(e)
            }
              , es = async () => {
                V(!1),
                m(!0),
                G(0);
                try {
                    let e = l.A.get("game_token");
                    (0,
                    s.ED)(e, C).then(t => {
                        m(!1),
                        console.log(t),
                        200 == t.status && t.data.IsSuccessed ? ((0,
                        s.r1)({
                            accessToken: e
                        }).then(e => {
                            A((0,
                            i.ZV)(e))
                        }
                        ),
                        en(1, "Th\xe0nh c\xf4ng")) : en(2, "Thất bại")
                    }
                    ).catch(e => {
                        console.log(e),
                        m(!1)
                    }
                    )
                } catch (e) {
                    console.log(e),
                    m(!1)
                }
            }
              , ei = e => {
                H(e)
            }
            ;
            return (0,
            a.jsxs)(g.Provider, {
                value: {
                    isAuthenticated: !!u,
                    balance: T,
                    loading: f,
                    setLoading: m,
                    loadingLayout: _,
                    setLoadingLayout: S,
                    login: ee,
                    logout: $,
                    popup: x,
                    setPopup: y,
                    user: u,
                    setUser: d,
                    setDefault: e => {
                        let {dataToken: t, userInfo: n} = e;
                        d(n)
                    }
                    ,
                    getUser: et,
                    alert: p,
                    setAlert: v,
                    layout: k,
                    checkLayout: e => {
                        j(e)
                    }
                    ,
                    popupGiftcode: w,
                    confirmGiftcode: I,
                    modalVideo: O,
                    isSearch: X,
                    activeIdVideo: Z,
                    isPlayVideo: U,
                    giftCode: C,
                    isShowOnG: E,
                    isHuman: P,
                    isLoginRequired: N,
                    isPopUpDate: L,
                    messageGiftcode: F,
                    handle: {
                        onTogglePopupGiftcode: en,
                        onOpenModalVideo: e => {
                            z({
                                url: e,
                                open: !0
                            })
                        }
                        ,
                        onCloseModalVideo: () => {
                            z(null)
                        }
                        ,
                        onTogglePopupConfirmGiftcode: e => {
                            V(e)
                        }
                        ,
                        setGiftCode: M,
                        handleConfirmGiftcode: eo,
                        setConfirmGiftcode: e => {
                            V(e)
                        }
                        ,
                        setIsShowOnGValue: el,
                        setIsHuman: Y,
                        confirmRedeemGiftCode: es,
                        onPlayVideo: e => {
                            K(e),
                            W(!0)
                        }
                        ,
                        onPauseVideo: ea,
                        onToggleSearch: () => {
                            B(!X)
                        }
                        ,
                        handleShowLoginRequired: e => {
                            R(e)
                        }
                        ,
                        handleShowPopupDate: e => {
                            q(e)
                        }
                        ,
                        getMessageGiftcode: ei
                    }
                },
                children: [t, (0,
                a.jsx)(h, {}), (0,
                a.jsx)(r.A, {})]
            })
        }
          , v = () => (0,
        o.useContext)(g)
    }
}]);
