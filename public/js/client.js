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