<template>
  <div
    class="mx-2 grid grid-rows-[10%_1fr_8%] max-h-full h-full"
    v-if="selectedPerson"
  >
    <!-- Chat Header -->

    <div class="border-b rounded-3xl p-4 flex items-center justify-between">
      <div class="flex items-center mb-2">
        <!-- Back Button (visible on mobile) -->
        <!-- <button class="block sm:hidden mr-2" @click="goBack">
            <i class="bx bx-chevron-left"></i>
          </button> -->
        <img
          class="rounded-xl h-10 w-10 object-cover mr-3"
          :src="selectedPerson.avatar"
        />
        <div>
          <h4 class="text-lg font-semibold">{{ selectedPerson.name }}</h4>
          <p class="text-sm">KNUST. Computer Science</p>
        </div>
      </div>
    </div>
    <!-- Chat Body -->
    <div ref="chatBodyRef" class="child2 chat-body p-4">
      <!-- Display Messages -->
      <div class="child1">
        <div
          v-for="(message, index) in selectedPerson.messages"
          :key="index"
          class="message flex mb-2"
        >
          <div v-if="message.sender === 'user'" class="ml-3 maxWidth">
            <div
              class="text-gray-600 bg-gray-100 border-b border-gray-300 py-2 px-4 rounded-xl whitespace-pre-wrap text-xs"
            >
              {{ message.text }}
            </div>
          </div>
          <div v-else class="ml-auto maxWidth">
            <div
              class="text-black bg-[#72ead2] border-b border-gray-300 py-2 px-4 rounded-xl whitespace-pre-wrap text-xs"
            >
              {{ message.text }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input -->
    <div
      class="child3 chat-input rounded-xl flex items-center justify-between p-2"
    >
      <div class="flex items-center mx-1 w-full">
        <div class="relative w-full">
          <textarea
            @keypress.enter="sendMessage"
            type="text"
            v-model="newMessage"
            id="chat"
            style="resize: none"
            rows="1"
            class="bg-gray-50 border border-gray-100 text-gray-900 text-base rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2"
            placeholder="Your message..."
          ></textarea>
        </div>
        <button
          type="submit"
          @click="sendMessage"
          class="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-[#006565] rounded-full border border-[#006565] hover:bg-[#006565] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#006565]"
        >
          <i class="bx bx-send"></i>
        </button>
      </div>
    </div>
  </div>
  <div v-else class="grid grid-rows-[1fr] max-h-full h-full">
    <div class="flex justify-center items-center overflow-hidden animate-zoom">
      <!-- Display this when selectedPerson is null -->

      <img
        src="/assets/logo.png"
        class="h-64 animate-zoom overflow-hidden"
        alt="Select a person"
      />
      <!-- <p class="pt-4 text-2xl">Open a task for more info.</p> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedPerson: Object,
  },

  data() {
    return {
      messages: [
        { sender: "user", text: "Hey, how are you doing?" },
        { sender: "sender", text: "I'm good, thanks! How about you?" },
        { sender: "sender", text: "Another message from the user." },
      ],
      newMessage: "",
    };
  },
  methods: {
    goBack() {
      // Implement your goBack function here
      this.$emit("loadMessagesMobile");
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.$emit("sendMessage", this.newMessage);
        this.newMessage = ""; // Clear the input after sending the message
      }

      // Scroll to the bottom after a new message is sent
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },

    scrollToBottom() {
      const chatBody = this.$refs.chatBodyRef;
      chatBody.scrollTop = chatBody.scrollHeight;
    },
    isSameSender(index) {
      return (
        index > 0 &&
        this.messages[index - 1].sender === this.messages[index].sender
      );
    },
  },
};
</script>

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