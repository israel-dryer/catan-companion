import{h as o}from"./chunk-HCV7W5KS.js";var i=(t,r)=>r.closest(t)!==null,c=(t,r)=>typeof t=="string"&&t.length>0?Object.assign({"ion-color":!0,[`ion-color-${t}`]:!0},r):r,a=t=>t!==void 0?(Array.isArray(t)?t:t.split(" ")).filter(e=>e!=null).map(e=>e.trim()).filter(e=>e!==""):[],l=t=>{let r={};return a(t).forEach(e=>r[e]=!0),r},u=/^[a-z][a-z0-9+\-.]*:/,f=(t,r,e,s)=>o(void 0,null,function*(){if(t!=null&&t[0]!=="#"&&!u.test(t)){let n=document.querySelector("ion-router");if(n)return r!=null&&r.preventDefault(),n.push(t,e,s)}return!1});export{i as a,c as b,l as c,f as d};
