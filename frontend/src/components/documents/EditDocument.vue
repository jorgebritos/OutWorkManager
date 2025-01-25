<template>
  <q-dialog v-model="show">
    <q-card style="width: 2500px">
      <q-card-section class="q-mb-md">
        <div class="text-h6">Editar Documento</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-form @submit.prevent="handleEditDocument">
          <q-input name="title" label="Titulo" v-model="data.title" />
          <div
            v-for="(error, index) in error_edit?.title"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-checkbox
            name="is_valid"
            class="q-my-md"
            label="Autorizado"
            v-model="data.is_valid"
          />

          <div
            v-for="(error, index) in error_edit?.is_valid"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>

          <q-file
            color="teal"
            filled
            label="Documento"
            v-model="data.document"
          >
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div
            v-for="(error, index) in error_edit?.document"
            :key="index"
            class="q-mt-sm"
          >
            <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
          </div>
          <div class="q-mt-md">
            <q-input
              filled
              type="datetime-local"
              v-model="data.expire"
              label="Selecciona fecha y hora"
            />
            <div
              v-for="(error, index) in error_edit?.expire"
              :key="index"
              class="q-mt-sm"
            >
              <span class="q-pa-xs bg-negative text-white">{{ error }}</span>
            </div>
          </div>

          <q-btn label="Editar" class="q-mt-md" type="submit" color="primary" />
        </q-form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="Cerrar"
          color="primary"
          v-close-popup
          @click="handleCloseMenu"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-btn type="button" class="text-h6 text-secondary" @click="handleOpenMenu">
    <span class="mdi mdi-pencil"></span>
  </q-btn>
</template>

<script>
import { reactive, ref } from "vue";
import { handleToggleFetchEditDocuments } from "src/hooks/api/documents.hooks";

export default {
  props: {
    entity: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      required: true,
    },
    doc: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const show = ref(false);

    const handleCloseMenu = () => {
      show.value = false;

      data.title = props.doc.title;
      data.type = props.doc.type;

      data.is_valid = props.doc.is_valid;
      data.document = undefined;
      data.expire = props.doc.expire;
    };

    const data = reactive({
      title: props.doc.title,
      type: props.doc.type,
      is_valid: props.doc.is_valid,
      document: undefined,
      expire: props.doc.expire,
      document: props.doc.document,
    });

    const handleOpenMenu = (e) => { 
      e.stopPropagation();
      show.value = true;
    }

    const error_edit = ref(null);

    const handleEditDocument = async () => {
      const { isError, error } = await handleToggleFetchEditDocuments(
        props.entity,
        props.params,
        {
          ...data,
          expire: data.expire.replace("T", " "),
        }
      );
      if (isError.value) {
        error_edit.value = error.value;
      } else {
        show.value = false;
        emit("refetch");
      }
    };

    return {
      error_edit,
      data,
      handleEditDocument,
      show,
      handleCloseMenu,
      handleOpenMenu,
      show,
    };
  },
};
</script>
