import{v as g,Q as f,l as x}from"./validar_campos-DAbQpFYV.js";import{_ as h,r,p as o,s as b,t as w,u as y,y as v,x as k}from"./index-Dudmz9zc.js";import"./dom-g-FwNwQF.js";import"./QBtn-DVH1S5hF.js";const C={__name:"Login",setup(m,{expose:l}){l();const c=v(),e=r({pagina:"/registro",texto:"Registro"}),t=r("65%"),{reglas_correo:s,reglas_contra:p,enviar_post:u}=g(),n=r([{nombre:"email",tipo:"mail",valor:"",icono:"mail",placeholder:"Correo",estado:!0,reglas:s},{nombre:"password",tipo:"password",valor:"",icono:"mdi-lock-outline",placeholder:"Contraseña",estado:!0,reglas:p}]),i=r({}),_=async()=>{try{n.value.forEach(a=>{i.value[a.nombre]=a.valor}),u("/login",i.value)}catch(a){console.error("Error al enviar los datos:",a)}};o("entradas",n.value),o("pagina",e),o("alto",t),o("enviar",_);const d={router:c,pagina:e,alto:t,reglas_correo:s,reglas_contra:p,enviar_post:u,entradas:n,datos:i,enviar:_,provide:o,ref:r,login_registro:x,get validar(){return g},get useRouter(){return v}};return Object.defineProperty(d,"__isScriptSetup",{enumerable:!1,value:!0}),d}};function L(m,l,c,e,t,s){return b(),w(f,{class:"fondo row"},{default:y(()=>[k(e.login_registro)]),_:1})}const P=h(C,[["render",L],["__file","Login.vue"]]);export{P as default};
