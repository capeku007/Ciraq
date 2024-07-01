<template>
  <div class="chat-container">
    <div class="chat" v-if="selectedPerson">
      <div class="chat-title bg-gray-50 border border-gray-100 text-[#1A56DB]">
        <h1>{{ selectedPerson.friend_name }}</h1>
        <h2>{{selectedPerson.institution_name}}. </h2>
        <figure class="avatar">
          <img :src="selectedPerson.profile_img ? `https://ciraq.co/api/public/uploads/profile_images/${selectedPerson.profile_img}` : profilePlaceholder"
      :alt="`${selectedPerson.fname} ${selectedPerson.lname}'s profile image`" />
        </figure>
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
          class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-[#1A56DB] rounded-full border border-[#1A56DB] hover:bg-[#1A56DB] hover:text-white "
        >
          <i class="bx bx-send"></i>
        </button>
      </div>
    </div>
    <div v-else class="chat empty-chat">
      <div class="messages-content">
        <img
          src="/assets/logo.png"
          class="logo animate-zoom"
          alt="Select a person"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, defineProps } from "vue";
import { useAuthStore } from "../stores/authStore";
import { io } from "socket.io-client";
import profilePlaceholder from '~/assets/images/profilePlace.jpg';
import { useMainStore } from "~/stores/main";

const mainStore = useMainStore();
const props = defineProps({
  selectedPerson: Object,
});

const messages = ref([]);
const newMessage = ref("");
const chatBodyRef = ref(null);
const authStore = useAuthStore();
let socket = null;

// Function to fetch chat history
const fetchChatHistory = async () => {
  if (!props.selectedPerson) {
    console.log("No selected person");
    return;
  }

  try {
    const response = await fetch(
      mainStore.urlbase + "chats/chat_history/"+props.selectedPerson.friendship_id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authStore.token,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch chat history");
    }
    const data = await response.json();
    console.log("chat history", data);
    if (data.successful && data.data && data.data.messages) {
      messages.value = data.data.messages.map((msg) => ({
        id: msg.message_id,
        text: msg.content,
        sender: msg.sender_id === authStore.user.user_id ? "user" : "other",
        timestamp: new Date(msg.sent_at),
      })).reverse(); // Reverse the array here
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
    // You might want to show an error message to the user here
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

onMounted(() => {
  if (authStore.token) {
    socket = io(
      mainStore.urlbase + "chat", {
      auth: {
        token: authStore.token,
      },
    });

    socket.on("connection", () => {
      console.log("Connected to namespace");
    });

socket.on("chatMessage", (message) => {
  if (authStore.user.user_id !== message.user.user_id) {
    const newMessage = {
      id: Date.now().toString(),
      text: message.msg,
      sender: "other",
      timestamp: new Date(),
    };
    
    // Create a new array to trigger reactivity
    messages.value = [...messages.value, newMessage];
    
    console.log("🚀 Received chatMessage:", message);
    
    nextTick(() => {
      scrollToBottom();
    });
  }
});
    // Add other socket event listeners here
  }

  // If selectedPerson is already set when component mounts, fetch chat history
  if (props.selectedPerson) {
    fetchChatHistory();
  }
});

const sendMessage = () => {
  if (newMessage.value.trim() !== "") {
    const message = {
      msg: newMessage.value,
      room: props.selectedPerson.friendship_id,
      sender: authStore.token,
      name: props.selectedPerson.friend_name,
    };
    socket.emit("chatMessage", message);

    // Add the sent message to the end of the local messages array
    messages.value.push({
      id: Date.now().toString(), // temporary id
      text: newMessage.value,
      sender: "user",
      timestamp: new Date(),
    });

    newMessage.value = "";
  }

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
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  line-height: 1.3;
}

.chat {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.916);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
}

.empty-chat {
  justify-content: center;
  align-items: center;
}

.chat-title {
  flex: 0 0 auto;
  position: relative;
  z-index: 2;
  text-transform: uppercase;
  text-align: left;
  padding: 10px 10px 10px 50px;

  h1{
    font-weight: bold;
    font-size: 12px;
    margin-left: 8px;
    padding: 0;
  }

  h2 {
    font-size: 10px;
    letter-spacing: 1px;
        margin-top: 2px;
        margin-left: 8px;
    padding: 0;
  }

  .avatar {
    position: absolute;
    z-index: 1;
    top: 4px;
    left: 4px;
    border-radius: 30px;
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.24);

    img {
      width: 100%;
      height: auto;
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
    background: #d9e3de;
    color: #000;
    margin: 8px 0;
    font-size: 12px;
    line-height: 1.4;
    margin-left: 35px;
    position: relative;

    .timestamp {
      position: absolute;
      bottom: -15px;
      font-size: 9px;
      color: #000;
    }

    &::before {
      content: "";
      position: absolute;
      bottom: -5px;
      border-top: 6px solid #d9e3de;;
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
      background: #3990dc;
      border-radius: 10px 10px 0 10px;

      &::before {
        left: auto;
        right: 0;
        border-right: none;
        border-left: 5px solid transparent;
        border-top: 4px solid #3990dc;
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