/*
 * acom-hub animations engine.
 *
 * Loaded by the substrate's scripts/delayed.js when main.dataset.overlay
 * is set (template-keyed; HEAD-probed first to avoid 404s for overlay
 * pages that don't have an animation engine).
 *
 * Bundles: vendored GSAP + ScrollTrigger, inline smooth-scroll wiring and
 * nav-scroll state, then the 9 project scripts in source-declared order.
 *
 * Lenis is loaded from unpkg via <script src> below — same as the source
 * page. It exposes window.Lenis which the smooth-scroll wiring uses.
 */

// Load Lenis from CDN (matches source page <script src> at line 960).
(function loadLenis() {
  var s = document.createElement('script');
  s.src = 'https://unpkg.com/lenis@1.1.14/dist/lenis.min.js';
  s.async = false;
  document.head.appendChild(s);
})();

/* ===== vendor: gsap.min.js ===== */
/*!
 * GSAP 3.14.2
 * https://gsap.com
 * 
 * @license Copyright 2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function r(t){return"string"==typeof t}function s(t){return"function"==typeof t}function t(t){return"number"==typeof t}function u(t){return void 0===t}function v(t){return"object"==typeof t}function w(t){return!1!==t}function x(){return"undefined"!=typeof window}function y(t){return s(t)||r(t)}function R(t){return(i=bt(t,ht))&&Fe}function S(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function T(t,e){return!e&&console.warn(t)}function U(t,e){return t&&(ht[t]=e)&&i&&(i[t]=e)||ht}function V(){return 0}function ga(t){var e,r,i=t[0];if(v(i)||s(i)||(t=[t]),!(e=(i._gsap||{}).harness)){for(r=yt.length;r--&&!yt[r].targetTest(i););e=yt[r]}for(r=t.length;r--;)t[r]&&(t[r]._gsap||(t[r]._gsap=new Xt(t[r],e)))||t.splice(r,1);return t}function ha(t){return t._gsap||ga(Pt(t))[0]._gsap}function ia(t,e,r){return(r=t[e])&&s(r)?t[e]():u(r)&&t.getAttribute&&t.getAttribute(e)||r}function ja(t,e){return(t=t.split(",")).forEach(e)||t}function ka(t){return Math.round(1e5*t)/1e5||0}function la(t){return Math.round(1e7*t)/1e7||0}function ma(t,e){var r=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),"+"===r?t+i:"-"===r?t-i:"*"===r?t*i:t/i}function na(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r}function oa(){var t,e,r=pt.length,i=pt.slice(0);for(_t={},t=pt.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function pa(t){return!!(t._initted||t._startAt||t.add)}function qa(t,e,r,i){pt.length&&!I&&oa(),t.render(e,r,i||!!(I&&e<0&&pa(t))),pt.length&&!I&&oa()}function ra(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(ot).length<2?e:r(t)?t.trim():t}function sa(t){return t}function ta(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function wa(t,e){for(var r in e)"__proto__"!==r&&"constructor"!==r&&"prototype"!==r&&(t[r]=v(e[r])?wa(t[r]||(t[r]={}),e[r]):e[r]);return t}function xa(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i}function ya(t){var e=t.parent||L,r=t.keyframes?function _setKeyframeDefaults(i){return function(t,e){for(var r in e)r in t||"duration"===r&&i||"ease"===r||(t[r]=e[r])}}($(t.keyframes)):ta;if(w(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t}function Aa(t,e,r,i,n){void 0===r&&(r="_first"),void 0===i&&(i="_last");var a,s=t[i];if(n)for(a=e[n];s&&s[n]>a;)s=s._prev;return s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=s,e.parent=e._dp=t,e}function Ba(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n=e._prev,a=e._next;n?n._next=a:t[r]===e&&(t[r]=a),a?a._prev=n:t[i]===e&&(t[i]=n),e._next=e._prev=e.parent=null}function Ca(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0}function Da(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var r=t;r;)r._dirty=1,r=r.parent;return t}function Fa(t,e,r,i){return t._startAt&&(I?t._startAt.revert(ft):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))}function Ha(t){return t._repeat?wt(t._tTime,t=t.duration()+t._rDelay)*t:0}function Ja(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function Ka(t){return t._end=la(t._start+(t._tDur/Math.abs(t._ts||t._rts||q)||0))}function La(t,e){var r=t._dp;return r&&r.smoothChildTiming&&t._ts&&(t._start=la(r._time-(0<t._ts?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Ka(t),r._dirty||Da(r,t)),t}function Ma(t,e){var r;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(r=Ja(t.rawTime(),e),(!e._dur||Mt(0,e.totalDuration(),r)-e._tTime>q)&&e.render(r,!0)),Da(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)0<=r.rawTime()&&r.totalTime(r._tTime),r=r._dp;t._zTime=-q}}function Na(e,r,i,n){return r.parent&&Ca(r),r._start=la((t(i)?i:i||e!==L?Ot(e,i,r):e._time)+r._delay),r._end=la(r._start+(r.totalDuration()/Math.abs(r.timeScale())||0)),Aa(e,r,"_first","_last",e._sort?"_start":0),xt(r)||(e._recent=r),n||Ma(e,r),e._ts<0&&La(e,e._tTime),e}function Oa(t,e){return(ht.ScrollTrigger||S("scrollTrigger",e))&&ht.ScrollTrigger.create(e,t)}function Pa(t,e,r,i,n){return Qt(t,e,n),t._initted?!r&&t._pt&&!I&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&f!==It.frame?(pt.push(t),t._lazy=[n,i],1):void 0:1}function Ua(t,e,r,i){var n=t._repeat,a=la(e)||0,s=t._tTime/t._tDur;return s&&!i&&(t._time*=a/t._dur),t._dur=a,t._tDur=n?n<0?1e10:la(a*(n+1)+t._rDelay*n):a,0<s&&!i&&La(t,t._tTime=t._tDur*s),t.parent&&Ka(t),r||Da(t.parent,t),t}function Va(t){return t instanceof Zt?Da(t):Ua(t,t._dur)}function Ya(e,r,i){var n,a,s=t(r[1]),o=(s?2:1)+(e<2?0:1),u=r[o];if(s&&(u.duration=r[1]),u.parent=i,e){for(n=u,a=i;a&&!("immediateRender"in n);)n=a.vars.defaults||{},a=w(a.vars.inherit)&&a.parent;u.immediateRender=w(n.immediateRender),e<2?u.runBackwards=1:u.startAt=r[o-1]}return new te(r[0],u,r[1+o])}function Za(t,e){return t||0===t?e(t):e}function _a(t,e){return r(t)&&(e=ut.exec(t))?e[1]:""}function cb(t,e){return t&&v(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&v(t[0]))&&!t.nodeType&&t!==h}function fb(r){return r=Pt(r)[0]||T("Invalid scope")||{},function(t){var e=r.current||r.nativeElement||r;return Pt(t,e.querySelectorAll?e:e===r?T("Invalid scope")||a.createElement("div"):r)}}function gb(t){return t.sort(function(){return.5-Math.random()})}function hb(t){if(s(t))return t;var p=v(t)?t:{each:t},_=Vt(p.ease),m=p.from||0,g=parseFloat(p.base)||0,y={},e=0<m&&m<1,T=isNaN(m)||e,b=p.axis,w=m,x=m;return r(m)?w=x={center:.5,edges:.5,end:1}[m]||0:!e&&T&&(w=m[0],x=m[1]),function(t,e,r){var i,n,a,s,o,u,h,l,f,d=(r||p).length,c=y[d];if(!c){if(!(f="auto"===p.grid?0:(p.grid||[1,X])[1])){for(h=-X;h<(h=r[f++].getBoundingClientRect().left)&&f<d;);f<d&&f--}for(c=y[d]=[],i=T?Math.min(f,d)*w-.5:m%f,n=f===X?0:T?d*x/f-.5:m/f|0,l=X,u=h=0;u<d;u++)a=u%f-i,s=n-(u/f|0),c[u]=o=b?Math.abs("y"===b?s:a):J(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&gb(c),c.max=h-l,c.min=l,c.v=d=(parseFloat(p.amount)||parseFloat(p.each)*(d<f?d-1:b?"y"===b?d/f:f:Math.max(f,d/f))||0)*("edges"===m?-1:1),c.b=d<0?g-d:g,c.u=_a(p.amount||p.each)||0,_=_&&d<0?jt(_):_}return d=(c[t]-c.min)/c.max||0,la(c.b+(_?_(d):d)*c.v)+c.u}}function ib(i){var n=Math.pow(10,((i+"").split(".")[1]||"").length);return function(e){var r=la(Math.round(parseFloat(e)/i)*i*n);return(r-r%1)/n+(t(e)?0:_a(e))}}function jb(h,e){var l,f,r=$(h);return!r&&v(h)&&(l=r=h.radius||X,h.values?(h=Pt(h.values),(f=!t(h[0]))&&(l*=l)):h=ib(h.increment)),Za(e,r?s(h)?function(t){return f=h(t),Math.abs(f-t)<=l?f:t}:function(e){for(var r,i,n=parseFloat(f?e.x:e),a=parseFloat(f?e.y:0),s=X,o=0,u=h.length;u--;)(r=f?(r=h[u].x-n)*r+(i=h[u].y-a)*i:Math.abs(h[u]-n))<s&&(s=r,o=u);return o=!l||s<=l?h[o]:e,f||o===e||t(e)?o:o+_a(e)}:ib(h))}function kb(t,e,r,i){return Za($(t)?!e:!0===r?!!(r=0):!i,function(){return $(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t-r/2+Math.random()*(e-t+.99*r))/r)*r*i)/i})}function ob(e,r,t){return Za(t,function(t){return e[~~r(t)]})}function rb(t){return t.replace(tt,function(t){var e=t.indexOf("[")+1,r=t.substring(e||7,e?t.indexOf("]"):t.length-1).split(et);return kb(e?r:+r[0],e?0:+r[1],+r[2]||1e-5)})}function ub(t,e,r){var i,n,a,s=t.labels,o=X;for(i in s)(n=s[i]-e)<0==!!r&&n&&o>(n=Math.abs(n))&&(a=i,o=n);return a}function wb(t){return Ca(t),t.scrollTrigger&&t.scrollTrigger.kill(!!I),t.progress()<1&&Dt(t,"onInterrupt"),t}function zb(t){if(t)if(t=!t.name&&t.default||t,x()||t.headless){var e=t.name,r=s(t),i=e&&!r&&t.init?function(){this._props=[]}:t,n={init:V,render:ve,add:Jt,kill:Te,modifier:ye,rawVars:0},a={targetTest:0,get:0,getSetter:le,aliases:{},register:0};if(Lt(),t!==i){if(mt[e])return;ta(i,ta(xa(t,n),a)),bt(i.prototype,bt(n,xa(t,a))),mt[i.prop=e]=i,t.targetTest&&(yt.push(i),ct[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}U(e,i),t.register&&t.register(Fe,i,we)}else St.push(t)}function Cb(t,e,r){return(6*(t+=t<0?1:1<t?-1:0)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*zt+.5|0}function Db(e,r,i){var n,a,s,o,u,h,l,f,d,c,p=e?t(e)?[e>>16,e>>8&zt,e&zt]:0:Et.black;if(!p){if(","===e.substr(-1)&&(e=e.substr(0,e.length-1)),Et[e])p=Et[e];else if("#"===e.charAt(0)){if(e.length<6&&(e="#"+(n=e.charAt(1))+n+(a=e.charAt(2))+a+(s=e.charAt(3))+s+(5===e.length?e.charAt(4)+e.charAt(4):"")),9===e.length)return[(p=parseInt(e.substr(1,6),16))>>16,p>>8&zt,p&zt,parseInt(e.substr(7),16)/255];p=[(e=parseInt(e.substr(1),16))>>16,e>>8&zt,e&zt]}else if("hsl"===e.substr(0,3))if(p=c=e.match(rt),r){if(~e.indexOf("="))return p=e.match(it),i&&p.length<4&&(p[3]=1),p}else o=+p[0]%360/360,u=p[1]/100,n=2*(h=p[2]/100)-(a=h<=.5?h*(u+1):h+u-h*u),3<p.length&&(p[3]*=1),p[0]=Cb(o+1/3,n,a),p[1]=Cb(o,n,a),p[2]=Cb(o-1/3,n,a);else p=e.match(rt)||Et.transparent;p=p.map(Number)}return r&&!c&&(n=p[0]/zt,a=p[1]/zt,s=p[2]/zt,h=((l=Math.max(n,a,s))+(f=Math.min(n,a,s)))/2,l===f?o=u=0:(d=l-f,u=.5<h?d/(2-l-f):d/(l+f),o=l===n?(a-s)/d+(a<s?6:0):l===a?(s-n)/d+2:(n-a)/d+4,o*=60),p[0]=~~(o+.5),p[1]=~~(100*u+.5),p[2]=~~(100*h+.5)),i&&p.length<4&&(p[3]=1),p}function Eb(t){var r=[],i=[],n=-1;return t.split(Rt).forEach(function(t){var e=t.match(nt)||[];r.push.apply(r,e),i.push(n+=e.length+1)}),r.c=i,r}function Fb(t,e,r){var i,n,a,s,o="",u=(t+o).match(Rt),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=Db(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=Eb(t),(i=r.c).join(o)!==a.c.join(o)))for(s=(n=t.replace(Rt,"1").split(nt)).length-1;l<s;l++)o+=n[l]+(~i.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!n)for(s=(n=t.split(Rt)).length-1;l<s;l++)o+=n[l]+u[l];return o+n[s]}function Ib(t){var e,r=t.join(" ");if(Rt.lastIndex=0,Rt.test(r))return e=Ft.test(r),t[1]=Fb(t[1],e),t[0]=Fb(t[0],e,Eb(t[1])),!0}function Rb(t){var e=(t+"").split("("),r=Bt[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,i,n={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),n[s]=isNaN(i)?i.replace(Nt,"").trim():+i,s=r.substr(e+1).trim();return n}(e[1])]:function _valueInParentheses(t){var e=t.indexOf("(")+1,r=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<r?t.indexOf(")",r+1):r)}(t).split(",").map(ra)):Bt._CE&&Yt.test(t)?Bt._CE("",t):r}function Tb(t,e){for(var r,i=t._first;i;)i instanceof Zt?Tb(i,e):!i.vars.yoyoEase||i._yoyo&&i._repeat||i._yoyo===e||(i.timeline?Tb(i.timeline,e):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=e)),i=i._next}function Vb(t,e,r,i){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===i&&(i=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var n,a={easeIn:e,easeOut:r,easeInOut:i};return ja(t,function(t){for(var e in Bt[t]=ht[t]=a,Bt[n=t.toLowerCase()]=r,a)Bt[n+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Bt[t+"."+e]=a[e]}),a}function Wb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Xb(r,t,e){function Lm(t){return 1===t?1:i*Math.pow(2,-10*t)*G((t-a)*n)+1}var i=1<=t?t:1,n=(e||(r?.3:.45))/(t<1?t:1),a=n/Z*(Math.asin(1/i)||0),s="out"===r?Lm:"in"===r?function(t){return 1-Lm(1-t)}:Wb(Lm);return n=Z/n,s.config=function(t,e){return Xb(r,t,e)},s}function Yb(e,r){function Tm(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?Tm:"in"===e?function(t){return 1-Tm(1-t)}:Wb(Tm);return t.config=function(t){return Yb(e,t)},t}var F,I,l,L,h,n,a,i,o,f,d,c,p,_,m,g,b,k,O,M,C,P,A,D,z,E,B,Y,N={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},j={duration:.5,overwrite:!1,delay:0},X=1e8,q=1/X,Z=2*Math.PI,W=Z/4,H=0,J=Math.sqrt,Q=Math.cos,G=Math.sin,K="function"==typeof ArrayBuffer&&ArrayBuffer.isView||function(){},$=Array.isArray,tt=/random\([^)]+\)/g,et=/,\s*/g,rt=/(?:-?\.?\d|\.)+/gi,it=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,nt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,at=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,st=/[+-]=-?[.\d]+/,ot=/[^,'"\[\]\s]+/gi,ut=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ht={},lt={suppressEvents:!0,isStart:!0,kill:!1},ft={suppressEvents:!0,kill:!1},dt={suppressEvents:!0},ct={},pt=[],_t={},mt={},gt={},vt=30,yt=[],Tt="",bt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},wt=function _animationCycle(t,e){var r=Math.floor(t=la(t/e));return t&&r===t?r-1:r},xt=function _isFromOrFromStart(t){var e=t.data;return"isFromStart"===e||"isStart"===e},kt={_start:0,endTime:V,totalDuration:V},Ot=function _parsePosition(t,e,i){var n,a,s,o=t.labels,u=t._recent||kt,h=t.duration()>=X?u.endTime(!1):t._dur;return r(e)&&(isNaN(e)||e in o)?(a=e.charAt(0),s="%"===e.substr(-1),n=e.indexOf("="),"<"===a||">"===a?(0<=n&&(e=e.replace(/=/,"")),("<"===a?u._start:u.endTime(0<=u._repeat))+(parseFloat(e.substr(1))||0)*(s?(n<0?u:i).totalDuration()/100:1)):n<0?(e in o||(o[e]=h),o[e]):(a=parseFloat(e.charAt(n-1)+e.substr(n+1)),s&&i&&(a=a/100*($(i)?i[0]:i).totalDuration()),1<n?_parsePosition(t,e.substr(0,n-1),i)+a:h+a)):null==e?h:+e},Mt=function _clamp(t,e,r){return r<t?t:e<r?e:r},Ct=[].slice,Pt=function toArray(t,e,i){return l&&!e&&l.selector?l.selector(t):!r(t)||i||!n&&Lt()?$(t)?function _flatten(t,e,i){return void 0===i&&(i=[]),t.forEach(function(t){return r(t)&&!e||cb(t,1)?i.push.apply(i,Pt(t)):i.push(t)})||i}(t,i):cb(t)?Ct.call(t,0):t?[t]:[]:Ct.call((e||a).querySelectorAll(t),0)},At=function mapRange(e,t,r,i,n){var a=t-e,s=i-r;return Za(n,function(t){return r+((t-e)/a*s||0)})},Dt=function _callback(t,e,r){var i,n,a,s=t.vars,o=s[e],u=l,h=t._ctx;if(o)return i=s[e+"Params"],n=s.callbackScope||t,r&&pt.length&&oa(),h&&(l=h),a=i?o.apply(n,i):o.call(n),l=u,a},St=[],zt=255,Et={aqua:[0,zt,zt],lime:[0,zt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,zt],navy:[0,0,128],white:[zt,zt,zt],olive:[128,128,0],yellow:[zt,zt,0],orange:[zt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[zt,0,0],pink:[zt,192,203],cyan:[0,zt,zt],transparent:[zt,zt,zt,0]},Rt=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";for(t in Et)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Ft=/hsl[a]?\(/,It=(O=Date.now,M=500,C=33,P=O(),A=P,z=D=1e3/240,g={time:0,frame:0,tick:function tick(){Al(!0)},deltaRatio:function deltaRatio(t){return b/(1e3/(t||60))},wake:function wake(){o&&(!n&&x()&&(h=n=window,a=h.document||{},ht.gsap=Fe,(h.gsapVersions||(h.gsapVersions=[])).push(Fe.version),R(i||h.GreenSockGlobals||!h.gsap&&h||{}),St.forEach(zb)),m="undefined"!=typeof requestAnimationFrame&&requestAnimationFrame,p&&g.sleep(),_=m||function(t){return setTimeout(t,z-1e3*g.time+1|0)},c=1,Al(2))},sleep:function sleep(){(m?cancelAnimationFrame:clearTimeout)(p),c=0,_=V},lagSmoothing:function lagSmoothing(t,e){M=t||1/0,C=Math.min(e||33,M)},fps:function fps(t){D=1e3/(t||240),z=1e3*g.time+D},add:function add(n,t,e){var a=t?function(t,e,r,i){n(t,e,r,i),g.remove(a)}:n;return g.remove(n),E[e?"unshift":"push"](a),Lt(),a},remove:function remove(t,e){~(e=E.indexOf(t))&&E.splice(e,1)&&e<=k&&k--},_listeners:E=[]}),Lt=function _wake(){return!c&&It.wake()},Bt={},Yt=/^[\d.\-M][\d.\-,\s]/,Nt=/["']/g,jt=function _invertEase(e){return function(t){return 1-e(1-t)}},Vt=function _parseEase(t,e){return t&&(s(t)?t:Bt[t]||Rb(t))||e};function Al(t){var e,r,i,n,a=O()-A,s=!0===t;if((M<a||a<0)&&(P+=a-C),(0<(e=(i=(A+=a)-P)-z)||s)&&(n=++g.frame,b=i-1e3*g.time,g.time=i/=1e3,z+=e+(D<=e?4:D-e),r=1),s||(p=_(Al)),r)for(k=0;k<E.length;k++)E[k](i,b,n,t)}function jn(t){return t<Y?B*t*t:t<.7272727272727273?B*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?B*(t-=2.25/2.75)*t+.9375:B*Math.pow(t-2.625/2.75,2)+.984375}ja("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;Vb(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Bt.Linear.easeNone=Bt.none=Bt.Linear.easeIn,Vb("Elastic",Xb("in"),Xb("out"),Xb()),B=7.5625,Y=1/2.75,Vb("Bounce",function(t){return 1-jn(1-t)},jn),Vb("Expo",function(t){return Math.pow(2,10*(t-1))*t+t*t*t*t*t*t*(1-t)}),Vb("Circ",function(t){return-(J(1-t*t)-1)}),Vb("Sine",function(t){return 1===t?1:1-Q(t*W)}),Vb("Back",Yb("in"),Yb("out"),Yb()),Bt.SteppedEase=Bt.steps=ht.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),n=e?1:0;return function(t){return((i*Mt(0,.99999999,t)|0)+n)*r}}},j.ease=Bt["quad.out"],ja("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return Tt+=t+","+t+"Params,"});var Ut,Xt=function GSCache(t,e){this.id=H++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:ia,this.set=e?e.getSetter:le},qt=((Ut=Animation.prototype).delay=function delay(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},Ut.duration=function duration(t){return arguments.length?this.totalDuration(0<this._repeat?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},Ut.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Ua(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},Ut.totalTime=function totalTime(t,e){if(Lt(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(La(this,t),!r._dp||r.parent||Ma(r,this);r&&r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(0<this._ts&&t<this._tDur||this._ts<0&&0<t||!this._tDur&&!t)&&Na(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!e||this._initted&&Math.abs(this._zTime)===q||!this._initted&&this._dur&&t||!t&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=t),qa(this,t,e)),this},Ut.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+Ha(this))%(this._dur+this._rDelay)||(t?this._dur:0),e):this._time},Ut.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):0<=this.rawTime()&&this._initted?1:0},Ut.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+Ha(this),e):this.duration()?Math.min(1,this._time/this._dur):0<this.rawTime()?1:0},Ut.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?wt(this._tTime,r)+1:1},Ut.timeScale=function timeScale(t,e){if(!arguments.length)return this._rts===-q?0:this._rts;if(this._rts===t)return this;var r=this.parent&&this._ts?Ja(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-q?0:this._rts,this.totalTime(Mt(-Math.abs(this._delay),this.totalDuration(),r),!1!==e),Ka(this),function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this)},Ut.paused=function paused(t){return arguments.length?(this._ps!==t&&((this._ps=t)?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Lt(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&Math.abs(this._zTime)!==q&&(this._tTime-=q)))),this):this._ps},Ut.startTime=function startTime(t){if(arguments.length){this._start=la(t);var e=this.parent||this._dp;return!e||!e._sort&&this.parent||Na(e,this,this._start-this._delay),this}return this._start},Ut.endTime=function endTime(t){return this._start+(w(t)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},Ut.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ja(e.rawTime(t),this):this._tTime:this._tTime},Ut.revert=function revert(t){void 0===t&&(t=dt);var e=I;return I=t,pa(this)&&(this.timeline&&this.timeline.revert(t),this.totalTime(-.01,t.suppressEvents)),"nested"!==this.data&&!1!==t.kill&&this.kill(),I=e,this},Ut.globalTime=function globalTime(t){for(var e=this,r=arguments.length?t:e.rawTime();e;)r=e._start+r/(Math.abs(e._ts)||1),e=e._dp;return!this.parent&&this._sat?this._sat.globalTime(t):r},Ut.repeat=function repeat(t){return arguments.length?(this._repeat=t===1/0?-2:t,Va(this)):-2===this._repeat?1/0:this._repeat},Ut.repeatDelay=function repeatDelay(t){if(arguments.length){var e=this._time;return this._rDelay=t,Va(this),e?this.time(e):this}return this._rDelay},Ut.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},Ut.seek=function seek(t,e){return this.totalTime(Ot(this,t),w(e))},Ut.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,w(e)),this._dur||(this._zTime=-q),this},Ut.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},Ut.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},Ut.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},Ut.resume=function resume(){return this.paused(!1)},Ut.reversed=function reversed(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-q:0)),this):this._rts<0},Ut.invalidate=function invalidate(){return this._initted=this._act=0,this._zTime=-q,this},Ut.isActive=function isActive(){var t,e=this.parent||this._dp,r=this._start;return!(e&&!(this._ts&&this._initted&&e.isActive()&&(t=e.rawTime(!0))>=r&&t<this.endTime(!0)-q))},Ut.eventCallback=function eventCallback(t,e,r){var i=this.vars;return 1<arguments.length?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},Ut.then=function then(t){var i=this,n=i._prom;return new Promise(function(e){function Fo(){var t=i.then;i.then=null,n&&n(),s(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),e(r),i.then=t}var r=s(t)?t:sa;i._initted&&1===i.totalProgress()&&0<=i._ts||!i._tTime&&i._ts<0?Fo():i._prom=Fo})},Ut.kill=function kill(){wb(this)},Animation);function Animation(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ua(this,+t.duration,1,1),this.data=t.data,l&&(this._ctx=l).data.push(this),c||It.wake()}ta(qt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-q,_prom:0,_ps:!1,_rts:1});var Zt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=w(t.sortChildren),L&&Na(t.parent||L,_assertThisInitialized(r),e),t.reversed&&r.reverse(),t.paused&&r.paused(!0),t.scrollTrigger&&Oa(_assertThisInitialized(r),t.scrollTrigger),r}_inheritsLoose(Timeline,i);var e=Timeline.prototype;return e.to=function to(t,e,r){return Ya(0,arguments,this),this},e.from=function from(t,e,r){return Ya(1,arguments,this),this},e.fromTo=function fromTo(t,e,r,i){return Ya(2,arguments,this),this},e.set=function set(t,e,r){return e.duration=0,e.parent=this,ya(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new te(t,e,Ot(this,r),1),this},e.call=function call(t,e,r){return Na(this,te.delayedCall(0,t,e),r)},e.staggerTo=function staggerTo(t,e,r,i,n,a,s){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new te(t,r,Ot(this,n)),this},e.staggerFrom=function staggerFrom(t,e,r,i,n,a,s){return r.runBackwards=1,ya(r).immediateRender=w(r.immediateRender),this.staggerTo(t,e,r,i,n,a,s)},e.staggerFromTo=function staggerFromTo(t,e,r,i,n,a,s,o){return i.startAt=r,ya(i).immediateRender=w(i.immediateRender),this.staggerTo(t,e,i,n,a,s,o)},e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d,c,p,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=t<=0?0:la(t),y=this._zTime<0!=t<0&&(this._initted||!g);if(this!==L&&m<v&&0<=t&&(v=m),v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),i=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat){if(c=this._yoyo,o=g+this._rDelay,this._repeat<-1&&t<0)return this.totalTime(100*o+t,e,r);if(i=la(v%o),v===m?(s=this._repeat,i=g):((s=~~(d=la(v/o)))&&s===d&&(i=g,s--),g<i&&(i=g)),d=wt(this._tTime,o),!_&&this._tTime&&d!==s&&this._tTime-d*o-this._dur<=0&&(d=s),c&&1&s&&(i=g-i,p=1),s!==d&&!this._lock){var T=c&&1&d,b=T===(c&&1&s);if(s<d&&(T=!T),_=T?0:v%g?g:v,this._lock=1,this.render(_||(p?0:la(s*o)),e,!g)._lock=0,this._tTime=v,!e&&this.parent&&Dt(this,"onRepeat"),this.vars.repeatRefresh&&!p&&(this.invalidate()._lock=1,d=s),_&&_!==this._time||u!=!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(g=this._dur,m=this._tDur,b&&(this._lock=2,_=T?g:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!p&&this.invalidate()),this._lock=0,!this._ts&&!u)return this;Tb(this,p)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var i;if(e<r)for(i=t._first;i&&i._start<=r;){if("isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if("isPause"===i.data&&i._start<e)return i;i=i._prev}}(this,la(_),la(i)))&&(v-=i-(i=h._start)),this._tTime=v,this._time=i,this._act=!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t,_=0),!_&&v&&g&&!e&&!d&&(Dt(this,"onStart"),this._tTime!==v))return this;if(_<=i&&0<=t)for(n=this._first;n;){if(a=n._next,(n._act||i>=n._start)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(i-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(i-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-q);break}}n=a}else{n=this._last;for(var w=t<0?t:i;n;){if(a=n._prev,(n._act||w<=n._end)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(w-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(w-n._start)*n._ts,e,r||I&&pa(n)),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-q:q);break}}n=a}}if(h&&!e&&(this.pause(),h.render(_<=i?0:-q)._zTime=_<=i?1:-1,this._ts))return this._start=f,Ka(this),this.render(t,e,r);this._onUpdate&&!e&&Dt(this,"onUpdate",!0),(v===m&&this._tTime>=this.totalDuration()||!v&&_)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||this._lock||(!t&&g||!(v===m&&0<this._ts||!v&&this._ts<0)||Ca(this,1),e||t<0&&!_||!v&&!_&&m||(Dt(this,v===m&&0<=t?"onComplete":"onReverseComplete",!0),!this._prom||v<m&&0<this.timeScale()||this._prom())))}return this},e.add=function add(e,i){var n=this;if(t(i)||(i=Ot(this,i,e)),!(e instanceof qt)){if($(e))return e.forEach(function(t){return n.add(t,i)}),this;if(r(e))return this.addLabel(e,i);if(!s(e))return this;e=te.delayedCall(0,e)}return this!==e?Na(this,e,i):this},e.getChildren=function getChildren(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-X);for(var n=[],a=this._first;a;)a._start>=i&&(a instanceof te?e&&n.push(a):(r&&n.push(a),t&&n.push.apply(n,a.getChildren(!0,e,r)))),a=a._next;return n},e.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},e.remove=function remove(t){return r(t)?this.removeLabel(t):s(t)?this.killTweensOf(t):(t.parent===this&&Ba(this,t),t===this._recent&&(this._recent=this._last),Da(this))},e.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=la(It.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},e.addLabel=function addLabel(t,e){return this.labels[t]=Ot(this,e),this},e.removeLabel=function removeLabel(t){return delete this.labels[t],this},e.addPause=function addPause(t,e,r){var i=te.delayedCall(0,e||V,r);return i.data="isPause",this._hasPause=1,Na(this,i,Ot(this,t))},e.removePause=function removePause(t){var e=this._first;for(t=Ot(this,t);e;)e._start===t&&"isPause"===e.data&&Ca(e),e=e._next},e.killTweensOf=function killTweensOf(t,e,r){for(var i=this.getTweensOf(t,r),n=i.length;n--;)Wt!==i[n]&&i[n].kill(t,e);return this},e.getTweensOf=function getTweensOf(e,r){for(var i,n=[],a=Pt(e),s=this._first,o=t(r);s;)s instanceof te?na(s._targets,a)&&(o?(!Wt||s._initted&&s._ts)&&s.globalTime(0)<=r&&s.globalTime(s.totalDuration())>r:!r||s.isActive())&&n.push(s):(i=s.getTweensOf(a,r)).length&&n.push.apply(n,i),s=s._next;return n},e.tweenTo=function tweenTo(t,e){e=e||{};var r,i=this,n=Ot(i,t),a=e.startAt,s=e.onStart,o=e.onStartParams,u=e.immediateRender,h=te.to(i,ta({ease:e.ease||"none",lazy:!1,immediateRender:!1,time:n,overwrite:"auto",duration:e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale())||q,onStart:function onStart(){if(i.pause(),!r){var t=e.duration||Math.abs((n-(a&&"time"in a?a.time:i._time))/i.timeScale());h._dur!==t&&Ua(h,t,0,1).render(h._time,!0,!0),r=1}s&&s.apply(h,o||[])}},e));return u?h.render(0):h},e.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,ta({startAt:{time:Ot(this,t)}},r))},e.recent=function recent(){return this._recent},e.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),ub(this,Ot(this,t))},e.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),ub(this,Ot(this,t),1)},e.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+q)},e.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);var i,n=this._first,a=this.labels;for(t=la(t);n;)n._start>=r&&(n._start+=t,n._end+=t),n=n._next;if(e)for(i in a)a[i]>=r&&(a[i]+=t);return Da(this)},e.invalidate=function invalidate(t){var e=this._first;for(this._lock=0;e;)e.invalidate(t),e=e._next;return i.prototype.invalidate.call(this,t)},e.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._dp&&(this._time=this._tTime=this._pTime=0),t&&(this.labels={}),Da(this)},e.totalDuration=function totalDuration(t){var e,r,i,n=0,a=this,s=a._last,o=X;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-t:t));if(a._dirty){for(i=a.parent;s;)e=s._prev,s._dirty&&s.totalDuration(),o<(r=s._start)&&a._sort&&s._ts&&!a._lock?(a._lock=1,Na(a,s,r-s._delay,1)._lock=0):o=r,r<0&&s._ts&&(n-=r,(!i&&!a._dp||i&&i.smoothChildTiming)&&(a._start+=la(r/a._ts),a._time-=r,a._tTime-=r),a.shiftChildren(-r,!1,-Infinity),o=0),s._end>n&&s._ts&&(n=s._end),s=e;Ua(a,a===L&&a._time>n?a._time:n,1,1),a._dirty=0}return a._tDur},Timeline.updateRoot=function updateRoot(t){if(L._ts&&(qa(L,Ja(t,L)),f=It.frame),It.frame>=vt){vt+=N.autoSleep||120;var e=L._first;if((!e||!e._ts)&&N.autoSleep&&It._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||It.sleep()}}},Timeline}(qt);ta(Zt.prototype,{_lock:0,_hasPause:0,_forcing:0});function dc(t,e,i,n,a,o){var u,h,l,f;if(mt[t]&&!1!==(u=new mt[t]).init(a,u.rawVars?e[t]:function _processVars(t,e,i,n,a){if(s(t)&&(t=Gt(t,a,e,i,n)),!v(t)||t.style&&t.nodeType||$(t)||K(t))return r(t)?Gt(t,a,e,i,n):t;var o,u={};for(o in t)u[o]=Gt(t[o],a,e,i,n);return u}(e[t],n,a,o,i),i,n,o)&&(i._pt=h=new we(i._pt,a,t,0,1,u.render,u,0,u.priority),i!==d))for(l=i._ptLookup[i._targets.indexOf(a)],f=u._props.length;f--;)l[u._props[f]]=h;return u}function jc(t,r,e,i){var n,a,s=r.ease||i||"power1.inOut";if($(r))a=e[t]||(e[t]=[]),r.forEach(function(t,e){return a.push({t:e/(r.length-1)*100,v:t,e:s})});else for(n in r)a=e[n]||(e[n]=[]),"ease"===n||a.push({t:parseFloat(t),v:r[n],e:s})}var Wt,Ht,Jt=function _addPropTween(t,e,i,n,a,o,u,h,l,f){s(n)&&(n=n(a||0,t,o));var d,c=t[e],p="get"!==i?i:s(c)?l?t[e.indexOf("set")||!s(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():c,_=s(c)?l?ue:re:ee;if(r(n)&&(~n.indexOf("random(")&&(n=rb(n)),"="===n.charAt(1)&&(!(d=ma(p,n)+(_a(p)||0))&&0!==d||(n=d))),!f||p!==n||Ht)return isNaN(p*n)||""===n?(c||e in t||S(e,n),function _addComplexStringPropTween(t,e,r,i,n,a,s){var o,u,h,l,f,d,c,p,_=new we(this._pt,t,e,0,1,ge,null,n),m=0,g=0;for(_.b=r,_.e=i,r+="",(c=~(i+="").indexOf("random("))&&(i=rb(i)),a&&(a(p=[r,i],t,e),r=p[0],i=p[1]),u=r.match(at)||[];o=at.exec(i);)l=o[0],f=i.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(d=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:d,c:"="===l.charAt(1)?ma(d,l)-d:parseFloat(l)-d,m:h&&h<4?Math.round:0},m=at.lastIndex);return _.c=m<i.length?i.substring(m,i.length):"",_.fp=s,(st.test(i)||c)&&(_.e=0),this._pt=_}.call(this,t,e,p,n,_,h||N.stringFilter,l)):(d=new we(this._pt,t,e,+p||0,n-(p||0),"boolean"==typeof c?_e:ce,0,_),l&&(d.fp=l),u&&d.modifier(u,this,t),this._pt=d)},Qt=function _initTween(t,e,r){var i,n,a,s,o,u,h,l,f,d,c,p,_,m=t.vars,g=m.ease,v=m.startAt,y=m.immediateRender,T=m.lazy,b=m.onUpdate,x=m.runBackwards,k=m.yoyoEase,O=m.keyframes,M=m.autoRevert,C=t._dur,P=t._startAt,A=t._targets,D=t.parent,S=D&&"nested"===D.data?D.vars.targets:A,z="auto"===t._overwrite&&!F,E=t.timeline;if(!E||O&&g||(g="none"),t._ease=Vt(g,j.ease),t._yEase=k?jt(Vt(!0===k?g:k,j.ease)):0,k&&t._yoyo&&!t._repeat&&(k=t._yEase,t._yEase=t._ease,t._ease=k),t._from=!E&&!!m.runBackwards,!E||O&&!m.stagger){if(p=(l=A[0]?ha(A[0]).harness:0)&&m[l.prop],i=xa(m,ct),P&&(P._zTime<0&&P.progress(1),e<0&&x&&y&&!M?P.render(-1,!0):P.revert(x&&C?ft:lt),P._lazy=0),v){if(Ca(t._startAt=te.set(A,ta({data:"isStart",overwrite:!1,parent:D,immediateRender:!0,lazy:!P&&w(T),startAt:null,delay:0,onUpdate:b&&function(){return Dt(t,"onUpdate")},stagger:0},v))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(I||!y&&!M)&&t._startAt.revert(ft),y&&C&&e<=0&&r<=0)return void(e&&(t._zTime=e))}else if(x&&C&&!P)if(e&&(y=!1),a=ta({overwrite:!1,data:"isFromStart",lazy:y&&!P&&w(T),immediateRender:y,stagger:0,parent:D},i),p&&(a[l.prop]=p),Ca(t._startAt=te.set(A,a)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(I?t._startAt.revert(ft):t._startAt.render(-1,!0)),t._zTime=e,y){if(!e)return}else _initTween(t._startAt,q,q);for(t._pt=t._ptCache=0,T=C&&w(T)||T&&!C,n=0;n<A.length;n++){if(h=(o=A[n])._gsap||ga(A)[n]._gsap,t._ptLookup[n]=d={},_t[h.id]&&pt.length&&oa(),c=S===A?n:S.indexOf(o),l&&!1!==(f=new l).init(o,p||i,t,c,S)&&(t._pt=s=new we(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){d[t]=s}),f.priority&&(u=1)),!l||p)for(a in i)mt[a]&&(f=dc(a,i,t,c,o,S))?f.priority&&(u=1):d[a]=s=Jt.call(t,o,a,"get",i[a],c,S,0,m.stringFilter);t._op&&t._op[n]&&t.kill(o,t._op[n]),z&&t._pt&&(Wt=t,L.killTweensOf(o,d,t.globalTime(e)),_=!t.parent,Wt=0),t._pt&&T&&(_t[h.id]=1)}u&&be(t),t._onInit&&t._onInit(t)}t._onUpdate=b,t._initted=(!t._op||t._pt)&&!_,O&&e<=0&&E.render(X,!0,!0)},Gt=function _parseFuncOrString(t,e,i,n,a){return s(t)?t.call(e,i,n,a):r(t)&&~t.indexOf("random(")?rb(t):t},Kt=Tt+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",$t={};ja(Kt+",id,stagger,delay,duration,paused,scrollTrigger",function(t){return $t[t]=1});var te=function(R){function Tween(e,r,i,n){var a;"number"==typeof r&&(i.duration=r,r=i,i=null);var s,o,u,h,l,f,d,c,p=(a=R.call(this,n?r:ya(r))||this).vars,_=p.duration,m=p.delay,g=p.immediateRender,b=p.stagger,x=p.overwrite,k=p.keyframes,O=p.defaults,M=p.scrollTrigger,C=p.yoyoEase,P=r.parent||L,A=($(e)||K(e)?t(e[0]):"length"in r)?[e]:Pt(e);if(a._targets=A.length?ga(A):T("GSAP target "+e+" not found. https://gsap.com",!N.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=x,k||b||y(_)||y(m)){if(r=a.vars,(s=a.timeline=new Zt({data:"nested",defaults:O||{},targets:P&&"nested"===P.data?P.vars.targets:A})).kill(),s.parent=s._dp=_assertThisInitialized(a),s._start=0,b||y(_)||y(m)){if(h=A.length,d=b&&hb(b),v(b))for(l in b)~Kt.indexOf(l)&&((c=c||{})[l]=b[l]);for(o=0;o<h;o++)(u=xa(r,$t)).stagger=0,C&&(u.yoyoEase=C),c&&bt(u,c),f=A[o],u.duration=+Gt(_,_assertThisInitialized(a),o,f,A),u.delay=(+Gt(m,_assertThisInitialized(a),o,f,A)||0)-a._delay,!b&&1===h&&u.delay&&(a._delay=m=u.delay,a._start+=m,u.delay=0),s.to(f,u,d?d(o,f,A):0),s._ease=Bt.none;s.duration()?_=m=0:a.timeline=0}else if(k){ya(ta(s.vars.defaults,{ease:"none"})),s._ease=Vt(k.ease||r.ease||"none");var D,S,z,E=0;if($(k))k.forEach(function(t){return s.to(A,t,">")}),s.duration();else{for(l in u={},k)"ease"===l||"easeEach"===l||jc(l,k[l],u,k.easeEach);for(l in u)for(D=u[l].sort(function(t,e){return t.t-e.t}),o=E=0;o<D.length;o++)(z={ease:(S=D[o]).e,duration:(S.t-(o?D[o-1].t:0))/100*_})[l]=S.v,s.to(A,z,E),E+=z.duration;s.duration()<_&&s.to({},{duration:_-s.duration()})}}_||a.duration(_=s.duration())}else a.timeline=0;return!0!==x||F||(Wt=_assertThisInitialized(a),L.killTweensOf(A),Wt=0),Na(P,_assertThisInitialized(a),i),r.reversed&&a.reverse(),r.paused&&a.paused(!0),(g||!_&&!k&&a._start===la(P._time)&&w(g)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(a))&&"nested"!==P.data)&&(a._tTime=-q,a.render(Math.max(0,-m)||0)),M&&Oa(_assertThisInitialized(a),M),a}_inheritsLoose(Tween,R);var e=Tween.prototype;return e.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d=this._time,c=this._tDur,p=this._dur,_=t<0,m=c-q<t&&!_?c:t<q?0:t;if(p){if(m!==this._tTime||!t||r||!this._initted&&this._tTime||this._startAt&&this._zTime<0!=_||this._lazy){if(i=m,l=this.timeline,this._repeat){if(s=p+this._rDelay,this._repeat<-1&&_)return this.totalTime(100*s+t,e,r);if(i=la(m%s),m===c?(a=this._repeat,i=p):(a=~~(o=la(m/s)))&&a===o?(i=p,a--):p<i&&(i=p),(u=this._yoyo&&1&a)&&(f=this._yEase,i=p-i),o=wt(this._tTime,s),i===d&&!r&&this._initted&&a===o)return this._tTime=m,this;a!==o&&(l&&this._yEase&&Tb(l,u),this.vars.repeatRefresh&&!u&&!this._lock&&i!==s&&this._initted&&(this._lock=r=1,this.render(la(s*a),!0).invalidate()._lock=0))}if(!this._initted){if(Pa(this,_?t:i,r,e,m))return this._tTime=0,this;if(!(d===this._time||r&&this.vars.repeatRefresh&&a!==o))return this;if(p!==this._dur)return this.render(t,e,r)}if(this._tTime=m,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(f||this._ease)(i/p),this._from&&(this.ratio=h=1-h),!d&&m&&!e&&!o&&(Dt(this,"onStart"),this._tTime!==m))return this;for(n=this._pt;n;)n.r(h,n.d),n=n._next;l&&l.render(t<0?t:l._dur*l._ease(i/this._dur),e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(_&&Fa(this,t,0,r),Dt(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&Dt(this,"onRepeat"),m!==this._tDur&&m||this._tTime!==m||(_&&!this._onUpdate&&Fa(this,t,0,!0),!t&&p||!(m===this._tDur&&0<this._ts||!m&&this._ts<0)||Ca(this,1),e||_&&!d||!(m||d||u)||(Dt(this,m===c?"onComplete":"onReverseComplete",!0),!this._prom||m<c&&0<this.timeScale()||this._prom()))}}else!function _renderZeroDurationTween(t,e,r,i){var n,a,s,o=t.ratio,u=e<0||!e&&(!t._start&&function _parentPlayheadIsBeforeStart(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||_parentPlayheadIsBeforeStart(e))}(t)&&(t._initted||!xt(t))||(t._ts<0||t._dp._ts<0)&&!xt(t))?0:1,h=t._rDelay,l=0;if(h&&t._repeat&&(l=Mt(0,t._tDur,e),a=wt(l,h),t._yoyo&&1&a&&(u=1-u),a!==wt(t._tTime,h)&&(o=1-u,t.vars.repeatRefresh&&t._initted&&t.invalidate())),u!==o||I||i||t._zTime===q||!e&&t._zTime){if(!t._initted&&Pa(t,e,i,r,l))return;for(s=t._zTime,t._zTime=e||(r?q:0),r=r||e&&!s,t.ratio=u,t._from&&(u=1-u),t._time=0,t._tTime=l,n=t._pt;n;)n.r(u,n.d),n=n._next;e<0&&Fa(t,e,0,!0),t._onUpdate&&!r&&Dt(t,"onUpdate"),l&&t._repeat&&!r&&t.parent&&Dt(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===u&&(u&&Ca(t,1),r||I||(Dt(t,u?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)}(this,t,e,r);return this},e.targets=function targets(){return this._targets},e.invalidate=function invalidate(t){return t&&this.vars.runBackwards||(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(t),R.prototype.invalidate.call(this,t)},e.resetTo=function resetTo(t,e,r,i,n){c||It.wake(),this._ts||this.play();var a,s=Math.min(this._dur,(this._dp._time-this._start)*this._ts);return this._initted||Qt(this,s),a=this._ease(s/this._dur),function _updatePropTweens(t,e,r,i,n,a,s,o){var u,h,l,f,d=(t._pt&&t._ptCache||(t._ptCache={}))[e];if(!d)for(d=t._ptCache[e]=[],l=t._ptLookup,f=t._targets.length;f--;){if((u=l[f][e])&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==e&&u.fp!==e;)u=u._next;if(!u)return Ht=1,t.vars[e]="+=0",Qt(t,s),Ht=0,o?T(e+" not eligible for reset"):1;d.push(u)}for(f=d.length;f--;)(u=(h=d[f])._pt||h).s=!i&&0!==i||n?u.s+(i||0)+a*u.c:i,u.c=r-u.s,h.e&&(h.e=ka(r)+_a(h.e)),h.b&&(h.b=u.s+_a(h.b))}(this,t,e,r,i,a,s,n)?this.resetTo(t,e,r,i,1):(La(this,0),this.parent||Aa(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e))return this._lazy=this._pt=0,this.parent?wb(this):this.scrollTrigger&&this.scrollTrigger.kill(!!I),this;if(this.timeline){var i=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,Wt&&!0!==Wt.vars.overwrite)._first||wb(this),this.parent&&i!==this.timeline.totalDuration()&&Ua(this,this._dur*this.timeline._tDur/i,0,1),this}var n,a,s,o,u,h,l,f=this._targets,d=t?Pt(t):f,c=this._ptLookup,p=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0}(f,d))return"all"===e&&(this._pt=0),wb(this);for(n=this._op=this._op||[],"all"!==e&&(r(e)&&(u={},ja(e,function(t){return u[t]=1}),e=u),e=function _addAliasesToVars(t,e){var r,i,n,a,s=t[0]?ha(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(i in r=bt({},e),o)if(i in r)for(n=(a=o[i].split(",")).length;n--;)r[a[n]]=r[i];return r}(f,e)),l=f.length;l--;)if(~d.indexOf(f[l]))for(u in a=c[l],"all"===e?(n[l]=e,o=a,s={}):(s=n[l]=n[l]||{},o=e),o)(h=a&&a[u])&&("kill"in h.d&&!0!==h.d.kill(u)||Ba(this,h,"_pt"),delete a[u]),"all"!==s&&(s[u]=1);return this._initted&&!this._pt&&p&&wb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return Ya(1,arguments)},Tween.delayedCall=function delayedCall(t,e,r,i){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},Tween.fromTo=function fromTo(t,e,r){return Ya(2,arguments)},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return L.killTweensOf(t,e,r)},Tween}(qt);ta(te.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),ja("staggerTo,staggerFrom,staggerFromTo",function(r){te[r]=function(){var t=new Zt,e=Ct.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function rc(t,e,r){return t.setAttribute(e,r)}function zc(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)}var ee=function _setterPlain(t,e,r){return t[e]=r},re=function _setterFunc(t,e,r){return t[e](r)},ue=function _setterFuncWithParam(t,e,r,i){return t[e](i.fp,r)},le=function _getSetter(t,e){return s(t[e])?re:u(t[e])&&t.setAttribute?rc:ee},ce=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e6*(e.s+e.c*t))/1e6,e)},_e=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},ge=function _renderComplexString(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},ve=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},ye=function _addPluginModifier(t,e,r,i){for(var n,a=this._pt;a;)n=a._next,a.p===i&&a.modifier(t,e,r),a=n},Te=function _killPropTweensOf(t){for(var e,r,i=this._pt;i;)r=i._next,i.p===t&&!i.op||i.op===t?Ba(this,i,"_pt"):i.dep||(e=1),i=r;return!e},be=function _sortPropTweensByPriority(t){for(var e,r,i,n,a=t._pt;a;){for(e=a._next,r=i;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:i=a,(a._next=r)?r._prev=a:n=a,a=e}t._pt=i},we=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=zc,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,i,n,a,s,o,u){this.t=e,this.s=i,this.c=n,this.p=r,this.r=a||ce,this.d=s||this,this.set=o||ee,this.pr=u||0,(this._next=t)&&(t._prev=this)}ja(Tt+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return ct[t]=1}),ht.TweenMax=ht.TweenLite=te,ht.TimelineLite=ht.TimelineMax=Zt,L=new Zt({sortChildren:!1,defaults:j,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),N.stringFilter=Ib;function Hc(t){return(Oe[t]||Me).map(function(t){return t()})}function Ic(){var t=Date.now(),o=[];2<t-Ce&&(Hc("matchMediaInit"),ke.forEach(function(t){var e,r,i,n,a=t.queries,s=t.conditions;for(r in a)(e=h.matchMedia(a[r]).matches)&&(i=1),e!==s[r]&&(s[r]=e,n=1);n&&(t.revert(),i&&o.push(t))}),Hc("matchMediaRevert"),o.forEach(function(e){return e.onMatch(e,function(t){return e.add(null,t)})}),Ce=t,Hc("matchMedia"))}var xe,ke=[],Oe={},Me=[],Ce=0,Pe=0,De=((xe=Context.prototype).add=function add(t,i,n){function Jw(){var t,e=l,r=a.selector;return e&&e!==a&&e.data.push(a),n&&(a.selector=fb(n)),l=a,t=i.apply(a,arguments),s(t)&&a._r.push(t),l=e,a.selector=r,a.isReverted=!1,t}s(t)&&(n=i,i=t,t=s);var a=this;return a.last=Jw,t===s?Jw(a,function(t){return a.add(null,t)}):t?a[t]=Jw:Jw},xe.ignore=function ignore(t){var e=l;l=null,t(this),l=e},xe.getTweens=function getTweens(){var e=[];return this.data.forEach(function(t){return t instanceof Context?e.push.apply(e,t.getTweens()):t instanceof te&&!(t.parent&&"nested"===t.parent.data)&&e.push(t)}),e},xe.clear=function clear(){this._r.length=this.data.length=0},xe.kill=function kill(i,t){var n=this;if(i?function(){for(var t,e=n.getTweens(),r=n.data.length;r--;)"isFlip"===(t=n.data[r]).data&&(t.revert(),t.getChildren(!0,!0,!1).forEach(function(t){return e.splice(e.indexOf(t),1)}));for(e.map(function(t){return{g:t._dur||t._delay||t._sat&&!t._sat.vars.immediateRender?t.globalTime(0):-1/0,t:t}}).sort(function(t,e){return e.g-t.g||-1/0}).forEach(function(t){return t.t.revert(i)}),r=n.data.length;r--;)(t=n.data[r])instanceof Zt?"nested"!==t.data&&(t.scrollTrigger&&t.scrollTrigger.revert(),t.kill()):t instanceof te||!t.revert||t.revert(i);n._r.forEach(function(t){return t(i,n)}),n.isReverted=!0}():this.data.forEach(function(t){return t.kill&&t.kill()}),this.clear(),t)for(var e=ke.length;e--;)ke[e].id===this.id&&ke.splice(e,1)},xe.revert=function revert(t){this.kill(t||{})},Context);function Context(t,e){this.selector=e&&fb(e),this.data=[],this._r=[],this.isReverted=!1,this.id=Pe++,t&&this.add(t)}var Se,Ee=((Se=MatchMedia.prototype).add=function add(t,e,r){v(t)||(t={matches:t});var i,n,a,s=new De(0,r||this.scope),o=s.conditions={};for(n in l&&!s.selector&&(s.selector=l.selector),this.contexts.push(s),e=s.add("onMatch",e),s.queries=t)"all"===n?a=1:(i=h.matchMedia(t[n]))&&(ke.indexOf(s)<0&&ke.push(s),(o[n]=i.matches)&&(a=1),i.addListener?i.addListener(Ic):i.addEventListener("change",Ic));return a&&e(s,function(t){return s.add(null,t)}),this},Se.revert=function revert(t){this.kill(t||{})},Se.kill=function kill(e){this.contexts.forEach(function(t){return t.kill(e,!0)})},MatchMedia);function MatchMedia(t){this.contexts=[],this.scope=t,l&&l.data.push(this)}var Re={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return zb(t)})},timeline:function timeline(t){return new Zt(t)},getTweensOf:function getTweensOf(t,e){return L.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,n){r(i)&&(i=Pt(i)[0]);var a=ha(i||{}).get,s=e?sa:ra;return"native"===e&&(e=""),i?t?s((mt[t]&&mt[t].get||a)(i,t,e,n)):function(t,e,r){return s((mt[t]&&mt[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,i){if(1<(r=Pt(r)).length){var n=r.map(function(t){return Fe.quickSetter(t,e,i)}),a=n.length;return function(t){for(var e=a;e--;)n[e](t)}}r=r[0]||{};var s=mt[e],o=ha(r),u=o.harness&&(o.harness.aliases||{})[e]||e,h=s?function(t){var e=new s;d._pt=0,e.init(r,i?t+i:t,d,0,[r]),e.render(1,e),d._pt&&ve(1,d)}:o.set(r,u);return s?h:function(t){return h(r,u,i?t+i:t,o,1)}},quickTo:function quickTo(t,i,e){function by(t,e,r){return n.resetTo(i,t,e,r)}var r,n=Fe.to(t,ta(((r={})[i]="+=0.1",r.paused=!0,r.stagger=0,r),e||{}));return by.tween=n,by},isTweening:function isTweening(t){return 0<L.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=Vt(t.ease,j.ease)),wa(j,t||{})},config:function config(t){return wa(N,t||{})},registerEffect:function registerEffect(t){var i=t.name,n=t.effect,e=t.plugins,a=t.defaults,r=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!mt[t]&&!ht[t]&&T(i+" effect requires "+t+" plugin.")}),gt[i]=function(t,e,r){return n(Pt(t),ta(e||{},a),r)},r&&(Zt.prototype[i]=function(t,e,r){return this.add(gt[i](t,v(e)?e:(r=e)&&{},this),r)})},registerEase:function registerEase(t,e){Bt[t]=Vt(e)},parseEase:function parseEase(t,e){return arguments.length?Vt(t,e):Bt},getById:function getById(t){return L.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,i,n=new Zt(t);for(n.smoothChildTiming=w(t.smoothChildTiming),L.remove(n),n._dp=0,n._time=n._tTime=L._time,r=L._first;r;)i=r._next,!e&&!r._dur&&r instanceof te&&r.vars.onComplete===r._targets[0]||Na(n,r,r._start-r._delay),r=i;return Na(L,n,0),n},context:function context(t,e){return t?new De(t,e):l},matchMedia:function matchMedia(t){return new Ee(t)},matchMediaRefresh:function matchMediaRefresh(){return ke.forEach(function(t){var e,r,i=t.conditions;for(r in i)i[r]&&(i[r]=!1,e=1);e&&t.revert()})||Ic()},addEventListener:function addEventListener(t,e){var r=Oe[t]||(Oe[t]=[]);~r.indexOf(e)||r.push(e)},removeEventListener:function removeEventListener(t,e){var r=Oe[t],i=r&&r.indexOf(e);0<=i&&r.splice(i,1)},utils:{wrap:function wrap(e,t,r){var i=t-e;return $(e)?ob(e,wrap(0,e.length),t):Za(r,function(t){return(i+(t-e)%i)%i+e})},wrapYoyo:function wrapYoyo(e,t,r){var i=t-e,n=2*i;return $(e)?ob(e,wrapYoyo(0,e.length-1),t):Za(r,function(t){return e+(i<(t=(n+(t-e)%n)%n||0)?n-t:t)})},distribute:hb,random:kb,snap:jb,normalize:function normalize(t,e,r){return At(t,e,0,1,r)},getUnit:_a,clamp:function clamp(e,r,t){return Za(t,function(t){return Mt(e,r,t)})},splitColor:Db,toArray:Pt,selector:fb,mapRange:At,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||_a(t))}},interpolate:function interpolate(e,i,t,n){var a=isNaN(e+i)?0:function(t){return(1-t)*e+t*i};if(!a){var s,o,u,h,l,f=r(e),d={};if(!0===t&&(n=1)&&(t=null),f)e={p:e},i={p:i};else if($(e)&&!$(i)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=i}else n||(e=bt($(e)?[]:{},e));if(!u){for(s in i)Jt.call(d,e,s,"get",i[s]);a=function func(t){return ve(t,d)||(f?e.p:e)}}}return Za(t,a)},shuffle:gb},install:R,effects:gt,ticker:It,updateRoot:Zt.updateRoot,plugins:mt,globalTimeline:L,core:{PropTween:we,globals:U,Tween:te,Timeline:Zt,Animation:qt,getCache:ha,_removeLinkedListItem:Ba,reverting:function reverting(){return I},context:function context(t){return t&&l&&(l.data.push(t),t._ctx=l),l},suppressOverwrites:function suppressOverwrites(t){return F=t}}};ja("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return Re[t]=te[t]}),It.add(Zt.updateRoot),d=Re.to({},{duration:0});function Mc(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function Oc(t,a){return{name:t,headless:1,rawVars:1,init:function init(t,n,e){e._onInit=function(t){var e,i;if(r(n)&&(e={},ja(n,function(t){return e[t]=1}),n=e),a){for(i in e={},n)e[i]=a(n[i]);n=e}!function _addModifiers(t,e){var r,i,n,a=t._targets;for(r in e)for(i=a.length;i--;)(n=(n=t._ptLookup[i][r])&&n.d)&&(n._pt&&(n=Mc(n,r)),n&&n.modifier&&n.modifier(e[r],t,a[i],r))}(t,n)}}}}var Fe=Re.registerPlugin({name:"attr",init:function init(t,e,r,i,n){var a,s,o;for(a in this.tween=r,e)o=t.getAttribute(a)||"",(s=this.add(t,"setAttribute",(o||0)+"",e[a],i,n,0,0,a)).op=a,s.b=o,this._props.push(a)},render:function render(t,e){for(var r=e._pt;r;)I?r.set(r.t,r.p,r.b,r):r.r(t,r.d),r=r._next}},{name:"endArray",headless:1,init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r],0,0,0,0,0,1)}},Oc("roundProps",ib),Oc("modifiers"),Oc("snap",jb))||Re;te.version=Zt.version=Fe.version="3.14.2",o=1,x()&&Lt();function yd(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function zd(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function Ad(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Bd(t,e){return e.set(e.t,e.p,1===t?e.e:t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Cd(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function Dd(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function Ed(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Fd(t,e,r){return t.style[e]=r}function Gd(t,e,r){return t.style.setProperty(e,r)}function Hd(t,e,r){return t._gsap[e]=r}function Id(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function Jd(t,e,r,i,n){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(n,a)}function Kd(t,e,r,i,n){var a=t._gsap;a[e]=r,a.renderTransform(n,a)}function Nd(t,e){var r=this,i=this.target,n=i.style,a=i._gsap;if(t in hr&&n){if(this.tfm=this.tfm||{},"transform"===t)return mr.transform.split(",").forEach(function(t){return Nd.call(r,t,e)});if(~(t=mr[t]||t).indexOf(",")?t.split(",").forEach(function(t){return r.tfm[t]=xr(i,t)}):this.tfm[t]=a.x?a[t]:xr(i,t),t===vr&&(this.tfm.zOrigin=a.zOrigin),0<=this.props.indexOf(gr))return;a.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(vr,e,"")),t=gr}(n||e)&&this.props.push(t,e,n[t])}function Od(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))}function Pd(){var t,e,r=this.props,i=this.target,n=i.style,a=i._gsap;for(t=0;t<r.length;t+=3)r[t+1]?2===r[t+1]?i[r[t]](r[t+2]):i[r[t]]=r[t+2]:r[t+2]?n[r[t]]=r[t+2]:n.removeProperty("--"===r[t].substr(0,2)?r[t]:r[t].replace(cr,"-$1").toLowerCase());if(this.tfm){for(e in this.tfm)a[e]=this.tfm[e];a.svg&&(a.renderTransform(),i.setAttribute("data-svg-origin",this.svgo||"")),(t=Ue())&&t.isStart||n[gr]||(Od(n),a.zOrigin&&n[vr]&&(n[vr]+=" "+a.zOrigin+"px",a.zOrigin=0,a.renderTransform()),a.uncache=1)}}function Qd(t,e){var r={target:t,props:[],revert:Pd,save:Nd};return t._gsap||Fe.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(t){return r.save(t)}),r}function Sd(t,e){var r=Le.createElementNS?Le.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Le.createElement(t);return r&&r.style?r:Le.createElement(t)}function Td(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(cr,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&Td(t,Tr(e)||e,1)||""}function Wd(){(function _windowExists(){return"undefined"!=typeof window})()&&window.document&&(Ie=window,Le=Ie.document,Ye=Le.documentElement,je=Sd("div")||{style:{}},Sd("div"),gr=Tr(gr),vr=gr+"Origin",je.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Xe=!!Tr("perspective"),Ue=Fe.core.reverting,Ne=1)}function Xd(t){var e,r=t.ownerSVGElement,i=Sd("svg",r&&r.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=t.cloneNode(!0);n.style.display="block",i.appendChild(n),Ye.appendChild(i);try{e=n.getBBox()}catch(t){}return i.removeChild(n),Ye.removeChild(i),e}function Yd(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function Zd(e){var r,i;try{r=e.getBBox()}catch(t){r=Xd(e),i=1}return r&&(r.width||r.height)||i||(r=Xd(e)),!r||r.width||r.x||r.y?r:{x:+Yd(e,["x","cx","x1"])||0,y:+Yd(e,["y","cy","y1"])||0,width:0,height:0}}function $d(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!Zd(t))}function _d(t,e){if(e){var r,i=t.style;e in hr&&e!==vr&&(e=gr),i.removeProperty?("ms"!==(r=e.substr(0,2))&&"webkit"!==e.substr(0,6)||(e="-"+e),i.removeProperty("--"===r?e:e.replace(cr,"-$1").toLowerCase())):i.removeAttribute(e)}}function ae(t,e,r,i,n,a){var s=new we(t._pt,e,r,0,1,a?Ed:Dd);return(t._pt=s).b=i,s.e=n,t._props.push(r),s}function de(t,e,r,i){var n,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=je.style,f=pr.test(e),d="svg"===t.tagName.toLowerCase(),c=(d?"client":"offset")+(f?"Width":"Height"),p="px"===i,_="%"===i;if(i===h||!u||br[i]||br[h])return u;if("px"===h||p||(u=de(t,e,r,"px")),o=t.getCTM&&$d(t),(_||"%"===h)&&(hr[e]||~e.indexOf("adius")))return n=o?t.getBBox()[f?"width":"height"]:t[c],ka(_?u/n*100:u/100*n);if(l[f?"width":"height"]=100+(p?h:i),a="rem"!==i&&~e.indexOf("adius")||"em"===i&&t.appendChild&&!d?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==Le&&a.appendChild||(a=Le.body),(s=a._gsap)&&_&&s.width&&f&&s.time===It.time&&!s.uncache)return ka(u/s.width*100);if(!_||"height"!==e&&"width"!==e)!_&&"%"!==h||wr[Td(a,"display")]||(l.position=Td(t,"position")),a===t&&(l.position="static"),a.appendChild(je),n=je[c],a.removeChild(je),l.position="absolute";else{var m=t.style[e];t.style[e]=100+i,n=t[c],m?t.style[e]=m:_d(t,e)}return f&&_&&((s=ha(a)).time=It.time,s.width=a[c]),ka(p?n*u/100:n&&u?100/n*u:0)}function fe(t,e,r,i){if(!r||"none"===r){var n=Tr(e,t,1),a=n&&Td(t,n,1);a&&a!==r?(e=n,r=a):"borderColor"===e&&(r=Td(t,"borderTopColor"))}var s,o,u,h,l,f,d,c,p,_,m,g=new we(this._pt,t.style,e,0,1,ge),v=0,y=0;if(g.b=r,g.e=i,r+="","var(--"===(i+="").substring(0,6)&&(i=Td(t,i.substring(4,i.indexOf(")")))),"auto"===i&&(f=t.style[e],t.style[e]=i,i=Td(t,e)||i,f?t.style[e]=f:_d(t,e)),Ib(s=[r,i]),i=s[1],u=(r=s[0]).match(nt)||[],(i.match(nt)||[]).length){for(;o=nt.exec(i);)d=o[0],p=i.substring(v,o.index),l?l=(l+1)%5:"rgba("!==p.substr(-5)&&"hsla("!==p.substr(-5)||(l=1),d!==(f=u[y++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),"="===d.charAt(1)&&(d=ma(h,d)+m),c=parseFloat(d),_=d.substr((c+"").length),v=nt.lastIndex-_.length,_||(_=_||N.units[e]||m,v===i.length&&(i+=_,g.e+=_)),m!==_&&(h=de(t,e,f,_)||0),g._pt={_next:g._pt,p:p||1===y?p:",",s:h,c:c-h,m:l&&l<4||"zIndex"===e?Math.round:0});g.c=v<i.length?i.substring(v,i.length):""}else g.r="display"===e&&"none"===i?Ed:Dd;return st.test(i)&&(g.e=0),this._pt=g}function he(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==i&&"right"!==i||(t=r,r=i,i=t),e[0]=kr[r]||r,e[1]=kr[i]||i,e.join(" ")}function ie(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,n,a=e.t,s=a.style,o=e.u,u=a._gsap;if("all"===o||!0===o)s.cssText="",i=1;else for(n=(o=o.split(",")).length;-1<--n;)r=o[n],hr[r]&&(i=1,r="transformOrigin"===r?vr:gr),_d(a,r);i&&(_d(a,gr),u&&(u.svg&&a.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",Pr(a,1),u.uncache=1,Od(s)))}}function me(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function ne(t){var e=Td(t,gr);return me(e)?Mr:e.substr(7).match(it).map(ka)}function oe(t,e){var r,i,n,a,s=t._gsap||ha(t),o=t.style,u=ne(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(n=t.transform.baseVal.consolidate().matrix).a,n.b,n.c,n.d,n.e,n.f]).join(",")?Mr:u:(u!==Mr||t.offsetParent||t===Ye||s.svg||(n=o.display,o.display="block",(r=t.parentNode)&&(t.offsetParent||t.getBoundingClientRect().width)||(a=1,i=t.nextElementSibling,Ye.appendChild(t)),u=ne(t),n?o.display=n:_d(t,"display"),a&&(i?r.insertBefore(t,i):r?r.appendChild(t):Ye.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function pe(t,e,r,i,n,a){var s,o,u,h=t._gsap,l=n||oe(t,!0),f=h.xOrigin||0,d=h.yOrigin||0,c=h.xOffset||0,p=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==Mr&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=Zd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),i||!1!==i&&h.smooth?(y=w-f,T=x-d,h.xOffset=c+(y*_+T*g)-y,h.yOffset=p+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!i,h.origin=e,h.originIsAbsolute=!!r,t.style[vr]="0px 0px",a&&(ae(a,h,"xOrigin",f,w),ae(a,h,"yOrigin",d,x),ae(a,h,"xOffset",c,h.xOffset),ae(a,h,"yOffset",p,h.yOffset)),t.setAttribute("data-svg-origin",w+" "+x)}function se(t,e,r){var i=_a(e);return ka(parseFloat(e)+parseFloat(de(t,"x",r+"px",i)))+i}function ze(t,e,i,n,a){var s,o,u=360,h=r(a),l=parseFloat(a)*(h&&~a.indexOf("rad")?lr:1)-n,f=n+l+"deg";return h&&("short"===(s=a.split("_")[1])&&(l%=u)!==l%180&&(l+=l<0?u:-u),"cw"===s&&l<0?l=(l+36e9)%u-~~(l/u)*u:"ccw"===s&&0<l&&(l=(l-36e9)%u-~~(l/u)*u)),t._pt=o=new we(t._pt,e,i,n,l,zd),o.e=f,o.u="deg",t._props.push(i),o}function Ae(t,e){for(var r in e)t[r]=e[r];return t}function Be(t,e,r){var i,n,a,s,o,u,h,l=Ae({},r._gsap),f=r.style;for(n in l.svg?(a=r.getAttribute("transform"),r.setAttribute("transform",""),f[gr]=e,i=Pr(r,1),_d(r,gr),r.setAttribute("transform",a)):(a=getComputedStyle(r)[gr],f[gr]=e,i=Pr(r,1),f[gr]=a),hr)(a=l[n])!==(s=i[n])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(n)<0&&(o=_a(a)!==(h=_a(s))?de(r,n,a,h):parseFloat(a),u=parseFloat(s),t._pt=new we(t._pt,i,n,o,u-o,yd),t._pt.u=h||0,t._props.push(n));Ae(i,l)}var Ie,Le,Ye,Ne,je,Ve,Ue,Xe,qe=Bt.Power0,Ze=Bt.Power1,We=Bt.Power2,He=Bt.Power3,Je=Bt.Power4,Qe=Bt.Linear,Ge=Bt.Quad,Ke=Bt.Cubic,$e=Bt.Quart,tr=Bt.Quint,er=Bt.Strong,rr=Bt.Elastic,ir=Bt.Back,nr=Bt.SteppedEase,ar=Bt.Bounce,sr=Bt.Sine,or=Bt.Expo,ur=Bt.Circ,hr={},lr=180/Math.PI,fr=Math.PI/180,dr=Math.atan2,cr=/([A-Z])/g,pr=/(left|right|width|margin|padding|x)/i,_r=/[\s,\(]\S/,mr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},gr="transform",vr=gr+"Origin",yr="O,Moz,ms,Ms,Webkit".split(","),Tr=function _checkPropPrefix(t,e,r){var i=(e||je).style,n=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(yr[n]+t in i););return n<0?null:(3===n?"ms":0<=n?yr[n]:"")+t},br={deg:1,rad:1,turn:1},wr={grid:1,flex:1},xr=function _get(t,e,r,i){var n;return Ne||Wd(),e in mr&&"transform"!==e&&~(e=mr[e]).indexOf(",")&&(e=e.split(",")[0]),hr[e]&&"transform"!==e?(n=Pr(t,i),n="transformOrigin"!==e?n[e]:n.svg?n.origin:Ar(Td(t,vr))+" "+n.zOrigin+"px"):(n=t.style[e])&&"auto"!==n&&!i&&!~(n+"").indexOf("calc(")||(n=Or[e]&&Or[e](t,e,r)||Td(t,e)||ia(t,e)||("opacity"===e?1:0)),r&&!~(n+"").trim().indexOf(" ")?de(t,e,n,r)+r:n},kr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Or={clearProps:function clearProps(t,e,r,i,n){if("isFromStart"!==n.data){var a=t._pt=new we(t._pt,e,r,0,0,ie);return a.u=i,a.pr=-10,a.tween=n,t._props.push(r),1}}},Mr=[1,0,0,1,0,0],Cr={},Pr=function _parseTransform(t,e){var r=t._gsap||new Xt(t);if("x"in r&&!e&&!r.uncache)return r;var i,n,a,s,o,u,h,l,f,d,c,p,_,m,g,v,y,T,b,w,x,k,O,M,C,P,A,D,S,z,E,R,F=t.style,I=r.scaleX<0,L="deg",B=getComputedStyle(t),Y=Td(t,vr)||"0";return i=n=a=u=h=l=f=d=c=0,s=o=1,r.svg=!(!t.getCTM||!$d(t)),B.translate&&("none"===B.translate&&"none"===B.scale&&"none"===B.rotate||(F[gr]=("none"!==B.translate?"translate3d("+(B.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==B.rotate?"rotate("+B.rotate+") ":"")+("none"!==B.scale?"scale("+B.scale.split(" ").join(",")+") ":"")+("none"!==B[gr]?B[gr]:"")),F.scale=F.rotate=F.translate="none"),m=oe(t,r.svg),r.svg&&(M=r.uncache?(C=t.getBBox(),Y=r.xOrigin-C.x+"px "+(r.yOrigin-C.y)+"px",""):!e&&t.getAttribute("data-svg-origin"),pe(t,M||Y,!!M||r.originIsAbsolute,!1!==r.smooth,m)),p=r.xOrigin||0,_=r.yOrigin||0,m!==Mr&&(T=m[0],b=m[1],w=m[2],x=m[3],i=k=m[4],n=O=m[5],6===m.length?(s=Math.sqrt(T*T+b*b),o=Math.sqrt(x*x+w*w),u=T||b?dr(b,T)*lr:0,(f=w||x?dr(w,x)*lr+u:0)&&(o*=Math.abs(Math.cos(f*fr))),r.svg&&(i-=p-(p*T+_*w),n-=_-(p*b+_*x))):(R=m[6],z=m[7],A=m[8],D=m[9],S=m[10],E=m[11],i=m[12],n=m[13],a=m[14],h=(g=dr(R,S))*lr,g&&(M=k*(v=Math.cos(-g))+A*(y=Math.sin(-g)),C=O*v+D*y,P=R*v+S*y,A=k*-y+A*v,D=O*-y+D*v,S=R*-y+S*v,E=z*-y+E*v,k=M,O=C,R=P),l=(g=dr(-w,S))*lr,g&&(v=Math.cos(-g),E=x*(y=Math.sin(-g))+E*v,T=M=T*v-A*y,b=C=b*v-D*y,w=P=w*v-S*y),u=(g=dr(b,T))*lr,g&&(M=T*(v=Math.cos(g))+b*(y=Math.sin(g)),C=k*v+O*y,b=b*v-T*y,O=O*v-k*y,T=M,k=C),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=ka(Math.sqrt(T*T+b*b+w*w)),o=ka(Math.sqrt(O*O+R*R)),g=dr(k,O),f=2e-4<Math.abs(g)?g*lr:0,c=E?1/(E<0?-E:E):0),r.svg&&(M=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!me(Td(t,gr)),M&&t.setAttribute("transform",M))),90<Math.abs(f)&&Math.abs(f)<270&&(I?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),e=e||r.uncache,r.x=i-((r.xPercent=i&&(!e&&r.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)))?t.offsetWidth*r.xPercent/100:0)+"px",r.y=n-((r.yPercent=n&&(!e&&r.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-n)?-50:0)))?t.offsetHeight*r.yPercent/100:0)+"px",r.z=a+"px",r.scaleX=ka(s),r.scaleY=ka(o),r.rotation=ka(u)+L,r.rotationX=ka(h)+L,r.rotationY=ka(l)+L,r.skewX=f+L,r.skewY=d+L,r.transformPerspective=c+"px",(r.zOrigin=parseFloat(Y.split(" ")[2])||!e&&r.zOrigin||0)&&(F[vr]=Ar(Y)),r.xOffset=r.yOffset=0,r.force3D=N.force3D,r.renderTransform=r.svg?Fr:Xe?Rr:Dr,r.uncache=0,r},Ar=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},Dr=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Rr(t,e)},Sr="0deg",zr="0px",Er=") ",Rr=function _renderCSSTransforms(t,e){var r=e||this,i=r.xPercent,n=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,d=r.skewY,c=r.scaleX,p=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==Sr||h!==Sr)){var b,w=parseFloat(h)*fr,x=Math.sin(w),k=Math.cos(w);w=parseFloat(l)*fr,b=Math.cos(w),a=se(g,a,x*b*-v),s=se(g,s,-Math.sin(w)*-v),o=se(g,o,k*b*-v+v)}_!==zr&&(y+="perspective("+_+Er),(i||n)&&(y+="translate("+i+"%, "+n+"%) "),!T&&a===zr&&s===zr&&o===zr||(y+=o!==zr||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+Er),u!==Sr&&(y+="rotate("+u+Er),h!==Sr&&(y+="rotateY("+h+Er),l!==Sr&&(y+="rotateX("+l+Er),f===Sr&&d===Sr||(y+="skew("+f+", "+d+Er),1===c&&1===p||(y+="scale("+c+", "+p+Er),g.style[gr]=y||"translate(0, 0)"},Fr=function _renderSVGTransforms(t,e){var r,i,n,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,d=o.rotation,c=o.skewX,p=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),k=parseFloat(f);d=parseFloat(d),c=parseFloat(c),(p=parseFloat(p))&&(c+=p=parseFloat(p),d+=p),d||c?(d*=fr,c*=fr,r=Math.cos(d)*_,i=Math.sin(d)*_,n=Math.sin(d-c)*-m,a=Math.cos(d-c)*m,c&&(p*=fr,s=Math.tan(c-p),n*=s=Math.sqrt(1+s*s),a*=s,p&&(s=Math.tan(p),r*=s=Math.sqrt(1+s*s),i*=s)),r=ka(r),i=ka(i),n=ka(n),a=ka(a)):(r=_,a=m,i=n=0),(x&&!~(l+"").indexOf("px")||k&&!~(f+"").indexOf("px"))&&(x=de(g,"x",l,"px"),k=de(g,"y",f,"px")),(v||y||T||b)&&(x=ka(x+v-(v*r+y*n)+T),k=ka(k+y-(v*i+y*a)+b)),(u||h)&&(s=g.getBBox(),x=ka(x+u/100*s.width),k=ka(k+h/100*s.height)),s="matrix("+r+","+i+","+n+","+a+","+x+","+k+")",g.setAttribute("transform",s),w&&(g.style[gr]=s)};ja("padding,margin,Width,Radius",function(e,r){var t="Right",i="Bottom",n="Left",o=(r<3?["Top",t,i,n]:["Top"+n,"Top"+t,i+t,i+n]).map(function(t){return r<2?e+t:"border"+t+e});Or[1<r?"border"+e:e]=function(e,t,r,i,n){var a,s;if(arguments.length<4)return a=o.map(function(t){return xr(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(i+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,n)}});var Ir,Lr,Br,Yr={name:"css",register:Wd,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,i,n,a){var s,o,u,h,l,f,d,c,p,_,m,g,v,y,T,b,w,x=this._props,k=t.style,O=i.vars.startAt;for(d in Ne||Wd(),this.styles=this.styles||Qd(t),b=this.styles.props,this.tween=i,e)if("autoRound"!==d&&(o=e[d],!mt[d]||!dc(d,e,i,n,t,a)))if(l=typeof o,f=Or[d],"function"===l&&(l=typeof(o=o.call(i,n,t,a))),"string"===l&&~o.indexOf("random(")&&(o=rb(o)),f)f(this,t,d,o,i)&&(T=1);else if("--"===d.substr(0,2))s=(getComputedStyle(t).getPropertyValue(d)+"").trim(),o+="",Rt.lastIndex=0,Rt.test(s)||(c=_a(s),(p=_a(o))?c!==p&&(s=de(t,d,s,p)+p):c&&(o+=c)),this.add(k,"setProperty",s,o,n,a,0,0,d),x.push(d),b.push(d,0,k[d]);else if("undefined"!==l){if(O&&d in O?(s="function"==typeof O[d]?O[d].call(i,n,t,a):O[d],r(s)&&~s.indexOf("random(")&&(s=rb(s)),_a(s+"")||"auto"===s||(s+=N.units[d]||_a(xr(t,d))||""),"="===(s+"").charAt(1)&&(s=xr(t,d))):s=xr(t,d),h=parseFloat(s),(_="string"===l&&"="===o.charAt(1)&&o.substr(0,2))&&(o=o.substr(2)),u=parseFloat(o),d in mr&&("autoAlpha"===d&&(1===h&&"hidden"===xr(t,"visibility")&&u&&(h=0),b.push("visibility",0,k.visibility),ae(this,k,"visibility",h?"inherit":"hidden",u?"inherit":"hidden",!u)),"scale"!==d&&"transform"!==d&&~(d=mr[d]).indexOf(",")&&(d=d.split(",")[0])),m=d in hr){if(this.styles.save(d),w=o,"string"===l&&"var(--"===o.substring(0,6)){if("calc("===(o=Td(t,o.substring(4,o.indexOf(")")))).substring(0,5)){var M=t.style.perspective;t.style.perspective=o,o=Td(t,"perspective"),M?t.style.perspective=M:_d(t,"perspective")}u=parseFloat(o)}if(g||((v=t._gsap).renderTransform&&!e.parseTransform||Pr(t,e.parseTransform),y=!1!==e.smoothOrigin&&v.smooth,(g=this._pt=new we(this._pt,k,gr,0,1,v.renderTransform,v,0,-1)).dep=1),"scale"===d)this._pt=new we(this._pt,v,"scaleY",v.scaleY,(_?ma(v.scaleY,_+u):u)-v.scaleY||0,yd),this._pt.u=0,x.push("scaleY",d),d+="X";else{if("transformOrigin"===d){b.push(vr,0,k[vr]),o=he(o),v.svg?pe(t,o,0,y,0,this):((p=parseFloat(o.split(" ")[2])||0)!==v.zOrigin&&ae(this,v,"zOrigin",v.zOrigin,p),ae(this,k,d,Ar(s),Ar(o)));continue}if("svgOrigin"===d){pe(t,o,1,y,0,this);continue}if(d in Cr){ze(this,v,d,h,_?ma(h,_+o):o);continue}if("smoothOrigin"===d){ae(this,v,"smooth",v.smooth,o);continue}if("force3D"===d){v[d]=o;continue}if("transform"===d){Be(this,o,t);continue}}}else d in k||(d=Tr(d)||d);if(m||(u||0===u)&&(h||0===h)&&!_r.test(o)&&d in k)u=u||0,(c=(s+"").substr((h+"").length))!==(p=_a(o)||(d in N.units?N.units[d]:c))&&(h=de(t,d,s,p)),this._pt=new we(this._pt,m?v:k,d,h,(_?ma(h,_+u):u)-h,m||"px"!==p&&"zIndex"!==d||!1===e.autoRound?yd:Cd),this._pt.u=p||0,m&&w!==o?(this._pt.b=s,this._pt.e=w,this._pt.r=Bd):c!==p&&"%"!==p&&(this._pt.b=s,this._pt.r=Ad);else if(d in k)fe.call(this,t,d,s,_?_+o:o);else if(d in t)this.add(t,d,s||t[d],_?_+o:o,n,a);else if("parseTransform"!==d){S(d,o);continue}m||(d in k?b.push(d,0,k[d]):"function"==typeof t[d]?b.push(d,2,t[d]()):b.push(d,1,s||t[d])),x.push(d)}T&&be(this)},render:function render(t,e){if(e.tween._time||!Ue())for(var r=e._pt;r;)r.r(t,r.d),r=r._next;else e.styles.revert()},get:xr,aliases:mr,getSetter:function getSetter(t,e,r){var i=mr[e];return i&&i.indexOf(",")<0&&(e=i),e in hr&&e!==vr&&(t._gsap.x||xr(t,"x"))?r&&Ve===r?"scale"===e?Id:Hd:(Ve=r||{})&&("scale"===e?Jd:Kd):t.style&&!u(t.style[e])?Fd:~e.indexOf("-")?Gd:le(t,e)},core:{_removeProperty:_d,_getMatrix:oe}};Fe.utils.checkPrefix=Tr,Fe.core.getStyleSaver=Qd,Br=ja((Ir="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(Lr="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){hr[t]=1}),ja(Lr,function(t){N.units[t]="deg",Cr[t]=1}),mr[Br[13]]=Ir+","+Lr,ja("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");mr[e[1]]=Br[e[0]]}),ja("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){N.units[t]="px"}),Fe.registerPlugin(Yr);var Nr=Fe.registerPlugin(Yr)||Fe,jr=Nr.core.Tween;e.Back=ir,e.Bounce=ar,e.CSSPlugin=Yr,e.Circ=ur,e.Cubic=Ke,e.Elastic=rr,e.Expo=or,e.Linear=Qe,e.Power0=qe,e.Power1=Ze,e.Power2=We,e.Power3=He,e.Power4=Je,e.Quad=Ge,e.Quart=$e,e.Quint=tr,e.Sine=sr,e.SteppedEase=nr,e.Strong=er,e.TimelineLite=Zt,e.TimelineMax=Zt,e.TweenLite=te,e.TweenMax=jr,e.default=Nr,e.gsap=Nr;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});


/* ===== vendor: ScrollTrigger.min.js ===== */
/*!
 * ScrollTrigger 3.14.2
 * https://gsap.com
 * 
 * @license Copyright 2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).window=e.window||{})}(this,function(e){"use strict";function _defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function r(){return Se||"undefined"!=typeof window&&(Se=window.gsap)&&Se.registerPlugin&&Se}function z(e,t){return~Le.indexOf(e)&&Le[Le.indexOf(e)+1][t]}function A(e){return!!~t.indexOf(e)}function B(e,t,r,n,i){return e.addEventListener(t,r,{passive:!1!==n,capture:!!i})}function C(e,t,r,n){return e.removeEventListener(t,r,!!n)}function F(){return Re&&Re.isPressed||ze.cache++}function G(r,n){function fd(e){if(e||0===e){i&&(Ce.history.scrollRestoration="manual");var t=Re&&Re.isPressed;e=fd.v=Math.round(e)||(Re&&Re.iOS?1:0),r(e),fd.cacheID=ze.cache,t&&o("ss",e)}else(n||ze.cache!==fd.cacheID||o("ref"))&&(fd.cacheID=ze.cache,fd.v=r());return fd.v+fd.offset}return fd.offset=0,r&&fd}function J(e,t){return(t&&t._ctx&&t._ctx.selector||Se.utils.toArray)(e)[0]||("string"==typeof e&&!1!==Se.config().nullTargetWarn?console.warn("Element not found:",e):null)}function L(t,e){var r=e.s,n=e.sc;A(t)&&(t=ke.scrollingElement||Me);var i=ze.indexOf(t),o=n===Xe.sc?1:2;~i||(i=ze.push(t)-1),ze[i+o]||B(t,"scroll",F);var a=ze[i+o],s=a||(ze[i+o]=G(z(t,r),!0)||(A(t)?n:G(function(e){return arguments.length?t[r]=e:t[r]})));return s.target=t,a||(s.smooth="smooth"===Se.getProperty(t,"scrollBehavior")),s}function M(e,t,i){function Hd(e,t){var r=Ye();t||n<r-s?(a=o,o=e,l=s,s=r):i?o+=e:o=a+(e-a)/(r-l)*(s-l)}var o=e,a=e,s=Ye(),l=s,n=t||50,c=Math.max(500,3*n);return{update:Hd,reset:function reset(){a=o=i?0:o,l=s=0},getVelocity:function getVelocity(e){var t=l,r=a,n=Ye();return!e&&0!==e||e===o||Hd(e),s===l||c<n-l?0:(o+(i?r:-r))/((i?n:s)-t)*1e3}}}function N(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e}function O(e){var t=Math.max.apply(Math,e),r=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(r)?t:r}function P(){(Ae=Se.core.globals().ScrollTrigger)&&Ae.core&&function _integrate(){var e=Ae.core,r=e.bridge||{},t=e._scrollers,n=e._proxies;t.push.apply(t,ze),n.push.apply(n,Le),ze=t,Le=n,o=function _bridge(e,t){return r[e](t)}}()}function Q(e){return Se=e||r(),!Te&&Se&&"undefined"!=typeof document&&document.body&&(Ce=window,Me=(ke=document).documentElement,Ee=ke.body,t=[Ce,ke,Me,Ee],Se.utils.clamp,Ie=Se.core.context||function(){},Oe="onpointerenter"in Ee?"pointer":"mouse",Pe=k.isTouch=Ce.matchMedia&&Ce.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Ce||0<navigator.maxTouchPoints||0<navigator.msMaxTouchPoints?2:0,De=k.eventTypes=("ontouchstart"in Me?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Me?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return i=0},500),P(),Te=1),Te}var Se,Te,Ce,ke,Me,Ee,Pe,Oe,Ae,t,Re,De,Ie,i=1,Be=[],ze=[],Le=[],Ye=Date.now,o=function _bridge(e,t){return t},n="scrollLeft",a="scrollTop",Ne={s:n,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:G(function(e){return arguments.length?Ce.scrollTo(e,Xe.sc()):Ce.pageXOffset||ke[n]||Me[n]||Ee[n]||0})},Xe={s:a,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Ne,sc:G(function(e){return arguments.length?Ce.scrollTo(Ne.sc(),e):Ce.pageYOffset||ke[a]||Me[a]||Ee[a]||0})};Ne.op=Xe,ze.cache=0;var k=(Observer.prototype.init=function init(e){Te||Q(Se)||console.warn("Please gsap.registerPlugin(Observer)"),Ae||P();var i=e.tolerance,a=e.dragMinimum,t=e.type,o=e.target,r=e.lineHeight,n=e.debounce,s=e.preventDefault,l=e.onStop,c=e.onStopDelay,u=e.ignore,f=e.wheelSpeed,d=e.event,p=e.onDragStart,g=e.onDragEnd,h=e.onDrag,v=e.onPress,b=e.onRelease,m=e.onRight,y=e.onLeft,x=e.onUp,_=e.onDown,w=e.onChangeX,S=e.onChangeY,T=e.onChange,k=e.onToggleX,E=e.onToggleY,R=e.onHover,D=e.onHoverEnd,I=e.onMove,z=e.ignoreCheck,Y=e.isNormalizer,X=e.onGestureStart,q=e.onGestureEnd,U=e.onWheel,H=e.onEnable,W=e.onDisable,V=e.onClick,G=e.scrollSpeed,K=e.capture,j=e.allowClicks,$=e.lockAxis,Z=e.onLockAxis;function hf(){return xe=Ye()}function jf(e,t){return(se.event=e)&&u&&function _isWithin(e,t){for(var r=t.length;r--;)if(t[r]===e||t[r].contains(e))return!0;return!1}(e.target,u)||t&&he&&"touch"!==e.pointerType||z&&z(e,t)}function lf(){var e=se.deltaX=O(me),t=se.deltaY=O(ye),r=Math.abs(e)>=i,n=Math.abs(t)>=i;T&&(r||n)&&T(se,e,t,me,ye),r&&(m&&0<se.deltaX&&m(se),y&&se.deltaX<0&&y(se),w&&w(se),k&&se.deltaX<0!=le<0&&k(se),le=se.deltaX,me[0]=me[1]=me[2]=0),n&&(_&&0<se.deltaY&&_(se),x&&se.deltaY<0&&x(se),S&&S(se),E&&se.deltaY<0!=ce<0&&E(se),ce=se.deltaY,ye[0]=ye[1]=ye[2]=0),(ne||re)&&(I&&I(se),re&&(p&&1===re&&p(se),h&&h(se),re=0),ne=!1),oe&&!(oe=!1)&&Z&&Z(se),ie&&(U(se),ie=!1),ee=0}function mf(e,t,r){me[r]+=e,ye[r]+=t,se._vx.update(e),se._vy.update(t),n?ee=ee||requestAnimationFrame(lf):lf()}function nf(e,t){$&&!ae&&(se.axis=ae=Math.abs(e)>Math.abs(t)?"x":"y",oe=!0),"y"!==ae&&(me[2]+=e,se._vx.update(e,!0)),"x"!==ae&&(ye[2]+=t,se._vy.update(t,!0)),n?ee=ee||requestAnimationFrame(lf):lf()}function of(e){if(!jf(e,1)){var t=(e=N(e,s)).clientX,r=e.clientY,n=t-se.x,i=r-se.y,o=se.isDragging;se.x=t,se.y=r,(o||(n||i)&&(Math.abs(se.startX-t)>=a||Math.abs(se.startY-r)>=a))&&(re=re||(o?2:1),o||(se.isDragging=!0),nf(n,i))}}function rf(e){return e.touches&&1<e.touches.length&&(se.isGesturing=!0)&&X(e,se.isDragging)}function sf(){return(se.isGesturing=!1)||q(se)}function tf(e){if(!jf(e)){var t=fe(),r=de();mf((t-pe)*G,(r-ge)*G,1),pe=t,ge=r,l&&te.restart(!0)}}function uf(e){if(!jf(e)){e=N(e,s),U&&(ie=!0);var t=(1===e.deltaMode?r:2===e.deltaMode?Ce.innerHeight:1)*f;mf(e.deltaX*t,e.deltaY*t,0),l&&!Y&&te.restart(!0)}}function vf(e){if(!jf(e)){var t=e.clientX,r=e.clientY,n=t-se.x,i=r-se.y;se.x=t,se.y=r,ne=!0,l&&te.restart(!0),(n||i)&&nf(n,i)}}function wf(e){se.event=e,R(se)}function xf(e){se.event=e,D(se)}function yf(e){return jf(e)||N(e,s)&&V(se)}this.target=o=J(o)||Me,this.vars=e,u=u&&Se.utils.toArray(u),i=i||1e-9,a=a||0,f=f||1,G=G||1,t=t||"wheel,touch,pointer",n=!1!==n,r=r||parseFloat(Ce.getComputedStyle(Ee).lineHeight)||22;var ee,te,re,ne,ie,oe,ae,se=this,le=0,ce=0,ue=e.passive||!s&&!1!==e.passive,fe=L(o,Ne),de=L(o,Xe),pe=fe(),ge=de(),he=~t.indexOf("touch")&&!~t.indexOf("pointer")&&"pointerdown"===De[0],ve=A(o),be=o.ownerDocument||ke,me=[0,0,0],ye=[0,0,0],xe=0,_e=se.onPress=function(e){jf(e,1)||e&&e.button||(se.axis=ae=null,te.pause(),se.isPressed=!0,e=N(e),le=ce=0,se.startX=se.x=e.clientX,se.startY=se.y=e.clientY,se._vx.reset(),se._vy.reset(),B(Y?o:be,De[1],of,ue,!0),se.deltaX=se.deltaY=0,v&&v(se))},we=se.onRelease=function(t){if(!jf(t,1)){C(Y?o:be,De[1],of,!0);var e=!isNaN(se.y-se.startY),r=se.isDragging,n=r&&(3<Math.abs(se.x-se.startX)||3<Math.abs(se.y-se.startY)),i=N(t);!n&&e&&(se._vx.reset(),se._vy.reset(),s&&j&&Se.delayedCall(.08,function(){if(300<Ye()-xe&&!t.defaultPrevented)if(t.target.click)t.target.click();else if(be.createEvent){var e=be.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,Ce,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),t.target.dispatchEvent(e)}})),se.isDragging=se.isGesturing=se.isPressed=!1,l&&r&&!Y&&te.restart(!0),re&&lf(),g&&r&&g(se),b&&b(se,n)}};te=se._dc=Se.delayedCall(c||.25,function onStopFunc(){se._vx.reset(),se._vy.reset(),te.pause(),l&&l(se)}).pause(),se.deltaX=se.deltaY=0,se._vx=M(0,50,!0),se._vy=M(0,50,!0),se.scrollX=fe,se.scrollY=de,se.isDragging=se.isGesturing=se.isPressed=!1,Ie(this),se.enable=function(e){return se.isEnabled||(B(ve?be:o,"scroll",F),0<=t.indexOf("scroll")&&B(ve?be:o,"scroll",tf,ue,K),0<=t.indexOf("wheel")&&B(o,"wheel",uf,ue,K),(0<=t.indexOf("touch")&&Pe||0<=t.indexOf("pointer"))&&(B(o,De[0],_e,ue,K),B(be,De[2],we),B(be,De[3],we),j&&B(o,"click",hf,!0,!0),V&&B(o,"click",yf),X&&B(be,"gesturestart",rf),q&&B(be,"gestureend",sf),R&&B(o,Oe+"enter",wf),D&&B(o,Oe+"leave",xf),I&&B(o,Oe+"move",vf)),se.isEnabled=!0,se.isDragging=se.isGesturing=se.isPressed=ne=re=!1,se._vx.reset(),se._vy.reset(),pe=fe(),ge=de(),e&&e.type&&_e(e),H&&H(se)),se},se.disable=function(){se.isEnabled&&(Be.filter(function(e){return e!==se&&A(e.target)}).length||C(ve?be:o,"scroll",F),se.isPressed&&(se._vx.reset(),se._vy.reset(),C(Y?o:be,De[1],of,!0)),C(ve?be:o,"scroll",tf,K),C(o,"wheel",uf,K),C(o,De[0],_e,K),C(be,De[2],we),C(be,De[3],we),C(o,"click",hf,!0),C(o,"click",yf),C(be,"gesturestart",rf),C(be,"gestureend",sf),C(o,Oe+"enter",wf),C(o,Oe+"leave",xf),C(o,Oe+"move",vf),se.isEnabled=se.isPressed=se.isDragging=!1,W&&W(se))},se.kill=se.revert=function(){se.disable();var e=Be.indexOf(se);0<=e&&Be.splice(e,1),Re===se&&(Re=0)},Be.push(se),Y&&A(o)&&(Re=se),se.enable(d)},function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}(Observer,[{key:"velocityX",get:function get(){return this._vx.getVelocity()}},{key:"velocityY",get:function get(){return this._vy.getVelocity()}}]),Observer);function Observer(e){this.init(e)}k.version="3.14.2",k.create=function(e){return new k(e)},k.register=Q,k.getAll=function(){return Be.slice()},k.getById=function(t){return Be.filter(function(e){return e.vars.id===t})[0]},r()&&Se.registerPlugin(k);function Da(e,t,r){var n=ct(e)&&("clamp("===e.substr(0,6)||-1<e.indexOf("max"));return(r["_"+t+"Clamp"]=n)?e.substr(6,e.length-7):e}function Ea(e,t){return!t||ct(e)&&"clamp("===e.substr(0,6)?e:"clamp("+e+")"}function Ga(){return je=1}function Ha(){return je=0}function Ia(e){return e}function Ja(e){return Math.round(1e5*e)/1e5||0}function Ka(){return"undefined"!=typeof window}function La(){return qe||Ka()&&(qe=window.gsap)&&qe.registerPlugin&&qe}function Ma(e){return!!~l.indexOf(e)}function Na(e){return("Height"===e?S:Fe["inner"+e])||He["client"+e]||We["client"+e]}function Oa(e){return z(e,"getBoundingClientRect")||(Ma(e)?function(){return Ot.width=Fe.innerWidth,Ot.height=S,Ot}:function(){return _t(e)})}function Ra(e,t){var r=t.s,n=t.d2,i=t.d,o=t.a;return Math.max(0,(r="scroll"+n)&&(o=z(e,r))?o()-Oa(e)()[i]:Ma(e)?(He[r]||We[r])-Na(n):e[r]-e["offset"+n])}function Sa(e,t){for(var r=0;r<g.length;r+=3)t&&!~t.indexOf(g[r+1])||e(g[r],g[r+1],g[r+2])}function Ua(e){return"function"==typeof e}function Va(e){return"number"==typeof e}function Wa(e){return"object"==typeof e}function Xa(e,t,r){return e&&e.progress(t?0:1)&&r&&e.pause()}function Ya(e,t){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e)}):t(e);r&&r.totalTime&&(e.callbackAnimation=r)}}function nb(e){return Fe.getComputedStyle(e)}function pb(e,t){for(var r in t)r in e||(e[r]=t[r]);return e}function rb(e,t){var r=t.d2;return e["offset"+r]||e["client"+r]||0}function sb(e){var t,r=[],n=e.labels,i=e.duration();for(t in n)r.push(n[t]/i);return r}function ub(i){var o=qe.utils.snap(i),a=Array.isArray(i)&&i.slice(0).sort(function(e,t){return e-t});return a?function(e,t,r){var n;if(void 0===r&&(r=.001),!t)return o(e);if(0<t){for(e-=r,n=0;n<a.length;n++)if(a[n]>=e)return a[n];return a[n-1]}for(n=a.length,e+=r;n--;)if(a[n]<=e)return a[n];return a[0]}:function(e,t,r){void 0===r&&(r=.001);var n=o(e);return!t||Math.abs(n-e)<r||n-e<0==t<0?n:o(t<0?e-i:e+i)}}function wb(t,r,e,n){return e.split(",").forEach(function(e){return t(r,e,n)})}function xb(e,t,r,n,i){return e.addEventListener(t,r,{passive:!n,capture:!!i})}function yb(e,t,r,n){return e.removeEventListener(t,r,!!n)}function zb(e,t,r){(r=r&&r.wheelHandler)&&(e(t,"wheel",r),e(t,"touchmove",r))}function Db(e,t){if(ct(e)){var r=e.indexOf("="),n=~r?(e.charAt(r-1)+1)*parseFloat(e.substr(r+1)):0;~r&&(e.indexOf("%")>r&&(n*=t/100),e=e.substr(0,r-1)),e=n+(e in q?q[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e}function Eb(e,t,r,n,i,o,a,s){var l=i.startColor,c=i.endColor,u=i.fontSize,f=i.indent,d=i.fontWeight,p=Ue.createElement("div"),g=Ma(r)||"fixed"===z(r,"pinType"),h=-1!==e.indexOf("scroller"),v=g?We:r,b=-1!==e.indexOf("start"),m=b?l:c,y="border-color:"+m+";font-size:"+u+";color:"+m+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((h||s)&&g?"fixed;":"absolute;"),!h&&!s&&g||(y+=(n===Xe?I:Y)+":"+(o+parseFloat(f))+"px;"),a&&(y+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),p._isStart=b,p.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),p.style.cssText=y,p.innerText=t||0===t?e+"-"+t:e,v.children[0]?v.insertBefore(p,v.children[0]):v.appendChild(p),p._offset=p["offset"+n.op.d2],U(p,0,n,b),p}function Jb(){return 34<at()-st&&(R=R||requestAnimationFrame($))}function Kb(){v&&v.isPressed&&!(v.startX>We.clientWidth)||(ze.cache++,v?R=R||requestAnimationFrame($):$(),st||V("scrollStart"),st=at())}function Lb(){y=Fe.innerWidth,m=Fe.innerHeight}function Mb(e){ze.cache++,!0!==e&&(Ke||h||Ue.fullscreenElement||Ue.webkitFullscreenElement||b&&y===Fe.innerWidth&&!(Math.abs(Fe.innerHeight-m)>.25*Fe.innerHeight))||c.restart(!0)}function Pb(){return yb(ne,"scrollEnd",Pb)||Mt(!0)}function Sb(e){for(var t=0;t<K.length;t+=5)(!e||K[t+4]&&K[t+4].query===e)&&(K[t].style.cssText=K[t+1],K[t].getBBox&&K[t].setAttribute("transform",K[t+2]||""),K[t+3].uncache=1)}function Tb(){return ze.forEach(function(e){return Ua(e)&&++e.cacheID&&(e.rec=e())})}function Ub(e,t){var r;for($e=0;$e<Tt.length;$e++)!(r=Tt[$e])||t&&r._ctx!==t||(e?r.kill(1):r.revert(!0,!0));T=!0,t&&Sb(t),t||V("revert")}function Vb(e,t){ze.cache++,!t&&rt||ze.forEach(function(e){return Ua(e)&&e.cacheID++&&(e.rec=0)}),ct(e)&&(Fe.history.scrollRestoration=_=e)}function $b(){We.appendChild(w),S=!v&&w.offsetHeight||Fe.innerHeight,We.removeChild(w)}function _b(t){return Ve(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})}function ic(e,t,r,n){if(!e._gsap.swappedIn){for(var i,o=Z.length,a=t.style,s=e.style;o--;)a[i=Z[o]]=r[i];a.position="absolute"===r.position?"absolute":"relative","inline"===r.display&&(a.display="inline-block"),s[Y]=s[I]="auto",a.flexBasis=r.flexBasis||"auto",a.overflow="visible",a.boxSizing="border-box",a[ft]=rb(e,Ne)+xt,a[dt]=rb(e,Xe)+xt,a[bt]=s[mt]=s.top=s.left="0",Pt(n),s[ft]=s.maxWidth=r[ft],s[dt]=s.maxHeight=r[dt],s[bt]=r[bt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}}function lc(e){for(var t=ee.length,r=e.style,n=[],i=0;i<t;i++)n.push(ee[i],r[ee[i]]);return n.t=e,n}function oc(e,t,r,n,i,o,a,s,l,c,u,f,d,p){Ua(e)&&(e=e(s)),ct(e)&&"max"===e.substr(0,3)&&(e=f+("="===e.charAt(4)?Db("0"+e.substr(3),r):0));var g,h,v,b=d?d.time():0;if(d&&d.seek(0),isNaN(e)||(e=+e),Va(e))d&&(e=qe.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,e)),a&&U(a,r,n,!0);else{Ua(t)&&(t=t(s));var m,y,x,_,w=(e||"0").split(" ");v=J(t,s)||We,(m=_t(v)||{})&&(m.left||m.top)||"none"!==nb(v).display||(_=v.style.display,v.style.display="block",m=_t(v),_?v.style.display=_:v.style.removeProperty("display")),y=Db(w[0],m[n.d]),x=Db(w[1]||"0",r),e=m[n.p]-l[n.p]-c+y+i-x,a&&U(a,x,n,r-x<20||a._isStart&&20<x),r-=r-x}if(p&&(s[p]=e||-.001,e<0&&(e=0)),o){var S=e+r,T=o._isStart;g="scroll"+n.d2,U(o,S,n,T&&20<S||!T&&(u?Math.max(We[g],He[g]):o.parentNode[g])<=S+1),u&&(l=_t(a),u&&(o.style[n.op.p]=l[n.op.p]-n.op.m-o._offset+xt))}return d&&v&&(g=_t(v),d.seek(f),h=_t(v),d._caScrollDist=g[n.p]-h[n.p],e=e/d._caScrollDist*f),d&&d.seek(b),d?e:Math.round(e)}function qc(e,t,r,n){if(e.parentNode!==t){var i,o,a=e.style;if(t===We){for(i in e._stOrig=a.cssText,o=nb(e))+i||re.test(i)||!o[i]||"string"!=typeof a[i]||"0"===i||(a[i]=o[i]);a.top=r,a.left=n}else a.cssText=e._stOrig;qe.core.getCache(e).uncache=1,t.appendChild(e)}}function rc(r,e,n){var i=e,o=i;return function(e){var t=Math.round(r());return t!==i&&t!==o&&3<Math.abs(t-i)&&3<Math.abs(t-o)&&(e=t,n&&n()),o=i,i=Math.round(e)}}function sc(e,t,r){var n={};n[t.p]="+="+r,qe.set(e,n)}function tc(c,e){function Ik(e,t,r,n,i){var o=Ik.tween,a=t.onComplete,s={};r=r||u();var l=rc(u,r,function(){o.kill(),Ik.tween=0});return i=n&&i||0,n=n||e-r,o&&o.kill(),t[f]=e,t.inherit=!1,(t.modifiers=s)[f]=function(){return l(r+n*o.ratio+i*o.ratio*o.ratio)},t.onUpdate=function(){ze.cache++,Ik.tween&&$()},t.onComplete=function(){Ik.tween=0,a&&a.call(o)},o=Ik.tween=qe.to(c,t)}var u=L(c,e),f="_scroll"+e.p2;return(c[f]=u).wheelHandler=function(){return Ik.tween&&Ik.tween.kill()&&(Ik.tween=0)},xb(c,"wheel",u.wheelHandler),ne.isTouch&&xb(c,"touchmove",u.wheelHandler),Ik}var qe,s,Fe,Ue,He,We,l,c,Ve,Je,Ge,u,Ke,je,f,$e,d,p,g,Qe,Ze,h,v,b,m,y,E,x,_,w,S,T,et,tt,R,rt,nt,it,ot=1,at=Date.now,D=at(),st=0,lt=0,ct=function _isString(e){return"string"==typeof e},ut=Math.abs,I="right",Y="bottom",ft="width",dt="height",pt="Right",gt="Left",ht="Top",vt="Bottom",bt="padding",mt="margin",yt="Width",X="Height",xt="px",_t=function _getBounds(e,t){var r=t&&"matrix(1, 0, 0, 1, 0, 0)"!==nb(e)[f]&&qe.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),n=e.getBoundingClientRect();return r&&r.progress(0).kill(),n},wt={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},St={toggleActions:"play",anticipatePin:0},q={top:0,left:0,center:.5,bottom:1,right:1},U=function _positionMarker(e,t,r,n){var i={display:"block"},o=r[n?"os2":"p2"],a=r[n?"p2":"os2"];e._isFlipped=n,i[r.a+"Percent"]=n?-100:0,i[r.a]=n?"1px":0,i["border"+o+yt]=1,i["border"+a+yt]=0,i[r.p]=t+"px",qe.set(e,i)},Tt=[],Ct={},H={},W=[],V=function _dispatch(e){return H[e]&&H[e].map(function(e){return e()})||W},K=[],kt=0,Mt=function _refreshAll(e,t){if(He=Ue.documentElement,We=Ue.body,l=[Fe,Ue,He,We],!st||e||T){$b(),rt=ne.isRefreshing=!0,T||Tb();var r=V("refreshInit");Qe&&ne.sort(),t||Ub(),ze.forEach(function(e){Ua(e)&&(e.smooth&&(e.target.style.scrollBehavior="auto"),e(0))}),Tt.slice(0).forEach(function(e){return e.refresh()}),T=!1,Tt.forEach(function(e){if(e._subPinOffset&&e.pin){var t=e.vars.horizontal?"offsetWidth":"offsetHeight",r=e.pin[t];e.revert(!0,1),e.adjustPinSpacing(e.pin[t]-r),e.refresh()}}),et=1,_b(!0),Tt.forEach(function(e){var t=Ra(e.scroller,e._dir),r="max"===e.vars.end||e._endClamp&&e.end>t,n=e._startClamp&&e.start>=t;(r||n)&&e.setPositions(n?t-1:e.start,r?Math.max(n?t:e.start+1,t):e.end,!0)}),_b(!1),et=0,r.forEach(function(e){return e&&e.render&&e.render(-1)}),ze.forEach(function(e){Ua(e)&&(e.smooth&&requestAnimationFrame(function(){return e.target.style.scrollBehavior="smooth"}),e.rec&&e(e.rec))}),Vb(_,1),c.pause(),kt++,$(rt=2),Tt.forEach(function(e){return Ua(e.vars.onRefresh)&&e.vars.onRefresh(e)}),rt=ne.isRefreshing=!1,V("refresh")}else xb(ne,"scrollEnd",Pb)},j=0,Et=1,$=function _updateAll(e){if(2===e||!rt&&!T){ne.isUpdating=!0,it&&it.update(0);var t=Tt.length,r=at(),n=50<=r-D,i=t&&Tt[0].scroll();if(Et=i<j?-1:1,rt||(j=i),n&&(st&&!je&&200<r-st&&(st=0,V("scrollEnd")),Ge=D,D=r),Et<0){for($e=t;0<$e--;)Tt[$e]&&Tt[$e].update(0,n);Et=1}else for($e=0;$e<t;$e++)Tt[$e]&&Tt[$e].update(0,n);ne.isUpdating=!1}R=0},Z=["left","top",Y,I,mt+vt,mt+pt,mt+ht,mt+gt,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ee=Z.concat([ft,dt,"boxSizing","max"+yt,"max"+X,"position",mt,bt,bt+ht,bt+pt,bt+vt,bt+gt]),te=/([A-Z])/g,Pt=function _setState(e){if(e){var t,r,n=e.t.style,i=e.length,o=0;for((e.t._gsap||qe.core.getCache(e.t)).uncache=1;o<i;o+=2)r=e[o+1],t=e[o],r?n[t]=r:n[t]&&n.removeProperty(t.replace(te,"-$1").toLowerCase())}},Ot={left:0,top:0},re=/(webkit|moz|length|cssText|inset)/i,ne=(ScrollTrigger.prototype.init=function init(P,O){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),lt){var A,n,p,R,D,I,B,Y,N,X,q,e,F,U,H,W,V,G,t,K,b,j,$,m,Q,y,Z,x,r,_,w,ee,i,g,te,re,ne,S,o,T=(P=pb(ct(P)||Va(P)||P.nodeType?{trigger:P}:P,St)).onUpdate,C=P.toggleClass,a=P.id,k=P.onToggle,ie=P.onRefresh,M=P.scrub,oe=P.trigger,ae=P.pin,se=P.pinSpacing,le=P.invalidateOnRefresh,E=P.anticipatePin,s=P.onScrubComplete,h=P.onSnapComplete,ce=P.once,ue=P.snap,fe=P.pinReparent,l=P.pinSpacer,de=P.containerAnimation,pe=P.fastScrollEnd,ge=P.preventOverlaps,he=P.horizontal||P.containerAnimation&&!1!==P.horizontal?Ne:Xe,ve=!M&&0!==M,be=J(P.scroller||Fe),c=qe.core.getCache(be),me=Ma(be),ye="fixed"===("pinType"in P?P.pinType:z(be,"pinType")||me&&"fixed"),xe=[P.onEnter,P.onLeave,P.onEnterBack,P.onLeaveBack],_e=ve&&P.toggleActions.split(" "),we="markers"in P?P.markers:St.markers,Se=me?0:parseFloat(nb(be)["border"+he.p2+yt])||0,Te=this,Ce=P.onRefreshInit&&function(){return P.onRefreshInit(Te)},ke=function _getSizeFunc(e,t,r){var n=r.d,i=r.d2,o=r.a;return(o=z(e,"getBoundingClientRect"))?function(){return o()[n]}:function(){return(t?Na(i):e["client"+i])||0}}(be,me,he),Me=function _getOffsetsFunc(e,t){return!t||~Le.indexOf(e)?Oa(e):function(){return Ot}}(be,me),Ee=0,Pe=0,Oe=0,Ae=L(be,he);if(Te._startClamp=Te._endClamp=!1,Te._dir=he,E*=45,Te.scroller=be,Te.scroll=de?de.time.bind(de):Ae,R=Ae(),Te.vars=P,O=O||P.animation,"refreshPriority"in P&&(Qe=1,-9999===P.refreshPriority&&(it=Te)),c.tweenScroll=c.tweenScroll||{top:tc(be,Xe),left:tc(be,Ne)},Te.tweenTo=A=c.tweenScroll[he.p],Te.scrubDuration=function(e){(i=Va(e)&&e)?ee?ee.duration(e):ee=qe.to(O,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:i,paused:!0,onComplete:function onComplete(){return s&&s(Te)}}):(ee&&ee.progress(1).kill(),ee=0)},O&&(O.vars.lazy=!1,O._initted&&!Te.isReverted||!1!==O.vars.immediateRender&&!1!==P.immediateRender&&O.duration()&&O.render(0,!0,!0),Te.animation=O.pause(),(O.scrollTrigger=Te).scrubDuration(M),_=0,a=a||O.vars.id),ue&&(Wa(ue)&&!ue.push||(ue={snapTo:ue}),"scrollBehavior"in We.style&&qe.set(me?[We,He]:be,{scrollBehavior:"auto"}),ze.forEach(function(e){return Ua(e)&&e.target===(me?Ue.scrollingElement||He:be)&&(e.smooth=!1)}),p=Ua(ue.snapTo)?ue.snapTo:"labels"===ue.snapTo?function _getClosestLabel(t){return function(e){return qe.utils.snap(sb(t),e)}}(O):"labelsDirectional"===ue.snapTo?function _getLabelAtDirection(r){return function(e,t){return ub(sb(r))(e,t.direction)}}(O):!1!==ue.directional?function(e,t){return ub(ue.snapTo)(e,at()-Pe<500?0:t.direction)}:qe.utils.snap(ue.snapTo),g=ue.duration||{min:.1,max:2},g=Wa(g)?Je(g.min,g.max):Je(g,g),te=qe.delayedCall(ue.delay||i/2||.1,function(){var e=Ae(),t=at()-Pe<500,r=A.tween;if(!(t||Math.abs(Te.getVelocity())<10)||r||je||Ee===e)Te.isActive&&Ee!==e&&te.restart(!0);else{var n,i,o=(e-I)/U,a=O&&!ve?O.totalProgress():o,s=t?0:(a-w)/(at()-Ge)*1e3||0,l=qe.utils.clamp(-o,1-o,ut(s/2)*s/.185),c=o+(!1===ue.inertia?0:l),u=ue.onStart,f=ue.onInterrupt,d=ue.onComplete;if(n=p(c,Te),Va(n)||(n=c),i=Math.max(0,Math.round(I+n*U)),e<=B&&I<=e&&i!==e){if(r&&!r._initted&&r.data<=ut(i-e))return;!1===ue.inertia&&(l=n-o),A(i,{duration:g(ut(.185*Math.max(ut(c-a),ut(n-a))/s/.05||0)),ease:ue.ease||"power3",data:ut(i-e),onInterrupt:function onInterrupt(){return te.restart(!0)&&f&&f(Te)},onComplete:function onComplete(){Te.update(),Ee=Ae(),O&&!ve&&(ee?ee.resetTo("totalProgress",n,O._tTime/O._tDur):O.progress(n)),_=w=O&&!ve?O.totalProgress():Te.progress,h&&h(Te),d&&d(Te)}},e,l*U,i-e-l*U),u&&u(Te,A.tween)}}}).pause()),a&&(Ct[a]=Te),o=(o=(oe=Te.trigger=J(oe||!0!==ae&&ae))&&oe._gsap&&oe._gsap.stRevert)&&o(Te),ae=!0===ae?oe:J(ae),ct(C)&&(C={targets:oe,className:C}),ae&&(!1===se||se===mt||(se=!(!se&&ae.parentNode&&ae.parentNode.style&&"flex"===nb(ae.parentNode).display)&&bt),Te.pin=ae,(n=qe.core.getCache(ae)).spacer?H=n.pinState:(l&&((l=J(l))&&!l.nodeType&&(l=l.current||l.nativeElement),n.spacerIsNative=!!l,l&&(n.spacerState=lc(l))),n.spacer=G=l||Ue.createElement("div"),G.classList.add("pin-spacer"),a&&G.classList.add("pin-spacer-"+a),n.pinState=H=lc(ae)),!1!==P.force3D&&qe.set(ae,{force3D:!0}),Te.spacer=G=n.spacer,r=nb(ae),m=r[se+he.os2],K=qe.getProperty(ae),b=qe.quickSetter(ae,he.a,xt),ic(ae,G,r),V=lc(ae)),we){e=Wa(we)?pb(we,wt):wt,X=Eb("scroller-start",a,be,he,e,0),q=Eb("scroller-end",a,be,he,e,0,X),t=X["offset"+he.op.d2];var u=J(z(be,"content")||be);Y=this.markerStart=Eb("start",a,u,he,e,t,0,de),N=this.markerEnd=Eb("end",a,u,he,e,t,0,de),de&&(S=qe.quickSetter([Y,N],he.a,xt)),ye||Le.length&&!0===z(be,"fixedMarkers")||(function _makePositionable(e){var t=nb(e).position;e.style.position="absolute"===t||"fixed"===t?t:"relative"}(me?We:be),qe.set([X,q],{force3D:!0}),y=qe.quickSetter(X,he.a,xt),x=qe.quickSetter(q,he.a,xt))}if(de){var f=de.vars.onUpdate,d=de.vars.onUpdateParams;de.eventCallback("onUpdate",function(){Te.update(0,0,1),f&&f.apply(de,d||[])})}if(Te.previous=function(){return Tt[Tt.indexOf(Te)-1]},Te.next=function(){return Tt[Tt.indexOf(Te)+1]},Te.revert=function(e,t){if(!t)return Te.kill(!0);var r=!1!==e||!Te.enabled,n=Ke;r!==Te.isReverted&&(r&&(re=Math.max(Ae(),Te.scroll.rec||0),Oe=Te.progress,ne=O&&O.progress()),Y&&[Y,N,X,q].forEach(function(e){return e.style.display=r?"none":"block"}),r&&(Ke=Te).update(r),!ae||fe&&Te.isActive||(r?function _swapPinOut(e,t,r){Pt(r);var n=e._gsap;if(n.spacerIsNative)Pt(n.spacerState);else if(e._gsap.swappedIn){var i=t.parentNode;i&&(i.insertBefore(e,t),i.removeChild(t))}e._gsap.swappedIn=!1}(ae,G,H):ic(ae,G,nb(ae),Q)),r||Te.update(r),Ke=n,Te.isReverted=r)},Te.refresh=function(e,t,r,n){if(!Ke&&Te.enabled||t)if(ae&&e&&st)xb(ScrollTrigger,"scrollEnd",Pb);else{!rt&&Ce&&Ce(Te),Ke=Te,A.tween&&!r&&(A.tween.kill(),A.tween=0),ee&&ee.pause(),le&&O&&(O.revert({kill:!1}).invalidate(),O.getChildren?O.getChildren(!0,!0,!1).forEach(function(e){return e.vars.immediateRender&&e.render(0,!0,!0)}):O.vars.immediateRender&&O.render(0,!0,!0)),Te.isReverted||Te.revert(!0,!0),Te._subPinOffset=!1;var i,o,a,s,l,c,u,f,d,p,g,h,v,b=ke(),m=Me(),y=de?de.duration():Ra(be,he),x=U<=.01||!U,_=0,w=n||0,S=Wa(r)?r.end:P.end,T=P.endTrigger||oe,C=Wa(r)?r.start:P.start||(0!==P.start&&oe?ae?"0 0":"0 100%":0),k=Te.pinnedContainer=P.pinnedContainer&&J(P.pinnedContainer,Te),M=oe&&Math.max(0,Tt.indexOf(Te))||0,E=M;for(we&&Wa(r)&&(h=qe.getProperty(X,he.p),v=qe.getProperty(q,he.p));0<E--;)(c=Tt[E]).end||c.refresh(0,1)||(Ke=Te),!(u=c.pin)||u!==oe&&u!==ae&&u!==k||c.isReverted||((p=p||[]).unshift(c),c.revert(!0,!0)),c!==Tt[E]&&(M--,E--);for(Ua(C)&&(C=C(Te)),C=Da(C,"start",Te),I=oc(C,oe,b,he,Ae(),Y,X,Te,m,Se,ye,y,de,Te._startClamp&&"_startClamp")||(ae?-.001:0),Ua(S)&&(S=S(Te)),ct(S)&&!S.indexOf("+=")&&(~S.indexOf(" ")?S=(ct(C)?C.split(" ")[0]:"")+S:(_=Db(S.substr(2),b),S=ct(C)?C:(de?qe.utils.mapRange(0,de.duration(),de.scrollTrigger.start,de.scrollTrigger.end,I):I)+_,T=oe)),S=Da(S,"end",Te),B=Math.max(I,oc(S||(T?"100% 0":y),T,b,he,Ae()+_,N,q,Te,m,Se,ye,y,de,Te._endClamp&&"_endClamp"))||-.001,_=0,E=M;E--;)(u=(c=Tt[E]||{}).pin)&&c.start-c._pinPush<=I&&!de&&0<c.end&&(i=c.end-(Te._startClamp?Math.max(0,c.start):c.start),(u===oe&&c.start-c._pinPush<I||u===k)&&isNaN(C)&&(_+=i*(1-c.progress)),u===ae&&(w+=i));if(I+=_,B+=_,Te._startClamp&&(Te._startClamp+=_),Te._endClamp&&!rt&&(Te._endClamp=B||-.001,B=Math.min(B,Ra(be,he))),U=B-I||(I-=.01)&&.001,x&&(Oe=qe.utils.clamp(0,1,qe.utils.normalize(I,B,re))),Te._pinPush=w,Y&&_&&((i={})[he.a]="+="+_,k&&(i[he.p]="-="+Ae()),qe.set([Y,N],i)),!ae||et&&Te.end>=Ra(be,he)){if(oe&&Ae()&&!de)for(o=oe.parentNode;o&&o!==We;)o._pinOffset&&(I-=o._pinOffset,B-=o._pinOffset),o=o.parentNode}else i=nb(ae),s=he===Xe,a=Ae(),j=parseFloat(K(he.a))+w,!y&&1<B&&(g={style:g=(me?Ue.scrollingElement||He:be).style,value:g["overflow"+he.a.toUpperCase()]},me&&"scroll"!==nb(We)["overflow"+he.a.toUpperCase()]&&(g.style["overflow"+he.a.toUpperCase()]="scroll")),ic(ae,G,i),V=lc(ae),o=_t(ae,!0),f=ye&&L(be,s?Ne:Xe)(),se?((Q=[se+he.os2,U+w+xt]).t=G,(E=se===bt?rb(ae,he)+U+w:0)&&(Q.push(he.d,E+xt),"auto"!==G.style.flexBasis&&(G.style.flexBasis=E+xt)),Pt(Q),k&&Tt.forEach(function(e){e.pin===k&&!1!==e.vars.pinSpacing&&(e._subPinOffset=!0)}),ye&&Ae(re)):(E=rb(ae,he))&&"auto"!==G.style.flexBasis&&(G.style.flexBasis=E+xt),ye&&((l={top:o.top+(s?a-I:f)+xt,left:o.left+(s?f:a-I)+xt,boxSizing:"border-box",position:"fixed"})[ft]=l.maxWidth=Math.ceil(o.width)+xt,l[dt]=l.maxHeight=Math.ceil(o.height)+xt,l[mt]=l[mt+ht]=l[mt+pt]=l[mt+vt]=l[mt+gt]="0",l[bt]=i[bt],l[bt+ht]=i[bt+ht],l[bt+pt]=i[bt+pt],l[bt+vt]=i[bt+vt],l[bt+gt]=i[bt+gt],W=function _copyState(e,t,r){for(var n,i=[],o=e.length,a=r?8:0;a<o;a+=2)n=e[a],i.push(n,n in t?t[n]:e[a+1]);return i.t=e.t,i}(H,l,fe),rt&&Ae(0)),O?(d=O._initted,Ze(1),O.render(O.duration(),!0,!0),$=K(he.a)-j+U+w,Z=1<Math.abs(U-$),ye&&Z&&W.splice(W.length-2,2),O.render(0,!0,!0),d||O.invalidate(!0),O.parent||O.totalTime(O.totalTime()),Ze(0)):$=U,g&&(g.value?g.style["overflow"+he.a.toUpperCase()]=g.value:g.style.removeProperty("overflow-"+he.a));p&&p.forEach(function(e){return e.revert(!1,!0)}),Te.start=I,Te.end=B,R=D=rt?re:Ae(),de||rt||(R<re&&Ae(re),Te.scroll.rec=0),Te.revert(!1,!0),Pe=at(),te&&(Ee=-1,te.restart(!0)),Ke=0,O&&ve&&(O._initted||ne)&&O.progress()!==ne&&O.progress(ne||0,!0).render(O.time(),!0,!0),(x||Oe!==Te.progress||de||le||O&&!O._initted)&&(O&&!ve&&(O._initted||Oe||!1!==O.vars.immediateRender)&&O.totalProgress(de&&I<-.001&&!Oe?qe.utils.normalize(I,B,0):Oe,!0),Te.progress=x||(R-I)/U===Oe?0:Oe),ae&&se&&(G._pinOffset=Math.round(Te.progress*$)),ee&&ee.invalidate(),isNaN(h)||(h-=qe.getProperty(X,he.p),v-=qe.getProperty(q,he.p),sc(X,he,h),sc(Y,he,h-(n||0)),sc(q,he,v),sc(N,he,v-(n||0))),x&&!rt&&Te.update(),!ie||rt||F||(F=!0,ie(Te),F=!1)}},Te.getVelocity=function(){return(Ae()-D)/(at()-Ge)*1e3||0},Te.endAnimation=function(){Xa(Te.callbackAnimation),O&&(ee?ee.progress(1):O.paused()?ve||Xa(O,Te.direction<0,1):Xa(O,O.reversed()))},Te.labelToScroll=function(e){return O&&O.labels&&(I||Te.refresh()||I)+O.labels[e]/O.duration()*U||0},Te.getTrailing=function(t){var e=Tt.indexOf(Te),r=0<Te.direction?Tt.slice(0,e).reverse():Tt.slice(e+1);return(ct(t)?r.filter(function(e){return e.vars.preventOverlaps===t}):r).filter(function(e){return 0<Te.direction?e.end<=I:e.start>=B})},Te.update=function(e,t,r){if(!de||r||e){var n,i,o,a,s,l,c,u=!0===rt?re:Te.scroll(),f=e?0:(u-I)/U,d=f<0?0:1<f?1:f||0,p=Te.progress;if(t&&(D=R,R=de?Ae():u,ue&&(w=_,_=O&&!ve?O.totalProgress():d)),E&&ae&&!Ke&&!ot&&st&&(!d&&I<u+(u-D)/(at()-Ge)*E?d=1e-4:1===d&&B>u+(u-D)/(at()-Ge)*E&&(d=.9999)),d!==p&&Te.enabled){if(a=(s=(n=Te.isActive=!!d&&d<1)!=(!!p&&p<1))||!!d!=!!p,Te.direction=p<d?1:-1,Te.progress=d,a&&!Ke&&(i=d&&!p?0:1===d?1:1===p?2:3,ve&&(o=!s&&"none"!==_e[i+1]&&_e[i+1]||_e[i],c=O&&("complete"===o||"reset"===o||o in O))),ge&&(s||c)&&(c||M||!O)&&(Ua(ge)?ge(Te):Te.getTrailing(ge).forEach(function(e){return e.endAnimation()})),ve||(!ee||Ke||ot?O&&O.totalProgress(d,!(!Ke||!Pe&&!e)):(ee._dp._time-ee._start!==ee._time&&ee.render(ee._dp._time-ee._start),ee.resetTo?ee.resetTo("totalProgress",d,O._tTime/O._tDur):(ee.vars.totalProgress=d,ee.invalidate().restart()))),ae)if(e&&se&&(G.style[se+he.os2]=m),ye){if(a){if(l=!e&&p<d&&u<B+1&&u+1>=Ra(be,he),fe)if(e||!n&&!l)qc(ae,G);else{var g=_t(ae,!0),h=u-I;qc(ae,We,g.top+(he===Xe?h:0)+xt,g.left+(he===Xe?0:h)+xt)}Pt(n||l?W:V),Z&&d<1&&n||b(j+(1!==d||l?0:$))}}else b(Ja(j+$*d));!ue||A.tween||Ke||ot||te.restart(!0),C&&(s||ce&&d&&(d<1||!tt))&&Ve(C.targets).forEach(function(e){return e.classList[n||ce?"add":"remove"](C.className)}),!T||ve||e||T(Te),a&&!Ke?(ve&&(c&&("complete"===o?O.pause().totalProgress(1):"reset"===o?O.restart(!0).pause():"restart"===o?O.restart(!0):O[o]()),T&&T(Te)),!s&&tt||(k&&s&&Ya(Te,k),xe[i]&&Ya(Te,xe[i]),ce&&(1===d?Te.kill(!1,1):xe[i]=0),s||xe[i=1===d?1:3]&&Ya(Te,xe[i])),pe&&!n&&Math.abs(Te.getVelocity())>(Va(pe)?pe:2500)&&(Xa(Te.callbackAnimation),ee?ee.progress(1):Xa(O,"reverse"===o?1:!d,1))):ve&&T&&!Ke&&T(Te)}if(x){var v=de?u/de.duration()*(de._caScrollDist||0):u;y(v+(X._isFlipped?1:0)),x(v)}S&&S(-u/de.duration()*(de._caScrollDist||0))}},Te.enable=function(e,t){Te.enabled||(Te.enabled=!0,xb(be,"resize",Mb),me||xb(be,"scroll",Kb),Ce&&xb(ScrollTrigger,"refreshInit",Ce),!1!==e&&(Te.progress=Oe=0,R=D=Ee=Ae()),!1!==t&&Te.refresh())},Te.getTween=function(e){return e&&A?A.tween:ee},Te.setPositions=function(e,t,r,n){if(de){var i=de.scrollTrigger,o=de.duration(),a=i.end-i.start;e=i.start+a*e/o,t=i.start+a*t/o}Te.refresh(!1,!1,{start:Ea(e,r&&!!Te._startClamp),end:Ea(t,r&&!!Te._endClamp)},n),Te.update()},Te.adjustPinSpacing=function(e){if(Q&&e){var t=Q.indexOf(he.d)+1;Q[t]=parseFloat(Q[t])+e+xt,Q[1]=parseFloat(Q[1])+e+xt,Pt(Q)}},Te.disable=function(e,t){if(!1!==e&&Te.revert(!0,!0),Te.enabled&&(Te.enabled=Te.isActive=!1,t||ee&&ee.pause(),re=0,n&&(n.uncache=1),Ce&&yb(ScrollTrigger,"refreshInit",Ce),te&&(te.pause(),A.tween&&A.tween.kill()&&(A.tween=0)),!me)){for(var r=Tt.length;r--;)if(Tt[r].scroller===be&&Tt[r]!==Te)return;yb(be,"resize",Mb),me||yb(be,"scroll",Kb)}},Te.kill=function(e,t){Te.disable(e,t),ee&&!t&&ee.kill(),a&&delete Ct[a];var r=Tt.indexOf(Te);0<=r&&Tt.splice(r,1),r===$e&&0<Et&&$e--,r=0,Tt.forEach(function(e){return e.scroller===Te.scroller&&(r=1)}),r||rt||(Te.scroll.rec=0),O&&(O.scrollTrigger=null,e&&O.revert({kill:!1}),t||O.kill()),Y&&[Y,N,X,q].forEach(function(e){return e.parentNode&&e.parentNode.removeChild(e)}),it===Te&&(it=0),ae&&(n&&(n.uncache=1),r=0,Tt.forEach(function(e){return e.pin===ae&&r++}),r||(n.spacer=0)),P.onKill&&P.onKill(Te)},Tt.push(Te),Te.enable(!1,!1),o&&o(Te),O&&O.add&&!U){var v=Te.update;Te.update=function(){Te.update=v,ze.cache++,I||B||Te.refresh()},qe.delayedCall(.01,Te.update),U=.01,I=B=0}else Te.refresh();ae&&function _queueRefreshAll(){if(nt!==kt){var e=nt=kt;requestAnimationFrame(function(){return e===kt&&Mt(!0)})}}()}else this.update=this.refresh=this.kill=Ia},ScrollTrigger.register=function register(e){return s||(qe=e||La(),Ka()&&window.document&&ScrollTrigger.enable(),s=lt),s},ScrollTrigger.defaults=function defaults(e){if(e)for(var t in e)St[t]=e[t];return St},ScrollTrigger.disable=function disable(t,r){lt=0,Tt.forEach(function(e){return e[r?"kill":"disable"](t)}),yb(Fe,"wheel",Kb),yb(Ue,"scroll",Kb),clearInterval(u),yb(Ue,"touchcancel",Ia),yb(We,"touchstart",Ia),wb(yb,Ue,"pointerdown,touchstart,mousedown",Ga),wb(yb,Ue,"pointerup,touchend,mouseup",Ha),c.kill(),Sa(yb);for(var e=0;e<ze.length;e+=3)zb(yb,ze[e],ze[e+1]),zb(yb,ze[e],ze[e+2])},ScrollTrigger.enable=function enable(){if(Fe=window,Ue=document,He=Ue.documentElement,We=Ue.body,qe&&(Ve=qe.utils.toArray,Je=qe.utils.clamp,x=qe.core.context||Ia,Ze=qe.core.suppressOverwrites||Ia,_=Fe.history.scrollRestoration||"auto",j=Fe.pageYOffset||0,qe.core.globals("ScrollTrigger",ScrollTrigger),We)){lt=1,(w=document.createElement("div")).style.height="100vh",w.style.position="absolute",$b(),function _rafBugFix(){return lt&&requestAnimationFrame(_rafBugFix)}(),k.register(qe),ScrollTrigger.isTouch=k.isTouch,E=k.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),b=1===k.isTouch,xb(Fe,"wheel",Kb),l=[Fe,Ue,He,We],qe.matchMedia?(ScrollTrigger.matchMedia=function(e){var t,r=qe.matchMedia();for(t in e)r.add(t,e[t]);return r},qe.addEventListener("matchMediaInit",function(){Tb(),Ub()}),qe.addEventListener("matchMediaRevert",function(){return Sb()}),qe.addEventListener("matchMedia",function(){Mt(0,1),V("matchMedia")}),qe.matchMedia().add("(orientation: portrait)",function(){return Lb(),Lb})):console.warn("Requires GSAP 3.11.0 or later"),Lb(),xb(Ue,"scroll",Kb);var e,t,r=We.hasAttribute("style"),n=We.style,i=n.borderTopStyle,o=qe.core.Animation.prototype;for(o.revert||Object.defineProperty(o,"revert",{value:function value(){return this.time(-.01,!0)}}),n.borderTopStyle="solid",e=_t(We),Xe.m=Math.round(e.top+Xe.sc())||0,Ne.m=Math.round(e.left+Ne.sc())||0,i?n.borderTopStyle=i:n.removeProperty("border-top-style"),r||(We.setAttribute("style",""),We.removeAttribute("style")),u=setInterval(Jb,250),qe.delayedCall(.5,function(){return ot=0}),xb(Ue,"touchcancel",Ia),xb(We,"touchstart",Ia),wb(xb,Ue,"pointerdown,touchstart,mousedown",Ga),wb(xb,Ue,"pointerup,touchend,mouseup",Ha),f=qe.utils.checkPrefix("transform"),ee.push(f),s=at(),c=qe.delayedCall(.2,Mt).pause(),g=[Ue,"visibilitychange",function(){var e=Fe.innerWidth,t=Fe.innerHeight;Ue.hidden?(d=e,p=t):d===e&&p===t||Mb()},Ue,"DOMContentLoaded",Mt,Fe,"load",Mt,Fe,"resize",Mb],Sa(xb),Tt.forEach(function(e){return e.enable(0,1)}),t=0;t<ze.length;t+=3)zb(yb,ze[t],ze[t+1]),zb(yb,ze[t],ze[t+2])}},ScrollTrigger.config=function config(e){"limitCallbacks"in e&&(tt=!!e.limitCallbacks);var t=e.syncInterval;t&&clearInterval(u)||(u=t)&&setInterval(Jb,t),"ignoreMobileResize"in e&&(b=1===ScrollTrigger.isTouch&&e.ignoreMobileResize),"autoRefreshEvents"in e&&(Sa(yb)||Sa(xb,e.autoRefreshEvents||"none"),h=-1===(e.autoRefreshEvents+"").indexOf("resize"))},ScrollTrigger.scrollerProxy=function scrollerProxy(e,t){var r=J(e),n=ze.indexOf(r),i=Ma(r);~n&&ze.splice(n,i?6:2),t&&(i?Le.unshift(Fe,t,We,t,He,t):Le.unshift(r,t))},ScrollTrigger.clearMatchMedia=function clearMatchMedia(t){Tt.forEach(function(e){return e._ctx&&e._ctx.query===t&&e._ctx.kill(!0,!0)})},ScrollTrigger.isInViewport=function isInViewport(e,t,r){var n=(ct(e)?J(e):e).getBoundingClientRect(),i=n[r?ft:dt]*t||0;return r?0<n.right-i&&n.left+i<Fe.innerWidth:0<n.bottom-i&&n.top+i<Fe.innerHeight},ScrollTrigger.positionInViewport=function positionInViewport(e,t,r){ct(e)&&(e=J(e));var n=e.getBoundingClientRect(),i=n[r?ft:dt],o=null==t?i/2:t in q?q[t]*i:~t.indexOf("%")?parseFloat(t)*i/100:parseFloat(t)||0;return r?(n.left+o)/Fe.innerWidth:(n.top+o)/Fe.innerHeight},ScrollTrigger.killAll=function killAll(e){if(Tt.slice(0).forEach(function(e){return"ScrollSmoother"!==e.vars.id&&e.kill()}),!0!==e){var t=H.killAll||[];H={},t.forEach(function(e){return e()})}},ScrollTrigger);function ScrollTrigger(e,t){s||ScrollTrigger.register(qe)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),x(this),this.init(e,t)}ne.version="3.14.2",ne.saveStyles=function(e){return e?Ve(e).forEach(function(e){if(e&&e.style){var t=K.indexOf(e);0<=t&&K.splice(t,5),K.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),qe.core.getCache(e),x())}}):K},ne.revert=function(e,t){return Ub(!e,t)},ne.create=function(e,t){return new ne(e,t)},ne.refresh=function(e){return e?Mb(!0):(s||ne.register())&&Mt(!0)},ne.update=function(e){return++ze.cache&&$(!0===e?2:0)},ne.clearScrollMemory=Vb,ne.maxScroll=function(e,t){return Ra(e,t?Ne:Xe)},ne.getScrollFunc=function(e,t){return L(J(e),t?Ne:Xe)},ne.getById=function(e){return Ct[e]},ne.getAll=function(){return Tt.filter(function(e){return"ScrollSmoother"!==e.vars.id})},ne.isScrolling=function(){return!!st},ne.snapDirectional=ub,ne.addEventListener=function(e,t){var r=H[e]||(H[e]=[]);~r.indexOf(t)||r.push(t)},ne.removeEventListener=function(e,t){var r=H[e],n=r&&r.indexOf(t);0<=n&&r.splice(n,1)},ne.batch=function(e,t){function Kp(e,t){var r=[],n=[],i=qe.delayedCall(o,function(){t(r,n),r=[],n=[]}).pause();return function(e){r.length||i.restart(!0),r.push(e.trigger),n.push(e),a<=r.length&&i.progress(1)}}var r,n=[],i={},o=t.interval||.016,a=t.batchMax||1e9;for(r in t)i[r]="on"===r.substr(0,2)&&Ua(t[r])&&"onRefreshInit"!==r?Kp(0,t[r]):t[r];return Ua(a)&&(a=a(),xb(ne,"refresh",function(){return a=t.batchMax()})),Ve(e).forEach(function(e){var t={};for(r in i)t[r]=i[r];t.trigger=e,n.push(ne.create(t))}),n};function vc(e,t,r,n){return n<t?e(n):t<0&&e(0),n<r?(n-t)/(r-t):r<0?t/(t-r):1}function wc(e,t){!0===t?e.style.removeProperty("touch-action"):e.style.touchAction=!0===t?"auto":t?"pan-"+t+(k.isTouch?" pinch-zoom":""):"none",e===He&&wc(We,t)}function yc(e){var t,r=e.event,n=e.target,i=e.axis,o=(r.changedTouches?r.changedTouches[0]:r).target,a=o._gsap||qe.core.getCache(o),s=at();if(!a._isScrollT||2e3<s-a._isScrollT){for(;o&&o!==We&&(o.scrollHeight<=o.clientHeight&&o.scrollWidth<=o.clientWidth||!oe[(t=nb(o)).overflowY]&&!oe[t.overflowX]);)o=o.parentNode;a._isScroll=o&&o!==n&&!Ma(o)&&(oe[(t=nb(o)).overflowY]||oe[t.overflowX]),a._isScrollT=s}!a._isScroll&&"x"!==i||(r.stopPropagation(),r._gsapAllow=!0)}function zc(e,t,r,n){return k.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:n=n&&yc,onPress:n,onDrag:n,onScroll:n,onEnable:function onEnable(){return r&&xb(Ue,k.eventTypes[0],se,!1,!0)},onDisable:function onDisable(){return yb(Ue,k.eventTypes[0],se,!0)}})}function Dc(e){function Hq(){return i=!1}function Kq(){o=Ra(p,Xe),C=Je(E?1:0,o),f&&(T=Je(0,Ra(p,Ne))),l=kt}function Lq(){v._gsap.y=Ja(parseFloat(v._gsap.y)+b.offset)+"px",v.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(v._gsap.y)+", 0, 1)",b.offset=b.cacheID=0}function Rq(){Kq(),a.isActive()&&a.vars.scrollY>o&&(b()>o?a.progress(1)&&b(o):a.resetTo("scrollY",o))}Wa(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var n,o,l,i,a,c,u,s,f=e.normalizeScrollX,t=e.momentum,r=e.allowNestedScroll,d=e.onRelease,p=J(e.target)||He,g=qe.core.globals().ScrollSmoother,h=g&&g.get(),v=E&&(e.content&&J(e.content)||h&&!1!==e.content&&!h.smooth()&&h.content()),b=L(p,Xe),m=L(p,Ne),y=1,x=(k.isTouch&&Fe.visualViewport?Fe.visualViewport.scale*Fe.visualViewport.width:Fe.outerWidth)/Fe.innerWidth,_=0,w=Ua(t)?function(){return t(n)}:function(){return t||2.8},S=zc(p,e.type,!0,r),T=Ia,C=Ia;return v&&qe.set(v,{y:"+=0"}),e.ignoreCheck=function(e){return E&&"touchmove"===e.type&&function ignoreDrag(){if(i){requestAnimationFrame(Hq);var e=Ja(n.deltaY/2),t=C(b.v-e);if(v&&t!==b.v+b.offset){b.offset=t-b.v;var r=Ja((parseFloat(v&&v._gsap.y)||0)-b.offset);v.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+r+", 0, 1)",v._gsap.y=r+"px",b.cacheID=ze.cache,$()}return!0}b.offset&&Lq(),i=!0}()||1.05<y&&"touchstart"!==e.type||n.isGesturing||e.touches&&1<e.touches.length},e.onPress=function(){i=!1;var e=y;y=Ja((Fe.visualViewport&&Fe.visualViewport.scale||1)/x),a.pause(),e!==y&&wc(p,1.01<y||!f&&"x"),c=m(),u=b(),Kq(),l=kt},e.onRelease=e.onGestureStart=function(e,t){if(b.offset&&Lq(),t){ze.cache++;var r,n,i=w();f&&(n=(r=m())+.05*i*-e.velocityX/.227,i*=vc(m,r,n,Ra(p,Ne)),a.vars.scrollX=T(n)),n=(r=b())+.05*i*-e.velocityY/.227,i*=vc(b,r,n,Ra(p,Xe)),a.vars.scrollY=C(n),a.invalidate().duration(i).play(.01),(E&&a.vars.scrollY>=o||o-1<=r)&&qe.to({},{onUpdate:Rq,duration:i})}else s.restart(!0);d&&d(e)},e.onWheel=function(){a._ts&&a.pause(),1e3<at()-_&&(l=0,_=at())},e.onChange=function(e,t,r,n,i){if(kt!==l&&Kq(),t&&f&&m(T(n[2]===t?c+(e.startX-e.x):m()+t-n[1])),r){b.offset&&Lq();var o=i[2]===r,a=o?u+e.startY-e.y:b()+r-i[1],s=C(a);o&&a!==s&&(u+=s-a),b(s)}(r||t)&&$()},e.onEnable=function(){wc(p,!f&&"x"),ne.addEventListener("refresh",Rq),xb(Fe,"resize",Rq),b.smooth&&(b.target.style.scrollBehavior="auto",b.smooth=m.smooth=!1),S.enable()},e.onDisable=function(){wc(p,!0),yb(Fe,"resize",Rq),ne.removeEventListener("refresh",Rq),S.kill()},e.lockAxis=!1!==e.lockAxis,((n=new k(e)).iOS=E)&&!b()&&b(1),E&&qe.ticker.add(Ia),s=n._dc,a=qe.to(n,{ease:"power4",paused:!0,inherit:!1,scrollX:f?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:rc(b,b(),function(){return a.pause()})},onUpdate:$,onComplete:s.vars.onComplete}),n}var ie,oe={auto:1,scroll:1},ae=/(input|label|select|textarea)/i,se=function _captureInputs(e){var t=ae.test(e.target.tagName);(t||ie)&&(e._gsapAllow=!0,ie=t)};ne.sort=function(e){if(Ua(e))return Tt.sort(e);var t=Fe.pageYOffset||0;return ne.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+Fe.innerHeight}),Tt.sort(e||function(e,t){return-1e6*(e.vars.refreshPriority||0)+(e.vars.containerAnimation?1e6:e._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+-1e6*(t.vars.refreshPriority||0))})},ne.observe=function(e){return new k(e)},ne.normalizeScroll=function(e){if(void 0===e)return v;if(!0===e&&v)return v.enable();if(!1===e)return v&&v.kill(),void(v=e);var t=e instanceof k?e:Dc(e);return v&&v.target===t.target&&v.kill(),Ma(t.target)&&(v=t),t},ne.core={_getVelocityProp:M,_inputObserver:zc,_scrollers:ze,_proxies:Le,bridge:{ss:function ss(){st||V("scrollStart"),st=at()},ref:function ref(){return Ke}}},La()&&qe.registerPlugin(ne),e.ScrollTrigger=ne,e.default=ne;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});



/* ===== inline init: smooth-scroll wiring (Lenis ↔ ScrollTrigger) ===== */
(function bootSmoothScroll() {
  function tryInit() {
    if (typeof Lenis === 'undefined' || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return setTimeout(tryInit, 30);
    }
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;
  }
  tryInit();
})();

/* ===== inline init: gnav scroll state ===== */
(function bootNavScrollState() {
  function tryBind() {
    var gnav = document.getElementById('gnav');
    if (!gnav) return setTimeout(tryBind, 30);
    function updateNav(e) {
      var y = e ? e.scroll : window.scrollY;
      gnav.classList.toggle('gnav--scrolled', y > 40);
    }
    if (window.__lenis) {
      window.__lenis.on('scroll', updateNav);
    } else {
      window.addEventListener('scroll', function () { updateNav(); }, { passive: true });
    }
  }
  tryBind();
})();

/* ===== source: scripts/mega-nav.js ===== */
/* ============================================
   MEGA NAV — Products + Use Cases dropdown
   ============================================ */
(function () {
  'use strict';

  if (window.innerWidth < 768) return;

  var gnav  = document.getElementById('gnav');
  var panel = document.getElementById('megaNavPanel');
  var dim   = document.getElementById('megaNavDim');

  var triggerMap = {
    'products':     document.getElementById('gnavProducts'),
    'use-cases':    document.getElementById('gnavUseCases'),
    'solutions':    document.getElementById('gnavSolutions'),
    'learn-support': document.getElementById('gnavLearnSupport')
  };

  if (!gnav || !panel || !dim) return;
  if (!triggerMap.products || !triggerMap['use-cases'] ||
      !triggerMap.solutions || !triggerMap['learn-support']) return;

  var isOpen      = false;
  var activePane  = null;
  var heightTimer = null;

  /* ── Helpers ── */
  function setActiveLink(tab) {
    Object.keys(triggerMap).forEach(function (t) {
      triggerMap[t].classList.toggle('gnav-link--active', t === tab);
    });
  }

  function showPane(tab) {
    panel.querySelectorAll('.mnav-pane').forEach(function (p) {
      p.classList.toggle('mnav-pane--hidden', p.dataset.pane !== tab);
    });
  }

  /* ── Open ── */
  function openNav(tab) {
    if (isOpen) { switchPane(tab); return; }
    isOpen = true;
    activePane = tab;

    showPane(tab);
    gnav.classList.add('gnav--open');
    setActiveLink(tab);
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    dim.classList.add('is-visible');
  }

  /* ── Switch pane (panel already open) ── */
  function switchPane(tab) {
    if (activePane === tab) { closeNav(); return; }

    var oldPane = panel.querySelector('.mnav-pane[data-pane="' + activePane + '"]');
    var newPane = panel.querySelector('.mnav-pane[data-pane="' + tab + '"]');

    activePane = tab;
    setActiveLink(tab);

    /* Capture current height before any DOM changes */
    var oldH = panel.offsetHeight;

    /* Immediately hide old pane — only new pane will be in flow,
       so the height measurement below is accurate */
    oldPane.classList.add('mnav-pane--hidden');

    /* Show new pane immediately with no-delay class so CSS animations
       fire at 0s base — overlaps with the panel height transition */
    newPane.classList.remove('mnav-pane--hidden');
    newPane.classList.add('mnav-pane--switching');

    if (tab === 'products') {
      var activeCategory = newPane.querySelector('.mnav-category:not(.mnav-category--hidden)');
      if (activeCategory) {
        activeCategory.classList.add('mnav-category--switching');
        setTimeout(function () { activeCategory.classList.remove('mnav-category--switching'); }, 400);
      }
    }
    setTimeout(function () { newPane.classList.remove('mnav-pane--switching'); }, 400);

    /* Measure new pane's natural height.
       Write auto → read offsetHeight (forces reflow) → write oldH back.
       All synchronous so no visual jump — browser never paints between writes. */
    panel.style.height = 'auto';
    var newH = panel.offsetHeight;
    panel.style.height = oldH + 'px';

    /* Double RAF ensures oldH is committed as the transition start value
       before we change to newH */
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        panel.classList.add('is-height-transitioning');
        panel.style.height = newH + 'px';

        clearTimeout(heightTimer);
        heightTimer = setTimeout(function () {
          panel.classList.remove('is-height-transitioning');
          panel.style.height = '';
        }, 350);
      });
    });
  }

  /* ── Close ── */
  function closeNav() {
    if (!isOpen) return;
    isOpen = false;
    activePane = null;

    clearTimeout(heightTimer);
    panel.style.height = '';
    panel.classList.remove('is-height-transitioning');

    gnav.classList.remove('gnav--open');
    setActiveLink(null);
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    dim.classList.remove('is-visible');
  }

  /* ── Bind triggers ── */
  Object.keys(triggerMap).forEach(function (tab) {
    triggerMap[tab].addEventListener('click', function (e) {
      e.preventDefault();
      if (isOpen && activePane === tab) { closeNav(); return; }
      openNav(tab);
    });
  });

  /* ── Close on dim / Escape ── */
  dim.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) closeNav();
  });

  /* ── Filter switching (products pane only) ── */
  var filters    = panel.querySelectorAll('.mnav-filter[data-filter]');
  var categories = panel.querySelectorAll('.mnav-category');

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.dataset.filter;

      filters.forEach(function (f) { f.classList.remove('mnav-filter--active'); });
      btn.classList.add('mnav-filter--active');

      categories.forEach(function (cat) {
        var isTarget = cat.dataset.category === target;
        cat.classList.toggle('mnav-category--hidden', !isTarget);
        cat.classList.toggle('mnav-category--switching', isTarget);
      });
    });
  });

  /* ── Resize: close if below breakpoint ── */
  window.addEventListener('resize', function () {
    if (window.innerWidth < 768 && isOpen) closeNav();
  });

}());

