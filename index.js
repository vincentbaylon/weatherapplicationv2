// Const
const aboutDiv = document.querySelector('#about')
let currentCity = ''
let currentCityArray = []

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
        
        if (cityMatch.comments === undefined){
            
        } else {
            cityMatch.comments.forEach(eachComment => {
                comments()
                comments.renderComments(eachComment)
            })
            currentCityArray = cityMatch.comments
        }
    })
}

// Patch
function patchCommentArray(city) {
    fetch(`http://localhost:3000/city/${city.id}`)
    .then(res => res.json())
    .then(json => json.comments)
}

function postCity(city) {
    fetch('http://localhost:3000/city/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: city,
            comments: []
        })
    })
    .then(res => res.json())
    .then(json => currentCity = json)
}

function patchComment(city, commentArray) {
    fetch(`http://localhost:3000/city/${city.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            comments: commentArray
        })
    })
    .then(res => res.json())
    .then(json => json)
}

// Check function
function fetchCheck(city) {
    fetch(`http://localhost:3000/city/`)
    .then(res => res.json())
    .then(json => { 
        let cityMatch = json.find(eachCity => eachCity.name === city)
        if (cityMatch === undefined) {
         postCity(city)
        } else {
            currentCity = cityMatch
        }
    })
}

// Render
function renderWeather(city) {
    let fTemperature = (city.temperature).split(' ')[0]
    let newTemp = (fTemperature * 9/5) + 32
    let mWind = (city.wind).split(' ')[0]
    let wind = mWind / 1.69

    let commentContainer = document.createElement('div')
    let buttonContainer = document.createElement('div')
    let weatherContainer = document.createElement('div')
    let liDescription = document.createElement('li')
    let liTemperature = document.createElement('li')
    let liWind = document.createElement('li')
    let commentButton = document.createElement('button')
    let hr = document.createElement('hr')
    
    let descriptionSpan = document.createElement('span')
    let temperatureSpan = document.createElement('span')
    let windSpan = document.createElement('span')
    let descriptionImage = document.createElement('img')
    let temperatureImage = document.createElement('img')
    let windImage = document.createElement('img')

    commentContainer.className = 'commentContainer'
    buttonContainer.className = 'buttonContainer'
    weatherContainer.className = 'weatherContainer'
    liDescription.style.listStyle = 'none'
    liTemperature.style.listStyle = 'none'
    liWind.style.listStyle = 'none'
    liDescription.style.textAlign = 'left'
    liTemperature.style.textAlign = 'left'
    liWind.style.textAlign = 'left'
    commentButton.className = 'commentButton'
    
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
    aboutDiv.append(weatherContainer, hr, buttonContainer, commentContainer)

    commentButton.addEventListener('click', () => {
        clickCommentButton(city)
    })
}

// Function for clicking comment button
function clickCommentButton(city) {
    let buttonContainer = document.querySelector('.buttonContainer')
    let commentButton = document.querySelector('.commentButton')

    let inputForm = document.createElement('form')
    let divForm = document.createElement('div')
    let commentInput = document.createElement('input')
    let submitInput = document.createElement('input')

    commentInput.setAttribute('type', 'text')
    commentInput.setAttribute('name', 'comment')
    submitInput.setAttribute('type', 'submit')
    submitInput.setAttribute('value', 'Add Comment')
    divForm.className = 'inputDiv'
    commentButton.setAttribute('disabled', 'disabled')

    inputForm.append(commentInput, submitInput)
    divForm.append(inputForm)
    buttonContainer.append(divForm)

    inputForm.addEventListener('submit', (e) => {
        e.preventDefault()

        comments()
        comments.submitComment(e)
    })
}


// Helper Function
function comments() {
    let likes = 0
    let dislikes = 0

    let commentContainer = document.querySelector('.commentContainer')
    let commentButton = document.querySelector('.commentButton')

    let timeDiv = document.createElement('div')
    let commentDiv = document.createElement('div')
    let buttonDiv = document.createElement('div')
    let liComment = document.createElement('li')
    let likeButton = document.createElement('button')
    let dislikeButton = document.createElement('button')
    let liTime = document.createElement('li')

    likeButton.className = 'likeButton'
    dislikeButton.className = 'dislikeButton'
    commentDiv.className = 'commentDiv'
    buttonDiv.className = 'buttonDiv'
    timeDiv.className = 'timeDiv'

    likeButton.style.backgroundImage = "url('images/thumbsup.png')"
    likeButton.style.backgroundSize = '95%'
    dislikeButton.style.backgroundImage = 'url(images/thumbsdown.png)'
    dislikeButton.style.backgroundSize = '95%'
    liComment.style.listStyle = 'none'
    liTime.style.listStyle = 'none'

    likeButton.addEventListener('click', () => {
        likeButton.style.backgroundImage = ""
        likeButton.textContent = `+ ${likes+=1}`
    })

    dislikeButton.addEventListener('click', () => {
        dislikeButton.style.backgroundImage = ""
        dislikeButton.textContent = `- ${dislikes+=1}`
    })

    function renderComments(city) {
        liComment.textContent = city.content
        liTime.textContent = city.time
    
        liComment.style.listStyle = 'none'
        liTime.style.listStyle = 'none'

        appends()
    }

    function submitComment(e) {
        let divForm = document.querySelector('.inputDiv')
        
        liComment.textContent = e.target.comment.value
        liTime.textContent = new Date(Date.now()).toLocaleString()
    
        liComment.style.listStyle = 'none'
        liTime.style.listStyle = 'none'

        commentButton.removeAttribute('disabled', 'disabled')

        appends()
    
        divForm.remove()
    
        let idNumber = currentCityArray.length
    
        let newObject = {
            'id': idNumber+=1,
            'content': liComment.textContent,
            'cityId': currentCity.id,
            'time': new Date(Date.now()).toLocaleString()
        }
        
        currentCityArray.push(newObject)
        
        patchComment(currentCity, currentCityArray)
    }

    function appends() {
        timeDiv.append(liTime)
        commentDiv.append(liComment, timeDiv)
        buttonDiv.append(likeButton, dislikeButton)
        commentContainer.prepend(commentDiv, buttonDiv)
    }

    comments.renderComments = renderComments
    comments.submitComment = submitComment
}

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
    pContent.innerHTML =  "<p style='color: rgb(241, 241, 241)'>API: <a style='color: rgb(251, 139, 36)' href='https://github.com/robertoduessmann/weather-api'>Github</a></p><p style='color: rgb(241, 241, 241)'>Icons used: <a style='color: rgb(251, 139, 36)' href='https://icons8.com/icons/set/weather'>Icons8</a></p><p style='color: rgb(241, 241, 241)'>Logo: <a style='color: rgb(251, 139, 36)' href='https://canva.com/'> Canva </a>"


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
    pContent.innerHTML = "<p style='color: rgb(241, 241, 241)'>Trevor's Repos: <a style='color: rgb(251, 139, 36)' href='https://github.com/tzylks'>Github</a><p style='color: rgb(241, 241, 241)'>Vince's Repos: <a style='color: rgb(251, 139, 36)' href='https://github.com/vincentbaylon'>Github</a>" 
    aboutDiv.append(hTwo, hR, hRTwo, pContent)
})

document.querySelector('#homePage').addEventListener('click', () => {
    aboutDiv.innerHTML = ''
})

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
    searchInput.style.textTransform = 'capitalize'

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
        
        fetchCheck(city)
    })
}

initialForm()