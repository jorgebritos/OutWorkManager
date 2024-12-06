<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
      404
      </div>

      <div class="text-h2" style="opacity:.4">
       Opción Incorrecta 
      </div>
      <div class="text-h2" style="opacity:.4">
        Debería pensar mejor antes de seguir adelante.
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ErrorNotFound'
});
</script>
