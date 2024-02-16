<template>
  <div>
    <div
      id="modal1"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600"
          >
            <h3
              class="text-lg ml-1 font-semibold text-gray-900 lg:text-2xl dark:text-white"
            >
              Confirm Application
            </h3>
            <button
              id="closeButton"
              data-modal-hide="modal1"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-red-600 hover:text-white rounded-lg text-sm p-1 ml-auto inline-flex items-center"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              Do you wish to apply to Task Title at Company Name
            </p>
          </div>
          <!-- Modal footer -->
          <div
            class="flex justify-end p-2 space-x-2 border-t border-gray-200 rounded-b"
          >
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              I accept
            </button>
            <button
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-4 py-2 hover:text-gray-900 focus:z-10"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="parentCon mx-2" v-if="selectedListing">
      <div class="flex justify-between">
        <div><p class="h1">Data Entry Lorem ipsum dolor!</p></div>
        <div>
          <i
            class="bx bx-chevron-left bg-red-600 p-1 rounded-lg text-white"
          ></i>
        </div>
      </div>
      <div class="jobTitle">
        <div class="img"></div>
        <div class="textBox">
          <div class="textContent">
            <p class="h1">Rigelis Inc</p>
            <!-- <span class="span">12 min ago</span> -->
          </div>
          <p class="p">1 La Bawaleshi rd.</p>
        </div>
        <div>
          <!-- <button
            @click="startApplication"
            class="rounded-lg bg-lime-500 py-1 px-2.5 text-white"
          >
            Apply Now
          </button> --> 
                   <button
                   data-modal-toggle="modal1"
        data-modal-target="modal1"
            class="rounded-lg bg-lime-500 py-1 px-2.5 text-white"
          >
            Apply Now
          </button>
        </div>
      </div>
      <div class="flex justify-between my-2">
        <div class="jobTitle">
          <div>
            <Icon
              name="bx:briefcase-alt"
              class="w-7 h-7 text-gray-500 dark:text-gray-400"
            ></Icon>
          </div>

          <div class="textBox">
            <div class="textContent">
              <p class="p">Days</p>
              <!-- <span class="span">12 min ago</span> -->
            </div>
            <p>Mondays - Fridays</p>
          </div>
        </div>
        <div class="jobTitle">
          <div>
            <Icon
              name="heroicons:building-office-2-solid"
              class="w-7 h-7 text-gray-500 dark:text-gray-400"
            ></Icon>
          </div>

          <div class="textBox">
            <div class="textContent">
              <p class="p">Location</p>
              <!-- <span class="span">12 min ago</span> -->
            </div>
            <p>Onsite</p>
          </div>
        </div>
        <div class="jobTitle">
          <div>
            <Icon
              name="ic:baseline-av-timer"
              class="w-7 h-7 text-gray-500 dark:text-gray-400"
            ></Icon>
          </div>

          <div class="textBox">
            <div class="textContent">
              <p class="p">Duration</p>
              <!-- <span class="span">12 min ago</span> -->
            </div>
            <p>1 month</p>
          </div>
        </div>
      </div>
      <div>
        <p class="text-sm leading-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
          nam omnis similique, hic, asperiores ab dolores dolor perspiciatis
          ratione delectus pariatur molestiae nesciunt
        </p>
      </div>
    </div>
    <div v-else>
      <!-- Display this when selectedPerson is null -->
      <div
        class="place text-center mt-4 flex flex-col items-center justify-center animate-zoom"
      >
        <img
          src="/assets/logo.png"
          class="h-64 animate-zoom"
          alt="Select a person"
        />
        <p class="mt-4 text-2xl">Open a task for more info.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedListing: Object,
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
    startApplication() {
      $("modal1").modal('show')
    },    
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
.card2 {
  width: 100%;
  /* max-width: 70%; */
  border-radius: 1rem;
  border: 1px solid #006565;
  height: 90vh;
  overflow-y: auto;
}

.jobTitle {
  width: 100%;

  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
  padding: 0;
}

.card:hover {
  cursor: pointer;
}

.vl {
  border-left: none;
  height: 500px;
}

.payCon {
  background-color: #bda472;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  color: #fff;
}

.img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background: linear-gradient(#d7cfcf, #9198e5);
}

.card:hover > .img {
  transition: 0.5s ease-in-out;
  background: linear-gradient(#9198e5, #712020);
}

.textBox {
  width: calc(100% - 90px);
  margin-left: 10px;
  font-family: "Poppins" sans-serif;
}

.textContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.span {
  font-size: 10px;
}

.cardTitle {
  width: 100%;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
  padding: 0;
}

.card:hover {
  cursor: pointer;
}

.payCon {
  background-color: #bda472;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  color: #fff;
}

.img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background: linear-gradient(#d7cfcf, #9198e5);
}

.card:hover > .img {
  transition: 0.5s ease-in-out;
  background: linear-gradient(#9198e5, #712020);
}

.textBox {
  width: calc(80% - 90px);
  margin-left: 10px;
  font-family: "Poppins" sans-serif;
}

.textContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.span {
  font-size: 10px;
}

.h1 {
  font-size: 18px;
  font-weight: bold;
}

.p {
  font-size: 12px;
  font-weight: bold;
}
.place {
  height: 80vh;
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