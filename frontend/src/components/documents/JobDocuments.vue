<template>
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
    <q-btn round class="q-mx-sm" icon="mdi-reload" @click="refetch" />
  </div>
  <div class="flex justify-between q-mb-md items-center">
    <h4 class="text-h4 q-my-none">Documentos :</h4>
    <add-document :enterprise="enterprise" @refetch="refetch" />
  </div>
  <table-documents
    v-if="!isLoading"
    :documents="documents"
    :paginate="paginate"
    @refetch="refetch"
    @handleAddDocument="handleAddDocument"
  />
</template>

<script>
import { useJobDocuments } from "src/hooks/api/documents.hooks";
import TableDocuments from "./TableDocuments.vue";
import Pagination from "../helpers/Pagination.vue";
import AddDocument from "./AddDocumentEnterprise.vue";
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
  },
  setup(props) {
    const { documents, paginate, isLoading, refetch } = useJobDocuments(
      props.enterprise
    );

    const search = ref(null);

    watch(search, () => {
      refetch({ search: search.value });
    });

    return {
      documents,
      paginate,
      isLoading,
      refetch,
      search,
    };
  },
};
</script>
