/**
 * NOBIES LENS PHOTOGRAPHY - MAIN JAVASCRIPT
 * Features:
 * - Single Indicator Theme Toggle (Cream & White vs All-Black on single click)
 * - Custom Round Circle Mouse Cursor with Smooth Follow & Hover Expansion
 * - Lightbox Modal with Zoom & WhatsApp Booking Links
 * - Filterable Categorized Portfolio (for portfolio.html & previews)
 * - Category Tab Switching (for pricing.html & overview)
 * - Contact & Booking WhatsApp Compilation
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // Official Studio Configuration
    // -------------------------------------------------------------
    const STUDIO_CONFIG = {
        name: "Nobies Lens Photography",
        whatsappApiNumber: "212706633200",
        phoneCallNumber: "0706633200",
        instagramUrl: "https://www.instagram.com/invites/contact/?i=j5xaaqxcib7k&utm_content=c10c3m5&utm_source=ig&utm_medium=social",
        facebookUrl: "https://facebook.com/nobieslens",
        email: "inquiries@nobieslens.com"
    };

    // -------------------------------------------------------------
    // 1. Single Indicator Theme Switcher (Cream & White <-> All-Black)
    // -------------------------------------------------------------
    const savedTheme = localStorage.getItem('nobies_theme') || 'light';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nobies_theme', theme);

        // Update all single indicator buttons
        document.querySelectorAll('.theme-toggle-single, #themeToggleBtn, #themeToggleBtnMobile').forEach(btn => {
            const iconSpan = btn.querySelector('.theme-toggle-icon');
            if (theme === 'dark') {
                if (iconSpan) iconSpan.innerHTML = '<i class="fa-solid fa-sun" style="color:#eab308;"></i>';
                btn.setAttribute('title', 'Click to switch to Cream & White Theme');
                btn.classList.add('is-dark');
            } else {
                if (iconSpan) iconSpan.innerHTML = '<i class="fa-solid fa-moon" style="color:#404040;"></i>';
                btn.setAttribute('title', 'Click to switch to All-Black Theme');
                btn.classList.remove('is-dark');
            }
        });
    }

    // Toggle on every click
    document.querySelectorAll('.theme-toggle-single, #themeToggleBtn, #themeToggleBtnMobile').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    });

    // -------------------------------------------------------------
    // 2. Custom Round Circle Mouse Cursor
    // -------------------------------------------------------------
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorCircle = document.querySelector('.custom-cursor-circle');

    if (cursorDot && cursorCircle && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        let mouseX = -100;
        let mouseY = -100;
        let circleX = -100;
        let circleY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            circleX += (mouseX - circleX) * 0.16;
            circleY += (mouseY - circleY) * 0.16;
            cursorCircle.style.left = `${circleX}px`;
            cursorCircle.style.top = `${circleY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactiveElements = document.querySelectorAll(
            'a, button, .gallery-item, .pricing-card, .spotlight-card, input, select, textarea, .filter-btn, .theme-toggle-single'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorCircle.classList.add('hovering');
                cursorDot.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorCircle.classList.remove('hovering');
                cursorDot.classList.remove('hovering');
            });
        });
    }

    // -------------------------------------------------------------
    // 3. Mobile Navigation Drawer Toggle
    // -------------------------------------------------------------
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');

    if (hamburgerBtn && mobileNav && mobileOverlay) {
        function openMobileNav() {
            mobileNav.classList.add('open');
            mobileOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileNav() {
            mobileNav.classList.remove('open');
            mobileOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        hamburgerBtn.addEventListener('click', openMobileNav);
        mobileOverlay.addEventListener('click', closeMobileNav);

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });
    }

    // -------------------------------------------------------------
    // 4. Portfolio Filter Tabs (For portfolio.html & preview)
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.gallery-filter-tabs .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (filter === 'all' || itemCategory === filter) {
                        item.style.display = '';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.96)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });

        // Check if page opened with category query parameter (e.g., portfolio.html?cat=lifestyle)
        const urlParams = new URLSearchParams(window.location.search);
        const catParam = urlParams.get('cat');
        if (catParam) {
            const targetFilterBtn = document.querySelector(`.filter-btn[data-filter="${catParam}"]`);
            if (targetFilterBtn) {
                targetFilterBtn.click();
            }
        }
    }

    // -------------------------------------------------------------
    // 5. Pricing Category Tabs Switcher (For pricing.html)
    // -------------------------------------------------------------
    const pricingButtons = document.querySelectorAll('.pricing-nav-btn');
    const pricingPanels = document.querySelectorAll('.pricing-category-panel');

    if (pricingButtons.length > 0 && pricingPanels.length > 0) {
        function activatePricingTab(targetCategory) {
            pricingButtons.forEach(b => {
                if (b.getAttribute('data-category') === targetCategory) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });

            pricingPanels.forEach(panel => {
                if (panel.id === `pricing-${targetCategory}`) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        }

        pricingButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetCategory = btn.getAttribute('data-category');
                activatePricingTab(targetCategory);
            });
        });

        // Auto-select tab if URL has hash (e.g. pricing.html#lifestyle or #corporate)
        const hash = window.location.hash.replace('#', '').toLowerCase();
        if (hash && ['graduation', 'lifestyle', 'corporate', 'wedding'].includes(hash)) {
            activatePricingTab(hash);
            const targetPanel = document.getElementById(`pricing-${hash}`);
            if (targetPanel) {
                setTimeout(() => {
                    targetPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
            }
        }
    }

    // -------------------------------------------------------------
    // 6. Interactive Fullscreen Lightbox
    // -------------------------------------------------------------
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        const lightboxImg = document.getElementById('lightboxImg');
        const lightboxTitle = document.getElementById('lightboxTitle');
        const lightboxCategory = document.getElementById('lightboxCategory');
        const lightboxWaBtn = document.getElementById('lightboxWaBtn');
        const closeBtn = document.querySelector('.lightbox-close-btn');
        const prevBtn = document.querySelector('.lightbox-prev-btn');
        const nextBtn = document.querySelector('.lightbox-next-btn');

        let currentGalleryIndex = 0;
        let visibleGalleryItems = [];

        function getVisibleItems() {
            return Array.from(document.querySelectorAll('.gallery-grid .gallery-item')).filter(
                item => item.style.display !== 'none'
            );
        }

        function openLightbox(index) {
            visibleGalleryItems = getVisibleItems();
            if (visibleGalleryItems.length === 0) return;

            currentGalleryIndex = index;
            const item = visibleGalleryItems[currentGalleryIndex];
            const highres = item.getAttribute('data-highres') || item.querySelector('img').src;
            const title = item.getAttribute('data-title') || item.querySelector('.gallery-title')?.textContent || 'Nobies Lens Artwork';
            const category = item.querySelector('.gallery-category-pill')?.textContent || 'Fine Art Photography';

            lightboxImg.src = highres;
            lightboxTitle.textContent = title;
            lightboxCategory.textContent = category;

            const waText = encodeURIComponent(`Hello Nobies Lens Photography, I love this photograph: "${title}" (${category}) and would love to book a similar session!`);
            lightboxWaBtn.href = `https://wa.me/${STUDIO_CONFIG.whatsappApiNumber}?text=${waText}`;

            lightboxModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightboxModal.classList.remove('open');
            document.body.style.overflow = '';
        }

        function showNextImage() {
            visibleGalleryItems = getVisibleItems();
            currentGalleryIndex = (currentGalleryIndex + 1) % visibleGalleryItems.length;
            openLightbox(currentGalleryIndex);
        }

        function showPrevImage() {
            visibleGalleryItems = getVisibleItems();
            currentGalleryIndex = (currentGalleryIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
            openLightbox(currentGalleryIndex);
        }

        document.querySelectorAll('.gallery-grid .gallery-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                visibleGalleryItems = getVisibleItems();
                const visibleIndex = visibleGalleryItems.indexOf(item);
                openLightbox(visibleIndex >= 0 ? visibleIndex : index);
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', showNextImage);
        if (prevBtn) prevBtn.addEventListener('click', showPrevImage);

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (!lightboxModal.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        });
    }

    // -------------------------------------------------------------
    // 7. Booking Form & WhatsApp Direct Send
    // -------------------------------------------------------------
    const bookingForm = document.getElementById('bookingForm');
    const btnSendWhatsApp = document.getElementById('btnSendWhatsApp');
    const formFeedback = document.getElementById('formFeedback');

    function buildWhatsAppMessage() {
        const name = document.getElementById('clientName')?.value.trim();
        const phone = document.getElementById('clientPhone')?.value.trim();
        const email = document.getElementById('clientEmail')?.value.trim();
        const category = document.getElementById('shootCategory')?.value;
        const packageTier = document.getElementById('shootPackage')?.value;
        const message = document.getElementById('clientMessage')?.value.trim();

        if (!name || !phone || !category) {
            if (formFeedback) {
                formFeedback.innerHTML = `<span style="color: #ef4444;"><i class="fa-solid fa-circle-exclamation"></i> Please provide your name, phone, and shoot category.</span>`;
            }
            return null;
        }

        let waText = `*NEW BOOKING INQUIRY — NOBIES LENS PHOTOGRAPHY*\n\n`;
        waText += `*Client Name:* ${name}\n`;
        waText += `*Phone / WhatsApp:* ${phone}\n`;
        if (email) waText += `*Email:* ${email}\n`;
        waText += `*Shoot Category:* ${category}\n`;
        if (packageTier && packageTier !== 'Not Decided / Need Advice') {
            waText += `*Preferred Package:* ${packageTier}\n`;
        }
        if (message) waText += `*Creative Vision:* ${message}\n`;
        waText += `\n_Sent via Nobies Lens Official Website_`;

        return encodeURIComponent(waText);
    }

    if (btnSendWhatsApp) {
        btnSendWhatsApp.addEventListener('click', () => {
            const encoded = buildWhatsAppMessage();
            if (encoded) {
                const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappApiNumber}?text=${encoded}`;
                window.open(waUrl, '_blank');
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const encoded = buildWhatsAppMessage();
            if (encoded) {
                if (formFeedback) {
                    formFeedback.innerHTML = `<span style="color: #22c55e;"><i class="fa-solid fa-circle-check"></i> Inquiry received! Opening WhatsApp to finalize your booking...</span>`;
                }
                const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappApiNumber}?text=${encoded}`;
                setTimeout(() => {
                    window.open(waUrl, '_blank');
                }, 800);
            }
        });
    }
});
