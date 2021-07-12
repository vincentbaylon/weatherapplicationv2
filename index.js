function fetchWeather(city) {
    if (city.includes(' ')) {
        let cityArray = city.split(' ')
        city = cityArray.join('_')
    }
    console.log(`CITY: ${city}`)
    fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then(res => res.json())
    .then(console.log)
}

fetchWeather('San Francisco')