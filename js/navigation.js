// Navigation Manager
class NavigationManager {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.navLinks = document.querySelector('.nav-links');
        this.navLinksContainer = document.querySelector('.nav-links');
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        if (this.mobileMenuBtn) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navLinksContainer.contains(e.target) && 
                !this.mobileMenuBtn.contains(e.target) &&
                this.navLinksContainer.style.display === 'flex') {
                this.closeMobileMenu();
            }
        });
        
        // Set active navigation link based on current page
        this.setActiveNavLink();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
    }
    
    toggleMobileMenu() {
        if (this.navLinks.style.display === 'flex') {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }
    
    openMobileMenu() {
        this.navLinks.style.display = 'flex';
        this.navLinks.style.flexDirection = 'column';
        this.navLinks.style.position = 'absolute';
        this.navLinks.style.top = '70px';
        this.navLinks.style.left = '0';
        this.navLinks.style.right = '0';
        this.navLinks.style.backgroundColor = 'var(--glass-bg)';
        this.navLinks.style.backdropFilter = 'blur(20px)';
        this.navLinks.style.padding = '20px';
        this.navLinks.style.gap = '20px';
        this.navLinks.style.borderBottom = '1px solid var(--glass-border)';
        this.mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    }
    
    closeMobileMenu() {
        this.navLinks.style.display = '';
        this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (linkHref.startsWith('#') && window.location.hash === linkHref)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        const navManager = new NavigationManager();
                        navManager.closeMobileMenu();
                    }
                }
            });
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});