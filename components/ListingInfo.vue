<template>
  <div v-if="selectedListing" class="grid grid-rows-[1fr] h-[90dvh]">
    <!-- COVER LETTER -->
    <div
      id="coverLetterModal"
      data-modal-target="coverLetterModal"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 bottom-0 z-50 hidden w-full overflow-hidden flex items-center justify-center"
    >
      <div
        class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hidden rounded-lg shadow-xl m-4"
      >
        <div class="relative">
          <i
            @click="hideModal('coverLetterModal')"
            class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"
          ></i>

          <div class="">
            <div class="mx-auto rounded-lg overflow-hidden">
              <div class="bg-white rounded-2xl p-4 shadow-md mb-12">
                <div class="content">
                  <div class="flex items-center mb-4">
                    <div class="mr-4">
                      <div
                        :style="{
                          backgroundImage: `url(${imageSrc})`,
                        }"
                        class="mx-auto flex justify-center w-[80px] h-[80px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                      ></div>
                    </div>
                    <div>
                      <p class="text-lg font-bold">
                        {{ selectedListing.job_title }}
                      </p>
                      <p class="text-sm text-gray-600">
                        <span class="mr-3">{{
                          selectedListing.employment_type
                        }}</span>
                        <span
                          class="mr-3 border-r border-gray-200 max-h-0"
                        ></span>
                        <span>{{ selectedListing.location_name }}</span>
                      </p>
                      <p class="text-sm text-gray-600">
                        {{ selectedListing.salary_compensation }}
                      </p>
                      <p class="text-sm text-gray-600"></p>
                    </div>
                  </div>
                  <div class="text-left mb-6">
                    <p class="text-lg font-bold mb-2">Cover letter</p>
                    <textarea
                      type="text"
                      v-model="cover_letter"
                      id="chat"
                      style="resize: none"
                      rows="4"
                      class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <div class="flex justify-around">
                    <button
                      @click="applyJob()"
                      class="w-2/6 bg-green-600 border text-white px-6 py-2 rounded-lg font-bold"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODALS END HERE -->

      <!-- NEW UP HERE -->
      <div
        class="md:p-5 px-4 overflow-y-auto overflow-x-hidden h-[88dvh] bg-white rounded-xl"
      >
        <div class="py-4 sticky top-[-1.2rem] z-10 bg-white">
          <div class="flex items-center space-x-3 pt-4 sm:pt-2">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-lg sm:w-16 sm:h-16"
                :src="
                  selectedListing.company_logo
                    ? `https://ciraq.co/api/public/uploads/profile_images/${selectedListing.company_logo}`
                    : companyPlaceholder
                "
                alt="company image"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-base sm:text-lg font-semibold">
                {{ selectedListing.job_title }}
              </p>
              <p class="text-xs sm:text-base font-normal text-gray-500">
                {{ selectedListing.job_title }}
              </p>
            </div>
            <div>
              <i
                v-if="isMobile"
                @click="goBack"
                class="bx bx-x bg-red-600 p-1 rounded-lg text-white"
              ></i>
            </div>
          </div>
          <div class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse">
            <span
              class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
            >
              <i class="bx bx-briefcase-alt-2"></i>&nbsp;
              {{ selectedListing.employment_type }}
            </span>

            <span
              class="inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
            >
              <i class="bx bx-map"></i> &nbsp;
              {{ selectedListing.location_name }}
            </span>
            <span
              class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
            >
              <i class="bx bx-money"></i>&nbsp;
              {{ selectedListing.salary_compensation }}
            </span>
          </div>
        </div>
        <!-- job description -->
        <div>
          <div>
            <p class="text-base sm:text-lg font-semibold">Job Description</p>
            <p class="text-xs sm:text-base font-normal text-gray-500">
              {{ selectedListing.job_description }}
            </p>
          </div>

          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Location</h2>
            <p class="text-xs sm:text-base font-normal text-gray-500">
              {{ selectedListing.location_name }}
            </p>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Required Skills</h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li
                v-for="(
                  candidate, index
                ) in selectedListing.required_qualifications"
                :key="index"
              >
                {{ candidate }}
              </li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Desired Skills</h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li
                v-for="(
                  candidate, index
                ) in selectedListing.desired_qualifications"
                :key="index"
              >
                {{ candidate }}
              </li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Benefits</h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li
                v-for="(benefit, index) in selectedListing.benefits"
                :key="index"
              >
                {{ benefit }}
              </li>
            </ul>
          </div>
        </div>

        <!-- apply button -->
        <div class="my-4">
          <button
            @click="showClosableModal('coverLetterModal')"
            class="border-0 px-3 py-3 text-white bg-[#1A56DB] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Start application
          </button>
        </div>
        <!-- NEW UP HERE -->
      </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useModal from "../composables/useModal";
import { useModalStore } from "../stores/modalStore.js";
import companyPlaceholder from "~/assets/images/companyPlace.jpg";
const { hideModal, showModal, showClosableModal } = useModal();
const authStore = useAuthStore();

const isMobile = ref(false);
const mainStore = useMainStore();
const { selectedListing } = defineProps({
  selectedListing: {
    type: Object,
  },
});

const imageSrc = selectedListing.company_logo || companyPlaceholder;
const modalStore = useModalStore();
const handleResize = () => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
};
const cover_letter =ref('');
const applyJob = () => {
  hideModal("coverLetterModal");
  console.log(selectedListing);
  let info = "Confirm application for " + selectedListing.job_title + "?";
  modalStore.changeDialog(info);
  let func = {};
  let requestBody = {
    job_id: selectedListing.job_id,
    cover_letter: cover_letter.value,
  };
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      const response = await fetch(mainStore.urlbase + "appl/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authStore.token,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        // If successful, display the message
        modalStore.showMessage(data.message);
        cover_letter.value=""
      } else {
        // If not successful, display the message
        modalStore.showMessage(data.message);
        console.error(
          "Error fetching listing:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  modalStore.OpenYesOrNOClick(func);
};

const emit = defineEmits(["loadJobsMobile"]);
const goBack = () => {
  // Implement your goBack logic here
  emit("loadJobsMobile");
};

onMounted(() => {
  isMobile.value = window.innerWidth < 768;
  window.addEventListener("resize", handleResize);
});
</script>;


<style scoped>
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