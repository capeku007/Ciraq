<template>
  <div>
    <div>
      <div class="relative overflow-x-auto shadow-md srounded-lg p-2">
        <div
          class="mt-1 grid grid-cols-1 md:grid-cols-12 gap-4 h-[83dvh] max-h-[83dvh] overflow-hidden"
        >
          <div
            v-if="!isMobile || (isMobile && showLeft)"
            class="md:col-span-4 grid grid-rows-[7dvh_76dvh] bg-white rounded-2xl h-[80dvh]"
          >
            <div
              class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 "
            >
              <div class="flex items-center text-base font-semibold ml-4">
                <p>Applicants</p>
                <button @click="refreshApplicants" class="flex items-baseline">
                  <i class="ml-4 text-lg bx bx-revision"></i>
                </button>
              </div>
              <div class="w-4/12 p-2">
                <button
                  id="AllfilterTrig"
                  @click="showDrop()"
                  class="bg-white border py-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-30dvh overflow-y-auto"
                  type="button"
                >
                  {{ buttonText }}
                </button>
                <!-- Dropdown menu -->
                <div
                  id="allListFilter"
                  class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700"
                >
                  <div class="p-3">
                    <label for="input-group-search" class="sr-only"
                      >Search</label
                    >
                    <div class="relative">
                      <div
                        class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
                      >
                        <svg
                          class="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="input-group-search"
                        class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search listing"
                        v-model="searchQuery"
                      />
                    </div>
                  </div>
                  <ul
                    class="h-40 px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                    aria-labelledby="dropdownSearchButton"
                  >
                    <li
                      v-for="listing in filteredListings"
                      :key="listing.job_id"
                    >
                      <div
                        @click.prevent="filterListing(listing.job_id)"
                        class="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                      >
                        {{ listing.job_title }}
                      </div>
                    </li>
                  </ul>
                  <a
                    href="#"
                    class="flex items-center p-3 text-xs font-medium text-bg-[#044013] border-t border-gray-200 rounded-b-lg bg-gray-50"
                  >
                    <img
                      src="/assets/logo.png"
                      class="h-4 mx-4"
                      alt="Ciraq Logo"
                    />
                    Powered by ciraq inc
                  </a>
                </div>
              </div>
            </div>

            <ul
              key="new-listings"
              class="h-[76dvh] p-2 max-h-[76dvh] overflow-y-auto my-auto"
            >
              <li
                v-for="applicant in filteredApplicants"
                :key="applicant.application_id"
                @click="viewApplicant(applicant)"
              >
                <div
                  class="flex my-1 rounded-lg bg-white border border-gray-400 px-[10px] flex-col w-full sm:w-full text-[10px] sm:text-xs z-50"
                >
                  <div
                    class="cursor-default flex items-center justify-between w-full h-12 sm:h-14"
                  >
                    <div class="flex gap-2">
                      <div
                        class="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg"
                      >
                        <div
                          v-if="applicant.profile_img"
                          :style="{
                            backgroundImage: `url(https://ciraq.co/api/public/uploads/profile_images/${applicant.profile_img})`,
                          }"
                          class="mx-auto flex justify-center w-8 h-8 bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                        ></div>
                        <div
                          v-else
                          class="mx-auto flex justify-center items-center w-8 h-8 bg-blue-300/20 rounded-full text-lg font-bold"
                        >
                          {{
                            initialsFromName(applicant.fname, applicant.lname)
                          }}
                        </div>
                      </div>
                      <div>
                        <p class="text-[#132E35] font-bold">
                          {{ applicant.fname }} {{ applicant.lname }}
                        </p>
                        <p class="text-gray-500 pt-1">
                          {{ applicant.program_offered }}
                        </p>
                      </div>
                    </div>
                    <button
                      class="text-gray-600 hover:bg-white/10 p-1 rounded-md transition-colors ease-linear"
                    >
                      <!-- <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        ></path>
                      </svg> -->
                    </button>
                  </div>

                  <div class="pb-2 flex">
                    <button
                      disabled
                      class="w-full mr-4 inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-2 rounded-lg"
                    >
                      <i class="bx bx-briefcase"></i> &nbsp;
                      {{ applicant.job_title }}
                    </button>
                    <button
                      disabled
                      class="w-full inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-2 rounded-lg"
                    >
                      <i class="bx bx-calendar"></i> &nbsp;
                      {{ timePast(applicant.appl_timestamp) }}
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- other half -->
          <div
            v-if="!isMobile || (isMobile && !showLeft)"
            class="bg-white md:col-span-8 grid grid-rows-[1fr] h-[80dvh] overflow-y-auto rounded-2xl"
          >
            <transition name="fade" mode="out-in">
              <div>
                <div v-if="selectedUser && !isLoading">
                  <ProfileView :selectedUser="selectedUser" />
                </div>
                <div
                  v-else
                  key="empty-state"
                  class="grid grid-rows-[1fr] max-h-[80dvh] h-[80dvh]"
                >
                  <div
                    class="bg-white flex justify-center items-center overflow-hidden animate-zoom"
                  >
                    <LoadScreen />
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import useModal from "@/composables/useModal";
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore.js";
import { useMainStore } from "~/stores/main";

