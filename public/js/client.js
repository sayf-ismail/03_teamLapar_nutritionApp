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

//axios
    //.get('/api/food_db')
    //.then(res => console.log(res.data))

function getFoodNutrition(food){
    axios
        .get('/api/food_db')
        .then(res => res.data.forEach(food =>{
            var foodNutrition = document.querySelector('') //depend on the class/id name in index.ejs
            foodNutrition.innerHTML += `
            <div class = "className"> 
                <img src = '${food.image}'>
                <h3>Food Nutrition Details</h3>
                <p>Dish: '${food.name}' </p>
                <p>Portion: '${food.portion}'</p>
                <p>Calories:'${food.calories}'</p>
                <p>Carbs: '${food.carbs}'</p>
                <p>Fat: '${food.fat}'</p>
                <p>Protein: '${food.protein}'</p>
            </div>
            `
        }));

}