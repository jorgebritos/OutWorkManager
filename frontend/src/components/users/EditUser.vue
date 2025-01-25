<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Editar Usuario</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleEditUser">
          <q-input name="name" label="name" v-model="data.name" />
          <div
            v-for="(error, index) in error_edit?.name"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-input
            name="email"
            type="email"
            label="email"
            v-model="data.email"
          />
          <div
            v-for="(error, index) in error_edit?.email"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-input
            name="password"
            type="password"
            label="password"
            v-model="data.password"
            value=""
          />
          <div
            v-for="(error, index) in error_edit?.password"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-select v-model="data.rol" :options="roles" label="Rol Usuario" />
          <div
            v-for="(error, index) in error_edit?.rol"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-btn label="Edit" class="q-mt-md" type="submit" color="primary" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="show = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-btn icon="edit" class="text-primary q-mr-md" @click="show = true" />
</template>

<script>
import { ref, reactive } from "vue";
import { useEditUser } from "src/hooks/api/users.hooks";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const roles = [
      { label: "Empresario", value: "Enterprise" },
      { label: "Guardia", value: "Guard" },
      { label: "Admin", value: "Admin" },
    ];

    const show = ref(false);
    const data = reactive({
      name: props.user.name,
      email: props.user.email,
      password: undefined,
      rol:
        props.user.rol === "Empresario sin empresa" ? roles[0] : props.user.rol,
    });

    const error_edit = ref(null);

    const handleEditUser = async () => {
      const { isError, error } = await useEditUser(props.user._id, {
        ...data,
        rol: data.rol.value,
        email: data.email === props.user.email ? undefined : data.email,
      });

      if (isError.value) {
        error_edit.value = error.value;
      } else {
        emit("refetch")
        show.value = false
      }
    };

    return {
      handleEditUser,
      show,
      roles,
      data,
      error_edit,
    };
  },
};
</script>
