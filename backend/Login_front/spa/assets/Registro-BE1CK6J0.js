import{v as d,Q as f,l as b}from"./validar_campos-BwpwEuPy.js";import{_ as h,r as o,p as r,s as x,t as k,u as w,x as C}from"./index-Ci9FvoOh.js";import"./dom-DV3UvHzN.js";import"./QBtn-DQZRJuAe.js";const R={__name:"Registro",setup(g,{expose:i}){i();const t=o({pagina:"/",texto:"Login"}),a=o("80%"),{reglas_correo:s,reglas_contra:n,reglas_repetir_contra:l,reglas_usuario:c,enviar_post:p}=d(),e=o([{nombre:"usuario",tipo:"text",valor:"",icono:"person",placeholder:"Nombre de usuario",estado:!0,reglas:c},{nombre:"correo",tipo:"mail",valor:"",icono:"mail",placeholder:"Correo",estado:!0,reglas:s},{nombre:"contra",tipo:"password",valor:"",icono:"mdi-lock-outline",placeholder:"Contraseña",estado:!0,reglas:n},{nombre:"repetir_contra",tipo:"password",valor:"",icono:"mdi-lock-outline",placeholder:"Repetir Contraseña",estado:!0,reglas:l}]),m=o({}),u=()=>{let v={usuario:e.value[0].nombre,correo:e.value[1].nombre,contra:e.value[2].nombre,repetir_contra:e.value[3].nombre};p("http://localhost/registro",v)};r("pagina",t),r("entradas",e.value),r("alto",a.value),r("enviar",u);const _={pagina:t,alto:a,reglas_correo:s,reglas_contra:n,reglas_repetir_contra:l,reglas_usuario:c,enviar_post:p,entradas:e,datos:m,enviar:u,login_registro:b,get validar(){return d},ref:o,provide:r};return Object.defineProperty(_,"__isScriptSetup",{enumerable:!1,value:!0}),_}};function $(g,i,t,a,s,n){return x(),k(f,{class:"fondo row"},{default:w(()=>[C(a.login_registro)]),_:1})}const S=h(R,[["render",$],["__scopeId","data-v-a7d660a1"],["__file","Registro.vue"]]);export{S as default};