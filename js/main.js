(function(){
const lang=document.getElementById('lang');
function renderDirs(){
  const L=I18N.lang,box=document.getElementById('dirs');
  box.innerHTML=EDU_DIRECTIONS.map(d=>`<article class="dir" style="--c:${d.color}"><h3>${d.name[L]}</h3><p>${d.desc[L]}</p><ul>${d.items[L].map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('');
}
lang.value=I18N.lang;
lang.addEventListener('change',e=>I18N.set(e.target.value));
document.addEventListener('langchange',renderDirs);
const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});
nav.addEventListener('click',e=>{if(e.target.tagName==='A'){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
I18N.apply();renderDirs();EduDuel.start();
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
})();
