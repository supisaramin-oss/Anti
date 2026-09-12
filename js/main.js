/**
 * Main JavaScript for Modern Responsive Portfolio
 * Features: Dark/Light Mode, Typing Effect, Portfolio Filtering,
 * ScrollSpy & Navbar, Contact Validation, Counter Animation
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypingEffect();
  initNavbarScroll();
  initPortfolioFilter();
  initProjectModal();
  initContactForm();
  initBackToTop();
  initCounterAnimation();
  initHobbyScrollAnimation();
});

/* ==========================================================================
   1. Dark / Light Mode Toggle
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  
  if (!themeToggleBtn || !themeIcon) return;

  // Check saved theme or default to sweet pink light mode
  const savedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = savedTheme ? savedTheme : 'light'; // default sweet melody pink

  setTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    if (theme === 'light') {
      themeIcon.className = 'bi bi-moon-stars-fill text-danger';
      themeToggleBtn.setAttribute('title', 'สลับเป็นโหมดกลางคืน (Velvet Berry Mode)');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Velvet Berry Mode');
    } else {
      themeIcon.className = 'bi bi-heart-fill text-danger';
      themeToggleBtn.setAttribute('title', 'สลับเป็นโหมดหวานละมุน (Sweet Melody Pink)');
      themeToggleBtn.setAttribute('aria-label', 'Switch to Sweet Melody Pink Mode');
    }
  }
}

/* ==========================================================================
   2. Dynamic Typing Effect (Hero Section)
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const words = [
    'Digital Business Technology',
    'UI/UX & Web Development',
    'AI & Modern Tech Explorer',
    'IoT & Smart Devices Maker'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause at full word
      typingSpeed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Navbar Scroll Shadow & Mobile Auto-close
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.custom-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.getElementById('navbarNav');

  // Add shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Auto collapse mobile nav menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });
}

/* ==========================================================================
   4. Portfolio Filter System
   ========================================================================== */
function initPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (!filterButtons.length || !projectItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        
        if (filterValue === 'all' || categories.split(' ').includes(filterValue)) {
          item.style.display = 'block';
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.transition = 'all 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 30);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Dynamic Project Modal Preview
   ========================================================================== */
function initProjectModal() {
  const projectModal = document.getElementById('projectDetailModal');
  if (!projectModal) return;

  projectModal.addEventListener('show.bs.modal', (event) => {
    const triggerBtn = event.relatedTarget;
    if (!triggerBtn) return;

    const title = triggerBtn.getAttribute('data-title') || 'Project Detail';
    const category = triggerBtn.getAttribute('data-category-name') || 'Web Development';
    const desc = triggerBtn.getAttribute('data-desc') || '';
    const imgSrc = triggerBtn.getAttribute('data-img') || '';
    const tags = triggerBtn.getAttribute('data-tags') || '';
    const demoUrl = triggerBtn.getAttribute('data-demo') || '#';
    const codeUrl = triggerBtn.getAttribute('data-code') || '#';

    // Populate modal fields
    document.getElementById('modalProjectTitle').textContent = title;
    document.getElementById('modalProjectCategory').textContent = category;
    document.getElementById('modalProjectDesc').textContent = desc;
    document.getElementById('modalProjectImg').src = imgSrc;
    document.getElementById('modalProjectDemoBtn').href = demoUrl;
    document.getElementById('modalProjectCodeBtn').href = codeUrl;

    // Populate tags
    const tagsContainer = document.getElementById('modalProjectTags');
    tagsContainer.innerHTML = '';
    tags.split(',').forEach(tag => {
      if (tag.trim()) {
        const badge = document.createElement('span');
        badge.className = 'tag-badge me-1 mb-1';
        badge.textContent = tag.trim();
        tagsContainer.appendChild(badge);
      }
    });
  });
}

/* ==========================================================================
   6. Contact Form Validation & Toast Notification
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const toastElement = document.getElementById('successToast');
  
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check validity
    if (!contactForm.checkValidity()) {
      e.stopPropagation();
      contactForm.classList.add('was-validated');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnContent = submitBtn.innerHTML;

    // Simulate sending loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>กำลังส่งข้อความ...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      contactForm.reset();
      contactForm.classList.remove('was-validated');

      // Trigger Toast notification
      if (toastElement) {
        const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
        toast.show();
      }
    }, 1200);
  });
}

/* ==========================================================================
   7. Back-To-Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   8. Stats Counter Animation on Scroll
   ========================================================================== */
function initCounterAnimation() {
  const counterElements = document.querySelectorAll('.counter-val');
  if (!counterElements.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counterElements.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || '0', 10);
          const duration = 1500;
          const stepTime = 25;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('about');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   9. Hobby & Interests Scroll Reveal Animation
   ========================================================================== */
function initHobbyScrollAnimation() {
  const hobbyCards = document.querySelectorAll('.hobby-reveal');
  if (!hobbyCards.length) return;

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    hobbyCards.forEach(card => card.classList.add('is-revealed'));
    return;
  }

  const hobbyObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = parseInt(card.getAttribute('data-delay') || '100', 10);
        
        setTimeout(() => {
          card.classList.add('is-revealed');
        }, delay);

        observer.unobserve(card);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  hobbyCards.forEach(card => {
    hobbyObserver.observe(card);
  });
}
