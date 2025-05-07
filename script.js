// Dark Mode Detection
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
});

// Intersection Observer for revealing sections
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    observer.observe(section);
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    themeToggle.classList.toggle('dark-mode');
    mobileThemeToggle.classList.toggle('dark-mode');
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Dock hover effect
const dockIcons = document.querySelectorAll('.dock-icon');

dockIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        icon.classList.add('animate-bounce-small');
        setTimeout(() => {
            icon.classList.remove('animate-bounce-small');
        }, 300);
    });
});

// Form submit handling
const contactForm = document.querySelector('form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;

    setTimeout(() => {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 animate-fade-in';
        notification.innerHTML = `
            <div class="flex items-center">
                <div class="text-green-500 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <p>Message envoyé avec succès!</p>
            </div>
        `;
        document.body.appendChild(notification);

        submitButton.textContent = originalText;
        submitButton.disabled = false;
        contactForm.reset();

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }, 1500);

    document.getElementById('theme-toggle').addEventListener('click', function () {
        document.documentElement.classList.toggle('dark');

        // Changer l'icône selon le mode
        const icon = document.getElementById('theme-icon');
        if (document.documentElement.classList.contains('dark')) {
            icon.setAttribute('d', 'M12 2a10 10 0 100 20 10 10 0 000-20z'); // Lune
        } else {
            icon.setAttribute('d', 'M12 2a10 10 0 100 20 10 10 0 000-20z'); // Soleil
        }
    });
});