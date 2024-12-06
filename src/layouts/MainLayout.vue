<template>
  <q-layout>
    <q-page-container>
      <MenuToolbarLayout>
        <router-view @click="ver_menu =false" class="q-mt-xl"/>
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