/* ===== source: scripts/mobile-nav.js ===== */
/* ============================================
   MOBILE NAV — full-screen overlay (z:99)
   The gnav (z:100) stays on top at all times.
   gnav--nav-open class drives logo→X animation.
   ============================================ */
(function () {
  'use strict';

  var toggle    = document.getElementById('mobileNavToggle');
  var overlay   = document.getElementById('mobileNav');
  var gnav      = document.getElementById('gnav');

  if (!toggle || !overlay || !gnav) return;

  var mainScreen = overlay.querySelector('[data-screen="main"]');
  var isOpen     = false;

  /* ── Open ── */
  function open() {
    isOpen = true;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    gnav.classList.add('gnav--nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  /* ── Close ── */
  function close() {
    isOpen = false;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    gnav.classList.remove('gnav--nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    /* Reset to main screen after close animation completes */
    setTimeout(function () {
      overlay.querySelectorAll('.mnav-m-screen:not([data-screen="main"])').forEach(function (s) {
        s.classList.remove('is-active');
      });
      mainScreen.classList.remove('is-exited', 'is-menu-settled');
    }, 480);
  }

  /* Read --mnav-sub-delay once so JS and CSS stay in sync */
  var subDelay = parseFloat(getComputedStyle(overlay).getPropertyValue('--mnav-sub-delay')) * 1000 || 300;

  /* ── Navigate to sub-screen ── */
  overlay.querySelectorAll('.mnav-m-item[data-target]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sub = overlay.querySelector('[data-screen="' + btn.dataset.target + '"]');
      if (!sub) return;
      /* Start main items exiting, then reveal sub-screen after the delay
         so the exit is visible before the sub background covers the screen.
         Clear is-menu-settled first — it suppresses animations and would
         block the exit if the user is navigating forward a second time. */
      mainScreen.classList.remove('is-menu-settled');
      mainScreen.classList.add('is-exited');
      setTimeout(function () { sub.classList.add('is-active'); }, subDelay);
    });
  });

  /* ── Back to main — two-phase ──
     Phase 1: sub items exit right (sub still on top, main hidden behind)
     Phase 2: sub snaps away, main items animate in from left (now visible) ── */
  overlay.querySelectorAll('.mnav-m-back').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sub = btn.closest('[data-screen]');

      sub.classList.add('is-back-exiting');

      setTimeout(function () {
        /* Sub exit done — snap it off, reveal main */
        sub.classList.remove('is-active', 'is-back-exiting');
        mainScreen.classList.remove('is-exited');
        mainScreen.classList.add('is-back-entering');

        setTimeout(function () {
          /* Swap atomically: remove back-entering, add settled.
             Both happen before the next paint so the open animation
             never gets a chance to restart. */
          mainScreen.classList.remove('is-back-entering');
          mainScreen.classList.add('is-menu-settled');
        }, 380);
      }, 240);
    });
  });

  /* ── Toggle (hamburger / X) ── */
  toggle.addEventListener('click', function () {
    isOpen ? close() : open();
  });

  /* ── Escape key ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) close();
  });

  /* ── Filter pills (products sub-screen) ──
     Direct listeners on each button — matches desktop pattern and avoids iOS
     touch-event issues that occur with delegation inside backdrop-filter layers. ── */
  var filterPills    = overlay.querySelectorAll('.mnav-m-pill[data-filter]');
  var productLists   = overlay.querySelectorAll('.mnav-m-product-list[data-category]');
  var productsScreen = overlay.querySelector('[data-screen="products"]');
  var filterRow      = overlay.querySelector('.mnav-m-filters-row');

  filterPills.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.dataset.filter;
      filterPills.forEach(function (f) { f.classList.remove('mnav-m-pill--active'); });
      btn.classList.add('mnav-m-pill--active');
      productLists.forEach(function (cat) {
        if (cat.dataset.category === target) {
          cat.classList.remove('mnav-m-product-list--hidden');
          /* Animate cards in — restarts cleanly because the list was display:none */
          cat.querySelectorAll('.mnav-m-product-card, .mnav-m-all-products').forEach(function (card, i) {
            card.style.animation = 'mnav-card-in 0.15s ease backwards ' + (i * 0.04) + 's';
          });
        } else {
          cat.classList.add('mnav-m-product-list--hidden');
        }
      });
      /* Scroll the active pill so its left edge aligns with the card left (16px from screen edge) */
      if (filterRow) {
        filterRow.scrollTo({
          left: filterRow.scrollLeft + btn.getBoundingClientRect().left - filterRow.getBoundingClientRect().left - 16,
          behavior: 'smooth'
        });
      }
      if (productsScreen) productsScreen.scrollTop = 0;
    });
  });

  /* ── Close if resized to desktop ── */
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 768 && isOpen) close();
  });

}());

