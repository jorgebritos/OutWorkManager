<template>
    <q-page class="fondo row">
        <login_registro class="q-mt-md"/>
        
    </q-page>
</template>
<script setup>
    import login_registro from "../components/login_registro.vue" 
    import { validar } from "../composables/validar_campos"
    import { ref,provide } from "vue"
    
    const pagina = ref('login')
    const alto = ref("80%")
    const  { reglas_correo, reglas_contra,reglas_repetir_contra,reglas_usuario,enviar_post } = validar()
        const entradas = ref([
            {nombre:"usuario",tipo:"text", valor:"", icono:"person",placeholder:"Nombre de usuario", estado:true,reglas:reglas_usuario,},
            {nombre:"email",tipo:"mail", valor:"", icono:"mail",placeholder:"Correo", estado:true,reglas:reglas_correo,},
            {nombre:"password",tipo:"password", valor:"", icono:"mdi-lock-outline",placeholder:"Contraseña", estado:true,reglas:reglas_contra},
            {nombre:"repetir_password",tipo:"password", valor:"", icono:"mdi-lock-outline",placeholder:"Repetir Contraseña", estado:true,reglas:reglas_repetir_contra}
        ])
        const datos = ref({})
      const enviar = () => {
        entradas.value.forEach(element => {
          
          datos.value ={
            ...datos.value, // Esto asegura que no sobrescribas los valores anteriores
            [element.nombre]: element.valor
            } 
        })
        
        enviar_post("http://localhost/registro",datos)   
          
         
      }
  
      

    
    provide("pagina",pagina)    
    provide("entradas",entradas.value)
    provide("alto",alto.value)
    provide("enviar",enviar)
</script>
<style scoped>
 .fondo{
         position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-image: url("/imagenes/Fondo1.png")
    }

  
</style>
 

/* Cambiar el color del icono de error 
.q-field--error .q-icon {
  color: rgb(204, 94, 94) !important;  Color del icono de error 
}
.q-field--error .q-field__messages > div {
    color: rgb(204, 94, 94) !important;
}
.q-field--error .q-field__label {
  color: rgb(204, 94, 94) !important; /* Cambiar el color del label 
}*/