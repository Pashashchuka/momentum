const weatherIconEl = document.querySelector('.weather-icon')
const temperatureEl = document.querySelector('.temperature')
const weatherDescriptionEl = document.querySelector('.weather-description')
const windEl = document.querySelector('.wind')
const humidityEl = document.querySelector('.humidity')
const city = document.querySelector('.city')

const wheaterUrl = 'https://api.openweathermap.org/data/2.5/'
const token = '233cf231c85de0e762b3f02e3b7776f6'

const getWeather = async () => {
  const defaultCity = city?.value || 'Minsk'
  const url = `${wheaterUrl}weather?q=${defaultCity}&lang=en&appid=${token}&units=metric`

  const data = await (await fetch(url)).json()

  if (!data) return

  const { weather, main, wind } = data

  const temperature = main.temp.toFixed(0)
  const description = weather[0].description
  const speed = wind.speed.toFixed(0)
  const humidity = main.humidity
  const weatherIconId = weather[0].id

  weatherIconEl.className = 'weather-icon owf'
  weatherIconEl.classList.add(`owf-${weatherIconId}`)

  windEl.textContent = `Wind speed: ${speed} m/s`
  humidityEl.textContent = `Humidity: ${humidity}%`
  temperatureEl.textContent = `${temperature}°C ${description}`
}
getWeather()

city.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeather()
  }
})
