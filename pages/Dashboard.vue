<template>
  <div
    class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl grid grid-rows-[1fr] h-[90dvh] max-h-[90dvh] min-h-[90dvh] overflow-hidden"
  >
    <div class="md:flex no-wrap md:-mx-1">
      <!--  List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showJobList)"
        class="w-full md:w-4/12 md:px-1 grid grid-rows-[[7dvh]_76dvh_[7dvh]] h-[90dvh] max-h-[90dvh] min-h-[90dvh]"
      >
        <div class="p-2 h-[7dvh]">
          <!-- search input -->
          <transition name="fade" mode="out-in">
            <div
              v-if="selectedTab === 'new'"
              key="new-search"
              class="flex items-center max-w-lg mx-auto"
            >
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
<div class="relative mt-1">
            <input v-model="jobQuery" 
  type="text" 
  id="text" 
  class="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-xl hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors" 
  placeholder="Search listing...">
            <button @click="searchListings()" class="block w-7 h-7 text-center text-xl leading-0 absolute top-2 right-2 text-gray-600 focus:outline-none hover:text-gray-900 transition-colors"><i class='bx bx-search' ></i></button>
        </div>

              </div>
            </div>
            <div v-else key="apps-search" class="flex">
              <select
                v-model="selectedStatus"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">All applications</option>
                <option value="pending">Pending</option>
                <option value="offer-extended">Offers</option>
                <option value="accepted">Hired</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                @click="fetchApplications"
                class="bg-white border border-gray-300 rounded-lg ml-2 px-2 text-[#044013]"
              >
                <i class="text-lg bx bx-revision"></i>
              </button>
            </div>
          </transition>
          <!-- search input -->
        </div>
        <div class="h-[76dvh] max-h-[76dvh] min-h-[76dvh] overflow-hidden">
          <transition name="fade" mode="out-in">
            <ul
              v-if="!isLoading && selectedTab === 'new'"
              key="new-listings"
              class="h-[76dvh] max-h-[76dvh] min-h-[76dvh] overflow-y-auto my-auto"
            >
              <li
                v-for="job in listings"
                :key="job.id"
                @click="selectListing(job)"
              >
                <div class="card p-4 bg-white">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <img
                        class="w-10 h-10 rounded-lg"
                        :src="
                          job.company_logo
                            ? `https://ciraq.co/api/public/uploads/profile_images/${job.company_logo}`
                            : companyPlaceholder
                        "
                        alt="company image"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-normal text-gray-500 truncate">
                        {{ job.company_name }}
                      </p>
                      <p class="text-base font-semibold truncate">
                        {{ job.job_title }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse"
                  >
                    <span
                      class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
                    >
                      <i class="bx bx-briefcase-alt-2"></i>&nbsp;
                      {{ job.employment_type }}
                    </span>

                    <span
                      class="inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
                    >
                      <i class="bx bx-map"></i> &nbsp; {{ job.location_name }}
                    </span>
                    <span
                      class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
                    >
                      <i class="bx bx-money"></i>&nbsp;
                      {{ job.salary_compensation }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>

            <ul
              v-else-if="!isLoading && selectedTab === 'apps'"
              key="apps-listings"
              class="h-[76dvh] max-h-[76dvh] min-h-[76dvh] overflow-y-auto my-auto"
            >
              <li
                v-for="job in searchResults"
                :key="job.id"
                @click="selectAppliedListing(job)"
              >
                <div class="card p-4 bg-white">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <img
                        class="w-10 h-10 rounded-lg"
                        :src="
                          job.company_logo
                            ? `https://ciraq.co/api/public/uploads/profile_images/${job.company_logo}`
                            : companyPlaceholder
                        "
                        alt="company image"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-xs font-normal text-gray-500 truncate">
                        {{ job.company_name }}
                      </p>
                      <p class="text-base font-semibold truncate">
                        {{ job.job_title }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse"
                  >
                    <span
                      class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
                    >
                      <i class="bx bx-briefcase-alt-2"></i>&nbsp;
                      {{ job.employment_type }}
                    </span>

                    <span
                      class="inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
                    >
                      <i class="bx bx-map"></i> &nbsp; {{ job.location_name }}
                    </span>
                    <span
                      class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
                    >
                      <i class="bx bx-money"></i>&nbsp;
                      {{ job.salary_compensation }}
                    </span>
                  </div>
                  <div class="flex mt-2">
                    <button
                      class="w-full mr-4 inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
                    >
                      <i class="bx bx-calendar"></i> &nbsp;
                      {{ formatDate(job.appl_timestamp) }}
                    </button>

                    <button
                      class="w-full inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
                      :class="{
                        'bg-white text-gray-500 border border-gray-500':
                          job.appl_status === 'pending',
                        'bg-yellow-300 border':
                          job.appl_status === 'offer-extended',
                        'bg-purple-500 text-white':
                          job.appl_status === 'in-review',
                        'bg-green-500 text-white':
                          job.appl_status === 'accepted',
                        'bg-red-500 ': job.appl_status === 'rejected',
                        'bg-[#044013] ':
                          job.appl_status !== 'pending' &&
                          job.appl_status !== 'offered' &&
                          job.appl_status !== 'shortlisted' &&
                          job.appl_status !== 'hired',
                      }"
                    >
                      <i class="bx bx-loader-circle"></i> &nbsp;
                      {{ job.appl_status }}
                    </button>
                  </div>
                </div>
              </li>
            </ul>

            <div
              v-else
              key="loading"
              class="flex justify-center items-center h-[76dvh] max-h-[76dvh]"
            >
              <div class="loader"></div>
            </div>
          </transition>
        </div>

        <!-- FLOATING TOGGLE -->
        <div class="relative w-full py-1 px-2">
          <div class="flex relative bg-white p-1 rounded-full">
            <input
              type="radio"
              id="radio-new"
              name="tabs"
              class="hidden peer"
              :checked="selectedTab === 'new'"
              @change="toggleTab('new')"
            />
            <label
              for="radio-new"
              class="flex items-center justify-center h-10 w-[48%] mx-1 text-sm font-medium text-black rounded-full cursor-pointer transition-colors duration-150 ease-in peer-checked:text-blue-600 z-10 relative"
            >
              New Listings
              <span
                v-if="listings.length > 0"
                class="absolute -top-2 -right-2 bg-purple-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ listings.length }}
              </span>
            </label>

            <input
              type="radio"
              id="radio-apps"
              name="tabs"
              class="hidden peer"
              :checked="selectedTab === 'apps'"
              @change="toggleTab('apps')"
            />
            <label
              for="radio-apps"
              class="flex items-center justify-center h-10 w-[48%] mx-1 text-sm font-medium text-black rounded-full cursor-pointer transition-colors duration-150 ease-in peer-checked:text-blue-600 z-10 relative"
            >
              My Applications
              <span
                v-if="searchResults.length > 0"
                class="absolute -top-2 -right-2 bg-purple-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ searchResults.length }}
              </span>
            </label>

            <span
              class="glider absolute h-10 w-[48%] mx-1 bg-blue-100 rounded-full transition-transform duration-300 ease-out z-0"
            ></span>
          </div>
        </div>
      </div>

      <!--  Body (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && !showJobList)"
        class="md:w-8/12 md:mx-1 grid grid-rows-[1fr] h-[90dvh] max-h-[90dvh] min-h-[90dvh] overflow-hidden"
      >
        <transition name="fade" mode="out-in">
          <div>
            <div
              v-if="
                selectedTab === 'new' ? selectedListing : selectedAppliedListing
              "
            >
              <div
                v-if="selectedTab === 'new'"
                key="new-listing-info"
                class="m-2 overflow-hidden"
              >
                <ListingInfo
                  :selectedListing="selectedListing"
                  @loadJobsMobile="loadJobsMobile"
                />
              </div>
              <div
                v-else
                key="applied-listing-info"
                class="m-2 overflow-hidden"
              >
                <AppliedListing
                  :selectedListing="selectedAppliedListing"
                  @loadJobsMobile="loadJobsMobile"
                />
              </div>
            </div>
            <div
              v-else
              key="empty-state"
              class="grid grid-rows-[1fr] max-h-full h-full"
            >
              <div
                class="bg-white flex justify-center items-center overflow-hidden animate-zoom"
              >
                <img
                  src="/assets/logo.png"
                  class="h-64 animate-zoom overflow-hidden"
                  alt="Select a person"
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { useDebounce } from '@vueuse/core';
import { useListingStore } from "../stores/listingStore";
import { useAuthStore } from "../stores/authStore";
import { useMainStore } from "../stores/main";
import companyPlaceholder from "~/assets/images/companyPlace.jpg";
import { useFormatDate } from "@/composables/useFormatDate";

definePageMeta({
  layout: "mobile",
  middleware: ["unauthstd"],
});

useHead({
  title: "Dashboard",
  meta: [{ name: "jobs you've applied for", content: "Student job list" }],
});

const listingStore = useListingStore();
const { formatDate } = useFormatDate();
const authStore = useAuthStore();
const mainStore = useMainStore();

const listings = ref([]);
const searchResults = ref([]);
const selectedListing = ref(null);
const isMobile = ref(false);
const showJobList = ref(true);
const selectedStatus = ref("");
const selectedTab = ref("new");
const jobQuery = ref('');
const isLoading = ref(false);

const toggleTab = (tab) => {
  selectedTab.value = tab;
  console.log("Selected tab:", tab);
};

const selectListing = (job) => {
  console.log("selected job", job);
  selectedListing.value = job;

  if (isMobile.value) {
    showJobList.value = false;
  }
};

const selectedAppliedListing = ref(null);
const selectAppliedListing = (job) => {
  selectedTab.value = "apps";
  console.log("selected tab", selectedTab.value);
  console.log("selected job", job);
  selectedAppliedListing.value = job;

  if (isMobile.value) {
    showJobList.value = false;
  }
};

const loadJobsMobile = () => {
  if (isMobile.value) {
    showJobList.value = true;
  }
};

const searchListings = async () => {
  if (jobQuery.value.length < 3) {
    loadAllListings();
    return;
  }

  try {
    const response = await fetch(
      mainStore.urlbase + "appl/search-listing/" + jobQuery.value,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authStore.token,
        },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || "Failed to search for listings.");
    } else {
      console.log("Search completed successfully:", responseData);
      listings.value = responseData.data;
    }
  } catch (error) {
    console.error("Failed to search for listings:", error);
  }
};

