const weather=document.querySelector('.js-weather');
const COORDS='coords';
const API_KEY='your-api-key';

function getWeather(lat, lng){
    fetch(`your-url`)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature=json.main.temp;
        const palce=json.name;
        weather.innerText=`${temperature} @ ${place}`;
    })

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSucces(position){
    const latitude=position.coords.latitude;
    const longitude=position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
};



function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
};

function loadCoords(){
    const loadedCords=localStorage.getItem(COORDS);
    if (loadedCords===null){
        askForCoords();
    }else{
        const parseCoords=JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();