<template>
  <ValidDeleteUserMenu
    :show="validDeleteMenu"
    @handleDeleteMenuClose="handleDeleteUserMenuClose"
    @handleDeleteMenuAccept="handleDeleteUserMenuAccept"
  />

  <tr class="cursor-pointer">
    <td class="text-left">{{ user.name }}</td>
    <td class="text-right">{{ user.email }}</td>
    <td class="text-right">{{ user.rol }}</td>
    <td class="text-right">
      <EditUser :user="user" @refetch="refetch"/>
      <q-btn
        icon="delete"
        class="text-negative"
        @click="validDeleteMenu = true"
      />
    </td>
  </tr>
</template>

<script>
import { ref } from "vue";
import ValidDeleteUserMenu from "src/components/helpers/ValidDeleteMenu.vue";
import EditUser from "src/components/users/EditUser.vue";
import { useDeleteUser } from "src/hooks/api/users.hooks";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    ValidDeleteUserMenu,
    EditUser,
  },
  setup(props, { emit }) {
    const validDeleteMenu = ref(false);

    const handleDeleteUser = async (id) => {
      await useDeleteUser(id);
    };

    const handleDeleteUserMenuClose = () => {
      validDeleteMenu.value = false;
    };

    const handleDeleteUserMenuAccept = () => {
      validDeleteMenu.value = false;
      handleDeleteUser(props.user._id);
      emit("refetch");
    };

    return {
      validDeleteMenu,
      handleDeleteUserMenuAccept,
      handleDeleteUserMenuClose,
      refetch: () => emit("refetch"),
    };
  },
};
</script>
