/* Ancienne application « Anesthésie P17 » : ce programme remplace l'ancien.
   Il efface la copie hors ligne et renvoie vers le site protégé par les comptes. */
const NOUVELLE_ADRESSE = "https://ampop17.tawfiqela.workers.dev/";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: "window" }))
      .then(list => Promise.all(list.map(c => c.navigate(NOUVELLE_ADRESSE).catch(() => {}))))
      .then(() => self.registration.unregister())
  );
});
self.addEventListener("fetch", event => {
  if (event.request.mode === "navigate") event.respondWith(Response.redirect(NOUVELLE_ADRESSE, 302));
});
