(function(){
const $=id=>document.getElementById(id);
const TOTAL=15;let i=0,left=TOTAL,tm=null,done=false;
function load(){
  const qs=I18N.questions(),it=qs[i%qs.length];
  done=false;left=TOTAL;
  $('q').textContent=it.q;$('res').textContent='';$('next').hidden=true;
  $('opts').innerHTML='';
  it.o.forEach((t,k)=>{
    const b=document.createElement('button');b.type='button';b.className='opt';b.textContent=t;
    b.addEventListener('click',()=>{if(!done)finish(k)});$('opts').appendChild(b);
  });
  tick(true);clearInterval(tm);tm=setInterval(tick,1000);
}
function tick(init){
  if(init!==true)left--;
  $('timer').textContent=Math.max(left,0);
  $('fill').style.transform='scaleX('+Math.max(left,0)/TOTAL+')';
  if(left<=0&&!done)finish(-1);
}
function finish(k){
  done=true;clearInterval(tm);
  const qs=I18N.questions(),it=qs[i%qs.length],btns=$('opts').children;
  for(let n=0;n<btns.length;n++){btns[n].disabled=true;if(n===it.a)btns[n].classList.add('ok');else if(n===k)btns[n].classList.add('bad')}
  $('res').textContent=k===it.a?I18N.t('duel.right'):(k<0?I18N.t('duel.time'):I18N.t('duel.wrong'));
  $('next').hidden=false;if(k>=0)$('next').focus();
}
$('next').addEventListener('click',()=>{i++;load()});
document.addEventListener('langchange',()=>{clearInterval(tm);load()});
window.EduDuel={start:load};
})();
