const serviceData = {
  'windows': { title: 'Aluminum Windows', description: 'Durable aluminum-framed windows...', features: ['Corrosion-resistant...', 'Multiple glass options...', 'Enhanced security...'], process: 'Our process includes free consultation...', pricing: 'Pricing varies...', faqs: ['Q: Are the windows energy efficient? A: Yes...', 'Q: How long does installation take? A: Typically 1-2 days...'], photos: ['o.jpg']},
  'sliding-doors': { title: 'Sliding Glass Doors', description: 'Elegant sliding glass doors...', features: ['Smooth, easy-open operation.', 'Customizable sizes...', 'Energy-efficient...'], process: 'We provide a comprehensive consultation...', pricing: 'Contact us for a detailed quote...', faqs: ['Q: Can I customize the size? A: Yes...', 'Q: Are the doors secure? A: Yes...'], photos: ['d.jpg']},
  'shower-enclosures': { title: 'Shower Enclosures', description: 'Custom glass shower enclosures...', features: ['Frameless and framed options...', 'Custom sizes...', 'Easy to clean...'], process: 'We measure your space...', pricing: 'Pricing is based on size and design...', faqs: ['Q: Can I choose a custom design? A: Yes...', 'Q: Is the glass safe? A: Yes...'], photos: ['p.jpg']},
  'glass-cabinets': { title: 'Glass Cabinets', description: 'Stylish glass cabinets...', features: ['Customizable sizes...', 'High-quality tempered glass...', 'Elegant finishes...'], process: 'We work with you to design...', pricing: 'Get in touch for a custom quote...', faqs: ['Q: Can I choose the size and design? A: Yes...', 'Q: Is the glass safe? A: Yes...'], photos: ['q.jpg']},
  'glass-tables': { title: 'Glass Tables', description: 'Contemporary glass tables...', features: ['Various styles...', 'Durable glass...', 'Easy to clean...'], process: 'Choose from our range...', pricing: 'Contact us for pricing...', faqs: ['Q: Are the tables sturdy? A: Yes...', 'Q: Can I customize the size? A: Yes...'], photos: ['r.jpg']},
  'aluminum-cabinets': { title: 'Aluminum Cabinets', description: 'Robust aluminum cabinets...', features: ['Weather-resistant...', 'Multiple sizes...', 'Ideal for indoor and outdoor...'], process: 'We help you select...', pricing: 'Request a quote...', faqs: ['Q: Are these suitable for outdoor use? A: Yes...', 'Q: Can I customize the color? A: Yes...'], photos: ['s.jpg']},
  'mirrors': { title: 'Mirrors', description: 'High-quality mirrors...', features: ['Custom sizes...', 'Frameless and framed options...', 'Perfect for bathrooms...'], process: 'We assist you in selecting...', pricing: 'Contact us for a quote...', faqs: ['Q: Can I get a custom size mirror? A: Yes...', 'Q: How do I clean the mirrors? A: Use a soft cloth...'], photos: ['t.jpg']},
  'custom-projects': { title: 'Custom Projects', description: 'Tailored glass solutions...', features: ['Fully customizable designs...', 'Expert consultation...', 'High-quality materials...'], process: 'We collaborate with you...', pricing: 'Pricing varies based on project complexity...', faqs: ['Q: Can you handle large-scale projects? A: Yes...', 'Q: How long does a custom project take? A: Timelines vary...'], photos: ['w.jpg']}
};

