import { siteData } from './data.js';

// DOM Elements
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const navLinks = document.querySelectorAll('.nav-list__link');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const themeToggle = document.getElementById('themeToggle');

// State
let isMobileMenuOpen = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  renderContent();
  setupEventListeners();
  setupIntersectionObserver();
  setupSmoothScrolling();
  setupBackToTop();
  setupFormValidation();
  setupAdvancedAnimations();
  setupTypewriterEffect();
  setupParallaxEffects();
  setupButtonInteractions();
  setupThemeToggle();
});

// Render all dynamic content from data.js
function renderContent() {
  renderExperience();
  renderEducation();
  renderProjects();
  renderSkills();
  updateResumeLinks();
}

// Render Experience Section
function renderExperience() {
  const experienceList = document.getElementById('experienceList');
  
  const experienceHTML = siteData.experience.map(exp => `
    <div class="experience-item">
      <div class="experience-item__header">
        <h3 class="experience-item__title">${exp.role}</h3>
        <div class="experience-item__company">${exp.company}</div>
        <div class="experience-item__meta">${exp.location} • ${exp.dates}</div>
      </div>
      <ul class="experience-item__bullets">
        ${exp.bullets.map(bullet => `<li class="experience-item__bullet">${bullet}</li>`).join('')}
      </ul>
    </div>
  `).join('');
  
  experienceList.innerHTML = experienceHTML;
}

// Render Education Section
function renderEducation() {
  const educationList = document.getElementById('educationList');
  
  const educationHTML = siteData.education.map(edu => `
    <div class="education-item">
      <div class="education-item__header">
        <h3 class="education-item__title">${edu.degree}</h3>
        <div class="education-item__institution">${edu.institution}</div>
        <div class="education-item__meta">${edu.location} • ${edu.dates}</div>
      </div>
      <div class="education-item__highlights">
        ${edu.highlights.map(highlight => `<div class="education-item__highlight">${highlight}</div>`).join('')}
      </div>
    </div>
  `).join('');
  
  educationList.innerHTML = educationHTML;
}

// Render Projects Section
function renderProjects() {
  const projectsList = document.getElementById('projectsList');
  
  const projectsHTML = siteData.projects.map((project, index) => `
    <div class="project-card">
      <div class="project-card__header">
        <div class="project-card__title-section">
          <h3 class="project-card__title">${project.name}</h3>
          <button class="project-card__toggle" data-project-index="${index}" aria-expanded="false">
            <span class="toggle-text">Show Details</span>
            <span class="toggle-icon">▼</span>
          </button>
        </div>
        <div class="project-card__dates">${project.dates}</div>
      </div>
      <p class="project-card__summary">${project.summary}</p>
      <div class="project-card__stack-section">
        <div class="project-card__stack">
          ${project.stack.map(tech => `<span class="stack-badge">${tech}</span>`).join('')}
        </div>
        <div class="project-card__links">
          ${project.links.live && project.links.live !== '#' ? `<a href="${project.links.live}" class="project-card__link" target="_blank" rel="noopener">Live Demo</a>` : ''}
          <a href="${project.links.github}" class="project-card__link" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <ul class="project-card__bullets" style="display: none;">
        ${project.bullets.map(bullet => `<li class="project-card__bullet">${bullet}</li>`).join('')}
      </ul>
    </div>
  `).join('');
  
  projectsList.innerHTML = projectsHTML;
  
  // Add event listeners for toggle buttons
  setupProjectToggles();
}

// Setup Project Toggle Functionality
function setupProjectToggles() {
  const toggleButtons = document.querySelectorAll('.project-card__toggle');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const projectIndex = this.getAttribute('data-project-index');
      // Find the project card (parent of the footer)
      const projectCard = this.closest('.project-card');
      const bulletsList = projectCard.querySelector('.project-card__bullets');
      const toggleText = this.querySelector('.toggle-text');
      const toggleIcon = this.querySelector('.toggle-icon');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        // Hide bullets
        bulletsList.style.display = 'none';
        toggleText.textContent = 'Show Details';
        toggleIcon.textContent = '▼';
        this.setAttribute('aria-expanded', 'false');
      } else {
        // Show bullets
        bulletsList.style.display = 'block';
        toggleText.textContent = 'Hide Details';
        toggleIcon.textContent = '▲';
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Render Skills Section
function renderSkills() {
  const skillsList = document.getElementById('skillsList');
  
  const skillsHTML = Object.entries(siteData.skills).map(([category, skills]) => {
    const skillsHTML = skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('');
    return `<div class="skills-group-inline">
      <span class="skills-group-label">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
      <div class="skills-group-items">${skillsHTML}</div>
    </div>`;
  }).join('');
  
  skillsList.innerHTML = skillsHTML;
}

// Update Resume Links
function updateResumeLinks() {
  const resumeLinks = document.querySelectorAll('a[href="/resume.pdf"]');
  resumeLinks.forEach(link => {
    link.href = siteData.resumeUrl;
  });
}

// Setup Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  hamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);
  
  // Close mobile menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
  
  // Close mobile menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      closeMobileMenu();
    }
  });
}

