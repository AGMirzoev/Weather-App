import {
	apiKey,
	city,
	feelsLike,
	formInput,
	serverUrl,
	sunrise,
	sunset,
	temp,
	weatherIcon,
	weatherInfo,
	weatherList,
} from './constants.js'
import { fetchHourlyWeather } from './hourlyTemp.js'

export function checkWeather(cityName) {
	const url = `${serverUrl}&q=${cityName}&appid=${apiKey}`

	try {
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(`Error: ${response.status} - ${response.statusText}`)
				}

				return response.json()
			})
			.then(data => {
				city.textContent = data.name
				temp.innerHTML = Math.round(data.main.temp)
				feelsLike.innerHTML = `Feels like: ${Math.round(data.main.feels_like)}`

				showSunriseSunsetTime(data)
				showIcon(data)
			})
	} catch (error) {
		console.error('Error fetching data:', error)
	}

	showWeather()
	fetchHourlyWeather(cityName)
	formInput.value = ''
}

function showIcon(data) {
	const iconCode = data.weather[0].icon
	const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
	weatherIcon.src = iconUrl
	weatherIcon.alt = data.weather[0].description
}

function showWeather() {
	weatherInfo.style.display = 'block'
	weatherList.style.display = 'flex'
}

function showSunriseSunsetTime(data) {
	const sunriseTime = new Date(data.sys.sunrise * 1000)
	sunrise.textContent = `Sunrise: ${sunriseTime.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})}`

	const sunsetTime = new Date(data.sys.sunset * 1000)
	sunset.textContent = `Sunset: ${sunsetTime.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
	})}`
}
