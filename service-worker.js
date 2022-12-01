"use strict";

const CACHE_NAME = "brinquedo-app-estatico";

const FILES_TO_CACHE = [
  "css/bootstrap.rtl.min.css",
  "css/style.css",
  "icons/favicon.ico",
  "icons/152.png",
  "imgs/logo.png",
  "imgs/bg001.jpg",
  "imgs/bg002.jpg",
  "imgs/cat_icon.png",
  "imgs/offline.png",
  "js/app.js",
  "js/bootstrap.bundle.min.js",
  "offline.html",
];

// Instalar service worker
self.addEventListener("install", (evt) => {
  console.log("Service worker em instalação.");
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Service worker está adicionando o cache estático.");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativando o service worker
self.addEventListener("activate", (evt) => {
  console.log("Service worker em ativação.");
  evt.waitUntil(
    caches.keys().then((keylist) => {
      return Promise.all(
        keylist.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});
