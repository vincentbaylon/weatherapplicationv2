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

// Render
function renderWeather(city) {
    let fTemperature = (city.temperature).split(' ')[0]
    let newTemp = (fTemperature * 9/5) + 32
    let mWind = (city.wind).split(' ')[0]
    let wind = mWind / 1.69
    console.log(wind.toFixed(2))
    //let wind = mWind / partFloat.(kmToMi)

    let div = document.querySelector('#about')

    let buttonContainer = document.createElement('div')
    let weatherContainer = document.createElement('div')
    let liDescription = document.createElement('li')
    let liTemperature = document.createElement('li')
    let liWind = document.createElement('li')
    let commentButton = document.createElement('button')
    let inputForm = document.createElement('form')
    let commentInput = document.createElement('input')
    let submitInput = document.createElement('input')
    let descriptionSpan = document.createElement('span')
    let temperatureSpan = document.createElement('span')
    let windSpan = document.createElement('span')
    let descriptionImage = document.createElement('img')
    let temperatureImage = document.createElement('img')
    let windImage = document.createElement('img')

    buttonContainer.className = 'buttonContainer'
    weatherContainer.className = 'weatherContainer'
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
    descriptionImage.src = 'images/rain.png'
    descriptionImage.className = 'imageSpan'
    temperatureImage.src = 'images/farenheit.png'
    temperatureImage.className = 'imageSpan'
    windImage.src = 'images/wind.png'
    windImage.className = 'imageSpan'

    liDescription.textContent = city.description
    liTemperature.textContent = newTemp
    liWind.textContent = wind.toFixed(2) + "MPH"
    commentButton.textContent = 'Comment'

    descriptionSpan.append(descriptionImage, liDescription)
    temperatureSpan.append(temperatureImage, liTemperature)
    windSpan.append(windImage, liWind)
    buttonContainer.append(commentButton)
    weatherContainer.append(descriptionSpan, temperatureSpan, windSpan)
    div.append(weatherContainer, buttonContainer)

    commentButton.addEventListener('click', () => {
        let divForm = document.createElement('div')

        divForm.className = 'inputDiv'
        commentButton.setAttribute('disabled', 'disabled')

        inputForm.append(commentInput, submitInput)
        divForm.append(inputForm)
        div.append(divForm)
        commentButton.remove()
    })

    inputForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let likes = 0
        let dislikes = 0

        let commentDiv = document.createElement('div')
        let liComment = document.createElement('li')
        let likeButton = document.createElement('button')
        let dislikeButton = document.createElement('button')

        likeButton.className = 'likeButton'
        dislikeButton.className = 'dislikeButton'
        commentDiv.className = 'commentDiv'

        let divForm = document.querySelector('.inputDiv')

        liComment.textContent = e.target.comment.value
        likeButton.textContent = `Likes: ${likes}`
        dislikeButton.textContent = `Dislikes: ${dislikes}`
        commentButton.removeAttribute('disabled', 'disabled')

        liComment.style.listStyle = 'none'
        commentDiv.append(liComment, likeButton, dislikeButton)
        div.append(commentDiv)

        likeButton.addEventListener('click', () => {
            likeButton.textContent = `Likes: ${likes++}`
        })

        dislikeButton.addEventListener('click', () => {
            dislikeButton.textContent = `Dislikes: ${dislikes++}`
        })

        divForm.remove()
    })
}

function initialForm() {
    let div = document.querySelector('.searchDiv')

    let inputForm = document.createElement('form')
    let searchInput = document.createElement('input')
    let submitInput = document.createElement('input')

    inputForm.className = 'searchBar'
    searchInput.className = 'searchCity'
    submitInput.id = 'searchButton'
    searchInput.setAttribute('type', 'text')
    searchInput.setAttribute('name', 'search')
    submitInput.setAttribute('type', 'submit')
    submitInput.setAttribute('value', 'Search City')
    submitInput.style.height = '50px'

    inputForm.append(searchInput, submitInput)
    div.append(inputForm)

    inputForm.addEventListener('submit', (e) => {
        e.preventDefault()

        let aboutDiv = document.querySelector('#about')
        
        aboutDiv.innerHTML = ''
        let hR = document.createElement('hr')
        let hRTwo = document.createElement('hr')
        let hTwo = document.createElement('h2')

        hTwo.textContent = 'Current Weather in Your Area'

        document.querySelector('#about').append(hTwo, hR, hRTwo)

        let city = e.target.search.value
        
        fetchSingleCity(city)
    })
}

initialForm()

