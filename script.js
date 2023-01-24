!(function (t) {
  var r = {}
  function n(e) {
    if (r[e]) return r[e].exports
    var o = (r[e] = { i: e, l: !1, exports: {} })
    return t[e].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
  }
  ;(n.m = t),
    (n.c = r),
    (n.d = function (t, r, e) {
      n.o(t, r) ||
        Object.defineProperty(t, r, {
          configurable: !1,
          enumerable: !0,
          get: e,
        })
    }),
    (n.r = function (t) {
      Object.defineProperty(t, "__esModule", { value: !0 })
    }),
    (n.n = function (t) {
      var r =
        t && t.__esModule
          ? function () {
              return t.default
            }
          : function () {
              return t
            }
      return n.d(r, "a", r), r
    }),
    (n.o = function (t, r) {
      return Object.prototype.hasOwnProperty.call(t, r)
    }),
    (n.p = "/"),
    n((n.s = 1))
})([
  function (t, r, n) {
    "use strict"
    Object.defineProperty(r, "__esModule", { value: !0 })
    var e = (r.colorapp = new (function () {
      ;(this.currentColor = null),
        (this.init = function () {
          var t = this,
            r = location.hash.substring(6) || !1
          ;(this.currentColor = r ? t.HEXtoRGB(r) : this.randomColor()),
            this.setColorFields(!1),
            this.setSiteColor(),
            $("#hex, #rgb, #hsl, #cmyk").on("focus", function () {
              $(this).on("keyup", n)
            }),
            $("#hex, #rgb, #hsl, #cmyk").on("blur", function () {
              $(this).off("keyup", n)
            }),
            $(".copy").on("click", function (r) {
              var n = $(r.target).siblings("input").attr("id")
              t.copyField(n)
            })
          var n = function () {
            e.changeColor(this)
          }
          setTimeout(function () {
            $("#random-tip .text").addClass("bounceInDown animated show")
          }, 3e3),
            $("#random-tip .text").on(
              "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
              function () {
                $(this).removeClass("bounceInDown jello animated")
              }
            ),
            $(document).on("keyup", function (r) {
              18 == r.keyCode &&
                ($("#random-tip .text").addClass("jello animated"),
                (t.currentColor = t.randomColor()),
                t.setColorFields(!1),
                t.setSiteColor(!0))
            }),
            window.addEventListener("hashchange", function () {
              var r = location.hash.substring(6)
              r &&
                ((t.currentColor = t.HEXtoRGB(r)),
                t.setColorFields(!1),
                t.setSiteColor(!1))
            })
        }),
        (this.setSiteColor = function (t) {
          t = t || !1
          var r = this.currentColor,
            n = "#" + this.RGBtoHEX(r[0], r[1], r[2])
          if (this.RGBlightness(r[0], r[1], r[2]) < 180)
            var e = this.blendColors(n, "#FFFFFF", 0.75)
          else e = this.blendColors(n, "#000000", 0.5)
          $("body").css("backgroundColor", "rgb(" + r + ")"),
            $(".color-field, body, a").css("color", e),
            $(".field, .field .copy").attr("style", "--borderColor:" + e),
            $(".rw-monogram").css("fill", e),
            t &&
              (location.hash = "/hex/" + String(n).replace(/[^0-9a-f]/gi, ""))
        }),
        (this.changeColor = function (t) {
          var r = this,
            n = "",
            e = "",
            o = "",
            a = "",
            i = t.value.replace(/\s+/g, "")
          switch ($(t).attr("id")) {
            case "hex":
              ;(e = r.HEXtoRGB(i)), (n = "hex")
              break
            case "rgb":
              var s = r.matchers().rgb.exec(i)
              ;(e = [s[1], s[2], s[3]]), (n = "rgb")
              break
            case "cmyk":
              ;(o = r.matchers().cmyk.exec(i)),
                (e = r.CMYKtoRGB(o[1], o[2], o[3], o[4])),
                (n = "cmyk")
              break
            case "hsl":
              ;(a = r.matchers().hsl.exec(i)) &&
                ((e = r.HSLtoRGB(a[1], a[2], a[3])), (n = "hsl"))
              break
            default:
              ;(e = !1), (n = "")
          }
          0 != e &&
            ((r.currentColor = e), r.setColorFields(n), r.setSiteColor())
        }),
        (this.setColorFields = function (t) {
          var r = this.currentColor
          if (
            ("hex" != (t = t || !1) &&
              $("#hex").val("#" + this.RGBtoHEX(r[0], r[1], r[2])),
            "rgb" != t && $("#rgb").val("rgb(" + r.join(",") + ")"),
            "hsl" != t)
          ) {
            var n = this.RGBtoHSL(r[0], r[1], r[2])
            $("#hsl").val("hsl(" + n[0] + "," + n[1] + "%," + n[2] + "%)")
          }
          "cmyk" != t &&
            $("#cmyk").val("cmyk(" + this.RGBtoCMYK(r[0], r[1], r[2]) + ")")
        }),
        (this.copyField = function (t) {
          var r = document.getElementById(t)
          r.select(),
            r.setSelectionRange(0, 99999),
            document.execCommand("copy"),
            r.blur()
        }),
        (this.RGBtoHEX = function (t, r, n) {
          return (function (t) {
            return new Array(7 - t.length).join("0") + t
          })(((t << 16) | (r << 8) | n).toString(16).toUpperCase())
        }),
        (this.HEXtoRGB = function (t) {
          return (
            3 == (t = String(t).replace(/[^0-9a-f]/gi, "")).length &&
              (t = t.replaceAll(
                /([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/g,
                "$1$1$2$2$3$3"
              )),
            6 != t.length
              ? ""
              : [(t = parseInt(t, 16)) >> 16, (t >> 8) & 255, 255 & t]
          )
        }),
        (this.RGBtoBIN = function (t, r, n) {
          return (function (t) {
            return new Array(25 - t.length).join("0") + t
          })(((t << 16) | (r << 8) | n).toString(2))
        }),
        (this.BINtoRGB = function (t) {
          var r = parseInt(t, 2)
          return [r >> 16, (r >> 8) & 255, 255 & r]
        }),
        (this.RGBtoHSL = function (t, r, n) {
          var e, o, a, i, s, h
          if (
            ((t /= 255),
            (r /= 255),
            (n /= 255),
            (s = ((e = Math.max(t, r, n)) + (o = Math.min(t, r, n))) / 2),
            e == o)
          )
            a = i = 0
          else {
            switch (
              ((h = e - o), (i = s > 0.5 ? h / (2 - e - o) : h / (e + o)), e)
            ) {
              case t:
                a = (r - n) / h + (r < n ? 6 : 0)
                break
              case r:
                a = (n - t) / h + 2
                break
              case n:
                a = (t - r) / h + 4
            }
            a /= 6
          }
          return [
            (a = this.round(360 * a, 1)),
            (i = this.round(100 * i, 1)),
            (s = this.round(100 * s, 1)),
          ]
        }),
        (this.HSLtoRGB = function (t, r, n) {
          var e, o, a, i, s, h
          return (
            (t = Number(String(t).replace(/[^0-9\.]/gi, ""))),
            (r = Number(String(r).replace(/[^0-9\.]/gi, ""))),
            (n = Number(String(n).replace(/[^0-9\.]/gi, ""))),
            isFinite(t) || (t = 0),
            isFinite(r) || (r = 0),
            isFinite(n) || (n = 0),
            (t /= 60) < 0 && (t = 6 - (-t % 6)),
            (t %= 6),
            (r = Math.max(0, Math.min(1, r / 100))),
            (n = Math.max(0, Math.min(1, n / 100))),
            (h =
              (s = (1 - Math.abs(2 * n - 1)) * r) *
              (1 - Math.abs((t % 2) - 1))),
            t < 1
              ? ((e = s), (o = h), (a = 0))
              : t < 2
              ? ((e = h), (o = s), (a = 0))
              : t < 3
              ? ((e = 0), (o = s), (a = h))
              : t < 4
              ? ((e = 0), (o = h), (a = s))
              : t < 5
              ? ((e = h), (o = 0), (a = s))
              : ((e = s), (o = 0), (a = h)),
            (i = n - s / 2),
            [
              (e = Math.round(255 * (e + i))),
              (o = Math.round(255 * (o + i))),
              (a = Math.round(255 * (a + i))),
            ]
          )
        }),
        (this.RGBtoHSV = function (t, r, n) {
          ;(t /= 255), (r /= 255), (n /= 255)
          var e = Math.min(t, r, n),
            o = Math.max(t, r, n),
            a = o - e
          if (((v = o), 0 == a)) (h = 0), (s = 0)
          else {
            s = a / o
            var i = ((o - t) / 6 + a / 2) / a,
              u = ((o - r) / 6 + a / 2) / a,
              c = ((o - n) / 6 + a / 2) / a
            t == o
              ? (h = c - u)
              : r == o
              ? (h = 1 / 3 + i - c)
              : n == o && (h = 2 / 3 + u - i),
              h < 0 && (h += 1),
              h > 1 && (h -= 1)
          }
          return (
            (h = Math.round(360 * h)),
            (s = Math.round(100 * s)),
            (v = Math.round(100 * v)),
            [h, s, v]
          )
        }),
        (this.HSVtoRGB = function (t, r, n) {
          if (((t /= 360), (n /= 100), 0 == (r /= 100)))
            var e = 255 * n,
              o = 255 * n,
              a = 255 * n
          else {
            var i = 6 * t,
              s = Math.floor(i),
              h = n * (1 - r),
              u = n * (1 - r * (i - s)),
              c = n * (1 - r * (1 - (i - s)))
            0 == s
              ? ((var_r = n), (var_g = c), (var_b = h))
              : 1 == s
              ? ((var_r = u), (var_g = n), (var_b = h))
              : 2 == s
              ? ((var_r = h), (var_g = n), (var_b = c))
              : 3 == s
              ? ((var_r = h), (var_g = u), (var_b = n))
              : 4 == s
              ? ((var_r = c), (var_g = h), (var_b = n))
              : ((var_r = n), (var_g = h), (var_b = u)),
              (e = Math.round(255 * var_r)),
              (o = Math.round(255 * var_g)),
              (a = Math.round(255 * var_b))
          }
          return [e, o, a]
        }),
        (this.CMYKtoRGB = function (t, r, n, e) {
          ;(t /= 100), (r /= 100), (n /= 100), (e /= 100)
          var o = 1 - Math.min(1, t * (1 - e) + e),
            a = 1 - Math.min(1, r * (1 - e) + e),
            i = 1 - Math.min(1, n * (1 - e) + e)
          return [
            (o = Math.round(255 * o)),
            (a = Math.round(255 * a)),
            (i = Math.round(255 * i)),
          ]
        }),
        (this.RGBtoCMYK = function (t, r, n) {
          ;(t /= 255), (r /= 255), (n /= 255)
          var e = Math.min(1 - t, 1 - r, 1 - n),
            o = (1 - t - e) / (1 - e),
            a = (1 - r - e) / (1 - e),
            i = (1 - n - e) / (1 - e)
          return [
            (o = Math.round(100 * o)),
            (a = Math.round(100 * a)),
            (i = Math.round(100 * i)),
            (e = Math.round(100 * e)),
          ]
        }),
        (this.blendColors = function (t, r, n) {
          var e = parseInt(t.slice(1), 16),
            o = parseInt(r.slice(1), 16),
            a = e >> 16,
            i = (e >> 8) & 255,
            s = 255 & e,
            h = o >> 16,
            u = (o >> 8) & 255,
            c = 255 & o
          return (
            "#" +
            (
              16777216 +
              65536 * (Math.round((h - a) * n) + a) +
              256 * (Math.round((u - i) * n) + i) +
              (Math.round((c - s) * n) + s)
            )
              .toString(16)
              .slice(1)
          )
        }),
        (this.RGBlightness = function (t, r, n) {
          return 0.2126 * t + 0.7152 * r + 0.0722 * n
        }),
        (this.colorLuminance = function (t, r) {
          ;(t = String(t).replace(/[^0-9a-f]/gi, "")).length < 6 &&
            (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]),
            (r = r || 0)
          var n,
            e,
            o = "#"
          for (e = 0; e < 3; e++)
            (n = parseInt(t.substr(2 * e, 2), 16)),
              Math.min(Math.max(0, n + n * r), 255) < -100 * r && (r *= -1),
              (o += (
                "00" +
                (n = Math.round(Math.min(Math.max(0, n + n * r), 255)).toString(
                  16
                ))
              ).substr(n.length))
          return o
        }),
        (this.randomColor = function () {
          return [
            Math.round(255 * Math.random()),
            Math.round(255 * Math.random()),
            Math.round(255 * Math.random()),
          ]
        }),
        (this.matchers = function () {
          var t = "(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",
            r =
              "[\\s|\\(]+(" +
              t +
              ")[,|\\s]+(" +
              t +
              ")[,|\\s]+(" +
              t +
              ")\\s*\\)?",
            n =
              "[\\s|\\(]+(" +
              t +
              ")[,|\\s]+(" +
              t +
              ")[,|\\s]+(" +
              t +
              ")[,|\\s]+(" +
              t +
              ")\\s*\\)?"
          return {
            CSS_UNIT: new RegExp(t),
            rgb: new RegExp("rgb" + r),
            hsl: new RegExp("[hsl|hsla][" + r + "|" + n + "]"),
            hsv: new RegExp("hsv" + r),
            cmyk: new RegExp("cmyk" + n),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
          }
        }),
        (this.round = function (t, r) {
          return Number(Math.round(t + "e" + r) + "e-" + r)
        })
    })())
    e.init()
  },
  function (t, r, n) {
    t.exports = n(0)
  },
])