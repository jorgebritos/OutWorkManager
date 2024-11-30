<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <MenuToolbarLayout>
        <router-view @click="ver_menu =false"/>
      </MenuToolbarLayout>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { provide, ref } from 'vue'
import MenuToolbarLayout from "./MenuToolbarLayout.vue"
const ver_menu = ref(false)
provide("ver_menu",ver_menu)
defineOptions({
  name: 'MainLayout'
})




</script>
