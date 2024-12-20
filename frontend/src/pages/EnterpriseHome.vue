<template>
  <h2 class="q-mt-md q-mb-sm text-center">Registra tu empresa:</h2>
  <q-form @submit.prevent="handleCreate" class="q-mx-auto" style="width: 600px">
    <q-input name="RUT" required label="RUT" v-model="data.RUT" />
    <div
      v-for="(error, index) in error_create?.RUT"
      :key="index"
      class="q-mt-sm"
    >
      <span class="q-pa-xs bg-negative text-white">
        {{ error }}
      </span>
    </div>
    <q-input name="name" required label="nombre" v-model="data.name" />
    <div
      v-for="(error, index) in error_create?.nombre"
      :key="index"
      class="q-mt-sm"
    >
      <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
    </div>

    <q-file
      color="teal"
      filled
      label="image"
      v-model="data.image"
      class="q-mt-md"
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>

    <div
      v-for="(error, index) in error_create?.image"
      :key="index"
      class="q-mt-sm"
    >
      <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
    </div>

    <q-btn label="Crear" class="q-mt-md" type="submit" color="primary" />
  </q-form>
</template>

<script>
import { useUserStore } from "src/store/user.store";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { useCreateEnterprise } from "src/hooks/api/enterprises.hooks";

export default {
  setup() {
    const router = useRouter();
    const userStore = useUserStore();

    const user = userStore.getUser;

    const error_create = ref(null);

    const data = reactive({
      RUT: "",
      name: "",
      image: null,
    });

    const handleCreate = async () => {
      console.log(data);
      const { isError, error, enterprise } = await useCreateEnterprise(data);

      if (!isError.value) {
        userStore.setUser({
          ...user,
          enterprise: enterprise.value,
        });

        router.push("/enterprises/" + enterprise.value.slug);
      } else {
        error_create.value = error.value;
      }
    };

    return { user, error_create, data, handleCreate };
  },
};
</script>
