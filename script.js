// Set footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Data for Education Modal ---
const educationData = {
    'tambo': {
        title: "Tambo Central School (Grades 1-4)",
        images: [
            { type: 'image', src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1577896334614-501476d05932?auto=format&fit=crop&w=1200&q=80' }
        ],
        desc: "My foundational years started here. It was a time of pure curiosity, playing tag in the corridors, and learning the basics of reading and writing. The friendships I made here were simple yet genuine."
    },
    'ihma': {
        title: "Immaculate Heart of Mary Academy (Grades 5-6)",
        images: [
            { type: 'image', src: 'https://images.unsplash.com/photo-1427504746696-ea5abd7dfe4b?auto=format&fit=crop&w=1200&q=80' },
            { type: 'image', src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80' }
        ],
        desc: "Moving to IHMA was a shift. I started to take my studies a bit more seriously here. This is where I discovered my love for reading during library hours and started asking deeper questions about the world."
    },
    'ice': {
        title: "Iligan City East National Highschool",
        images: [
            { type: 'image', src: 'shs.jpg' }
        ],
        desc: "High school was a rollercoaster. It was here that I got my first phone at 10 (timeline overlap) and really started exploring technology. I joined clubs, made lifelong friends, and solidified my dream of entering the tech field."
    },
    'msu': {
        title: "MSU - IIT",
        images: [
            { type: 'image', src: 'college.jpg' }
        ],
        desc: "I am currently pursuing my degree at MSU-IIT, which serves as the stepping stone for my future endeavors. This institution is equipping me with the essential tools and knowledge to turn my dreams into reality. Beyond academics, the welcoming campus culture has allowed me to build meaningful connections."
    }
};

let currentModalId = null;
let currentSlideIndex = 0;

function openEducationModal(id) {
    const data = educationData[id];
    if(!data) return;

    currentModalId = id;
    currentSlideIndex = 0;

    // Populate Text
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-desc').innerText = data.desc;

    // Render Slides
    renderSlides(data.images);

    // Show Modal
    document.getElementById('edu-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    document.getElementById('edu-modal').classList.add('hidden');
    document.body.style.overflow = '';
    // Clear slides to stop videos if implemented
    document.getElementById('gallery-container').innerHTML = '';
}

function renderSlides(images) {
    const container = document.getElementById('gallery-container');
    const dotsContainer = document.getElementById('gallery-dots');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');

    container.innerHTML = '';
    dotsContainer.innerHTML = '';

    // If high school ('ice') or college ('msu'), show only the first photo and hide controls/dots
    let slidesToRender = images;
    if (currentModalId === 'ice' || currentModalId === 'msu') {
        slidesToRender = images.slice(0, 1);
    }

    // Hide controls when there's only one slide
    if (slidesToRender.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        dotsContainer.style.display = 'none';
    } else {
        if (prevBtn) prevBtn.style.display = '';
        if (nextBtn) nextBtn.style.display = '';
        dotsContainer.style.display = '';
    }

    slidesToRender.forEach((media, index) => {
        // Create Slide
        const slide = document.createElement('img'); // Using IMG for simplicity, could be VIDEO tag
        slide.src = media.src;
        slide.className = `gallery-slide ${index === 0 ? 'active' : ''} w-full h-full object-cover`;
        if(media.type === 'video') {
            // Visual indicator for "video" placeholder
            slide.style.filter = "brightness(0.7)";
        }
        container.appendChild(slide);

        // Create Dot
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full cursor-pointer transition-all ${index === 0 ? 'bg-brand-accent w-6' : 'bg-white/50'}`;
        dot.onclick = () => jumpToSlide(index);
        dotsContainer.appendChild(dot);
    });
}

function changeSlide(dir) {
    const data = educationData[currentModalId];
    if(!data) return;
    
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.getElementById('gallery-dots').children;

    // Hide current
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('bg-brand-accent', 'w-6');
    dots[currentSlideIndex].classList.add('bg-white/50', 'w-2');

    // Calculate next
    currentSlideIndex += dir;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

    // Show new
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.remove('bg-white/50', 'w-2');
    dots[currentSlideIndex].classList.add('bg-brand-accent', 'w-6');
}

function jumpToSlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    if (!slides.length) return;
    
    // Calculate direction just for logic, but simply setting index works
    const dir = index - currentSlideIndex;
    if (dir === 0) return;
    
    // Reset current
    const dots = document.getElementById('gallery-dots').children;
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('bg-brand-accent', 'w-6');
    dots[currentSlideIndex].classList.add('bg-white/50', 'w-2');

    // Set new
    currentSlideIndex = index;
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.remove('bg-white/50', 'w-2');
    dots[currentSlideIndex].classList.add('bg-brand-accent', 'w-6');
}


// --- 1. Interactive Hobbies ---
const hobbyCards = document.querySelectorAll('.hobby-card');
    
hobbyCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Prevent bubbling if clicking internal elements
        e.stopPropagation();

        // If this card is already active, close it
        if (this.classList.contains('active')) {
            this.classList.remove('active');
            this.classList.remove('float-effect');
            const img = this.querySelector('.hobby-image');
            if(img) img.remove();
            return;
        }

        // Close all other cards first
        hobbyCards.forEach(c => {
            c.classList.remove('active');
            c.classList.remove('float-effect');
            const img = c.querySelector('.hobby-image');
            if(img) img.remove();
        });

        // Activate this card
        this.classList.add('active');
        // Only the clicked card should float — remove float from others then add to this
        hobbyCards.forEach(c => c.classList.remove('float-effect'));
        this.classList.add('float-effect');
        
        // Create and inject Image
        const imgUrl = this.getAttribute('data-image');
        const img = document.createElement('img');
        img.src = imgUrl;
        img.className = 'hobby-image';
        img.alt = 'Hobby Image';

        // Insert image after the `.hobby-content` block so the icon+title sit above the photo.
        // Move the description (`.hobby-desc`) to appear after the image (as a caption).
        const contentEl = this.querySelector('.hobby-content');
        const descEl = this.querySelector('.hobby-desc');
        if (descEl) descEl.remove();

        if (contentEl && contentEl.insertAdjacentElement) {
            contentEl.insertAdjacentElement('afterend', img);
        } else {
            // fallback: insert before the content container
            this.insertBefore(img, this.firstChild);
        }

        if (descEl && img.insertAdjacentElement) {
            img.insertAdjacentElement('afterend', descEl);
        }
    });
});

// Close modal when clicking outside
document.getElementById('edu-modal').addEventListener('click', (e) => {
    if(e.target.id === 'edu-modal') {
        closeModal();
    }
});

// Close hobbies when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.hobby-card')) {
        hobbyCards.forEach(c => {
            c.classList.remove('active');
            c.classList.remove('float-effect');
            const img = c.querySelector('.hobby-image');
            if(img) img.remove();
        });
    }
});


// --- 2. Mobile Menu Toggle ---
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// --- 3. Scroll Animation (Reversible for every scroll) ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(element => {
    observer.observe(element);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        menu.classList.add('hidden');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
