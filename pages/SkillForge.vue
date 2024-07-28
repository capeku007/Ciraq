<template>
  <div
    class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl grid grid-rows-[1fr] h-[85dvh] max-h-[85dvh] min-h-[85dvh] overflow-hidden"
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
            <div key="new-search" class="flex items-center max-w-lg mx-auto">
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
                  placeholder="Filter enquiries"
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
          </transition>
          <!-- search input -->
        </div>
        <div class="h-[71dvh] max-h-[71dvh] min-h-[71dvh] overflow-hidden">
          <transition name="fade" mode="out-in">
            <ul
              v-if="!isLoading && selectedTab === 'myEnq'"
              key="my-enquiries"
              class="h-[71dvh] max-h-[71dvh] min-h-[71dvh] overflow-y-auto my-auto pb-[10vh]"
            >
              <li
                v-for="enquiry in userEnquiries"
                :key="enquiry.id"
                @click="selectEnquiry(enquiry)"
              >
                <div class="card p-4 bg-white">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <img
                        class="w-10 h-10 rounded-lg"
                        :src="enquiry.countryFlag"
                        alt="country flag"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-base font-semibold truncate">
                        {{ enquiry.fieldOfStudy }}
                      </p>
                      <p class="text-xs font-normal text-gray-500 truncate">
                        {{ enquiry.country }}
                      </p>
                    </div>
                  </div>
                  <div
                    class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse"
                  >
                    <span
                      class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
                    >
                      <i class="bx bx-book"></i>&nbsp;
                      {{ enquiry.programLevel }}
                    </span>

                    <span
                      class="inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
                    >
                      <i class="bx bx-building"></i> &nbsp;
                      {{ enquiry.schoolType }}
                    </span>
                    <span
                      class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
                    >
                      <i class="bx bx-calendar"></i>&nbsp;
                      {{ formatDate(enquiry.createdAt) }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>

            <ul
              v-else-if=" selectedTab === 'newEnq'"
              key="newEnq-listings"
              class="h-71dvh] max-h-[71dvh] min-h-[71dvh] overflow-y-auto my-auto pb-[10vh]"
            >

            </ul>

            <div
              v-else
              key="loading"
              class="flex justify-center items-center h-[71dvh] max-h-[71dvh] min-h-[71dvh]"
            >
              <div class="loader"></div>
            </div>
          </transition>
        </div>

        <!-- FLOATING TOGGLE -->
        <div class="relative w-full">
          <div class="flex relative bg-white p-1 rounded-full">
            <input
              type="radio"
              id="radio-myEnq"
              name="tabs"
              class="hidden peer"
              :checked="selectedTab === 'myEnq'"
              @change="toggleTab('myEnq')"
            />
            <label
              for="radio-myEnq"
              class="flex items-center justify-center h-10 w-[48%] mx-1 text-sm font-medium text-black rounded-full cursor-pointer transition-colors duration-150 ease-in peer-checked:text-blue-600 z-10 relative"
            >
              My Enquiries
              <span
                v-if="userEnquiries.length > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
              >
                {{ userEnquiries.length }}
              </span>
            </label>

            <input
              type="radio"
              id="radio-newEnq"
              name="tabs"
              class="hidden peer"
              :checked="selectedTab === 'newEnq'"
              @change="toggleTab('newEnq')"
              @click="newEnquiry()"
            />
            <label
              for="radio-newEnq"
              class="flex items-center justify-center h-10 w-[48%] mx-1 text-sm font-medium text-black rounded-full cursor-pointer transition-colors duration-150 ease-in peer-checked:text-blue-600 z-10 relative"
            >
              New Enquiry
              <span
                v-if="searchResults.length > 0"
                class="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
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
          v-if="selectedEnquiry && selectedTab === 'myEnq'"
          key="enquiry-info"
          class="m-2 bg-white rounded-xl overflow-hidden"
        >
          <SelectedEnquiryView
            :enquiry="selectedEnquiry"
            @bidSelected="handleBidSelection"
          />
        </div>
            <div
              v-if="selectedTab === 'newEnq'"
              key="listing-info"
              class="m-2 bg-white rounded-xl overflow-hidden"
            >
              <NewEnquiry />
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
import { useAuthStore } from "../stores/authStore";
import { useMainStore } from "../stores/main";
import companyPlaceholder from "~/assets/images/companyPlace.jpg";

definePageMeta({
  layout: "mobile",
  //   middleware: ["unauthstd"],
});
useHead({
  title: "SkillForge",
  meta: [
    {
      name: "Further studies and skill builder",
      content: "School and program recommendation platform",
    },
  ],
});

const listings = ref([]);
const authStore = useAuthStore();
const mainStore = useMainStore();
const searchResults = ref([]);
const selectedListing = ref(null);
const isMobile = ref(false);
const showJobList = ref(true);

const selectedStatus = ref("");
const selectedTab = ref("newEnq");

const toggleTab = (tab) => {
  selectedTab.value = tab;
  // You can add any additional logic here when the tab changes
  console.log("Selected tab:", tab);
};

const userEnquiries = ref([
  {
    id: 1,
    country: "USA",
    countryFlag: "https://flagcdn.com/w40/us.png",
    fieldOfStudy: "Computer Science",
    programLevel: "Undergraduate",
    schoolType: "Public",
    createdAt: "2024-07-15T10:30:00Z",
    status: "Pending",
  },
  {
    id: 2,
    country: "UK",
    countryFlag: "https://flagcdn.com/w40/gb.png",
    fieldOfStudy: "Business Administration",
    programLevel: "Graduate",
    schoolType: "Private",
    createdAt: "2024-07-14T14:45:00Z",
    status: "Reviewing",
  },
  {
    id: 3,
    country: "Canada",
    countryFlag: "https://flagcdn.com/w40/ca.png",
    fieldOfStudy: "Environmental Science",
    programLevel: "Postgraduate",
    schoolType: "Any",
    createdAt: "2024-07-13T09:15:00Z",
    status: "Completed",
  },
  {
    id: 4,
    country: "Germany",
    countryFlag: "https://flagcdn.com/w40/de.png",
    fieldOfStudy: "Mechanical Engineering",
    programLevel: "Undergraduate",
    schoolType: "Public",
    createdAt: "2024-07-12T16:20:00Z",
    status: "Pending",
  },
]);


const selectedEnquiry = ref(null);

const selectEnquiry = (enquiry) => {
  console.log("Selected enquiry", enquiry);
  selectedEnquiry.value = enquiry;

  if (isMobile.value) {
    showJobList.value = false;
  }
};

const newEnquiry = (job) => {
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

const loadUserEnquiries = async () => {
  isLoading.value = true;
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In a real scenario, you would fetch the user's enquiries from an API
    // For now, we'll just use the dummy data
    listings.value = userEnquiries.value;
  } catch (error) {
    console.error("Unable to load user enquiries:", error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
onMounted(() => {
  loadUserEnquiries();
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
#radio-myEnq:checked ~ .glider {
  transform: translateX(0);
}
#radio-newEnq:checked ~ .glider {
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
