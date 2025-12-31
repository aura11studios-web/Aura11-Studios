document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.padding = '20px 0';
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        }
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
            e.preventDefault();
            const videoId = btn.getAttribute('data-video-id');
            if (videoMap[videoId]) {
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
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = "Sending...";
            btn.disabled = true;

            // Simulate server request
            setTimeout(() => {
                btn.textContent = "Sent Successfully!";
                btn.style.backgroundColor = '#25D366'; // Green
                bookingForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
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
        const scrolled = window.scrollY;
        const heroBg = document.querySelector(".hero-bg");
        if (heroBg) {
            heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // --- CINEMATIC STAGGER ANIMATION ---
    const revealItems = document.querySelectorAll(".service-card, .gallery-item, .film-card, .testimonial-card");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 120);
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => {
        item.classList.add("fade-in");
        revealObserver.observe(item);
    });

});


