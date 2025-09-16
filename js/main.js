import { siteData } from './data.js';

// DOM Elements
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const mobileOverlay = document.getElementById('mobileOverlay');
const navLinks = document.querySelectorAll('.nav-list__link');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

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
      <ul class="education-item__bullets">
        ${edu.highlights.map(highlight => `<li class="education-item__bullet">${highlight}</li>`).join('')}
      </ul>
    </div>
  `).join('');
  
  educationList.innerHTML = educationHTML;
}

// Render Projects Section
function renderProjects() {
  const projectsList = document.getElementById('projectsList');
  
  const projectsHTML = siteData.projects.map(project => `
    <div class="project-card">
      <h3 class="project-card__title">${project.name}</h3>
      <p class="project-card__summary">${project.summary}</p>
      <div class="project-card__stack">
        ${project.stack.map(tech => `<span class="stack-badge">${tech}</span>`).join('')}
      </div>
      <div class="project-card__links">
        ${project.links.live && project.links.live !== '#' ? `<a href="${project.links.live}" class="project-card__link" target="_blank" rel="noopener">Live Demo</a>` : ''}
        <a href="${project.links.github}" class="project-card__link" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  `).join('');
  
  projectsList.innerHTML = projectsHTML;
}


// Render Skills Section
function renderSkills() {
  const skillsList = document.getElementById('skillsList');
  
  const skillsHTML = Object.entries(siteData.skills).map(([category, skills]) => `
    <div class="skills-group">
      <h3 class="skills-group__title">${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
      <div class="skills-list">
        ${skills.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');
  
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

// Intersection Observer for Active Navigation
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
      }
    });
  }, options);
  
  sections.forEach(section => {
    observer.observe(section);
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
    // you would send the data to a server
    // use a mailto fallback
    const subject = encodeURIComponent('Portfolio Contact Form');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    const mailtoLink = `mailto:${siteData.contact.email}?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoLink;
    
    showFormMessage('Thank you! Your message has been sent.', 'success');
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

// Add CSS for form messages
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
`;
document.head.appendChild(style);
