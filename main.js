const movies_container = document.getElementById("movies-container");
const search_input = document.getElementById("search-input");
const menu_icon = document.querySelector(".menu-icon");
const links_responsive = document.querySelector(".links-responsive");
const title = document.querySelector(".title");
const footer_icon_top = document.getElementById("footer-icon-top");
const icon_span_right = document.getElementById("icon-span-right");
const menu_responsive = document.querySelector(".menu-reponsive");
/* ------------------ */
menu_icon.addEventListener("click", () => {
  menu_icon.classList.toggle("active");
  links_responsive.classList.toggle("hidden");
  title.classList.toggle("desactivated");
});
/* ------------------ */
icon_span_right.addEventListener("click", () => {
  menu_responsive.classList.toggle("hidden");
});
/* ------------------ */
footer_icon_top.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
/* ------------------ */
const apiKey = "16e320c3";
const baseUrl = "https://www.omdbapi.com/?";
/* ------------------ */
async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.Search || data.Search.length === 0) {
      movies_container.innerHTML = "Ocurrio un error al cargar las peliculas";
      return;
    }
    const { Search } = data;
    drawMovies(Search);
  } catch (error) {
    console.error(error.message);
  }
}
/* ------------------ */
function drawMovies(movies) {
  try {
    movies_container.innerHTML = "";
    movies?.map((movie) => {
      const { Poster, Title } = movie;
      let imagen = Poster;
      if (imagen.toLowerCase() === "n/a") {
        imagen = "./icons/notFound.png";
      } else {
        imagen = Poster;
      }
      movies_container.innerHTML += `
        <div class="movie">
          <img class="movie-img" src="${imagen}"/>
          <h2 class="movie-title">${Title}</h2>
        </div>
      `;
    });
  } catch (error) {
    movies_container.innerHTML = `<h3>Error${error}.</h3> `;
  }
}
/* ------------------ */
search_input.addEventListener("input", () => {
  const html_name_input = search_input.value;
  searchCharacter(html_name_input.trim());
});
async function searchCharacter(name) {
  if (search_input.value === "") {
    init(moviesNames);
  }
  try {
    const url2 = `${baseUrl}apikey=${apiKey}&s=?`;
    const response = await fetch(url2 + name);
    const data = await response.json();
    if (!data.Search || data.Search.length === 0) {
      movies_container.innerText = "No hay peliculas con ese nombre";
      return;
    }
    const { Search } = data;
    drawMovies(Search);
  } catch (error) {
    movies_container.innerHTML = `Ocurrio un error al cargar error: ${error}`;
  }
}
/* ------------------ */
const moviesNames = [
  {
    name: "naruto",
  },
  {
    name: "Boruto",
  },
  {
    name: "Avenger",
  },
  {
    name: "Pokemon",
  },
  {
    name: "guerra",
  },
  {
    name: "niños",
  },
  {
    name: "perro",
  },
];
/* ------------------ */
function init(arregloDeNombres) {
  for (let i = 0; i < arregloDeNombres.length; i++) {
    const nombre = arregloDeNombres[i].name;
    const apiUrl = `${baseUrl}apikey=${apiKey}&s=${nombre}`;
    getMovies(apiUrl);
  }
}
/* ------------------ */
async function optionFromUser(item) {
  let valorUser = item.getElementsByTagName("a")[0].innerHTML;
  const url3 = `${baseUrl}apikey=${apiKey}&s=?`;
  const response = await fetch(url3 + valorUser);
  const { Search } = await response.json();
  movies_container.innerText = "";
  drawMovies(Search);
}
/* ------------------ */
async function optionHeader(option) {
  let url4 = `https://www.omdbapi.com/?apikey=16e320c3&s=${option}&type?=${option}`;
  const response = await fetch(url4);
  const { Search } = await response.json();
  movies_container.innerText = "";
  drawMovies(Search);
}
/* ------------------ */
init(moviesNames);
