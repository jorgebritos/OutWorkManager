<template>
  <q-page>
    <div class="q-pa-md" v-if="!isLoading">
      <div class="flex justify-between q-mb-md">
        <q-btn color="primary" flat @click="handleOutClick">salir</q-btn>
        <div class="flex justify-between">
          <!--  TODO: editar y borrar -->
        </div>
      </div>
      <h6 class="text-h6 q-my-sm">Detalles del trabajo:</h6>
      <q-card class="my-card" flat bordered>
        <q-markup-table>
          <thead class="bg-red-4">
            <tr>
              <th class="text-center">Authorizado</th>
              <th class="text-center">Authorizacion de la empresa</th>
              <th class="text-right">Fecha</th>
              <th class="text-right">Hora Entrada</th>
              <th class="text-right">Hora Salida</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">{{ job.is_check }}</td>
              <td class="text-center">{{ job.is_check_enterprise }}</td>
              <td class="text-right">{{ job.date }}</td>
              <td class="text-right">{{ job.in_time }}</td>
              <td class="text-right">{{ job.out_time }}</td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
      <h5>Descripción del trabajo:</h5>
      <p style="width: 100%; max-width: 500px" class="q-mt-sm">
        {{ job.description }}
      </p>
      <job-documents
        entity="job"
        :params="{
          job: job.id,
        }"
      />
    </div>
  </q-page>
</template>

<style scoped>
.align-top {
  vertical-align: top;
}
.wrap-text {
  white-space: normal;
  word-wrap: break-word;
  max-width: 200px;
}
</style>

<script>
import JobDocuments from "src/components/documents/Documents.vue";
import { useRoute, useRouter } from "vue-router";
import { useJob } from "src/hooks/api/jobs.hooks";

export default {
  components: {
    JobDocuments
  },
  setup() {
    const { params } = useRoute();
    const router = useRouter();

    const { job, isLoading } = useJob(params.pk);

    const handleOutClick = () =>
      router.push({
        name: "jobs",
      });

    return { isLoading, job, handleOutClick };
  },
};
</script>
