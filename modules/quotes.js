import { getRandomNum } from '../utils/index.js'

const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')

const randomNum = getRandomNum(1000)

const getQuotes = async (id = 0) => {
  const url = 'https://type.fit/api/quotes'
  const data = await (await fetch(url)).json()

  quote.textContent = `"${data[id].text}"`
  author.textContent = data[id].author
}

changeQuote.addEventListener('click', () => {
  getQuotes(randomNum)
})

getQuotes(randomNum)
