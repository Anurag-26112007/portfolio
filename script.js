// portrait — fade in once it has actually loaded, so there is never a blank flash
(function(){
  var img = document.querySelector('.portrait-frame img');
  if(!img) return;
  function reveal(){ img.classList.add('loaded'); }
  if(img.complete && img.naturalWidth > 0){ reveal(); }
  else{
    img.addEventListener('load', reveal);
    img.addEventListener('error', function(){
      // if the photo genuinely fails to load, don't leave an invisible circle
      img.classList.add('loaded');
    });
  }
})();

// gentle reveal-on-scroll for each section
(function(){
  var targets = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || !targets.length){
    targets.forEach(function(t){ t.classList.add('in-view'); });
    return;
  }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  targets.forEach(function(t){ io.observe(t); });
})();

// journey photo slideshow — smooth crossfade, one photo at a time
(function(){
  var host = document.querySelector('.journey-photos');
  if(!host) return;
  var slides = Array.prototype.slice.call(host.querySelectorAll('.slide'));
  var dots = Array.prototype.slice.call(host.querySelectorAll('.slide-dot'));
  if(slides.length < 2) return;

  var current = 0;
  var intervalMs = 4500;
  var timer = null;

  function show(index){
    slides[current].classList.remove('active');
    if(dots[current]) { dots[current].classList.remove('active'); dots[current].setAttribute('aria-selected','false'); }
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    if(dots[current]) { dots[current].classList.add('active'); dots[current].setAttribute('aria-selected','true'); }
  }

  function start(){
    stop();
    timer = window.setInterval(function(){ show(current + 1); }, intervalMs);
  }
  function stop(){
    if(timer){ window.clearInterval(timer); timer = null; }
  }

  dots.forEach(function(dot, i){
    dot.addEventListener('click', function(){
      show(i);
      start(); // restart the cycle so it doesn't jump right after a manual pick
    });
  });

  host.addEventListener('mouseenter', stop);
  host.addEventListener('mouseleave', start);
  host.addEventListener('focusin', stop);
  host.addEventListener('focusout', start);

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  start();
  if(reduceMotion){ intervalMs = 7000; } // slower cycle, still respects the crossfade-only CSS rule above
})();

// fireflies — a single, gentle, orchestrated moment
(function(){
  var host = document.getElementById('fireflies');
  var n = window.innerWidth < 600 ? 9 : 16;
  for(var i=0;i<n;i++){
    var f = document.createElement('div');
    f.className='firefly';
    f.style.left = (Math.random()*100)+'vw';
    f.style.top = (60+Math.random()*38)+'vh';
    f.style.animationDelay = (Math.random()*14)+'s';
    f.style.animationDuration = (11+Math.random()*8)+'s';
    host.appendChild(f);
  }
})();

// contact form — submits via fetch so the visitor never leaves this page
// or opens any mail app; the note lands straight in Anurag's inbox.
(function(){
  var form = document.getElementById('noteForm');
  var status = document.getElementById('formStatus');
  var btn = form.querySelector('.send-btn');
  var endpoint = form.getAttribute('data-endpoint');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = 'Sending your note…';
    btn.disabled = true;
    btn.style.opacity = '0.65';

    var data = new FormData(form);

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: data
    })
    .then(function(res){
      if(!res.ok) throw new Error('bad status');
      return res.json().catch(function(){ return {}; });
    })
    .then(function(){
      status.className = 'form-status ok';
      status.textContent = 'Sent — thank you, I will read it soon.';
      form.reset();
    })
    .catch(function(){
      status.className = 'form-status err';
      status.textContent = 'That did not go through. Please try again, or email me directly.';
    })
    .finally(function(){
      btn.disabled = false;
      btn.style.opacity = '1';
    });
  });
})();