import { DateTime } from "luxon";

const API_KEY = '57f7f35c09eeee8df76a7e8c0e308d40';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid: API_KEY})

    return fetch(url)
    .then(res => res.json())
}

const formatCurrentWeather = (data) => {
    const {
        coord: {lat, lon},
        main: {temp, feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data;

    const {main: details, icon} = weather[0]

    return {lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed}
}

const formatFocastWeather = (data) => {
    let {list, timezone} = data;
    const daily = list?.slice(1,6).map(d => {
        return {
            title: d.dt_txt,
            temp: d.main.temp,
            icon: d.weather[0].icon
        }
    })

    const hourly = list?.slice(1,6).map(d => {
        return {
            title: d.dt_txt,
            temp: d.main.temp,
            icon: d.weather[0].icon
        }
    })

    return { timezone, daily, hourly }
}

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams)
    .then(formatCurrentWeather)

    const {lat, lon} = formattedCurrentWeather

    const formattedFocastWeather = await getWeatherData('forecast', {
        lat, lon, exclude: 'current, minutely, alerts', units: searchParams.units
    }).then(formatFocastWeather)

    return {...formattedCurrentWeather, ...formattedFocastWeather}
}

const formatToLocalTime = (
    secs, 
    zone, 
    format ) => {
        DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
}

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData

export {formatToLocalTime, iconUrlFromCode}