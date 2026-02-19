// Smooth scroll for navigation links
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

        // Close mobile menu after clicking a nav link
        const overlay = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.nav-hamburger');
        if (overlay && overlay.classList.contains('open')) {
            overlay.classList.remove('open');
            overlay.setAttribute('aria-hidden', 'true');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
});

// Mobile hamburger menu toggle
const hamburger = document.querySelector('.nav-hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenu.setAttribute('aria-hidden', (!isOpen).toString());
        hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus();
        }
    });
}

// Scroll reveal animation using IntersectionObserver
const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .timeline-item');

// Add initial reveal class
revealElements.forEach(element => {
    element.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0,
    rootMargin: '0px 0px 0px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Safety fallback: ensure all content is visible after 3 seconds
// (in case IntersectionObserver misses due to fast scroll or browser quirks)
setTimeout(() => {
    revealElements.forEach(element => {
        if (!element.classList.contains('active')) {
            element.classList.add('active');
        }
    });
}, 3000);