/* ===== source: scripts/hub-router.js ===== */
/* ============================================
   HERO HUB ROUTER — Elastic expand carousel
   Adapted from acom-home/scripts/hub-router.js
   Hover accordion is desktop-only (≥768px); on
   mobile the init/resize hook just clears any
   stale inline transform so mobile CSS can apply.
   Pointer events are enabled by hero-grid.js when
   scroll completes.
   ============================================ */
(function () {
  'use strict';

  /* Runs on both breakpoints so resize across 768px is handled. The per-function
     guards below make mobile a no-op (plus stale-style cleanup); desktop keeps
     the flex-accordion centring logic. */

  /* ── Configuration ── */
  var CARD_GAP       = 8;
  var CARD_W         = 291;            /* fixed card width (px) */
  var CARD_COUNT     = 4;
  var EXPAND_DELTA   = 200;          /* extra width when a card is active */

  /* ── DOM ── */
  var track = document.querySelector('.hhub-track');
  if (!track) return;

  var cards = Array.from(track.querySelectorAll('.hhub-card'));

  /* ── Compute translateX to re-centre the track ──
     card 0  -> left edge at grid margin
     card 3  -> right edge at (vw - grid margin)
     others  -> centre expanded track, clamped to margins
  ── */
  function computeTranslate(activeIndex) {
    var vw            = document.documentElement.clientWidth;
    var margin        = vw * 0.08333;
    var cardW         = CARD_W;
    var expandedW     = cardW + EXPAND_DELTA;
    var restSpan      = CARD_COUNT * cardW + (CARD_COUNT - 1) * CARD_GAP;
    var expandedSpan  = expandedW + (CARD_COUNT - 1) * cardW + (CARD_COUNT - 1) * CARD_GAP;

    if (activeIndex === null) {
      return (vw - restSpan) / 2;               /* centre rest track */
    }
    if (activeIndex === 0) {
      return margin;
    }
    if (activeIndex === CARD_COUNT - 1) {
      return (vw - margin) - expandedSpan;
    }
    var centered = (vw - expandedSpan) / 2;
    var maxTx    =  margin;
    var minTx    = (vw - margin) - expandedSpan;
    /* guard against collapsed clamp range on narrow viewports */
    if (minTx > maxTx) return centered;
    return Math.max(minTx, Math.min(maxTx, centered));
  }

  function applyTranslate(tx) {
    track.style.transform = 'translateX(' + tx + 'px)';
  }

  /* ── Hover state ── */
  var activeCard = null;

  function activate(card) {
    if (window.innerWidth < 768) return;             /* mobile uses a stacked layout — hover accordion is desktop-only */
    if (activeCard === card) return;
    if (activeCard) activeCard.classList.remove('hhub-card--active');
    activeCard = card;
    card.classList.add('hhub-card--active');
    applyTranslate(computeTranslate(parseInt(card.dataset.index, 10)));
  }

  function resetTrack() {
    if (window.innerWidth < 768) return;
    if (activeCard) activeCard.classList.remove('hhub-card--active');
    activeCard = null;
    applyTranslate(computeTranslate(null));
  }

  /* ── Bind events ── */
  cards.forEach(function (card) {
    card.addEventListener('mouseenter', function () { activate(card); });
  });

  /* Reset when cursor leaves the track itself (only as wide as the cards + gaps)
     rather than the hub-router container (full viewport width) — otherwise
     rolling off the side of a card leaves the active state stuck. */
  track.addEventListener('mouseleave', resetTrack);

  /* Track-transform centring (both initial-load and resize) is now owned by
     hero-grid.js's buildTimeline, dispatched by hero-breakpoint-orchestrator.js.
     This script used to register its own resize listener here — removed to
     end the three-way race between hub-router / hero-grid / hero-grid-mobile
     over .hhub-track's inline transform. See BUGLOG 2026-04-24 D→M→D entries.

     cleanupDesktop in hero-grid.js clears the track's inline transform and
     removes .hhub-card--active on D→M, so this module no longer needs its
     own D→M cleanup hook either.

     Expose resetTrack as __hhubReset for hero-grid.js's settle() to clear any
     active-card state after scroll completes. */
  window.__hhubReset = resetTrack;

}());

