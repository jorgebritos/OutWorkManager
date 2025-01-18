<template>
  <div class="q-pa-md">
    <h2 class="q-mt-md q-mb-sm text-center">Historial de Trabajos</h2>

    <div class="row items-center" style="width: 100%">
      <q-input
        style="width: 100%"
        filled
        class="col"
        v-model="search"
        label="Busqueda"
      >
        <template v-slot:prepend>
          <q-btn flat round dense class="icono_de_busqueda" icon="search" />
        </template>
      </q-input>
    </div>
    <div class="q-my-md w-full flex justify-center items-center">
      <div>
        <p class="text-subtitle2">Expirados:</p>
        <q-btn-dropdown
          color="#000000"
          class="q-mr-lg"
          :label="
            valid === null
              ? 'Todos'
              : valid === true
              ? 'Expirados'
              : 'No Expirados'
          "
          text-color="#000000"
        >
          <q-list>
            <q-item clickable v-close-popup @click="valid = null">
              <q-item-section>
                <q-item-label>Todos</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="valid = true">
              <q-item-section>
                <q-item-label>Al Dia</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="valid = false">
              <q-item-section>
                <q-item-label>Expirados</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <div>
        <p class="text-subtitle2">Confirmados:</p>
        <q-btn-dropdown
          color="#000000"
          :label="
            filter === null
              ? 'Todos'
              : filter === true
              ? 'Confirmados'
              : 'No Confirmados'
          "
          text-color="#000000"
        >
          <q-list>
            <q-item clickable v-close-popup @click="filter = null">
              <q-item-section>
                <q-item-label>Todos</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="filter = true">
              <q-item-section>
                <q-item-label>Confirmados</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="filter = false">
              <q-item-section>
                <q-item-label>No Confirmados</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <q-markup-table
      style="height: 500px; overflow-y: scroll"
      class="shadow-none rounded-none"
    >
      <thead class="bg-red-4" style="position: sticky; top: 0; z-index: 1">
        <tr>
          <th class="text-left">Empresa</th>
          <th class="text-left">Trabajo</th>
          <th class="text-right">Fecha</th>
          <th class="text-right">Hora salida</th>
          <th class="text-right">Hora entrada</th>
          <th class="text-right">Confirmación</th>
          <th class="text-right">Confirmación de la empresa</th>
          <th class="text-right">+Más Información</th>
        </tr>
      </thead>
      <tbody v-if="!isLoading">
        <job-item v-for="job in jobs" :key="job.id" :job="job" />
      </tbody>
    </q-markup-table>
  </div>

  <Pagination
    v-if="!isLoading"
    :currentPage="paginate.current_page"
    :maxPages="paginate.last_page"
    @handleRefetchPage="handleRefetchPage"
  />
</template>

<script>
import { useJobs } from "src/hooks/api/jobs.hooks";
import { ref, watch } from "vue";
import JobItem from "src/components/jobs/HisJobItem.vue";
import Pagination from "src/components/helpers/Pagination.vue";

export default {
  components: { JobItem, Pagination },
  setup() {
    const { isLoading, jobs, refetch, paginate } = useJobs({});

    const filter = ref(null);
    const search = ref(null);
    const valid = ref(null);
    const page = ref(1);

    watch([filter, search, valid, page], () => {
      refetch({
        search: search.value,
        confirm: filter.value,
        valid: valid.value,
        page: page.value,
      });
    });

    const handleRefetchPage = (page_params) => {
      page.value = page_params;
    };

    return {
      isLoading,
      jobs,
      valid,
      paginate,
      refetch,
      search,
      filter,
      handleRefetchPage,
    };
  },
};
</script>
