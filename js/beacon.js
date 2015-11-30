(function(c) {
	if (typeof window.qyerTrack == "object") {
		return
	}
	var b;
	var f;
	var a = function(e) {
			var j = "";
			var i = "";
			if (typeof b == "object") {
				if (e != undefined) {
					b.beacon.setUserId(e)
				}
				return b
			}
			var m = function(o) {
					this.setUserId(o);
					this.guid = k("_guid");
					var n = k("_session");
					if (!n) {
						n = (f.now) ? f.now() : (new Date).getTime()
					}
					h("_session", n, 30);
					this.session = k("_session");
					this.referr = location.href
				};
			m.prototype.setUserId = function(n) {
				this.user_id = n == undefined ? 0 : n
			};
			m.prototype.visit = function(n) {
				return this._send(f.extend({
					_type: "visit"
				}, n || {}))
			};
			m.prototype.link = function(n, p, o) {
				if (n == undefined) {
					return
				}
				var o = o || {};
				var q = o.dstLink || n.attr("href") || "javascript:void(0);";
				this._send(f.extend({
					_type: "link",
					_url: q
				}, o));
				if (n.attr("target") == "_blank" || (p && (p.ctrlKey || p.shiftKey || p.metaKey)) || q == "javascript:void(0);" || n.attr("data-bn-ipg") == "edittool-1") {
					return true
				} else {
					setTimeout(function() {
						location.href = q
					}, 200);
					p && p.stopPropagation();
					return false
				}
			};
			m.prototype.click = function(n) {
				return this._send(f.extend({
					_type: "click"
				}, n || {}))
			};
			m.prototype.form = function(n) {
				return this._send(f.extend({
					_type: "form"
				}, n || {}))
			};
			m.prototype.send = function(n) {
				this._send(n)
			};
			m.prototype._send = function(q) {
				if (q == undefined || q._type == undefined) {
					return false
				}
				if (document.referrer != "" && typeof(document.referrer) != "undefined") {
					var p = document.referrer
				} else {
					var p = f(".phpreferer").html()
				}
				var o = "";
				if (localStorage.position) {
					o = c.parseJSON(localStorage.position)
				}
				var r = {
					type: q._type,
					category: q._category || "",
					campaign: q._campaign || "",
					url: q._url || "",
					referer: location.href,
					referer_link: p,
					guid: this.guid,
					user_id: this.user_id,
					session: this.session,
					timestamp: (f.now) ? f.now() : (new Date).getTime(),
					lat: o.lat || "",
					lng: o.lng || "",
					gpstimestamp: o.timestamp || "",
					ra_arg: q._ra_arg || ""
				};
				delete(q._category);
				delete(q._campaign);
				delete(q._ra_arg);
				delete(q._type);
				delete(q._url);
				r.others = f.param(q);
				var n = new Image();
				n.src = j + f.param(r);
				return true
			};
			this.beacon = new m(e);
			b = this;

			function l() {
				var n = function() {
						return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
					};
				return (n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n())
			}
			function h(p, r, q) {
				if (q) {
					var o = new Date();
					o.setTime(o.getTime() + (q * 60 * 1000));
					var n = "; expires=" + o.toGMTString()
				} else {
					var n = ""
				}
				document.cookie = p + "=" + r + n + "; path=/; domain=" + i
			}
			function k(o) {
				var q = o + "=";
				var n = document.cookie.split(";");
				for (var p = 0; p < n.length; p++) {
					var r = n[p];
					while (r.charAt(0) == " ") {
						r = r.substring(1, r.length)
					}
					if (r.indexOf(q) == 0) {
						return r.substring(q.length, r.length)
					}
				}
				return null
			}
			function g(n) {
				h(n, "", -1)
			}
		};
	a.prototype.visit = function(e) {
		this.beacon.visit(e)
	};
	a.prototype.links = function(e) {
		var g = this;
		f(e).each(function(h, i) {
			i = f(i);
			i.click(function(j) {
				return g.beacon.link(i, j)
			})
		})
	};
	a.prototype.link = function(g, i, h) {
		return this.beacon.link(g, i, h)
	};
	a.prototype.click = function(e) {
		return this.beacon.click(e)
	};
	a.prototype.form = function(e, h) {
		var g = this;
		h = h || {};
		h._url = e.attr("action");
		g.beacon.form(h)
	};
	a.prototype.forms = function(h, g) {
		var e = this;
		f(h).each(function(i, j) {
			j = f(j);
			j.submit(function(k) {
				g = g || {};
				g._url = j.attr("action");
				e.beacon.form(g);
				return true
			})
		})
	};
	try {
		(function() {
			if (typeof c == "function" && (typeof jQuery == "function" || typeof Zepto == "function") && typeof c.parseJSON == "function") {
				f = c;
				_event_type = typeof Zepto == "function" ? "click" : "click";
				e();
				return
			}
			var i = document.createElement("script");
			i.type = "text/javascript";
			i.src = "http://static.qyer.com/models/basic/js/jquery-1.10.2.min.js";
			i.onload = function() {
				h()
			};
			i.onreadystatechange = function() {
				if (this.readyState == "complete" || this.readyState == "loaded") {
					h()
				}
			};
			var g = document.getElementsByTagName("script")[0];
			g.parentNode.insertBefore(i, g);

			function h() {
				if (typeof f == "function") {
					return
				}
				f = jQuery.noConflict();
				// e()
			}
			/*function e() {
				new a(_qyer_userid || QYER.uid).visit();
				var j = location.href;
				var k = function(l, m) {
						return new a().click({
							_campaign: "inpage",
							_category: l,
							_ra_arg: m
						})
					};
				window.qyerTrack = {
					doTrack: k
				};
				while (true) {
					f("a.beacon").on(_event_type, function(m) {
						var l;
						if (f(this).attr("data-beacon")) {
							l = f(this).attr("data-beacon").split("-")
						} else {
							l = f(this).attr("bid_beacon").split("-")
						}
						category_id = l.shift();
						campaign_id = l.shift();
						others = l.join("-");
						return new a().link(f(this), m, {
							_category: category_id,
							_campaign: campaign_id,
							ext: others
						})
					});
					f(document).on(_event_type, "*[data-bn-ipg],*[ra_arg],*[data-ra_arg]", function(l) {
						if (f(this).is("a") && f(this).attr("data-bn-ipg-nofollow") != "true") {
							if (f(this).attr("data-bn-ipg") == "edittool-1") {
								flag = new a().link(f(this), l, {
									_campaign: "inpage",
									_category: f(this).attr("data-bn-ipg"),
									_ra_arg: f(this).attr("ra_arg") || f(this).attr("ra-arg") || f(this).data("ra_arg")
								});
								return false
							} else {
								return new a().link(f(this), l, {
									_campaign: "inpage",
									_category: f(this).attr("data-bn-ipg"),
									_ra_arg: f(this).attr("ra_arg") || f(this).attr("ra-arg") || f(this).data("ra_arg")
								})
							}
						} else {
							return new a().click({
								_campaign: "inpage",
								_category: f(this).attr("data-bn-ipg"),
								_ra_arg: f(this).attr("ra_arg") || f(this).attr("ra-arg") || f(this).data("ra_arg")
							})
						}
					});
					f("form").has("input[data-bn-ipg], button[data-bn-ipg]").submit(function(l) {
						new a().form(f(this), {
							_campaign: "inpage",
							_category: f(this).find("input[data-bn-ipg]").attr("data-bn-ipg")
						});
						return true
					});
					f("#place_search_input").on("keydown", function(l) {
						if (l.keyCode == 13) {
							new a().click({
								_campaign: "inpage",
								_category: "59"
							})
						}
					});
					f("#jn_search_input").on("keydown", function(l) {
						if (l.keyCode == 13) {
							new a().click({
								_campaign: "inpage",
								_category: "5-0"
							})
						}
					});
					break
				}
			}*/
		})()
	} catch (d) {
		console.log(d)
	}
})(window.jQuery || window.Zepto);