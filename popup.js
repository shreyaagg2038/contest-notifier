// Initialising required variables
const today = new Date();
let startTimeString = today.toISOString().substring(0, 10);
let todayDate = today.getDate();
let userName = "", apiKey = "";


// Fetching credentials from JSON file.
// NOTE:
// 1) This file is being added to .gitignore for security reasons.
// 2) To awail the credentials, login/signup to `https://clist.by`.
fetch("credentials.json")
	.then(response => response.json())
	.then(data => {
		userName = data.username;
		apiKey = data.api_key;
	});


// Prepare the payload GET request url with required parameters.
const contestApiUrl = `https://clist.by/api/v2/contest/?\
	username=${userName}&\
	api_key=${apiKey}&\
	start__gt=${startTimeString}&\
	limit=100&order_by=start`;


// Perform the API fetch on window loading.
window.onload = () => {
	showAPIData(contestApiUrl);
}


// Async function to handle fetch request and return JSON response.
async function showAPIData(url) {

	let response = await fetch(url);
	if (!response.ok) {
	    throw new Error(`HTTP error! status: ${response.status}`);
	}
	let data = await response.json();

	show(data.objects);
}


// Functon to render API response in HTML elements
function show(contests) {
	let table = document.getElementById("coming-contests-table-body");
	let header = document.getElementById("current-contest");

	let comingContests = getComingContestData(contests);
	let i = 0, upcomingContests = 0;

	// Loop to access starting 4 contests
	while(upcomingContests < 4) {

		// Store contest details
		let contestName = comingContests[i].event;

		let contestDate = new Date(comingContests[i].start);
		let timeUTC = contestDate.getTime();
		let dateIST = new Date(timeUTC);
		// date shifting for IST timezone (+5 hours and 30 minutes)
		dateIST.setHours(dateIST.getHours() + 5);
		dateIST.setMinutes(dateIST.getMinutes() + 30);
		let contestStartDate = dateIST.toDateString();
		let contestStartTime = dateIST.toTimeString().substring(0,8);

		let contestDuration = (comingContests[i].duration / 3600).toPrecision(2);
		let contestLink = comingContests[i].href;

		// Update contests index
		i++;

		if(contestDate.getDate() == todayDate) {
			let statusString = "There's a";
			// If the contest is over or started.
			if(today.getTime() > dateIST.getTime()) {
				statusString = "There was a";
			}
			header.innerHTML = (
				`${statusString} ${contestName} contest today of duration \
				${contestDuration} hrs at ${contestStartTime}!`
			);
			continue;
		}

		let row = getContestRow(
			contestName,
			contestDuration,
			`${contestStartDate} ${contestStartTime}`,
			contestLink,
		);

		table.appendChild(row);

		// Increment upcoming contests.
		upcomingContests++;
	}
}


// Function to add contest details row to table
function getContestRow(contestName, contestDuration, contestStartDate, contestLink) {
	// Create a new row instance
	let row = document.createElement("tr");

	// Set Contest name
	let name = document.createElement("td");
	name.innerHTML = contestName;
	row.appendChild(name);

	// Set Contest duration
	let duration = document.createElement("td");
	duration.innerHTML = contestDuration;
	row.appendChild(duration);

	// Set Contest start time
	let startDate = document.createElement("td");
	startDate.innerHTML = contestStartDate;
	row.appendChild(startDate);

	// Set Contest link button
	let link = document.createElement("td");
	let linkBtn = document.createElement("a");
	linkBtn.innerHTML = "Link";
	linkBtn.setAttribute("class", "link-button btn btn-outline-warning");
	linkBtn.setAttribute("href", contestLink);
	link.appendChild(linkBtn);
	row.appendChild(link);

	return row;
}


// Function to get coming contests' Array
function getComingContestData(contests) {
	let result = new Array();

	// Only select contests from following platforms
	const codeForcesHREF = "http://codeforces.com/contests";
	const codeChefHREF = "https://www.codechef.com";
	const atCoderHREF = "https://atcoder.jp/contests";

	for(let i=0; i<contests.length; i++) {
		let is_required = false;

		is_required = is_required || (
			contests[i].href.substring(0, codeForcesHREF.length) == codeForcesHREF ||
			contests[i].href.substring(0, codeChefHREF.length) == codeChefHREF ||
			contests[i].href.substring(0, atCoderHREF.length) == atCoderHREF
		)

		if(is_required) {
			result.push(contests[i]);
		}
	}

	return result;
}
