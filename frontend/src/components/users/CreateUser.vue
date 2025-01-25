<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Crear Usuarios</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleCreateUser">
          <q-input name="name" required label="name" v-model="data.name" />
          <div
            v-for="(error, index) in error_create?.name"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-input
            name="email"
            required
            type="email"
            label="email"
            v-model="data.email"
          />
          <div
            v-for="(error, index) in error_create?.email"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-input
            name="password"
            required
            type="password"
            label="password"
            v-model="data.password"
          />
          <div
            v-for="(error, index) in error_create?.password"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-select
            v-model="data.rol"
            required
            option-label="label"
            option-value="value"
            :options="roles"
            label="Rol Usuario"
          />
          <div
            v-for="(error, index) in error_create?.rol"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-btn label="Crear" class="q-mt-md" type="submit" color="primary" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="handleClose"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-btn class="bg-primary text-white q-mr-md" @click="handleOpen">
    Crear
  </q-btn>
</template>

<script>
import { reactive, ref } from "vue";
import { useCreateUser } from "src/hooks/api/users.hooks";

export default {
  setup(props, { emit }) {
    const roles = [
      { label: "Empresario", value: "Enterprise" },
      { label: "Guardia", value: "Guard" },
      { label: "Admin", value: "Admin" },
    ];

    const show = ref(false);

    const data = reactive({
      email: "",
      usuario: "",
      password: "",
      rol: roles[0],
    });

    const error_create = ref(null);

    const handleOpen = () => show.value = true
    const handleClose = () => show.value = false

    const handleCreateUser = async () => {
      const { isError, error } = await useCreateUser({
        ...data,
        rol: data.rol.value,
      });

      if (isError.value) {
        error_create.value = error.value;
      } else {
        emit("refetch")
        handleClose()
      }
    };

    return {
      data,
      handleCreateUser,
      show,
      handleClose,
      handleOpen,
      roles,
      error_create,
    };
  },
};
</script>
