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
}

//Class for local storage

//Event listener for displaying book
document.addEventListener('DOMContentLoaded', UI.displayMovies)
//Event listener for adding books

//Event listener for removing books
