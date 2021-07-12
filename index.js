// Fetch
function fetchSingleCity(city) {
    if (city.includes(' ')) {
        let cityArray = city.split(' ')
        city = cityArray.join('_')
    }
    console.log(`CITY: ${city}`)
    fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then(res => res.json())
    .then(renderWeather)

    // .then(json => renderWeather())
}

fetchSingleCity('San Francisco')

function fetchWeather() {
    fetch(`https://goweather.herokuapp.com/weather/`)
    .then(res => res.json())
    .then(console.log)
}

// Render
function renderWeather(city) {
    let div = document.querySelector('#about')

    let li = document.createElement('li')

    li.textContent = city.description
    
    div.append(li)
}