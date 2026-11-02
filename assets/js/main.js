/**
 * GLOSSY BRIDAL STUDIO — INTERACTIVE SCRIPT
 * Coimbatore, Tamil Nadu
 * Founder & Lead Artist: Abinaya
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Navigation Drawer
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerOverlay = document.querySelector('.drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  function openDrawer() {
    navDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    navDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // 3. Filterable Portfolio Gallery
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // 4. Interactive Lightbox Modal
  const lightboxModal = document.getElementById('portfolioLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxSpecLook = document.getElementById('lightboxSpecLook');
  const lightboxSpecPalette = document.getElementById('lightboxSpecPalette');
  const lightboxCloseBtn = document.querySelector('.lightbox-close-btn');
  const lightboxInquireBtn = document.getElementById('lightboxInquireBtn');

  let currentGalleryItems = [];
  let currentIndex = -1;

  function updateGalleryList() {
    currentGalleryItems = Array.from(document.querySelectorAll('.portfolio-item:not(.hidden)'));
  }

  function openLightbox(item) {
    updateGalleryList();
    currentIndex = currentGalleryItems.indexOf(item);

    const imgSrc = item.getAttribute('data-img');
    const category = item.getAttribute('data-category-label') || 'Bridal Artistry';
    const title = item.getAttribute('data-title') || 'Editorial Concept Look';
    const desc = item.getAttribute('data-desc') || 'Illustrative luxury bridal artistry curated for Glossy Bridal Studio.';
    const lookSpec = item.getAttribute('data-look-type') || 'Signature Bridal';
    const paletteSpec = item.getAttribute('data-palette') || 'Champagne Gold, Wine & Warm Ivory';

    lightboxImg.src = imgSrc;
    lightboxImg.alt = title;
    lightboxCategory.textContent = category;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    if (lightboxSpecLook) lightboxSpecLook.textContent = lookSpec;
    if (lightboxSpecPalette) lightboxSpecPalette.textContent = paletteSpec;

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => openLightbox(item));
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      if (currentGalleryItems.length > 0) {
        currentIndex = (currentIndex + 1) % currentGalleryItems.length;
        openLightbox(currentGalleryItems[currentIndex]);
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentGalleryItems.length > 0) {
        currentIndex = (currentIndex - 1 + currentGalleryItems.length) % currentGalleryItems.length;
        openLightbox(currentGalleryItems[currentIndex]);
      }
    }
  });

  // Prefill consultation from Lightbox CTA
  if (lightboxInquireBtn) {
    lightboxInquireBtn.addEventListener('click', () => {
      const lookTitle = lightboxTitle.textContent;
      closeLightbox();
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
        const notesField = document.getElementById('inquiryNotes');
        if (notesField) {
          notesField.value = `Hello Abinaya, I was captivated by the look "${lookTitle}" in your portfolio and would love to consult for my upcoming event.`;
          notesField.focus();
        }
      }
    });
  }

  // 5. WhatsApp & Consultation Form Submission
  const bookingForm = document.getElementById('bridalBookingForm');
  const whatsappDirectBtn = document.getElementById('whatsappDirectBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('brideName').value.trim();
      const phone = document.getElementById('bridePhone').value.trim();
      const date = document.getElementById('eventDate').value;
      const service = document.getElementById('serviceType').value;
      const location = document.getElementById('eventLocation').value.trim();
      const notes = document.getElementById('inquiryNotes').value.trim();

      if (!name || !phone || !date) {
        alert('Kindly provide your Name, Phone Number, and Event Date to check date availability.');
        return;
      }

      // Generate WhatsApp Direct link
      const message = `*Bridal Consultation Inquiry - Glossy Bridal Studio*\n` +
        `• *Client Name:* ${name}\n` +
        `• *Contact Phone:* ${phone}\n` +
        `• *Event Date:* ${date}\n` +
        `• *Service Desired:* ${service}\n` +
        `• *Event Venue/City:* ${location || 'Coimbatore'}\n` +
        `• *Notes/Vision:* ${notes || 'Looking for bespoke bridal styling & portfolio consultation.'}\n\n` +
        `_Inquiry sent via Glossy Bridal Studio Website_`;

      const whatsappUrl = `https://wa.me/919600974867?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      alert(`Thank you, ${name}! Your consultation request is compiled. Opening WhatsApp to connect directly with Founder & Lead Artist Abinaya.`);
      bookingForm.reset();
    });
  }

  if (whatsappDirectBtn) {
    whatsappDirectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const quickMsg = `Hello Abinaya! I am visiting the Glossy Bridal Studio website and would like to check availability and packages for my upcoming bridal / event date in Coimbatore.`;
      window.open(`https://wa.me/9600974867?text=${encodeURIComponent(quickMsg)}`, '_blank');
    });
  }

  // Set minimum event date to tomorrow
  const datePicker = document.getElementById('eventDate');
  if (datePicker) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    datePicker.min = tomorrow.toISOString().split('T')[0];
  }
});

