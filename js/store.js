/* Демо-хранилище: данные только в localStorage этого браузера. Пароль НЕ сохраняется. */
(function(){
const K='eduverse-demo';
function load(){try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return {}}}
function save(d){try{localStorage.setItem(K,JSON.stringify(d))}catch(e){}}
window.Store={
  user(){return load().user||null},
  setUser(u){const d=load();d.user=u;d.done=d.done||{};d.history=d.history||[];save(d)},
  logout(){const d=load();delete d.user;save(d)},
  done(){return load().done||{}},
  history(){return load().history||[]},
  xp(){return Object.values(this.done()).filter(Boolean).length*10},
  record(subject,ok){
    const d=load();d.done=d.done||{};d.history=d.history||[];
    const first=!(subject.id in d.done)||(!d.done[subject.id]&&ok);
    if(!(subject.id in d.done)||ok)d.done[subject.id]=ok||d.done[subject.id]||false;
    d.history.unshift({id:subject.id,ok,ts:Date.now()});d.history=d.history.slice(0,30);
    save(d);return ok&&first;
  }
};
})();
