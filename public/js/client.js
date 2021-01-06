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
            <div class = "className"> 
                <img src = '${food.picture_url}'>
                <h3>Food Nutrition Details</h3>
                <p>Dish: '${food.dish}' </p>
                <p>Portion: '${food.portion}'</p>
                <p>Calories:'${food.calories}'</p>
                <p>Carbs: '${food.carbs}'</p>
                <p>Fat: '${food.fat}'</p>
                <p>Protein: '${food.protein}'</p>
            </div>
            `
        }));
}

var searchForm = document.querySelector('#searchForm')
searchForm.addEventListener('submit', function(event) {
    event.preventDefault()
    getFoodNutrition()
})