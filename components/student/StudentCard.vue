<template>
  <div class="bg-white rounded-2xl p-4 shadow-md mb-12">
    <div class="content">
      <div class="flex items-center mb-4">
        <div class="mr-4">
          <img
            class="w-24 h-24 rounded-full"
            :src="
              selectedUser.profile_img
                ? `https://ciraq.co/api/public/uploads/profile_images/${selectedUser.profile_img}`
                : profilePlaceholder
            "
            :alt="`${selectedUser.fname} ${selectedUser.lname}'s profile image`"
          />
        </div>
        <div>
          <p class="text-lg font-bold">
            {{ selectedUser.fname }} {{ selectedUser.lname }}
          </p>
          <p class="text-sm text-gray-600">
            <span class="mr-3">{{ selectedUser.program_offered }}</span
            ><span class="mr-3 border-r border-gray-200 max-h-0"></span
            ><span>{{ selectedUser.institution_name }}</span>
          </p>
          <p class="text-sm text-gray-600">{{ selectedUser.start_date }}</p>
          <!-- <p class="text-sm text-gray-600">No active jobs</p> -->
        </div>
      </div>
      <div class="text-left mb-6">
        <!-- <p class="text-lg font-bold mb-2">About</p> -->
        <p class="text-sm text-gray-600">{{ selectedUser.bio }}</p>
      </div>
      <div class="flex justify-around">
        <button
          @click="closeModal"
          class="w-2/5 bg-gray-200 border border-black px-6 py-2 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-colors duration-300"
        >
          Close
        </button>
        <button
          @click="sendRequest(selectedUser)"
          class="w-2/5 bg-black text-white px-6 py-2 rounded-lg font-bold hover:tracking-wider transition-all duration-300"
        >
          Connect
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import profilePlaceholder from "~/assets/images/profilePlace.jpg";
import { useMainStore } from "~/stores/main";
import { toast } from "vue3-toastify";
const authStore = useAuthStore();
const { showClosableModal, hideModal } = useModal();
const active = ref(false);

const mainStore = useMainStore();
const { selectedUser } = defineProps({
  selectedUser: {
    type: Object,
    required: true,
  },
});

const closeModal = () => {
  // Initialize useModal composable
  const modalId = "viewProfile";
  hideModal(modalId);
};

const sendRequest = async (selectedUser) => {
  try {
    const response = await fetch(
      `${mainStore.urlbase}chats/send_fr/${selectedUser.user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authStore.token,
        },
      }
    );

    const responseData = await response.json();
  console.log(responseData)
    if (response.ok) {
      toast(responseData.message, { 
        position: "top-right", 
        duration: 200, 
        type: "success", 
        responsive: true,
      });
    } else {
      toast(responseData.error, { 
        position: "top-right", 
        duration: 200, 
        type: "error", 
        responsive: true,
      });
    }

  } catch (error) {
    toast("An error occurred while sending the request.", { 
      position: "top-right", 
      duration: 200, 
      type: "error", 
      responsive: true,
    });
  } finally{
    closeModal()
  }
};

onMounted(() => {});

const edituserProfile = () => {};
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 2 / 2;
  height: 16.2vh;
  max-height: 16.2vh;
  background-color: white;
}

/* ul {
  min-width: 100%;
  text-align: center;
}

/* li {
  display: inline-block;
  cursor: pointer;
  padding: 0.2rem 1rem;
} */

svg {
  transition: transform 0.3s ease;
}

.scrollbar-hidden::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

/* Hide scrollbar for Firefox */
.scrollbar-hidden {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide scrollbar for Chrome */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

::-webkit-scrollbar {
  width: 2.5px;
  height: 2.5px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(80, 80, 80, 0.11);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(94, 94, 94, 0.178);
  background: #bfbfbf;
}
</style>
