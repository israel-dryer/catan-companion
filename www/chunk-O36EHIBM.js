import{a as b}from"./chunk-5SST7FTL.js";import{c as a,d as r,f as l,g as o,i as c}from"./chunk-MEPF3XFJ.js";import"./chunk-72KDLSWN.js";import{h as s}from"./chunk-HCV7W5KS.js";var u=":host(.tab-hidden){display:none !important}",f=u,w=(()=>{let e=class{constructor(t){c(this,t),this.loaded=!1,this.active=!1,this.delegate=void 0,this.tab=void 0,this.component=void 0}componentWillLoad(){return s(this,null,function*(){this.active&&(yield this.setActive())})}setActive(){return s(this,null,function*(){yield this.prepareLazyLoaded(),this.active=!0})}changeActive(t){t&&this.prepareLazyLoaded()}prepareLazyLoaded(){if(!this.loaded&&this.component!=null){this.loaded=!0;try{return b(this.delegate,this.el,this.component,["ion-page"])}catch(t){console.error(t)}}return Promise.resolve(void 0)}render(){let{tab:t,active:i,component:n}=this;return a(r,{key:"46d5498418f5379861c3d7465e8021dec45f1200",role:"tabpanel","aria-hidden":i?null:"true","aria-labelledby":`tab-button-${t}`,class:{"ion-page":n===void 0,"tab-hidden":!i}},a("slot",{key:"b45045dccb87dfe75e3f5a5a474bb48b6c98e922"}))}get el(){return l(this)}static get watchers(){return{active:["changeActive"]}}};return e.style=f,e})(),g=":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;contain:layout size style;z-index:0}.tabs-inner{position:relative;-ms-flex:1;flex:1;contain:layout size style}",m=g,y=class{constructor(e){c(this,e),this.ionNavWillLoad=o(this,"ionNavWillLoad",7),this.ionTabsWillChange=o(this,"ionTabsWillChange",3),this.ionTabsDidChange=o(this,"ionTabsDidChange",3),this.transitioning=!1,this.onTabClicked=t=>{let{href:i,tab:n}=t.detail;if(this.useRouter&&i!==void 0){let h=document.querySelector("ion-router");h&&h.push(i)}else this.select(n)},this.selectedTab=void 0,this.useRouter=!1}componentWillLoad(){return s(this,null,function*(){if(this.useRouter||(this.useRouter=!!document.querySelector("ion-router")&&!this.el.closest("[no-router]")),!this.useRouter){let e=this.tabs;e.length>0&&(yield this.select(e[0]))}this.ionNavWillLoad.emit()})}componentWillRender(){let e=this.el.querySelector("ion-tab-bar");if(e){let t=this.selectedTab?this.selectedTab.tab:void 0;e.selectedTab=t}}select(e){return s(this,null,function*(){let t=d(this.tabs,e);return this.shouldSwitch(t)?(yield this.setActive(t),yield this.notifyRouter(),this.tabSwitch(),!0):!1})}getTab(e){return s(this,null,function*(){return d(this.tabs,e)})}getSelected(){return Promise.resolve(this.selectedTab?this.selectedTab.tab:void 0)}setRouteId(e){return s(this,null,function*(){let t=d(this.tabs,e);return this.shouldSwitch(t)?(yield this.setActive(t),{changed:!0,element:this.selectedTab,markVisible:()=>this.tabSwitch()}):{changed:!1,element:this.selectedTab}})}getRouteId(){return s(this,null,function*(){var e;let t=(e=this.selectedTab)===null||e===void 0?void 0:e.tab;return t!==void 0?{id:t,element:this.selectedTab}:void 0})}setActive(e){return this.transitioning?Promise.reject("transitioning already happening"):(this.transitioning=!0,this.leavingTab=this.selectedTab,this.selectedTab=e,this.ionTabsWillChange.emit({tab:e.tab}),e.active=!0,Promise.resolve())}tabSwitch(){let e=this.selectedTab,t=this.leavingTab;this.leavingTab=void 0,this.transitioning=!1,e&&t!==e&&(t&&(t.active=!1),this.ionTabsDidChange.emit({tab:e.tab}))}notifyRouter(){if(this.useRouter){let e=document.querySelector("ion-router");if(e)return e.navChanged("forward")}return Promise.resolve(!1)}shouldSwitch(e){let t=this.selectedTab;return e!==void 0&&e!==t&&!this.transitioning}get tabs(){return Array.from(this.el.querySelectorAll("ion-tab"))}render(){return a(r,{key:"239bdb2ff2ec5cfcc74c51812cf6240f48acc617",onIonTabButtonClick:this.onTabClicked},a("slot",{key:"2b266d0f87c7c82e992fe0d9b5c8f25569b118e3",name:"top"}),a("div",{key:"4cbbd010f0b0b1cd82714db7d098d28fab6d5218",class:"tabs-inner"},a("slot",{key:"72b2a02cd29d5b30e47758f3d6daaa1021916256"})),a("slot",{key:"25494076dbbf7606d477b44f1b969719e7b4a805",name:"bottom"}))}get el(){return l(this)}},d=(e,t)=>{let i=typeof t=="string"?e.find(n=>n.tab===t):t;return i||console.error(`tab with id: "${i}" does not exist`),i};y.style=m;export{w as ion_tab,y as ion_tabs};
