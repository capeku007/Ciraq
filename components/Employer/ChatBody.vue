<template>
  <div class="chat-container">
    <div class="chat" v-if="selectedPerson">
      <div
        class="chat-title bg-white shadow-sm pb-4 border border-gray-100 text-[#132E35] flex items-center"
      >
        <button v-if="isMobile" @click="goBack" class="back-button">
          <i class="bx bx-chevron-left"></i>
        </button>
        <figure class="avatar mx-2">
          <img
            :src="
              selectedPerson.profile_img
                ? `https://ciraq.co/api/public/uploads/profile_images/${selectedPerson.profile_img}`
                : profilePlaceholder
            "
            :alt="`${selectedPerson.fname} ${selectedPerson.lname}'s profile image`"
          />
        </figure>
        <div>
          <h1 class="text-lg">{{ selectedPerson.friend_name }}</h1>
          <h2>{{ selectedPerson.institution_name }}.</h2>
        </div>
      </div>
      <div class="messages" ref="chatBodyRef">
        <div class="messages-content">
          <div
            v-for="message in messages"
            :key="message.id + message.timestamp.getTime()"
            class="text-base"
            :class="[
              'message',
              { 'message-personal': message.sender === 'user' },
            ]"
          >
            <figure v-if="message.sender !== 'user'" class="avatar">
              <img
                :src="
                  selectedPerson.profile_img
                    ? `https://ciraq.co/api/public/uploads/profile_images/${selectedPerson.profile_img}`
                    : profilePlaceholder
                "
                :alt="selectedPerson.friend_name"
              />
            </figure>
            {{ message.text }}
            <div class="timestamp">{{ getMessageTime(message.timestamp) }}</div>
          </div>
        </div>
      </div>
      <div class="message-box">
        <textarea
          v-model="newMessage"
          @keypress.enter.prevent="sendMessage"
          style="resize: none"
          rows="1"
          class="sm:text-base text-sm bg-gray-50 border border-gray-100 text-gray-900 rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2"
          placeholder="Your message..."
        ></textarea>
        <button
          @click="sendMessage"
          class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium bg-[#132e35] text-white rounded-full border border-[#132e35] hover:bg-white hover:text-[#132e35]"
        >
          <i class="bx bx-send"></i>
        </button>
      </div>
    </div>
    <div v-else class="chat empty-chat">
       <div
          class="bg-white flex justify-center items-center overflow-hidden animate-zoom"
        >
          <img
            src="/assets/logo.png"
            class="h-64 animate-zoom overflow-hidden"
            alt="Select a person"
          />
        </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick, defineProps } from "vue";
import { useEmployerAuth } from "~/stores/employerAuth";
import { io } from "socket.io-client";
import profilePlaceholder from "~/assets/images/profilePlace.jpg";
import { useMainStore } from "~/stores/main";

const mainStore = useMainStore();
const employerAuth = useEmployerAuth();
const props = defineProps({
  selectedPerson: Object,
});

const messages = ref([]);
const newMessage = ref("");
const chatBodyRef = ref(null);
const authStore = useAuthStore();
const socket = ref(null);

// Use the plugin
const { $indexedDB } = useNuxtApp();

const emit = defineEmits(["loadMessagesMobile", 'messageSentOrReceived']);

const goBack = () => {
  emit("loadMessagesMobile");
};

// Function to fetch chat history
const fetchChatHistory = async () => {
  if (!props.selectedPerson) {
    console.log("No selected person");
    return;
  }

  try {
    // First, try to get messages from IndexedDB
    const cachedMessages = await $indexedDB.getMessages(props.selectedPerson.friendship_id);
    if (cachedMessages.length > 0) {
      messages.value = cachedMessages;
    }

    // Then, fetch from the server
    const response = await fetch(
      mainStore.urlbase +
        "chats/chat_history/" +
        props.selectedPerson.friendship_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: employerAuth.ctoken,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch chat history");
    }
    const data = await response.json();
    if (data.successful && data.data && data.data.messages) {
      const serverMessages = data.data.messages
        .map((msg) => ({
          id: msg.message_id,
          text: msg.content,
          sender: msg.sender_id === employerAuth.user.user_id ? "user" : "other",
          timestamp: new Date(msg.sent_at),
          friendshipId: props.selectedPerson.friendship_id,
        }))
        .reverse();
      
      messages.value = serverMessages;

      // Update IndexedDB with the latest messages
      for (const msg of serverMessages) {
        await $indexedDB.addMessage(msg);
      }
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
  } finally {
    scrollToBottom();
  }
};

// Watch for changes in selectedPerson
watch(
  () => props.selectedPerson,
  (newPerson) => {
    if (newPerson) {
      fetchChatHistory();
    }
  },
  { immediate: true }
);

const isMobile = ref(false);
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(async () => {
  await $indexedDB.initDB();
  isMobile.value = window.innerWidth < 768;
  window.addEventListener("resize", handleResize);

  if (employerAuth.ctoken) {
    socket.value = io("https://ciraq.co/chat", {
      path: "/api/socket.io",
      auth: {
        token: employerAuth.ctoken,
      },
    });

    socket.value.on("connect", () => {
      console.log("Connected to server");
      socket.value.emit("joinChatRoom", { roomId: "chat" });
    });

    socket.value.on("chatMessage", async (message) => {
      emit('messageSentOrReceived');
      if (employerAuth.user.user_id !== message.user.user_id) {
        const newMessage = {
          id: Date.now().toString(),
          text: message.user.content,
          sender: "other",
          timestamp: new Date(),
          friendshipId: props.selectedPerson.friendship_id,
        };

        messages.value = [...messages.value, newMessage];
        await $indexedDB.addMessage(newMessage);
        emit('messageSentOrReceived');
        nextTick(() => {
          scrollToBottom();
        });
      }
    });

    socket.value.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }

  if (props.selectedPerson) {
    fetchChatHistory();
  }
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
  }
  window.removeEventListener("resize", handleResize);
});

