'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "f44df257560a783b8b0cfcc4c85f128f",
"favicon.ico": "10deffee382234953650fc6aa92675d3",
"modeler.js": "02904c43bea693c8ccb7ee0faa9fdaf5",
"index.html": "3693bbfd7e05877a994a76e1dbf2b846",
"/": "3693bbfd7e05877a994a76e1dbf2b846",
"main.dart.js": "45f50759bd5068d71d6e5d2424a71ecf",
"resources/three.module.js": "6ea25851832631ed2fbd488d2b8c62bf",
"resources/three.min.js": "dfbc933c9fd763623def46d192779c41",
"resources/three.js": "bee1448edad8a0d1748b1bf6527d4356",
"resources/objects.js": "0be9a017ba7052865a01de594e2bf1c7",
"resources/texture.png": "3404cd7983d3759512590a681cf9098b",
"resources/OrbitControls.js": "4ba26deb81ec321e108ca0bef4bd57df",
"resources/OBJExporter.js": "1d6ee30150524222ed302cdc63a625fb",
"icons/Icon-192.png": "c611deeeff934adaead7ea9de49a72a1",
"icons/Icon-maskable-192.png": "c611deeeff934adaead7ea9de49a72a1",
"icons/Icon-maskable-512.png": "59d3163f54ca3eb8843dc4e0c7113ba6",
"icons/Icon-512.png": "59d3163f54ca3eb8843dc4e0c7113ba6",
"manifest.json": "cfce1dd133fe1beefd48749665d2f0b8",
"assets/AssetManifest.json": "781c3c120cacfa29d127a8384d4a4825",
"assets/NOTICES": "3927ba2d6277d6a1c3c958eef2ff7650",
"assets/FontManifest.json": "4a4caca72d83f3bffe3352a592bfab5d",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/assets/logo_transparent.png": "46a123d60220cd4fb181b827b4dc2d73",
"assets/assets/nanumR.ttf": "4ba97a2a508f59611d45c41e7414ba66",
"assets/assets/nanumB.ttf": "ecc61bfabe0637e8367a734e718a4f8e",
"assets/assets/nanumEB.ttf": "00f73012c2e65950de3d7fa2be640c95",
"assets/assets/thumbnail2.png": "72a8a098f5ee3bf56024f35b9d43e389",
"assets/assets/thumbnail3.png": "316db29b8fe0819d7c25b964d77f34c9",
"assets/assets/thumbnail1.png": "63f548d699d696e9c122deb12b053e67",
"assets/assets/viewpoint.png": "bd6d6fbb9e3c401a6bed7459dfb18162",
"assets/assets/logo.png": "642e67474c03515406c214c9ab07cb8d",
"assets/assets/thumbnail4.png": "91d2001757dd6b0fe3a517001bf1549b",
"assets/assets/thumbnail5.png": "fa6fc0f769e65e1d4d47f67a546d8e6f",
"assets/assets/nanumL.ttf": "924b9ea5f0305f8dc6371fc4f12da37a",
"modeler_style.css": "cc38959b368c7367e719aeaaf42b501f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
