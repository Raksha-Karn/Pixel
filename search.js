import axios from "axios";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};
const urlParams = new URLSearchParams(window.location.search);
const movieName = urlParams.get("id");
document.title = movieName.toUpperCase();

const searchResult = document.querySelector(".search-result");
searchResult.textContent = `Showing results for ${movieName}`;

async function getResults(name) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/multi?query=${name}`,
      options,
    );
    console.log(name);

    const data = await res.data;
    console.log(data.results);

    const template = document.querySelector("#template");

    if (data.results.length === 0) {
      const body = document.querySelector("body");
      const h1 = document.createElement("h1");
      h1.textContent = "No Results Found";
      body.appendChild(h1);
      return;
    }

    for (let i = 0; i < data.results.length; i++) {
      if (
        !data.results[i].original_title ||
        data.results[i].original_title === "" ||
        data.results[i].overview === "" ||
        data.results[i].poster_path === null
      ) {
        continue;
      }

      const clone = template.content.cloneNode(true);

      const imageDiv = clone.querySelector(".image");
      imageDiv.style.backgroundImage = `url(
        https://image.tmdb.org/t/p/original${data.results[i].poster_path}
      )`;
      imageDiv.style.backgroundPosition = "center";
      imageDiv.style.backgroundSize = "cover";

      const h1 = clone.querySelector("h1");
      if (data.results[i].original_title) {
        h1.textContent = data.results[i].original_title;
      } else {
        h1.textContent = data.results[i].name;
      }

      const p = clone.querySelector("p");
      p.textContent = data.results[i].overview;

      const button = clone.querySelector("button");
      button.addEventListener("click", () => {
        window.open(`watch.html?id=${data.results[i].id}`, "_blank");
      });

      const main = document.querySelector(".mainDiv");

      main.appendChild(clone);
    }
  } catch (error) {
    console.log("API couldn't be fetched!");
  }
}

getResults(movieName);
