var friendData = require("../data/friends.js")

module.exports = function(app) {

	app.get("/api/friends", function(req, res) {
		res.json(friendData);
	});

	app.post("/api/friends", function(req, res) {

		var friendInput = req.body;
		// console.log('userInput = ' + JSON.stringify(userInput));

		var friendResponses = friendInput.scores;
		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var matchName = '';
		var matchImage = '';
		var totalDifference = 100; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friendData.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < friendResponses.length; j++) {
				diff += Math.abs(friendData[i].scores[j] - friendResponses[j]);
			}
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
			if (diff < totalDifference) {
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

				totalDifference = diff;
				matchName = friendData[i].name;
				matchImage = friendData[i].photo;
			}
		}

		friendData.push(req.body);
	});

	app.post("/api/clear", function() {
		friendData = [];

		console.log(friendData);
	});
};