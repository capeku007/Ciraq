<template>
  <div class="grid grid-cols-2 grid-rows-1 gap-x-4 h-[95svh] overflow-hidden">
    <div class="overflow-y-auto shadow rounded-2xl bg-white max-h-[95svh] min-h-[95svh] p-4">
      <div class="bg-white pb-4 sticky top-0 z-10">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        Create a new listing
      </h2>
      <p class="text-sm leading-6 text-gray-600">
        This information will be displayed publicly.
      </p>

      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <div class="col-span-full">
          <label
            for="taskTitle"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Task Title</label
          >
          <div class="mt-1">
            <input
            v-model="formData.job_title"
              type="text"
              name="taskTitle"
              id="taskTitle"
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
            v-model="formData.location_name"
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
            v-model="formData.salary_compensation"
              type="text"
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
            v-model="formData.employment_type"
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
            v-model="formData.job_description"
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
            v-for="(skill, index) in formData.required_qualifications"
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
            v-for="(candidate, index) in formData.desired_qualifications"
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
            v-for="(benefit, index) in formData.benefits"
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
    <div class="shadow rounded-2xl bg-white max-h-[95svh] p-4">
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
                {{ formData.job_title }}
              </p>
              <p class="text-xs sm:text-base font-normal text-gray-500">
                {{  }}
              </p>
            </div>
            
          </div>
          <div class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse">
            <span
              class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
            >
              {{formData.location_name}}
            </span>

            <span
              class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2 py-1 rounded-lg"
            >
              {{formData.salary_compensation}}
            </span>
            <span
              class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
            >
              {{formData.employment_type}}
            </span>
          </div>
        </div>
        <!-- job description -->
        <div>
          <div>
            <p class="text-base sm:text-lg font-semibold">Job Description</p>
            <p class="text-xs sm:text-base font-normal text-gray-500">
              {{ formData.job_description }}
            </p>
          </div>
          
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Location</h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li>{{ formData.location_name }}</li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">
              Required skills
            </h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li>Javascript</li>
              <li>Html css</li>
              <li>Figma</li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">
              Desired skills
            </h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
              <li v-for="(candidate, index) in formData.desired_qualifications"
            :key="index">{{candidate}}</li>
            </ul>
          </div>
          <div class="mt-4">
            <h2 class="text-sm sm:text-base font-semibold">Benefits</h2>
            <ul
              class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
            >
                            <li v-for="(benefit, index) in formData.benefits"
            :key="index">{{benefit}}</li>
            </ul>
          </div>
        </div>

        <!-- apply button -->
        <div class="mt-4">
          <button
            @click="createListing()"
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

const apiBaseUrl =ref("https://ciraq.co/api/");

// Define loginData using reactive
definePageMeta({
  // middleware: ["already-auth"],
  layout: "company",
});

const modalStore = useModalStore();
const { showClosableModal, hideModal } = useModal();
const closeModal = () => {
  // Initialize useModal composable
  const modalId = "viewCompanyInfo";
  hideModal(modalId);
};

const createListing = () =>{
console.log("formData", formData.value);
  let info = "Confirm new listing?";
  modalStore.changeDialog(info);
  let func = {};
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    // try {
    //   console.log("uploaded");
    //   modalStore.showMessage("Listing online")
    // } catch (error) {
    //   console.log(error);
    // }
     try {
        const response = await fetch(apiBaseUrl + "listing/create", { 
          method: "POST",
          body: formData
        });
    
        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
          const error = new Error(responseData.message || "Failed to register.");
          throw error;
        } else {
          alert("Account registered. Please check email to verify:", responseData.message);
          return responseData; // Return the responseData after successful registration
        }
      } catch (error) {
        console.error("Failed to register:", error);
        alert("Failed to register:", error);
        throw error; // Rethrow the error to handle it elsewhere if needed
      }
  };

  modalStore.OpenYesOrNOClick(func);
}

const candidateName = ref("");
const skillName = ref("");
const benefitName = ref("");

const formData = ref({
  job_title: "",
  location_name: "",
  application_deadline: "",
  employment_type: "",
  salary_compensation: "",
  job_description: "",
  required_qualifications: [],
  desired_qualifications: [],
  benefits: [],
  listing_status: {},
});

const addCandidate = () => {
  if (candidateName.value.trim() !== "") {
    formData.value.desired_qualifications.push(candidateName.value.trim());
    candidateName.value = "";
  }
};

const addSkill = () => {
  if (skillName.value.trim() !== "") {
    formData.value.required_qualifications.push(skillName.value.trim());
    skillName.value = "";
  }
};

const addBenefit = () => {
  if (benefitName.value.trim() !== "") {
    formData.value.benefits.push(benefitName.value.trim());
    benefitName.value = "";
  }
};

const removeCandidate = (index) => {
  formData.value.desired_qualifications.splice(index, 1);
};

const removeSkill = (index) => {
  formData.value.required_qualifications.value.splice(index, 1);
};

const removeBenefit = (index) => {
  formData.value.benefits.splice(index, 1);
};


</script>


<style scoped>
/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* For Mozilla Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #f7f7f7 #f1f1f1;
}

/* For Internet Explorer and Edge */
body {
  scrollbar-face-color: #ebebeb;
  scrollbar-track-color: #f1f1f1;
}
</style>