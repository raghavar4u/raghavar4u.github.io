// Modern Portfolio Website JavaScript

class ModernPortfolio {
    constructor() {
        this.currentTab = 'home';
        this.typingTexts = [
            'Data Engineering',
            'AI/ML Solutions',
            'Cloud Architecture',
            'Team Leadership',
            'Digital Innovation'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupTabNavigation();
        this.setupAnimations();
        this.setupTypingEffect();
        this.setupParticleBackground();
        this.setupCounterAnimation();
        this.setupResumeButtons();
        this.showTab('home');
        this.startTypingEffect();
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = link.getAttribute('data-tab');
                this.showTab(tab);
                this.updateActiveNav(link);
                this.closeMobileMenu();
            });
        });

        // Hero buttons
        document.querySelectorAll('.hero-buttons button').forEach(button => {
            button.addEventListener('click', (e) => {
                const tab = button.getAttribute('data-tab');
                if (tab) {
                    this.showTab(tab);
                    this.updateActiveNavByTab(tab);
                }
            });
        });

        // Scroll handler for navbar effects
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            if (window.innerWidth > 968) {
                this.closeMobileMenu();
            }
            this.resizeParticleCanvas();
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }

    closeMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    setupTabNavigation() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash && hash !== this.currentTab) {
                this.showTab(hash);
                this.updateActiveNavByTab(hash);
            }
        });

        const initialHash = window.location.hash.substring(1);
        if (initialHash) {
            this.showTab(initialHash);
            this.updateActiveNavByTab(initialHash);
        }
    }

    showTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            setTimeout(() => {
                targetTab.classList.add('active');
                
                // Trigger counter animation for home tab
                if (tabName === 'home') {
                    setTimeout(() => this.animateCounters(), 500);
                }
            }, 150);

            this.currentTab = tabName;
            history.pushState(null, null, `#${tabName}`);
            this.scrollToTop();
        }
    }

    updateActiveNav(clickedLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        clickedLink.classList.add('active');
    }

    updateActiveNavByTab(tabName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-tab') === tabName) {
                link.classList.add('active');
            }
        });
    }

    scrollToTop() {
        // Scroll to a small offset to account for fixed header
        window.scrollTo({
            top: 10,
            behavior: 'smooth'
        });
    }

    setupResumeButtons() {
        const downloadBtn = document.getElementById('downloadResume');
        const viewBtn = document.getElementById('viewResume');
        const pdfViewer = document.getElementById('resumePdfViewer');
        const pdfFrame = document.getElementById('pdfFrame');
        const closePdfBtn = document.getElementById('closePdfViewer');
        const resumePreview = document.getElementById('resumePreview');
        
        // Updated path to access the PDF from Data/documents folder
        const pdfPath = './Data/documents/Infographic_Resume_Raghava.pdf';

        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Download button clicked, PDF path:', pdfPath);
                try {
                    // Create a temporary link to download the file
                    const link = document.createElement('a');
                    link.href = pdfPath;
                    link.download = 'Infographic_Resume_Raghava.pdf';
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    console.log('Download initiated');
                } catch (error) {
                    console.error('Download error:', error);
                    // Fallback: open in new tab
                    window.open(pdfPath, '_blank');
                }
            });
        }

        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('View button clicked, showing PDF with path:', pdfPath);
                try {
                    // Hide the text preview and show PDF viewer
                    if (resumePreview) resumePreview.style.display = 'none';
                    if (pdfViewer) pdfViewer.style.display = 'block';
                    // Set the PDF source
                    if (pdfFrame) {
                        pdfFrame.src = pdfPath;
                        console.log('PDF source set to:', pdfPath);
                    }
                } catch (error) {
                    console.error('View PDF error:', error);
                }
            });
        }

        if (closePdfBtn) {
            closePdfBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Close PDF button clicked');
                // Hide PDF viewer and show text preview
                pdfViewer.style.display = 'none';
                resumePreview.style.display = 'block';
                pdfFrame.src = '';
            });
        }
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(11, 20, 38, 0.98)';
                header.style.borderBottom = '1px solid rgba(0, 255, 247, 0.2)';
            } else {
                header.style.background = 'rgba(11, 20, 38, 0.95)';
                header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
            }
        }
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe animatable elements
        document.querySelectorAll('.stat-card, .social-link').forEach(el => {
            observer.observe(el);
        });
    }

    setupTypingEffect() {
        this.typingElement = document.getElementById('typingText');
    }

    startTypingEffect() {
        if (!this.typingElement) return;

        const type = () => {
            const currentText = this.typingTexts[this.currentTextIndex];
            
            if (this.isDeleting) {
                this.typingElement.textContent = currentText.substring(0, this.currentCharIndex - 1);
                this.currentCharIndex--;
            } else {
                this.typingElement.textContent = currentText.substring(0, this.currentCharIndex + 1);
                this.currentCharIndex++;
            }

            let typeSpeed = this.isDeleting ? 50 : 100;

            if (!this.isDeleting && this.currentCharIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                this.isDeleting = true;
            } else if (this.isDeleting && this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
                typeSpeed = 500; // Pause before starting new text
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }

    setupParticleBackground() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        this.resizeParticleCanvas = resizeCanvas;

        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 247, ${particle.opacity})`;
                ctx.fill();

                // Connect nearby particles
                particles.slice(index + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(0, 255, 247, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    setupCounterAnimation() {
        this.countersAnimated = false;
    }

    animateCounters() {
        if (this.countersAnimated) return;
        
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, 20);
        });
        
        this.countersAnimated = true;
    }

    // Utility functions
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'var(--gradient-accent)' : 'var(--gradient-orange)'};
            color: var(--primary-bg);
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--glow-cyan);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            backdrop-filter: var(--backdrop-blur);
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: var(--primary-bg);
            font-size: 1.5rem;
            cursor: pointer;
            line-height: 1;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            this.hideNotification(notification);
        }, 5000);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Contact form handler (if exists)
    handleContactSubmission(form) {
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        this.showNotification('Message sent successfully! Thank you for reaching out.', 'success');
        form.reset();
        console.log('Contact form data:', data);
    }

    // YouTube Tabs Functionality
    setupYoutubeTabs() {
        const youtubeTabs = document.querySelectorAll('.youtube-tab');
        
        youtubeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                youtubeTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Hide all content sections
                document.querySelectorAll('.youtube-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show selected content
                const contentId = tab.getAttribute('data-youtube-tab') + '-content';
                const contentElement = document.getElementById(contentId);
                if (contentElement) {
                    contentElement.style.display = 'block';
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create portfolio instance
    const portfolio = new ModernPortfolio();

    // Setup contact form if it exists
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            portfolio.handleContactSubmission(contactForm);
        });
    }

    // Add smooth hover effects to social links
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'var(--glow-cyan)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });

    // Add loading effect to buttons
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        });
    });

    // Console welcome message
    console.log('%c🚀 Modern Portfolio Loaded Successfully!', 'color: #00FFF7; font-size: 16px; font-weight: bold;');
    console.log('%c💼 Raghavendra Reddy Thummala - Tech Lead (Data, AI/ML)', 'color: #00D4FF; font-size: 14px;');
    console.log('%c📧 Contact: your.email@example.com', 'color: #94A3B8; font-size: 12px;');
});
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModernPortfolio;
}