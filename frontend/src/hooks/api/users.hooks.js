import { api } from "src/boot/axios";
import { ref } from "vue";
import { useAutoRefetch } from "./autorefetchs.hooks";

export const useUsers = () => {
  const isLoading = ref(true);
  const users = ref([]);
  const paginate = ref(null);

  const refetch = (params = {}) => {
    return api
      .get("users", {
        params,
      })
      .then((response) => {
        isLoading.value = false;
        users.value = response.data.users;
        paginate.value = response.data.meta;

        return response
      });
  };

  api.get("users").then((response) => {
    isLoading.value = false;
    users.value = response.data.users;
    paginate.value = response.data.meta;
  });

  useAutoRefetch(async () => await refetch())

  return {
    isLoading,
    refetch,
    users,
    paginate,
  };
};

export const useEditUser = async (id, data) => {
  const user = ref(null);
  const isError = ref(false);
  const error = ref(null);

  await api
    .patch("users/" + id, data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      user.value = response.data.user;
    })
    .catch((err) => {
      console.error(err);
      if (err?.response?.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    user,
    isError,
    error,
  };
};

export const useCreateUser = async (data) => {
  const user = ref(null);
  const isError = ref(false);
  const error = ref(null);

  await api
    .post("users/", data, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      user.value = response.data.user;
    })
    .catch((err) => {
      console.error(err);
      if (err?.response?.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    user,
    isError,
    error,
  };
};

export const useDeleteUser = async (id) => {
  return await api.delete(`users/${id}}`);
};
