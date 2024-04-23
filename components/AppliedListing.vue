<template>
  <div
    id="viewCompanyInfo"
    tabindex="-1"
    data-modal-target="viewCompanyInfo"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]"
  >
    <div
      class="relative w-full max-h-full overflow-y-auto bg-white rounded-2xl"
    >
      <CompanyInfo />
    </div>
  </div>
  <div v-if="selectedListing" class="grid grid-rows-[1fr] max-h-full h-full">
    <!-- view profile modal -->
    <div
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      class="overflow-y-auto"
    >
      <!-- NEW UP HERE -->
      <div class="md:p-5 px-4">
        <div class="py-4 sticky top-0 z-10 bg-white">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0" @click="viewCompany()">
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
          <!-- apply button -->
          <div class="mt-4">
            <button
              disabled
              class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            >
              Applied &nbsp; 11/05/2024
            </button>
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
              <li>Studying computer science or relate subjects</li>
              <li>1-2 years experience in photoshop</li>
              <li>Good communication design and creative skills</li>
              <li>Max Age of 35 years</li>
            </ul>
          </div>
        </div>
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

<script setup>
import { ref } from "vue";
import useModal from "../composables/useModal";

const { selectedListing } = defineProps({
  selectedListing: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["loadJobsMobile"]);

const touchStartX = ref(0);

const { showClosableModal, dialogInfo, showMessage, openYesOrNoClick } =
  useModal();

const viewCompany = () => {
  // Initialize useModal composable
  const modalId = "viewCompanyInfo";
  showClosableModal(modalId);
};

const applyJob = () => {
  let info = "Confirm application for " + selectedListing.value.title + " task";
  showMessage(info);

  let func = {};
  func.yesfunc = async () => {
    try {
      console.log("trying to run the function");
      showMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  openYesOrNoClick(func);
};

const goBack = () => {
  // Implement your goBack logic here
  emit("loadJobsMobile");
};

const handleTouchStart = (event) => {
  touchStartX.value = event.touches[0].clientX;
};

const handleTouchEnd = (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const swipeDistance = touchEndX - touchStartX.value;
  const swipeThreshold = 50;

  if (swipeDistance > swipeThreshold) {
    goBack();
  }
};
</script>


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