import { TIME_OF_DAY } from './constants.js'

const greeting = document.querySelector('.greeting')

const hours = new Date().getHours()

export const getTimeOfDay = () => {
  if (hours >= 6 && hours < 12) return TIME_OF_DAY.MORNING
  if (hours >= 12 && hours < 17) return TIME_OF_DAY.AFTERNOON
  if (hours >= 17 && hours <= 23) return TIME_OF_DAY.EVENING
  if (hours >= 0 && hours < 6) return TIME_OF_DAY.NIGHT
}
;(() => {
  const greetingText = `Good ${getTimeOfDay()}`
  greeting.textContent = greetingText
})()
