import { apiKey, hourlyList } from './constants.js'

const lat = 55.751244
const lon = 37.618423

export function fetchHourlyWeather() {
	const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Error: ${response.status} - ${response.statusText}`)
			}
			return response.json()
		})
		.then(data => {
			displayNextThreeHoursWeather(data.list) // передаем данные
		})
		.catch(error => {
			console.error('Error fetching data:', error)
		})
}

function displayNextThreeHoursWeather(hourlyData) {
	hourlyList.textContent = '' // убедитесь, что hourlyList ссылается на существующий элемент

	const nextThreeHours = hourlyData.slice(0, 3)

	nextThreeHours.forEach(hourData => {
		const date = new Date(hourData.dt * 1000)

		const time = date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		})
		const temp = Math.round(hourData.main.temp) // доступ к данным температуры
		const feelsLike = Math.round(hourData.main.feels_like) // доступ к данным "ощущается как"
		const description = hourData.weather[0].description
		const iconCode = hourData.weather[0].icon
		const weatherIconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`

		createDomElements(time, temp, feelsLike, description, weatherIconUrl)
	})
}

function createDomElements(time, temp, feelsLike, description, weatherIconUrl) {
	const hourlyItem = document.createElement('li')
	const hour = document.createElement('p')
	const temperature = document.createElement('p')
	const feels = document.createElement('p')
	const weatherImg = document.createElement('img')

	hourlyItem.className = 'weather__information-hourly'
	hour.className = 'hour'
	temperature.className = 'temperature'
	feels.className = 'feels'
	weatherImg.classList = 'weather__hourly-icon'

	hour.textContent = time
	temperature.textContent = `Temperature: ${temp}°C`
	feels.textContent = `Feels like: ${feelsLike}°C`
	weatherImg.src = weatherIconUrl
	weatherImg.alt = description

	hourlyList.appendChild(hourlyItem)
	hourlyItem.appendChild(hour)
	hourlyItem.appendChild(temperature)
	hourlyItem.appendChild(feels)
	hourlyItem.appendChild(weatherImg)
}
