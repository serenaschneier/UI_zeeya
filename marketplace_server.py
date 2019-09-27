from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)

'''
entries = [{
	"Id": 1,
	"Name": "Elizabeth",
	"Email": "elizsmith@gmail.com",
	"Exercise Type": "Running",
	"Class Name": "Full Body - Lower Focus",
	"Studio": "Barry's Bootcamp",
	"Time": "11:30am to 12:30pm"
}, {
	"Id": 2,
	"Name": "Jacob",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Adv. Beginner Ballet",
	"Studio": "STEPS on Broadway",
	"Time": "6:00pm to 7:30pm"
},
{
	"Id": 3,
	"Name": "Jack",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Advanced Pointe",
	"Studio": "STEPS on Broadway",
	"Time": "6:00pm to 6:30pm"
},
{
	"Id": 4,
	"Name": "Jessica",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "HIIT",
	"Class Name": "Crosstraining",
	"Studio": "FHITTING ROOM",
	"Time": "6:00pm to 7:00pm"
},
{
	"Id": 5,
	"Name": "Jason",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "HIIT",
	"Class Name": "Crossfit",
	"Studio": "Grassroots Project",
	"Time": "6:00pm to 7:00pm"
},
{
	"Id": 6,
	"Name": "Jerry",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Cycling",
	"Class Name": "SPIN-45",
	"Studio": "Flywheel",
	"Time": "6:00pm to 6:45pm"
},
{
	"Id": 7,
	"Name": "Jessie",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Beginner's Bollywood",
	"Studio": "STEPS on Broadway",
	"Time": "5:00pm to 6:00pm"
},
{
	"Id": 8,
	"Name": "Jackson",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Cycling",
	"Class Name": "SOULSURVIVOR",
	"Studio": "Soul Cycle",
	"Time": "5:00pm to 6:00pm"
},
{
	"Id": 9,
	"Name": "Katie",
	"Email": "kdd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Int./Adv. Contemporary",
	"Studio": "STEPS on Broadway",
	"Time": "6:00pm to 7:30pm"
},
{
	"Id": 10,
	"Name": "Kayla",
	"Email": "kkd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Beginner's Tap",
	"Studio": "STEPS on Broadway",
	"Time": "6:00pm to 7:00pm"
},
{
	"Id": 11,
	"Name": "Kamrynn",
	"Email": "kkd123@gmail.com",
	"Exercise Type": "Running",
	"Class Name": "DASH 28",
	"Studio": "Mile High Run Club",
	"Time": "3:00pm to 3:30pm"
},
{
	"Id": 12,
	"Name": "Kyle",
	"Email": "kkd123@gmail.com",
	"Exercise Type": "Pilates",
	"Class Name": "Signature I",
	"Studio": "Physique57",
	"Time": "3:00pm to 4:00pm"
},
{
	"Id": 13,
	"Name": "Mike",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Old School Hip Hop",
	"Studio": "Broadway Dance Center",
	"Time": "8:00pm to 9:00pm"
},
{
	"Id": 14,
	"Name": "Michaela",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Pilates",
	"Class Name": "Pure Empower",
	"Studio": "Pure Barre",
	"Time": "6:00pm to 7:00pm"
},
{
	"Id": 15,
	"Name": "Nicole",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Pilates",
	"Class Name": "Intro. to SLT",
	"Studio": "SLT",
	"Time": "5:00pm to 5:45pm"
},
{
	"Id": 16,
	"Name": "Neville",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "HIIT",
	"Class Name": "Signature",
	"Studio": "SWITCH Playground",
	"Time": "6:00pm to 7:00pm"
},
{
	"Id": 17,
	"Name": "Nia",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Running",
	"Class Name": "Core and Floor",
	"Studio": "Run, Sweat, Run",
	"Time": "2:00pm to 2:45pm"
},
{
	"Id": 18,
	"Name": "Richard",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Cycling",
	"Class Name": "Broadway-Themed Ride",
	"Studio": "Soul Cycle",
	"Time": "6:00pm to 6:45pm"
},
{
	"Id": 19,
	"Name": "Rachel",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Contemporary Jazz",
	"Studio": "STEPS on Broadway",
	"Time": "6:30pm to 8:00pm"
},
{
	"Id": 20,
	"Name": "Ramona",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Cycling",
	"Class Name": "Taylor Swift vs. Kanye Ride",
	"Studio": "Soul Cycle",
	"Time": "6:30pm to 7:15pm"
},
{
	"Id": 21,
	"Name": "Rachel",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Adv. Beginner Ballet",
	"Studio": "STEPS on Broadway",
	"Time": "6:00pm to 7:30pm"
},
{
	"Id": 22,
	"Name": "Rihanna",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "HIIT",
	"Class Name": "Sandbox TRX",
	"Studio": "Training Mate",
	"Time": "5:30pm to 6:30pm"
},
{
	"Id": 23,
	"Name": "Reese",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Intermediate/Adv. Ballet",
	"Studio": "STEPS on Broadway",
	"Time": "4:00pm to 6:00pm"
},
{
	"Id": 24,
	"Name": "Ray",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Pilates",
	"Class Name": "Reformer + Stretch",
	"Studio": "LIFE Pilates",
	"Time": "8:00pm to 9:00pm"
},
{
	"Id": 25,
	"Name": "Riley",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "HIIT",
	"Class Name": "HIIT",
	"Studio": "Brrrn",
	"Time": "6:00pm to 7:00pm"
},
{
	"Id": 26,
	"Name": "Raleigh",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Cycling",
	"Class Name": "Soul ACTIVATE",
	"Studio": "Soul Cycle",
	"Time": "7:30pm to 8:15pm"
},
{
	"Id": 27,
	"Name": "Rayna",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Pilates",
	"Class Name": "Megaformer",
	"Studio": "Lagree Fitness",
	"Time": "6:00pm to 6:30pm"
},
{
	"Id": 28,
	"Name": "Raya",
	"Email": "jdd123@gmail.com",
	"Exercise Type": "Dance/Barre",
	"Class Name": "Adv. Beginner Ballet",
	"Studio": "STEPS on Broadway",
	"Time": "6:00pm to 7:30pm"
}
]'''

