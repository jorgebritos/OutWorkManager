<template>
  <q-dialog v-model="show">
    <q-card style="width: 900px">
      <q-card-section>
        <div class="text-h6">Editar Trabajo</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleEdit">
          <q-input
            placeholder="Descripcion del trabajo"
            v-model="job.description"
            required
            label="no resize arrow"
            type="textarea"
          />

          <div
            v-for="(error, index) in error_edit?.description"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-checkbox v-model="job.is_check" label="Confirmarcion" />

          <p class="q-mt-md">Horarios:</p>
          <q-input
            v-model="job.in_datetime"
            required
            type="datetime-local"
            label="Entrada"
          />

          <div
            v-for="(error, index) in error_edit?.in_datetime"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-input
            v-model="job.out_datetime"
            type="datetime-local"
            label="Salida"
            required
          />

          <div
            v-for="(error, index) in error_edit?.out_datetime"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
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
                          @click="
                            () => {
                              job.enterprise_id = enterprise.id;
                              menu_enterprises = false;
                              enterprise_tag = enterprise.name;
                            }
                          "
                        >
                          {{ enterprise.name }}
                        </q-btn>
                      </q-item-section>
                    </q-item>
                  </q-infinite-scroll>
                </q-list>
              </q-menu>
            </q-btn>
          </div>

          <div
            v-for="(error, index) in error_edit?.enterprise_id"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">
              {{ error }}
            </span>
          </div>

          <q-btn
            label="Editar Trabajo"
            class="q-mt-md"
            type="submit"
            color="primary"
            last_page
          />
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
  <q-btn class="q-mx-sm bg-green-4" @click="show = true"> Edit </q-btn>
</template>

<script>
import { ref, toRef } from "vue";
import { useUpdateJob } from "src/hooks/api/jobs.hooks";
import { useEnterprises } from "src/hooks/api/enterprises.hooks";

export default {
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const job = toRef(props, "job");
    const show = ref(false);

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
            ...response.data.enterprises,
          ];
        });
      }
    };

    const error_edit = ref(null);

    const handleClose = () => {
      show.value = false;
      error_edit.value = null
      emit("refetch");
    };

    const handleEdit = async () => {
      const { isError, error } = await useUpdateJob(job.value.id, {
        ...job.value,
        in_datetime: job.value.in_datetime.replace('T', ' '),
        out_datetime: job.value.out_datetime.replace('T', ' '),
      });

      if (!isError.value) {
        handleClose();
      } else {
        error_edit.value = error.value;
      }
    };

    return {
      enterprise_tag,
      menu_enterprises,
      isLoading,
      enterprises,
      handleEnterprisesScroll,
      handleEdit,
      handleClose,
      show,
      error_edit,
    };
  },
};
</script>
