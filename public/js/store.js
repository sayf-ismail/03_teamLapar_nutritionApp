
function addToCartClicked(event) {
  event.preventDefault()
  var button = event.target
  var foodDiv = button.parentElement.parentElement
  var test = document.querySelector('.dish-name').innerText.split(' ')
  test.shift()
  var dishName = test
  var calories = Number(foodDiv.getElementsByClassName('calories')[0].innerText.split("'")[1])
  var imageSrc = foodDiv.getElementsByClassName('food-item-image')[0].src
  addItemToCart(dishName, calories, imageSrc)
  // updateCartTotal()
}

function addItemToCart(dishName, calories, imageSrc) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-items')[0]

  var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${dishName}</span>
    </div>
    <span class="cart-price cart-column">${calories}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`

  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
}

function updateCartTotal() {

}