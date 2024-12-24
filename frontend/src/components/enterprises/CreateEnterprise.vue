<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Crear Empresa</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleCreateEnterprise">
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
          <q-checkbox label="Verificado" v-model="data.is_valid" />

          <q-file color="teal" filled label="image" v-model="data.image">
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

          <div v-if="!isLoading" class="w-full">
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
                  <q-infinite-scroll
                    @load="handleUserScroll"
                    :offset="15"
                  >
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
  <q-btn bordered @click="show = true" class="bg-teal-6 text-white">
    <q-avatar icon="mdi-plus-circle-outline" />
  </q-btn>
</template>

<script>
import { reactive, ref } from "vue";
import { useCreateEnterprise } from "src/hooks/api/enterprises.hooks";
import { useUsers } from "src/hooks/api/users.hooks";

export default {
  setup(props, { emit }) {
    const show = ref(false);

    const { isLoading, users, paginate, refetch } = useUsers();

    const menu_users = ref(false)
    const user_tag = ref(null)

    let users_old = null;

    const handleUserScroll = () => {
      users_old = users.value;
      refetch().then((response) => {
        users.value = [...users_old, ...response.data.users];
      });
    };

    const data = reactive({
      name: "",
      RUT: "",
      is_valid: true,
      image: null,
      user_id: null,
    });

    const error_create = ref(null);

    const handleClose = () => {
      data.name = "";
      data.RUT = "";
      data.is_valid = true;
      data.image = null;
      data.user_id = null;
      show.value = false;
    };

    const handleCreateEnterprise = async () => {
      const { isError, error } = await useCreateEnterprise({
        ...data,
      });

      if (!isError.value) {
        handleClose();
        emit("refetch");
      } else {
        error_create.value = error.value;
      }
    };

    return {
      data,
      menu_users,
      user_tag,
      handleUserScroll,
      handleCreateEnterprise,
      show,
      handleClose,
      isLoading,
      users,
      error_create,
    };
  },
};
</script>
