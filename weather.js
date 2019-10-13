const API_KEY = "b49bb8c67f7c1d8a0ae3f35f6f611e6a";
const weather = document.querySelector(".js_weather");
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            return response.json();
        }).then(function (myJson) {
            const temperature = myJson.main.temp;
            const name = myJson.name;
            weather.innerHTML = `${temperature} @ ${name}`
        })
};

function saveCoords(coords) {
    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        // same with latitude: "latitude",
        longitude
    }
    saveCoords(coordsObj)
    getWeather(latitude, longitude);
}

function handleGeoError() {
    alert("Can't access to your location");
}

function askForCoords() {
    const location = navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }

}

function init() {
    loadCoords();
};
init();