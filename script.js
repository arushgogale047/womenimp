// Word Scroller Animation (Right/Choice) - In-place replacement
const animatedWords = document.querySelectorAll('.word-scroller .animated-word');
let currentWordIndex = 0;

function rotateWord() {
    // Hide current word
    animatedWords[currentWordIndex].classList.remove('active');
    
    // Move to next word
    currentWordIndex = (currentWordIndex + 1) % animatedWords.length;
    
    // Show next word
    animatedWords[currentWordIndex].classList.add('active');
}

// Start rotating words every 3.5 seconds (between 3-4 seconds)
setInterval(rotateWord, 3500);

// Rotating Taglines in Hero Section
const taglines = [
    "Her body. Not your opinion.",
    "Equality isn't up for discussion.",
    "Power doesn't need permission.",
    "Respect is not optional.",
    "She's not asking — she's reclaiming.",
    "We're not breaking rules — we're rewriting them."
];

let currentTaglineIndex = 0;
const taglineElements = document.querySelectorAll('.tagline');

function rotateTaglines() {
    // Hide current tagline
    taglineElements[currentTaglineIndex].classList.remove('active');
    
    // Move to next tagline
    currentTaglineIndex = (currentTaglineIndex + 1) % taglines.length;
    
    // Show next tagline
    taglineElements[currentTaglineIndex].classList.add('active');
}

// Start rotating taglines every 4 seconds
setInterval(rotateTaglines, 4000);

// Floating Text Animation
const floatingText = document.getElementById('floatingText');
let currentFloatingIndex = 0;
let floatingTimeout;

function showFloatingText() {
    floatingText.textContent = taglines[currentFloatingIndex];
    floatingText.classList.add('show');
    
    floatingTimeout = setTimeout(() => {
        floatingText.classList.remove('show');
        
        // Move to next tagline after fade out
        setTimeout(() => {
            currentFloatingIndex = (currentFloatingIndex + 1) % taglines.length;
            showFloatingText();
        }, 500);
    }, 3000);
}

// Start floating text after 2 seconds
setTimeout(showFloatingText, 2000);

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll for Navigation Links (only on home page)
if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Active Navigation Link - Set based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        // Check if current page matches the link
        if (currentPage === linkHref || 
            (currentPage === 'index.html' && linkHref === 'index.html') ||
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Set active nav link on page load
setActiveNavLink();

// Active Navigation Link on Scroll (for home page only)
if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
                if (current === '' || current === 'home') {
                    const homeLink = document.querySelector('a[href="#home"], a[href="index.html"]');
                    if (homeLink) homeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add animation delay to cards for staggered effect
document.querySelectorAll('.resource-card, .rights-card, .scheme-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(106, 13, 173, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(106, 13, 173, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Initialize - Set first tagline as active
if (taglineElements.length > 0) {
    taglineElements[0].classList.add('active');
}

// Accordion Toggle Function for Education Page
function toggleAccordion(header) {
    const accordionSection = header.parentElement;
    const accordionContent = accordionSection.querySelector('.accordion-content');
    const isActive = accordionContent.classList.contains('active');
    
    // Close all other accordions (optional - remove if you want multiple open)
    // document.querySelectorAll('.accordion-content').forEach(content => {
    //     if (content !== accordionContent) {
    //         content.classList.remove('active');
    //         content.parentElement.querySelector('.accordion-header').classList.remove('active');
    //     }
    // });
    
    // Toggle current accordion
    if (isActive) {
        accordionContent.classList.remove('active');
        header.classList.remove('active');
    } else {
        accordionContent.classList.add('active');
        header.classList.add('active');
    }
}

// Avatar Prop Detection and Update
function updateAvatarProp() {
    const avatarProp = document.getElementById('avatarProp');
    if (!avatarProp) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageName = currentPage.replace('.html', '').toLowerCase();
    
    // Map pages to emojis
    const pageEmojiMap = {
        'index': '👋',
        'education': '📚',
        'health': '❤️',
        'rights': '⚖️',
        'schemes': '💰'
    };

    // For home page, also check sections
    if (pageName === 'index' || pageName === '') {
        const hash = window.location.hash;
        if (hash) {
            const sectionMap = {
                '#education': '📚',
                '#health': '❤️',
                '#rights': '⚖️',
                '#schemes': '💰'
            };
            const emoji = sectionMap[hash] || '👋';
            updatePropWithAnimation(avatarProp, emoji);
            return;
        }
    }

    const emoji = pageEmojiMap[pageName] || '👋';
    updatePropWithAnimation(avatarProp, emoji);
}

function updatePropWithAnimation(element, newEmoji) {
    if (element.textContent === newEmoji) return; // Already correct
    
    // Fade out
    element.classList.add('fade-out');
    
    setTimeout(() => {
        element.textContent = newEmoji;
        element.classList.remove('fade-out');
        element.classList.add('fade-in');
        
        setTimeout(() => {
            element.classList.remove('fade-in');
        }, 300);
    }, 150);
}

// Initialize avatar on page load
if (document.getElementById('floatingAvatar')) {
    updateAvatarProp();
    
    // Update on hash change (for home page sections)
    window.addEventListener('hashchange', updateAvatarProp);
    
    // Update on scroll (for home page sections)
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        let lastSection = '';
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section, .hero');
            const scrollPosition = window.scrollY + 200;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    if (sectionId !== lastSection) {
                        lastSection = sectionId;
                        const avatarProp = document.getElementById('avatarProp');
                        if (avatarProp) {
                            const sectionMap = {
                                'education': '📚',
                                'health': '❤️',
                                'rights': '⚖️',
                                'schemes': '💰',
                                'home': '👋'
                            };
                            const emoji = sectionMap[sectionId] || '👋';
                            updatePropWithAnimation(avatarProp, emoji);
                        }
                    }
                }
            });
        });
    }
}

