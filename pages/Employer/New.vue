<template>
  <div class="grid grid-cols-2 grid-rows-1 gap-x-4 h-[95dvh] overflow-hidden">
    <div class="overflow-y-auto shadow rounded-2xl bg-white max-h-[95dvh] min-h-[95dvh] p-4">
      <div class="bg-white pb-4 sticky top-0 z-2">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        Create a new listing
      </h2>
      <p class="text-sm leading-6 text-gray-600">
        This information will be displayed publicly.
      </p>

      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <div class="col-span-4">
          <label
            for="taskTitle"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Task Title</label
          >
          <div class="mt-1">
            <input
            v-model="listData.job_title"
              type="text"
              name="taskTitle"
              id="taskTitle"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
                <div class="col-span-2">
          <label
            for="taskTitle"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Deadline</label
          >
          <div class="mt-1">
            <input
            v-model="listData.application_deadline"
              type="date"
              name="date"
              id="date"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>


        <div class="sm:col-span-2 sm:col-start-1">
          <label
            for="location"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Location</label
          >
          <div class="mt-1">
            <input
            v-model="listData.location_name"
              type="text"
              name="location"
              id="location"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label
            for="region"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Pay</label
          >
          <div class="mt-1">
            <input
            v-model="listData.salary_compensation"
              type="number"
              name="region"
              id="region"
              autocomplete="address-level1"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label
            for="jobType"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Job Type</label
          >
          <div class="mt-1">
            <input
            v-model="listData.employment_type"
            required
              type="text"
              name="jobType"
              id="jobType"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      </div>

      <div class="mt-4 col-span-full">
        <label
          for="aboutJob"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Task description.</label
        >
        <div class="mt-1">
          <textarea
            v-model="listData.job_description"
            id="aboutJob"
            name="aboutJob"
            rows="3"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>

      <div class="mt-4 col-span-full">
        <label
          for="candidate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Required skills</label
        >
        <div class="mt-1 flex">
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            v-model="skillName"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            class="px-2 ml-4 border rounded-md ring-1 ring-inset ring-gray-300"
            @click="addSkill"
            :disabled="!skillName"
          >
            <i class="bx bx-plus"></i>
          </button>
        </div>
        <ul
          class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
        >
          <li
            v-for="(skill, index) in required_qualifications"
            :key="index"
            class="flex justify-between items-center border m-2 px-4 rounded-lg"
          >
            <span>{{ skill }}</span>
            <button class="text-red-500" @click="removeSkill(index)">
              <i class="bx bx-trash"></i>
            </button>
          </li>
        </ul>
      </div>

            <div class="mt-4 col-span-full">
        <label
          for="candidate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Desired skills</label
        >
        <div class="mt-1 flex">
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            v-model="candidateName"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            class="px-2 ml-4 border rounded-md ring-1 ring-inset ring-gray-300"
            @click="addCandidate"
            :disabled="!candidateName"
          >
            <i class="bx bx-plus"></i>
          </button>
        </div>
        <ul
          class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
        >
          <li
            v-for="(candidate, index) in desired_qualifications"
            :key="index"
            class="flex justify-between items-center border m-2 px-4 rounded-lg"
          >
            <span>{{ candidate }}</span>
            <button class="text-red-500" @click="removeCandidate(index)">
              <i class="bx bx-trash"></i>
            </button>
          </li>
        </ul>
      </div>
            <div class="mt-4 col-span-full">
        <label
          for="candidate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Benefits</label
        >
        <div class="mt-1 flex">
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            v-model="benefitName"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            class="px-2 ml-4 border rounded-md ring-1 ring-inset ring-gray-300"
            @click="addBenefit"
            :disabled="!benefitName"
          >
            <i class="bx bx-plus"></i>
          </button>
        </div>
        <ul
          class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
        >
          <li
            v-for="(benefit, index) in benefits"
            :key="index"
            class="flex justify-between items-center border m-2 px-4 rounded-lg"
          >
            <span>{{ benefit }}</span>
            <button class="text-red-500" @click="removeBenefit(index)">
              <i class="bx bx-trash"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- preview job -->
    <div class="shadow rounded-2xl bg-white max-h-[95dvh] overflow-y-auto p-4">
      <div class="md:p-5 px-4">
        <div class="py-4 sticky top-0 z-10 bg-white">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-lg sm:w-16 sm:h-16"
                src="../assets/knustlogo.png"
                alt="company image"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-base sm:text-lg font-semibold">
                {{ listData.job_title }}
              </p>
              <p class="text-xs sm:text-base font-normal text-gray-500">
                {{ company.company_name }}
              </p>
            </div>
            
          </div>
          <div class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse">
            <span
              class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
            >
              {{listData.location_name}}
            </span>

            <span
              class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2 py-1 rounded-lg"
            >
              {{listData.salary_compensation}}
            </span>
            <span
              class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
            >
              {{listData.employment_type}}
            </span>
          </div>
        </div>
        <!-- job description -->
        <div>
          <div>
            <p class="text-base sm:text-lg font-semibold">Job Description</p>
            <p class="text-xs sm:text-base font-normal text-gray-500">
              {{ listData.job_description }}
            </p>
          </div>
          
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Location</h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li>{{ listData.location_name }}</li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">
              Required skills
            </h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
               <li v-for="(candidate, index) in required_qualifications"
            :key="index">{{candidate}}</li>
            
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">
              Desired skills
            </h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li v-for="(candidate, index) in desired_qualifications"
            :key="index">{{candidate}}</li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Benefits</h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
                            <li v-for="(benefit, index) in benefits"
            :key="index">{{benefit}}</li>
            </ul>
          </div>
        </div>

        <!-- apply button -->
        <div class="mt-4">
          <button
            @click="submitForm()"
            class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Create Listing
          </button>
        </div>
        <!-- NEW UP HERE -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/modalStore.js";
