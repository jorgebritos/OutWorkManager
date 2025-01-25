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

  console.log(paginate)
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

export const useDeleteOperator = async (ci) => {
  return await api.delete(`operators/${ci}`)
};
