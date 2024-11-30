<template>
    <q-btn flat  icon="mdi-chat" @click="dialog = true">
        
         <q-dialog
          v-model="dialog"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down">    
          <q-card class="bg-teal-10 text-white">
        <div class="header">
    <q-toolbar class="bg-grey-3 text-black">
      <div round flat @click="isMobile && (menu = !menu)">
        <q-avatar>
          <img :src="currentConversation.avatar" />
        </q-avatar>
      </div>

      <span class="q-subtitle-1 q-pl-md" @click="isMobile && (menu = !menu)">
        {{ currentConversation.person }}
      </span>

      <q-space />

      <q-btn dense flat icon="close" v-close-popup>
        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
      </q-btn>
    </q-toolbar>
  </div>

  <!-- Sidebar / Drawer -->
  <div class="Drawer">
    <q-toolbar class="bg-grey-3">
      <q-avatar class="cursor-pointer"></q-avatar>
      <q-space />
    </q-toolbar>

    <!-- Menú desplegable para móviles -->
    <q-menu v-if="isMobile" v-model="menu" auto-close>
      <q-list>
        <q-item
          v-for="(conversation, index) in conversations"
          :key="conversation.id"
          clickable
          @click="setCurrentConversation(index); menu = false"
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="conversation.avatar" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ conversation.person }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>

    <q-scroll-area style="height: calc(100% - 100px)">
      <q-list>
        <q-item
          v-for="(conversation, index) in conversations"
          :key="conversation.id"
          clickable
          v-ripple
          @click="setCurrentConversation(index)"
        >
          <q-item-section avatar>
            <q-avatar>
              <img :src="conversation.avatar" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              {{ conversation.person }}
            </q-item-label>
            <q-item-label class="conversation__summary" caption>
              <q-icon name="check" v-if="conversation.sent" />
              <q-icon name="not_interested" v-if="conversation.deleted" />
              {{ conversation.caption }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption>
              {{ conversation.time }}
            </q-item-label>
            <q-icon name="keyboard_arrow_down" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>

  <!-- Chat Messages Area -->
  <q-page-container class="bg-grey-5 chat-area">
    <q-scroll-area class="messages-area">
      <q-list>
        <q-item
          v-for="(msg, index) in currentConversation.messages"
          :key="index"
          class="message-item"
          :class="{ 'sent-message': msg.isSender, 'received-message': !msg.isSender }"
        >
          <q-item-section>
            <q-item-label>{{ msg.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-page-container>

  <!-- Message Input Bar -->
  <div @keydown="sendMessage2">
    <q-toolbar class="BarraTexto bg-grey-3 text-black row">
      <q-btn
        round
        flat
        icon="insert_emoticon"
        class="q-mr-sm"
        @click="toggleEmojiPicker"
      />
      <!-- Contenedor del selector de emojis -->
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
  </div>
      </q-card>
    </q-dialog>
 </q-btn>
</template>
<style scoped>

.q-dialog__inner--maximized > div {
    width: 80%;
    height: 80%;
    overflow-y:hidden

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
  width: 88%;
  height: calc(100% - 9%);
  position: absolute;
  top: 0;
  right: 0;
  color: #000;
}

.messages-area {
  height: 100%;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.message-item {
  max-width: 30%;
  margin-bottom: 10px;
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
<script setup>
import { provide, ref } from 'vue'
import { computed } from 'vue';
import 'emoji-picker-element'; // Importa el selector de emojis

const conversations = ref([
  {
    id: 1,
    person: 'Razvan Stoenescu',
    avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
    caption: "I'm working on Quasar!",
    time: '15:00',
    sent: true,
    messages: [],
  },
  {
    id: 2,
    person: 'Dan Popescu',
    avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
    caption: "I'm working on Quasar!",
    time: '16:00',
    sent: true,
    messages: [],
  },
  {
    id: 3,
    person: 'Jeff Galbraith',
    avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
    caption: "I'm working on Quasar!",
    time: '18:00',
    sent: true,
    messages: [],
  },
  {
    id: 4,
    person: 'Allan Gaunt',
    avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
    caption: "I'm working on Quasar!",
    time: '17:00',
    sent: true,
    messages: [],
  },
]);

const currentConversationIndex = ref(0);
const currentConversation = computed(() => {
  return conversations.value[currentConversationIndex.value];
});

const message = ref('');
const menu = ref(false);
const isMobile = ref(window.innerWidth < 768); // Detecta si es móvil
const showEmojiPicker = ref(false); // Controla la visibilidad del selector de emojis

function sendMessage() {
  if (message.value.trim() !== '') {
    currentConversation.value.messages.push({
      text: message.value,
      isSender: true,
    });
    message.value = '';
  }
}

function sendMessage2(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}
function handleClickOutside(event) {
  if (
    emojiPickerRef.value &&
    !emojiPickerRef.value.contains(event.target)
  ) {
    showEmojiPicker.value = false;
  }
}

function setCurrentConversation(index) {
  currentConversationIndex.value = index;
}

// Alterna el selector de emojis
function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value;
}

// Agrega el emoji al campo de texto
function addEmoji(event) {
  message.value += event.detail.unicode;
}

// Listener para cambios de tamaño de la ventana
window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 768;
});
const text = ref('')
const dialog = ref(false)
const maximizedToggle = ref(true)

</script>