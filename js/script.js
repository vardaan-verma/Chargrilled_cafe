
// Circular Carousel Logic
const carouselData = [
    {
        name: "Truffle Pasta",
        price: "$34",
        image: "images/truffle pasta.png"
    },
    {
        name: "Braised Veal Shank",
        price: "$42",
        image: "images/veal shank.png"
    },
    {
        name: "Mushroom Risotto",
        price: "$28",
        image: "images/mushroomrissoto.png"
    },
    {
        name: "Roasted Sea Bass",
        price: "$38",
        image: "images/sea bass.png"
    },
    {
        name: "Pumpkin Ravioli",
        price: "$30",
        image: "images/ravioli.png"
    },
    {
        name: "Grilled T-Bone Steak",
        price: "$48",
        image: "images/tbone-steak.png"
    },
    {
        name: "Fresh Burrata",
        price: "$18",
        image: "images/burrata.png"
    },
    {
        name: "Classic Tiramisu",
        price: "$12",
        image: "images/tiramisu.png"
    }
];

let currentRotation = 0;
let currentCenterIndex = 0;
const totalItems = carouselData.length;
const angleStep = 360 / totalItems;
const radius = 400; // Radius of the circle

// Update center plate info
function updateCenterPlate() {
    const centerDish = carouselData[currentCenterIndex];
    document.getElementById('centerDishName').textContent = centerDish.name;
    document.getElementById('centerDishPrice').textContent = centerDish.price;
}

// Create carousel items
function initCarousel() {
    const carouselCircle = document.getElementById('carouselCircle');

    carouselData.forEach((dish, index) => {
        const angle = angleStep * index;
        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-item-wrapper';
        wrapper.style.transform = `rotate(${angle}deg) translateY(-${radius}px)`;

        const dishElement = document.createElement('div');
        dishElement.className = 'carousel-dish';

        dishElement.innerHTML = `
                    <img src="${dish.image}" alt="${dish.name}">
                `;

        wrapper.appendChild(dishElement);
        carouselCircle.appendChild(wrapper);
    });

    updateCenterPlate();
}

// Rotate carousel
function rotateCarousel(direction) {
    currentRotation += direction * angleStep;
    currentCenterIndex = (currentCenterIndex - direction + totalItems) % totalItems;

    const carouselCircle = document.getElementById('carouselCircle');
    carouselCircle.style.transform = `rotate(${currentRotation}deg)`;

    updateCenterPlate();
}



// Initialize carousel on page load
initCarousel();

// Button event listeners
document.getElementById('prevBtn').addEventListener('click', () => rotateCarousel(1));
document.getElementById('nextBtn').addEventListener('click', () => rotateCarousel(-1));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form submission
document.querySelector('.reservation-form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your reservation! We will contact you shortly to confirm.');
    this.reset();
});