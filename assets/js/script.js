// Dark Mode Detection (déjà présent, mais inclus pour référence)
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

// Function to update the window shadow
function updateWindowShadow() {
    const macosWindows = document.querySelectorAll('.macos-window');
    const isDarkMode = document.documentElement.classList.contains('dark');

    macosWindows.forEach(window => {
        if (isDarkMode) {
            window.style.boxShadow = '0px 10px 50px rgba(0, 0, 0, .9)'; // Dark shadow
        } else {
            window.style.boxShadow = '0px 10px 50px rgba(255, 255, 255, .5)'; // Light shadow
        }
    });
}

// Initial shadow update
updateWindowShadow();

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    themeToggle.classList.toggle('dark-mode');
    mobileThemeToggle.classList.toggle('dark-mode');
    updateWindowShadow(); // Update shadow on theme toggle
}

themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Intersection Observer for revealing sections (inchangé)
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

// Dock hover effect (inchangé)
const dockIcons = document.querySelectorAll('.dock-icon');

dockIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        icon.classList.add('animate-bounce-small');
        setTimeout(() => {
            icon.classList.remove('animate-bounce-small');
        }, 300); // Délai réduit à 300ms
    });
});

// Form submit handling (inchangé)
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
            notification.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }, 1500);
});