// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Vanta.js Birds effect with custom settings
let vantaEffect;

function initVanta() {
    if (typeof VANTA !== 'undefined') {
        vantaEffect = VANTA.BIRDS({
            el: "#vanta-background",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0x000000,
            backgroundAlpha: 1,
            color1: 0xff0000,
            color2: 0xd1ffff,
            colorMode: "varianceGradient",
            quantity: 5,
            birdSize: 1,
            wingSpan: 30,
            speedLimit: 5,
            separation: 20,
            alignment: 20,
            cohesion: 20
        });
    }
}

// Wait for DOM and scripts to load
window.addEventListener('DOMContentLoaded', () => {
    // Initialize Vanta after a short delay to ensure Three.js is loaded
    setTimeout(initVanta, 100);
    
    // Initialize all GSAP animations
    initAnimations();
});

// Reinitialize on window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (vantaEffect) {
            vantaEffect.resize();
        }
        ScrollTrigger.refresh();
    }, 250);
});

// ========== GSAP ANIMATIONS ==========

function initAnimations() {
    // Set initial states
    gsap.set('.hero-decorative-elements span', { opacity: 0, scale: 0 });
    gsap.set('.hero-title .title-line', { opacity: 0, y: 50 });
    gsap.set('.btn-hero-yellow', { opacity: 0, scale: 0.8, rotation: -10 });
    gsap.set('.hero-description-box', { opacity: 0, x: -100 });
    gsap.set('.scroll-indicator-box', { opacity: 0, x: 100 });
    gsap.set('.skill-card', { opacity: 0, y: 60, rotationX: -15 });
    gsap.set('.project-card', { opacity: 0, y: 80, scale: 0.9 });
    gsap.set('.stat-item', { opacity: 0, scale: 0.5 });
    gsap.set('.section-title', { opacity: 0, y: 30 });
    gsap.set('.about-text p', { opacity: 0, x: -30 });
    gsap.set('.contact-item', { opacity: 0, x: -50 });
    gsap.set('.contact-form', { opacity: 0, x: 50 });
    gsap.set('.form-group input, .form-group textarea', { opacity: 0, y: 20 });

    // Hero Section Animations
    const heroTimeline = gsap.timeline({ delay: 0.2 });
    
    // Animate decorative elements
    heroTimeline
        .to('.hero-decorative-elements span', {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'back.out(1.7)'
        })
        // Animate title lines
        .to('.hero-title .title-line', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.2')
        // Animate button
        .to('.btn-hero-yellow', {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'back.out(1.7)'
        }, '-=0.3')
        // Animate description box
        .to('.hero-description-box', {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power3.out'
        }, '-=0.3')
        // Animate scroll indicator
        .to('.scroll-indicator-box', {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'power3.out'
        }, '-=0.4');

    // Navbar animation on scroll - iPhone-like glass effect
    gsap.to('.navbar', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true
        },
        top: '10px',
        borderRadius: '20px',
        background: 'rgba(13, 17, 23, 0.85)',
        backdropFilter: 'blur(50px) saturate(200%)',
        WebkitBackdropFilter: 'blur(50px) saturate(200%)',
        boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        onUpdate: function() {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.classList.add('scrolled');
            }
        }
    });

    // Section Titles Animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // About Section Animation
    gsap.to('.about-text p', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.about',
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });

    // Stats Animation
    gsap.to('.stat-item', {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });

    // Animate numbers counting up
    gsap.utils.toArray('.stat-item h3').forEach(stat => {
        const target = parseInt(stat.textContent);
        if (!isNaN(target)) {
            const obj = { count: 0 };
            gsap.to(obj, {
                count: target,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                onUpdate: () => {
                    stat.textContent = Math.ceil(obj.count) + '+';
                }
            });
        }
    });

    // Skills Cards Animation
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            onEnter: () => {
                gsap.to(card, {
                    scale: 1.05,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Projects Cards Animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            delay: index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Contact Section Animation
    gsap.to('.contact-item', {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });

    gsap.to('.contact-form', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });

    gsap.to('.form-group input, .form-group textarea', {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });

    // Footer Animation
    gsap.to('.footer', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 95%',
            toggleActions: 'play none none none'
        }
    });
}

// ========== INTERACTIVE HOVER ANIMATIONS ==========

// Skill Cards Hover Effect
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -15,
            scale: 1.05,
            boxShadow: '0 8px 24px rgba(88, 166, 255, 0.3)',
            duration: 0.75,
            ease: 'power2.out'
        });
        gsap.to(card.querySelector('.skill-icon'), {
            scale: 1.2,
            rotation: 5,
            duration: 0.75,
            ease: 'back.out(1.7)'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
            duration: 0.75,
            ease: 'power2.out'
        });
        gsap.to(card.querySelector('.skill-icon'), {
            scale: 1,
            rotation: 0,
            duration: 0.75,
            ease: 'power2.out'
        });
    });
});

