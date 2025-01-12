// Get the hamburger button and the navigation links container
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// Add a click event listener to the hamburger button
hamburger.addEventListener("click", () => {
  // Toggle the 'show' class on the navLinks container
  navLinks.classList.toggle("show");
});