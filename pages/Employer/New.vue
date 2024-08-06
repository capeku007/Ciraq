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
            <select
      v-model="listData.location_name"
      required
      name="jobLoc"
      id="jobLoc"
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
    <option value="" disabled>Select location </option>
      <option value="On-site">On-site</option>
      <option value="Remote">Remote</option>
      <option value="Hybrid">Hybrid</option>
    </select>

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
                <select
      v-model="listData.employment_type"
      required
      name="jobType"
      id="jobType"
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option value="" disabled>Select job type</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
      <option value="Contract">Contract</option>
      <option value="Internship">Internship</option>
      <option value="Temporary">Temporary</option>
      <option value="Remote">Remote</option>
      <option value="Freelance">Freelance</option>
      <option value="Other">Other</option>
    </select>

    <input
      v-if="listData.employment_type === 'Other'"
      v-model="listData.other_employment_type"
      type="text"
      placeholder="Please specify job type"
      class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        <div class="py-2 sticky top-0 z-10 bg-white">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <img
                class="w-10 h-10 rounded-lg sm:w-16 sm:h-16"
                :src="
                      company.company_logo
                        ? `https://ciraq.co/api/public/uploads/profile_images/${company.company_logo}`
                        : companyPlaceholder
                    "
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
              class="inline-flex items-center w-1/3 bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
            >
              <i class="bx bx-briefcase-alt-2"></i>&nbsp;
              {{ listData.employment_type }}
            </span>

            <span
              class="inline-flex items-center w-1/3 bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
            >
              <i class="bx bx-map"></i> &nbsp;
              {{ listData.location_name }}
            </span>
            <span
              class="inline-flex items-center w-1/3 bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
            >
              <i class="bx bx-money"></i>&nbsp;
              {{ listData.salary_compensation }}
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
import companyPlaceholder from "~/assets/images/companyPlace.jpg";
import { toast } from "vue3-toastify";
import { useEmployerAuth } from "@/stores/employerAuth";
import { useMainStore } from "~/stores/main";

useHead({
  title: "Create new listing",
  meta: [{ name: "description", content: "Create new listing" }],
});

definePageMeta({
  middleware: ["unauthemp"],
  layout: "company",
});

const employerAuth = useEmployerAuth();
const mainStore = useMainStore();
const company = employerAuth.company;

const listData = ref({
  job_title: "",
  location_name: "",
  application_deadline: "",
  employment_type: "",
  salary_compensation: 0,
  job_description: "",
  listing_status: "Pending",
});

const benefits = ref([])
const desired_qualifications = ref([])
const required_qualifications = ref([])

const submitForm = async () => {
  const finalData = {
    ...listData.value,
    benefits: benefits.value,
    required_qualifications: required_qualifications.value,
    desired_qualifications: desired_qualifications.value,
  };

  try {
    const response = await fetch(mainStore.urlbase + "listing/create", { 
      headers: {
        'Content-Type': 'application/json',
        Authorization: employerAuth.ctoken,
      },
      method: "POST",
      body: JSON.stringify(finalData)
    });

    const responseData = await response.json();
    if (!response.ok) {
      toast(responseData.message, { 
        position: "top-right", 
        duration: 2000, 
        type: "error", 
        responsive: true,
      });
      throw new Error(responseData.message || "Failed to create.");
    } else {
      toast(responseData.message, { 
        position: "top-right", 
        duration: 2000, 
        type: "success", 
        responsive: true,
      });
      resetForm();
      return responseData;
    }
  } catch (error) {
    console.error("Failed to create listing:", error);
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

const formDataKey = 'listData';

const resetForm = () => {
  Object.keys(listData.value).forEach(key => {
    listData.value[key] = "";
  });
  listData.value.salary_compensation = 0;
  listData.value.listing_status = "Pending";
  benefits.value = [];
  desired_qualifications.value = [];
  required_qualifications.value = [];
  localStorage.removeItem(formDataKey);
};

watch(
  [listData, benefits, desired_qualifications, required_qualifications],
  ([newListData, newBenefits, newDesired, newRequired]) => {
    const dataToSave = {
      ...newListData,
      benefits: newBenefits,
      desired_qualifications: newDesired,
      required_qualifications: newRequired,
    };
    localStorage.setItem(formDataKey, JSON.stringify(dataToSave));
  },
  { deep: true }
);

onMounted(() => {
  const cachedFormData = localStorage.getItem(formDataKey);
  if (cachedFormData) {
    const parsedData = JSON.parse(cachedFormData);
    Object.assign(listData.value, parsedData);
    benefits.value = parsedData.benefits || [];
    desired_qualifications.value = parsedData.desired_qualifications || [];
    required_qualifications.value = parsedData.required_qualifications || [];
  }
});
</script>

<style >
/* Custom scrollbar styles */


</style>