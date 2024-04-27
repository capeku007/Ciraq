<template>
  <div class="min-h-[87svh] max-h-[87svh] grid grid-rows-[12svh_1fr]">
<div class="flex bg-white flex-wrap rounded-lg">
  <div class="w-3/12 p-2">
    <label class="hover:text-white hover:bg-blue-500 flex border-2 rounded-lg py-2 px-4 w-full">
      <input type="radio" name="item" value="1" class="hidden" @change="selectItem(1)">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-normal truncate">Listings</p>
        <p class="text-2xl font-semibold truncate">19</p>
      </div>
      <div class="flex-shrink-0">
        <i class="bg-white text-blue-500 border-blue-500 border-2 p-2 rounded-full bx bx-briefcase-alt text-2xl block"></i>
      </div>
    </label>
  </div>

  <div class="w-3/12 p-2">
    <label class="hover:text-white hover:bg-purple-500 flex border-2 rounded-lg py-2 px-4 w-full">
      <input type="radio" name="item" value="2" class="hidden" @change="selectItem(2)">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-normal truncate">Applicants</p>
        <p class="text-2xl font-semibold truncate">19</p>
      </div>
      <div class="flex-shrink-0">
        <i class="bg-white text-purple-500 border-purple-500 border-2 p-2 rounded-full bx bx-group text-2xl block"></i>
      </div>
    </label>
  </div>

  <div class="w-3/12 p-2">
    <label class="hover:text-white hover:bg-yellow-300 flex border-2 rounded-lg py-2 px-4 w-full">
      <input type="radio" name="item" value="3" class="hidden" @change="selectItem(3)">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-normal truncate">Shortlisted</p>
        <p class="text-2xl font-semibold truncate">19</p>
      </div>
      <div class="flex-shrink-0">
        <i class="bg-white text-yellow-300 border-yellow-300 border-2 p-2 rounded-full bx bx-user-plus text-2xl block"></i>
      </div>
    </label>
  </div>

  <div class="w-3/12 p-2">
    <label class="hover:text-white hover:bg-green-600 flex border-2 rounded-lg py-2 px-4 w-full">
      <input type="radio" name="item" value="4" class="hidden" @change="selectItem(4)">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-normal truncate">Hired</p>
        <p class="text-2xl font-semibold truncate">19</p>
      </div>
      <div class="flex-shrink-0">
        <i class="bg-white text-green-600 border-green-600 border-2 p-2 rounded-full bx bx-user-check text-2xl block"></i>
      </div>
    </label>
  </div>
</div>

    <div class="bg-white mt-4 rounded-lg" v-if="showDiv === 1">
      <div>
        <AllListings />
      </div>
    </div>
    <div class="bg-white mt-4 rounded-lg" v-if="showDiv === 2">
      <AllApplicants />
    </div>
    <div v-if="showDiv === 3"><ShortListApplicants /></div>
    <div v-if="showDiv === 4">4</div>
  </div>
</template>
<script setup>
import useModal from "@/composables/useModal";
import { useModalStore } from "@/stores/modalStore.js";
import { useMainStore } from "~/stores/main";
import { useEmployerAuth } from "~/stores/employerAuth";

// component import
import AllApplicants from "@/components/Employer/AllApplicants.vue";
import AllListings from "@/components/Employer/AllListings.vue";
import ShortListApplicants from "@/components/Employer/ShortListApplicants.vue";
// component import
const modalStore = useModalStore();
const employerAuth = useEmployerAuth();

useHead({
  title: "Dashboard",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  middleware: ["unauthemp"],
  layout: "company",
});

const showDiv = ref(1);
const activeItem = ref(null);


const selectItem = (index) => {
  showDiv.value = index;
  activeItem .value = index;
};

const isActive = (index) => {
 return activeItem .value = index;
};

// filter listing
const { showDropDown, hideDropDown } = useDropDown();
const showDrop = (n, a) => {
  const dropDownId = "dropdownSearch";
  const trigId = "filterTrig";
  showDropDown(dropDownId, trigId);
};

const disableRoam = ref(false);

const data = ref(null);
const loading = ref(false);
const error = ref(null);

const mainStore = useMainStore();


const listings = ref([]);

const fetchData = async () => {
  try {
    const response = await fetch(
      mainStore.urlbase + "api/listing/all-active-company-listing",
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
      listings.value = responseData.data;
      console.log("Successful listing fetch", responseData);
      console.log(" listing fetched", listings.value);
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
};

onMounted(() => {});

onBeforeUnmount(() => {});
</script>
