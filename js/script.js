"use strict";

fetch("file.json")
	.then((response) => response.json())
	.then((data) => displayStudents(data))
	.catch((error) => console.error("Error loading JSON:", error));

function displayStudents(students) {
	const container = document.getElementById("studentsContainer");
	container.innerHTML = "";

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
		col.className = "col-12 col-md-6 col-lg-3 d-flex";

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

	const isChecklist =
		scores.length === 10 && scores.every((s) => typeof s === "number");
	if (isChecklist) {
		const total = scores.reduce((a, b) => a + b, 0);
		return ((total / 10) * 5).toFixed(2);
	}

	const normalized = scores.map((s) => (s > 5 ? s / 2 : s));
	const avg = normalized.reduce((a, b) => a + b, 0) / normalized.length;
	return avg.toFixed(2);
}
