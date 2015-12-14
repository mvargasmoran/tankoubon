var apiURL = '/allSeries';

new Vue({
	el: '#app',
	data: {
		series: null,
		tankoubon: null,
		currentTankoubon: null,
		currentChapter: null
	},
	created: function () {
		this.fetchSeries();
	},
	watch: {
    	currentBranch: 'fetchData'
  	},
	methods: {
		showChapters: function (serieName) {

			console.log(serieName)

			var self = this;
			self.currentTankoubon = serieName;
			self.tankoubon = this.fetchTankoubon(serieName);
			console.log(self.tankoubon);
		},
		fetchSeries: function () {
			var self = this;
			this.$http.get('allSeries', function (availableSeries) {
				self.series = availableSeries;
			});
		},
		fetchTankoubon :function (serieName) {
			var self = this;
			var fullTankoubon = 'fullTankoubon/' + serieName;
			this.$http.get(fullTankoubon, function (chapters) {
				self.tankoubon = chapters;
			});
		}
	}
});


// Vue.component('series', {
	
// 	template: '#series-template',

// 	data: function  () {

// 		return {
// 			list: []
// 		};

// 	},

// 	created : function () {
// 		this.list = this.fetchSeries();
// 		console.log(this.list);
// 	},

// 	methods: {
// 		fetchSeries: function function_name () {
// 			var list = '';
// 			this.$http.get('/allSeries', function  (series) {
// 				list = series;
// 				console.log(series);
// 			});

// 		}
// 	}

// });



// new Vue({
// 	el: '#app',
// 	data: {
// 		message: 'Today series:',
// 		tankoubons: [

// 		]
// 	}
// });