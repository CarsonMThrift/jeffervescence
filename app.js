const JeffApp = {
  init(selectors) {
    //array to keep products on so there is a reference to them
    this.objectArr = [
      {Name: "Razer Blade Pro", Image: "rzrbladepro.png"},
      {Name: "Razer Blade", Image: "rzrblade.jpg"},
      {Name: "Razer Blade Stealth", Image: "rzrbladestealth.jpg"},
      {Name: "Razer Mamba", Image: "rzrmamba.png"},
      {Name: "Razer Lancehead", Image: "rzrlancehead.jpg"}




    ];

    this.productArr = [];
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addProduct.bind(this))

  },
  getImage(productName){

    for (i = 0; i < this.objectArr.length; i++) { 
      if(this.objectArr[i].Name == productName){
        console.log(this.objectArr[i].Image)
        return this.objectArr[i].Image
      }
    }

    return "RazerLogoGreen.png"


  },
  addProduct(ev) {
    ev.preventDefault()
    const m = ev.target
    const product = {
      id: this.max,
      name: m.productTitle.value,
    }
    // const image = getImage(product.name)

    product.image = this.getImage(product.name)
    console.log(product.name)
    //add product to kept array
    this.productArr.push(product)
    const listItem = this.renderListItem(product)
    this.list.appendChild(listItem)
    ++this.max

    const buttonList = listItem.childNodes

    buttonList[2].addEventListener('click', this.favProduct.bind(this))
    buttonList[1].addEventListener('click', this.deleteProduct.bind(this))

    m.productTitle.value = ''

  },
  deleteProduct(ev) {
    ev.preventDefault()
    const m = ev.target.parentElement
    const listItem = m.parentElement
    const index = m.className
    this.productArr.splice(index, 1)

    listItem.outerHTML = ''

  },
  favProduct(ev) {
    ev.preventDefault()
    const m = ev.target.parentElement
    const listItem = m.parentElement

    if (listItem.style.backgroundColor != 'pink') {
      listItem.style.backgroundColor = 'pink'
    } else {
      listItem.style.backgroundColor = 'white'

    }

  },
  renderListItem(product) {
    const item = document.createElement('li')
    item.className = product.id
    item.textContent = product.name
    item.dataset.id = product.id

    const delButton = document.createElement('button')
    delButton.className = 'deleteButton'
    const favButton = document.createElement('button')
    favButton.className = 'favButton'


    delButton.innerHTML = '<img src="cancel.png" alt="Delete" />'
    favButton.innerHTML = '<img src="heart.png" alt="Favorite" />'

    const imageToApp = document.createElement('img')
    imageToApp.src = product.image
    imageToApp.className = 'prdImage'

    item.appendChild(delButton)
    item.appendChild(favButton)
    item.appendChild(imageToApp)


    return item
  }
}
JeffApp.init({
  formSelector: '#product-form',
  listSelector: '#product-list'
})