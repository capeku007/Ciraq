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
      class="fixed top-0 left-0 right-0 bottom-0 z-50 hidden w-full overflow-hidden flex items-center justify-center"
    >
      <div
        class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hidden rounded-lg shadow-xl m-4"
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
                      <span class="mr-3">
                      {{ selectedListing.company_name }}</span>
                    </p>
                    <p class="text-sm text-gray-600"></p>
                    <p class="text-sm text-gray-600"></p>
                  </div>
                </div>
                <div class="text-left mb-6">
                  <p class="text-lg font-bold mb-2">
                    Offer letter 
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
                    @click="updateOffer('accepted')"
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

  <div v-if="selectedListing" class="grid grid-rows-[1fr] h-[90dvh]">
      <div
        class="md:p-5 px-4 overflow-y-auto overflow-x-hidden h-[88dvh] bg-white rounded-xl"
      >
        <div class="py-4 sticky top-[-1.2rem] z-10 bg-white">
        <div class="py-4 sticky top-0 z-10 bg-white pt-4 sm:pt-2">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0" @click="viewCompany()">
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
                {{ selectedListing.company_name }}
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
          <!-- apply button -->
          <div class="mt-4 flex">
            <button
              disabled
               class="w-full mr-4 inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-2 rounded-lg"
            >
               <i class="bx bx-calendar"></i> &nbsp; {{ formatDate(selectedListing.appl_timestamp) }}
            </button>  
            <button
              :disabled="selectedListing.appl_status !== 'offer-extended'"
              @click="showModal('updateOfferStatusModal')"
             class="w-full inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
                      :class="{
                        'bg-white text-gray-500 border border-gray-500': selectedListing.appl_status === 'pending',
                        'bg-yellow-300 border':
                          selectedListing.appl_status === 'offer-extended',
                        'bg-purple-500 text-white':
                          selectedListing.appl_status === 'in-review',
                        'bg-green-500 text-white': selectedListing.appl_status === 'accepted',
                        'bg-red-500 ': selectedListing.appl_status === 'rejected',
                        'bg-[#044013] ':
                          selectedListing.appl_status !== 'pending' &&
                          selectedListing.appl_status !== 'offered' &&
                          selectedListing.appl_status !== 'shortlisted' &&
                          selectedListing.appl_status !== 'hired',
                      }"><i class="bx bx-loader-circle"></i> &nbsp; 
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
import { useAuthStore } from "~/stores/authStore";
import companyPlaceholder from "~/assets/images/companyPlace.jpg";
import { useModalStore } from "@/stores/modalStore.js";

const authStore = useAuthStore();
const mainStore = useMainStore();
const { formatDate } = useFormatDate();

const modalStore = useModalStore();
const { selectedListing } = defineProps({
  selectedListing: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["loadJobsMobile"]);

const imageSrc = selectedListing.company_logo || companyPlaceholder;

const touchStartX = ref(0);

const {
  showClosableModal,
  showModal,
  hideModal,
  dialogInfo,
  showMessage,
  openYesOrNoClick,
} = useModal();

const updateOffer = (newStatus) => {
  // close modal

  hideModal("updateOfferStatusModal");

  console.log(newStatus);
  let info = newStatus + " application?";
  modalStore.changeDialog(info);
  let func = {};
  console.log(selectedListing);
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      // isLoading.value = true;
      let updateData = {
        application_id: selectedListing.application_id,
        job_id: selectedListing.job_id,
        status: newStatus,
        status_msg: newStatus,
      };
      console.log("updateData",updateData );
      const response = await fetch(
        mainStore.urlbase + "appl/update-status",
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
      } else {
        console.error(
          "Error fetching listing:",
          response.status,
          response.statusText
        );
        // isLoading.value = false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  modalStore.OpenYesOrNOClick(func);
};

const selectedCompany=ref({})
const viewCompany = async () => {

  //fetch company
    isLoading.value = true;
  try {
    selectedCompany.value = {};

    const response = await fetch(
      `${mainStore.urlbase}company/companyinfo/${n.user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: employerAuth.ctoken,
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log(" response", responseData);
      selectedCompany.value = responseData.data;
      console.log(" selected user fetched", selectedCompany.value);
        isLoading.value = false;
  showClosableModal('viewCompanyInfo');
    } else {
      console.error(
        "Error fetching listing:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Unable to load listing:", error);
  }
  isLoading.value = false;
};

const goBack = () => {
  // Implement your goBack logic here
  emit("loadJobsMobile");
};


const isMobile = ref(false);

const handleResize = () => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  if (!isMobile.value) {
  }
};

onMounted(() => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
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