/* Hunters Services — site interactions */
(function(){
  "use strict";

  /* Mobile nav */
  var burger = document.querySelector('.hamburger');
  var nav = document.querySelector('.nav-links');
  var scrim = document.querySelector('.scrim');
  function closeNav(){ if(nav)nav.classList.remove('open'); if(burger)burger.classList.remove('open'); if(scrim)scrim.classList.remove('open'); document.body.style.overflow=''; }
  if(burger){
    burger.addEventListener('click',function(){
      var open = nav.classList.toggle('open');
      burger.classList.toggle('open',open);
      if(scrim)scrim.classList.toggle('open',open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  if(scrim) scrim.addEventListener('click',closeNav);

  /* Mobile dropdown toggle */
  document.querySelectorAll('.nav-links > li > a.has-caret').forEach(function(a){
    a.addEventListener('click',function(e){
      if(window.innerWidth <= 1040){
        var dd = a.parentNode.querySelector('.dropdown');
        if(dd){ e.preventDefault(); dd.classList.toggle('open'); }
      }
    });
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(function(q){
    q.addEventListener('click',function(){
      var item = q.closest('.faq-item');
      var ans = item.querySelector('.faq-a');
      var open = item.classList.toggle('open');
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : 0;
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* Scroll reveal (respects reduced-motion) */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  } else if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  /* ---- Lead form: Netlify Forms submit with validation, honeypot, conversion event ---- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var isLocal = /^(localhost|127\.|0\.0\.0\.0|\[::1\]|192\.168\.|10\.)/.test(location.hostname) || location.protocol === 'file:';

  function encode(data){
    return Object.keys(data).map(function(k){
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
  }

  function fireConversion(form){
    var loc = (form.querySelector('[name="source-page"]') || {}).value || location.pathname;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'generate_lead', form_name: 'estimate', form_location: loc });
    if (typeof window.gtag === 'function'){
      window.gtag('event', 'generate_lead', { form_name: 'estimate', form_location: loc });
    }
    if (typeof window.fbq === 'function'){ window.fbq('track', 'Lead'); }
  }

  function showError(form, msg){
    var box = form.querySelector('.form-error');
    if(!box){
      box = document.createElement('div');
      box.className = 'form-error';
      box.setAttribute('role','alert');
      var btn = form.querySelector('button[type="submit"]');
      (btn && btn.parentNode === form) ? form.insertBefore(box, btn.nextSibling) : form.appendChild(box);
    }
    box.innerHTML = msg;
    box.style.display = 'block';
  }
  function clearError(form){
    var box = form.querySelector('.form-error');
    if(box) box.style.display = 'none';
  }

  function validate(form){
    var name = (form.querySelector('[name="name"]')||{}).value || '';
    var phone = (form.querySelector('[name="phone"]')||{}).value || '';
    var email = (form.querySelector('[name="email"]')||{}).value || '';
    if(name.trim().length < 2) return {ok:false, field:'name', msg:'Please enter your name.'};
    if(phone.replace(/\D/g,'').length < 7) return {ok:false, field:'phone', msg:'Please enter a valid phone number.'};
    if(!EMAIL_RE.test(email.trim())) return {ok:false, field:'email', msg:'Please enter a valid email address.'};
    return {ok:true};
  }

  function succeed(form){
    var ok = form.querySelector('.form-success');
    clearError(form);
    if(ok){ ok.style.display='block'; }
    form.querySelectorAll('input,select,textarea,button').forEach(function(el){ if(el.type!=='button') el.disabled = true; });
    fireConversion(form);
    if(ok) ok.scrollIntoView({behavior:'smooth',block:'center'});
  }

  document.querySelectorAll('form[data-lead]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();

      /* Honeypot — if the hidden field is filled, it's a bot. Pretend success, send nothing. */
      var hp = f.querySelector('[name="bot-field"]');
      if(hp && hp.value){ succeed(f); return; }

      /* Validation */
      var v = validate(f);
      if(!v.ok){
        showError(f, v.msg);
        var bad = f.querySelector('[name="'+v.field+'"]');
        if(bad) bad.focus();
        return;
      }

      /* Basic rate limit — block rapid re-submits */
      try {
        var last = +localStorage.getItem('hs_last_submit') || 0;
        if(Date.now() - last < 4000){
          showError(f, 'Just a moment — your request is already being sent.');
          return;
        }
        localStorage.setItem('hs_last_submit', String(Date.now()));
      } catch(_){}

      var btn = f.querySelector('button[type="submit"]');
      var btnHTML = btn ? btn.innerHTML : '';
      if(btn){ btn.disabled = true; btn.dataset.loading = '1'; btn.innerHTML = 'Sending…'; }
      clearError(f);

      /* Local preview: simulate success so the UX can be verified without a backend. */
      if(isLocal){
        setTimeout(function(){ succeed(f); }, 500);
        return;
      }

      /* Production: AJAX POST to Netlify Forms */
      var data = {};
      new FormData(f).forEach(function(val, key){ data[key] = val; });
      data['form-name'] = 'estimate';

      fetch(f.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(data)
      }).then(function(res){
        if(res.ok){ succeed(f); }
        else { throw new Error('HTTP ' + res.status); }
      }).catch(function(){
        if(btn){ btn.disabled = false; delete btn.dataset.loading; btn.innerHTML = btnHTML; }
        showError(f, 'Sorry — something went wrong sending your request. Please call us at <a href="tel:+15303428950">(530)&nbsp;342-8950</a> and we’ll take care of you.');
      });
    });
  });

  /* Year */
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });
})();
