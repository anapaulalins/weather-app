const api = {
    key: '68d8c5952c97168dbf3079b0c943fb12',
    baseUrl: 'https://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-input')
searchBox.addEventListener('keypress', setQuery)

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value)
        console.log(searchBox.value, event)
        searchBox.value = null
    }

}

function getResults(event) {
    fetch(`${api.baseUrl}weather?q=${event}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json()
        }).then(diplayResults)
}

function diplayResults(weather) {
    console.log(weather)
    const city = document.querySelector('.city')
    city.innerHTML = `${weather.name}, ${weather.sys.country}`

    const now = new Date()
    const date = document.querySelector('.date')
    date.innerHTML = dateBuilder(now)

    const temp = document.querySelector('.temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`

    const weatherCity = document.querySelector('.weather')
    weatherCity.innerHTML = `${weather.weather[0].main}`

    const feelsLike = document.querySelector('.feels-like')
    feelsLike.innerHTML = `Feels like: ${Math.round(weather.main.feels_like)}°c`

    const maxMinTemp = document.querySelector('.max-min-temp')
    maxMinTemp.innerHTML = `${Math.round(weather.main.temp_min)}°c / 
        ${Math.round(weather.main.temp_max)}°c`
}

function dateBuilder(date) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'Octuber', 'November', 'December']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday']

    let day = days[date.getDay()]
    let dateDay = date.getDate()
    let month = months[date.getMonth()]
    let year = date.getFullYear()

    return `${day} ${dateDay} ${month} ${year}`
}


