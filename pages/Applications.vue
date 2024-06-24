<template>
  <div
    class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl grid grid-rows-[1fr] h-[85svh] max-h-[85svh] min-h-[85svh] overflow-hidden"
  >
    <div class=" md:flex no-wrap md:-mx-1">
      <!--  List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showJobList)"
        class="w-full md:w-4/12 md:mx-1 grid grid-rows-[[7svh]_1fr] h-[85svh] max-h-[85svh] min-h-[85svh]"
      >
        <div class="flex m-2">
          <!-- search input -->
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

            <button @click="loadAllListings" class="bg-white border border-gray-300 rounded-lg ml-2 px-2 text-[#044013]">
              <i class="text-lg bx bx-revision"></i>
            </button>
        </div>
        <ul v-if="!isLoading" class="h-77svh] max-h-[77svh] min-h-[77svh] overflow-y-auto my-auto pb-[10vh]">
  <li v-for="job in searchResults" :key="job.id" @click="selectListing(job)">
            <div class="card p-4 bg-white">
              <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                  <img
                    class="w-10 h-10 rounded-lg"
                    src="../assets/knustlogo.png"
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
              <div class="flex mt-2 ">
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
    'bg-yellow-300 text-white': job.appl_status === 'offered',
    'bg-purple-500 text-white': job.appl_status === 'shortlisted',
    'bg-green-500 text-white': job.appl_status === 'hired',
    'bg-red-500 text-white': job.appl_status === 'rejected',
    'bg-[#044013] text-white': job.appl_status !== 'pending' && job.appl_status !== 'offered' && job.appl_status !== 'shortlisted' && job.appl_status !== 'hired'
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
          class="flex justify-center items-center h-[77svh] max-h-[77svh] min-h-[77svh]"
        >
          <div class="loader"></div>
        </div>
      </div>

      <!--  Body (visible on mobile) -->
            <div
        v-if="!isMobile || (isMobile && !showJobList)"
        class="md:w-8/12 md:mx-1 grid grid-rows-[1fr] h-[85svh] max-h-[85svh] min-h-[85svh] overflow-hidden"
      >
        <div
          v-if="selectedListing"
          class="m-2 bg-white rounded-xl overflow-hidden"
        >
          <AppliedListing
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAuthStore } from '~/stores/authStore';
import { useMainStore } from "../stores/main";
import { useFormatDate } from "@/composables/useFormatDate";
const { formatDate } = useFormatDate();
const searchResults = ref([]);
const listings = ref([]);
const selectedStatus = ref('');
const authStore = useAuthStore();
const mainStore = useMainStore();

definePageMeta({
  layout: "mobile",
  middleware: ["unauthstd"],
});
useHead({
  title: "Applications",
  meta: [{ name: "jobs you've applied for", content: "Student job list" }],
});

const selectedListing = ref(null);
const isMobile = ref(false);
const showJobList = ref(true);

const user = computed(() => useAuthStore().user);

const selectListing = (job) => {
  console.log("selected job", job);
  selectedListing.value = job;

  if (isMobile.value) {
    showJobList.value = false;
  }
};

const isLoading = ref(false);
const loading = ref(false);


const loadJobsMobile = () => {
  if (isMobile.value) {
    showJobList.value = true;
  }
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  if (!isMobile.value) {
    showJobList.value = true; // Reset to show message list on larger screens
  }
};

const loadAllListings = async () => {
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
  if (selectedStatus.value === '') {
    searchResults.value = listings.value;
  } else {
    searchResults.value = listings.value.filter(job => job.appl_status === selectedStatus.value);
  }
};

watch(selectedStatus, filterListings);

// Add this watch effect
watch(listings, (newListings) => {
  if (selectedStatus.value === '') {
    searchResults.value = newListings;
  } else {
    filterListings();
  }
});

onMounted(() => {
  loadAllListings();
  isMobile.value = window.innerWidth < 768;
  window.addEventListener('resize', handleResize);
});


onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

</script>


<style scoped>

.card {
  width: 95%;
  border-radius: 1rem;
  margin: 0.5rem auto;
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
</style>