import { useEmployerAuth } from "~/stores/employerAuth";
const mainStore = useMainStore();
const employerAuth = useEmployerAuth();

import { useFormatDate } from "@/composables/useFormatDate";
const { formatDate, currentYear, initialsFromName, timePast } = useFormatDate();
const { hideModal, showModal, showClosableModal } = useModal();

const selectedJob = ref({});
const selectedJobId = ref(null);
const isLoading = ref(false);
const isMobile = ref(false);
const showLeft = ref(true);

const filteredApplicants = computed(() => {
  if (selectedJobId.value === null) {
    return getApplicants.value;
  } else {
    return getApplicants.value.filter(
      (applicant) => applicant.job_id === selectedJobId.value
    );
  }
});

const filterListing = (jobId) => {
  selectedJobId.value = jobId;
  console.log(selectedJobId.value);
};

const selectedUser = ref(null);
const viewApplicant = async (n) => {
  //fetch user
  isLoading.value = true;
  try {
    selectedUser.value = {};

    const response = await fetch(
      `${mainStore.urlbase}company/user/${n.user_id}`,
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
      selectedUser.value = {
        ...responseData.data,
        application_id: n.application_id,
        job_title: n.job_title,
        status: n.appl_status,
        coverLetter: n.cover_letter,
      };
      isLoading.value = false;
      console.log(selectedUser.value);
      if (isMobile.value) {
        showLeft.value = false;
      }
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

const applicantDetails = ref(null);

const modalStore = useModalStore();
const closeModal = (n) => {
  const modalId = n;
  hideModal(modalId);
};

const applicants = ref([]);

const { showDropDown, hideDropDown } = useDropDown();
const showDrop = (n, a) => {
  const dropDownId = "allListFilter";
  const trigId = "AllfilterTrig";
  showDropDown(dropDownId, trigId);
};

import { useApplicantStore } from "@/stores/newApplicants";
import { storeToRefs } from "pinia";

const newApplicantStore = useApplicantStore();
const { getApplicants, getApplicantsLength, getIsLoading } =
  storeToRefs(newApplicantStore);

const searchQuery = ref("");
const buttonText = ref("All Listings");
const filteredListings = computed(() =>
  getApplicants.value.filter((item) =>
    (item.job_title?.toLowerCase() || "").includes(
      searchQuery.value.toLowerCase()
    )
  )
);

const refreshApplicants = () => {
  newApplicantStore.loadNewApplicants();
};

onMounted(() => {
  handleResize();
  refreshApplicants();

  watchEffect(() => {
    filteredListings.value;
  });
});

const handleResize = () => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  if (!isMobile.value) {
    showLeft.value = true; // Reset to show message list on larger screens
  }
};
onMounted(() => {
  handleResize();
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>