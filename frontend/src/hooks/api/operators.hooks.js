import { ref } from "vue";
import { api } from "src/boot/axios";
import {useAutoRefetch} from "./autorefetchs.hooks";

export const useOperators = (enterprise) => {
  const isLoading = ref(true);
  const operators = ref(null);
  const paginate = ref(null);

  const refetch = (params={}) => {
    api.get(`enterprises/${enterprise}/operators`, {
      params,
    }).then((response) => {
      isLoading.value = false;
      operators.value = response.data.operators;
      paginate.value = response.data.meta;
    });
  };

  api.get(`enterprises/${enterprise}/operators`).then((response) => {
    isLoading.value = false;
<<<<<<< HEAD
    operators.value = response.data.operators;
    paginate.value = response.data.meta;
=======
    operators.value = response.data.operators.operators;
    paginate.value = response.data.operators.meta;
>>>>>>> 9a2d138f7cf91a9dfc7954ca8676fea046af4e4b
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
