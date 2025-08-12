// Cyberpunk Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMatrixRain();
    initNavigation();
    initTerminalAnimation();
    initScrollAnimations();
    initSkillBars();
    initGlitchEffects();
    initParticleEffects();
});

// Matrix Rain Effect
function initMatrixRain() {
    const matrixContainer = document.getElementById('matrixRain');
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    // Create matrix columns
    for (let i = 0; i < columns; i++) {
        createMatrixColumn(matrixContainer, characters, i);
    }
    
    // Resize handler
    window.addEventListener('resize', () => {
        const newColumns = Math.floor(window.innerWidth / 20);
        if (newColumns !== columns) {
            matrixContainer.innerHTML = '';
            for (let i = 0; i < newColumns; i++) {
                createMatrixColumn(matrixContainer, characters, i);
            }
        }
    });
}

function createMatrixColumn(container, characters, index) {
    const column = document.createElement('div');
    column.style.cssText = `
        position: absolute;
        left: ${index * 20}px;
        top: -100vh;
        width: 20px;
        height: 100vh;
        font-family: 'JetBrains Mono', monospace;
        font-size: 14px;
        color: #00ff41;
        text-align: center;
        pointer-events: none;
        animation: matrixFall ${3 + Math.random() * 5}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
        opacity: ${0.3 + Math.random() * 0.7};
    `;
    
    // Fill column with random characters
    for (let i = 0; i < 50; i++) {
        const char = document.createElement('div');
        char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
        char.style.cssText = `
            line-height: 20px;
            opacity: ${Math.random()};
        `;
        column.appendChild(char);
    }
    
    container.appendChild(column);
    
    // Add CSS animation if not exists
    if (!document.querySelector('#matrix-animation')) {
        const style = document.createElement('style');
        style.id = 'matrix-animation';
        style.textContent = `
            @keyframes matrixFall {
                0% { transform: translateY(-100vh); }
                100% { transform: translateY(100vh); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Navigation Functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });
    
    // Smooth scrolling for nav links
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
                
                // Close mobile menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Terminal Animation
function initTerminalAnimation() {
    const cursor = document.getElementById('cursor');
    const outputLines = document.querySelectorAll('.output-line');
    
    // Start cursor blinking
    let cursorVisible = true;
    setInterval(() => {
        cursor.style.opacity = cursorVisible ? '1' : '0';
        cursorVisible = !cursorVisible;
    }, 500);
    
    // Animate terminal output with delays
    setTimeout(() => {
        outputLines.forEach((line, index) => {
            const delay = parseInt(line.getAttribute('data-delay')) || (index * 500 + 1000);
            setTimeout(() => {
                line.classList.remove('hidden');
                line.classList.add('visible');
                
                // Add typewriter effect
                animateText(line);
            }, delay);
        });
    }, 500);
}

function animateText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('visible');
    
    let i = 0;
    const typeInterval = setInterval(() => {
        element.textContent = text.slice(0, i + 1);
        i++;
        
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, 30);
}

// Scroll Animations
function initScrollAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Trigger skill bar animations when skills section is visible
                if (entry.target.closest('#skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.cyber-card, .section-title, .terminal-prompt');
    animatedElements.forEach(el => observer.observe(el));
}

// Skill Bar Animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Set up skill progress data
    const skillData = [
        { selector: '.skill-progress', progress: [95, 90, 88, 92, 85, 87, 94, 89, 83, 91, 93, 86, 90, 84, 87, 89] }
    ];
    
    skillBars.forEach((bar, index) => {
        const progress = [95, 90, 88, 92, 85, 87, 94, 89, 83, 91, 93, 86, 90, 84, 87, 89][index] || 80;
        bar.setAttribute('data-progress', progress);
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, index * 100);
    });
}

// Glitch Effects
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.cyber-text');
    
    glitchElements.forEach(element => {
        element.setAttribute('data-text', element.textContent);
        
        // Random glitch trigger
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                element.classList.add('glitch');
                setTimeout(() => {
                    element.classList.remove('glitch');
                }, 300);
            }
        }, 2000);
    });
}

// Particle Effects
function initParticleEffects() {
    // Create floating particles
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        createFloatingParticle(particleContainer);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const color = ['#00ff41', '#ff0000', '#b87333', '#39ff14'][Math.floor(Math.random() * 4)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        animation: floatParticle ${10 + Math.random() * 10}s linear infinite;
        box-shadow: 0 0 ${size * 2}px ${color};
    `;
    
    container.appendChild(particle);
    
    // Add floating animation
    if (!document.querySelector('#particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Card Hover Effects
document.querySelectorAll('.cyber-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.4), 0 0 60px rgba(0, 255, 65, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
});

// Contact Link Interactions
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 20px #00ff41, 0 0 40px #00ff41';
        this.style.transform = 'scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.textShadow = '';
        this.style.transform = 'scale(1)';
    });
});

// Terminal Command Typing Effect
function typeCommand(element, text, callback) {
    let i = 0;
    const interval = setInterval(() => {
        element.textContent = text.slice(0, i + 1);
        i++;
        
        if (i > text.length) {
            clearInterval(interval);
            if (callback) callback();
        }
    }, 50);
}

// Random Background Color Shifts
function initBackgroundShifts() {
    const colors = [
        'linear-gradient(45deg, #000000 0%, #0d0d0d 50%, #1a1a1a 100%)',
        'linear-gradient(135deg, #000000 0%, #001a00 50%, #0d0d0d 100%)',
        'linear-gradient(225deg, #0d0000 0%, #000000 50%, #0d0d0d 100%)'
    ];
    
    setInterval(() => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.querySelector('.cyber-bg').style.background = randomColor;
    }, 10000);
}

// Performance Optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        updateActiveNavLink();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
    
    // Lazy load heavy animations
    const observerOptions = {
        rootMargin: '100px'
    };
    
    const lazyAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                lazyAnimationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill-card, .motto-card').forEach(el => {
        lazyAnimationObserver.observe(el);
    });
}

// Initialize background shifts and performance optimizations
setTimeout(() => {
    initBackgroundShifts();
    optimizePerformance();
}, 1000);

// Error Handling
window.addEventListener('error', (e) => {
    console.warn('Cyberpunk Portfolio Error:', e.message);
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Hide loading if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
});

// Easter Eggs
let konami = [];
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konami.push(e.keyCode);
    if (konami.length > konamiCode.length) {
        konami.shift();
    }
    
    if (konami.toString() === konamiCode.toString()) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #00ff41;
        padding: 2rem;
        border: 2px solid #00ff41;
        border-radius: 10px;
        font-family: 'JetBrains Mono', monospace;
        text-align: center;
        z-index: 10000;
        box-shadow: 0 0 30px #00ff41;
    `;
    message.innerHTML = `
        <h2>🎉 KONAMI CODE ACTIVATED! 🎉</h2>
        <p>Welcome to the hidden depths of Xeyronox's digital realm...</p>
        <p style="margin-top: 1rem; font-size: 0.8rem; opacity: 0.7;">
            xeyronox@phantom~$ sudo access_granted
        </p>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => message.remove(), 500);
    }, 3000);
    
    // Trigger special effects
    document.body.style.animation = 'glitch 0.3s ease-in-out 5';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 1500);
}