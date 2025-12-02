// Projects Carousel
class ProjectsCarousel {
    constructor() {
        this.projectCards = document.querySelectorAll('.project-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentIndex = 0;
        
        if (this.projectCards.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.updateCarousel();
        
        // Event listeners for navigation buttons
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        // Event listeners for dots
        this.dots.forEach(dot => {
            dot.addEventListener('click', () => {
                this.currentIndex = parseInt(dot.dataset.index);
                this.updateCarousel();
            });
        });
        
        // Auto rotate carousel (only on homepage)
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            this.startAutoRotation();
        }
    }
    
    updateCarousel() {
        this.projectCards.forEach((card, index) => {
            const diff = (index - this.currentIndex + 3) % 3;
            
            if (diff === 0) {
                card.style.transform = 'translateX(0) scale(1)';
                card.style.zIndex = '30';
                card.style.opacity = '1';
                card.style.rotate = 'y 0deg';
            } else if (diff === 1 || diff === -2) {
                card.style.transform = 'translateX(180px) scale(0.85)';
                card.style.zIndex = '20';
                card.style.opacity = '0.7';
                card.style.rotate = 'y -15deg';
            } else {
                card.style.transform = 'translateX(-180px) scale(0.85)';
                card.style.zIndex = '20';
                card.style.opacity = '0.7';
                card.style.rotate = 'y 15deg';
            }
        });

        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % 3;
        this.updateCarousel();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + 3) % 3;
        this.updateCarousel();
    }
    
    startAutoRotation() {
        setInterval(() => {
            this.next();
        }, 5000);
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProjectsCarousel();
});