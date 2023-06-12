'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "6e4c236897baac673025a71c6a389e84",
"index.html": "1559782bb6311b0e830d93369a7265a4",
"/": "1559782bb6311b0e830d93369a7265a4",
"main.dart.js": "0413311d4bf7c2968ee3ebd48e46b0b6",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "e0865266306f2066eeb85e6ea8881252",
"assets/asset/images/profile_pic.png": "5f56c3070f1c066ae15ecad12fb44f54",
"assets/asset/images/logo.png": "5315be9d0a7602fb12a0ad4c2e3006e9",
"assets/asset/img/blog_logo.svg": "9cfdf4b1eca3b552d21baf0078d61827",
"assets/asset/icons/Search.svg": "396d519c18918ed763d741f4ba90243a",
"assets/asset/icons/google_drive.svg": "9a3005a58d47a11bfeffc11ddd3567c1",
"assets/asset/icons/menu_setting.svg": "d0e24d5d0956729e0e2ab09cb4327e32",
"assets/asset/icons/doc_file.svg": "552a02a5a3dbaee682de14573f0ca9f3",
"assets/asset/icons/menu_dashboard.svg": "b2cdf62e9ce9ca35f3fc72f1c1fcc7d4",
"assets/asset/icons/unknown.svg": "b2f3cdc507252d75dea079282f14614f",
"assets/asset/icons/menu_task.svg": "1a02d1c14f49a765da34487d23a3093b",
"assets/asset/icons/menu_profile.svg": "fe56f998a7c1b307809ea3653a1b62f9",
"assets/asset/icons/menu_store.svg": "2fd4ae47fd0fca084e50a600dda008cd",
"assets/asset/icons/sound_file.svg": "fe212d5edfddd0786319edf50601ec73",
"assets/asset/icons/pdf_file.svg": "ca854643eeee7bedba7a1d550e2ba94f",
"assets/asset/icons/drop_box.svg": "3295157e194179743d6093de9f1ff254",
"assets/asset/icons/xd_file.svg": "38913b108e39bcd55988050d2d80194c",
"assets/asset/icons/menu_tran.svg": "6c95fa7ae6679737dc57efd2ccbb0e57",
"assets/asset/icons/media.svg": "059dfe46bd2d92e30bf361c2f7055c3b",
"assets/asset/icons/menu_doc.svg": "09673c2879de2db9646345011dbaa7bb",
"assets/asset/icons/Figma_file.svg": "0ae328b79325e7615054aed3147c81f9",
"assets/asset/icons/menu_notification.svg": "460268d6e4bdeab56538d7020cc4b326",
"assets/asset/icons/logo.svg": "b3af0c077a73709c992d7e075b76ce33",
"assets/asset/icons/media_file.svg": "2ac15c968f8a8cea571a0f3e9f238a66",
"assets/asset/icons/excel_file.svg": "dc91b258ecf87f5731fb2ab9ae15a3ec",
"assets/asset/icons/folder.svg": "40a82e74e930ac73aa6ccb85d8c5a29c",
"assets/asset/icons/Documents.svg": "51896b51d35e28711cf4bd218bde185d",
"assets/asset/icons/one_drive.svg": "aa908c0a29eb795606799385cdfc8592",
"assets/asset/md/%25EC%2583%2581%25EC%2586%258D.md": "b217f6d1829f7c2932787e3efa905dce",
"assets/asset/md/%25EB%25B0%25B0%25EC%2597%25B4.md": "21ce7146bb9450b291b233cba9b00927",
"assets/asset/font/RobotoSlab-VariableFont_Wght.ttf": "a6170c324c4401477173ac34a3d74b9e",
"assets/AssetManifest.json": "adb767e53bd846f93cac26bd7d127781",
"assets/NOTICES": "d3dd228329777589d41a63e7432c7a11",
"assets/FontManifest.json": "815208a9e45a87ffed39eb485243e471",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.smcbin": "8fae972d3834253978cd6d9730b814e7",
"assets/fonts/MaterialIcons-Regular.otf": "a09858db76cb88cd39092918b1ebb511",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "8b6d925f0d0b8d0e2fe245f3c65b17cf",
"canvaskit/chromium/canvaskit.js": "a4552398e7eb819f30a495bad7fef865",
"canvaskit/chromium/canvaskit.wasm": "2adf05d96ca1f771bb50754f60216d18",
"canvaskit/canvaskit.js": "f29ce259449210c0021d70650097873a",
"canvaskit/canvaskit.wasm": "b821477188b1836443bcc911e4ab6e63",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