/* ===== source: scripts/hero-grid.js ===== */
/* ============================================
   HERO GRID ANIMATION
   GSAP ScrollTrigger scrub with onUpdate.
   Positions each image as part of a rising grid
   whose gaps shrink uniformly, then bottom images
   detach and settle into the carousel.
   ============================================ */
(function () {
  'use strict';

  /* We keep running the IIFE even on mobile so the resize listener still
     registers — otherwise a mobile→desktop drag would never trigger the
     desktop build. The initial buildTimeline() call near the bottom is
     what we gate on breakpoint. */

  gsap.registerPlugin(ScrollTrigger);
  /* Prevent ScrollTrigger's own resize-refresh from firing onUpdate mid-drag
     with stale closure values — our debounced handler rebuilds instead. */
  ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });

  /* ═══════════════════════════════════════════
     CONSTANTS
     ═══════════════════════════════════════════ */
  var FINAL_GAP     = 8;                               // px — converged gap (matches carousel)
  var CARD_W        = 291;                             // px — fixed carousel card width
  var MEDIA_PAD_X   = 0;                               // px — image fills media edge-to-edge (no inset)
  var MEDIA_PAD_B   = 0;                               // px — image fills media edge-to-edge (no inset)
  var IMG_RADIUS    = 16;                              // px — matches .hhub-card-img border-radius
  var COL_OFFSETS   = [0, 183, 307, 207, 17];          // vertical stagger per column (designed at 1440)
  /* Per-column rise speed. Grouped in the tuner as outer (cols 0/4), inner
     (cols 1/3) and center (col 2). Center has no bottom hub card, so its job
     during the settle window is to get out of the way. Outer + inner changes
     don't rebuild the timeline, so exitBaseY (computed once at build) will
     slightly drift from the "natural" convergence — the settle blend still
     lerps to target positions, so the drift is absorbed. */
  var COL_SPEEDS    = [1.0, 1.30, 1.55, 1.30, 1.0];   // ongoing rise speed (offset convergence does the heavy lifting)
  /* All progress fractions are relative to the hero-pin-spacer scroll.
     The pin-spacer is 240vh (see --hero-scroll-distance in hero.css). Trimmed
     from 320vh → 240vh (0.75×) to cut dead scroll after the reveal finishes;
     phase progress values are unchanged, so every phase completes at the
     same progress fraction — just over 25% less absolute scroll. */
  var CONV_DUR      = 0.875;                           // progress at which gaps + offsets finish converging
  var DETACH_P      = 0.23;                            // progress at which bottom images begin settling (overlaps convergence)
  var SWAP_TIME     = 0.71;                            // instant swap (grid → carousel)
  var RISE_TARGET_P = 0.6875;                          // progress at which grid naturally positions bottoms near carousel Y
  var TEXT_PARALLAX = 0.5;                             // hero text rises at this fraction of the grid's rise rate (parallax via distance, not speed)
  var TEXT_FADE_END = 0.3;                             // progress at which hero text opacity reaches 0
  var UPPER_EXIT_BOOST = 1.5;                          // extra rise speed for non-bottom images after DETACH_P (clears settle zone)

  /* Chrome reveal (header/footer clip-path + label/copy translate), driven
     by scroll progress as a fraction of the hero pin-spacer scroll distance.
     Default spans the blend phase: starts at DETACH_P (the moment cards
     begin separating from the grid) and ends at SWAP_TIME (the flying→flex
     flip). Chrome is absolute-positioned at its final viewport spot during
     flight (see hero-hub-router.css), so the clip-path value carries
     seamlessly across the SWAP_TIME flip. Mapping is linear — reveal fills
     the window at the same rate as scroll, so e.g. 30% through the window
     = 30% of the chrome visible. No ease-in/out (which concentrates most of
     the visual change into the middle of the window and reads as a "pop"). */
  var REVEAL_START  = 0.37;                            // progress at which chrome begins clipping in
  var REVEAL_END    = 0.86;                            // progress at which chrome is fully revealed
  var TITLE_FADE_START = 0.55;                         // progress at which hub title begins fading in
  var TITLE_FADE_END   = 0.85;                         // progress at which hub title is fully visible
  var TITLE_CASCADE    = 0.065;                        // per-line y offset at tp=0, as a fraction of innerHeight (matches text-animate.js)
  var REVEAL_SLIDE  = 16;                              // px — matches --hhub-reveal-slide

  /* Header/footer pixel heights — measured in buildTimeline. Used by
     applyChromeReveal to compute the .hhub-card-bg clip-path insets so
     the bg layer's visible edge matches where the chrome sits. */
  var HEADER_H = 56;
  var FOOTER_H = 80;

  /* ═══════════════════════════════════════════
     DOM REFERENCES
     ═══════════════════════════════════════════ */
  var grid        = document.querySelector('.hero-image-grid');
  var heroText    = document.querySelector('.hero-text');
  var hubTitle    = document.querySelector('.hero-hub-title');
  var hubTitleLines = [];                              // per-line inner spans, populated async after fonts ready
  var hubTitleStartYs = [];                            // initial y offset per line — cascades for snap-together feel
  var hubRouter   = document.querySelector('.hero-hub-router');
  var hubTrack    = document.querySelector('.hhub-track');
  var hubCards    = Array.from(document.querySelectorAll('.hhub-card'));
  var hubHeaders  = Array.from(document.querySelectorAll('.hhub-card-header'));
  var hubFooters  = Array.from(document.querySelectorAll('.hhub-card-footer'));
  var hubLabels   = hubCards.map(function (c) { return c.querySelector('.hhub-card-label'); });
  var hubCopies   = hubCards.map(function (c) { return c.querySelector('.hhub-card-copy'); });
  var hero        = document.getElementById('hero');

  /* ═══════════════════════════════════════════
     DEBUG INSTRUMENTATION (temporary — remove once D→M→D card-0/1 bug is diagnosed)
     ═══════════════════════════════════════════ */
  if (typeof window.__debugHub === 'undefined') window.__debugHub = true;

  function __logCards(label) {
    if (!window.__debugHub) return;
    var trackInfo = '(no track)';
    if (hubTrack) {
      var tr = hubTrack.getBoundingClientRect();
      var cs = window.getComputedStyle(hubTrack);
      trackInfo = 'track inline.transform="' + (hubTrack.style.transform || '—') +
                  '" computed.transform="' + cs.transform +
                  '" rect.left=' + Math.round(tr.left);
    }
    var rows = hubCards.map(function (card, i) {
      var style = card.getAttribute('style') || '—';
      var classes = card.className.replace('hhub-card', '').trim() || '—';
      var r = card.getBoundingClientRect();
      return (
        'card ' + i +
        ' | classes=' + classes +
        ' | rect=' + Math.round(r.left) + ',' + Math.round(r.top) +
        ' ' + Math.round(r.width) + '×' + Math.round(r.height) +
        ' | inline=' + (style.length > 90 ? style.slice(0, 90) + '…' : style)
      );
    });
    console.log('%c[hub] ' + label + ' vw=' + window.innerWidth + ' vh=' + window.innerHeight,
                'color: #3b63fb; font-weight: bold');
    console.log('  ' + trackInfo);
    rows.forEach(function (r) { console.log('  ' + r); });
  }

  /* Ensure every hub card has a .hhub-card-bg as its first child. Inserted
     here rather than in index.html so the DOM stays minimal and the reveal
     machinery is self-contained. */
  var hubBgs = hubCards.map(function (c) {
    var bg = c.querySelector('.hhub-card-bg');
    if (!bg) {
      bg = document.createElement('div');
      bg.className = 'hhub-card-bg';
      c.insertBefore(bg, c.firstChild);
    }
    return bg;
  });

  /* ═══════════════════════════════════════════
     IMAGE DATA MODEL

     The bottom row of the grid IS the hub cards — one element for both the
     flying grid animation and the settled carousel. Top rows are .grid-card
     (the 10 non-bottom images). Bottom row is .hhub-card, flagged isBottom.
     Hub cards live at col indices [0,1,3,4] (col 2 has no bottom image).
     ═══════════════════════════════════════════ */
  var HUB_COL_MAP = [0, 1, 3, 4];       // hub card index → grid column
  var allImages = [];
  var colGroups = [[], [], [], [], []];
  var bottomImages = [];

  /* Rebuilt at the start of each buildTimeline() so cards hidden via CSS
     (computed display: none) are filtered out on re-measure. */
  function buildImageModel() {
    allImages.length = 0;
    colGroups.forEach(function (g) { g.length = 0; });

    /* Top-row grid cards. Skip any whose computed display is `none` — that lets
       CSS variants collapse rows without touching JS. */
    Array.from(document.querySelectorAll('.grid-col')).forEach(function (col, colIdx) {
      var visible = Array.from(col.querySelectorAll('.grid-card')).filter(function (c) {
        return getComputedStyle(c).display !== 'none';
      });
      visible.forEach(function (card, rowIdx) {
        var img = card.querySelector('img');
        var w   = parseInt(img.getAttribute('width'), 10);
        var h   = parseInt(img.getAttribute('height'), 10);
        var data = {
          el:       card,
          img:      img,
          col:      colIdx,
          row:      rowIdx,
          isBottom: false,
          isHub:    false,
          ratio:    h / w,
          scaledH: 0,
          targetX: 0, targetY: 0, targetW: 0, targetH: 0
        };
        allImages.push(data);
        colGroups[colIdx].push(data);
      });
    });

    /* Bottom-row hub cards (4 items). Appended as the last row of their column
       so the existing grid stacking math keeps working unchanged. */
    hubCards.forEach(function (card, i) {
      var colIdx = HUB_COL_MAP[i];
      var img = card.querySelector('.hhub-card-img');
      var w   = parseInt(img.getAttribute('width'), 10);
      var h   = parseInt(img.getAttribute('height'), 10);
      var data = {
        el:       card,                              // the .hhub-card itself is the GSAP target
        img:      img,
        col:      colIdx,
        row:      colGroups[colIdx].length,          // append as next row in column
        isBottom: true,
        isHub:    true,
        ratio:    h / w,
        scaledH: 0,
        targetX: 0, targetY: 0, targetW: 0, targetH: 0
      };
      allImages.push(data);
      colGroups[colIdx].push(data);
    });

    bottomImages = allImages.filter(function (d) { return d.isBottom; });
  }

  buildImageModel();

  /* ═══════════════════════════════════════════
     HELPERS
     ═══════════════════════════════════════════ */
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeInOutCubic(t) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2; }

  /* Write chrome reveal state for all 4 hub cards at a given local progress
     (0 = fully clipped, 1 = fully revealed). Same value for every card —
     no cascade.

     Three things move in lockstep:
       1. .hhub-card-bg clip-path (the unified grey rect): inset shrinks
          from (headerH top, footerH bottom) → (0, 0), so at rp=0 only the
          image area is grey and at rp=1 the whole card is grey. The clip's
          16px rounded corners match the image's own 16px corners exactly
          at rp=0 — so there's no grey halo at the image corners during
          grid, and no white wedge at the chrome/image join at rp=1.
       2. Header/footer clip-path (text reveal): header clips from the
          image edge upward, footer from the image edge downward.
       3. Label/copy translate: slide from +16px / -16px to 0 as the
          chrome unmasks (so the text appears to slide out from behind
          the image edge). */
  function applyChromeReveal(rp) {
    var inv = 1 - rp;
    var hPct = inv * 100;
    var headerClip = 'inset(' + hPct + '% 0 0 0 round 16px 16px 0 0)';
    var footerClip = 'inset(0 0 ' + hPct + '% 0 round 0 0 16px 16px)';
    var bgClip     = 'inset(' + (inv * HEADER_H) + 'px 0 ' + (inv * FOOTER_H) + 'px 0 round 16px)';
    var labelT = 'translateY(' + ( inv * REVEAL_SLIDE) + 'px)';
    var copyT  = 'translateY(' + (-inv * REVEAL_SLIDE) + 'px)';
    for (var i = 0; i < hubCards.length; i++) {
      if (hubBgs[i])     hubBgs[i].style.clipPath     = bgClip;
      if (hubHeaders[i]) hubHeaders[i].style.clipPath = headerClip;
      if (hubFooters[i]) hubFooters[i].style.clipPath = footerClip;
      if (hubLabels[i])  hubLabels[i].style.transform = labelT;
      if (hubCopies[i])  hubCopies[i].style.transform = copyT;
    }
  }

  /* Hub title fade: per-line cascading y + uniform opacity. tp is the local
     progress (0 = hidden + offset, 1 = settled + fully visible). Before the
     async line split completes, hubTitleLines is empty and we fall back to
     fading the h2 as a whole. Uses power2.out on y (1 - (1-t)^2) — same curve
     as text-animate.js — so the deeper lines accelerate into rest for an
     elastic snap-together feel. */
  function applyTitleFade(tp) {
    if (!hubTitle) return;
    if (hubTitleLines.length > 0) {
      var ease = 1 - (1 - tp) * (1 - tp);
      for (var i = 0; i < hubTitleLines.length; i++) {
        var y = hubTitleStartYs[i] * (1 - ease);
        hubTitleLines[i].style.transform = 'translateY(' + y.toFixed(2) + 'px)';
        hubTitleLines[i].style.opacity   = tp;
      }
    } else {
      hubTitle.style.opacity = tp;
    }
  }

  /* Synchronously split the title on <br> into line-wrapped spans using DOM
     APIs (no innerHTML). Doesn't depend on font-metric measurement — <br> is
     authoritative — so there's no race with document.fonts.ready or script
     load order. Idempotent. */
  var hubTitleSplit = false;
  function ensureHubTitleSplit() {
    if (!hubTitle || hubTitleSplit) return;
    hubTitleSplit = true;

    /* Walk the existing children to collect raw line strings separated by
       <br> elements. Ignores any other tags that might be nested — we just
       want the flat text per line. */
    var lines = [];
    var buf = '';
    function flush() {
      var t = buf.trim();
      if (t) lines.push(t);
      buf = '';
    }
    Array.from(hubTitle.childNodes).forEach(function (node) {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
        flush();
      } else {
        buf += node.textContent || '';
      }
    });
    flush();
    if (!lines.length) return;

    while (hubTitle.firstChild) hubTitle.removeChild(hubTitle.firstChild);
    lines.forEach(function (line) {
      var outer = document.createElement('span');
      outer.className = 'ta-line';
      var inner = document.createElement('span');
      inner.className = 'ta-line-inner';
      inner.textContent = line;
      outer.appendChild(inner);
      hubTitle.appendChild(outer);
    });

    hubTitleLines = Array.from(hubTitle.querySelectorAll('.ta-line-inner'));
    for (var i = 0; i < hubTitleLines.length; i++) {
      hubTitleLines[i].style.willChange = 'transform, opacity';
    }
    hubTitle.style.opacity = '1';                             // h2 fully visible; lines own their opacity
  }

  /* Recompute per-line starting Y offsets against the current viewport height.
     Called every buildTimeline so resize-driven vh changes update the cascade. */
  function recomputeHubTitleStartYs() {
    if (!hubTitleLines.length) return;
    var baseOffset = window.innerHeight * TITLE_CASCADE;
    hubTitleStartYs = hubTitleLines.map(function (_, i) { return (i + 1) * baseOffset; });
  }

  /* ═══════════════════════════════════════════
     TIMELINE BUILDER
     ═══════════════════════════════════════════ */
  var st = null;

  function buildTimeline() {
    __logCards('buildTimeline ENTRY (st=' + (st ? 'alive' : 'null') + ')');
    if (st) st.kill();

    /* Clear any in-flight state so chrome offsetHeights read correctly below.
       Chrome inline styles (clip-path on header/footer, transform on
       label/copy) are wiped too so a rebuild starts from the CSS base state. */
    hubRouter.classList.remove('is-settled');
    hubRouter.classList.remove('hhub-ready');         /* hide router until this build's state is fully applied */
    hubCards.forEach(function (card) { card.classList.remove('hhub-card--flying'); });
    /* Use clearProps: 'all' (not a specific prop list) because mobile's
       stack-phase timeline tweens `scale` on hub cards 0-2 (as they get
       buried) plus the `--hhub-dim` CSS custom property. A specific list
       that names 'transform' should theoretically clear sub-properties like
       scale, but GSAP's internal transform cache can behave inconsistently
       on cross-breakpoint rebuilds where the tween source is a killed
       timeline. 'all' removes every inline GSAP-written style including
       CSS custom properties and any cached sub-transform values — giving
       desktop's fresh gsap.set a clean slate. */
    gsap.set(hubCards, { clearProps: 'all' });
    __logCards('after clearProps(all) on hubCards');
    /* Clear any hero-text / grid-card transforms left behind by a mobile
       build — otherwise heroText.getBoundingClientRect() below reads a
       translated/faded value and initBaseY is wrong (hub cards end up
       positioned relative to a phantom hero-text location). */
    gsap.set(heroText, { clearProps: 'transform,x,y,opacity' });
    hubHeaders.concat(hubFooters).forEach(function (el) { el.style.clipPath = ''; });
    hubLabels.concat(hubCopies).forEach(function (el) { if (el) el.style.transform = ''; });
    hubBgs.forEach(function (el) { if (el) el.style.clipPath = ''; });
    /* Clear transforms on ALL grid-cards (including ones currently hidden by
       variants) so toggling v2→v1 starts with a clean slate, then the
       subsequent SET below repositions the visible ones. 'all' for the same
       reason as hubCards above. */
    gsap.set(document.querySelectorAll('.grid-card'), { clearProps: 'all' });

    /* Re-read DOM / CSS visibility. */
    buildImageModel();

    var vw = document.documentElement.clientWidth;
    var vh = window.innerHeight;

    /* ── Grid image width (responsive) ── */
    var IMG_W = Math.round(291 * vw / 1440);
    document.documentElement.style.setProperty('--grid-img-w', IMG_W + 'px');

    /* ── Read tunable CSS custom property ── */
    var initialGap = parseInt(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--hero-grid-initial-gap'), 10
    ) || 97;

    /* ── Scale column offsets proportionally ── */
    var vpScale = vw / 1440;
    var scaledOffsets = COL_OFFSETS.map(function (o) { return Math.round(o * vpScale); });

    /* ── Per-image scaled heights ── */
    allImages.forEach(function (d) {
      d.scaledH = Math.round(IMG_W * d.ratio);
    });

    /* ── Grid starting Y (below hero copy) ── */
    var heroRect    = hero.getBoundingClientRect();
    var heroTextBot = heroText.getBoundingClientRect().bottom - heroRect.top;
    var initBaseY   = heroTextBot - 100;

    /* ── Converged offsets: align bottom edges of all bottom images.
         Each column's offset converges to a value that compensates
         for different column heights, so bottom edges line up. ── */
    var convOffsets = [0, 0, 0, 0, 0];
    var maxBotEdge = 0;
    bottomImages.forEach(function (d) {
      var yAbove = 0;
      for (var r = 0; r < d.row; r++) {
        yAbove += colGroups[d.col][r].scaledH + FINAL_GAP;
      }
      var botEdge = yAbove + d.scaledH;
      if (botEdge > maxBotEdge) maxBotEdge = botEdge;
      d._yAboveConv = yAbove;
      d._botEdge    = botEdge;
    });
    bottomImages.forEach(function (d) {
      convOffsets[d.col] = maxBotEdge - d._botEdge;
    });

    /* ── Convergence base Y: centres bottom images at ~50vh ── */
    var avgBotCenter = 0;
    bottomImages.forEach(function (d) {
      avgBotCenter += convOffsets[d.col] + d._yAboveConv + d.scaledH / 2;
    });
    avgBotCenter /= bottomImages.length;
    var convergBaseY = Math.round(vh / 2 - avgBotCenter);

    /* ── Exit base Y: grid continues past convergence.
         Account for per-column speed so average bottom image
         reaches convergBaseY at DETACH_P. ── */
    var avgBotSpeed = 0;
    bottomImages.forEach(function (d) { avgBotSpeed += COL_SPEEDS[d.col]; });
    avgBotSpeed /= bottomImages.length;
    var exitBaseY = Math.round(initBaseY + (convergBaseY - initBaseY) / (RISE_TARGET_P * avgBotSpeed));

    /* ── Carousel target positions (fixed size) ──
       Measure chrome heights from the first card. The .is-settled /
       .hhub-card--flying classes have been cleared above, so the header
       and footer are currently in their natural flex-flow layout with no
       clip-path inline overrides — offsetHeight reads their real size.
       Publish as CSS vars so the flying-state absolute chrome sits at the
       exact same viewport positions as the settled flex-flow chrome. */
    var headerH = hubCards[0] ? hubCards[0].querySelector('.hhub-card-header').offsetHeight : 56;
    var footerH = hubCards[0] ? hubCards[0].querySelector('.hhub-card-footer').offsetHeight : 80;
    HEADER_H = headerH;                 /* module-scope, for applyChromeReveal */
    FOOTER_H = footerH;
    document.documentElement.style.setProperty('--hhub-header-h', headerH + 'px');
    document.documentElement.style.setProperty('--hhub-footer-h', footerH + 'px');

    var cardMediaH = 0;
    bottomImages.forEach(function (d) {
      var h = Math.round(CARD_W * d.ratio);
      if (h > cardMediaH) cardMediaH = h;
    });
    document.documentElement.style.setProperty('--hhub-media-h', cardMediaH + 'px');

    var settleTrackW = 4 * CARD_W + 3 * FINAL_GAP;
    var settleLeft   = (vw - settleTrackW) / 2;
    var cardH        = headerH + cardMediaH + footerH;
    /* Lock hub-router height so its top sits at cardTop even when all cards
       are absolute-positioned during the flying phase. */
    document.documentElement.style.setProperty('--hhub-card-h', cardH + 'px');

    /* ── Nav clearance: ensure the hub title resolves at least 60px below the
         bottom of #gnav. On tall viewports the centered pair sits well under
         the nav and yOffset stays at 0. On short viewports, where centering
         would put the title too close to (or under) the nav, we push the
         title + router down as a unit via --hhub-y-offset. The CSS on
         .hero-hub-router adds it to `top`; .hero-hub-title subtracts it from
         `bottom`. Only the title+router pair shifts — hero text and grid
         keep their existing positioning. ── */
    ensureHubTitleSplit();
    recomputeHubTitleStartYs();
    if (hubTitle && hubTitleLines.length > 0) hubTitle.style.opacity = '1';
    var titleH     = hubTitle ? hubTitle.getBoundingClientRect().height : 0;
    var gnavEl     = document.getElementById('gnav');
    var navBottom  = gnavEl ? gnavEl.getBoundingClientRect().bottom : 80;
    var naturalCardTop  = (vh - cardH) / 2;
    var naturalTitleTop = naturalCardTop - 40 - titleH;
    var minTitleTop     = navBottom + 60;
    var yOffset = Math.max(0, Math.round(minTitleTop - naturalTitleTop));
    document.documentElement.style.setProperty('--hhub-y-offset', yOffset + 'px');

    var cardTop = Math.round(naturalCardTop + yOffset);

    /* Hub cards' GSAP coords are relative to .hhub-track (not the hero),
       because .hhub-track has a non-none transform (hub-router.js translates
       it to centre the carousel) — per CSS spec, that makes hub-track the
       containing block for its absolute descendants. So we subtract
       track's rendered offset (settleLeft horizontally, cardTop vertically)
       from the hero-coord positions we compute for hub cards.

       Force the hub-track transform here rather than relying on hub-router.js
       to have applied it. On a D→M→D cycle hub-router.js's resize listener
       occasionally fires at a moment when document.documentElement.clientWidth
       reads as 0, and its (vw - restSpan) / 2 formula returns -594 — leaving
       the track stuck at translateX(-594) and every hub card displaced off
       the left of the viewport. By writing the track transform from
       buildTimeline directly (using the same settleLeft value that
       HUB_X_OFFSET is built from), we guarantee the track's rendered
       position always matches what the card-positioning math assumes. */
    if (hubTrack) {
      if (window.__debugHub) {
        console.log('[hub] about to force hub-track transform. settleLeft=' + settleLeft +
                    ' | BEFORE write: inline.transform="' + (hubTrack.style.transform || '—') + '"');
      }
      /* Disable the CSS transition before writing. .hhub-track has
         `transition: transform 600ms` for the hover-accordion slide, so if
         the previous inline transform differs from what we're writing (e.g.
         the track was sitting at `transform:none` after a D→M clear), the
         write would trigger a 600ms slide animation. During that animation
         the flying hub cards — whose viewport x = track.rendered.x + GSAP.x
         — would visibly slide from wrong position to correct position.

         The offsetHeight read between the two writes forces a style flush
         so the browser commits `transition:none` before the transform
         change — otherwise both writes can be batched into one style
         recalc and the transition value at the moment of change is the
         pre-write value (600ms), causing an unintended animation. */
      hubTrack.style.transition = 'none';
      void hubTrack.offsetHeight;
      hubTrack.style.transform = 'translateX(' + settleLeft + 'px)';
      /* Restore transition after one frame so subsequent hover-accordion
         translates (driven by hub-router.js) animate normally. */
      requestAnimationFrame(function () { hubTrack.style.transition = ''; });
      if (window.__debugHub) {
        console.log('[hub] AFTER write: inline.transform="' + hubTrack.style.transform + '"' +
                    ' computed.transform="' + window.getComputedStyle(hubTrack).transform + '"' +
                    ' rect.left=' + Math.round(hubTrack.getBoundingClientRect().left));
      }
    }
    var HUB_Y_OFFSET = cardTop;
    var HUB_X_OFFSET = settleLeft;

    /* Grid image settles into the full-bleed .hhub-card-media (no inset);
       the image keeps its own 16px border-radius as it lands. */
    var imgW = CARD_W - 2 * MEDIA_PAD_X;
    var imgH = cardMediaH - MEDIA_PAD_B;
    bottomImages.forEach(function (d, i) {
      d.targetX = settleLeft + i * (CARD_W + FINAL_GAP) + MEDIA_PAD_X;
      d.targetY = cardTop + headerH;
      d.targetW = imgW;
      d.targetH = imgH;
    });

    /* ── Kill any in-flight tweens ── */
    var allEls = allImages.map(function (d) { return d.el; });
    gsap.killTweensOf(allEls.concat([heroText, hubRouter]).concat(hubCards).concat(hubHeaders).concat(hubFooters));

    /* ──────────────────────────────────────────
       SET INITIAL STATE
       ────────────────────────────────────────── */
    var initTotalW = 5 * IMG_W + 4 * initialGap;
    var initLeft   = (vw - initTotalW) / 2;

    /* Hub cards: put them into "flying" mode so GSAP transforms place them
       freely in hero coordinate space (escaping the flex track). Chrome
       stays in the DOM but is pulled out of layout (absolute-positioned
       above/below the card) so the scroll-driven reveal can start before
       the SWAP_TIME handoff; see hero-hub-router.css. */
    hubCards.forEach(function (card) {
      card.classList.add('hhub-card--flying');
    });
    __logCards('after adding --flying (pre initial set)');

    if (window.__debugHub) {
      console.log('[hub] initial geometry',
                  'vw=' + vw, 'vh=' + vh, 'IMG_W=' + IMG_W,
                  'initialGap=' + initialGap, 'initLeft=' + initLeft,
                  'initBaseY=' + initBaseY,
                  'HUB_X_OFFSET=' + HUB_X_OFFSET, 'HUB_Y_OFFSET=' + HUB_Y_OFFSET,
                  'scaledOffsets=' + JSON.stringify(scaledOffsets));
      bottomImages.forEach(function (d, i) {
        var yAboveI = 0;
        for (var r = 0; r < d.row; r++) {
          yAboveI += colGroups[d.col][r].scaledH + initialGap;
        }
        var xHero = initLeft + d.col * (IMG_W + initialGap);
        var yHero = initBaseY + scaledOffsets[d.col] + yAboveI;
        console.log('  hub[' + i + '] col=' + d.col + ' row=' + d.row +
                    ' scaledH=' + d.scaledH + ' yAboveI=' + yAboveI +
                    ' xHero=' + xHero + ' yHero=' + yHero +
                    ' → gsap x=' + (xHero - HUB_X_OFFSET) + ' y=' + (yHero - HUB_Y_OFFSET));
      });
    }

    allImages.forEach(function (d) {
      var yAboveI = 0;
      for (var r = 0; r < d.row; r++) {
        yAboveI += colGroups[d.col][r].scaledH + initialGap;
      }
      var xHero = initLeft + d.col * (IMG_W + initialGap);
      var yHero = initBaseY + scaledOffsets[d.col] + yAboveI;
      gsap.set(d.el, {
        x:            d.isBottom ? xHero - HUB_X_OFFSET : xHero,
        y:            d.isBottom ? yHero - HUB_Y_OFFSET : yHero,
        width:        IMG_W,
        height:       d.scaledH,
        opacity:      1,
        borderRadius: 16,
        /* Hub cards need overflow:visible so the chrome (which sits at
           bottom:100% / top:100% — OUTSIDE the card box during flight)
           isn't clipped by the card and the reveal can render. */
        overflow:     d.isBottom ? 'visible' : 'hidden'
      });
    });
    __logCards('after initial set on allImages');

    gsap.set(heroText,    { opacity: 1, y: 0 });
    applyTitleFade(0);               /* title was split/recomputed earlier in this build */
    hubRouter.setAttribute('aria-hidden', 'true');
    hubRouter.style.pointerEvents = 'none';
    hubRouter.style.zIndex = '';
    gsap.set(grid, { opacity: 1 });

    /* Init chrome to fully-clipped / fully-slid state. onUpdate will
       overwrite these as the user scrolls past REVEAL_START. */
    applyChromeReveal(0);

    /* Gate release is deferred until AFTER ScrollTrigger.create has run
       (below) and then one more rAF, so that:
         (a) GSAP's ticker has had one tick to process the initial tween,
         (b) any transient onUpdate fired during ScrollTrigger's internal
             refresh has settled, and
         (c) if that transient happened to briefly cross SWAP_TIME (e.g.
             during the Lenis handshake while pin-spacer bounds were still
             being measured), settle() would have removed .hhub-card--flying
             and cleared transforms — so we re-affirm the flying state
             inside the rAF as a safety net before revealing the router.
       This closed a sporadic "cards flash in flex-flow position over the
       hero headline on load" bug. Do not inline this add back up here. */

    /* ──────────────────────────────────────────
       BUILD TIMELINE
       Hero text is driven from onUpdate alongside the images (same `p`,
       same `rise`) so its motion is locked to the grid's — parallax comes
       from distance (TEXT_PARALLAX fraction), not a different speed curve.
       ────────────────────────────────────────── */
    var tl = gsap.timeline();

    /* Pad the timeline to scroll progress 1.0 (hub-router is always visible now). */
    tl.set({}, {}, 1.0);

    var settled = false;

    /* ── Settle / unsettle: same DOM element for grid + carousel.
       At SWAP_TIME the card flips from flying (absolute, GSAP-controlled)
       to flex flow. GSAP just positioned it at (targetX, targetY=cardTop+
       headerH) with size (CARD_W, cardMediaH); flex naturally places it at
       (targetX, cardTop) with size (CARD_W, cardH), so the image — which
       shifts from y=0-relative-to-card → y=headerH-relative-to-card — stays
       at the exact same viewport pixel.

       Chrome stays visible in both states: during flight it's absolute-
       positioned inside the card at its eventual viewport spot (see
       hero-hub-router.css); after settle it's in flex flow at the same spot.
       Clip-path + label/copy translateY are written every frame by onUpdate
       from a single scroll-derived progress value, so the reveal carries
       seamlessly across this flip — and scrolling back up has no timer to
       outrun, because there is no timer. ── */
    function settle() {
      if (settled) return;
      settled = true;
      /* Clear GSAP-set inline styles FIRST so there is no transform lingering
         when the card re-enters flex flow (otherwise flex-natural-pos +
         translate(targetX, ...) would shift cards off to the right). */
      gsap.set(bottomImages.map(function (d) { return d.el; }), { clearProps: 'all' });
      hubCards.forEach(function (card) { card.classList.remove('hhub-card--flying'); });
      hubRouter.classList.add('is-settled');
      hubRouter.style.pointerEvents = 'auto';
      hubRouter.removeAttribute('aria-hidden');
      if (window.__hhubReset) window.__hhubReset();
    }
    function unsettle() {
      if (!settled) return;
      settled = false;
      hubRouter.classList.remove('is-settled');
      hubRouter.style.pointerEvents = 'none';
      hubRouter.setAttribute('aria-hidden', 'true');
      hubCards.forEach(function (card) { card.classList.add('hhub-card--flying'); });
      /* Re-apply flying transforms immediately; the next onUpdate will refine
         these to the current p via lerp. Subtract HUB_X/Y_OFFSET because hub
         cards are contained by .hhub-track (which has a transform). */
      bottomImages.forEach(function (d) {
        gsap.set(d.el, {
          x: d.targetX - HUB_X_OFFSET,
          y: d.targetY - HUB_Y_OFFSET,
          width: d.targetW, height: d.targetH,
          borderRadius: IMG_RADIUS,
          opacity: 1,
          overflow: 'visible'                 /* chrome extends above/below */
        });
      });
    }

    /* ──────────────────────────────────────────
       SCROLL-DRIVEN GRID POSITIONING
       Every frame: compute gap + gridBaseY from
       progress, then place each image in the grid.
       Bottom images blend toward carousel targets
       after DETACH_P.
       ────────────────────────────────────────── */
    st = ScrollTrigger.create({
      trigger:   '.hero-pin-spacer',
      start:     'top top',
      end:       'bottom bottom',
      scrub:     1,
      animation: tl,

      onUpdate: function (self) {
        var p = self.progress;

        /* ── Convergence factor (gaps + offsets both shrink over CONV_DUR) ── */
        var convT = Math.min(1, p / CONV_DUR);
        var gap   = lerp(initialGap, FINAL_GAP, convT);

        /* ── Base rise amount (COL_SPEEDS applied per-image below) ── */
        var rise = (exitBaseY - initBaseY) * p;

        /* ── Hero text: same rise rate, scaled down for parallax via distance.
           Opacity is also scroll-driven so the fade and the rise share a ruler. ── */
        gsap.set(heroText, {
          y: rise * TEXT_PARALLAX,
          opacity: Math.max(0, 1 - p / TEXT_FADE_END)
        });

        /* ── Hub title: per-line cascade + opacity over [TITLE_FADE_START, TITLE_FADE_END]. ── */
        if (hubTitle) {
          var tp = (p - TITLE_FADE_START) / (TITLE_FADE_END - TITLE_FADE_START);
          if (tp < 0) tp = 0; else if (tp > 1) tp = 1;
          applyTitleFade(tp);
        }

        /* ── Column X layout with current gap ── */
        var totalW = 5 * IMG_W + 4 * gap;
        var leftX  = (vw - totalW) / 2;

        /* Upper-row exit boost: after DETACH_P, non-bottom images accelerate
           upward so they clear the settle zone before the carousel row arrives. */
        var upperBoost = 1;
        if (p > DETACH_P) {
          var bp = Math.min(1, (p - DETACH_P) / (SWAP_TIME - DETACH_P));
          upperBoost = lerp(1, UPPER_EXIT_BOOST, easeInOutCubic(bp));
        }

        /* ── Position every image ── */
        allImages.forEach(function (d) {
          /* Once settled, bottom images (hub cards) are in flex flow —
             GSAP transforms would displace them from their natural position. */
          if (d.isBottom && settled) return;

          /* Stack within column using current gap */
          var yAbove = 0;
          for (var r = 0; r < d.row; r++) {
            yAbove += colGroups[d.col][r].scaledH + gap;
          }

          /* Offset converges to convOffsets → aligns bottom edges + creates parallax */
          var currentOffset = lerp(scaledOffsets[d.col], convOffsets[d.col], convT);

          var gx = leftX + d.col * (IMG_W + gap);
          var speed = d.isBottom ? COL_SPEEDS[d.col] : COL_SPEEDS[d.col] * upperBoost;
          var gy = initBaseY + rise * speed + currentOffset + yAbove;

          if (d.isBottom && p >= DETACH_P) {
            /* ── Settle: blend from grid position → carousel target.
               Hub cards live inside .hhub-track which has a non-none
               transform — their GSAP x/y are therefore relative to track,
               not the hero, so we subtract HUB_X_OFFSET and HUB_Y_OFFSET. ── */
            var sp = Math.min(1, (p - DETACH_P) / (SWAP_TIME - DETACH_P));
            sp = easeInOutCubic(sp);

            gsap.set(d.el, {
              x:            lerp(gx, d.targetX, sp) - HUB_X_OFFSET,
              y:            lerp(gy, d.targetY, sp) - HUB_Y_OFFSET,
              width:        lerp(IMG_W, d.targetW, sp),
              height:       lerp(d.scaledH, d.targetH, sp),
              borderRadius: lerp(16, IMG_RADIUS, sp)
            });
          } else {
            /* ── Ride the grid ── */
            var opacity = 1;
            if (!d.isBottom) {
              var botEdge = gy + d.scaledH;
              if (botEdge < 0) opacity = 0;
              else if (gy < 0) opacity = Math.max(0, botEdge / d.scaledH);
            }
            gsap.set(d.el, {
              x: d.isBottom ? gx - HUB_X_OFFSET : gx,
              y: d.isBottom ? gy - HUB_Y_OFFSET : gy,
              opacity: opacity
            });
          }
        });

        /* ── Chrome reveal (clip-path + label/copy translateY).
           Scroll-driven over [REVEAL_START, REVEAL_END]. Linear — no easing,
           so the reveal fills at the same rate the user scrolls. ── */
        var rp = (p - REVEAL_START) / (REVEAL_END - REVEAL_START);
        if (rp < 0) rp = 0; else if (rp > 1) rp = 1;
        applyChromeReveal(rp);

        /* ── Structural flip at SWAP_TIME. Instant — the chrome reveal state
           already matches on both sides of the flip, so there's no timer. ── */
        if (p >= SWAP_TIME) settle();
        else                unsettle();
      },

      onLeave:     function () { settle(); },
      onEnterBack: function () { unsettle(); }
    });

    /* Deferred gate release — see the comment above applyChromeReveal(0) for
       why this lives in an rAF. We unconditionally replay the p=0 initial
       state here before revealing, to cover every permutation of the init
       race (settle fired alone, settle+unsettle fired in sequence landing
       cards at targetX/Y, or nothing fired at all — idempotent in the last
       case since we write the same values). The only visible side-effect is
       a possible 1-frame snap to p=0 state if the user scrolled during this
       single rAF — invisible on a cold load where scrolling-while-loading
       doesn't happen in practice. */
    requestAnimationFrame(function () {
      __logCards('rAF ENTRY (before repair)');
      settled = false;
      hubRouter.classList.remove('is-settled');
      hubRouter.setAttribute('aria-hidden', 'true');
      hubRouter.style.pointerEvents = 'none';
      hubCards.forEach(function (card) { card.classList.add('hhub-card--flying'); });
      bottomImages.forEach(function (d) {
        var yAboveI = 0;
        for (var r = 0; r < d.row; r++) {
          yAboveI += colGroups[d.col][r].scaledH + initialGap;
        }
        var xHero = initLeft + d.col * (IMG_W + initialGap);
        var yHero = initBaseY + scaledOffsets[d.col] + yAboveI;
        gsap.set(d.el, {
          x:            xHero - HUB_X_OFFSET,
          y:            yHero - HUB_Y_OFFSET,
          width:        IMG_W,
          height:       d.scaledH,
          opacity:      1,
          borderRadius: 16,
          overflow:     'visible'
        });
      });
      applyChromeReveal(0);
      hubRouter.classList.add('hhub-ready');
      __logCards('rAF EXIT (after repair + hhub-ready)');
    });
  }

  /* ═══════════════════════════════════════════
     CLEANUP (called by hero-breakpoint-orchestrator.js on D→M)
     ═══════════════════════════════════════════ */
  /* Tear down desktop animation and reset all GSAP state so the mobile script
     can start cleanly on cross-breakpoint resize. */
  function cleanupDesktop() {
    __logCards('cleanupDesktop ENTRY');
    if (st) { st.kill(); st = null; }
    hubCards.forEach(function (c) { c.classList.remove('hhub-card--flying'); });
    gsap.set(document.querySelectorAll('.grid-card'), { clearProps: 'all' });
    gsap.set(hubCards, { clearProps: 'all' });
    hubHeaders.concat(hubFooters).forEach(function (el) { el.style.clipPath = ''; });
    hubLabels.concat(hubCopies).forEach(function (el) { if (el) el.style.transform = ''; });
    hubBgs.forEach(function (el) { if (el) el.style.clipPath = ''; });
    if (hubTitle) {
      hubTitle.style.opacity = '';
      hubTitleLines.forEach(function (line) {
        line.style.transform = '';
        line.style.opacity   = '';
      });
    }
    hubRouter.classList.remove('is-settled');
    hubRouter.classList.remove('hhub-ready');
    hubRouter.style.pointerEvents = '';
    hubRouter.removeAttribute('aria-hidden');
    gsap.set(grid, { clearProps: 'opacity' });
    /* Clear the track inline transform so mobile CSS's `transform: none` can
       take effect. Inline styles override CSS, so without this the track
       would keep its desktop translateX on mobile and every hub card would
       be offset by that amount. Also reset any stuck hover-active state
       since hub-router.js no longer owns a resize listener to clear it. */
    if (hubTrack) {
      hubTrack.style.transition = '';
      hubTrack.style.transform  = '';
    }
    hubCards.forEach(function (c) { c.classList.remove('hhub-card--active'); });
    __logCards('cleanupDesktop EXIT');
  }

  /* ═══════════════════════════════════════════
     PUBLIC HOOKS
     The breakpoint orchestrator is the sole caller of the build/cleanup
     hooks. Resize listening + initial boot live in that orchestrator — not
     here — so there's no cross-script race over .hhub-track's transform.
     ═══════════════════════════════════════════ */
  window.__heroDesktopBuild   = buildTimeline;
  window.__heroDesktopCleanup = cleanupDesktop;

  /* Dev tuner hook — lets reveal-tuner.js read and mutate timing without
     rebuilding the timeline. All setters mutate closure vars / array slots
     that onUpdate reads fresh each frame, so the next scroll tick picks up
     new values automatically. setRevealRange also re-applies chrome state at
     the current progress so a drag is reflected even when stopped; blend and
     centerSpeed only affect motion and will reflect on the next scroll. */
  window.__heroGrid = {
    getRevealRange: function () { return { start: REVEAL_START, end: REVEAL_END }; },
    setRevealRange: function (start, end) {
      if (typeof start === 'number' && isFinite(start)) {
        REVEAL_START = Math.max(0, Math.min(1, start));
      }
      if (typeof end === 'number' && isFinite(end)) {
        REVEAL_END = Math.max(0, Math.min(1, end));
      }
      if (REVEAL_END <= REVEAL_START) REVEAL_END = Math.min(1, REVEAL_START + 0.01);
      var p  = st ? st.progress : 0;
      var rp = (p - REVEAL_START) / (REVEAL_END - REVEAL_START);
      if (rp < 0) rp = 0; else if (rp > 1) rp = 1;
      applyChromeReveal(rp);
    },
    getProgress: function () { return st ? st.progress : 0; },
    getBlendWindow: function () { return { detach: DETACH_P, swap: SWAP_TIME }; },
    setBlendWindow: function (detach, swap) {
      if (typeof detach === 'number' && isFinite(detach)) {
        DETACH_P = Math.max(0, Math.min(1, detach));
      }
      if (typeof swap === 'number' && isFinite(swap)) {
        SWAP_TIME = Math.max(0, Math.min(1, swap));
      }
      if (SWAP_TIME <= DETACH_P) SWAP_TIME = Math.min(1, DETACH_P + 0.01);
    },
    getCenterSpeed: function () { return COL_SPEEDS[2]; },
    setCenterSpeed: function (v) {
      if (typeof v === 'number' && isFinite(v)) {
        COL_SPEEDS[2] = Math.max(0, v);
      }
    },
    getOuterSpeed: function () { return COL_SPEEDS[0]; },
    setOuterSpeed: function (v) {
      if (typeof v === 'number' && isFinite(v)) {
        v = Math.max(0, v);
        COL_SPEEDS[0] = v;
        COL_SPEEDS[4] = v;
      }
    },
    getInnerSpeed: function () { return COL_SPEEDS[1]; },
    setInnerSpeed: function (v) {
      if (typeof v === 'number' && isFinite(v)) {
        v = Math.max(0, v);
        COL_SPEEDS[1] = v;
        COL_SPEEDS[3] = v;
      }
    },
    getTitleFadeRange: function () { return { start: TITLE_FADE_START, end: TITLE_FADE_END }; },
    setTitleFadeRange: function (start, end) {
      if (typeof start === 'number' && isFinite(start)) {
        TITLE_FADE_START = Math.max(0, Math.min(1, start));
      }
      if (typeof end === 'number' && isFinite(end)) {
        TITLE_FADE_END = Math.max(0, Math.min(1, end));
      }
      if (TITLE_FADE_END <= TITLE_FADE_START) TITLE_FADE_END = Math.min(1, TITLE_FADE_START + 0.01);
      /* Re-apply at current progress so a drag is reflected even when stopped. */
      var p  = st ? st.progress : 0;
      var tp = (p - TITLE_FADE_START) / (TITLE_FADE_END - TITLE_FADE_START);
      if (tp < 0) tp = 0; else if (tp > 1) tp = 1;
      applyTitleFade(tp);
    }
  };

}());

