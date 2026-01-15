import './style.css';

// Main application logic
class App {
  constructor() {
    this.init();
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.startAnimations();
  }

  render() {
    const app = document.querySelector('#app');
    
    app.innerHTML = `
      <nav class="navbar">
        <div class="container">
          <div class="nav-content">
            <a href="/" class="logo">BloodDeck</a>
            <ul class="nav-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <button class="btn btn-primary" id="cta-button">Get Started</button>
          </div>
        </div>
      </nav>

      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">
              Build Something
              <span class="gradient-text">Amazing</span>
            </h1>
            <p class="hero-subtitle">
              Create stunning web experiences with modern JavaScript
            </p>
            <div class="hero-actions">
              <button class="btn btn-large btn-primary" id="start-btn">Start Building</button>
              <button class="btn btn-large btn-secondary" id="learn-btn">Learn More</button>
            </div>
          </div>
          <div class="hero-visual">
            <div class="floating-card card-1">
              <div class="card-icon">🚀</div>
              <div class="card-text">Fast Performance</div>
            </div>
            <div class="floating-card card-2">
              <div class="card-icon">✨</div>
              <div class="card-text">Beautiful Design</div>
            </div>
            <div class="floating-card card-3">
              <div class="card-icon">🎯</div>
              <div class="card-text">Pixel Perfect</div>
            </div>
          </div>
        </div>
      </section>

      <section class="features" id="features">
        <div class="container">
          <h2 class="section-title">Powerful Features</h2>
          <p class="section-subtitle">Everything you need to build modern web applications</p>
          
          <div class="features-grid" id="features-grid">
            <!-- Features will be rendered dynamically -->
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2 class="cta-title">Ready to Get Started?</h2>
            <p class="cta-subtitle">Join thousands of developers building amazing things</p>
            <button class="btn btn-large btn-white" id="journey-btn">Start Your Journey</button>
          </div>
        </div>
      </section>

      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <h3 class="logo">BloodDeck</h3>
              <p>Building the future of web development</p>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4>Product</h4>
                <ul>
                  <li><a href="#features">Features</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#docs">Documentation</a></li>
                </ul>
              </div>
              <div class="footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#careers">Careers</a></li>
                </ul>
              </div>
              <div class="footer-column">
                <h4>Connect</h4>
                <ul>
                  <li><a href="#twitter">Twitter</a></li>
                  <li><a href="#github">GitHub</a></li>
                  <li><a href="#discord">Discord</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2026 BloodDeck. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;

    this.renderFeatures();
  }

  renderFeatures() {
    const features = [
      {
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Optimized for speed and performance with modern best practices'
      },
      {
        icon: '🎨',
        title: 'Beautiful UI',
        description: 'Stunning interfaces with smooth animations and transitions'
      },
      {
        icon: '📱',
        title: 'Responsive',
        description: 'Perfect experience across all devices and screen sizes'
      },
      {
        icon: '🔒',
        title: 'Secure',
        description: 'Built with security best practices from the ground up'
      },
      {
        icon: '♿',
        title: 'Accessible',
        description: 'WCAG compliant and keyboard navigation friendly'
      },
      {
        icon: '🌙',
        title: 'Dark Mode',
        description: 'Beautiful dark theme that\'s easy on the eyes'
      }
    ];

    const featuresGrid = document.querySelector('#features-grid');
    
    features.forEach((feature, index) => {
      const featureCard = document.createElement('div');
      featureCard.className = 'feature-card';
      featureCard.style.animationDelay = `${index * 0.1}s`;
      
      featureCard.innerHTML = `
        <div class="feature-icon">${feature.icon}</div>
        <h3 class="feature-title">${feature.title}</h3>
        <p class="feature-description">${feature.description}</p>
      `;
      
      featuresGrid.appendChild(featureCard);
    });
  }

  attachEventListeners() {
    // CTA Button
    const ctaButton = document.querySelector('#cta-button');
    ctaButton?.addEventListener('click', () => {
      this.handleCTAClick('Navigation CTA');
    });

    // Hero Buttons
    const startBtn = document.querySelector('#start-btn');
    startBtn?.addEventListener('click', () => {
      this.handleCTAClick('Start Building');
    });

    const learnBtn = document.querySelector('#learn-btn');
    learnBtn?.addEventListener('click', () => {
      this.handleLearnMore();
    });

    // Journey Button
    const journeyBtn = document.querySelector('#journey-btn');
    journeyBtn?.addEventListener('click', () => {
      this.handleCTAClick('Start Journey');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Feature cards hover effect
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  }

  handleCTAClick(source) {
    console.log(`CTA clicked from: ${source}`);
    // Add your CTA logic here
    alert(`Welcome! You clicked: ${source}`);
  }

  handleLearnMore() {
    console.log('Learn more clicked');
    const featuresSection = document.querySelector('#features');
    featuresSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  startAnimations() {
    // Animate floating cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card);
    });

    // Observe sections
    document.querySelectorAll('.features, .cta-section').forEach(section => {
      observer.observe(section);
    });
  }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// Log to console
console.log('%c🚀 BloodDeck Frontend Loaded!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