// Mobile Menu Functions
function toggleMobileMenu() {
  isMobileMenuOpen = !isMobileMenuOpen;
  
  if (isMobileMenuOpen) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
}

function openMobileMenu() {
  sidebar.classList.add('open');
  mobileOverlay.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  isMobileMenuOpen = true;
}

function closeMobileMenu() {
  sidebar.classList.remove('open');
  mobileOverlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  isMobileMenuOpen = false;
}

// Enhanced Intersection Observer for Active Navigation and Animations
function setupIntersectionObserver() {
  const sections = document.querySelectorAll('.section');
  const options = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        updateActiveNavLink(sectionId);
        
        // Trigger scroll animations for section content
        animateSectionContent(entry.target);
      }
    });
  }, options);
  
  sections.forEach(section => {
    observer.observe(section);
  });
}

// Animate section content on scroll
function animateSectionContent(section) {
  const animatedElements = section.querySelectorAll('.experience-item, .education-item, .project-card, .skills-group');
  
  animatedElements.forEach((element, index) => {
    if (!element.classList.contains('animated')) {
      setTimeout(() => {
        element.classList.add('animate-on-scroll', 'animated');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}

// Update Active Navigation Link
function updateActiveNavLink(activeSectionId) {
  navLinks.forEach(link => {
    const sectionId = link.getAttribute('data-section');
    const isActive = sectionId === activeSectionId;
    
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
    
    if (isActive) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Smooth Scrolling
function setupSmoothScrolling() {
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Back to Top Button
function setupBackToTop() {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Form Validation
function setupFormValidation() {
  contactForm.addEventListener('submit', handleFormSubmit);
  
  // Real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearFieldError(input));
  });
}

// Handle Form Submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  let isValid = true;
  
  // Validate all fields
  isValid = validateField(contactForm.querySelector('#name')) && isValid;
  isValid = validateField(contactForm.querySelector('#email')) && isValid;
  isValid = validateField(contactForm.querySelector('#message')) && isValid;
  
  if (isValid) {
    // Create Gmail compose URL with form data
    const subject = encodeURIComponent(`Portfolio Contact: ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${siteData.contact.email}&su=${subject}&body=${body}`;
    
    // Open Gmail in new tab
    window.open(gmailUrl, '_blank');
    
    // Show success message
    showFormMessage('Thank you! Gmail should open with your message ready to send.', 'success');
    contactForm.reset();
  } else {
    showFormMessage('Error: Please correct the errors above.', 'error');
  }
}

// Validate Individual Field
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}Error`);
  
  let isValid = true;
  let errorMessage = '';
  
  // Required field validation
  if (!value) {
    isValid = false;
    errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
  } else {
    // Email validation
    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
      }
    }
    
    // Message length validation
    if (fieldName === 'message' && value.length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long.';
    }
  }
  
  // Update field appearance and error message
  if (isValid) {
    field.classList.remove('error');
    errorElement.textContent = '';
  } else {
    field.classList.add('error');
    errorElement.textContent = errorMessage;
  }
  
  return isValid;
}

// Clear Field Error
function clearFieldError(field) {
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}Error`);
  
  field.classList.remove('error');
  errorElement.textContent = '';
}

// Show Form Message
function showFormMessage(message, type) {
  // Remove existing message
  const existingMessage = contactForm.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageElement = document.createElement('div');
  messageElement.className = `form-message form-message--${type}`;
  messageElement.textContent = message;
  messageElement.setAttribute('role', 'alert');
  messageElement.setAttribute('aria-live', 'polite');
  
  // Insert before submit button
  const submitButton = contactForm.querySelector('button[type="submit"]');
  contactForm.insertBefore(messageElement, submitButton);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.remove();
    }
  }, 5000);
}

// Utility Functions
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

// Performance optimization: Debounce scroll events
const debouncedScrollHandler = debounce(() => {
  // Any scroll-based functionality can be added here
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Lazy loading for images (if any are added later)
function setupLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// Initialize lazy loading
setupLazyLoading();

// Advanced Animation Functions
function setupAdvancedAnimations() {
  // Initialize scroll-triggered animations
  const animatedElements = document.querySelectorAll('.experience-item, .education-item, .project-card, .skills-group');
  
  animatedElements.forEach((element) => {
    element.classList.add('animate-on-scroll');
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.33, 1, 0.68, 1)';
  });

  // Animate skills with stagger effect
  const skillChips = document.querySelectorAll('.skill-chip');
  skillChips.forEach((chip, index) => {
    chip.style.opacity = '0';
    chip.style.transform = 'scale(0.8)';
    chip.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });

  // Animate skills when skills section comes into view
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillChips.forEach((chip, index) => {
            setTimeout(() => {
              chip.style.opacity = '1';
              chip.style.transform = 'scale(1)';
            }, index * 50);
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    skillsObserver.observe(skillsSection);
  }
}

function setupTypewriterEffect() {
  const subtitleText = document.querySelector('.subtitle-text');
  if (!subtitleText) return;

  const text = subtitleText.textContent;
  subtitleText.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      subtitleText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Start cursor blinking
      const cursor = document.querySelector('.typing-cursor');
      if (cursor) {
        cursor.style.animation = 'blink 1s infinite';
      }
    }
  };

  // Start typewriter effect after hero animations
  setTimeout(typeWriter, 2000);
}

function setupParallaxEffects() {
  const shapes = document.querySelectorAll('.shape');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1;
      shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
  });
}

