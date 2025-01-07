// Auto-slide for the slider
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

function autoSlide() {
    slides[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    currentIndex = (currentIndex + 1) % slides.length;
}

setInterval(autoSlide, 3000); // Slide every 3 seconds
