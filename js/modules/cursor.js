/**
 * GLOWISTIC - Premium Custom Desktop Cursor Module
 * Ultra-smooth 60fps lerp, zero perceived lag for dot, dynamic event delegation.
 * Strictly disabled on touch devices and small screens.
 */

export function initCustomCursor() {
  // Guard against touch screens, mobile devices, and small screens
  if (
    typeof window === 'undefined' ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.innerWidth < 1024 ||
    window.matchMedia('(hover: none), (pointer: coarse)').matches
  ) {
    return;
  }

  // Create cursor elements if not present in the DOM
  let cursorDot = document.getElementById('glowistic-cursor-dot');
  let cursorRing = document.getElementById('glowistic-cursor-ring');

  if (!cursorDot) {
    cursorDot = document.createElement('div');
    cursorDot.id = 'glowistic-cursor-dot';
    cursorDot.className = 'glowistic-cursor-dot';
    cursorDot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursorDot);
  }

  if (!cursorRing) {
    cursorRing = document.createElement('div');
    cursorRing.id = 'glowistic-cursor-ring';
    cursorRing.className = 'glowistic-cursor-ring';
    cursorRing.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursorRing);
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;
  let rafId = null;

  // Track exact mouse position with passive listener for maximum responsiveness
  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Direct hardware-accelerated transform for central dot (0ms perceived lag)
    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    if (!isVisible) {
      isVisible = true;
      ringX = mouseX;
      ringY = mouseY;
      cursorDot.classList.add('is-visible');
      cursorRing.classList.add('is-visible');
      cursorDot.classList.remove('is-hidden');
      cursorRing.classList.remove('is-hidden');
    }
  };

  const onMouseDown = () => {
    cursorRing.classList.add('is-active');
  };

  const onMouseUp = () => {
    cursorRing.classList.remove('is-active');
  };

  const onMouseLeave = () => {
    cursorDot.classList.add('is-hidden');
    cursorRing.classList.add('is-hidden');
    cursorDot.classList.remove('is-visible');
    cursorRing.classList.remove('is-visible');
    isVisible = false;
  };

  const onMouseEnter = () => {
    cursorDot.classList.remove('is-hidden');
    cursorRing.classList.remove('is-hidden');
    cursorDot.classList.add('is-visible');
    cursorRing.classList.add('is-visible');
  };

  // Delegated interactive element detection
  const interactiveSelector = `
    a, button, input, select, textarea, label,
    .btn, .product-card, .category-card, .blog-card,
    .header-icon-btn, .quick-view-btn, .whatsapp-card-btn,
    .btn-card-add, .accordion-header, .quiz-option,
    .payment-method-card, .toast-close, [role="button"],
    [data-quick-view], [data-add-to-cart], [data-category-filter]
  `;

  const onMouseOver = (e) => {
    const target = e.target.closest(interactiveSelector);
    if (target && !target.disabled && !target.classList.contains('is-disabled')) {
      cursorRing.classList.add('is-hovered');
      cursorDot.classList.add('is-hovered');
    }
  };

  const onMouseOut = (e) => {
    const target = e.target.closest(interactiveSelector);
    if (target) {
      // Check if we are still inside another interactive element
      const related = e.relatedTarget ? e.relatedTarget.closest(interactiveSelector) : null;
      if (!related || related.disabled || related.classList.contains('is-disabled')) {
        cursorRing.classList.remove('is-hovered');
        cursorDot.classList.remove('is-hovered');
      }
    }
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mousedown', onMouseDown, { passive: true });
  window.addEventListener('mouseup', onMouseUp, { passive: true });
  document.addEventListener('mouseleave', onMouseLeave);
  document.addEventListener('mouseenter', onMouseEnter);
  document.addEventListener('mouseover', onMouseOver, { passive: true });
  document.addEventListener('mouseout', onMouseOut, { passive: true });

  // If a touch event occurs, cleanly dismantle cursor
  const onTouchStart = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('mouseenter', onMouseEnter);
    document.removeEventListener('mouseover', onMouseOver);
    document.removeEventListener('mouseout', onMouseOut);
    window.removeEventListener('touchstart', onTouchStart);

    if (rafId) cancelAnimationFrame(rafId);
    if (cursorDot) cursorDot.remove();
    if (cursorRing) cursorRing.remove();
  };
  window.addEventListener('touchstart', onTouchStart, { passive: true, once: true });

  // 60FPS Lerp loop for the smooth outer ring
  const lerpFactor = 0.2;
  function renderLoop() {
    if (isVisible) {
      ringX += (mouseX - ringX) * lerpFactor;
      ringY += (mouseY - ringY) * lerpFactor;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    }
    rafId = requestAnimationFrame(renderLoop);
  }

  rafId = requestAnimationFrame(renderLoop);
}
