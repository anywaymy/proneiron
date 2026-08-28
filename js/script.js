// Interactive JavaScript for Proneuron Clinic Landing Page

document.addEventListener('DOMContentLoaded', () => {
  // Global State Variables
  let currentBranch = 'stavropol';
  let selectedSymptomsList = [];

  // Branch Map Data
  const branchData = {
//    stavropol: {
//      name: 'Ставрополь',
//      address: 'г. Ставрополь, ул. Пирогова, 15/1',
//      landmarks: 'Юго-Западный район, напротив сквера Победы',
//      phone: '+7 (962) 400-11-00',
//      workHours: 'Пн-Сб: 08:30 – 20:00, Вс: 09:00 – 18:00',
//      mapUrl: 'https://yandex.ru/map-widget/v1/?ll=41.9161,45.0225&z=16',
//    },
//    mikhailovsk: {
//      name: 'Михайловск',
//      address: 'г. Михайловск, ул. Ленина, 120/2',
//      landmarks: 'Центральный микрорайон, удобная парковка',
//      phone: '+7 (962) 400-11-00',
//      workHours: 'Пн-Сб: 08:30 – 20:00, Вс: Выходной',
//      mapUrl: 'https://yandex.ru/map-widget/v1/?ll=41.9682,45.1283&z=16',
//    },
  };

  // 1. Branch Switcher Logic
  const branchBtns = document.querySelectorAll('.branch-switcher-btn');
  const branchAddressEls = document.querySelectorAll('.current-branch-address');
  const branchCityNameEls = document.querySelectorAll('.current-branch-city');
  const branchWorkHoursEls = document.querySelectorAll('.current-branch-hours');
  const branchMapIframe = document.getElementById('branch-yandex-map');

//  function setBranch(branchId) {
//    if (!branchData[branchId]) return;
//    currentBranch = branchId;
//
//    // Update active button styles
//    branchBtns.forEach((btn) => {
//      if (btn.dataset.branch === branchId) {
//        btn.classList.add('active', 'bg-blue-600', 'text-white');
//        btn.classList.remove('bg-slate-50', 'text-slate-700', 'bg-white');
//      } else {
//        btn.classList.remove('active', 'bg-blue-600', 'text-white');
//        btn.classList.add('bg-slate-50', 'text-slate-700');
//      }
//    });
//
//    // Update text content in DOM
//    const data = branchData[branchId];
//    branchAddressEls.forEach((el) => (el.textContent = data.address));
//    branchCityNameEls.forEach((el) => (el.textContent = data.name));
//    branchWorkHoursEls.forEach((el) => (el.textContent = data.workHours));
//
//    if (branchMapIframe) {
//      branchMapIframe.src = data.mapUrl;
//    }
//
//    // Update modal branch select if present
//    const modalBranchSelect = document.getElementById('modal-branch-select');
//    if (modalBranchSelect) {
//      modalBranchSelect.value = branchId;
//    }
//
//    // Filter specialist cards if data-branch attribute is present
//    const specialistCards = document.querySelectorAll('.specialist-card');
//    specialistCards.forEach((card) => {
//      const cardBranches = card.dataset.branches ? card.dataset.branches.split(',') : [];
//      if (cardBranches.length === 0 || cardBranches.includes(branchId)) {
//        card.style.display = 'flex';
//      } else {
//        card.style.display = 'none';
//      }
//    });
//  }

  branchBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const branch = btn.dataset.branch;
      setBranch(branch);
    });
  });

  // 2. Condition Filter Tabs Logic
  const conditionTabs = document.querySelectorAll('.condition-tab-btn');
  const conditionCards = document.querySelectorAll('.condition-detail-card');

  conditionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.conditionId;

      conditionTabs.forEach((t) => {
        t.classList.remove('bg-blue-600', 'text-white', 'shadow-md', 'scale-105');
        t.classList.add('bg-white', 'text-slate-700');
      });

      tab.classList.add('bg-blue-600', 'text-white', 'shadow-md', 'scale-105');
      tab.classList.remove('bg-white', 'text-slate-700');

      conditionCards.forEach((card) => {
        if (card.dataset.conditionId === targetId) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 3. Symptom Checker Logic
  const symptomCheckboxes = document.querySelectorAll('.symptom-checkbox');
  const selectedSymptomsCountEl = document.getElementById('selected-symptoms-count');
  const selectedSymptomsBox = document.getElementById('selected-symptoms-summary');
  const selectedSymptomsTextEl = document.getElementById('selected-symptoms-text');

  function updateSymptomChecker() {
    selectedSymptomsList = [];
    symptomCheckboxes.forEach((cb) => {
      if (cb.checked) {
        selectedSymptomsList.push(cb.value);
      }
    });

    if (selectedSymptomsCountEl) {
      selectedSymptomsCountEl.textContent = selectedSymptomsList.length;
    }

    if (selectedSymptomsBox && selectedSymptomsTextEl) {
      if (selectedSymptomsList.length > 0) {
        selectedSymptomsBox.classList.remove('hidden');
        selectedSymptomsTextEl.textContent = selectedSymptomsList.join(', ');
      } else {
        selectedSymptomsBox.classList.add('hidden');
      }
    }
  }

  symptomCheckboxes.forEach((cb) => {
    cb.addEventListener('change', updateSymptomChecker);
  });

  const clearSymptomsBtn = document.getElementById('clear-symptoms-btn');
  if (clearSymptomsBtn) {
    clearSymptomsBtn.addEventListener('click', () => {
      symptomCheckboxes.forEach((cb) => (cb.checked = false));
      updateSymptomChecker();
    });
  }

  // 4. Calculator Logic
  const lessonCountInput = document.getElementById('calc-lessons-count');
  const serviceSelect = document.getElementById('calc-service-select');
  const totalCostEl = document.getElementById('calc-total-cost');
  const discountCostEl = document.getElementById('calc-discount-cost');
  const calcRangeSlider = document.getElementById('calc-range-slider');

  function calculatePrice() {
    if (!lessonCountInput || !serviceSelect || !totalCostEl) return;

    const lessons = parseInt(lessonCountInput.value) || 10;
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const pricePerLesson = parseInt(selectedOption.dataset.price) || 1800;

    let discountPercentage = 0;
    if (lessons >= 10 && lessons < 20) discountPercentage = 10;
    else if (lessons >= 20) discountPercentage = 15;

    const fullPrice = lessons * pricePerLesson;
    const finalPrice = Math.round(fullPrice * (1 - discountPercentage / 100));

    totalCostEl.textContent = finalPrice.toLocaleString('ru-RU') + ' ₽';
    if (discountCostEl) {
      if (discountPercentage > 0) {
        discountCostEl.textContent = `Скидка ${discountPercentage}% (Экономия ${(fullPrice - finalPrice).toLocaleString('ru-RU')} ₽)`;
        discountCostEl.classList.remove('hidden');
      } else {
        discountCostEl.classList.add('hidden');
      }
    }
  }

  if (lessonCountInput && serviceSelect) {
    lessonCountInput.addEventListener('input', (e) => {
      if (calcRangeSlider) calcRangeSlider.value = e.target.value;
      calculatePrice();
    });
    if (calcRangeSlider) {
      calcRangeSlider.addEventListener('input', (e) => {
        lessonCountInput.value = e.target.value;
        calculatePrice();
      });
    }
    serviceSelect.addEventListener('change', calculatePrice);
    calculatePrice();
  }

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-accordion-item');
  faqItems.forEach((item) => {
    const header = item.querySelector('.faq-accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((i) => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 6. Modal Open/Close Logic
  const appointmentModal = document.getElementById('appointment-modal');
  const modalFormView = document.getElementById('modal-form-view');
  const modalSuccessView = document.getElementById('modal-success-view');
  const modalServiceSelect = document.getElementById('modal-service-select');
  const modalSpecialistSelect = document.getElementById('modal-specialist-select');
  const modalSymptomsNotice = document.getElementById('modal-symptoms-notice');

  function openModal(serviceId = '', specialistId = '') {
    if (!appointmentModal) return;

    if (modalServiceSelect && serviceId) {
      modalServiceSelect.value = serviceId;
    }
    if (modalSpecialistSelect && specialistId) {
      modalSpecialistSelect.value = specialistId;
    }

    if (modalSymptomsNotice) {
      if (selectedSymptomsList.length > 0) {
        modalSymptomsNotice.textContent = 'Симптомы: ' + selectedSymptomsList.join(', ');
        modalSymptomsNotice.classList.remove('hidden');
      } else {
        modalSymptomsNotice.classList.add('hidden');
      }
    }

    if (modalFormView && modalSuccessView) {
      modalFormView.classList.remove('hidden');
      modalSuccessView.classList.add('hidden');
    }

    appointmentModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!appointmentModal) return;
    appointmentModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  // Attach click to all buttons with data-open-modal
  const openModalBtns = document.querySelectorAll('[data-open-modal]');
  openModalBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceId = btn.dataset.serviceId || '';
      const specialistId = btn.dataset.specialistId || '';
      openModal(serviceId, specialistId);
    });
  });

  const closeModalBtns = document.querySelectorAll('.modal-close-btn');
  closeModalBtns.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  if (appointmentModal) {
    appointmentModal.addEventListener('click', (e) => {
      if (e.target === appointmentModal) {
        closeModal();
      }
    });
  }

  // 7. Modal Form Submission
  const appointmentForm = document.getElementById('appointment-form');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentNameInput = document.getElementById('modal-parent-name');
      const parentName = parentNameInput ? parentNameInput.value : '';

      const successNameEl = document.getElementById('modal-success-parent-name');
      if (successNameEl) {
        successNameEl.textContent = parentName || 'уважаемый родитель';
      }

      if (modalFormView && modalSuccessView) {
        modalFormView.classList.add('hidden');
        modalSuccessView.classList.remove('hidden');
      }

      // Fire confetti animation if canvas-confetti loaded
      if (typeof window.confetti === 'function') {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.5 },
        });
      }
    });
  }

  // 8. Copy Requisite Button
  const copyBtns = document.querySelectorAll('.copy-requisite-btn');
  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.dataset.copyText;
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = '✓ Скопировано';
        btn.classList.add('text-emerald-600', 'font-bold');
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove('text-emerald-600', 'font-bold');
        }, 2000);
      }
    });
  });

  // 9. Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });

    const mobileNavLinks = mobileDrawer.querySelectorAll('a, button');
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.add('hidden');
      });
    });
  }

  // 10. Scroll to Top
  const scrollTopBtn = document.getElementById('scroll-to-top-btn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Initial setup call
  setBranch('stavropol');
});
