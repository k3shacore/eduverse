(function(){
const root=document.documentElement;
document.getElementById('theme').addEventListener('click',()=>{
  const next=root.dataset.theme==='dark'?'light':'dark';
  root.dataset.theme=next;
  try{localStorage.setItem('eduverse-theme',next)}catch(e){}
  const m=document.querySelector('meta[name=theme-color]');
  if(m)m.content=next==='dark'?'#0F1A27':'#F6F8FB';
});
})();
