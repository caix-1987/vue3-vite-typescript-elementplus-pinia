import{v as _,r as i,C as d}from"./index-44536796.js";const u=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],c=(()=>{if(typeof document>"u")return!1;const e=u[0],t={};for(const n of u)if((n==null?void 0:n[1])in document){for(const[r,o]of n.entries())t[e[r]]=o;return t}return!1})(),a={change:c.fullscreenchange,error:c.fullscreenerror};let l={request(e=document.documentElement,t){return new Promise((n,s)=>{const r=()=>{l.off("change",r),n()};l.on("change",r);const o=e[c.requestFullscreen](t);o instanceof Promise&&o.then(r).catch(s)})},exit(){return new Promise((e,t)=>{if(!l.isFullscreen){e();return}const n=()=>{l.off("change",n),e()};l.on("change",n);const s=document[c.exitFullscreen]();s instanceof Promise&&s.then(n).catch(t)})},toggle(e,t){return l.isFullscreen?l.exit():l.request(e,t)},onchange(e){l.on("change",e)},onerror(e){l.on("error",e)},on(e,t){const n=a[e];n&&document.addEventListener(n,t,!1)},off(e,t){const n=a[e];n&&document.removeEventListener(n,t,!1)},raw:c};Object.defineProperties(l,{isFullscreen:{get:()=>Boolean(document[c.fullscreenElement])},element:{enumerable:!0,get:()=>document[c.fullscreenElement]??void 0},isEnabled:{enumerable:!0,get:()=>Boolean(document[c.fullscreenEnabled])}});c||(l={isEnabled:!1});const m=l;const g=_("tags",()=>{const e=i([]);return{tagList:e,addTag:s=>{e.value.some((r,o)=>{if(r.path===s.path)return r.fullPath!==s.fullPath&&(e.value[o]=Object.assign({},s)),!0})||e.value.push(Object.assign({},s))},delTag:s=>{for(const[r,o]of e.value.entries())if(o.path===s.path){e.value.splice(r,1);break}}}});const p=_("sidebar",()=>{const e=d({opened:!1,withoutAnimation:!1});return{sidebar:e,toggleSidebar:()=>{e.opened=!e.opened},closeSidebar:()=>{e.opened=!1}}});export{p as a,m as s,g as u};
