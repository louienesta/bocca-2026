document.addEventListener('DOMContentLoaded', () => {
    initialiseFooter();
    initialiseCaseGrid();
    initialiseServicesAccordion();
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
    const items = document.querySelectorAll('.fade-in-up, .friends-emblem-reveal');
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

function initialiseServicesAccordion() {
    const items = document.querySelectorAll('.service-accordion-item');
    const closeDuration = 850;
    const closeTimers = new WeakMap();
    const getPanel = (item) => item.querySelector('.service-accordion-panel');

    const cancelClose = (item) => {
        const closeState = closeTimers.get(item);
        if (closeState) {
            window.clearTimeout(closeState.timeout);
            getPanel(item).removeEventListener('transitionend', closeState.onTransitionEnd);
        }
        closeTimers.delete(item);
        item.classList.remove('is-closing');
    };

    const animateOpen = (item) => {
        const panel = getPanel(item);
        const currentHeight = panel.getBoundingClientRect().height;
        const currentOpacity = window.getComputedStyle(panel).opacity;

        item.open = true;
        panel.style.height = 'auto';
        panel.style.opacity = '1';
        const expandedHeight = panel.scrollHeight;

        panel.style.height = `${currentHeight}px`;
        panel.style.opacity = currentOpacity;
        void panel.offsetHeight;

        window.requestAnimationFrame(() => {
            panel.style.height = `${expandedHeight}px`;
            panel.style.opacity = '1';
        });

        const finishOpen = (event) => {
            if (event.propertyName !== 'height' || !item.open || item.classList.contains('is-closing')) return;
            panel.style.height = 'auto';
            panel.removeEventListener('transitionend', finishOpen);
        };
        panel.addEventListener('transitionend', finishOpen);
    };

    const closeItem = (item) => {
        if (!item.open || item.classList.contains('is-closing')) return;

        const panel = getPanel(item);
        const currentHeight = panel.getBoundingClientRect().height;
        const currentOpacity = window.getComputedStyle(panel).opacity;

        panel.style.height = `${currentHeight}px`;
        panel.style.opacity = currentOpacity;
        void panel.offsetHeight;
        item.classList.add('is-closing');

        window.requestAnimationFrame(() => {
            panel.style.height = '0px';
            panel.style.opacity = '0';
        });

        const finishClose = () => {
            const closeState = closeTimers.get(item);
            if (!closeState || !item.classList.contains('is-closing')) return;

            window.clearTimeout(closeState.timeout);
            panel.removeEventListener('transitionend', closeState.onTransitionEnd);
            item.open = false;
            item.classList.remove('is-closing');
            panel.style.removeProperty('height');
            panel.style.removeProperty('opacity');
            closeTimers.delete(item);
        };

        const onTransitionEnd = (event) => {
            if (event.propertyName === 'height') finishClose();
        };

        panel.addEventListener('transitionend', onTransitionEnd);
        closeTimers.set(item, {
            onTransitionEnd,
            timeout: window.setTimeout(finishClose, closeDuration + 200)
        });
    };

    const openItem = (item) => {
        cancelClose(item);
        animateOpen(item);

        items.forEach((otherItem) => {
            if (otherItem !== item) closeItem(otherItem);
        });
    };

    items.forEach((item) => {
        const summary = item.querySelector('summary');

        summary.addEventListener('click', (event) => {
            event.preventDefault();

            if (item.open && !item.classList.contains('is-closing')) {
                closeItem(item);
                return;
            }

            openItem(item);
        });
    });
}
