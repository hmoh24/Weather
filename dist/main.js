(()=>{document.querySelector("#current");const e=document.querySelector("#cityName"),t=document.querySelector("#weather"),n=(document.querySelector("#time"),document.querySelector("#temp")),o=document.querySelector("#tempMin"),r=document.querySelector("#tempMax"),c=document.querySelector("#humidity"),u=document.querySelector("#pressure"),d=document.querySelector("#windSpeed"),a=document.querySelector("form"),i=document.querySelector("input");document.querySelector("#submit"),document.querySelector("#dailyBox");let l=[...document.querySelectorAll(".daily")];const m=document.querySelector("#timeDay"),h=document.querySelector("#timeDate"),p=document.querySelector("#timeHour");let y=[...document.querySelectorAll(".hourly")];function s(a){let i={};return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=7c4c3da16d8dd1a6f355c9a526854dc0&units=metric`,{mode:"cors"}).then((function(e){return e.json()})).then((function(l){console.log(l),e.textContent=a.toUpperCase(),t.textContent=l.weather[0].main;let y=new Date(1e3*l.dt);return m.textContent=y.toLocaleString("en-UK",{weekday:"long"}),h.textContent=y.toLocaleString("en-UK",{month:"long",day:"numeric"}),p.textContent=`${y.toLocaleString("en-UK",{hour:"numeric"})}:00`,n.textContent=`${Math.round(l.main.temp)}`,o.textContent=`Min: ${Math.round(l.main.temp_min)}°C`,r.textContent=`Max: ${Math.round(l.main.temp_max)}°C`,c.textContent=`Humidity: ${l.main.humidity}%`,u.textContent=`Pressure: ${l.main.pressure}`,d.textContent=`Wind speed: ${l.wind.speed}`,i.longitude=l.coord.lon,i.latitude=l.coord.lat,i})).then((function(e){var t,n;t=i.latitude,n=i.longitude,fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${t}&lon=${n}&exclude=current,minutely,alerts&appid=7c4c3da16d8dd1a6f355c9a526854dc0&units=metric`,{mode:"cors"}).then((function(e){return e.json()})).then((function(e){console.log(e),e.daily.forEach(((e,t)=>{0!==t&&l.forEach((n=>{if(t===Number(n.id)){console.log(l[t-1].children);let n=new Date(1e3*e.dt);l[t-1].children[0].textContent=n.toLocaleString("en-UK",{weekday:"long"}),l[t-1].children[3].textContent=e.weather[0].main,l[t-1].children[4].textContent=`H: ${Math.round(e.temp.max)}°C`,l[t-1].children[5].textContent=`L: ${Math.round(e.temp.min)}°C`,e.hasOwnProperty("rain")&&(l[t-1].children[1].textContent=`Rain: ${100*e.pop}%`)}}))})),e.hourly.slice(1,25).forEach(((e,t)=>{let n=new Date(1e3*e.dt);y[t].children[0].textContent=`${n.toLocaleString("en-UK",{hour:"numeric"})}:00`,y[t].children[1].textContent=`${Math.round(e.temp)}°C`,y[t].children[2].textContent=`Rain: ${e.pop}%`,y[t].children[4].textContent=e.weather[0].main}))}))})).catch((function(e){console.log(e)})),i}s("london"),a.addEventListener("submit",(e=>{e.preventDefault(),s(i.value)}))})();