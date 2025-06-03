"use strict";
/*const d = document;

const $root = d.getElementById("root");

let cards = `<div class="d-flex flex-wrap">`;

fetch("file.json")
	.then((res) => res.json())
	.then((info) => {
		for (let i = 0; i < info.length; i++) {
			cards += `
        <div class="card">
            <img src="https://github.com/${info[i].usernameGithub}.png" class="card-img-top" alt=" imagen de perfil de${info[i].student} ">
            <div class="card-body">
            <h5 class="card-title"> ${info[i].student}</h5>
            </div>
            <div class="card-body">
            <a href="https://github.com/${info[i].usernameGithub} " target="_blank"
            rel="noopener noreferrer"
            class="card-link"Card Link">GitHub
            </a>    
            </div>
        </div>`;
		}
		cards += "</div>";
		$root.innerHTML = cards;
	})
	.catch((err) => {
		console.log("error:", err);
	});
 */

/* fetch("students.json")
	.then((response) => response.json())
	.then((data) => {
		const container = document.getElementById("studentsContainer");

		data.forEach((student) => {
			const col = document.createElement("div");
			col.className = "col-12 col-md-6 col-lg-4"; // Responsive: 1 on xs, 2 on md, 3 on lg+

			const imageUrl = `https://github.com/${student.githubUsername}.png`;

			col.innerHTML = `
        <div class="card shadow h-100">
            <img src="${imageUrl}" class="card-img-top img-fluid" alt="${student.student}'s avatar">
            <div class="card-body">
            <h5 class="card-title">${student.student}</h5>
            <p class="card-text"><strong>Course:</strong> ${student.course}</p>
            <a href="https://github.com/${student.githubUsername}" target="_blank" class="btn btn-primary">View GitHub</a>
            </div>
        </div>`;

			container.appendChild(col);
		});
	})
	.catch((error) => {
		console.error("Error loading student data:", error);
	});
 */

fetch("file.json")
	.then((response) => response.json())
	.then((data) => displayStudents(data))
	.catch((error) => console.error("Error loading JSON:", error));

function displayStudents(students) {
	const container = document.getElementById("studentsContainer");
	container.innerHTML = ""; // Clear previous content

	const row = document.createElement("div");
	row.className = "row g-4";
	container.appendChild(row);

	students.forEach((student) => {
		const githubUser = student.usernameGithub;
		const imageUrl = githubUser
			? `https://github.com/${githubUser}.png`
			: `../media/placeholder.png`;

		const githubLink = githubUser
			? `<a href="https://github.com/${githubUser}" target="_blank" 
            class="btn" style="background-color: rgba(22,64,114,1); color: white; width: 100%;">
            View GitHub
        </a>`
			: `<span class="text-muted fst-italic">No GitHub</span>`;

		const projectScores = student.projects
			.map((project) => {
				const avg = average(project.score);
				return `<li><strong>${project.name}</strong> Nota: ${avg} </li>`;
			})
			.join("");

		const col = document.createElement("div");
		col.className = "col-12 col-md-6 col-lg-3 d-flex"; // d-flex to make cards equal height

		col.innerHTML = `
    <div class="card shadow h-100 w-100">
        <img src="${imageUrl}" class="card-img-top " alt="${student.student}'s avatar">


        <div class="card-body d-flex flex-column">
			<h5 class="card-title">${student.student}</h5>
			
			<p class="card-text">Intensity: ${student.intensity}</p>
			<div class="mt-auto">${githubLink}</div>
			<ul class="mt-3 mb-0">${projectScores}</ul>
        </div>
    </div>
    `;

		row.appendChild(col);
	});
}

function average(scores) {
	if (!scores || !scores.length) return 0;

	// If it's a checklist with 10 values summing to ≤10, normalize to 5
	const isChecklist =
		scores.length === 10 && scores.every((s) => typeof s === "number");
	if (isChecklist) {
		const total = scores.reduce((a, b) => a + b, 0);
		return ((total / 10) * 5).toFixed(2);
	}

	// Otherwise, normalize any score > 5 by dividing by 2
	const normalized = scores.map((s) => (s > 5 ? s / 2 : s));
	const avg = normalized.reduce((a, b) => a + b, 0) / normalized.length;
	return avg.toFixed(2);
}
