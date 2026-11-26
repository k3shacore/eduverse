(function(){
const $=id=>document.getElementById(id);const u=Store.user();let cur=null;
const col={polyglot:'#C2543A',techno:'#1D4F91',physmath:'#6B4FA3',natural:'#2F8F5B',history:'#B8860B'};
function esc(s){return s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function filters(){
  const g=$('fg').value||(u?String(u.grade):''),d=$('fd').value;
  $('fg').innerHTML=[3,4,5,6,7,8,9,10,11].map(n=>`<option value="${n}">${n}</option>`).join('');
  $('fg').value=g||'3';
  $('fd').innerHTML='<option value="">'+I18N.t('f.all')+'</option>'+EDU_DIRECTIONS.map(x=>`<option value="${x.id}">${x.name[I18N.lang]}</option>`).join('');
  $('fd').value=d||(u?'':'');
}
function list(){
  const g=+$('fg').value,d=$('fd').value,L=I18N.lang;
  const items=EDU_SUBJECTS.filter(s=>g>=s.grades[0]&&g<=s.grades[1]&&(!d||s.dir===d));
  $('list').innerHTML=items.length?items.map(s=>`<div class="sub" style="--c:${col[s.dir]}"><h3>${esc(s.name[L])}</h3><p>${esc(s.topic)} · ${s.grades[0]}–${s.grades[1]} ${I18N.t('learn.grades')}</p><button class="btn btn--small" data-id="${s.id}" type="button">${I18N.t('learn.open')}</button></div>`).join(''):`<p>${I18N.t('learn.none')}</p>`;
  $('list').querySelectorAll('button').forEach(b=>b.onclick=()=>open(b.dataset.id));
}
function open(id){
  cur=EDU_SUBJECTS.find(s=>s.id===id);const s=cur,t=$('topic'),done=Store.done()[id];
  $('list').hidden=true;document.querySelector('.filters').hidden=true;t.hidden=false;
  t.innerHTML=`<button class="btn btn--small" id="back" type="button">${I18N.t('topic.back')}</button>
  <h2>${esc(s.name[I18N.lang])}: ${esc(s.topic)}</h2><p class="note">${I18N.t('learn.rus')}</p>
  <h3>${I18N.t('topic.theory')}</h3><p>${esc(s.theory)}</p>
  <h3>${I18N.t('topic.example')}</h3><p class="ex">${esc(s.example)}</p>
  <h3>${I18N.t('topic.task')}</h3><p>${esc(s.task)}</p>
  <h3>${I18N.t('topic.quiz')}</h3><p><strong>${esc(s.quiz.q)}</strong></p>
  <div class="duel__opts" id="qo">${s.quiz.o.map((o,i)=>`<button class="opt" type="button" data-i="${i}">${esc(o)}</button>`).join('')}</div>
  <p class="duel__res" id="qr" role="status"></p>`;
  $('back').onclick=()=>{t.hidden=true;$('list').hidden=false;document.querySelector('.filters').hidden=false;$('list').querySelector('button')&&$('list').querySelector('button').focus()};
  t.querySelectorAll('.opt').forEach(b=>b.onclick=()=>answer(+b.dataset.i));
  t.scrollIntoView({block:'start'});
}
function answer(i){
  const s=cur,ok=i===s.quiz.a,btns=document.querySelectorAll('#qo .opt');
  btns.forEach((b,n)=>{b.disabled=true;if(n===s.quiz.a)b.classList.add('ok');else if(n===i)b.classList.add('bad')});
  const gained=Store.record(s,ok);
  $('qr').textContent=(ok?I18N.t('duel.right'):I18N.t('duel.wrong'))+' '+(gained&&u?I18N.t('topic.saved'):I18N.t('topic.again'));
}
['fg','fd'].forEach(id=>$(id).addEventListener('change',list));
document.addEventListener('langchange',()=>{const g=$('fg').value,d=$('fd').value;filters();$('fg').value=g;$('fd').value=d;list();if(!$('topic').hidden&&cur)open(cur.id)});
I18N.apply();filters();list();
})();
