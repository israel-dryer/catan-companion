import{b as s}from"./chunk-OI36OCLG.js";import{u as a,x as o}from"./chunk-PV5YSWZ3.js";var y=(()=>{let t=class t{constructor(){this.storage=o(s)}insertPlayer(e){return this.storage.players.put({name:e,lastPlayed:Date.now()})}deletePlayer(e){return this.storage.players.delete(e)}selectPlayers(){return this.storage.players.toCollection().toArray()}updatePlayer(e){return this.storage.players.put({name:e,lastPlayed:Date.now()})}};t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=a({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();export{y as a};
