// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.querySelector('.typing-text');
const statNumbers = document.querySelectorAll('.stat-number');
const skillItems = document.querySelectorAll('.skill-item');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Typing Animation
const typingTexts = [
    'CS Student & Tech Enthusiast',
    'Future AI Developer',
    'Game Development Learner',
    'Web Development Expert',
    'Problem Solver',
    'Innovation Seeker'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500; // Pause before next text
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
if (typingText) {
    typeText();
}

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
function highlightActiveNav() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Counter Animation for Statistics
function animateCounters() {
    statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 200;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 10);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// True Matrix Effect - Character Spinning
function createMatrixEffect(element) {
    // Skip if already processed or if it contains child elements
    if (element.hasAttribute('data-matrix-processed') || element.children.length > 0) {
        return;
    }
    
    const text = element.textContent.trim();
    if (!text) return;
    
    // Mark as processed to prevent duplicate processing
    element.setAttribute('data-matrix-processed', 'true');
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Clear the element and create spans for each character
    element.innerHTML = '';
    const charElements = [];
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        
        if (text[i] === ' ') {
            span.className = 'matrix-char space';
            span.innerHTML = '&nbsp;';
        } else {
            span.className = 'matrix-char';
            span.textContent = chars[Math.floor(Math.random() * chars.length)];
        }
        
        element.appendChild(span);
        charElements.push(span);
    }
    
    // Animate each character
    charElements.forEach((charEl, index) => {
        if (text[index] === ' ') {
            charEl.innerHTML = '&nbsp;';
            return;
        }
        
        let iterations = 0;
        const maxIterations = 8 + Math.random() * 15; // Slower for visibility
        
        const interval = setInterval(() => {
            if (iterations < maxIterations) {
                charEl.textContent = chars[Math.floor(Math.random() * chars.length)];
                charEl.classList.add('spinning');
                iterations++;
            } else {
                charEl.textContent = text[index];
                charEl.classList.remove('spinning');
                charEl.classList.add('final');
                clearInterval(interval);
            }
        }, 80 + Math.random() * 60); // Slower timing for visibility
    });
}

// Apply Matrix Effect to Header Elements Only
function applyMatrixToHeaders(element) {
    // Get only header elements (h1, h2, h3, h4, h5, h6, section titles, category titles)
    const headerElements = element.querySelectorAll('h1, h2, h3, h4, h5, h6, .section-title, .category-title, .achievement-card h3, .project-content h3');
    
    headerElements.forEach((headerEl, index) => {
        // Skip if already processed or if it's empty
        if (headerEl.hasAttribute('data-matrix-processed') || 
            !headerEl.textContent.trim()) {
            return;
        }
        
        setTimeout(() => {
            createMatrixEffect(headerEl);
        }, index * 400);
    });
}

// Trigger Matrix Effect on Scroll - Headers Only
function triggerMatrixEffect(element) {
    // Apply to header elements only
    setTimeout(() => {
        applyMatrixToHeaders(element);
    }, 300);
}

