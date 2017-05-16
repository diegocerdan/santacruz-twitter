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

var precacheConfig = [["/bower_components/app-datepicker/app-datepicker-animations.html","41ebe52e1364f9e98bb022853e295651"],["/bower_components/app-datepicker/app-datepicker-icons.html","9cf0f2ef6c1266632fae718fede12ae3"],["/bower_components/app-datepicker/app-datepicker.html","22aee2007212e55d8ab85de7e411efdc"],["/bower_components/app-layout/app-header/app-header.html","be5b5895f4d6bfc49446c2df40689395"],["/bower_components/app-layout/app-layout-behavior/app-layout-behavior.html","4803cb1f67919ff1c9ce0eb1944153f4"],["/bower_components/app-layout/app-scroll-effects/app-scroll-effects-behavior.html","fc72538a2ea03edaf275238a97b21bc8"],["/bower_components/app-layout/app-toolbar/app-toolbar.html","97861d12dd6dd8874e74a4a7fe085710"],["/bower_components/app-layout/helpers/helpers.html","cdd968e67df0b732f9d47057af41e73f"],["/bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror-client.html","a8db358d556efacc92457f06d53e4ee3"],["/bower_components/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.html","bf39a40ad5f119e2d7d7a0a029d83ccd"],["/bower_components/app-storage/app-indexeddb-mirror/common-worker.html","785a7b73fa5368fcb2e46f8e05ba10e3"],["/bower_components/app-storage/app-network-status-behavior.html","1405c4e22bb1bccd6360ce5791f66992"],["/bower_components/app-storage/app-storage-behavior.html","3942af6c93ffc83e0c47d11e84ef8998"],["/bower_components/firebase/firebase-app.js","01cf01b0a6ca5c6b789ad992bb3a2260"],["/bower_components/firebase/firebase-auth.js","45eb86d7de447b4d13c739c21a49a968"],["/bower_components/firebase/firebase-database.js","d282583e4c878c746120465e99a3db4e"],["/bower_components/firebase/firebase-messaging.js","3025203a50a641644b3c691f1697dd06"],["/bower_components/firebase/firebase-storage.js","0cd9f1ab79e90bf5c9378cce943763e2"],["/bower_components/font-roboto/roboto.html","196f915c2bb639c50e0748d057754841"],["/bower_components/iron-a11y-announcer/iron-a11y-announcer.html","7da2a1b06dbf5fc05631df208da0ba8b"],["/bower_components/iron-a11y-keys-behavior/iron-a11y-keys-behavior.html","26309806bc5a08dab92ec43a33bf85ad"],["/bower_components/iron-behaviors/iron-button-state.html","69eabb470fcadef4e70ff50a09bedafc"],["/bower_components/iron-behaviors/iron-control-state.html","07c184ff119f2fef2f8fb113e44538fc"],["/bower_components/iron-fit-behavior/iron-fit-behavior.html","2f2fe554a9fe4be280237435037b2734"],["/bower_components/iron-flex-layout/iron-flex-layout.html","31abc906fe092d26e37933efd43d7977"],["/bower_components/iron-icon/iron-icon.html","fef9331d08a730357652773c88676452"],["/bower_components/iron-icons/image-icons.html","88718ecb8e6a153b45edd9218c5b3176"],["/bower_components/iron-icons/iron-icons.html","263c425f0e794d1e2fd636f8039a8586"],["/bower_components/iron-iconset-svg/iron-iconset-svg.html","7f43f3963b39b325898703673a3d2f53"],["/bower_components/iron-list/iron-list.html","8bd78348f5bdd96062a5b1c62b881bba"],["/bower_components/iron-meta/iron-meta.html","706d2c47bdd19b3dc9e041db7098af93"],["/bower_components/iron-overlay-behavior/iron-focusables-helper.html","e9cfa8b4f2c93d7e1d76d150f2d224d0"],["/bower_components/iron-overlay-behavior/iron-overlay-backdrop.html","21298d8f1000c83cb43e6b88708e8e0a"],["/bower_components/iron-overlay-behavior/iron-overlay-behavior.html","2936c3d08ccc403029a8e05a6795084e"],["/bower_components/iron-overlay-behavior/iron-overlay-manager.html","32376b93251fd30dd30b8f25b6aba26a"],["/bower_components/iron-resizable-behavior/iron-resizable-behavior.html","274c34854d7b23294f7bcdefe0f3a052"],["/bower_components/iron-scroll-target-behavior/iron-scroll-target-behavior.html","b9ed296f3e22b0f5701774d1f5d33caf"],["/bower_components/iron-selector/iron-multi-selectable.html","8e3c615c819e11eb3bc234a3abf34321"],["/bower_components/iron-selector/iron-selectable.html","cef4915b5c80a37cd8a869c86a35956e"],["/bower_components/iron-selector/iron-selection.html","3343a653dfada7e893aad0571ceb946d"],["/bower_components/iron-selector/iron-selector.html","eaec85c290f2dfa24f778a676bf56e15"],["/bower_components/moment/locale/es.js","e19a95fd1d7ec64440bb899f4375b788"],["/bower_components/moment/moment.js","d8a123e9f7c06ef8c0d4a9a9e8ac8cd5"],["/bower_components/neon-animation/animations/fade-in-animation.html","abfc9e4cb824871f98e56d974e6bd0ad"],["/bower_components/neon-animation/animations/fade-out-animation.html","f7dfb0047d596486c6ee747e9d60c282"],["/bower_components/neon-animation/animations/slide-from-left-animation.html","8de1e108725c2f741e718d4a3552ff76"],["/bower_components/neon-animation/animations/slide-from-right-animation.html","71778ddde239615b37603816d8a9a7e8"],["/bower_components/neon-animation/neon-animatable-behavior.html","c35ffb9c73e580cc6b87152ab2d55ba2"],["/bower_components/neon-animation/neon-animated-pages.html","c4341e9b2f98392be3cf345e0584a4b9"],["/bower_components/neon-animation/neon-animation-behavior.html","9c1204dc1f40c96fcea29d212e356fa5"],["/bower_components/neon-animation/neon-animation-runner-behavior.html","5e0f3a4020b3652945212220721313e6"],["/bower_components/neon-animation/web-animations.html","e83d816f67ab3e8778d4c46f052b8656"],["/bower_components/paper-behaviors/paper-button-behavior.html","1b832001d3a6001ddeb2380e4b5bee47"],["/bower_components/paper-behaviors/paper-inky-focus-behavior.html","07276537aed6235c4126ff8f2f38db6a"],["/bower_components/paper-behaviors/paper-ripple-behavior.html","26f84434724812da0631633cdd54676e"],["/bower_components/paper-button/paper-button.html","a320677d790ef9662f3ccda1fe77d87b"],["/bower_components/paper-dialog-behavior/paper-dialog-behavior.html","78417725807e0142ab6416a027f49b14"],["/bower_components/paper-dialog-behavior/paper-dialog-shared-styles.html","b29868eb0a17b5a571683a381238ae15"],["/bower_components/paper-dialog/paper-dialog.html","d3ce918797cee6aaf6e9045f5867048f"],["/bower_components/paper-icon-button/paper-icon-button.html","bfadf4611f2104d816b43ba254460c7c"],["/bower_components/paper-ripple/paper-ripple.html","a538684da4f217d83cfd66cfc4eada62"],["/bower_components/paper-styles/color.html","e3e3c43a7fa75c3a2f8a395ae8fd490d"],["/bower_components/paper-styles/default-theme.html","ed4df18f1171d7793508d645054335b8"],["/bower_components/paper-styles/element-styles/paper-material.html","f0f83e3976975d607e326f44e83d1217"],["/bower_components/paper-styles/shadow.html","4123860d1a9035b047714385f21f368f"],["/bower_components/paper-styles/typography.html","77efb9baab386e7f4a2807e6c2ef7f8c"],["/bower_components/polymer/lib/elements/array-selector.html","a500d1070d2637e858844d8a1a43658c"],["/bower_components/polymer/lib/elements/custom-style.html","5f3b28865d7f8a469ee745438f6eb8d9"],["/bower_components/polymer/lib/elements/dom-bind.html","a6533d5f17565a97a67fd53a6cf80d81"],["/bower_components/polymer/lib/elements/dom-if.html","847fb578e0b1f7c3947dba2736029da8"],["/bower_components/polymer/lib/elements/dom-module.html","d7df9a0ee9d0f4978b5df9f30be3d339"],["/bower_components/polymer/lib/elements/dom-repeat.html","46e83344864dc778c57baf81ca21a157"],["/bower_components/polymer/lib/legacy/class.html","e1388e54727915d7e67fe5919de62524"],["/bower_components/polymer/lib/legacy/legacy-element-mixin.html","a302d688f1ddc3109e556882b52e2499"],["/bower_components/polymer/lib/legacy/mutable-data-behavior.html","bb4f75ba9c1cdc662c30ac2dcab6866f"],["/bower_components/polymer/lib/legacy/polymer-fn.html","34bedf8d4b761dfe01f3d64285efba1a"],["/bower_components/polymer/lib/legacy/polymer.dom.html","e3f165bcf2d187874fe0d66c61b51b4c"],["/bower_components/polymer/lib/legacy/templatizer-behavior.html","e5c89425dc864115ab3d7ad21cc2b0ff"],["/bower_components/polymer/lib/mixins/element-mixin.html","ac8a51ed415bf4e4831791b5364fae96"],["/bower_components/polymer/lib/mixins/gesture-event-listeners.html","e50053979e0059c314aac6870f59033c"],["/bower_components/polymer/lib/mixins/mutable-data.html","4b1bc463f806d01f4eb9fa69fb073f4c"],["/bower_components/polymer/lib/mixins/property-accessors.html","3c64ef1c917a88f01edd76df58c52add"],["/bower_components/polymer/lib/mixins/property-effects.html","857be40b6f04910c94396197fa2e1560"],["/bower_components/polymer/lib/mixins/template-stamp.html","3f058adadd5d0b611b13184716e4500f"],["/bower_components/polymer/lib/utils/array-splice.html","90f614cea12207217715e6c0cdd21b84"],["/bower_components/polymer/lib/utils/async.html","7e00a54867ddbc372a439839002c8556"],["/bower_components/polymer/lib/utils/boot.html","7c1bc24be1c3e1e6dd2138065f3c70d8"],["/bower_components/polymer/lib/utils/case-map.html","397d495f3eb392b59a65dfee0421b305"],["/bower_components/polymer/lib/utils/debounce.html","e9a0947e89175de8edae7b4abd82cdb4"],["/bower_components/polymer/lib/utils/flattened-nodes-observer.html","3bed80f952ae3de0026a1cefebc94893"],["/bower_components/polymer/lib/utils/flush.html","5e9e55d5e5d7d88bfe3073f4536331ea"],["/bower_components/polymer/lib/utils/gestures.html","69bf581df50dbc0847907c458310c9e0"],["/bower_components/polymer/lib/utils/import-href.html","30ae384601a5c5863e0ee5dab48e0c82"],["/bower_components/polymer/lib/utils/mixin.html","b2b11ece98ca57fccdfabc2b959a12eb"],["/bower_components/polymer/lib/utils/path.html","31282a720fd5ac4bcd0d0b9b63329c00"],["/bower_components/polymer/lib/utils/render-status.html","5c3bcc9bc9b589afe0aac2deba1ac214"],["/bower_components/polymer/lib/utils/resolve-url.html","15810a3ba447c460502e9cf7f04b64b5"],["/bower_components/polymer/lib/utils/style-gather.html","c93b973e76f604ce53f6686552906cd8"],["/bower_components/polymer/lib/utils/templatize.html","24467dfb5850dbde7eb7cd43d99d956f"],["/bower_components/polymer/lib/utils/unresolved.html","bea349c4a71e9f4327da774afd73f8ae"],["/bower_components/polymer/polymer-element.html","3bd40d53906e45bae18a99177e00eb48"],["/bower_components/polymer/polymer.html","edc45d69a352ab2bcb32048524c02573"],["/bower_components/polymerfire/firebase-app-script.html","df1897d11acb9c75522859d372873358"],["/bower_components/polymerfire/firebase-app.html","bad7e9e3c7f071e7162144825de9bbc0"],["/bower_components/polymerfire/firebase-auth-script.html","12fe480c116018252246dd4366d1a1ef"],["/bower_components/polymerfire/firebase-common-behavior.html","534de4f3b76b1cb1d5f722a04126a167"],["/bower_components/polymerfire/firebase-database-behavior.html","4a392b5f38e026794e18a5dd2c079d52"],["/bower_components/polymerfire/firebase-database-script.html","b280409885282a43d9b5dd1ee5226fed"],["/bower_components/polymerfire/firebase-document.html","bc3943c95329608875e64dbc12091fa7"],["/bower_components/polymerfire/firebase-messaging-script.html","33e0a36b60580c0bcbde7440ce9216e7"],["/bower_components/polymerfire/firebase-query.html","917b268815bcaee47edf1f4929e97efa"],["/bower_components/polymerfire/firebase-storage-script.html","a20cd9f5d50fb1df96256cc5b02c6898"],["/bower_components/shadycss/apply-shim.html","a7855a6be7cd2ceab940f13c1afba1f3"],["/bower_components/shadycss/apply-shim.min.js","6b47e16c654d1686c4c8359a98a16045"],["/bower_components/shadycss/custom-style-interface.html","7784f566f143bec28bf67b864bedf658"],["/bower_components/shadycss/custom-style-interface.min.js","3d87ce64588ea9a73f62dbe8d75990ce"],["/bower_components/vaadin-grid/iron-list-behavior.html","a7455921149aa73e8cbd6a8c3e24663d"],["/bower_components/vaadin-grid/vaadin-grid-active-item-behavior.html","3e6ae7e3bc97de110c02d7ddb94ce647"],["/bower_components/vaadin-grid/vaadin-grid-array-data-provider-behavior.html","61900c53cc2cf86f481c19a2ee33cae3"],["/bower_components/vaadin-grid/vaadin-grid-cell-click-behavior.html","5dad2b04649e14b930ba340859ed2724"],["/bower_components/vaadin-grid/vaadin-grid-column-reordering-behavior.html","fc2b46ef9ca20477b6395fc9fc5dfd7a"],["/bower_components/vaadin-grid/vaadin-grid-column.html","0474fbdf4aff801d3aa5c24a76f26c45"],["/bower_components/vaadin-grid/vaadin-grid-data-provider-behavior.html","622c8bc72833475904b7c85f30fd8fce"],["/bower_components/vaadin-grid/vaadin-grid-dynamic-columns-behavior.html","855b45a09725997d97257a1c6c4c8e8f"],["/bower_components/vaadin-grid/vaadin-grid-filter-behavior.html","7e469c4ed7e7c5293f3632498dedb226"],["/bower_components/vaadin-grid/vaadin-grid-filter.html","2aab97e6cdd5a93a09aad43359f650c9"],["/bower_components/vaadin-grid/vaadin-grid-focusable-cell-container-behavior.html","ec3bd40f9b0f23efef73f78cbdda6091"],["/bower_components/vaadin-grid/vaadin-grid-keyboard-navigation-behavior.html","93bddcb18b207e1a56ee3d9928c41d42"],["/bower_components/vaadin-grid/vaadin-grid-row-details-behavior.html","67faf938b086c7db15df79cdd7af118e"],["/bower_components/vaadin-grid/vaadin-grid-selection-behavior.html","f9c7f28c92a2452b1f1f8b754c62a05e"],["/bower_components/vaadin-grid/vaadin-grid-sizer.html","c1ae9a81fd390146570e66b99f05d341"],["/bower_components/vaadin-grid/vaadin-grid-sort-behavior.html","af222a23df403350c5f6fa246f00ec31"],["/bower_components/vaadin-grid/vaadin-grid-sorter.html","3352290c4efab8e1e7bd53ed1cd50e83"],["/bower_components/vaadin-grid/vaadin-grid-table-cell.html","a3d306a6992a167aa05a10b0eef0c343"],["/bower_components/vaadin-grid/vaadin-grid-table-focus-trap.html","c7b16c9bbd987fc528a2131de94ad244"],["/bower_components/vaadin-grid/vaadin-grid-table-header-footer.html","2f94c4d28158b30fea367d7f88571831"],["/bower_components/vaadin-grid/vaadin-grid-table-outer-scroller.html","a8d4bc69d175d7c89c46f3ae42c45b15"],["/bower_components/vaadin-grid/vaadin-grid-table-row.html","d89b1f0dc8c2373fb44b3fa4ee6df709"],["/bower_components/vaadin-grid/vaadin-grid-table-scroll-behavior.html","a8503fafb55d70ddff404723e7ce16b3"],["/bower_components/vaadin-grid/vaadin-grid-table.html","c461fc09c41df972992898e10c5991ab"],["/bower_components/vaadin-grid/vaadin-grid-templatizer.html","007d26bee050efd9af8127e3a608f2ec"],["/bower_components/vaadin-grid/vaadin-grid.html","3fae48fc93b4ead9521275c101897c0f"],["/bower_components/web-animations-js/web-animations-next-lite.min.js","15d16a62a8a0e8475a0daa1e025b6510"],["/bower_components/webcomponentsjs/custom-elements-es5-adapter.js","76bf14c68e996daeddf9d8ec2ee46edb"],["/bower_components/webcomponentsjs/gulpfile.js","5b9593e6c3a2a87a866c1169114c745e"],["/bower_components/webcomponentsjs/webcomponents-hi-ce.js","ca1006109a6ea5de2ad25cee8e41dbdf"],["/bower_components/webcomponentsjs/webcomponents-hi-sd-ce.js","b92e4771412e4d615b57efdf366309e4"],["/bower_components/webcomponentsjs/webcomponents-hi.js","8fd458d84ef0f9c3fa4f0b64a7222b06"],["/bower_components/webcomponentsjs/webcomponents-lite.js","4cbc68ade3424dca67aaa83d66b87f88"],["/bower_components/webcomponentsjs/webcomponents-loader.js","f13bbbbf647b7922575a7894367ddaaf"],["/bower_components/webcomponentsjs/webcomponents-sd-ce.js","cc48715b0616b1d66a0c94ca02d06f78"],["/index.html","66f2ec0a0d915cba167e7768f447cb8e"],["/src/datepicker-filter.html","223f931ea1e9520f05b2e15ac8291f4a"],["/src/images/favicon.ico","0c88c2289d9050718f9239f49114053d"],["/src/images/logo_ayuntamiento_santacruz.svg","f427d1479fe8491cfdd8c96795ea10be"],["/src/images/manifest/OLD/icon-144x144.png","3b339262d2ca82c5ad688b2972f35ecb"],["/src/images/manifest/OLD/icon-192x192.png","7b7162f40bf4876a1e5bbf40dc8b1399"],["/src/images/manifest/OLD/icon-48x48.png","d2d1b3be3caa2a4ec382cc7566378168"],["/src/images/manifest/OLD/icon-512x512.png","8abae22f25ae3771d0973ba79d602ef7"],["/src/images/manifest/OLD/icon-72x72.png","9fabe2b23cadf6eba9d6077e7b902f32"],["/src/images/manifest/OLD/icon-96x96.png","5df0be2470b6378e7c116bcf43774292"],["/src/images/manifest/android-chrome-192x192.png","f100ce9801656dd6c25528eb63182810"],["/src/images/manifest/android-chrome-512x512.png","018792c82c779f9a75599adb5207dc5f"],["/src/images/manifest/apple-touch-icon.png","ac0c15e0df1a6c0fd82d97997d6e1279"],["/src/images/manifest/browserconfig.xml","019fa19bf2146b9001f040638f8d85e4"],["/src/images/manifest/favicon-16x16.png","cc3abf25aa69fd0ddfd8c95c3f30852a"],["/src/images/manifest/favicon-32x32.png","87d75f619725cf96ac45f1da0b130de8"],["/src/images/manifest/favicon.ico","9c7d97c80fac162a64abc560283d17d3"],["/src/images/manifest/manifest.json","a5cd15cafad477339105b67ccc71b84a"],["/src/images/manifest/mstile-144x144.png","5769822320e7e85751caf07c640ad5f8"],["/src/images/manifest/mstile-150x150.png","cfaa478dcd1af0f189e7b2d451c984be"],["/src/images/manifest/mstile-310x150.png","cb199a48442e40496411b9eaffb657a9"],["/src/images/manifest/mstile-310x310.png","36533228cc2d147b945b0a90dc9d5de1"],["/src/images/manifest/mstile-70x70.png","fd8702f575b41151f2b2e8dd775d22d4"],["/src/images/manifest/safari-pinned-tab.svg","b35a3c4bbc82b2fe35698044d7e627f7"],["/src/manifest.json","055df497b330134cf4f1ebb1732733d5"],["/src/santacruz-handler.html","29fa52b338dd5b6aa547ddd6b7be8b4d"],["/src/santacruz-twitter-app/santacruz-twitter-app.html","147eb085e95bb2bcda86ffda9b71c00a"],["/src/twitter-accounts.js","ed431fb41077755c89aeb5391139c727"],["/src/twitter-dashboard.html","75b9de52de43806d59e1142e4d0a0fd7"]];
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







