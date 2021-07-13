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

console.log('Vince, what up, g')

// Render
function renderWeather(city) {
    let fTemperature = (city.temperature).split(' ')[0]
    let newTemp = (fTemperature * 9/5) + 32

    let div = document.querySelector('#about')

    let weatherContainer = document.createElement('div')
    let liDescription = document.createElement('li')
    let liTemperature = document.createElement('li')
    let liWind = document.createElement('li')
    let commentButton = document.createElement('button')
    let inputForm = document.createElement('form')
    let commentInput = document.createElement('input')
    let submitInput = document.createElement('input')

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

    liDescription.textContent = city.description
    liTemperature.textContent = `${newTemp} ℉`
    liWind.textContent = city.wind
    commentButton.textContent = 'Comment'

    weatherContainer.append(liDescription, liTemperature, liWind, commentButton)
    div.append(weatherContainer)

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

