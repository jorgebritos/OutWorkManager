<template>
  <valid-delete-operator-menu
    v-if="showDeleteMenu"
    :show="showDeleteMenu"
    @handleDeleteMenuClose="handleDeleteMenuClose"
    @handleDeleteMenuAccept="handleDeleteMenuAccept"
  />

  <div class="q-pa-md" v-if="!isLoading">
    <div class="flex justify-between q-mb-md">
      <q-btn color="primary" flat @click="handleOutClick">salir</q-btn>
      <div class="flex justify-between">
        <!--  TODO: editar y borrar -->

        <edit-job @refetch="refetch" :job="job" />
        <q-btn color="negative" @click="showDeleteMenu = true">Borrar</q-btn>
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
            <td class="text-center">
              <p :class="job.is_check ? 'text-green' : 'text-red'">
                {{ job.is_check ? "Autorizado" : "No Autorizado" }}
              </p>
            </td>
            <td class="text-center">
              <p :class="job.is_check_enterprise ? 'text-green' : 'text-red'">
                {{ job.is_check_enterprise ? "Autorizado" : "No Autorizado" }}
              </p>
            </td>
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
import {
  useDeleteJob,
  useDeleteEnterpriseJob,
  useJob,
  useEnterpriseJob,
} from "src/hooks/api/jobs.hooks";
import ValidDeleteOperatorMenu from "src/components/helpers/ValidDeleteMenu.vue";
import { ref, watch } from "vue";
import { useUserStore } from "src/store/user.store";
import EditJob from "src/components/jobs/EditJob.vue";

export default {
  components: {
    JobDocuments,
    ValidDeleteOperatorMenu,
    EditJob,
  },
  setup() {
    const { params } = useRoute();
    const router = useRouter();

    const userStore = useUserStore();
    const user = userStore.getUser;

    const { job, isLoading, refetch } =
      user.rol === "Admin"
        ? useJob(params.pk)
        : useEnterpriseJob(user.enterprise.slug, params.pk);

    const handleOutClick = () => router.go(-1);

    const showDeleteMenu = ref(false);

    const handleDeleteMenuClose = () => (showDeleteMenu.value = false);

    const handleDeleteMenuAccept = async () => {
      showDeleteMenu.value = false;
      if (user.rol === "Admin") {
        await useDeleteJob(params.pk);
      } else {
        await useDeleteEnterpriseJob(user.enterprise.slug, params.pk);
      }
      handleOutClick();
    };

    return {
      isLoading,
      job,
      handleOutClick,
      showDeleteMenu,
      handleDeleteMenuAccept,
      handleDeleteMenuClose,
    };
  },
};
</script>
