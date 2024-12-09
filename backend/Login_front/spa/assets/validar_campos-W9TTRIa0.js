import{c as re,i as H,e as te,b as h,h as k,l as Te,a as Ie,g as Y,j as De,r as $,o as fe,w as D,z as je,d as ve,A as Le,B as Ne,C as Ee,D as Qe,k as W,E as Ke,F as Ze,G as ae,T as Ue,H as He,I as Ye,J as ke,_ as Je,K as Ge,y as xe,s as oe,t as ie,u as ne,x as G,L as We,M as Xe,N as et,O as tt,P as Ce,Q as nt}from"./index-DffbXBjk.js";import{h as X,b as at}from"./dom-DJfMbEQf.js";import{u as ot,a as lt,Q as le,b as rt,c as _e}from"./QBtn-DAjwJ8xJ.js";const Dt=re({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:t}){const{proxy:{$q:o}}=Y(),a=H(Te,te);if(a===te)return console.error("QPage needs to be a deep child of QLayout"),te;if(H(Ie,te)===te)return console.error("QPage needs to be child of QPageContainer"),te;const d=h(()=>{const v=(a.header.space===!0?a.header.size:0)+(a.footer.space===!0?a.footer.size:0);if(typeof e.styleFn=="function"){const C=a.isContainer.value===!0?a.containerHeight.value:o.screen.height;return e.styleFn(v,C)}return{minHeight:a.isContainer.value===!0?a.containerHeight.value-v+"px":o.screen.height===0?v!==0?`calc(100vh - ${v}px)`:"100vh":o.screen.height-v+"px"}}),n=h(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>k("main",{class:n.value,style:d.value},X(t.default))}}),it=re({name:"QAvatar",props:{...ot,fontSize:String,color:String,textColor:String,icon:String,square:Boolean,rounded:Boolean},setup(e,{slots:t}){const o=lt(e),a=h(()=>"q-avatar"+(e.color?` bg-${e.color}`:"")+(e.textColor?` text-${e.textColor} q-chip--colored`:"")+(e.square===!0?" q-avatar--square":e.rounded===!0?" rounded-borders":"")),f=h(()=>e.fontSize?{fontSize:e.fontSize}:null);return()=>{const d=e.icon!==void 0?[k(le,{name:e.icon})]:void 0;return k("div",{class:a.value,style:o.value},[k("div",{class:"q-avatar__content row flex-center overflow-hidden",style:f.value},at(t.default,d))])}}}),ge=re({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(e,{slots:t}){const o=h(()=>`q-card__section q-card__section--${e.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>k(e.tag,{class:o.value},X(t.default))}});let me,ue=0;const P=new Array(256);for(let e=0;e<256;e++)P[e]=(e+256).toString(16).substring(1);const ut=(()=>{const e=typeof crypto<"u"?crypto:typeof window<"u"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const o=new Uint8Array(t);return e.getRandomValues(o),o}}return t=>{const o=[];for(let a=t;a>0;a--)o.push(Math.floor(Math.random()*256));return o}})(),we=4096;function be(){(me===void 0||ue+16>we)&&(ue=0,me=ut(we));const e=Array.prototype.slice.call(me,ue,ue+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,P[e[0]]+P[e[1]]+P[e[2]]+P[e[3]]+"-"+P[e[4]]+P[e[5]]+"-"+P[e[6]]+P[e[7]]+"-"+P[e[8]]+P[e[9]]+"-"+P[e[10]]+P[e[11]]+P[e[12]]+P[e[13]]+P[e[14]]+P[e[15]]}function st(e){return e??null}function Se(e,t){return e??(t===!0?`f_${be()}`:null)}function ct({getValue:e,required:t=!0}={}){if(De.value===!0){const o=e!==void 0?$(st(e())):$(null);return t===!0&&o.value===null&&fe(()=>{o.value=`f_${be()}`}),e!==void 0&&D(e,a=>{o.value=Se(a,t)}),o}return e!==void 0?h(()=>Se(e(),t)):$(`f_${be()}`)}const Me=/^on[A-Z]/;function dt(){const{attrs:e,vnode:t}=Y(),o={listeners:$({}),attributes:$({})};function a(){const f={},d={};for(const n in e)n!=="class"&&n!=="style"&&Me.test(n)===!1&&(f[n]=e[n]);for(const n in t.props)Me.test(n)===!0&&(d[n]=t.props[n]);o.attributes.value=f,o.listeners.value=d}return je(a),a(),o}const $e={dark:{type:Boolean,default:null}};function ze(e,t){return h(()=>e.dark===null?t.dark.isActive:e.dark)}function ft({validate:e,resetValidation:t,requiresQForm:o}){const a=H(Le,!1);if(a!==!1){const{props:f,proxy:d}=Y();Object.assign(d,{validate:e,resetValidation:t}),D(()=>f.disable,n=>{n===!0?(typeof t=="function"&&t(),a.unbindComponent(d)):a.bindComponent(d)}),fe(()=>{f.disable!==!0&&a.bindComponent(d)}),ve(()=>{f.disable!==!0&&a.unbindComponent(d)})}else o===!0&&console.error("Parent QForm not found on useFormChild()!")}const qe=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,Re=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,Fe=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,se=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,ce=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,he={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>qe.test(e),hexaColor:e=>Re.test(e),hexOrHexaColor:e=>Fe.test(e),rgbColor:e=>se.test(e),rgbaColor:e=>ce.test(e),rgbOrRgbaColor:e=>se.test(e)||ce.test(e),hexOrRgbColor:e=>qe.test(e)||se.test(e),hexaOrRgbaColor:e=>Re.test(e)||ce.test(e),anyColor:e=>Fe.test(e)||se.test(e)||ce.test(e)},vt=[!0,!1,"ondemand"],gt={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],default:!1,validator:e=>vt.includes(e)}};function mt(e,t){const{props:o,proxy:a}=Y(),f=$(!1),d=$(null),n=$(!1);ft({validate:j,resetValidation:O});let v=0,C;const M=h(()=>o.rules!==void 0&&o.rules!==null&&o.rules.length!==0),_=h(()=>o.disable!==!0&&M.value===!0&&t.value===!1),g=h(()=>o.error===!0||f.value===!0),U=h(()=>typeof o.errorMessage=="string"&&o.errorMessage.length!==0?o.errorMessage:d.value);D(()=>o.modelValue,()=>{n.value=!0,_.value===!0&&o.lazyRules===!1&&T()});function F(){o.lazyRules!=="ondemand"&&_.value===!0&&n.value===!0&&T()}D(()=>o.reactiveRules,N=>{N===!0?C===void 0&&(C=D(()=>o.rules,F,{immediate:!0,deep:!0})):C!==void 0&&(C(),C=void 0)},{immediate:!0}),D(()=>o.lazyRules,F),D(e,N=>{N===!0?n.value=!0:_.value===!0&&o.lazyRules!=="ondemand"&&T()});function O(){v++,t.value=!1,n.value=!1,f.value=!1,d.value=null,T.cancel()}function j(N=o.modelValue){if(o.disable===!0||M.value===!1)return!0;const B=++v,J=t.value!==!0?()=>{n.value=!0}:()=>{},Q=(q,S)=>{q===!0&&J(),f.value=q,d.value=S||null,t.value=!1},L=[];for(let q=0;q<o.rules.length;q++){const S=o.rules[q];let z;if(typeof S=="function"?z=S(N,he):typeof S=="string"&&he[S]!==void 0&&(z=he[S](N)),z===!1||typeof z=="string")return Q(!0,z),!1;z!==!0&&z!==void 0&&L.push(z)}return L.length===0?(Q(!1),!0):(t.value=!0,Promise.all(L).then(q=>{if(q===void 0||Array.isArray(q)===!1||q.length===0)return B===v&&Q(!1),!0;const S=q.find(z=>z===!1||typeof z=="string");return B===v&&Q(S!==void 0,S),S===void 0},q=>(B===v&&(console.error(q),Q(!0)),!1)))}const T=Ne(j,0);return ve(()=>{C!==void 0&&C(),T.cancel()}),Object.assign(a,{resetValidation:O,validate:j}),Ee(a,"hasError",()=>g.value),{isDirtyModel:n,hasRules:M,hasError:g,errorMessage:U,validate:j,resetValidation:O}}let pe=[],ht=[];function Pe(e){ht.length===0?e():pe.push(e)}function bt(e){pe=pe.filter(t=>t!==e)}function ye(e){return e!=null&&(""+e).length!==0}const pt={...$e,...gt,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String},yt={...pt,maxlength:[Number,String]},kt=["update:modelValue","clear","focus","blur"];function xt({requiredForAttr:e=!0,tagProp:t,changeEvent:o=!1}={}){const{props:a,proxy:f}=Y(),d=ze(a,f.$q),n=ct({required:e,getValue:()=>a.for});return{requiredForAttr:e,changeEvent:o,tag:t===!0?h(()=>a.tag):{value:"label"},isDark:d,editable:h(()=>a.disable!==!0&&a.readonly!==!0),innerLoading:$(!1),focused:$(!1),hasPopupOpen:!1,splitAttrs:dt(),targetUid:n,rootRef:$(null),targetRef:$(null),controlRef:$(null)}}function Ct(e){const{props:t,emit:o,slots:a,attrs:f,proxy:d}=Y(),{$q:n}=d;let v=null;e.hasValue===void 0&&(e.hasValue=h(()=>ye(t.modelValue))),e.emitValue===void 0&&(e.emitValue=s=>{o("update:modelValue",s)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:i,onFocusout:r}),Object.assign(e,{clearValue:c,onControlFocusin:i,onControlFocusout:r,focus:S}),e.computedCounter===void 0&&(e.computedCounter=h(()=>{if(t.counter!==!1){const s=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,m=t.maxlength!==void 0?t.maxlength:t.maxValues;return s+(m!==void 0?" / "+m:"")}}));const{isDirtyModel:C,hasRules:M,hasError:_,errorMessage:g,resetValidation:U}=mt(e.focused,e.innerLoading),F=e.floatingLabel!==void 0?h(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):h(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),O=h(()=>t.bottomSlots===!0||t.hint!==void 0||M.value===!0||t.counter===!0||t.error!==null),j=h(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),T=h(()=>`q-field row no-wrap items-start q-field--${j.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(F.value===!0?" q-field--float":"")+(B.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(_.value===!0?" q-field--error":"")+(_.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&O.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),N=h(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(_.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length!==0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),B=h(()=>t.labelSlot===!0||t.label!==void 0),J=h(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&_.value!==!0?` text-${t.labelColor}`:"")),Q=h(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:F.value,modelValue:t.modelValue,emitValue:e.emitValue})),L=h(()=>{const s={};return e.targetUid.value&&(s.for=e.targetUid.value),t.disable===!0&&(s["aria-disabled"]="true"),s});function q(){const s=document.activeElement;let m=e.targetRef!==void 0&&e.targetRef.value;m&&(s===null||s.id!==e.targetUid.value)&&(m.hasAttribute("tabindex")===!0||(m=m.querySelector("[tabindex]")),m&&m!==s&&m.focus({preventScroll:!0}))}function S(){Pe(q)}function z(){bt(q);const s=document.activeElement;s!==null&&e.rootRef.value.contains(s)&&s.blur()}function i(s){v!==null&&(clearTimeout(v),v=null),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,o("focus",s))}function r(s,m){v!==null&&clearTimeout(v),v=setTimeout(()=>{v=null,!(document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1))&&(e.focused.value===!0&&(e.focused.value=!1,o("blur",s)),m!==void 0&&m())})}function c(s){Qe(s),n.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),o("update:modelValue",null),e.changeEvent===!0&&o("change",null),o("clear",t.modelValue),W(()=>{const m=C.value;U(),C.value=m})}function u(s){[13,32].includes(s.keyCode)&&c(s)}function y(){const s=[];return a.prepend!==void 0&&s.push(k("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:ae},a.prepend())),s.push(k("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},b())),_.value===!0&&t.noErrorIcon===!1&&s.push(p("error",[k(le,{name:n.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?s.push(p("inner-loading-append",a.loading!==void 0?a.loading():[k(rt,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&s.push(p("inner-clearable-append",[k(le,{class:"q-field__focusable-action",name:t.clearIcon||n.iconSet.field.clear,tabindex:0,role:"button","aria-hidden":"false","aria-label":n.lang.label.clear,onKeyup:u,onClick:c})])),a.append!==void 0&&s.push(k("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:ae},a.append())),e.getInnerAppend!==void 0&&s.push(p("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&s.push(e.getControlChild()),s}function b(){const s=[];return t.prefix!==void 0&&t.prefix!==null&&s.push(k("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&s.push(e.getShadowControl()),e.getControl!==void 0?s.push(e.getControl()):a.rawControl!==void 0?s.push(a.rawControl()):a.control!==void 0&&s.push(k("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},a.control(Q.value))),B.value===!0&&s.push(k("div",{class:J.value},X(a.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&s.push(k("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),s.concat(X(a.default))}function R(){let s,m;_.value===!0?g.value!==null?(s=[k("div",{role:"alert"},g.value)],m=`q--slot-error-${g.value}`):(s=X(a.error),m="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(s=[k("div",t.hint)],m=`q--slot-hint-${t.hint}`):(s=X(a.hint),m="q--slot-hint"));const w=t.counter===!0||a.counter!==void 0;if(t.hideBottomSpace===!0&&w===!1&&s===void 0)return;const V=k("div",{key:m,class:"q-field__messages col"},s);return k("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale"),onClick:ae},[t.hideBottomSpace===!0?V:k(Ue,{name:"q-transition--field-message"},()=>V),w===!0?k("div",{class:"q-field__counter"},a.counter!==void 0?a.counter():e.computedCounter.value):null])}function p(s,m){return m===null?null:k("div",{key:s,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},m)}let x=!1;return Ke(()=>{x=!0}),Ze(()=>{x===!0&&t.autofocus===!0&&d.focus()}),t.autofocus===!0&&fe(()=>{d.focus()}),ve(()=>{v!==null&&clearTimeout(v)}),Object.assign(d,{focus:S,blur:z}),function(){const m=e.getControl===void 0&&a.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,...L.value}:L.value;return k(e.tag.value,{ref:e.rootRef,class:[T.value,f.class],style:f.style,...m},[a.before!==void 0?k("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:ae},a.before()):null,k("div",{class:"q-field__inner relative-position col self-stretch"},[k("div",{ref:e.controlRef,class:N.value,tabindex:-1,...e.controlEvents},y()),O.value===!0?R():null]),a.after!==void 0?k("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:ae},a.after()):null])}}const Ve={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},de={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Oe=Object.keys(de);Oe.forEach(e=>{de[e].regex=new RegExp(de[e].pattern)});const _t=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Oe.join("")+"])|(.)","g"),Ae=/[.*+?^${}()|[\]\\]/g,E="",wt={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function St(e,t,o,a){let f,d,n,v,C,M;const _=$(null),g=$(F());function U(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}D(()=>e.type+e.autogrow,j),D(()=>e.mask,i=>{if(i!==void 0)T(g.value,!0);else{const r=S(g.value);j(),e.modelValue!==r&&t("update:modelValue",r)}}),D(()=>e.fillMask+e.reverseFillMask,()=>{_.value===!0&&T(g.value,!0)}),D(()=>e.unmaskedValue,()=>{_.value===!0&&T(g.value)});function F(){if(j(),_.value===!0){const i=L(S(e.modelValue));return e.fillMask!==!1?z(i):i}return e.modelValue}function O(i){if(i<f.length)return f.slice(-i);let r="",c=f;const u=c.indexOf(E);if(u!==-1){for(let y=i-c.length;y>0;y--)r+=E;c=c.slice(0,u)+r+c.slice(u)}return c}function j(){if(_.value=e.mask!==void 0&&e.mask.length!==0&&U(),_.value===!1){v=void 0,f="",d="";return}const i=Ve[e.mask]===void 0?e.mask:Ve[e.mask],r=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",c=r.replace(Ae,"\\$&"),u=[],y=[],b=[];let R=e.reverseFillMask===!0,p="",x="";i.replace(_t,(V,l,A,Z,K)=>{if(Z!==void 0){const I=de[Z];b.push(I),x=I.negate,R===!0&&(y.push("(?:"+x+"+)?("+I.pattern+"+)?(?:"+x+"+)?("+I.pattern+"+)?"),R=!1),y.push("(?:"+x+"+)?("+I.pattern+")?")}else if(A!==void 0)p="\\"+(A==="\\"?"":A),b.push(A),u.push("([^"+p+"]+)?"+p+"?");else{const I=l!==void 0?l:K;p=I==="\\"?"\\\\\\\\":I.replace(Ae,"\\\\$&"),b.push(I),u.push("([^"+p+"]+)?"+p+"?")}});const s=new RegExp("^"+u.join("")+"("+(p===""?".":"[^"+p+"]")+"+)?"+(p===""?"":"["+p+"]*")+"$"),m=y.length-1,w=y.map((V,l)=>l===0&&e.reverseFillMask===!0?new RegExp("^"+c+"*"+V):l===m?new RegExp("^"+V+"("+(x===""?".":x)+"+)?"+(e.reverseFillMask===!0?"$":c+"*")):new RegExp("^"+V));n=b,v=V=>{const l=s.exec(e.reverseFillMask===!0?V:V.slice(0,b.length+1));l!==null&&(V=l.slice(1).join(""));const A=[],Z=w.length;for(let K=0,I=V;K<Z;K++){const ee=w[K].exec(I);if(ee===null)break;I=I.slice(ee.shift().length),A.push(...ee)}return A.length!==0?A.join(""):V},f=b.map(V=>typeof V=="string"?V:E).join(""),d=f.split(E).join(r)}function T(i,r,c){const u=a.value,y=u.selectionEnd,b=u.value.length-y,R=S(i);r===!0&&j();const p=L(R),x=e.fillMask!==!1?z(p):p,s=g.value!==x;u.value!==x&&(u.value=x),s===!0&&(g.value=x),document.activeElement===u&&W(()=>{if(x===d){const w=e.reverseFillMask===!0?d.length:0;u.setSelectionRange(w,w,"forward");return}if(c==="insertFromPaste"&&e.reverseFillMask!==!0){const w=u.selectionEnd;let V=y-1;for(let l=C;l<=V&&l<w;l++)f[l]!==E&&V++;B.right(u,V);return}if(["deleteContentBackward","deleteContentForward"].indexOf(c)!==-1){const w=e.reverseFillMask===!0?y===0?x.length>p.length?1:0:Math.max(0,x.length-(x===d?0:Math.min(p.length,b)+1))+1:y;u.setSelectionRange(w,w,"forward");return}if(e.reverseFillMask===!0)if(s===!0){const w=Math.max(0,x.length-(x===d?0:Math.min(p.length,b+1)));w===1&&y===1?u.setSelectionRange(w,w,"forward"):B.rightReverse(u,w)}else{const w=x.length-b;u.setSelectionRange(w,w,"backward")}else if(s===!0){const w=Math.max(0,f.indexOf(E),Math.min(p.length,y)-1);B.right(u,w)}else{const w=y-1;B.right(u,w)}});const m=e.unmaskedValue===!0?S(x):x;String(e.modelValue)!==m&&(e.modelValue!==null||m!=="")&&o(m,!0)}function N(i,r,c){const u=L(S(i.value));r=Math.max(0,f.indexOf(E),Math.min(u.length,r)),C=r,i.setSelectionRange(r,c,"forward")}const B={left(i,r){const c=f.slice(r-1).indexOf(E)===-1;let u=Math.max(0,r-1);for(;u>=0;u--)if(f[u]===E){r=u,c===!0&&r++;break}if(u<0&&f[r]!==void 0&&f[r]!==E)return B.right(i,0);r>=0&&i.setSelectionRange(r,r,"backward")},right(i,r){const c=i.value.length;let u=Math.min(c,r+1);for(;u<=c;u++)if(f[u]===E){r=u;break}else f[u-1]===E&&(r=u);if(u>c&&f[r-1]!==void 0&&f[r-1]!==E)return B.left(i,c);i.setSelectionRange(r,r,"forward")},leftReverse(i,r){const c=O(i.value.length);let u=Math.max(0,r-1);for(;u>=0;u--)if(c[u-1]===E){r=u;break}else if(c[u]===E&&(r=u,u===0))break;if(u<0&&c[r]!==void 0&&c[r]!==E)return B.rightReverse(i,0);r>=0&&i.setSelectionRange(r,r,"backward")},rightReverse(i,r){const c=i.value.length,u=O(c),y=u.slice(0,r+1).indexOf(E)===-1;let b=Math.min(c,r+1);for(;b<=c;b++)if(u[b-1]===E){r=b,r>0&&y===!0&&r--;break}if(b>c&&u[r-1]!==void 0&&u[r-1]!==E)return B.leftReverse(i,c);i.setSelectionRange(r,r,"forward")}};function J(i){t("click",i),M=void 0}function Q(i){if(t("keydown",i),He(i)===!0||i.altKey===!0)return;const r=a.value,c=r.selectionStart,u=r.selectionEnd;if(i.shiftKey||(M=void 0),i.keyCode===37||i.keyCode===39){i.shiftKey&&M===void 0&&(M=r.selectionDirection==="forward"?c:u);const y=B[(i.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(i.preventDefault(),y(r,M===c?u:c),i.shiftKey){const b=r.selectionStart;r.setSelectionRange(Math.min(M,b),Math.max(M,b),"forward")}}else i.keyCode===8&&e.reverseFillMask!==!0&&c===u?(B.left(r,c),r.setSelectionRange(r.selectionStart,u,"backward")):i.keyCode===46&&e.reverseFillMask===!0&&c===u&&(B.rightReverse(r,u),r.setSelectionRange(c,r.selectionEnd,"forward"))}function L(i){if(i==null||i==="")return"";if(e.reverseFillMask===!0)return q(i);const r=n;let c=0,u="";for(let y=0;y<r.length;y++){const b=i[c],R=r[y];if(typeof R=="string")u+=R,b===R&&c++;else if(b!==void 0&&R.regex.test(b))u+=R.transform!==void 0?R.transform(b):b,c++;else return u}return u}function q(i){const r=n,c=f.indexOf(E);let u=i.length-1,y="";for(let b=r.length-1;b>=0&&u!==-1;b--){const R=r[b];let p=i[u];if(typeof R=="string")y=R+y,p===R&&u--;else if(p!==void 0&&R.regex.test(p))do y=(R.transform!==void 0?R.transform(p):p)+y,u--,p=i[u];while(c===b&&p!==void 0&&R.regex.test(p));else return y}return y}function S(i){return typeof i!="string"||v===void 0?typeof i=="number"?v(""+i):i:v(i)}function z(i){return d.length-i.length<=0?i:e.reverseFillMask===!0&&i.length!==0?d.slice(0,-i.length)+i:i+d.slice(i.length)}return{innerValue:g,hasMask:_,moveCursorForPaste:N,updateMaskValue:T,onMaskedKeydown:Q,onMaskedClick:J}}const Mt={name:String};function qt(e){return h(()=>e.name||e.for)}function Rt(e,t){function o(){const a=e.modelValue;try{const f="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(a)===a&&("length"in a?Array.from(a):[a]).forEach(d=>{f.items.add(d)}),{files:f.files}}catch{return{files:void 0}}}return h(()=>{if(e.type==="file")return o()})}const Ft=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,Vt=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,At=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,Bt=/[a-z0-9_ -]$/i;function Et(e){return function(o){if(o.type==="compositionend"||o.type==="change"){if(o.target.qComposing!==!0)return;o.target.qComposing=!1,e(o)}else o.type==="compositionupdate"&&o.target.qComposing!==!0&&typeof o.data=="string"&&(Ye.is.firefox===!0?Bt.test(o.data)===!1:Ft.test(o.data)===!0||Vt.test(o.data)===!0||At.test(o.data)===!0)===!0&&(o.target.qComposing=!0)}}const $t=re({name:"QInput",inheritAttrs:!1,props:{...yt,...wt,...Mt,modelValue:[String,Number,FileList],shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...kt,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:o}){const{proxy:a}=Y(),{$q:f}=a,d={};let n=NaN,v,C,M=null,_;const g=$(null),U=qt(e),{innerValue:F,hasMask:O,moveCursorForPaste:j,updateMaskValue:T,onMaskedKeydown:N,onMaskedClick:B}=St(e,t,p,g),J=Rt(e),Q=h(()=>ye(F.value)),L=Et(b),q=xt({changeEvent:!0}),S=h(()=>e.type==="textarea"||e.autogrow===!0),z=h(()=>S.value===!0||["text","search","url","tel","password"].includes(e.type)),i=h(()=>{const l={...q.splitAttrs.listeners.value,onInput:b,onPaste:y,onChange:s,onBlur:m,onFocus:ke};return l.onCompositionstart=l.onCompositionupdate=l.onCompositionend=L,O.value===!0&&(l.onKeydown=N,l.onClick=B),e.autogrow===!0&&(l.onAnimationend=R),l}),r=h(()=>{const l={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:U.value,...q.splitAttrs.attributes.value,id:q.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return S.value===!1&&(l.type=e.type),e.autogrow===!0&&(l.rows=1),l});D(()=>e.type,()=>{g.value&&(g.value.value=e.modelValue)}),D(()=>e.modelValue,l=>{if(O.value===!0){if(C===!0&&(C=!1,String(l)===n))return;T(l)}else F.value!==l&&(F.value=l,e.type==="number"&&d.hasOwnProperty("value")===!0&&(v===!0?v=!1:delete d.value));e.autogrow===!0&&W(x)}),D(()=>e.autogrow,l=>{l===!0?W(x):g.value!==null&&o.rows>0&&(g.value.style.height="auto")}),D(()=>e.dense,()=>{e.autogrow===!0&&W(x)});function c(){Pe(()=>{const l=document.activeElement;g.value!==null&&g.value!==l&&(l===null||l.id!==q.targetUid.value)&&g.value.focus({preventScroll:!0})})}function u(){g.value!==null&&g.value.select()}function y(l){if(O.value===!0&&e.reverseFillMask!==!0){const A=l.target;j(A,A.selectionStart,A.selectionEnd)}t("paste",l)}function b(l){if(!l||!l.target)return;if(e.type==="file"){t("update:modelValue",l.target.files);return}const A=l.target.value;if(l.target.qComposing===!0){d.value=A;return}if(O.value===!0)T(A,!1,l.inputType);else if(p(A),z.value===!0&&l.target===document.activeElement){const{selectionStart:Z,selectionEnd:K}=l.target;Z!==void 0&&K!==void 0&&W(()=>{l.target===document.activeElement&&A.indexOf(l.target.value)===0&&l.target.setSelectionRange(Z,K)})}e.autogrow===!0&&x()}function R(l){t("animationend",l),x()}function p(l,A){_=()=>{M=null,e.type!=="number"&&d.hasOwnProperty("value")===!0&&delete d.value,e.modelValue!==l&&n!==l&&(n=l,A===!0&&(C=!0),t("update:modelValue",l),W(()=>{n===l&&(n=NaN)})),_=void 0},e.type==="number"&&(v=!0,d.value=l),e.debounce!==void 0?(M!==null&&clearTimeout(M),d.value=l,M=setTimeout(_,e.debounce)):_()}function x(){requestAnimationFrame(()=>{const l=g.value;if(l!==null){const A=l.parentNode.style,{scrollTop:Z}=l,{overflowY:K,maxHeight:I}=f.platform.is.firefox===!0?{}:window.getComputedStyle(l),ee=K!==void 0&&K!=="scroll";ee===!0&&(l.style.overflowY="hidden"),A.marginBottom=l.scrollHeight-1+"px",l.style.height="1px",l.style.height=l.scrollHeight+"px",ee===!0&&(l.style.overflowY=parseInt(I,10)<l.scrollHeight?"auto":"hidden"),A.marginBottom="",l.scrollTop=Z}})}function s(l){L(l),M!==null&&(clearTimeout(M),M=null),_!==void 0&&_(),t("change",l.target.value)}function m(l){l!==void 0&&ke(l),M!==null&&(clearTimeout(M),M=null),_!==void 0&&_(),v=!1,C=!1,delete d.value,e.type!=="file"&&setTimeout(()=>{g.value!==null&&(g.value.value=F.value!==void 0?F.value:"")})}function w(){return d.hasOwnProperty("value")===!0?d.value:F.value!==void 0?F.value:""}ve(()=>{m()}),fe(()=>{e.autogrow===!0&&x()}),Object.assign(q,{innerValue:F,fieldClass:h(()=>`q-${S.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:h(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:g,emitValue:p,hasValue:Q,floatingLabel:h(()=>Q.value===!0&&(e.type!=="number"||isNaN(F.value)===!1)||ye(e.displayValue)),getControl:()=>k(S.value===!0?"textarea":"input",{ref:g,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...r.value,...i.value,...e.type!=="file"?{value:w()}:J.value}),getShadowControl:()=>k("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(S.value===!0?"":" text-no-wrap")},[k("span",{class:"invisible"},w()),k("span",e.shadowText)])});const V=Ct(q);return Object.assign(a,{focus:c,select:u,getNativeElement:()=>g.value}),Ee(a,"nativeEl",()=>g.value),V}}),Be=re({name:"QCard",props:{...$e,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(e,{slots:t}){const{proxy:{$q:o}}=Y(),a=ze(e,o),f=h(()=>"q-card"+(a.value===!0?" q-card--dark q-dark":"")+(e.bordered===!0?" q-card--bordered":"")+(e.square===!0?" q-card--square no-border-radius":"")+(e.flat===!0?" q-card--flat no-shadow":""));return()=>k(e.tag,{class:f.value},X(t.default))}}),zt={__name:"login_registro",setup(e,{expose:t}){t(),Ge(g=>({"819b033a":nt(n)}));const o=xe(),a=$("mdi-account-check-outline"),f=H("entradas"),d=H("pagina"),n=H("alto"),v=H("enviar"),_={router:o,icono_login:a,entradas:f,pagina:d,alto:n,enviar:v,cambiar_estado:(g,U)=>{let F=f.find(O=>O.nombre===g);(g==="contra"||g==="repetir_contra")&&(F.estado=!F.estado,F.tipo=F.tipo==="password"?"text":"password")},enviar_registro:()=>{o.push(`${d.value.pagina}`)},inject:H,ref:$,get useRouter(){return xe}};return Object.defineProperty(_,"__isScriptSetup",{enumerable:!1,value:!0}),_}};function Pt(e,t,o,a,f,d){return oe(),ie(Be,{class:"fondo_azul col-xs-12 col-md-6 col-lg-5 row justify-center items-center"},{default:ne(()=>[G(Be,{class:"my-card col-sm-7 col-xs-10 col-md-11 col-lg-10 row"},{default:ne(()=>[G(ge,{class:"col-12 flex flex-center"},{default:ne(()=>[G(it,{size:"128px","font-size":"100px",class:"avatar","text-color":"white",icon:"mdi-account-check-outline"})]),_:1}),G(ge,{class:"col-12 row flex flex-center"},{default:ne(()=>[(oe(!0),We(Xe,null,et(a.entradas,(n,v)=>(oe(),ie($t,{key:v,filled:"",modelValue:n.valor,"onUpdate:modelValue":C=>n.valor=C,type:n.tipo,placeholder:n.placeholder,class:"col-9",color:"teal-9",rules:n.reglas},{before:ne(()=>[n.estado?(oe(),ie(le,{key:0,class:tt({animar:n.nombre==="contra"||n.nombre==="repetir_contra"}),size:"32px",name:n.icono,onClick:C=>a.cambiar_estado(n.nombre)},null,8,["class","name","onClick"])):Ce("",!0),!n.estado&&n.nombre=="contra"||!n.estado&&n.nombre==="repetir_contra"?(oe(),ie(le,{key:1,class:"animar teal-9",name:"mdi-lock-open-variant-outline",size:"32px",onClick:C=>a.cambiar_estado(n.nombre)},null,8,["onClick"])):Ce("",!0)]),_:2},1032,["modelValue","onUpdate:modelValue","type","placeholder","rules"]))),128))]),_:1}),G(ge,{class:"col-12 flex justify-center"},{default:ne(()=>[G(_e,{label:"Enviar",type:"submit",class:"boton_enviar q-mr-md",onClick:a.enviar},null,8,["onClick"]),G(_e,{label:a.pagina.texto,type:"submit",class:"boton_enviar",onClick:a.enviar_registro},null,8,["label"])]),_:1})]),_:1})]),_:1})}const jt=Je(zt,[["render",Pt],["__scopeId","data-v-ce0d73b7"],["__file","login_registro.vue"]]),Lt=()=>{const e=$("");return{reglas_usuario:[n=>n&&n.length>6||"Ingrese un nombre de al menos  6 caracteres"],reglas_correo:[n=>n&&/.+@.+\..+/.test(n)||"Correo inválido"],reglas_contra:[n=>(e.value=n,n&&n.length>=8||"La contraseña debe tener al menos 8 caracteres"),n=>n&&/[A-Z]/.test(n)||"Debe incluir al menos una letra mayúscula",n=>n&&/[a-z]/.test(n)||"Debe incluir al menos una letra minúscula",n=>n&&/\d/.test(n)||"Debe incluir al menos un número",n=>n&&/[!@#$%^&*(),.?":{}|<>]/.test(n)||"Debe incluir al menos un carácter especial"],reglas_repetir_contra:[n=>n&&n.length>=8||"La contraseña debe tener al menos 8 caracteres",n=>n&&/[A-Z]/.test(n)||"Debe incluir al menos una letra mayúscula",n=>n&&/[a-z]/.test(n)||"Debe incluir al menos una letra minúscula",n=>n&&/\d/.test(n)||"Debe incluir al menos un número",n=>n&&/[!@#$%^&*(),.?":{}|<>]/.test(n)||"Debe incluir al menos un carácter especial",n=>n===e.value||"Las contraseñas no coinciden"],enviar_post:async(n,v)=>{await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(v)}).then(C=>C.json()).then(C=>console.log(C))}}};export{Dt as Q,jt as l,Lt as v};
