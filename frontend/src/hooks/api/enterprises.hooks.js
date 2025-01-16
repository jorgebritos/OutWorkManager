import { ref } from "vue";
import { api } from "src/boot/axios";

export const useEnterprises = (params = { filter: true }) => {
  const filter = ref(params);
  const isLoading = ref(true);
  const enterprises = ref(null);
  const paginate = ref(null);

  const refetch = (params = {}) => {
    filter.value = params

    return api
      .get("enterprises", {
        params: filter.value,
      })
      .then((response) => {
        isLoading.value = false;
        enterprises.value = response.data.enterprises;
        paginate.value = response.data.meta;
        return response;
      });
  };

  api
    .get("enterprises", {
      params,
    })
    .then((response) => {
      isLoading.value = false;
      enterprises.value = response.data.enterprises;
      paginate.value = response.data.meta;
    });

  return {
    enterprises,
    paginate,
    isLoading,
    refetch,
  };
};

export const useEnterprise = (slug) => {
  const isLoading = ref(true);
  const enterprise = ref(null);

  const refetch = () => {
    api.get(`enterprises/${slug}`).then((response) => {
      enterprise.value = response.data.enterprise;
    });
  };

  api.get(`enterprises/${slug}`).then((response) => {
    enterprise.value = response.data.enterprise;
    isLoading.value = false;
  });

  return {
    enterprise,
    isLoading,
    refetch,
  };
};

export const useValidEnterprise = async (slug) => {
  return await api.patch(`enterprises/${slug}`, {
    is_valid: true,
  });
};

export const useNotValidEnterprise = async (slug) => {
  return await api.patch(`enterprises/${slug}`, {
    is_valid: false,
  });
};

export const useDeleteEnterprise = async (slug) => {
  return await api.delete(`enterprises/${slug}`);
};

export const useCreateEnterprise = async (data) => {
  const enterprise = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("RUT", data.RUT);
  formData.append("nombre", data.name);
  formData.append("is_valid", data.is_valid);

  if (data.user_id) {
    formData.append("user_id", data.user_id);
  }

  if (data.image) {
    formData.append("image", data.image);
  }

  await api
    .post("enterprises", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      enterprise.value = response.data.enterprise;
    })
    .catch((err) => {
      if (err.response.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    enterprise,
    isError,
    error,
  };
};

export const useUpdateEnterprise = async (slug, data) => {
  const enterprise = ref(null);
  const isError = ref(false);
  const error = ref(null);

  const formData = new FormData();

  formData.append("_method", "PUT");
  formData.append("name", data.name);
  if (data.user_id !== null) {
    formData.append("user_id", data.user_id);
  }
  if (data.image !== null) {
    formData.append("image", data.image);
  }

  await api
    .put(`enterprises/${slug}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      if (response.status === 200) {
        enterprise.value = response.data.enterprise;
      }
    })
    .catch((err) => {
      isError.value = true;
      if (err?.response?.status === 422) {
        const messages = err.response.data.errors;
        error.value = messages;
      }
    });

  return {
    enterprise,
    isError,
    error,
  };
};
