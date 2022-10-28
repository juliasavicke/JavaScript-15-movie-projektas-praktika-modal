"use strict";
console.log("app.js");

// const els = {
//   btn: {
//     addMovie: document.getElementById("add-movie-btn"),
//   },
//   modal: {
//     addMovie:
//   }
// };

// taikomes ==================================================

const els = {
  addMovieBtn: document.getElementById("add-movie-btn"),
  addMovieModal: document.getElementById("add-modal"),
  backdrop: document.getElementById("backdrop"),
  cancelBtn: document.getElementById("cancel-btn"),
  addMovieForm: document.getElementById("add-movie-form"),
  moviesContainer: document.getElementById("movie-list"),
  noMoviesContainer: document.getElementById("entry-text"),
};

console.log("els ===", els);
// bendras globalus filmu kintamasis
let mainMoviesArr = [];

//testavimui prisidedam filma is karto

// addNewMovieHandler({
//   id: generateId(),
//   imageUrl: "https://picsum.photos/id/1003/1181/1772 ",
//   rating: "4",
//   title: "Bambi",
// });

// addNewMovieHandler({
//   id: generateId(),
//   imageUrl: "https://picsum.photos/id/1003/1181/1772 ",
//   rating: "5",
//   title: "Pavadinimas",
// });

// EVENT LISTENERS ===========================================
//============================================================

// paspaudimas ant Add Movie Btn
els.addMovieBtn.addEventListener("click", () => {
  //parodyti modala
  els.addMovieModal.classList.add("visible");
  //parodyti backdrop
  els.backdrop.classList.add("visible");
  //els.backdrop.style.display = "block";
});

// paspaudimas and Backdrop isjungia Modala ir Backdrop
els.backdrop.addEventListener("click", closeMovieModal);

// paspaudimas ant Cancel mygtuko paciame Modale isjungia Modala ir Backdrop
els.cancelBtn.addEventListener("click", closeMovieModal);

// klausomes formos issiuntimo ir stabdom perkrovima
els.addMovieForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //gauti input reiksmes
  const newMovieDetails = {
    id: generateId(),
    title: els.addMovieForm.elements.title.value.trim(),
    imageUrl: els.addMovieForm.elements["image-url"].value.trim(),
    rating: els.addMovieForm.elements.rating.value.trim(),
  };
  // mini validacija =========================================================
  // jei nors vienas laukas neivestas
  if (
    newMovieDetails.title === "" ||
    newMovieDetails.imageUrl === "" ||
    newMovieDetails.rating === ""
  ) {
    // stabdom tolimesni filmo pridejo vygdyma
    console.log("stop nes ne viskas ivesta");
    return;
  }

  // jei viskas gerai sukuriam html vieno movie ================================================
  //const newMovieHtmlEl = makeOneMovieHtmlEl(newMovieDetails);
  addNewMovieHandler(newMovieDetails);

  // talpinam ta movie i dom
  //   console.log("talpinam movie");
  //   els.moviesContainer.append(newMovieHtmlEl);
  //   // uzdarom add movie modala, kai sekmingai idedame filma
  closeMovieModal();
  els.addMovieForm.reset();
});

// MAIN FUNCTIONS ============================================
//============================================================

function addNewMovieHandler(newMovieObj) {
  // jei viskas gerai pridedam ta filma i mainMoviesArr
  mainMoviesArr.push(newMovieObj);

  renderMovies();
}

function renderMovies() {
  //issivalyt saraso konteineri kad nebutu duklikuojami elementai su apend
  els.moviesContainer.innerHTML = "";
  //noMoviesContainer rodyti arba ne, priklausomai nuo to ar turim nors viena movie
  if (mainMoviesArr.length > 0) {
    els.noMoviesContainer.style.display = "none";
  } else {
    els.noMoviesContainer.style.display = "block";
    return;
  }
  // sukti cikla per visa mainMoviesArr. sugeneruoti naujus movies html elementus is masyvo
  mainMoviesArr.forEach((mObj) => {
    // jei viskas gerai sukuriam html vieno movie
    const newMovieHtmlEl = makeOneMovieHtmlEl(mObj);
    // talpinam ta movie i dom

    els.moviesContainer.append(newMovieHtmlEl);
  });
}

// funkcija uzdaro modala ir paslepia backdrop
function closeMovieModal() {
  // paslepti modala
  els.addMovieModal.classList.remove("visible");
  // paslepti backdrop
  els.backdrop.classList.remove("visible");
}
/**
 * Sukuria ir grazina li elmenta is argumetu gauto objekto reiksmiu
 * @param {*} newMovieObj
 *
 */
function makeOneMovieHtmlEl(newMovieObj) {
  console.log("newMovieObj ===", newMovieObj);
  // isorini el sukuriam su createElement
  const liEl = document.createElement("li");
  liEl.className = "movie-element";
  //prisidedam data-movie-id atributa, kad atskirtumem individualu li elementa
  liEl.dataset.movieId = newMovieObj.id;
  // vidinius elementus su string (veliau reiktu perdaryti i createElement)
  const liInsideHtml = `
    <div class="movie-element__image">
      <img src="${newMovieObj.imageUrl}" alt="element__image">
    </div>
    <div class="movie-element__info">
      <h2>${newMovieObj.title}</h2>
      <p>${newMovieObj.rating}/5 stars</p>
      <i class="delete fa fa-trash" aria-hidden="true"></i>
    </div>
    `;
  // dedam string elementu i li elementa
  liEl.insertAdjacentHTML("afterbegin", liInsideHtml);
  // console.log(liEl);
  const trashEl = liEl.querySelector(".delete");
  trashEl.addEventListener("click", movieDeleteHandler);
  return liEl;
}

function movieDeleteHandler(event) {
  console.log("event.target", event.target);
  event.target.closest("li")["data-movie-id"];
  const idOfElToBeDeleted = event.target.closest("li").dataset.movieId;

  mainMoviesArr = mainMoviesArr.filter((mObj) => mObj.id !== idOfElToBeDeleted);
  console.log("mainMoviesArr ===", mainMoviesArr);

  //bet kada ivykus pokyciui mes kvieciam render
  renderMovies();
}

// HELPER FUNCTIONS ============================================
//==============================================================

function generateId() {
  return Math.random().toFixed(8).slice(2);
}
