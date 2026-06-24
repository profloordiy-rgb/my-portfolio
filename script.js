/* ============================================================
   DHRUV CHAURASIYA — PORTFOLIO INTERACTIVE SCRIPTS
   Particles · Typing · Scroll Animations · Portfolio Filter
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // ── Particle System ──
    const canvas = document.getElementById('heroParticles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrame;
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }
        function createParticles() {
            particles = [];
            const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.4,
                    speedY: (Math.random() - 0.5) * 0.4,
                    opacity: Math.random() * 0.5 + 0.1
                });
            }
        }
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p, i) => {
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(102, 126, 234, ${p.opacity})`;
                ctx.fill();
                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[j].x - p.x;
                    const dy = particles[j].y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(102, 126, 234, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });
            animationFrame = requestAnimationFrame(drawParticles);
        }
        resizeCanvas();
        createParticles();
        drawParticles();
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }
    // ── Typing Animation ──
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        const roles = [
            'Web Designer',
            'WordPress Expert',
            'Full Stack Developer',
            'Frontend Developer',
            'Creative Professional'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;
        function typeEffect() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400; // Pause before next word
            }
            setTimeout(typeEffect, typingSpeed);
        }
        setTimeout(typeEffect, 1000);
    }
    // ── Navbar Scroll Effect ──
    const navbar = document.getElementById('navbar');
    const scrollTop = document.getElementById('scrollTop');
    const whatsappFloat = document.getElementById('whatsappFloat');
    function handleScroll() {
        const scrollY = window.scrollY;
        // Navbar
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        // Scroll to top button
        if (scrollY > 500) {
            scrollTop.classList.add('visible');
        } else {
            scrollTop.classList.remove('visible');
        }
        // Active nav link
        updateActiveNav();
    }
    window.addEventListener('scroll', handleScroll);
    // Scroll to top
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    // ── Active Nav Link on Scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    function updateActiveNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    // ── Mobile Menu ──
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    // ── Smooth Scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // ── Scroll-Triggered Animations (Intersection Observer) ──
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    animatedElements.forEach(el => observer.observe(el));
    // ── Skill Bar Animation ──
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                bar.style.setProperty('--progress-width', progress + '%');
                bar.classList.add('animated');
                skillObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    skillProgressBars.forEach(bar => skillObserver.observe(bar));
    // ── Counter Animation ──
    const counters = document.querySelectorAll('.hero-stat-number');
    let countersAnimated = false;
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    const duration = 2000;
                    const start = performance.now();
                    function updateCounter(timestamp) {
                        const elapsed = timestamp - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        counter.textContent = Math.floor(eased * target);
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }
                    requestAnimationFrame(updateCounter);
                });
            }
        });
    }, { threshold: 0.5 });
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) counterObserver.observe(heroStats);
    // ── Portfolio Filter ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                    item.style.transitionDelay = (index * 0.08) + 's';
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                    item.style.transitionDelay = '0s';
                }
            });
        });
    });
    // Initialize all portfolio items as visible
    portfolioItems.forEach(item => item.classList.add('show'));
    // ── Testimonial Slider ──
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    let currentSlide = 0;
    let autoSlideInterval;
    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        currentSlide = ((index % testimonialCards.length) + testimonialCards.length) % testimonialCards.length;
        testimonialCards[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.getAttribute('data-slide')));
            resetAutoSlide();
        });
    });
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    startAutoSlide();
    // ── Contact Form Handling ──
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get form data
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            // Animate button
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            // Simulate sending (replace with actual backend call)
            setTimeout(() => {
                // Show success
                formSuccess.classList.add('show');
                submitBtn.innerHTML = '<span>Sent!</span><i class="fas fa-check"></i>';
                // Construct WhatsApp message as fallback
                const waMessage = `Hi Dhruv!%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ASubject: ${encodeURIComponent(subject)}%0AMessage: ${encodeURIComponent(message)}`;
                
                // Open WhatsApp with the message
                window.open(`https://wa.me/916389757585?text=${waMessage}`, '_blank');
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    formSuccess.classList.remove('show');
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                }, 4000);
            }, 1200);
        });
    }
    // ── Cursor Glow Effect (Desktop Only) ──
    const cursorGlow = document.getElementById('cursorGlow');
    if (window.matchMedia('(pointer: fine)').matches && cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.classList.add('active');
        });
        document.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });
    }
    // ── Tilt Effect on Skill Cards ──
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
    // ── Image Error Fallback ──
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Create gradient placeholder
            this.style.display = 'none';
            const parent = this.parentElement;
            if (parent && !parent.querySelector('.img-fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'img-fallback';
                fallback.style.cssText = `
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, #111638 0%, #1a1a4e 50%, #0a0f2c 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(102, 126, 234, 0.3);
                    font-size: 3rem;
                `;
                fallback.innerHTML = '<i class="fas fa-image"></i>';
                parent.style.position = 'relative';
                parent.insertBefore(fallback, this);
            }
        });
    });
    // ── Preloader (optional — fades in page) ──
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease-out';
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
    // Fallback: ensure body is visible even if load event already fired
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
