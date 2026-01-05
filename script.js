
 
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














 // State
        let currentUnit = 'metric'; // 'metric' or 'imperial'
        
        // DOM Elements
        const heightInput = document.getElementById('height');
        const weightInput = document.getElementById('weight');
        const heightVal = document.getElementById('height-val');
        const weightVal = document.getElementById('weight-val');
        const heightUnit = document.getElementById('height-unit');
        const weightUnit = document.getElementById('weight-unit');
        const btnMetric = document.getElementById('btn-metric');
        const btnImperial = document.getElementById('btn-imperial');
        
        const needle = document.getElementById('needle');
        const gaugeFill = document.getElementById('gauge-fill');
        const mbiNumber = document.getElementById('mbi-number');
        const mbiCategory = document.getElementById('mbi-category');
        const mbiDesc = document.getElementById('mbi-desc');

        // Constants
        const BMI_CATEGORIES = {
            underweight: { limit: 18.5, color: 'var(--underweight)', label: 'Underweight', desc: 'You are below the healthy weight range. Consider consulting a nutritionist.' },
            normal: { limit: 24.9, color: 'var(--normal)', label: 'Normal Weight', desc: 'Great! Your weight is within the healthy range.' },
            overweight: { limit: 29.9, color: 'var(--overweight)', label: 'Overweight', desc: 'You are slightly above the healthy weight range. Exercise is recommended.' },
            obese: { limit: 100, color: 'var(--obese)', label: 'Obese', desc: 'You are significantly above the healthy range. Please consult a healthcare provider.' }
        };

        // Initialize
        function init() {
            addEventListeners();
            calculate();
        }

        function addEventListeners() {
            heightInput.addEventListener('input', calculate);
            weightInput.addEventListener('input', calculate);
        }

        // Toggle Unit System
        function setUnit(unit) {
            if (currentUnit === unit) return;
            currentUnit = unit;

            // Update Button Styles
            if (unit === 'metric') {
                btnMetric.classList.add('active');
                btnImperial.classList.remove('active');
                
                // Convert Imperial -> Metric logic for inputs
                // Current: ft (3-8), lbs (60-350) approx
                // We need to approximate inverse mapping. 
                // Simplest UX: Reset to defaults or try to approximate.
                // Let's approximate for better UX:
                let oldWeight = parseInt(weightInput.value); // lbs
                let oldHeight = parseInt(heightInput.value); // inches (range handled differently)

                // Switch range attributes for Metric
                heightInput.min = 100; heightInput.max = 220;
                weightInput.min = 30; weightInput.max = 150;
                
                // Convert values (rough approximations for sliders)
                // Height in inches -> cm
                let newHeightCm = Math.round(oldHeight * 2.54); 
                if(newHeightCm < 100) newHeightCm = 170; // safe fallback
                if(newHeightCm > 220) newHeightCm = 200;

                // Weight in lbs -> kg
                let newWeightKg = Math.round(oldWeight * 0.453592);
                if(newWeightKg < 30) newWeightKg = 70;
                if(newWeightKg > 150) newWeightKg = 100;

                heightInput.value = newHeightCm;
                weightInput.value = newWeightKg;

                heightUnit.innerText = 'cm';
                weightUnit.innerText = 'kg';

            } else {
                btnImperial.classList.add('active');
                btnMetric.classList.remove('active');

                // Convert Metric -> Imperial
                let oldHeightCm = parseInt(heightInput.value);
                let oldWeightKg = parseInt(weightInput.value);

                // Switch range attributes for Imperial
                // Height: 4ft (48in) to 7ft (84in)
                heightInput.min = 48; heightInput.max = 88;
                // Weight: 80lbs to 350lbs
                weightInput.min = 80; weightInput.max = 350;

                // Convert values
                let newHeightIn = Math.round(oldHeightCm / 2.54);
                let newWeightLbs = Math.round(oldWeightKg / 0.453592);

                // Bounds check
                if(newHeightIn < 48) newHeightIn = 60;
                if(newHeightIn > 88) newHeightIn = 75;
                if(newWeightLbs < 80) newWeightLbs = 150;
                if(newWeightLbs > 350) newWeightLbs = 200;

                heightInput.value = newHeightIn;
                weightInput.value = newWeightLbs;

                heightUnit.innerText = 'in';
                weightUnit.innerText = 'lbs';
            }

            calculate();
        }

        // Main Calculation Logic
        function calculate() {
            const h = parseInt(heightInput.value);
            const w = parseInt(weightInput.value);

            // Update text displays
            heightVal.innerText = h;
            weightVal.innerText = w;

            let mbi = 0;

            if (currentUnit === 'metric') {
                // BMI = kg / (m^2)
                const heightInMeters = h / 100;
                mbi = w / (heightInMeters * heightInMeters);
            } else {
                // BMI = 703 * lbs / (in^2)
                mbi = 703 * w / (h * h);
            }

            mbi = Math.round(mbi * 10) / 10; // Round to 1 decimal

            updateGauge(mbi);
            updateText(mbi);
        }

        function updateText(mbi) {
            // Determine Category
            let cat = '';
            if (mbi < 18.5) cat = 'underweight';
            else if (mbi < 25) cat = 'normal';
            else if (mbi < 30) cat = 'overweight';
            else cat = 'obese';

            const data = BMI_CATEGORIES[cat];

            // Update DOM text
            animateValue(mbiNumber, parseFloat(mbiNumber.innerText), mbi, 800);
            
            mbiCategory.innerText = data.label;
            mbiCategory.style.color = data.color;
            mbiDesc.innerText = data.desc;
        }

        function updateGauge(mbi) {
            // Determine Category for Color
            let cat = '';
            if (mbi < 18.5) cat = 'underweight';
            else if (mbi < 25) cat = 'normal';
            else if (mbi < 30) cat = 'overweight';
            else cat = 'obese';

            const color = BMI_CATEGORIES[cat].color;
            gaugeFill.style.backgroundColor = color;

            // Calculate Angle
            // Map BMI 10 to 40 to -180deg to 0deg (Semi circle gauge)
            // Min visual BMI: 15, Max visual BMI: 35
            const minBMI = 15;
            const maxBMI = 35;
            
            let percentage = (mbi - minBMI) / (maxBMI - minBMI);
            if (percentage < 0) percentage = 0;
            if (percentage > 1) percentage = 1;

            // -180deg is left, 0deg is right
            const deg = (percentage * 180) - 180;

            // Rotate needle
            needle.style.transform = `translateX(-50%) rotate(${deg}deg)`;
            
            // Rotate fill arc (starts at -180 and grows)
            // We set clip-path polygon, but for a dynamic fill width, we can use conic-gradient logic or rotate.
            // Simplest approach with current CSS: Rotate the div.
            // The fill div is a full circle clipped to top half. 
            // If we rotate it, we reveal the color.
            // -180 is fully hidden (0%), 0 is fully shown (100%).
            gaugeFill.style.transform = `rotate(${deg}deg)`;
        }

        // Utility: Number counting animation
        function animateValue(obj, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                // Ease out quart
                const easeProgress = 1 - Math.pow(1 - progress, 4);
                
                obj.innerHTML = (start + (end - start) * easeProgress).toFixed(1);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Start
        init();