import { ref } from "vue";
import { api } from "src/boot/axios";

export const useJobs = () => {
  const isLoading = ref(true);
  const jobs = ref(null);
  const paginate = ref(null);

  const refetch = (params = {}) => {
    api
      .get("jobs", {
        params
      })
      .then((response) => {
        isLoading.value = false;
        jobs.value = response.data.jobs;
        paginate.value = response.data.meta;
      });
  };

  api
    .get("jobs", {
      params: {
        valid: true,
      },
    })
    .then((response) => {
      isLoading.value = false;
      jobs.value = response.data.jobs;
      paginate.value = response.data.meta;
    });

  return {
    jobs,
    paginate,
    isLoading,
    refetch,
  };
};

export const useUpdateJob = async (pk, data) => {
  const job = ref(null);
  const isError = ref(false);
  const error = ref(null);

  await api
    .put(`jobs/${pk}`, data, {
      headers: { "Content-Type": "content-type:application/json" },
    })
    .then((response) => {
      if (response.status === 200) {
        job.value = response.data.job;
      }
    })
    .catch((err) => {
      if (err?.response?.status === 422) {
        const messages = err.response.data.errors;
        isError.value = true;
        error.value = messages;
      }
    });

  return {
    job,
    isError,
    error,
  };
};
