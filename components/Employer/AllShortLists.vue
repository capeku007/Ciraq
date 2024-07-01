<template>
  <div>
    <!-- MODALS HERE -->
    <div
      id="viewApplicantModal"
      data-modal-target="viewApplicantModal"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
    >
    <div
        class="relative p-2 bg-white rounded-2xl w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >  <i
            @click="hideModal('viewApplicantModal')"
            class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 z-20 text-2xl text-gray-400 hover:text-red-600"
          ></i>

        <!-- TODO: UPDATE TO  -->
        <ProfileView :selectedUser="selectedUser" />
      </div>
    </div>

    <!-- APPLICATION STATUS UPDATE -->
    <div
      id="updateApplicantStatusModal"
      data-modal-target="updateApplicantStatusModal"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
    >
      <div
        class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <div class="relative">
          <i
            @click="closeModal('updateApplicantStatusModal')"
            class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"
          ></i>

          <div class=""
    v-if="applicantDetails">
            <div class="mx-auto rounded-lg overflow-hidden">
              <div class="bg-white rounded-2xl p-4 shadow-md mb-12">
                <div class="content">
                  <div class="flex items-center mb-4">
                    <div class="mr-4">
                      <div
                        v-if="applicantDetails.profile_img"
                        :style="{
                          backgroundImage: `url(https://ciraq.co/api/public/uploads/profile_images/${applicantDetails.profile_img})`,
                        }"
                        class="mx-auto flex justify-center w-[80px] h-[80px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                      ></div>
                      <div
                        v-else
                        class="mx-auto flex justify-center items-center w-[80px] h-[80px] bg-blue-300/20 rounded-full text-4xl font-bold"
                      >
                        {{
                          initialsFromName(
                            applicantDetails.fname,
                            applicantDetails.lname
                          )
                        }}
                      </div>
                    </div>
                    <div>
                      <p class="text-lg font-bold">
                        {{ applicantDetails.fname }}
                        {{ applicantDetails.lname }}
                      </p>
                      <p class="text-sm text-gray-600">
                        <span class="mr-3">{{
                          applicantDetails.program_offered
                        }}</span>
                        <span
                          class="mr-3 border-r border-gray-200 max-h-0"
                        ></span>
                        <span>{{ applicantDetails.institution_name }}</span>
                      </p>
                      <p class="text-sm text-gray-600">
                        {{ formatDate(applicantDetails.start_date) }} |
                        {{ currentYear(applicantDetails.start_date) }}
                      </p>
                      <p class="text-sm text-gray-600"></p>
                    </div>
                  </div>
                  <div class="text-left mb-6">
                    <p class="text-lg font-bold mb-2">
                      Job Title: {{ applicantDetails.job_title }}
                    </p>
                    <p class="text-sm text-gray-600">
                      {{ applicantDetails.cover_letter }}
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
                      @click="updateApplicant('offer-extended')"
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
    </div>
    <!-- MODALS END HERE -->

    <div>
      <div class="relative overflow-x-auto shadow-md srounded-lg p-2">
        <div
          class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
        >
          <div class="flex items-center text-base font-semibold ml-4">
            <p>Shortlisted Applicants</p>
            <button @click="refreshApplicants" class="flex items-baseline">
              <i class="ml-4 text-lg bx bx-revision"></i>
            </button>
          </div>
          <div class="w-4/12 p-2">
            <button
              id="AllfilterTrig"
              @click="showDrop()"
              class="bg-white border py-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-30svh overflow-y-auto"
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
                <img src="/assets/logo.png" class="h-4 mx-4" alt="Ciraq Logo" />
                Powered by ciraq inc
              </a>
            </div>
          </div>
        </div>
        <div class="overflow-y-auto h-[73svh]">
          <div v-if="getIsLoading || isLoading">
            <LoadScreen />
          </div>
          <div v-else>
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="sticky top-0 bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3">Name</th>
                  <th scope="col" class="px-6 py-3">School</th>
                  <th scope="col" class="px-6 py-3">Listing</th>
                  <th scope="col" class="px-6 py-3">Status</th>
                  <th scope="col" class="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="applicant in filteredApplicants"
                  :key="applicant.application_id"
                  class="bg-white border-b hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    class="flex items-center px-6 py-1 text-gray-900 whitespace-nowrap"
                    @click="viewApplicant(applicant)"
                  >
                                        <div class="mr-4">
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
                          initialsFromName(
                            applicant.fname,
                            applicant.lname
                          )
                        }}
                      </div>
                    </div>
                    <div class="ps-3">
                      <div class="text-base font-semibold">
                        {{ applicant.fname }} {{ applicant.lname }}
                      </div>
                      <div class="font-normal text-gray-500">
                        {{ applicant.program_offered }}
                      </div>
                    </div>
                  </th>
                  <td class="px-6 py-1">{{ applicant.institution_name }}</td>
                  <td class="px-6 py-1">{{ applicant.job_title }}</td>
                  <td class="px-6 py-1">{{ applicant.appl_status }}</td>
                  <td class="px-6 py-1">
                    <button
                      type="button"
                      @click="openApplication(applicant)"
                      class="text-center inline-flex items-center px-3 py-1 text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm"

                    >
                    Update
                    <i class='ml-2 bx bx-edit-alt'></i>
                      
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- View Applicant -->
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
const { formatDate, currentYear, initialsFromName } = useFormatDate();
const { hideModal, showModal, showClosableModal } = useModal();


const selectedJobId = ref(null);
const isLoading = ref(false);

const filteredApplicants = computed(() => {
  if (selectedJobId.value === null) {
    return getShortlistApplicants.value;
  } else {
    return getShortlistApplicants.value.filter(applicant => applicant.job_id === selectedJobId.value);
  }
});

const filterListing = (jobId) => {
  selectedJobId.value = jobId;
  console.log(selectedJobId.value)
};

const selectedUser = ref({});
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
      console.log(" response", responseData);
      selectedUser.value = responseData.data;
      console.log(" selected user fetched", selectedUser.value);
        isLoading.value = false;
      const modalId = "viewApplicantModal";
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
  isLoading.value = false;
};

const applicantDetails = ref(null);

const openApplication = (n) => {
  // Initialize useModal composable
  // isLoading.value = true;
  console.log(n)
  applicantDetails.value = n;
  const modalId = "updateApplicantStatusModal";
  showModal(modalId);
  isLoading.value = false;
};

const modalStore = useModalStore();
const closeModal = (n) => {
  const modalId = n;
  hideModal(modalId);
};

const updateApplicant = (newStatus) => {
  // close modal
  const modalId = "updateApplicantStatusModal";
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
            Authorization: employerAuth.ctoken,
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
const { getShortlistApplicants, getShortlistsLength, getIsLoading } =
  storeToRefs(newApplicantStore);

const searchQuery = ref("");
const buttonText = ref("All Listings");
const filteredListings = computed(() =>
  getShortlistApplicants.value.filter((item) =>
    (item.job_title?.toLowerCase() || "").includes(
      searchQuery.value.toLowerCase()
    )
  )
);

const refreshApplicants = () => {
  newApplicantStore.loadAllShortlists();
};

onMounted(() => {
  refreshApplicants();

  watchEffect(() => {
    filteredListings.value;
  });
});
</script>