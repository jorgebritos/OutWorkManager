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
import { useUserStore } from "../store/user.store";
import { api } from "src/boot/axios";

const router = useRouter();
const userStore = useUserStore();

const pagina = ref("registro");
const alto = ref("65%");
const { reglas_correo, reglas_contra } = validar();

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
    const response = await api.post("auth/login", datos.value);

    // Manejar la respuesta: almacenar token y redirigir
    userStore.setToken(response.data.access_token);
    userStore.setUser(response.data.user);
    userStore.setAuth(true);

    // Redirigir al inicio tras login exitoso
    router.push("/");
    console.log("Autenticación exitosa:", response.data);
  } catch (error) {
    console.error("Error al enviar los datos:", error);
  }
};

// Proveer datos a los componentes hijos
provide("entradas", entradas);
provide("pagina", pagina);
provide("alto", alto);
provide("enviar", enviar);
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