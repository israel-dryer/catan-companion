import{a as i,b as a}from"./chunk-Z3GWI56J.js";import{b as n}from"./chunk-OGSRTT4J.js";import{h as e}from"./chunk-HCV7W5KS.js";var s=class extends n{constructor(){super(...arguments),this.selectionStarted=!1}impact(t){return e(this,null,function*(){let r=this.patternForImpact(t==null?void 0:t.style);this.vibrateWithPattern(r)})}notification(t){return e(this,null,function*(){let r=this.patternForNotification(t==null?void 0:t.type);this.vibrateWithPattern(r)})}vibrate(t){return e(this,null,function*(){let r=(t==null?void 0:t.duration)||300;this.vibrateWithPattern([r])})}selectionStart(){return e(this,null,function*(){this.selectionStarted=!0})}selectionChanged(){return e(this,null,function*(){this.selectionStarted&&this.vibrateWithPattern([70])})}selectionEnd(){return e(this,null,function*(){this.selectionStarted=!1})}patternForImpact(t=i.Heavy){return t===i.Medium?[43]:t===i.Light?[20]:[61]}patternForNotification(t=a.Success){return t===a.Warning?[30,40,30,50,60]:t===a.Error?[27,45,50]:[35,65,21]}vibrateWithPattern(t){if(navigator.vibrate)navigator.vibrate(t);else throw this.unavailable("Browser does not support the vibrate API")}};export{s as HapticsWeb};