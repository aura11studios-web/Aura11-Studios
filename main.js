<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '8px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.padding = '12px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (menuToggle && mobileOverlay) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Force Scroll to Hash on Load (Fix for "Back to Gallery") ---
    window.addEventListener('load', () => {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    // Use CSS scroll-margin/padding for offset, or calculated offset here
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Small delay to ensure layout is ready
            }
        }
    });

    // --- Active Navigation Highlight (Scroll Spy) ---
    const navLinks = document.querySelectorAll('.desktop-nav a');
    const scrollSections = document.querySelectorAll('section, header'); // Include header for 'home'

    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px', // Trigger when section is near top
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active to current
                const id = entry.target.getAttribute('id');
                if (id) {
                    const activeLink = document.querySelector(`.desktop-nav a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }
        });
    }, navObserverOptions);

    scrollSections.forEach(section => {
        navObserver.observe(section);
    });

    // --- Gallery Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => item.style.opacity = '1', 50); // Hacky fade in
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                }
            });
        });
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // --- Video Modal ---
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const videoClose = document.querySelector('.video-modal-close');
    const playBtns = document.querySelectorAll('.play-btn, .btn-text');

    // Sample video URL (acting as the "embedded" player)
    const videoMap = {
        'VIDEO_ID_1': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
        'VIDEO_ID_2': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
        'VIDEO_ID_3': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    };

    playBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const videoId = btn.getAttribute('data-video-id');
            if (videoId && videoMap[videoId]) {
                e.preventDefault();
                videoFrame.src = videoMap[videoId];
                videoModal.style.display = 'flex';
            }
        });
    });

    if (videoClose) {
        videoClose.addEventListener('click', () => {
            videoModal.style.display = 'none';
            videoFrame.src = ''; // Stop video
        });
    }

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            videoFrame.src = '';
        }
    });

    // --- Contact Form ---
    // Removed fake submission logic to allow FormSubmit.co integration
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        // Dynamically set the redirect URL to the current page + #contact with a success flag
        const nextInput = bookingForm.querySelector('input[name="_next"]');
        if (nextInput) {
            // We append ?success=true so we can detect the return
            nextInput.value = window.location.origin + window.location.pathname + "?success=true#contact";
        }
    }

    // Check for success URL parameter (User returned from FormSubmit)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const btn = document.querySelector('#booking-form button');
        if (btn) {
            btn.textContent = "Thank you! We will get back to you within 24 hours.";
            btn.style.backgroundColor = '#25D366'; // Green
            btn.disabled = true;

            // Clean up URL to prevent refreshing showing the message again
            if (history.replaceState) {
                const newUrl = window.location.origin + window.location.pathname + "#contact";
                history.replaceState({ path: newUrl }, '', newUrl);
            }
        }
    }

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section, .hero-content');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    console.log("AURA11 Studios - Interactive Elements Loaded");

    // --- FAQ Accordion ---    
    const items = document.querySelectorAll(".accordion-item");

    items.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");

        // Start closed
        content.style.maxHeight = 0;

        header.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            // Close all items (only one open at a time)
            items.forEach((other) => {
                other.classList.remove("active");
                const otherContent = other.querySelector(".accordion-content");
                otherContent.style.maxHeight = 0;
            });

            // If the clicked one was closed, open it
            if (!isOpen) {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- HERO PARALLAX MOTION ---
    window.addEventListener("scroll", () => {
        if (window.innerWidth > 768) {
            const scrolled = window.scrollY;
            const heroBg = document.querySelector(".hero-bg-image");
            if (heroBg) {
                // Slower parallax for smoother feel
                heroBg.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
            }
        }
    });

    // --- CINEMATIC STAGGER ANIMATION ---
    const revealItems = document.querySelectorAll(".service-card, .gallery-item, .team-card, .testimonial-card, .footer-content-grid");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Determine staggers based on row position or just index
                // Reset index for staggers per section? 
                // For now, simple stagger is fine.
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, 100); // 100ms fast stagger to feel responsive

                // Stop observing once visible? No, keep it simple.
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(item => {
        item.classList.add("fade-in"); // Apply global fade-in class
        revealObserver.observe(item);
    });

    /* --- Dynamic WhatsApp Message --- */
    const whatsappBtn = document.querySelector(".whatsapp-float");
    if (whatsappBtn) {
        let message = "Hi Aura11 Studios, I came across your website and I want details about your services and pricing.";

        // Basic check based on URL hash or path - simplified for one-page structure
        const currentHash = window.location.hash;

        if (currentHash.includes("services")) {
            message = "Hi Aura11 Studios, I want details about your services and pricing.";
        } else if (currentHash.includes("gallery") || window.location.pathname.includes("gallery")) {
            message = "Hi Aura11 Studios, I loved your work and want to discuss a shoot.";
        } else if (currentHash.includes("contact")) {
            message = "Hi Aura11 Studios, I want to book a shoot. Please guide me.";
        }

        const phone = "7569606762";
        const encodedMessage = encodeURIComponent(message);
        whatsappBtn.href = `https://wa.me/${phone}?text=${encodedMessage}`;
    }

});


