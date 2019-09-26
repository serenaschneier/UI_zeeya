//buyer.js
//searches the "database" for workout classes matching the user's specified preferences
var specs = [];

$(document).ready(function(){
	

	//get buyer's filter specifications
	$("button").click(function(){
		updateButton($(this).attr('id'));
	});

	//return to home page
	$(".center.bold").click(function(event){
		window.location.assign("/");
	});


}); //end of doc ready fxn
var click_count = {"Cycling": 0, "Dance/Barre": 0, "HIIT": 0, "Pilates": 0, "Running": 0}

var updateButton = function(id){
	click_count[id] += 1;

	if (click_count[id] % 2 != 0){
		$(this).css('background','black');
		specs.push(id);
		displayEntries(specs);
	}
	else{
		$(this).css('background', '#8BC3A3');
		console.log('remove entries related to ' + id);
		//remove specs value == id
		specs.splice($.inArray(id,specs),1);
		displayEntries(specs);
	}
	
}

var displayEntries = function(specs){

	$("#results").empty();

	//make array entries unique/singular
	jQuery.unique(specs);

	//display a vertical list of all entries, filtering by items in specs

	if (entries.length > 0){

		for (var i = 0; i < entries.length; i++){
			for (var k = 0; k < specs.length; k++){
				if (entries[i]["Exercise Type"] == specs[k]){
					var match = entries[i];
					var row = $("<div class='row bold bord'>");
 
					//column for image
					var col_image = $("<div class='col-md-1 padup'>");
					var image = $("<img />").attr({
						"id": match["Id"],
						"src": "static" + insertPic(match["Exercise Type"]),
						"alt": match["Exercise Type"],
					}).appendTo(col_image);
					$(row).append(col_image);

					//column for time of class
					var col_time = $("<div contenteditable='false' class='col-md-3 bold padup classtime "+match["Id"]+"'>");
					$(col_time).append(match["Time"]);
					var time_diff = getTime(match["Time"]);
					var expiring = "<div class='subtitle'>" + time_diff + "</div>"
					$(col_time).append(expiring);
					$(row).append(col_time);


					//column for name of class
					var col_class = $("<div contenteditable='false' class='col-md-3 padup classname "+match["Id"]+"'>");
					$(col_class).append(match["Class Name"]);
					$(row).append(col_class);

					//column for name of studio
					var col_studio = $("<div contenteditable='false' class='col-md-3 padup studioname "+match["Id"]+"'>");
					$(col_studio).append(match["Studio"]);
					$(row).append(col_studio);

					var col_btns = $("<div class='col-md-2 padup'>");
					 var mailbtn = "<a href='mailto:"+match["Email"]+"'class='btn btn-lg btn-outline-primary mail'><span class='glyphicon glyphicon-envelope'></span></button>";

					$(col_btns).append(mailbtn);
					$(row).append(col_btns);

					$("#results").prepend(row);

				}
			}

		}
	}

};

var insertPic = function(exerciseType){
	var pic;
	if (exerciseType == "Cycling")
		pic = "/cycling.png";
	else if (exerciseType == "Dance/Barre")
		pic = "/dancebarre.png";
	else if (exerciseType == "HIIT")
		pic = "/HIIT.png";
	else if (exerciseType == "Pilates")
		pic = "/pilates.png"
	else if (exerciseType == "Running")
		pic = "/running.png"
	else
		pic = "no img found";
	return pic;
}

var getTime = function(sched_time){

	var today = new Date();
	var cur_time = today.getHours() + ":" + today.getMinutes(); //time right now

	sched_time = sched_time.split(' ');
	sched_time = sched_time[0]; //"12:30pm"
	var hours_min = sched_time.slice(0,-2) //"12:30"
	var minutes = hours_min.slice(-2) //"30"
	var hours = sched_time.slice(0,2) //"12"
	hours = parseInt(hours) //12
	if (sched_time.indexOf('p') > -1){ //class is at PM
		if (hours != 12){
			hours += 12;
		}
	}

	// if the class time hour digit < current time, assume the class is tomorrow
	if (hours < cur_time.slice(0,2)){ 
		hours += 24;
	} 

	var class_time = hours.toString() + ':' + minutes;
	//console.log(class_time)
	s = cur_time.split(':');
   	e = class_time.split(':');
   	min = e[1]-s[1];
   	hour_carry = 0;
   	if(min < 0){
       	min += 60;
       	hour_carry += 1;
   	}
   	hour = e[0]-s[0]-hour_carry;
   	min = min % 60;
   	if (min > 9){
   		min = min * 100;
   	}
   	min_str = min.toString()
   	diff = "in " + hour + " hours and " + min_str.substring(0,2) + " minutes";
   	if (min_str.substring(0,2) == '0'){
   		diff = "in " + hour + " hours";
   	}
   	return diff;

}




