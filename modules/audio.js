import { audioPlayList } from './constants.js'

const play = document.querySelector('.play')
const playPrev = document.querySelector('.play-prev')
const playNext = document.querySelector('.play-next')

document.querySelector('.play-list').innerHTML = audioPlayList
  .map(({ title }) => `<li class="play-item">${title}</li>`)
  .join('')

const totalTracks = audioPlayList.length - 1
const audio = new Audio()

let isPlay
let playNum = 0
let currentTime = 0

const playAudio = () => {
  audio.src = audioPlayList[playNum].src
  audio.currentTime = currentTime
  audio.play()
  isPlay = true
  toggleItem()
}

const stopAudio = () => {
  audio.pause()
  isPlay = false
}

const toggleBtn = () => {
  play.classList.toggle('pause')

  if (!isPlay) playAudio()
  else stopAudio()
}

const playPrevAudio = () => {
  play.classList.add('pause')

  playNum--

  if (playNum < 0) playNum = totalTracks
  playAudio()
}

const playNextAudio = () => {
  play.classList.add('pause')

  playNum++
  if (playNum > totalTracks) playNum = 0
  playAudio()
}

const toggleItem = () => {
  document.querySelectorAll('.play-item').forEach((element) => {
    if (audioPlayList[playNum].title === element.textContent) {
      element.classList.add('item-active')
    } else {
      element.classList.remove('item-active')
    }
  })
  playerTitle.textContent = `${audioPlayList[playNum].title}`
}

playPrev.addEventListener('click', playPrevAudio)
playNext.addEventListener('click', playNextAudio)
play.addEventListener('click', toggleBtn)
