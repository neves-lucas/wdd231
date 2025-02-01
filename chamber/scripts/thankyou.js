const urlParams = new URLSearchParams(window.location.search);

document.getElementById("first-name").textContent =
    urlParams.get("firstName") || "N/A";
document.getElementById("last-name").textContent =
    urlParams.get("lastName") || "N/A";
document.getElementById("email").textContent = urlParams.get("email") || "N/A";
document.getElementById("mobile-number").textContent =
    urlParams.get("phone") || "N/A";
document.getElementById("business-name").textContent =
    urlParams.get("organization") || "N/A";
document.getElementById("membershipLevel").textContent =
    urlParams.get("membershipLevel") || "N/A";

const rawTimestamp = urlParams.get("timestamp");
const date = rawTimestamp ? new Date(rawTimestamp) : new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, "0");
const day = String(date.getDate()).padStart(2, "0");
const hours = String(date.getHours()).padStart(2, "0");
const minutes = String(date.getMinutes()).padStart(2, "0");
document.getElementById("timestamp").textContent = `${year}-${month}-${day} at ${hours}:${minutes}`;