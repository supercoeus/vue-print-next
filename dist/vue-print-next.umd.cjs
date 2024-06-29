(function(l,n){typeof exports=="object"&&typeof module!="undefined"?n(exports):typeof define=="function"&&define.amd?define(["exports"],n):(l=typeof globalThis!="undefined"?globalThis:l||self,n(l.VuePrintNext={}))})(this,function(l){"use strict";var C=Object.defineProperty,E=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var b=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var w=(l,n,a)=>n in l?C(l,n,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[n]=a,m=(l,n)=>{for(var a in n||(n={}))k.call(n,a)&&w(l,a,n[a]);if(b)for(var a of b(n))S.call(n,a)&&w(l,a,n[a]);return l},g=(l,n)=>E(l,A(n));var v=(l,n,a)=>w(l,typeof n!="symbol"?n+"":n,a);const n="[VuePrintNext]";class a{constructor(e){v(this,"standards",{strict:"strict",loose:"loose",html5:"html5"});v(this,"iframeId","");v(this,"previewBody",null);v(this,"close",null);v(this,"counter",0);v(this,"settings",{standard:"html5",zIndex:20002,previewTitle:"打印预览",previewPrintBtnLabel:"打印",preview:!1});const t=e.vue;this.settings=g(m(m({},this.settings),e),{previewBeforeOpenCallback(){var r;(r=e.previewBeforeOpenCallback)==null||r.call(e,t)},previewOpenCallback(){var r;(r=e.previewOpenCallback)==null||r.call(e,t)},openCallback(){var r;(r=e.openCallback)==null||r.call(e,t)},closeCallback(){var r;(r=e.closeCallback)==null||r.call(e,t)},beforeOpenCallback(){var r;(r=e.beforeOpenCallback)==null||r.call(e,t)}}),this.init()}init(){this.counter++,this.iframeId=`printArea_${this.counter}`;const{el:e,url:t}=this.settings;if(e||t){const r=e?"":t||"",i=this.getPrintWindow(r);e&&this.write(i.doc),this.settings.preview?this.previewIframeLoad():this.print(i);return}if(this.settings.asyncUrl){this.settings.asyncUrl(r=>{const i=this.getPrintWindow(r);this.settings.preview?this.previewIframeLoad():this.print(i)},this.settings.vue);return}throw new Error(`${n}: Either "el"、"url" or "asyncUrl" parameter must be provided in the settings.`)}addEvent(e,t,r){e&&(e.addEventListener?e.addEventListener(t,r,!1):e.attachEvent?e.attachEvent("on"+t,r):e["on"+t]=r)}previewIframeLoad(){var r,i;const e=document.getElementById("vue-pirnt-next-previewBox");if(!e)return;const t=e.querySelector("iframe");(i=(r=this.settings).previewBeforeOpenCallback)==null||i.call(r),this.addEvent(t,"load",()=>{var o,s;this.previewBoxShow(),(s=(o=this.settings).previewOpenCallback)==null||s.call(o)}),this.addEvent(e.querySelector(".previewBodyUtilPrintBtn"),"click",()=>{var o,s,u,c,p,d,f;(s=(o=this.settings).beforeOpenCallback)==null||s.call(o),(c=(u=this.settings).openCallback)==null||c.call(u),(p=t==null?void 0:t.contentWindow)==null||p.print(),(f=(d=this.settings).closeCallback)==null||f.call(d)})}print(e){var o,s;const t=document.getElementById(this.iframeId)||e.f,r=t==null?void 0:t.contentWindow;if(!r)return;const i=()=>{const u=setTimeout(()=>{var c,p,d,f;r.focus(),(p=(c=this.settings).openCallback)==null||p.call(c),r.print(),t.remove(),(f=(d=this.settings).closeCallback)==null||f.call(d),clearTimeout(u)})};(s=(o=this.settings).beforeOpenCallback)==null||s.call(o),this.addEvent(t,"load",i)}getNoPrintMediaStyle(){const e=this.settings.noPrintSelector;if(!e)return;if(!Array.isArray(e)&&!(typeof e=="string")){console.error(new TypeError(`${n}: The "noPrintSelector" must be either a string or an array of strings. Please check your settings.`));return}return`${(Array.isArray(e)?e:[e]).filter(s=>s.trim()).join(",")} { display: none; }`}write(e){e.open(),e.write(`${this.docType()}<html lang='zh'>${this.getHead()}${this.getBody()}</html>`),e.close()}docType(){if(this.settings.standard===this.standards.html5)return"<!DOCTYPE html>";const e=this.settings.standard===this.standards.loose?" Transitional":"",t=this.settings.standard===this.standards.loose?"loose":"strict";return`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01${e}//EN" "http://www.w3.org/TR/html4/${t}.dtd">`}getHead(){const e=(this.settings.extraHead||"").split(",").filter(s=>s.length>0).join(""),t=Array.from(document.querySelectorAll("link")).filter(s=>s.href.includes(".css")).map(s=>`<link type="text/css" rel="stylesheet" href='${s.href}'>`).join(""),r=Array.from(document.styleSheets).reduce((s,u)=>{const c=u.cssRules||u.rules;return c&&(s+=Array.from(c).reduce((p,d)=>p+d.cssText,"")),s},""),i=(this.settings.extraCss||"").split(",").filter(s=>s.trim().length>0).map(s=>`<link type="text/css" rel="stylesheet" href='${s.trim()}'>`).join(""),o=this.getNoPrintMediaStyle();return`<head>
							<title>${this.settings.popTitle}</title>
							${e}${t}
							<style type="text/css">${r}${o}</style>
							${i}
						</head>`}getPrintAreaDom(){const e=this.settings.el,t=typeof e=="string";if(e instanceof HTMLElement)return[e];if(!t)throw new TypeError(`${n}: The "el" property should be either a string (CSS selector) or an HTMLElement, but received type "${typeof e}".`);let r=Array.from(document.querySelectorAll(e));if(!(r!=null&&r.length))throw new Error(`${n}: No elements found matching the selector: "${e}".`);return r}getBody(){const e=this.getPrintAreaDom(),t=document.createElement("div");return e.forEach(r=>{const i=r.cloneNode(!0);this.canvasToImgHandler(r,i),this.formDataHandler(r,i),t.appendChild(i)}),`<body>${t.innerHTML}</body>`}canvasToImgHandler(e,t){const r=e.querySelectorAll("canvas");t.querySelectorAll("canvas").forEach((o,s)=>{const u=r[s],c=o.parentNode,p=u.toDataURL("image/png"),d=new Image;d.className="canvasImg",d.style.display="block",d.src=p,c==null||c.appendChild(d),o.remove()})}formDataHandler(e,t){const r=t.querySelectorAll("input,select,textarea");let i=-1;r.forEach(o=>{var c;const s=o.value;switch((c=o.getAttribute("type"))!=null?c:o.tagName.toLowerCase()){case"select":i++;const p=e.querySelectorAll("select")[i];if(p){const d=p.selectedIndex;o.options[d].setAttribute("selected","selected")}break;case"textarea":o.innerHTML=s,o.setAttribute("html",s);break;case"radio":case"checkbox":o.checked&&o.setAttribute("checked","checked");break;default:o.value=s,o.setAttribute("value",s);break}})}getPrintWindow(e){var i;const t=this.createIframe(e),r=t.contentDocument||((i=t.contentWindow)==null?void 0:i.document)||t.document;if(!r)throw new Error(`${n}: Unable to find the document object within the created iframe. Please ensure the iframe is correctly created and loaded.`);return{f:t,win:t.contentWindow||t,doc:r}}previewBoxShow(){var t;const e=document.getElementById("vue-pirnt-next-previewBox");e&&((t=document.querySelector("html"))==null||t.setAttribute("style","overflow: hidden"),e.style.display="block")}previewBoxHide(){var t,r;const e=document.getElementById("vue-pirnt-next-previewBox");e&&((t=document.querySelector("html"))==null||t.setAttribute("style","overflow: visible;"),(r=e.querySelector("iframe"))==null||r.remove(),e.style.display="none")}previewBox(){var r;let e=document.getElementById("vue-pirnt-next-previewBox");if(e)return(r=e.querySelector("iframe"))==null||r.remove(),{close:e.querySelector(".previewClose"),previewBody:e.querySelector(".previewBody")};e=document.createElement("div"),e.setAttribute("id","vue-pirnt-next-previewBox"),e.setAttribute("style","position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: white; display: none; z-index: "+this.settings.zIndex);const t=document.createElement("div");return t.setAttribute("class","previewHeader"),t.setAttribute("style","padding: 5px 20px;"),t.innerHTML=this.settings.previewTitle||"",this.close=this.createCloseButton(),t.appendChild(this.close),e.appendChild(t),this.previewBody=this.createPreviewBody(),e.appendChild(this.previewBody),document.body.appendChild(e),{close:this.close,previewBody:this.previewBody}}createIframe(e){const t=document.createElement("iframe");if(t.id=this.iframeId,t.src=e||new Date().getTime().toString(),t.style.display="none",!this.settings.preview)document.body.appendChild(t);else{t.setAttribute("style","border: 0px; flex: 1;");const{close:r,previewBody:i}=this.previewBox();i&&i.appendChild(t),this.addEvent(r,"click",this.previewBoxHide.bind(this))}return t}createCloseButton(){const e=document.createElement("div");e.setAttribute("class","previewClose"),e.setAttribute("style","position: absolute; top: 5px; right: 20px; width: 25px; height: 20px; cursor: pointer;");const t=document.createElement("div"),r=document.createElement("div"),i="position: absolute; width: 3px; height: 100%; background: #040404; top: 0px; left: 50%;";return t.setAttribute("class","closeBefore"),t.setAttribute("style",`${i} transform: rotate(45deg);`),r.setAttribute("class","closeAfter"),r.setAttribute("style",`${i} transform: rotate(-45deg);`),e.appendChild(t),e.appendChild(r),e}createPreviewBody(){const e=document.createElement("div");e.className="previewBody",e.style.cssText="display: flex; flex-direction: column; height: 100%;";const t=document.createElement("div");t.className="previewBodyUtil",t.style.cssText="height: 32px; background: #474747; position: relative;";const r=document.createElement("div");return r.className="previewBodyUtilPrintBtn",r.style.cssText="position: absolute; padding: 2px 10px; margin-top: 3px; left: 24px; font-size: 14px; color: white; cursor: pointer; background: rgba(0,0,0,.12); border: 1px solid rgba(0,0,0,.35); box-shadow: inset 0 1px 0 hsla(0,0%,100%,.05), inset 0 0 1px hsla(0,0%,100%,.15);",r.innerHTML=this.settings.previewPrintBtnLabel||"",t.appendChild(r),e.appendChild(t),e}}const x=(h,e,t)=>{h.addEventListener?h.addEventListener(e,t,!1):h.attachEvent?h.attachEvent("on"+e,t):h["on"+e]=t},y={directiveName:"print",mounted(h,e){let t,r={};x(h,"click",()=>{if(!e.value){window.print();return}typeof e.value=="string"?t=e.value:typeof e.value=="object"&&(t=e.value.el,r=e.value),new a(g(m({},r),{el:t,vue:e.instance}))})},bind(h,e,t){e.instance=t.context,y.mounted(h,e)}},B={install(h){h.directive(y.directiveName,y)}};l.VuePrintNext=a,l.printPlugin=B,l.vPrint=y,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
