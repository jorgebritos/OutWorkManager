<template>
  <div class="login row justify-center">
    <div class="login_image col-12 col-md-5 row justify-center items-center">
      <q-card class="card_login row justify-center items-center">
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="w-xl">
            <div class="q-pa-md q-gutter-sm">
              <h4 class="text-h4 text-center text-white">Registrarse</h4>
            </div>
            <div class="">
              <q-input
                filled
                v-model="data.email"
                type="email"
                placeholder="Correo"
                :dense="dense"
              >
                <template v-slot:append>
                  <q-icon name="mail" />
                </template>
              </q-input>

              <q-input
                filled
                v-model="data.name"
                type="name"
                placeholder="Nombre"
                style="padding-top: 10px"
                :dense="dense"
              >
                <template v-slot:append>
                  <span class="mdi mdi-account"></span>
                </template>
              </q-input>
              <q-input
                filled
                v-model="data.password"
                :type="isPwd ? 'password' : 'text'"
                placeholder="Contraseña"
                :dense="dense"
                style="padding-top: 10px"
              >
                <template v-slot:append>
                  <q-icon name="mdi-lock-outline" />
                </template>
              </q-input>
              <q-input
                filled
                v-model="data.confirm_password"
                :type="isPwd ? 'password' : 'text'"
                placeholder="Contraseña confirmación"
                :dense="dense"
                style="padding-top: 10px"
              >
                <template v-slot:append>
                  <q-icon name="mdi-lock-outline" />
                </template>
              </q-input>
            </div>

            <div class="flex flex-end q-mt-md">
              <q-btn
                label="Registrar"
                type="submit"
                color="light-blue-14"
                class="q-mt-md"
                style="width: 100%"
                @click.prevent="send"
              />
            </div>
            <div class="q-mt-md">
              <q-btn
                flat
                label="Ya estas registrado ?"
                href="/#/login"
                class="text-white"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="image col-0 d-none d-md-block col-md-7"></div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useUserStore } from "../store/user.store";
import { useRouter } from "vue-router";
import { api } from "src/boot/axios";

export default {
  setup() {
    const router = useRouter();

    const ph = ref("");
    const dense = ref(false);
    const licence = ref(false);
    const text = ref("");

    const data = reactive({
      email: "",
      name: "",
      password: "",
      confirm_password: "",
    });

    const isPwd = ref(true);

    const send = async () => {
      api
        .post("auth/register", {
          ...data,
        })
        .then(function (response) {
          if (response.status === 201) {
            console.log("hola");
            router.push("/login");
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    return { ph, dense, licence, text, data, isPwd, send };
  },
};
</script>

<style scoped>
.login {
  height: 100vh;
  width: inherit;
  background-color: rgb(255, 255, 255);
  position: fixed;
  left: 0;
  z-index: 1;
}
.login_image {
  background-image: linear-gradient(
      rgba(18, 68, 139, 0.5),
      rgba(18, 68, 139, 0.5)
    ),
    url("/imagenes/Fondo2.jpeg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 100%;
}
.card_login {
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 600px;
  margin: 0 10px;
  backdrop-filter: blur(40px);
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 3px 3px 5px rgba(151, 175, 209, 0.5);
  border-radius: 5%;
}
.image {
  background-image: url("/imagenes/Fondo1.jpeg");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  height: 100%;
}
</style>
