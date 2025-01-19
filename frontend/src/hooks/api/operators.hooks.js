import { ref } from "vue";
import { api } from "src/boot/axios";

export const useOperators = (enterprise) => {
  const isLoading = ref(true);
  const operators = ref(null);
  const paginate = ref(null);

  const refetch = (params = {}) => {
    api
      .get(`enterprises/${enterprise}/operators`, {
        params,
      })
      .then((response) => {
        isLoading.value = false;
        operators.value = response.data.operators;
        paginate.value = response.data.meta;
      });
  };

  api.get(`enterprises/${enterprise}/operators`).then((response) => {
    isLoading.value = false;
    operators.value = response.data.operators;
    paginate.value = response.data.meta;
  });

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

export const useDeleteOperator = async (enterprise, pk) => {
  return await api.delete(`enterprises/${enterprise}/operators/${pk}`);
};
