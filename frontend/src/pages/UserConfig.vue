<template>
  <div class="q-pa-md flex flex-center">
    <q-card
      class="q-pa-md"
      style="width: 100%; max-width: 1000px; min-height: 600px"
    >
      <q-card-section>
        <div class="text-h4 text-center q-mb-md">Configuración de Usuario</div>
      </q-card-section>

      <q-separator />

      <q-card-section v-if="user.rol === 'Admin'" class="text-center">
        <div class="q-mb-lg">
          <q-avatar size="150px" rounded class="bg-blue-grey-3">
            <img
              v-if="typeof data.image !== string && data.image !== null"
              :src="`${api_base_backend}/${user.image}`"
            />
            <p v-else class="text-h6">sin foto</p>
          </q-avatar>
        </div>

        <q-file
          v-model="data.image"
          label="Cambiar foto de usuario"
          class="q-mx-auto"
          style="width: 300px"
        />
      </q-card-section>

      <q-separator />

      <!-- Nombre -->
      <q-card-section class="q-px-lg">
        <div class="row items-center justify-between">
          <div class="col-auto text-body1 text-grey-8">
            <q-icon name="person" color="primary" class="q-mr-sm" /> Nombre
          </div>
          <div
            class="col text-center"
            style="display: flex; justify-content: flex-end"
          >
            <div
              v-if="!editField.name"
              class="text-right text-h6"
              style="flex-grow: 1"
            >
              {{ data.name }}
            </div>
            <q-input
              v-else
              v-model="data.name"
              label="Nombre"
              outlined
              dense
              class="q-mb-none"
              style="max-width: 500px; flex-grow: 1"
            />
          </div>
          <q-icon
            name="edit"
            color="primary"
            @click="toggleEdit('name')"
            class="cursor-pointer q-ml-sm"
          />
        </div>
      </q-card-section>

      <q-separator />

      <!-- Correo Electrónico -->
      <q-card-section class="q-px-lg">
        <div class="row items-center justify-between">
          <div class="col-auto text-body1 text-grey-8">
            <q-icon name="email" color="primary" class="q-mr-sm" /> Correo
            Electrónico
          </div>
          <div
            class="col text-center"
            style="display: flex; justify-content: flex-end"
          >
            <div
              v-if="!editField.email"
              class="text-right text-h6"
              style="flex-grow: 1"
            >
              {{ data.email }}
            </div>
            <q-input
              v-else
              v-model="data.email"
              label="Correo Electrónico"
              outlined
              dense
              type="email"
              class="q-mb-none"
              style="max-width: 500px; flex-grow: 1"
            />
          </div>
          <q-icon
            name="edit"
            color="primary"
            @click="toggleEdit('email')"
            class="cursor-pointer q-ml-sm"
          />
        </div>
      </q-card-section>

      <q-separator />

      <!-- Contraseña y Confirmar Contraseña -->
      <q-card-section class="q-px-lg">
        <div class="row items-center justify-between">
          <div class="col-auto text-body1 text-grey-8">
            <q-icon name="lock" color="primary" class="q-mr-sm" /> Contraseña
          </div>
          <div
            class="col text-center"
            style="display: flex; justify-content: flex-end"
          >
            <div
              v-if="!editField.password"
              class="text-right text-h6"
              style="flex-grow: 1"
            >
              ********
            </div>
            <div
              v-else
              class="q-gutter-md row items-center justify-center"
              style="flex-grow: 1"
            >
              <q-input
                v-model="data.password"
                label="Contraseña"
                outlined
                dense
                type="password"
                class="q-mb-none"
                style="max-width: 320px"
              />
              <q-input
                v-model="data.confirm_password"
                label="Confirmar Contraseña"
                outlined
                dense
                type="password"
                class="q-mb-none"
                style="max-width: 320px"
              />
            </div>
          </div>
          <q-icon
            name="edit"
            color="primary"
            @click="toggleEdit('password')"
            class="cursor-pointer q-ml-sm"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-center">
        <q-btn
          label="Guardar Cambios"
          color="primary"
          @click="handleSave"
          :disable="isSaveDisabled"
          class="q-mt-md q-px-md"
          icon="save"
          push
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useUserStore } from "src/store/user.store";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { api_base_backend } from "../helpers.js";

export default {
  setup() {
    const $q = useQuasar();
    const userStore = useUserStore();
    const user = computed(() => userStore.user);

    const data = reactive({
      name: user.value.name,
      email: user.value.email,
      image: user.value.image,
      password: undefined,
      confirm_password: undefined,
    });

    const editField = reactive({
      name: false,
      email: false,
      password: false,
    });

    function toggleEdit(field) {
      editField[field] = !editField[field];
    }

    function handleSave() {
      if (data.password !== null) {
        if (data.password !== data.confirm_password) {
          return $q.notify({
            type: "negative",
            message: "Las Contraseñas no son similares",
          });
        }
      }

      const formData = new FormData();

      formData.append("_method", "PATCH");
      formData.append("name", data.name);
      if (data.image !== null && typeof data.image !== "string") {
        formData.append("image", data.image);
      }
      if (data.email !== user.value.email) {
        formData.append("email", data.email);
      }

      if (data.password) {
        formData.append("password", data.password);
        formData.append("confirm_name", data.confirm_password);
      }

      api
        .post("user", formData)
        .then((response) => {
          if (response.status === 200) {
            userStore.setUser({
              ...user.value,
              image: response.data.image,
              name: response.data.name,
              email: response.data.email,
            });

            editField.name = false;
            editField.email = false;
            editField.password = false;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return { handleSave, toggleEdit, editField, data, user, api_base_backend };
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
