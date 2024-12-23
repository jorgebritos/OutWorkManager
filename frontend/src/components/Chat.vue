<template>
  <q-btn
    flat
    icon="mdi-chat"
    @click="menu = true"
    color="white"
    class="q-mr-md"
  >
    <q-dialog
      v-model="menu"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <div
        style="max-width: 1600px; width: 100%; max-height: 900px; height: 100%"
        class="shadow-2 rounded-borders row"
      >
        <q-card
          style="
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
          "
        >
          <!-- Header Section -->
          <q-card-section class="q-pa-none">
            <q-toolbar class="bg-grey-3 text-black">
              <div round flat>
                <q-btn
                  flat
                  @click="drawer = !drawer"
                  round
                  dense
                  icon="menu"
                  class="q-mr-lg"
                />
                <div v-if="received1" class="flex items-center">
                  <q-avatar>
                    <img
                      v-if="received?.image"
                      :src="`${api_base_backend}/${chat.image}`"
                    />
                    <img v-else :src="user_generic" />
                  </q-avatar>
                  <p>{{ received?.name }}</p>
                </div>
              </div>
              <q-space />
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-toolbar>
          </q-card-section>

          <!-- Chat Messages Section (Main Content) -->
          <q-card-section
            class="q-flex-grow-1 text-black q-px-xl"
            style="overflow-y: auto; height: 100%"
          >
            <q-scroll-area class="fit">
              <q-list>
                dddd
                <!-- Aquí irían los mensajes -->
              </q-list>
            </q-scroll-area>
          </q-card-section>

          <!-- Input and Emoji Picker -->
          <q-card-section class="q-pa-none">
            <q-toolbar class="bg-grey-3 text-black row">
              <q-btn
                round
                flat
                icon="insert_emoticon"
                class="q-mr-sm"
                @click="toggleEmojiPicker"
              />
              <emoji-picker
                v-if="showEmojiPicker"
                @emoji-click="addEmoji"
                class="emoji-picker"
              ></emoji-picker>
              <q-input
                rounded
                outlined
                dense
                class="WAL__field col-grow q-mr-sm"
                bg-color="white"
                v-model="message"
                placeholder="Type a message"
              />
              <q-btn round flat icon="send" @click="sendMessage" />
            </q-toolbar>
          </q-card-section>
        </q-card>
      </div>
    </q-dialog>
  </q-btn>
</template>

<script>
import { ref } from "vue";
import "emoji-picker-element";
import { getCurrentInstance, onMounted } from "vue";
import { useEnterprises } from "src/hooks/api/enterprises.hooks";
import { api_base_backend } from "../helpers.js";
import user_generic from "../../public/imagenes/user.png";

export default {
  setup() {
    const { proxy } = getCurrentInstance();

    const {
      isLoading: isLoadingChats,
      enterprises: chats,
      paginate,
      refetch,
    } = useEnterprises();

    let chats_old = null;

    const handleChatsScroll = () => {
      chats_old = chats.value;
      refetch({ page: paginate.value.current_page + 1 }).then((response) => {
        chats.value = [...chats_old, ...response.data.enterprises];
      });
    };

    const echo = proxy.$echo;

    const received = ref(null);

    onMounted(() => {
      echo
        .private("chat." + received.value?.user.id)
        .listen("MessageSent", (event) => {
          console.log("Nuevo mensaje:", event.message);
        });
    });

    const message = ref("");
    const conversation = ref(false);
    const menu = ref(false);
    const drawer = ref(false);
    const showEmojiPicker = ref(false);

    async function sendMessage() {
      if (message.value.trim() !== "") {
        currentConversation.value.messages.push({
          text: message.value,
          isSender: true,
        });
        message.value = "";
      }
      await axios.post("/api/chat/send", {
        receiver_id: received.value.user.id,
        content: message.value,
      });

      conversation.push({
        receiver_id: received.value.user.id,
        content: message.value,
      });
    }

    return {
      sendMessage,
      received,
      message,
      menu,
      drawer,
      showEmojiPicker,
      isLoadingChats,
      chats,
      handleChatsScroll,
      user_generic,
      api_base_backend,
      conversation,
    };
  },
};
</script>

<style scoped>
.q-dialog__inner--maximized > div {
  width: 80%;
  height: 80%;
  overflow-y: hidden;
}
.Drawer {
  width: 25%;
  height: 100%;
  background-color: white;
  color: #000;
  top: 0;
  position: absolute;
  z-index: 8;
}

.header {
  right: 0;
  top: 0;
  width: 75%;
  height: 8%;
  position: absolute;
  z-index: 10;
}

.BarraTexto {
  right: 0;
  bottom: 0;
  position: absolute;
  width: 75%;
  height: 9%;
  background-color: black;
  z-index: 9;
}

.chat-area {
  width: 90%;
  height: 86%;
  position: absolute;
  top: 0;
  right: 0;
  color: #000;
  margin-top: 43px;
}

.messages-area {
  height: 100%;
  padding: 10px;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
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
}

.sent-message {
  background-color: #dcf8c6;
  margin-left: auto;
}

.received-message {
  background-color: #fff;
  margin-right: auto;
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
}

@media (max-width: 768px) {
  .Drawer {
    width: 100%;
    height: auto;
    position: relative;
  }

  .header,
  .BarraTexto,
  .chat-area {
    width: 100%;
  }

  .messages-area {
    padding: 5px;
  }

  .message-item {
    max-width: 80%;
  }

  .BarraTexto {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  q-btn {
    min-width: 40px;
  }

  q-input {
    min-height: 40px;
  }
}
</style>
