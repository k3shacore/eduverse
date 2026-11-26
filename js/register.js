(function(){
const $=id=>document.getElementById(id);let mode='reg';
function fill(){
  const L=I18N.lang,g=$('grade'),d=$('dir'),g0=g.value,d0=d.value;
  g.innerHTML='<option value="">'+I18N.t('reg.choose')+'</option>'+[3,4,5,6,7,8,9,10,11].map(n=>`<option value="${n}">${n}</option>`).join('');
  d.innerHTML='<option value="">'+I18N.t('reg.choose')+'</option>'+EDU_DIRECTIONS.map(x=>`<option value="${x.id}">${x.name[L]} — ${x.desc[L]}</option>`).join('');
  g.value=g0;d.value=d0;
  $('submit').textContent=I18N.t(mode==='reg'?'reg.submit':'login.submit');
}
function setMode(m){
  mode=m;$('regonly').hidden=m!=='reg';
  $('t-reg').classList.toggle('on',m==='reg');$('t-login').classList.toggle('on',m==='login');
  $('t-reg').setAttribute('aria-selected',m==='reg');$('t-login').setAttribute('aria-selected',m==='login');
  $('pass').autocomplete=m==='reg'?'new-password':'current-password';
  $('name').closest('.field').hidden=m!=='reg';
  fill();clear();
}
function clear(){document.querySelectorAll('.field').forEach(f=>{f.classList.remove('bad');const e=f.querySelector('.err');if(e)e.textContent=''})}
function err(f,k){const el=document.querySelector(`[data-f="${f}"]`);el.classList.add('bad');el.querySelector('.err').textContent=I18N.t(k)}
$('t-reg').onclick=()=>setMode('reg');$('t-login').onclick=()=>setMode('login');
$('form').addEventListener('submit',e=>{
  e.preventDefault();clear();let ok=true;
  const name=$('name').value.trim(),email=$('email').value.trim(),pass=$('pass').value;
  if(mode==='reg'&&name.length<2){err('name','err.name');ok=false}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){err('email','err.email');ok=false}
  if(pass.length<6){err('pass','err.pass');ok=false}
  if(mode==='reg'){if(!$('grade').value){err('grade','err.grade');ok=false}if(!$('dir').value){err('dir','err.dir');ok=false}}
  if(!ok){const b=document.querySelector('.field.bad input,.field.bad select');if(b)b.focus();return}
  if(mode==='login'){
    const u=Store.user();
    if(!u||u.email!==email.toLowerCase()){err('email','login.none');$('email').focus();return}
    if(u.lang)I18N.set(u.lang);
  }else{
    Store.setUser({name,email:email.toLowerCase(),grade:+$('grade').value,dir:$('dir').value,lang:$('ulang').value,publicRating:$('pub').checked});
    I18N.set($('ulang').value);
  }
  location.href='cabinet.html';
});
document.addEventListener('langchange',fill);
$('ulang').value=I18N.lang;
I18N.apply();setMode('reg');
})();
