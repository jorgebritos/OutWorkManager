<template>
  <q-btn
    flat
    icon="mdi-bell"
    @click="showNotifications = true"
    color="white"
    class="q-mr-md"
  />
  <q-dialog v-model="showNotifications" persistent>
    <q-card class="q-pa-md" style="min-width: 400px">
      <q-toolbar class="bg-grey-3 text-black">
        <q-toolbar-title>Notificaciones</q-toolbar-title>
        <q-btn icon="close" flat round @click="showNotifications = false" />
      </q-toolbar>
      <q-list>
        <h5 class="text-center" v-if="notifications.length === 0">No ahi notificaciones</h5>
        <q-item
          v-for="(notification, index) in notifications"
          :key="notification.id"
          clickable
          v-ripple
          @click="showNotificationDetails(index)"
        >
          <q-item-section>
            <q-item-label>{{ notification.title }}</q-item-label>
            <q-item-label caption>{{ notification.description }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption>{{ notification.time }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-card-section v-if="selectedNotification">
        <q-separator spaced />
        <q-item>
          <q-item-section>
            <q-item-label>{{ selectedNotification.title }}</q-item-label>
            <q-item-label caption>{{
              selectedNotification.description
            }}</q-item-label>
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
        notifications.value = response.data.notifications
      })
      .catch((err) => {
        console.error(err);
      });

    const selectedNotification = ref(null);

    function showNotificationDetails(index) {
      selectedNotification.value = notifications.value[index];
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

