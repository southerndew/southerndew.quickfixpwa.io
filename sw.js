const CACHE_NAME = "pwa-cache-v3"; // Update cache name
const urlsToCache = [
    "/southerndew.quickfixpwa.io/",
    "/southerndew.quickfixpwa.io/index.html",
    "/southerndew.quickfixpwa.io/style.css",  // ✅ Fix this path
    "/southerndew.quickfixpwa.io/app.js",
    "/southerndew.quickfixpwa.io/manifest.json",
    "/southerndew.quickfixpwa.io/assets/icons/icon-192.png",
    "/southerndew.quickfixpwa.io/assets/icons/icon-512.png"
];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching files...");
            return cache.addAll(urlsToCache).catch((err) => {
                console.error("Failed to cache:", err);
        })
    );
});

// Serve Cached Content When Offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            return caches.match("/index.html"); // Fallback to homepage if offline
        })
    );
});

// Update Cache on New Deployment
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