/* ===== source: scripts/hero-grid-mobile.js ===== */
/* ============================================
   HERO — MOBILE SCROLL SEQUENCE (< 768px)

   Phase 1 (0 → 65): Hero text rises; outer columns
     rise + spread outward (row 1 gets extra Y so the
     in-column gap grows = the X spread); center col
     row 1 rises off screen faster; Sales hub card
     (center row 2) rises + expands left + right in
     one simultaneous motion, separating from row 1
     (height locked at slot height until settle).
     Chrome reveals via CSS transition at settle point.

   Phase 2 (65 → 100): Marketing, Legal, HR cards
     slide in from below and stack with peek/scale/dim.

   Driver: GSAP ScrollTrigger with scrub: true.
   ============================================ */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── DOM ── */
  var pinSpacer  = document.querySelector('.hero-pin-spacer');
  var hero       = document.getElementById('hero');
  var heroText   = document.querySelector('.hero-text');
  var mobileGrid = document.querySelector('.hero-mobile-grid');
  var hubRouter  = document.querySelector('.hero-hub-router');
  var hubCards   = Array.from(document.querySelectorAll('.hhub-card'));

  if (!pinSpacer || !hero || !mobileGrid || hubCards.length === 0) return;

  var salesCard   = hubCards[0];
  var salesHeader = salesCard.querySelector('.hhub-card-header');
  var salesFooter = salesCard.querySelector('.hhub-card-footer');
  var N_HUB       = hubCards.length;

  /* Debug helper shared with hero-grid.js via window.__debugHub flag. */
  function __logCardsM(label) {
    if (!window.__debugHub) return;
    var rows = hubCards.map(function (card, i) {
      var style = card.getAttribute('style') || '—';
      var classes = card.className.replace('hhub-card', '').trim() || '—';
      var r = card.getBoundingClientRect();
      return (
        'card ' + i +
        ' | classes=' + classes +
        ' | rect=' + Math.round(r.left) + ',' + Math.round(r.top) +
        ' ' + Math.round(r.width) + '×' + Math.round(r.height) +
        ' | inline=' + (style.length > 90 ? style.slice(0, 90) + '…' : style)
      );
    });
    console.log('%c[hub·M] ' + label + ' vw=' + window.innerWidth + ' vh=' + window.innerHeight,
                'color: #d97706; font-weight: bold');
    rows.forEach(function (r) { console.log('  ' + r); });
  }

  /* ── Flanking column elements ──
     leftCards / rightCards are DOM-ordered: [col-N-row1, col-N-row2, ...].
     Any card at an even index is row 1, odd index is row 2 — works for the
     old 2-card arrays and the new 4-card arrays (outer + inner pair). */
  var leftCards   = Array.from(document.querySelectorAll('.hmg-col--outer-left .hmg-card, .hmg-col--left  .hmg-card'));
  var rightCards  = Array.from(document.querySelectorAll('.hmg-col--right .hmg-card, .hmg-col--outer-right .hmg-card'));
  var centerRow1  = document.querySelector('.hmg-col--center .hmg-card');
  var salesSlot   = document.querySelector('.hmg-slot--sales');

  /* ══════════════════════════════════════════
     TIMELINE CONSTANTS
     ══════════════════════════════════════════ */
  var PHASE_1_END         = 65;
  var SETTLE_TIME         = 62;    /* clip-expand completes; chrome reveal fires */
  var CHROME_REVEAL_START = 10;    /* sales card opacity gate lifts — aligns with GSAP fade start */
  var STACK_START         = PHASE_1_END;
  var PHASE_2_SPAN        = 100 - PHASE_1_END;

  /* Stack constants (burial decay) */
  var PEEK_BASE  = 48;
  var PEEK_RATIO = 0.55;
  var SCALE_STEP = 0.06;
  var DIM_STEP   = 0.15;
  var DIM_MAX    = 0.60;
  /* REVEAL_MS removed — unsettle now re-enters flying mode immediately */

  /* Precompute cumulative peek offsets */
  var peekOffsets = [0];
  for (var d = 1; d < N_HUB; d++) {
    peekOffsets[d] = peekOffsets[d - 1] + PEEK_BASE * Math.pow(PEEK_RATIO, d - 1);
  }
  function peekAtDepth(pos) {
    var lo = Math.max(0, Math.min(N_HUB - 2, Math.floor(pos)));
    var hi = lo + 1;
    var t  = Math.max(0, Math.min(1, pos - lo));
    return peekOffsets[lo] + (peekOffsets[hi] - peekOffsets[lo]) * t;
  }

  /* ══════════════════════════════════════════
     STATE
     ══════════════════════════════════════════ */
  var st            = null;
  var settled       = false;
  var settleRafId   = null;   /* rAF handle — cancelled if unsettle fires first */
  var scrollListenersRegistered = false;

  /* Settled card geometry saved in build() for immediate re-entry in unsettle() */
  var _settledY = 0;
  var _cardW    = 0;
  var _mediaH   = 0;

  /* ══════════════════════════════════════════
     BUILD
     ══════════════════════════════════════════ */
  function build() {
    __logCardsM('mobile build() ENTRY');
    if (st) { st.kill(); st = null; }
    if (settleRafId !== null) { cancelAnimationFrame(settleRafId); settleRafId = null; }

    var vw = window.innerWidth;
    var vh = window.innerHeight;

    /* Clear previous state */
    settled = false;
    hubRouter.classList.remove('is-settled');
    pinSpacer.classList.remove('mobile-ready', 'past-chrome-reveal', 'in-stack-phase');

    gsap.killTweensOf([salesHeader, salesFooter]);
    gsap.set([salesHeader, salesFooter], { clearProps: 'all' });
    gsap.set([heroText, salesCard].concat(hubCards.slice(1)).concat(leftCards).concat(rightCards),
             { clearProps: 'all' });
    if (centerRow1) gsap.set(centerRow1, { clearProps: 'all' });

    /* ── Position mobile grid 40px below the hero CTA buttons ── */
    var heroRect = hero.getBoundingClientRect();
    var ctaEl    = heroText.querySelector('.hero-ctas');
    var ctaRect  = (ctaEl || heroText).getBoundingClientRect();
    var gridTop  = (ctaRect.bottom - heroRect.top) + 40;
    mobileGrid.style.top = gridTop + 'px';

    /* ── Measure the sales slot (center col row 2) in hero-local coords ── */
    var slotRect  = salesSlot.getBoundingClientRect();
    var slotX     = slotRect.left   - heroRect.left;
    var slotY     = slotRect.top    - heroRect.top;
    var slotW     = slotRect.width;
    var slotH     = slotRect.height;

    /* ── Settled card geometry ── */
    var cardW     = Math.min(vw - 16, 500);  /* 8px margins, capped at 500px */
    var mediaH    = Math.round((cardW - 8) * 560 / 704);  /* mobile/Expanded.png natural ratio (704×560) */

    /* Read chrome heights from DOM (salesCard is in normal flow after clearProps) */
    var headerH   = salesCard.querySelector('.hhub-card-header').offsetHeight || 56;
    var footerH   = salesCard.querySelector('.hhub-card-footer').offsetHeight || 88;
    var cardH     = headerH + mediaH + footerH;

    /* Clamp to 88% of viewport height */
    var maxCardH = Math.round(vh * 0.88);
    if (cardH > maxCardH) {
      mediaH = maxCardH - headerH - footerH;
      cardH  = maxCardH;
    }

    document.documentElement.style.setProperty('--hhub-media-h',  mediaH  + 'px');
    document.documentElement.style.setProperty('--hhub-card-h',   cardH   + 'px');
    document.documentElement.style.setProperty('--hhub-header-h', headerH + 'px');
    document.documentElement.style.setProperty('--hhub-footer-h', footerH + 'px');

    /* Save settled geometry — unsettle() re-enters flying mode at these exact values
       so GSAP scrub can tween backward with no jump. */
    _settledY = headerH;
    _cardW    = cardW;
    _mediaH   = mediaH;

    /* ── Hub router / track offsets (for GSAP coordinate mapping) ──
       Hub router: position:absolute; top:50%; left:50%; transform:translateX(-50%) translateY(-50%)
       Track:      position:relative; height:100%
       Hub card:   position:absolute; top:0; left:0
       → hub card hero-coords: ((vw-cardW)/2, (vh-cardH)/2) */
    var trackLeft = Math.round((vw - cardW) / 2);
    var trackTop  = Math.round((vh - cardH) / 2);

    /* ── Sales card initial GSAP state (flying mode, at slot position) ── */
    salesCard.classList.add('hhub-card--flying');
    gsap.set(salesCard, {
      x:        slotX - trackLeft,
      y:        slotY - trackTop,
      width:    slotW,
      height:   slotH,
      opacity:  1,
      borderRadius: 16,
      overflow: 'hidden'
    });

    /* ── Stack cards: off-screen below ── */
    for (var i = 1; i < N_HUB; i++) {
      gsap.set(hubCards[i], { y: vh * 1.1 });
    }

    /* ── Drift vectors ──
       Outer cols: row 1 gets extra Y = outerDriftX so in-column gap grows = X spread.
       Center col: same rule — row 1 travels ySalesDrift + outerDriftX while the Sales
         card (row 2) travels ySalesDrift, giving identical gap-growth relationship.
       ySalesDrift is the actual rise distance: slot-y → headerH (not → 0), so the
         flying card image lands at trackTop+headerH — the exact settled media position. */
    var outerDriftY  = Math.round(vh * 0.65);
    var outerDriftX  = Math.round(vw * 0.18);
    var ySalesDrift  = (slotY - trackTop) - headerH;
    var centerDriftY = ySalesDrift + outerDriftX;

    /* ── Build timeline ── */
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-pin-spacer',
        start:   'top top',
        end:     'bottom bottom',
        scrub:   true
      },
      defaults: { ease: 'none', force3D: true }
    });

    /* Hard keyframes at time 0 so fast reverse-scrub resets everything */
    for (var j = 1; j < N_HUB; j++) {
      tl.set(hubCards[j], { y: vh * 1.1 }, 0);
    }
    /* Reset sales-card chrome reveal progress on rebuild (clears any stale
       inline value left over from a previous session/unsettle). */
    tl.set(hubRouter, { '--hhub-reveal-p': 0 }, 0);

    /* ── Phase 1a (0 → 18): hero text rises out ── */
    tl.to(heroText, { y: -160, opacity: 0, duration: 18 }, 0);

    /* ── Phase 1b (0 → 55): flanking columns rise + spread ──
       Row 1 of each flanking col gets an extra Y = outerDriftX so the vertical
       gap between the two images grows at the same rate as the column moves
       outward, keeping the gap visually uniform with the X spread.
       All 4 flanking cols share the same drift magnitude — outermost cols
       are mostly off-screen on typical viewports, so matching motion is fine. */
    leftCards.forEach(function (card, i) {
      var isRow1 = (i % 2 === 0);
      tl.to(card, {
        y: isRow1 ? -(outerDriftY + outerDriftX) : -outerDriftY,
        x: -outerDriftX,
        opacity: 0,
        duration: 55
      }, 0);
    });
    rightCards.forEach(function (card, i) {
      var isRow1 = (i % 2 === 0);
      tl.to(card, {
        y: isRow1 ? -(outerDriftY + outerDriftX) : -outerDriftY,
        x:  outerDriftX,
        opacity: 0,
        duration: 55
      }, 0);
    });

    /* ── Phase 1c (0 → 55): center row 1 rises — same duration as outer cols ── */
    if (centerRow1) {
      tl.to(centerRow1, { y: -centerDriftY, opacity: 0, duration: 55 }, 0);
    }

    /* ── Phase 1d (0 → SETTLE_TIME): Sales card rises + expands ──
       Target y=headerH + height=mediaH: the flying card image then occupies
       trackTop+headerH … trackTop+headerH+mediaH in viewport — identical to
       the settled card's media section. clearProps causes zero visual shift.
       Width + x expand the card left+right in the same motion. */
    tl.to(salesCard, {
      y:        headerH,
      x:        0,
      width:    cardW,
      height:   mediaH,
      duration: SETTLE_TIME
    }, 0);

    /* ── Phase 1e (SETTLE_TIME → PHASE_1_END): sales chrome reveal ──
       Scrub-driven 0 → 1 on --hhub-reveal-p. CSS maps this to clip-path,
       label/copy transforms, and media padding. Same tween plays backward
       on scroll-up, so the card closes gradually and stays in sync with
       the shrink back to slot position. The tween reaches 0 exactly when
       unsettle() flips --flying back on, so the header/footer position
       swap (static → absolute) happens while chrome is fully clipped
       invisible — no visible jump. */
    tl.fromTo(hubRouter,
      { '--hhub-reveal-p': 0 },
      { '--hhub-reveal-p': 1, duration: PHASE_1_END - SETTLE_TIME },
      SETTLE_TIME
    );


    /* ── Phase 2: stack cards (65 → 100) ── */
    var perCard = PHASE_2_SPAN / (N_HUB - 1);
    var t0      = PHASE_1_END;

    for (var k = 1; k < N_HUB; k++) {
      var arriveStart = t0 + (k - 1) * perCard;

      tl.to(hubCards[k],
        { y: 0, duration: perCard },
        arriveStart
      );

      (function (arrivingI, startUnit) {
        for (var m = 0; m < arrivingI; m++) {
          var toDepth = arrivingI - m;
          tl.to(hubCards[m], {
            y:            -peekAtDepth(toDepth),
            scale:        Math.max(0.75, 1 - toDepth * SCALE_STEP),
            '--hhub-dim': Math.min(DIM_MAX, toDepth * DIM_STEP).toFixed(2),
            duration: perCard
          }, startUnit);
        }
      })(k, arriveStart);
    }

    st = tl.scrollTrigger;
    __logCardsM('mobile build() EXIT');

    requestAnimationFrame(function () {
      /* Skip if settle() already fired synchronously (e.g. scroll-restored past
         SETTLE_TIME) — settle's own rAF will add mobile-ready alongside is-settled
         so both arrive in the same frame, preventing a one-frame flash. */
      if (!settled) pinSpacer.classList.add('mobile-ready');
    });
  }

  /* ══════════════════════════════════════════
     SETTLE / UNSETTLE
     Same threshold logic as desktop: at SETTLE_TIME
     remove --flying, clear GSAP transforms, add
     .is-settled to trigger CSS chrome reveal.
     ══════════════════════════════════════════ */
  function settle() {
    if (settled) return;
    settled = true;
    gsap.killTweensOf([salesHeader, salesFooter]);
    gsap.set([salesHeader, salesFooter], { clearProps: 'all' });
    gsap.set(salesCard, { clearProps: 'all' });
    salesCard.classList.remove('hhub-card--flying');
    hubRouter.style.pointerEvents = 'auto';
    hubRouter.removeAttribute('aria-hidden');
    settleRafId = requestAnimationFrame(function () {
      settleRafId = null;
      hubRouter.classList.add('is-settled');
      /* Ensure hub router is visible — covers the case where build()'s rAF
         skipped mobile-ready because settle() had already fired. */
      pinSpacer.classList.add('mobile-ready');
    });
  }

  function unsettle() {
    if (!settled) return;
    /* Cancel the settle rAF if it hasn't fired yet — prevents is-settled
       being added after we've already reverted to flying mode. */
    if (settleRafId !== null) {
      cancelAnimationFrame(settleRafId);
      settleRafId = null;
    }
    settled = false;
    hubRouter.classList.remove('is-settled');
    hubRouter.style.pointerEvents = 'none';
    hubRouter.setAttribute('aria-hidden', 'true');
    /* Re-enter flying mode at settled geometry so GSAP scrub tweens back
       with no jump. Chrome close is scroll-driven via --hhub-reveal-p —
       the tween hits 0 exactly at this boundary, so header/footer are
       fully clipped invisible when --flying flips them from static to
       absolute positioning. No visible jump. */
    salesCard.classList.add('hhub-card--flying');
    gsap.set(salesCard, {
      opacity:      1,
      borderRadius: 16,
      overflow:     'hidden',
      x:            0,
      y:            _settledY,
      width:        _cardW,
      height:       _mediaH
    });
  }

  /* ══════════════════════════════════════════
     HARD VISIBILITY GATES
     Native scroll listener — bypasses GSAP scrub lag.
     ══════════════════════════════════════════ */
  var gateTicking = false;
  function updateGates() {
    /* Scroll listeners stay registered after a M→D resize (registerOnce).
       Bail on desktop so mobile's settle/unsettle don't fire there and
       corrupt the hub-card state desktop is actively managing. */
    if (window.innerWidth >= 768) return;
    var rect       = pinSpacer.getBoundingClientRect();
    var scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return;
    var pct = Math.max(0, Math.min(1, -rect.top / scrollable)) * 100;
    pinSpacer.classList.toggle('past-chrome-reveal', pct >= CHROME_REVEAL_START);
    pinSpacer.classList.toggle('in-stack-phase',     pct >= STACK_START);
    /* Settle / unsettle threshold */
    if (pct >= SETTLE_TIME) settle();
    else                    unsettle();
  }

  function onScrollGate() {
    if (gateTicking) return;
    gateTicking = true;
    requestAnimationFrame(function () { updateGates(); gateTicking = false; });
  }

  /* ══════════════════════════════════════════
     RESIZE
     ══════════════════════════════════════════ */
  function cleanupMobile() {
    __logCardsM('cleanupMobile ENTRY');
    if (st) { st.kill(); st = null; }
    if (settleRafId !== null) { cancelAnimationFrame(settleRafId); settleRafId = null; }
    settled = false;
    pinSpacer.classList.remove('mobile-ready', 'past-chrome-reveal', 'in-stack-phase');
    gsap.killTweensOf([salesHeader, salesFooter]);
    mobileGrid.style.top = '';
    __logCardsM('cleanupMobile EXIT');
    /* Only clear state that desktop's build does NOT re-initialize on its own.
       Both scripts' debounced resize callbacks fire after the same 200ms; they
       run in script-tag registration order, so desktop's buildTimeline() runs
       FIRST (installing fresh hub-card class + inline transforms) and this
       cleanup runs SECOND. Wiping .hhub-card--flying, hub-card inline styles,
       or chrome clip-paths here would clobber the build that just happened.
       Desktop's buildTimeline() handles its own clearProps at the top. */
  }

  function scrollToTop() {
    if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function ensureScrollListeners() {
    if (scrollListenersRegistered) return;
    scrollListenersRegistered = true;
    window.addEventListener('scroll', onScrollGate, { passive: true });
    if (window.__lenis && typeof window.__lenis.on === 'function') {
      window.__lenis.on('scroll', onScrollGate);
    }
  }

  /* ══════════════════════════════════════════
     PUBLIC HOOKS
     The breakpoint orchestrator is the sole caller of the build/cleanup
     hooks. Resize listening + initial boot live in that orchestrator — not
     here — so there's no cross-script race over .hhub-track's transform.
     ══════════════════════════════════════════ */
  window.__heroMobileBuild = function () {
    build();
    updateGates();
    ensureScrollListeners();
  };
  window.__heroMobileCleanup = cleanupMobile;

}());

