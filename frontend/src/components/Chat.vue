<template>
  <q-btn
    flat
    icon="mdi-chat"
    @click="drawer = true"
    color="white"
    class="q-mr-md"
  >
    <q-dialog
      v-model="drawer"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card
        class="bg-teal-10 text-white"
        style="width: 100%; max-width: 1500px; height: 100%; max-height: 950px"
      >
        <div class="header">
          <q-toolbar class="bg-grey-3 text-black">
            <q-btn round flat>
              <q-avatar>
                <img
                  v-if="received?.image"
                  :src="`${api_base_backend}/${received.image}`"
                />
                <img v-else :src="user_default" />
              </q-avatar>

              <q-menu auto-close>
                <q-infinite-scroll
                  @load="handleUserScroll"
                  :offset="15"
                  v-model="isLoading"
                >
                  <q-list>
                    <q-item
                      v-for="(user, index) in users"
                      :key="index"
                      clickable
                      @click="setReceived(user)"
                    >
                      <q-item-section avatar>
                        <q-avatar>
                          <img
                            v-if="user?.image"
                            :src="`${api_base_backend}/${user.image}`"
                          />
                          <img v-else :src="user_default" />
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label lines="1">
                          {{ user.name }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-infinite-scroll>
              </q-menu>
            </q-btn>

            <span class="q-subtitle-1 q-pl-md">
              {{ received?.name }}
            </span>

            <q-space />
            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
          </q-toolbar>
        </div>

        <!-- Chat Messages Area -->
        <div class="bg-grey-5 chat-area">
          <q-scroll-area class="messages-area" :reverse="true">
            <div class="q-pa-md row justify-center">
              <div style="width: 100%; max-width: 700px">
                <q-chat-message
                  v-for="(msg, index) in messages"
                  :avatar="
                    msg.sender_id !== user.id
                      ? received.image
                        ? `${api_base_backend}/${received.image}`
                        : user_default
                      : undefined
                  "
                  :key="index"
                  :text="[msg.content]"
                  :sent="msg.sender_id === user.id"
                  class="text-subtitle1"
                  :bg-color="msg.sender_id === user.id ? 'green-3' : 'white'"
                />
              </div>
            </div>
          </q-scroll-area>
        </div>

        <form @submit.prevent="sendMessage">
          <q-toolbar
            class="BarraTexto bg-grey-3 text-black flex items-center justify-end"
          >
            <q-btn round flat icon="insert_emoticon" @click="toggleEmojiPicker">
              <emoji-picker
                v-if="showEmojiPicker"
                @emoji-click="addEmoji"
                class="emoji-picker"
              />
            </q-btn>

            <q-input
              rounded
              outlined
              dense
              style="width: 100%"
              bg-color="white"
              v-model="message"
              placeholder="Type a message"
            />
            <q-btn round flat icon="send" @click="sendMessage" />
          </q-toolbar>
        </form>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script>
import { getCurrentInstance, ref, watch } from "vue";
import user_default from "../../public/imagenes/user.png";
import { useEnterprises } from "src/hooks/api/enterprises.hooks";
import { useUserStore } from "src/store/user.store";
import "emoji-picker-element";
import { api } from "src/boot/axios";
import { useUsers } from "src/hooks/api/users.hooks";
import { api_base_backend } from "../helpers.js";

export default {
  setup() {
    const userSotre = useUserStore();
    const user = userSotre.getUser;

    const toggleFetchUsers = () => {
      if (user.rol === "Admin") {
        const {
          enterprises: users,
          isLoading,
          paginate,
          refetch,
        } = useEnterprises({ filter: true, owner: true });

        return { users, isLoading, paginate, refetch };
      }

      const { isLoading, users, paginate, refetch } = useUsers({
        role: "Admin",
      });

      return { users, isLoading, paginate, refetch };
    };

    const { users, isLoading, paginate, refetch } = toggleFetchUsers();

    let users_old = null;
    const handleUserScroll = () => {
      let next_page =
        paginate.value.current_page !== paginate.value.last_page
          ? paginate.value.current_page + 1
          : null;

      if (next_page) {
        users_old = users.value;

        const params =
          user.rol === "Admin"
            ? { filter: true }
            : {
                role: "Admin",
              };

        refetch({
          ...params,
          page: next_page,
        }).then(() => {
          users.value = [...users_old, ...users.value];
        });
      }
    };

    const received = ref(null);
    const messages = ref([]);

    watch(isLoading, () => {
      if (isLoading.value === false && users.value) {
        received.value = users.value[0];
      }
    });

    watch(received, async () => {
      const receiver_id =
        user.rol === "Admin" ? received.value.user.id : received.value.id;

      await api
        .get(`chat/${receiver_id}`, {
          conent: message.value,
          receiver_id,
        })
        .then((response) => {
          messages.value = response.data;
        });
    });

    window.Echo.private("chat." + user.id)
      .listen(".MessageEvent", (event) => {
        messages.value.push(event.message)
      })
      .error((error) => {
        console.error("Error en la suscripción:", error);
      });

    const message = ref("");
    const menu = ref(false);
    const drawer = ref(false);
    const showEmojiPicker = ref(false);

    const handleToggleMenuMobile = () => {
      menuMobile.value = !menuMobile.value;
    };
    async function sendMessage() {
      if (message.value.trim() !== "") {
        const receiver_id =
          user.rol === "Admin" ? received.value.user.id : received.value.id;

        await api
          .post("chat/send", {
            content: message.value,
            receiver_id,
          })
          .then((response) => {
            messages.value.push(response.data);
          });

        message.value = "";
      }
    }

    function setReceived(user_received) {
      received.value = user_received;
    }

    // Alterna el selector de emojis
    function toggleEmojiPicker() {
      showEmojiPicker.value = !showEmojiPicker.value;
    }

    // Agrega el emoji al campo de texto
    function addEmoji(event) {
      message.value += event.detail.unicode;
    }

    return {
      user,
      message,
      handleUserScroll,
      received,
      api_base_backend,
      menu,
      drawer,
      showEmojiPicker,
      toggleEmojiPicker,
      addEmoji,
      setReceived,
      sendMessage,
      user_default,
      users,
      isLoading,
      messages,
      handleToggleMenuMobile,
    };
  },
};
</script>

<style scoped>
.q-dialog__inner--maximized > div {
  width: 80%;
  height: 80%;
  overflow-y: hidden;
  overflow-x: hidden;
}
.Drawer {
  height: 100%;
  background-color: white;
  color: #000;
  top: 0;
  position: absolute;
  z-index: 8;
  overflow-x: hidden;
}

.header {
  right: 0;
  top: 0;
  width: 100%;
  position: absolute;
  z-index: 10;
  overflow-x: hidden;
}

.BarraTexto {
  bottom: 0;
  position: absolute;
  height: 9%;
  z-index: 9;
}

.chat-area {
  width: 100%;
  height: 86%;
  position: absolute;
  top: 0;
  right: 0;
  color: #000;
  margin-top: 43px;
  overflow-x: hidden;
}

.messages-area {
  height: 100%;
  width: 100%;
  padding: 10px;
  overflow-y: hidden;
}

.message-item {
  max-width: 30%;
  margin-bottom: 10px;
  margin-right: 10px;
  padding: 10px;
  border-radius: 10px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-x: hidden;
  box-sizing: border-box;
  overflow-x: hidden;
}

.sent-message {
  margin-left: auto;
  overflow-x: hidden;
}

.received-message {
  margin-right: auto;
  overflow-x: hidden;
}

.emoji-picker {
  position: absolute;
  bottom: 60px;
  left: 0;
  z-index: 1000;
  background-color: white;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  width: 300px;
  height: 400px;

  overflow-y: auto;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .Drawer {
    display: none;
    overflow-x: hidden;
  }

  .header,
  .BarraTexto,
  .chat-area {
    width: 100%;
    overflow-x: hidden;
  }

  .messages-area {
    padding: 5px;
    overflow-x: hidden;
  }

  .message-item {
    max-width: 80%;
    overflow-x: hidden;
  }

  .menu-mobile {
    background: blue;
  }

  .BarraTexto {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow-x: hidden;
  }

  q-btn {
    min-width: 40px;
    overflow-x: hidden;
  }

  q-input {
    min-height: 40px;
    overflow-x: hidden;
  }
}
</style>
