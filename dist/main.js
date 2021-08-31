(()=>{document.querySelector("#current");const e=document.querySelector("#cityName"),t=document.querySelector("#weather"),n=(document.querySelector("#time"),document.querySelector("#temp")),o=document.querySelector("#tempMin"),r=document.querySelector("#tempMax"),c=document.querySelector("#humidity"),a=document.querySelector("#pressure"),i=document.querySelector("#windSpeed"),u=document.querySelector("form"),d=document.querySelector("input");document.querySelector("#submit"),document.querySelector("#dailyBox");let l=[...document.querySelectorAll(".daily")];const m=document.querySelector("#timeDay"),h=document.querySelector("#timeDate"),p=document.querySelector("#timeHour");let s=[...document.querySelectorAll(".hourly")];const y=document.querySelector("#weatherIcon");function x(u){let d={};return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${u}&appid=7c4c3da16d8dd1a6f355c9a526854dc0&units=metric`,{mode:"cors"}).then((function(e){return e.json()})).then((function(l){console.log(l),e.textContent=u.toUpperCase(),u.length>11?e.style.fontSize="1.5rem":e.style.fontSize="2rem",t.textContent=l.weather[0].main,y.src=`https://openweathermap.org/img/wn/${l.weather[0].icon}@2x.png`;let s=new Date(1e3*l.dt);return m.textContent=s.toLocaleString("en-UK",{weekday:"long"}),h.textContent=s.toLocaleString("en-UK",{month:"long",day:"numeric"}),p.textContent=`${s.toLocaleString("en-UK",{hour:"numeric"})}:00`,n.textContent=`${Math.round(l.main.temp)}`,o.textContent=`Min: ${Math.round(l.main.temp_min)}°C`,r.textContent=`Max: ${Math.round(l.main.temp_max)}°C`,c.textContent=`Humidity: ${l.main.humidity}%`,a.textContent=`Pressure: ${l.main.pressure}`,i.textContent=`Wind speed: ${l.wind.speed}`,d.longitude=l.coord.lon,d.latitude=l.coord.lat,d})).then((function(e){var t,n;t=d.latitude,n=d.longitude,fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${t}&lon=${n}&exclude=current,minutely,alerts&appid=7c4c3da16d8dd1a6f355c9a526854dc0&units=metric`,{mode:"cors"}).then((function(e){return e.json()})).then((function(e){console.log(e),e.daily.forEach(((e,t)=>{0!==t&&l.forEach((n=>{if(t===Number(n.id)){console.log(l[t-1].children);let n=new Date(1e3*e.dt);l[t-1].children[0].textContent=n.toLocaleString("en-UK",{weekday:"long"}),l[t-1].children[2].src=`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`,l[t-1].children[3].textContent=e.weather[0].main,l[t-1].children[4].textContent=`H: ${Math.round(e.temp.max)}°C`,l[t-1].children[5].textContent=`L: ${Math.round(e.temp.min)}°C`,e.hasOwnProperty("rain")&&(l[t-1].children[1].textContent=`Rain: ${100*e.pop}%`)}}))})),e.hourly.slice(1,25).forEach(((e,t)=>{let n=new Date(1e3*e.dt);s[t].children[0].textContent=`${n.toLocaleString("en-UK",{hour:"numeric"})}:00`,s[t].children[4].textContent=`${Math.round(e.temp)}°C`,s[t].children[2].src=`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`,s[t].children[1].textContent=`Rain: ${Math.round(100*e.pop)}%`,s[t].children[3].textContent=e.weather[0].main}))}))})).catch((function(e){alert(`Unable to find data for ${u}, restting to default`),x("london")})),d}u.addEventListener("submit",(e=>{e.preventDefault(),x(d.value)})),x("london")})();