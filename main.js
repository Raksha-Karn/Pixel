import axios from "axios";
import "preline";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const form = document.querySelector("form");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

function watchMovie(id) {
  window.open(`watch.html?id=${id}`, "_blank");
}

async function getTopMovies() {
  const data = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options,
  );

  const randomIndex = Math.floor(Math.random() * 20);

  const res = data.data.results[randomIndex];

  const main = document.querySelector("main");
  main.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${res.backdrop_path})`;

  const h1 = document.querySelector(".main_h1");
  h1.textContent = res.original_title;

  const description = document.querySelector(".main_p");
  description.textContent = res.overview;

  const date = document.querySelector(".main_span");
  date.textContent = "Released Date: " + res.release_date;

  const rating = document.querySelector(".main_rating");
  rating.textContent = "Rating: " + res.vote_average.toFixed(1);

  const title = document.createElement("h1");
  title.textContent = res.title;

  const button = document.querySelector(".watch-button");
  button.classList.remove("hidden");

  button.textContent = "Watch";

  const id = res.id;
  button.addEventListener("click", () => {
    watchMovie(id);
  });
}

getTopMovies();

const searchBtn = document.querySelector(".search-button");

searchBtn.addEventListener("click", (e) => {
  console.log("CLICKED");
  e.preventDefault();
  const searchInput = document.getElementById("search-input").value;
  console.log(searchInput);
  if (searchInput === "") {
    return;
  }
  // getResults();
  window.open(`search.html?id=${searchInput}`, "_blank");
});
