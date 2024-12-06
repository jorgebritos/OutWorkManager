<template>
    <q-page class="fondo row">
        <login_registro/>
    </q-page>
</template>
<script setup>
import { provide, ref } from "vue";
import login_registro from "../components/login_registro.vue";
import { validar } from "../composables/validar_campos";
import { useRouter } from "vue-router";

const router = useRouter();


const pagina = ref({pagina:"/registro",texto:"Registro"});
const alto = ref("65%");
const { reglas_correo, reglas_contra, enviar_post } = validar();

const entradas = ref([
  {
    nombre: "email",
    tipo: "mail",
    valor: "",
    icono: "mail",
    placeholder: "Correo",
    estado: true,
    reglas: reglas_correo,
  },
  {
    nombre: "password",
    tipo: "password",
    valor: "",
    icono: "mdi-lock-outline",
    placeholder: "Contraseña",
    estado: true,
    reglas: reglas_contra,
  },
]);

const datos = ref({});

const enviar = async () => {
  try {
    // Construir los datos
    entradas.value.forEach((element) => {
      datos.value[element.nombre] = element.valor;
    });

    // Enviar al backend
     enviar_post("/login", datos.value)
    
  
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
};

// Proveer datos a los componentes hijos
provide("entradas", entradas.value);
provide("pagina", pagina);
provide("alto", alto);
provide("enviar", enviar);
</script>
<style>
 .fondo{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-image: url("/imagenes/Fondo1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
</style>