// Const
const aboutDiv = document.querySelector('#about')

// Fetch
function fetchSingleCity(city) {
    let originalCityStr = city
    if (city.includes(' ')) {
        let cityArray = city.split(' ')
        city = cityArray.join('_')
    }

    fetch(`https://goweather.herokuapp.com/weather/${city}`)
    .then(res => res.json())
    .then(json => {
        renderWeather(json)
        fetchComments(originalCityStr)
    })
}

function fetchComments(city) {
    fetch(`http://localhost:3000/city/`)
    .then(res => res.json())
    .then(json => { 
        let cityMatch = json.find(eachCity => eachCity.name === city)
        renderComments(cityMatch)
    })
}

// Render
function renderWeather(city) {
    let fTemperature = (city.temperature).split(' ')[0]
    let newTemp = (fTemperature * 9/5) + 32
    let mWind = (city.wind).split(' ')[0]
    let wind = mWind / 1.69
    console.log(wind.toFixed(2))
    //let wind = mWind / partFloat.(kmToMi)

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
    
    const imageSelection = (city) => {
        if (city.description.includes('Sun') || (city.description.includes('Cle'))) {
            return 'images/sun.png'
        } else if (city.description.includes('clo')) {
            return 'images/partlycloudy.png'
        } else if (city.description.includes('rain') || city.description.includes('Rain')) {
            return 'images/rain.png'
        } else if (city.description.includes('snow')) {
            return 'images/snow.png'
        } else {
            return 'images/defaultcloud.png'
        }
    }

    descriptionImage.src = imageSelection(city)

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
    aboutDiv.append(weatherContainer, buttonContainer)

    commentButton.addEventListener('click', () => {
        let divForm = document.createElement('div')

        divForm.className = 'inputDiv'
        commentButton.setAttribute('disabled', 'disabled')

        inputForm.append(commentInput, submitInput)
        divForm.append(inputForm)
        aboutDiv.append(divForm)
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
        aboutDiv.append(commentDiv)

        likeButton.addEventListener('click', () => {
            likeButton.textContent = `Likes: ${likes++}`
        })

        dislikeButton.addEventListener('click', () => {
            dislikeButton.textContent = `Dislikes: ${dislikes++}`
        })

        divForm.remove()
    })
}

function renderComments(city) {
    console.log(city)
    let likes = 0
    let dislikes = 0

    let commentButton = document.querySelector('.commentButton')

    let commentDiv = document.createElement('div')
    let liComment = document.createElement('li')
    let likeButton = document.createElement('button')
    let dislikeButton = document.createElement('button')

    likeButton.className = 'likeButton'
    dislikeButton.className = 'dislikeButton'
    commentDiv.className = 'commentDiv'

    liComment.textContent = city.comments[0].content
    likeButton.textContent = `Likes: ${likes}`
    dislikeButton.textContent = `Dislikes: ${dislikes}`
    commentButton.removeAttribute('disabled', 'disabled')

    liComment.style.listStyle = 'none'
    commentDiv.append(liComment, likeButton, dislikeButton)
    aboutDiv.append(commentDiv)

    likeButton.addEventListener('click', () => {
        likeButton.textContent = `Likes: ${likes++}`
    })

    dislikeButton.addEventListener('click', () => {
        dislikeButton.textContent = `Dislikes: ${dislikes++}`
    })
}

// Helper Function


// Event Listener
document.querySelector('#aboutThisApp').addEventListener('click', () => {

    let hR = document.createElement('hr')
    let hRTwo = document.createElement('hr')
    let hTwo = document.createElement('h2')
    let pContent = document.createElement('p')
    let pCreators = document.createElement('p')

    aboutDiv.innerHTML = ''
    pCreators.style.color = '#fb8b24'
    pContent.style.color = '#F1F1F1'
    pContent.style.color = '#F1F1F1'
    hTwo.style.color = '#F1F1F1'
    hTwo.textContent = 'About This App'
    pContent.textContent = 'The purpose of this project was to create a crowd-sourced weather reporting application. Similar to how Waze functions, we wanted users to be able to report on current weather conditions in real-time. Weather predictions are just that -- predictions. Any given weather prediction application might tell you that it is cloudy outside, but in reality it is raining right outside your door. With this in mind, we have created Dead Ass for those who may be stuck in some building and do not want to miss out on the rain.'

    pCreators.textContent = 'Created by Vincent Baylon and Trevor Zylks'

    aboutDiv.append(hTwo, hR, hRTwo, pContent, pCreators)
})

document.querySelector('#resources').addEventListener('click', () => {
    let hR = document.createElement('hr')
    let hRTwo = document.createElement('hr')
    let hTwo = document.createElement('h2')
    let pContent = document.createElement('p')

    aboutDiv.innerHTML = ''

    hTwo.style.color = '#F1F1F1'
    hTwo.textContent = 'Resources'
    pContent.textContent = 'Dead Ass'

    aboutDiv.append(hTwo, hR, hRTwo, pContent)
})

document.querySelector('#contact').addEventListener('click', () => {
    let hR = document.createElement('hr')
    let hRTwo = document.createElement('hr')
    let hTwo = document.createElement('h2')
    let pContent = document.createElement('p')

    aboutDiv.innerHTML = ''

    hTwo.style.color = '#F1F1F1'
    hTwo.textContent = 'Contact'
    pContent.textContent = 'Dead Ass'

    aboutDiv.append(hTwo, hR, hRTwo, pContent)
})

// Patch Comment
function patchComment(city, comment) {
    fetch(`http://localhost:3000/1/${city.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comments: comment
        })
    })
    .then(res => res.json())
    .then(json => json)
}

// Initial Render
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

