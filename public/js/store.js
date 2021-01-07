
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
    <span class="cart-calorie cart-column">${calories}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button" onClick="removeCartItem(event)">REMOVE</button>
    </div>`

  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var calorieElement = cartRow.getElementsByClassName('cart-calorie')[0]
      var calorie = parseFloat(calorieElement.innerText.replace('$', ''))
      total = total + calorie
  }
  var totalTag = document.querySelector('.total-calories')
  var h3Tag = document.createElement('h3')
  h3Tag.textContent = `${total}`
  totalTag.append(h3Tag)
  console.log(total)
  var targetValue = Number(document.querySelector('.user-target-value').value)
  updateDifference(total,targetValue)
}

function updateDifference(total, targetValue) {
  var difference = targetValue - total
  var differenceTag = document.querySelector('.difference')
  var h3Tag = document.createElement('h3')
  h3Tag.textContent = `${difference}`
  differenceTag.append(h3Tag)
  console.log(difference)
  if (target > total) {
    console.log('Congrats! You can eat more!')
  } else {
    console.log('STOP EATING! TOO MANY CALORIES! THINK OF YOUR HEALTH! GO EXERCISE!')
  }
  
}

function removeCartItem(event) {
  console.log("remove clicked!")
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

var totalBtn = document.querySelector('.totalBtn')
totalBtn.addEventListener('click', function(event){
    event.preventDefault()
    updateCartTotal()
})
