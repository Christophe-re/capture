(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{GvPW:function(t,e,r){"use strict";r.r(e),r.d(e,"scopeCss",(function(){return S}));var n=")(?:\\(((?:\\([^)(]*\\)|[^)(]*)+?)\\))?([^,{]*)",s=new RegExp("(-shadowcsshost"+n,"gim"),o=new RegExp("(-shadowcsscontext"+n,"gim"),c=new RegExp("(-shadowcssslotted"+n,"gim"),a=/-shadowcsshost-no-combinator([^\s]*)/,i=[/::shadow/g,/::content/g],u=/-shadowcsshost/gim,l=/:host/gim,h=/::slotted/gim,p=/:host-context/gim,f=/\/\*\s*[\s\S]*?\*\//g,d=/\/\*\s*#\s*source(Mapping)?URL=[\s\S]+?\*\//g,g=/(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g,m=/([{}])/g,v=function(t,e){var r=w(t),n=0;return r.escapedString.replace(g,(function(){for(var t=[],s=0;s<arguments.length;s++)t[s]=arguments[s];var o=t[2],c="",a=t[4],i="";a&&a.startsWith("{%BLOCK%")&&(c=r.blocks[n++],a=a.substring("%BLOCK%".length+1),i="{");var u=e({selector:o,content:c});return""+t[1]+u.selector+t[3]+i+u.content+a}))},w=function(t){for(var e=t.split(m),r=[],n=[],s=0,o=[],c=0;c<e.length;c++){var a=e[c];"}"===a&&s--,s>0?o.push(a):(o.length>0&&(n.push(o.join("")),r.push("%BLOCK%"),o=[]),r.push(a)),"{"===a&&s++}return o.length>0&&(n.push(o.join("")),r.push("%BLOCK%")),{escapedString:r.join(""),blocks:n}},x=function(t,e,r){return t.replace(e,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(t[2]){for(var n=t[2].split(","),s=[],o=0;o<n.length;o++){var c=n[o].trim();if(!c)break;s.push(r("-shadowcsshost-no-combinator",c,t[3]))}return s.join(",")}return"-shadowcsshost-no-combinator"+t[3]}))},_=function(t,e,r){return t+e.replace("-shadowcsshost","")+r},b=function(t,e,r){return e.indexOf("-shadowcsshost")>-1?_(t,e,r):t+e+r+", "+e+" "+t+r},O=function(t,e,r,n,s){return v(t,(function(t){var s=t.selector,o=t.content;return"@"!==t.selector[0]?s=function(t,e,r,n){return t.split(",").map((function(t){return n&&t.indexOf("."+n)>-1?t.trim():function(t,e){return!function(t){return t=t.replace(/\[/g,"\\[").replace(/\]/g,"\\]"),new RegExp("^("+t+")([>\\s~+[.,{:][\\s\\S]*)?$","m")}(e).test(t)}(t,e)?function(t,e,r){for(var n,s="."+(e=e.replace(/\[is=([^\]]*)\]/g,(function(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];return e[0]}))),o=function(t){var n=t.trim();if(!n)return"";if(t.indexOf("-shadowcsshost-no-combinator")>-1)n=function(t,e,r){if(u.lastIndex=0,u.test(t)){var n="."+r;return t.replace(a,(function(t,e){return e.replace(/([^:]*)(:*)(.*)/,(function(t,e,r,s){return e+n+r+s}))})).replace(u,n+" ")}return e+" "+t}(t,e,r);else{var o=t.replace(u,"");if(o.length>0){var c=o.match(/([^:]*)(:*)(.*)/);c&&(n=c[1]+s+c[2]+c[3])}}return n},c=function(t){var e=[],r=0;return{content:(t=t.replace(/(\[[^\]]*\])/g,(function(t,n){var s="__ph-"+r+"__";return e.push(n),r++,s}))).replace(/(:nth-[-\w]+)(\([^)]+\))/g,(function(t,n,s){var o="__ph-"+r+"__";return e.push(s),r++,n+o})),placeholders:e}}(t),i="",l=0,h=/( |>|\+|~(?!=))\s*/g,p=!((t=c.content).indexOf("-shadowcsshost-no-combinator")>-1);null!==(n=h.exec(t));){var f=n[1],d=t.slice(l,n.index).trim();i+=((p=p||d.indexOf("-shadowcsshost-no-combinator")>-1)?o(d):d)+" "+f+" ",l=h.lastIndex}var g=t.substring(l);return i+=(p=p||g.indexOf("-shadowcsshost-no-combinator")>-1)?o(g):g,function(t,e){return e.replace(/__ph-(\d+)__/g,(function(e,r){return t[+r]}))}(c.placeholders,i)}(t,e,r).trim():t.trim()})).join(", ")}(t.selector,e,r,n):(t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document"))&&(o=O(t.content,e,r,n)),{selector:s.replace(/\s{2,}/g," ").trim(),content:o}}))},S=function(t,e,r){var n=e+"-h",a=e+"-s",u=t.match(d)||[];t=function(t){return t.replace(f,"")}(t);var g=[];if(r){var m=function(t){var e="/*!@___"+g.length+"___*/";return g.push({placeholder:e,comment:"/*!@"+t.selector+"*/"}),t.selector=e+t.selector,t};t=v(t,(function(t){return"@"!==t.selector[0]?m(t):t.selector.startsWith("@media")||t.selector.startsWith("@supports")||t.selector.startsWith("@page")||t.selector.startsWith("@document")?(t.content=v(t.content,m),t):t}))}var w=function(t,e,r,n,a){var u=function(t,e){var r="."+e+" > ",n=[];return t=t.replace(c,(function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(t[2]){for(var s=t[2].trim(),o=r+s+t[3],c="",a=t[4]-1;a>=0;a--){var i=t[5][a];if("}"===i||","===i)break;c=i+c}var u=c+o,l=""+c.trimRight()+o.trim();return u.trim()!==l.trim()&&n.push({orgSelector:u,updatedSelector:l+", "+u}),o}return"-shadowcsshost-no-combinator"+t[3]})),{selectors:n,cssText:t}}(t=function(t){return x(t,o,b)}(t=function(t){return x(t,s,_)}(t=t.replace(p,"-shadowcsscontext").replace(l,"-shadowcsshost").replace(h,"-shadowcssslotted"))),n);return t=function(t){return i.reduce((function(t,e){return t.replace(e," ")}),t)}(t=u.cssText),e&&(t=O(t,e,r,n)),{cssText:(t=(t=t.replace(/-shadowcsshost-no-combinator/g,"."+r)).replace(/>\s*\*\s+([^{, ]+)/gm," $1 ")).trim(),slottedSelectors:u.selectors}}(t,e,n,a);return t=[w.cssText].concat(u).join("\n"),r&&g.forEach((function(e){var r=e.placeholder,n=e.comment;t=t.replace(r,n)})),w.slottedSelectors.forEach((function(e){t=t.replace(e.orgSelector,e.updatedSelector)})),t}}}]);