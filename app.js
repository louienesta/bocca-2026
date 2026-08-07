document.addEventListener('DOMContentLoaded', () => {
    initialiseFooter();
    initialiseCaseGrid();
    initialiseFeaturedCases();
    initialiseAboutTeaser();
});

function initialiseFooter() {
    const footer = document.getElementById('site-footer');
    const blurOverlay = document.getElementById('page-blur-overlay');
    const drawer = document.getElementById('contact-reveal-card');
    const ctaLink = document.getElementById('footer-cta-link');
    const closeButton = document.getElementById('reveal-close-btn');
    let openDrawerWhenFooterIsVisible = false;

    if (!footer || !blurOverlay || !drawer) return;

    const setDrawerState = (isOpen) => {
        footer.classList.toggle('drawer-open', isOpen);
        drawer.setAttribute('aria-hidden', String(!isOpen));
        blurOverlay.classList.toggle('active', isOpen || footer.classList.contains('logo-visible'));

        if (isOpen) {
            closeButton?.focus({ preventScroll: true });
        } else {
            ctaLink?.focus({ preventScroll: true });
        }
    };

    const footerObserver = new IntersectionObserver(([entry]) => {
        footer.classList.toggle('logo-visible', entry.isIntersecting);
        blurOverlay.classList.toggle('active', entry.isIntersecting || footer.classList.contains('drawer-open'));

        if (entry.isIntersecting && openDrawerWhenFooterIsVisible) {
            openDrawerWhenFooterIsVisible = false;
            setDrawerState(true);
        }
    }, { threshold: 0.05 });

    footerObserver.observe(footer);

    ctaLink?.addEventListener('click', (event) => {
        event.preventDefault();
        setDrawerState(true);
    });

    closeButton?.addEventListener('click', () => setDrawerState(false));
    blurOverlay.addEventListener('click', () => setDrawerState(false));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && footer.classList.contains('drawer-open')) {
            setDrawerState(false);
        }
    });

    document.querySelectorAll('.nav-contact-trigger').forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            openDrawerWhenFooterIsVisible = true;
            footer.scrollIntoView({ behavior: 'smooth' });
            if (footer.classList.contains('logo-visible')) {
                openDrawerWhenFooterIsVisible = false;
                setDrawerState(true);
            }
        });
    });
}

function initialiseCaseGrid() {
    const items = document.querySelectorAll('.fade-in-up');
    if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach((item) => item.classList.add('in-view', 'animation-complete'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const completeAnimation = (event) => {
                    if (event.propertyName === 'transform') {
                        entry.target.classList.add('animation-complete');
                        entry.target.removeEventListener('transitionend', completeAnimation);
                    }
                };
                entry.target.addEventListener('transitionend', completeAnimation);
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0.1 });

    items.forEach((item) => observer.observe(item));
}

function initialiseFeaturedCases() {
    const section = document.getElementById('featured-cases');
    const track = document.getElementById('cases-carousel-track');
    if (!section || !track) return;

    const cases = [
        ['Case overskrift: Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'],
        ["Creative Branding: Designing Bocca's Future", 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.'],
        ['Digital Innovation: Seamless Web Products', 'Sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'],
        ['Strategic Growth: Expanding Market Presence', 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.'],
        ['Visual Identity: Defining Modern Aesthetics', 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla.']
    ];
    const title = document.getElementById('case-title');
    const description = document.getElementById('case-desc');
    const slides = document.querySelectorAll('.case-slide');
    const dots = document.querySelectorAll('#cases-pagination .dot');
    let activeIndex = 0;
    let isProgrammaticScroll = false;

    const updateActiveCase = (index) => {
        if (index === activeIndex && title.textContent === cases[index][0]) return;
        activeIndex = index;
        title.classList.add('transition-fade');
        description.classList.add('transition-fade');
        window.setTimeout(() => {
            title.textContent = cases[index][0];
            description.textContent = cases[index][1];
            title.classList.remove('transition-fade');
            description.classList.remove('transition-fade');
        }, 250);
        slides.forEach((slide, slideIndex) => slide.classList.toggle('active', slideIndex === index));
        dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
    };

    const updateDesktopCarousel = () => {
        if (isProgrammaticScroll || window.innerWidth <= 900) return;
        const sectionRect = section.getBoundingClientRect();
        const scrollableRange = sectionRect.height - window.innerHeight;
        if (scrollableRange <= 0) return;
        const progress = Math.max(0, Math.min(1, -sectionRect.top / scrollableRange));
        const index = Math.round(progress * (cases.length - 1));
        track.style.transform = `translateX(-${index * 20}%)`;
        updateActiveCase(index);
    };

    window.addEventListener('scroll', updateDesktopCarousel, { passive: true });
    updateDesktopCarousel();

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = Number(dot.dataset.slide);
            const sectionTop = window.scrollY + section.getBoundingClientRect().top;
            const range = section.getBoundingClientRect().height - window.innerHeight;
            isProgrammaticScroll = true;
            track.style.transform = `translateX(-${index * 20}%)`;
            updateActiveCase(index);
            window.scrollTo({ top: sectionTop + (index / (cases.length - 1)) * range, behavior: 'smooth' });
            window.setTimeout(() => { isProgrammaticScroll = false; }, 800);
        });
    });

    const mobileTrack = document.getElementById('mobile-cases-track');
    const mobileDots = document.querySelectorAll('#mobile-cases-pagination .dot');
    mobileTrack?.addEventListener('scroll', () => {
        const card = mobileTrack.querySelector('.mobile-case-card');
        if (!card) return;
        const index = Math.round(mobileTrack.scrollLeft / (card.offsetWidth + 20));
        mobileDots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
    }, { passive: true });

    mobileDots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const card = mobileTrack?.querySelector('.mobile-case-card');
            if (card) mobileTrack.scrollTo({ left: Number(dot.dataset.slide) * (card.offsetWidth + 20), behavior: 'smooth' });
        });
    });
}

function initialiseAboutTeaser() {
    const track = document.querySelector('.about-teaser');
    if (!track || CSS.supports('(animation-timeline: view()) and (animation-range: entry)') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const images = document.querySelectorAll('.about-teaser-image');
    document.body.classList.add('about-teaser-js-animation');
    window.addEventListener('scroll', () => {
        const rect = track.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
        images.forEach((image, index) => {
            const imageProgress = Math.max(0, Math.min(1, (progress - index * 0.1) / (1 - index * 0.1)));
            image.style.transform = `scale(${0.5 + imageProgress * 0.5})`;
            image.style.opacity = imageProgress;
        });
    }, { passive: true });
}
