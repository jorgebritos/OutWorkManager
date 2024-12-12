<template>
  <tr
    :class="`${document.is_valid ? '' : 'bg-grey-4'} cursor-pointer`"
    @click="() => (show = true)"
  >
    <td class="text-left">
      {{ document.title }}
    </td>
    <td class="text-left">
      {{ document.expire }}
    </td>
    <td class="text-left">
      <p :class="document.is_valid ? 'text-green' : 'text-red'">
        {{ document.is_valid ? "Autorizado" : "No Autorizado" }}
      </p>
    </td>
    <td class="text-center">
      <EditDocument
        :entity="entity"
        :params="{
          ...params,
          pk: document.id,
        }"
        @refetch="refetch"
        :doc="document"
      />

      <q-btn
        v-if="document.is_valid"
        type="button"
        @click="handleToggleValidate"
        class="q-ml-md text-h6 text-negative"
      >
        <span class="mdi mdi-thumb-down"></span>
      </q-btn>

      <q-btn
        v-else
        @click="handleToggleValidate"
        type="button"
        class="q-ml-md text-h6 text-primary"
      >
        <span class="mdi mdi-thumb-up"></span>
      </q-btn>
    </td>
  </tr>
  <view-document
    v-if="show"
    :show="show"
    :document="document"
    @handleClose="handleCloseDocumentView"
  />
</template>

<script>
import { ref, watch } from "vue";
import ViewDocument from "./ViewDocument.vue";
import EditDocument from "./EditDocument.vue";
import { handleToggleFetchEditDocuments } from "src/hooks/api/documents.hooks";

export default {
  props: {
    document: {
      type: Object,
      required: true,
    },
    entity: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      required: true,
    },
  },
  components: {
    ViewDocument,
    EditDocument,
  },
  setup(props, { emit }) {
    const show = ref(false);

    const handleToggleValidate = async (e) => {
      e.stopPropagation();
      await handleToggleFetchEditDocuments(
        props.entity,
        {
          ...props.params,
          pk: props.document.id,
        },
        {
          ...props.document,
          is_valid: !props.document.is_valid,
        }
      );
      props.document.is_valid = !props.document.is_valid
    };

    const refetch = () => {
      emit("refetch");
    };

    const handleCloseDocumentView = () => (show.value = false);

    return {
      show,
      handleCloseDocumentView,
      handleToggleValidate,
      refetch,
    };
  },
};
</script>
