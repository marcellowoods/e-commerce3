function validate(a, b) {
    var c = "";
    return (
        a.find(":input[required], textarea[required], select[required]").each(function () {
            var a = $(this),
                b = a.attr("type"),
                d = $.trim(a.val()),
                e = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@[a-z0-9][a-z0-9-_]*(?:\.[a-z0-9-_]*[a-z0-9])+$/i,
                f = /^(?=.*[0-9]).{6,}$/,
                g = /^[0-9]+$/;
            0 !== d.length
                ? "email" !== b || e.test(d)
                    ? ("number" !== b && "tel" !== b) || "card-number" === a.attr("name") || g.test(d)
                        ? "password" !== b || f.test(d) || "ignore" === a.attr("data-validate")
                            ? (a.is("select") && 0 !== a.next(".select2").length && (a = a.next(".select2").find(".select2-selection")), validEntry(a, !0))
                            : ((c = "Passwords must contain 6 characters including at least one number"), validEntry(a, !1))
                        : ((c = "Only numbers use numbers in the invalid field"), validEntry(a, !1))
                    : ((c = "Invalid e-mail address. Please use a format similar to: brick@ilovelamp.com"), validEntry(a, !1))
                : ((c = "Please enter content into the field"),
                  a.is("select") && ((c = "Please select a value from the drop down list"), 0 !== a.next(".select2").length && (a = a.next(".select2").find(".select2-selection"))),
                  validEntry(a, !1));
        }),
        errorHandling(a, c, b)
    );
}
function validEntry(a, b) {
    var c = a.parent().hasClass("input-wrap") ? a.parent() : a;
    b ? (c.removeClass("invalid"), a.attr("aria-invalid", "false")) : (c.addClass("invalid"), a.attr("aria-invalid", "true"));
}
function errorHandling(a, b, c) {
    var d = a.find(".invalid").length;
    return d > 1 ? errorMessage(a, "Please ensure all required fields are filled in", c) : 1 === d ? errorMessage(a, b, c) : errorMessage(a, "false");
}
function errorMessage(a, b, c) {
    var d = a.find(".error"),
        e = a.parent(),
        f = !1;
    return (
        "false" !== b && 0 !== d.length
            ? d.text(b)
            : "false" !== b
            ? ((d = $("<div />", { class: "error", role: "alert", "aria-live": "assertive", text: b })),
              a.find(".form-fields").append(d),
              a.find(".form-header").addClass("incomplete"),
              a.find(":input[required], textarea[required], select[required], .select2").each(function () {
                  $(this).on("keydown, focusout", function (b) {
                      validate(a, !0);
                  });
              }))
            : (d.remove(), a.find(".form-header").removeClass("incomplete"), (f = !0)),
        f ||
            c ||
            (e.addClass("invalid-form"),
            setTimeout(function () {
                e.removeClass("invalid-form");
            }, 800)),
        f
    );
}
function formatCardNumber(a) {
    var b = a.val().replace(/\D /g, ""),
        c = [/(\d{4})(?!$)/g, "$1 "],
        d = {
            visa: { pattern: /^4/, format: c },
            visaelectron: { pattern: /^4(026|17500|405|508|844|91[37])/, format: c },
            mastercard: { pattern: /^(5[0-5]|2[2-7])/, format: c },
            amex: { pattern: /^3[47]/, format: [/(\d{4})(\d{6})?(\d{5})?/, "$1 $2 $3"] },
            diners: { pattern: /^3[0689]/, format: [/(\d{4})(\d{6})?(\d{4})?/, "$1 $2 $3"] },
            discover: { pattern: /^6([045]|22)/, format: c },
            jcb: { pattern: /^35/, format: c },
            maestro: { pattern: /^(5(018|0[23]|[68])|6(39|7))/, format: c },
            forbrugsforeningen: { pattern: /^600/, format: c },
            dankort: { pattern: /^5019/, format: c },
            unionpay: { pattern: /^(62|88)/, format: c },
        };
    for (var e in d)
        if (d[e].pattern.test(b)) {
            var f = b.replace(d[e].format[0], d[e].format[1]);
            a.val(f);
        }
}
function disableFormElements(a, b) {
    b ? (a.attr("aria-busy", "true"), responseTimeout(a)) : (a.removeAttr("aria-busy"), clearTimeout(slowResponse)),
        a.find(":input, textarea, select, .select2, button").each(function () {
            var a = $(this);
            b ? (a.addClass("disabled").attr("disabled", "disabled"), a.hasClass("pay") && a.addClass("processing")) : (a.removeClass("disabled").removeAttr("disabled"), a.hasClass("pay") && a.removeClass("processing"));
        });
}
function responseTimeout(a) {
    slowResponse = setTimeout(function () {
        var b = $("<div />", { class: "submit-error", role: "alert", "aria-live": "assertive", text: "It's taking a while to process your order. Please bear with us" });
        a.find(".payment .form-fields").append(b);
    }, 1e4);
}
function toggleQuantity(a, b) {
    var c = parseInt(a.val()),
        d = void 0 !== a.attr("min") ? parseInt(a.attr("min")) : 0,
        e = parseInt(a.attr("max"));
    b ? (NaN === e || c !== e) && a.val(c + 1) : c > d && a.val(c - 1), a.parents("form.cart-listing").length >= 1 && updatePrice(a);
}
function checkValidContent(a) {
    var b = parseInt(a.val());
    (minValue = void 0 !== a.attr("min") ? parseInt(a.attr("min")) : 0),
        (maxValue = parseInt(a.attr("max"))),
        "" === a.val() || b < minValue ? a.val(minValue) : NaN !== maxValue && b > maxValue && a.val(maxValue),
        a.parents("form.cart-listing").length >= 1 && updatePrice(a);
}
function updatePrice(a) {
    var b = parseInt(a.val()),
        c = a.parents(".cart-item").find(".price"),
        d = parseInt(c.find(".product-price").html());
    c.find(".total-product-price").html(d * b), 1 === b ? c.find(".item-price").addClass("hidden") : c.find(".item-price").removeClass("hidden");
}
!(function (a, b) {
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = a.document
              ? b(a, !0)
              : function (a) {
                    if (!a.document) throw new Error("jQuery requires a window with a document");
                    return b(a);
                })
        : b(a);
})("undefined" != typeof window ? window : this, function (a, b) {
    function c(a) {
        var b = "length" in a && a.length,
            c = ea.type(a);
        return "function" === c || ea.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || ("number" == typeof b && b > 0 && b - 1 in a);
    }
    function d(a, b, c) {
        if (ea.isFunction(b))
            return ea.grep(a, function (a, d) {
                return !!b.call(a, d, a) !== c;
            });
        if (b.nodeType)
            return ea.grep(a, function (a) {
                return (a === b) !== c;
            });
        if ("string" == typeof b) {
            if (ma.test(b)) return ea.filter(b, a, c);
            b = ea.filter(b, a);
        }
        return ea.grep(a, function (a) {
            return ea.inArray(a, b) >= 0 !== c;
        });
    }
    function e(a, b) {
        do a = a[b];
        while (a && 1 !== a.nodeType);
        return a;
    }
    function f(a) {
        var b = (ua[a] = {});
        return (
            ea.each(a.match(ta) || [], function (a, c) {
                b[c] = !0;
            }),
            b
        );
    }
    function g() {
        oa.addEventListener ? (oa.removeEventListener("DOMContentLoaded", h, !1), a.removeEventListener("load", h, !1)) : (oa.detachEvent("onreadystatechange", h), a.detachEvent("onload", h));
    }
    function h() {
        (oa.addEventListener || "load" === event.type || "complete" === oa.readyState) && (g(), ea.ready());
    }
    function i(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(za, "-$1").toLowerCase();
            if (((c = a.getAttribute(d)), "string" == typeof c)) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : ya.test(c) ? ea.parseJSON(c) : c;
                } catch (e) {}
                ea.data(a, b, c);
            } else c = void 0;
        }
        return c;
    }
    function j(a) {
        var b;
        for (b in a) if (("data" !== b || !ea.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0;
    }
    function k(a, b, c, d) {
        if (ea.acceptData(a)) {
            var e,
                f,
                g = ea.expando,
                h = a.nodeType,
                i = h ? ea.cache : a,
                j = h ? a[g] : a[g] && g;
            if ((j && i[j] && (d || i[j].data)) || void 0 !== c || "string" != typeof b)
                return (
                    j || (j = h ? (a[g] = W.pop() || ea.guid++) : g),
                    i[j] || (i[j] = h ? {} : { toJSON: ea.noop }),
                    ("object" == typeof b || "function" == typeof b) && (d ? (i[j] = ea.extend(i[j], b)) : (i[j].data = ea.extend(i[j].data, b))),
                    (f = i[j]),
                    d || (f.data || (f.data = {}), (f = f.data)),
                    void 0 !== c && (f[ea.camelCase(b)] = c),
                    "string" == typeof b ? ((e = f[b]), null == e && (e = f[ea.camelCase(b)])) : (e = f),
                    e
                );
        }
    }
    function l(a, b, c) {
        if (ea.acceptData(a)) {
            var d,
                e,
                f = a.nodeType,
                g = f ? ea.cache : a,
                h = f ? a[ea.expando] : ea.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    ea.isArray(b) ? (b = b.concat(ea.map(b, ea.camelCase))) : b in d ? (b = [b]) : ((b = ea.camelCase(b)), (b = b in d ? [b] : b.split(" "))), (e = b.length);
                    for (; e--; ) delete d[b[e]];
                    if (c ? !j(d) : !ea.isEmptyObject(d)) return;
                }
                (c || (delete g[h].data, j(g[h]))) && (f ? ea.cleanData([a], !0) : ca.deleteExpando || g != g.window ? delete g[h] : (g[h] = null));
            }
        }
    }
    function m() {
        return !0;
    }
    function n() {
        return !1;
    }
    function o() {
        try {
            return oa.activeElement;
        } catch (a) {}
    }
    function p(a) {
        var b = Ka.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement) for (; b.length; ) c.createElement(b.pop());
        return c;
    }
    function q(a, b) {
        var c,
            d,
            e = 0,
            f = typeof a.getElementsByTagName !== xa ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== xa ? a.querySelectorAll(b || "*") : void 0;
        if (!f) for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || ea.nodeName(d, b) ? f.push(d) : ea.merge(f, q(d, b));
        return void 0 === b || (b && ea.nodeName(a, b)) ? ea.merge([a], f) : f;
    }
    function r(a) {
        Ea.test(a.type) && (a.defaultChecked = a.checked);
    }
    function s(a, b) {
        return ea.nodeName(a, "table") && ea.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function t(a) {
        return (a.type = (null !== ea.find.attr(a, "type")) + "/" + a.type), a;
    }
    function u(a) {
        var b = Va.exec(a.type);
        return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
    }
    function v(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) ea._data(c, "globalEval", !b || ea._data(b[d], "globalEval"));
    }
    function w(a, b) {
        if (1 === b.nodeType && ea.hasData(a)) {
            var c,
                d,
                e,
                f = ea._data(a),
                g = ea._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, (g.events = {});
                for (c in h) for (d = 0, e = h[c].length; e > d; d++) ea.event.add(b, c, h[c][d]);
            }
            g.data && (g.data = ea.extend({}, g.data));
        }
    }
    function x(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (((c = b.nodeName.toLowerCase()), !ca.noCloneEvent && b[ea.expando])) {
                e = ea._data(b);
                for (d in e.events) ea.removeEvent(b, d, e.handle);
                b.removeAttribute(ea.expando);
            }
            "script" === c && b.text !== a.text
                ? ((t(b).text = a.text), u(b))
                : "object" === c
                ? (b.parentNode && (b.outerHTML = a.outerHTML), ca.html5Clone && a.innerHTML && !ea.trim(b.innerHTML) && (b.innerHTML = a.innerHTML))
                : "input" === c && Ea.test(a.type)
                ? ((b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value))
                : "option" === c
                ? (b.defaultSelected = b.selected = a.defaultSelected)
                : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue);
        }
    }
    function y(b, c) {
        var d,
            e = ea(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : ea.css(e[0], "display");
        return e.detach(), f;
    }
    function z(a) {
        var b = oa,
            c = _a[a];
        return (
            c ||
                ((c = y(a, b)),
                ("none" !== c && c) ||
                    (($a = ($a || ea("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement)), (b = ($a[0].contentWindow || $a[0].contentDocument).document), b.write(), b.close(), (c = y(a, b)), $a.detach()),
                (_a[a] = c)),
            c
        );
    }
    function A(a, b) {
        return {
            get: function () {
                var c = a();
                return null != c ? (c ? void delete this.get : (this.get = b).apply(this, arguments)) : void 0;
            },
        };
    }
    function B(a, b) {
        if (b in a) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = mb.length; e--; ) if (((b = mb[e] + c), b in a)) return b;
        return d;
    }
    function C(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
            (d = a[g]),
                d.style &&
                    ((f[g] = ea._data(d, "olddisplay")),
                    (c = d.style.display),
                    b
                        ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Ca(d) && (f[g] = ea._data(d, "olddisplay", z(d.nodeName))))
                        : ((e = Ca(d)), ((c && "none" !== c) || !e) && ea._data(d, "olddisplay", e ? c : ea.css(d, "display"))));
        for (g = 0; h > g; g++) (d = a[g]), d.style && ((b && "none" !== d.style.display && "" !== d.style.display) || (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function D(a, b, c) {
        var d = ib.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function E(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
            "margin" === c && (g += ea.css(a, c + Ba[f], !0, e)),
                d
                    ? ("content" === c && (g -= ea.css(a, "padding" + Ba[f], !0, e)), "margin" !== c && (g -= ea.css(a, "border" + Ba[f] + "Width", !0, e)))
                    : ((g += ea.css(a, "padding" + Ba[f], !0, e)), "padding" !== c && (g += ea.css(a, "border" + Ba[f] + "Width", !0, e)));
        return g;
    }
    function F(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = ab(a),
            g = ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (((e = bb(a, b, f)), (0 > e || null == e) && (e = a.style[b]), db.test(e))) return e;
            (d = g && (ca.boxSizingReliable() || e === a.style[b])), (e = parseFloat(e) || 0);
        }
        return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    function G(a, b, c, d, e) {
        return new G.prototype.init(a, b, c, d, e);
    }
    function H() {
        return (
            setTimeout(function () {
                nb = void 0;
            }),
            (nb = ea.now())
        );
    }
    function I(a, b) {
        var c,
            d = { height: a },
            e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) (c = Ba[e]), (d["margin" + c] = d["padding" + c] = a);
        return b && (d.opacity = d.width = a), d;
    }
    function J(a, b, c) {
        for (var d, e = (tb[b] || []).concat(tb["*"]), f = 0, g = e.length; g > f; f++) if ((d = e[f].call(c, b, a))) return d;
    }
    function K(a, b, c) {
        var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l = this,
            m = {},
            n = a.style,
            o = a.nodeType && Ca(a),
            p = ea._data(a, "fxshow");
        c.queue ||
            ((h = ea._queueHooks(a, "fx")),
            null == h.unqueued &&
                ((h.unqueued = 0),
                (i = h.empty.fire),
                (h.empty.fire = function () {
                    h.unqueued || i();
                })),
            h.unqueued++,
            l.always(function () {
                l.always(function () {
                    h.unqueued--, ea.queue(a, "fx").length || h.empty.fire();
                });
            })),
            1 === a.nodeType &&
                ("height" in b || "width" in b) &&
                ((c.overflow = [n.overflow, n.overflowX, n.overflowY]),
                (j = ea.css(a, "display")),
                (k = "none" === j ? ea._data(a, "olddisplay") || z(a.nodeName) : j),
                "inline" === k && "none" === ea.css(a, "float") && (ca.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? (n.zoom = 1) : (n.display = "inline-block"))),
            c.overflow &&
                ((n.overflow = "hidden"),
                ca.shrinkWrapBlocks() ||
                    l.always(function () {
                        (n.overflow = c.overflow[0]), (n.overflowX = c.overflow[1]), (n.overflowY = c.overflow[2]);
                    }));
        for (d in b)
            if (((e = b[d]), pb.exec(e))) {
                if ((delete b[d], (f = f || "toggle" === e), e === (o ? "hide" : "show"))) {
                    if ("show" !== e || !p || void 0 === p[d]) continue;
                    o = !0;
                }
                m[d] = (p && p[d]) || ea.style(a, d);
            } else j = void 0;
        if (ea.isEmptyObject(m)) "inline" === ("none" === j ? z(a.nodeName) : j) && (n.display = j);
        else {
            p ? "hidden" in p && (o = p.hidden) : (p = ea._data(a, "fxshow", {})),
                f && (p.hidden = !o),
                o
                    ? ea(a).show()
                    : l.done(function () {
                          ea(a).hide();
                      }),
                l.done(function () {
                    var b;
                    ea._removeData(a, "fxshow");
                    for (b in m) ea.style(a, b, m[b]);
                });
            for (d in m) (g = J(o ? p[d] : 0, d, l)), d in p || ((p[d] = g.start), o && ((g.end = g.start), (g.start = "width" === d || "height" === d ? 1 : 0)));
        }
    }
    function L(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (((d = ea.camelCase(c)), (e = b[d]), (f = a[c]), ea.isArray(f) && ((e = f[1]), (f = a[c] = f[0])), c !== d && ((a[d] = f), delete a[c]), (g = ea.cssHooks[d]), g && "expand" in g)) {
                (f = g.expand(f)), delete a[d];
                for (c in f) c in a || ((a[c] = f[c]), (b[c] = e));
            } else b[d] = e;
    }
    function M(a, b, c) {
        var d,
            e,
            f = 0,
            g = sb.length,
            h = ea.Deferred().always(function () {
                delete i.elem;
            }),
            i = function () {
                if (e) return !1;
                for (var b = nb || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1);
            },
            j = h.promise({
                elem: a,
                props: ea.extend({}, b),
                opts: ea.extend(!0, { specialEasing: {} }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: nb || H(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = ea.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d;
                },
                stop: function (b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this;
                },
            }),
            k = j.props;
        for (L(k, j.opts.specialEasing); g > f; f++) if ((d = sb[f].call(j, a, k, j.opts))) return d;
        return (
            ea.map(k, J, j),
            ea.isFunction(j.opts.start) && j.opts.start.call(a, j),
            ea.fx.timer(ea.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
            j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
        );
    }
    function N(a) {
        return function (b, c) {
            "string" != typeof b && ((c = b), (b = "*"));
            var d,
                e = 0,
                f = b.toLowerCase().match(ta) || [];
            if (ea.isFunction(c)) for (; (d = f[e++]); ) "+" === d.charAt(0) ? ((d = d.slice(1) || "*"), (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
        };
    }
    function O(a, b, c, d) {
        function e(h) {
            var i;
            return (
                (f[h] = !0),
                ea.each(a[h] || [], function (a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || g || f[j] ? (g ? !(i = j) : void 0) : (b.dataTypes.unshift(j), e(j), !1);
                }),
                i
            );
        }
        var f = {},
            g = a === Rb;
        return e(b.dataTypes[0]) || (!f["*"] && e("*"));
    }
    function P(a, b) {
        var c,
            d,
            e = ea.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && ea.extend(!0, a, c), a;
    }
    function Q(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; ) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)
            for (g in h)
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break;
                }
        if (i[0] in c) f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break;
                }
                d || (d = g);
            }
            f = f || d;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function R(a, b, c, d) {
        var e,
            f,
            g,
            h,
            i,
            j = {},
            k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f; )
            if ((a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), (i = f), (f = k.shift())))
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
                    if (((g = j[i + " " + f] || j["* " + f]), !g))
                        for (e in j)
                            if (((h = e.split(" ")), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]]))) {
                                g === !0 ? (g = j[e]) : j[e] !== !0 && ((f = h[0]), k.unshift(h[1]));
                                break;
                            }
                    if (g !== !0)
                        if (g && a["throws"]) b = g(b);
                        else
                            try {
                                b = g(b);
                            } catch (l) {
                                return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
                            }
                }
        return { state: "success", data: b };
    }
    function S(a, b, c, d) {
        var e;
        if (ea.isArray(b))
            ea.each(b, function (b, e) {
                c || Vb.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d);
            });
        else if (c || "object" !== ea.type(b)) d(a, b);
        else for (e in b) S(a + "[" + e + "]", b[e], c, d);
    }
    function T() {
        try {
            return new a.XMLHttpRequest();
        } catch (b) {}
    }
    function U() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    function V(a) {
        return ea.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
    }
    var W = [],
        X = W.slice,
        Y = W.concat,
        Z = W.push,
        $ = W.indexOf,
        _ = {},
        aa = _.toString,
        ba = _.hasOwnProperty,
        ca = {},
        da = "1.11.3",
        ea = function (a, b) {
            return new ea.fn.init(a, b);
        },
        fa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ga = /^-ms-/,
        ha = /-([\da-z])/gi,
        ia = function (a, b) {
            return b.toUpperCase();
        };
    (ea.fn = ea.prototype = {
        jquery: da,
        constructor: ea,
        selector: "",
        length: 0,
        toArray: function () {
            return X.call(this);
        },
        get: function (a) {
            return null != a ? (0 > a ? this[a + this.length] : this[a]) : X.call(this);
        },
        pushStack: function (a) {
            var b = ea.merge(this.constructor(), a);
            return (b.prevObject = this), (b.context = this.context), b;
        },
        each: function (a, b) {
            return ea.each(this, a, b);
        },
        map: function (a) {
            return this.pushStack(
                ea.map(this, function (b, c) {
                    return a.call(b, c, b);
                })
            );
        },
        slice: function () {
            return this.pushStack(X.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        push: Z,
        sort: W.sort,
        splice: W.splice,
    }),
        (ea.extend = ea.fn.extend = function () {
            var a,
                b,
                c,
                d,
                e,
                f,
                g = arguments[0] || {},
                h = 1,
                i = arguments.length,
                j = !1;
            for ("boolean" == typeof g && ((j = g), (g = arguments[h] || {}), h++), "object" == typeof g || ea.isFunction(g) || (g = {}), h === i && ((g = this), h--); i > h; h++)
                if (null != (e = arguments[h]))
                    for (d in e)
                        (a = g[d]),
                            (c = e[d]),
                            g !== c &&
                                (j && c && (ea.isPlainObject(c) || (b = ea.isArray(c)))
                                    ? (b ? ((b = !1), (f = a && ea.isArray(a) ? a : [])) : (f = a && ea.isPlainObject(a) ? a : {}), (g[d] = ea.extend(j, f, c)))
                                    : void 0 !== c && (g[d] = c));
            return g;
        }),
        ea.extend({
            expando: "jQuery" + (da + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (a) {
                throw new Error(a);
            },
            noop: function () {},
            isFunction: function (a) {
                return "function" === ea.type(a);
            },
            isArray:
                Array.isArray ||
                function (a) {
                    return "array" === ea.type(a);
                },
            isWindow: function (a) {
                return null != a && a == a.window;
            },
            isNumeric: function (a) {
                return !ea.isArray(a) && a - parseFloat(a) + 1 >= 0;
            },
            isEmptyObject: function (a) {
                var b;
                for (b in a) return !1;
                return !0;
            },
            isPlainObject: function (a) {
                var b;
                if (!a || "object" !== ea.type(a) || a.nodeType || ea.isWindow(a)) return !1;
                try {
                    if (a.constructor && !ba.call(a, "constructor") && !ba.call(a.constructor.prototype, "isPrototypeOf")) return !1;
                } catch (c) {
                    return !1;
                }
                if (ca.ownLast) for (b in a) return ba.call(a, b);
                for (b in a);
                return void 0 === b || ba.call(a, b);
            },
            type: function (a) {
                return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[aa.call(a)] || "object" : typeof a;
            },
            globalEval: function (b) {
                b &&
                    ea.trim(b) &&
                    (
                        a.execScript ||
                        function (b) {
                            a.eval.call(a, b);
                        }
                    )(b);
            },
            camelCase: function (a) {
                return a.replace(ga, "ms-").replace(ha, ia);
            },
            nodeName: function (a, b) {
                return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
            },
            each: function (a, b, d) {
                var e,
                    f = 0,
                    g = a.length,
                    h = c(a);
                if (d) {
                    if (h) for (; g > f && ((e = b.apply(a[f], d)), e !== !1); f++);
                    else for (f in a) if (((e = b.apply(a[f], d)), e === !1)) break;
                } else if (h) for (; g > f && ((e = b.call(a[f], f, a[f])), e !== !1); f++);
                else for (f in a) if (((e = b.call(a[f], f, a[f])), e === !1)) break;
                return a;
            },
            trim: function (a) {
                return null == a ? "" : (a + "").replace(fa, "");
            },
            makeArray: function (a, b) {
                var d = b || [];
                return null != a && (c(Object(a)) ? ea.merge(d, "string" == typeof a ? [a] : a) : Z.call(d, a)), d;
            },
            inArray: function (a, b, c) {
                var d;
                if (b) {
                    if ($) return $.call(b, a, c);
                    for (d = b.length, c = c ? (0 > c ? Math.max(0, d + c) : c) : 0; d > c; c++) if (c in b && b[c] === a) return c;
                }
                return -1;
            },
            merge: function (a, b) {
                for (var c = +b.length, d = 0, e = a.length; c > d; ) a[e++] = b[d++];
                if (c !== c) for (; void 0 !== b[d]; ) a[e++] = b[d++];
                return (a.length = e), a;
            },
            grep: function (a, b, c) {
                for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) (d = !b(a[f], f)), d !== h && e.push(a[f]);
                return e;
            },
            map: function (a, b, d) {
                var e,
                    f = 0,
                    g = a.length,
                    h = c(a),
                    i = [];
                if (h) for (; g > f; f++) (e = b(a[f], f, d)), null != e && i.push(e);
                else for (f in a) (e = b(a[f], f, d)), null != e && i.push(e);
                return Y.apply([], i);
            },
            guid: 1,
            proxy: function (a, b) {
                var c, d, e;
                return (
                    "string" == typeof b && ((e = a[b]), (b = a), (a = e)),
                    ea.isFunction(a)
                        ? ((c = X.call(arguments, 2)),
                          (d = function () {
                              return a.apply(b || this, c.concat(X.call(arguments)));
                          }),
                          (d.guid = a.guid = a.guid || ea.guid++),
                          d)
                        : void 0
                );
            },
            now: function () {
                return +new Date();
            },
            support: ca,
        }),
        ea.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
            _["[object " + b + "]"] = b.toLowerCase();
        });
    var ja = (function (a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if (((b ? b.ownerDocument || b : O) !== G && F(b), (b = b || G), (c = c || []), (h = b.nodeType), "string" != typeof a || !a || (1 !== h && 9 !== h && 11 !== h))) return c;
            if (!d && I) {
                if (11 !== h && (e = sa.exec(a)))
                    if ((g = e[1])) {
                        if (9 === h) {
                            if (((f = b.getElementById(g)), !f || !f.parentNode)) return c;
                            if (f.id === g) return c.push(f), c;
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c;
                    } else {
                        if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                        if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), c;
                    }
                if (v.qsa && (!J || !J.test(a))) {
                    if (((n = l = N), (o = b), (p = 1 !== h && a), 1 === h && "object" !== b.nodeName.toLowerCase())) {
                        for (j = z(a), (l = b.getAttribute("id")) ? (n = l.replace(ua, "\\$&")) : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--; ) j[i] = n + m(j[i]);
                        (o = (ta.test(a) && k(b.parentNode)) || b), (p = j.join(","));
                    }
                    if (p)
                        try {
                            return $.apply(c, o.querySelectorAll(p)), c;
                        } catch (q) {
                        } finally {
                            l || b.removeAttribute("id");
                        }
                }
            }
            return B(a.replace(ia, "$1"), b, c, d);
        }
        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()], (a[c + " "] = d);
            }
            var b = [];
            return a;
        }
        function d(a) {
            return (a[N] = !0), a;
        }
        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), (b = null);
            }
        }
        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--; ) w.attrHandle[c[d]] = b;
        }
        function g(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d) return d;
            if (c) for (; (c = c.nextSibling); ) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function h(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a;
            };
        }
        function i(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function j(a) {
            return d(function (b) {
                return (
                    (b = +b),
                    d(function (c, d) {
                        for (var e, f = a([], c.length, b), g = f.length; g--; ) c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
                    })
                );
            });
        }
        function k(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a;
        }
        function l() {}
        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function n(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = Q++;
            return b.first
                ? function (b, c, f) {
                      for (; (b = b[d]); ) if (1 === b.nodeType || e) return a(b, c, f);
                  }
                : function (b, c, g) {
                      var h,
                          i,
                          j = [P, f];
                      if (g) {
                          for (; (b = b[d]); ) if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
                      } else
                          for (; (b = b[d]); )
                              if (1 === b.nodeType || e) {
                                  if (((i = b[N] || (b[N] = {})), (h = i[d]) && h[0] === P && h[1] === f)) return (j[2] = h[2]);
                                  if (((i[d] = j), (j[2] = a(b, c, g)))) return !0;
                              }
                  };
        }
        function o(a) {
            return a.length > 1
                ? function (b, c, d) {
                      for (var e = a.length; e--; ) if (!a[e](b, c, d)) return !1;
                      return !0;
                  }
                : a[0];
        }
        function p(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
            return d;
        }
        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++) (f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g;
        }
        function r(a, b, c, e, f, g) {
            return (
                e && !e[N] && (e = r(e)),
                f && !f[N] && (f = r(f, g)),
                d(function (d, g, h, i) {
                    var j,
                        k,
                        l,
                        m = [],
                        n = [],
                        o = g.length,
                        r = d || p(b || "*", h.nodeType ? [h] : h, []),
                        s = !a || (!d && b) ? r : q(r, m, a, h, i),
                        t = c ? (f || (d ? a : o || e) ? [] : g) : s;
                    if ((c && c(s, t, h, i), e)) for (j = q(t, n), e(j, [], h, i), k = j.length; k--; ) (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                    if (d) {
                        if (f || a) {
                            if (f) {
                                for (j = [], k = t.length; k--; ) (l = t[k]) && j.push((s[k] = l));
                                f(null, (t = []), j, i);
                            }
                            for (k = t.length; k--; ) (l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l));
                        }
                    } else (t = q(t === g ? t.splice(o, t.length) : t)), f ? f(null, g, t, i) : $.apply(g, t);
                })
            );
        }
        function s(a) {
            for (
                var b,
                    c,
                    d,
                    e = a.length,
                    f = w.relative[a[0].type],
                    g = f || w.relative[" "],
                    h = f ? 1 : 0,
                    i = n(
                        function (a) {
                            return a === b;
                        },
                        g,
                        !0
                    ),
                    j = n(
                        function (a) {
                            return aa(b, a) > -1;
                        },
                        g,
                        !0
                    ),
                    k = [
                        function (a, c, d) {
                            var e = (!f && (d || c !== C)) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                            return (b = null), e;
                        },
                    ];
                e > h;
                h++
            )
                if ((c = w.relative[a[h].type])) k = [n(o(k), c)];
                else {
                    if (((c = w.filter[a[h].type].apply(null, a[h].matches)), c[N])) {
                        for (d = ++h; e > d && !w.relative[a[d].type]; d++);
                        return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({ value: " " === a[h - 2].type ? "*" : "" })).replace(ia, "$1"), c, d > h && s(a.slice(h, d)), e > d && s((a = a.slice(d))), e > d && m(a));
                    }
                    k.push(c);
                }
            return o(k);
        }
        function t(a, c) {
            var e = c.length > 0,
                f = a.length > 0,
                g = function (d, g, h, i, j) {
                    var k,
                        l,
                        m,
                        n = 0,
                        o = "0",
                        p = d && [],
                        r = [],
                        s = C,
                        t = d || (f && w.find.TAG("*", j)),
                        u = (P += null == s ? 1 : Math.random() || 0.1),
                        v = t.length;
                    for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0; (m = a[l++]); )
                                if (m(k, g, h)) {
                                    i.push(k);
                                    break;
                                }
                            j && (P = u);
                        }
                        e && ((k = !m && k) && n--, d && p.push(k));
                    }
                    if (((n += o), e && o !== n)) {
                        for (l = 0; (m = c[l++]); ) m(p, r, g, h);
                        if (d) {
                            if (n > 0) for (; o--; ) p[o] || r[o] || (r[o] = Y.call(i));
                            r = q(r);
                        }
                        $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i);
                    }
                    return j && ((P = u), (C = s)), p;
                };
            return e ? d(g) : g;
        }
        var u,
            v,
            w,
            x,
            y,
            z,
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H,
            I,
            J,
            K,
            L,
            M,
            N = "sizzle" + 1 * new Date(),
            O = a.document,
            P = 0,
            Q = 0,
            R = c(),
            S = c(),
            T = c(),
            U = function (a, b) {
                return a === b && (E = !0), 0;
            },
            V = 1 << 31,
            W = {}.hasOwnProperty,
            X = [],
            Y = X.pop,
            Z = X.push,
            $ = X.push,
            _ = X.slice,
            aa = function (a, b) {
                for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
                return -1;
            },
            ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ca = "[\\x20\\t\\r\\n\\f]",
            da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ea = da.replace("w", "w#"),
            fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]",
            ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)",
            ha = new RegExp(ca + "+", "g"),
            ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
            ja = new RegExp("^" + ca + "*," + ca + "*"),
            ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
            la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
            ma = new RegExp(ga),
            na = new RegExp("^" + ea + "$"),
            oa = {
                ID: new RegExp("^#(" + da + ")"),
                CLASS: new RegExp("^\\.(" + da + ")"),
                TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + fa),
                PSEUDO: new RegExp("^" + ga),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ba + ")$", "i"),
                needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i"),
            },
            pa = /^(?:input|select|textarea|button)$/i,
            qa = /^h\d$/i,
            ra = /^[^{]+\{\s*\[native \w/,
            sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ta = /[+~]/,
            ua = /'|\\/g,
            va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
            wa = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode((d >> 10) | 55296, (1023 & d) | 56320);
            },
            xa = function () {
                F();
            };
        try {
            $.apply((X = _.call(O.childNodes)), O.childNodes), X[O.childNodes.length].nodeType;
        } catch (ya) {
            $ = {
                apply: X.length
                    ? function (a, b) {
                          Z.apply(a, _.call(b));
                      }
                    : function (a, b) {
                          for (var c = a.length, d = 0; (a[c++] = b[d++]); );
                          a.length = c - 1;
                      },
            };
        }
        (v = b.support = {}),
            (y = b.isXML = function (a) {
                var b = a && (a.ownerDocument || a).documentElement;
                return b ? "HTML" !== b.nodeName : !1;
            }),
            (F = b.setDocument = function (a) {
                var b,
                    c,
                    d = a ? a.ownerDocument || a : O;
                return d !== G && 9 === d.nodeType && d.documentElement
                    ? ((G = d),
                      (H = d.documentElement),
                      (c = d.defaultView),
                      c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)),
                      (I = !y(d)),
                      (v.attributes = e(function (a) {
                          return (a.className = "i"), !a.getAttribute("className");
                      })),
                      (v.getElementsByTagName = e(function (a) {
                          return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length;
                      })),
                      (v.getElementsByClassName = ra.test(d.getElementsByClassName)),
                      (v.getById = e(function (a) {
                          return (H.appendChild(a).id = N), !d.getElementsByName || !d.getElementsByName(N).length;
                      })),
                      v.getById
                          ? ((w.find.ID = function (a, b) {
                                if ("undefined" != typeof b.getElementById && I) {
                                    var c = b.getElementById(a);
                                    return c && c.parentNode ? [c] : [];
                                }
                            }),
                            (w.filter.ID = function (a) {
                                var b = a.replace(va, wa);
                                return function (a) {
                                    return a.getAttribute("id") === b;
                                };
                            }))
                          : (delete w.find.ID,
                            (w.filter.ID = function (a) {
                                var b = a.replace(va, wa);
                                return function (a) {
                                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                                    return c && c.value === b;
                                };
                            })),
                      (w.find.TAG = v.getElementsByTagName
                          ? function (a, b) {
                                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0;
                            }
                          : function (a, b) {
                                var c,
                                    d = [],
                                    e = 0,
                                    f = b.getElementsByTagName(a);
                                if ("*" === a) {
                                    for (; (c = f[e++]); ) 1 === c.nodeType && d.push(c);
                                    return d;
                                }
                                return f;
                            }),
                      (w.find.CLASS =
                          v.getElementsByClassName &&
                          function (a, b) {
                              return I ? b.getElementsByClassName(a) : void 0;
                          }),
                      (K = []),
                      (J = []),
                      (v.qsa = ra.test(d.querySelectorAll)) &&
                          (e(function (a) {
                              (H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>"),
                                  a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"),
                                  a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"),
                                  a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="),
                                  a.querySelectorAll(":checked").length || J.push(":checked"),
                                  a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]");
                          }),
                          e(function (a) {
                              var b = d.createElement("input");
                              b.setAttribute("type", "hidden"),
                                  a.appendChild(b).setAttribute("name", "D"),
                                  a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="),
                                  a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"),
                                  a.querySelectorAll("*,:x"),
                                  J.push(",.*:");
                          })),
                      (v.matchesSelector = ra.test((L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector))) &&
                          e(function (a) {
                              (v.disconnectedMatch = L.call(a, "div")), L.call(a, "[s!='']:x"), K.push("!=", ga);
                          }),
                      (J = J.length && new RegExp(J.join("|"))),
                      (K = K.length && new RegExp(K.join("|"))),
                      (b = ra.test(H.compareDocumentPosition)),
                      (M =
                          b || ra.test(H.contains)
                              ? function (a, b) {
                                    var c = 9 === a.nodeType ? a.documentElement : a,
                                        d = b && b.parentNode;
                                    return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
                                }
                              : function (a, b) {
                                    if (b) for (; (b = b.parentNode); ) if (b === a) return !0;
                                    return !1;
                                }),
                      (U = b
                          ? function (a, b) {
                                if (a === b) return (E = !0), 0;
                                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                                return c
                                    ? c
                                    : ((c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1),
                                      1 & c || (!v.sortDetached && b.compareDocumentPosition(a) === c)
                                          ? a === d || (a.ownerDocument === O && M(O, a))
                                              ? -1
                                              : b === d || (b.ownerDocument === O && M(O, b))
                                              ? 1
                                              : D
                                              ? aa(D, a) - aa(D, b)
                                              : 0
                                          : 4 & c
                                          ? -1
                                          : 1);
                            }
                          : function (a, b) {
                                if (a === b) return (E = !0), 0;
                                var c,
                                    e = 0,
                                    f = a.parentNode,
                                    h = b.parentNode,
                                    i = [a],
                                    j = [b];
                                if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                                if (f === h) return g(a, b);
                                for (c = a; (c = c.parentNode); ) i.unshift(c);
                                for (c = b; (c = c.parentNode); ) j.unshift(c);
                                for (; i[e] === j[e]; ) e++;
                                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0;
                            }),
                      d)
                    : G;
            }),
            (b.matches = function (a, c) {
                return b(a, null, null, c);
            }),
            (b.matchesSelector = function (a, c) {
                if (((a.ownerDocument || a) !== G && F(a), (c = c.replace(la, "='$1']")), !(!v.matchesSelector || !I || (K && K.test(c)) || (J && J.test(c)))))
                    try {
                        var d = L.call(a, c);
                        if (d || v.disconnectedMatch || (a.document && 11 !== a.document.nodeType)) return d;
                    } catch (e) {}
                return b(c, G, null, [a]).length > 0;
            }),
            (b.contains = function (a, b) {
                return (a.ownerDocument || a) !== G && F(a), M(a, b);
            }),
            (b.attr = function (a, b) {
                (a.ownerDocument || a) !== G && F(a);
                var c = w.attrHandle[b.toLowerCase()],
                    d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
                return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
            }),
            (b.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a);
            }),
            (b.uniqueSort = function (a) {
                var b,
                    c = [],
                    d = 0,
                    e = 0;
                if (((E = !v.detectDuplicates), (D = !v.sortStable && a.slice(0)), a.sort(U), E)) {
                    for (; (b = a[e++]); ) b === a[e] && (d = c.push(e));
                    for (; d--; ) a.splice(c[d], 1);
                }
                return (D = null), a;
            }),
            (x = b.getText = function (a) {
                var b,
                    c = "",
                    d = 0,
                    e = a.nodeType;
                if (e) {
                    if (1 === e || 9 === e || 11 === e) {
                        if ("string" == typeof a.textContent) return a.textContent;
                        for (a = a.firstChild; a; a = a.nextSibling) c += x(a);
                    } else if (3 === e || 4 === e) return a.nodeValue;
                } else for (; (b = a[d++]); ) c += x(b);
                return c;
            }),
            (w = b.selectors = {
                cacheLength: 50,
                createPseudo: d,
                match: oa,
                attrHandle: {},
                find: {},
                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                preFilter: {
                    ATTR: function (a) {
                        return (a[1] = a[1].replace(va, wa)), (a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa)), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
                    },
                    CHILD: function (a) {
                        return (
                            (a[1] = a[1].toLowerCase()),
                            "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), (a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3]))), (a[5] = +(a[7] + a[8] || "odd" === a[3]))) : a[3] && b.error(a[0]),
                            a
                        );
                    },
                    PSEUDO: function (a) {
                        var b,
                            c = !a[6] && a[2];
                        return oa.CHILD.test(a[0])
                            ? null
                            : (a[3] ? (a[2] = a[4] || a[5] || "") : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && ((a[0] = a[0].slice(0, b)), (a[2] = c.slice(0, b))), a.slice(0, 3));
                    },
                },
                filter: {
                    TAG: function (a) {
                        var b = a.replace(va, wa).toLowerCase();
                        return "*" === a
                            ? function () {
                                  return !0;
                              }
                            : function (a) {
                                  return a.nodeName && a.nodeName.toLowerCase() === b;
                              };
                    },
                    CLASS: function (a) {
                        var b = R[a + " "];
                        return (
                            b ||
                            ((b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) &&
                                R(a, function (a) {
                                    return b.test(("string" == typeof a.className && a.className) || ("undefined" != typeof a.getAttribute && a.getAttribute("class")) || "");
                                }))
                        );
                    },
                    ATTR: function (a, c, d) {
                        return function (e) {
                            var f = b.attr(e, a);
                            return null == f
                                ? "!=" === c
                                : c
                                ? ((f += ""),
                                  "=" === c
                                      ? f === d
                                      : "!=" === c
                                      ? f !== d
                                      : "^=" === c
                                      ? d && 0 === f.indexOf(d)
                                      : "*=" === c
                                      ? d && f.indexOf(d) > -1
                                      : "$=" === c
                                      ? d && f.slice(-d.length) === d
                                      : "~=" === c
                                      ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1
                                      : "|=" === c
                                      ? f === d || f.slice(0, d.length + 1) === d + "-"
                                      : !1)
                                : !0;
                        };
                    },
                    CHILD: function (a, b, c, d, e) {
                        var f = "nth" !== a.slice(0, 3),
                            g = "last" !== a.slice(-4),
                            h = "of-type" === b;
                        return 1 === d && 0 === e
                            ? function (a) {
                                  return !!a.parentNode;
                              }
                            : function (b, c, i) {
                                  var j,
                                      k,
                                      l,
                                      m,
                                      n,
                                      o,
                                      p = f !== g ? "nextSibling" : "previousSibling",
                                      q = b.parentNode,
                                      r = h && b.nodeName.toLowerCase(),
                                      s = !i && !h;
                                  if (q) {
                                      if (f) {
                                          for (; p; ) {
                                              for (l = b; (l = l[p]); ) if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                              o = p = "only" === a && !o && "nextSibling";
                                          }
                                          return !0;
                                      }
                                      if (((o = [g ? q.firstChild : q.lastChild]), g && s)) {
                                          for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; (l = (++n && l && l[p]) || (m = n = 0) || o.pop()); )
                                              if (1 === l.nodeType && ++m && l === b) {
                                                  k[a] = [P, n, m];
                                                  break;
                                              }
                                      } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                                      else for (; (l = (++n && l && l[p]) || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)); );
                                      return (m -= e), m === d || (m % d === 0 && m / d >= 0);
                                  }
                              };
                    },
                    PSEUDO: function (a, c) {
                        var e,
                            f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                        return f[N]
                            ? f(c)
                            : f.length > 1
                            ? ((e = [a, a, "", c]),
                              w.setFilters.hasOwnProperty(a.toLowerCase())
                                  ? d(function (a, b) {
                                        for (var d, e = f(a, c), g = e.length; g--; ) (d = aa(a, e[g])), (a[d] = !(b[d] = e[g]));
                                    })
                                  : function (a) {
                                        return f(a, 0, e);
                                    })
                            : f;
                    },
                },
                pseudos: {
                    not: d(function (a) {
                        var b = [],
                            c = [],
                            e = A(a.replace(ia, "$1"));
                        return e[N]
                            ? d(function (a, b, c, d) {
                                  for (var f, g = e(a, null, d, []), h = a.length; h--; ) (f = g[h]) && (a[h] = !(b[h] = f));
                              })
                            : function (a, d, f) {
                                  return (b[0] = a), e(b, null, f, c), (b[0] = null), !c.pop();
                              };
                    }),
                    has: d(function (a) {
                        return function (c) {
                            return b(a, c).length > 0;
                        };
                    }),
                    contains: d(function (a) {
                        return (
                            (a = a.replace(va, wa)),
                            function (b) {
                                return (b.textContent || b.innerText || x(b)).indexOf(a) > -1;
                            }
                        );
                    }),
                    lang: d(function (a) {
                        return (
                            na.test(a || "") || b.error("unsupported lang: " + a),
                            (a = a.replace(va, wa).toLowerCase()),
                            function (b) {
                                var c;
                                do if ((c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))) return (c = c.toLowerCase()), c === a || 0 === c.indexOf(a + "-");
                                while ((b = b.parentNode) && 1 === b.nodeType);
                                return !1;
                            }
                        );
                    }),
                    target: function (b) {
                        var c = a.location && a.location.hash;
                        return c && c.slice(1) === b.id;
                    },
                    root: function (a) {
                        return a === H;
                    },
                    focus: function (a) {
                        return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
                    },
                    enabled: function (a) {
                        return a.disabled === !1;
                    },
                    disabled: function (a) {
                        return a.disabled === !0;
                    },
                    checked: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return ("input" === b && !!a.checked) || ("option" === b && !!a.selected);
                    },
                    selected: function (a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                    },
                    empty: function (a) {
                        for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (a) {
                        return !w.pseudos.empty(a);
                    },
                    header: function (a) {
                        return qa.test(a.nodeName);
                    },
                    input: function (a) {
                        return pa.test(a.nodeName);
                    },
                    button: function (a) {
                        var b = a.nodeName.toLowerCase();
                        return ("input" === b && "button" === a.type) || "button" === b;
                    },
                    text: function (a) {
                        var b;
                        return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
                    },
                    first: j(function () {
                        return [0];
                    }),
                    last: j(function (a, b) {
                        return [b - 1];
                    }),
                    eq: j(function (a, b, c) {
                        return [0 > c ? c + b : c];
                    }),
                    even: j(function (a, b) {
                        for (var c = 0; b > c; c += 2) a.push(c);
                        return a;
                    }),
                    odd: j(function (a, b) {
                        for (var c = 1; b > c; c += 2) a.push(c);
                        return a;
                    }),
                    lt: j(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; --d >= 0; ) a.push(d);
                        return a;
                    }),
                    gt: j(function (a, b, c) {
                        for (var d = 0 > c ? c + b : c; ++d < b; ) a.push(d);
                        return a;
                    }),
                },
            }),
            (w.pseudos.nth = w.pseudos.eq);
        for (u in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) w.pseudos[u] = h(u);
        for (u in { submit: !0, reset: !0 }) w.pseudos[u] = i(u);
        return (
            (l.prototype = w.filters = w.pseudos),
            (w.setFilters = new l()),
            (z = b.tokenize = function (a, c) {
                var d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k = S[a + " "];
                if (k) return c ? 0 : k.slice(0);
                for (h = a, i = [], j = w.preFilter; h; ) {
                    (!d || (e = ja.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push((f = []))), (d = !1), (e = ka.exec(h)) && ((d = e.shift()), f.push({ value: d, type: e[0].replace(ia, " ") }), (h = h.slice(d.length)));
                    for (g in w.filter) !(e = oa[g].exec(h)) || (j[g] && !(e = j[g](e))) || ((d = e.shift()), f.push({ value: d, type: g, matches: e }), (h = h.slice(d.length)));
                    if (!d) break;
                }
                return c ? h.length : h ? b.error(a) : S(a, i).slice(0);
            }),
            (A = b.compile = function (a, b) {
                var c,
                    d = [],
                    e = [],
                    f = T[a + " "];
                if (!f) {
                    for (b || (b = z(a)), c = b.length; c--; ) (f = s(b[c])), f[N] ? d.push(f) : e.push(f);
                    (f = T(a, t(e, d))), (f.selector = a);
                }
                return f;
            }),
            (B = b.select = function (a, b, c, d) {
                var e,
                    f,
                    g,
                    h,
                    i,
                    j = "function" == typeof a && a,
                    l = !d && z((a = j.selector || a));
                if (((c = c || []), 1 === l.length)) {
                    if (((f = l[0] = l[0].slice(0)), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type])) {
                        if (((b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0]), !b)) return c;
                        j && (b = b.parentNode), (a = a.slice(f.shift().value.length));
                    }
                    for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && ((g = f[e]), !w.relative[(h = g.type)]); )
                        if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), (ta.test(f[0].type) && k(b.parentNode)) || b))) {
                            if ((f.splice(e, 1), (a = d.length && m(f)), !a)) return $.apply(c, d), c;
                            break;
                        }
                }
                return (j || A(a, l))(d, b, !I, c, (ta.test(a) && k(b.parentNode)) || b), c;
            }),
            (v.sortStable = N.split("").sort(U).join("") === N),
            (v.detectDuplicates = !!E),
            F(),
            (v.sortDetached = e(function (a) {
                return 1 & a.compareDocumentPosition(G.createElement("div"));
            })),
            e(function (a) {
                return (a.innerHTML = "<a href='#'></a>"), "#" === a.firstChild.getAttribute("href");
            }) ||
                f("type|href|height|width", function (a, b, c) {
                    return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
                }),
            (v.attributes &&
                e(function (a) {
                    return (a.innerHTML = "<input/>"), a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
                })) ||
                f("value", function (a, b, c) {
                    return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue;
                }),
            e(function (a) {
                return null == a.getAttribute("disabled");
            }) ||
                f(ba, function (a, b, c) {
                    var d;
                    return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
                }),
            b
        );
    })(a);
    (ea.find = ja), (ea.expr = ja.selectors), (ea.expr[":"] = ea.expr.pseudos), (ea.unique = ja.uniqueSort), (ea.text = ja.getText), (ea.isXMLDoc = ja.isXML), (ea.contains = ja.contains);
    var ka = ea.expr.match.needsContext,
        la = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ma = /^.[^:#\[\.,]*$/;
    (ea.filter = function (a, b, c) {
        var d = b[0];
        return (
            c && (a = ":not(" + a + ")"),
            1 === b.length && 1 === d.nodeType
                ? ea.find.matchesSelector(d, a)
                    ? [d]
                    : []
                : ea.find.matches(
                      a,
                      ea.grep(b, function (a) {
                          return 1 === a.nodeType;
                      })
                  )
        );
    }),
        ea.fn.extend({
            find: function (a) {
                var b,
                    c = [],
                    d = this,
                    e = d.length;
                if ("string" != typeof a)
                    return this.pushStack(
                        ea(a).filter(function () {
                            for (b = 0; e > b; b++) if (ea.contains(d[b], this)) return !0;
                        })
                    );
                for (b = 0; e > b; b++) ea.find(a, d[b], c);
                return (c = this.pushStack(e > 1 ? ea.unique(c) : c)), (c.selector = this.selector ? this.selector + " " + a : a), c;
            },
            filter: function (a) {
                return this.pushStack(d(this, a || [], !1));
            },
            not: function (a) {
                return this.pushStack(d(this, a || [], !0));
            },
            is: function (a) {
                return !!d(this, "string" == typeof a && ka.test(a) ? ea(a) : a || [], !1).length;
            },
        });
    var na,
        oa = a.document,
        pa = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        qa = (ea.fn.init = function (a, b) {
            var c, d;
            if (!a) return this;
            if ("string" == typeof a) {
                if (((c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : pa.exec(a)), !c || (!c[1] && b))) return !b || b.jquery ? (b || na).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (((b = b instanceof ea ? b[0] : b), ea.merge(this, ea.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : oa, !0)), la.test(c[1]) && ea.isPlainObject(b)))
                        for (c in b) ea.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this;
                }
                if (((d = oa.getElementById(c[2])), d && d.parentNode)) {
                    if (d.id !== c[2]) return na.find(a);
                    (this.length = 1), (this[0] = d);
                }
                return (this.context = oa), (this.selector = a), this;
            }
            return a.nodeType
                ? ((this.context = this[0] = a), (this.length = 1), this)
                : ea.isFunction(a)
                ? "undefined" != typeof na.ready
                    ? na.ready(a)
                    : a(ea)
                : (void 0 !== a.selector && ((this.selector = a.selector), (this.context = a.context)), ea.makeArray(a, this));
        });
    (qa.prototype = ea.fn), (na = ea(oa));
    var ra = /^(?:parents|prev(?:Until|All))/,
        sa = { children: !0, contents: !0, next: !0, prev: !0 };
    ea.extend({
        dir: function (a, b, c) {
            for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !ea(e).is(c)); ) 1 === e.nodeType && d.push(e), (e = e[b]);
            return d;
        },
        sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c;
        },
    }),
        ea.fn.extend({
            has: function (a) {
                var b,
                    c = ea(a, this),
                    d = c.length;
                return this.filter(function () {
                    for (b = 0; d > b; b++) if (ea.contains(this, c[b])) return !0;
                });
            },
            closest: function (a, b) {
                for (var c, d = 0, e = this.length, f = [], g = ka.test(a) || "string" != typeof a ? ea(a, b || this.context) : 0; e > d; d++)
                    for (c = this[d]; c && c !== b; c = c.parentNode)
                        if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ea.find.matchesSelector(c, a))) {
                            f.push(c);
                            break;
                        }
                return this.pushStack(f.length > 1 ? ea.unique(f) : f);
            },
            index: function (a) {
                return a ? ("string" == typeof a ? ea.inArray(this[0], ea(a)) : ea.inArray(a.jquery ? a[0] : a, this)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (a, b) {
                return this.pushStack(ea.unique(ea.merge(this.get(), ea(a, b))));
            },
            addBack: function (a) {
                return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
            },
        }),
        ea.each(
            {
                parent: function (a) {
                    var b = a.parentNode;
                    return b && 11 !== b.nodeType ? b : null;
                },
                parents: function (a) {
                    return ea.dir(a, "parentNode");
                },
                parentsUntil: function (a, b, c) {
                    return ea.dir(a, "parentNode", c);
                },
                next: function (a) {
                    return e(a, "nextSibling");
                },
                prev: function (a) {
                    return e(a, "previousSibling");
                },
                nextAll: function (a) {
                    return ea.dir(a, "nextSibling");
                },
                prevAll: function (a) {
                    return ea.dir(a, "previousSibling");
                },
                nextUntil: function (a, b, c) {
                    return ea.dir(a, "nextSibling", c);
                },
                prevUntil: function (a, b, c) {
                    return ea.dir(a, "previousSibling", c);
                },
                siblings: function (a) {
                    return ea.sibling((a.parentNode || {}).firstChild, a);
                },
                children: function (a) {
                    return ea.sibling(a.firstChild);
                },
                contents: function (a) {
                    return ea.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : ea.merge([], a.childNodes);
                },
            },
            function (a, b) {
                ea.fn[a] = function (c, d) {
                    var e = ea.map(this, b, c);
                    return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ea.filter(d, e)), this.length > 1 && (sa[a] || (e = ea.unique(e)), ra.test(a) && (e = e.reverse())), this.pushStack(e);
                };
            }
        );
    var ta = /\S+/g,
        ua = {};
    (ea.Callbacks = function (a) {
        a = "string" == typeof a ? ua[a] || f(a) : ea.extend({}, a);
        var b,
            c,
            d,
            e,
            g,
            h,
            i = [],
            j = !a.once && [],
            k = function (f) {
                for (c = a.memory && f, d = !0, g = h || 0, h = 0, e = i.length, b = !0; i && e > g; g++)
                    if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                        c = !1;
                        break;
                    }
                (b = !1), i && (j ? j.length && k(j.shift()) : c ? (i = []) : l.disable());
            },
            l = {
                add: function () {
                    if (i) {
                        var d = i.length;
                        !(function f(b) {
                            ea.each(b, function (b, c) {
                                var d = ea.type(c);
                                "function" === d ? (a.unique && l.has(c)) || i.push(c) : c && c.length && "string" !== d && f(c);
                            });
                        })(arguments),
                            b ? (e = i.length) : c && ((h = d), k(c));
                    }
                    return this;
                },
                remove: function () {
                    return (
                        i &&
                            ea.each(arguments, function (a, c) {
                                for (var d; (d = ea.inArray(c, i, d)) > -1; ) i.splice(d, 1), b && (e >= d && e--, g >= d && g--);
                            }),
                        this
                    );
                },
                has: function (a) {
                    return a ? ea.inArray(a, i) > -1 : !(!i || !i.length);
                },
                empty: function () {
                    return (i = []), (e = 0), this;
                },
                disable: function () {
                    return (i = j = c = void 0), this;
                },
                disabled: function () {
                    return !i;
                },
                lock: function () {
                    return (j = void 0), c || l.disable(), this;
                },
                locked: function () {
                    return !j;
                },
                fireWith: function (a, c) {
                    return !i || (d && !j) || ((c = c || []), (c = [a, c.slice ? c.slice() : c]), b ? j.push(c) : k(c)), this;
                },
                fire: function () {
                    return l.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!d;
                },
            };
        return l;
    }),
        ea.extend({
            Deferred: function (a) {
                var b = [
                        ["resolve", "done", ea.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", ea.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", ea.Callbacks("memory")],
                    ],
                    c = "pending",
                    d = {
                        state: function () {
                            return c;
                        },
                        always: function () {
                            return e.done(arguments).fail(arguments), this;
                        },
                        then: function () {
                            var a = arguments;
                            return ea
                                .Deferred(function (c) {
                                    ea.each(b, function (b, f) {
                                        var g = ea.isFunction(a[b]) && a[b];
                                        e[f[1]](function () {
                                            var a = g && g.apply(this, arguments);
                                            a && ea.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments);
                                        });
                                    }),
                                        (a = null);
                                })
                                .promise();
                        },
                        promise: function (a) {
                            return null != a ? ea.extend(a, d) : d;
                        },
                    },
                    e = {};
                return (
                    (d.pipe = d.then),
                    ea.each(b, function (a, f) {
                        var g = f[2],
                            h = f[3];
                        (d[f[1]] = g.add),
                            h &&
                                g.add(
                                    function () {
                                        c = h;
                                    },
                                    b[1 ^ a][2].disable,
                                    b[2][2].lock
                                ),
                            (e[f[0]] = function () {
                                return e[f[0] + "With"](this === e ? d : this, arguments), this;
                            }),
                            (e[f[0] + "With"] = g.fireWith);
                    }),
                    d.promise(e),
                    a && a.call(e, e),
                    e
                );
            },
            when: function (a) {
                var b,
                    c,
                    d,
                    e = 0,
                    f = X.call(arguments),
                    g = f.length,
                    h = 1 !== g || (a && ea.isFunction(a.promise)) ? g : 0,
                    i = 1 === h ? a : ea.Deferred(),
                    j = function (a, c, d) {
                        return function (e) {
                            (c[a] = this), (d[a] = arguments.length > 1 ? X.call(arguments) : e), d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d);
                        };
                    };
                if (g > 1) for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && ea.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
                return h || i.resolveWith(d, f), i.promise();
            },
        });
    var va;
    (ea.fn.ready = function (a) {
        return ea.ready.promise().done(a), this;
    }),
        ea.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (a) {
                a ? ea.readyWait++ : ea.ready(!0);
            },
            ready: function (a) {
                if (a === !0 ? !--ea.readyWait : !ea.isReady) {
                    if (!oa.body) return setTimeout(ea.ready);
                    (ea.isReady = !0), (a !== !0 && --ea.readyWait > 0) || (va.resolveWith(oa, [ea]), ea.fn.triggerHandler && (ea(oa).triggerHandler("ready"), ea(oa).off("ready")));
                }
            },
        }),
        (ea.ready.promise = function (b) {
            if (!va)
                if (((va = ea.Deferred()), "complete" === oa.readyState)) setTimeout(ea.ready);
                else if (oa.addEventListener) oa.addEventListener("DOMContentLoaded", h, !1), a.addEventListener("load", h, !1);
                else {
                    oa.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
                    var c = !1;
                    try {
                        c = null == a.frameElement && oa.documentElement;
                    } catch (d) {}
                    c &&
                        c.doScroll &&
                        !(function e() {
                            if (!ea.isReady) {
                                try {
                                    c.doScroll("left");
                                } catch (a) {
                                    return setTimeout(e, 50);
                                }
                                g(), ea.ready();
                            }
                        })();
                }
            return va.promise(b);
        });
    var wa,
        xa = "undefined";
    for (wa in ea(ca)) break;
    (ca.ownLast = "0" !== wa),
        (ca.inlineBlockNeedsLayout = !1),
        ea(function () {
            var a, b, c, d;
            (c = oa.getElementsByTagName("body")[0]),
                c &&
                    c.style &&
                    ((b = oa.createElement("div")),
                    (d = oa.createElement("div")),
                    (d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                    c.appendChild(d).appendChild(b),
                    typeof b.style.zoom !== xa && ((b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"), (ca.inlineBlockNeedsLayout = a = 3 === b.offsetWidth), a && (c.style.zoom = 1)),
                    c.removeChild(d));
        }),
        (function () {
            var a = oa.createElement("div");
            if (null == ca.deleteExpando) {
                ca.deleteExpando = !0;
                try {
                    delete a.test;
                } catch (b) {
                    ca.deleteExpando = !1;
                }
            }
            a = null;
        })(),
        (ea.acceptData = function (a) {
            var b = ea.noData[(a.nodeName + " ").toLowerCase()],
                c = +a.nodeType || 1;
            return 1 !== c && 9 !== c ? !1 : !b || (b !== !0 && a.getAttribute("classid") === b);
        });
    var ya = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        za = /([A-Z])/g;
    ea.extend({
        cache: {},
        noData: { "applet ": !0, "embed ": !0, "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" },
        hasData: function (a) {
            return (a = a.nodeType ? ea.cache[a[ea.expando]] : a[ea.expando]), !!a && !j(a);
        },
        data: function (a, b, c) {
            return k(a, b, c);
        },
        removeData: function (a, b) {
            return l(a, b);
        },
        _data: function (a, b, c) {
            return k(a, b, c, !0);
        },
        _removeData: function (a, b) {
            return l(a, b, !0);
        },
    }),
        ea.fn.extend({
            data: function (a, b) {
                var c,
                    d,
                    e,
                    f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && ((e = ea.data(f)), 1 === f.nodeType && !ea._data(f, "parsedAttrs"))) {
                        for (c = g.length; c--; ) g[c] && ((d = g[c].name), 0 === d.indexOf("data-") && ((d = ea.camelCase(d.slice(5))), i(f, d, e[d])));
                        ea._data(f, "parsedAttrs", !0);
                    }
                    return e;
                }
                return "object" == typeof a
                    ? this.each(function () {
                          ea.data(this, a);
                      })
                    : arguments.length > 1
                    ? this.each(function () {
                          ea.data(this, a, b);
                      })
                    : f
                    ? i(f, a, ea.data(f, a))
                    : void 0;
            },
            removeData: function (a) {
                return this.each(function () {
                    ea.removeData(this, a);
                });
            },
        }),
        ea.extend({
            queue: function (a, b, c) {
                var d;
                return a ? ((b = (b || "fx") + "queue"), (d = ea._data(a, b)), c && (!d || ea.isArray(c) ? (d = ea._data(a, b, ea.makeArray(c))) : d.push(c)), d || []) : void 0;
            },
            dequeue: function (a, b) {
                b = b || "fx";
                var c = ea.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = ea._queueHooks(a, b),
                    g = function () {
                        ea.dequeue(a, b);
                    };
                "inprogress" === e && ((e = c.shift()), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
            },
            _queueHooks: function (a, b) {
                var c = b + "queueHooks";
                return (
                    ea._data(a, c) ||
                    ea._data(a, c, {
                        empty: ea.Callbacks("once memory").add(function () {
                            ea._removeData(a, b + "queue"), ea._removeData(a, c);
                        }),
                    })
                );
            },
        }),
        ea.fn.extend({
            queue: function (a, b) {
                var c = 2;
                return (
                    "string" != typeof a && ((b = a), (a = "fx"), c--),
                    arguments.length < c
                        ? ea.queue(this[0], a)
                        : void 0 === b
                        ? this
                        : this.each(function () {
                              var c = ea.queue(this, a, b);
                              ea._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ea.dequeue(this, a);
                          })
                );
            },
            dequeue: function (a) {
                return this.each(function () {
                    ea.dequeue(this, a);
                });
            },
            clearQueue: function (a) {
                return this.queue(a || "fx", []);
            },
            promise: function (a, b) {
                var c,
                    d = 1,
                    e = ea.Deferred(),
                    f = this,
                    g = this.length,
                    h = function () {
                        --d || e.resolveWith(f, [f]);
                    };
                for ("string" != typeof a && ((b = a), (a = void 0)), a = a || "fx"; g--; ) (c = ea._data(f[g], a + "queueHooks")), c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b);
            },
        });
    var Aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Ba = ["Top", "Right", "Bottom", "Left"],
        Ca = function (a, b) {
            return (a = b || a), "none" === ea.css(a, "display") || !ea.contains(a.ownerDocument, a);
        },
        Da = (ea.access = function (a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === ea.type(c)) {
                e = !0;
                for (h in c) ea.access(a, b, h, c[h], !0, f, g);
            } else if (
                void 0 !== d &&
                ((e = !0),
                ea.isFunction(d) || (g = !0),
                j &&
                    (g
                        ? (b.call(a, d), (b = null))
                        : ((j = b),
                          (b = function (a, b, c) {
                              return j.call(ea(a), c);
                          }))),
                b)
            )
                for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
        }),
        Ea = /^(?:checkbox|radio)$/i;
    !(function () {
        var a = oa.createElement("input"),
            b = oa.createElement("div"),
            c = oa.createDocumentFragment();
        if (
            ((b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
            (ca.leadingWhitespace = 3 === b.firstChild.nodeType),
            (ca.tbody = !b.getElementsByTagName("tbody").length),
            (ca.htmlSerialize = !!b.getElementsByTagName("link").length),
            (ca.html5Clone = "<:nav></:nav>" !== oa.createElement("nav").cloneNode(!0).outerHTML),
            (a.type = "checkbox"),
            (a.checked = !0),
            c.appendChild(a),
            (ca.appendChecked = a.checked),
            (b.innerHTML = "<textarea>x</textarea>"),
            (ca.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue),
            c.appendChild(b),
            (b.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
            (ca.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (ca.noCloneEvent = !0),
            b.attachEvent &&
                (b.attachEvent("onclick", function () {
                    ca.noCloneEvent = !1;
                }),
                b.cloneNode(!0).click()),
            null == ca.deleteExpando)
        ) {
            ca.deleteExpando = !0;
            try {
                delete b.test;
            } catch (d) {
                ca.deleteExpando = !1;
            }
        }
    })(),
        (function () {
            var b,
                c,
                d = oa.createElement("div");
            for (b in { submit: !0, change: !0, focusin: !0 }) (c = "on" + b), (ca[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), (ca[b + "Bubbles"] = d.attributes[c].expando === !1));
            d = null;
        })();
    var Fa = /^(?:input|select|textarea)$/i,
        Ga = /^key/,
        Ha = /^(?:mouse|pointer|contextmenu)|click/,
        Ia = /^(?:focusinfocus|focusoutblur)$/,
        Ja = /^([^.]*)(?:\.(.+)|)$/;
    (ea.event = {
        global: {},
        add: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                n,
                o,
                p,
                q = ea._data(a);
            if (q) {
                for (
                    c.handler && ((i = c), (c = i.handler), (e = i.selector)),
                        c.guid || (c.guid = ea.guid++),
                        (g = q.events) || (g = q.events = {}),
                        (k = q.handle) ||
                            ((k = q.handle = function (a) {
                                return typeof ea === xa || (a && ea.event.triggered === a.type) ? void 0 : ea.event.dispatch.apply(k.elem, arguments);
                            }),
                            (k.elem = a)),
                        b = (b || "").match(ta) || [""],
                        h = b.length;
                    h--;

                )
                    (f = Ja.exec(b[h]) || []),
                        (n = p = f[1]),
                        (o = (f[2] || "").split(".").sort()),
                        n &&
                            ((j = ea.event.special[n] || {}),
                            (n = (e ? j.delegateType : j.bindType) || n),
                            (j = ea.event.special[n] || {}),
                            (l = ea.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && ea.expr.match.needsContext.test(e), namespace: o.join(".") }, i)),
                            (m = g[n]) || ((m = g[n] = []), (m.delegateCount = 0), (j.setup && j.setup.call(a, d, o, k) !== !1) || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))),
                            j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)),
                            e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
                            (ea.event.global[n] = !0));
                a = null;
            }
        },
        remove: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                n,
                o,
                p,
                q = ea.hasData(a) && ea._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(ta) || [""], j = b.length; j--; )
                    if (((h = Ja.exec(b[j]) || []), (n = p = h[1]), (o = (h[2] || "").split(".").sort()), n)) {
                        for (l = ea.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--; )
                            (g = m[f]),
                                (!e && p !== g.origType) ||
                                    (c && c.guid !== g.guid) ||
                                    (h && !h.test(g.namespace)) ||
                                    (d && d !== g.selector && ("**" !== d || !g.selector)) ||
                                    (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !m.length && ((l.teardown && l.teardown.call(a, o, q.handle) !== !1) || ea.removeEvent(a, n, q.handle), delete k[n]);
                    } else for (n in k) ea.event.remove(a, n + b[j], c, d, !0);
                ea.isEmptyObject(k) && (delete q.handle, ea._removeData(a, "events"));
            }
        },
        trigger: function (b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m = [d || oa],
                n = ba.call(b, "type") ? b.type : b,
                o = ba.call(b, "namespace") ? b.namespace.split(".") : [];
            if (
                ((h = k = d = d || oa),
                3 !== d.nodeType &&
                    8 !== d.nodeType &&
                    !Ia.test(n + ea.event.triggered) &&
                    (n.indexOf(".") >= 0 && ((o = n.split(".")), (n = o.shift()), o.sort()),
                    (g = n.indexOf(":") < 0 && "on" + n),
                    (b = b[ea.expando] ? b : new ea.Event(n, "object" == typeof b && b)),
                    (b.isTrigger = e ? 2 : 3),
                    (b.namespace = o.join(".")),
                    (b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                    (b.result = void 0),
                    b.target || (b.target = d),
                    (c = null == c ? [b] : ea.makeArray(c, [b])),
                    (j = ea.event.special[n] || {}),
                    e || !j.trigger || j.trigger.apply(d, c) !== !1))
            ) {
                if (!e && !j.noBubble && !ea.isWindow(d)) {
                    for (i = j.delegateType || n, Ia.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), (k = h);
                    k === (d.ownerDocument || oa) && m.push(k.defaultView || k.parentWindow || a);
                }
                for (l = 0; (h = m[l++]) && !b.isPropagationStopped(); )
                    (b.type = l > 1 ? i : j.bindType || n),
                        (f = (ea._data(h, "events") || {})[b.type] && ea._data(h, "handle")),
                        f && f.apply(h, c),
                        (f = g && h[g]),
                        f && f.apply && ea.acceptData(h) && ((b.result = f.apply(h, c)), b.result === !1 && b.preventDefault());
                if (((b.type = n), !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && ea.acceptData(d) && g && d[n] && !ea.isWindow(d))) {
                    (k = d[g]), k && (d[g] = null), (ea.event.triggered = n);
                    try {
                        d[n]();
                    } catch (p) {}
                    (ea.event.triggered = void 0), k && (d[g] = k);
                }
                return b.result;
            }
        },
        dispatch: function (a) {
            a = ea.event.fix(a);
            var b,
                c,
                d,
                e,
                f,
                g = [],
                h = X.call(arguments),
                i = (ea._data(this, "events") || {})[a.type] || [],
                j = ea.event.special[a.type] || {};
            if (((h[0] = a), (a.delegateTarget = this), !j.preDispatch || j.preDispatch.call(this, a) !== !1)) {
                for (g = ea.event.handlers.call(this, a, i), b = 0; (e = g[b++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = e.elem, f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped(); )
                        (!a.namespace_re || a.namespace_re.test(d.namespace)) &&
                            ((a.handleObj = d), (a.data = d.data), (c = ((ea.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h)), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function (a, b) {
            var c,
                d,
                e,
                f,
                g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i != this; i = i.parentNode || this)
                    if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                        for (e = [], f = 0; h > f; f++) (d = b[f]), (c = d.selector + " "), void 0 === e[c] && (e[c] = d.needsContext ? ea(c, this).index(i) >= 0 : ea.find(c, this, null, [i]).length), e[c] && e.push(d);
                        e.length && g.push({ elem: i, handlers: e });
                    }
            return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
        },
        fix: function (a) {
            if (a[ea.expando]) return a;
            var b,
                c,
                d,
                e = a.type,
                f = a,
                g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Ha.test(e) ? this.mouseHooks : Ga.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new ea.Event(f), b = d.length; b--; ) (c = d[b]), (a[c] = f[c]);
            return a.target || (a.target = f.srcElement || oa), 3 === a.target.nodeType && (a.target = a.target.parentNode), (a.metaKey = !!a.metaKey), g.filter ? g.filter(a, f) : a;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a;
            },
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, b) {
                var c,
                    d,
                    e,
                    f = b.button,
                    g = b.fromElement;
                return (
                    null == a.pageX &&
                        null != b.clientX &&
                        ((d = a.target.ownerDocument || oa),
                        (e = d.documentElement),
                        (c = d.body),
                        (a.pageX = b.clientX + ((e && e.scrollLeft) || (c && c.scrollLeft) || 0) - ((e && e.clientLeft) || (c && c.clientLeft) || 0)),
                        (a.pageY = b.clientY + ((e && e.scrollTop) || (c && c.scrollTop) || 0) - ((e && e.clientTop) || (c && c.clientTop) || 0))),
                    !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g),
                    a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
                    a
                );
            },
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function () {
                    if (this !== o() && this.focus)
                        try {
                            return this.focus(), !1;
                        } catch (a) {}
                },
                delegateType: "focusin",
            },
            blur: {
                trigger: function () {
                    return this === o() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout",
            },
            click: {
                trigger: function () {
                    return ea.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0;
                },
                _default: function (a) {
                    return ea.nodeName(a.target, "a");
                },
            },
            beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
                },
            },
        },
        simulate: function (a, b, c, d) {
            var e = ea.extend(new ea.Event(), c, { type: a, isSimulated: !0, originalEvent: {} });
            d ? ea.event.trigger(e, null, b) : ea.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        },
    }),
        (ea.removeEvent = oa.removeEventListener
            ? function (a, b, c) {
                  a.removeEventListener && a.removeEventListener(b, c, !1);
              }
            : function (a, b, c) {
                  var d = "on" + b;
                  a.detachEvent && (typeof a[d] === xa && (a[d] = null), a.detachEvent(d, c));
              }),
        (ea.Event = function (a, b) {
            return this instanceof ea.Event
                ? (a && a.type ? ((this.originalEvent = a), (this.type = a.type), (this.isDefaultPrevented = a.defaultPrevented || (void 0 === a.defaultPrevented && a.returnValue === !1) ? m : n)) : (this.type = a),
                  b && ea.extend(this, b),
                  (this.timeStamp = (a && a.timeStamp) || ea.now()),
                  void (this[ea.expando] = !0))
                : new ea.Event(a, b);
        }),
        (ea.Event.prototype = {
            isDefaultPrevented: n,
            isPropagationStopped: n,
            isImmediatePropagationStopped: n,
            preventDefault: function () {
                var a = this.originalEvent;
                (this.isDefaultPrevented = m), a && (a.preventDefault ? a.preventDefault() : (a.returnValue = !1));
            },
            stopPropagation: function () {
                var a = this.originalEvent;
                (this.isPropagationStopped = m), a && (a.stopPropagation && a.stopPropagation(), (a.cancelBubble = !0));
            },
            stopImmediatePropagation: function () {
                var a = this.originalEvent;
                (this.isImmediatePropagationStopped = m), a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation();
            },
        }),
        ea.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
            ea.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function (a) {
                    var c,
                        d = this,
                        e = a.relatedTarget,
                        f = a.handleObj;
                    return (!e || (e !== d && !ea.contains(d, e))) && ((a.type = f.origType), (c = f.handler.apply(this, arguments)), (a.type = b)), c;
                },
            };
        }),
        ca.submitBubbles ||
            (ea.event.special.submit = {
                setup: function () {
                    return ea.nodeName(this, "form")
                        ? !1
                        : void ea.event.add(this, "click._submit keypress._submit", function (a) {
                              var b = a.target,
                                  c = ea.nodeName(b, "input") || ea.nodeName(b, "button") ? b.form : void 0;
                              c &&
                                  !ea._data(c, "submitBubbles") &&
                                  (ea.event.add(c, "submit._submit", function (a) {
                                      a._submit_bubble = !0;
                                  }),
                                  ea._data(c, "submitBubbles", !0));
                          });
                },
                postDispatch: function (a) {
                    a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && ea.event.simulate("submit", this.parentNode, a, !0));
                },
                teardown: function () {
                    return ea.nodeName(this, "form") ? !1 : void ea.event.remove(this, "._submit");
                },
            }),
        ca.changeBubbles ||
            (ea.event.special.change = {
                setup: function () {
                    return Fa.test(this.nodeName)
                        ? (("checkbox" === this.type || "radio" === this.type) &&
                              (ea.event.add(this, "propertychange._change", function (a) {
                                  "checked" === a.originalEvent.propertyName && (this._just_changed = !0);
                              }),
                              ea.event.add(this, "click._change", function (a) {
                                  this._just_changed && !a.isTrigger && (this._just_changed = !1), ea.event.simulate("change", this, a, !0);
                              })),
                          !1)
                        : void ea.event.add(this, "beforeactivate._change", function (a) {
                              var b = a.target;
                              Fa.test(b.nodeName) &&
                                  !ea._data(b, "changeBubbles") &&
                                  (ea.event.add(b, "change._change", function (a) {
                                      !this.parentNode || a.isSimulated || a.isTrigger || ea.event.simulate("change", this.parentNode, a, !0);
                                  }),
                                  ea._data(b, "changeBubbles", !0));
                          });
                },
                handle: function (a) {
                    var b = a.target;
                    return this !== b || a.isSimulated || a.isTrigger || ("radio" !== b.type && "checkbox" !== b.type) ? a.handleObj.handler.apply(this, arguments) : void 0;
                },
                teardown: function () {
                    return ea.event.remove(this, "._change"), !Fa.test(this.nodeName);
                },
            }),
        ca.focusinBubbles ||
            ea.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
                var c = function (a) {
                    ea.event.simulate(b, a.target, ea.event.fix(a), !0);
                };
                ea.event.special[b] = {
                    setup: function () {
                        var d = this.ownerDocument || this,
                            e = ea._data(d, b);
                        e || d.addEventListener(a, c, !0), ea._data(d, b, (e || 0) + 1);
                    },
                    teardown: function () {
                        var d = this.ownerDocument || this,
                            e = ea._data(d, b) - 1;
                        e ? ea._data(d, b, e) : (d.removeEventListener(a, c, !0), ea._removeData(d, b));
                    },
                };
            }),
        ea.fn.extend({
            on: function (a, b, c, d, e) {
                var f, g;
                if ("object" == typeof a) {
                    "string" != typeof b && ((c = c || b), (b = void 0));
                    for (f in a) this.on(f, b, c, a[f], e);
                    return this;
                }
                if ((null == c && null == d ? ((d = b), (c = b = void 0)) : null == d && ("string" == typeof b ? ((d = c), (c = void 0)) : ((d = c), (c = b), (b = void 0))), d === !1)) d = n;
                else if (!d) return this;
                return (
                    1 === e &&
                        ((g = d),
                        (d = function (a) {
                            return ea().off(a), g.apply(this, arguments);
                        }),
                        (d.guid = g.guid || (g.guid = ea.guid++))),
                    this.each(function () {
                        ea.event.add(this, a, d, c, b);
                    })
                );
            },
            one: function (a, b, c, d) {
                return this.on(a, b, c, d, 1);
            },
            off: function (a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj) return (d = a.handleObj), ea(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this;
                }
                return (
                    (b === !1 || "function" == typeof b) && ((c = b), (b = void 0)),
                    c === !1 && (c = n),
                    this.each(function () {
                        ea.event.remove(this, a, c, b);
                    })
                );
            },
            trigger: function (a, b) {
                return this.each(function () {
                    ea.event.trigger(a, b, this);
                });
            },
            triggerHandler: function (a, b) {
                var c = this[0];
                return c ? ea.event.trigger(a, b, c, !0) : void 0;
            },
        });
    var Ka = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        La = / jQuery\d+="(?:null|\d+)"/g,
        Ma = new RegExp("<(?:" + Ka + ")[\\s/>]", "i"),
        Na = /^\s+/,
        Oa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Pa = /<([\w:]+)/,
        Qa = /<tbody/i,
        Ra = /<|&#?\w+;/,
        Sa = /<(?:script|style|link)/i,
        Ta = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ua = /^$|\/(?:java|ecma)script/i,
        Va = /^true\/(.*)/,
        Wa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Xa = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ca.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
        },
        Ya = p(oa),
        Za = Ya.appendChild(oa.createElement("div"));
    (Xa.optgroup = Xa.option),
        (Xa.tbody = Xa.tfoot = Xa.colgroup = Xa.caption = Xa.thead),
        (Xa.th = Xa.td),
        ea.extend({
            clone: function (a, b, c) {
                var d,
                    e,
                    f,
                    g,
                    h,
                    i = ea.contains(a.ownerDocument, a);
                if (
                    (ca.html5Clone || ea.isXMLDoc(a) || !Ma.test("<" + a.nodeName + ">") ? (f = a.cloneNode(!0)) : ((Za.innerHTML = a.outerHTML), Za.removeChild((f = Za.firstChild))),
                    !((ca.noCloneEvent && ca.noCloneChecked) || (1 !== a.nodeType && 11 !== a.nodeType) || ea.isXMLDoc(a)))
                )
                    for (d = q(f), h = q(a), g = 0; null != (e = h[g]); ++g) d[g] && x(e, d[g]);
                if (b)
                    if (c) for (h = h || q(a), d = d || q(f), g = 0; null != (e = h[g]); g++) w(e, d[g]);
                    else w(a, f);
                return (d = q(f, "script")), d.length > 0 && v(d, !i && q(a, "script")), (d = h = e = null), f;
            },
            buildFragment: function (a, b, c, d) {
                for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++)
                    if (((f = a[o]), f || 0 === f))
                        if ("object" === ea.type(f)) ea.merge(n, f.nodeType ? [f] : f);
                        else if (Ra.test(f)) {
                            for (h = h || m.appendChild(b.createElement("div")), i = (Pa.exec(f) || ["", ""])[1].toLowerCase(), k = Xa[i] || Xa._default, h.innerHTML = k[1] + f.replace(Oa, "<$1></$2>") + k[2], e = k[0]; e--; )
                                h = h.lastChild;
                            if ((!ca.leadingWhitespace && Na.test(f) && n.push(b.createTextNode(Na.exec(f)[0])), !ca.tbody))
                                for (f = "table" !== i || Qa.test(f) ? ("<table>" !== k[1] || Qa.test(f) ? 0 : h) : h.firstChild, e = f && f.childNodes.length; e--; )
                                    ea.nodeName((j = f.childNodes[e]), "tbody") && !j.childNodes.length && f.removeChild(j);
                            for (ea.merge(n, h.childNodes), h.textContent = ""; h.firstChild; ) h.removeChild(h.firstChild);
                            h = m.lastChild;
                        } else n.push(b.createTextNode(f));
                for (h && m.removeChild(h), ca.appendChecked || ea.grep(q(n, "input"), r), o = 0; (f = n[o++]); )
                    if ((!d || -1 === ea.inArray(f, d)) && ((g = ea.contains(f.ownerDocument, f)), (h = q(m.appendChild(f), "script")), g && v(h), c)) for (e = 0; (f = h[e++]); ) Ua.test(f.type || "") && c.push(f);
                return (h = null), m;
            },
            cleanData: function (a, b) {
                for (var c, d, e, f, g = 0, h = ea.expando, i = ea.cache, j = ca.deleteExpando, k = ea.event.special; null != (c = a[g]); g++)
                    if ((b || ea.acceptData(c)) && ((e = c[h]), (f = e && i[e]))) {
                        if (f.events) for (d in f.events) k[d] ? ea.event.remove(c, d) : ea.removeEvent(c, d, f.handle);
                        i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== xa ? c.removeAttribute(h) : (c[h] = null), W.push(e));
                    }
            },
        }),
        ea.fn.extend({
            text: function (a) {
                return Da(
                    this,
                    function (a) {
                        return void 0 === a ? ea.text(this) : this.empty().append(((this[0] && this[0].ownerDocument) || oa).createTextNode(a));
                    },
                    null,
                    a,
                    arguments.length
                );
            },
            append: function () {
                return this.domManip(arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = s(this, a);
                        b.appendChild(a);
                    }
                });
            },
            prepend: function () {
                return this.domManip(arguments, function (a) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var b = s(this, a);
                        b.insertBefore(a, b.firstChild);
                    }
                });
            },
            before: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this);
                });
            },
            after: function () {
                return this.domManip(arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
                });
            },
            remove: function (a, b) {
                for (var c, d = a ? ea.filter(a, this) : this, e = 0; null != (c = d[e]); e++)
                    b || 1 !== c.nodeType || ea.cleanData(q(c)), c.parentNode && (b && ea.contains(c.ownerDocument, c) && v(q(c, "script")), c.parentNode.removeChild(c));
                return this;
            },
            empty: function () {
                for (var a, b = 0; null != (a = this[b]); b++) {
                    for (1 === a.nodeType && ea.cleanData(q(a, !1)); a.firstChild; ) a.removeChild(a.firstChild);
                    a.options && ea.nodeName(a, "select") && (a.options.length = 0);
                }
                return this;
            },
            clone: function (a, b) {
                return (
                    (a = null == a ? !1 : a),
                    (b = null == b ? a : b),
                    this.map(function () {
                        return ea.clone(this, a, b);
                    })
                );
            },
            html: function (a) {
                return Da(
                    this,
                    function (a) {
                        var b = this[0] || {},
                            c = 0,
                            d = this.length;
                        if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(La, "") : void 0;
                        if (!("string" != typeof a || Sa.test(a) || (!ca.htmlSerialize && Ma.test(a)) || (!ca.leadingWhitespace && Na.test(a)) || Xa[(Pa.exec(a) || ["", ""])[1].toLowerCase()])) {
                            a = a.replace(Oa, "<$1></$2>");
                            try {
                                for (; d > c; c++) (b = this[c] || {}), 1 === b.nodeType && (ea.cleanData(q(b, !1)), (b.innerHTML = a));
                                b = 0;
                            } catch (e) {}
                        }
                        b && this.empty().append(a);
                    },
                    null,
                    a,
                    arguments.length
                );
            },
            replaceWith: function () {
                var a = arguments[0];
                return (
                    this.domManip(arguments, function (b) {
                        (a = this.parentNode), ea.cleanData(q(this)), a && a.replaceChild(b, this);
                    }),
                    a && (a.length || a.nodeType) ? this : this.remove()
                );
            },
            detach: function (a) {
                return this.remove(a, !0);
            },
            domManip: function (a, b) {
                a = Y.apply([], a);
                var c,
                    d,
                    e,
                    f,
                    g,
                    h,
                    i = 0,
                    j = this.length,
                    k = this,
                    l = j - 1,
                    m = a[0],
                    n = ea.isFunction(m);
                if (n || (j > 1 && "string" == typeof m && !ca.checkClone && Ta.test(m)))
                    return this.each(function (c) {
                        var d = k.eq(c);
                        n && (a[0] = m.call(this, c, d.html())), d.domManip(a, b);
                    });
                if (j && ((h = ea.buildFragment(a, this[0].ownerDocument, !1, this)), (c = h.firstChild), 1 === h.childNodes.length && (h = c), c)) {
                    for (f = ea.map(q(h, "script"), t), e = f.length; j > i; i++) (d = h), i !== l && ((d = ea.clone(d, !0, !0)), e && ea.merge(f, q(d, "script"))), b.call(this[i], d, i);
                    if (e)
                        for (g = f[f.length - 1].ownerDocument, ea.map(f, u), i = 0; e > i; i++)
                            (d = f[i]), Ua.test(d.type || "") && !ea._data(d, "globalEval") && ea.contains(g, d) && (d.src ? ea._evalUrl && ea._evalUrl(d.src) : ea.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Wa, "")));
                    h = c = null;
                }
                return this;
            },
        }),
        ea.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
            ea.fn[a] = function (a) {
                for (var c, d = 0, e = [], f = ea(a), g = f.length - 1; g >= d; d++) (c = d === g ? this : this.clone(!0)), ea(f[d])[b](c), Z.apply(e, c.get());
                return this.pushStack(e);
            };
        });
    var $a,
        _a = {};
    !(function () {
        var a;
        ca.shrinkWrapBlocks = function () {
            if (null != a) return a;
            a = !1;
            var b, c, d;
            return (
                (c = oa.getElementsByTagName("body")[0]),
                c && c.style
                    ? ((b = oa.createElement("div")),
                      (d = oa.createElement("div")),
                      (d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                      c.appendChild(d).appendChild(b),
                      typeof b.style.zoom !== xa &&
                          ((b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                          (b.appendChild(oa.createElement("div")).style.width = "5px"),
                          (a = 3 !== b.offsetWidth)),
                      c.removeChild(d),
                      a)
                    : void 0
            );
        };
    })();
    var ab,
        bb,
        cb = /^margin/,
        db = new RegExp("^(" + Aa + ")(?!px)[a-z%]+$", "i"),
        eb = /^(top|right|bottom|left)$/;
    a.getComputedStyle
        ? ((ab = function (b) {
              return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null);
          }),
          (bb = function (a, b, c) {
              var d,
                  e,
                  f,
                  g,
                  h = a.style;
              return (
                  (c = c || ab(a)),
                  (g = c ? c.getPropertyValue(b) || c[b] : void 0),
                  c &&
                      ("" !== g || ea.contains(a.ownerDocument, a) || (g = ea.style(a, b)),
                      db.test(g) && cb.test(b) && ((d = h.width), (e = h.minWidth), (f = h.maxWidth), (h.minWidth = h.maxWidth = h.width = g), (g = c.width), (h.width = d), (h.minWidth = e), (h.maxWidth = f))),
                  void 0 === g ? g : g + ""
              );
          }))
        : oa.documentElement.currentStyle &&
          ((ab = function (a) {
              return a.currentStyle;
          }),
          (bb = function (a, b, c) {
              var d,
                  e,
                  f,
                  g,
                  h = a.style;
              return (
                  (c = c || ab(a)),
                  (g = c ? c[b] : void 0),
                  null == g && h && h[b] && (g = h[b]),
                  db.test(g) && !eb.test(b) && ((d = h.left), (e = a.runtimeStyle), (f = e && e.left), f && (e.left = a.currentStyle.left), (h.left = "fontSize" === b ? "1em" : g), (g = h.pixelLeft + "px"), (h.left = d), f && (e.left = f)),
                  void 0 === g ? g : g + "" || "auto"
              );
          })),
        !(function () {
            function b() {
                var b, c, d, e;
                (c = oa.getElementsByTagName("body")[0]),
                    c &&
                        c.style &&
                        ((b = oa.createElement("div")),
                        (d = oa.createElement("div")),
                        (d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                        c.appendChild(d).appendChild(b),
                        (b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
                        (f = g = !1),
                        (i = !0),
                        a.getComputedStyle &&
                            ((f = "1%" !== (a.getComputedStyle(b, null) || {}).top),
                            (g = "4px" === (a.getComputedStyle(b, null) || { width: "4px" }).width),
                            (e = b.appendChild(oa.createElement("div"))),
                            (e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                            (e.style.marginRight = e.style.width = "0"),
                            (b.style.width = "1px"),
                            (i = !parseFloat((a.getComputedStyle(e, null) || {}).marginRight)),
                            b.removeChild(e)),
                        (b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
                        (e = b.getElementsByTagName("td")),
                        (e[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
                        (h = 0 === e[0].offsetHeight),
                        h && ((e[0].style.display = ""), (e[1].style.display = "none"), (h = 0 === e[0].offsetHeight)),
                        c.removeChild(d));
            }
            var c, d, e, f, g, h, i;
            (c = oa.createElement("div")),
                (c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                (e = c.getElementsByTagName("a")[0]),
                (d = e && e.style) &&
                    ((d.cssText = "float:left;opacity:.5"),
                    (ca.opacity = "0.5" === d.opacity),
                    (ca.cssFloat = !!d.cssFloat),
                    (c.style.backgroundClip = "content-box"),
                    (c.cloneNode(!0).style.backgroundClip = ""),
                    (ca.clearCloneStyle = "content-box" === c.style.backgroundClip),
                    (ca.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing),
                    ea.extend(ca, {
                        reliableHiddenOffsets: function () {
                            return null == h && b(), h;
                        },
                        boxSizingReliable: function () {
                            return null == g && b(), g;
                        },
                        pixelPosition: function () {
                            return null == f && b(), f;
                        },
                        reliableMarginRight: function () {
                            return null == i && b(), i;
                        },
                    }));
        })(),
        (ea.swap = function (a, b, c, d) {
            var e,
                f,
                g = {};
            for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e;
        });
    var fb = /alpha\([^)]*\)/i,
        gb = /opacity\s*=\s*([^)]*)/,
        hb = /^(none|table(?!-c[ea]).+)/,
        ib = new RegExp("^(" + Aa + ")(.*)$", "i"),
        jb = new RegExp("^([+-])=(" + Aa + ")", "i"),
        kb = { position: "absolute", visibility: "hidden", display: "block" },
        lb = { letterSpacing: "0", fontWeight: "400" },
        mb = ["Webkit", "O", "Moz", "ms"];
    ea.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = bb(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                },
            },
        },
        cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
        cssProps: { float: ca.cssFloat ? "cssFloat" : "styleFloat" },
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e,
                    f,
                    g,
                    h = ea.camelCase(b),
                    i = a.style;
                if (((b = ea.cssProps[h] || (ea.cssProps[h] = B(i, h))), (g = ea.cssHooks[b] || ea.cssHooks[h]), void 0 === c)) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (
                    ((f = typeof c),
                    "string" === f && (e = jb.exec(c)) && ((c = (e[1] + 1) * e[2] + parseFloat(ea.css(a, b))), (f = "number")),
                    null != c && c === c && ("number" !== f || ea.cssNumber[h] || (c += "px"), ca.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))
                )
                    try {
                        i[b] = c;
                    } catch (j) {}
            }
        },
        css: function (a, b, c, d) {
            var e,
                f,
                g,
                h = ea.camelCase(b);
            return (
                (b = ea.cssProps[h] || (ea.cssProps[h] = B(a.style, h))),
                (g = ea.cssHooks[b] || ea.cssHooks[h]),
                g && "get" in g && (f = g.get(a, !0, c)),
                void 0 === f && (f = bb(a, b, d)),
                "normal" === f && b in lb && (f = lb[b]),
                "" === c || c ? ((e = parseFloat(f)), c === !0 || ea.isNumeric(e) ? e || 0 : f) : f
            );
        },
    }),
        ea.each(["height", "width"], function (a, b) {
            ea.cssHooks[b] = {
                get: function (a, c, d) {
                    return c
                        ? hb.test(ea.css(a, "display")) && 0 === a.offsetWidth
                            ? ea.swap(a, kb, function () {
                                  return F(a, b, d);
                              })
                            : F(a, b, d)
                        : void 0;
                },
                set: function (a, c, d) {
                    var e = d && ab(a);
                    return D(a, c, d ? E(a, b, d, ca.boxSizing && "border-box" === ea.css(a, "boxSizing", !1, e), e) : 0);
                },
            };
        }),
        ca.opacity ||
            (ea.cssHooks.opacity = {
                get: function (a, b) {
                    return gb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? 0.01 * parseFloat(RegExp.$1) + "" : b ? "1" : "";
                },
                set: function (a, b) {
                    var c = a.style,
                        d = a.currentStyle,
                        e = ea.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                        f = (d && d.filter) || c.filter || "";
                    (c.zoom = 1), ((b >= 1 || "" === b) && "" === ea.trim(f.replace(fb, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || (d && !d.filter))) || (c.filter = fb.test(f) ? f.replace(fb, e) : f + " " + e);
                },
            }),
        (ea.cssHooks.marginRight = A(ca.reliableMarginRight, function (a, b) {
            return b ? ea.swap(a, { display: "inline-block" }, bb, [a, "marginRight"]) : void 0;
        })),
        ea.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
            (ea.cssHooks[a + b] = {
                expand: function (c) {
                    for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + Ba[d] + b] = f[d] || f[d - 2] || f[0];
                    return e;
                },
            }),
                cb.test(a) || (ea.cssHooks[a + b].set = D);
        }),
        ea.fn.extend({
            css: function (a, b) {
                return Da(
                    this,
                    function (a, b, c) {
                        var d,
                            e,
                            f = {},
                            g = 0;
                        if (ea.isArray(b)) {
                            for (d = ab(a), e = b.length; e > g; g++) f[b[g]] = ea.css(a, b[g], !1, d);
                            return f;
                        }
                        return void 0 !== c ? ea.style(a, b, c) : ea.css(a, b);
                    },
                    a,
                    b,
                    arguments.length > 1
                );
            },
            show: function () {
                return C(this, !0);
            },
            hide: function () {
                return C(this);
            },
            toggle: function (a) {
                return "boolean" == typeof a
                    ? a
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          Ca(this) ? ea(this).show() : ea(this).hide();
                      });
            },
        }),
        (ea.Tween = G),
        (G.prototype = {
            constructor: G,
            init: function (a, b, c, d, e, f) {
                (this.elem = a), (this.prop = c), (this.easing = e || "swing"), (this.options = b), (this.start = this.now = this.cur()), (this.end = d), (this.unit = f || (ea.cssNumber[c] ? "" : "px"));
            },
            cur: function () {
                var a = G.propHooks[this.prop];
                return a && a.get ? a.get(this) : G.propHooks._default.get(this);
            },
            run: function (a) {
                var b,
                    c = G.propHooks[this.prop];
                return (
                    this.options.duration ? (this.pos = b = ea.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration)) : (this.pos = b = a),
                    (this.now = (this.end - this.start) * b + this.start),
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    c && c.set ? c.set(this) : G.propHooks._default.set(this),
                    this
                );
            },
        }),
        (G.prototype.init.prototype = G.prototype),
        (G.propHooks = {
            _default: {
                get: function (a) {
                    var b;
                    return null == a.elem[a.prop] || (a.elem.style && null != a.elem.style[a.prop]) ? ((b = ea.css(a.elem, a.prop, "")), b && "auto" !== b ? b : 0) : a.elem[a.prop];
                },
                set: function (a) {
                    ea.fx.step[a.prop] ? ea.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[ea.cssProps[a.prop]] || ea.cssHooks[a.prop]) ? ea.style(a.elem, a.prop, a.now + a.unit) : (a.elem[a.prop] = a.now);
                },
            },
        }),
        (G.propHooks.scrollTop = G.propHooks.scrollLeft = {
            set: function (a) {
                a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
            },
        }),
        (ea.easing = {
            linear: function (a) {
                return a;
            },
            swing: function (a) {
                return 0.5 - Math.cos(a * Math.PI) / 2;
            },
        }),
        (ea.fx = G.prototype.init),
        (ea.fx.step = {});
    var nb,
        ob,
        pb = /^(?:toggle|show|hide)$/,
        qb = new RegExp("^(?:([+-])=|)(" + Aa + ")([a-z%]*)$", "i"),
        rb = /queueHooks$/,
        sb = [K],
        tb = {
            "*": [
                function (a, b) {
                    var c = this.createTween(a, b),
                        d = c.cur(),
                        e = qb.exec(b),
                        f = (e && e[3]) || (ea.cssNumber[a] ? "" : "px"),
                        g = (ea.cssNumber[a] || ("px" !== f && +d)) && qb.exec(ea.css(c.elem, a)),
                        h = 1,
                        i = 20;
                    if (g && g[3] !== f) {
                        (f = f || g[3]), (e = e || []), (g = +d || 1);
                        do (h = h || ".5"), (g /= h), ea.style(c.elem, a, g + f);
                        while (h !== (h = c.cur() / d) && 1 !== h && --i);
                    }
                    return e && ((g = c.start = +g || +d || 0), (c.unit = f), (c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2])), c;
                },
            ],
        };
    (ea.Animation = ea.extend(M, {
        tweener: function (a, b) {
            ea.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.split(" "));
            for (var c, d = 0, e = a.length; e > d; d++) (c = a[d]), (tb[c] = tb[c] || []), tb[c].unshift(b);
        },
        prefilter: function (a, b) {
            b ? sb.unshift(a) : sb.push(a);
        },
    })),
        (ea.speed = function (a, b, c) {
            var d = a && "object" == typeof a ? ea.extend({}, a) : { complete: c || (!c && b) || (ea.isFunction(a) && a), duration: a, easing: (c && b) || (b && !ea.isFunction(b) && b) };
            return (
                (d.duration = ea.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in ea.fx.speeds ? ea.fx.speeds[d.duration] : ea.fx.speeds._default),
                (null == d.queue || d.queue === !0) && (d.queue = "fx"),
                (d.old = d.complete),
                (d.complete = function () {
                    ea.isFunction(d.old) && d.old.call(this), d.queue && ea.dequeue(this, d.queue);
                }),
                d
            );
        }),
        ea.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(Ca).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
            },
            animate: function (a, b, c, d) {
                var e = ea.isEmptyObject(a),
                    f = ea.speed(b, c, d),
                    g = function () {
                        var b = M(this, ea.extend({}, a), f);
                        (e || ea._data(this, "finish")) && b.stop(!0);
                    };
                return (g.finish = g), e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
            },
            stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c);
                };
                return (
                    "string" != typeof a && ((c = b), (b = a), (a = void 0)),
                    b && a !== !1 && this.queue(a || "fx", []),
                    this.each(function () {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = ea.timers,
                            g = ea._data(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else for (e in g) g[e] && g[e].stop && rb.test(e) && d(g[e]);
                        for (e = f.length; e--; ) f[e].elem !== this || (null != a && f[e].queue !== a) || (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
                        (b || !c) && ea.dequeue(this, a);
                    })
                );
            },
            finish: function (a) {
                return (
                    a !== !1 && (a = a || "fx"),
                    this.each(function () {
                        var b,
                            c = ea._data(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = ea.timers,
                            g = d ? d.length : 0;
                        for (c.finish = !0, ea.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--; ) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish;
                    })
                );
            },
        }),
        ea.each(["toggle", "show", "hide"], function (a, b) {
            var c = ea.fn[b];
            ea.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e);
            };
        }),
        ea.each({ slideDown: I("show"), slideUp: I("hide"), slideToggle: I("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
            ea.fn[a] = function (a, c, d) {
                return this.animate(b, a, c, d);
            };
        }),
        (ea.timers = []),
        (ea.fx.tick = function () {
            var a,
                b = ea.timers,
                c = 0;
            for (nb = ea.now(); c < b.length; c++) (a = b[c]), a() || b[c] !== a || b.splice(c--, 1);
            b.length || ea.fx.stop(), (nb = void 0);
        }),
        (ea.fx.timer = function (a) {
            ea.timers.push(a), a() ? ea.fx.start() : ea.timers.pop();
        }),
        (ea.fx.interval = 13),
        (ea.fx.start = function () {
            ob || (ob = setInterval(ea.fx.tick, ea.fx.interval));
        }),
        (ea.fx.stop = function () {
            clearInterval(ob), (ob = null);
        }),
        (ea.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (ea.fn.delay = function (a, b) {
            return (
                (a = ea.fx ? ea.fx.speeds[a] || a : a),
                (b = b || "fx"),
                this.queue(b, function (b, c) {
                    var d = setTimeout(b, a);
                    c.stop = function () {
                        clearTimeout(d);
                    };
                })
            );
        }),
        (function () {
            var a, b, c, d, e;
            (b = oa.createElement("div")),
                b.setAttribute("className", "t"),
                (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                (d = b.getElementsByTagName("a")[0]),
                (c = oa.createElement("select")),
                (e = c.appendChild(oa.createElement("option"))),
                (a = b.getElementsByTagName("input")[0]),
                (d.style.cssText = "top:1px"),
                (ca.getSetAttribute = "t" !== b.className),
                (ca.style = /top/.test(d.getAttribute("style"))),
                (ca.hrefNormalized = "/a" === d.getAttribute("href")),
                (ca.checkOn = !!a.value),
                (ca.optSelected = e.selected),
                (ca.enctype = !!oa.createElement("form").enctype),
                (c.disabled = !0),
                (ca.optDisabled = !e.disabled),
                (a = oa.createElement("input")),
                a.setAttribute("value", ""),
                (ca.input = "" === a.getAttribute("value")),
                (a.value = "t"),
                a.setAttribute("type", "radio"),
                (ca.radioValue = "t" === a.value);
        })();
    var ub = /\r/g;
    ea.fn.extend({
        val: function (a) {
            var b,
                c,
                d,
                e = this[0];
            return arguments.length
                ? ((d = ea.isFunction(a)),
                  this.each(function (c) {
                      var e;
                      1 === this.nodeType &&
                          ((e = d ? a.call(this, c, ea(this).val()) : a),
                          null == e
                              ? (e = "")
                              : "number" == typeof e
                              ? (e += "")
                              : ea.isArray(e) &&
                                (e = ea.map(e, function (a) {
                                    return null == a ? "" : a + "";
                                })),
                          (b = ea.valHooks[this.type] || ea.valHooks[this.nodeName.toLowerCase()]),
                          (b && "set" in b && void 0 !== b.set(this, e, "value")) || (this.value = e));
                  }))
                : e
                ? ((b = ea.valHooks[e.type] || ea.valHooks[e.nodeName.toLowerCase()]), b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : ((c = e.value), "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c))
                : void 0;
        },
    }),
        ea.extend({
            valHooks: {
                option: {
                    get: function (a) {
                        var b = ea.find.attr(a, "value");
                        return null != b ? b : ea.trim(ea.text(a));
                    },
                },
                select: {
                    get: function (a) {
                        for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                            if (((c = d[i]), !((!c.selected && i !== e) || (ca.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || (c.parentNode.disabled && ea.nodeName(c.parentNode, "optgroup"))))) {
                                if (((b = ea(c).val()), f)) return b;
                                g.push(b);
                            }
                        return g;
                    },
                    set: function (a, b) {
                        for (var c, d, e = a.options, f = ea.makeArray(b), g = e.length; g--; )
                            if (((d = e[g]), ea.inArray(ea.valHooks.option.get(d), f) >= 0))
                                try {
                                    d.selected = c = !0;
                                } catch (h) {
                                    d.scrollHeight;
                                }
                            else d.selected = !1;
                        return c || (a.selectedIndex = -1), e;
                    },
                },
            },
        }),
        ea.each(["radio", "checkbox"], function () {
            (ea.valHooks[this] = {
                set: function (a, b) {
                    return ea.isArray(b) ? (a.checked = ea.inArray(ea(a).val(), b) >= 0) : void 0;
                },
            }),
                ca.checkOn ||
                    (ea.valHooks[this].get = function (a) {
                        return null === a.getAttribute("value") ? "on" : a.value;
                    });
        });
    var vb,
        wb,
        xb = ea.expr.attrHandle,
        yb = /^(?:checked|selected)$/i,
        zb = ca.getSetAttribute,
        Ab = ca.input;
    ea.fn.extend({
        attr: function (a, b) {
            return Da(this, ea.attr, a, b, arguments.length > 1);
        },
        removeAttr: function (a) {
            return this.each(function () {
                ea.removeAttr(this, a);
            });
        },
    }),
        ea.extend({
            attr: function (a, b, c) {
                var d,
                    e,
                    f = a.nodeType;
                return a && 3 !== f && 8 !== f && 2 !== f
                    ? typeof a.getAttribute === xa
                        ? ea.prop(a, b, c)
                        : ((1 === f && ea.isXMLDoc(a)) || ((b = b.toLowerCase()), (d = ea.attrHooks[b] || (ea.expr.match.bool.test(b) ? wb : vb))),
                          void 0 === c
                              ? d && "get" in d && null !== (e = d.get(a, b))
                                  ? e
                                  : ((e = ea.find.attr(a, b)), null == e ? void 0 : e)
                              : null !== c
                              ? d && "set" in d && void 0 !== (e = d.set(a, c, b))
                                  ? e
                                  : (a.setAttribute(b, c + ""), c)
                              : void ea.removeAttr(a, b))
                    : void 0;
            },
            removeAttr: function (a, b) {
                var c,
                    d,
                    e = 0,
                    f = b && b.match(ta);
                if (f && 1 === a.nodeType)
                    for (; (c = f[e++]); ) (d = ea.propFix[c] || c), ea.expr.match.bool.test(c) ? ((Ab && zb) || !yb.test(c) ? (a[d] = !1) : (a[ea.camelCase("default-" + c)] = a[d] = !1)) : ea.attr(a, c, ""), a.removeAttribute(zb ? c : d);
            },
            attrHooks: {
                type: {
                    set: function (a, b) {
                        if (!ca.radioValue && "radio" === b && ea.nodeName(a, "input")) {
                            var c = a.value;
                            return a.setAttribute("type", b), c && (a.value = c), b;
                        }
                    },
                },
            },
        }),
        (wb = {
            set: function (a, b, c) {
                return b === !1 ? ea.removeAttr(a, c) : (Ab && zb) || !yb.test(c) ? a.setAttribute((!zb && ea.propFix[c]) || c, c) : (a[ea.camelCase("default-" + c)] = a[c] = !0), c;
            },
        }),
        ea.each(ea.expr.match.bool.source.match(/\w+/g), function (a, b) {
            var c = xb[b] || ea.find.attr;
            xb[b] =
                (Ab && zb) || !yb.test(b)
                    ? function (a, b, d) {
                          var e, f;
                          return d || ((f = xb[b]), (xb[b] = e), (e = null != c(a, b, d) ? b.toLowerCase() : null), (xb[b] = f)), e;
                      }
                    : function (a, b, c) {
                          return c ? void 0 : a[ea.camelCase("default-" + b)] ? b.toLowerCase() : null;
                      };
        }),
        (Ab && zb) ||
            (ea.attrHooks.value = {
                set: function (a, b, c) {
                    return ea.nodeName(a, "input") ? void (a.defaultValue = b) : vb && vb.set(a, b, c);
                },
            }),
        zb ||
            ((vb = {
                set: function (a, b, c) {
                    var d = a.getAttributeNode(c);
                    return d || a.setAttributeNode((d = a.ownerDocument.createAttribute(c))), (d.value = b += ""), "value" === c || b === a.getAttribute(c) ? b : void 0;
                },
            }),
            (xb.id = xb.name = xb.coords = function (a, b, c) {
                var d;
                return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null;
            }),
            (ea.valHooks.button = {
                get: function (a, b) {
                    var c = a.getAttributeNode(b);
                    return c && c.specified ? c.value : void 0;
                },
                set: vb.set,
            }),
            (ea.attrHooks.contenteditable = {
                set: function (a, b, c) {
                    vb.set(a, "" === b ? !1 : b, c);
                },
            }),
            ea.each(["width", "height"], function (a, b) {
                ea.attrHooks[b] = {
                    set: function (a, c) {
                        return "" === c ? (a.setAttribute(b, "auto"), c) : void 0;
                    },
                };
            })),
        ca.style ||
            (ea.attrHooks.style = {
                get: function (a) {
                    return a.style.cssText || void 0;
                },
                set: function (a, b) {
                    return (a.style.cssText = b + "");
                },
            });
    var Bb = /^(?:input|select|textarea|button|object)$/i,
        Cb = /^(?:a|area)$/i;
    ea.fn.extend({
        prop: function (a, b) {
            return Da(this, ea.prop, a, b, arguments.length > 1);
        },
        removeProp: function (a) {
            return (
                (a = ea.propFix[a] || a),
                this.each(function () {
                    try {
                        (this[a] = void 0), delete this[a];
                    } catch (b) {}
                })
            );
        },
    }),
        ea.extend({
            propFix: { for: "htmlFor", class: "className" },
            prop: function (a, b, c) {
                var d,
                    e,
                    f,
                    g = a.nodeType;
                return a && 3 !== g && 8 !== g && 2 !== g
                    ? ((f = 1 !== g || !ea.isXMLDoc(a)),
                      f && ((b = ea.propFix[b] || b), (e = ea.propHooks[b])),
                      void 0 !== c ? (e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a[b] = c)) : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b])
                    : void 0;
            },
            propHooks: {
                tabIndex: {
                    get: function (a) {
                        var b = ea.find.attr(a, "tabindex");
                        return b ? parseInt(b, 10) : Bb.test(a.nodeName) || (Cb.test(a.nodeName) && a.href) ? 0 : -1;
                    },
                },
            },
        }),
        ca.hrefNormalized ||
            ea.each(["href", "src"], function (a, b) {
                ea.propHooks[b] = {
                    get: function (a) {
                        return a.getAttribute(b, 4);
                    },
                };
            }),
        ca.optSelected ||
            (ea.propHooks.selected = {
                get: function (a) {
                    var b = a.parentNode;
                    return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
                },
            }),
        ea.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            ea.propFix[this.toLowerCase()] = this;
        }),
        ca.enctype || (ea.propFix.enctype = "encoding");
    var Db = /[\t\r\n\f]/g;
    ea.fn.extend({
        addClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h = 0,
                i = this.length,
                j = "string" == typeof a && a;
            if (ea.isFunction(a))
                return this.each(function (b) {
                    ea(this).addClass(a.call(this, b, this.className));
                });
            if (j)
                for (b = (a || "").match(ta) || []; i > h; h++)
                    if (((c = this[h]), (d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : " ")))) {
                        for (f = 0; (e = b[f++]); ) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        (g = ea.trim(d)), c.className !== g && (c.className = g);
                    }
            return this;
        },
        removeClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h = 0,
                i = this.length,
                j = 0 === arguments.length || ("string" == typeof a && a);
            if (ea.isFunction(a))
                return this.each(function (b) {
                    ea(this).removeClass(a.call(this, b, this.className));
                });
            if (j)
                for (b = (a || "").match(ta) || []; i > h; h++)
                    if (((c = this[h]), (d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Db, " ") : "")))) {
                        for (f = 0; (e = b[f++]); ) for (; d.indexOf(" " + e + " ") >= 0; ) d = d.replace(" " + e + " ", " ");
                        (g = a ? ea.trim(d) : ""), c.className !== g && (c.className = g);
                    }
            return this;
        },
        toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c
                ? b
                    ? this.addClass(a)
                    : this.removeClass(a)
                : this.each(
                      ea.isFunction(a)
                          ? function (c) {
                                ea(this).toggleClass(a.call(this, c, this.className, b), b);
                            }
                          : function () {
                                if ("string" === c) for (var b, d = 0, e = ea(this), f = a.match(ta) || []; (b = f[d++]); ) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                                else (c === xa || "boolean" === c) && (this.className && ea._data(this, "__className__", this.className), (this.className = this.className || a === !1 ? "" : ea._data(this, "__className__") || ""));
                            }
                  );
        },
        hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++) if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Db, " ").indexOf(b) >= 0) return !0;
            return !1;
        },
    }),
        ea.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (
            a,
            b
        ) {
            ea.fn[b] = function (a, c) {
                return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
            };
        }),
        ea.fn.extend({
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a);
            },
            bind: function (a, b, c) {
                return this.on(a, null, b, c);
            },
            unbind: function (a, b) {
                return this.off(a, null, b);
            },
            delegate: function (a, b, c, d) {
                return this.on(b, a, c, d);
            },
            undelegate: function (a, b, c) {
                return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
            },
        });
    var Eb = ea.now(),
        Fb = /\?/,
        Gb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    (ea.parseJSON = function (b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c,
            d = null,
            e = ea.trim(b + "");
        return e &&
            !ea.trim(
                e.replace(Gb, function (a, b, e, f) {
                    return c && b && (d = 0), 0 === d ? a : ((c = e || b), (d += !f - !e), "");
                })
            )
            ? Function("return " + e)()
            : ea.error("Invalid JSON: " + b);
    }),
        (ea.parseXML = function (b) {
            var c, d;
            if (!b || "string" != typeof b) return null;
            try {
                a.DOMParser ? ((d = new DOMParser()), (c = d.parseFromString(b, "text/xml"))) : ((c = new ActiveXObject("Microsoft.XMLDOM")), (c.async = "false"), c.loadXML(b));
            } catch (e) {
                c = void 0;
            }
            return (c && c.documentElement && !c.getElementsByTagName("parsererror").length) || ea.error("Invalid XML: " + b), c;
        });
    var Hb,
        Ib,
        Jb = /#.*$/,
        Kb = /([?&])_=[^&]*/,
        Lb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Mb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Nb = /^(?:GET|HEAD)$/,
        Ob = /^\/\//,
        Pb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Qb = {},
        Rb = {},
        Sb = "*/".concat("*");
    try {
        Ib = location.href;
    } catch (Tb) {
        (Ib = oa.createElement("a")), (Ib.href = ""), (Ib = Ib.href);
    }
    (Hb = Pb.exec(Ib.toLowerCase()) || []),
        ea.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Ib,
                type: "GET",
                isLocal: Mb.test(Hb[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: { "*": Sb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
                contents: { xml: /xml/, html: /html/, json: /json/ },
                responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
                converters: { "* text": String, "text html": !0, "text json": ea.parseJSON, "text xml": ea.parseXML },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (a, b) {
                return b ? P(P(a, ea.ajaxSettings), b) : P(ea.ajaxSettings, a);
            },
            ajaxPrefilter: N(Qb),
            ajaxTransport: N(Rb),
            ajax: function (a, b) {
                function c(a, b, c, d) {
                    var e,
                        k,
                        r,
                        s,
                        u,
                        w = b;
                    2 !== t &&
                        ((t = 2),
                        h && clearTimeout(h),
                        (j = void 0),
                        (g = d || ""),
                        (v.readyState = a > 0 ? 4 : 0),
                        (e = (a >= 200 && 300 > a) || 304 === a),
                        c && (s = Q(l, v, c)),
                        (s = R(l, s, v, e)),
                        e
                            ? (l.ifModified && ((u = v.getResponseHeader("Last-Modified")), u && (ea.lastModified[f] = u), (u = v.getResponseHeader("etag")), u && (ea.etag[f] = u)),
                              204 === a || "HEAD" === l.type ? (w = "nocontent") : 304 === a ? (w = "notmodified") : ((w = s.state), (k = s.data), (r = s.error), (e = !r)))
                            : ((r = w), (a || !w) && ((w = "error"), 0 > a && (a = 0))),
                        (v.status = a),
                        (v.statusText = (b || w) + ""),
                        e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]),
                        v.statusCode(q),
                        (q = void 0),
                        i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]),
                        p.fireWith(m, [v, w]),
                        i && (n.trigger("ajaxComplete", [v, l]), --ea.active || ea.event.trigger("ajaxStop")));
                }
                "object" == typeof a && ((b = a), (a = void 0)), (b = b || {});
                var d,
                    e,
                    f,
                    g,
                    h,
                    i,
                    j,
                    k,
                    l = ea.ajaxSetup({}, b),
                    m = l.context || l,
                    n = l.context && (m.nodeType || m.jquery) ? ea(m) : ea.event,
                    o = ea.Deferred(),
                    p = ea.Callbacks("once memory"),
                    q = l.statusCode || {},
                    r = {},
                    s = {},
                    t = 0,
                    u = "canceled",
                    v = {
                        readyState: 0,
                        getResponseHeader: function (a) {
                            var b;
                            if (2 === t) {
                                if (!k) for (k = {}; (b = Lb.exec(g)); ) k[b[1].toLowerCase()] = b[2];
                                b = k[a.toLowerCase()];
                            }
                            return null == b ? null : b;
                        },
                        getAllResponseHeaders: function () {
                            return 2 === t ? g : null;
                        },
                        setRequestHeader: function (a, b) {
                            var c = a.toLowerCase();
                            return t || ((a = s[c] = s[c] || a), (r[a] = b)), this;
                        },
                        overrideMimeType: function (a) {
                            return t || (l.mimeType = a), this;
                        },
                        statusCode: function (a) {
                            var b;
                            if (a)
                                if (2 > t) for (b in a) q[b] = [q[b], a[b]];
                                else v.always(a[v.status]);
                            return this;
                        },
                        abort: function (a) {
                            var b = a || u;
                            return j && j.abort(b), c(0, b), this;
                        },
                    };
                if (
                    ((o.promise(v).complete = p.add),
                    (v.success = v.done),
                    (v.error = v.fail),
                    (l.url = ((a || l.url || Ib) + "").replace(Jb, "").replace(Ob, Hb[1] + "//")),
                    (l.type = b.method || b.type || l.method || l.type),
                    (l.dataTypes = ea
                        .trim(l.dataType || "*")
                        .toLowerCase()
                        .match(ta) || [""]),
                    null == l.crossDomain &&
                        ((d = Pb.exec(l.url.toLowerCase())), (l.crossDomain = !(!d || (d[1] === Hb[1] && d[2] === Hb[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Hb[3] || ("http:" === Hb[1] ? "80" : "443")))))),
                    l.data && l.processData && "string" != typeof l.data && (l.data = ea.param(l.data, l.traditional)),
                    O(Qb, l, b, v),
                    2 === t)
                )
                    return v;
                (i = ea.event && l.global),
                    i && 0 === ea.active++ && ea.event.trigger("ajaxStart"),
                    (l.type = l.type.toUpperCase()),
                    (l.hasContent = !Nb.test(l.type)),
                    (f = l.url),
                    l.hasContent || (l.data && ((f = l.url += (Fb.test(f) ? "&" : "?") + l.data), delete l.data), l.cache === !1 && (l.url = Kb.test(f) ? f.replace(Kb, "$1_=" + Eb++) : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)),
                    l.ifModified && (ea.lastModified[f] && v.setRequestHeader("If-Modified-Since", ea.lastModified[f]), ea.etag[f] && v.setRequestHeader("If-None-Match", ea.etag[f])),
                    ((l.data && l.hasContent && l.contentType !== !1) || b.contentType) && v.setRequestHeader("Content-Type", l.contentType),
                    v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Sb + "; q=0.01" : "") : l.accepts["*"]);
                for (e in l.headers) v.setRequestHeader(e, l.headers[e]);
                if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
                u = "abort";
                for (e in { success: 1, error: 1, complete: 1 }) v[e](l[e]);
                if ((j = O(Rb, l, b, v))) {
                    (v.readyState = 1),
                        i && n.trigger("ajaxSend", [v, l]),
                        l.async &&
                            l.timeout > 0 &&
                            (h = setTimeout(function () {
                                v.abort("timeout");
                            }, l.timeout));
                    try {
                        (t = 1), j.send(r, c);
                    } catch (w) {
                        if (!(2 > t)) throw w;
                        c(-1, w);
                    }
                } else c(-1, "No Transport");
                return v;
            },
            getJSON: function (a, b, c) {
                return ea.get(a, b, c, "json");
            },
            getScript: function (a, b) {
                return ea.get(a, void 0, b, "script");
            },
        }),
        ea.each(["get", "post"], function (a, b) {
            ea[b] = function (a, c, d, e) {
                return ea.isFunction(c) && ((e = e || d), (d = c), (c = void 0)), ea.ajax({ url: a, type: b, dataType: e, data: c, success: d });
            };
        }),
        (ea._evalUrl = function (a) {
            return ea.ajax({ url: a, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
        }),
        ea.fn.extend({
            wrapAll: function (a) {
                if (ea.isFunction(a))
                    return this.each(function (b) {
                        ea(this).wrapAll(a.call(this, b));
                    });
                if (this[0]) {
                    var b = ea(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]),
                        b
                            .map(function () {
                                for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; ) a = a.firstChild;
                                return a;
                            })
                            .append(this);
                }
                return this;
            },
            wrapInner: function (a) {
                return this.each(
                    ea.isFunction(a)
                        ? function (b) {
                              ea(this).wrapInner(a.call(this, b));
                          }
                        : function () {
                              var b = ea(this),
                                  c = b.contents();
                              c.length ? c.wrapAll(a) : b.append(a);
                          }
                );
            },
            wrap: function (a) {
                var b = ea.isFunction(a);
                return this.each(function (c) {
                    ea(this).wrapAll(b ? a.call(this, c) : a);
                });
            },
            unwrap: function () {
                return this.parent()
                    .each(function () {
                        ea.nodeName(this, "body") || ea(this).replaceWith(this.childNodes);
                    })
                    .end();
            },
        }),
        (ea.expr.filters.hidden = function (a) {
            return (a.offsetWidth <= 0 && a.offsetHeight <= 0) || (!ca.reliableHiddenOffsets() && "none" === ((a.style && a.style.display) || ea.css(a, "display")));
        }),
        (ea.expr.filters.visible = function (a) {
            return !ea.expr.filters.hidden(a);
        });
    var Ub = /%20/g,
        Vb = /\[\]$/,
        Wb = /\r?\n/g,
        Xb = /^(?:submit|button|image|reset|file)$/i,
        Yb = /^(?:input|select|textarea|keygen)/i;
    (ea.param = function (a, b) {
        var c,
            d = [],
            e = function (a, b) {
                (b = ea.isFunction(b) ? b() : null == b ? "" : b), (d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b));
            };
        if ((void 0 === b && (b = ea.ajaxSettings && ea.ajaxSettings.traditional), ea.isArray(a) || (a.jquery && !ea.isPlainObject(a))))
            ea.each(a, function () {
                e(this.name, this.value);
            });
        else for (c in a) S(c, a[c], b, e);
        return d.join("&").replace(Ub, "+");
    }),
        ea.fn.extend({
            serialize: function () {
                return ea.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var a = ea.prop(this, "elements");
                    return a ? ea.makeArray(a) : this;
                })
                    .filter(function () {
                        var a = this.type;
                        return this.name && !ea(this).is(":disabled") && Yb.test(this.nodeName) && !Xb.test(a) && (this.checked || !Ea.test(a));
                    })
                    .map(function (a, b) {
                        var c = ea(this).val();
                        return null == c
                            ? null
                            : ea.isArray(c)
                            ? ea.map(c, function (a) {
                                  return { name: b.name, value: a.replace(Wb, "\r\n") };
                              })
                            : { name: b.name, value: c.replace(Wb, "\r\n") };
                    })
                    .get();
            },
        }),
        (ea.ajaxSettings.xhr =
            void 0 !== a.ActiveXObject
                ? function () {
                      return (!this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T()) || U();
                  }
                : T);
    var Zb = 0,
        $b = {},
        _b = ea.ajaxSettings.xhr();
    a.attachEvent &&
        a.attachEvent("onunload", function () {
            for (var a in $b) $b[a](void 0, !0);
        }),
        (ca.cors = !!_b && "withCredentials" in _b),
        (_b = ca.ajax = !!_b),
        _b &&
            ea.ajaxTransport(function (a) {
                if (!a.crossDomain || ca.cors) {
                    var b;
                    return {
                        send: function (c, d) {
                            var e,
                                f = a.xhr(),
                                g = ++Zb;
                            if ((f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)) for (e in a.xhrFields) f[e] = a.xhrFields[e];
                            a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                            for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                            f.send((a.hasContent && a.data) || null),
                                (b = function (c, e) {
                                    var h, i, j;
                                    if (b && (e || 4 === f.readyState))
                                        if ((delete $b[g], (b = void 0), (f.onreadystatechange = ea.noop), e)) 4 !== f.readyState && f.abort();
                                        else {
                                            (j = {}), (h = f.status), "string" == typeof f.responseText && (j.text = f.responseText);
                                            try {
                                                i = f.statusText;
                                            } catch (k) {
                                                i = "";
                                            }
                                            h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : (h = j.text ? 200 : 404);
                                        }
                                    j && d(h, i, j, f.getAllResponseHeaders());
                                }),
                                a.async ? (4 === f.readyState ? setTimeout(b) : (f.onreadystatechange = $b[g] = b)) : b();
                        },
                        abort: function () {
                            b && b(void 0, !0);
                        },
                    };
                }
            }),
        ea.ajaxSetup({
            accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
            contents: { script: /(?:java|ecma)script/ },
            converters: {
                "text script": function (a) {
                    return ea.globalEval(a), a;
                },
            },
        }),
        ea.ajaxPrefilter("script", function (a) {
            void 0 === a.cache && (a.cache = !1), a.crossDomain && ((a.type = "GET"), (a.global = !1));
        }),
        ea.ajaxTransport("script", function (a) {
            if (a.crossDomain) {
                var b,
                    c = oa.head || ea("head")[0] || oa.documentElement;
                return {
                    send: function (d, e) {
                        (b = oa.createElement("script")),
                            (b.async = !0),
                            a.scriptCharset && (b.charset = a.scriptCharset),
                            (b.src = a.url),
                            (b.onload = b.onreadystatechange = function (a, c) {
                                (c || !b.readyState || /loaded|complete/.test(b.readyState)) && ((b.onload = b.onreadystatechange = null), b.parentNode && b.parentNode.removeChild(b), (b = null), c || e(200, "success"));
                            }),
                            c.insertBefore(b, c.firstChild);
                    },
                    abort: function () {
                        b && b.onload(void 0, !0);
                    },
                };
            }
        });
    var ac = [],
        bc = /(=)\?(?=&|$)|\?\?/;
    ea.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var a = ac.pop() || ea.expando + "_" + Eb++;
            return (this[a] = !0), a;
        },
    }),
        ea.ajaxPrefilter("json jsonp", function (b, c, d) {
            var e,
                f,
                g,
                h = b.jsonp !== !1 && (bc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bc.test(b.data) && "data");
            return h || "jsonp" === b.dataTypes[0]
                ? ((e = b.jsonpCallback = ea.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback),
                  h ? (b[h] = b[h].replace(bc, "$1" + e)) : b.jsonp !== !1 && (b.url += (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
                  (b.converters["script json"] = function () {
                      return g || ea.error(e + " was not called"), g[0];
                  }),
                  (b.dataTypes[0] = "json"),
                  (f = a[e]),
                  (a[e] = function () {
                      g = arguments;
                  }),
                  d.always(function () {
                      (a[e] = f), b[e] && ((b.jsonpCallback = c.jsonpCallback), ac.push(e)), g && ea.isFunction(f) && f(g[0]), (g = f = void 0);
                  }),
                  "script")
                : void 0;
        }),
        (ea.parseHTML = function (a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && ((c = b), (b = !1)), (b = b || oa);
            var d = la.exec(a),
                e = !c && [];
            return d ? [b.createElement(d[1])] : ((d = ea.buildFragment([a], b, e)), e && e.length && ea(e).remove(), ea.merge([], d.childNodes));
        });
    var cc = ea.fn.load;
    (ea.fn.load = function (a, b, c) {
        if ("string" != typeof a && cc) return cc.apply(this, arguments);
        var d,
            e,
            f,
            g = this,
            h = a.indexOf(" ");
        return (
            h >= 0 && ((d = ea.trim(a.slice(h, a.length))), (a = a.slice(0, h))),
            ea.isFunction(b) ? ((c = b), (b = void 0)) : b && "object" == typeof b && (f = "POST"),
            g.length > 0 &&
                ea
                    .ajax({ url: a, type: f, dataType: "html", data: b })
                    .done(function (a) {
                        (e = arguments), g.html(d ? ea("<div>").append(ea.parseHTML(a)).find(d) : a);
                    })
                    .complete(
                        c &&
                            function (a, b) {
                                g.each(c, e || [a.responseText, b, a]);
                            }
                    ),
            this
        );
    }),
        ea.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
            ea.fn[b] = function (a) {
                return this.on(b, a);
            };
        }),
        (ea.expr.filters.animated = function (a) {
            return ea.grep(ea.timers, function (b) {
                return a === b.elem;
            }).length;
        });
    var dc = a.document.documentElement;
    (ea.offset = {
        setOffset: function (a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j,
                k = ea.css(a, "position"),
                l = ea(a),
                m = {};
            "static" === k && (a.style.position = "relative"),
                (h = l.offset()),
                (f = ea.css(a, "top")),
                (i = ea.css(a, "left")),
                (j = ("absolute" === k || "fixed" === k) && ea.inArray("auto", [f, i]) > -1),
                j ? ((d = l.position()), (g = d.top), (e = d.left)) : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
                ea.isFunction(b) && (b = b.call(a, c, h)),
                null != b.top && (m.top = b.top - h.top + g),
                null != b.left && (m.left = b.left - h.left + e),
                "using" in b ? b.using.call(a, m) : l.css(m);
        },
    }),
        ea.fn.extend({
            offset: function (a) {
                if (arguments.length)
                    return void 0 === a
                        ? this
                        : this.each(function (b) {
                              ea.offset.setOffset(this, a, b);
                          });
                var b,
                    c,
                    d = { top: 0, left: 0 },
                    e = this[0],
                    f = e && e.ownerDocument;
                return f
                    ? ((b = f.documentElement),
                      ea.contains(b, e)
                          ? (typeof e.getBoundingClientRect !== xa && (d = e.getBoundingClientRect()),
                            (c = V(f)),
                            { top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0) })
                          : d)
                    : void 0;
            },
            position: function () {
                if (this[0]) {
                    var a,
                        b,
                        c = { top: 0, left: 0 },
                        d = this[0];
                    return (
                        "fixed" === ea.css(d, "position")
                            ? (b = d.getBoundingClientRect())
                            : ((a = this.offsetParent()), (b = this.offset()), ea.nodeName(a[0], "html") || (c = a.offset()), (c.top += ea.css(a[0], "borderTopWidth", !0)), (c.left += ea.css(a[0], "borderLeftWidth", !0))),
                        { top: b.top - c.top - ea.css(d, "marginTop", !0), left: b.left - c.left - ea.css(d, "marginLeft", !0) }
                    );
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var a = this.offsetParent || dc; a && !ea.nodeName(a, "html") && "static" === ea.css(a, "position"); ) a = a.offsetParent;
                    return a || dc;
                });
            },
        }),
        ea.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
            var c = /Y/.test(b);
            ea.fn[a] = function (d) {
                return Da(
                    this,
                    function (a, d, e) {
                        var f = V(a);
                        return void 0 === e ? (f ? (b in f ? f[b] : f.document.documentElement[d]) : a[d]) : void (f ? f.scrollTo(c ? ea(f).scrollLeft() : e, c ? e : ea(f).scrollTop()) : (a[d] = e));
                    },
                    a,
                    d,
                    arguments.length,
                    null
                );
            };
        }),
        ea.each(["top", "left"], function (a, b) {
            ea.cssHooks[b] = A(ca.pixelPosition, function (a, c) {
                return c ? ((c = bb(a, b)), db.test(c) ? ea(a).position()[b] + "px" : c) : void 0;
            });
        }),
        ea.each({ Height: "height", Width: "width" }, function (a, b) {
            ea.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
                ea.fn[d] = function (d, e) {
                    var f = arguments.length && (c || "boolean" != typeof d),
                        g = c || (d === !0 || e === !0 ? "margin" : "border");
                    return Da(
                        this,
                        function (b, c, d) {
                            var e;
                            return ea.isWindow(b)
                                ? b.document.documentElement["client" + a]
                                : 9 === b.nodeType
                                ? ((e = b.documentElement), Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a]))
                                : void 0 === d
                                ? ea.css(b, c, g)
                                : ea.style(b, c, d, g);
                        },
                        b,
                        f ? d : void 0,
                        f,
                        null
                    );
                };
            });
        }),
        (ea.fn.size = function () {
            return this.length;
        }),
        (ea.fn.andSelf = ea.fn.addBack),
        "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
                return ea;
            });
    var ec = a.jQuery,
        fc = a.$;
    return (
        (ea.noConflict = function (b) {
            return a.$ === ea && (a.$ = fc), b && a.jQuery === ea && (a.jQuery = ec), ea;
        }),
        typeof b === xa && (a.jQuery = a.$ = ea),
        ea
    );
}),
    !(function (a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery);
    })(function (a) {
        var b = (function () {
                if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd;
                var b;
                return (
                    (function () {
                        if (!b || !b.requirejs) {
                            b ? (c = b) : (b = {});
                            var a, c, d;
                            !(function (b) {
                                function e(a, b) {
                                    return u.call(a, b);
                                }
                                function f(a, b) {
                                    var c,
                                        d,
                                        e,
                                        f,
                                        g,
                                        h,
                                        i,
                                        j,
                                        k,
                                        l,
                                        m,
                                        n = b && b.split("/"),
                                        o = s.map,
                                        p = (o && o["*"]) || {};
                                    if (a && "." === a.charAt(0))
                                        if (b) {
                                            for (a = a.split("/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.slice(0, n.length - 1).concat(a), k = 0; k < a.length; k += 1)
                                                if (((m = a[k]), "." === m)) a.splice(k, 1), (k -= 1);
                                                else if (".." === m) {
                                                    if (1 === k && (".." === a[2] || ".." === a[0])) break;
                                                    k > 0 && (a.splice(k - 1, 2), (k -= 2));
                                                }
                                            a = a.join("/");
                                        } else 0 === a.indexOf("./") && (a = a.substring(2));
                                    if ((n || p) && o) {
                                        for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
                                            if (((d = c.slice(0, k).join("/")), n))
                                                for (l = n.length; l > 0; l -= 1)
                                                    if (((e = o[n.slice(0, l).join("/")]), e && (e = e[d]))) {
                                                        (f = e), (h = k);
                                                        break;
                                                    }
                                            if (f) break;
                                            !i && p && p[d] && ((i = p[d]), (j = k));
                                        }
                                        !f && i && ((f = i), (h = j)), f && (c.splice(0, h, f), (a = c.join("/")));
                                    }
                                    return a;
                                }
                                function g(a, c) {
                                    return function () {
                                        var d = v.call(arguments, 0);
                                        return "string" != typeof d[0] && 1 === d.length && d.push(null), n.apply(b, d.concat([a, c]));
                                    };
                                }
                                function h(a) {
                                    return function (b) {
                                        return f(b, a);
                                    };
                                }
                                function i(a) {
                                    return function (b) {
                                        q[a] = b;
                                    };
                                }
                                function j(a) {
                                    if (e(r, a)) {
                                        var c = r[a];
                                        delete r[a], (t[a] = !0), m.apply(b, c);
                                    }
                                    if (!e(q, a) && !e(t, a)) throw new Error("No " + a);
                                    return q[a];
                                }
                                function k(a) {
                                    var b,
                                        c = a ? a.indexOf("!") : -1;
                                    return c > -1 && ((b = a.substring(0, c)), (a = a.substring(c + 1, a.length))), [b, a];
                                }
                                function l(a) {
                                    return function () {
                                        return (s && s.config && s.config[a]) || {};
                                    };
                                }
                                var m,
                                    n,
                                    o,
                                    p,
                                    q = {},
                                    r = {},
                                    s = {},
                                    t = {},
                                    u = Object.prototype.hasOwnProperty,
                                    v = [].slice,
                                    w = /\.js$/;
                                (o = function (a, b) {
                                    var c,
                                        d = k(a),
                                        e = d[0];
                                    return (
                                        (a = d[1]),
                                        e && ((e = f(e, b)), (c = j(e))),
                                        e ? (a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b)) : ((a = f(a, b)), (d = k(a)), (e = d[0]), (a = d[1]), e && (c = j(e))),
                                        { f: e ? e + "!" + a : a, n: a, pr: e, p: c }
                                    );
                                }),
                                    (p = {
                                        require: function (a) {
                                            return g(a);
                                        },
                                        exports: function (a) {
                                            var b = q[a];
                                            return "undefined" != typeof b ? b : (q[a] = {});
                                        },
                                        module: function (a) {
                                            return { id: a, uri: "", exports: q[a], config: l(a) };
                                        },
                                    }),
                                    (m = function (a, c, d, f) {
                                        var h,
                                            k,
                                            l,
                                            m,
                                            n,
                                            s,
                                            u = [],
                                            v = typeof d;
                                        if (((f = f || a), "undefined" === v || "function" === v)) {
                                            for (c = !c.length && d.length ? ["require", "exports", "module"] : c, n = 0; n < c.length; n += 1)
                                                if (((m = o(c[n], f)), (k = m.f), "require" === k)) u[n] = p.require(a);
                                                else if ("exports" === k) (u[n] = p.exports(a)), (s = !0);
                                                else if ("module" === k) h = u[n] = p.module(a);
                                                else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k);
                                                else {
                                                    if (!m.p) throw new Error(a + " missing " + k);
                                                    m.p.load(m.n, g(f, !0), i(k), {}), (u[n] = q[k]);
                                                }
                                            (l = d ? d.apply(q[a], u) : void 0), a && (h && h.exports !== b && h.exports !== q[a] ? (q[a] = h.exports) : (l === b && s) || (q[a] = l));
                                        } else a && (q[a] = d);
                                    }),
                                    (a = c = n = function (a, c, d, e, f) {
                                        if ("string" == typeof a) return p[a] ? p[a](c) : j(o(a, c).f);
                                        if (!a.splice) {
                                            if (((s = a), s.deps && n(s.deps, s.callback), !c)) return;
                                            c.splice ? ((a = c), (c = d), (d = null)) : (a = b);
                                        }
                                        return (
                                            (c = c || function () {}),
                                            "function" == typeof d && ((d = e), (e = f)),
                                            e
                                                ? m(b, a, c, d)
                                                : setTimeout(function () {
                                                      m(b, a, c, d);
                                                  }, 4),
                                            n
                                        );
                                    }),
                                    (n.config = function (a) {
                                        return n(a);
                                    }),
                                    (a._defined = q),
                                    (d = function (a, b, c) {
                                        if ("string" != typeof a) throw new Error("See almond README: incorrect module build, no module name");
                                        b.splice || ((c = b), (b = [])), e(q, a) || e(r, a) || (r[a] = [a, b, c]);
                                    }),
                                    (d.amd = { jQuery: !0 });
                            })(),
                                (b.requirejs = a),
                                (b.require = c),
                                (b.define = d);
                        }
                    })(),
                    b.define("almond", function () {}),
                    b.define("jquery", [], function () {
                        var b = a || $;
                        return (
                            null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b
                        );
                    }),
                    b.define("select2/utils", ["jquery"], function (a) {
                        function b(a) {
                            var b = a.prototype,
                                c = [];
                            for (var d in b) {
                                var e = b[d];
                                "function" == typeof e && "constructor" !== d && c.push(d);
                            }
                            return c;
                        }
                        var c = {};
                        (c.Extend = function (a, b) {
                            function c() {
                                this.constructor = a;
                            }
                            var d = {}.hasOwnProperty;
                            for (var e in b) d.call(b, e) && (a[e] = b[e]);
                            return (c.prototype = b.prototype), (a.prototype = new c()), (a.__super__ = b.prototype), a;
                        }),
                            (c.Decorate = function (a, c) {
                                function d() {
                                    var b = Array.prototype.unshift,
                                        d = c.prototype.constructor.length,
                                        e = a.prototype.constructor;
                                    d > 0 && (b.call(arguments, a.prototype.constructor), (e = c.prototype.constructor)), e.apply(this, arguments);
                                }
                                function e() {
                                    this.constructor = d;
                                }
                                var f = b(c),
                                    g = b(a);
                                (c.displayName = a.displayName), (d.prototype = new e());
                                for (var h = 0; h < g.length; h++) {
                                    var i = g[h];
                                    d.prototype[i] = a.prototype[i];
                                }
                                for (
                                    var j = function (a) {
                                            var b = function () {};
                                            (a in d.prototype) && (b = d.prototype[a]);
                                            var e = c.prototype[a];
                                            return function () {
                                                var a = Array.prototype.unshift;
                                                return a.call(arguments, b), e.apply(this, arguments);
                                            };
                                        },
                                        k = 0;
                                    k < f.length;
                                    k++
                                ) {
                                    var l = f[k];
                                    d.prototype[l] = j(l);
                                }
                                return d;
                            });
                        var d = function () {
                            this.listeners = {};
                        };
                        return (
                            (d.prototype.on = function (a, b) {
                                (this.listeners = this.listeners || {}), a in this.listeners ? this.listeners[a].push(b) : (this.listeners[a] = [b]);
                            }),
                            (d.prototype.trigger = function (a) {
                                var b = Array.prototype.slice,
                                    c = b.call(arguments, 1);
                                (this.listeners = this.listeners || {}),
                                    null == c && (c = []),
                                    0 === c.length && c.push({}),
                                    (c[0]._type = a),
                                    a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)),
                                    "*" in this.listeners && this.invoke(this.listeners["*"], arguments);
                            }),
                            (d.prototype.invoke = function (a, b) {
                                for (var c = 0, d = a.length; d > c; c++) a[c].apply(this, b);
                            }),
                            (c.Observable = d),
                            (c.generateChars = function (a) {
                                for (var b = "", c = 0; a > c; c++) {
                                    var d = Math.floor(36 * Math.random());
                                    b += d.toString(36);
                                }
                                return b;
                            }),
                            (c.bind = function (a, b) {
                                return function () {
                                    a.apply(b, arguments);
                                };
                            }),
                            (c._convertData = function (a) {
                                for (var b in a) {
                                    var c = b.split("-"),
                                        d = a;
                                    if (1 !== c.length) {
                                        for (var e = 0; e < c.length; e++) {
                                            var f = c[e];
                                            (f = f.substring(0, 1).toLowerCase() + f.substring(1)), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), (d = d[f]);
                                        }
                                        delete a[b];
                                    }
                                }
                                return a;
                            }),
                            (c.hasScroll = function (b, c) {
                                var d = a(c),
                                    e = c.style.overflowX,
                                    f = c.style.overflowY;
                                return e !== f || ("hidden" !== f && "visible" !== f) ? ("scroll" === e || "scroll" === f ? !0 : d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth) : !1;
                            }),
                            (c.escapeMarkup = function (a) {
                                var b = { "\\": "&#92;", "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "/": "&#47;" };
                                return "string" != typeof a
                                    ? a
                                    : String(a).replace(/[&<>"'\/\\]/g, function (a) {
                                          return b[a];
                                      });
                            }),
                            (c.appendMany = function (b, c) {
                                if ("1.7" === a.fn.jquery.substr(0, 3)) {
                                    var d = a();
                                    a.map(c, function (a) {
                                        d = d.add(a);
                                    }),
                                        (c = d);
                                }
                                b.append(c);
                            }),
                            c
                        );
                    }),
                    b.define("select2/results", ["jquery", "./utils"], function (a, b) {
                        function c(a, b, d) {
                            (this.$element = a), (this.data = d), (this.options = b), c.__super__.constructor.call(this);
                        }
                        return (
                            b.Extend(c, b.Observable),
                            (c.prototype.render = function () {
                                var b = a('<ul class="select2-results__options" role="tree"></ul>');
                                return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), (this.$results = b), b;
                            }),
                            (c.prototype.clear = function () {
                                this.$results.empty();
                            }),
                            (c.prototype.displayMessage = function (b) {
                                var c = this.options.get("escapeMarkup");
                                this.clear(), this.hideLoading();
                                var d = a('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),
                                    e = this.options.get("translations").get(b.message);
                                d.append(c(e(b.args))), (d[0].className += " select2-results__message"), this.$results.append(d);
                            }),
                            (c.prototype.hideMessages = function () {
                                this.$results.find(".select2-results__message").remove();
                            }),
                            (c.prototype.append = function (a) {
                                this.hideLoading();
                                var b = [];
                                if (null == a.results || 0 === a.results.length) return void (0 === this.$results.children().length && this.trigger("results:message", { message: "noResults" }));
                                a.results = this.sort(a.results);
                                for (var c = 0; c < a.results.length; c++) {
                                    var d = a.results[c],
                                        e = this.option(d);
                                    b.push(e);
                                }
                                this.$results.append(b);
                            }),
                            (c.prototype.position = function (a, b) {
                                var c = b.find(".select2-results");
                                c.append(a);
                            }),
                            (c.prototype.sort = function (a) {
                                var b = this.options.get("sorter");
                                return b(a);
                            }),
                            (c.prototype.highlightFirstItem = function () {
                                var a = this.$results.find(".select2-results__option[aria-selected]"),
                                    b = a.filter("[aria-selected=true]");
                                b.length > 0 ? b.first().trigger("mouseenter") : a.first().trigger("mouseenter"), this.ensureHighlightVisible();
                            }),
                            (c.prototype.setClasses = function () {
                                var b = this;
                                this.data.current(function (c) {
                                    var d = a.map(c, function (a) {
                                            return a.id.toString();
                                        }),
                                        e = b.$results.find(".select2-results__option[aria-selected]");
                                    e.each(function () {
                                        var b = a(this),
                                            c = a.data(this, "data"),
                                            e = "" + c.id;
                                        (null != c.element && c.element.selected) || (null == c.element && a.inArray(e, d) > -1) ? b.attr("aria-selected", "true") : b.attr("aria-selected", "false");
                                    });
                                });
                            }),
                            (c.prototype.showLoading = function (a) {
                                this.hideLoading();
                                var b = this.options.get("translations").get("searching"),
                                    c = { disabled: !0, loading: !0, text: b(a) },
                                    d = this.option(c);
                                (d.className += " loading-results"), this.$results.prepend(d);
                            }),
                            (c.prototype.hideLoading = function () {
                                this.$results.find(".loading-results").remove();
                            }),
                            (c.prototype.option = function (b) {
                                var c = document.createElement("li");
                                c.className = "select2-results__option";
                                var d = { role: "treeitem", "aria-selected": "false" };
                                b.disabled && (delete d["aria-selected"], (d["aria-disabled"] = "true")),
                                    null == b.id && delete d["aria-selected"],
                                    null != b._resultId && (c.id = b._resultId),
                                    b.title && (c.title = b.title),
                                    b.children && ((d.role = "group"), (d["aria-label"] = b.text), delete d["aria-selected"]);
                                for (var e in d) {
                                    var f = d[e];
                                    c.setAttribute(e, f);
                                }
                                if (b.children) {
                                    var g = a(c),
                                        h = document.createElement("strong");
                                    (h.className = "select2-results__group"), a(h), this.template(b, h);
                                    for (var i = [], j = 0; j < b.children.length; j++) {
                                        var k = b.children[j],
                                            l = this.option(k);
                                        i.push(l);
                                    }
                                    var m = a("<ul></ul>", { class: "select2-results__options select2-results__options--nested" });
                                    m.append(i), g.append(h), g.append(m);
                                } else this.template(b, c);
                                return a.data(c, "data", b), c;
                            }),
                            (c.prototype.bind = function (b, c) {
                                var d = this,
                                    e = b.id + "-results";
                                this.$results.attr("id", e),
                                    b.on("results:all", function (a) {
                                        d.clear(), d.append(a.data), b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                                    }),
                                    b.on("results:append", function (a) {
                                        d.append(a.data), b.isOpen() && d.setClasses();
                                    }),
                                    b.on("query", function (a) {
                                        d.hideMessages(), d.showLoading(a);
                                    }),
                                    b.on("select", function () {
                                        b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                                    }),
                                    b.on("unselect", function () {
                                        b.isOpen() && (d.setClasses(), d.highlightFirstItem());
                                    }),
                                    b.on("open", function () {
                                        d.$results.attr("aria-expanded", "true"), d.$results.attr("aria-hidden", "false"), d.setClasses(), d.ensureHighlightVisible();
                                    }),
                                    b.on("close", function () {
                                        d.$results.attr("aria-expanded", "false"), d.$results.attr("aria-hidden", "true"), d.$results.removeAttr("aria-activedescendant");
                                    }),
                                    b.on("results:toggle", function () {
                                        var a = d.getHighlightedResults();
                                        0 !== a.length && a.trigger("mouseup");
                                    }),
                                    b.on("results:select", function () {
                                        var a = d.getHighlightedResults();
                                        if (0 !== a.length) {
                                            var b = a.data("data");
                                            "true" == a.attr("aria-selected") ? d.trigger("close", {}) : d.trigger("select", { data: b });
                                        }
                                    }),
                                    b.on("results:previous", function () {
                                        var a = d.getHighlightedResults(),
                                            b = d.$results.find("[aria-selected]"),
                                            c = b.index(a);
                                        if (0 !== c) {
                                            var e = c - 1;
                                            0 === a.length && (e = 0);
                                            var f = b.eq(e);
                                            f.trigger("mouseenter");
                                            var g = d.$results.offset().top,
                                                h = f.offset().top,
                                                i = d.$results.scrollTop() + (h - g);
                                            0 === e ? d.$results.scrollTop(0) : 0 > h - g && d.$results.scrollTop(i);
                                        }
                                    }),
                                    b.on("results:next", function () {
                                        var a = d.getHighlightedResults(),
                                            b = d.$results.find("[aria-selected]"),
                                            c = b.index(a),
                                            e = c + 1;
                                        if (!(e >= b.length)) {
                                            var f = b.eq(e);
                                            f.trigger("mouseenter");
                                            var g = d.$results.offset().top + d.$results.outerHeight(!1),
                                                h = f.offset().top + f.outerHeight(!1),
                                                i = d.$results.scrollTop() + h - g;
                                            0 === e ? d.$results.scrollTop(0) : h > g && d.$results.scrollTop(i);
                                        }
                                    }),
                                    b.on("results:focus", function (a) {
                                        a.element.addClass("select2-results__option--highlighted");
                                    }),
                                    b.on("results:message", function (a) {
                                        d.displayMessage(a);
                                    }),
                                    a.fn.mousewheel &&
                                        this.$results.on("mousewheel", function (a) {
                                            var b = d.$results.scrollTop(),
                                                c = d.$results.get(0).scrollHeight - b + a.deltaY,
                                                e = a.deltaY > 0 && b - a.deltaY <= 0,
                                                f = a.deltaY < 0 && c <= d.$results.height();
                                            e ? (d.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (d.$results.scrollTop(d.$results.get(0).scrollHeight - d.$results.height()), a.preventDefault(), a.stopPropagation());
                                        }),
                                    this.$results.on("mouseup", ".select2-results__option[aria-selected]", function (b) {
                                        var c = a(this),
                                            e = c.data("data");
                                        return "true" === c.attr("aria-selected")
                                            ? void (d.options.get("multiple") ? d.trigger("unselect", { originalEvent: b, data: e }) : d.trigger("close", {}))
                                            : void d.trigger("select", { originalEvent: b, data: e });
                                    }),
                                    this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function (b) {
                                        var c = a(this).data("data");
                                        d.getHighlightedResults().removeClass("select2-results__option--highlighted"), d.trigger("results:focus", { data: c, element: a(this) });
                                    });
                            }),
                            (c.prototype.getHighlightedResults = function () {
                                var a = this.$results.find(".select2-results__option--highlighted");
                                return a;
                            }),
                            (c.prototype.destroy = function () {
                                this.$results.remove();
                            }),
                            (c.prototype.ensureHighlightVisible = function () {
                                var a = this.getHighlightedResults();
                                if (0 !== a.length) {
                                    var b = this.$results.find("[aria-selected]"),
                                        c = b.index(a),
                                        d = this.$results.offset().top,
                                        e = a.offset().top,
                                        f = this.$results.scrollTop() + (e - d),
                                        g = e - d;
                                    (f -= 2 * a.outerHeight(!1)), 2 >= c ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || 0 > g) && this.$results.scrollTop(f);
                                }
                            }),
                            (c.prototype.template = function (b, c) {
                                var d = this.options.get("templateResult"),
                                    e = this.options.get("escapeMarkup"),
                                    f = d(b, c);
                                null == f ? (c.style.display = "none") : "string" == typeof f ? (c.innerHTML = e(f)) : a(c).append(f);
                            }),
                            c
                        );
                    }),
                    b.define("select2/keys", [], function () {
                        var a = { BACKSPACE: 8, TAB: 9, ENTER: 13, SHIFT: 16, CTRL: 17, ALT: 18, ESC: 27, SPACE: 32, PAGE_UP: 33, PAGE_DOWN: 34, END: 35, HOME: 36, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 };
                        return a;
                    }),
                    b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function (a, b, c) {
                        function d(a, b) {
                            (this.$element = a), (this.options = b), d.__super__.constructor.call(this);
                        }
                        return (
                            b.Extend(d, b.Observable),
                            (d.prototype.render = function () {
                                var b = a('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');
                                return (
                                    (this._tabindex = 0),
                                    null != this.$element.data("old-tabindex") ? (this._tabindex = this.$element.data("old-tabindex")) : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")),
                                    b.attr("title", this.$element.attr("title")),
                                    b.attr("tabindex", this._tabindex),
                                    (this.$selection = b),
                                    b
                                );
                            }),
                            (d.prototype.bind = function (a, b) {
                                var d = this,
                                    e = (a.id + "-container", a.id + "-results");
                                (this.container = a),
                                    this.$selection.on("focus", function (a) {
                                        d.trigger("focus", a);
                                    }),
                                    this.$selection.on("blur", function (a) {
                                        d._handleBlur(a);
                                    }),
                                    this.$selection.on("keydown", function (a) {
                                        d.trigger("keypress", a), a.which === c.SPACE && a.preventDefault();
                                    }),
                                    a.on("results:focus", function (a) {
                                        d.$selection.attr("aria-activedescendant", a.data._resultId);
                                    }),
                                    a.on("selection:update", function (a) {
                                        d.update(a.data);
                                    }),
                                    a.on("open", function () {
                                        d.$selection.attr("aria-expanded", "true"), d.$selection.attr("aria-owns", e), d._attachCloseHandler(a);
                                    }),
                                    a.on("close", function () {
                                        d.$selection.attr("aria-expanded", "false"), d.$selection.removeAttr("aria-activedescendant"), d.$selection.removeAttr("aria-owns"), d.$selection.focus(), d._detachCloseHandler(a);
                                    }),
                                    a.on("enable", function () {
                                        d.$selection.attr("tabindex", d._tabindex);
                                    }),
                                    a.on("disable", function () {
                                        d.$selection.attr("tabindex", "-1");
                                    });
                            }),
                            (d.prototype._handleBlur = function (b) {
                                var c = this;
                                window.setTimeout(function () {
                                    document.activeElement == c.$selection[0] || a.contains(c.$selection[0], document.activeElement) || c.trigger("blur", b);
                                }, 1);
                            }),
                            (d.prototype._attachCloseHandler = function (b) {
                                a(document.body).on("mousedown.select2." + b.id, function (b) {
                                    var c = a(b.target),
                                        d = c.closest(".select2"),
                                        e = a(".select2.select2-container--open");
                                    e.each(function () {
                                        var b = a(this);
                                        if (this != d[0]) {
                                            var c = b.data("element");
                                            c.select2("close");
                                        }
                                    });
                                });
                            }),
                            (d.prototype._detachCloseHandler = function (b) {
                                a(document.body).off("mousedown.select2." + b.id);
                            }),
                            (d.prototype.position = function (a, b) {
                                var c = b.find(".selection");
                                c.append(a);
                            }),
                            (d.prototype.destroy = function () {
                                this._detachCloseHandler(this.container);
                            }),
                            (d.prototype.update = function (a) {
                                throw new Error("The `update` method must be defined in child classes.");
                            }),
                            d
                        );
                    }),
                    b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function (a, b, c, d) {
                        function e() {
                            e.__super__.constructor.apply(this, arguments);
                        }
                        return (
                            c.Extend(e, b),
                            (e.prototype.render = function () {
                                var a = e.__super__.render.call(this);
                                return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a;
                            }),
                            (e.prototype.bind = function (a, b) {
                                var c = this;
                                e.__super__.bind.apply(this, arguments);
                                var d = a.id + "-container";
                                this.$selection.find(".select2-selection__rendered").attr("id", d),
                                    this.$selection.attr("aria-labelledby", d),
                                    this.$selection.on("mousedown", function (a) {
                                        1 === a.which && c.trigger("toggle", { originalEvent: a });
                                    }),
                                    this.$selection.on("focus", function (a) {}),
                                    this.$selection.on("blur", function (a) {}),
                                    a.on("focus", function (b) {
                                        a.isOpen() || c.$selection.focus();
                                    }),
                                    a.on("selection:update", function (a) {
                                        c.update(a.data);
                                    });
                            }),
                            (e.prototype.clear = function () {
                                this.$selection.find(".select2-selection__rendered").empty();
                            }),
                            (e.prototype.display = function (a, b) {
                                var c = this.options.get("templateSelection"),
                                    d = this.options.get("escapeMarkup");
                                return d(c(a, b));
                            }),
                            (e.prototype.selectionContainer = function () {
                                return a("<span></span>");
                            }),
                            (e.prototype.update = function (a) {
                                if (0 === a.length) return void this.clear();
                                var b = a[0],
                                    c = this.$selection.find(".select2-selection__rendered"),
                                    d = this.display(b, c);
                                c.empty().append(d), c.prop("title", b.title || b.text);
                            }),
                            e
                        );
                    }),
                    b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function (a, b, c) {
                        function d(a, b) {
                            d.__super__.constructor.apply(this, arguments);
                        }
                        return (
                            c.Extend(d, b),
                            (d.prototype.render = function () {
                                var a = d.__super__.render.call(this);
                                return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a;
                            }),
                            (d.prototype.bind = function (b, c) {
                                var e = this;
                                d.__super__.bind.apply(this, arguments),
                                    this.$selection.on("click", function (a) {
                                        e.trigger("toggle", { originalEvent: a });
                                    }),
                                    this.$selection.on("click", ".select2-selection__choice__remove", function (b) {
                                        if (!e.options.get("disabled")) {
                                            var c = a(this),
                                                d = c.parent(),
                                                f = d.data("data");
                                            e.trigger("unselect", { originalEvent: b, data: f });
                                        }
                                    });
                            }),
                            (d.prototype.clear = function () {
                                this.$selection.find(".select2-selection__rendered").empty();
                            }),
                            (d.prototype.display = function (a, b) {
                                var c = this.options.get("templateSelection"),
                                    d = this.options.get("escapeMarkup");
                                return d(c(a, b));
                            }),
                            (d.prototype.selectionContainer = function () {
                                var b = a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
                                return b;
                            }),
                            (d.prototype.update = function (a) {
                                if ((this.clear(), 0 !== a.length)) {
                                    for (var b = [], d = 0; d < a.length; d++) {
                                        var e = a[d],
                                            f = this.selectionContainer(),
                                            g = this.display(e, f);
                                        f.append(g), f.prop("title", e.title || e.text), f.data("data", e), b.push(f);
                                    }
                                    var h = this.$selection.find(".select2-selection__rendered");
                                    c.appendMany(h, b);
                                }
                            }),
                            d
                        );
                    }),
                    b.define("select2/selection/placeholder", ["../utils"], function (a) {
                        function b(a, b, c) {
                            (this.placeholder = this.normalizePlaceholder(c.get("placeholder"))), a.call(this, b, c);
                        }
                        return (
                            (b.prototype.normalizePlaceholder = function (a, b) {
                                return "string" == typeof b && (b = { id: "", text: b }), b;
                            }),
                            (b.prototype.createPlaceholder = function (a, b) {
                                var c = this.selectionContainer();
                                return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c;
                            }),
                            (b.prototype.update = function (a, b) {
                                var c = 1 == b.length && b[0].id != this.placeholder.id,
                                    d = b.length > 1;
                                if (d || c) return a.call(this, b);
                                this.clear();
                                var e = this.createPlaceholder(this.placeholder);
                                this.$selection.find(".select2-selection__rendered").append(e);
                            }),
                            b
                        );
                    }),
                    b.define("select2/selection/allowClear", ["jquery", "../keys"], function (a, b) {
                        function c() {}
                        return (
                            (c.prototype.bind = function (a, b, c) {
                                var d = this;
                                a.call(this, b, c),
                                    null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."),
                                    this.$selection.on("mousedown", ".select2-selection__clear", function (a) {
                                        d._handleClear(a);
                                    }),
                                    b.on("keypress", function (a) {
                                        d._handleKeyboardClear(a, b);
                                    });
                            }),
                            (c.prototype._handleClear = function (a, b) {
                                if (!this.options.get("disabled")) {
                                    var c = this.$selection.find(".select2-selection__clear");
                                    if (0 !== c.length) {
                                        b.stopPropagation();
                                        for (var d = c.data("data"), e = 0; e < d.length; e++) {
                                            var f = { data: d[e] };
                                            if ((this.trigger("unselect", f), f.prevented)) return;
                                        }
                                        this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle", {});
                                    }
                                }
                            }),
                            (c.prototype._handleKeyboardClear = function (a, c, d) {
                                d.isOpen() || ((c.which == b.DELETE || c.which == b.BACKSPACE) && this._handleClear(c));
                            }),
                            (c.prototype.update = function (b, c) {
                                if ((b.call(this, c), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === c.length))) {
                                    var d = a('<span class="select2-selection__clear">&times;</span>');
                                    d.data("data", c), this.$selection.find(".select2-selection__rendered").prepend(d);
                                }
                            }),
                            c
                        );
                    }),
                    b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function (a, b, c) {
                        function d(a, b, c) {
                            a.call(this, b, c);
                        }
                        return (
                            (d.prototype.render = function (b) {
                                var c = a(
                                    '<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>'
                                );
                                (this.$searchContainer = c), (this.$search = c.find("input"));
                                var d = b.call(this);
                                return this._transferTabIndex(), d;
                            }),
                            (d.prototype.bind = function (a, b, d) {
                                var e = this;
                                a.call(this, b, d),
                                    b.on("open", function () {
                                        e.$search.trigger("focus");
                                    }),
                                    b.on("close", function () {
                                        e.$search.val(""), e.$search.removeAttr("aria-activedescendant"), e.$search.trigger("focus");
                                    }),
                                    b.on("enable", function () {
                                        e.$search.prop("disabled", !1), e._transferTabIndex();
                                    }),
                                    b.on("disable", function () {
                                        e.$search.prop("disabled", !0);
                                    }),
                                    b.on("focus", function (a) {
                                        e.$search.trigger("focus");
                                    }),
                                    b.on("results:focus", function (a) {
                                        e.$search.attr("aria-activedescendant", a.id);
                                    }),
                                    this.$selection.on("focusin", ".select2-search--inline", function (a) {
                                        e.trigger("focus", a);
                                    }),
                                    this.$selection.on("focusout", ".select2-search--inline", function (a) {
                                        e._handleBlur(a);
                                    }),
                                    this.$selection.on("keydown", ".select2-search--inline", function (a) {
                                        a.stopPropagation(), e.trigger("keypress", a), (e._keyUpPrevented = a.isDefaultPrevented());
                                        var b = a.which;
                                        if (b === c.BACKSPACE && "" === e.$search.val()) {
                                            var d = e.$searchContainer.prev(".select2-selection__choice");
                                            if (d.length > 0) {
                                                var f = d.data("data");
                                                e.searchRemoveChoice(f), a.preventDefault();
                                            }
                                        }
                                    });
                                var f = document.documentMode,
                                    g = f && 11 >= f;
                                this.$selection.on("input.searchcheck", ".select2-search--inline", function (a) {
                                    return g ? void e.$selection.off("input.search input.searchcheck") : void e.$selection.off("keyup.search");
                                }),
                                    this.$selection.on("keyup.search input.search", ".select2-search--inline", function (a) {
                                        if (g && "input" === a.type) return void e.$selection.off("input.search input.searchcheck");
                                        var b = a.which;
                                        b != c.SHIFT && b != c.CTRL && b != c.ALT && b != c.TAB && e.handleSearch(a);
                                    });
                            }),
                            (d.prototype._transferTabIndex = function (a) {
                                this.$search.attr("tabindex", this.$selection.attr("tabindex")), this.$selection.attr("tabindex", "-1");
                            }),
                            (d.prototype.createPlaceholder = function (a, b) {
                                this.$search.attr("placeholder", b.text);
                            }),
                            (d.prototype.update = function (a, b) {
                                var c = this.$search[0] == document.activeElement;
                                this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch(), c && this.$search.focus();
                            }),
                            (d.prototype.handleSearch = function () {
                                if ((this.resizeSearch(), !this._keyUpPrevented)) {
                                    var a = this.$search.val();
                                    this.trigger("query", { term: a });
                                }
                                this._keyUpPrevented = !1;
                            }),
                            (d.prototype.searchRemoveChoice = function (a, b) {
                                this.trigger("unselect", { data: b }), this.$search.val(b.text), this.handleSearch();
                            }),
                            (d.prototype.resizeSearch = function () {
                                this.$search.css("width", "25px");
                                var a = "";
                                if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth();
                                else {
                                    var b = this.$search.val().length + 1;
                                    a = 0.75 * b + "em";
                                }
                                this.$search.css("width", a);
                            }),
                            d
                        );
                    }),
                    b.define("select2/selection/eventRelay", ["jquery"], function (a) {
                        function b() {}
                        return (
                            (b.prototype.bind = function (b, c, d) {
                                var e = this,
                                    f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                                    g = ["opening", "closing", "selecting", "unselecting"];
                                b.call(this, c, d),
                                    c.on("*", function (b, c) {
                                        if (-1 !== a.inArray(b, f)) {
                                            c = c || {};
                                            var d = a.Event("select2:" + b, { params: c });
                                            e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented());
                                        }
                                    });
                            }),
                            b
                        );
                    }),
                    b.define("select2/translation", ["jquery", "require"], function (a, b) {
                        function c(a) {
                            this.dict = a || {};
                        }
                        return (
                            (c.prototype.all = function () {
                                return this.dict;
                            }),
                            (c.prototype.get = function (a) {
                                return this.dict[a];
                            }),
                            (c.prototype.extend = function (b) {
                                this.dict = a.extend({}, b.all(), this.dict);
                            }),
                            (c._cache = {}),
                            (c.loadPath = function (a) {
                                if (!(a in c._cache)) {
                                    var d = b(a);
                                    c._cache[a] = d;
                                }
                                return new c(c._cache[a]);
                            }),
                            c
                        );
                    }),
                    b.define("select2/diacritics", [], function () {
                        var a = {
                            "Ⓐ": "A",
                            Ａ: "A",
                            À: "A",
                            Á: "A",
                            Â: "A",
                            Ầ: "A",
                            Ấ: "A",
                            Ẫ: "A",
                            Ẩ: "A",
                            Ã: "A",
                            Ā: "A",
                            Ă: "A",
                            Ằ: "A",
                            Ắ: "A",
                            Ẵ: "A",
                            Ẳ: "A",
                            Ȧ: "A",
                            Ǡ: "A",
                            Ä: "A",
                            Ǟ: "A",
                            Ả: "A",
                            Å: "A",
                            Ǻ: "A",
                            Ǎ: "A",
                            Ȁ: "A",
                            Ȃ: "A",
                            Ạ: "A",
                            Ậ: "A",
                            Ặ: "A",
                            Ḁ: "A",
                            Ą: "A",
                            Ⱥ: "A",
                            Ɐ: "A",
                            Ꜳ: "AA",
                            Æ: "AE",
                            Ǽ: "AE",
                            Ǣ: "AE",
                            Ꜵ: "AO",
                            Ꜷ: "AU",
                            Ꜹ: "AV",
                            Ꜻ: "AV",
                            Ꜽ: "AY",
                            "Ⓑ": "B",
                            Ｂ: "B",
                            Ḃ: "B",
                            Ḅ: "B",
                            Ḇ: "B",
                            Ƀ: "B",
                            Ƃ: "B",
                            Ɓ: "B",
                            "Ⓒ": "C",
                            Ｃ: "C",
                            Ć: "C",
                            Ĉ: "C",
                            Ċ: "C",
                            Č: "C",
                            Ç: "C",
                            Ḉ: "C",
                            Ƈ: "C",
                            Ȼ: "C",
                            Ꜿ: "C",
                            "Ⓓ": "D",
                            Ｄ: "D",
                            Ḋ: "D",
                            Ď: "D",
                            Ḍ: "D",
                            Ḑ: "D",
                            Ḓ: "D",
                            Ḏ: "D",
                            Đ: "D",
                            Ƌ: "D",
                            Ɗ: "D",
                            Ɖ: "D",
                            Ꝺ: "D",
                            Ǳ: "DZ",
                            Ǆ: "DZ",
                            ǲ: "Dz",
                            ǅ: "Dz",
                            "Ⓔ": "E",
                            Ｅ: "E",
                            È: "E",
                            É: "E",
                            Ê: "E",
                            Ề: "E",
                            Ế: "E",
                            Ễ: "E",
                            Ể: "E",
                            Ẽ: "E",
                            Ē: "E",
                            Ḕ: "E",
                            Ḗ: "E",
                            Ĕ: "E",
                            Ė: "E",
                            Ë: "E",
                            Ẻ: "E",
                            Ě: "E",
                            Ȅ: "E",
                            Ȇ: "E",
                            Ẹ: "E",
                            Ệ: "E",
                            Ȩ: "E",
                            Ḝ: "E",
                            Ę: "E",
                            Ḙ: "E",
                            Ḛ: "E",
                            Ɛ: "E",
                            Ǝ: "E",
                            "Ⓕ": "F",
                            Ｆ: "F",
                            Ḟ: "F",
                            Ƒ: "F",
                            Ꝼ: "F",
                            "Ⓖ": "G",
                            Ｇ: "G",
                            Ǵ: "G",
                            Ĝ: "G",
                            Ḡ: "G",
                            Ğ: "G",
                            Ġ: "G",
                            Ǧ: "G",
                            Ģ: "G",
                            Ǥ: "G",
                            Ɠ: "G",
                            Ꞡ: "G",
                            Ᵹ: "G",
                            Ꝿ: "G",
                            "Ⓗ": "H",
                            Ｈ: "H",
                            Ĥ: "H",
                            Ḣ: "H",
                            Ḧ: "H",
                            Ȟ: "H",
                            Ḥ: "H",
                            Ḩ: "H",
                            Ḫ: "H",
                            Ħ: "H",
                            Ⱨ: "H",
                            Ⱶ: "H",
                            Ɥ: "H",
                            "Ⓘ": "I",
                            Ｉ: "I",
                            Ì: "I",
                            Í: "I",
                            Î: "I",
                            Ĩ: "I",
                            Ī: "I",
                            Ĭ: "I",
                            İ: "I",
                            Ï: "I",
                            Ḯ: "I",
                            Ỉ: "I",
                            Ǐ: "I",
                            Ȉ: "I",
                            Ȋ: "I",
                            Ị: "I",
                            Į: "I",
                            Ḭ: "I",
                            Ɨ: "I",
                            "Ⓙ": "J",
                            Ｊ: "J",
                            Ĵ: "J",
                            Ɉ: "J",
                            "Ⓚ": "K",
                            Ｋ: "K",
                            Ḱ: "K",
                            Ǩ: "K",
                            Ḳ: "K",
                            Ķ: "K",
                            Ḵ: "K",
                            Ƙ: "K",
                            Ⱪ: "K",
                            Ꝁ: "K",
                            Ꝃ: "K",
                            Ꝅ: "K",
                            Ꞣ: "K",
                            "Ⓛ": "L",
                            Ｌ: "L",
                            Ŀ: "L",
                            Ĺ: "L",
                            Ľ: "L",
                            Ḷ: "L",
                            Ḹ: "L",
                            Ļ: "L",
                            Ḽ: "L",
                            Ḻ: "L",
                            Ł: "L",
                            Ƚ: "L",
                            Ɫ: "L",
                            Ⱡ: "L",
                            Ꝉ: "L",
                            Ꝇ: "L",
                            Ꞁ: "L",
                            Ǉ: "LJ",
                            ǈ: "Lj",
                            "Ⓜ": "M",
                            Ｍ: "M",
                            Ḿ: "M",
                            Ṁ: "M",
                            Ṃ: "M",
                            Ɱ: "M",
                            Ɯ: "M",
                            "Ⓝ": "N",
                            Ｎ: "N",
                            Ǹ: "N",
                            Ń: "N",
                            Ñ: "N",
                            Ṅ: "N",
                            Ň: "N",
                            Ṇ: "N",
                            Ņ: "N",
                            Ṋ: "N",
                            Ṉ: "N",
                            Ƞ: "N",
                            Ɲ: "N",
                            Ꞑ: "N",
                            Ꞥ: "N",
                            Ǌ: "NJ",
                            ǋ: "Nj",
                            "Ⓞ": "O",
                            Ｏ: "O",
                            Ò: "O",
                            Ó: "O",
                            Ô: "O",
                            Ồ: "O",
                            Ố: "O",
                            Ỗ: "O",
                            Ổ: "O",
                            Õ: "O",
                            Ṍ: "O",
                            Ȭ: "O",
                            Ṏ: "O",
                            Ō: "O",
                            Ṑ: "O",
                            Ṓ: "O",
                            Ŏ: "O",
                            Ȯ: "O",
                            Ȱ: "O",
                            Ö: "O",
                            Ȫ: "O",
                            Ỏ: "O",
                            Ő: "O",
                            Ǒ: "O",
                            Ȍ: "O",
                            Ȏ: "O",
                            Ơ: "O",
                            Ờ: "O",
                            Ớ: "O",
                            Ỡ: "O",
                            Ở: "O",
                            Ợ: "O",
                            Ọ: "O",
                            Ộ: "O",
                            Ǫ: "O",
                            Ǭ: "O",
                            Ø: "O",
                            Ǿ: "O",
                            Ɔ: "O",
                            Ɵ: "O",
                            Ꝋ: "O",
                            Ꝍ: "O",
                            Ƣ: "OI",
                            Ꝏ: "OO",
                            Ȣ: "OU",
                            "Ⓟ": "P",
                            Ｐ: "P",
                            Ṕ: "P",
                            Ṗ: "P",
                            Ƥ: "P",
                            Ᵽ: "P",
                            Ꝑ: "P",
                            Ꝓ: "P",
                            Ꝕ: "P",
                            "Ⓠ": "Q",
                            Ｑ: "Q",
                            Ꝗ: "Q",
                            Ꝙ: "Q",
                            Ɋ: "Q",
                            "Ⓡ": "R",
                            Ｒ: "R",
                            Ŕ: "R",
                            Ṙ: "R",
                            Ř: "R",
                            Ȑ: "R",
                            Ȓ: "R",
                            Ṛ: "R",
                            Ṝ: "R",
                            Ŗ: "R",
                            Ṟ: "R",
                            Ɍ: "R",
                            Ɽ: "R",
                            Ꝛ: "R",
                            Ꞧ: "R",
                            Ꞃ: "R",
                            "Ⓢ": "S",
                            Ｓ: "S",
                            ẞ: "S",
                            Ś: "S",
                            Ṥ: "S",
                            Ŝ: "S",
                            Ṡ: "S",
                            Š: "S",
                            Ṧ: "S",
                            Ṣ: "S",
                            Ṩ: "S",
                            Ș: "S",
                            Ş: "S",
                            Ȿ: "S",
                            Ꞩ: "S",
                            Ꞅ: "S",
                            "Ⓣ": "T",
                            Ｔ: "T",
                            Ṫ: "T",
                            Ť: "T",
                            Ṭ: "T",
                            Ț: "T",
                            Ţ: "T",
                            Ṱ: "T",
                            Ṯ: "T",
                            Ŧ: "T",
                            Ƭ: "T",
                            Ʈ: "T",
                            Ⱦ: "T",
                            Ꞇ: "T",
                            Ꜩ: "TZ",
                            "Ⓤ": "U",
                            Ｕ: "U",
                            Ù: "U",
                            Ú: "U",
                            Û: "U",
                            Ũ: "U",
                            Ṹ: "U",
                            Ū: "U",
                            Ṻ: "U",
                            Ŭ: "U",
                            Ü: "U",
                            Ǜ: "U",
                            Ǘ: "U",
                            Ǖ: "U",
                            Ǚ: "U",
                            Ủ: "U",
                            Ů: "U",
                            Ű: "U",
                            Ǔ: "U",
                            Ȕ: "U",
                            Ȗ: "U",
                            Ư: "U",
                            Ừ: "U",
                            Ứ: "U",
                            Ữ: "U",
                            Ử: "U",
                            Ự: "U",
                            Ụ: "U",
                            Ṳ: "U",
                            Ų: "U",
                            Ṷ: "U",
                            Ṵ: "U",
                            Ʉ: "U",
                            "Ⓥ": "V",
                            Ｖ: "V",
                            Ṽ: "V",
                            Ṿ: "V",
                            Ʋ: "V",
                            Ꝟ: "V",
                            Ʌ: "V",
                            Ꝡ: "VY",
                            "Ⓦ": "W",
                            Ｗ: "W",
                            Ẁ: "W",
                            Ẃ: "W",
                            Ŵ: "W",
                            Ẇ: "W",
                            Ẅ: "W",
                            Ẉ: "W",
                            Ⱳ: "W",
                            "Ⓧ": "X",
                            Ｘ: "X",
                            Ẋ: "X",
                            Ẍ: "X",
                            "Ⓨ": "Y",
                            Ｙ: "Y",
                            Ỳ: "Y",
                            Ý: "Y",
                            Ŷ: "Y",
                            Ỹ: "Y",
                            Ȳ: "Y",
                            Ẏ: "Y",
                            Ÿ: "Y",
                            Ỷ: "Y",
                            Ỵ: "Y",
                            Ƴ: "Y",
                            Ɏ: "Y",
                            Ỿ: "Y",
                            "Ⓩ": "Z",
                            Ｚ: "Z",
                            Ź: "Z",
                            Ẑ: "Z",
                            Ż: "Z",
                            Ž: "Z",
                            Ẓ: "Z",
                            Ẕ: "Z",
                            Ƶ: "Z",
                            Ȥ: "Z",
                            Ɀ: "Z",
                            Ⱬ: "Z",
                            Ꝣ: "Z",
                            "ⓐ": "a",
                            ａ: "a",
                            ẚ: "a",
                            à: "a",
                            á: "a",
                            â: "a",
                            ầ: "a",
                            ấ: "a",
                            ẫ: "a",
                            ẩ: "a",
                            ã: "a",
                            ā: "a",
                            ă: "a",
                            ằ: "a",
                            ắ: "a",
                            ẵ: "a",
                            ẳ: "a",
                            ȧ: "a",
                            ǡ: "a",
                            ä: "a",
                            ǟ: "a",
                            ả: "a",
                            å: "a",
                            ǻ: "a",
                            ǎ: "a",
                            ȁ: "a",
                            ȃ: "a",
                            ạ: "a",
                            ậ: "a",
                            ặ: "a",
                            ḁ: "a",
                            ą: "a",
                            ⱥ: "a",
                            ɐ: "a",
                            ꜳ: "aa",
                            æ: "ae",
                            ǽ: "ae",
                            ǣ: "ae",
                            ꜵ: "ao",
                            ꜷ: "au",
                            ꜹ: "av",
                            ꜻ: "av",
                            ꜽ: "ay",
                            "ⓑ": "b",
                            ｂ: "b",
                            ḃ: "b",
                            ḅ: "b",
                            ḇ: "b",
                            ƀ: "b",
                            ƃ: "b",
                            ɓ: "b",
                            "ⓒ": "c",
                            ｃ: "c",
                            ć: "c",
                            ĉ: "c",
                            ċ: "c",
                            č: "c",
                            ç: "c",
                            ḉ: "c",
                            ƈ: "c",
                            ȼ: "c",
                            ꜿ: "c",
                            ↄ: "c",
                            "ⓓ": "d",
                            ｄ: "d",
                            ḋ: "d",
                            ď: "d",
                            ḍ: "d",
                            ḑ: "d",
                            ḓ: "d",
                            ḏ: "d",
                            đ: "d",
                            ƌ: "d",
                            ɖ: "d",
                            ɗ: "d",
                            ꝺ: "d",
                            ǳ: "dz",
                            ǆ: "dz",
                            "ⓔ": "e",
                            ｅ: "e",
                            è: "e",
                            é: "e",
                            ê: "e",
                            ề: "e",
                            ế: "e",
                            ễ: "e",
                            ể: "e",
                            ẽ: "e",
                            ē: "e",
                            ḕ: "e",
                            ḗ: "e",
                            ĕ: "e",
                            ė: "e",
                            ë: "e",
                            ẻ: "e",
                            ě: "e",
                            ȅ: "e",
                            ȇ: "e",
                            ẹ: "e",
                            ệ: "e",
                            ȩ: "e",
                            ḝ: "e",
                            ę: "e",
                            ḙ: "e",
                            ḛ: "e",
                            ɇ: "e",
                            ɛ: "e",
                            ǝ: "e",
                            "ⓕ": "f",
                            ｆ: "f",
                            ḟ: "f",
                            ƒ: "f",
                            ꝼ: "f",
                            "ⓖ": "g",
                            ｇ: "g",
                            ǵ: "g",
                            ĝ: "g",
                            ḡ: "g",
                            ğ: "g",
                            ġ: "g",
                            ǧ: "g",
                            ģ: "g",
                            ǥ: "g",
                            ɠ: "g",
                            ꞡ: "g",
                            ᵹ: "g",
                            ꝿ: "g",
                            "ⓗ": "h",
                            ｈ: "h",
                            ĥ: "h",
                            ḣ: "h",
                            ḧ: "h",
                            ȟ: "h",
                            ḥ: "h",
                            ḩ: "h",
                            ḫ: "h",
                            ẖ: "h",
                            ħ: "h",
                            ⱨ: "h",
                            ⱶ: "h",
                            ɥ: "h",
                            ƕ: "hv",
                            "ⓘ": "i",
                            ｉ: "i",
                            ì: "i",
                            í: "i",
                            î: "i",
                            ĩ: "i",
                            ī: "i",
                            ĭ: "i",
                            ï: "i",
                            ḯ: "i",
                            ỉ: "i",
                            ǐ: "i",
                            ȉ: "i",
                            ȋ: "i",
                            ị: "i",
                            į: "i",
                            ḭ: "i",
                            ɨ: "i",
                            ı: "i",
                            "ⓙ": "j",
                            ｊ: "j",
                            ĵ: "j",
                            ǰ: "j",
                            ɉ: "j",
                            "ⓚ": "k",
                            ｋ: "k",
                            ḱ: "k",
                            ǩ: "k",
                            ḳ: "k",
                            ķ: "k",
                            ḵ: "k",
                            ƙ: "k",
                            ⱪ: "k",
                            ꝁ: "k",
                            ꝃ: "k",
                            ꝅ: "k",
                            ꞣ: "k",
                            "ⓛ": "l",
                            ｌ: "l",
                            ŀ: "l",
                            ĺ: "l",
                            ľ: "l",
                            ḷ: "l",
                            ḹ: "l",
                            ļ: "l",
                            ḽ: "l",
                            ḻ: "l",
                            ſ: "l",
                            ł: "l",
                            ƚ: "l",
                            ɫ: "l",
                            ⱡ: "l",
                            ꝉ: "l",
                            ꞁ: "l",
                            ꝇ: "l",
                            ǉ: "lj",
                            "ⓜ": "m",
                            ｍ: "m",
                            ḿ: "m",
                            ṁ: "m",
                            ṃ: "m",
                            ɱ: "m",
                            ɯ: "m",
                            "ⓝ": "n",
                            ｎ: "n",
                            ǹ: "n",
                            ń: "n",
                            ñ: "n",
                            ṅ: "n",
                            ň: "n",
                            ṇ: "n",
                            ņ: "n",
                            ṋ: "n",
                            ṉ: "n",
                            ƞ: "n",
                            ɲ: "n",
                            ŉ: "n",
                            ꞑ: "n",
                            ꞥ: "n",
                            ǌ: "nj",
                            "ⓞ": "o",
                            ｏ: "o",
                            ò: "o",
                            ó: "o",
                            ô: "o",
                            ồ: "o",
                            ố: "o",
                            ỗ: "o",
                            ổ: "o",
                            õ: "o",
                            ṍ: "o",
                            ȭ: "o",
                            ṏ: "o",
                            ō: "o",
                            ṑ: "o",
                            ṓ: "o",
                            ŏ: "o",
                            ȯ: "o",
                            ȱ: "o",
                            ö: "o",
                            ȫ: "o",
                            ỏ: "o",
                            ő: "o",
                            ǒ: "o",
                            ȍ: "o",
                            ȏ: "o",
                            ơ: "o",
                            ờ: "o",
                            ớ: "o",
                            ỡ: "o",
                            ở: "o",
                            ợ: "o",
                            ọ: "o",
                            ộ: "o",
                            ǫ: "o",
                            ǭ: "o",
                            ø: "o",
                            ǿ: "o",
                            ɔ: "o",
                            ꝋ: "o",
                            ꝍ: "o",
                            ɵ: "o",
                            ƣ: "oi",
                            ȣ: "ou",
                            ꝏ: "oo",
                            "ⓟ": "p",
                            ｐ: "p",
                            ṕ: "p",
                            ṗ: "p",
                            ƥ: "p",
                            ᵽ: "p",
                            ꝑ: "p",
                            ꝓ: "p",
                            ꝕ: "p",
                            "ⓠ": "q",
                            ｑ: "q",
                            ɋ: "q",
                            ꝗ: "q",
                            ꝙ: "q",
                            "ⓡ": "r",
                            ｒ: "r",
                            ŕ: "r",
                            ṙ: "r",
                            ř: "r",
                            ȑ: "r",
                            ȓ: "r",
                            ṛ: "r",
                            ṝ: "r",
                            ŗ: "r",
                            ṟ: "r",
                            ɍ: "r",
                            ɽ: "r",
                            ꝛ: "r",
                            ꞧ: "r",
                            ꞃ: "r",
                            "ⓢ": "s",
                            ｓ: "s",
                            ß: "s",
                            ś: "s",
                            ṥ: "s",
                            ŝ: "s",
                            ṡ: "s",
                            š: "s",
                            ṧ: "s",
                            ṣ: "s",
                            ṩ: "s",
                            ș: "s",
                            ş: "s",
                            ȿ: "s",
                            ꞩ: "s",
                            ꞅ: "s",
                            ẛ: "s",
                            "ⓣ": "t",
                            ｔ: "t",
                            ṫ: "t",
                            ẗ: "t",
                            ť: "t",
                            ṭ: "t",
                            ț: "t",
                            ţ: "t",
                            ṱ: "t",
                            ṯ: "t",
                            ŧ: "t",
                            ƭ: "t",
                            ʈ: "t",
                            ⱦ: "t",
                            ꞇ: "t",
                            ꜩ: "tz",
                            "ⓤ": "u",
                            ｕ: "u",
                            ù: "u",
                            ú: "u",
                            û: "u",
                            ũ: "u",
                            ṹ: "u",
                            ū: "u",
                            ṻ: "u",
                            ŭ: "u",
                            ü: "u",
                            ǜ: "u",
                            ǘ: "u",
                            ǖ: "u",
                            ǚ: "u",
                            ủ: "u",
                            ů: "u",
                            ű: "u",
                            ǔ: "u",
                            ȕ: "u",
                            ȗ: "u",
                            ư: "u",
                            ừ: "u",
                            ứ: "u",
                            ữ: "u",
                            ử: "u",
                            ự: "u",
                            ụ: "u",
                            ṳ: "u",
                            ų: "u",
                            ṷ: "u",
                            ṵ: "u",
                            ʉ: "u",
                            "ⓥ": "v",
                            ｖ: "v",
                            ṽ: "v",
                            ṿ: "v",
                            ʋ: "v",
                            ꝟ: "v",
                            ʌ: "v",
                            ꝡ: "vy",
                            "ⓦ": "w",
                            ｗ: "w",
                            ẁ: "w",
                            ẃ: "w",
                            ŵ: "w",
                            ẇ: "w",
                            ẅ: "w",
                            ẘ: "w",
                            ẉ: "w",
                            ⱳ: "w",
                            "ⓧ": "x",
                            ｘ: "x",
                            ẋ: "x",
                            ẍ: "x",
                            "ⓨ": "y",
                            ｙ: "y",
                            ỳ: "y",
                            ý: "y",
                            ŷ: "y",
                            ỹ: "y",
                            ȳ: "y",
                            ẏ: "y",
                            ÿ: "y",
                            ỷ: "y",
                            ẙ: "y",
                            ỵ: "y",
                            ƴ: "y",
                            ɏ: "y",
                            ỿ: "y",
                            "ⓩ": "z",
                            ｚ: "z",
                            ź: "z",
                            ẑ: "z",
                            ż: "z",
                            ž: "z",
                            ẓ: "z",
                            ẕ: "z",
                            ƶ: "z",
                            ȥ: "z",
                            ɀ: "z",
                            ⱬ: "z",
                            ꝣ: "z",
                            Ά: "Α",
                            Έ: "Ε",
                            Ή: "Η",
                            Ί: "Ι",
                            Ϊ: "Ι",
                            Ό: "Ο",
                            Ύ: "Υ",
                            Ϋ: "Υ",
                            Ώ: "Ω",
                            ά: "α",
                            έ: "ε",
                            ή: "η",
                            ί: "ι",
                            ϊ: "ι",
                            ΐ: "ι",
                            ό: "ο",
                            ύ: "υ",
                            ϋ: "υ",
                            ΰ: "υ",
                            ω: "ω",
                            ς: "σ",
                        };
                        return a;
                    }),
                    b.define("select2/data/base", ["../utils"], function (a) {
                        function b(a, c) {
                            b.__super__.constructor.call(this);
                        }
                        return (
                            a.Extend(b, a.Observable),
                            (b.prototype.current = function (a) {
                                throw new Error("The `current` method must be defined in child classes.");
                            }),
                            (b.prototype.query = function (a, b) {
                                throw new Error("The `query` method must be defined in child classes.");
                            }),
                            (b.prototype.bind = function (a, b) {}),
                            (b.prototype.destroy = function () {}),
                            (b.prototype.generateResultId = function (b, c) {
                                var d = b.id + "-result-";
                                return (d += a.generateChars(4)), (d += null != c.id ? "-" + c.id.toString() : "-" + a.generateChars(4));
                            }),
                            b
                        );
                    }),
                    b.define("select2/data/select", ["./base", "../utils", "jquery"], function (a, b, c) {
                        function d(a, b) {
                            (this.$element = a), (this.options = b), d.__super__.constructor.call(this);
                        }
                        return (
                            b.Extend(d, a),
                            (d.prototype.current = function (a) {
                                var b = [],
                                    d = this;
                                this.$element.find(":selected").each(function () {
                                    var a = c(this),
                                        e = d.item(a);
                                    b.push(e);
                                }),
                                    a(b);
                            }),
                            (d.prototype.select = function (a) {
                                var b = this;
                                if (((a.selected = !0), c(a.element).is("option"))) return (a.element.selected = !0), void this.$element.trigger("change");
                                if (this.$element.prop("multiple"))
                                    this.current(function (d) {
                                        var e = [];
                                        (a = [a]), a.push.apply(a, d);
                                        for (var f = 0; f < a.length; f++) {
                                            var g = a[f].id;
                                            -1 === c.inArray(g, e) && e.push(g);
                                        }
                                        b.$element.val(e), b.$element.trigger("change");
                                    });
                                else {
                                    var d = a.id;
                                    this.$element.val(d), this.$element.trigger("change");
                                }
                            }),
                            (d.prototype.unselect = function (a) {
                                var b = this;
                                return this.$element.prop("multiple")
                                    ? ((a.selected = !1),
                                      c(a.element).is("option")
                                          ? ((a.element.selected = !1), void this.$element.trigger("change"))
                                          : void this.current(function (d) {
                                                for (var e = [], f = 0; f < d.length; f++) {
                                                    var g = d[f].id;
                                                    g !== a.id && -1 === c.inArray(g, e) && e.push(g);
                                                }
                                                b.$element.val(e), b.$element.trigger("change");
                                            }))
                                    : void 0;
                            }),
                            (d.prototype.bind = function (a, b) {
                                var c = this;
                                (this.container = a),
                                    a.on("select", function (a) {
                                        c.select(a.data);
                                    }),
                                    a.on("unselect", function (a) {
                                        c.unselect(a.data);
                                    });
                            }),
                            (d.prototype.destroy = function () {
                                this.$element.find("*").each(function () {
                                    c.removeData(this, "data");
                                });
                            }),
                            (d.prototype.query = function (a, b) {
                                var d = [],
                                    e = this,
                                    f = this.$element.children();
                                f.each(function () {
                                    var b = c(this);
                                    if (b.is("option") || b.is("optgroup")) {
                                        var f = e.item(b),
                                            g = e.matches(a, f);
                                        null !== g && d.push(g);
                                    }
                                }),
                                    b({ results: d });
                            }),
                            (d.prototype.addOptions = function (a) {
                                b.appendMany(this.$element, a);
                            }),
                            (d.prototype.option = function (a) {
                                var b;
                                a.children ? ((b = document.createElement("optgroup")), (b.label = a.text)) : ((b = document.createElement("option")), void 0 !== b.textContent ? (b.textContent = a.text) : (b.innerText = a.text)),
                                    a.id && (b.value = a.id),
                                    a.disabled && (b.disabled = !0),
                                    a.selected && (b.selected = !0),
                                    a.title && (b.title = a.title);
                                var d = c(b),
                                    e = this._normalizeItem(a);
                                return (e.element = b), c.data(b, "data", e), d;
                            }),
                            (d.prototype.item = function (a) {
                                var b = {};
                                if (((b = c.data(a[0], "data")), null != b)) return b;
                                if (a.is("option")) b = { id: a.val(), text: a.text(), disabled: a.prop("disabled"), selected: a.prop("selected"), title: a.prop("title") };
                                else if (a.is("optgroup")) {
                                    b = { text: a.prop("label"), children: [], title: a.prop("title") };
                                    for (var d = a.children("option"), e = [], f = 0; f < d.length; f++) {
                                        var g = c(d[f]),
                                            h = this.item(g);
                                        e.push(h);
                                    }
                                    b.children = e;
                                }
                                return (b = this._normalizeItem(b)), (b.element = a[0]), c.data(a[0], "data", b), b;
                            }),
                            (d.prototype._normalizeItem = function (a) {
                                c.isPlainObject(a) || (a = { id: a, text: a }), (a = c.extend({}, { text: "" }, a));
                                var b = { selected: !1, disabled: !1 };
                                return (
                                    null != a.id && (a.id = a.id.toString()),
                                    null != a.text && (a.text = a.text.toString()),
                                    null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)),
                                    c.extend({}, b, a)
                                );
                            }),
                            (d.prototype.matches = function (a, b) {
                                var c = this.options.get("matcher");
                                return c(a, b);
                            }),
                            d
                        );
                    }),
                    b.define("select2/data/array", ["./select", "../utils", "jquery"], function (a, b, c) {
                        function d(a, b) {
                            var c = b.get("data") || [];
                            d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c));
                        }
                        return (
                            b.Extend(d, a),
                            (d.prototype.select = function (a) {
                                var b = this.$element.find("option").filter(function (b, c) {
                                    return c.value == a.id.toString();
                                });
                                0 === b.length && ((b = this.option(a)), this.addOptions(b)), d.__super__.select.call(this, a);
                            }),
                            (d.prototype.convertToOptions = function (a) {
                                function d(a) {
                                    return function () {
                                        return c(this).val() == a.id;
                                    };
                                }
                                for (
                                    var e = this,
                                        f = this.$element.find("option"),
                                        g = f
                                            .map(function () {
                                                return e.item(c(this)).id;
                                            })
                                            .get(),
                                        h = [],
                                        i = 0;
                                    i < a.length;
                                    i++
                                ) {
                                    var j = this._normalizeItem(a[i]);
                                    if (c.inArray(j.id, g) >= 0) {
                                        var k = f.filter(d(j)),
                                            l = this.item(k),
                                            m = c.extend(!0, {}, j, l),
                                            n = this.option(m);
                                        k.replaceWith(n);
                                    } else {
                                        var o = this.option(j);
                                        if (j.children) {
                                            var p = this.convertToOptions(j.children);
                                            b.appendMany(o, p);
                                        }
                                        h.push(o);
                                    }
                                }
                                return h;
                            }),
                            d
                        );
                    }),
                    b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function (a, b, c) {
                        function d(a, b) {
                            (this.ajaxOptions = this._applyDefaults(b.get("ajax"))), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), d.__super__.constructor.call(this, a, b);
                        }
                        return (
                            b.Extend(d, a),
                            (d.prototype._applyDefaults = function (a) {
                                var b = {
                                    data: function (a) {
                                        return c.extend({}, a, { q: a.term });
                                    },
                                    transport: function (a, b, d) {
                                        var e = c.ajax(a);
                                        return e.then(b), e.fail(d), e;
                                    },
                                };
                                return c.extend({}, b, a, !0);
                            }),
                            (d.prototype.processResults = function (a) {
                                return a;
                            }),
                            (d.prototype.query = function (a, b) {
                                function d() {
                                    var d = f.transport(
                                        f,
                                        function (d) {
                                            var f = e.processResults(d, a);
                                            e.options.get("debug") &&
                                                window.console &&
                                                console.error &&
                                                ((f && f.results && c.isArray(f.results)) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")),
                                                b(f);
                                        },
                                        function () {
                                            (d.status && "0" === d.status) || e.trigger("results:message", { message: "errorLoading" });
                                        }
                                    );
                                    e._request = d;
                                }
                                var e = this;
                                null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), (this._request = null));
                                var f = c.extend({ type: "GET" }, this.ajaxOptions);
                                "function" == typeof f.url && (f.url = f.url.call(this.$element, a)),
                                    "function" == typeof f.data && (f.data = f.data.call(this.$element, a)),
                                    this.ajaxOptions.delay && null != a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), (this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay))) : d();
                            }),
                            d
                        );
                    }),
                    b.define("select2/data/tags", ["jquery"], function (a) {
                        function b(b, c, d) {
                            var e = d.get("tags"),
                                f = d.get("createTag");
                            void 0 !== f && (this.createTag = f);
                            var g = d.get("insertTag");
                            if ((void 0 !== g && (this.insertTag = g), b.call(this, c, d), a.isArray(e)))
                                for (var h = 0; h < e.length; h++) {
                                    var i = e[h],
                                        j = this._normalizeItem(i),
                                        k = this.option(j);
                                    this.$element.append(k);
                                }
                        }
                        return (
                            (b.prototype.query = function (a, b, c) {
                                function d(a, f) {
                                    for (var g = a.results, h = 0; h < g.length; h++) {
                                        var i = g[h],
                                            j = null != i.children && !d({ results: i.children }, !0),
                                            k = i.text === b.term;
                                        if (k || j) return f ? !1 : ((a.data = g), void c(a));
                                    }
                                    if (f) return !0;
                                    var l = e.createTag(b);
                                    if (null != l) {
                                        var m = e.option(l);
                                        m.attr("data-select2-tag", !0), e.addOptions([m]), e.insertTag(g, l);
                                    }
                                    (a.results = g), c(a);
                                }
                                var e = this;
                                return this._removeOldTags(), null == b.term || null != b.page ? void a.call(this, b, c) : void a.call(this, b, d);
                            }),
                            (b.prototype.createTag = function (b, c) {
                                var d = a.trim(c.term);
                                return "" === d ? null : { id: d, text: d };
                            }),
                            (b.prototype.insertTag = function (a, b, c) {
                                b.unshift(c);
                            }),
                            (b.prototype._removeOldTags = function (b) {
                                var c = (this._lastTag, this.$element.find("option[data-select2-tag]"));
                                c.each(function () {
                                    this.selected || a(this).remove();
                                });
                            }),
                            b
                        );
                    }),
                    b.define("select2/data/tokenizer", ["jquery"], function (a) {
                        function b(a, b, c) {
                            var d = c.get("tokenizer");
                            void 0 !== d && (this.tokenizer = d), a.call(this, b, c);
                        }
                        return (
                            (b.prototype.bind = function (a, b, c) {
                                a.call(this, b, c), (this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field"));
                            }),
                            (b.prototype.query = function (b, c, d) {
                                function e(b) {
                                    var c = g._normalizeItem(b),
                                        d = g.$element.find("option").filter(function () {
                                            return a(this).val() === c.id;
                                        });
                                    if (!d.length) {
                                        var e = g.option(c);
                                        e.attr("data-select2-tag", !0), g._removeOldTags(), g.addOptions([e]);
                                    }
                                    f(c);
                                }
                                function f(a) {
                                    g.trigger("select", { data: a });
                                }
                                var g = this;
                                c.term = c.term || "";
                                var h = this.tokenizer(c, this.options, e);
                                h.term !== c.term && (this.$search.length && (this.$search.val(h.term), this.$search.focus()), (c.term = h.term)), b.call(this, c, d);
                            }),
                            (b.prototype.tokenizer = function (b, c, d, e) {
                                for (
                                    var f = d.get("tokenSeparators") || [],
                                        g = c.term,
                                        h = 0,
                                        i =
                                            this.createTag ||
                                            function (a) {
                                                return { id: a.term, text: a.term };
                                            };
                                    h < g.length;

                                ) {
                                    var j = g[h];
                                    if (-1 !== a.inArray(j, f)) {
                                        var k = g.substr(0, h),
                                            l = a.extend({}, c, { term: k }),
                                            m = i(l);
                                        null != m ? (e(m), (g = g.substr(h + 1) || ""), (h = 0)) : h++;
                                    } else h++;
                                }
                                return { term: g };
                            }),
                            b
                        );
                    }),
                    b.define("select2/data/minimumInputLength", [], function () {
                        function a(a, b, c) {
                            (this.minimumInputLength = c.get("minimumInputLength")), a.call(this, b, c);
                        }
                        return (
                            (a.prototype.query = function (a, b, c) {
                                return (
                                    (b.term = b.term || ""),
                                    b.term.length < this.minimumInputLength ? void this.trigger("results:message", { message: "inputTooShort", args: { minimum: this.minimumInputLength, input: b.term, params: b } }) : void a.call(this, b, c)
                                );
                            }),
                            a
                        );
                    }),
                    b.define("select2/data/maximumInputLength", [], function () {
                        function a(a, b, c) {
                            (this.maximumInputLength = c.get("maximumInputLength")), a.call(this, b, c);
                        }
                        return (
                            (a.prototype.query = function (a, b, c) {
                                return (
                                    (b.term = b.term || ""),
                                    this.maximumInputLength > 0 && b.term.length > this.maximumInputLength
                                        ? void this.trigger("results:message", { message: "inputTooLong", args: { maximum: this.maximumInputLength, input: b.term, params: b } })
                                        : void a.call(this, b, c)
                                );
                            }),
                            a
                        );
                    }),
                    b.define("select2/data/maximumSelectionLength", [], function () {
                        function a(a, b, c) {
                            (this.maximumSelectionLength = c.get("maximumSelectionLength")), a.call(this, b, c);
                        }
                        return (
                            (a.prototype.query = function (a, b, c) {
                                var d = this;
                                this.current(function (e) {
                                    var f = null != e ? e.length : 0;
                                    return d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength
                                        ? void d.trigger("results:message", { message: "maximumSelected", args: { maximum: d.maximumSelectionLength } })
                                        : void a.call(d, b, c);
                                });
                            }),
                            a
                        );
                    }),
                    b.define("select2/dropdown", ["jquery", "./utils"], function (a, b) {
                        function c(a, b) {
                            (this.$element = a), (this.options = b), c.__super__.constructor.call(this);
                        }
                        return (
                            b.Extend(c, b.Observable),
                            (c.prototype.render = function () {
                                var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                                return b.attr("dir", this.options.get("dir")), (this.$dropdown = b), b;
                            }),
                            (c.prototype.bind = function () {}),
                            (c.prototype.position = function (a, b) {}),
                            (c.prototype.destroy = function () {
                                this.$dropdown.remove();
                            }),
                            c
                        );
                    }),
                    b.define("select2/dropdown/search", ["jquery", "../utils"], function (a, b) {
                        function c() {}
                        return (
                            (c.prototype.render = function (b) {
                                var c = b.call(this),
                                    d = a(
                                        '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>'
                                    );
                                return (this.$searchContainer = d), (this.$search = d.find("input")), c.prepend(d), c;
                            }),
                            (c.prototype.bind = function (b, c, d) {
                                var e = this;
                                b.call(this, c, d),
                                    this.$search.on("keydown", function (a) {
                                        e.trigger("keypress", a), (e._keyUpPrevented = a.isDefaultPrevented());
                                    }),
                                    this.$search.on("input", function (b) {
                                        a(this).off("keyup");
                                    }),
                                    this.$search.on("keyup input", function (a) {
                                        e.handleSearch(a);
                                    }),
                                    c.on("open", function () {
                                        e.$search.attr("tabindex", 0),
                                            e.$search.focus(),
                                            window.setTimeout(function () {
                                                e.$search.focus();
                                            }, 0);
                                    }),
                                    c.on("close", function () {
                                        e.$search.attr("tabindex", -1), e.$search.val("");
                                    }),
                                    c.on("focus", function () {
                                        c.isOpen() && e.$search.focus();
                                    }),
                                    c.on("results:all", function (a) {
                                        if (null == a.query.term || "" === a.query.term) {
                                            var b = e.showSearch(a);
                                            b ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide");
                                        }
                                    });
                            }),
                            (c.prototype.handleSearch = function (a) {
                                if (!this._keyUpPrevented) {
                                    var b = this.$search.val();
                                    this.trigger("query", { term: b });
                                }
                                this._keyUpPrevented = !1;
                            }),
                            (c.prototype.showSearch = function (a, b) {
                                return !0;
                            }),
                            c
                        );
                    }),
                    b.define("select2/dropdown/hidePlaceholder", [], function () {
                        function a(a, b, c, d) {
                            (this.placeholder = this.normalizePlaceholder(c.get("placeholder"))), a.call(this, b, c, d);
                        }
                        return (
                            (a.prototype.append = function (a, b) {
                                (b.results = this.removePlaceholder(b.results)), a.call(this, b);
                            }),
                            (a.prototype.normalizePlaceholder = function (a, b) {
                                return "string" == typeof b && (b = { id: "", text: b }), b;
                            }),
                            (a.prototype.removePlaceholder = function (a, b) {
                                for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
                                    var e = b[d];
                                    this.placeholder.id === e.id && c.splice(d, 1);
                                }
                                return c;
                            }),
                            a
                        );
                    }),
                    b.define("select2/dropdown/infiniteScroll", ["jquery"], function (a) {
                        function b(a, b, c, d) {
                            (this.lastParams = {}), a.call(this, b, c, d), (this.$loadingMore = this.createLoadingMore()), (this.loading = !1);
                        }
                        return (
                            (b.prototype.append = function (a, b) {
                                this.$loadingMore.remove(), (this.loading = !1), a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore);
                            }),
                            (b.prototype.bind = function (b, c, d) {
                                var e = this;
                                b.call(this, c, d),
                                    c.on("query", function (a) {
                                        (e.lastParams = a), (e.loading = !0);
                                    }),
                                    c.on("query:append", function (a) {
                                        (e.lastParams = a), (e.loading = !0);
                                    }),
                                    this.$results.on("scroll", function () {
                                        var b = a.contains(document.documentElement, e.$loadingMore[0]);
                                        if (!e.loading && b) {
                                            var c = e.$results.offset().top + e.$results.outerHeight(!1),
                                                d = e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1);
                                            c + 50 >= d && e.loadMore();
                                        }
                                    });
                            }),
                            (b.prototype.loadMore = function () {
                                this.loading = !0;
                                var b = a.extend({}, { page: 1 }, this.lastParams);
                                b.page++, this.trigger("query:append", b);
                            }),
                            (b.prototype.showLoadingMore = function (a, b) {
                                return b.pagination && b.pagination.more;
                            }),
                            (b.prototype.createLoadingMore = function () {
                                var b = a('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),
                                    c = this.options.get("translations").get("loadingMore");
                                return b.html(c(this.lastParams)), b;
                            }),
                            b
                        );
                    }),
                    b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function (a, b) {
                        function c(b, c, d) {
                            (this.$dropdownParent = d.get("dropdownParent") || a(document.body)), b.call(this, c, d);
                        }
                        return (
                            (c.prototype.bind = function (a, b, c) {
                                var d = this,
                                    e = !1;
                                a.call(this, b, c),
                                    b.on("open", function () {
                                        d._showDropdown(),
                                            d._attachPositioningHandler(b),
                                            e ||
                                                ((e = !0),
                                                b.on("results:all", function () {
                                                    d._positionDropdown(), d._resizeDropdown();
                                                }),
                                                b.on("results:append", function () {
                                                    d._positionDropdown(), d._resizeDropdown();
                                                }));
                                    }),
                                    b.on("close", function () {
                                        d._hideDropdown(), d._detachPositioningHandler(b);
                                    }),
                                    this.$dropdownContainer.on("mousedown", function (a) {
                                        a.stopPropagation();
                                    });
                            }),
                            (c.prototype.destroy = function (a) {
                                a.call(this), this.$dropdownContainer.remove();
                            }),
                            (c.prototype.position = function (a, b, c) {
                                b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({ position: "absolute", top: -999999 }), (this.$container = c);
                            }),
                            (c.prototype.render = function (b) {
                                var c = a("<span></span>"),
                                    d = b.call(this);
                                return c.append(d), (this.$dropdownContainer = c), c;
                            }),
                            (c.prototype._hideDropdown = function (a) {
                                this.$dropdownContainer.detach();
                            }),
                            (c.prototype._attachPositioningHandler = function (c, d) {
                                var e = this,
                                    f = "scroll.select2." + d.id,
                                    g = "resize.select2." + d.id,
                                    h = "orientationchange.select2." + d.id,
                                    i = this.$container.parents().filter(b.hasScroll);
                                i.each(function () {
                                    a(this).data("select2-scroll-position", { x: a(this).scrollLeft(), y: a(this).scrollTop() });
                                }),
                                    i.on(f, function (b) {
                                        var c = a(this).data("select2-scroll-position");
                                        a(this).scrollTop(c.y);
                                    }),
                                    a(window).on(f + " " + g + " " + h, function (a) {
                                        e._positionDropdown(), e._resizeDropdown();
                                    });
                            }),
                            (c.prototype._detachPositioningHandler = function (c, d) {
                                var e = "scroll.select2." + d.id,
                                    f = "resize.select2." + d.id,
                                    g = "orientationchange.select2." + d.id,
                                    h = this.$container.parents().filter(b.hasScroll);
                                h.off(e), a(window).off(e + " " + f + " " + g);
                            }),
                            (c.prototype._positionDropdown = function () {
                                var b = a(window),
                                    c = this.$dropdown.hasClass("select2-dropdown--above"),
                                    d = this.$dropdown.hasClass("select2-dropdown--below"),
                                    e = null,
                                    f = this.$container.offset();
                                f.bottom = f.top + this.$container.outerHeight(!1);
                                var g = { height: this.$container.outerHeight(!1) };
                                (g.top = f.top), (g.bottom = f.top + g.height);
                                var h = { height: this.$dropdown.outerHeight(!1) },
                                    i = { top: b.scrollTop(), bottom: b.scrollTop() + b.height() },
                                    j = i.top < f.top - h.height,
                                    k = i.bottom > f.bottom + h.height,
                                    l = { left: f.left, top: g.bottom },
                                    m = this.$dropdownParent;
                                "static" === m.css("position") && (m = m.offsetParent());
                                var n = m.offset();
                                (l.top -= n.top),
                                    (l.left -= n.left),
                                    c || d || (e = "below"),
                                    k || !j || c ? !j && k && c && (e = "below") : (e = "above"),
                                    ("above" == e || (c && "below" !== e)) && (l.top = g.top - n.top - h.height),
                                    null != e &&
                                        (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e),
                                        this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)),
                                    this.$dropdownContainer.css(l);
                            }),
                            (c.prototype._resizeDropdown = function () {
                                var a = { width: this.$container.outerWidth(!1) + "px" };
                                this.options.get("dropdownAutoWidth") && ((a.minWidth = a.width), (a.position = "relative"), (a.width = "auto")), this.$dropdown.css(a);
                            }),
                            (c.prototype._showDropdown = function (a) {
                                this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown();
                            }),
                            c
                        );
                    }),
                    b.define("select2/dropdown/minimumResultsForSearch", [], function () {
                        function a(b) {
                            for (var c = 0, d = 0; d < b.length; d++) {
                                var e = b[d];
                                e.children ? (c += a(e.children)) : c++;
                            }
                            return c;
                        }
                        function b(a, b, c, d) {
                            (this.minimumResultsForSearch = c.get("minimumResultsForSearch")), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d);
                        }
                        return (
                            (b.prototype.showSearch = function (b, c) {
                                return a(c.data.results) < this.minimumResultsForSearch ? !1 : b.call(this, c);
                            }),
                            b
                        );
                    }),
                    b.define("select2/dropdown/selectOnClose", [], function () {
                        function a() {}
                        return (
                            (a.prototype.bind = function (a, b, c) {
                                var d = this;
                                a.call(this, b, c),
                                    b.on("close", function (a) {
                                        d._handleSelectOnClose(a);
                                    });
                            }),
                            (a.prototype._handleSelectOnClose = function (a, b) {
                                if (b && null != b.originalSelect2Event) {
                                    var c = b.originalSelect2Event;
                                    if ("select" === c._type || "unselect" === c._type) return;
                                }
                                var d = this.getHighlightedResults();
                                if (!(d.length < 1)) {
                                    var e = d.data("data");
                                    (null != e.element && e.element.selected) || (null == e.element && e.selected) || this.trigger("select", { data: e });
                                }
                            }),
                            a
                        );
                    }),
                    b.define("select2/dropdown/closeOnSelect", [], function () {
                        function a() {}
                        return (
                            (a.prototype.bind = function (a, b, c) {
                                var d = this;
                                a.call(this, b, c),
                                    b.on("select", function (a) {
                                        d._selectTriggered(a);
                                    }),
                                    b.on("unselect", function (a) {
                                        d._selectTriggered(a);
                                    });
                            }),
                            (a.prototype._selectTriggered = function (a, b) {
                                var c = b.originalEvent;
                                (c && c.ctrlKey) || this.trigger("close", { originalEvent: c, originalSelect2Event: b });
                            }),
                            a
                        );
                    }),
                    b.define("select2/i18n/en", [], function () {
                        return {
                            errorLoading: function () {
                                return "The results could not be loaded.";
                            },
                            inputTooLong: function (a) {
                                var b = a.input.length - a.maximum,
                                    c = "Please delete " + b + " character";
                                return 1 != b && (c += "s"), c;
                            },
                            inputTooShort: function (a) {
                                var b = a.minimum - a.input.length,
                                    c = "Please enter " + b + " or more characters";
                                return c;
                            },
                            loadingMore: function () {
                                return "Loading more results…";
                            },
                            maximumSelected: function (a) {
                                var b = "You can only select " + a.maximum + " item";
                                return 1 != a.maximum && (b += "s"), b;
                            },
                            noResults: function () {
                                return "No results found";
                            },
                            searching: function () {
                                return "Searching…";
                            },
                        };
                    }),
                    b.define(
                        "select2/defaults",
                        [
                            "jquery",
                            "require",
                            "./results",
                            "./selection/single",
                            "./selection/multiple",
                            "./selection/placeholder",
                            "./selection/allowClear",
                            "./selection/search",
                            "./selection/eventRelay",
                            "./utils",
                            "./translation",
                            "./diacritics",
                            "./data/select",
                            "./data/array",
                            "./data/ajax",
                            "./data/tags",
                            "./data/tokenizer",
                            "./data/minimumInputLength",
                            "./data/maximumInputLength",
                            "./data/maximumSelectionLength",
                            "./dropdown",
                            "./dropdown/search",
                            "./dropdown/hidePlaceholder",
                            "./dropdown/infiniteScroll",
                            "./dropdown/attachBody",
                            "./dropdown/minimumResultsForSearch",
                            "./dropdown/selectOnClose",
                            "./dropdown/closeOnSelect",
                            "./i18n/en",
                        ],
                        function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) {
                            function D() {
                                this.reset();
                            }
                            (D.prototype.apply = function (l) {
                                if (((l = a.extend(!0, {}, this.defaults, l)), null == l.dataAdapter)) {
                                    if (
                                        (null != l.ajax ? (l.dataAdapter = o) : null != l.data ? (l.dataAdapter = n) : (l.dataAdapter = m),
                                        l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)),
                                        l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)),
                                        l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)),
                                        l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)),
                                        (null != l.tokenSeparators || null != l.tokenizer) && (l.dataAdapter = j.Decorate(l.dataAdapter, q)),
                                        null != l.query)
                                    ) {
                                        var C = b(l.amdBase + "compat/query");
                                        l.dataAdapter = j.Decorate(l.dataAdapter, C);
                                    }
                                    if (null != l.initSelection) {
                                        var D = b(l.amdBase + "compat/initSelection");
                                        l.dataAdapter = j.Decorate(l.dataAdapter, D);
                                    }
                                }
                                if (
                                    (null == l.resultsAdapter &&
                                        ((l.resultsAdapter = c),
                                        null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)),
                                        null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)),
                                        l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))),
                                    null == l.dropdownAdapter)
                                ) {
                                    if (l.multiple) l.dropdownAdapter = u;
                                    else {
                                        var E = j.Decorate(u, v);
                                        l.dropdownAdapter = E;
                                    }
                                    if (
                                        (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)),
                                        l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)),
                                        null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass)
                                    ) {
                                        var F = b(l.amdBase + "compat/dropdownCss");
                                        l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F);
                                    }
                                    l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y);
                                }
                                if (null == l.selectionAdapter) {
                                    if (
                                        (l.multiple ? (l.selectionAdapter = e) : (l.selectionAdapter = d),
                                        null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)),
                                        l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)),
                                        l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)),
                                        null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass)
                                    ) {
                                        var G = b(l.amdBase + "compat/containerCss");
                                        l.selectionAdapter = j.Decorate(l.selectionAdapter, G);
                                    }
                                    l.selectionAdapter = j.Decorate(l.selectionAdapter, i);
                                }
                                if ("string" == typeof l.language)
                                    if (l.language.indexOf("-") > 0) {
                                        var H = l.language.split("-"),
                                            I = H[0];
                                        l.language = [l.language, I];
                                    } else l.language = [l.language];
                                if (a.isArray(l.language)) {
                                    var J = new k();
                                    l.language.push("en");
                                    for (var K = l.language, L = 0; L < K.length; L++) {
                                        var M = K[L],
                                            N = {};
                                        try {
                                            N = k.loadPath(M);
                                        } catch (O) {
                                            try {
                                                (M = this.defaults.amdLanguageBase + M), (N = k.loadPath(M));
                                            } catch (P) {
                                                l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.');
                                                continue;
                                            }
                                        }
                                        J.extend(N);
                                    }
                                    l.translations = J;
                                } else {
                                    var Q = k.loadPath(this.defaults.amdLanguageBase + "en"),
                                        R = new k(l.language);
                                    R.extend(Q), (l.translations = R);
                                }
                                return l;
                            }),
                                (D.prototype.reset = function () {
                                    function b(a) {
                                        function b(a) {
                                            return l[a] || a;
                                        }
                                        return a.replace(/[^\u0000-\u007E]/g, b);
                                    }
                                    function c(d, e) {
                                        if ("" === a.trim(d.term)) return e;
                                        if (e.children && e.children.length > 0) {
                                            for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) {
                                                var h = e.children[g],
                                                    i = c(d, h);
                                                null == i && f.children.splice(g, 1);
                                            }
                                            return f.children.length > 0 ? f : c(d, f);
                                        }
                                        var j = b(e.text).toUpperCase(),
                                            k = b(d.term).toUpperCase();
                                        return j.indexOf(k) > -1 ? e : null;
                                    }
                                    this.defaults = {
                                        amdBase: "./",
                                        amdLanguageBase: "./i18n/",
                                        closeOnSelect: !0,
                                        debug: !1,
                                        dropdownAutoWidth: !1,
                                        escapeMarkup: j.escapeMarkup,
                                        language: C,
                                        matcher: c,
                                        minimumInputLength: 0,
                                        maximumInputLength: 0,
                                        maximumSelectionLength: 0,
                                        minimumResultsForSearch: 0,
                                        selectOnClose: !1,
                                        sorter: function (a) {
                                            return a;
                                        },
                                        templateResult: function (a) {
                                            return a.text;
                                        },
                                        templateSelection: function (a) {
                                            return a.text;
                                        },
                                        theme: "default",
                                        width: "resolve",
                                    };
                                }),
                                (D.prototype.set = function (b, c) {
                                    var d = a.camelCase(b),
                                        e = {};
                                    e[d] = c;
                                    var f = j._convertData(e);
                                    a.extend(this.defaults, f);
                                });
                            var E = new D();
                            return E;
                        }
                    ),
                    b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function (a, b, c, d) {
                        function e(b, e) {
                            if (((this.options = b), null != e && this.fromElement(e), (this.options = c.apply(this.options)), e && e.is("input"))) {
                                var f = a(this.get("amdBase") + "compat/inputData");
                                this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f);
                            }
                        }
                        return (
                            (e.prototype.fromElement = function (a) {
                                var c = ["select2"];
                                null == this.options.multiple && (this.options.multiple = a.prop("multiple")),
                                    null == this.options.disabled && (this.options.disabled = a.prop("disabled")),
                                    null == this.options.language && (a.prop("lang") ? (this.options.language = a.prop("lang").toLowerCase()) : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))),
                                    null == this.options.dir && (a.prop("dir") ? (this.options.dir = a.prop("dir")) : a.closest("[dir]").prop("dir") ? (this.options.dir = a.closest("[dir]").prop("dir")) : (this.options.dir = "ltr")),
                                    a.prop("disabled", this.options.disabled),
                                    a.prop("multiple", this.options.multiple),
                                    a.data("select2Tags") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'),
                                        a.data("data", a.data("select2Tags")),
                                        a.data("tags", !0)),
                                    a.data("ajaxUrl") &&
                                        (this.options.debug &&
                                            window.console &&
                                            console.warn &&
                                            console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."),
                                        a.attr("ajax--url", a.data("ajaxUrl")),
                                        a.data("ajax--url", a.data("ajaxUrl")));
                                var e = {};
                                e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, a.data()) : a.data();
                                var f = b.extend(!0, {}, e);
                                f = d._convertData(f);
                                for (var g in f) b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : (this.options[g] = f[g]));
                                return this;
                            }),
                            (e.prototype.get = function (a) {
                                return this.options[a];
                            }),
                            (e.prototype.set = function (a, b) {
                                this.options[a] = b;
                            }),
                            e
                        );
                    }),
                    b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function (a, b, c, d) {
                        var e = function (a, c) {
                            null != a.data("select2") && a.data("select2").destroy(), (this.$element = a), (this.id = this._generateId(a)), (c = c || {}), (this.options = new b(c, a)), e.__super__.constructor.call(this);
                            var d = a.attr("tabindex") || 0;
                            a.data("old-tabindex", d), a.attr("tabindex", "-1");
                            var f = this.options.get("dataAdapter");
                            this.dataAdapter = new f(a, this.options);
                            var g = this.render();
                            this._placeContainer(g);
                            var h = this.options.get("selectionAdapter");
                            (this.selection = new h(a, this.options)), (this.$selection = this.selection.render()), this.selection.position(this.$selection, g);
                            var i = this.options.get("dropdownAdapter");
                            (this.dropdown = new i(a, this.options)), (this.$dropdown = this.dropdown.render()), this.dropdown.position(this.$dropdown, g);
                            var j = this.options.get("resultsAdapter");
                            (this.results = new j(a, this.options, this.dataAdapter)), (this.$results = this.results.render()), this.results.position(this.$results, this.$dropdown);
                            var k = this;
                            this._bindAdapters(),
                                this._registerDomEvents(),
                                this._registerDataEvents(),
                                this._registerSelectionEvents(),
                                this._registerDropdownEvents(),
                                this._registerResultsEvents(),
                                this._registerEvents(),
                                this.dataAdapter.current(function (a) {
                                    k.trigger("selection:update", { data: a });
                                }),
                                a.addClass("select2-hidden-accessible"),
                                a.attr("aria-hidden", "true"),
                                this._syncAttributes(),
                                a.data("select2", this);
                        };
                        return (
                            c.Extend(e, c.Observable),
                            (e.prototype._generateId = function (a) {
                                var b = "";
                                return (b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4)), (b = b.replace(/(:|\.|\[|\]|,)/g, "")), (b = "select2-" + b);
                            }),
                            (e.prototype._placeContainer = function (a) {
                                a.insertAfter(this.$element);
                                var b = this._resolveWidth(this.$element, this.options.get("width"));
                                null != b && a.css("width", b);
                            }),
                            (e.prototype._resolveWidth = function (a, b) {
                                var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                                if ("resolve" == b) {
                                    var d = this._resolveWidth(a, "style");
                                    return null != d ? d : this._resolveWidth(a, "element");
                                }
                                if ("element" == b) {
                                    var e = a.outerWidth(!1);
                                    return 0 >= e ? "auto" : e + "px";
                                }
                                if ("style" == b) {
                                    var f = a.attr("style");
                                    if ("string" != typeof f) return null;
                                    for (var g = f.split(";"), h = 0, i = g.length; i > h; h += 1) {
                                        var j = g[h].replace(/\s/g, ""),
                                            k = j.match(c);
                                        if (null !== k && k.length >= 1) return k[1];
                                    }
                                    return null;
                                }
                                return b;
                            }),
                            (e.prototype._bindAdapters = function () {
                                this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container);
                            }),
                            (e.prototype._registerDomEvents = function () {
                                var b = this;
                                this.$element.on("change.select2", function () {
                                    b.dataAdapter.current(function (a) {
                                        b.trigger("selection:update", { data: a });
                                    });
                                }),
                                    this.$element.on("focus.select2", function (a) {
                                        b.trigger("focus", a);
                                    }),
                                    (this._syncA = c.bind(this._syncAttributes, this)),
                                    (this._syncS = c.bind(this._syncSubtree, this)),
                                    this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._syncA);
                                var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                                null != d
                                    ? ((this._observer = new d(function (c) {
                                          a.each(c, b._syncA), a.each(c, b._syncS);
                                      })),
                                      this._observer.observe(this.$element[0], { attributes: !0, childList: !0, subtree: !1 }))
                                    : this.$element[0].addEventListener &&
                                      (this.$element[0].addEventListener("DOMAttrModified", b._syncA, !1),
                                      this.$element[0].addEventListener("DOMNodeInserted", b._syncS, !1),
                                      this.$element[0].addEventListener("DOMNodeRemoved", b._syncS, !1));
                            }),
                            (e.prototype._registerDataEvents = function () {
                                var a = this;
                                this.dataAdapter.on("*", function (b, c) {
                                    a.trigger(b, c);
                                });
                            }),
                            (e.prototype._registerSelectionEvents = function () {
                                var b = this,
                                    c = ["toggle", "focus"];
                                this.selection.on("toggle", function () {
                                    b.toggleDropdown();
                                }),
                                    this.selection.on("focus", function (a) {
                                        b.focus(a);
                                    }),
                                    this.selection.on("*", function (d, e) {
                                        -1 === a.inArray(d, c) && b.trigger(d, e);
                                    });
                            }),
                            (e.prototype._registerDropdownEvents = function () {
                                var a = this;
                                this.dropdown.on("*", function (b, c) {
                                    a.trigger(b, c);
                                });
                            }),
                            (e.prototype._registerResultsEvents = function () {
                                var a = this;
                                this.results.on("*", function (b, c) {
                                    a.trigger(b, c);
                                });
                            }),
                            (e.prototype._registerEvents = function () {
                                var a = this;
                                this.on("open", function () {
                                    a.$container.addClass("select2-container--open");
                                }),
                                    this.on("close", function () {
                                        a.$container.removeClass("select2-container--open");
                                    }),
                                    this.on("enable", function () {
                                        a.$container.removeClass("select2-container--disabled");
                                    }),
                                    this.on("disable", function () {
                                        a.$container.addClass("select2-container--disabled");
                                    }),
                                    this.on("blur", function () {
                                        a.$container.removeClass("select2-container--focus");
                                    }),
                                    this.on("query", function (b) {
                                        a.isOpen() || a.trigger("open", {}),
                                            this.dataAdapter.query(b, function (c) {
                                                a.trigger("results:all", { data: c, query: b });
                                            });
                                    }),
                                    this.on("query:append", function (b) {
                                        this.dataAdapter.query(b, function (c) {
                                            a.trigger("results:append", { data: c, query: b });
                                        });
                                    }),
                                    this.on("keypress", function (b) {
                                        var c = b.which;
                                        a.isOpen()
                                            ? c === d.ESC || c === d.TAB || (c === d.UP && b.altKey)
                                                ? (a.close(), b.preventDefault())
                                                : c === d.ENTER
                                                ? (a.trigger("results:select", {}), b.preventDefault())
                                                : c === d.SPACE && b.ctrlKey
                                                ? (a.trigger("results:toggle", {}), b.preventDefault())
                                                : c === d.UP
                                                ? (a.trigger("results:previous", {}), b.preventDefault())
                                                : c === d.DOWN && (a.trigger("results:next", {}), b.preventDefault())
                                            : (c === d.ENTER || c === d.SPACE || (c === d.DOWN && b.altKey)) && (a.open(), b.preventDefault());
                                    });
                            }),
                            (e.prototype._syncAttributes = function () {
                                this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable", {})) : this.trigger("enable", {});
                            }),
                            (e.prototype._syncSubtree = function (a, b) {
                                var c = !1,
                                    d = this;
                                if (!a || !a.target || "OPTION" === a.target.nodeName || "OPTGROUP" === a.target.nodeName) {
                                    if (b)
                                        if (b.addedNodes && b.addedNodes.length > 0)
                                            for (var e = 0; e < b.addedNodes.length; e++) {
                                                var f = b.addedNodes[e];
                                                f.selected && (c = !0);
                                            }
                                        else b.removedNodes && b.removedNodes.length > 0 && (c = !0);
                                    else c = !0;
                                    c &&
                                        this.dataAdapter.current(function (a) {
                                            d.trigger("selection:update", { data: a });
                                        });
                                }
                            }),
                            (e.prototype.trigger = function (a, b) {
                                var c = e.__super__.trigger,
                                    d = { open: "opening", close: "closing", select: "selecting", unselect: "unselecting" };
                                if ((void 0 === b && (b = {}), a in d)) {
                                    var f = d[a],
                                        g = { prevented: !1, name: a, args: b };
                                    if ((c.call(this, f, g), g.prevented)) return void (b.prevented = !0);
                                }
                                c.call(this, a, b);
                            }),
                            (e.prototype.toggleDropdown = function () {
                                this.options.get("disabled") || (this.isOpen() ? this.close() : this.open());
                            }),
                            (e.prototype.open = function () {
                                this.isOpen() || this.trigger("query", {});
                            }),
                            (e.prototype.close = function () {
                                this.isOpen() && this.trigger("close", {});
                            }),
                            (e.prototype.isOpen = function () {
                                return this.$container.hasClass("select2-container--open");
                            }),
                            (e.prototype.hasFocus = function () {
                                return this.$container.hasClass("select2-container--focus");
                            }),
                            (e.prototype.focus = function (a) {
                                this.hasFocus() || (this.$container.addClass("select2-container--focus"), this.trigger("focus", {}));
                            }),
                            (e.prototype.enable = function (a) {
                                this.options.get("debug") &&
                                    window.console &&
                                    console.warn &&
                                    console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'),
                                    (null == a || 0 === a.length) && (a = [!0]);
                                var b = !a[0];
                                this.$element.prop("disabled", b);
                            }),
                            (e.prototype.data = function () {
                                this.options.get("debug") &&
                                    arguments.length > 0 &&
                                    window.console &&
                                    console.warn &&
                                    console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                                var a = [];
                                return (
                                    this.dataAdapter.current(function (b) {
                                        a = b;
                                    }),
                                    a
                                );
                            }),
                            (e.prototype.val = function (b) {
                                if (
                                    (this.options.get("debug") &&
                                        window.console &&
                                        console.warn &&
                                        console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'),
                                    null == b || 0 === b.length)
                                )
                                    return this.$element.val();
                                var c = b[0];
                                a.isArray(c) &&
                                    (c = a.map(c, function (a) {
                                        return a.toString();
                                    })),
                                    this.$element.val(c).trigger("change");
                            }),
                            (e.prototype.destroy = function () {
                                this.$container.remove(),
                                    this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._syncA),
                                    null != this._observer
                                        ? (this._observer.disconnect(), (this._observer = null))
                                        : this.$element[0].removeEventListener &&
                                          (this.$element[0].removeEventListener("DOMAttrModified", this._syncA, !1),
                                          this.$element[0].removeEventListener("DOMNodeInserted", this._syncS, !1),
                                          this.$element[0].removeEventListener("DOMNodeRemoved", this._syncS, !1)),
                                    (this._syncA = null),
                                    (this._syncS = null),
                                    this.$element.off(".select2"),
                                    this.$element.attr("tabindex", this.$element.data("old-tabindex")),
                                    this.$element.removeClass("select2-hidden-accessible"),
                                    this.$element.attr("aria-hidden", "false"),
                                    this.$element.removeData("select2"),
                                    this.dataAdapter.destroy(),
                                    this.selection.destroy(),
                                    this.dropdown.destroy(),
                                    this.results.destroy(),
                                    (this.dataAdapter = null),
                                    (this.selection = null),
                                    (this.dropdown = null),
                                    (this.results = null);
                            }),
                            (e.prototype.render = function () {
                                var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                                return b.attr("dir", this.options.get("dir")), (this.$container = b), this.$container.addClass("select2-container--" + this.options.get("theme")), b.data("element", this.$element), b;
                            }),
                            e
                        );
                    }),
                    b.define("jquery-mousewheel", ["jquery"], function (a) {
                        return a;
                    }),
                    b.define("jquery.select2", ["jquery", "jquery-mousewheel", "./select2/core", "./select2/defaults"], function (a, b, c, d) {
                        if (null == a.fn.select2) {
                            var e = ["open", "close", "destroy"];
                            a.fn.select2 = function (b) {
                                if (((b = b || {}), "object" == typeof b))
                                    return (
                                        this.each(function () {
                                            var d = a.extend(!0, {}, b);
                                            new c(a(this), d);
                                        }),
                                        this
                                    );
                                if ("string" == typeof b) {
                                    var d,
                                        f = Array.prototype.slice.call(arguments, 1);
                                    return (
                                        this.each(function () {
                                            var c = a(this).data("select2");
                                            null == c && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2."), (d = c[b].apply(c, f));
                                        }),
                                        a.inArray(b, e) > -1 ? this : d
                                    );
                                }
                                throw new Error("Invalid arguments for Select2: " + b);
                            };
                        }
                        return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c;
                    }),
                    { define: b.define, require: b.require }
                );
            })(),
            c = b.require("jquery.select2");
        return (a.fn.select2.amd = b), c;
    }),
    $(function () {
        function a(b) {
            var d = b.find(".form-header");
            b.hasClass("completed") ||
                (b.addClass("completed"),
                d.addClass("completed").attr("tabindex", "0"),
                d.on("touchstart, click", function () {
                    validate(b) && a(b);
                })),
                c(b);
        }
        function b(a) {
            var b = a.siblings("fieldset:not(.completed):first");
            b.removeClass("collapsed"), b.find(".form-header").removeClass("inactive"), b.find("input:first").focus();
        }
        function c(a) {
            a.toggleClass("collapsed"), a.hasClass("collapsed") && b(a);
        }
        var d = $("form.checkout-form");
        d &&
            ($("fieldset .continue").on("touchstart, click", function () {
                var b = $(this).closest("fieldset");
                validate(b) && a(b);
            }),
            $("fieldset.details, fieldset.billing, fieldset.shipping").keydown(function (b) {
                var c = $(this),
                    d = b.which ? b.which : b.keyCode;
                13 === d && c.find(":focus").length >= 1 && validate(c) && a(c);
            }),
            $("input[name=use-billing]").change(function () {
                $(this).is(":checked") &&
                    ($("input[name=shipping-firstname]").val($("input[name=billing-firstname]").val()),
                    $("input[name=shipping-lastname]").val($("input[name=billing-lastname]").val()),
                    $("input[name=shipping-company]").val($("input[name=billing-company]").val()),
                    $("input[name=shipping-address-1]").val($("input[name=billing-address-1]").val()),
                    $("input[name=shipping-address-2]").val($("input[name=billing-address-2]").val()),
                    $("input[name=shipping-state]").val($("input[name=billing-state]").val()),
                    $("input[name=shipping-postcode]").val($("input[name=billing-postcode]").val()),
                    $("select[name=shipping-country]").val($("select[name=billing-country]").val()),
                    $("select[name=shipping-country]").trigger("change"));
            }),
            d.on("submit", function (a) {
                a.preventDefault();
                var b = $(this),
                    c = 0,
                    d = !1,
                    e = b.find(".submit-error");
                if (!b.find(".payment").hasClass("collapsed")) {
                    if (
                        (e.remove(),
                        disableFormElements(b, !0),
                        b.find("fieldset").each(function () {
                            validate($(this)) || ((c += 1), (d = $(this).hasClass("payment") ? !0 : !1));
                        }),
                        0 === c)
                    )
                        return !0;
                    if (1 === c && d) return disableFormElements(b, !1), !1;
                    if (c > 1 || (1 === c && !d))
                        return disableFormElements(b, !1), (e = $("<div />", { class: "submit-error", role: "alert", "aria-live": "assertive", text: "Please check all sections for errors" })), b.find(".payment .form-fields").append(e), !1;
                }
            }));
    }),
    $(function () {
        function a(a) {
            var b = $(".secondary-nav .cart-count"),
                c = parseInt(b.html()),
                d = parseInt(a.find(".quantity").val());
            b.html(c + d);
        }
        $("form").on("submit", function (b) {
            b.preventDefault();
            var c = $(this);
            c.find(".quantity-input .quantity").length >= 1 && checkValidContent(c.find(".quantity-input .quantity")), c.hasClass("product") && a(c), c.hasClass("cart-listing") && (window.location = "/checkout.html");
        });
    }),
    $(function () {
        function a() {
            var a,
                b = [8, 9, 13, 16, 37, 38, 39, 40, 46],
                c = [65, 67, 86, 88];
            $("input[type=tel], input[type=number]").each(function () {
                var d = this;
                d.addEventListener("keydown", function (d) {
                    return (
                        (a = d.which ? d.which : d.keyCode),
                        (a >= 48 && 57 >= a) || (a >= 96 && 105 >= a) || -1 !== $.inArray(a, b) || ((d.ctrlKey === !0 || d.metaKey === !0) && -1 !== $.inArray(a, c))
                            ? ("card-number" === $(this).attr("name") && formatCardNumber($(this)), null)
                            : d.preventDefault()
                    );
                });
            });
        }
        var b = $("form");
        0 !== b.length &&
            b.each(function () {
                $(this)
                    .find("input[type=tel], input[type=number]")
                    .each(function () {
                        a();
                    });
            });
    });
