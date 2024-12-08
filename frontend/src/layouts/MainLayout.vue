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
import { useUserStore } from "../store/user.store";
import { useRouter } from "vue-router";
import { watchEffect } from "vue";

const userStore = useUserStore();
const router = useRouter();
const ver_menu = ref(false)
provide("ver_menu",ver_menu)
defineOptions({
  name: 'MainLayout'
})

watchEffect(() => {
  if (!userStore.getAuth) {
    
  }
});


</script>
