<template>
    <q-layout>
        <q-page-container>
    <q-page>
      <!-- Contenedor principal -->
    <q-card style="min-width: 90%; min-height: 90%; display: flex; flex-direction: column;">
      <!-- Botón para regresar -->
      <q-card-section>
        <q-btn flat color="primary" icon="arrow_back" label="Volver" @click="volver" />
      </q-card-section>

      <q-separator />

      <!-- Contenido principal -->
      <div style="display: flex; flex: 1;">
        <!-- Sección izquierda -->
        <div class="col-6" style="width: 60%;">
          <q-card-section>
            <div class="text-h6">Empresa: {{ trabajo?.enterprise_id }}</div>
            <div class="text-subtitle1">Trabajo a realizar: {{ trabajo?.trabajo }}</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-body1">
              <strong>Fechas:</strong>
            </div>
            <div v-for="(fecha, index) in trabajo?.fechas" :key="index">
              {{ fecha.fecha }} - Entrada: {{ fecha.horaEntrada }} | Salida: {{ fecha.horaSalida }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-body1">
              <strong>Confirmación:</strong>
            </div>
            <p>Prevencionista: {{ trabajo?.confirmacion_prevencionista ? 'Sí' : 'No' }}</p>
            <p>Empresa: {{ trabajo?.confirmacion_empresa ? 'Sí' : 'No' }}</p>
          </q-card-section>
        </div>

        <!-- Sección derecha -->
        <div class="col-6" style="width: 40%;">
          <q-card-section>
            <div class="text-body1">
              <strong>Documentos:</strong>
            </div>
            <div v-for="(documento, index) in trabajo?.documentos" :key="index">
              <q-btn flat color="primary" @click="expandDocument(documento)">
                {{ documento.titulo }}
              </q-btn>
            </div>
          </q-card-section>
        </div>
      </div>
    </q-card>
    </q-page>
</q-page-container>
</q-layout>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { api } from "src/boot/axios";
  

  
  const route = useRoute()
  const showDialog = ref(true)
  const trabajo = ref({})
  
  onMounted(async () => {
    const trabajoId = route.params.id
    // Llamada a la API o carga de datos basada en el ID del trabajo
    trabajo.value = await fetchTrabajo(trabajoId)
  })
  
  async function fetchTrabajo(id) {
  try {
    const response = await api.get(`/admin/jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching trabajo:', error);
    return null; // Maneja el error adecuadamente
  }
}
  
  function expandDocument(documento) {
    window.open(documento.url, '_blank')
  }
  
  function closeDialog() {
    showDialog.value = false
  }
  </script>
  