entries = []

''' homepage '''
@app.route('/', methods=['GET','POST'])
def home():
	return render_template('home.html')

''' user clicked buyer  '''
@app.route('/buyerform')
def buyerform():
    return render_template('buyerform.html', entries = entries) 

''' user clicked seller  '''
@app.route('/sellerform')
def sellerform():
	return render_template('sellerform.html', entries = entries) 

@app.route('/addhelper', methods=['GET','POST'])
def addhelper():

	json_data = request.get_json()
	
	global cur_id
	global entries
	if len(entries) > 0:
		last_entry = entries[len(entries)-1]
		cur_id = last_entry["Id"]
	else:
		cur_id = 0
	cur_id += 1
	new_entry = {
		"Id": cur_id,
		"Name": json_data["Name"],
		"Email": json_data["Email"],
		"Exercise Type": json_data["Exercise Type"],
		"Class Name": json_data["Class Name"],
		"Studio": json_data["Studio"],
		"Time": json_data["Time"]	
	}

	entries.append(new_entry)
	cur_id += 1
	
	return jsonify(entries=entries)

@app.route('/removehelper', methods=['GET','POST'])
def removehelper():

	print("remove helper method")
	json_data = request.get_json()
	print(json_data)
	delete_id = int(json_data["id"])

	# find the entry with this id, and delete it.
	index_to_delete = None
	x = 0
	while x < len(entries):
		x_id = entries[x]["Id"]
		print("Id in entries:",x_id)

		if x_id == delete_id:
			index_to_delete = x
			break
		x += 1

	if index_to_delete is not None:
		print("deleting entry with id num: ", index_to_delete)
		del entries[index_to_delete]

	print("new entries array")
	print(entries)

	#return updated array
	return jsonify(entries=entries)

@app.route('/edithelper', methods=['GET','POST'])
def edithelper():

	print("edit helper method")
	json_data = request.get_json()
	print(json_data)
	edit_id = int(json_data["Id"])

	# find the entry with this id, and reset its field values.

	index_to_edit = None
	x = 0
	while x < len(entries):
		x_id = entries[x]["Id"]

		if x_id == edit_id:
			index_to_edit = x
			break
		x += 1

	if index_to_edit is not None:
		print("former entry: ", entries[index_to_edit])

		entries[index_to_edit]["Id"] = edit_id
		entries[index_to_edit]["Name"] = json_data["Name"]
		entries[index_to_edit]["Email"] = json_data["Email"]
		entries[index_to_edit]["Exercise Type"] = json_data["Exercise Type"]
		entries[index_to_edit]["Class Name"] = json_data["Class Name"]
		entries[index_to_edit]["Studio"] = json_data["Studio"]
		entries[index_to_edit]["Time"] = json_data["Time"]	

		print("updated entry: ", entries[index_to_edit])
	

	print("new entries array")
	print(entries)

	#return updated array
	return jsonify(entries=entries)

if __name__ == '__main__':
	app.run('0.0.0.0')