const sendMessage = async () => {
  if (newMessage.value.trim() !== "") {
    const messageId = Date.now().toString();
    const message = {
      msg: newMessage.value,
      room: props.selectedPerson.friendship_id,
      sender: employerAuth.ctoken,
      name: props.selectedPerson.friend_name,
      recipient_id: props.selectedPerson.user_id,
      id: messageId
    };

    const newMessageObj = {
      id: messageId,
      text: newMessage.value,
      sender: "user",
      timestamp: new Date(),
      friendshipId: props.selectedPerson.friendship_id,
    };

    // Add message to local state and IndexedDB
    messages.value.push(newMessageObj);
    await $indexedDB.addMessage(newMessageObj);

    socket.value.emit("chatMessage", message);

    newMessage.value = "";
  }
  emit('messageSentOrReceived');
  nextTick(() => {
    scrollToBottom();
  });
};

const scrollToBottom = () => {
  if (chatBodyRef.value) {
    chatBodyRef.value.scrollTop = chatBodyRef.value.scrollHeight;
  }
};

const getMessageTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};
</script>

<style lang="scss" scoped>
// Mixins
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@mixin ball {
  @include center;
  content: "";
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
  margin-top: 4px;
  animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
}

// Main styles
.chat-container {
  width: 100%;
  min-height: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 1.3;
}

.chat {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #f2f1f2;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
}

.empty-chat {
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

.chat-title {
  flex: 0 0 auto;
  position: relative;
  z-index: 2;
  text-align: left;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  div {
    margin-left: 0.75rem; // Adds space to the left of the text
  }
  .back-button {
    color: #132e35;
    font-size: 24px;
    cursor: pointer;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.24);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;

  .messages-content {
    list-style-type: none;
    padding: 0;
  }

  .message {
    clear: both;
    float: left;
    padding: 6px 10px 7px;
    border-radius: 10px 10px 10px 0;
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    color: #132e35;
    margin: 8px 0;
    font-size: 12px;
    line-height: 1.4;
    margin-left: 35px;
    position: relative;

    .timestamp {
      position: absolute;
      bottom: -15px;
      font-size: 9px;
      color: #132e35;
    }

    &::before {
      content: "";
      position: absolute;
      bottom: -5px;
      border-top: 6px solid #fff;
      left: 0;
      border-right: 7px solid transparent;
    }

    .avatar {
      position: absolute;
      z-index: 1;
      bottom: -15px;
      left: -35px;
      border-radius: 30px;
      width: 30px;
      height: 30px;
      overflow: hidden;
      margin: 0;
      padding: 0;
      border: 2px solid rgba(255, 255, 255, 0.24);

      img {
        width: 100%;
        height: auto;
      }
    }

    &.message-personal {
      float: right;
      text-align: right;
      background: #132e35;
      color: #fff !important;
      box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
      border-radius: 10px 10px 0 10px;

      &::before {
        left: auto;
        right: 0;
        border-right: none;
        border-left: 5px solid transparent;
        border-top: 4px solid #132e35;
        bottom: -4px;
      }
    }

    &:last-child {
      margin-bottom: 30px;
    }

    &.new {
      transform: scale(0);
      transform-origin: 0 0;
      animation: bounce 500ms linear both;
    }

    &.loading {
      &::before {
        @include ball;
        border: none;
        animation-delay: 0.15s;
      }

      & span {
        display: block;
        font-size: 0;
        width: 20px;
        height: 10px;
        position: relative;

        &::before {
          @include ball;
          margin-left: -7px;
        }

        &::after {
          @include ball;
          margin-left: 7px;
          animation-delay: 0.3s;
        }
      }
    }
  }
}

.message-box {
  flex: 0 0 auto;
  display: flex;
  padding: 10px;
  background: rgb(255, 255, 255);

  .message-submit {
    position: relative;
    z-index: 1;
    border: none;
    font-size: 10px;
    text-transform: uppercase;
    line-height: 1;
    padding: 6px 10px;
    border-radius: 10px;
    outline: none !important;
    transition: background 0.2s ease;
    cursor: pointer;

    &:hover {
      background: #1d7745;
    }
  }
}

.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background: url("https://images.unsplash.com/photo-1451186859696-371d9477be93?crop=entropy&fit=crop&fm=jpg&h=975&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1925")
    no-repeat 0 0;
  filter: blur(80px);
  transform: scale(1.2);
}

// Animations
@keyframes bounce {
  0% {
    transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  4.7% {
    transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  9.41% {
    transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  14.11% {
    transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  18.72% {
    transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  24.32% {
    transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  29.93% {
    transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  35.54% {
    transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  41.04% {
    transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  52.15% {
    transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  63.26% {
    transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  85.49% {
    transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

@keyframes ball {
  from {
    transform: translateY(0) scaleY(0.8);
  }
  to {
    transform: translateY(-10px);
  }
}

.logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.animate-zoom {
  animation: zoom 3s infinite;
}
</style>

<style scoped>
.child2 {
  overflow-y: auto;
}

.maxWidth {
  max-width: 90%;
  word-wrap: break-word; /* Ensure long words break to the next line */
}
@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.animate-zoom {
  animation: zoom 3s infinite;
}
</style>