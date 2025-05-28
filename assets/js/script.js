// Dark Mode Detection
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
            updateThemeToggleText();
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            updateThemeToggleText();
            updateWindowShadow();
        });

        // Function to update the window shadow
        function updateWindowShadow() {
            const macosWindows = document.querySelectorAll('.macos-window');
            const isDarkMode = document.documentElement.classList.contains('dark');

            macosWindows.forEach(window => {
                if (isDarkMode) {
                    window.style.boxShadow = '0px 10px 50px rgba(0, 0, 0, .9)'; // Dark shadow
                } else {
                    window.style.boxShadow = '0px 10px 50px rgba(0, 0, 0, .5)'; // Light shadow
                }
            });
        }

        // Update theme toggle text based on current mode
        function updateThemeToggleText() {
            const isDark = document.documentElement.classList.contains('dark');
            const themeToggleText = document.getElementById('theme-toggle-text');

            if (themeToggleText) {
                themeToggleText.textContent = isDark ? 'Éclaircir' : 'Assombrir';
            }
        }

        // Initial shadow update
        updateWindowShadow();
        updateThemeToggleText();

        // Theme toggle
        const menuThemeToggle = document.getElementById('menu-theme-toggle');

        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            menuThemeToggle.classList.toggle('dark-mode');
            menuThemeToggle.classList.toggle('light-mode');
            updateThemeToggleText();
            updateWindowShadow();
        }

        menuThemeToggle.addEventListener('click', toggleTheme);
        menuThemeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleTheme();
                e.preventDefault();
            }
        });

        // Navigation Menu Toggle
        const menuToggleBtn = document.getElementById('menu-toggle-btn');
        const navigationMenu = document.getElementById('navigation-menu');
        const closeMenuBtn = document.getElementById('close-menu');

        menuToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigationMenu.classList.remove('hidden');
            navigationMenu.classList.add('slide-in');
        });

        closeMenuBtn.addEventListener('click', () => {
            navigationMenu.classList.remove('slide-in');
            navigationMenu.classList.add('slide-out');
            setTimeout(() => {
                navigationMenu.classList.add('hidden');
                navigationMenu.classList.remove('slide-out');
            }, 300);
        });

        // Show Privacy Policy and Mentions Légales from Navigation Menu
        const showPrivacyBtn = document.getElementById('show-privacy-btn');
        const showTermsBtn = document.getElementById('show-terms-btn');
        const privacySection = document.getElementById('privacy-policy');
        const mentionsLegalesSection = document.getElementById('mentions-legales');

        showPrivacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Hide main sections
            document.querySelectorAll('section.section:not(#privacy-policy):not(#mentions-legales)').forEach(section => {
                section.classList.add('hidden');
            });
            
            // Hide terms if visible
            mentionsLegalesSection.classList.add('hidden');
            
            // Show privacy policy section
            privacySection.classList.remove('hidden');
            
            // Close the navigation menu
            closeMenuBtn.click();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        showTermsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Hide main sections
            document.querySelectorAll('section.section:not(#privacy-policy):not(#mentions-legales)').forEach(section => {
                section.classList.add('hidden');
            });
            
            // Hide privacy if visible
            privacySection.classList.add('hidden');
            
            // Show terms section
            mentionsLegalesSection.classList.remove('hidden');
            
            // Close the navigation menu
            closeMenuBtn.click();
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Return links from privacy/mentions to main site
        document.querySelectorAll('.back-to-main').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Hide special sections
                privacySection.classList.add('hidden');
                mentionsLegalesSection.classList.add('hidden');
                
                // Show all regular sections
                document.querySelectorAll('section.section:not(#privacy-policy):not(#mentions-legales)').forEach(section => {
                    section.classList.remove('hidden');
                });
                
                // Navigate to specified anchor if present
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
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

        // Handle hash navigation
        function handleHashChange() {
            const hash = window.location.hash;
            if (hash) {
                const section = document.querySelector(hash);
                if (section) {
                    // If it's privacy or terms
                    if (hash === '#privacy-policy' || hash === '#mentions-legales') {
                        // Hide all main sections
                        document.querySelectorAll('section.section:not(#privacy-policy):not(#mentions-legales)').forEach(s => {
                            s.classList.add('hidden');
                        });
                        
                        // Show the correct special section and hide the other
                        if (hash === '#privacy-policy') {
                            privacySection.classList.remove('hidden');
                            mentionsLegalesSection.classList.add('hidden');
                        } else {
                            privacySection.classList.add('hidden');
                            mentionsLegalesSection.classList.remove('hidden');
                        }
                    } else {
                        // For main sections, make sure all are visible
                        document.querySelectorAll('section.section:not(#privacy-policy):not(#mentions-legales)').forEach(s => {
                            s.classList.remove('hidden');
                        });
                        
                        // Hide special sections
                        privacySection.classList.add('hidden');
                        mentionsLegalesSection.classList.add('hidden');
                        
                        // Scroll to the section
                        section.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        }

        // Handle hash changes
        window.addEventListener('hashchange', handleHashChange);
        
        // Handle initial hash on page load
        document.addEventListener('DOMContentLoaded', () => {
            handleHashChange();
            
            // Mark sections visible on load
            setTimeout(() => {
                document.querySelectorAll('.section:not(.hidden)').forEach(section => {
                    section.classList.add('visible');
                });
            }, 100);
        });