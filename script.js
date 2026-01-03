
 
        // 1. Smart Navigation Bar (Sticky & Background Change)
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // 2. Mobile Menu Toggle
        const menuToggle = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // 3. Animated Scroll Down (Fade In Elements)
        const revealElements = document.querySelectorAll('.reveal');

        const revealOnScroll = () => {
            const windowHeight = window.innerHeight;
            const elementVisible = 150;

            revealElements.forEach((reveal) => {
                const elementTop = reveal.getBoundingClientRect().top;
                if (elementTop < windowHeight - elementVisible) {
                    reveal.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        // Trigger once on load
        revealOnScroll();

        // 4. Transformation Slider Logic (Scroll Left/Right)
        const slider = document.getElementById('transSlider');

        function scrollSlider(direction) {
            slider.scrollBy({
                left: direction,
                behavior: 'smooth'
            });
        }

        // 5. Lightbox (Click to Zoom)
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        function openLightbox(element) {
            const img = element.querySelector('img');
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop scrolling
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto'; // Resume scrolling
        }

        // Close lightbox when clicking outside image
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // 6. WhatsApp Sales Logic
        // Replace with your actual WhatsApp number
        const phoneNumber = "1234567890"; 

        function buyMerch() {
            const message = encodeURIComponent("Hello, I would like to buy the T-Shirt");
            window.open(`https://wa.me/${94740802427}?text=${message}`, '_blank');
        }

        function buyPT(packageName, price) {
            const message = encodeURIComponent(`Hello, I'm interested in the ${packageName} Personal Training package for ${price}. Please provide more details.`);
            window.open(`https://wa.me/${94740802427}?text=${message}`, '_blank');
        }


