// Lightbox functionality
const lightbox = {
  currentIndex: 0,
  images: [],
  lightboxElement: null,
  lightboxImgElement: null,
  
  init() {
    this.images = Array.from(document.querySelectorAll('.project-item img'));
    this.lightboxElement = document.getElementById('lightbox');
    this.lightboxImgElement = document.getElementById('lightbox-img');
    
    // Add event listeners
    document.querySelector('.lightbox .close').addEventListener('click', () => this.close());
    document.querySelector('.lightbox .prev').addEventListener('click', () => this.changeImage(-1));
    document.querySelector('.lightbox .next').addEventListener('click', () => this.changeImage(1));
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (this.lightboxElement.style.display === 'block') {
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowLeft') this.changeImage(-1);
        if (e.key === 'ArrowRight') this.changeImage(1);
      }
    });
    
    // Click outside to close
    this.lightboxElement.addEventListener('click', (e) => {
      if (e.target === this.lightboxElement) this.close();
    });
    
    // Initialize image click handlers
    this.images.forEach(img => {
      img.addEventListener('click', () => this.open(img));
    });
  },
  
  open(img) {
    this.currentIndex = this.images.indexOf(img);
    this.lightboxImgElement.src = img.src;
    this.lightboxElement.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  },
  
  close() {
    this.lightboxElement.style.display = 'none';
    document.body.style.overflow = ''; // Re-enable scrolling
  },
  
  changeImage(direction) {
    this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
    this.lightboxImgElement.src = this.images[this.currentIndex].src;
    
    // Add smooth transition
    this.lightboxImgElement.style.opacity = '0';
    setTimeout(() => {
      this.lightboxImgElement.style.opacity = '1';
    }, 100);
  }
};

// Form handling
const contactForm = {
  form: null,
  
  init() {
    this.form = document.getElementById('contactForm');
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  },
  
  handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
      name: this.form.querySelector('#name').value.trim(),
      email: this.form.querySelector('#email').value.trim(),
      message: this.form.querySelector('#message').value.trim()
    };
    
    if (!this.validateForm(formData)) {
      return;
    }
    
    this.showSuccess();
    this.form.reset();
  },
  
  validateForm({ name, email, message }) {
    let isValid = true;
    
    // Clear previous errors
    this.clearErrors();
    
    // Name validation
    if (!name) {
      this.showError('name', 'Please enter your name');
      isValid = false;
    }
    
    // Email validation
    if (!email) {
      this.showError('email', 'Please enter your email');
      isValid = false;
    } else if (!this.validateEmail(email)) {
      this.showError('email', 'Please enter a valid email');
      isValid = false;
    }
    
    // Message validation
    if (!message) {
      this.showError('message', 'Please enter your message');
      isValid = false;
    } else if (message.length < 10) {
      this.showError('message', 'Message should be at least 10 characters');
      isValid = false;
    }
    
    return isValid;
  },
  
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  showError(fieldId, message) {
    const field = this.form.querySelector(`#${fieldId}`);
    const errorElement = document.createElement('div');
    errorElement.className = 'text-danger mt-1 small';
    errorElement.textContent = message;
    field.parentNode.appendChild(errorElement);
    field.classList.add('is-invalid');
  },
  
  clearErrors() {
    this.form.querySelectorAll('.is-invalid').forEach(el => {
      el.classList.remove('is-invalid');
    });
    this.form.querySelectorAll('.text-danger').forEach(el => {
      el.remove();
    });
  },
  
  showSuccess() {
    // You can replace this with a more sophisticated notification system
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success mt-3';
    alertDiv.textContent = 'Your message has been sent successfully!';
    this.form.appendChild(alertDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  lightbox.init();
  contactForm.init();
});