// Fetch
function fetchSingleCity(city) {
    if (city.includes(' ')) {
        let cityArray = city.split(' ')
        city = cityArray.join('_')
    }

    fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then(res => res.json())
    .then(renderWeather)
}

// fetchSingleCity('San Francisco')

// Render
function renderWeather(city) {
    let fTemperature = (city.temperature).split(' ')[0]
    let newTemp = (fTemperature * 9/5) + 32

    let div = document.querySelector('#about')

    let liDescription = document.createElement('li')
    let liTemperature = document.createElement('li')
    let liWind = document.createElement('li')
    let commentButton = document.createElement('button')
    let inputForm = document.createElement('form')
    let commentInput = document.createElement('input')
    let submitInput = document.createElement('input')

    liDescription.style.listStyle = 'none'
    liTemperature.style.listStyle = 'none'
    liWind.style.listStyle = 'none'
    liDescription.style.textAlign = 'left'
    liTemperature.style.textAlign = 'left'
    liWind.style.textAlign = 'left'
    commentButton.className = 'commentButton'
    commentInput.setAttribute('type', 'text')
    commentInput.setAttribute('name', 'comment')
    submitInput.setAttribute('type', 'submit')
    submitInput.setAttribute('value', 'Add Comment')

    liDescription.textContent = city.description
    liTemperature.textContent = `${newTemp} ℉`
    liWind.textContent = city.wind
    commentButton.textContent = 'Comment'

    div.append(liDescription, liTemperature, liWind, commentButton)

    commentButton.addEventListener('click', () => {
        let divForm = document.createElement('div')

        divForm.className = 'inputDiv'

        inputForm.append(commentInput, submitInput)
        divForm.append(inputForm)
        div.append(divForm)
    })

    inputForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let likes = 0
        let dislikes = 0

        let liComment = document.createElement('li')
        let likeButton = document.createElement('button')
        let dislikeButton = document.createElement('button')

        liComment.textContent = e.target.comment.value
        likeButton.textContent = `Likes: ${likes}`
        dislikeButton.textContent = `Dislikes: ${dislikes}`

        div.append(liComment, likeButton, dislikeButton)

        likeButton.addEventListener('click', () => {
            likeButton.textContent = `Likes: ${likes++}`
        })

        dislikeButton.addEventListener('click', () => {
            dislikeButton.textContent = `Dislikes: ${dislikes++}`
        })
    })
}

function initialForm() {
    
}





// {temperature: "17 °C", wind: "20 km/h", description: "Partly cloudy", forecast: Array(3)}
// description: "Partly cloudy"
// forecast: Array(3)
// 0:
// day: "1"
// temperature: "17 °C"
// wind: "18 km/h"
// __proto__: Object
// 1: {day: "2", temperature: "15 °C", wind: "24 km/h"}
// 2: {day: "3", temperature: "+13 °C", wind: "26 km/h"}
// length: 3
// __proto__: Array(0)
// temperature: "17 °C"
// wind: "20 km/h"
// __proto__: Object