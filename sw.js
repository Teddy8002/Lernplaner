// Offline-Cache für den Lernplaner. Bei Änderungen an der App VERSION erhöhen.
const VERSION="lp-v4";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",e=>{
  const req=e.request, url=new URL(req.url);
  if(req.method!=="GET"||url.hostname==="api.github.com"||url.hostname.endsWith("githubusercontent.com")) return; // Sync nie cachen
  if(req.mode==="navigate"){ // App-Seite: zuerst Netz (für Updates), sonst Cache
    e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(VERSION).then(x=>x.put("./index.html",c));return r;})
      .catch(()=>caches.match("./index.html")));
    return;
  }
  // Rest (Icons, Schriften): Cache zuerst, im Hintergrund aktualisieren
  e.respondWith(caches.match(req).then(hit=>{
    const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==="opaque")){const c=r.clone();caches.open(VERSION).then(x=>x.put(req,c));}return r;}).catch(()=>hit);
    return hit||net;
  }));
});
