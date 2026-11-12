/**
 * NOBIES LENS PHOTOGRAPHY - MAIN JAVASCRIPT
 * Features:
 * - Round Circle Mouse Cursor with Smooth Follow & Hover Expansion
 * - Theme Switcher Tab: Cream & White (Default) vs All-Black Midnight
 * - Poppins Typography Support
 * - Filterable Categorized Portfolio (Samuella, Angelique, Dora, Issahaku, Corporate, Parties)
 * - Lightbox Modal with Zoom & Direct WhatsApp Booking (0706633200)
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // Official Studio Configuration
    // -------------------------------------------------------------
    const STUDIO_CONFIG = {
        name: "Nobies Lens Photography",
        displayPhone: "0706633200",
        whatsappApiNumber: "212706633200",
        instagramUrl: "https://www.instagram.com/invites/contact/?i=j5xaaqxcib7k&utm_content=c10c3m5&utm_source=ig&utm_medium=social",
        facebookUrl: "https://facebook.com/nobieslens",
        email: "inquiries@nobieslens.com"
    };

    // -------------------------------------------------------------
    // 1. Theme Switcher (Cream & White vs All-Black)
    // -------------------------------------------------------------
    const savedTheme = localStorage.getItem('nobies_theme') || 'light';
    applyTheme(savedTheme);

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('nobies_theme', theme);

        // Update all theme toggle buttons across the page
        document.querySelectorAll('.theme-switch-btn, .floating-theme-switch button').forEach(btn => {
            if (btn.getAttribute('data-theme-set') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    document.querySelectorAll('.theme-switch-btn, .floating-theme-switch button').forEach(btn => {
        btn.addEventListener('click', () => {
            const chosenTheme = btn.getAttribute('data-theme-set');
            applyTheme(chosenTheme);
        });
    });

    // -------------------------------------------------------------
    // 2. Custom Round Circle Mouse Cursor (As in Video)
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

        // Smooth follow animation for the outer round circle
        function animateCursor() {
            // Linear interpolation (lerp) for smooth lagging circular trailing
            circleX += (mouseX - circleX) * 0.16;
            circleY += (mouseY - circleY) * 0.16;

            cursorCircle.style.left = `${circleX}px`;
            cursorCircle.style.top = `${circleY}px`;

            requestAnimationFrame(animateCursor);
        }
        requestAnimationFrame(animateCursor);

        // Hover effect: expand circular cursor over interactive targets
        const interactiveSelectors = 'a, button, .btn, .gallery-item, .filter-btn, .pricing-card, input, select, textarea';
        document.querySelectorAll(interactiveSelectors).forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorCircle.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursorCircle.classList.remove('hovered');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorCircle.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorCircle.style.opacity = '1';
        });
    }

    // -------------------------------------------------------------
    // 3. Navigation & Scroll Effects
    // -------------------------------------------------------------
    const header = document.querySelector('.main-header');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    function toggleMobileNav() {
        const isOpen = mobileNav.classList.contains('open');
        if (isOpen) {
            mobileNav.classList.remove('open');
            mobileOverlay.classList.remove('active');
            hamburgerBtn.classList.remove('open');
            document.body.style.overflow = '';
        } else {
            mobileNav.classList.add('open');
            mobileOverlay.classList.add('active');
            hamburgerBtn.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileNav);
    if (mobileOverlay) mobileOverlay.addEventListener('click', toggleMobileNav);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) toggleMobileNav();
        });
    });

    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const targetLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (targetLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    targetLink.classList.add('active');
                } else {
                    targetLink.classList.remove('active');
                }
            }
        });
    });

    // -------------------------------------------------------------
    // 4. Curated Portfolio Filtering (Samuella, Angelique, Dora, etc.)
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const itemSub = item.getAttribute('data-sub') || '';

                if (filterValue === 'all' || 
                    filterValue === itemCategory || 
                    itemSub.includes(filterValue)) {
                    item.classList.remove('hide');
                    item.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 5. Pricing Category Tabs Switcher
    // -------------------------------------------------------------
    const pricingButtons = document.querySelectorAll('.pricing-nav-btn');
    const pricingPanels = document.querySelectorAll('.pricing-category-panel');

    pricingButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.getAttribute('data-category');

            pricingButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            pricingPanels.forEach(panel => {
                if (panel.id === `pricing-${targetCategory}`) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 6. Interactive Fullscreen Lightbox
    // -------------------------------------------------------------
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxInquireBtn = document.getElementById('lightboxInquireBtn');

    let currentGalleryIndex = 0;
    const visibleGalleryImages = () => Array.from(galleryItems).filter(item => !item.classList.contains('hide'));

    function openLightbox(index) {
        const visibleItems = visibleGalleryImages();
        if (visibleItems.length === 0) return;
        if (index < 0) index = visibleItems.length - 1;
        if (index >= visibleItems.length) index = 0;
        currentGalleryIndex = index;

        const targetItem = visibleItems[index];
        const img = targetItem.querySelector('img');
        const title = targetItem.getAttribute('data-title') || 'Nobies Lens Portfolio';
        const category = targetItem.getAttribute('data-category') || 'Editorial';
        const highResSrc = targetItem.getAttribute('data-highres') || img.src;

        lightboxImg.src = highResSrc;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category.toUpperCase() + ' SESSION';

        if (lightboxInquireBtn) {
            const encodedMsg = encodeURIComponent(
                `Hello Nobies Lens Photography, I saw your portfolio photo "${title}" (${category}) and would like to inquire about booking a photoshoot.`
            );
            lightboxInquireBtn.href = `https://wa.me/${STUDIO_CONFIG.whatsappApiNumber}?text=${encodedMsg}`;
        }

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const visibleItems = visibleGalleryImages();
            const index = visibleItems.indexOf(item);
            if (index !== -1) openLightbox(index);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(currentGalleryIndex - 1);
        });
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(currentGalleryIndex + 1);
        });
    }
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    window.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') openLightbox(currentGalleryIndex - 1);
        if (e.key === 'ArrowRight') openLightbox(currentGalleryIndex + 1);
    });

    // -------------------------------------------------------------
    // 7. Package Booking via WhatsApp Links
    // -------------------------------------------------------------
    const bookPackageButtons = document.querySelectorAll('.btn-book-package');
    const selectPackageDropdown = document.getElementById('shootPackage');
    const selectCategoryDropdown = document.getElementById('shootCategory');

    bookPackageButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pkgName = btn.getAttribute('data-package');
            const pkgCategory = btn.getAttribute('data-category');
            const pkgPrice = btn.getAttribute('data-price');

            if (selectCategoryDropdown && pkgCategory) selectCategoryDropdown.value = pkgCategory;
            if (selectPackageDropdown && pkgName) selectPackageDropdown.value = pkgName;

            const msg = encodeURIComponent(
                `Hello Nobies Lens Photography, I'm interested in booking the "${pkgName}" package (${pkgCategory} - ${pkgPrice}). Could you please share your availability?`
            );
            btn.href = `https://wa.me/${STUDIO_CONFIG.whatsappApiNumber}?text=${msg}`;
        });
    });

    // -------------------------------------------------------------
    // 8. Interactive Booking & Inquiry Form
    // -------------------------------------------------------------
    const bookingForm = document.getElementById('bookingForm');
    const sendWhatsAppBtn = document.getElementById('btnSendWhatsApp');
    const formFeedback = document.getElementById('formFeedback');

    function compileInquiryMessage() {
        const name = document.getElementById('clientName')?.value.trim() || 'Valued Client';
        const phone = document.getElementById('clientPhone')?.value.trim() || 'Not specified';
        const email = document.getElementById('clientEmail')?.value.trim() || 'Not specified';
        const category = document.getElementById('shootCategory')?.value || 'General Inquiry';
        const pkg = document.getElementById('shootPackage')?.value || 'Not selected';
        const date = document.getElementById('preferredDate')?.value || 'Flexible';
        const location = document.getElementById('shootLocation')?.value || 'Studio / To Discuss';
        const notes = document.getElementById('clientMessage')?.value.trim() || 'None';

        return `Hello *Nobies Lens Photography*,%0A%0AI would like to inquire about booking a photography session:%0A%0A` +
               `👤 *Client Name:* ${encodeURIComponent(name)}%0A` +
               `📱 *Phone / WhatsApp:* ${encodeURIComponent(phone)}%0A` +
               `✉️ *Email:* ${encodeURIComponent(email)}%0A` +
               `📸 *Shoot Type:* ${encodeURIComponent(category)}%0A` +
               `✨ *Preferred Package:* ${encodeURIComponent(pkg)}%0A` +
               `📅 *Preferred Date:* ${encodeURIComponent(date)}%0A` +
               `📍 *Location:* ${encodeURIComponent(location)}%0A` +
               `📝 *Vision / Notes:* ${encodeURIComponent(notes)}%0A%0A` +
               `Looking forward to hearing from you!`;
    }

    if (sendWhatsAppBtn) {
        sendWhatsAppBtn.addEventListener('click', (e) => {
            const nameInput = document.getElementById('clientName');
            if (nameInput && !nameInput.value.trim()) {
                alert('Please enter your name before sending your inquiry via WhatsApp.');
                nameInput.focus();
                return;
            }

            const waUrl = `https://wa.me/${STUDIO_CONFIG.whatsappApiNumber}?text=${compileInquiryMessage()}`;
            window.open(waUrl, '_blank');
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('clientName')?.value || 'Friend';
            
            if (formFeedback) {
                formFeedback.innerHTML = `
                    <strong>Thank you, ${name}!</strong><br>
                    Your session inquiry has been received by Nobies Lens Photography. We will reach out to you directly on WhatsApp or Email shortly.
                    <br><a href="https://wa.me/${STUDIO_CONFIG.whatsappApiNumber}?text=${compileInquiryMessage()}" target="_blank" style="display:inline-block; margin-top:10px; color:#25D366; font-weight:700; text-decoration:underline;">
                        Click here to chat immediately on WhatsApp (0706633200) &rarr;
                    </a>
                `;
                formFeedback.classList.add('success');
                formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            bookingForm.reset();
        });
    }

    // -------------------------------------------------------------
    // 9. Dynamic Links Initialization
    // -------------------------------------------------------------
    const directWaLinks = document.querySelectorAll('.link-whatsapp-direct');
    directWaLinks.forEach(link => {
        const customText = link.getAttribute('data-msg') || 'Hello Nobies Lens Photography, I would like to inquire about booking a photoshoot session.';
        link.href = `https://wa.me/${STUDIO_CONFIG.whatsappApiNumber}?text=${encodeURIComponent(customText)}`;
    });

    const directIgLinks = document.querySelectorAll('.link-instagram-direct');
    directIgLinks.forEach(link => {
        link.href = STUDIO_CONFIG.instagramUrl;
    });
});
