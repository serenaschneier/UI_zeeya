//sellerform.js
//manages the "database" -- takes the entered listing and appends it to the "database"
//once the form is submitted, a confirmation msg is displayed, and the provider becomes the consumer (e.g., can search through listings and select one if desired)

$(document).ready(function(){

	//click submit button on seller form --> add the entry to the db,
	//and give validation if it worked
	$("#submit").click(function(event){
		event.preventDefault();
		submitEntry();
	})

	$("#submit").keypress(function(event){
		if (event.which == 13){
			event.preventDefault();
			submitEntry();
		}
	});

	//return to home page
	$(".center.bold").click(function(event){
		window.location.assign("/");
	});


}); //end of doc ready fxn


//submitEntry() function takes the info saved in the seller form, 
//formulates it into an entry, and calls function to append this entry to entries (the "database" array)

var submitEntry = function(){

	var new_entry = gatherEntryData();
		
	appendEntry(new_entry);
	
}

var gatherEntryData = function(){

	$("#validation").empty();
	var name = $("#name").val();
	var mail = $("#mail").val();
	var exerciseType = $("#exerciseType").val();
	var subject = $("#subject").val().split(','); //Class Name, Studio Name
	var className = subject[0];
	var studioName = subject[1];
	studioName = studioName.slice(1,studioName.length);
	var starttime = $("#starttime").val();
	var endtime = $("#endtime").val();
	

	var new_entry = {
		"Name": name,
		"Email": mail,
		"Exercise Type": exerciseType,
		"Class Name": className,
		"Studio": studioName,
		"Time": starttime + " to " + endtime
	};

	return new_entry
}

//appends entry to the entries db list
//if successful gives view item link
var appendEntry = function(new_entry){

		//makes ajax call to append entry to entries on the server
		$.ajax({
		type: "POST",
		url: "addhelper",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
        data : JSON.stringify(new_entry),
        success: function(result){
            //upon success, you receive the whole array of entries 
            var entries = result["entries"];
           // console.log('success');
            console.log(entries);

           
            //CLEAR ALL BOXES
			$("#name").val("");
			$("#mail").val("");
			$("#exerciseType").val("");
			$("#subject").val("");
			$("#starttime").val("");
			$("#endtime").val("");
            displayEntries(entries);
	
        },
        error: function(request, status, error){
            console.log("Error in adding item to database");
            console.log(request)
            console.log(status)
            console.log(error)
        }
	});

}

var removeEntry = function(idnum){
	
		//makes ajax call to remove entry from entries on the server
		$.ajax({
		type: "POST",
		url: "removehelper",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data : JSON.stringify({"id": idnum}),
        success: function(result){
            //upon success, you receive the whole array of entries 
            var entries = result["entries"];
           // console.log('success');
           // console.log(entries);

           
            //CLEAR ALL BOXES
			$("#name").val("");
			$("#mail").val("");
			$("#exerciseType").val("");
			$("#subject").val("");
			$("#starttime").val("");
			$("#endtime").val("");
            displayEntries(entries);
	
        },
        error: function(request, status, error){
            console.log("Error in adding item to database");
            console.log(request)
            console.log(status)
            console.log(error)
        }
	});	

}

var editEntry = function(idnum){

	var updated_entry = gatherEntryData();
	
	//get exercise type: <img> such that id = idnum --> access alt field 
	// var exerciseType = $("img[id="+idnum+"]").attr('alt');

	var edited_entry = {
		"Id": idnum,
		"Name": "Serena Schneier",
		"Email": updated_entry["Email"],
		"Exercise Type": updated_entry["Exercise Type"],
		"Class Name": updated_entry["Class Name"],
		"Studio": updated_entry["Studio"],
		"Time": updated_entry["Time"]
	};
	console.log(edited_entry);

	//make ajax call - replace this entry with the one with the matching id
	$.ajax({
		type: "POST",
		url: "edithelper",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(edited_entry),
		success: function(result){
			var entries = result["entries"];

			displayEntries(entries);
		},
		error: function(request, status, error){
			console.log("Error in adding item to database");
            console.log(request)
            console.log(status)
            console.log(error)			
		}
	});
}

var displayEntries = function(entries){

	$("#buyerform").empty();

	//display a vertical list of all entries

	if (entries.length > 0){
		

		//for each idnum in the entries list, display a row corresponding with the element mapped to that id
		for (var i = 0; i < entries.length; i++){
			var delbtn = '<span></span>';
			var editbtn = '<span></span>';
			var editmodal = '';
			var match = entries[i];
			
			//give delete and edit permissions
			
			delbtn = '<button type="button" id="'+match["Id"]+'"class="btn btn-lg btn-outline-danger delete btnpad"><span class="glyphicon glyphicon-remove"></button>';
			editbtn = '<button type="button" id="'+match["Id"]+'"class="btn btn-lg btn-outline-warning edit btnpad" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-edit"></span></button>';
			

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
			var mailbtn = "<a href='mailto:"+match["Email"]+"'class='btn btn-lg btn-outline-primary mail btnpad'><span class='glyphicon glyphicon-envelope'></span></button>";
			$(col_btns).append(delbtn+editbtn+mailbtn);
			$(row).append(col_btns);

			$("#buyerform").prepend(row);

		}
		$("#buyerform").prepend("<div class='row bold bord'>");
		$("#buyerform").prepend("<div><b> Check out some listings below that might interest you...</b></div><br>");
		$("#buyerform").prepend("<div><b>Thanks for listing your class on Z E E Y A!</b></div>");

	}


	$(".delete").click(function(){
		removeEntry(this.id);
	});

	$(".edit").click(function(){
	    var idnum = this.id
	  	$('#myModal').on('shown.bs.modal', function () {
		  $('#myInput').trigger('focus')
		})

	  	$("#submit").click(function(){
	    	editEntry(idnum);
	  	})
	});

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




