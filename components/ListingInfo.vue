<template>
  <div>
    <div
      class="parentCon m-2"
      v-if="selectedListing"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <!-- NEW UP HERE -->
      <div class="p-4 md:p-5">
        <div class="py-4 sticky top-0 z-10 bg-white rounded-lg">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-lg sm:w-16 sm:h-16"
                src="../assets/knustlogo.png"
                alt="company image"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-base sm:text-lg font-semibold">
                {{ selectedListing.job_title }}
              </p>
              <p class="text-xs sm:text-base font-normal text-gray-500">
                {{ selectedListing.contact_information }}
              </p>
            </div>
            <div>
              <i
                @click="goBack"
                class="bx bx-chevron-left bg-red-600 p-1 rounded-lg text-white"
              ></i>
            </div>
          </div>
          <div class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse">
            <span
              class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
            >
              hybrid
            </span>

            <span
              class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2 py-1 rounded-lg"
            >
              intermediate
            </span>
            <span
              class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
            >
              Part Time
            </span>
          </div>
        </div>
        <!-- job description -->
        <div>
          <div>
            <p class="text-base sm:text-lg font-semibold">Job Description</p>
            <p class="text-xs sm:text-base font-normal text-gray-500">
              {{ selectedListing.jobDescription }}
            </p>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Working Days</h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li>{{ selectedListing.workDays }}</li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Location</h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li>{{ selectedListing.location }}</li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">
              A Must Have Skill
            </h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li>Javascript</li>
              <li>Html css</li>
              <li>Figma</li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">
              Candidate Recruitment
            </h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li>Studying computer science or relate subjects</li>
              <li>1-2 years experience in photoshop</li>
              <li>Good communication design and creative skills</li>
              <li>Max Age of 35 years</li>
            </ul>
          </div>
        </div>

        <!-- apply button -->
        <div class="mt-4">
          <button
            @click="testLog()"
            class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Apply
          </button>
        </div>
        <!-- NEW UP HERE -->
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
import { useModalStore } from "../stores/modalStore.js";
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
      isModalVisible: false,
      applicationData: {
        job_id:"", 
        user_id:"",
        cover_letter:"",
        applicant_name:"",
      },
    };
  },
  methods: {
    testLog() {
      const modalStore = useModalStore();
      let info =
        "Confirm application for " + this.selectedListing.title + " task";
      modalStore.changeDialog(info);
      let func = {};
      // IF USER SELECTS YES CONTINUE FUNCTION
      func.yesfunc = async function () {
        try {
          console.log("trying to run the function");

          // show response message as toast
          modalStore.showMessage("");
        } catch (error) {
          console.log(error);
        }
      };
      modalStore.OpenYesOrNOClick(func);
    },

    goBack() {
      // Implement your goBack function here
      this.$emit("loadJobsMobile");
    },
    handleTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },

    // Function to handle touch end event
    handleTouchEnd(event) {
      const touchEndX = event.changedTouches[0].clientX;
      const swipeDistance = touchEndX - this.touchStartX;

      // Define a threshold for swipe distance to consider it as a swipe
      const swipeThreshold = 50;

      if (swipeDistance > swipeThreshold) {
        // If swipe distance is greater than threshold, call goBack function
        this.goBack();
      }
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
  mounted() {
    // this.initModals();
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
  display: flex;
  align-items: center;
  justify-content: left;
  /* backdrop-filter: blur(10px); */
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
  width: 100%;
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
  /* backdrop-filter: blur(10px); */
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
  width: calc(100% - 10px);
  font-size: 12px;
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