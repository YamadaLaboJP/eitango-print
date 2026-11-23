var GENRE_JA = {
	Fruits: "くだもの",
	Vegetables: "やさい",
	Animals: "どうぶつ",
	Food: "たべもの",
	Colors: "いろ",
	Emotion: "きもち"
};

var PER_PAGE = 10;

Vue.component("four-line", {
	template: [
		'<svg class="ruling" viewBox="0 0 100 15.6" preserveAspectRatio="none" aria-hidden="true" focusable="false">',
		'<line class="rule-top" vector-effect="non-scaling-stroke" x1="0" y1="0.3" x2="100" y2="0.3"></line>',
		'<line class="rule-mid" vector-effect="non-scaling-stroke" x1="0" y1="4.6" x2="100" y2="4.6"></line>',
		'<line class="rule-base" vector-effect="non-scaling-stroke" x1="0" y1="11" x2="100" y2="11"></line>',
		'<line class="rule-bottom" vector-effect="non-scaling-stroke" x1="0" y1="15.3" x2="100" y2="15.3"></line>',
		"</svg>"
	].join("")
});

new Vue({
	el: "#app",
	data: {
		genres: [],
		selected: null,
		ready: false,
		error: false
	},
	computed: {
		pages: function () {
			if (!this.selected) {
				return [];
			}
			var words = this.selected.words || [];
			var chunks = [];
			for (var i = 0; i < words.length; i += PER_PAGE) {
				chunks.push(words.slice(i, i + PER_PAGE));
			}
			return chunks;
		}
	},
	mounted: function () {
		var self = this;
		window.addEventListener("hashchange", function () {
			self.applyHash();
		});
		axios.get("data/words.json")
			.then(function (res) {
				if (!Array.isArray(res.data)) {
					throw new Error("words.json is not an array");
				}
				self.genres = res.data;
				self.applyHash();
				self.ready = true;
			})
			.catch(function () {
				self.error = true;
			});
	},
	methods: {
		applyHash: function () {
			var hash = decodeURIComponent((location.hash || "").replace(/^#/, ""));
			if (!hash) {
				this.selected = null;
				return;
			}
			for (var i = 0; i < this.genres.length; i++) {
				if (this.genres[i].genre === hash) {
					this.selected = this.genres[i];
					return;
				}
			}
			this.selected = null;
		},
		genreJa: function (name) {
			return GENRE_JA[name] || "";
		},
		genreClass: function (name) {
			return "genre-" + String(name || "").toLowerCase().replace(/\s+/g, "-");
		},
		pageCount: function (genre) {
			var n = genre && genre.words ? genre.words.length : 0;
			return Math.ceil(n / PER_PAGE);
		},
		open: function (genre) {
			this.selected = genre;
			if (window.history && window.history.replaceState) {
				window.history.replaceState(null, "", "#" + encodeURIComponent(genre.genre));
			}
		},
		back: function () {
			this.selected = null;
			if (window.history && window.history.replaceState) {
				window.history.replaceState(null, "", location.pathname + location.search);
			}
		}
	}
});