/* ===== source: scripts/hero-breakpoint-orchestrator.js ===== */
/* ============================================
   HERO BREAKPOINT ORCHESTRATOR

   Single source of truth for desktop/mobile
   transitions. Replaces the previous three-
   script arrangement (hub-router.js, hero-grid.js,
   hero-grid-mobile.js) where each script ran its
   own debounced resize listener and the three
   raced over .hhub-track's inline transform and
   hub-card GSAP state.

   This script:
     - owns the single resize listener
     - uses window.innerWidth as the breakpoint
       decision (matches every other file in the
       codebase — don't switch to matchMedia mid-
       refactor)
     - debounces resize events at 200ms
     - on boundary crossing, runs:
         scrollToTop → teardown(old) → build(new)
       in one synchronous sequence, so there is
       never a window in which one script's
       teardown runs after another's build and
       clobbers it
     - on same-breakpoint resize, just rebuilds
       the current side

   Must load AFTER hub-router.js, hero-grid.js,
   and hero-grid-mobile.js so the build/cleanup
   hooks exist on window by the time this IIFE
   runs its initial boot.
   ============================================ */
(function () {
  'use strict';

  var BP          = 768;
  var DEBOUNCE_MS = 200;

  function scrollToTop() {
    if (window.__lenis && typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }

  function isDesktop() { return window.innerWidth >= BP; }

  /* currentMode: 'desktop' | 'mobile' | null (pre-boot) */
  var currentMode = null;

  function teardown(mode) {
    if (mode === 'desktop') {
      if (typeof window.__heroDesktopCleanup === 'function') {
        window.__heroDesktopCleanup();
      }
    } else if (mode === 'mobile') {
      if (typeof window.__heroMobileCleanup === 'function') {
        window.__heroMobileCleanup();
      }
    }
  }

  function build(mode) {
    if (mode === 'desktop') {
      if (typeof window.__heroDesktopBuild === 'function') {
        window.__heroDesktopBuild();
      }
    } else if (mode === 'mobile') {
      if (typeof window.__heroMobileBuild === 'function') {
        window.__heroMobileBuild();
      }
    }
  }

  function applyMode(targetMode) {
    if (targetMode === currentMode) {
      /* Same breakpoint — just rebuild (the GSAP builds reset all inline
         state at their top, so rebuild-over-self is safe). */
      build(targetMode);
      return;
    }
    /* Breakpoint crossing — scrollToTop BEFORE teardown so any scroll-
       triggered onUpdate fires while both STs are still alive (it won't
       corrupt anything because teardown will wipe their state next).
       Then teardown the old mode, then build the new one. Single
       synchronous sequence; no cross-script race. */
    scrollToTop();
    teardown(currentMode);
    build(targetMode);
    currentMode = targetMode;
  }

  /* ── Initial boot ── */
  currentMode = isDesktop() ? 'desktop' : 'mobile';
  build(currentMode);

  /* ── Resize handler (debounced) ── */
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      applyMode(isDesktop() ? 'desktop' : 'mobile');
    }, DEBOUNCE_MS);
  }, { passive: true });

  /* Expose for debugging. */
  window.__heroOrchestrator = {
    getMode:   function () { return currentMode; },
    applyMode: applyMode
  };

}());

