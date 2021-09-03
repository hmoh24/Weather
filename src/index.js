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
const weatherIcon = document.querySelector('#weatherIcon');



async function displayWeather(city) {
    try {
        let coord = {};
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7c4c3da16d8dd1a6f355c9a526854dc0&units=metric`;
    
        const getCurrent = await fetch(url, {mode:'cors'});
    
        const currentWeatherData = await getCurrent.json();
        cityName.textContent = city.toUpperCase();
        if (city.length > 11) {cityName.style.fontSize = "1.5rem"}
        else {cityName.style.fontSize = "2rem"};
        weather.textContent = currentWeatherData.weather[0].main;
        weatherIcon.src = `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`;
        let dateObject = new Date ((currentWeatherData.dt)*1000);
        currentDay.textContent = dateObject.toLocaleString("en-UK", {weekday:"long"});
        currentDate.textContent = dateObject.toLocaleString("en-UK", {month:"long", day:"numeric"});
        currentHour.textContent = `${dateObject.toLocaleString("en-UK", {hour:"numeric"})}:00`;
        temp.textContent = `${Math.round(currentWeatherData.main.temp)}`;
        tempMin.textContent = `Min: ${Math.round(currentWeatherData.main.temp_min)}°C`;
        tempMax.textContent = `Max: ${Math.round(currentWeatherData.main.temp_max)}°C`;
        humidity.textContent = `Humidity: ${currentWeatherData.main.humidity}%`;
        pressure.textContent = `Pressure: ${currentWeatherData.main.pressure} hPa`;
        windSpeed.textContent = `Wind speed: ${currentWeatherData.wind.speed} m/s`;
        coord.longitude = currentWeatherData.coord.lon;
        coord.latitude = currentWeatherData.coord.lat;
            
        const coordData = await currentWeatherData;
        getForecastWeather(coord.latitude, coord.longitude);
    }
    catch (error) {
        alert(`Unable to find data for ${city}, restting to default`);
        displayWeather('london');
    }
}





async function getForecastWeather(lat, long){
    try{
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,alerts&appid=7c4c3da16d8dd1a6f355c9a526854dc0&units=metric`
        const getData = await fetch(url, {mode:'cors'});
        const processData = await getData.json();
        const displayData = await processData;
        renderDailyData(displayData);
        renderHourlyData(displayData)
    }
    catch (error) {
        alert(`Unable to find data for ${city}, restting to default`);
        displayWeather('london');
    }
}

function renderDailyData(object){
    object.daily.forEach( (day, index) => {
        if (index === 0){return};
        dailyArray.forEach(x=>{
            if (index === Number(x.id)){
                console.log(dailyArray[index-1].children);
                let dateObject = new Date ((day.dt)*1000);
                dailyArray[index-1].children[0].textContent = dateObject.toLocaleString("en-UK", {weekday:"long"}); //date
                dailyArray[index-1].children[2].src = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
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
        hourlyArray[index].children[4].textContent = `${Math.round(hour.temp)}°C`;
        hourlyArray[index].children[2].src = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`
        hourlyArray[index].children[1].textContent = `Rain: ${Math.round((hour.pop)*100)}%`;
        hourlyArray[index].children[3].textContent = hour.weather[0].main;
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let city = input.value;
    displayWeather(city);
});

displayWeather('london');





