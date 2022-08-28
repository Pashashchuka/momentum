// Playlist

let audioPlayList = [
  {
    title: "Aqua Caelestis",
    src: "../assets/sounds/Aqua Caelestis.mp3",
    duration: 58,
  },
  {
    title: "River Flows In You",
    src: "../assets/sounds/River Flows In You.mp3",
    duration: 230,
  },
  {
    title: "Summer Wind",
    src: "../assets/sounds/Summer Wind.mp3",
    duration: 110,
  },
  {
    title: "Ennio Morricone",
    src: "../assets/sounds/Ennio Morricone.mp3",
    duration: 97,
  },
];

document.querySelector(".play-list").innerHTML = audioPlayList
  .map(
    (audio) =>
      `
  <li class="play-item">${audio.title}</li>
`
  )
  .join("");

// Date

const date = document.querySelector(".date");

const showDate = () => {
  const date1 = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = date1.toLocaleDateString("en-US", options);
  date.textContent = currentDate;
};

// Greetings

const greeting = document.querySelector(".greeting");
const greeting1 = new Date();
const hours = greeting1.getHours();

const getTimeOfDay = () => {
  if (hours >= 6 && hours < 12) return "morning";
  if (hours >= 12 && hours < 17) return "afternoon";
  if (hours >= 17 && hours <= 23) return "evening";
  if (hours >= 0 && hours < 6) return "night";
};

const showGreeting = () => {
  const greetingText = `Good ${getTimeOfDay()}`;
  greeting.textContent = greetingText;
};

// Time

const time = document.querySelector(".time");

const showTime = () => {
  const time1 = new Date();
  const currentTime = time1.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
};
showTime();

// local storage

const city = document.querySelector(".city");
const name = document.querySelector(".name");

const setLocalStorage = () => {
  localStorage.setItem("name", name.value);
  localStorage.setItem("city", city.value);
};
window.addEventListener("beforeunload", setLocalStorage);

const getLocalStorage = () => {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
};
window.addEventListener("load", getLocalStorage);

// Body

const body = document.querySelector("body");

const getRandomNum = () => {
  return Math.ceil(Math.random() * 20);
};

let randomNum = getRandomNum();

const setBg = (bgNum) => {
  const index = bgNum < 10 && bgNum > 0 ? `0${bgNum}` : bgNum;
  const timeOfDay = getTimeOfDay();
  return (body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${index}.jpg')`);
};

// Slider

const getSlidePrev = () => {
  randomNum--;
  if (randomNum < 1) {
    randomNum = 20;
  }
  setBg2(randomNum);
};

const slidePrev = document.querySelector(".slide-prev");
slidePrev.addEventListener("click", getSlidePrev);

const getSlideNext = () => {
  randomNum++;
  if (randomNum > 20) {
    randomNum = 1;
  }
  setBg2(randomNum);
};

const slideNext = document.querySelector(".slide-next");
slideNext.addEventListener("click", getSlideNext);

// Background

const setBg2 = (randomNum) => {
  const img = new Image();
  img.src = setBg(randomNum);
  img.onload = () => {
    body.style.backgroundImage = img.src;
  };
};

// Weather

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

const getWeather = async () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${
    city.value || "Minsk"
  }&lang=en&appid=233cf231c85de0e762b3f02e3b7776f6&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C ${
    data.weather[0].description
  }`;
  wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
};
getWeather();

city.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

// Quotes

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

const getQuotes = async (id) => {
  const url = "https://type.fit/api/quotes";
  const res = await fetch(url);
  const data = await res.json();
  quote.textContent = `"${data[id || 0].text}"`;
  author.textContent = data[id || 0].author;
};
getQuotes();

changeQuote.addEventListener("click", () => {
  const randomNum = Math.ceil(Math.random() * 1000);
  getQuotes(randomNum);
});

// Audio

const play = document.querySelector(".play");
let isPlay = false;
let playNum = 0;
let currentTime = 0;

const audio = new Audio();

const playAudio = () => {
  audio.src = audioPlayList[playNum].src;
  audio.currentTime = currentTime;
  audio.play();
  isPlay = true;
  toggleItem();
};

const stopAudio = () => {
  audio.pause();
  isPlay = false;
};

const toggleBtn = () => {
  play.classList.toggle("pause");
  if (!isPlay) playAudio();
  else stopAudio();
};
play.addEventListener("click", toggleBtn);

// Audio player

const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");

const playPrevAudio = () => {
  play.classList.add("pause");
  playNum--;
  if (playNum < 0) playNum = audioPlayList.length - 1;
  playAudio();
};

const playNextAudio = () => {
  play.classList.add("pause");
  playNum++;
  if (playNum > audioPlayList.length - 1) playNum = 0;
  playAudio();
};

playPrev.addEventListener("click", playPrevAudio);
playNext.addEventListener("click", playNextAudio);

// Active sounds

function toggleItem() {
  document.querySelectorAll(".play-item").forEach((element) => {
    if (audioPlayList[playNum].title === element.textContent) {
      element.classList.add("item-active");
    } else {
      element.classList.remove("item-active");
    }
  });
  playerTitle.textContent = `${audioPlayList[playNum].title}`;
}
