// Roots Brotherhood — Interaction & Animation Engine
// Scroll-triggered reveal animations using Intersection Observer

document.addEventListener("DOMContentLoaded", function () {
  // ------------------------------------------
  // 1. Hamburger Menu Toggle (preserved)
  // ------------------------------------------
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  // ------------------------------------------
  // 2. Scroll-Triggered Reveal Animations
  // ------------------------------------------
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: reveal all elements immediately
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // ------------------------------------------
  // 3. Hero Entrance Animation (staggered)
  // ------------------------------------------
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    var heroChildren = heroContent.children;
    for (var i = 0; i < heroChildren.length; i++) {
      (function(index) {
        var child = heroChildren[index];
        child.style.opacity = '0';
        child.style.transform = 'translateY(30px)';
        child.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        child.style.transitionDelay = (0.2 + index * 0.15) + 's';

        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          });
        });
      })(i);
    }
  }

  // ------------------------------------------
  // 4. Header Background on Scroll
  // ------------------------------------------
  var headerEl = document.querySelector('header');
  if (headerEl) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 80) {
        headerEl.style.backgroundColor = 'rgba(12, 27, 14, 0.97)';
        headerEl.style.boxShadow = '0 4px 20px rgba(12, 27, 14, 0.4)';
      } else {
        headerEl.style.backgroundColor = 'rgba(12, 27, 14, 0.92)';
        headerEl.style.boxShadow = 'none';
      }
    }, { passive: true });
  }
});
  