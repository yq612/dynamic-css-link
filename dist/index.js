Object.defineProperty(exports,"__esModule",{value:!0});class DynamicCssLink{constructor(){this.linkMap=new Map,this.headEle=document.querySelector("head")}get links(){return this.linkMap}use(e){if(!e)return[];var t=e instanceof Array?e:[e];const r=document.createDocumentFragment(),n=[];for(let e=0;e<t.length;e++){var{src:s,alternative:i}=t[e],s=this.createLink(s,i),i=this.createSymbol();s&&this.headEle&&(this.linkMap.set(i,s),r.appendChild(s),n.push(i))}return null!==(e=this.headEle)&&void 0!==e&&e.appendChild(r),n}show(e){return this.changeAlternate(e,!1)}hide(e){return this.changeAlternate(e,!0)}teardown(e){var t=this.linkMap.get(e);return t&&this.headEle&&this.headEle.removeChild(t),this.linkMap.delete(e),this}destory(){return this.linkMap.forEach((e,t)=>this.teardown(t)),this}createLink(e,t=!1){if(e){const r=document.createElement("link");return r.setAttribute("rel",t?"alternate stylesheet":"stylesheet"),r.setAttribute("type","text/css"),r.setAttribute("href",e),r}}createSymbol(){var e=(new Date).getTime();return"function"==typeof Symbol?Symbol(e):e}changeAlternate(e,t){const r=this.linkMap.get(e);return r&&r.setAttribute("rel",t?"alternate stylesheet":"stylesheet"),this}}exports.default=DynamicCssLink;