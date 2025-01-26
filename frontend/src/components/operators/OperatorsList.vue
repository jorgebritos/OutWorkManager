<template>
  <MenuCreateOperator
    v-if="createOperator"
    :show="createOperator"
    @handleCloseCreateOperator="handleCloseCreateOperator"
  />

  <div class="row items-center q-mt-xl">
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
  <div class="row justify-between items-center q-my-md">
    <h4 class="text-h4 q-my-none">Operarios:</h4>
    <q-btn
      label="Crear Operario"
      class="q-py-sm"
      type="button"
      color="primary"
      @click="handleOpenCreateOperator"
    />
  </div>
  <q-markup-table flat bordered v-if="!isLoading">
    <thead class="bg-dark text-white">
      <tr>
        <th class="text-left">C.I.</th>
        <th class="text-left">Nombre</th>
        <th class="text-left">Autorización</th>
        <th class="text-left">Cargo</th>
        <th class="text-center">Acciones</th>
      </tr>
    </thead>
    <tbody
      :class="$q.dark.isActive ? 'bg-grey-91973-08-07 00:00:00' : 'bg-grey-3'"
    >
      <operator-item
        v-for="operator in operators"
        :key="operator.id"
        :operator="operator"
        @refetch="refetch"
      />
    </tbody>
  </q-markup-table>
  <pagination
    v-if="!isLoading"
    :currentPage="paginate.current_page"
    :maxPages="paginate.last_page"
    @handleRefetchPage="handleRefetchPage"
  />
</template>

<script>
import { useOperators } from "src/hooks/api/operators.hooks";
import MenuCreateOperator from "src/components/operators/MenuCreateOperator.vue";
import OperatorItem from "src/components/operators/OperatorItem.vue";
import { ref, watch } from "vue";
import Pagination from "src/components/helpers/Pagination.vue";
import { useAutoRefetch } from "../../hooks/api/autorefetchs.hooks";

export default {
  components: {
    MenuCreateOperator,
    OperatorItem,
    Pagination,
  },
  props: {
    enterprise: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { operators, paginate, isLoading, refetch } = useOperators(
      props.enterprise
    );

    const createOperator = ref(false);
    const page = ref(null);
    const search = ref(null);

    const handleOpenCreateOperator = () => {
      createOperator.value = true;
    };

    watch(search, () => {
      refetch({ search: search.value });
    });

    const handleRefetchPage = (p) => {
      page.value = p
      refetch({ page: p, search: search.value })
    }

    const handleCloseCreateOperator = () => {
      createOperator.value = false;
      refetch();
    };

    useAutoRefetch(()=>refetch({page: page.value, search: search.value}))
    
    return {
      handleRefetchPage,
      operators,
      search,
      paginate,
      createOperator,
      handleOpenCreateOperator,
      handleCloseCreateOperator,
      refetch,
      isLoading,
    };
  },
};
</script>