/* ===== source: scripts/reveal-tuner.js ===== */
/* ============================================
   TUNER — dev UI for hero grid timing + chrome reveal + title fade.
   Floats bottom-right. Sliders:
     • Grid          — outer (cols 1+5), inner (cols 2+4), center (col 3)
     • Settle        — detach / swap (bottom cards → carousel cards)
     • Chrome reveal — start / end
     • Title         — start / end (hub title fade-in)
   Values persist in localStorage under 'revealTuner.v7' so a reload keeps
   your last settings. Clear with "Reset to defaults".
   ============================================ */
(function () {
  'use strict';

  if (window.innerWidth < 768) return;

  var STORAGE_KEY = 'revealTuner.v7';

  function waitForHook(cb) {
    if (window.__heroGrid) return cb();
    var tries = 0;
    var t = setInterval(function () {
      if (window.__heroGrid) { clearInterval(t); cb(); }
      else if (++tries > 100) { clearInterval(t); }      /* ~5s max */
    }, 50);
  }

  function loadStored() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (!v || typeof v !== 'object') return null;
      return v;
    } catch (e) { return null; }
  }
  function saveStored(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { /* ignore quota */ }
  }

  /* Small helper: create an element with optional class and text. */
  function el(tag, cls, txt) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt !== undefined) n.textContent = txt;
    return n;
  }

  waitForHook(function () {
    var api = window.__heroGrid;

    /* Capture defaults from the live hook BEFORE applying stored overrides. */
    var defaults = {
      revealStart: api.getRevealRange().start,
      revealEnd:   api.getRevealRange().end,
      detach:      api.getBlendWindow().detach,
      swap:        api.getBlendWindow().swap,
      outerSpeed:  api.getOuterSpeed(),
      innerSpeed:  api.getInnerSpeed(),
      centerSpeed: api.getCenterSpeed(),
      titleStart:  api.getTitleFadeRange().start,
      titleEnd:    api.getTitleFadeRange().end
    };

    /* Merge stored over defaults into a single working state object. */
    var stored = loadStored() || {};
    var state = {
      revealStart: typeof stored.revealStart === 'number' ? stored.revealStart : defaults.revealStart,
      revealEnd:   typeof stored.revealEnd   === 'number' ? stored.revealEnd   : defaults.revealEnd,
      detach:      typeof stored.detach      === 'number' ? stored.detach      : defaults.detach,
      swap:        typeof stored.swap        === 'number' ? stored.swap        : defaults.swap,
      outerSpeed:  typeof stored.outerSpeed  === 'number' ? stored.outerSpeed  : defaults.outerSpeed,
      innerSpeed:  typeof stored.innerSpeed  === 'number' ? stored.innerSpeed  : defaults.innerSpeed,
      centerSpeed: typeof stored.centerSpeed === 'number' ? stored.centerSpeed : defaults.centerSpeed,
      titleStart:  typeof stored.titleStart  === 'number' ? stored.titleStart  : defaults.titleStart,
      titleEnd:    typeof stored.titleEnd    === 'number' ? stored.titleEnd    : defaults.titleEnd
    };

    /* Push state into the live system before building the UI. */
    api.setRevealRange(state.revealStart, state.revealEnd);
    api.setBlendWindow(state.detach, state.swap);
    api.setOuterSpeed(state.outerSpeed);
    api.setInnerSpeed(state.innerSpeed);
    api.setCenterSpeed(state.centerSpeed);
    api.setTitleFadeRange(state.titleStart, state.titleEnd);

    /* ── Styles (injected once) ── */
    var css =
      '.rt-panel { position: fixed; right: 16px; bottom: 16px; z-index: 9999;' +
      '  width: 300px; padding: 14px 14px 12px; border-radius: 10px;' +
      '  background: rgba(20, 20, 20, 0.92); color: #f4f4f4;' +
      '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;' +
      '  font-size: 12px; line-height: 1.4;' +
      '  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);' +
      '  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);' +
      '  user-select: none; }' +
      '.rt-panel.rt-collapsed { width: auto; padding: 8px 12px; }' +
      '.rt-panel.rt-collapsed .rt-body { display: none; }' +
      '.rt-head { display: flex; align-items: center; justify-content: space-between; }' +
      '.rt-title { font-weight: 600; letter-spacing: 0.02em; }' +
      '.rt-toggle { background: transparent; color: #aaa; border: 0; cursor: pointer;' +
      '  font-size: 14px; line-height: 1; padding: 2px 6px; border-radius: 4px; }' +
      '.rt-toggle:hover { color: #fff; background: rgba(255,255,255,0.08); }' +
      '.rt-body { margin-top: 10px; }' +
      '.rt-section { font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase;' +
      '  color: #888; margin: 10px 0 6px; padding-bottom: 3px;' +
      '  border-bottom: 1px solid #2c2c2c; }' +
      '.rt-section:first-child { margin-top: 0; }' +
      '.rt-row { display: grid; grid-template-columns: 54px 1fr 56px; gap: 8px;' +
      '  align-items: center; margin-bottom: 6px; }' +
      '.rt-row label { font-weight: 500; color: #ccc; }' +
      '.rt-row input[type=range] { width: 100%; accent-color: #3b63fb; }' +
      '.rt-row input[type=number] { width: 56px; background: #222; color: #fff;' +
      '  border: 1px solid #444; border-radius: 4px; padding: 3px 6px; font-size: 11px;' +
      '  font-family: "SF Mono", Menlo, monospace; text-align: right; }' +
      '.rt-track { position: relative; height: 10px; margin: 12px 0 6px;' +
      '  background: #2a2a2a; border-radius: 2px; overflow: hidden; }' +
      '.rt-band { position: absolute; top: 0; bottom: 0; background: rgba(59, 99, 251, 0.4); }' +
      '.rt-blend { position: absolute; top: 0; bottom: 0;' +
      '  background: repeating-linear-gradient(90deg, rgba(255,180,50,0.4) 0 3px, transparent 3px 6px); }' +
      '.rt-now { position: absolute; top: -3px; bottom: -3px; width: 2px;' +
      '  background: #ff3860; box-shadow: 0 0 4px rgba(255,56,96,0.6); pointer-events: none; }' +
      '.rt-readout { display: flex; justify-content: space-between; font-size: 10px;' +
      '  color: #999; font-family: "SF Mono", Menlo, monospace; margin-top: 6px; }' +
      '.rt-readout .rt-p { color: #ff6b86; }' +
      '.rt-legend { display: flex; gap: 12px; font-size: 10px; color: #888;' +
      '  margin-top: 4px; font-family: "SF Mono", Menlo, monospace; }' +
      '.rt-legend .sw { display: inline-block; width: 10px; height: 8px;' +
      '  border-radius: 2px; margin-right: 5px; vertical-align: -1px; }' +
      '.rt-legend .sw-settle { background: repeating-linear-gradient(90deg, rgba(255,180,50,0.8) 0 2px, transparent 2px 4px); }' +
      '.rt-legend .sw-reveal { background: rgba(59, 99, 251, 0.6); }' +
      '.rt-reset { margin-top: 10px; width: 100%; padding: 5px; background: #2a2a2a;' +
      '  color: #bbb; border: 1px solid #3a3a3a; border-radius: 4px; cursor: pointer;' +
      '  font-size: 11px; }' +
      '.rt-reset:hover { background: #333; color: #fff; }';

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    /* ── DOM ── */
    var panel = el('div', 'rt-panel rt-collapsed');              /* collapsed by default */

    var head = el('div', 'rt-head');
    head.appendChild(el('div', 'rt-title', 'Timeline controls'));
    var toggle = el('button', 'rt-toggle', '+');                 /* '+' when collapsed */
    toggle.type = 'button';
    toggle.setAttribute('aria-label', 'Expand');
    head.appendChild(toggle);
    panel.appendChild(head);

    var body = el('div', 'rt-body');

    /* makeRow: label + range slider + number input.
       opts.min/max/step/precision customise the numeric domain (defaults 0–1). */
    function makeRow(id, labelText, value, opts) {
      opts = opts || {};
      var min  = opts.min  != null ? opts.min  : 0;
      var max  = opts.max  != null ? opts.max  : 1;
      var step = opts.step != null ? opts.step : 0.01;
      var precision = opts.precision != null ? opts.precision : 2;

      var row = el('div', 'rt-row');
      var lbl = el('label', null, labelText);
      lbl.htmlFor = id;
      var sl = document.createElement('input');
      sl.id = id; sl.type = 'range';
      sl.min = String(min); sl.max = String(max); sl.step = String(step);
      sl.value = String(value);
      var num = document.createElement('input');
      num.id = id + '-n'; num.type = 'number';
      num.min = String(min); num.max = String(max); num.step = String(step);
      num.value = Number(value).toFixed(precision);
      row.appendChild(lbl);
      row.appendChild(sl);
      row.appendChild(num);
      return { row: row, slider: sl, number: num, precision: precision };
    }

    /* Grid section */
    body.appendChild(el('div', 'rt-section', 'Grid'));
    var SPEED_OPTS = { min: 0.5, max: 3, step: 0.05 };
    var outerCtl  = makeRow('rt-outer',  'Outer',  state.outerSpeed,  SPEED_OPTS);
    var innerCtl  = makeRow('rt-inner',  'Inner',  state.innerSpeed,  SPEED_OPTS);
    var centerCtl = makeRow('rt-center', 'Center', state.centerSpeed, SPEED_OPTS);
    body.appendChild(outerCtl.row);
    body.appendChild(innerCtl.row);
    body.appendChild(centerCtl.row);

    /* Settle section */
    body.appendChild(el('div', 'rt-section', 'Settle'));
    var detachCtl = makeRow('rt-detach', 'Detach', state.detach);
    var swapCtl   = makeRow('rt-swap',   'Swap',   state.swap);
    body.appendChild(detachCtl.row);
    body.appendChild(swapCtl.row);

    /* Chrome reveal section */
    body.appendChild(el('div', 'rt-section', 'Chrome reveal'));
    var startCtl = makeRow('rt-start', 'Start', state.revealStart);
    var endCtl   = makeRow('rt-end',   'End',   state.revealEnd);
    body.appendChild(startCtl.row);
    body.appendChild(endCtl.row);

    /* Title fade section */
    body.appendChild(el('div', 'rt-section', 'Title'));
    var titleStartCtl = makeRow('rt-title-start', 'Start', state.titleStart);
    var titleEndCtl   = makeRow('rt-title-end',   'End',   state.titleEnd);
    body.appendChild(titleStartCtl.row);
    body.appendChild(titleEndCtl.row);

    /* Track visualization */
    var track = el('div', 'rt-track');
    var blendBar = el('div', 'rt-blend');
    var band     = el('div', 'rt-band');
    var nowBar   = el('div', 'rt-now');
    track.appendChild(blendBar);
    track.appendChild(band);
    track.appendChild(nowBar);
    body.appendChild(track);

    var readout = el('div', 'rt-readout');
    readout.appendChild(el('span', null, '0.0'));
    var pReadout = el('span', 'rt-p', 'p: 0.00');
    readout.appendChild(pReadout);
    readout.appendChild(el('span', null, '1.0'));
    body.appendChild(readout);

    var legend = el('div', 'rt-legend');
    var lg1 = el('span'); lg1.appendChild(el('span', 'sw sw-settle')); lg1.appendChild(document.createTextNode('settle'));
    var lg2 = el('span'); lg2.appendChild(el('span', 'sw sw-reveal')); lg2.appendChild(document.createTextNode('chrome'));
    legend.appendChild(lg1);
    legend.appendChild(lg2);
    body.appendChild(legend);

    var reset = el('button', 'rt-reset', 'Reset to defaults');
    reset.type = 'button';
    body.appendChild(reset);

    panel.appendChild(body);
    document.body.appendChild(panel);

    var pct = function (v) { return (v * 100) + '%'; };

    /* Write current state to all controls + track bars. skip identifies which
       input is currently being driven by the user — form "<key>-s" for the
       slider, "<key>-n" for the number field. We skip only that one input so
       its peer (the paired number or slider) updates live in response. */
    function renderControls(skip) {
      function fmt(n, p) { return Number(n).toFixed(p); }
      function writeRow(ctl, key, val) {
        if (skip !== key + '-s') ctl.slider.value = String(val);
        if (skip !== key + '-n') ctl.number.value = fmt(val, ctl.precision);
      }
      writeRow(outerCtl,      'outer',       state.outerSpeed);
      writeRow(innerCtl,      'inner',       state.innerSpeed);
      writeRow(centerCtl,     'center',      state.centerSpeed);
      writeRow(detachCtl,     'detach',      state.detach);
      writeRow(swapCtl,       'swap',        state.swap);
      writeRow(startCtl,      'start',       state.revealStart);
      writeRow(endCtl,        'end',         state.revealEnd);
      writeRow(titleStartCtl, 'title-start', state.titleStart);
      writeRow(titleEndCtl,   'title-end',   state.titleEnd);

      band.style.left      = pct(state.revealStart);
      band.style.right     = pct(1 - state.revealEnd);
      blendBar.style.left  = pct(state.detach);
      blendBar.style.right = pct(1 - state.swap);
    }

    /* Clamp, push to live system, persist, re-render. */
    function commit(skip) {
      state.outerSpeed  = Math.max(0.1, state.outerSpeed);
      state.innerSpeed  = Math.max(0.1, state.innerSpeed);
      state.centerSpeed = Math.max(0.1, state.centerSpeed);

      if (state.detach < 0) state.detach = 0;
      else if (state.detach > 1) state.detach = 1;
      if (state.swap < 0) state.swap = 0;
      else if (state.swap > 1) state.swap = 1;
      if (state.swap <= state.detach) state.swap = Math.min(1, state.detach + 0.01);

      if (state.revealStart < 0) state.revealStart = 0;
      else if (state.revealStart > 1) state.revealStart = 1;
      if (state.revealEnd < 0) state.revealEnd = 0;
      else if (state.revealEnd > 1) state.revealEnd = 1;
      if (state.revealEnd <= state.revealStart) state.revealEnd = Math.min(1, state.revealStart + 0.01);

      if (state.titleStart < 0) state.titleStart = 0;
      else if (state.titleStart > 1) state.titleStart = 1;
      if (state.titleEnd < 0) state.titleEnd = 0;
      else if (state.titleEnd > 1) state.titleEnd = 1;
      if (state.titleEnd <= state.titleStart) state.titleEnd = Math.min(1, state.titleStart + 0.01);

      api.setOuterSpeed(state.outerSpeed);
      api.setInnerSpeed(state.innerSpeed);
      api.setCenterSpeed(state.centerSpeed);
      api.setBlendWindow(state.detach, state.swap);
      api.setRevealRange(state.revealStart, state.revealEnd);
      api.setTitleFadeRange(state.titleStart, state.titleEnd);
      saveStored(state);
      renderControls(skip);
    }

    renderControls();

    /* ── Handlers ──
       `which` is 's' (slider) or 'n' (number input) — passed through to
       commit() → renderControls() so only the input the user is currently
       driving is skipped; its paired input updates live. */
    function onOuter(src, which) {
      var v = parseFloat(src.value); if (!isFinite(v)) return;
      state.outerSpeed = v; commit('outer-' + which);
    }
    function onInner(src, which) {
      var v = parseFloat(src.value); if (!isFinite(v)) return;
      state.innerSpeed = v; commit('inner-' + which);
    }
    function onCenter(src, which) {
      var v = parseFloat(src.value); if (!isFinite(v)) return;
      state.centerSpeed = v; commit('center-' + which);
    }
    function onDetach(src, which) {
      var v = parseFloat(src.value); if (!isFinite(v)) return;
      state.detach = v; commit('detach-' + which);
    }
    function onSwap(src, which) {
      var v = parseFloat(src.value); if (!isFinite(v)) return;
      state.swap = v; commit('swap-' + which);
    }
    /* Start — keeps End pinned; Duration = End - Start. */
    function onStart(src, which) {
      var v = parseFloat(src.value); if (!isFinite(v)) return;
      state.revealStart = v; commit('start-' + which);
    }
    /* End — keeps Start pinned; Duration = End - Start. */
    function onEnd(src, which) {
      var v = parseFloat(src.value); if (!isFinite(v)) return;
      state.revealEnd = v; commit('end-' + which);
    }
    function onTitleStart(src, which) {
      var v = parseFloat(src.value); if (!isFinite(v)) return;
      state.titleStart = v; commit('title-start-' + which);
    }
    function onTitleEnd(src, which) {
      var v = parseFloat(src.value); if (!isFinite(v)) return;
      state.titleEnd = v; commit('title-end-' + which);
    }

    outerCtl .slider.addEventListener('input', function () { onOuter (outerCtl .slider, 's'); });
    outerCtl .number.addEventListener('input', function () { onOuter (outerCtl .number, 'n'); });
    innerCtl .slider.addEventListener('input', function () { onInner (innerCtl .slider, 's'); });
    innerCtl .number.addEventListener('input', function () { onInner (innerCtl .number, 'n'); });
    centerCtl.slider.addEventListener('input', function () { onCenter(centerCtl.slider, 's'); });
    centerCtl.number.addEventListener('input', function () { onCenter(centerCtl.number, 'n'); });
    detachCtl.slider.addEventListener('input', function () { onDetach(detachCtl.slider, 's'); });
    detachCtl.number.addEventListener('input', function () { onDetach(detachCtl.number, 'n'); });
    swapCtl  .slider.addEventListener('input', function () { onSwap  (swapCtl  .slider, 's'); });
    swapCtl  .number.addEventListener('input', function () { onSwap  (swapCtl  .number, 'n'); });
    startCtl .slider.addEventListener('input', function () { onStart (startCtl .slider, 's'); });
    startCtl .number.addEventListener('input', function () { onStart (startCtl .number, 'n'); });
    endCtl   .slider.addEventListener('input', function () { onEnd   (endCtl   .slider, 's'); });
    endCtl   .number.addEventListener('input', function () { onEnd   (endCtl   .number, 'n'); });
    titleStartCtl.slider.addEventListener('input', function () { onTitleStart(titleStartCtl.slider, 's'); });
    titleStartCtl.number.addEventListener('input', function () { onTitleStart(titleStartCtl.number, 'n'); });
    titleEndCtl  .slider.addEventListener('input', function () { onTitleEnd  (titleEndCtl  .slider, 's'); });
    titleEndCtl  .number.addEventListener('input', function () { onTitleEnd  (titleEndCtl  .number, 'n'); });

    reset.addEventListener('click', function () {
      state.revealStart = defaults.revealStart;
      state.revealEnd   = defaults.revealEnd;
      state.detach      = defaults.detach;
      state.swap        = defaults.swap;
      state.outerSpeed  = defaults.outerSpeed;
      state.innerSpeed  = defaults.innerSpeed;
      state.centerSpeed = defaults.centerSpeed;
      state.titleStart  = defaults.titleStart;
      state.titleEnd    = defaults.titleEnd;
      commit();
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    });

    toggle.addEventListener('click', function () {
      var collapsed = panel.classList.toggle('rt-collapsed');
      toggle.textContent = collapsed ? '+' : '–';
      toggle.setAttribute('aria-label', collapsed ? 'Expand' : 'Collapse');
    });

    /* Live progress readout (rAF loop) */
    function tick() {
      var p = api.getProgress();
      nowBar.style.left = pct(p);
      pReadout.textContent = 'p: ' + p.toFixed(2);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}());

/* ===== source: scripts/editorial.js ===== */
(function () {
  'use strict';

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── Editorial parallax ───────────────────────────────────────────────
     The editorial section sits BEHIND the hero's rounded bottom (z:0,
     negative margin). As the hero finishes its pin and begins to un-stick,
     the editorial's inner content rises into place slower than the page
     scrolls — giving a sense that it was underneath all along.

     Spec:
       - Trigger anchored to the hero-pin-spacer's end, so the parallax
         is in sync with the hero's un-pin moment (true layered motion,
         not a generic scroll-in).
       - Scrub: ties every animation frame to the scroll position.
       - Travel: 18vh — enough to feel "slower than scroll" without making
         the content float or lag unnaturally.
  ─────────────────────────────────────────────────────────────────────── */
  function init() {
    var pinSpacer = document.querySelector('.hero-pin-spacer');
    var layer     = document.querySelector('.editorial-parallax');
    if (!pinSpacer || !layer) return;

    /* Section parallax — slower-than-scroll rise during hero un-pin. */
    gsap.fromTo(layer,
      { y: function () { return window.innerHeight * 0.18; } },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: pinSpacer,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    /* ── Card stagger rise-in ─────────────────────────────────────────
       Mirrors the language of the text-animate cascade (same ease, same
       scrubbed scrollTrigger, same base step), but the trigger is the
       cards row itself — so the rise happens while the cards are
       actually entering the viewport, not while the copy is being read.
       Left card lifts first, right trails by one base step, matching the
       staggered feel of the headline lines above. */
    var row   = document.querySelector('.editorial-cards');
    var cards = row ? row.querySelectorAll('.ed-card') : [];
    if (row && cards.length) {
      var BASE = window.innerHeight * 0.08;     // slightly taller than text step so card travel reads
      var cardTl = gsap.timeline();
      cards.forEach(function (card, i) {
        gsap.set(card, { y: (i + 1) * BASE });
        cardTl.to(card, { y: 0, ease: 'power2.out', duration: 1 }, 0);
      });
      ScrollTrigger.create({
        trigger: row,
        start: 'top 95%',
        end: 'top 50%',
        scrub: true,
        animation: cardTl,
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());

/* ===== source: scripts/text-animate.js ===== */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ── Global Text Animator ──────────────────────────────────────────────────
     Spec (Adobe Motion Docs):
       - Applies to free text (not visually constrained by a box or image)
       - Trigger: 90% VH → 40% VH, scrubbed directly to scroll
       - Mechanic: line-by-line reveal — each line slides up from a clip boundary
       - Compression curve: each line starts progressively further from rest,
         so lower lines travel more distance and resolve last, creating
         an elastic snap-together feel as the block resolves
  ─────────────────────────────────────────────────────────────────────────── */

  /* Measure rendered visual lines for a given element + text segment.
     Temporarily injects word spans into a hidden clone, reads their
     getBoundingClientRect top values, then groups words by line. */
  function measureLines(el, text) {
    var cs = window.getComputedStyle(el);
    var words = text.trim().split(/\s+/);
    if (!words.length) return [];

    var tmp = document.createElement('div');
    tmp.setAttribute('aria-hidden', 'true');
    tmp.style.cssText = [
      'position:absolute', 'visibility:hidden', 'pointer-events:none',
      'top:0', 'left:0',
      'width:' + el.offsetWidth + 'px',
      'font-family:' + cs.fontFamily,
      'font-size:' + cs.fontSize,
      'font-weight:' + cs.fontWeight,
      'line-height:' + cs.lineHeight,
      'letter-spacing:' + cs.letterSpacing,
      'white-space:' + cs.whiteSpace,
    ].join(';');

    tmp.innerHTML = words.map(function (w) {
      return '<span style="display:inline">' + w + '</span>';
    }).join(' ');

    document.body.appendChild(tmp);

    var spans = tmp.querySelectorAll('span');
    var lines = [];
    var currentLine = [];
    var lastTop = null;

    spans.forEach(function (span, i) {
      var top = Math.round(span.getBoundingClientRect().top);
      if (lastTop === null) lastTop = top;
      if (top !== lastTop) {
        lines.push(currentLine.join(' '));
        currentLine = [];
        lastTop = top;
      }
      currentLine.push(words[i]);
    });
    if (currentLine.length) lines.push(currentLine.join(' '));

    document.body.removeChild(tmp);
    return lines.filter(Boolean);
  }

  /* Split an element's text into visual lines and rebuild its innerHTML
     with overflow-hidden wrappers. Returns the array of inner span nodes
     (the animating elements). Handles explicit <br> as hard line breaks.
     If the element already contains pre-split .ta-line markup, skips
     measurement and returns the existing inner spans directly. */
  function wrapLines(el) {
    var existing = el.querySelectorAll('.ta-line-inner');
    if (existing.length) return Array.from(existing);

    var segments = el.innerHTML.split(/<br\s*\/?>/gi);
    var allLines = [];

    segments.forEach(function (seg) {
      var plain = seg.replace(/<[^>]+>/g, '').trim();
      if (!plain) return;
      var lines = measureLines(el, plain);
      allLines = allLines.concat(lines);
    });

    if (!allLines.length) return [];

    el.innerHTML = allLines.map(function (line) {
      return '<span class="ta-line"><span class="ta-line-inner">' + line + '</span></span>';
    }).join('');

    return Array.from(el.querySelectorAll('.ta-line-inner'));
  }

  /* Animate a [data-ta-group] container.
     Collects [data-ta] children (line-split) and [data-ta-unit] children
     (whole-block) in document order, assigns each item a progressively larger
     starting y offset, then scrubs them all to y:0 over the scroll range. */
  function animateGroup(groupEl) {
    /* Collect all animatable children in DOM order */
    var allEls = Array.from(groupEl.querySelectorAll('[data-ta], [data-ta-unit]'));
    if (!allEls.length) return;

    /* Build the flat list of animating nodes:
       - [data-ta]   → split into line inner spans
       - [data-ta-unit] → the element itself as a single unit */
    var allItems = [];
    allEls.forEach(function (el) {
      if (el.hasAttribute('data-ta-unit')) {
        allItems.push(el);
      } else {
        var inners = wrapLines(el);
        allItems = allItems.concat(inners);
      }
    });

    if (!allItems.length) return;

    /* Base offset per step — scales with viewport height */
    var BASE_OFFSET = window.innerHeight * 0.065;

    var tl = gsap.timeline();

    allItems.forEach(function (item, i) {
      gsap.set(item, { y: (i + 1) * BASE_OFFSET });
      tl.to(item, {
        y: 0,
        ease: 'power2.out',
        duration: 1,
      }, 0);
    });

    ScrollTrigger.create({
      trigger: groupEl,
      start: 'top 90%',
      end: 'top 40%',
      scrub: true,
      animation: tl,
    });
  }

  /* Init — wait for fonts before measuring so line-splitting uses the correct
     typeface metrics, not fallback system font widths */
  document.fonts.ready.then(function () {
    document.querySelectorAll('[data-ta-group]').forEach(animateGroup);
  });

  /* Expose the line-splitter so other scripts (e.g. hero-grid.js) can reuse it
     without pulling in the auto-ScrollTrigger wiring that animateGroup adds. */
  window.__taWrapLines = wrapLines;

}());