var slowResponse;
$(function () {
    function a(a) {
        a
            ? ($("body").addClass("pushy-open-left"),
              $(".pushy-open-left").on("touchmove", function (a) {
                  return a.preventDefault(), a.stopPropagation(), !1;
              }),
              e.addClass("active").attr("aria-label", "Close menu").attr("aria-expanded", "true"),
              e.find(".top").attr("transform", "matrix(0.707107, 0.707107, -0.707107, 0.707107, 11.3137, -5.65685)"),
              e.find(".bottom").attr("transform", "matrix(0.707107, -0.707107, 0.707107, 0.707107, -9.89949, 5.65685)"),
              f.attr("aria-hidden", "false").removeAttr("tabindex"))
            : (e.find("rect").removeAttr("transform"),
              e.removeClass("active").attr("aria-label", "Open menu").attr("aria-expanded", "false"),
              f.attr("aria-hidden", "true"),
              $(".pushy-open-left").off("touchmove"),
              $("body").removeClass("pushy-open-left"));
    }
    function b() {
        var a = d.scrollTop();
        0 !== a ? (g.addClass("scrolled"), e.addClass("scrolled")) : (g.removeClass("scrolled"), e.removeClass("scrolled"));
    }
    function c() {
        if (d.width() / parseFloat($("body").css("font-size")) >= 52.875) {
            var b = document.activeElement;
            (b.classList.contains("menu-btn") || b.classList.contains("pushy") || b.classList.contains("pushy-open-left") || b.parentNode.classList.contains("pushy-link")) && g.find(".logo a").focus(),
                e.attr("aria-hidden", "true").removeClass("active").attr("aria-label", "Close menu").attr("aria-expanded", "false"),
                a(!1);
        }
    }
    var d = $(window),
        e = $("#nav-toggle"),
        f = $("#mobile-nav"),
        g = $(".nav-container");
    $(".menu-btn, .site-overlay, .pushy-link").on("click", function () {
        a(e.hasClass("active") ? !1 : !0);
    }),
        c(),
        b(),
        d.resize(function () {
            c();
        }),
        d.scroll(function () {
            b();
        });
}),
    $(function () {
        $("form .decrement").on("touchstart, keyup, click", function () {
            toggleQuantity($(this).next("input"), !1);
        }),
            $("form .increment").on("touchstart, keyup, click", function () {
                toggleQuantity($(this).prev("input"), !0);
            }),
            $("input.quantity").on("focusout", function () {
                checkValidContent($(this));
            });
    }),
    $(function () {
        var a = $("select");
        0 !== a.length &&
            a.each(function () {
                var a = $(this),
                    b = a.parent();
                if (b.hasClass("select-restyle")) {
                    var c = a.data("placeholder") ? a.data("placeholder") : "";
                    a.select2({ minimumResultsForSearch: 1 / 0, dropdownParent: b, placeholder: c, width: "100%" });
                }
            });
    });
