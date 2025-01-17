import { ref } from "vue";
import { api } from "src/boot/axios";
import { useAutoRefetch } from "./autorefetchs.hooks";

export const useOperators = (enterprise) => {
  const isLoading = ref(true);
  const operators = ref(null);
  const paginate = ref(null);

  const refetch = (params = {}) => {
    api.get(`enterprises/${enterprise}`, {
      params,
    }).then((response) => {
      isLoading.value = false;
      operators.value = response.data.operators.operators;
      paginate.value = response.data.operators.meta;
    });
  };

  api.get(`enterprises/${enterprise}`).then((response) => {
    isLoading.value = false;
    operators.value = response.data.operators.operators;
    paginate.value = response.data.operators.meta;
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

export const useDeleteOperator = async (enterprise, pk) => {
  return await api.put(`enterprises/${enterprise}/operators/${pk}`)
};
