let cacheName = "DashysRainboom_v5";

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/manifest.json",
                "/style.css",
                
                "/fonts/",
                "/fonts/celestia.eot",
                "/fonts/celestia.otf",
                "/fonts/celestia.svg",
                "/fonts/celestia.ttf",
                "/fonts/celestia.woff",

                "/images/",
                "/images/dashy.gif",

                "/images/icons/",
                "/images/icons/android-icon-144x144.png",
                "/images/icons/android-icon-192x192.png",
                "/images/icons/android-icon-36x36.png",
                "/images/icons/android-icon-48x48.png",
                "/images/icons/android-icon-72x72.png",
                "/images/icons/android-icon-96x96.png",
                "/images/icons/favicon-16x16.png",
                "/images/icons/favicon-32x32.png",
                "/images/icons/favicon-96x96.png",

                "/scripts/",
                "/scripts/crc32.js",
                "/scripts/eruda.min.js",
                "/scripts/fxparser.min.js",
                "/scripts/javascript.js",
                "/scripts/pako.min.js",
                "/scripts/parser.js",
                "/scripts/utils.js",
                "/scripts/vkbeautify.js",
                "/scripts/xxtea.js",

                "/scripts/ace/",
                "/scripts/ace/ace.js",
                "/scripts/ace/ext-inline_autocomplete.js",
                "/scripts/ace/ext-language_tools.js",
                "/scripts/ace/ext-searchbox.js",
                "/scripts/ace/mode-xml.js",
                "/scripts/ace/theme-cobalt.js",
                "/scripts/ace/worker-xml.js",

                "/scripts/ace/snippets/",
                "/scripts/ace/snippets/xml.js"
            ]);
        })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(caches.keys().then((keyList) => {
            Promise.all(keyList.filter((key) => {
                return (key !== cacheName);
            }).map(key => {
                caches.delete(key).then(r => r);
            })).then(r => r);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((resp) => {
            return (resp || fetch(event.request).then((response) => {
                    caches.open(cacheName).then((cache) => {
                        cache.put(event.request, response.clone()).then(r => r);
                    });

                    return response;
                })
            );
        })
    );
});
