const COORDS = "coords";

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
        // getWeather();
    }

}

function init() {
    loadCoords();
};
init();