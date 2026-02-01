(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[531], {
    57984: (e, t, i) => {
        "use strict";
        i.r(t),
        i.d(t, {
            afterMain: () => A,
            afterRead: () => v,
            afterWrite: () => T,
            applyStyles: () => $,
            arrow: () => J,
            auto: () => a,
            basePlacements: () => l,
            beforeMain: () => y,
            beforeRead: () => _,
            beforeWrite: () => E,
            bottom: () => s,
            clippingParents: () => d,
            computeStyles: () => ei,
            createPopper: () => ek,
            createPopperBase: () => ex,
            createPopperLite: () => eL,
            detectOverflow: () => eg,
            end: () => h,
            eventListeners: () => es,
            flip: () => e_,
            hide: () => ey,
            left: () => o,
            main: () => w,
            modifierPhases: () => O,
            offset: () => ew,
            placements: () => g,
            popper: () => f,
            popperGenerator: () => eO,
            popperOffsets: () => eA,
            preventOverflow: () => eE,
            read: () => b,
            reference: () => p,
            right: () => r,
            start: () => c,
            top: () => n,
            variationPlacements: () => m,
            viewport: () => u,
            write: () => C
        });
        var n = "top"
          , s = "bottom"
          , r = "right"
          , o = "left"
          , a = "auto"
          , l = [n, s, r, o]
          , c = "start"
          , h = "end"
          , d = "clippingParents"
          , u = "viewport"
          , f = "popper"
          , p = "reference"
          , m = l.reduce(function(e, t) {
            return e.concat([t + "-" + c, t + "-" + h])
        }, [])
          , g = [].concat(l, [a]).reduce(function(e, t) {
            return e.concat([t, t + "-" + c, t + "-" + h])
        }, [])
          , _ = "beforeRead"
          , b = "read"
          , v = "afterRead"
          , y = "beforeMain"
          , w = "main"
          , A = "afterMain"
          , E = "beforeWrite"
          , C = "write"
          , T = "afterWrite"
          , O = [_, b, v, y, w, A, E, C, T];
        function x(e) {
            return e ? (e.nodeName || "").toLowerCase() : null
        }
        function k(e) {
            if (null == e)
                return window;
            if ("[object Window]" !== e.toString()) {
                var t = e.ownerDocument;
                return t && t.defaultView || window
            }
            return e
        }
        function L(e) {
            var t = k(e).Element;
            return e instanceof t || e instanceof Element
        }
        function S(e) {
            var t = k(e).HTMLElement;
            return e instanceof t || e instanceof HTMLElement
        }
        function D(e) {
            if ("undefined" == typeof ShadowRoot)
                return !1;
            var t = k(e).ShadowRoot;
            return e instanceof t || e instanceof ShadowRoot
        }
        let $ = {
            name: "applyStyles",
            enabled: !0,
            phase: "write",
            fn: function(e) {
                var t = e.state;
                Object.keys(t.elements).forEach(function(e) {
                    var i = t.styles[e] || {}
                      , n = t.attributes[e] || {}
                      , s = t.elements[e];
                    S(s) && x(s) && (Object.assign(s.style, i),
                    Object.keys(n).forEach(function(e) {
                        var t = n[e];
                        !1 === t ? s.removeAttribute(e) : s.setAttribute(e, !0 === t ? "" : t)
                    }))
                })
            },
            effect: function(e) {
                var t = e.state
                  , i = {
                    popper: {
                        position: t.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0"
                    },
                    arrow: {
                        position: "absolute"
                    },
                    reference: {}
                };
                return Object.assign(t.elements.popper.style, i.popper),
                t.styles = i,
                t.elements.arrow && Object.assign(t.elements.arrow.style, i.arrow),
                function() {
                    Object.keys(t.elements).forEach(function(e) {
                        var n = t.elements[e]
                          , s = t.attributes[e] || {}
                          , r = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : i[e]).reduce(function(e, t) {
                            return e[t] = "",
                            e
                        }, {});
                        S(n) && x(n) && (Object.assign(n.style, r),
                        Object.keys(s).forEach(function(e) {
                            n.removeAttribute(e)
                        }))
                    })
                }
            },
            requires: ["computeStyles"]
        };
        function I(e) {
            return e.split("-")[0]
        }
        var N = Math.max
          , P = Math.min
          , j = Math.round;
        function M() {
            var e = navigator.userAgentData;
            return null != e && e.brands && Array.isArray(e.brands) ? e.brands.map(function(e) {
                return e.brand + "/" + e.version
            }).join(" ") : navigator.userAgent
        }
        function F() {
            return !/^((?!chrome|android).)*safari/i.test(M())
        }
        function H(e, t, i) {
            void 0 === t && (t = !1),
            void 0 === i && (i = !1);
            var n = e.getBoundingClientRect()
              , s = 1
              , r = 1;
            t && S(e) && (s = e.offsetWidth > 0 && j(n.width) / e.offsetWidth || 1,
            r = e.offsetHeight > 0 && j(n.height) / e.offsetHeight || 1);
            var o = (L(e) ? k(e) : window).visualViewport
              , a = !F() && i
              , l = (n.left + (a && o ? o.offsetLeft : 0)) / s
              , c = (n.top + (a && o ? o.offsetTop : 0)) / r
              , h = n.width / s
              , d = n.height / r;
            return {
                width: h,
                height: d,
                top: c,
                right: l + h,
                bottom: c + d,
                left: l,
                x: l,
                y: c
            }
        }
        function W(e) {
            var t = H(e)
              , i = e.offsetWidth
              , n = e.offsetHeight;
            return 1 >= Math.abs(t.width - i) && (i = t.width),
            1 >= Math.abs(t.height - n) && (n = t.height),
            {
                x: e.offsetLeft,
                y: e.offsetTop,
                width: i,
                height: n
            }
        }
        function z(e, t) {
            var i = t.getRootNode && t.getRootNode();
            if (e.contains(t))
                return !0;
            if (i && D(i)) {
                var n = t;
                do {
                    if (n && e.isSameNode(n))
                        return !0;
                    n = n.parentNode || n.host
                } while (n)
            }
            return !1
        }
        function R(e) {
            return k(e).getComputedStyle(e)
        }
        function B(e) {
            return ((L(e) ? e.ownerDocument : e.document) || window.document).documentElement
        }
        function q(e) {
            return "html" === x(e) ? e : e.assignedSlot || e.parentNode || (D(e) ? e.host : null) || B(e)
        }
        function V(e) {
            return S(e) && "fixed" !== R(e).position ? e.offsetParent : null
        }
        function K(e) {
            for (var t = k(e), i = V(e); i && ["table", "td", "th"].indexOf(x(i)) >= 0 && "static" === R(i).position; )
                i = V(i);
            return i && ("html" === x(i) || "body" === x(i) && "static" === R(i).position) ? t : i || function(e) {
                var t = /firefox/i.test(M());
                if (/Trident/i.test(M()) && S(e) && "fixed" === R(e).position)
                    return null;
                var i = q(e);
                for (D(i) && (i = i.host); S(i) && 0 > ["html", "body"].indexOf(x(i)); ) {
                    var n = R(i);
                    if ("none" !== n.transform || "none" !== n.perspective || "paint" === n.contain || -1 !== ["transform", "perspective"].indexOf(n.willChange) || t && "filter" === n.willChange || t && n.filter && "none" !== n.filter)
                        return i;
                    i = i.parentNode
                }
                return null
            }(e) || t
        }
        function Q(e) {
            return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
        }
        function X(e, t, i) {
            return N(e, P(t, i))
        }
        function Y() {
            return {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }
        function U(e) {
            return Object.assign({}, Y(), e)
        }
        function G(e, t) {
            return t.reduce(function(t, i) {
                return t[i] = e,
                t
            }, {})
        }
        let J = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t, i = e.state, a = e.name, c = e.options, h = i.elements.arrow, d = i.modifiersData.popperOffsets, u = I(i.placement), f = Q(u), p = [o, r].indexOf(u) >= 0 ? "height" : "width";
                if (h && d) {
                    var m, g = (m = c.padding,
                    U("number" != typeof (m = "function" == typeof m ? m(Object.assign({}, i.rects, {
                        placement: i.placement
                    })) : m) ? m : G(m, l))), _ = W(h), b = "y" === f ? n : o, v = "y" === f ? s : r, y = i.rects.reference[p] + i.rects.reference[f] - d[f] - i.rects.popper[p], w = d[f] - i.rects.reference[f], A = K(h), E = A ? "y" === f ? A.clientHeight || 0 : A.clientWidth || 0 : 0, C = g[b], T = E - _[p] - g[v], O = E / 2 - _[p] / 2 + (y / 2 - w / 2), x = X(C, O, T);
                    i.modifiersData[a] = ((t = {})[f] = x,
                    t.centerOffset = x - O,
                    t)
                }
            },
            effect: function(e) {
                var t = e.state
                  , i = e.options.element
                  , n = void 0 === i ? "[data-popper-arrow]" : i;
                if (null != n)
                    ("string" != typeof n || (n = t.elements.popper.querySelector(n))) && z(t.elements.popper, n) && (t.elements.arrow = n)
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"]
        };
        function Z(e) {
            return e.split("-")[1]
        }
        var ee = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };
        function et(e) {
            var t, i, a, l, c, d, u, f = e.popper, p = e.popperRect, m = e.placement, g = e.variation, _ = e.offsets, b = e.position, v = e.gpuAcceleration, y = e.adaptive, w = e.roundOffsets, A = e.isFixed, E = _.x, C = void 0 === E ? 0 : E, T = _.y, O = void 0 === T ? 0 : T, x = "function" == typeof w ? w({
                x: C,
                y: O
            }) : {
                x: C,
                y: O
            };
            C = x.x,
            O = x.y;
            var L = _.hasOwnProperty("x")
              , S = _.hasOwnProperty("y")
              , D = o
              , $ = n
              , I = window;
            if (y) {
                var N = K(f)
                  , P = "clientHeight"
                  , M = "clientWidth";
                N === k(f) && "static" !== R(N = B(f)).position && "absolute" === b && (P = "scrollHeight",
                M = "scrollWidth"),
                (m === n || (m === o || m === r) && g === h) && ($ = s,
                O -= (A && N === I && I.visualViewport ? I.visualViewport.height : N[P]) - p.height,
                O *= v ? 1 : -1),
                (m === o || (m === n || m === s) && g === h) && (D = r,
                C -= (A && N === I && I.visualViewport ? I.visualViewport.width : N[M]) - p.width,
                C *= v ? 1 : -1)
            }
            var F = Object.assign({
                position: b
            }, y && ee)
              , H = !0 === w ? (t = {
                x: C,
                y: O
            },
            i = k(f),
            a = t.x,
            l = t.y,
            {
                x: j(a * (c = i.devicePixelRatio || 1)) / c || 0,
                y: j(l * c) / c || 0
            }) : {
                x: C,
                y: O
            };
            return (C = H.x,
            O = H.y,
            v) ? Object.assign({}, F, ((u = {})[$] = S ? "0" : "",
            u[D] = L ? "0" : "",
            u.transform = 1 >= (I.devicePixelRatio || 1) ? "translate(" + C + "px, " + O + "px)" : "translate3d(" + C + "px, " + O + "px, 0)",
            u)) : Object.assign({}, F, ((d = {})[$] = S ? O + "px" : "",
            d[D] = L ? C + "px" : "",
            d.transform = "",
            d))
        }
        let ei = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function(e) {
                var t = e.state
                  , i = e.options
                  , n = i.gpuAcceleration
                  , s = i.adaptive
                  , r = i.roundOffsets
                  , o = void 0 === r || r
                  , a = {
                    placement: I(t.placement),
                    variation: Z(t.placement),
                    popper: t.elements.popper,
                    popperRect: t.rects.popper,
                    gpuAcceleration: void 0 === n || n,
                    isFixed: "fixed" === t.options.strategy
                };
                null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, et(Object.assign({}, a, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: void 0 === s || s,
                    roundOffsets: o
                })))),
                null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, et(Object.assign({}, a, {
                    offsets: t.modifiersData.arrow,
                    position: "absolute",
                    adaptive: !1,
                    roundOffsets: o
                })))),
                t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-placement": t.placement
                })
            },
            data: {}
        };
        var en = {
            passive: !0
        };
        let es = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function() {},
            effect: function(e) {
                var t = e.state
                  , i = e.instance
                  , n = e.options
                  , s = n.scroll
                  , r = void 0 === s || s
                  , o = n.resize
                  , a = void 0 === o || o
                  , l = k(t.elements.popper)
                  , c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
                return r && c.forEach(function(e) {
                    e.addEventListener("scroll", i.update, en)
                }),
                a && l.addEventListener("resize", i.update, en),
                function() {
                    r && c.forEach(function(e) {
                        e.removeEventListener("scroll", i.update, en)
                    }),
                    a && l.removeEventListener("resize", i.update, en)
                }
            },
            data: {}
        };
        var er = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };
        function eo(e) {
            return e.replace(/left|right|bottom|top/g, function(e) {
                return er[e]
            })
        }
        var ea = {
            start: "end",
            end: "start"
        };
        function el(e) {
            return e.replace(/start|end/g, function(e) {
                return ea[e]
            })
        }
        function ec(e) {
            var t = k(e);
            return {
                scrollLeft: t.pageXOffset,
                scrollTop: t.pageYOffset
            }
        }
        function eh(e) {
            return H(B(e)).left + ec(e).scrollLeft
        }
        function ed(e) {
            var t = R(e)
              , i = t.overflow
              , n = t.overflowX
              , s = t.overflowY;
            return /auto|scroll|overlay|hidden/.test(i + s + n)
        }
        function eu(e, t) {
            void 0 === t && (t = []);
            var i, n = function e(t) {
                return ["html", "body", "#document"].indexOf(x(t)) >= 0 ? t.ownerDocument.body : S(t) && ed(t) ? t : e(q(t))
            }(e), s = n === (null == (i = e.ownerDocument) ? void 0 : i.body), r = k(n), o = s ? [r].concat(r.visualViewport || [], ed(n) ? n : []) : n, a = t.concat(o);
            return s ? a : a.concat(eu(q(o)))
        }
        function ef(e) {
            return Object.assign({}, e, {
                left: e.x,
                top: e.y,
                right: e.x + e.width,
                bottom: e.y + e.height
            })
        }
        function ep(e, t, i) {
            var n, s, r, o, a, l, c, h, d, f;
            return t === u ? ef(function(e, t) {
                var i = k(e)
                  , n = B(e)
                  , s = i.visualViewport
                  , r = n.clientWidth
                  , o = n.clientHeight
                  , a = 0
                  , l = 0;
                if (s) {
                    r = s.width,
                    o = s.height;
                    var c = F();
                    (c || !c && "fixed" === t) && (a = s.offsetLeft,
                    l = s.offsetTop)
                }
                return {
                    width: r,
                    height: o,
                    x: a + eh(e),
                    y: l
                }
            }(e, i)) : L(t) ? ((n = H(t, !1, "fixed" === i)).top = n.top + t.clientTop,
            n.left = n.left + t.clientLeft,
            n.bottom = n.top + t.clientHeight,
            n.right = n.left + t.clientWidth,
            n.width = t.clientWidth,
            n.height = t.clientHeight,
            n.x = n.left,
            n.y = n.top,
            n) : ef((s = B(e),
            o = B(s),
            a = ec(s),
            l = null == (r = s.ownerDocument) ? void 0 : r.body,
            c = N(o.scrollWidth, o.clientWidth, l ? l.scrollWidth : 0, l ? l.clientWidth : 0),
            h = N(o.scrollHeight, o.clientHeight, l ? l.scrollHeight : 0, l ? l.clientHeight : 0),
            d = -a.scrollLeft + eh(s),
            f = -a.scrollTop,
            "rtl" === R(l || o).direction && (d += N(o.clientWidth, l ? l.clientWidth : 0) - c),
            {
                width: c,
                height: h,
                x: d,
                y: f
            }))
        }
        function em(e) {
            var t, i = e.reference, a = e.element, l = e.placement, d = l ? I(l) : null, u = l ? Z(l) : null, f = i.x + i.width / 2 - a.width / 2, p = i.y + i.height / 2 - a.height / 2;
            switch (d) {
            case n:
                t = {
                    x: f,
                    y: i.y - a.height
                };
                break;
            case s:
                t = {
                    x: f,
                    y: i.y + i.height
                };
                break;
            case r:
                t = {
                    x: i.x + i.width,
                    y: p
                };
                break;
            case o:
                t = {
                    x: i.x - a.width,
                    y: p
                };
                break;
            default:
                t = {
                    x: i.x,
                    y: i.y
                }
            }
            var m = d ? Q(d) : null;
            if (null != m) {
                var g = "y" === m ? "height" : "width";
                switch (u) {
                case c:
                    t[m] = t[m] - (i[g] / 2 - a[g] / 2);
                    break;
                case h:
                    t[m] = t[m] + (i[g] / 2 - a[g] / 2)
                }
            }
            return t
        }
        function eg(e, t) {
            void 0 === t && (t = {});
            var i, o, a, c, h, m, g, _, b = t, v = b.placement, y = void 0 === v ? e.placement : v, w = b.strategy, A = void 0 === w ? e.strategy : w, E = b.boundary, C = b.rootBoundary, T = b.elementContext, O = void 0 === T ? f : T, k = b.altBoundary, D = b.padding, $ = void 0 === D ? 0 : D, I = U("number" != typeof $ ? $ : G($, l)), j = e.rects.popper, M = e.elements[void 0 !== k && k ? O === f ? p : f : O], F = (i = L(M) ? M : M.contextElement || B(e.elements.popper),
            o = void 0 === E ? d : E,
            a = void 0 === C ? u : C,
            g = (m = [].concat("clippingParents" === o ? (c = eu(q(i)),
            !L(h = ["absolute", "fixed"].indexOf(R(i).position) >= 0 && S(i) ? K(i) : i) ? [] : c.filter(function(e) {
                return L(e) && z(e, h) && "body" !== x(e)
            })) : [].concat(o), [a]))[0],
            (_ = m.reduce(function(e, t) {
                var n = ep(i, t, A);
                return e.top = N(n.top, e.top),
                e.right = P(n.right, e.right),
                e.bottom = P(n.bottom, e.bottom),
                e.left = N(n.left, e.left),
                e
            }, ep(i, g, A))).width = _.right - _.left,
            _.height = _.bottom - _.top,
            _.x = _.left,
            _.y = _.top,
            _), W = H(e.elements.reference), V = em({
                reference: W,
                element: j,
                strategy: "absolute",
                placement: y
            }), Q = ef(Object.assign({}, j, V)), X = O === f ? Q : W, Y = {
                top: F.top - X.top + I.top,
                bottom: X.bottom - F.bottom + I.bottom,
                left: F.left - X.left + I.left,
                right: X.right - F.right + I.right
            }, J = e.modifiersData.offset;
            if (O === f && J) {
                var Z = J[y];
                Object.keys(Y).forEach(function(e) {
                    var t = [r, s].indexOf(e) >= 0 ? 1 : -1
                      , i = [n, s].indexOf(e) >= 0 ? "y" : "x";
                    Y[e] += Z[i] * t
                })
            }
            return Y
        }
        let e_ = {
            name: "flip",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state
                  , i = e.options
                  , h = e.name;
                if (!t.modifiersData[h]._skip) {
                    for (var d = i.mainAxis, u = void 0 === d || d, f = i.altAxis, p = void 0 === f || f, _ = i.fallbackPlacements, b = i.padding, v = i.boundary, y = i.rootBoundary, w = i.altBoundary, A = i.flipVariations, E = void 0 === A || A, C = i.allowedAutoPlacements, T = t.options.placement, O = I(T) === T, x = _ || (O || !E ? [eo(T)] : function(e) {
                        if (I(e) === a)
                            return [];
                        var t = eo(e);
                        return [el(e), t, el(t)]
                    }(T)), k = [T].concat(x).reduce(function(e, i) {
                        var n, s, r, o, c, h, d, u, f, p, _, w;
                        return e.concat(I(i) === a ? (s = (n = {
                            placement: i,
                            boundary: v,
                            rootBoundary: y,
                            padding: b,
                            flipVariations: E,
                            allowedAutoPlacements: C
                        }).placement,
                        r = n.boundary,
                        o = n.rootBoundary,
                        c = n.padding,
                        h = n.flipVariations,
                        u = void 0 === (d = n.allowedAutoPlacements) ? g : d,
                        0 === (_ = (p = (f = Z(s)) ? h ? m : m.filter(function(e) {
                            return Z(e) === f
                        }) : l).filter(function(e) {
                            return u.indexOf(e) >= 0
                        })).length && (_ = p),
                        Object.keys(w = _.reduce(function(e, i) {
                            return e[i] = eg(t, {
                                placement: i,
                                boundary: r,
                                rootBoundary: o,
                                padding: c
                            })[I(i)],
                            e
                        }, {})).sort(function(e, t) {
                            return w[e] - w[t]
                        })) : i)
                    }, []), L = t.rects.reference, S = t.rects.popper, D = new Map, $ = !0, N = k[0], P = 0; P < k.length; P++) {
                        var j = k[P]
                          , M = I(j)
                          , F = Z(j) === c
                          , H = [n, s].indexOf(M) >= 0
                          , W = H ? "width" : "height"
                          , z = eg(t, {
                            placement: j,
                            boundary: v,
                            rootBoundary: y,
                            altBoundary: w,
                            padding: b
                        })
                          , R = H ? F ? r : o : F ? s : n;
                        L[W] > S[W] && (R = eo(R));
                        var B = eo(R)
                          , q = [];
                        if (u && q.push(z[M] <= 0),
                        p && q.push(z[R] <= 0, z[B] <= 0),
                        q.every(function(e) {
                            return e
                        })) {
                            N = j,
                            $ = !1;
                            break
                        }
                        D.set(j, q)
                    }
                    if ($)
                        for (var V = E ? 3 : 1, K = function(e) {
                            var t = k.find(function(t) {
                                var i = D.get(t);
                                if (i)
                                    return i.slice(0, e).every(function(e) {
                                        return e
                                    })
                            });
                            if (t)
                                return N = t,
                                "break"
                        }, Q = V; Q > 0 && "break" !== K(Q); Q--)
                            ;
                    t.placement !== N && (t.modifiersData[h]._skip = !0,
                    t.placement = N,
                    t.reset = !0)
                }
            },
            requiresIfExists: ["offset"],
            data: {
                _skip: !1
            }
        };
        function eb(e, t, i) {
            return void 0 === i && (i = {
                x: 0,
                y: 0
            }),
            {
                top: e.top - t.height - i.y,
                right: e.right - t.width + i.x,
                bottom: e.bottom - t.height + i.y,
                left: e.left - t.width - i.x
            }
        }
        function ev(e) {
            return [n, r, s, o].some(function(t) {
                return e[t] >= 0
            })
        }
        let ey = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function(e) {
                var t = e.state
                  , i = e.name
                  , n = t.rects.reference
                  , s = t.rects.popper
                  , r = t.modifiersData.preventOverflow
                  , o = eg(t, {
                    elementContext: "reference"
                })
                  , a = eg(t, {
                    altBoundary: !0
                })
                  , l = eb(o, n)
                  , c = eb(a, s, r)
                  , h = ev(l)
                  , d = ev(c);
                t.modifiersData[i] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: h,
                    hasPopperEscaped: d
                },
                t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-reference-hidden": h,
                    "data-popper-escaped": d
                })
            }
        }
          , ew = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function(e) {
                var t = e.state
                  , i = e.options
                  , s = e.name
                  , a = i.offset
                  , l = void 0 === a ? [0, 0] : a
                  , c = g.reduce(function(e, i) {
                    var s, a, c, h, d, u;
                    return e[i] = (s = t.rects,
                    c = [o, n].indexOf(a = I(i)) >= 0 ? -1 : 1,
                    d = (h = "function" == typeof l ? l(Object.assign({}, s, {
                        placement: i
                    })) : l)[0],
                    u = h[1],
                    d = d || 0,
                    u = (u || 0) * c,
                    [o, r].indexOf(a) >= 0 ? {
                        x: u,
                        y: d
                    } : {
                        x: d,
                        y: u
                    }),
                    e
                }, {})
                  , h = c[t.placement]
                  , d = h.x
                  , u = h.y;
                null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += d,
                t.modifiersData.popperOffsets.y += u),
                t.modifiersData[s] = c
            }
        }
          , eA = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function(e) {
                var t = e.state
                  , i = e.name;
                t.modifiersData[i] = em({
                    reference: t.rects.reference,
                    element: t.rects.popper,
                    strategy: "absolute",
                    placement: t.placement
                })
            },
            data: {}
        }
          , eE = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function(e) {
                var t = e.state
                  , i = e.options
                  , a = e.name
                  , l = i.mainAxis
                  , h = i.altAxis
                  , d = i.boundary
                  , u = i.rootBoundary
                  , f = i.altBoundary
                  , p = i.padding
                  , m = i.tether
                  , g = void 0 === m || m
                  , _ = i.tetherOffset
                  , b = void 0 === _ ? 0 : _
                  , v = eg(t, {
                    boundary: d,
                    rootBoundary: u,
                    padding: p,
                    altBoundary: f
                })
                  , y = I(t.placement)
                  , w = Z(t.placement)
                  , A = !w
                  , E = Q(y)
                  , C = "x" === E ? "y" : "x"
                  , T = t.modifiersData.popperOffsets
                  , O = t.rects.reference
                  , x = t.rects.popper
                  , k = "function" == typeof b ? b(Object.assign({}, t.rects, {
                    placement: t.placement
                })) : b
                  , L = "number" == typeof k ? {
                    mainAxis: k,
                    altAxis: k
                } : Object.assign({
                    mainAxis: 0,
                    altAxis: 0
                }, k)
                  , S = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null
                  , D = {
                    x: 0,
                    y: 0
                };
                if (T) {
                    if (void 0 === l || l) {
                        var $, j = "y" === E ? n : o, M = "y" === E ? s : r, F = "y" === E ? "height" : "width", H = T[E], z = H + v[j], R = H - v[M], B = g ? -x[F] / 2 : 0, q = w === c ? O[F] : x[F], V = w === c ? -x[F] : -O[F], U = t.elements.arrow, G = g && U ? W(U) : {
                            width: 0,
                            height: 0
                        }, J = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Y(), ee = J[j], et = J[M], ei = X(0, O[F], G[F]), en = A ? O[F] / 2 - B - ei - ee - L.mainAxis : q - ei - ee - L.mainAxis, es = A ? -O[F] / 2 + B + ei + et + L.mainAxis : V + ei + et + L.mainAxis, er = t.elements.arrow && K(t.elements.arrow), eo = er ? "y" === E ? er.clientTop || 0 : er.clientLeft || 0 : 0, ea = null != ($ = null == S ? void 0 : S[E]) ? $ : 0, el = X(g ? P(z, H + en - ea - eo) : z, H, g ? N(R, H + es - ea) : R);
                        T[E] = el,
                        D[E] = el - H
                    }
                    if (void 0 !== h && h) {
                        var ec, eh, ed = "x" === E ? n : o, eu = "x" === E ? s : r, ef = T[C], ep = "y" === C ? "height" : "width", em = ef + v[ed], e_ = ef - v[eu], eb = -1 !== [n, o].indexOf(y), ev = null != (eh = null == S ? void 0 : S[C]) ? eh : 0, ey = eb ? em : ef - O[ep] - x[ep] - ev + L.altAxis, ew = eb ? ef + O[ep] + x[ep] - ev - L.altAxis : e_, eA = g && eb ? (ec = X(ey, ef, ew)) > ew ? ew : ec : X(g ? ey : em, ef, g ? ew : e_);
                        T[C] = eA,
                        D[C] = eA - ef
                    }
                    t.modifiersData[a] = D
                }
            },
            requiresIfExists: ["offset"]
        };
        var eC = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        };
        function eT() {
            for (var e = arguments.length, t = Array(e), i = 0; i < e; i++)
                t[i] = arguments[i];
            return !t.some(function(e) {
                return !(e && "function" == typeof e.getBoundingClientRect)
            })
        }
        function eO(e) {
            void 0 === e && (e = {});
            var t = e
              , i = t.defaultModifiers
              , n = void 0 === i ? [] : i
              , s = t.defaultOptions
              , r = void 0 === s ? eC : s;
            return function(e, t, i) {
                void 0 === i && (i = r);
                var s, o, a = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, eC, r),
                    modifiersData: {},
                    elements: {
                        reference: e,
                        popper: t
                    },
                    attributes: {},
                    styles: {}
                }, l = [], c = !1, h = {
                    state: a,
                    setOptions: function(i) {
                        var s, o, c, u, f, p, m = "function" == typeof i ? i(a.options) : i;
                        d(),
                        a.options = Object.assign({}, r, a.options, m),
                        a.scrollParents = {
                            reference: L(e) ? eu(e) : e.contextElement ? eu(e.contextElement) : [],
                            popper: eu(t)
                        };
                        var g = (o = Object.keys(s = [].concat(n, a.options.modifiers).reduce(function(e, t) {
                            var i = e[t.name];
                            return e[t.name] = i ? Object.assign({}, i, t, {
                                options: Object.assign({}, i.options, t.options),
                                data: Object.assign({}, i.data, t.data)
                            }) : t,
                            e
                        }, {})).map(function(e) {
                            return s[e]
                        }),
                        c = new Map,
                        u = new Set,
                        f = [],
                        o.forEach(function(e) {
                            c.set(e.name, e)
                        }),
                        o.forEach(function(e) {
                            u.has(e.name) || function e(t) {
                                u.add(t.name),
                                [].concat(t.requires || [], t.requiresIfExists || []).forEach(function(t) {
                                    if (!u.has(t)) {
                                        var i = c.get(t);
                                        i && e(i)
                                    }
                                }),
                                f.push(t)
                            }(e)
                        }),
                        p = f,
                        O.reduce(function(e, t) {
                            return e.concat(p.filter(function(e) {
                                return e.phase === t
                            }))
                        }, []));
                        return a.orderedModifiers = g.filter(function(e) {
                            return e.enabled
                        }),
                        a.orderedModifiers.forEach(function(e) {
                            var t = e.name
                              , i = e.options
                              , n = e.effect;
                            if ("function" == typeof n) {
                                var s = n({
                                    state: a,
                                    name: t,
                                    instance: h,
                                    options: void 0 === i ? {} : i
                                });
                                l.push(s || function() {}
                                )
                            }
                        }),
                        h.update()
                    },
                    forceUpdate: function() {
                        if (!c) {
                            var e = a.elements
                              , t = e.reference
                              , i = e.popper;
                            if (eT(t, i)) {
                                a.rects = {
                                    reference: (n = K(i),
                                    s = "fixed" === a.options.strategy,
                                    r = S(n),
                                    u = S(n) && (l = j((o = n.getBoundingClientRect()).width) / n.offsetWidth || 1,
                                    d = j(o.height) / n.offsetHeight || 1,
                                    1 !== l || 1 !== d),
                                    f = B(n),
                                    p = H(t, u, s),
                                    m = {
                                        scrollLeft: 0,
                                        scrollTop: 0
                                    },
                                    g = {
                                        x: 0,
                                        y: 0
                                    },
                                    (r || !r && !s) && (("body" !== x(n) || ed(f)) && (m = function(e) {
                                        return e !== k(e) && S(e) ? {
                                            scrollLeft: e.scrollLeft,
                                            scrollTop: e.scrollTop
                                        } : ec(e)
                                    }(n)),
                                    S(n) ? (g = H(n, !0),
                                    g.x += n.clientLeft,
                                    g.y += n.clientTop) : f && (g.x = eh(f))),
                                    {
                                        x: p.left + m.scrollLeft - g.x,
                                        y: p.top + m.scrollTop - g.y,
                                        width: p.width,
                                        height: p.height
                                    }),
                                    popper: W(i)
                                },
                                a.reset = !1,
                                a.placement = a.options.placement,
                                a.orderedModifiers.forEach(function(e) {
                                    return a.modifiersData[e.name] = Object.assign({}, e.data)
                                });
                                for (var n, s, r, o, l, d, u, f, p, m, g, _ = 0; _ < a.orderedModifiers.length; _++) {
                                    if (!0 === a.reset) {
                                        a.reset = !1,
                                        _ = -1;
                                        continue
                                    }
                                    var b = a.orderedModifiers[_]
                                      , v = b.fn
                                      , y = b.options
                                      , w = void 0 === y ? {} : y
                                      , A = b.name;
                                    "function" == typeof v && (a = v({
                                        state: a,
                                        options: w,
                                        name: A,
                                        instance: h
                                    }) || a)
                                }
                            }
                        }
                    },
                    update: (s = function() {
                        return new Promise(function(e) {
                            h.forceUpdate(),
                            e(a)
                        }
                        )
                    }
                    ,
                    function() {
                        return o || (o = new Promise(function(e) {
                            Promise.resolve().then(function() {
                                o = void 0,
                                e(s())
                            })
                        }
                        )),
                        o
                    }
                    ),
                    destroy: function() {
                        d(),
                        c = !0
                    }
                };
                if (!eT(e, t))
                    return h;
                function d() {
                    l.forEach(function(e) {
                        return e()
                    }),
                    l = []
                }
                return h.setOptions(i).then(function(e) {
                    !c && i.onFirstUpdate && i.onFirstUpdate(e)
                }),
                h
            }
        }
        var ex = eO()
          , ek = eO({
            defaultModifiers: [es, eA, ei, $, ew, e_, eE, J, ey]
        })
          , eL = eO({
            defaultModifiers: [es, eA, ei, $]
        })
    }
    ,
    81531: function(e, t, i) {
        e.exports = function(e) {
            "use strict";
            let t = function(e) {
                let t = Object.create(null, {
                    [Symbol.toStringTag]: {
                        value: "Module"
                    }
                });
                if (e) {
                    for (let i in e)
                        if ("default" !== i) {
                            let n = Object.getOwnPropertyDescriptor(e, i);
                            Object.defineProperty(t, i, n.get ? n : {
                                enumerable: !0,
                                get: () => e[i]
                            })
                        }
                }
                return t.default = e,
                Object.freeze(t)
            }(e)
              , i = new Map
              , n = {
                set(e, t, n) {
                    i.has(e) || i.set(e, new Map);
                    let s = i.get(e);
                    if (!s.has(t) && 0 !== s.size)
                        return void console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`);
                    s.set(t, n)
                },
                get: (e, t) => i.has(e) && i.get(e).get(t) || null,
                remove(e, t) {
                    if (!i.has(e))
                        return;
                    let n = i.get(e);
                    n.delete(t),
                    0 === n.size && i.delete(e)
                }
            }
              , s = "transitionend"
              , r = e => (e && window.CSS && window.CSS.escape && (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
            e)
              , o = e => null == e ? `${e}` : Object.prototype.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase()
              , a = e => {
                do
                    e += Math.floor(1e6 * Math.random());
                while (document.getElementById(e));
                return e
            }
              , l = e => {
                if (!e)
                    return 0;
                let {transitionDuration: t, transitionDelay: i} = window.getComputedStyle(e)
                  , n = Number.parseFloat(t)
                  , s = Number.parseFloat(i);
                return n || s ? (t = t.split(",")[0],
                i = i.split(",")[0],
                (Number.parseFloat(t) + Number.parseFloat(i)) * 1e3) : 0
            }
              , c = e => {
                e.dispatchEvent(new Event(s))
            }
              , h = e => !!e && "object" == typeof e && (void 0 !== e.jquery && (e = e[0]),
            void 0 !== e.nodeType)
              , d = e => h(e) ? e.jquery ? e[0] : e : "string" == typeof e && e.length > 0 ? document.querySelector(r(e)) : null
              , u = e => {
                if (!h(e) || 0 === e.getClientRects().length)
                    return !1;
                let t = "visible" === getComputedStyle(e).getPropertyValue("visibility")
                  , i = e.closest("details:not([open])");
                if (!i)
                    return t;
                if (i !== e) {
                    let t = e.closest("summary");
                    if (t && t.parentNode !== i || null === t)
                        return !1
                }
                return t
            }
              , f = e => !!(!e || e.nodeType !== Node.ELEMENT_NODE || e.classList.contains("disabled")) || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled"))
              , p = e => {
                if (!document.documentElement.attachShadow)
                    return null;
                if ("function" == typeof e.getRootNode) {
                    let t = e.getRootNode();
                    return t instanceof ShadowRoot ? t : null
                }
                return e instanceof ShadowRoot ? e : e.parentNode ? p(e.parentNode) : null
            }
              , m = () => {}
              , g = e => {
                e.offsetHeight
            }
              , _ = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null
              , b = []
              , v = e => {
                "loading" === document.readyState ? (b.length || document.addEventListener("DOMContentLoaded", () => {
                    for (let e of b)
                        e()
                }
                ),
                b.push(e)) : e()
            }
              , y = () => "rtl" === document.documentElement.dir
              , w = e => {
                v( () => {
                    let t = _();
                    if (t) {
                        let i = e.NAME
                          , n = t.fn[i];
                        t.fn[i] = e.jQueryInterface,
                        t.fn[i].Constructor = e,
                        t.fn[i].noConflict = () => (t.fn[i] = n,
                        e.jQueryInterface)
                    }
                }
                )
            }
              , A = (e, t=[], i=e) => "function" == typeof e ? e(...t) : i
              , E = (e, t, i=!0) => {
                if (!i)
                    return void A(e);
                let n = l(t) + 5
                  , r = !1
                  , o = ({target: i}) => {
                    i === t && (r = !0,
                    t.removeEventListener(s, o),
                    A(e))
                }
                ;
                t.addEventListener(s, o),
                setTimeout( () => {
                    r || c(t)
                }
                , n)
            }
              , C = (e, t, i, n) => {
                let s = e.length
                  , r = e.indexOf(t);
                return -1 === r ? !i && n ? e[s - 1] : e[0] : (r += i ? 1 : -1,
                n && (r = (r + s) % s),
                e[Math.max(0, Math.min(r, s - 1))])
            }
              , T = /[^.]*(?=\..*)\.|.*/
              , O = /\..*/
              , x = /::\d+$/
              , k = {}
              , L = 1
              , S = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }
              , D = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
            function $(e, t) {
                return t && `${t}::${L++}` || e.uidEvent || L++
            }
            function I(e) {
                let t = $(e);
                return e.uidEvent = t,
                k[t] = k[t] || {},
                k[t]
            }
            function N(e, t, i=null) {
                return Object.values(e).find(e => e.callable === t && e.delegationSelector === i)
            }
            function P(e, t, i) {
                let n = "string" == typeof t
                  , s = F(e);
                return D.has(s) || (s = e),
                [n, n ? i : t || i, s]
            }
            function j(e, t, i, n, s) {
                var r, o;
                if ("string" != typeof t || !e)
                    return;
                let[a,l,c] = P(t, i, n);
                if (t in S) {
                    let e;
                    e = l,
                    l = function(t) {
                        if (!t.relatedTarget || t.relatedTarget !== t.delegateTarget && !t.delegateTarget.contains(t.relatedTarget))
                            return e.call(this, t)
                    }
                }
                let h = I(e)
                  , d = h[c] || (h[c] = {})
                  , u = N(d, l, a ? i : null);
                if (u) {
                    u.oneOff = u.oneOff && s;
                    return
                }
                let f = $(l, t.replace(T, ""))
                  , p = a ? (r = l,
                function t(n) {
                    let s = e.querySelectorAll(i);
                    for (let {target: o} = n; o && o !== this; o = o.parentNode)
                        for (let a of s)
                            if (a === o)
                                return W(n, {
                                    delegateTarget: o
                                }),
                                t.oneOff && H.off(e, n.type, i, r),
                                r.apply(o, [n])
                }
                ) : (o = l,
                function t(i) {
                    return W(i, {
                        delegateTarget: e
                    }),
                    t.oneOff && H.off(e, i.type, o),
                    o.apply(e, [i])
                }
                );
                p.delegationSelector = a ? i : null,
                p.callable = l,
                p.oneOff = s,
                p.uidEvent = f,
                d[f] = p,
                e.addEventListener(c, p, a)
            }
            function M(e, t, i, n, s) {
                let r = N(t[i], n, s);
                r && (e.removeEventListener(i, r, !!s),
                delete t[i][r.uidEvent])
            }
            function F(e) {
                return S[e = e.replace(O, "")] || e
            }
            let H = {
                on(e, t, i, n) {
                    j(e, t, i, n, !1)
                },
                one(e, t, i, n) {
                    j(e, t, i, n, !0)
                },
                off(e, t, i, n) {
                    if ("string" != typeof t || !e)
                        return;
                    let[s,r,o] = P(t, i, n)
                      , a = o !== t
                      , l = I(e)
                      , c = l[o] || {}
                      , h = t.startsWith(".");
                    if (void 0 !== r) {
                        if (!Object.keys(c).length)
                            return;
                        M(e, l, o, r, s ? i : null);
                        return
                    }
                    if (h)
                        for (let i of Object.keys(l)) {
                            var d = t.slice(1);
                            for (let[t,n] of Object.entries(l[i] || {}))
                                t.includes(d) && M(e, l, i, n.callable, n.delegationSelector)
                        }
                    for (let[i,n] of Object.entries(c)) {
                        let s = i.replace(x, "");
                        (!a || t.includes(s)) && M(e, l, o, n.callable, n.delegationSelector)
                    }
                },
                trigger(e, t, i) {
                    if ("string" != typeof t || !e)
                        return null;
                    let n = _()
                      , s = F(t)
                      , r = null
                      , o = !0
                      , a = !0
                      , l = !1;
                    t !== s && n && (r = n.Event(t, i),
                    n(e).trigger(r),
                    o = !r.isPropagationStopped(),
                    a = !r.isImmediatePropagationStopped(),
                    l = r.isDefaultPrevented());
                    let c = W(new Event(t,{
                        bubbles: o,
                        cancelable: !0
                    }), i);
                    return l && c.preventDefault(),
                    a && e.dispatchEvent(c),
                    c.defaultPrevented && r && r.preventDefault(),
                    c
                }
            };
            function W(e, t={}) {
                for (let[i,n] of Object.entries(t))
                    try {
                        e[i] = n
                    } catch (t) {
                        Object.defineProperty(e, i, {
                            configurable: !0,
                            get: () => n
                        })
                    }
                return e
            }
            function z(e) {
                if ("true" === e)
                    return !0;
                if ("false" === e)
                    return !1;
                if (e === Number(e).toString())
                    return Number(e);
                if ("" === e || "null" === e)
                    return null;
                if ("string" != typeof e)
                    return e;
                try {
                    return JSON.parse(decodeURIComponent(e))
                } catch (t) {
                    return e
                }
            }
            function R(e) {
                return e.replace(/[A-Z]/g, e => `-${e.toLowerCase()}`)
            }
            let B = {
                setDataAttribute(e, t, i) {
                    e.setAttribute(`data-bs-${R(t)}`, i)
                },
                removeDataAttribute(e, t) {
                    e.removeAttribute(`data-bs-${R(t)}`)
                },
                getDataAttributes(e) {
                    if (!e)
                        return {};
                    let t = {};
                    for (let i of Object.keys(e.dataset).filter(e => e.startsWith("bs") && !e.startsWith("bsConfig"))) {
                        let n = i.replace(/^bs/, "");
                        t[n = n.charAt(0).toLowerCase() + n.slice(1, n.length)] = z(e.dataset[i])
                    }
                    return t
                },
                getDataAttribute: (e, t) => z(e.getAttribute(`data-bs-${R(t)}`))
            };
            class q {
                static get Default() {
                    return {}
                }
                static get DefaultType() {
                    return {}
                }
                static get NAME() {
                    throw Error('You have to implement the static method "NAME", for each component!')
                }
                _getConfig(e) {
                    return e = this._mergeConfigObj(e),
                    e = this._configAfterMerge(e),
                    this._typeCheckConfig(e),
                    e
                }
                _configAfterMerge(e) {
                    return e
                }
                _mergeConfigObj(e, t) {
                    let i = h(t) ? B.getDataAttribute(t, "config") : {};
                    return {
                        ...this.constructor.Default,
                        ..."object" == typeof i ? i : {},
                        ...h(t) ? B.getDataAttributes(t) : {},
                        ..."object" == typeof e ? e : {}
                    }
                }
                _typeCheckConfig(e, t=this.constructor.DefaultType) {
                    for (let[i,n] of Object.entries(t)) {
                        let t = e[i]
                          , s = h(t) ? "element" : o(t);
                        if (!new RegExp(n).test(s))
                            throw TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${s}" but expected type "${n}".`)
                    }
                }
            }
            class V extends q {
                constructor(e, t) {
                    if (super(),
                    !(e = d(e)))
                        return;
                    this._element = e,
                    this._config = this._getConfig(t),
                    n.set(this._element, this.constructor.DATA_KEY, this)
                }
                dispose() {
                    for (let e of (n.remove(this._element, this.constructor.DATA_KEY),
                    H.off(this._element, this.constructor.EVENT_KEY),
                    Object.getOwnPropertyNames(this)))
                        this[e] = null
                }
                _queueCallback(e, t, i=!0) {
                    E(e, t, i)
                }
                _getConfig(e) {
                    return e = this._mergeConfigObj(e, this._element),
                    e = this._configAfterMerge(e),
                    this._typeCheckConfig(e),
                    e
                }
                static getInstance(e) {
                    return n.get(d(e), this.DATA_KEY)
                }
                static getOrCreateInstance(e, t={}) {
                    return this.getInstance(e) || new this(e,"object" == typeof t ? t : null)
                }
                static get VERSION() {
                    return "5.3.3"
                }
                static get DATA_KEY() {
                    return `bs.${this.NAME}`
                }
                static get EVENT_KEY() {
                    return `.${this.DATA_KEY}`
                }
                static eventName(e) {
                    return `${e}${this.EVENT_KEY}`
                }
            }
            let K = e => {
                let t = e.getAttribute("data-bs-target");
                if (!t || "#" === t) {
                    let i = e.getAttribute("href");
                    if (!i || !i.includes("#") && !i.startsWith("."))
                        return null;
                    i.includes("#") && !i.startsWith("#") && (i = `#${i.split("#")[1]}`),
                    t = i && "#" !== i ? i.trim() : null
                }
                return t ? t.split(",").map(e => r(e)).join(",") : null
            }
              , Q = {
                find: (e, t=document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(t, e)),
                findOne: (e, t=document.documentElement) => Element.prototype.querySelector.call(t, e),
                children: (e, t) => [].concat(...e.children).filter(e => e.matches(t)),
                parents(e, t) {
                    let i = []
                      , n = e.parentNode.closest(t);
                    for (; n; )
                        i.push(n),
                        n = n.parentNode.closest(t);
                    return i
                },
                prev(e, t) {
                    let i = e.previousElementSibling;
                    for (; i; ) {
                        if (i.matches(t))
                            return [i];
                        i = i.previousElementSibling
                    }
                    return []
                },
                next(e, t) {
                    let i = e.nextElementSibling;
                    for (; i; ) {
                        if (i.matches(t))
                            return [i];
                        i = i.nextElementSibling
                    }
                    return []
                },
                focusableChildren(e) {
                    let t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map(e => `${e}:not([tabindex^="-"])`).join(",");
                    return this.find(t, e).filter(e => !f(e) && u(e))
                },
                getSelectorFromElement(e) {
                    let t = K(e);
                    return t && Q.findOne(t) ? t : null
                },
                getElementFromSelector(e) {
                    let t = K(e);
                    return t ? Q.findOne(t) : null
                },
                getMultipleElementsFromSelector(e) {
                    let t = K(e);
                    return t ? Q.find(t) : []
                }
            }
              , X = (e, t="hide") => {
                let i = `click.dismiss${e.EVENT_KEY}`
                  , n = e.NAME;
                H.on(document, i, `[data-bs-dismiss="${n}"]`, function(i) {
                    if (["A", "AREA"].includes(this.tagName) && i.preventDefault(),
                    f(this))
                        return;
                    let s = Q.getElementFromSelector(this) || this.closest(`.${n}`);
                    e.getOrCreateInstance(s)[t]()
                })
            }
              , Y = ".bs.alert"
              , U = `close${Y}`
              , G = `closed${Y}`;
            class J extends V {
                static get NAME() {
                    return "alert"
                }
                close() {
                    if (H.trigger(this._element, U).defaultPrevented)
                        return;
                    this._element.classList.remove("show");
                    let e = this._element.classList.contains("fade");
                    this._queueCallback( () => this._destroyElement(), this._element, e)
                }
                _destroyElement() {
                    this._element.remove(),
                    H.trigger(this._element, G),
                    this.dispose()
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = J.getOrCreateInstance(this);
                        if ("string" == typeof e) {
                            if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                                throw TypeError(`No method named "${e}"`);
                            t[e](this)
                        }
                    })
                }
            }
            X(J, "close"),
            w(J);
            let Z = '[data-bs-toggle="button"]'
              , ee = "click.bs.button.data-api";
            class et extends V {
                static get NAME() {
                    return "button"
                }
                toggle() {
                    this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"))
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = et.getOrCreateInstance(this);
                        "toggle" === e && t[e]()
                    })
                }
            }
            H.on(document, ee, Z, e => {
                e.preventDefault();
                let t = e.target.closest(Z);
                et.getOrCreateInstance(t).toggle()
            }
            ),
            w(et);
            let ei = ".bs.swipe"
              , en = `touchstart${ei}`
              , es = `touchmove${ei}`
              , er = `touchend${ei}`
              , eo = `pointerdown${ei}`
              , ea = `pointerup${ei}`
              , el = {
                endCallback: null,
                leftCallback: null,
                rightCallback: null
            }
              , ec = {
                endCallback: "(function|null)",
                leftCallback: "(function|null)",
                rightCallback: "(function|null)"
            };
            class eh extends q {
                constructor(e, t) {
                    if (super(),
                    this._element = e,
                    !e || !eh.isSupported())
                        return;
                    this._config = this._getConfig(t),
                    this._deltaX = 0,
                    this._supportPointerEvents = !!window.PointerEvent,
                    this._initEvents()
                }
                static get Default() {
                    return el
                }
                static get DefaultType() {
                    return ec
                }
                static get NAME() {
                    return "swipe"
                }
                dispose() {
                    H.off(this._element, ei)
                }
                _start(e) {
                    if (!this._supportPointerEvents) {
                        this._deltaX = e.touches[0].clientX;
                        return
                    }
                    this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
                }
                _end(e) {
                    this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX),
                    this._handleSwipe(),
                    A(this._config.endCallback)
                }
                _move(e) {
                    this._deltaX = e.touches && e.touches.length > 1 ? 0 : e.touches[0].clientX - this._deltaX
                }
                _handleSwipe() {
                    let e = Math.abs(this._deltaX);
                    if (e <= 40)
                        return;
                    let t = e / this._deltaX;
                    this._deltaX = 0,
                    t && A(t > 0 ? this._config.rightCallback : this._config.leftCallback)
                }
                _initEvents() {
                    this._supportPointerEvents ? (H.on(this._element, eo, e => this._start(e)),
                    H.on(this._element, ea, e => this._end(e)),
                    this._element.classList.add("pointer-event")) : (H.on(this._element, en, e => this._start(e)),
                    H.on(this._element, es, e => this._move(e)),
                    H.on(this._element, er, e => this._end(e)))
                }
                _eventIsPointerPenTouch(e) {
                    return this._supportPointerEvents && ("pen" === e.pointerType || "touch" === e.pointerType)
                }
                static isSupported() {
                    return "ontouchstart"in document.documentElement || navigator.maxTouchPoints > 0
                }
            }
            let ed = ".bs.carousel"
              , eu = ".data-api"
              , ef = "next"
              , ep = "prev"
              , em = "left"
              , eg = "right"
              , e_ = `slide${ed}`
              , eb = `slid${ed}`
              , ev = `keydown${ed}`
              , ey = `mouseenter${ed}`
              , ew = `mouseleave${ed}`
              , eA = `dragstart${ed}`
              , eE = `load${ed}${eu}`
              , eC = `click${ed}${eu}`
              , eT = "carousel"
              , eO = "active"
              , ex = ".active"
              , ek = ".carousel-item"
              , eL = ex + ek
              , eS = {
                ArrowLeft: eg,
                ArrowRight: em
            }
              , eD = {
                interval: 5e3,
                keyboard: !0,
                pause: "hover",
                ride: !1,
                touch: !0,
                wrap: !0
            }
              , e$ = {
                interval: "(number|boolean)",
                keyboard: "boolean",
                pause: "(string|boolean)",
                ride: "(boolean|string)",
                touch: "boolean",
                wrap: "boolean"
            };
            class eI extends V {
                constructor(e, t) {
                    super(e, t),
                    this._interval = null,
                    this._activeElement = null,
                    this._isSliding = !1,
                    this.touchTimeout = null,
                    this._swipeHelper = null,
                    this._indicatorsElement = Q.findOne(".carousel-indicators", this._element),
                    this._addEventListeners(),
                    this._config.ride === eT && this.cycle()
                }
                static get Default() {
                    return eD
                }
                static get DefaultType() {
                    return e$
                }
                static get NAME() {
                    return "carousel"
                }
                next() {
                    this._slide(ef)
                }
                nextWhenVisible() {
                    !document.hidden && u(this._element) && this.next()
                }
                prev() {
                    this._slide(ep)
                }
                pause() {
                    this._isSliding && c(this._element),
                    this._clearInterval()
                }
                cycle() {
                    this._clearInterval(),
                    this._updateInterval(),
                    this._interval = setInterval( () => this.nextWhenVisible(), this._config.interval)
                }
                _maybeEnableCycle() {
                    if (this._config.ride) {
                        if (this._isSliding)
                            return void H.one(this._element, eb, () => this.cycle());
                        this.cycle()
                    }
                }
                to(e) {
                    let t = this._getItems();
                    if (e > t.length - 1 || e < 0)
                        return;
                    if (this._isSliding)
                        return void H.one(this._element, eb, () => this.to(e));
                    let i = this._getItemIndex(this._getActive());
                    i !== e && this._slide(e > i ? ef : ep, t[e])
                }
                dispose() {
                    this._swipeHelper && this._swipeHelper.dispose(),
                    super.dispose()
                }
                _configAfterMerge(e) {
                    return e.defaultInterval = e.interval,
                    e
                }
                _addEventListeners() {
                    this._config.keyboard && H.on(this._element, ev, e => this._keydown(e)),
                    "hover" === this._config.pause && (H.on(this._element, ey, () => this.pause()),
                    H.on(this._element, ew, () => this._maybeEnableCycle())),
                    this._config.touch && eh.isSupported() && this._addTouchEventListeners()
                }
                _addTouchEventListeners() {
                    for (let e of Q.find(".carousel-item img", this._element))
                        H.on(e, eA, e => e.preventDefault());
                    this._swipeHelper = new eh(this._element,{
                        leftCallback: () => this._slide(this._directionToOrder(em)),
                        rightCallback: () => this._slide(this._directionToOrder(eg)),
                        endCallback: () => {
                            "hover" === this._config.pause && (this.pause(),
                            this.touchTimeout && clearTimeout(this.touchTimeout),
                            this.touchTimeout = setTimeout( () => this._maybeEnableCycle(), 500 + this._config.interval))
                        }
                    })
                }
                _keydown(e) {
                    if (/input|textarea/i.test(e.target.tagName))
                        return;
                    let t = eS[e.key];
                    t && (e.preventDefault(),
                    this._slide(this._directionToOrder(t)))
                }
                _getItemIndex(e) {
                    return this._getItems().indexOf(e)
                }
                _setActiveIndicatorElement(e) {
                    if (!this._indicatorsElement)
                        return;
                    let t = Q.findOne(ex, this._indicatorsElement);
                    t.classList.remove(eO),
                    t.removeAttribute("aria-current");
                    let i = Q.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
                    i && (i.classList.add(eO),
                    i.setAttribute("aria-current", "true"))
                }
                _updateInterval() {
                    let e = this._activeElement || this._getActive();
                    if (!e)
                        return;
                    let t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
                    this._config.interval = t || this._config.defaultInterval
                }
                _slide(e, t=null) {
                    if (this._isSliding)
                        return;
                    let i = this._getActive()
                      , n = e === ef
                      , s = t || C(this._getItems(), i, n, this._config.wrap);
                    if (s === i)
                        return;
                    let r = this._getItemIndex(s)
                      , o = t => H.trigger(this._element, t, {
                        relatedTarget: s,
                        direction: this._orderToDirection(e),
                        from: this._getItemIndex(i),
                        to: r
                    });
                    if (o(e_).defaultPrevented || !i || !s)
                        return;
                    let a = !!this._interval;
                    this.pause(),
                    this._isSliding = !0,
                    this._setActiveIndicatorElement(r),
                    this._activeElement = s;
                    let l = n ? "carousel-item-start" : "carousel-item-end"
                      , c = n ? "carousel-item-next" : "carousel-item-prev";
                    s.classList.add(c),
                    g(s),
                    i.classList.add(l),
                    s.classList.add(l),
                    this._queueCallback( () => {
                        s.classList.remove(l, c),
                        s.classList.add(eO),
                        i.classList.remove(eO, c, l),
                        this._isSliding = !1,
                        o(eb)
                    }
                    , i, this._isAnimated()),
                    a && this.cycle()
                }
                _isAnimated() {
                    return this._element.classList.contains("slide")
                }
                _getActive() {
                    return Q.findOne(eL, this._element)
                }
                _getItems() {
                    return Q.find(ek, this._element)
                }
                _clearInterval() {
                    this._interval && (clearInterval(this._interval),
                    this._interval = null)
                }
                _directionToOrder(e) {
                    return y() ? e === em ? ep : ef : e === em ? ef : ep
                }
                _orderToDirection(e) {
                    return y() ? e === ep ? em : eg : e === ep ? eg : em
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = eI.getOrCreateInstance(this, e);
                        if ("number" == typeof e)
                            return void t.to(e);
                        if ("string" == typeof e) {
                            if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                                throw TypeError(`No method named "${e}"`);
                            t[e]()
                        }
                    })
                }
            }
            H.on(document, eC, "[data-bs-slide], [data-bs-slide-to]", function(e) {
                let t = Q.getElementFromSelector(this);
                if (!t || !t.classList.contains(eT))
                    return;
                e.preventDefault();
                let i = eI.getOrCreateInstance(t)
                  , n = this.getAttribute("data-bs-slide-to");
                if (n) {
                    i.to(n),
                    i._maybeEnableCycle();
                    return
                }
                if ("next" === B.getDataAttribute(this, "slide")) {
                    i.next(),
                    i._maybeEnableCycle();
                    return
                }
                i.prev(),
                i._maybeEnableCycle()
            }),
            H.on(window, eE, () => {
                for (let e of Q.find('[data-bs-ride="carousel"]'))
                    eI.getOrCreateInstance(e)
            }
            ),
            w(eI);
            let eN = ".bs.collapse"
              , eP = `show${eN}`
              , ej = `shown${eN}`
              , eM = `hide${eN}`
              , eF = `hidden${eN}`
              , eH = `click${eN}.data-api`
              , eW = "show"
              , ez = "collapse"
              , eR = "collapsing"
              , eB = `:scope .${ez} .${ez}`
              , eq = '[data-bs-toggle="collapse"]'
              , eV = {
                parent: null,
                toggle: !0
            }
              , eK = {
                parent: "(null|element)",
                toggle: "boolean"
            };
            class eQ extends V {
                constructor(e, t) {
                    for (let i of (super(e, t),
                    this._isTransitioning = !1,
                    this._triggerArray = [],
                    Q.find(eq))) {
                        let e = Q.getSelectorFromElement(i)
                          , t = Q.find(e).filter(e => e === this._element);
                        null !== e && t.length && this._triggerArray.push(i)
                    }
                    this._initializeChildren(),
                    this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
                    this._config.toggle && this.toggle()
                }
                static get Default() {
                    return eV
                }
                static get DefaultType() {
                    return eK
                }
                static get NAME() {
                    return "collapse"
                }
                toggle() {
                    this._isShown() ? this.hide() : this.show()
                }
                show() {
                    if (this._isTransitioning || this._isShown())
                        return;
                    let e = [];
                    if (this._config.parent && (e = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter(e => e !== this._element).map(e => eQ.getOrCreateInstance(e, {
                        toggle: !1
                    }))),
                    e.length && e[0]._isTransitioning || H.trigger(this._element, eP).defaultPrevented)
                        return;
                    for (let t of e)
                        t.hide();
                    let t = this._getDimension();
                    this._element.classList.remove(ez),
                    this._element.classList.add(eR),
                    this._element.style[t] = 0,
                    this._addAriaAndCollapsedClass(this._triggerArray, !0),
                    this._isTransitioning = !0;
                    let i = t[0].toUpperCase() + t.slice(1)
                      , n = `scroll${i}`;
                    this._queueCallback( () => {
                        this._isTransitioning = !1,
                        this._element.classList.remove(eR),
                        this._element.classList.add(ez, eW),
                        this._element.style[t] = "",
                        H.trigger(this._element, ej)
                    }
                    , this._element, !0),
                    this._element.style[t] = `${this._element[n]}px`
                }
                hide() {
                    if (this._isTransitioning || !this._isShown() || H.trigger(this._element, eM).defaultPrevented)
                        return;
                    let e = this._getDimension();
                    for (let t of (this._element.style[e] = `${this._element.getBoundingClientRect()[e]}px`,
                    g(this._element),
                    this._element.classList.add(eR),
                    this._element.classList.remove(ez, eW),
                    this._triggerArray)) {
                        let e = Q.getElementFromSelector(t);
                        e && !this._isShown(e) && this._addAriaAndCollapsedClass([t], !1)
                    }
                    this._isTransitioning = !0,
                    this._element.style[e] = "",
                    this._queueCallback( () => {
                        this._isTransitioning = !1,
                        this._element.classList.remove(eR),
                        this._element.classList.add(ez),
                        H.trigger(this._element, eF)
                    }
                    , this._element, !0)
                }
                _isShown(e=this._element) {
                    return e.classList.contains(eW)
                }
                _configAfterMerge(e) {
                    return e.toggle = !!e.toggle,
                    e.parent = d(e.parent),
                    e
                }
                _getDimension() {
                    return this._element.classList.contains("collapse-horizontal") ? "width" : "height"
                }
                _initializeChildren() {
                    if (this._config.parent)
                        for (let e of this._getFirstLevelChildren(eq)) {
                            let t = Q.getElementFromSelector(e);
                            t && this._addAriaAndCollapsedClass([e], this._isShown(t))
                        }
                }
                _getFirstLevelChildren(e) {
                    let t = Q.find(eB, this._config.parent);
                    return Q.find(e, this._config.parent).filter(e => !t.includes(e))
                }
                _addAriaAndCollapsedClass(e, t) {
                    if (e.length)
                        for (let i of e)
                            i.classList.toggle("collapsed", !t),
                            i.setAttribute("aria-expanded", t)
                }
                static jQueryInterface(e) {
                    let t = {};
                    return "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1),
                    this.each(function() {
                        let i = eQ.getOrCreateInstance(this, t);
                        if ("string" == typeof e) {
                            if (void 0 === i[e])
                                throw TypeError(`No method named "${e}"`);
                            i[e]()
                        }
                    })
                }
            }
            H.on(document, eH, eq, function(e) {
                for (let t of (("A" === e.target.tagName || e.delegateTarget && "A" === e.delegateTarget.tagName) && e.preventDefault(),
                Q.getMultipleElementsFromSelector(this)))
                    eQ.getOrCreateInstance(t, {
                        toggle: !1
                    }).toggle()
            }),
            w(eQ);
            let eX = "dropdown"
              , eY = ".bs.dropdown"
              , eU = ".data-api"
              , eG = "ArrowDown"
              , eJ = `hide${eY}`
              , eZ = `hidden${eY}`
              , e0 = `show${eY}`
              , e1 = `shown${eY}`
              , e2 = `click${eY}${eU}`
              , e3 = `keydown${eY}${eU}`
              , e5 = `keyup${eY}${eU}`
              , e4 = "show"
              , e8 = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)'
              , e6 = `${e8}.${e4}`
              , e9 = ".dropdown-menu"
              , e7 = y() ? "top-end" : "top-start"
              , te = y() ? "top-start" : "top-end"
              , tt = y() ? "bottom-end" : "bottom-start"
              , ti = y() ? "bottom-start" : "bottom-end"
              , tn = y() ? "left-start" : "right-start"
              , ts = y() ? "right-start" : "left-start"
              , tr = {
                autoClose: !0,
                boundary: "clippingParents",
                display: "dynamic",
                offset: [0, 2],
                popperConfig: null,
                reference: "toggle"
            }
              , to = {
                autoClose: "(boolean|string)",
                boundary: "(string|element)",
                display: "string",
                offset: "(array|string|function)",
                popperConfig: "(null|object|function)",
                reference: "(string|element|object)"
            };
            class ta extends V {
                constructor(e, t) {
                    super(e, t),
                    this._popper = null,
                    this._parent = this._element.parentNode,
                    this._menu = Q.next(this._element, e9)[0] || Q.prev(this._element, e9)[0] || Q.findOne(e9, this._parent),
                    this._inNavbar = this._detectNavbar()
                }
                static get Default() {
                    return tr
                }
                static get DefaultType() {
                    return to
                }
                static get NAME() {
                    return eX
                }
                toggle() {
                    return this._isShown() ? this.hide() : this.show()
                }
                show() {
                    if (f(this._element) || this._isShown())
                        return;
                    let e = {
                        relatedTarget: this._element
                    };
                    if (!H.trigger(this._element, e0, e).defaultPrevented) {
                        if (this._createPopper(),
                        "ontouchstart"in document.documentElement && !this._parent.closest(".navbar-nav"))
                            for (let e of [].concat(...document.body.children))
                                H.on(e, "mouseover", m);
                        this._element.focus(),
                        this._element.setAttribute("aria-expanded", !0),
                        this._menu.classList.add(e4),
                        this._element.classList.add(e4),
                        H.trigger(this._element, e1, e)
                    }
                }
                hide() {
                    if (f(this._element) || !this._isShown())
                        return;
                    let e = {
                        relatedTarget: this._element
                    };
                    this._completeHide(e)
                }
                dispose() {
                    this._popper && this._popper.destroy(),
                    super.dispose()
                }
                update() {
                    this._inNavbar = this._detectNavbar(),
                    this._popper && this._popper.update()
                }
                _completeHide(e) {
                    if (!H.trigger(this._element, eJ, e).defaultPrevented) {
                        if ("ontouchstart"in document.documentElement)
                            for (let e of [].concat(...document.body.children))
                                H.off(e, "mouseover", m);
                        this._popper && this._popper.destroy(),
                        this._menu.classList.remove(e4),
                        this._element.classList.remove(e4),
                        this._element.setAttribute("aria-expanded", "false"),
                        B.removeDataAttribute(this._menu, "popper"),
                        H.trigger(this._element, eZ, e)
                    }
                }
                _getConfig(e) {
                    if ("object" == typeof (e = super._getConfig(e)).reference && !h(e.reference) && "function" != typeof e.reference.getBoundingClientRect)
                        throw TypeError(`${eX.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
                    return e
                }
                _createPopper() {
                    if (void 0 === t)
                        throw TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
                    let e = this._element;
                    "parent" === this._config.reference ? e = this._parent : h(this._config.reference) ? e = d(this._config.reference) : "object" == typeof this._config.reference && (e = this._config.reference);
                    let i = this._getPopperConfig();
                    this._popper = t.createPopper(e, this._menu, i)
                }
                _isShown() {
                    return this._menu.classList.contains(e4)
                }
                _getPlacement() {
                    let e = this._parent;
                    if (e.classList.contains("dropend"))
                        return tn;
                    if (e.classList.contains("dropstart"))
                        return ts;
                    if (e.classList.contains("dropup-center"))
                        return "top";
                    if (e.classList.contains("dropdown-center"))
                        return "bottom";
                    let t = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
                    return e.classList.contains("dropup") ? t ? te : e7 : t ? ti : tt
                }
                _detectNavbar() {
                    return null !== this._element.closest(".navbar")
                }
                _getOffset() {
                    let {offset: e} = this._config;
                    return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
                }
                _getPopperConfig() {
                    let e = {
                        placement: this._getPlacement(),
                        modifiers: [{
                            name: "preventOverflow",
                            options: {
                                boundary: this._config.boundary
                            }
                        }, {
                            name: "offset",
                            options: {
                                offset: this._getOffset()
                            }
                        }]
                    };
                    return (this._inNavbar || "static" === this._config.display) && (B.setDataAttribute(this._menu, "popper", "static"),
                    e.modifiers = [{
                        name: "applyStyles",
                        enabled: !1
                    }]),
                    {
                        ...e,
                        ...A(this._config.popperConfig, [e])
                    }
                }
                _selectMenuItem({key: e, target: t}) {
                    let i = Q.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter(e => u(e));
                    i.length && C(i, t, e === eG, !i.includes(t)).focus()
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = ta.getOrCreateInstance(this, e);
                        if ("string" == typeof e) {
                            if (void 0 === t[e])
                                throw TypeError(`No method named "${e}"`);
                            t[e]()
                        }
                    })
                }
                static clearMenus(e) {
                    if (2 !== e.button && ("keyup" !== e.type || "Tab" === e.key))
                        for (let t of Q.find(e6)) {
                            let i = ta.getInstance(t);
                            if (!i || !1 === i._config.autoClose)
                                continue;
                            let n = e.composedPath()
                              , s = n.includes(i._menu);
                            if (n.includes(i._element) || "inside" === i._config.autoClose && !s || "outside" === i._config.autoClose && s || i._menu.contains(e.target) && ("keyup" === e.type && "Tab" === e.key || /input|select|option|textarea|form/i.test(e.target.tagName)))
                                continue;
                            let r = {
                                relatedTarget: i._element
                            };
                            "click" === e.type && (r.clickEvent = e),
                            i._completeHide(r)
                        }
                }
                static dataApiKeydownHandler(e) {
                    let t = /input|textarea/i.test(e.target.tagName)
                      , i = "Escape" === e.key
                      , n = ["ArrowUp", eG].includes(e.key);
                    if (!n && !i || t && !i)
                        return;
                    e.preventDefault();
                    let s = this.matches(e8) ? this : Q.prev(this, e8)[0] || Q.next(this, e8)[0] || Q.findOne(e8, e.delegateTarget.parentNode)
                      , r = ta.getOrCreateInstance(s);
                    if (n) {
                        e.stopPropagation(),
                        r.show(),
                        r._selectMenuItem(e);
                        return
                    }
                    r._isShown() && (e.stopPropagation(),
                    r.hide(),
                    s.focus())
                }
            }
            H.on(document, e3, e8, ta.dataApiKeydownHandler),
            H.on(document, e3, e9, ta.dataApiKeydownHandler),
            H.on(document, e2, ta.clearMenus),
            H.on(document, e5, ta.clearMenus),
            H.on(document, e2, e8, function(e) {
                e.preventDefault(),
                ta.getOrCreateInstance(this).toggle()
            }),
            w(ta);
            let tl = "backdrop"
              , tc = "show"
              , th = `mousedown.bs.${tl}`
              , td = {
                className: "modal-backdrop",
                clickCallback: null,
                isAnimated: !1,
                isVisible: !0,
                rootElement: "body"
            }
              , tu = {
                className: "string",
                clickCallback: "(function|null)",
                isAnimated: "boolean",
                isVisible: "boolean",
                rootElement: "(element|string)"
            };
            class tf extends q {
                constructor(e) {
                    super(),
                    this._config = this._getConfig(e),
                    this._isAppended = !1,
                    this._element = null
                }
                static get Default() {
                    return td
                }
                static get DefaultType() {
                    return tu
                }
                static get NAME() {
                    return tl
                }
                show(e) {
                    if (!this._config.isVisible)
                        return void A(e);
                    this._append();
                    let t = this._getElement();
                    this._config.isAnimated && g(t),
                    t.classList.add(tc),
                    this._emulateAnimation( () => {
                        A(e)
                    }
                    )
                }
                hide(e) {
                    if (!this._config.isVisible)
                        return void A(e);
                    this._getElement().classList.remove(tc),
                    this._emulateAnimation( () => {
                        this.dispose(),
                        A(e)
                    }
                    )
                }
                dispose() {
                    this._isAppended && (H.off(this._element, th),
                    this._element.remove(),
                    this._isAppended = !1)
                }
                _getElement() {
                    if (!this._element) {
                        let e = document.createElement("div");
                        e.className = this._config.className,
                        this._config.isAnimated && e.classList.add("fade"),
                        this._element = e
                    }
                    return this._element
                }
                _configAfterMerge(e) {
                    return e.rootElement = d(e.rootElement),
                    e
                }
                _append() {
                    if (this._isAppended)
                        return;
                    let e = this._getElement();
                    this._config.rootElement.append(e),
                    H.on(e, th, () => {
                        A(this._config.clickCallback)
                    }
                    ),
                    this._isAppended = !0
                }
                _emulateAnimation(e) {
                    E(e, this._getElement(), this._config.isAnimated)
                }
            }
            let tp = ".bs.focustrap"
              , tm = `focusin${tp}`
              , tg = `keydown.tab${tp}`
              , t_ = "backward"
              , tb = {
                autofocus: !0,
                trapElement: null
            }
              , tv = {
                autofocus: "boolean",
                trapElement: "element"
            };
            class ty extends q {
                constructor(e) {
                    super(),
                    this._config = this._getConfig(e),
                    this._isActive = !1,
                    this._lastTabNavDirection = null
                }
                static get Default() {
                    return tb
                }
                static get DefaultType() {
                    return tv
                }
                static get NAME() {
                    return "focustrap"
                }
                activate() {
                    this._isActive || (this._config.autofocus && this._config.trapElement.focus(),
                    H.off(document, tp),
                    H.on(document, tm, e => this._handleFocusin(e)),
                    H.on(document, tg, e => this._handleKeydown(e)),
                    this._isActive = !0)
                }
                deactivate() {
                    this._isActive && (this._isActive = !1,
                    H.off(document, tp))
                }
                _handleFocusin(e) {
                    let {trapElement: t} = this._config;
                    if (e.target === document || e.target === t || t.contains(e.target))
                        return;
                    let i = Q.focusableChildren(t);
                    0 === i.length ? t.focus() : this._lastTabNavDirection === t_ ? i[i.length - 1].focus() : i[0].focus()
                }
                _handleKeydown(e) {
                    "Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? t_ : "forward")
                }
            }
            let tw = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"
              , tA = ".sticky-top"
              , tE = "padding-right"
              , tC = "margin-right";
            class tT {
                constructor() {
                    this._element = document.body
                }
                getWidth() {
                    let e = document.documentElement.clientWidth;
                    return Math.abs(window.innerWidth - e)
                }
                hide() {
                    let e = this.getWidth();
                    this._disableOverFlow(),
                    this._setElementAttributes(this._element, tE, t => t + e),
                    this._setElementAttributes(tw, tE, t => t + e),
                    this._setElementAttributes(tA, tC, t => t - e)
                }
                reset() {
                    this._resetElementAttributes(this._element, "overflow"),
                    this._resetElementAttributes(this._element, tE),
                    this._resetElementAttributes(tw, tE),
                    this._resetElementAttributes(tA, tC)
                }
                isOverflowing() {
                    return this.getWidth() > 0
                }
                _disableOverFlow() {
                    this._saveInitialAttribute(this._element, "overflow"),
                    this._element.style.overflow = "hidden"
                }
                _setElementAttributes(e, t, i) {
                    let n = this.getWidth();
                    this._applyManipulationCallback(e, e => {
                        if (e !== this._element && window.innerWidth > e.clientWidth + n)
                            return;
                        this._saveInitialAttribute(e, t);
                        let s = window.getComputedStyle(e).getPropertyValue(t);
                        e.style.setProperty(t, `${i(Number.parseFloat(s))}px`)
                    }
                    )
                }
                _saveInitialAttribute(e, t) {
                    let i = e.style.getPropertyValue(t);
                    i && B.setDataAttribute(e, t, i)
                }
                _resetElementAttributes(e, t) {
                    this._applyManipulationCallback(e, e => {
                        let i = B.getDataAttribute(e, t);
                        if (null === i)
                            return void e.style.removeProperty(t);
                        B.removeDataAttribute(e, t),
                        e.style.setProperty(t, i)
                    }
                    )
                }
                _applyManipulationCallback(e, t) {
                    if (h(e))
                        return void t(e);
                    for (let i of Q.find(e, this._element))
                        t(i)
                }
            }
            let tO = ".bs.modal"
              , tx = `hide${tO}`
              , tk = `hidePrevented${tO}`
              , tL = `hidden${tO}`
              , tS = `show${tO}`
              , tD = `shown${tO}`
              , t$ = `resize${tO}`
              , tI = `click.dismiss${tO}`
              , tN = `mousedown.dismiss${tO}`
              , tP = `keydown.dismiss${tO}`
              , tj = `click${tO}.data-api`
              , tM = "modal-open"
              , tF = "show"
              , tH = "modal-static"
              , tW = {
                backdrop: !0,
                focus: !0,
                keyboard: !0
            }
              , tz = {
                backdrop: "(boolean|string)",
                focus: "boolean",
                keyboard: "boolean"
            };
            class tR extends V {
                constructor(e, t) {
                    super(e, t),
                    this._dialog = Q.findOne(".modal-dialog", this._element),
                    this._backdrop = this._initializeBackDrop(),
                    this._focustrap = this._initializeFocusTrap(),
                    this._isShown = !1,
                    this._isTransitioning = !1,
                    this._scrollBar = new tT,
                    this._addEventListeners()
                }
                static get Default() {
                    return tW
                }
                static get DefaultType() {
                    return tz
                }
                static get NAME() {
                    return "modal"
                }
                toggle(e) {
                    return this._isShown ? this.hide() : this.show(e)
                }
                show(e) {
                    this._isShown || this._isTransitioning || H.trigger(this._element, tS, {
                        relatedTarget: e
                    }).defaultPrevented || (this._isShown = !0,
                    this._isTransitioning = !0,
                    this._scrollBar.hide(),
                    document.body.classList.add(tM),
                    this._adjustDialog(),
                    this._backdrop.show( () => this._showElement(e)))
                }
                hide() {
                    this._isShown && !this._isTransitioning && (H.trigger(this._element, tx).defaultPrevented || (this._isShown = !1,
                    this._isTransitioning = !0,
                    this._focustrap.deactivate(),
                    this._element.classList.remove(tF),
                    this._queueCallback( () => this._hideModal(), this._element, this._isAnimated())))
                }
                dispose() {
                    H.off(window, tO),
                    H.off(this._dialog, tO),
                    this._backdrop.dispose(),
                    this._focustrap.deactivate(),
                    super.dispose()
                }
                handleUpdate() {
                    this._adjustDialog()
                }
                _initializeBackDrop() {
                    return new tf({
                        isVisible: !!this._config.backdrop,
                        isAnimated: this._isAnimated()
                    })
                }
                _initializeFocusTrap() {
                    return new ty({
                        trapElement: this._element
                    })
                }
                _showElement(e) {
                    document.body.contains(this._element) || document.body.append(this._element),
                    this._element.style.display = "block",
                    this._element.removeAttribute("aria-hidden"),
                    this._element.setAttribute("aria-modal", !0),
                    this._element.setAttribute("role", "dialog"),
                    this._element.scrollTop = 0;
                    let t = Q.findOne(".modal-body", this._dialog);
                    t && (t.scrollTop = 0),
                    g(this._element),
                    this._element.classList.add(tF),
                    this._queueCallback( () => {
                        this._config.focus && this._focustrap.activate(),
                        this._isTransitioning = !1,
                        H.trigger(this._element, tD, {
                            relatedTarget: e
                        })
                    }
                    , this._dialog, this._isAnimated())
                }
                _addEventListeners() {
                    H.on(this._element, tP, e => {
                        if ("Escape" === e.key) {
                            if (this._config.keyboard)
                                return void this.hide();
                            this._triggerBackdropTransition()
                        }
                    }
                    ),
                    H.on(window, t$, () => {
                        this._isShown && !this._isTransitioning && this._adjustDialog()
                    }
                    ),
                    H.on(this._element, tN, e => {
                        H.one(this._element, tI, t => {
                            if (this._element === e.target && this._element === t.target) {
                                if ("static" === this._config.backdrop)
                                    return void this._triggerBackdropTransition();
                                this._config.backdrop && this.hide()
                            }
                        }
                        )
                    }
                    )
                }
                _hideModal() {
                    this._element.style.display = "none",
                    this._element.setAttribute("aria-hidden", !0),
                    this._element.removeAttribute("aria-modal"),
                    this._element.removeAttribute("role"),
                    this._isTransitioning = !1,
                    this._backdrop.hide( () => {
                        document.body.classList.remove(tM),
                        this._resetAdjustments(),
                        this._scrollBar.reset(),
                        H.trigger(this._element, tL)
                    }
                    )
                }
                _isAnimated() {
                    return this._element.classList.contains("fade")
                }
                _triggerBackdropTransition() {
                    if (H.trigger(this._element, tk).defaultPrevented)
                        return;
                    let e = this._element.scrollHeight > document.documentElement.clientHeight
                      , t = this._element.style.overflowY;
                    "hidden" === t || this._element.classList.contains(tH) || (e || (this._element.style.overflowY = "hidden"),
                    this._element.classList.add(tH),
                    this._queueCallback( () => {
                        this._element.classList.remove(tH),
                        this._queueCallback( () => {
                            this._element.style.overflowY = t
                        }
                        , this._dialog)
                    }
                    , this._dialog),
                    this._element.focus())
                }
                _adjustDialog() {
                    let e = this._element.scrollHeight > document.documentElement.clientHeight
                      , t = this._scrollBar.getWidth()
                      , i = t > 0;
                    if (i && !e) {
                        let e = y() ? "paddingLeft" : "paddingRight";
                        this._element.style[e] = `${t}px`
                    }
                    if (!i && e) {
                        let e = y() ? "paddingRight" : "paddingLeft";
                        this._element.style[e] = `${t}px`
                    }
                }
                _resetAdjustments() {
                    this._element.style.paddingLeft = "",
                    this._element.style.paddingRight = ""
                }
                static jQueryInterface(e, t) {
                    return this.each(function() {
                        let i = tR.getOrCreateInstance(this, e);
                        if ("string" == typeof e) {
                            if (void 0 === i[e])
                                throw TypeError(`No method named "${e}"`);
                            i[e](t)
                        }
                    })
                }
            }
            H.on(document, tj, '[data-bs-toggle="modal"]', function(e) {
                let t = Q.getElementFromSelector(this);
                ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
                H.one(t, tS, e => {
                    e.defaultPrevented || H.one(t, tL, () => {
                        u(this) && this.focus()
                    }
                    )
                }
                );
                let i = Q.findOne(".modal.show");
                i && tR.getInstance(i).hide(),
                tR.getOrCreateInstance(t).toggle(this)
            }),
            X(tR),
            w(tR);
            let tB = ".bs.offcanvas"
              , tq = ".data-api"
              , tV = `load${tB}${tq}`
              , tK = "show"
              , tQ = "showing"
              , tX = "hiding"
              , tY = ".offcanvas.show"
              , tU = `show${tB}`
              , tG = `shown${tB}`
              , tJ = `hide${tB}`
              , tZ = `hidePrevented${tB}`
              , t0 = `hidden${tB}`
              , t1 = `resize${tB}`
              , t2 = `click${tB}${tq}`
              , t3 = `keydown.dismiss${tB}`
              , t5 = {
                backdrop: !0,
                keyboard: !0,
                scroll: !1
            }
              , t4 = {
                backdrop: "(boolean|string)",
                keyboard: "boolean",
                scroll: "boolean"
            };
            class t8 extends V {
                constructor(e, t) {
                    super(e, t),
                    this._isShown = !1,
                    this._backdrop = this._initializeBackDrop(),
                    this._focustrap = this._initializeFocusTrap(),
                    this._addEventListeners()
                }
                static get Default() {
                    return t5
                }
                static get DefaultType() {
                    return t4
                }
                static get NAME() {
                    return "offcanvas"
                }
                toggle(e) {
                    return this._isShown ? this.hide() : this.show(e)
                }
                show(e) {
                    this._isShown || H.trigger(this._element, tU, {
                        relatedTarget: e
                    }).defaultPrevented || (this._isShown = !0,
                    this._backdrop.show(),
                    this._config.scroll || new tT().hide(),
                    this._element.setAttribute("aria-modal", !0),
                    this._element.setAttribute("role", "dialog"),
                    this._element.classList.add(tQ),
                    this._queueCallback( () => {
                        (!this._config.scroll || this._config.backdrop) && this._focustrap.activate(),
                        this._element.classList.add(tK),
                        this._element.classList.remove(tQ),
                        H.trigger(this._element, tG, {
                            relatedTarget: e
                        })
                    }
                    , this._element, !0))
                }
                hide() {
                    this._isShown && !H.trigger(this._element, tJ).defaultPrevented && (this._focustrap.deactivate(),
                    this._element.blur(),
                    this._isShown = !1,
                    this._element.classList.add(tX),
                    this._backdrop.hide(),
                    this._queueCallback( () => {
                        this._element.classList.remove(tK, tX),
                        this._element.removeAttribute("aria-modal"),
                        this._element.removeAttribute("role"),
                        this._config.scroll || new tT().reset(),
                        H.trigger(this._element, t0)
                    }
                    , this._element, !0))
                }
                dispose() {
                    this._backdrop.dispose(),
                    this._focustrap.deactivate(),
                    super.dispose()
                }
                _initializeBackDrop() {
                    let e = !!this._config.backdrop;
                    return new tf({
                        className: "offcanvas-backdrop",
                        isVisible: e,
                        isAnimated: !0,
                        rootElement: this._element.parentNode,
                        clickCallback: e ? () => {
                            if ("static" === this._config.backdrop)
                                return void H.trigger(this._element, tZ);
                            this.hide()
                        }
                        : null
                    })
                }
                _initializeFocusTrap() {
                    return new ty({
                        trapElement: this._element
                    })
                }
                _addEventListeners() {
                    H.on(this._element, t3, e => {
                        if ("Escape" === e.key) {
                            if (this._config.keyboard)
                                return void this.hide();
                            H.trigger(this._element, tZ)
                        }
                    }
                    )
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = t8.getOrCreateInstance(this, e);
                        if ("string" == typeof e) {
                            if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                                throw TypeError(`No method named "${e}"`);
                            t[e](this)
                        }
                    })
                }
            }
            H.on(document, t2, '[data-bs-toggle="offcanvas"]', function(e) {
                let t = Q.getElementFromSelector(this);
                if (["A", "AREA"].includes(this.tagName) && e.preventDefault(),
                f(this))
                    return;
                H.one(t, t0, () => {
                    u(this) && this.focus()
                }
                );
                let i = Q.findOne(tY);
                i && i !== t && t8.getInstance(i).hide(),
                t8.getOrCreateInstance(t).toggle(this)
            }),
            H.on(window, tV, () => {
                for (let e of Q.find(tY))
                    t8.getOrCreateInstance(e).show()
            }
            ),
            H.on(window, t1, () => {
                for (let e of Q.find("[aria-modal][class*=show][class*=offcanvas-]"))
                    "fixed" !== getComputedStyle(e).position && t8.getOrCreateInstance(e).hide()
            }
            ),
            X(t8),
            w(t8);
            let t6 = {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                dd: [],
                div: [],
                dl: [],
                dt: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            }
              , t9 = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"])
              , t7 = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i
              , ie = (e, t) => {
                let i = e.nodeName.toLowerCase();
                return t.includes(i) ? !t9.has(i) || !!t7.test(e.nodeValue) : t.filter(e => e instanceof RegExp).some(e => e.test(i))
            }
              , it = {
                allowList: t6,
                content: {},
                extraClass: "",
                html: !1,
                sanitize: !0,
                sanitizeFn: null,
                template: "<div></div>"
            }
              , ii = {
                allowList: "object",
                content: "object",
                extraClass: "(string|function)",
                html: "boolean",
                sanitize: "boolean",
                sanitizeFn: "(null|function)",
                template: "string"
            }
              , is = {
                entry: "(string|element|function|null)",
                selector: "(string|element)"
            };
            class ir extends q {
                constructor(e) {
                    super(),
                    this._config = this._getConfig(e)
                }
                static get Default() {
                    return it
                }
                static get DefaultType() {
                    return ii
                }
                static get NAME() {
                    return "TemplateFactory"
                }
                getContent() {
                    return Object.values(this._config.content).map(e => this._resolvePossibleFunction(e)).filter(Boolean)
                }
                hasContent() {
                    return this.getContent().length > 0
                }
                changeContent(e) {
                    return this._checkContent(e),
                    this._config.content = {
                        ...this._config.content,
                        ...e
                    },
                    this
                }
                toHtml() {
                    let e = document.createElement("div");
                    for (let[t,i] of (e.innerHTML = this._maybeSanitize(this._config.template),
                    Object.entries(this._config.content)))
                        this._setContent(e, i, t);
                    let t = e.children[0]
                      , i = this._resolvePossibleFunction(this._config.extraClass);
                    return i && t.classList.add(...i.split(" ")),
                    t
                }
                _typeCheckConfig(e) {
                    super._typeCheckConfig(e),
                    this._checkContent(e.content)
                }
                _checkContent(e) {
                    for (let[t,i] of Object.entries(e))
                        super._typeCheckConfig({
                            selector: t,
                            entry: i
                        }, is)
                }
                _setContent(e, t, i) {
                    let n = Q.findOne(i, e);
                    if (n) {
                        if (!(t = this._resolvePossibleFunction(t)))
                            return void n.remove();
                        if (h(t))
                            return void this._putElementInTemplate(d(t), n);
                        if (this._config.html) {
                            n.innerHTML = this._maybeSanitize(t);
                            return
                        }
                        n.textContent = t
                    }
                }
                _maybeSanitize(e) {
                    return this._config.sanitize ? function(e, t, i) {
                        if (!e.length)
                            return e;
                        if (i && "function" == typeof i)
                            return i(e);
                        let n = new window.DOMParser().parseFromString(e, "text/html");
                        for (let e of [].concat(...n.body.querySelectorAll("*"))) {
                            let i = e.nodeName.toLowerCase();
                            if (!Object.keys(t).includes(i)) {
                                e.remove();
                                continue
                            }
                            let n = [].concat(...e.attributes)
                              , s = [].concat(t["*"] || [], t[i] || []);
                            for (let t of n)
                                ie(t, s) || e.removeAttribute(t.nodeName)
                        }
                        return n.body.innerHTML
                    }(e, this._config.allowList, this._config.sanitizeFn) : e
                }
                _resolvePossibleFunction(e) {
                    return A(e, [this])
                }
                _putElementInTemplate(e, t) {
                    if (this._config.html) {
                        t.innerHTML = "",
                        t.append(e);
                        return
                    }
                    t.textContent = e.textContent
                }
            }
            let io = new Set(["sanitize", "allowList", "sanitizeFn"])
              , ia = "fade"
              , il = "show"
              , ic = ".modal"
              , ih = "hide.bs.modal"
              , id = "hover"
              , iu = "focus"
              , ip = {
                AUTO: "auto",
                TOP: "top",
                RIGHT: y() ? "left" : "right",
                BOTTOM: "bottom",
                LEFT: y() ? "right" : "left"
            }
              , im = {
                allowList: t6,
                animation: !0,
                boundary: "clippingParents",
                container: !1,
                customClass: "",
                delay: 0,
                fallbackPlacements: ["top", "right", "bottom", "left"],
                html: !1,
                offset: [0, 6],
                placement: "top",
                popperConfig: null,
                sanitize: !0,
                sanitizeFn: null,
                selector: !1,
                template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
                title: "",
                trigger: "hover focus"
            }
              , ig = {
                allowList: "object",
                animation: "boolean",
                boundary: "(string|element)",
                container: "(string|element|boolean)",
                customClass: "(string|function)",
                delay: "(number|object)",
                fallbackPlacements: "array",
                html: "boolean",
                offset: "(array|string|function)",
                placement: "(string|function)",
                popperConfig: "(null|object|function)",
                sanitize: "boolean",
                sanitizeFn: "(null|function)",
                selector: "(string|boolean)",
                template: "string",
                title: "(string|element|function)",
                trigger: "string"
            };
            class i_ extends V {
                constructor(e, i) {
                    if (void 0 === t)
                        throw TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
                    super(e, i),
                    this._isEnabled = !0,
                    this._timeout = 0,
                    this._isHovered = null,
                    this._activeTrigger = {},
                    this._popper = null,
                    this._templateFactory = null,
                    this._newContent = null,
                    this.tip = null,
                    this._setListeners(),
                    this._config.selector || this._fixTitle()
                }
                static get Default() {
                    return im
                }
                static get DefaultType() {
                    return ig
                }
                static get NAME() {
                    return "tooltip"
                }
                enable() {
                    this._isEnabled = !0
                }
                disable() {
                    this._isEnabled = !1
                }
                toggleEnabled() {
                    this._isEnabled = !this._isEnabled
                }
                toggle() {
                    if (this._isEnabled) {
                        if (this._activeTrigger.click = !this._activeTrigger.click,
                        this._isShown())
                            return void this._leave();
                        this._enter()
                    }
                }
                dispose() {
                    clearTimeout(this._timeout),
                    H.off(this._element.closest(ic), ih, this._hideModalHandler),
                    this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")),
                    this._disposePopper(),
                    super.dispose()
                }
                show() {
                    if ("none" === this._element.style.display)
                        throw Error("Please use show on visible elements");
                    if (!(this._isWithContent() && this._isEnabled))
                        return;
                    let e = H.trigger(this._element, this.constructor.eventName("show"))
                      , t = (p(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
                    if (e.defaultPrevented || !t)
                        return;
                    this._disposePopper();
                    let i = this._getTipElement();
                    this._element.setAttribute("aria-describedby", i.getAttribute("id"));
                    let {container: n} = this._config;
                    if (this._element.ownerDocument.documentElement.contains(this.tip) || (n.append(i),
                    H.trigger(this._element, this.constructor.eventName("inserted"))),
                    this._popper = this._createPopper(i),
                    i.classList.add(il),
                    "ontouchstart"in document.documentElement)
                        for (let e of [].concat(...document.body.children))
                            H.on(e, "mouseover", m);
                    this._queueCallback( () => {
                        H.trigger(this._element, this.constructor.eventName("shown")),
                        !1 === this._isHovered && this._leave(),
                        this._isHovered = !1
                    }
                    , this.tip, this._isAnimated())
                }
                hide() {
                    if (this._isShown() && !H.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
                        if (this._getTipElement().classList.remove(il),
                        "ontouchstart"in document.documentElement)
                            for (let e of [].concat(...document.body.children))
                                H.off(e, "mouseover", m);
                        this._activeTrigger.click = !1,
                        this._activeTrigger[iu] = !1,
                        this._activeTrigger[id] = !1,
                        this._isHovered = null,
                        this._queueCallback( () => {
                            this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(),
                            this._element.removeAttribute("aria-describedby"),
                            H.trigger(this._element, this.constructor.eventName("hidden")))
                        }
                        , this.tip, this._isAnimated())
                    }
                }
                update() {
                    this._popper && this._popper.update()
                }
                _isWithContent() {
                    return !!this._getTitle()
                }
                _getTipElement() {
                    return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())),
                    this.tip
                }
                _createTipElement(e) {
                    let t = this._getTemplateFactory(e).toHtml();
                    if (!t)
                        return null;
                    t.classList.remove(ia, il),
                    t.classList.add(`bs-${this.constructor.NAME}-auto`);
                    let i = a(this.constructor.NAME).toString();
                    return t.setAttribute("id", i),
                    this._isAnimated() && t.classList.add(ia),
                    t
                }
                setContent(e) {
                    this._newContent = e,
                    this._isShown() && (this._disposePopper(),
                    this.show())
                }
                _getTemplateFactory(e) {
                    return this._templateFactory ? this._templateFactory.changeContent(e) : this._templateFactory = new ir({
                        ...this._config,
                        content: e,
                        extraClass: this._resolvePossibleFunction(this._config.customClass)
                    }),
                    this._templateFactory
                }
                _getContentForTemplate() {
                    return {
                        ".tooltip-inner": this._getTitle()
                    }
                }
                _getTitle() {
                    return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title")
                }
                _initializeOnDelegatedTarget(e) {
                    return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig())
                }
                _isAnimated() {
                    return this._config.animation || this.tip && this.tip.classList.contains(ia)
                }
                _isShown() {
                    return this.tip && this.tip.classList.contains(il)
                }
                _createPopper(e) {
                    let i = ip[A(this._config.placement, [this, e, this._element]).toUpperCase()];
                    return t.createPopper(this._element, e, this._getPopperConfig(i))
                }
                _getOffset() {
                    let {offset: e} = this._config;
                    return "string" == typeof e ? e.split(",").map(e => Number.parseInt(e, 10)) : "function" == typeof e ? t => e(t, this._element) : e
                }
                _resolvePossibleFunction(e) {
                    return A(e, [this._element])
                }
                _getPopperConfig(e) {
                    let t = {
                        placement: e,
                        modifiers: [{
                            name: "flip",
                            options: {
                                fallbackPlacements: this._config.fallbackPlacements
                            }
                        }, {
                            name: "offset",
                            options: {
                                offset: this._getOffset()
                            }
                        }, {
                            name: "preventOverflow",
                            options: {
                                boundary: this._config.boundary
                            }
                        }, {
                            name: "arrow",
                            options: {
                                element: `.${this.constructor.NAME}-arrow`
                            }
                        }, {
                            name: "preSetPlacement",
                            enabled: !0,
                            phase: "beforeMain",
                            fn: e => {
                                this._getTipElement().setAttribute("data-popper-placement", e.state.placement)
                            }
                        }]
                    };
                    return {
                        ...t,
                        ...A(this._config.popperConfig, [t])
                    }
                }
                _setListeners() {
                    for (let e of this._config.trigger.split(" "))
                        if ("click" === e)
                            H.on(this._element, this.constructor.eventName("click"), this._config.selector, e => {
                                this._initializeOnDelegatedTarget(e).toggle()
                            }
                            );
                        else if ("manual" !== e) {
                            let t = e === id ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin")
                              , i = e === id ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
                            H.on(this._element, t, this._config.selector, e => {
                                let t = this._initializeOnDelegatedTarget(e);
                                t._activeTrigger["focusin" === e.type ? iu : id] = !0,
                                t._enter()
                            }
                            ),
                            H.on(this._element, i, this._config.selector, e => {
                                let t = this._initializeOnDelegatedTarget(e);
                                t._activeTrigger["focusout" === e.type ? iu : id] = t._element.contains(e.relatedTarget),
                                t._leave()
                            }
                            )
                        }
                    this._hideModalHandler = () => {
                        this._element && this.hide()
                    }
                    ,
                    H.on(this._element.closest(ic), ih, this._hideModalHandler)
                }
                _fixTitle() {
                    let e = this._element.getAttribute("title");
                    e && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", e),
                    this._element.setAttribute("data-bs-original-title", e),
                    this._element.removeAttribute("title"))
                }
                _enter() {
                    if (this._isShown() || this._isHovered) {
                        this._isHovered = !0;
                        return
                    }
                    this._isHovered = !0,
                    this._setTimeout( () => {
                        this._isHovered && this.show()
                    }
                    , this._config.delay.show)
                }
                _leave() {
                    this._isWithActiveTrigger() || (this._isHovered = !1,
                    this._setTimeout( () => {
                        this._isHovered || this.hide()
                    }
                    , this._config.delay.hide))
                }
                _setTimeout(e, t) {
                    clearTimeout(this._timeout),
                    this._timeout = setTimeout(e, t)
                }
                _isWithActiveTrigger() {
                    return Object.values(this._activeTrigger).includes(!0)
                }
                _getConfig(e) {
                    let t = B.getDataAttributes(this._element);
                    for (let e of Object.keys(t))
                        io.has(e) && delete t[e];
                    return e = {
                        ...t,
                        ..."object" == typeof e && e ? e : {}
                    },
                    e = this._mergeConfigObj(e),
                    e = this._configAfterMerge(e),
                    this._typeCheckConfig(e),
                    e
                }
                _configAfterMerge(e) {
                    return e.container = !1 === e.container ? document.body : d(e.container),
                    "number" == typeof e.delay && (e.delay = {
                        show: e.delay,
                        hide: e.delay
                    }),
                    "number" == typeof e.title && (e.title = e.title.toString()),
                    "number" == typeof e.content && (e.content = e.content.toString()),
                    e
                }
                _getDelegateConfig() {
                    let e = {};
                    for (let[t,i] of Object.entries(this._config))
                        this.constructor.Default[t] !== i && (e[t] = i);
                    return e.selector = !1,
                    e.trigger = "manual",
                    e
                }
                _disposePopper() {
                    this._popper && (this._popper.destroy(),
                    this._popper = null),
                    this.tip && (this.tip.remove(),
                    this.tip = null)
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = i_.getOrCreateInstance(this, e);
                        if ("string" == typeof e) {
                            if (void 0 === t[e])
                                throw TypeError(`No method named "${e}"`);
                            t[e]()
                        }
                    })
                }
            }
            w(i_);
            let ib = {
                ...i_.Default,
                content: "",
                offset: [0, 8],
                placement: "right",
                template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
                trigger: "click"
            }
              , iv = {
                ...i_.DefaultType,
                content: "(null|string|element|function)"
            };
            class iy extends i_ {
                static get Default() {
                    return ib
                }
                static get DefaultType() {
                    return iv
                }
                static get NAME() {
                    return "popover"
                }
                _isWithContent() {
                    return this._getTitle() || this._getContent()
                }
                _getContentForTemplate() {
                    return {
                        ".popover-header": this._getTitle(),
                        ".popover-body": this._getContent()
                    }
                }
                _getContent() {
                    return this._resolvePossibleFunction(this._config.content)
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = iy.getOrCreateInstance(this, e);
                        if ("string" == typeof e) {
                            if (void 0 === t[e])
                                throw TypeError(`No method named "${e}"`);
                            t[e]()
                        }
                    })
                }
            }
            w(iy);
            let iw = ".bs.scrollspy"
              , iA = `activate${iw}`
              , iE = `click${iw}`
              , iC = `load${iw}.data-api`
              , iT = "active"
              , iO = "[href]"
              , ix = ".nav-link"
              , ik = `${ix}, .nav-item > ${ix}, .list-group-item`
              , iL = {
                offset: null,
                rootMargin: "0px 0px -25%",
                smoothScroll: !1,
                target: null,
                threshold: [.1, .5, 1]
            }
              , iS = {
                offset: "(number|null)",
                rootMargin: "string",
                smoothScroll: "boolean",
                target: "element",
                threshold: "array"
            };
            class iD extends V {
                constructor(e, t) {
                    super(e, t),
                    this._targetLinks = new Map,
                    this._observableSections = new Map,
                    this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element,
                    this._activeTarget = null,
                    this._observer = null,
                    this._previousScrollData = {
                        visibleEntryTop: 0,
                        parentScrollTop: 0
                    },
                    this.refresh()
                }
                static get Default() {
                    return iL
                }
                static get DefaultType() {
                    return iS
                }
                static get NAME() {
                    return "scrollspy"
                }
                refresh() {
                    for (let e of (this._initializeTargetsAndObservables(),
                    this._maybeEnableSmoothScroll(),
                    this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver(),
                    this._observableSections.values()))
                        this._observer.observe(e)
                }
                dispose() {
                    this._observer.disconnect(),
                    super.dispose()
                }
                _configAfterMerge(e) {
                    return e.target = d(e.target) || document.body,
                    e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin,
                    "string" == typeof e.threshold && (e.threshold = e.threshold.split(",").map(e => Number.parseFloat(e))),
                    e
                }
                _maybeEnableSmoothScroll() {
                    this._config.smoothScroll && (H.off(this._config.target, iE),
                    H.on(this._config.target, iE, iO, e => {
                        let t = this._observableSections.get(e.target.hash);
                        if (t) {
                            e.preventDefault();
                            let i = this._rootElement || window
                              , n = t.offsetTop - this._element.offsetTop;
                            if (i.scrollTo)
                                return void i.scrollTo({
                                    top: n,
                                    behavior: "smooth"
                                });
                            i.scrollTop = n
                        }
                    }
                    ))
                }
                _getNewObserver() {
                    return new IntersectionObserver(e => this._observerCallback(e),{
                        root: this._rootElement,
                        threshold: this._config.threshold,
                        rootMargin: this._config.rootMargin
                    })
                }
                _observerCallback(e) {
                    let t = e => this._targetLinks.get(`#${e.target.id}`)
                      , i = e => {
                        this._previousScrollData.visibleEntryTop = e.target.offsetTop,
                        this._process(t(e))
                    }
                      , n = (this._rootElement || document.documentElement).scrollTop
                      , s = n >= this._previousScrollData.parentScrollTop;
                    for (let r of (this._previousScrollData.parentScrollTop = n,
                    e)) {
                        if (!r.isIntersecting) {
                            this._activeTarget = null,
                            this._clearActiveClass(t(r));
                            continue
                        }
                        let e = r.target.offsetTop >= this._previousScrollData.visibleEntryTop;
                        if (s && e) {
                            if (i(r),
                            !n)
                                return;
                            continue
                        }
                        s || e || i(r)
                    }
                }
                _initializeTargetsAndObservables() {
                    for (let e of (this._targetLinks = new Map,
                    this._observableSections = new Map,
                    Q.find(iO, this._config.target))) {
                        if (!e.hash || f(e))
                            continue;
                        let t = Q.findOne(decodeURI(e.hash), this._element);
                        u(t) && (this._targetLinks.set(decodeURI(e.hash), e),
                        this._observableSections.set(e.hash, t))
                    }
                }
                _process(e) {
                    this._activeTarget !== e && (this._clearActiveClass(this._config.target),
                    this._activeTarget = e,
                    e.classList.add(iT),
                    this._activateParents(e),
                    H.trigger(this._element, iA, {
                        relatedTarget: e
                    }))
                }
                _activateParents(e) {
                    if (e.classList.contains("dropdown-item"))
                        return void Q.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(iT);
                    for (let t of Q.parents(e, ".nav, .list-group"))
                        for (let e of Q.prev(t, ik))
                            e.classList.add(iT)
                }
                _clearActiveClass(e) {
                    for (let t of (e.classList.remove(iT),
                    Q.find(`${iO}.${iT}`, e)))
                        t.classList.remove(iT)
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = iD.getOrCreateInstance(this, e);
                        if ("string" == typeof e) {
                            if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                                throw TypeError(`No method named "${e}"`);
                            t[e]()
                        }
                    })
                }
            }
            H.on(window, iC, () => {
                for (let e of Q.find('[data-bs-spy="scroll"]'))
                    iD.getOrCreateInstance(e)
            }
            ),
            w(iD);
            let i$ = ".bs.tab"
              , iI = `hide${i$}`
              , iN = `hidden${i$}`
              , iP = `show${i$}`
              , ij = `shown${i$}`
              , iM = `click${i$}`
              , iF = `keydown${i$}`
              , iH = `load${i$}`
              , iW = "ArrowRight"
              , iz = "ArrowDown"
              , iR = "Home"
              , iB = "active"
              , iq = "fade"
              , iV = "show"
              , iK = ".dropdown-toggle"
              , iQ = `:not(${iK})`
              , iX = `.nav-link${iQ}, .list-group-item${iQ}, [role="tab"]${iQ}`
              , iY = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]'
              , iU = `${iX}, ${iY}`
              , iG = `.${iB}[data-bs-toggle="tab"], .${iB}[data-bs-toggle="pill"], .${iB}[data-bs-toggle="list"]`;
            class iJ extends V {
                constructor(e) {
                    if (super(e),
                    this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'),
                    !this._parent)
                        return;
                    this._setInitialAttributes(this._parent, this._getChildren()),
                    H.on(this._element, iF, e => this._keydown(e))
                }
                static get NAME() {
                    return "tab"
                }
                show() {
                    let e = this._element;
                    if (this._elemIsActive(e))
                        return;
                    let t = this._getActiveElem()
                      , i = t ? H.trigger(t, iI, {
                        relatedTarget: e
                    }) : null;
                    H.trigger(e, iP, {
                        relatedTarget: t
                    }).defaultPrevented || i && i.defaultPrevented || (this._deactivate(t, e),
                    this._activate(e, t))
                }
                _activate(e, t) {
                    e && (e.classList.add(iB),
                    this._activate(Q.getElementFromSelector(e)),
                    this._queueCallback( () => {
                        if ("tab" !== e.getAttribute("role"))
                            return void e.classList.add(iV);
                        e.removeAttribute("tabindex"),
                        e.setAttribute("aria-selected", !0),
                        this._toggleDropDown(e, !0),
                        H.trigger(e, ij, {
                            relatedTarget: t
                        })
                    }
                    , e, e.classList.contains(iq)))
                }
                _deactivate(e, t) {
                    e && (e.classList.remove(iB),
                    e.blur(),
                    this._deactivate(Q.getElementFromSelector(e)),
                    this._queueCallback( () => {
                        if ("tab" !== e.getAttribute("role"))
                            return void e.classList.remove(iV);
                        e.setAttribute("aria-selected", !1),
                        e.setAttribute("tabindex", "-1"),
                        this._toggleDropDown(e, !1),
                        H.trigger(e, iN, {
                            relatedTarget: t
                        })
                    }
                    , e, e.classList.contains(iq)))
                }
                _keydown(e) {
                    let t;
                    if (!["ArrowLeft", iW, "ArrowUp", iz, iR, "End"].includes(e.key))
                        return;
                    e.stopPropagation(),
                    e.preventDefault();
                    let i = this._getChildren().filter(e => !f(e));
                    if ([iR, "End"].includes(e.key))
                        t = i[e.key === iR ? 0 : i.length - 1];
                    else {
                        let n = [iW, iz].includes(e.key);
                        t = C(i, e.target, n, !0)
                    }
                    t && (t.focus({
                        preventScroll: !0
                    }),
                    iJ.getOrCreateInstance(t).show())
                }
                _getChildren() {
                    return Q.find(iU, this._parent)
                }
                _getActiveElem() {
                    return this._getChildren().find(e => this._elemIsActive(e)) || null
                }
                _setInitialAttributes(e, t) {
                    for (let i of (this._setAttributeIfNotExists(e, "role", "tablist"),
                    t))
                        this._setInitialAttributesOnChild(i)
                }
                _setInitialAttributesOnChild(e) {
                    e = this._getInnerElement(e);
                    let t = this._elemIsActive(e)
                      , i = this._getOuterElement(e);
                    e.setAttribute("aria-selected", t),
                    i !== e && this._setAttributeIfNotExists(i, "role", "presentation"),
                    t || e.setAttribute("tabindex", "-1"),
                    this._setAttributeIfNotExists(e, "role", "tab"),
                    this._setInitialAttributesOnTargetPanel(e)
                }
                _setInitialAttributesOnTargetPanel(e) {
                    let t = Q.getElementFromSelector(e);
                    t && (this._setAttributeIfNotExists(t, "role", "tabpanel"),
                    e.id && this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`))
                }
                _toggleDropDown(e, t) {
                    let i = this._getOuterElement(e);
                    if (!i.classList.contains("dropdown"))
                        return;
                    let n = (e, n) => {
                        let s = Q.findOne(e, i);
                        s && s.classList.toggle(n, t)
                    }
                    ;
                    n(iK, iB),
                    n(".dropdown-menu", iV),
                    i.setAttribute("aria-expanded", t)
                }
                _setAttributeIfNotExists(e, t, i) {
                    e.hasAttribute(t) || e.setAttribute(t, i)
                }
                _elemIsActive(e) {
                    return e.classList.contains(iB)
                }
                _getInnerElement(e) {
                    return e.matches(iU) ? e : Q.findOne(iU, e)
                }
                _getOuterElement(e) {
                    return e.closest(".nav-item, .list-group-item") || e
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = iJ.getOrCreateInstance(this);
                        if ("string" == typeof e) {
                            if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                                throw TypeError(`No method named "${e}"`);
                            t[e]()
                        }
                    })
                }
            }
            H.on(document, iM, iY, function(e) {
                ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
                f(this) || iJ.getOrCreateInstance(this).show()
            }),
            H.on(window, iH, () => {
                for (let e of Q.find(iG))
                    iJ.getOrCreateInstance(e)
            }
            ),
            w(iJ);
            let iZ = ".bs.toast"
              , i0 = `mouseover${iZ}`
              , i1 = `mouseout${iZ}`
              , i2 = `focusin${iZ}`
              , i3 = `focusout${iZ}`
              , i5 = `hide${iZ}`
              , i4 = `hidden${iZ}`
              , i8 = `show${iZ}`
              , i6 = `shown${iZ}`
              , i9 = "hide"
              , i7 = "show"
              , ne = "showing"
              , nt = {
                animation: "boolean",
                autohide: "boolean",
                delay: "number"
            }
              , ni = {
                animation: !0,
                autohide: !0,
                delay: 5e3
            };
            class nn extends V {
                constructor(e, t) {
                    super(e, t),
                    this._timeout = null,
                    this._hasMouseInteraction = !1,
                    this._hasKeyboardInteraction = !1,
                    this._setListeners()
                }
                static get Default() {
                    return ni
                }
                static get DefaultType() {
                    return nt
                }
                static get NAME() {
                    return "toast"
                }
                show() {
                    H.trigger(this._element, i8).defaultPrevented || (this._clearTimeout(),
                    this._config.animation && this._element.classList.add("fade"),
                    this._element.classList.remove(i9),
                    g(this._element),
                    this._element.classList.add(i7, ne),
                    this._queueCallback( () => {
                        this._element.classList.remove(ne),
                        H.trigger(this._element, i6),
                        this._maybeScheduleHide()
                    }
                    , this._element, this._config.animation))
                }
                hide() {
                    this.isShown() && !H.trigger(this._element, i5).defaultPrevented && (this._element.classList.add(ne),
                    this._queueCallback( () => {
                        this._element.classList.add(i9),
                        this._element.classList.remove(ne, i7),
                        H.trigger(this._element, i4)
                    }
                    , this._element, this._config.animation))
                }
                dispose() {
                    this._clearTimeout(),
                    this.isShown() && this._element.classList.remove(i7),
                    super.dispose()
                }
                isShown() {
                    return this._element.classList.contains(i7)
                }
                _maybeScheduleHide() {
                    this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout( () => {
                        this.hide()
                    }
                    , this._config.delay)))
                }
                _onInteraction(e, t) {
                    switch (e.type) {
                    case "mouseover":
                    case "mouseout":
                        this._hasMouseInteraction = t;
                        break;
                    case "focusin":
                    case "focusout":
                        this._hasKeyboardInteraction = t
                    }
                    if (t)
                        return void this._clearTimeout();
                    let i = e.relatedTarget;
                    this._element === i || this._element.contains(i) || this._maybeScheduleHide()
                }
                _setListeners() {
                    H.on(this._element, i0, e => this._onInteraction(e, !0)),
                    H.on(this._element, i1, e => this._onInteraction(e, !1)),
                    H.on(this._element, i2, e => this._onInteraction(e, !0)),
                    H.on(this._element, i3, e => this._onInteraction(e, !1))
                }
                _clearTimeout() {
                    clearTimeout(this._timeout),
                    this._timeout = null
                }
                static jQueryInterface(e) {
                    return this.each(function() {
                        let t = nn.getOrCreateInstance(this, e);
                        if ("string" == typeof e) {
                            if (void 0 === t[e])
                                throw TypeError(`No method named "${e}"`);
                            t[e](this)
                        }
                    })
                }
            }
            return X(nn),
            w(nn),
            {
                Alert: J,
                Button: et,
                Carousel: eI,
                Collapse: eQ,
                Dropdown: ta,
                Modal: tR,
                Offcanvas: t8,
                Popover: iy,
                ScrollSpy: iD,
                Tab: iJ,
                Toast: nn,
                Tooltip: i_
            }
        }(i(57984))
    }
}]);
