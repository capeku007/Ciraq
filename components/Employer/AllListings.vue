<template>
  <div>
    <!-- MODALS HERE -->
    <!-- View listing -->
    <div
      id="viewListing"
      data-modal-target="viewListing"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
    >
      <div
        class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <i
          @click="closeModal('viewListing')"
          class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 z-20 text-2xl text-gray-400 hover:text-red-600"
        ></i>

        <!-- TODO: UPDATE TO  -->
        <JobDetails :selectedJob="selectedJob" />
      </div>
    </div>

    <!-- Update listing status -->
    <div
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
          class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
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
                <label for="input-group-search" class="sr-only">Search</label>
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
                <li v-for="listing in filteredListings" :key="listing.job_id">
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
                <img src="/assets/logo.png" class="h-4 mx-4" alt="Ciraq Logo" />
                Powered by ciraq inc
              </a>
            </div>
          </div>
        </div>
        <div class="overflow-y-auto h-[68dvh]">
          <div v-if="getIsLoading">
            <LoadScreen />
          </div>
          <div v-else>
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="sticky top-0 bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">Applicants</th>
                  <th scope="col" class="px-6 py-3">Status</th>
                  <th scope="col" class="px-6 py-3">Deadline</th>
                  <th scope="col" class="px-6 py-3">Manage</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="bg-white border-b hover:bg-gray-50"
                  v-for="listing in getListings"
                  :key="listing.id"
                >
                  <th
                    scope="row"
                    class="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap"
                  >
                    <div class="text-base font-semibold">
                      {{ listing.job_title }}
                    </div>
                  </th>
                  <td class="px-6 py-1">{{ listing.num_applicants }}</td>
                  <td class="px-6 py-1">{{ listing.listing_status }}</td>
                  <td class="px-6 py-1">
                    {{ formatDate(listing.application_deadline) }}
                  </td>
                  <td>
                    <button
                      @click="openListing(listing.job_id)"
                      type="button"
                      class="text-center inline-flex items-center px-3 py-2 text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm"
                    >
                      <i class="bx bx-briefcase pr-2"></i>
                      View Listing
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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
const selectedJob = ref({});
const isLoading = ref(false);

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
      isLoading.value = false;
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
</script>