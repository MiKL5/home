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
    loadGitHubProjects();
});

// GitHub Projects Integration
        function loadGitHubProjects() {
            const loadingElement = document.getElementById('loading-projects');
            const projectsContainer = document.getElementById('projects-container');
            const errorElement = document.getElementById('projects-error');
            const noProjectsElement = document.getElementById('no-projects-found');
            
            // GitHub API URL for your repositories
            const apiUrl = 'https://api.github.com/users/mikl5/repos?sort=updated&direction=desc';
            
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(repos => {
                    // Hide loading, show container
                    loadingElement.classList.add('hidden');
                    projectsContainer.classList.remove('hidden');
                    
                    // Update stats
                    updateGitHubStats(repos);
                    
                    // Render the repositories
                    renderRepositories(repos);
                    
                    // Setup search and filter functionality
                    setupSearchAndFilter(repos);
                })
                .catch(error => {
                    console.error('Error fetching GitHub repositories:', error);
                    loadingElement.classList.add('hidden');
                    errorElement.classList.remove('hidden');
                });
        }
        
        function updateGitHubStats(repos) {
            // Count repositories
            document.getElementById('repo-count').textContent = repos.length;
            
            // Count unique languages
            const languages = new Set();
            repos.forEach(repo => {
                if (repo.language) {
                    languages.add(repo.language);
                }
            });
            document.getElementById('language-count').textContent = languages.size;
            
            // Count total stars
            const starCount = repos.reduce((total, repo) => total + repo.stargazers_count, 0);
            document.getElementById('star-count').textContent = starCount;
        }
        
        function renderRepositories(repos) {
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = '';
            
            // Language color mapping
            const languageColors = {
                "JavaScript": "#f1e05a",
                "TypeScript": "#2b7489",
                "HTML": "#e34c26",
                "CSS": "#563d7c",
                "Python": "#3572A5",
                "Java": "#b07219",
                "C#": "#178600",
                "PHP": "#4F5D95",
                "R": "#198CE7",
                "Jupyter Notebook": "#DA5B0B",
                "Shell": "#89e051",
                "SQL": "#ff0000",
                "TSQL": "#ff0000",
                "PLSQL": "#ff0000",
                "NoSQL": "#ff0000",
            };
            
            repos.forEach(repo => {
                // Skip forked repositories if you want
                // if (repo.fork) return;
                
                const languageColor = languageColors[repo.language] || "#cccccc";
                const dateCreated = new Date(repo.created_at).toLocaleDateString('fr-FR');
                const dateUpdated = new Date(repo.updated_at).toLocaleDateString('fr-FR');
                
                // Create repository card
                const repoCard = document.createElement('div');
                repoCard.className = 'project-card bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow';
                repoCard.dataset.name = repo.name.toLowerCase();
                repoCard.dataset.language = repo.language || "";
                repoCard.dataset.description = repo.description ? repo.description.toLowerCase() : "";
                repoCard.dataset.created = repo.created_at;
                repoCard.dataset.updated = repo.updated_at;
                
                // Add topic tags as data attributes for filtering
                if (repo.topics && repo.topics.length > 0) {
                    repoCard.dataset.topics = repo.topics.join(",").toLowerCase();
                }
                
                repoCard.innerHTML = `
                    <div class="flex justify-between items-start mb-3">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${repo.name}</h3>
                        <div class="flex items-center text-gray-600 dark:text-gray-300">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                            </svg>
                            <span>${repo.stargazers_count}</span>
                        </div>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 h-10">
                        ${repo.description || "Aucune description disponible"}
                    </p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            ${repo.language ? `
                                <span class="language-dot" style="background-color: ${languageColor}"></span>
                                <span class="text-sm text-gray-600 dark:text-gray-300">${repo.language}</span>
                            ` : ''}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            Mis à jour le ${dateUpdated}
                        </div>
                    </div>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline text-sm">Voir sur GitHub →</a>
                `;
                
                projectsContainer.appendChild(repoCard);
            });
            
            // If no repositories found
            if (repos.length === 0) {
                noProjectsElement.classList.remove('hidden');
            }
        }
        
        function setupSearchAndFilter(allRepos) {
            const searchInput = document.getElementById('search-projects');
            const filterButtons = document.querySelectorAll('.filter-button');
            const projectCards = document.querySelectorAll('.project-card');
            const noProjectsElement = document.getElementById('no-projects-found');
            
            // Filter projects based on search term and active filter
            function filterProjects() {
                const searchTerm = searchInput.value.toLowerCase();
                const activeFilter = document.querySelector('.filter-button.active').dataset.filter;
                
                let visibleCount = 0;
                
                projectCards.forEach(card => {
                    let matchesSearch = true;
                    let matchesFilter = true;
                    
                    // Check search term
                    if (searchTerm) {
                        const nameMatch = card.dataset.name.includes(searchTerm);
                        const descMatch = card.dataset.description.includes(searchTerm);
                        const langMatch = card.dataset.language.toLowerCase().includes(searchTerm);
                        const topicMatch = card.dataset.topics ? card.dataset.topics.includes(searchTerm) : false;
                        
                        matchesSearch = nameMatch || descMatch || langMatch || topicMatch;
                    }
                    
                    // Check filter
                    if (activeFilter !== 'all') {
                        if (activeFilter === 'recent') {
                            // Filter for repos updated in the last 3 months
                            const threeMonthsAgo = new Date();
                            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                            matchesFilter = new Date(card.dataset.updated) > threeMonthsAgo;
                        } else if (activeFilter === 'DataScience') {
                            // Data Science filter: match Python + data-related topics or descriptions
                            const isDataRelated = (card.dataset.topics && 
                                                  (card.dataset.topics.includes('data') || 
                                                   card.dataset.topics.includes('machine-learning') || 
                                                   card.dataset.topics.includes('ai'))) ||
                                                  (card.dataset.description && 
                                                  (card.dataset.description.includes('data') || 
                                                   card.dataset.description.includes('machine learning') || 
                                                   card.dataset.description.includes('ai')));
                    
                    matchesFilter = (card.dataset.language.toLowerCase() === 'python' && isDataRelated) || 
                                    (card.dataset.topics && card.dataset.topics.includes('data-science'));
                } else {
                    // Language filter
                    matchesFilter = card.dataset.language.toLowerCase() === activeFilter.toLowerCase();
                }
            }
            
            // Show or hide the card
            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Show "no projects found" message if needed
        if (visibleCount === 0) {
            noProjectsElement.classList.remove('hidden');
        } else {
            noProjectsElement.classList.add('hidden');
        }
    }
    
    // Set up search input event
    searchInput.addEventListener('input', filterProjects);
    
    // Set up filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Apply filtering
            filterProjects();
        });
    });
}

