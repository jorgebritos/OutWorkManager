import { ref } from "vue";
import { api } from "src/boot/axios";
import { useAutoRefetch } from "./autorefetchs.hooks";

const useDocumentsJob = (job) => {
  const isLoading = ref(true);
  const documents = ref(null);
  const paginate = ref(null);

  const refetch = (params = {}) => {
    api.get(`jobs/${job}/documents`, { params }).then((response) => {
      isLoading.value = false;
      documents.value = response.data.documents;
      paginate.value = response.data.meta;
    });
  };

  api.get(`jobs/${job}/documents`).then((response) => {
    isLoading.value = false;
    documents.value = response.data.documents;
    paginate.value = response.data.meta;
  });

  useAutoRefetch(refetch)

  return {
    documents,
    paginate,
    isLoading,
    refetch,
  };
};

const useDocumentsEnterprise = (enterprise) => {
  const isLoading = ref(true);
  const documents = ref(null);
  const paginate = ref(null);

  const refetch = (params = {}) => {
    api
      .get(`enterprises/${enterprise}`)
      .then((response) => {
        isLoading.value = false;
        console.log(response.data.documents.meta)
        documents.value = response.data.documents;
        paginate.value = response.data.documents.meta;
      });
  };

  api.get(`enterprises/${enterprise}`).then((response) => {
    isLoading.value = false;
    documents.value = response.data.documents;
    paginate.value = response.data.meta;
  });

  useAutoRefetch(refetch)

  return {
    documents,
    paginate,
    isLoading,
    refetch,
  };
};

const useDocumentsOperators = (enterprise, operator) => {
  const isLoading = ref(true);
  const documents = ref(null); "The route api/v1/job/7/documents/16907 could not be found."
  const paginate = ref(null);

  const refetch = (params = {}) => {
    api
      .get(`enterprises/${enterprise}/operators/${operator}/documents`, {
        params,
      })
      .then((response) => {
        isLoading.value = false;
        paginate.value = response.data.meta;
        documents.value = response.data.documents;
      });
  };

  api
    .get(`enterprises/${enterprise}/operators/${operator}/documents`)
    .then((response) => {
      isLoading.value = false;
      documents.value = response.data.documents;
      paginate.value = response.data.meta;
    });

  useAutoRefetch(refetch)

  return {
    documents,
    paginate,
    isLoading,
    refetch,
  };
};

export const handleToggleFetchDocuments = (entity = null, props = {}) => {
  if (entity === "enterprise") {
    return useDocumentsEnterprise(props.enterprise);
  }
  console.log(props)

  if (entity === "job") {
    return useDocumentsJob(props.job);
  }

  if (entity === "operator") {
    return useDocumentsOperators(props.enterprise, props.operator);
  }

  return null;
};

const useCreateDocumentJob = async (job, data) => {
  const doc = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("expire", data.expire);
  formData.append("is_valid", data.is_valid ? "1" : "0");
  formData.append("document", data.document);

  await api
    .post(`jobs/${job}/documents`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      doc.value = response.data.document;
    })
    .catch((err) => {
      if (err.response.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    isError,
    error,
    doc,
  };
};

const useCreateDocumentOperator = async (enterprise, operator, data) => {
  const doc = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("expire", data.expire);
  formData.append("is_valid", data.is_valid ? "1" : "0");
  formData.append("document", data.document);

  await api
    .post(
      `enterprises/${enterprise}/operators/${operator}/documents`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((response) => {
      doc.value = response.data.document;
    })
    .catch((err) => {
      if (err.response.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    isError,
    error,
    doc,
  };
};

const useCreateDocumentEnterprise = async (enterprise, data) => {
  const doc = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("expire", data.expire);
  formData.append("is_valid", data.is_valid ? "1" : "0");
  formData.append("document", data.document);

  await api
    .post(`enterprises/${enterprise}/documents`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      doc.value = response.data.document;
    })
    .catch((err) => {
      if (err.response.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    isError,
    error,
    doc,
  };
};

export const handleToggleFetchCreateDocuments = (
  entity = null,
  props = {},
  data
) => {
  if (entity === "enterprise") {
    return useCreateDocumentEnterprise(props.enterprise, data);
  }

  if (entity === "job") {
    return useCreateDocumentJob(props.job, data);
  }

  if (entity === "operator") {
    return useCreateDocumentOperator(props.enterprise, props.operator, data);
  }

  return null;
};

const useDeleteDocumentJob = async (job, pk) => {
  return await api.delete(`jobs/${job}/documents/${pk}`);
};

const useDeleteDocumentOperator = async (enterprise, operator, pk) => {
  return await api.delete(
    `enterprises/${enterprise}/operators/${operator}/documents/${pk}`
  );
};

const useDeleteDocumentEnterprise = async (enterprise, pk,) => {
  return await api.delete(`enterprises/${enterprise}/documents/${pk}`);
};

export const handleToggleFetchDeleteDocuments = (entity = null, props = {}) => {
  if (entity === "enterprise") {
    return useDeleteDocumentEnterprise(props.enterprise, props.pk);
  }

  if (entity === "job") {
    return useDeleteDocumentJob(props.job, props.pk);
  }

  if (entity === "operator") {
    return useDeleteDocumentOperator(
      props.enterprise,
      props.operator,
      props.pk
    );
  }

  return null;
};

const useEditDocumentJob = async (job, pk, data) => {
  const doc = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("_method", "PUT");
  formData.append("title", data.title);
  formData.append("expire", data.expire);
  formData.append("is_valid", data.is_valid ? "1" : "0");

  if (data.document) {
    formData.append("document", data.document);
  }

  await api
    .post(`jobs/${job}/documents/${pk}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      doc.value = response.data.document;
    })
    .catch((err) => {
      if (err.response.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    isError,
    error,
    doc,
  };
};

const useEditDocumentOperator = async (enterprise, operator, pk, data) => {
  const doc = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("_method", "PUT");
  formData.append("title", data.title);
  formData.append("expire", data.expire);
  formData.append("is_valid", data.is_valid ? "1" : "0");

  if (data.document) {
    formData.append("document", data.document);
  }

  await api
    .post(
      `enterprises/${enterprise}/operators/${operator}/documents/${pk}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    )
    .then((response) => {
      doc.value = response.data.document;
    })
    .catch((err) => {
      if (err.response.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    isError,
    error,
    doc,
  };
};

const useEditDocumentEnterprise = async (enterprise, pk, data) => {
  const doc = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("_method", "PUT");
  formData.append("title", data.title);
  formData.append("expire", data.expire);
  formData.append("is_valid", data.is_valid ? "1" : "0");

  if (data.document) {
    formData.append("document", data.document);
  }

  await api
    .post(`enterprises/${enterprise}/documents/${pk}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      doc.value = response.data.document;
    })
    .catch((err) => {
      if (err.response.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    isError,
    error,
    doc,
  };
};

export const handleToggleFetchEditDocuments = (
  entity = null,
  props = {},
  data
) => {
  if (entity === "enterprise") {
    return useEditDocumentEnterprise(props.enterprise, props.pk, data);
  }

  if (entity === "job") {
    return useEditDocumentJob(props.job, props.pk, data);
  }

  if (entity === "operator") {
    return useEditDocumentOperator(
      props.enterprise,
      props.operator,
      props.pk,
      data
    );
  }

  return null;
};
