import { weatherList } from './constants.js'

const likedCity = []

export function addCity(city) {
	if (!city) {
		alert('Please enter a city name.')
		return
	}

	if (likedCity.find(c => c.name === city)) {
		alert('This city is already in the list.')
		return
	}

	createDomElements(city)

	likedCity.push({ name: city })
}

export function deleteCity(event) {
	if (
		event.target.classList.contains('fa') &&
		event.target.classList.contains('fa-times')
	) {
		const toDoItem = event.target.closest('.weather__item')
		const city = toDoItem.textContent

		const cityIndex = likedCity.findIndex(item => item.name === city)
		if (cityIndex !== -1) {
			likedCity.splice(cityIndex, 1)
		}

		toDoItem.remove()
	}
}

function createDomElements(city) {
	const weatherItem = document.createElement('li')
	const faClose = document.createElement('i')

	weatherItem.className = 'weather__item'
	faClose.className = 'fa fa-times'
	weatherItem.textContent = city

	weatherList.appendChild(weatherItem)
	weatherItem.appendChild(faClose)
}
