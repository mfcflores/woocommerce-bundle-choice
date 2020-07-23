!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.CssSelectorGenerator=n():t.CssSelectorGenerator=n()}(window,(function(){return function(t){var n={};function r(e){if(n[e])return n[e].exports;var o=n[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,n){if(1&n&&(t=r(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(r.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var o in t)r.d(e,o,function(n){return t[n]}.bind(null,o));return e},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},r.p="",r(r.s=2)}([function(t,n,r){var e=r(1);function o(t,n,r){Array.isArray(t)?t.push(n):t[r]=n}t.exports=function(t){var n,r,i,u=[];if(Array.isArray(t))r=[],n=t.length-1;else{if("object"!=typeof t||null===t)throw new TypeError("Expecting an Array or an Object, but `"+(null===t?"null":typeof t)+"` provided.");r={},i=Object.keys(t),n=i.length-1}return function r(c,a){var f,l,s;for(l=i?i[a]:a,Array.isArray(t[l])||(void 0===t[l]?t[l]=[]:t[l]=[t[l]]),f=0;f<t[l].length;f++)p=c,o(s=Array.isArray(p)?[].concat(p):e(p),t[l][f],l),a>=n?u.push(s):r(s,a+1);var p}(r,0),u}},function(t,n){t.exports=function(){for(var t={},n=0;n<arguments.length;n++){var e=arguments[n];for(var o in e)r.call(e,o)&&(t[o]=e[o])}return t};var r=Object.prototype.hasOwnProperty},function(t,n,r){"use strict";r.r(n);var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},o=function(t){return null!=t&&"object"===(void 0===t?"undefined":e(t))&&1===t.nodeType&&"object"===e(t.style)&&"object"===e(t.ownerDocument)};function i(t){var n=t.parentNode;if(n)for(var r=0,e=n.childNodes,i=0;i<e.length;i++)if(o(e[i])&&(r+=1,e[i]===t))return[":nth-child(".concat(r,")")];return[]}var u={selectors:["id","class","tag","attribute"],includeTag:!1,whitelist:[],blacklist:[],root:document.querySelector(":root"),combineWithinSelector:!0,combineBetweenSelectors:!0},c=new RegExp(["^$","\\s","^\\d"].join("|")),a=new RegExp(["^$","^\\d"].join("|")),f=["nthoftype","tag","id","class","attribute","nthchild"],l=r(0),s=r.n(l);function p(t){return function(t){if(Array.isArray(t)){for(var n=0,r=new Array(t.length);n<t.length;n++)r[n]=t[n];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function d(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=[[]];return t.forEach((function(t){n.forEach((function(r){n.push(r.concat(t))}))})),n.shift(),n.sort((function(t,n){return t.length-n.length}))}function y(t){return t.replace(/[|\\{}()[\]^$+?.]/g,"\\$&").replace(/\*/g,".+")}function v(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];if(0===t.length)return new RegExp(".^");var n=t.map((function(t){return"string"==typeof t?y(t):t.source})).join("|");return new RegExp(n)}function g(t,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:document,e=r.querySelectorAll(n);return 1===e.length&&e[0]===t}function h(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.querySelector(":root"),r=[],e=t;o(e)&&e!==n;)r.push(e),e=e.parentElement;return r}function b(t){return[E(t.tagName.toLowerCase())]}function m(t){return function(t){if(Array.isArray(t)){for(var n=0,r=new Array(t.length);n<t.length;n++)r[n]=t[n];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var j=v(["class","id","ng-*"]);function A(t){var n=t.nodeName,r=t.nodeValue;return"[".concat(n,"='").concat(E(r),"']")}function S(t){var n=t.nodeName;return!j.test(n)}function w(t){return function(t){if(Array.isArray(t)){for(var n=0,r=new Array(t.length);n<t.length;n++)r[n]=t[n];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var O=":".charCodeAt(0).toString(16).toUpperCase(),x=/[ !"#$%&'()\[\]{|}<>*+,./;=?@^`~\\]/;function E(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return t.split("").map((function(t){return":"===t?"\\".concat(O," "):x.test(t)?"\\".concat(t):escape(t).replace(/%/g,"\\")})).join("")}var T={tag:b,id:function(t){var n=t.getAttribute("id")||"",r="#".concat(E(n));return!c.test(n)&&g(t,r,t.ownerDocument)?[r]:[]},class:function(t){return(t.getAttribute("class")||"").trim().split(/\s+/).filter((function(t){return!a.test(t)})).map((function(t){return".".concat(E(t))}))},attribute:function(t){return m(t.attributes).filter(S).map(A)},nthchild:i,nthoftype:function(t){for(var n=b(t)[0],r=t.parentElement.querySelectorAll(n),e=0;e<r.length;e++)if(r[e]===t)return["".concat(n,":nth-of-type(").concat(e+1,")")];return[]}};function C(t,n){for(var r,e,o=function(t,n){return function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.selectors,e=n.combineBetweenSelectors,o=n.includeTag,i=e?d(r):r.map((function(t){return[t]}));return o?i.map(N):i}(t,n).map((function(n){return r=t,e={},n.forEach((function(t){var n=r[t];n.length>0&&(e[t]=n)})),s()(e).map(_);var r,e})).filter((function(t){return""!==t}))}(function(t,n){var r=n.blacklist,e=n.whitelist,o=n.combineWithinSelector,i=v(r),u=v(e);return function(t){var n=t.selectors,r=t.includeTag,e=[].concat(n);r&&!e.includes("tag")&&e.push("tag");return e}(n).reduce((function(n,r){var e=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;return t.sort((function(t,r){var e=n.test(t),o=n.test(r);return e&&!o?-1:!e&&o?1:0}))}(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0;return t.filter((function(t){return r.test(t)||!n.test(t)}))}(function(t,n){return(T[n]||function(){return[]})(t)}(t,r),i,u),u);return n[r]=o?d(e):e.map((function(t){return[t]})),n}),{})}(t,n),n),i=(r=o,(e=[]).concat.apply(e,p(r))),u=0;u<i.length;u++){var c=i[u];if(g(t,c,t.parentNode))return c}return"*"}function N(t){return t.includes("tag")||t.includes("nthoftype")?w(t):[].concat(w(t),["tag"])}function P(t,n){return n[t]?n[t].join(""):""}function _(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return f.map((function(n){return P(n,t)})).join("")}function $(t,n){return h(t,n).map((function(t){return i(t)[0]})).reverse().join(" > ")}function q(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.assign({},u,t)}function M(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=q(n),e=h(t,r.root),o=[],i=0;i<e.length;i++){o.unshift(C(e[i],r));var u=o.join(" > ");if(g(t,u,r.root))return u}return $(t,r.root)}r.d(n,"getCssSelector",(function(){return M}));n.default=M}])}));