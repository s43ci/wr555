const CACHE_NAME = 'wathiq-calc-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './Lyon.otf',
  './jf.ttf',
  './icon.png'
];

// تثبيت ملف الخدمة وتخزين الملفات في الذاكرة
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// تفعيل ملف الخدمة وحذف النسخ القديمة
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

// جلب البيانات من الكاش عند انقطاع الإنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
