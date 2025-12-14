// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollLine = document.querySelector('.scroll-line');
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollLine.style.height = scrolled + '%';
});

// Animated Particles Background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(227, 25, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw connections
    particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(227, 25, 55, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when in viewport
const observerStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            observerStats.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    observerStats.observe(heroStats);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about-card, .project-card, .skill-category, .principle, .contact-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Dynamic tech stack highlight
const techTags = document.querySelectorAll('.tech, .skill-tags span');
techTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        const text = tag.textContent;
        tag.style.setProperty('--glow-color', 'var(--primary-red)');
    });
});

// Glitch effect enhancement on hover
const glitchTitle = document.querySelector('.glitch');
if (glitchTitle) {
    glitchTitle.addEventListener('mouseenter', () => {
        glitchTitle.style.animation = 'glowPulse 0.3s ease-in-out 3';
    });
}

// Cursor trail effect
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// Animate skill bars on scroll
const animateSkills = () => {
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        const rect = category.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            category.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
};

window.addEventListener('scroll', animateSkills);

// Add copy email functionality
const emailCard = document.querySelector('.contact-card[href^="mailto"]');
if (emailCard) {
    emailCard.addEventListener('click', (e) => {
        const email = 'gerbera.uh@gmail.com';
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                const originalText = emailCard.querySelector('p').textContent;
                emailCard.querySelector('p').textContent = 'Copied!';
                setTimeout(() => {
                    emailCard.querySelector('p').textContent = originalText;
                }, 2000);
            });
        }
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    animateSkills();
}, 100);

window.addEventListener('scroll', debouncedScroll);

// Add active state to social buttons
const socialBtns = document.querySelectorAll('.social-btn');
socialBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        socialBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Typewriter effect for subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

// Apply typewriter on load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 80);
    }
});

// Random glitch intervals for title
setInterval(() => {
    if (Math.random() > 0.7 && glitchTitle) {
        glitchTitle.style.animation = 'none';
        setTimeout(() => {
            glitchTitle.style.animation = 'glowPulse 2s ease-in-out infinite';
        }, 50);
    }
}, 5000);

// Matrix rain effect (optional, can be enabled)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.1';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#E31937';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 50);
}

// Uncomment to enable matrix effect
// createMatrixRain();

// GitHub Repositories Fetcher with localStorage caching
async function fetchGitHubRepos() {
    const username = 'pilkxzc';
    const reposContainer = document.getElementById('github-repos');
    const CACHE_KEY = 'github_repos_pilkxz';
    const CACHE_DURATION = 3600000; // 1 hour
    
    try {
        // Check localStorage cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { repos, timestamp } = JSON.parse(cachedData);
            const age = Date.now() - timestamp;
            
            // Use cache if less than 1 hour old
            if (age < CACHE_DURATION) {
                console.log(`Using cached data (${Math.round(age/60000)} min old)`);
                displayRepos(repos);
                return;
            }
        }
        
        // Fetch fresh data from API
        console.log('Fetching fresh GitHub data...');
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repos = await response.json();
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        if (filteredRepos.length === 0) {
            reposContainer.innerHTML = '<p class="loading">Репозиторії не знайдено</p>';
            return;
        }
        
        // Save to localStorage
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            repos: filteredRepos,
            timestamp: Date.now()
        }));
        
        displayRepos(filteredRepos);
        
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        
        // Try stale cache as fallback
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { repos, timestamp } = JSON.parse(cachedData);
            console.log('Using stale cache (fallback)');
            displayRepos(repos);
            
            // Show cache age warning
            const age = Date.now() - timestamp;
            const hours = Math.round(age / 3600000);
            reposContainer.insertAdjacentHTML('beforebegin', 
                `<p class="cache-warning">⚠️ Дані оновлено ${hours}г тому (API недоступний)</p>`
            );
        } else {
            showFallbackRepos(reposContainer);
        }
    }
}

function displayRepos(repos) {
    const reposContainer = document.getElementById('github-repos');
    
    reposContainer.innerHTML = repos.map(repo => `
        <a href="${repo.html_url}" target="_blank" class="repo-card">
            <div class="repo-header">
                <svg class="repo-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <h3 class="repo-name">${repo.name}</h3>
            </div>
            <p class="repo-description">${repo.description || 'Без опису'}</p>
            <div class="repo-stats">
                <span class="repo-stat">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    ${repo.stargazers_count}
                </span>
                <span class="repo-stat">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    ${repo.forks_count}
                </span>
            </div>
            ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
        </a>
    `).join('');
    
    // Apply fade-in animation
    const repoCards = document.querySelectorAll('.repo-card');
    repoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

function showFallbackRepos(container) {
    container.innerHTML = `
        <div class="fallback-message">
            <p>GitHub API тимчасово недоступний. Переглянути всі проєкти можна на:</p>
            <a href="https://github.com/pilkxzc?tab=repositories" target="_blank" class="github-link-btn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                Відкрити GitHub Profile
            </a>
        </div>
    `;
}

// Load repos when page loads
window.addEventListener('load', fetchGitHubRepos);
