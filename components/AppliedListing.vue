<template>
    <!-- view company profile modal -->
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
        <!-- APPLICATION STATUS UPDATE -->
    <div
      id="updateOfferStatusModal"
      data-modal-target="updateOfferStatusModal"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
    >
      <div
        class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <div class="relative">
          <i
            @click="hideModal('updateOfferStatusModal')"
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
                          backgroundImage: `url(${selectedListing.profile_img})`,
                        }"
                        class="mx-auto flex justify-center w-[80px] h-[80px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                      ></div>
                      
                    </div>
                    <div>
                      <p class="text-lg font-bold">
                        {{ selectedListing.job }}
                        {{ selectedListing.lname }}
                      </p>
                      <p class="text-sm text-gray-600">
                        <span class="mr-3">{{
                          selectedListing.program_offered
                        }}</span>
                        <span
                          class="mr-3 border-r border-gray-200 max-h-0"
                        ></span>
                        <span>{{ selectedListing.institution_name }}</span>
                      </p>
                      <p class="text-sm text-gray-600">
                        
                      </p>
                      <p class="text-sm text-gray-600"></p>
                    </div>
                  </div>
                  <div class="text-left mb-6">
                    <p class="text-lg font-bold mb-2">
                      Offer letter for: {{ selectedListing.job_title }}
                    </p>
                    <p class="text-sm text-gray-600">
                      {{ selectedListing.status_msg }}
                    </p>
                  </div>
                  <div class="flex justify-around">
                    <button
                      @click="updateOffer('rejected')"
                      class="w-2/6 bg-red-600 border text-white px-6 py-2 rounded-lg font-bold"
                    >
                      Reject Offer
                    </button>

                    <button
                      @click="updateOffer('offer-extended')"
                      class="w-2/6 bg-green-600 border text-white px-6 py-2 rounded-lg font-bold"
                    >
                      Accept Offer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <div v-if="selectedListing" class="grid grid-rows-[1fr] max-h-full h-full">
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
                {{ selectedListing.job_title }}
              </p>
            </div>
            <div>
              <i
              v-if="isMobile"
                @click="goBack"
                class="bx bx-chevron-left bg-red-600 p-1 rounded-lg text-white"
              ></i>
            </div>
          </div>
          <div
                class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse"
              >
                <span
                  class="inline-flex items-center bg-gray-200  text-xs font-normal px-2.5 py-0.5 rounded-lg"
                >
                 <i class='bx bx-briefcase-alt-2'></i>&nbsp; {{ selectedListing.employment_type }}
                </span>

                <span
                  class="inline-flex items-center bg-gray-200  text-xs font-normal px-2 py-1 rounded-lg"
                >
                <i class='bx bx-map'></i> &nbsp;  {{ selectedListing.location_name }}
                </span>
                <span
                  class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
                >
                  <i class='bx bx-money'></i>&nbsp; {{ selectedListing.salary_compensation }}
                </span>
              </div>
          <!-- apply button -->
          <div class="mt-4 flex">
            <button
              disabled
              class="mr-4 px-3 py-3 text-[#044013] bg-white border-2 border-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            >
               &nbsp; {{ formatDate(selectedListing.appl_timestamp) }}
            </button>
<!-- //TODO: change disabke function to offer recieved -->
                        <button
                                         
                :disabled="selectedListing.appl_status !== 'rejected'"
@click="showModal('updateOfferStatusModal')"
                :class="{
    'bg-white text-gray-500': selectedListing.appl_status === 'pending',
    'bg-yellow-300 text-white': selectedListing.appl_status === 'offered',
    'bg-purple-500 text-white': selectedListing.appl_status === 'shortlisted',
    'bg-green-500 text-white': selectedListing.appl_status === 'hired',
    'bg-red-500 text-white': selectedListing.appl_status === 'rejected',
    'bg-[#044013] text-white': selectedListing.appl_status !== 'pending' && selectedListing.appl_status !== 'offered' && selectedListing.appl_status !== 'shortlisted' && selectedListing.appl_status !== 'hired'
  }"
              class="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            >
              {{ selectedListing.appl_status }}
            </button>
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
            <h2 class="text-sm sm:text-base font-semibold">
              Required Skills
            </h2>
            <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(candidate, index) in selectedListing.required_qualifications" :key="index">
                  {{ candidate }}
                </li>
              </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">
              Desired Skills
            </h2>
           <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(candidate, index) in selectedListing.desired_qualifications" :key="index">
                  {{ candidate }}
                </li>
              </ul>
          </div>          
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">
              Benefits
            </h2>
           <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(benefit, index) in selectedListing.benefits" :key="index">
                  {{ benefit }}
                </li>
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
import { useFormatDate } from "@/composables/useFormatDate";
import { useMainStore } from "~/stores/main";
import { useAuthStore } from '~/stores/authStore';

const authStore = useAuthStore();
const mainStore = useMainStore();
const { formatDate } = useFormatDate();

const { selectedListing } = defineProps({
  selectedListing: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["loadJobsMobile"]);

const touchStartX = ref(0);

const { showClosableModal,  showModal, hideModal, dialogInfo, showMessage, openYesOrNoClick } =
  useModal();

const viewCompany = () => {
  // Initialize useModal composable
  const modalId = "viewCompanyInfo";
  showClosableModal(modalId);
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
const updateOffer = (newStatus) => {
  // close modal
  const modalId = "updateOfferStatusModal";
  hideModal(modalId);

  console.log(newStatus);
  let info = newStatus + " username's application?";
  modalStore.changeDialog(info);
  let func = {};

  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      isLoading.value = true;
      let updateData = {
        application_id: applicantDetails.value.application_id,
        appl_status: newStatus,
      };
      console.log("url", mainStore.urlbase + "listing/update-app-status");
      const response = await fetch(
        mainStore.urlbase + "listing/update-appl-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authStore.token,
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        applicants.value = responseData.data;
        isLoading.value = false;
      } else {
        console.error(
          "Error fetching listing:",
          response.status,
          response.statusText
        );
        isLoading.value = false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  modalStore.OpenYesOrNOClick(func);
};


const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  if (!isMobile.value) {
  }
};

onMounted(() => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
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