useHead({
  title: "Create new listing",
  meta: [{ name: "description", content: "Create new listing" }],
});


// Define loginData using reactive
definePageMeta({
  middleware: ["unauthemp"],
  layout: "company",
});

// company details
import { useEmployerAuth } from "@/stores/employerAuth";
import { useCreateStore } from "@/stores/createListing";
const employerAuth = useEmployerAuth();
const createStore = useCreateStore();
const company = employerAuth.company;

import { useMainStore } from "~/stores/main";
const mainStore = useMainStore();

const modalStore = useModalStore();
const { showClosableModal, hideModal } = useModal();
const closeModal = () => {
  // Initialize useModal composable
  const modalId = "viewCompanyInfo";
  hideModal(modalId);
};
const listData = ref({
  job_title: "",
  location_name: "",
  application_deadline: "",
  date_posted: "",
  employment_type: "",
  salary_compensation: 0,
  job_description: "",
  listing_status: "Pending",
});

const benefits =ref([])
const desired_qualifications =ref([])
const required_qualifications =ref([])


const createListing = () => {
  let info = "Confirm new listing?";
  modalStore.changeDialog(info);
  let func = {};
  const reqObj = {
    job_title: listData.value.job_title,
    job_description: listData.value.job_description,
    required_qualifications: JSON.stringify(listData.value.required_qualifications),
    desired_qualifications: JSON.stringify(listData.value.desired_qualifications),
    application_deadline: listData.value.application_deadline,
    salary_compensation: listData.value.salary_compensation,
    employment_type: listData.value.employment_type,
    listing_status: "Pending",
    benefits: JSON.stringify(listData.value.benefits),
    location_name: listData.value.location_name,
  };

  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      console.log('about to send this', reqObj);
      const response = await fetch(mainStore.urlbase + "listing/create", {
        headers: {
          Authorization: employerAuth.ctoken,
        },
        method: "POST",
        body: reqObj,
        
      });
      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to create.");
        throw error;
      } else {
        // alert("Account registered. Please check email to verify:", responseData.message);
        return responseData; // Return the responseData after successful registration
      }
    } catch (error) {
      console.error("Failed to register:", error);
      // alert("Failed to register:", error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  };
  modalStore.OpenYesOrNOClick(func);
};

const submitForm = async () => {
  console.log(listData.value)
  listData.value.benefits = benefits.value;
  listData.value.required_qualifications = required_qualifications.value;
  listData.value.desired_qualifications = desired_qualifications.value;

console.log("new data", listData.value)
        try {
        const responseData = await createStore.createListing(listData.value);
        if (responseData.successful) {
          
        } else {
          console.log("failed");
        }
      } catch (error) {
        // Handle errors here if needed
        console.error("Failed to register:", error);
      }
};

const candidateName = ref("");
const skillName = ref("");
const benefitName = ref("");



const addCandidate = () => {
  if (candidateName.value.trim() !== "") {
    desired_qualifications.value.push(candidateName.value.trim());
    candidateName.value = "";
  }
};

const addSkill = () => {
  if (skillName.value.trim() !== "") {
    required_qualifications.value.push(skillName.value.trim());
    skillName.value = "";
  }
};

const addBenefit = () => {
  if (benefitName.value.trim() !== "") {
    benefits.value.push(benefitName.value.trim());
    benefitName.value = "";
  }
};

const removeCandidate = (index) => {
  desired_qualifications.value.splice(index, 1);
};

const removeSkill = (index) => {
  required_qualifications.value.splice(index, 1);
};

const removeBenefit = (index) => {
  benefits.value.splice(index, 1);
};
const formDataKey = 'listData'; // Key to store formData in the cache

watch(
  () => listData.value, // Watch for changes in the formData object
  (newValue) => {
    // Save the current formData to the cache
    localStorage.setItem(formDataKey, JSON.stringify(newValue)); // Use localStorage or sessionStorage
  },
  { deep: true } // Watch for deep changes in the formData object
);

// Retrieve formData from cache on component creation
onMounted(() => {
  const cachedFormData = localStorage.getItem(formDataKey);
  if (cachedFormData) {
    listData.value = JSON.parse(cachedFormData);
  }
});

</script>


<style >
/* Custom scrollbar styles */


</style>