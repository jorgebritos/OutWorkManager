<template>
  <q-page>
    <div class="q-pa-md">
      <h2 class="q-mt-sm q-mb-md">Trabajos:</h2>

      <div class="row items-center q-mb-xl" style="width: 100%">
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
        <q-btn round class="q-mx-sm" icon="mdi-reload" @click="refetch" />
      </div>
      <q-markup-table
        style="height: 500px; overflow-y: scroll"
        class="shadow-none rounded-none"
      >
        <thead class="bg-red-4" style="position: sticky; top: 0; z-index: 1">
          <tr>
            <th class="text-left">Empresa</th>
            <th class="text-left">Trabajos</th>
            <th class="text-right">Fecha</th>
            <th class="text-right">Hora salida</th>
            <th class="text-right">Hora entrada</th>
            <th class="text-right">Confirmación</th>
            <th class="text-right">Confirmación de la empresa</th>
            <th class="text-right">+Más Información</th>
          </tr>
        </thead>
        <tbody v-if="!isLoading">
          <job-item
            v-for="job in jobs" :key="job.id"
            :job="job"
          />
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { useJobs } from "src/hooks/api/jobs.hooks";
import { ref, watch } from "vue";
import JobItem from "src/components/jobs/JobItem.vue";

export default {
    components: { JobItem },
  setup() {
    const { isLoading, jobs, refetch, paginate } = useJobs();

    const search = ref(null);

    watch(search, () => {
      refetch({
        search: search.value,
      });
    });

    return { isLoading, jobs, paginate, refetch, search };
  },
};
</script>