function setupButtonInteractions() {
  // Enhanced button hover effects
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Ripple effect on click
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Social link animations
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Project card 3D hover effects
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) rotateX(5deg) rotateY(5deg)';
      this.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
      this.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    });
  });
}

// Add CSS for advanced animations
const advancedStyles = document.createElement('style');
advancedStyles.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .project-card {
    transform-style: preserve-3d;
    transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  }
  
  .btn {
    transform-style: preserve-3d;
    transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  }
  
  .social-link {
    transform-style: preserve-3d;
    transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  }
  
  /* Scroll-triggered animations */
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  }
  
  .animate-on-scroll.animated {
    opacity: 1;
    transform: translateY(0);
  }
  
  /* Loading states */
  .btn--loading {
    position: relative;
    color: transparent;
  }
  
  .btn--loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  /* Micro-interactions */
  .nav-list__link {
    position: relative;
    overflow: hidden;
  }
  
  .nav-list__link::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
    transition: left 0.5s;
  }
  
  .nav-list__link:hover::after {
    left: 100%;
  }
  
  /* Enhanced focus states */
  .form-input:focus,
  .form-textarea:focus {
    transform: scale(1.02);
  }
  
  /* Smooth transitions for all interactive elements */
  * {
    transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
  }
`;
document.head.appendChild(advancedStyles);

// Add CSS for form messages and loading states
const style = document.createElement('style');
style.textContent = `
  .form-message {
    padding: var(--space-md);
    border-radius: var(--radius);
    margin-bottom: var(--space-lg);
    font-weight: 600;
  }
  
  .form-message--success {
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  .form-message--error {
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  
  .form-input.error,
  .form-textarea.error {
    border-color: #e74c3c;
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .form-error {
    color: #e74c3c;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    min-height: 1.25rem;
  }
`;
document.head.appendChild(style);

// Theme Toggle Functionality
function setupThemeToggle() {
  // Get saved theme or default to system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  // Set initial theme
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  } else if (systemPrefersLight) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  // Theme toggle event listener
  themeToggle.addEventListener('click', toggleTheme);
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'light' : 'dark');
    }
  });
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Add transition class for smooth animation
  document.documentElement.classList.add('theme-transitioning');
  
  // Set new theme
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Remove transition class after animation
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning');
  }, 300);
  
  // Add haptic feedback if available
  if (navigator.vibrate) {
    navigator.vibrate(50);
  }
  
  // Update button animation
  animateThemeToggle();
}

function animateThemeToggle() {
  const button = themeToggle;
  button.style.transform = 'scale(0.9)';
  
  setTimeout(() => {
    button.style.transform = 'scale(1)';
  }, 150);
}
