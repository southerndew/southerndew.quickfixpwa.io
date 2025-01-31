const CACHE_NAME = "pwa-cache-v4"; // Increment to force update
const urlsToCache = [
    "/southerndew.quickfixpwa.io/",
    "/southerndew.quickfixpwa.io/index.html",
    "/southerndew.quickfixpwa.io/style.css",
    "/southerndew.quickfixpwa.io/app.js",
    "/southerndew.quickfixpwa.io/manifest.json",
    "/southerndew.quickfixpwa.io/assets/icons/icon-192.png",
    "/southerndew.quickfixpwa.io/assets/icons/icon-512.png"
];

// Install & Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching files...");
            return cache.addAll(urlsToCache).catch((err) => {
                console.error("Failed to cache:", err);
            });
        })
    );
});

// Fetch from Cache or Network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match("/southerndew.quickfixpwa.io/index.html"); // Offline fallback
        })
    );
});

// Force Update Cache & Delete Old Versions
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        })
    );
});
