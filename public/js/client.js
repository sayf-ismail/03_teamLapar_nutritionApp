// Banner Slideshow
let count = 0;
const timer = 10000;
const slides = document.querySelectorAll('.banner-wrapper');
function autoSlides () {
    let current = count % slides.length;
    slides.forEach(slide => {
        slide.classList.remove('active');
    })
    count++;
    slides[current].classList.add('active');
    setTimeout(autoSlides, timer);
    console.log(current);
}
autoSlides();

function getFoodNutrition(){
    var searchText = document.querySelector('#searchtext')
    axios
        .get('/api/food_db', {
            params: {
                searchText: searchText.value
            }
        })
        .then(res => res.data.forEach(food => {
            console.log(res.data)
            var foodNutrition = document.querySelector('#results') 
            foodNutrition.innerHTML += `
            <div class = "className cartDivElement"> 
                <img src = '${food.picture_url}' class="food-item-image">
                <h3>Food Nutrition Details</h3>
                <p class="dish-name">Dish: '${food.dish}' </p>
                <p>Portion: '${food.portion}'</p>
                <p class = "calories">Calories:'${food.calories}'</p>
                <p>Carbs: '${food.carbs}'</p>
                <p>Fat: '${food.fat}'</p>
                <p>Protein: '${food.protein}'</p>
                <form action="" class="addToCart">
                    <button type="submit" class="addBtn" onClick="addToCartClicked(event)">+</button>
                </form>
            </div>
            `
        }));
}

var searchForm = document.querySelector('#searchForm')
searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    getFoodNutrition()
})

var targetBtn = document.querySelector('.targetBtn')
targetBtn.addEventListener('click', function(event){
    event.preventDefault()

    var userTargetTag = document.querySelector('.user-target')
    var targetValue = Number(document.querySelector('.user-target-value').value)
    var h3Tag = document.createElement('h3')
    h3Tag.textContent = `${targetValue}`
    userTargetTag.append(h3Tag)


})




// if target < total
// if Number(h3Tag.textContent)
// else if target > total

// var calculateBtn = document.querySelector('.calculateBtn')
// calculateBtn.addEventListener('click', function(event){
//     event.preventDefault()

//     var userTargetTag = document.querySelector('.user-target')
//     var targetValue = document.querySelector('.user-target-value')
//     var h3Tag = document.createElement('h3')
//     h3Tag.textContent = `${targetValue}`
//     userTargetTag.append(h3Tag)
// })


// var addFoodButton = document.querySelector('')
// addFoodButton.addEventListener