// Correctif pour les ancres dock
document.querySelectorAll('a.dock-icon').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // Réaffiche les sections principales
                document.querySelectorAll('section.section:not(#privacy-policy):not(#mentions-legales)').forEach(s => {
                    s.classList.remove('hidden');
                });
                // Cache les sections spéciales
                privacySection.classList.add('hidden');
                mentionsLegalesSection.classList.add('hidden');
                // Scroll vers la cible
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const searchInput = document.getElementById('search-projects');
    const searchContainer = document.getElementById('search-container');
    const searchIcon = document.getElementById('search-icon');
    const filterButtons = document.querySelectorAll('.filter-button');
    const repoCards = document.querySelectorAll('.repo-card');
    const noResultsElement = document.getElementById('no-results');
    const reposGrid = document.getElementById('repositories-grid');
    
    // Search container expand/collapse functionality
    searchIcon.addEventListener('click', function() {
        if (!searchContainer.classList.contains('expanded')) {
            searchContainer.classList.add('expanded');
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        }
    });

    // Collapse search when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target) && searchInput.value === '') {
            searchContainer.classList.remove('expanded');
        }
    });

    // Keep expanded if there's text
    searchInput.addEventListener('blur', function() {
        if (searchInput.value === '') {
            setTimeout(() => {
                searchContainer.classList.remove('expanded');
            }, 200);
        }
    });
    
    // Function to filter repositories
    function filterRepositories() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const activeFilter = document.querySelector('.filter-button.active').getAttribute('data-filter');
        
        let visibleCount = 0;
        
        // Loop through all repository cards
        repoCards.forEach(card => {
            const name = card.getAttribute('data-name').toLowerCase();
            const keywords = card.getAttribute('data-keywords').toLowerCase();
            const categories = card.getAttribute('data-categories').toLowerCase().split(' ');
            
            // Check if card matches search term
            const matchesSearch = searchTerm === '' || 
                                  name.includes(searchTerm) || 
                                  keywords.includes(searchTerm);
            
            // Check if card matches active filter
            const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
            
            // Show or hide card based on filters
            if (matchesSearch && matchesFilter) {
                card.classList.remove('hidden-card');
                visibleCount++;
                
                // Add animation class with delay based on index
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, 50 * visibleCount);
            } else {
                card.classList.add('hidden-card');
                card.classList.remove('fade-in');
            }
        });
        
        // Show or hide "No results" message
        if (visibleCount === 0) {
            noResultsElement.classList.remove('hidden');
            noResultsElement.style.display = 'block';
        } else {
            noResultsElement.classList.add('hidden');
            noResultsElement.style.display = 'none';
        }
        
        // Adjust grid layout if needed
        if (visibleCount <= 2) {
            reposGrid.classList.remove('lg:grid-cols-3');
            reposGrid.classList.add('lg:grid-cols-2');
        } else {
            reposGrid.classList.remove('lg:grid-cols-2');
            reposGrid.classList.add('lg:grid-cols-3');
        }
    }
    
    // Add event listener for search input with debounce
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(filterRepositories, 300);
    });
    
    // Add event listeners for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter repositories
            filterRepositories();
        });
    });
    
    // Initial filtering
    filterRepositories();
});

// const disableEffectsBtn = document.getElementById('disable-effects-btn');

// disableEffectsBtn.addEventListener('click', () => {
//     document.body.classList.toggle('no-effects');
//     const effectsOff = document.body.classList.contains('no-effects');

//     // Update button text
//     disableEffectsBtn.textContent = effectsOff ? 'Réactiver les effets visuels' : 'Désactiver les effets visuels';
// });
