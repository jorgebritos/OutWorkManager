<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Crear Trabajo</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleCreate">
          <q-input
            placeholder="Descripcion del trabajo"
            v-model="data.description"
            required
            label="no resize arrow"
            type="textarea"
          />

          <div
            v-for="(error, index) in error_create?.description"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-checkbox v-model="data.is_check" label="Confirmarcion" />

          <q-input v-model="data.date" type="date" label="Fecha" required />

          <div
            v-for="(error, index) in error_create?.date"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <p class="q-mt-md">Horarios:</p>
          <div class="flex gap-md">
            <q-input
              v-model="data.in_time"
              required
              type="time"
              class="q-mr-xl"
              label="Entrada"
            />

            <div
              v-for="(error, index) in error_create?.in_time"
              :key="index"
              class="q-mt-sm"
            >
              <span class="q-pa-xs bg-negative text-white">
                {{ error }}
              </span>
            </div>

            <q-input
              v-model="data.out_time"
              type="time"
              label="Salida"
              required
            />

            <div
              v-for="(error, index) in error_create?.out_time"
              :key="index"
              class="q-mt-sm"
            >
              <span class="q-pa-xs bg-negative text-white">
                {{ error }}
              </span>
            </div>
          </div>

          <div v-if="!isLoading" class="w-full">
            <q-btn
              :label="enterprise_tag ? enterprise_tag : 'Empresa'"
              class="q-mt-md"
              no-caps
              style="width: 100%"
            >
              <span class="q-ml-auto mdi mdi-arrow-down-bold"></span>
              <q-menu
                v-model="menu_enterprises"
                anchor="bottom middle"
                class="q-ml-xl"
                self="top middle"
                :offset="[0, 15]"
              >
                <q-list class="scroll" style="max-height: 250px; width: 300px">
                  <q-infinite-scroll
                    @load="handleEnterprisesScroll"
                    :offset="15"
                  >
                    <q-item
                      v-for="(enterprise, index) in enterprises"
                      class="q-px-none"
                      :key="index"
                    >
                      <q-item-section>
                        <q-btn
<<<<<<< HEAD
                          @click="
                            () => {
                              data.enterprise_id = enterprise.id;
                              menu_enterprises = false;
                              enterprise_tag = enterprise.name;
                            }
                          "
=======
                          @click="() => {data.enterprise_id = enterprise._id; menu_enterprises=false; enterprise_tag=enterprise.nombre}"
>>>>>>> 9a2d138f7cf91a9dfc7954ca8676fea046af4e4b
                        >
                          {{ enterprise.nombre }}
                        </q-btn>
                      </q-item-section>
                    </q-item>
                  </q-infinite-scroll>
                </q-list>
              </q-menu>
            </q-btn>
          </div>

          <div
            v-for="(error, index) in error_create?.enterprise_id"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-btn
            label="Registrar Trabajo"
            class="q-mt-md"
            type="submit"
            color="primary"
          />
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
  <q-btn class="q-mx-sm bg-green-4" @click="show = true">
    Registrar Trabajo
  </q-btn>
</template>

<script>
import { reactive, ref } from "vue";
import { useCreateJob } from "src/hooks/api/jobs.hooks";
import { useEnterprises } from "src/hooks/api/enterprises.hooks";

export default {
  setup(props, { emit }) {
    const show = ref(false);
    const users = ref(null);

    const { isLoading, enterprises, paginate, refetch } = useEnterprises();

    const menu_enterprises = ref(false);
    const enterprise_tag = ref(null);

    let enterprises_old = null;

    const handleEnterprisesScroll = () => {
      let next_page =
        paginate.value.current_page !== paginate.value.last_page
          ? paginate.value.current_page + 1
          : null;

      if (next_page) {
        enterprises_old = enterprises.value;

        refetch({ filter: true, page: next_page }).then((response) => {
          enterprises.value = [
            ...enterprises_old,
            ...response.data.enterprises
          ]
        });
      }
    };

    const data = reactive({
      description: null,
      is_check: true,
      date: null,
      in_time: null,
      out_time: null,
      enterprise_id: null,
    });

    const error_create = ref(null);

    const handleClose = () => {
      show.value = false;
      emit("refetch");
    };

    const handleCreate = async () => {
      const { isError, error } = await useCreateJob({
        ...data,
      });

      if (!isError.value) {
        handleClose();
      } else {
        error_create.value = error.value;
      }
    };

    return {
      enterprise_tag,
      menu_enterprises,
      isLoading,
      enterprises,
      handleEnterprisesScroll,
      data,
      handleCreate,
      show,
      users,
      error_create,
    };
  },
};
</script>
