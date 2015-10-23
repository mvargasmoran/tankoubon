/*global  */
//SeriesController.js

/**
 * SeriesController
 *
 * @description :: Server-side logic for managing looking for books series, tankoubons, chapters and it's pages
 * @help        :: See http://sailsjs.org/documentation/concepts/Controllers
 */

var exec = require('child_process').exec,
	fs   = require("fs"),
	path = require("path");

var tankoubons = "assets/tankoubons/";



module.exports = {
	all: function (req, res) {
		var series = 'None';
        
		exec('ls', function (error, stdout, stderr) {
			series = stdout;
			return res.send(series);
		});
	},
	allSeries: function (req, res) {
        
		fs.readdir(tankoubons, function (err, files) {
            
			var series = [];
            
			for (var i = 0; i < files.length; i++) {
				
				if ( fs.statSync( tankoubons + files[i] ).isDirectory() ) {
					series.push(files[i]);
				};
			};
            
			return res.send(series);
		});
	},
	fullTree: function (req, res) {

		diretoryTreeToObj(tankoubons, function(err, jsonResults){
			sails.log(jsonResults);
			if(err){
				sails.error(err);
				throw error;
			}
			return res.send(jsonResults);
		});

	}
};


/*
************************************
		
	* based on LifeQuery\'s answer *
	http://stackoverflow.com/questions/11194287/convert-a-directory-structure-in-the-filesystem-to-json-with-node-js
	
*************************************
*/
var diretoryTreeToObj=function(a,b){var c=[];fs.readdir(a,function(d,e){if(d)return b(d);var f=e.length;return f?void e.forEach(function(d){d=path.resolve(a,d),fs.stat(d,function(a,e){e&&e.isDirectory()?diretoryTreeToObj(d,function(a,e){c.push({name:path.basename(d),type:"folder",children:e}),--f||b(null,c)}):(c.push({type:"file",name:path.basename(d)}),--f||b(null,c))})}):b(null,{name:path.basename(a),type:"folder",children:c})})};
