const C='eduverse-v2';
const A=['./','index.html','css/theme.css','css/style.css','js/i18n.js','js/i18n-app.js','js/store.js','js/layout.js','js/register.js','js/learn.js','js/cabinet.js','data/subjects.js','register.html','learn.html','cabinet.html','js/theme.js','js/duel.js','js/main.js','data/directions.js','manifest.webmanifest','icons/icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x))))));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
