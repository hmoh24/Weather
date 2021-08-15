const mainDiv = document.querySelector('#current');
const cityName = document.querySelector('#cityName');
const weather = document.querySelector('#weather');
const time = document.querySelector('#time');
const temp = document.querySelector('#temp');
const tempMin = document.querySelector('#tempMin');
const tempMax = document.querySelector('#tempMax');
const humidity = document.querySelector('#humidity');
const pressure = document.querySelector('#pressure');
const windSpeed = document.querySelector('#windSpeed');
const form = document.querySelector('form');
const input = document.querySelector('input');
const submit = document.querySelector('#submit');
const dailyDiv = document.querySelector('#dailyBox');

function getCurrentWeather (city){
    let coord = {};
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c4c3da16d8dd1a6f355c9a526854dc0&units=metric`
    fetch(url, {mode:'cors'})
    .then(function(response){
        return response.json();
    })
    .then(function(response){
        console.log(response);
        cityName.textContent = city.toUpperCase();
        weather.textContent = response.weather[0].main;
        time.textContent = 'TBA time';
        temp.textContent = `${response.main.temp}`;
        tempMin.textContent = `Min: ${response.main.temp_min}°C`;
        tempMax.textContent = `Max: ${response.main.temp_max}°C`;
        humidity.textContent = `Humidity: ${response.main.humidity}%`;
        pressure.textContent = `Pressure: ${response.main.pressure}`;
        windSpeed.textContent = `Wind speed: ${response.wind.speed}`;
        coord.longitude = response.coord.lon;
        coord.latitude = response.coord.lat;
        console.log(coord);
        return coord
    })
    .then(function(response){
        getForecastWeather(coord.latitude, coord.longitude);
    })
    .catch(function(err){
        console.log(err);
    })
    // console.log(coord);
    return coord
};


function getForecastWeather(lat, long){
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,alerts&appid=7c4c3da16d8dd1a6f355c9a526854dc0&units=metric`
    fetch(url, {mode:'cors'})
    .then(function(response){
        console.log('hi');
        return response.json();
    })
    .then(function(response){
        console.log(response);
        renderDailyData(response);
    })
}

function renderDailyData(object){
    object.daily.forEach( (day, index) => {
        if (index === 0){return};
        const div = document.createElement('div');
        div.style.width = '15rem';
        div.style.height = '15rem';
        div.style.backgroundColor = '#985E6D';
        div.style.margin = '1rem';
        dailyDiv.appendChild(div);
    })
}

getCurrentWeather('london');
// getForecastWeather(coord.latitude, coord.longitude);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = input.value;
    getCurrentWeather(city);

})







// function elementCreate(name, id, element){
//     const createdElement = document.createElement(element);
//     createdElement.textContent = 'placehold';
//     createdElement.setAttribute('id', `city${id}`);
//     mainDiv.appendChild(createdElement);
// }

// function weatherBoxCreate(){
//     elementCreate(1, 'h2', mainDiv);
//     elementCreate(2, 'h2', mainDiv);
// }

// weatherBoxCreate();







//return object function
//function to map that to DOM
//need to write out structure in html
