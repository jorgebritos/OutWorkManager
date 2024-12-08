<template>
  <q-input
    style="width: 100%"
    filled
    class="q-mt-xl"
    v-model="search"
    label="Busqueda"
  >
    <template v-slot:prepend>
      <q-btn flat round dense class="icono_de_busqueda" icon="search" />
    </template>
  </q-input>
  <div class="flex justify-between q-mb-md items-center">
    <h4 class="text-h4 q-my-none">Documentos :</h4>
    <add-document
      :enterprise="enterprise"
      :operator="operator"
      @refetch="refetch"
    />
  </div>
  <table-documents
    v-if="!isLoading"
    :documents="documents"
    :paginate="paginate"
    @refetch="refetch"
  />
</template>

<script>
import { useDocumentsOperators } from "src/hooks/api/documents.hooks";
import TableDocuments from "./TableDocuments.vue";
import Pagination from "../helpers/Pagination.vue";
import AddDocument from "./AddDocumentOperator.vue";
import { ref, watch } from "vue";

export default {
  components: {
    TableDocuments,
    Pagination,
    AddDocument,
  },
  props: {
    enterprise: {
      type: String,
      required: true,
    },
    operator: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { documents, paginate, isLoading, refetch } = useDocumentsOperators(
      props.enterprise,
      props.operator
    );

    const search = ref(null);

    watch(search, () => {
      refetch({ search: search.value });
    });

    return {
      documents,
      paginate,
      isLoading,
      search,
      refetch,
    };
  },
};
</script>
