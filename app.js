//Class for movie
class Movie {
  constructor(title, director, year) {
    this.title = title
    this.director = director
    this.year = year
  }
}

//Class for UI
class UI {
  static displayMovies() {
    const StoredMovies = [
      {
        title: 'Fight Club',
        director: 'David Fincher',
        year: 1999,
      },
      {
        title: 'Se7en',
        director: 'David Fincher',
        year: 1995,
      },
    ]

    const movies = StoredMovies

    movies.forEach((movie) => UI.addMovieToList(movie))
  }

  static addMovieToList(movie) {
    const list = document.getElementById('movie-list')

    const row = document.createElement('tr')

    row.innerHTML = `
    <td>${movie.title}</td>
    <td>${movie.director}</td>
    <td>${movie.year}</td>
    <td><a href="#" class="btn btn-primary delete">X</a></td>
    `

    list.appendChild(row)
  }

  static clearFields() {
    document.querySelector('#title').value = ''
    document.querySelector('#director').value = ''
    document.querySelector('#year').value = ''
  }

  static deleteMovie(element) {
    if (element.classList.contains('delete')) {
      element.parentNode.parentNode.remove()
    }
  }
}

//Class for local storage

//Event listener for displaying book
document.addEventListener('DOMContentLoaded', UI.displayMovies)

//Event listener for adding books
document.querySelector('#movie-form').addEventListener('submit', (e) => {
  //prevent submit so we can manipulate and use data
  e.preventDefault()

  //Get data from the form
  const title = document.querySelector('#title').value
  const director = document.querySelector('#director').value
  const year = document.querySelector('#year').value

  //Create instance of class book
  const movie = new Movie(title, director, year)

  //Add book to UI
  UI.addMovieToList(movie)

  //Clear fields
  UI.clearFields()
})

//Event listener for removing books
document.querySelector('#movie-list').addEventListener('click', (e) => {
  UI.deleteMovie(e.target)
})
