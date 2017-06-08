/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/bower_components/webcomponentsjs/custom-elements-es5-adapter.js","e6324a1b9a6f7dbac892a472464088db"],["/bower_components/webcomponentsjs/gulpfile.js","5b9593e6c3a2a87a866c1169114c745e"],["/bower_components/webcomponentsjs/webcomponents-hi-ce.js","495de81020abfefd4f0e3dcff6b7fd3e"],["/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","f5ad3a6d039cf11e3a8e0797d7fe7983"],["/bower_components/webcomponentsjs/webcomponents-hi.js","0ac538bae69f6beb629d2357350041e7"],["/bower_components/webcomponentsjs/webcomponents-lite.js","31d41b5b6bb9631dff43c4a61001e742"],["/bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["/bower_components/webcomponentsjs/webcomponents-sd-ce.js","e1ea140854ba25ce094ec0f9d367ed82"],["/index.html","69249cfa4e11cfd29d076b7146e47d11"],["/src/accountpicker-filter.html","2cb6e99f4b0b0694ecade1218da6feed"],["/src/datepicker-filter.html","40286b3dc96020c86e1d467aad44be34"],["/src/images/favicon.ico","0c88c2289d9050718f9239f49114053d"],["/src/images/logo_ayuntamiento_santacruz.svg","f427d1479fe8491cfdd8c96795ea10be"],["/src/images/manifest/OLD/icon-144x144.png","3b339262d2ca82c5ad688b2972f35ecb"],["/src/images/manifest/OLD/icon-192x192.png","7b7162f40bf4876a1e5bbf40dc8b1399"],["/src/images/manifest/OLD/icon-48x48.png","d2d1b3be3caa2a4ec382cc7566378168"],["/src/images/manifest/OLD/icon-512x512.png","8abae22f25ae3771d0973ba79d602ef7"],["/src/images/manifest/OLD/icon-72x72.png","9fabe2b23cadf6eba9d6077e7b902f32"],["/src/images/manifest/OLD/icon-96x96.png","5df0be2470b6378e7c116bcf43774292"],["/src/images/manifest/android-chrome-192x192.png","f100ce9801656dd6c25528eb63182810"],["/src/images/manifest/android-chrome-512x512.png","018792c82c779f9a75599adb5207dc5f"],["/src/images/manifest/apple-touch-icon.png","ac0c15e0df1a6c0fd82d97997d6e1279"],["/src/images/manifest/browserconfig.xml","019fa19bf2146b9001f040638f8d85e4"],["/src/images/manifest/favicon-16x16.png","cc3abf25aa69fd0ddfd8c95c3f30852a"],["/src/images/manifest/favicon-32x32.png","87d75f619725cf96ac45f1da0b130de8"],["/src/images/manifest/favicon.ico","9c7d97c80fac162a64abc560283d17d3"],["/src/images/manifest/manifest.json","a5cd15cafad477339105b67ccc71b84a"],["/src/images/manifest/mstile-144x144.png","5769822320e7e85751caf07c640ad5f8"],["/src/images/manifest/mstile-150x150.png","cfaa478dcd1af0f189e7b2d451c984be"],["/src/images/manifest/mstile-310x150.png","cb199a48442e40496411b9eaffb657a9"],["/src/images/manifest/mstile-310x310.png","36533228cc2d147b945b0a90dc9d5de1"],["/src/images/manifest/mstile-70x70.png","fd8702f575b41151f2b2e8dd775d22d4"],["/src/images/manifest/safari-pinned-tab.svg","b35a3c4bbc82b2fe35698044d7e627f7"],["/src/manifest.json","055df497b330134cf4f1ebb1732733d5"],["/src/santacruz-handler.html","10f4c6d8841ba6173828dee18b53fc4d"],["/src/santacruz-twitter-app/santacruz-twitter-app.html","5a453d37c25e5f02d3ea3a39ab633920"],["/src/twitter-accounts.js","0ab308697b86264efa4de72f84c65920"],["/src/twitter-dashboard-header.html","31ecc69f9f7cead7b1c31df1a33c5f29"],["/src/twitter-dashboard-tweet.html","2a7dd984224f35180df93b026871308b"],["/src/twitter-dashboard.html","e99e1bc5585ae559221be46e63a61628"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted(["^(?!.*\\.html$|\\/data\\/).*"], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







