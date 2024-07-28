<template>
  <div
    class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl grid grid-rows-[1fr] h-[83dvh] max-h-[85dvh] min-h-[85dvh] overflow-hidden"
  >
    <div class="md:flex no-wrap md:-mx-1">
      <!--  List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showJobList)"
        class="w-full md:w-4/12 md:mx-1 grid grid-rows-[[7dvh]_1fr_[7dvh]] h-[85dvh] max-h-[85dvh] min-h-[85dvh]"
      >
        <div class="m-2">
          <!-- search input -->
          <transition name="fade" mode="out-in">
            <div
              v-if="selectedTab === 'new'"
              key="new-search"
              class="flex items-center max-w-lg mx-auto"
            >
              <label for="voice-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div
                  class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                  <i
                    class="bx bx-search w-4 h-4 text-gray-500"
                    aria-hidden="true"
                  ></i>
                </div>
                <input
                  type="text"
                  id="voice-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Temp tasks, keywords, or company"
                  v-model="jobQuery"
                />

                <button
                  @click="searchUser()"
                  type="button"
                  class="absolute inset-y-0 end-0 flex items-center pe-2"
                >
                  <i
                    class="bx bx-search inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-3xl border border-blue-700"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
            <div v-else key="apps-search" class="flex">
              <select
                v-model="selectedStatus"
                class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">All applications</option>
                <option value="pending">Pending</option>
                <option value="offered">Accepted</option>
                <option value="hired">Hired</option>
                <option value="rejected">Rejected</option>
                <option value="shortlisted">Offers</option>
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
        <div class="h-[71dvh] max-h-[71dvh] min-h-[71dvh] overflow-hidden">
          <transition name="fade" mode="out-in">
            <ul
              v-if="!isLoading && selectedTab === 'new'"
              key="new-listings"
              class="h-[71dvh] max-h-[71dvh] min-h-[71dvh] overflow-y-auto my-auto"
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
              class="h-71dvh] max-h-[71dvh] min-h-[71dvh] overflow-y-auto my-auto pb-[10vh]"
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
                      disabled
                      class="mr-4 px-2.5 py-1 text-[#044013] bg-white border-2 border-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                      {{ formatDate(job.appl_timestamp) }}
                    </button>

                    <button
                      disabled
                      class="border-0 px-2.5 py-1 rounded-lg text-left text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      :class="{
                        'bg-white text-gray-500': job.appl_status === 'pending',
                        'bg-yellow-300 text-white':
                          job.appl_status === 'offered',
                        'bg-purple-500 text-white':
                          job.appl_status === 'shortlisted',
                        'bg-green-500 text-white': job.appl_status === 'hired',
                        'bg-red-500 text-white': job.appl_status === 'rejected',
                        'bg-[#044013] text-white':
                          job.appl_status !== 'pending' &&
                          job.appl_status !== 'offered' &&
                          job.appl_status !== 'shortlisted' &&
                          job.appl_status !== 'hired',
                      }"
                    >
                      Status: {{ job.appl_status }}
                    </button>
                  </div>
                </div>
              </li>
            </ul>

            <div
              v-else
              key="loading"
              class="flex justify-center items-center h-[71dvh] max-h-[71dvh]"
            >
              <div class="loader"></div>
            </div>
          </transition>
        </div>

        <!-- FLOATING TOGGLE -->
        <div class="relative w-full h-[7dvh]">
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
                class="absolute -top-2 -right-2 bg-purple-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
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
                class="absolute -top-2 -right-2 bg-purple-700 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
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
        class="md:w-8/12 md:mx-1 grid grid-rows-[1fr] h-[85dvh] max-h-[85dvh] min-h-[85dvh] overflow-hidden"
      >
        <transition name="fade" mode="out-in">
          <div>
            <div
              v-if="selectedListing && selectedTab === 'new'"
              key="listing-info"
              class="m-2 bg-white rounded-xl overflow-hidden"
            >
              <ListingInfo
                :selectedListing="selectedListing"
                @loadJobsMobile="loadJobsMobile"
              />
            </div>
            <div
              v-if="selectedListing && selectedTab === 'apps'"
              key="listing-info"
              class="m-2 bg-white rounded-xl overflow-hidden"
            >
              <AppliedListing
                :selectedListing="selectedAppliedListing"
                @loadJobsMobile="loadJobsMobile"
              />
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
import { useListingStore } from "../stores/listingStore";
import { useAuthStore } from "../stores/authStore";
import { useMainStore } from "../stores/main";
import companyPlaceholder from "~/assets/images/companyPlace.jpg";

definePageMeta({
  layout: "mobile",
  middleware: ["unauthstd"],
});
useHead({
  title: "Dashboard",
  meta: [{ name: "jobs you've applied for", content: "Student job list" }],
});

const listingStore = useListingStore();
const authStore = useAuthStore();
const mainStore = useMainStore();
const listings = ref([]);
const searchResults = ref([]);
const selectedListing = ref(null);
const isMobile = ref(false);
const showJobList = ref(true);

const selectedStatus = ref("");
const selectedTab = ref("new");

const toggleTab = (tab) => {
  selectedTab.value = tab;
  // You can add any additional logic here when the tab changes
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

const jobQuery = ref("");

const searchUser = async () => {
  try {
    const response = await fetch(
      mainStore.urlbase + "listing/search/" + jobQuery.value,
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
      throw new Error(responseData.message || "Failed to search for users.");
    } else {
      console.log("Search completed successfully:", responseData);

      // Assuming the API returns an array of users in responseData.data
      listings.value = responseData.data;
    }
  } catch (error) {
    console.error("Failed to search for users:", error);
  }
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  if (!isMobile.value) {
    showJobList.value = true; // Reset to show message list on larger screens
  }
};

const isLoading = ref(false);

const loadAllListings = async () => {
  isLoading.value = true; // Set loading state to true before fetching data

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
    console.error("Unable to load listing:", error);
  }

  isLoading.value = false; // Set loading state to false after fetching data
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
      searchResults.value = responseData.data; // Initialize searchResults here
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

// Add this watch effect
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
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
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