// Project Cards Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -15,
            scale: 1.02,
            boxShadow: '0 8px 24px rgba(88, 166, 255, 0.4)',
            duration: 0.43,
            ease: 'power1.out',
            force3D: true
        });
        gsap.to(card.querySelector('.project-image'), {
            scale: 1.05,
            duration: 0.43,
            ease: 'power1.out',
            force3D: true
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: '0 5px 20px rgba(0, 0, 0, 0.1)',
            duration: 0.43,
            ease: 'power1.out',
            force3D: true
        });
        gsap.to(card.querySelector('.project-image'), {
            scale: 1,
            duration: 0.43,
            ease: 'power1.out',
            force3D: true
        });
    });
});

// Button Hover Effects
document.querySelectorAll('.btn-hero-yellow, .btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mousedown', () => {
        gsap.to(btn, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseup', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
});

// Navbar Links Hover Effect - iPhone-like glass animations
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            y: -3,
            scale: 1.05,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
        gsap.to(link.querySelector('::before'), {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    link.addEventListener('mousedown', () => {
        gsap.to(link, {
            scale: 0.95,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    link.addEventListener('mouseup', () => {
        gsap.to(link, {
            scale: 1.05,
            duration: 0.2,
            ease: 'back.out(1.7)'
        });
    });
});

// Navbar brand hover effect
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
    navBrand.addEventListener('mouseenter', () => {
        gsap.to(navBrand, {
            scale: 1.05,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    });

    navBrand.addEventListener('mouseleave', () => {
        gsap.to(navBrand, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}

// Navbar overall hover effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    navbar.addEventListener('mouseenter', () => {
        gsap.to(navbar, {
            scale: 1.01,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    navbar.addEventListener('mouseleave', () => {
        gsap.to(navbar, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
}

// Form Input Focus Animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, {
            scale: 1.02,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', () => {
        gsap.to(input, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Project Links Hover
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            x: 5,
            duration: 0.2,
            ease: 'power2.out'
        });
    });

    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            x: 0,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Stat Items Hover Effect
document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            y: -10,
            scale: 1.05,
            duration: 0.75,
            ease: 'power2.out'
        });
        gsap.to(item.querySelector('h3'), {
            scale: 1.1,
            duration: 0.75,
            ease: 'back.out(1.7)'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power2.out'
        });
        gsap.to(item.querySelector('h3'), {
            scale: 1,
            duration: 0.75,
            ease: 'power2.out'
        });
    });
});

// Contact Items Hover
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            x: 10,
            scale: 1.05,
            duration: 0.75,
            ease: 'power2.out'
        });
        gsap.to(item.querySelector('.contact-icon'), {
            scale: 1.3,
            rotation: 10,
            duration: 0.75,
            ease: 'back.out(1.7)'
        });
    });

    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            x: 0,
            scale: 1,
            duration: 0.75,
            ease: 'power2.out'
        });
        gsap.to(item.querySelector('.contact-icon'), {
            scale: 1,
            rotation: 0,
            duration: 0.75,
            ease: 'power2.out'
        });
    });
});

// ========== MOBILE MENU ANIMATION ==========

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            // Close menu
            gsap.to(navMenu, {
                x: '-100vw',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
            gsap.to('.hamburger span:nth-child(1)', {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
            gsap.to('.hamburger span:nth-child(2)', {
                opacity: 1,
                duration: 0.3
            });
            gsap.to('.hamburger span:nth-child(3)', {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
        } else {
            // Open menu
            gsap.to(navMenu, {
                x: 0,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to('.hamburger span:nth-child(1)', {
                rotation: 45,
                y: 7,
                duration: 0.3
            });
            gsap.to('.hamburger span:nth-child(2)', {
                opacity: 0,
                duration: 0.3
            });
            gsap.to('.hamburger span:nth-child(3)', {
                rotation: -45,
                y: -7,
                duration: 0.3
            });
        }
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            gsap.to(navMenu, {
                x: '-100vw',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ========== SMOOTH SCROLL WITH GSAP ==========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            // Use native smooth scroll for better performance
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== PARALLAX EFFECT FOR HERO ==========

gsap.to('.hero-content', {
    y: -100,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true
    }
});

// Animate decorative elements on scroll
gsap.to('.hero-decorative-elements span', {
    y: -50,
    rotation: 5,
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        invalidateOnRefresh: true
    }
});

// ========== FORM SUBMISSION ANIMATION ==========

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        
        // Animate form submission
        gsap.to('.contact-form', {
            scale: 0.95,
            opacity: 0.7,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
            onComplete: () => {
                alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);
                contactForm.reset();
                gsap.to('.contact-form', {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
    });
}

// ========== CURSOR FOLLOW EFFECT (Optional Enhancement) ==========

// Add a subtle cursor follow effect for interactive elements
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(element, {
            '--mouse-x': x + 'px',
            '--mouse-y': y + 'px',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Cleanup Vanta on page unload
window.addEventListener('beforeunload', () => {
    if (vantaEffect && vantaEffect.destroy) {
        vantaEffect.destroy();
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
