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
    const movies = Storage.getMovies()

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

      //Delete movie from local storage
      Storage.removeMovie(
        element.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent
      )

      //Alert user succesful removed movie
      UI.alertUser('Movie removed from list.', 'success')
    }
  }

  static alertUser(message, classAttribute) {
    let div = document.createElement('div')
    div.className = `alert alert-dismissible alert-${classAttribute}`

    div.appendChild(document.createTextNode(message))

    const container = document.querySelector('.container')
    const form = document.querySelector('#movie-form')

    container.insertBefore(div, form)

    //Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 2500)
  }
}

//Class for local storage
class Storage {
  static getMovies() {
    let movies

    if (localStorage.getItem('movies') === null) {
      movies = []
    } else {
      movies = JSON.parse(localStorage.getItem('movies'))
    }

    return movies
  }

  static addMovie(movie) {
    const movies = Storage.getMovies()

    movies.push(movie)
    localStorage.setItem('movies', JSON.stringify(movies))
  }

  static removeMovie(title) {
    const movies = Storage.getMovies()

    movies.forEach((el, index) => {
      if (el.title === title) {
        movies.splice(index, 1)
      }
    })

    localStorage.setItem('movies', JSON.stringify(movies))
  }
}

//Event listener for displaying movie
document.addEventListener('DOMContentLoaded', UI.displayMovies)

//Event listener for adding movies
document.querySelector('#movie-form').addEventListener('submit', (e) => {
  //prevent submit so we can manipulate and use data
  e.preventDefault()

  //Get data from the form
  const title = document.querySelector('#title').value
  const director = document.querySelector('#director').value
  const year = document.querySelector('#year').value

  //input Validation
  if (title === '' || director === '' || year === '') {
    //Alert user for wrong input
    UI.alertUser('Please fill in all fields.', 'danger')
  } else {
    //Create instance of class movie
    const movie = new Movie(title, director, year)

    //Add movie to local Storage
    Storage.addMovie(movie)

    //Add movie to UI
    UI.addMovieToList(movie)

    //Alert user succesful added movie
    UI.alertUser('Movie added to list.', 'success')

    //Clear fields
    UI.clearFields()
  }
})

//Event listener for removing movies
document.querySelector('#movie-list').addEventListener('click', (e) => {
  //Delete movie from UI
  UI.deleteMovie(e.target)

  //delete from storage and alert in UI.deleteMOvie() method

  //   //Delete movie from local storage
  //   Storage.removeMovie(
  //     e.target.parentElement.previousElementSibling.previousElementSibling
  //       .previousElementSibling.textContent
  //   )

  //   //Alert user succesful removed movie
  //   UI.alertUser('Movie removed from list.', 'success')
})
