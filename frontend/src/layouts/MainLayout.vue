<template>
  <q-layout view="hHh Lpr lff" padding="10">
    <menu-toolbar-layout>
      <router-view :key="$route.path"></router-view>
    </menu-toolbar-layout>
  </q-layout>
</template>

<script>
import MenuToolbarLayout from "./MenuToolbarLayout.vue";

export default {
  components: {
    MenuToolbarLayout,
  },
};
</script>
