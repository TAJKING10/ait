/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */

var tl = gsap.timeline(); 
gsap.registerPlugin(ScrollTrigger, SplitText);
// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// =================================== Smooth Scroller Js Start =====================================
var smoother = ScrollSmoother.create({
  smooth: .8,
  effects: true,
  smoothTouch: 0.1,
  ease: "power4.out",
});

// On load: if URL is page.html/section, scroll to that section
(function () {
  var m = window.location.pathname.match(/\.html\/([^/?#]+)/);
  if (!m) return;
  var sectionId = m[1];
  window.addEventListener('load', function () {
    setTimeout(function () {
      var target = document.getElementById(sectionId);
      if (!target) return;
      var sm = ScrollSmoother.get();
      if (sm) {
        gsap.to(sm, { scrollTop: sm.offset(target, 'top 90px'), duration: 0.55, ease: 'power2.inOut' });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 400);
  });
})();

// Intercept anchor clicks — handle #section and page.html/section on the same page
document.addEventListener('click', function (e) {
  var anchor = e.target.closest('a[href]');
  if (!anchor) return;
  var href = anchor.getAttribute('href');
  if (!href) return;

  var sectionId = null;

  if (href.charAt(0) === '#') {
    if (href.length > 1) sectionId = href.slice(1);
  } else {
    var pathMatch = href.match(/([^/]+\.html)\/([^/?#]+)/);
    if (pathMatch) {
      // Only intercept if the link targets the current page
      var currentFile = window.location.pathname.split('/').filter(function (p) { return p.endsWith('.html'); })[0] || '';
      if (!currentFile) currentFile = window.location.pathname.replace(/.*\/([^/]*)$/, '$1').replace(/\/.*$/, '');
      if (pathMatch[1] !== currentFile) return;
      sectionId = pathMatch[2];
    }
  }

  if (!sectionId) return;
  var target = document.getElementById(sectionId);
  if (!target) return;

  e.preventDefault();
  var base = window.location.pathname.replace(/\.html.*$/, '.html');
  history.pushState({ section: sectionId }, '', base + '/' + sectionId);

  gsap.to(smoother, { scrollTop: smoother.offset(target, 'top 90px'), duration: 0.55, ease: 'power2.inOut' });
});
// =================================== Smooth Scroller End Start =====================================

// =================================== Custom Cursor Js Start =====================================
var body = document.body;
var cursor = document.querySelector('.cursor');
var dot = document.querySelector('.dot');
var cursorSmalls = document.querySelectorAll('.cursor-small');
var cursorBigs = document.querySelectorAll('.cursor-big');

// quickTo avoids spawning a new tween on every mousemove event
const cursorXTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "expo.out" });
const cursorYTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "expo.out" });
const dotXTo   = gsap.quickTo(dot,    "x", { duration: 0.4, ease: "expo.out" });
const dotYTo   = gsap.quickTo(dot,    "y", { duration: 0.4, ease: "expo.out" });

gsap.set([cursor, dot], { visibility: 'visible' });

body.addEventListener('mousemove', function (event) {
    cursorXTo(event.x);
    cursorYTo(event.y);
    dotXTo(event.x);
    dotYTo(event.y);
}, { passive: true });

// Small Cursor
cursorSmalls.forEach(cursorSmall => {
  cursorSmall.addEventListener('mouseenter', function () {
      gsap.to(dot, {
          scale: 16,
          backgroundColor: '#fff',
      });
      gsap.to(cursor, {
          visibility: 'hidden',
          opacity: 0
      });
  });
  
  cursorSmall.addEventListener('mouseleave', function () {
      gsap.to(dot, {
          scale: 1,
          backgroundColor: '#fff',
      });
      gsap.to(cursor, {
        visibility: 'visible',
        opacity: 1
      });
  });
});

// Big Cursor
cursorBigs.forEach(cursorBig => {
  cursorBig.addEventListener('mouseenter', function () {
      gsap.to(dot, {
          scale: 26,
          backgroundColor: '#fff',
      });
      gsap.to(cursor, {
          visibility: 'hidden',
          opacity: 0
      });
  });
  
  cursorBig.addEventListener('mouseleave', function () {
      gsap.to(dot, {
          scale: 1,
          backgroundColor: '#fff',
      });
      gsap.to(cursor, {
        visibility: 'visible',
        opacity: 1
      });
  });
});
// =================================== Custom Cursor Js End =====================================


// **************************** Mobile Menu js Start ****************************
var mmm = gsap.matchMedia(); 
var mtl = gsap.timeline({paused: true}); 

const toggleMobileMenu = document.querySelector('.toggle-mobileMenu');
const closeButton = document.querySelector('.close-button');
const mobileSideOverlay = document.querySelector('.side-overlay');

mmm.add("(max-width: 991px)", () => {
  
  mtl.to('.side-overlay', {
    opacity: 1,
    visibility: 'visible',
    duration: .15, 
  });
  
  mtl.to('.mobile-menu', {
    x: 0,
    duration: .15,
  });
  
  mtl.from('.nav-menu__item', {
    opacity: 0,
    duration: .2,
    y: -60,
    stagger: .08,
  });

  mtl.from('.close-button', {
    opacity: 0,
    scale: 0,
    duration: .15,
  });

  toggleMobileMenu.addEventListener('click', function () {
    mtl.play();
    document.body.style.overflow = 'hidden'
  });

  closeButton.addEventListener('click', function () {
    mtl.reverse();
    document.body.style.overflow = ''
  });

  mobileSideOverlay.addEventListener('click', function () {
    mtl.reverse();
    document.body.style.overflow = ''
  });

});
// **************************** Mobile Menu js End ****************************


// =================================== Custom Split text Js Start =====================================
  if (document.querySelectorAll('.splitTextStyleOne').length) {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    document.querySelectorAll('.splitTextStyleOne').forEach(el => {
        let split = new SplitText(el, { type: "lines", linesClass: "split-line" });

        gsap.set(el, { perspective: 100 });

        gsap.set(split.lines, {
            yPercent: 60,
            opacity: 0
        });

        gsap.to(split.lines, {
          duration: 0.5,
          yPercent: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.07,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              invalidateOnRefresh: true
            },
        });
    });
}
// =================================== Custom Split text Js End =====================================


// **************************** Position Aware button hover js start ****************************
class Button {
  constructor(buttonElement) {
    this.block = buttonElement;
    this.init();
    this.initEvents();
  }

  init() {
    const el = gsap.utils.selector(this.block);

    this.DOM = {
      button: this.block,
      flair: el(".button__flair")
    };

    this.xSet = gsap.quickSetter(this.DOM.flair, "xPercent");
    this.ySet = gsap.quickSetter(this.DOM.flair, "yPercent");
  }

  getXY(e) {
    const {
      left,
      top,
      width,
      height
    } = this.DOM.button.getBoundingClientRect();

    const xTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    const yTransformer = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    );

    return {
      x: xTransformer(e.clientX - left),
      y: yTransformer(e.clientY - top)
    };
  }

  initEvents() {
    this.DOM.button.addEventListener("mouseenter", (e) => {
      const { x, y } = this.getXY(e);

      this.xSet(x);
      this.ySet(y);

      gsap.to(this.DOM.flair, {
        scale: 1,
        duration: 0.9,
        ease: "power2.out"
      });
    });

    this.DOM.button.addEventListener("mouseleave", (e) => {
      const { x, y } = this.getXY(e);

      gsap.killTweensOf(this.DOM.flair);

      gsap.to(this.DOM.flair, {
        xPercent: x > 90 ? x + 20 : x < 10 ? x - 20 : x,
        yPercent: y > 90 ? y + 20 : y < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.9,
        ease: "power2.out"
      });
    });

    this.DOM.button.addEventListener("mousemove", (e) => {
      const { x, y } = this.getXY(e);

      gsap.to(this.DOM.flair, {
        xPercent: x,
        yPercent: y,
        duration: 0.9,
        ease: "power2"
      });
    });
  }
}

const buttonElements = document.querySelectorAll('[data-block="button"]');

buttonElements.forEach((buttonElement) => {
  new Button(buttonElement);
});
// **************************** Position Aware button hover js End ****************************

// **************************** Banner js start ****************************
if($('.flower').length) {
  gsap.from(".flower", {
    scale: 0,
    x: 50,
    y: 50,
    ease: "circ.inOut",
    ease: "elastic.inOut(1,0.3)",
    duration: 3,
    stagger: 0.12,
    scrollTrigger: {
      start: "top 90%",
      toggleActions: "restart none restart none",
    }
  });
}
// **************************** Banner js End ****************************

// **************************** Ball Bounce js start ****************************
if($('.ball').length) { 
  gsap.from(".ball", {
      y: -140,
      ease: "bounce.out", 
      duration: 1.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#roadmap-section",
        start: "top 90%",
        toggleActions: "play none none none",
      }
  });
}
// **************************** Ball Bounce js End ****************************

// **************************** Choose Us js start ****************************
if($('.box').length) {  
  gsap.from(".box", {
      scale: .4,
      rotate: '90deg',
      ease: "bounce.out", 
      duration: 2,
      stagger: 0.12,
      scrollTrigger: {
        trigger: "#box-wrapper",
        start: "top 90%",
        toggleActions: "play none none none",
      }
  });
}
// **************************** Choose Us js End ****************************

// **************************** Blog js start ****************************
if($('.line').length) {   
  gsap.to(".line", {
      ease: "bounce.out",
      width: '100%',
      duration: 2,
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".blog",
        start: "top 90%",
        toggleActions: "restart none restart none",
      }
  });
}
// **************************** Blog js End ****************************

// **************************** Drag Rotate Element js start ****************************
if ($('.drag-rotate-element').length) { 
  gsap.set(".drag-rotate-element", { opacity: 0, scale: 0.5, y: 0, rotate: '-6deg' });

  gsap.to(".drag-rotate-element", {
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: '0deg',
      ease: "elastic.out(1, 0.5)", 
      duration: 2,
      stagger: 0.15,
      scrollTrigger: {
          trigger: ".drag-rotate-element-section",
          start: "top 90%",
          toggleActions: "play none none none",
      }
  });

  const floatTween = gsap.to(".drag-rotate-element", {
      y: "+=0",
      rotate: '3deg',
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 2.5,
      stagger: 0.3,
      paused: true,
  });
  ScrollTrigger.create({
      trigger: ".drag-rotate-element-section",
      start: "top bottom",
      end: "bottom top",
      onEnter: () => floatTween.play(),
      onLeave: () => floatTween.pause(),
      onEnterBack: () => floatTween.play(),
      onLeaveBack: () => floatTween.pause(),
  });
}
// **************************** Drag Rotate Element js End ****************************

/* **************************************************************************** 
                          Custom GSAP js start 
****************************************************************************  */