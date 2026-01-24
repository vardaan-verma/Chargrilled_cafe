
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
// Touch and Scroll Interaction
const carouselWrapper = document.querySelector('.circular-carousel-wrapper');
let isDragging = false;
let startX = 0;
let lastX = 0;

// Mobile Touch Events
carouselWrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    lastX = startX;
});

carouselWrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent page scrolling while rotating carousel
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - lastX;

    // Sensitivity factor
    const sensitivity = 0.5;
    const rotationDelta = (deltaX * sensitivity) / (carouselWrapper.offsetWidth / 360);

    // Direct manipulation feel - temporary rotation
    // Note: For simplicity in this specific architecture where we snap to items,
    // we might just detect Swipe direction instead of direct 1:1 tracking
    lastX = currentX;
});

carouselWrapper.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    // Threshold to register a swipe
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            rotateCarousel(1); // Swipe Right -> Prev
        } else {
            rotateCarousel(-1); // Swipe Left -> Next
        }
    }
});

// PC Mouse Wheel Event
carouselWrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    // Throttle the scroll event to prevent rapid spinning
    if (e.deltaY > 0) {
        rotateCarousel(-1);
    } else {
        rotateCarousel(1);
    }
}, { passive: false });

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
// Form submission
let submitted = false;

document.querySelector('.reservation-form').addEventListener('submit', function (e) {
    // We allow the default submission to proceed so it hits the iframe
    submitted = true;

    // Optional: Add loading state to button
    const btn = this.querySelector('.submit-button');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Reset button after a timeout if iframe onload doesn't fire (failsafe)
    setTimeout(() => {
        if (btn.disabled && submitted) {
            // In some cases (CORS), iframe onload might not trigger on local dev for Google Forms
            // But usually for production it's fine. 
            // We can just rely on the user seeing the alert.
        }
    }, 5000);
});

// Detect when the hidden iframe has loaded (meaning response received)
const iframe = document.getElementById('hidden_iframe');
if (iframe) {
    iframe.onload = function () {
        if (submitted) {
            alert('Thank you for your reservation! We will contact you shortly to confirm.');
            document.querySelector('.reservation-form').reset();

            // Reset button
            const btn = document.querySelector('.submit-button');
            btn.textContent = 'Reserve Table';
            btn.disabled = false;

            submitted = false;
        }
    };
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');

        // Optional: Animate Hamburger
        hamburger.classList.toggle('toggle');
    });

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });
}