document.addEventListener('DOMContentLoaded', function() {
  // --- Section Persistence: Stay on last section after refresh ---
  let savedSection = null;
  try { savedSection = localStorage.getItem('arrPrimaActiveSection'); } catch(e) {}
  if (savedSection && document.getElementById(savedSection)) {
    setTimeout(function() {
      setActiveSection(savedSection);
      document.getElementById(savedSection).scrollIntoView();
    }, 0);
  } else if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setTimeout(function() {
      const homeSection = document.getElementById('home');
      if (homeSection) homeSection.scrollIntoView();
      window.scrollTo({ top: 0 });
    }, 0);
  }
  const pageHeader = document.querySelector('header');
  const headerHeight = pageHeader ? pageHeader.offsetHeight : 60; 
  const allNavButtons = document.querySelectorAll('header nav button');
  const allPageSections = document.querySelectorAll('main > section[id]'); 
  const mainScrollableSections = Array.from(allPageSections).filter(s => s.id !== 'service-details' && s.id !== 'admin-panel');
  const serviceDetailSection = document.getElementById('service-details');
  const serviceSection = document.getElementById('services'); 
  const logo = document.getElementById('logo');

  // --- Function to update active state of Nav buttons ---
  function updateActiveNavLink(visibleSectionId) {
    allNavButtons.forEach(button => {
      if (button.getAttribute('data-target') === visibleSectionId) {
        button.classList.add('nav-active');
      } else {
        button.classList.remove('nav-active');
      }
    });
  }

  // --- Navigation Click Handling ---
  function setActiveSection(targetId) {
  // Persist active section
  try { localStorage.setItem('arrPrimaActiveSection', targetId); } catch(e) {}

    let sectionToScrollTo = null;

    allPageSections.forEach(section => {
      if (section.id === targetId) {
        section.classList.add('active');
        if (targetId !== 'admin-panel') { 
          section.classList.remove('hidden-section'); 
          section.classList.add('reveal-section'); 
        }
        if (typeof section.focus === 'function') section.focus(); 
        sectionToScrollTo = section;

        if (targetId === 'admin-panel') {
          if (sessionStorage.getItem('isAdminLoggedInArrPrima') === 'true') {
            displayAdminView();
          } else {
            displayAdminLogin();
          }
        }

      } else {
        section.classList.remove('active');
        if (section.id === 'admin-panel') {
           if(adminLoginSection) adminLoginSection.style.display = 'block'; 
           if(adminViewSection) adminViewSection.style.display = 'none';
        }
      }
    });
    
    if (targetId === 'service-details') {
      if(serviceDetailSection) serviceDetailSection.classList.add('active');
      updateActiveNavLink('services'); 
    } else {
      if(serviceDetailSection) serviceDetailSection.classList.remove('active');
      if (mainScrollableSections.some(s => s.id === targetId) || targetId === 'home' || targetId === 'admin-panel') { // Include admin-panel for nav update
          updateActiveNavLink(targetId);
      }
    }
    
    if (sectionToScrollTo && targetId !== 'service-details') { 
      sectionToScrollTo.scrollIntoView(); 
    }
  }
  
  allNavButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      setActiveSection(targetId);
    });
  });

  if (logo) {
    logo.addEventListener('click', () => {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    });
  }

  const heroBookingBtn = document.querySelector('.hero .btn-primary[data-target="booking"]');
  if (heroBookingBtn) {
    heroBookingBtn.addEventListener('click', function() {
      setActiveSection('booking');
    });
  }
  
  document.querySelectorAll('a[data-target="reviews"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      setActiveSection('reviews');
    });
  });

  // --- Service Details Display ---
  const serviceLinks = document.querySelectorAll('#dynamic-service-list .service-item a[data-service], #home .service-item a[data-service]');
  const serviceContentDiv = document.getElementById('service-content');
  const serviceBackButton = document.getElementById('service-back');

  serviceLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const serviceKey = this.getAttribute('data-service');
      const service = serviceData[serviceKey];

      if (service && serviceContentDiv && serviceDetailSection) {
        let photosHTML = service.photos && service.photos.length > 0 ? service.photos.map(photoUrl => 
            `<img src="${photoUrl}" alt="${service.title} photo" style="width:100%; max-width:300px; margin:0.5rem; border-radius: 6px;" onerror="this.src='https://placehold.co/300x200/eee/ccc?text=Image+Not+Available'; this.alt='Placeholder for ${service.title}'">`
        ).join('') : '<p>No photos available for this service.</p>';

        serviceContentDiv.innerHTML = `<h3>${service.title}</h3><p>${service.description}</p><h4>Features:</h4><ul>${service.features.map(feature => `<li>${feature}</li>`).join('')}</ul><h4>Process:</h4><p>${service.process}</p><h4>Pricing:</h4><p>${service.pricing}</p><h4>FAQs:</h4><ul>${service.faqs.map(faq => `<li>${faq}</li>`).join('')}</ul><h4>Photos:</h4><div>${photosHTML}</div>`;
        
        allPageSections.forEach(s => { 
          if (s.id !== 'service-details') s.classList.remove('active');
        });
        serviceDetailSection.classList.add('active');
        serviceDetailSection.classList.remove('hidden-section'); 
        serviceDetailSection.classList.add('reveal-section');   
        
        serviceDetailSection.scrollIntoView();
        updateActiveNavLink('services'); 
      }
    });
  });

  if (serviceBackButton && serviceDetailSection && serviceSection) {
    serviceBackButton.addEventListener('click', function() {
      setActiveSection('services'); 
    });
  }

  // --- Copyright Year ---
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // --- Review Form (in #reviews section) ---
  const leaveReviewBtn = document.querySelector('#reviews #leave-review-btn');
  const reviewForm = document.querySelector('#reviews #review-form'); 
  const reviewerNameInput = document.querySelector('#reviews #reviewer-name');
  const reviewTextInput = document.querySelector('#reviews #review-text');
  const reviewsList = document.querySelector('#reviews .review-list');

  if (leaveReviewBtn && reviewForm && reviewerNameInput && reviewTextInput && reviewsList) {
    leaveReviewBtn.addEventListener('click', () => {
      reviewForm.style.display = (reviewForm.style.display === 'none' || reviewForm.style.display === '') ? 'block' : 'none';
      if (reviewForm.style.display === 'block') {
        reviewerNameInput.focus();
        reviewForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
    reviewForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = reviewerNameInput.value.trim() || 'Anonymous', review = reviewTextInput.value.trim();
      if (!review) { alert('Please write a review.'); reviewTextInput.focus(); return; }
      const li = document.createElement('li'); li.className = 'review-item';
      li.innerHTML = `<h3>${name}</h3><p><em>"${review}"</em></p>`;
      const deleteBtn = document.createElement('button'); deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-review-btn btn-secondary'; 
      Object.assign(deleteBtn.style, {marginLeft: '10px', fontSize: '0.8rem', padding: '0.2rem 0.5rem'});
      deleteBtn.addEventListener('click', () => {
        li.remove();
        saveReviewsToStorage();
      });
      li.appendChild(deleteBtn); reviewsList.appendChild(li);
      saveReviewsToStorage();
      reviewForm.reset();
      reviewerNameInput.value = "";
      reviewTextInput.value = "";
      reviewForm.style.display = 'none';
    });
  }
  document.querySelectorAll('#reviews .review-item:not(:has(.delete-review-btn))').forEach(li => {
      const btn = document.createElement('button'); btn.textContent = 'Delete';
      btn.className = 'delete-review-btn btn-secondary';
      Object.assign(btn.style, {marginLeft: '10px', fontSize: '0.8rem', padding: '0.2rem 0.5rem'});
      btn.addEventListener('click', () => li.remove());
      li.appendChild(btn);
  });

  // --- Contact Form Notification ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    let notif = document.getElementById('contact-notification');
    if (!notif) { 
        notif = document.createElement('div'); notif.id = 'contact-notification';
        Object.assign(notif.style, {display: 'none', background: '#e6f7e6', color: '#207520', padding: '0.7rem 1.2rem', marginBottom: '1rem', borderRadius: '6px', fontWeight: 'bold', textAlign: 'center'});
        contactForm.parentNode.insertBefore(notif, contactForm);
    }
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = contactForm.contactName.value.trim(), email = contactForm.contactEmail.value.trim(), msg = contactForm.contactMessage.value.trim();
      if (!name || !email || !msg) { alert('Please fill in all fields.'); return; }
      notif.textContent = 'Your message has been sent!'; notif.style.display = 'block';
      setTimeout(() => notif.style.display = 'none', 3000);
      contactForm.reset();
    });
  }

  // --- Booking Form Multi-Step Logic ---
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    let currentStep = 1; const totalSteps = 4;
    const nextStepBtn = document.getElementById('next-step'), prevStepBtn = document.getElementById('prev-step'), submitBtn = document.getElementById('submit-btn');
    const bookingSteps = document.querySelectorAll('.booking-step'), bookingConfirmationDiv = document.getElementById('booking-confirmation'), bookingSummaryDiv = document.getElementById('booking-summary');

    function showStep(stepNumber) {
        bookingSteps.forEach(step => step.style.display = 'none');
        const currentStepDiv = document.getElementById(`booking-step-${stepNumber}`);
        if (currentStepDiv) currentStepDiv.style.display = 'block';
        prevStepBtn.style.display = stepNumber > 1 ? 'inline-block' : 'none'; 
        nextStepBtn.style.display = stepNumber < totalSteps ? 'inline-block' : 'none';
        submitBtn.style.display = stepNumber === totalSteps ? 'inline-block' : 'none';
        if (currentStepDiv) currentStepDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    function validateStep(step) {
        if (step === 1 && !bookingForm.service.value) { alert('Please select a service.'); bookingForm.service.focus(); return false; }
        if (step === 2) {
            if (!bookingForm.date1.value || !bookingForm.time1.value) { alert('1st choice date and time required.'); bookingForm.date1.value ? bookingForm.time1.focus() : bookingForm.date1.focus(); return false; }
            if (bookingForm.date1.value < new Date().toISOString().split('T')[0]) { alert('1st choice date cannot be in the past.'); bookingForm.date1.focus(); return false; }
        }
        if (step === 3) {
            if (!bookingForm.clientName.value.trim() || !bookingForm.clientEmail.value.trim() || !bookingForm.clientPhone.value.trim() || !bookingForm.installAddress.value.trim()) { alert('Full Name, Email, Phone, and Address required.'); return false; }
            if (!/^\S+@gmail\.com$/.test(bookingForm.clientEmail.value.trim())) { alert('Only Gmail addresses (ending with @gmail.com) are accepted.'); bookingForm.clientEmail.focus(); return false; }
        }
        return true;
    }
    function generateSummary() {
        const data = new FormData(bookingForm);
        let photosList = 'None';
        if (data.get('projectPhotos') && data.get('projectPhotos').name) { 
          photosList = `<ul><li>${data.get('projectPhotos').name} (${(data.get('projectPhotos').size / 1024).toFixed(1)} KB)</li></ul>`;
        } else if (bookingForm.projectPhotos.files && bookingForm.projectPhotos.files.length > 0) { 
           photosList = '<ul>' + Array.from(bookingForm.projectPhotos.files).map(f => `<li>${f.name} (${(f.size / 1024).toFixed(1)} KB)</li>`).join('') + '</ul>';
        }
        bookingSummaryDiv.innerHTML = `<h4>Appointment Summary</h4>
          <p><strong>Service:</strong> ${bookingForm.service.options[bookingForm.service.selectedIndex].text}</p>
          <p><strong>1st Choice:</strong> ${data.get('date1') || 'N/A'} at ${data.get('time1') || 'N/A'}</p>
          <p><strong>2nd Choice:</strong> ${data.get('date2') || 'N/A'} at ${data.get('time2') || 'N/A'}</p>
          <p><strong>Name:</strong> ${data.get('clientName') || 'N/A'}</p><p><strong>Email:</strong> ${data.get('clientEmail') || 'N/A'}</p>
          <p><strong>Phone:</strong> ${data.get('clientPhone') || 'N/A'}</p><p><strong>Address:</strong> ${data.get('installAddress') || 'N/A'}</p>
          <p><strong>Project Details:</strong> ${data.get('projectDetails') || 'None'}</p><p><strong>Attached Photos:</strong> ${photosList}</p>`;
    }
    nextStepBtn.addEventListener('click', () => { if (validateStep(currentStep) && currentStep < totalSteps) { currentStep++; if (currentStep === totalSteps) generateSummary(); showStep(currentStep); }});
    prevStepBtn.addEventListener('click', () => { if (currentStep > 1) { currentStep--; showStep(currentStep); }});
    bookingForm.addEventListener('submit', e => {
        e.preventDefault();
        if (currentStep === totalSteps) {
            // Client-side validation (already in your code)
            if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
                alert("Please ensure all steps are correctly filled before submitting to server.");
                return;
            }

            // Show client-side confirmation immediately
            document.getElementById(`booking-step-${totalSteps}`).style.display = 'none';
            bookingConfirmationDiv.style.display = 'block';
            bookingConfirmationDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            [prevStepBtn, nextStepBtn, submitBtn].forEach(b => b.style.display = 'none');

            // Prepare and send data to the server using Fetch API
            const formData = new FormData(bookingForm); // FormData handles file uploads correctly

            fetch('submit_booking.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log('Server response:', data); // Log server response for debugging
                // Optionally, update UI based on server response
            })
            .catch(error => {
                console.error('Error submitting booking to server:', error);
                alert('There was an error submitting your booking to the server. Please try again or contact support.');
                // Optionally revert UI changes if needed
            });

            // Existing localStorage saving logic (can be kept as a fallback or removed if DB is primary)
            try {
                const serviceSelect = document.getElementById('service-select');
                const bookingData = {
                    id: Date.now(),
                    service: serviceSelect.options[serviceSelect.selectedIndex].text,
                    date1: document.getElementById('date1').value,
                    time1: document.getElementById('time1').value,
                    date2: document.getElementById('date2').value,
                    time2: document.getElementById('time2').value,
                    clientName: document.getElementById('clientName').value,
                    clientEmail: document.getElementById('clientEmail').value,
                    clientPhone: document.getElementById('clientPhone').value,
                    installAddress: document.getElementById('installAddress').value,
                    projectDetails: document.getElementById('projectDetails').value,
                    projectPhotoNames: Array.from(document.getElementById('projectPhotos').files).map(file => file.name),
                    submissionTimestamp: new Date().toLocaleString()
                };
                let bookings = JSON.parse(localStorage.getItem('arrPrimaBookings')) || [];
                bookings.push(bookingData);
                localStorage.setItem('arrPrimaBookings', JSON.stringify(bookings));
                console.log('Booking saved to localStorage:', bookingData);
            } catch (err) {
                console.error('Error saving booking to localStorage:', err);
                // alert('There was an error saving your booking locally.');
            }
        } else {
            nextStepBtn.click();
        }
    });
    submitBtn.addEventListener('click', () => {
      if (!validateStep(1) || !validateStep(2) || !validateStep(3)) { alert("Please ensure all steps are correctly filled."); return; }
      document.getElementById(`booking-step-${totalSteps}`).style.display = 'none';
      bookingConfirmationDiv.style.display = 'block';
      bookingConfirmationDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      [prevStepBtn, nextStepBtn, submitBtn].forEach(b => b.style.display = 'none');
      // console.log('Booking submitted - FormData:', Object.fromEntries(new FormData(bookingForm))); // Already logged at save point
    });
    showStep(1);
  }

  // --- Gallery Filter ---
  const filterButtons = document.querySelectorAll('.gallery-filters button');
  const galleryItems = document.querySelectorAll('#gallery .gallery-item'); 
  filterButtons.forEach(button => button.addEventListener('click', function() {
      const filter = this.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('active')); this.classList.add('active');
      galleryItems.forEach(item => item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none');
  }));

  // --- Scroll Reveal Animation ---
  const sectionScrollObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden-section');
        entry.target.classList.add('reveal-section');
        obs.unobserve(entry.target); 
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('main > section.hidden-section').forEach(section => {
      if (section.id !== 'service-details' && section.id !== 'admin-panel') sectionScrollObserver.observe(section);
  });
  
  // --- Scrollspy for Navbar Highlighting ---
  const navScrollSpyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              if (!serviceDetailSection || !serviceDetailSection.classList.contains('active')) {
                  if (entry.target.id !== 'admin-panel' || (adminViewSection && adminViewSection.style.display === 'block')) { // Only highlight admin if view is shown
                     updateActiveNavLink(entry.target.id);
                  }
              }
          }
      });
  }, { 
      root: null,
      rootMargin: `-${headerHeight}px 0px -${window.innerHeight - headerHeight - 150}px 0px`,
      threshold: 0.01 
  });
  mainScrollableSections.forEach(section => navScrollSpyObserver.observe(section));
  // Also observe admin panel for scrollspy if it's considered a main scroll target



  // --- Initial State Setup ---

  // --- Booking Confirmation: Return to Home ---
  const returnToHomeBtn = document.querySelector('#booking-confirmation .btn-primary[data-target="home"]');
  if (returnToHomeBtn) {
    returnToHomeBtn.addEventListener('click', function() {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  allPageSections.forEach(section => { 
  
      if (section.id !== 'home' && section.id !== 'service-details' && section.id !== 'admin-panel' && !section.classList.contains('active') && !section.classList.contains('hidden-section')) {
          section.style.display = 'none';
      }
  });
  if (serviceDetailSection && !serviceDetailSection.classList.contains('active')) {
      serviceDetailSection.style.display = 'none';
  }

  if (window.scrollY < 50 && mainScrollableSections.find(s => s.id === 'home')) { 
    updateActiveNavLink('home');
  }

});

  // --- Footer Margin & Image Error Handling ---
  const footer = document.querySelector('footer');
  const mainEl = document.querySelector('main');
  if (footer && mainEl) mainEl.style.marginBottom = (footer.offsetHeight + 24) + 'px'; 
  document.querySelectorAll('#home .gallery-item img, #gallery .gallery-item img').forEach(img => {
      if (!img.getAttribute('onerror')) { 
          img.onerror = function() {
              let w = this.style.width || this.getAttribute('width') || '300', h = this.style.height || this.getAttribute('height') || '180';
              this.src=`https://placehold.co/${String(w).replace('px','')}x${String(h).replace('px','')}/eee/ccc?text=Img+Error`; this.alt='Placeholder';
          };
      }
  });
 // End DOMContentLoaded

// --- Persistent Reviews: Save to and Load from localStorage ---
function saveReviewsToStorage() {
  const reviewsList = document.querySelector('#reviews .review-list');
  const reviews = Array.from(reviewsList.querySelectorAll('.review-item')).map(li => ({
    name: li.querySelector('h3').textContent,
    review: li.querySelector('p').textContent.replace(/^"|"$/g, '')
  }));
  try {
    localStorage.setItem('arrPrimaReviews', JSON.stringify(reviews));
  } catch (e) {
    console.error('Error saving reviews to localStorage:', e);
  }
}

function loadReviewsFromStorage() {
  const reviewsList = document.querySelector('#reviews .review-list');
  if (!reviewsList) return;
  reviewsList.innerHTML = '';
  let reviews = [];
  try {
    reviews = JSON.parse(localStorage.getItem('arrPrimaReviews')) || [];
  } catch (e) {
    reviews = [];
  }
  reviews.forEach(review => {
    const li = document.createElement('li');
    li.className = 'review-item';
    li.innerHTML = `<h3>${review.name}</h3><p><em>"${review.review}"</em></p>`;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-review-btn btn-secondary';
    Object.assign(deleteBtn.style, {marginLeft: '10px', fontSize: '0.8rem', padding: '0.2rem 0.5rem'});
    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveReviewsToStorage();
    });
    li.appendChild(deleteBtn);
    reviewsList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', loadReviewsFromStorage);

document.addEventListener('DOMContentLoaded', function() {
  var serviceSelect = document.getElementById('service-select');
  if (serviceSelect && typeof serviceData === 'object') {
    // Remove all options except the placeholder
    for (var i = serviceSelect.options.length - 1; i > 0; i--) {
      serviceSelect.remove(i);
    }
    // Add each service as an option
    Object.keys(serviceData).forEach(function(key) {
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = serviceData[key].title;
      serviceSelect.appendChild(opt);
    });
  }
  // Prevent next step if no service is selected
  var nextStepBtn = document.getElementById('next-step');
  if (nextStepBtn && serviceSelect) {
    nextStepBtn.addEventListener('click', function(e) {
      var currentStepSection = document.getElementById('booking-step-1');
      if (currentStepSection && currentStepSection.style.display !== 'none') {
        if (!serviceSelect.value) {
          serviceSelect.focus();
          serviceSelect.style.border = '2px solid red';
          setTimeout(function(){ serviceSelect.style.border = ''; }, 2000);
          e.stopPropagation();
          e.preventDefault();
        }
      }
    }, true);
  }
});