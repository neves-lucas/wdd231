
const API_KEY = "b13e30d4a31a8fad7a53ac1b0d60f926";
const LATITUDE = "-9.6658";
const LONGITUDE = "-35.7353";

const WEEKDAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

function createcompanyCard(index) {
    const companyCard = document.createElement("div");
    companyCard.className = `card-stack card-stack-0${index}`;

    companyCard.innerHTML = `
        <div class="title-company">
            <h4 id="business-name-0${index}"></h4>
            <h3 id="tag0${index}"></h3>
        </div>
        <div class="company-img">
            <img src="" alt="" id="img-0${index}-company" width="80px">
        </div>
        <div class="company-data">
            <p><span id="phone-0${index}"></span></p>
            <p><a href="" id="url-0${index}"></a></p>
            <p><span id="member-since-0${index}"></span></p>
        </div>
    `;

    return companyCard;
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

async function populatecompanyCards() {
    const companycardsMainBox = document.querySelector(".companycards-main-box");
    if (!companycardsMainBox) return;

    companycardsMainBox.innerHTML = "";
    for (let i = 1; i <= 3; i++) {
        companycardsMainBox.appendChild(createcompanyCard(i));
    }

    const data = await fetchData("data/members.json");
    if (!data) return; 

    const shuffledData = [...data].sort(() => 0.5 - Math.random());
    const companyCardData = shuffledData.slice(0, 3);

    companyCardData.forEach((member, index) => {
        const cardIndex = index + 1;
        const nameElement = document.querySelector(`#business-name-0${cardIndex}`);
        const industryElement = document.querySelector(`#tag0${cardIndex}`);
        const phoneElement = document.querySelector(`#phone-0${cardIndex}`);
        const urlElement = document.querySelector(`#url-0${cardIndex}`);
        const memberElement = document.querySelector(`#member-since-0${cardIndex}`);
        const imgElement = document.querySelector(`#img-0${cardIndex}-company`);

        if (nameElement) nameElement.textContent = member.Name;
        if (industryElement) industryElement.textContent = member.Industry;
        if (phoneElement) phoneElement.textContent = `Phone: ${member.Phone}`;
        if (urlElement) {
            urlElement.href = member.Website;
            urlElement.textContent = "Visit the website";
        }
        if (memberElement) memberElement.textContent = `Membership level: ${member.Membership}`;
        if (imgElement) {
            imgElement.src = member.logo;
            imgElement.alt = `${member.Name} logo`;
        }
    });
}


async function fetchAndDisplayCurrentWeather() {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;
    const data = await fetchData(urlWeather);
    if (!data) return;

    const eventMainBox = document.querySelector("#weather-main");
    if (!eventMainBox) return;

    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;
    const day = new Date().getDay();

    eventMainBox.innerHTML = `
        <div class="current-weather">
            <h2>The current Weather in: <span id="city-name">${data.name}</span></h2>
            <h4>${WEEKDAYS[day]}</h4>
            <div class="weather-content"></div>
            <p>Temperature <span id="current-temp">${parseFloat(data.main.temp).toFixed(0)}°C</span></p>
            <figure>
                <img id="weather-icon" src="${iconsrc}" alt="${desc}">
                <figcaption>${desc}</figcaption>
            </figure>
        </div>
    `;
}

async function fetchAndDisplayWeatherForecast() {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LATITUDE}&lon=${LONGITUDE}&appid=${API_KEY}&units=metric`;
    const forecastData = await fetchData(forecastUrl);

    if (!forecastData) return;

    const weatherForecast = document.querySelector("#weather-forecast");
    if (!weatherForecast) return;

    weatherForecast.innerHTML = "";
    const forecast = document.createElement("article");
    forecast.className = "forecast";
    forecast.innerHTML = `
        <h3>3-Days Weather Forecast</h3>
        <div class="main-day-box">
            <div class="day-box">
                <h4 id="day-01">${WEEKDAYS[(new Date().getDay() + 1) % 7]}</h4>
                <figure>
                    <img id="weather-icon-1" src="" alt="">
                    <figcaption id="figcaption-1"></figcaption>
                </figure>
                <p>Temperature: <span id="temp-1"></span></p>
            </div>
            <div class="day-box">
                <h4 id="day-02">${WEEKDAYS[(new Date().getDay() + 2) % 7]}</h4>
                <figure>
                    <img id="weather-icon-2" src="" alt="">
                    <figcaption id="figcaption-2"></figcaption>
                </figure>
                <p>Temperature: <span id="temp-2"></span></p>
            </div>
            <div class="day-box">
                <h4 id="day-03">${WEEKDAYS[(new Date().getDay() + 3) % 7]}</h4>
                <figure>
                    <img id="weather-icon-3" src="" alt="">
                    <figcaption id="figcaption-3"></figcaption>
                </figure>
                <p>Temperature: <span id="temp-3"></span></p>
            </div>
        </div>
    `;
    weatherForecast.appendChild(forecast);

    const dailyForecasts = forecastData.list.slice(0, 3);
    dailyForecasts.forEach((dailyData, index) => {
        const iconElement = document.getElementById(`weather-icon-${index + 1}`);
        const figcaptionElement = document.getElementById(`figcaption-${index + 1}`);
        const tempElement = document.getElementById(`temp-${index + 1}`);

        if (iconElement) {
            iconElement.src = `https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`;
        }
        if (figcaptionElement) {
            figcaptionElement.textContent = dailyData.weather[0].description;
        }
        if (tempElement) {
            tempElement.textContent = `${parseFloat(dailyData.main.temp).toFixed(0)}°C`;
        }
    });
}

async function fetchAndDisplayEvents() {
    const eventsData = await fetchData("data/events.json");
    if (!eventsData || !eventsData.events) {
        const eventsContainer = document.getElementById("events-list");
        if (eventsContainer) {
            eventsContainer.innerHTML = "<p>No upcoming events at this time.</p>";
        }
        return;
    }

    const events = eventsData.events.sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
    const eventsContainer = document.getElementById("events-list");
    if (!eventsContainer) return; 

    eventsContainer.innerHTML = "";

    if (events.length === 0) {
        eventsContainer.innerHTML = "<p>No upcoming events at this time.</p>";
        return;
    }

    events.forEach((event) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${new Date(event.date).toDateString()}</p>
        `;
        eventsContainer.appendChild(eventElement);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await populatecompanyCards();
    await fetchAndDisplayCurrentWeather();
    await fetchAndDisplayWeatherForecast();
    await fetchAndDisplayEvents();
});