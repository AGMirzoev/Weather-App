import { checkWeather } from './js/checkWeather.js'
import { city, form, formInput, likeBtn, weatherList } from './js/constants.js'
import { addCity, deleteCity } from './js/likedCity.js'

function handleFormSubmit(event) {
	event.preventDefault()

	const cityName = formInput.value.trim()
	if (!cityName) {
		alert('Please enter a city name!')
		return
	}

	checkWeather(cityName)
}

form.addEventListener('submit', handleFormSubmit)
likeBtn.addEventListener('click', function () {
	const cityName = city.textContent.trim()
	addCity(cityName)
})
weatherList.addEventListener('click', function (event) {
	if (event.target.classList.contains('fa-times')) {
		deleteCity(event)
	}

	if (event.target.classList.contains('weather__item')) {
		const cityName = event.target.textContent.trim()
		checkWeather(cityName)
	}
})