// Enhanced Intersection Observer for Matrix Animations
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const processedSections = new Set();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !processedSections.has(entry.target.id)) {
            processedSections.add(entry.target.id);
            entry.target.classList.add('animate');
            
            // Trigger matrix effect for section titles first
            const sectionTitle = entry.target.querySelector('.section-title');
            if (sectionTitle && !sectionTitle.hasAttribute('data-matrix-processed')) {
                setTimeout(() => {
                    createMatrixEffect(sectionTitle);
                }, 200);
            }
            
            // Then trigger matrix effect for content
            setTimeout(() => {
                triggerMatrixEffect(entry.target);
            }, 800);
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('about')) {
                setTimeout(() => {
                    animateCounters();
                }, 1500);
            }
            
            // Animate skill items
            if (entry.target.classList.contains('skills')) {
                const skillItems = entry.target.querySelectorAll('.skill-item span');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        if (!item.hasAttribute('data-matrix-processed')) {
                            createMatrixEffect(item);
                        }
                    }, 1000 + index * 200);
                });
            }
            
            // Animate project cards
            if (entry.target.classList.contains('projects')) {
                const projectTitles = entry.target.querySelectorAll('.project-content h3');
                projectTitles.forEach((title, index) => {
                    setTimeout(() => {
                        if (!title.hasAttribute('data-matrix-processed')) {
                            createMatrixEffect(title);
                        }
                    }, 1200 + index * 300);
                });
            }
            
            // Animate achievement cards
            if (entry.target.classList.contains('achievements')) {
                const achievementTitles = entry.target.querySelectorAll('.achievement-card h3');
                achievementTitles.forEach((title, index) => {
                    setTimeout(() => {
                        if (!title.hasAttribute('data-matrix-processed')) {
                            createMatrixEffect(title);
                        }
                    }, 1000 + index * 400);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Create Floating Tech Particles
function createTechParticles() {
    const container = document.getElementById('techParticles');
    if (!container) return;
    
    const techSymbols = [
        '&lt;/&gt;', '{}', '[]', '()', '&amp;&amp;', '||', '==', '!=', '++', '--', '-&gt;', '&lt;=', '&gt;=', '&lt;?&gt;', '&lt;!--', '--&gt;',
        'AI', 'ML', 'JS', 'CSS', 'HTML', 'API', 'JSON', 'HTTP', 'SQL', 'PHP', 'JAVA', 'C++', 'PYTHON', 'REACT', 'NODE',
        '01010', '11001', '10110', '00110', '11010', '10101', '01101', '11100', '00011', '10011', '01110', '11111',
        'function()', 'class', 'const', 'let', 'var', 'async', 'await', 'return', 'import', 'export', 'if', 'else',
        'for', 'while', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'throw', 'new', 'this', 'super',
        'MongoDB', 'MySQL', 'Redis', 'Docker', 'AWS', 'Git', 'npm', 'yarn', 'webpack', 'babel', 'eslint', 'jest',
        'TypeScript', 'GraphQL', 'REST', 'JWT', 'OAuth', 'HTTPS', 'WebSocket', 'Promise', 'Callback', 'Event',
        'Component', 'State', 'Props', 'Hook', 'Router', 'Middleware', 'Controller', 'Model', 'View', 'Service',
        'Algorithm', 'DataStructure', 'BigO', 'Recursion', 'Dynamic', 'Greedy', 'BFS', 'DFS', 'Sort', 'Search',
        'Frontend', 'Backend', 'FullStack', 'DevOps', 'CI/CD', 'Testing', 'Debug', 'Deploy', 'Scale', 'Optimize'
    ];
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'tech-particle';
        particle.innerHTML = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        
        // Random position and properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.fontSize = (10 + Math.random() * 8) + 'px';
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }
    
    // Create initial particles
    for (let i = 0; i < 25; i++) {
        setTimeout(() => createParticle(), i * 500);
    }
    
    // Continue creating particles
    setInterval(createParticle, 1200);
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    
    // Update icon based on current theme
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    createTechParticles();
    initThemeToggle();
});

// Initialize skill items for animation - make them visible by default
document.querySelectorAll('.skill-item').forEach(item => {
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
    
    // Add hover effects
    item.addEventListener('mouseenter', () => {
        const skillName = item.getAttribute('data-skill');
        item.style.transform = 'translateY(-10px) scale(1.05)';
        
        // Add glitch effect to skill name
        const skillText = item.querySelector('span');
        skillText.style.textShadow = '0 0 10px var(--primary-color)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        const skillText = item.querySelector('span');
        skillText.style.textShadow = 'none';
    });
});

// Initialize project cards for animation - make them visible by default
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
});

// Initialize achievement cards for animation - make them visible by default
document.querySelectorAll('.achievement-card').forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
});

// Parallax Effect for Hero Background
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg-animation');
    
    if (heroBackground) {
        const speed = scrolled * 0.5;
        heroBackground.style.transform = `translateY(${speed}px)`;
    }
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields!', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #4CAF50;' : ''}
        ${type === 'error' ? 'background: #f44336;' : ''}
        ${type === 'info' ? 'background: var(--primary-color);' : ''}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Matrix Rain Effect (Optional - for extra tech feel)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 15, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Removed custom cursor for better performance

// Event Listeners
window.addEventListener('scroll', () => {
    highlightActiveNav();
    parallaxEffect();
});

window.addEventListener('load', () => {
    // Initialize matrix rain effect (uncomment if desired)
    // createMatrixRain();
    
    // Keep default cursor for better performance
    
    // Add loading animation complete class
    document.body.classList.add('loaded');
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    highlightActiveNav();
    parallaxEffect();
}, 16)); // ~60fps

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    body.loaded * {
        animation-play-state: running;
    }
    
    .cursor-trail {
        animation: trailFade 0.5s ease-out forwards;
    }
    
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 Portfolio loaded successfully! Welcome to Jobayer\'s digital space.');
