<template>
  <q-btn
    flat
    icon="mdi-bell"
    @click="showNotifications = true"
    color="white"
    class="q-mr-md"
  />
  <q-dialog v-model="showNotifications" persistent>
    <q-card class="q-pa-md" style="width: 100%; max-width: 500px">
      <q-toolbar class="bg-grey-3 text-black">
        <q-toolbar-title>Notificaciones</q-toolbar-title>
        <q-btn icon="close" flat round @click="showNotifications = false" />
      </q-toolbar>

      <q-scroll-area
        style="height: 500px; max-height: 300px; overflow: auto"
      >
        <q-list>
          <h5 class="text-center" v-if="notifications.length === 0">
            No ahi notificaciones
          </h5>

          <q-item
            v-for="(notification, index) in notifications"
            :key="index"
            clickable
            v-ripple
            @click="showNotificationDetails(notification)"
          >
            <q-item-section>
              <q-item-label caption>{{ notification.content }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-item-label caption>{{
                notification.created_at.split("T")[0]
              }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <q-card-section v-if="selectedNotification">
        <q-separator spaced />
        <q-item>
          <q-item-section>
            <q-item-label>{{ selectedNotification.content }}</q-item-label>
            <router-link :key="'/jobs/'+selectedNotification.job.id" :to="'/jobs/'+selectedNotification.job.id">Ver detalles del trabajo</router-link>
          </q-item-section>
        </q-item>
        <q-list>
          <q-item
            v-for="(detail, index) in selectedNotification.details"
            :key="index"
          >
            <q-item-section>
              <q-item-label>{{ detail.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { api_base_backend } from "src/helpers";

export default {
  setup() {
    const showNotifications = ref(false);

    const notifications = ref([]);

    axios
      .get(`${api_base_backend}/api/v1/notifications`)
      .then((response) => {
        notifications.value = response.data.notifications;
      })
      .catch((err) => {
        console.error(err);
      });

    const selectedNotification = ref(null);

    window.Echo.private("notification")
      .listen(".NotificationSent", (event) => {
        notifications.value.unshift(event.notification);
      })
      .error((error) => {
        console.error("Error en la suscripción:", error);
      });

    function showNotificationDetails(notification) {
      selectedNotification.value = notification;
    }

    return {
      showNotificationDetails,
      selectedNotification,
      notifications,
      showNotifications,
    };
  },
};
</script>

<style scoped>
.q-card {
  max-height: 80vh;
  overflow-y: auto;
}
</style>

