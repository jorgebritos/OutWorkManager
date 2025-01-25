import { ref } from "vue";
import { api } from "src/boot/axios";
import { useAutoRefetch } from "./autorefetchs.hooks";

export const useOperators = (slug) => {
  const isLoading = ref(true);
  const operators = ref(null);
  const paginate = ref(null);

  const refetch = (params = {}) => {
    api.get(`operators/${slug}`, {
      params,
    }).then((response) => {
      isLoading.value = false;
      operators.value = response.data.operators;
      paginate.value = response.data.meta;
    });
  };

  api.get(`operators/${slug}`).then((response) => {
    isLoading.value = false;
    operators.value = response.data.operators;
    paginate.value = response.data.meta;
  });

  useAutoRefetch(refetch)

  return {
    operators,
    paginate,
    isLoading,
    refetch,
  };
};

export const useOperator = (enterprise, pk) => {
  const isLoading = ref(true);
  const operator = ref(null);

  const refetch = () => {
    api.get(`enterprises/${enterprise}/operators/${pk}`).then((response) => {
      operator.value = response.data.operator;
      isLoading.value = false;
    });
  };

  api.get(`enterprises/${enterprise}/operators/${pk}`).then((response) => {
    operator.value = response.data.operator;
    isLoading.value = false;
  });

  return {
    operator,
    isLoading,
    refetch,
  };
};

export const useUpdateOperator = async (enterprise, operator, data) => {
  const error = ref(null);
  const isError = ref(false);

  await api
    .put(`enterprises/${enterprise}/operators/${operator}`, data)
    .catch((err) => {
      if (err.response.status === 422) {
        isError.value = true;
        const messages = err.response.data.errors;
        error.value = messages;
      }
    });

  return {error, isError}
};

export const useDeleteOperator = async (ci) => {
  return await api.delete(`operators/${ci}`)
};
