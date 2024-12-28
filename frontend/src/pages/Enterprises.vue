<template>
  <div>
    <q-toolbar class="column">
      <div class="row items-center q-mt-xl" style="width: 100%">
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

      <q-toolbar
        class="q-my-lg w-full flex justify-between items-center"
        style="width: 100%"
      >
        <q-btn-dropdown
          color="#000000"
          :label="
            filter === null
              ? 'Todos'
              : filter === true
              ? 'Validadas'
              : 'No Validadas'
          "
          class="q-mr-md"
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
                <q-item-label>Validadas</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="filter = false">
              <q-item-section>
                <q-item-label>No Validadss</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <create-empresa @refetch="refetch" />
      </q-toolbar>
    </q-toolbar>
    <div v-if="!isLoading">
      <div class="q-pa-md row justify-center q-px-lg">
        <div
          v-for="enterprise in enterprises"
          :key="enterprise.id"
          class="q-px-sm"
        >
          <card-enterprise :enterprise="enterprise" />
        </div>
      </div>
      <Pagination
        :currentPage="paginate.current_page"
        :maxPages="paginate.last_page"
        @handleRefetchPage="handleRefetchPage"
      />
    </div>
    <div v-if="isLoading" class="text-center">loading ...</div>
  </div>
</template>

<script>
import CardEnterprise from "src/components/enterprises/CardEnterprise.vue";
import CreateEmpresa from "src/components/enterprises/CreateEnterprise.vue";
import { useEnterprises } from "src/hooks/api/enterprises.hooks";
import { ref, watch } from "vue";
import Pagination from "src/components/helpers/Pagination.vue";
import { useAutoRefetch } from "../hooks/api/autorefetchs.hooks";

export default {
  components: {
    CardEnterprise,
    CreateEmpresa,
    Pagination,
  },
  setup() {
    const { isLoading, enterprises, paginate, refetch } = useEnterprises();
    
    const search = ref("");
    const page = ref("");
    const filter = ref(true);

    const handleRefetchPage = (p) => {
      page.value = p
      refetch({ filter: filter.value, page: p, search: search.value });
    };

    watch([search, filter], () => {
      refetch({
        filter: filter.value,
        search: search.value,
      });
    });

    const enterpriseCreateMenu = ref(false);

    useAutoRefetch(
      async () =>
        await refetch({
          filter: filter.value,
          page: page.value,
          search: search.value,
        })
    );

    const handleCloseEnterpriseCreateMenu = () => {
      enterpriseCreateMenu.value = false;
      refetch({ filter: filter.value });
    };

    return {
      isLoading,
      enterprises,
      paginate,
      refetch,

      filter,

      search,
      handleRefetchPage,

      enterpriseCreateMenu,
      handleCloseEnterpriseCreateMenu,
    };
  },
};
</script>
