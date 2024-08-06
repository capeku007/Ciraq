<template>
  <div>
    <!-- MODALS HERE -->
    <!-- Update listing status -->
    <div
    v-if="selectedJob"
      id="updateListingStatus"
      data-modal-target="updateListingStatus"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
    >
      <div
        class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <i
          @click="closeModal('updateListingStatus')"
          class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 z-20 text-2xl text-gray-400 hover:text-red-600"
        ></i>

        <!-- TODO: UPDATE TO  -->
        <div class="">
          <div class="mx-auto rounded-lg overflow-hidden">
            <div class="bg-white rounded-2xl p-4 shadow-md mb-12">
              <div class="content">
                <div class="flex items-center mb-4">
                  <div class="mr-4">
                    <div
                      style="backgroundimage: `url(../assets/knustlogo.png) `"
                      class="mx-auto flex justify-center items-center w-[80px] h-[80px] bg-blue-300/20 rounded-full text-4xl font-bold"
                    ></div>
                  </div>
                  <div>
                    <p class="text-lg font-bold">
                      {{ selectedJob.company_name }}
                    </p>
                    <p class="text-sm text-gray-600">
                      <span class="mr-3">{{ selectedJob.location_name }}</span>
                      <span
                        class="mr-3 border-r border-gray-200 max-h-0"
                      ></span>
                      <span>{{ selectedJob.deadline }}</span>
                    </p>

                    <p class="text-sm text-gray-600"></p>
                  </div>
                </div>
                <div class="text-left mb-6">
                  <p class="text-lg font-bold mb-2">
                    Job Title: {{ selectedJob.job_title }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ selectedJob.job_description }}
                  </p>
                </div>
                <div class="flex justify-around">
                  <button
                    @click="updateListStatus('rejected')"
                    class="w-2/6 bg-red-600 border text-white px-6 py-2 rounded-lg font-bold"
                  >
                    Reject
                  </button>
                  <button
                    @click="updateListStatus('in-review')"
                    class="w-2/6 mx-4 bg-blue-600 border text-white px-6 py-2 rounded-lg font-bold"
                  >
                    Shortlist
                  </button>
                  <button
                    @click="updateListStatus('offer-extended')"
                    class="w-2/6 bg-green-600 border text-white px-6 py-2 rounded-lg font-bold"
                  >
                    Make Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- MODALS END HERE -->

    <div>
      <div class="relative overflow-x-auto shadow-md rounded-lg p-2">
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
                <p>Listings</p>
                <button @click="refreshlisting" class="flex items-baseline">
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
                        @click.prevent="openListing(listing.job_id)"
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
                v-for="listing in getListings"
                :key="listing.id"
                @click="openListing(listing.job_id)"
              >
                <div
                  class="flex my-2 rounded-lg bg-white border border-gray-200 shadow px-[10px] flex-col w-full sm:w-full text-[10px] sm:text-xs z-50"
                >
                  <div
                    class="cursor-default flex items-center justify-between w-full h-12 sm:h-14"
                  >
                    <div class="flex gap-2">
                      <div
                        class="text-[#132E35] bg-white/5 backdrop-blur-xl p-1 rounded-lg"
                      >
                        <div
                          class="mx-auto flex justify-center items-center w-8 h-8 bg-blue-300/20 rounded-full text-lg font-bold"
                        >
                          <i class="bx bx-briefcase"></i>
                        </div>
                      </div>
                      <div>
                        <p class="text-[#132E35] font-bold">
                          {{ listing.job_title }}
                        </p>
                        <p class="text-gray-500 pt-1">
                          {{ listing.employment_type }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="pb-2 flex">
                    <button
                      disabled
                      class="w-full mr-4 inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-2 rounded-lg"
                    >
                      <i class="bx bx-group"></i> &nbsp;
                      {{ listing.num_applicants }}
                    </button>
                    <button
                      disabled
                      class="w-full inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-2 rounded-lg"
                    >
                      <i class="bx bx-calendar"></i> &nbsp;
                      {{ formatDate(listing.application_deadline) }}
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
                <div v-if="selectedJob && !isLoading">
                  <JobDetails :selectedJob="selectedJob" />
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
import { useFormatDate } from "@/composables/useFormatDate";
import { useEmployerListStore } from "@/stores/employerListStore";
import { storeToRefs } from "pinia";
import { useApplicantStore } from "@/stores/newApplicants";

const newApplicantStore = useApplicantStore();

const mainStore = useMainStore();
const employerAuth = useEmployerAuth();

const { formatDate } = useFormatDate();
const { hideModal, showClosableModal } = useModal();
const selectedJob = ref(null);
const isLoading = ref(false);
const isMobile = ref(false);
const showLeft = ref(true);

const openListing = async (listingId) => {
  try {
    // Reset selectedJob before fetching new data
    isLoading.value = true;
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
      console.log(" selected job fetched", selectedJob.value);
      const modalId = "viewListing";
      showClosableModal(modalId);
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

const modalStore = useModalStore();

const closeModal = (n) => {
  const modalId = n;
  hideModal(modalId);
};

const updateApplicant = (n) => {
  // close modal
  const modalId = "updateApplicantStatusModal";
  hideModal(modalId);

  console.log(n);
  let info = n + " username's application?";
  modalStore.changeDialog(info);
  let func = {};

  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      console.log("trying to run the function");
      // modalStore.showMessage("test het")
    } catch (error) {
      console.log(error);
    }
  };

  modalStore.OpenYesOrNOClick(func);
};

const updateListStatus = () => {
  hideModal("updateListingStatus");
  let info = "update " + selectedJob.job_title + "?";
  modalStore.changeDialog(info);
  let func = {};

  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      console.log("url", mainStore.urlbase + "listing/update/id");
      const response = await fetch(
        mainStore.urlbase + "listing/update-appl-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: employerAuth.ctoken,
          },
          body: JSON.stringify(selectedJob),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        applicants.value = responseData.data;
      } else {
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

const employerListStore = useEmployerListStore();
const { getListings, getListingsLength, getIsLoading } =
  storeToRefs(employerListStore);

// drop down filter
const { showDropDown, hideDropDown } = useDropDown();
const showDrop = (n, a) => {
  const dropDownId = "allListFilter";
  const trigId = "AllfilterTrig";
  showDropDown(dropDownId, trigId);
};

const searchQuery = ref("");
const buttonText = ref("All Listings");
const filteredListings = computed(() =>
  getListings.value.filter((item) =>
    (item.job_title?.toLowerCase() || "").includes(
      searchQuery.value.toLowerCase()
    )
  )
);

const refreshlisting = () => {
  employerListStore.loadAllListings();
};

onMounted(() => {
  employerListStore.loadAllListings();
  newApplicantStore.loadNewApplicants();

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