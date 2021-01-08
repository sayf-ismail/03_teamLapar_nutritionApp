
function addToCartClicked(event) {
  event.preventDefault()
  var button = event.target
  var foodDiv = button.parentElement.parentElement
  var dishName = foodDiv.getElementsByClassName('dish-name')[0].innerText.split("'")[1]
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
        <img class="cart-item-image" src="${imageSrc}" width="300" height="200">
        <span class="cart-item-title">${dishName}</span>
    </div>
    <span class="cart-calorie cart-column">Calories: ${calories}</span>
    <div class="cart-quantity cart-column">
        <button class="btn btn-danger" type="button" onClick="removeCartItem(event)">REMOVE</button>
    </div>`

  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
  console.log("initial total: "+0)
  var totalCalories = document.querySelector('.total-calories')
  if(totalCalories.childNodes.length < 2) {
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        // var calorieElement = cartRow.getElementsByClassName('cart-calorie')[0]
        // var calorie = Number(calorieElement.innerText)
        var abc = Number(cartRow.getElementsByClassName('cart-calorie')[0].innerText.split(' ')[1])
        total = total + abc
        console.log(cartRow[0])
    }
    var totalTag = document.querySelector('.total-calories')
    var h3Tag = document.createElement('h3')
    h3Tag.textContent = `${total}`
    h3Tag.classList.add('cartDivElement')
    totalTag.append(h3Tag)
    console.log(total)
    var targetValue = Number(document.querySelector('.user-target-value').value)
  } else {
    totalCalories.removeChild(totalCalories.childNodes[1])
  }
  updateDifference(total,targetValue)
}

function updateDifference(total, targetValue) {
  var difference = targetValue - total


  var diffSelector = document.querySelector('.difference')
  var diffDivSelector = document.querySelector('.diff-div')
  var hasExtraChildren = diffSelector.childNodes.length > 1
  var hasExtraChildren2 = diffDivSelector.childNodes.length > 1

  if(hasExtraChildren) {
    diffSelector.removeChild(diffSelector.childNodes[1])
    console.log("removed a child")
  } else {
    var h3Tag1 = document.createElement('h3')
    h3Tag1.textContent = `${difference}`
    h3Tag1.classList.add('cartDivElement')
    diffSelector.append(h3Tag1)
    console.log(difference)
    
  }
  
  if (hasExtraChildren2 && difference <= 0) {
    var h3Tag2 = document.createElement('h3')
    h3Tag2.textContent = 'Congrats! You can eat more!'
    h3Tag2.classList.add('cartDivElement')
    diffDivSelector.append(h3Tag2)
    console.log("targetValue > total")
  } else if(hasExtraChildren2 && difference > 0) {
    var h3Tag3 = document.createElement('h3')
    h3Tag3.textContent = 'STOP EATING! TOO MANY CALORIES! THINK OF YOUR HEALTH! GO EXERCISE!'
    diffDivSelector.append(h3Tag3)
    console.log("targetValue < total")
  } else {
    diffDivSelector.removeChild(diffDivSelector.childNodes[1])
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
