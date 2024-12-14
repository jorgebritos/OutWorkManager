<template>
  <tr>
    <td class="text-left">{{ job.enterprise }}</td>
    <td class="text-left">{{ job.description.slice(0, 40) }}...</td>
    <td class="text-right">{{ job.date }}</td>
    <td class="text-right">{{ job.in_time }}</td>
    <td class="text-right">{{ job.out_time }}</td>
    <td class="text-right">
      <q-checkbox v-model="check" @click="handleToggleCheck" />
    </td>
    <td class="text-center">
      <q-avatar
        v-if="job.is_check_enterprise"
        icon="mdi-check"
        class="bg-green text-h4 text-white"
      />
      <q-avatar v-else icon="mdi-close" class="bg-red text-h4 text-white" />
    </td>
    <td class="text-center">
      <q-btn class="text-md" @click="handleOutClick">
        <q-icon name="arrow_forward" size="20px" />
      </q-btn>
    </td>
  </tr>
</template>

<script>
import { ref } from "vue";
import { useUpdateJob } from "src/hooks/api/jobs.hooks";
import { useRouter } from "vue-router";

export default {
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const router = useRouter()

    const check = ref(props.job.is_check);

    const handleToggleCheck = async () => {
      await useUpdateJob(props.job.id, {
        is_check: check.value,
      });
    };

    const handleOutClick = () =>
      router.push({
        name: 'job-detail',
        params: {pk: props.job.id}
      });

    return { check, handleToggleCheck, handleOutClick };
  },
};
</script>
