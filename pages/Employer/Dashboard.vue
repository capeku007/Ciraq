<template>

  <div class="min-h-[87svh] max-h-[87svh] grid grid-rows-[12svh_1fr]">
    <div class="flex bg-white flex-wrap rounded-lg">
      <div class="w-4/12 p-2">
        <button
          id="filterTrig"
          @click="showDrop()"
          class="bg-white border py-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-30svh overflow-y-auto"
          type="button"
        >
          {{ buttonText }}
        </button>
        <!-- Dropdown menu -->
        <div
          id="dropdownSearch"
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
            <li v-for="listing in filteredListings" :key="listing.name">
              <div
                @click.prevent="selectListing(listing)"
                class="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              >
                {{ listing.name }}
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
      <div class="w-2/12 p-2">
        <div
          class="flex border-2 rounded-lg py-2 px-4 w-full"
          @click="selectItem(1)"
        >
          <div class="flex-1 min-w-0">
            <p class="text-xs font-normal text-gray-500 truncate">Listings</p>
            <p class="text-2xl font-semibold truncate">19</p>
          </div>

          <div class="flex-shrink-0">
            <i
              class="border-2 p-2 rounded-full bx bx-briefcase-alt text-2xl block"
            ></i>
          </div>
        </div>
      </div>
      <div class="w-2/12 p-2">
        <div
          class="flex border-2 rounded-lg py-2 px-4 w-full"
          @click="selectItem(2)"
        >
          <div class="flex-1 min-w-0">
            <p class="text-xs font-normal text-gray-500 truncate">
              Applicants
            </p>
            <p class="text-2xl font-semibold truncate">19</p>
          </div>

          <div class="flex-shrink-0">
            <i
              class="border-2 p-2 rounded-full bx bx-group text-2xl block"
            ></i>
          </div>
        </div>
      </div>
      <div class="w-2/12 p-2">
        <div
          class="flex border-2 rounded-lg py-2 px-4 w-full"
          @click="selectItem(3)"
        >
          <div class="flex-1 min-w-0">
            <p class="text-xs font-normal text-gray-500 truncate">Shortlisted</p>
            <p class="text-2xl font-semibold truncate">19</p>
          </div>

          <div class="flex-shrink-0">
            <i
              class="border-2 p-2 rounded-full bx bx-user-plus text-2xl block"
            ></i>
          </div>
        </div>
      </div>
      <div class="w-2/12 p-2">
        <div
          class="flex border-2 rounded-lg py-2 px-4 w-full"
          @click="selectItem(4)"
        >
          <div class="flex-1 min-w-0">
            <p class="text-xs font-normal text-gray-500 truncate">
              Hired
            </p>
            <p class="text-2xl font-semibold truncate">19</p>
          </div>

          <div class="flex-shrink-0">
            <i
              class="border-2 p-2 rounded-full bx bx-user-check text-2xl block"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white mt-4 rounded-lg" v-if="showDiv === 1">
      <div>
        <AllListings/>
      </div>
    </div>
    <div class="bg-white mt-4 rounded-lg" v-if="showDiv === 2">
<AllApplicants/>
    </div>
    <div v-if="showDiv === 3"><ShortListApplicants/></div>
    <div v-if="showDiv === 4">4</div>
  </div>
</template>
<script setup>
import useModal from '@/composables/useModal';
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore.js";

// component import
import AllApplicants from "@/components/Employer/AllApplicants.vue"
import AllListings from "@/components/Employer/AllListings.vue"
import ShortListApplicants from "@/components/Employer/ShortListApplicants.vue"
// component import
const modalStore = useModalStore();

useHead({
  title: "Dashboard",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  middleware: ["unauthemp"],
  layout: "company",
});

const showDiv = ref(1);

const selectItem = (index) => {
  showDiv.value = index;
};


const { hideModal, showClosableModal } = useModal();

// filter listing
const { showDropDown, hideDropDown } = useDropDown();

const showDrop = (n, a) => {
  const dropDownId = "dropdownSearch";
  const trigId = "filterTrig";
  showDropDown(dropDownId, trigId);
};

const campusSearch = ref("All");
const disableRoam = ref(false);
const buttonText = ref("All Listings");

// filter the search and show suggested universities for the user to select before enabling the roam button
const listings = [
  {
    name: "University of Ghana",
    abbreviation: "UG",
    mailFormat: "username@ug.edu.gh",
  },
  {
    name: "Kwame Nkrumah University of Science and Technology",
    abbreviation: "KNUST",
    mailFormat: "username@st.knust.edu.gh",
  },
  {
    name: "University of Cape Coast",
    abbreviation: "UCC",
    mailFormat: "username@ucc.edu.gh",
  },
  // Add more universities with their mail formats
];

const searchQuery = ref("");
const selectedlisting = ref(null);

const filteredListings = computed(() =>
  listings.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.abbreviation.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const selectlisting = (n) => {
  selectedUniversity.value = n;
  buttonText.value = n.abbreviation;
};

onMounted(() => {});

onBeforeUnmount(() => {});
</script>
