<template>
     <div class="md:flex no-wrap md:-mx-1">
      <!--  List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showJobList)"
        class="w-full md:w-4/12 md:mx-1 grid grid-rows-[[7dvh]_1fr] h-[85dvh] max-h-[85dvh] min-h-[85dvh]"
      >
        <div class="m-2">
          <!-- search input -->
          <div class="flex items-center max-w-lg mx-auto">
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
          <!-- search input -->
          <div class="flex justify-between my-1 space-x-3 rtl:space-x-reverse">
            <span class="inline-flex items-center text-sm px-2.5 py-0.5">
              recent postings
            </span>

            <span
              class="inline-flex items-center text-sm px-2.5 py-0.5 rounded-full"
            >
              {{ listings.length }} available
            </span>
          </div>
        </div>
        <ul
          v-if="!isLoading"
          class="h-[77dvh] max-h-[77dvh] min-h-[77dvh] overflow-y-auto my-auto pb-[10vh]"
        >
          <li v-for="job in listings" :key="job.id" @click="selectListing(job)">
            <div class="card p-4 bg-white">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <img
                    class="w-10 h-10 rounded-lg"
                    
  :src="job.company_logo ? `https://ciraq.co/api/public/uploads/profile_images/${job.company_logo}` : companyPlaceholder"
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
        <div
          v-else
          class="flex justify-center items-center h-[77dvh] max-h-[77dvh] min-h-[77dvh]"
        >
          <div class="loader"></div>
        </div>
      </div>

      <!--  Body (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && !showJobList)"
        class="md:w-8/12 md:mx-1 grid grid-rows-[1fr] h-[85dvh] max-h-[85dvh] min-h-[85dvh] overflow-hidden"
      >
        <div
          v-if="selectedListing"
          class="m-2 bg-white rounded-xl overflow-hidden"
        >
          <ListingInfo
            :selectedListing="selectedListing"
            @loadJobsMobile="loadJobsMobile"
          />
        </div>
        <div v-else class="grid grid-rows-[1fr] max-h-full h-full">
    <div class="bg-white flex justify-center items-center overflow-hidden animate-zoom">
      <!-- Display this when selectedPerson is null -->

      <img
        src="/assets/logo.png"
        class="h-64 animate-zoom overflow-hidden"
        alt="Select a person"
      />
      <!-- <p class="pt-4 text-2xl">Open a task for more info.</p> -->
    </div>
  </div>
        <!-- <div></div> -->
      </div>
    </div>
</template>

<script setup>
import { useListingStore } from "../stores/listingStore";
import { useAuthStore } from "../stores/authStore";
import { useMainStore } from "../stores/main";
import companyPlaceholder from '~/assets/images/companyPlace.jpg';

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
const selectedListing = ref(null);
const isMobile = ref(false);
const showJobList = ref(true);

const selectListing = (job) => {
  console.log("selected job", job);
  selectedListing.value = job;

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
        }
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
}

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

onMounted(() => {
  loadAllListings();
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.taskList {
  min-height: 71vh;
  max-height: 71vh;
  overflow-y: auto;
  padding-bottom: 20vh;
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

.vl {
  border-left: none;
  height: 500px;
}

.payCon {
  background-color: #bda472;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  color: #fff;
}

.textBox {
  width: calc(100% - 90px);
  margin-left: 10px;
  font-family: "Poppins" sans-serif;
}

.textContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.span {
  font-size: 10px;
}

.cardTitle {
  width: 100%;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
  padding: 0px;
  margin: 0;
}

.card:hover {
  cursor: pointer;
}

.payCon {
  background-color: #bda472;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  color: #fff;
}

.card:hover > .img {
  transition: 0.5s ease-in-out;
  background: linear-gradient(#9198e5, #712020);
}

.textBox {
  width: calc(100% - 90px);
  margin-left: 10px;
  font-family: "Poppins" sans-serif;
}

.textContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.span {
  font-size: 10px;
}

.top {
  position: relative;
  padding: 10px;
  /* height: 60px; */
}

.top:after {
  position: absolute;
  display: block;
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

</style>
