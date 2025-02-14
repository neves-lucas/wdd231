import { initArticles } from "./modules/articles.js";

const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});

// Dark mode functionality
const toggleButton = document.getElementById('theme-toggle');
const body = document.getElementById('main');

// Check and apply saved theme from local storage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
	body.classList.add(currentTheme);
}

// Toggle dark mode and save preference
toggleButton.addEventListener('click', () => {
	body.classList.toggle('dark-mode');
	if (body.classList.contains('dark-mode')) {
		localStorage.setItem('theme', 'dark-mode');
	} else {
		localStorage.removeItem('theme');
	}
});
	document.addEventListener('DOMContentLoaded', () => {
		initArticles();
	});