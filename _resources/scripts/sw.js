let cacheName = "DashysRainboom_v4";

self.addEventListener("install", (event) => {
    event.waitUntil(caches.open(cacheName).then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",

                "/_resources/",
                "/_resources/manifest.json",
                "/_resources/style.css",
                
                "/_resources/fonts/",
                "/_resources/fonts/celestia.eot",
                "/_resources/fonts/celestia.otf",
                "/_resources/fonts/celestia.svg",
                "/_resources/fonts/celestia.ttf",
                "/_resources/fonts/celestia.woff",

                "/_resources/images/",
                "/_resources/images/dashy.gif",

                "/_resources/images/icons/",
                "/_resources/images/icons/android-icon-144x144.png",
                "/_resources/images/icons/android-icon-192x192.png",
                "/_resources/images/icons/android-icon-36x36.png",
                "/_resources/images/icons/android-icon-48x48.png",
                "/_resources/images/icons/android-icon-72x72.png",
                "/_resources/images/icons/android-icon-96x96.png",
                "/_resources/images/icons/favicon-16x16.png",
                "/_resources/images/icons/favicon-32x32.png",
                "/_resources/images/icons/favicon-96x96.png",

                "/_resources/scripts/",
                "/_resources/scripts/crc32.js",
                "/_resources/scripts/eruda.min.js",
                "/_resources/scripts/fxparser.min.js",
                "/_resources/scripts/javascript.js",
                "/_resources/scripts/pako.min.js",
                "/_resources/scripts/parser.js",
                "/_resources/scripts/utils.js",
                "/_resources/scripts/vkbeautify.js",
                "/_resources/scripts/xxtea.js",

                "/_resources/scripts/ace/",
                "/_resources/scripts/ace/ace.js",
                "/_resources/scripts/ace/ext-inline_autocomplete.js",
                "/_resources/scripts/ace/ext-language_tools.js",
                "/_resources/scripts/ace/ext-searchbox.js",
                "/_resources/scripts/ace/mode-xml.js",
                "/_resources/scripts/ace/theme-cobalt.js",
                "/_resources/scripts/ace/worker-xml.js",

                "/_resources/scripts/ace/snippets/",
                "/_resources/scripts/ace/snippets/xml.js"
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
