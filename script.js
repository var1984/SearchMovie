class View {
  constructor() {
    this.app = document.getElementById("app");

    this.title = this.createElement("h3", "title");
    this.title.textContent = "Search";

    this.form = this.createElement("form", "search-wrap");
    this.wrapInput = this.createElement("div", "wrap-input");
    this.wrapSelect = this.createElement("div", "wrap-select");

    this.noteTitle = this.createElement("span", "note-title");
    this.noteTitle.textContent = "Title: ";

    this.searchInput = this.createElement("input", "search-input");
    this.searchInput.placeholder = "Search movi";

    this.noteType = this.createElement("span", "note-type");
    this.noteType.textContent = "Type: ";

    this.select = this.createElement("select", "select-form");

    this.selectOptionMovie = this.createElement("option", "movie");
    this.selectOptionMovie.textContent = "Movie";
    this.selectOptionMovie.setAttribute("value", "movie");

    this.selectOptionSeries = this.createElement("option", "series");
    this.selectOptionSeries.textContent = "Series";
    this.selectOptionSeries.setAttribute("value", "series");

    this.selectOptionEpisode = this.createElement("option", "episode");
    this.selectOptionEpisode.textContent = "Episode";
    this.selectOptionEpisode.setAttribute("value", "episode");

    this.searchBtn = this.createElement("button", "search-btn");
    this.searchBtn.textContent = "Search";
    this.searchBtn.setAttribute("type", "button");

    this.paginList = this.createElement("ul", "pagin-list");

    this.paginLi = this.createElement("li");
    // this.paginLiNum = this.createElement("li");

    // this.paginLiNumLink = this.createElement("a");
    // this.paginLiNumLink.setAttribute("href", "#")
    // this.paginLiNumLink.innerHTML = '1'

    this.paginPrev = this.createElement("a", "prev");
    this.paginPrev.innerHTML = "< Prev";
    this.paginPrev.setAttribute("href", "#");

    this.paginNext = this.createElement("a", "next");
    this.paginNext.innerHTML = "Next >";
    this.paginNext.setAttribute("href", "#");

    this.app.append(this.title);
    this.app.append(this.form);
    this.form.append(this.wrapInput);
    this.form.append(this.wrapSelect);

    this.wrapInput.append(this.noteTitle);
    this.wrapInput.append(this.searchInput);

    this.wrapSelect.append(this.noteType);
    this.wrapSelect.append(this.select);

    this.select.append(this.selectOptionMovie);
    this.select.append(this.selectOptionSeries);
    this.select.append(this.selectOptionEpisode);

    this.form.append(this.searchBtn);

    this.app.append(this.paginList);

    this.paginList.append(this.paginLi);
    // this.paginList.append(this.paginLiNum);
  }

  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }
}

class Search {
  constructor(view) {
    this.view = view;
    this.view.searchBtn.addEventListener("click", this.searchMovie.bind(this));
    // this.view.paginPrev.addEventListener("click", this.togglePagePrev.bind(this));
    // this.view.paginNext.addEventListener("click", this.togglePageNext.bind(this));

    this.page = 1;
  }
  paginList() {
    for (let i = 0; i < 10; i++) {
      if (i === 0) {
        this.view.paginList.innerHTML = `<li class="prev">< Prev</li>`;
        // this.view.paginLi.append(this.view.paginPrev);
      } else if (i === 10 - 1) {
        this.view.paginList.innerHTML += `<li class="next">Next ></li>`;
        // this.view.paginLi.append(this.view.paginNext);
      } else {
        // this.view.paginLiNum.append(this.view.paginLiNumLink);
        this.view.paginList.innerHTML += `<li class="pageNumber">${i}</li>`;
      }
    }
    this.paginNext = document.querySelector(".next");
    this.paginPrev = document.querySelector(".prev");
    this.pageNumber = document.querySelectorAll(".pageNumber");
  }

  async searchMovie() {
    w.innerHTML = "";
    this.paginList();
    return await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=8f8e826e&s=${this.view.searchInput.value}&page=${this.page}`
    ).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          this.togglePagePrev();
          this.togglePageNext();
          this.paginLiNum();
          console.log(res);
          res.Search.forEach((item) => {
            if (item.Type === this.view.select.value) {
              w.innerHTML += `<img class="img" src="${item.Poster}">`;
              // console.log(item);
            }
          });
        });
      } else {
      }
    });
  }
  togglePagePrev() {
    this.paginPrev.addEventListener("click", () => {
      if (this.page <= 1) {
        return;
      } else {
        this.page--;
        this.searchMovie();
      }
    });
  }
  togglePageNext() {
    this.paginNext.addEventListener("click", () => {
      this.page++;
      this.searchMovie()
      for (let i = 0; i < this.pageNumber.length; i++) {
        this.pageNumber[i].classList.remove("active");
        if (this.page === i + 1) {
          this.pageNumber[i].classList.add("active");
        } else if (this.page > this.pageNumber.length) {
          this.pageNumber[i].innerHTML++;
          this.pageNumber[this.pageNumber.length - 1].classList.add('active')
        }
        console.log(this.page);
      }

      // console.log(this.page);
    });
  }

  paginLiNum() {
    for (let i = 0; i < this.pageNumber.length; i++) {
      this.pageNumber[i].addEventListener("click", () => {
        this.page = i + 1;
        this.searchMovie();
        this.pageNumber[i].classList.add("active");
        console.log(this.page);
      });
    }
  }
}

new Search(new View());


