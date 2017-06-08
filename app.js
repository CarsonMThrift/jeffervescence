const JeffApp = {
  init(selectors) {
    //array to keep movies on so there is a reference to them
    this.movieArr = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document
    .querySelector(selectors.formSelector)
    .addEventListener('submit', this.addMovie.bind(this))
  },
  addMovie(ev) {
    ev.preventDefault()
    const m = ev.target
    const movie = {
      id: this.max,
      name: m.movieTitle.value,
    }
    //add movie to kept array
    this.movieArr.push(movie)
    const listItem = this.renderListItem(movie)
    this.list.appendChild(listItem)
    ++ this.max

    const buttonList = listItem.childNodes

    buttonList[2].addEventListener('click', this.favMovie.bind(this))
    buttonList[1].addEventListener('click', this.deleteMovie.bind(this))

    m.movieTitle.value = ''


  },    
  deleteMovie(ev) {
    ev.preventDefault()
    const m = ev.target.parentElement
    const listItem = m.parentElement
    const index = m.className
    this.movieArr.splice(index, 1)

    listItem.outerHTML = ''

  },

   favMovie(ev) {
    ev.preventDefault()
    const m = ev.target.parentElement
    const listItem = m.parentElement

    if(listItem.style.backgroundColor != 'pink'){
      listItem.style.backgroundColor = 'pink'
    }else{
      listItem.style.backgroundColor = 'white'

    }

  },
  
  renderListItem(movie) {
    const item = document.createElement('li')
    item.className = movie.id
    item.textContent = movie.name

    const delButton = document.createElement('button')
    delButton.className = 'deleteButton'
    const favButton = document.createElement('button')
    favButton.className = 'favButton'


    delButton.innerHTML = '<img src="cancel.png" alt="Delete" />'
    favButton.innerHTML = '<img src="heart.png" alt="Favorite" />'

    item.appendChild(delButton)
    item.appendChild(favButton)
    
    return item
  }
}
JeffApp.init({
  formSelector: '#movie-form',
  listSelector: '#movie-list'})