=======
document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '8px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.padding = '12px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    if (menuToggle && mobileOverlay) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Force Scroll to Hash on Load (Fix for "Back to Gallery") ---
    window.addEventListener('load', () => {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    // Use CSS scroll-margin/padding for offset, or calculated offset here
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Small delay to ensure layout is ready
            }
        }
    });

    // --- Active Navigation Highlight (Scroll Spy) ---
    const navLinks = document.querySelectorAll('.desktop-nav a');
    const scrollSections = document.querySelectorAll('section, header'); // Include header for 'home'

    const navObserverOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px', // Trigger when section is near top
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active from all
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active to current
                const id = entry.target.getAttribute('id');
                if (id) {
                    const activeLink = document.querySelector(`.desktop-nav a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            }
        });
    }, navObserverOptions);

    scrollSections.forEach(section => {
        navObserver.observe(section);
    });

    // --- Gallery Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    setTimeout(() => item.style.opacity = '1', 50); // Hacky fade in
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                }
            });
        });
    });

    // --- Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'flex';
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // --- Video Modal ---
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const videoClose = document.querySelector('.video-modal-close');
    const playBtns = document.querySelectorAll('.play-btn, .btn-text');

    // Sample video URL (acting as the "embedded" player)
    const videoMap = {
        'VIDEO_ID_1': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
        'VIDEO_ID_2': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
        'VIDEO_ID_3': 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
    };

    playBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const videoId = btn.getAttribute('data-video-id');
            if (videoId && videoMap[videoId]) {
                e.preventDefault();
                videoFrame.src = videoMap[videoId];
                videoModal.style.display = 'flex';
            }
        });
    });

    if (videoClose) {
        videoClose.addEventListener('click', () => {
            videoModal.style.display = 'none';
            videoFrame.src = ''; // Stop video
        });
    }

    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            videoFrame.src = '';
        }
    });

    // --- Contact Form ---
    // Removed fake submission logic to allow FormSubmit.co integration
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        // Dynamically set the redirect URL to the current page + #contact with a success flag
        const nextInput = bookingForm.querySelector('input[name="_next"]');
        if (nextInput) {
            // We append ?success=true so we can detect the return
            nextInput.value = window.location.origin + window.location.pathname + "?success=true#contact";
        }
    }

    // Check for success URL parameter (User returned from FormSubmit)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const btn = document.querySelector('#booking-form button');
        if (btn) {
            btn.textContent = "Thank you! We will get back to you within 24 hours.";
            btn.style.backgroundColor = '#25D366'; // Green
            btn.disabled = true;

            // Clean up URL to prevent refreshing showing the message again
            if (history.replaceState) {
                const newUrl = window.location.origin + window.location.pathname + "#contact";
                history.replaceState({ path: newUrl }, '', newUrl);
            }
        }
    }

    // --- Scroll Animations ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section, .hero-content');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });

    console.log("AURA11 Studios - Interactive Elements Loaded");

    // --- FAQ Accordion ---    
    const items = document.querySelectorAll(".accordion-item");

    items.forEach((item) => {
        const header = item.querySelector(".accordion-header");
        const content = item.querySelector(".accordion-content");

        // Start closed
        content.style.maxHeight = 0;

        header.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            // Close all items (only one open at a time)
            items.forEach((other) => {
                other.classList.remove("active");
                const otherContent = other.querySelector(".accordion-content");
                otherContent.style.maxHeight = 0;
            });

            // If the clicked one was closed, open it
            if (!isOpen) {
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- HERO PARALLAX MOTION ---
    window.addEventListener("scroll", () => {
        if (window.innerWidth > 768) {
            const scrolled = window.scrollY;
            const heroBg = document.querySelector(".hero-bg-image");
            if (heroBg) {
                // Slower parallax for smoother feel
                heroBg.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
            }
        }
    });

    // --- CINEMATIC STAGGER ANIMATION ---
    const revealItems = document.querySelectorAll(".service-card, .gallery-item, .team-card, .testimonial-card, .footer-content-grid");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Determine staggers based on row position or just index
                // Reset index for staggers per section? 
                // For now, simple stagger is fine.
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, 100); // 100ms fast stagger to feel responsive

                // Stop observing once visible? No, keep it simple.
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(item => {
        item.classList.add("fade-in"); // Apply global fade-in class
        revealObserver.observe(item);
    });

    /* --- Dynamic WhatsApp Message --- */
    const whatsappBtn = document.querySelector(".whatsapp-float");
    if (whatsappBtn) {
        let message = "Hi Aura11 Studios, I came across your website and I want details about your services and pricing.";

        // Basic check based on URL hash or path - simplified for one-page structure
        const currentHash = window.location.hash;

        if (currentHash.includes("services")) {
            message = "Hi Aura11 Studios, I want details about your services and pricing.";
        } else if (currentHash.includes("gallery") || window.location.pathname.includes("gallery")) {
            message = "Hi Aura11 Studios, I loved your work and want to discuss a shoot.";
        } else if (currentHash.includes("contact")) {
            message = "Hi Aura11 Studios, I want to book a shoot. Please guide me.";
        }

        const phone = "7569606762";
        const encodedMessage = encodeURIComponent(message);
        whatsappBtn.href = `https://wa.me/${phone}?text=${encodedMessage}`;
    }

});


>>>>>>> 3b726a6 (Initial website upload from Anti-Gravity)