const loadAllListings = async () => {
  isLoading.value = true;

  try {
    const response = await fetch(mainStore.urlbase + "alllistings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authStore.token,
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      listings.value = responseData.data;
    } else {
      console.error(
        "Error fetching listings:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Unable to load listings:", error);
  }

  isLoading.value = false;
};

const debouncedSearch = useDebounce(searchListings, 300);

watch(jobQuery, () => {
  debouncedSearch();
});

const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  if (!isMobile.value) {
    showJobList.value = true;
  }
};

const fetchApplications = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(mainStore.urlbase + "user-applications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authStore.token,
      },
    });
    if (response.ok) {
      const responseData = await response.json();
      listings.value = responseData.data;
      searchResults.value = responseData.data;
      console.log(listings.value);
    } else {
      console.error(
        "Error fetching listings:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Unable to load listing:", error);
  } finally {
    isLoading.value = false;
  }
};

const filterListings = () => {
  if (selectedStatus.value === "") {
    searchResults.value = listings.value;
  } else {
    searchResults.value = listings.value.filter(
      (job) => job.appl_status === selectedStatus.value
    );
  }
};

watch(selectedStatus, filterListings);

watch(listings, (newListings) => {
  if (selectedStatus.value === "") {
    searchResults.value = newListings;
  } else {
    filterListings();
  }
});

onMounted(() => {
  fetchApplications();
  loadAllListings();
  isMobile.value = window.innerWidth < 768;
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.search {
  display: inline-block;
  position: relative;
}

.search input[type="text"] {
  width: 200px;
  padding: 10px;
  border: none;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.search button[type="submit"] {
  background-color: #4e99e9;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  right: 0;
  transition: .9s ease;
}

.search button[type="submit"]:hover {
  transform: scale(1.1);
  color: rgb(255, 255, 255);
  background-color: blue;
}

#radio-new:checked ~ .glider {
  transform: translateX(0);
}
#radio-apps:checked ~ .glider {
  transform: translateX(calc(100% + 4px));
}

.card {
  width: 95%;
  border-radius: 1rem;
  border: 1px solid #0065651f;
  margin: 0.5rem auto;
}
.card2 {
  min-width: 96%;
  max-width: 96%;
  border-radius: 1rem;
  border: 1px solid #0065651f;
  background-color: #fff;
  height: 81vh;
  overflow-y: auto;
  padding-bottom: 10vh;
}

.card:hover {
  cursor: pointer;
}

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

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition */
</style>
