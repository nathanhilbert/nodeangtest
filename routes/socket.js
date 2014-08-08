/*
 * Serve content over a socket
 */

var _ = require('underscore');
var walk    = require('walk');
var jsonfile = require('jsonfile');
var util = require('util');
var db = require("mongojs").connect("twitter", ["collection"]);

var clients = {}
//minddate
//2014-08-08T12:45:56.000Z"

var programstarttime = new Date(2014, 7, 8, 12);
var faketime = new Date(2014, 7, 8, 13, 45);

//they will bei n order
var processedFiles = [];
var deadfiles = [];

var PROCESSEDDIR = "/home/nathanhilbert/nlp_cliff/TwitterSNS/processed/";

var jf = require('jsonfile')
var util = require('util')
/*
//read jsonfile
var jf = require('jsonfile')
var util = require('util')

var file = '/tmp/data.json'
jf.readFile(file, function(err, obj) {
  console.log(util.inspect(obj))
})


//write jsonfile


var file = '/tmp/data.json'
var obj = {name: 'JP'}

jf.writeFile(file, obj, function(err) {
  console.log(err)
})
*/


var calcInfluence = function(facts){
	//determines the size of the picture
	//normalize this
	return 10;
}



console.log("setting the interveal once");
setInterval(function(){
	faketime.setSeconds(faketime.getSeconds() + 30);
	return;
}, 1000);

var lastmaxindex = 0;
var getMaxIndex = function(){
	//let's assume the id increases
	return;
	
}


module.exports = function (socket) {

  socket.emit('send:name', {
    name: 'Bob'
  });

  clients[socket.id] = {'totalparts':0,'lastindex':programstarttime.toISOString()};

  setInterval((function () {




	var thestart = new Date(clients[socket.id]['lastindex']);
	var end = faketime;
	
	db.collection.find({'date': {"$gte":thestart, "$lt":end}}, function(err, objs) {
		console.log(err);
		console.log(objs);
		  if( err || !objs){
		  	clients[socket.id]['lastindex'] = end.toISOString();
		  	  socket.emit('send:time', {
			    time: faketime,
			    geojson:{}
			  });
			  return;

		  }
		  else {
		  	var thegeojson =  [];

		  	objs.forEach( function(tweetobj) {
		  		var baseobj =  { "type": "Feature",
						        "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
						        "properties": {"influence": null,"picture":null}
						        }
				baseobj['geometry']['coordinates'] = tweetobj['fromlocation'];
				baseobj['properties']['influence'] = tweetobj['influence'];
				baseobj['properties']['picture'] = tweetobj['picture']
				thegeojson.push(baseobj);
		  		return;
		  		
		  	});
		  	clients[socket.id]['lastindex'] = end.toISOString();
		  	  socket.emit('send:time', {
			    time: faketime,
			    geojson:thegeojson
			  });
			  return;
		  }

		});



    
  }), 2000);
 return;
};






/*






var processText = function(){
	processlock = true;
	

	// Walker options
	var walker  = walk.walk(DATADIR, { followLinks: false });

	walker.on('file', function(root, stat, next) {
		if (_.indexOf(processedFiles, stat.name) == -1){
			jf.readFile(root + stat.name, function(err, tweet) {
				if (! err){
					//get the from location
				  processedobj = {"date":tweet["created_at"], 
				  				"influence":20,
				  				"fromlocation": null,
				  				"pictures": tweet['user']["profile_image_url_https"],
				  				"tolocation":[],
				  				"id": tweet['id']}

				  processedFiles.push(stat.name);
				  request.post(
				    'http://localhost:8080/CLIFF/parse/text?q=' + tweet['user']['location'],
				    { },
				    function (error, response, body) {
				        if (!error && response.statusCode == 200) {
				        	processedtext = JSON.parse(body);

				        	if (processedtext['status'] != 'error' && processedtext['results']["places"]['mentions'].length >0){
				        		//console.log(processedtext['results']["places"]['mentions']);
				        		processedobj['fromlocation'] = [ processedtext['results']['places']['mentions'][0]['lon'],processedtext['results']['places']['mentions'][0]['lat']]


				            

					        	request.get(
								    'http://localhost:8080/CLIFF/parse/text?q=' + tweet['text'],
								    { },
								    function (error, response, body) {
								    	console.log(error);
								    	console.log(response.statusCode);
								        if (!error && response.statusCode == 200) {
								        	//parsejson response
								        	processedtext2 = JSON.parse(body);
								        	console.log(processedtext2);
								        	if (processedtext2['status'] != 'error' && processedtext2['results']["places"]['mentions'].length >0){
									        	_.each(processedtext2['results']['places']['mentions'], function(element, index, list){
									        		console.log(element);
									        		processedobj['tolocation'].push([element['lon'], element['lat']]);
									        	});

									        	jf.writeFile(PROCESSEDDIR + processedobj['id'], processedobj, function(err) {
												  console.log(err);
												});
								        	}
								        	
								            
								        }
								    }
								
									);
				        	}

				        }
				    }
				
					);
				}
			})
			
		}

	    next();
	});

	walker.on('end', function() {
	    processlock = false;
	});



	
}



*/