<template>
  <div class="min-h-[87dvh] max-h-[87dvh] grid grid-rows-[12dvh_1fr]">
    <div class="flex bg-white flex-wrap rounded-lg">
      <div class="w-1/5 p-2">
        <label
          :class="[
            'flex border-2 rounded-lg py-2 px-4 w-full',
            showPage === '1'
              ? 'bg-blue-500 text-white'
              : 'hover:bg-blue-500 hover:text-white',
          ]"
          class="flex border-2 rounded-lg py-2 px-4 w-full"
        >
          <input
            type="radio"
            name="item"
            value="1"
            class="hidden"
            v-model="showPage"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-normal truncate">Listings</p>
            <p class="text-2xl font-semibold truncate">
              {{ getListingsLength }}
            </p>
          </div>
          <div class="flex-shrink-0">
            <i
              class="bg-white text-blue-500 border-blue-500 border-2 p-2 rounded-full bx bx-briefcase-alt text-2xl block"
            ></i>
          </div>
        </label>
      </div>

      <div class="w-1/5 p-2">
        <label
          :class="[
            'flex border-2 rounded-lg py-2 px-4 w-full',
            showPage === '2'
              ? 'bg-purple-500 text-white'
              : 'hover:bg-purple-500 hover:text-white',
          ]"
          class="flex border-2 rounded-lg py-2 px-4 w-full"
        >
          <input
            type="radio"
            name="item"
            value="2"
            class="hidden"
            v-model="showPage"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-normal truncate">Applicants</p>
            <p class="text-2xl font-semibold truncate">
              {{ getApplicantsLength }}
            </p>
          </div>
          <div class="flex-shrink-0">
            <i
              class="bg-white text-purple-500 border-purple-500 border-2 p-2 rounded-full bx bx-group text-2xl block"
            ></i>
          </div>
        </label>
      </div>

      <div class="w-1/5 p-2">
        <label
          :class="[
            'flex border-2 rounded-lg py-2 px-4 w-full',
            showPage === '3'
              ? 'bg-yellow-300  text-white'
              : 'hover:bg-yellow-300  hover:text-white',
          ]"
          class="flex border-2 rounded-lg py-2 px-4 w-full"
        >
          <input
            type="radio"
            name="item"
            value="3"
            class="hidden"
            v-model="showPage"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-normal truncate">Shortlisted</p>
            <p class="text-2xl font-semibold truncate">
              {{ getShortlistsLength }}
            </p>
          </div>
          <div class="flex-shrink-0">
            <i
              class="bg-white text-yellow-300 border-yellow-300 border-2 p-2 rounded-full bx bx-user-plus text-2xl block"
            ></i>
          </div>
        </label>
      </div>

      <div class="w-1/5 p-2">
        <label
          :class="[
            'flex border-2 rounded-lg py-2 px-4 w-full',
            showPage === '4'
              ? 'bg-teal-500  text-white'
              : 'hover:bg-teal-500  hover:text-white',
          ]"
          class="flex border-2 rounded-lg py-2 px-4 w-full"
        >
          <input
            type="radio"
            name="item"
            value="4"
            class="hidden"
            v-model="showPage"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-normal truncate">Sent Offers</p>
            <p class="text-2xl font-semibold truncate">
              {{ getOfferedLength }}
            </p>
          </div>
          <div class="flex-shrink-0">
            <i
              class="bg-white text-teal-500 border-teal-500 border-2 p-2 rounded-full bx bx-user-plus text-2xl block"
            ></i>
          </div>
        </label>
      </div>

      <div class="w-1/5 p-2">
        <label
          :class="[
            'flex border-2 rounded-lg py-2 px-4 w-full',
            showPage === '5'
              ? 'bg-green-600  text-white'
              : 'hover:bg-green-600  hover:text-white',
          ]"
          class="flex border-2 rounded-lg py-2 px-4 w-full"
        >
          <input
            type="radio"
            name="item"
            value="5"
            class="hidden"
            v-model="showPage"
          />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-normal truncate">Hired</p>
            <p class="text-2xl font-semibold truncate">{{ getHiredLength }}</p>
          </div>
          <div class="flex-shrink-0">
            <i
              class="bg-white text-green-600 border-green-600 border-2 p-2 rounded-full bx bx-user-check text-2xl block"
            ></i>
          </div>
        </label>
      </div>
    </div>

    <div class="bg-white mt-2 rounded-2xl" v-if="showPage === '1'">
      <div>
        <AllListings />
      </div>
    </div>
    <div class=" mt-2 rounded-2xl" v-if="showPage === '2'">
      <AllApplicants />
    </div>
    <div class="mt-2 rounded-2xl" v-if="showPage === '3'">
      <AllShortLists />
    </div>
    <div class="mt-2 rounded-2xl" v-if="showPage === '4'">
      <SentOffers />
    </div>
    <div class=" mt-2 rounded-2xl" v-if="showPage === '5'">
      <Hires />
    </div>
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
import AllShortLists from "~/components/Employer/AllShortLists.vue";
import SentOffers from "~/components/Employer/SentOffers.vue";
import Hires from "~/components/Employer/Hires.vue";
// component import
const modalStore = useModalStore();
const employerAuth = useEmployerAuth();

import { useEmployerListStore } from "@/stores/employerListStore";
import { storeToRefs } from "pinia";
const employerListStore = useEmployerListStore();
const { getListingsLength } = storeToRefs(employerListStore);

import { useApplicantStore } from "@/stores/newApplicants";
const newApplicantStore = useApplicantStore();
const {
  getApplicantsLength,
  getShortlistsLength,
  getOfferedLength,
  getHiredLength,
} = storeToRefs(newApplicantStore);

useHead({
  title: "Dashboard",
  meta: [{ name: "description", content: "Employer hub" }],
});

definePageMeta({
  middleware: ["unauthemp"],
  layout: "company",
});

const showPage = ref("2");
const activeItem = ref(null);

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
      mainStore.urlbase + "listing/all-active-company-listing",
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

onMounted(() => {
  employerListStore.loadAllListings();
  newApplicantStore.loadNewApplicants();
  newApplicantStore.loadAllShortlists();
  newApplicantStore.loadAllSentOffers();
  newApplicantStore.loadAllHires();
});

onBeforeUnmount(() => {});
</script>
