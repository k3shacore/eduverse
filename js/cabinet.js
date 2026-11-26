(function(){
const root=document.getElementById('cab'),u=Store.user();
function esc(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function render(){
  const L=I18N.lang;
  if(!u){root.innerHTML=`<p>${I18N.t('cab.need')}</p><a class="btn btn--primary" href="register.html">${I18N.t('tab.reg')}</a>`;return}
  const dir=EDU_DIRECTIONS.find(d=>d.id===u.dir),xp=Store.xp(),lvl=Math.floor(xp/50)+1,pct=(xp%50)/50*100;
  const mine=EDU_SUBJECTS.filter(s=>u.grade>=s.grades[0]&&u.grade<=s.grades[1]);
  const done=Store.done(),hist=Store.history(),correct=Object.values(done).filter(Boolean).length;
  const ach=[];
  if(hist.length>=1)ach.push('a1');if(correct>=3)ach.push('a2');if(lvl>=2)ach.push('a3');
  if(mine.length&&mine.every(s=>done[s.id]))ach.push('a4');
  root.className='cab';
  root.innerHTML=`<div class="cab-head"><div><h1>${I18N.t('cab.hello').replace('{n}',esc(u.name))}</h1>
  <p class="note">${I18N.t('cab.grade')}: ${u.grade} · ${I18N.t('cab.dir')}: ${dir?dir.name[L]:''}</p></div>
  <button class="btn btn--small" id="out" type="button">${I18N.t('cab.logout')}</button></div>
  <div class="stats"><div><b>${xp}</b><span>${I18N.t('cab.xp')}</span></div><div><b>${lvl}</b><span>${I18N.t('cab.level')}</span></div></div>
  <div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="50" aria-valuenow="${xp%50}"><i style="width:${pct}%"></i></div>
  <p class="note">${50-xp%50} XP ${I18N.t('cab.next')}</p>
  <h2>${I18N.t('cab.subjects')}</h2><div class="chips">${mine.map(s=>`<a href="learn.html">${esc(s.name[L])}${done[s.id]?' ✓':''}</a>`).join('')}</div>
  <h2>${I18N.t('cab.ach')}</h2>${ach.length?`<div class="badges">${ach.map(a=>`<span class="badge">${I18N.t(a)}</span>`).join('')}</div>`:`<p class="note">${I18N.t('cab.noach')}</p>`}
  <h2>${I18N.t('cab.hist')}</h2>${hist.length?`<ul>${hist.slice(0,8).map(h=>{const s=EDU_SUBJECTS.find(x=>x.id===h.id);return `<li>${s?esc(s.name[L]):h.id} — ${I18N.t(h.ok?'cab.ok':'cab.bad')}, ${new Date(h.ts).toLocaleDateString(L==='ky'?'ky-KG':'ru-RU')}</li>`}).join('')}</ul>`:`<p class="note">${I18N.t('cab.nohist')}</p>`}
  <h2>${I18N.t('cab.comp')}</h2><ul><li>${I18N.t('cab.c1')}</li><li>${I18N.t('cab.c2')}</li></ul>`;
  document.getElementById('out').onclick=()=>{Store.logout();location.href='index.html'};
}
document.addEventListener('langchange',render);
I18N.apply();render();
})();
