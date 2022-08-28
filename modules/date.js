const date = document.querySelector('.date')
const time = document.querySelector('.time')

const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' }

const timeOptions = {
  hour12: false,
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
}

const showDate = () => {
  const date = new Date()

  const currentDate = date.toLocaleDateString('en-US', dateOptions)
  const currentTime = date.toLocaleTimeString('eu-US', timeOptions)

  time.textContent = currentTime
  date.textContent = currentDate

  setTimeout(showDate, 1000)
}

showDate()
