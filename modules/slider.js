import { getRandomNum } from '../utils/index.js'
import { getTimeOfDay } from './greetings.js'

const city = document.querySelector('.city')
const name = document.querySelector('.name')
const body = document.querySelector('body')

const setLocalStorage = () => {
  localStorage.setItem('name', name.value)
  localStorage.setItem('city', city.value)
}
window.addEventListener('beforeunload', setLocalStorage)

const getLocalStorage = () => {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name')
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city')
  }
}
window.addEventListener('load', getLocalStorage)

let randomNum = getRandomNum(20)
const url =
  'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/'

const getBgUrl = (bgNum) => {
  const index = bgNum < 10 && bgNum > 0 ? `0${bgNum}` : bgNum
  const timeOfDay = getTimeOfDay()
  const imageUrl = `${url}${timeOfDay}/${index}.jpg`
  return (body.style.backgroundImage = imageUrl)
}

const getSlidePrev = () => {
  randomNum--
  if (randomNum < 1) {
    randomNum = 20
  }
  setBg(randomNum)
}

const slidePrev = document.querySelector('.slide-prev')
slidePrev.addEventListener('click', getSlidePrev)

const getSlideNext = () => {
  randomNum++
  if (randomNum > 20) {
    randomNum = 1
  }
  setBg(randomNum)
}

const slideNext = document.querySelector('.slide-next')
slideNext.addEventListener('click', getSlideNext)

const setBg = (randomNum) => {
  const img = new Image()
  img.src = getBgUrl(randomNum)

  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`
  }
}

setBg(randomNum)
