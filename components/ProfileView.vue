<template>
  <!-- view job modal -->
  <div
    id="jobInfo"
    data-modal-target="jobInfo"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
  >
    <div
      class="relative p-2 bg-white rounded-2xl w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <i
        @click="hideModal('jobInfo')"
        class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 z-20 text-2xl text-gray-400 hover:text-red-600"
      ></i>

      <!-- TODO: UPDATE TO  -->
      <JobViewStd :selectedJob="selectedJob" />
    </div>
  </div>
  <div
    id="jobAppInfo"
    data-modal-target="jobAppInfo"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 flex items-center justify-center min-h-screen"
  >
    <div
      class="relative p-2 bg-white rounded-2xl w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <i
        @click="hideModal('jobAppInfo')"
        class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 z-20 text-2xl text-gray-400 hover:text-red-600"
      ></i>

      <div class="content p-4">
        <div class="flex items-center mb-4">
          <div class="mr-4">
            <div
              v-if="selectedUser.profile_img"
              :style="{
                backgroundImage: `url(https://ciraq.co/api/public/uploads/profile_images/${selectedUser.profile_img})`,
              }"
              class="mx-auto flex justify-center w-[80px] h-[80px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
            ></div>
            <div
              v-else
              class="mx-auto flex justify-center items-center w-[80px] h-[80px] bg-blue-300/20 rounded-full text-4xl font-bold"
            >
              {{ initialsFromName(selectedUser.fname, selectedUser.lname) }}
            </div>
          </div>
          <div>
            <p class="text-lg font-bold">
              {{ selectedUser.fname }}
              {{ selectedUser.lname }}
            </p>
            <p class="text-sm text-gray-600">
              <span class="mr-3">{{ selectedUser.program_offered }}</span>
              <span class="mr-3 border-r border-gray-200 max-h-0"></span>
              <span>{{ selectedUser.institution_name }}</span>
            </p>
            <p class="text-sm text-gray-600">
              {{ formatDate(selectedUser.start_date) }} |
              {{ currentYear(selectedUser.start_date) }}
            </p>
            <p class="text-sm text-gray-600"></p>
          </div>
        </div>
        <div class="text-left mb-6">
          <p class="text-lg font-bold mb-2">
            Job Title: {{ selectedUser.job_title }}
          </p>
          <p class="text-sm text-gray-600">
            {{ selectedUser.coverLetter }}
          </p>
        </div>
        <div class="flex justify-around">
          <button
            @click="updateApplicant('rejected')"
            class="w-2/6 bg-red-600 border text-white px-6 py-2 rounded-lg font-bold"
          >
            Reject
          </button>
          <button
            @click="updateApplicant('in-review')"
            class="w-2/6 mx-4 bg-blue-600 border text-white px-6 py-2 rounded-lg font-bold"
          >
            Shortlist
          </button>
          <button
            @click="updateApplicant('offer-extended')"
            class="w-2/6 bg-green-600 border text-white px-6 py-2 rounded-lg font-bold"
          >
            Make Offer
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="h-[73dvh] m-2 p-2">
    <div class="parent">
      <div class="div1">
        <!-- component -->
        <div class="h-[16.2vh] w-full flex justify-center items-center">
          <div class="flex w-full items-center mb-4">
            <div class="mr-4">
              <div
                v-if="selectedUser.profile_img"
                :style="{
                  backgroundImage: `url(https://ciraq.co/api/public/uploads/profile_images/${selectedUser.profile_img})`,
                }"
                class="mx-auto flex justify-center w-[80px] h-[80px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
              ></div>
              <div
                v-else
                class="mx-auto flex justify-center items-center w-[80px] h-[80px] bg-blue-300/20 rounded-full text-4xl font-bold"
              >
                {{ initialsFromName(selectedUser.fname, selectedUser.lname) }}
              </div>
            </div>
            <div>
              <p class="text-lg font-bold">
                {{ selectedUser.fname }}
                {{ selectedUser.lname }}
              </p>
              <p class="text-sm text-gray-600">
                <span>{{ selectedUser.institution_name }}</span>
              </p>
              <p class="text-sm text-gray-600">
                {{ selectedUser.program_offered }} |
                {{ currentYear(selectedUser.start_date) }}
              </p>
              <p class="text-sm text-gray-600">
                {{ currentAge(selectedUser.dob) }} |
                {{ selectedUser.gender }}
              </p>
              <p class="text-sm text-gray-600"></p>
            </div>
            <div class="ml-auto flex">
              <button
                class="flex items-center py-1 px-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                <i class="bx bx-chat"></i>
              </button>
              <button
                @click="showModal('jobAppInfo')"
                class="flex ml-4 items-center py-1 px-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-300"
              >
                <i class="bx bx-receipt"></i>
                <span class="hidden sm:inline ml-1">Application</span>
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="border-b border-gray-300 w-8/12"></div>
        </div>
        <!-- scrollable -->
        <div class="h-[56dvh] overflow-y-auto w-full">
          <!-- Professional summary -->
          <div class="pb-1 mt-1 bg-white rounded-lg">
            <button
              class="flex items-center justify-between w-full p-1 mt-2 font-medium text-gray-500 gap-3"
            >
              <span class="uppercase sm:pl-4 text-black text-xs font-bold">
                Professional Summary</span
              >
            </button>
            <div
              class="ml-8 accordion-content px-2 text-xs sm:text-sm mt-0 pt-0"
            >
              {{ selectedUser.bio }}
            </div>
          </div>

          <!-- Education summary -->
          <div class="pb-1 mt-4 bg-white rounded-lg">
            <button
              class="flex items-center justify-between w-full p-1 mt-2 font-medium text-gray-500 gap-3"
            >
              <span class="uppercase sm:pl-4 text-black text-xs font-bold">
                Education</span
              >
            </button>
            <div
              class="sm:ml-8 ml-4 accordion-content px-2 text-xs sm:text-sm mt-0 pt-0"
            >
              <div class="flex flex-col space-y-4 sm:mr-8 mr-4">
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div class="order-1 font-semibold">
                    {{ selectedUser.institution_name }} <br />
                    <span class="font-normal text-sm text-gray-600">{{
                      selectedUser.program_offered
                    }}</span>
                  </div>
                  <div class="order-2 text-sm text-gray-600 mt-0 sm:mt-0">
                    location <br />
                    <span class="font-medium text-sm text-gray-600">
                      {{ selectedUser.start_date }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- tabs -->
          <div class="flex mt-2 px-2">
            <div class="w-full">
              <ul
                class="flex mt-2 sm:pl-4 sticky top-0 z-10 bg-white rounded-lg"
              >
                <li
                  style="padding: 0.2rem"
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="activeTab = index"
                  class="uppercase sm:pl-4 text-black text-xs font-bold"
                  :class="
                    activeTab === index
                      ? 'text-[#132E35] border-b-2 border-[#132E35] pb-1'
                      : 'text-gray-500 border-b-2 pb-1'
                  "
                >
                  {{ tab }}
                </li>
              </ul>

              <div class="w-full bg-white p-2">
                <div class="" v-show="activeTab === 0">
                  <!-- Work History timeLine -->
                  <div class="sm:w-11/12 ml-4">
                    <ol class="relative border-s border-gray-200">
                      <li
                        @click="openWorkHistoryInfo(work.job_id)"
                        v-for="(work, index) in selectedUser.work_history"
                        :key="index"
                      >
                        <div class="p-4 mb-5 bg-white">
                          <span
                            class="absolute flex w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
                          >
                            <i class="bx bxs-briefcase"></i>
                          </span>

                          <div
                            class="flex justify-between mb-2 space-x-3 rtl:space-x-reverse"
                          >
                            <span
                              class="text-sm font-normal leading-none text-gray-400 px-2.5 py-0.5"
                            >
                              {{ formatDate(work.start_date) }}-
                              {{ formatDate(work.start_date) }}
                            </span>
                          </div>
                          <div
                            class="flex items-center space-x-3 rtl:space-x-reverse"
                          >
                            <div class="flex-shrink-0">
                              <img
                                class="w-10 h-10 rounded-lg sm:w-16 sm:h-16"
                                :src="
                                  work.company_logo
                                    ? `https://ciraq.co/api/public/uploads/profile_images/${work.company_logo}`
                                    : companyPlaceholder
                                "
                                alt="company image"
                              />
                            </div>
                            <div class="flex-1 min-w-0 ml-8">
                              <p
                                class="text-xs sm:text-base font-normal text-gray-500 truncate"
                              >
                                {{ work.company_name }}
                              </p>
                              <p
                                class="text-base sm:text-lg font-semibold truncate"
                              >
                                {{ work.job_title }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>

                <div v-show="activeTab === 2">
                  <p class="text-center">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useFormatDate } from "@/composables/useFormatDate";
import { useMainStore } from "~/stores/main";
import { useEmployerAuth } from "~/stores/employerAuth";
import companyPlaceholder from "~/assets/images/companyPlace.jpg";
import { useModalStore } from "@/stores/modalStore.js";
import { toast } from "vue3-toastify";
const mainStore = useMainStore();
const employerAuth = useEmployerAuth();
const { formatDate, currentAge, currentYear, initialsFromName } =
  useFormatDate();

const modalStore = useModalStore();
const activeTab = ref(0);
const tabs = ref(["Work History", "Projects"]);
const authStore = useAuthStore();
const { showModal, hideModal } = useModal();
const active = ref(false);

const { selectedUser } = defineProps({
  selectedUser: {
    type: Object,
  },
});

const toggleAccordion = () => {
  active.value = !active.value;
};

const selectedJob = ref({});
// user details

const updateApplicant = (newStatus) => {
  // close modal
  const modalId = "jobAppInfo";
  hideModal(modalId);

  console.log(newStatus);
  let info = "Confirm action?";
  modalStore.changeDialog(info);
  let func = {};

  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      let updateData = {
        application_id: selectedUser.application_id,
        appl_status: newStatus,
      };
      const response = await fetch(
        mainStore.urlbase + "listing/update-appl-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: employerAuth.ctoken,
          },
          body: JSON.stringify(updateData),
        }
      );
      const responseData = await response.json();
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
      console.log(error);
    }
  };

  modalStore.OpenYesOrNOClick(func);
};

const openWorkHistoryInfo = async (listingId) => {
  try {
    selectedJob.value = {};

    const response = await fetch(
      `${mainStore.urlbase}listing/listing-byid/${listingId}`,
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
      selectedJob.value = responseData.data[0];
      const modalId = "jobInfo";
      showModal(modalId);
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
};
onMounted(() => {});
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
</style>
