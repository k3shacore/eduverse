(function(){
const h=document.getElementById('site-header');
h.className='top';
h.innerHTML=`<div class="wrap top__in">
<a class="logo" href="index.html" aria-label="EDUVERSE"><svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="var(--accent)"/><path d="M9 9h14v3.2H12.4v3.1H21v3.1h-8.6v3.4H23V23H9z" fill="var(--on-accent)"/></svg><span>EDUVERSE</span></a>
<nav class="nav" id="nav"><a href="index.html#directions" data-i18n="nav.directions"></a><a href="learn.html" data-i18n="nav.learn"></a><a href="cabinet.html" data-i18n="nav.cabinet"></a></nav>
<div class="tools"><label class="sr" for="lang" data-i18n="lang.label"></label>
<select id="lang" class="select"><option value="ru">Русский</option><option value="ky">Кыргызча</option></select>
<button id="theme" class="icon-btn" type="button"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>
<button id="menu" class="icon-btn menu-btn" type="button" aria-expanded="false" aria-controls="nav" aria-label="Menu"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div></div>`;
const lang=document.getElementById('lang');lang.value=I18N.lang;
lang.addEventListener('change',e=>I18N.set(e.target.value));
const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
})();
