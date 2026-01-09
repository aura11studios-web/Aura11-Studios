/**
 * animations.js
 * Cinematic Motion & Interactions for AURA11 Studios
 * 
 * TO DISABLE: Remove <script> tag or set window.AURA11_ANIMATIONS_ENABLED = false;
 */

(function () {
    // Feature Flag
    window.AURA11_ANIMATIONS_ENABLED = true;

    if (!window.AURA11_ANIMATIONS_ENABLED) return;

    // --- Configuration & Utils ---
    const isMobile = window.innerWidth < 768;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Helper: Add classes safely
    const addClass = (el, cls) => el && el.classList.add(cls);

    document.addEventListener('DOMContentLoaded', () => {
        initHeroAnimations();
        initStaggeredReveals();
        initGalleryTilt();
        initStatsCounters();
        initMicroInteractions();
    });

    // --- 1. Hero Animations ---
    function initHeroAnimations() {
        if (reducedMotion) return;

        const hero = document.querySelector('.hero-section');
        const heroBg = document.querySelector('.hero-bg');
        const h1 = document.querySelector('.hero-content h1');
        const subtitle = document.querySelector('.hero-subtitle');
        const buttons = document.querySelector('.hero-buttons');

        // Text Entrance
        if (h1) {
            h1.style.transitionDelay = '100ms';
            addClass(h1, 'visible');
        }
        if (subtitle) {
            subtitle.style.transitionDelay = '300ms';
            addClass(subtitle, 'visible');
        }
        if (buttons) {
            buttons.style.transitionDelay = '500ms';
            addClass(buttons, 'visible');
        }

        // Parallax (Desktop Only)
        if (!isMobile && heroBg) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight) {
                    // Move background at 0.25x speed
                    heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
                }
            }, { passive: true });
        }

        // Floating Badges (Dynamic Injection)
        if (!isMobile && hero) {
            const badgeContainer = document.createElement('div');
            badgeContainer.className = 'hero-badges';
            badgeContainer.innerHTML = `
                <div class="badge">4K Production</div>
                <div class="badge">Cinematic Grading</div>
                <div class="badge">Sound Design</div>
            `;
            hero.appendChild(badgeContainer);

            // Reveal badges after main text
            setTimeout(() => {
                const badges = document.querySelectorAll('.badge');
                badges.forEach((b, i) => addClass(b, 'visible'));
            }, 800);
        }
    }

    // --- 2. Staggered Reveals ---
    function initStaggeredReveals() {
        // Select elements to animate
        const targets = document.querySelectorAll(
            '.service-card, .gallery-item, .film-card, .testimonial-card, .team-card'
        );

        const observerOptions = {
            root: null,
            threshold: 0.15, // Trigger when 15% visible
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    // Calculate index relative to parent to create stagger effect per-section
                    const parent = el.parentElement;
                    const index = Array.from(parent.children).indexOf(el);

                    // Delay based on index (100ms stagger)
                    const delay = reducedMotion ? 0 : index * 100;

                    el.style.transitionDelay = `${delay}ms`;
                    addClass(el, 'stagger-reveal');

                    // Force reflow to ensure transition happens
                    void el.offsetWidth;

                    addClass(el, 'visible');
                    observer.unobserve(el);
                }
            });
        }, observerOptions);

        targets.forEach(target => {
            // prepare for animation
            addClass(target, 'stagger-reveal');
            observer.observe(target);
        });
    }

    // --- 3. Gallery 3D Tilt ---
    function initGalleryTilt() {
        if (isMobile || reducedMotion) return;

        const cards = document.querySelectorAll('.gallery-item');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate rotation (max +/- 5deg)
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -3; // Invert Y
                const rotateY = ((x - centerX) / centerX) * 3;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // --- 4. Stats Counters ---
    function initStatsCounters() {
        const stats = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const finalValue = el.innerText; // e.g. "500+"
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    const suffix = finalValue.replace(/[0-9]/g, '');

                    if (!numericValue) return;

                    animateValue(el, 0, numericValue, 2000, suffix);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    function animateValue(obj, start, end, duration, suffix) {
        if (reducedMotion) {
            obj.innerHTML = end + suffix;
            return;
        }

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // EaseOutExpo function
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            obj.innerHTML = Math.floor(easeProgress * (end - start) + start) + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // --- 5. Micro Interactions & A11y ---
    function initMicroInteractions() {
        // FAQ Keyboard Support
        const faqHeaders = document.querySelectorAll('.accordion-header');
        faqHeaders.forEach(header => {
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');

            header.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });

            header.addEventListener('click', () => {
                const expanded = header.getAttribute('aria-expanded') === 'true';
                header.setAttribute('aria-expanded', !expanded);
            });
        });
    }

})();
