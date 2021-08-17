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
let dailyArray = [...document.querySelectorAll('.daily')];
const currentDay = document.querySelector('#timeDay');
const currentDate = document.querySelector('#timeDate');
const currentHour = document.querySelector('#timeHour');
let hourlyArray = [...document.querySelectorAll('.hourly')];


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
        let dateObject = new Date ((response.dt)*1000);
        currentDay.textContent = dateObject.toLocaleString("en-UK", {weekday:"long"});
        currentDate.textContent = dateObject.toLocaleString("en-UK", {month:"long", day:"numeric"});
        currentHour.textContent = `${dateObject.toLocaleString("en-UK", {hour:"numeric"})}:00`;
        temp.textContent = `${Math.round(response.main.temp)}`;
        tempMin.textContent = `Min: ${Math.round(response.main.temp_min)}°C`;
        tempMax.textContent = `Max: ${Math.round(response.main.temp_max)}°C`;
        humidity.textContent = `Humidity: ${response.main.humidity}%`;
        pressure.textContent = `Pressure: ${response.main.pressure}`;
        windSpeed.textContent = `Wind speed: ${response.wind.speed}`;
        coord.longitude = response.coord.lon;
        coord.latitude = response.coord.lat;
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
        return response.json();
    })
    .then(function(response){
        console.log(response);
        renderDailyData(response);
        renderHourlyData(response);
    })
}

function renderDailyData(object){
    object.daily.forEach( (day, index) => {
        if (index === 0){return};
        dailyArray.forEach(x=>{
            if (index === Number(x.id)){
                console.log(dailyArray[index-1].children);
                let dateObject = new Date ((day.dt)*1000);
                dailyArray[index-1].children[0].textContent = dateObject.toLocaleString("en-UK", {weekday:"long"}); //date
                dailyArray[index-1].children[3].textContent = day.weather[0].main;  //weather
                dailyArray[index-1].children[4].textContent = `H: ${Math.round(day.temp.max)}°C`; //max temp
                dailyArray[index-1].children[5].textContent = `L: ${Math.round(day.temp.min)}°C`; //min temp
                if (day.hasOwnProperty('rain')){
                    dailyArray[index-1].children[1].textContent = `Rain: ${(day.pop)*100}%`; //precipitation chance
                }
            }
        })
    })
}

function renderHourlyData(object){
    let objectArray = object.hourly.slice(1,25);
    objectArray.forEach( (hour, index) => {
        let dateObject = new Date ((hour.dt)*1000);
        hourlyArray[index].children[0].textContent = `${dateObject.toLocaleString("en-UK", {hour:"numeric"})}:00`;
        hourlyArray[index].children[1].textContent = `${Math.round(hour.temp)}°C`;
        hourlyArray[index].children[2].textContent = `Rain: ${hour.pop}%`;
        hourlyArray[index].children[4].textContent = hour.weather[0].main;
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
