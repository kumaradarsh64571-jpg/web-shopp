document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');

    // Minimum display time of 2 seconds for the splash screen
    setTimeout(() => {
        splashScreen.classList.add('hidden');

        // Remove from DOM after transition matches CSS transition time
        setTimeout(() => {
            splashScreen.remove();
        }, 800);
    }, 2000);

    // Header Scroll Effect
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '1rem 5%';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '1.5rem 5%';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Add to Cart Animation
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            // Simple toast notification simulation
            showToast('Added to bag');
        });
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.background = '#1a1a1a';
        toast.style.color = 'white';
        toast.style.padding = '1rem 2rem';
        toast.style.borderRadius = '30px';
        toast.style.zIndex = '2000';
        toast.style.animation = 'fadeInUp 0.3s ease';

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }

    // Newsletter Form
    const form = document.querySelector('.newsletter-form');
    if (form) { // Check if form exists (it might not on payment page)
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Thanks for subscribing!');
            form.reset();
        });
    }

    // Payment Page Tab Logic
    window.switchTab = function (method) {
        // 1. Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // 2. Hide all forms
        document.querySelectorAll('.payment-form').forEach(form => {
            form.classList.remove('active');
        });

        // 3. Activate clicked tab
        const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn =>
            btn.textContent.toLowerCase().includes(method) ||
            (method === 'card' && btn.innerHTML.includes('fa-credit-card')) ||
            (method === 'upi' && btn.innerHTML.includes('fa-mobile-alt')) ||
            (method === 'cod' && btn.innerHTML.includes('fa-money-bill-wave'))
        );

        if (activeBtn) activeBtn.classList.add('active');

        // 4. Show relevant form
        const formId = method + '-form';
        const activeForm = document.getElementById(formId);
        if (activeForm) {
            activeForm.classList.add('active');
        }
    };
});
