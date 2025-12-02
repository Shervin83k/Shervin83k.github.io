// Theme Manager
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.lightModeCSS = document.getElementById('light-mode-css');
        this.darkModeCSS = document.getElementById('dark-mode-css');
        this.body = document.body;
        
        this.init();
    }
    
    init() {
        // Check for saved theme or prefer-color-scheme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        // Apply saved theme or system preference
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            this.enableDarkMode();
        } else {
            this.enableLightMode();
        }
        
        // Add click event listener
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                e.matches ? this.enableDarkMode() : this.enableLightMode();
            }
        });
    }
    
    enableDarkMode() {
        this.body.classList.add('dark-mode');
        this.body.classList.remove('light-mode');
        this.lightModeCSS.disabled = true;
        this.darkModeCSS.disabled = false;
        this.themeIcon.classList.remove('fa-moon');
        this.themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
    
    enableLightMode() {
        this.body.classList.add('light-mode');
        this.body.classList.remove('dark-mode');
        this.darkModeCSS.disabled = true;
        this.lightModeCSS.disabled = false;
        this.themeIcon.classList.remove('fa-sun');
        this.themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
    
    toggleTheme() {
        if (this.body.classList.contains('dark-mode')) {
            this.enableLightMode();
        } else {
            this.enableDarkMode();
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});