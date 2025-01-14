<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Menu Edit Empresa</div>
      </q-card-section>

      <q-card-section class="q-pt-none" v-if="enterprise">
        <q-form @submit.prevent="handleUpdateEnterprise">
          <q-input
            name="nombre"
            required
            label="nombre"
            v-model="enterprise.name"
          />

          <div
            v-for="(error, index) in error_edit?.nombre"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-file
            class="q-mt-md"
            color="teal"
            filled
            label="image"
            v-model="image"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div
            v-for="(error, index) in error_edit?.image"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <div v-if="!isLoading && user.rol === 'Admin'" class="w-full">
            <q-btn
              :label="user_tag ? user_tag : 'Usuario'"
              class="q-mt-md"
              no-caps
              style="width: 100%"
            >
              <span class="q-ml-auto mdi mdi-arrow-down-bold"></span>
              <q-menu
                v-model="menu_users"
                anchor="bottom middle"
                class="q-ml-xl"
                self="top middle"
                :offset="[0, 15]"
              >
                <q-list class="scroll" style="max-height: 250px; width: 300px">
                  <q-infinite-scroll @load="handleUserScroll" :offset="15">
                    <q-item
                      v-for="(user, index) in users"
                      class="q-px-none"
                      :key="index"
                    >
                      <q-item-section>
                        <q-btn
                          @click="
                            () => {
                              data.user_id = user.id;
                              menu_users = false;
                              user_tag = user.email;
                            }
                          "
                        >
                          {{ user.email }}
                        </q-btn>
                      </q-item-section>
                    </q-item>
                  </q-infinite-scroll>
                </q-list>
              </q-menu>
            </q-btn>
          </div>

          <div
            v-for="(error, index) in error_create?.user_id"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-btn
            label="Editar"
            class="q-mt-md q-mr-sm"
            type="submit"
            color="primary"
          />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="primary" @click="handleClose" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, toRef } from "vue";
import { useUpdateEnterprise } from "src/hooks/api/enterprises.hooks";
import { useUserStore } from "src/store/user.store";
import { useUsers } from "src/hooks/api/users.hooks";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    enterprise: {
      required: true,
    },
  },
  setup(props, { emit }) {
    const show = toRef(props, "show");
    const enterprise = toRef(props, "enterprise");
    const error_edit = ref(null);
    const image = ref(null);
    const userStore = useUserStore();

    const user = userStore.getUser;

    const { isLoading, users, paginate, refetch } = useUsers({
      role: "users_not_enterprise",
    });

    const menu_users = ref(false);
    const user_tag = ref(null);

    let users_old = null;

    const handleUserScroll = () => {
      let next_page =
        paginate.value.current_page !== paginate.value.last_page
          ? paginate.value.current_page + 1
          : null;

      if (next_page) {
        users_old = users.value;
        
        refetch({
          role: "users_not_enterprise",
          page: next_page,
        }).then((response) => {
          users.value = [...users_old, ...response.data.users];
        });
      }
    };

    const handleClose = () => emit("handleCloseMenuEditEnterprise");

    const handleUpdateEnterprise = async () => {
      const {
        isError,
        error,
        enterprise: data,
      } = await useUpdateEnterprise(enterprise.value.slug, {
        ...enterprise.value,
        image: image.value,
      });

      if (!isError.value) {
        enterprise.value.image = data.value.image;
        handleClose();
      } else {
        error_edit.value = error.value;
      }
    };

    return {
      user,
      show,
      handleClose,
      enterprise,
      error_edit,
      handleUpdateEnterprise,
      isLoading,
      menu_users,
      user_tag,
      handleUserScroll,
      image,
      users,
    };
  },
};
</script>

<style scoped>
.my-card {
  width: 380px; /* ajusta el ancho de la tarjeta */
  height: auto; /* ajusta el alto de la tarjeta */
  margin-bottom: 20px; /* agrega un margen inferior a cada tarjeta */
  border-radius: 10px; /* agrega un borde redondeado a la tarjeta */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.scrollable-section {
  /* Altura máxima deseada para la sección */
  overflow-y: auto; /* Habilitar barra de desplazamiento vertical cuando sea necesario */
  /* Otros estilos opcionales */
}
</style>
