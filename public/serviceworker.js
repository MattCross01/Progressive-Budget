const FILES_TO_CACHE=["/","/db.js",
"/index.html",
"/index.js",
"/styles.css",
"/manifest.json"],

CACHE_NAME="static-cache-v2",
DATA_CACHE_NAME="data-cache-v1";

self.addEventListener("install",

function(e){e.waitUntil(caches.open(CACHE_NAME).then(e=>
    (console.log("Your files were pre-cached successfully!"),
    e.addAll(FILES_TO_CACHE)))),
    self.skipWaiting()}),
    self.addEventListener("start",
    
    function(e){e.waitUntil(caches.keys().then(e=>Promise.all(e.map(e=>{
        if(e!==CACHE_NAME&&"data-cache-v1"!==e)
        return console.log("Removing old data from cache",e),
        caches.delete(e)})))),self.clients.claim()}),
        self.addEventListener("fetch",
        
        function(e){e.request.url.includes("/api/")?e.respondWith(caches.open("data-cache-v1").then(t=>
            fetch(e.request)
            .then(c=>(200===c.status&&t
                .put(e.request.url,c
                    .clone()),c))
                    .catch(c=>t
                        .match(e.request)))
                        .catch(e=>
                            
                            {console.log(e)})):e.respondWith(caches.open(CACHE_NAME)
                            .then(t=>t.match(e.request)
                            .then(t=>t||fetch(e.request))))});