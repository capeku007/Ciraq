<template>
  <div>
    <div class="relative w-full max-w-4xl overflow-y-auto max-h-[80dvh] rounded-2xl scrollbar-none">
      <div class="relative bg-white rounded-lg shadow">
        <div class="md:p-5 px-4 bg-white">
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
                <p v-if="!isEditMode" class="text-base sm:text-lg font-semibold">
                  {{ selectedJob.job_title }}
                </p>
                <input
                  v-else
                  v-model="selectedJob.job_title"
                  class="text-base sm:text-lg font-semibold"
                />
                <p class="text-xs sm:text-base font-normal text-gray-500">
                  {{ company.company_name }}
                </p>
              </div>
              <div>
                <button  v-if="isEditMode"  @click="updateListing" class=" bg-green-600 border text-white px-2 py-1 mr-4 rounded-lg font-bold">Update</button>
                <button @click="toggleEditMode" class="mr-8 px-2 py-1 rounded-md bg-indigo-600 text-white">
                  {{ isEditMode ? "Cancel" : "Edit" }}
                </button>
              </div>
            </div>
            <div class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse">
              <div>
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Location</label>
                <span v-if="!isEditMode" class="inline-flex items-center text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg">
                  {{ selectedJob.location_name }}
                </span>
                           <select
      v-model="selectedJob.location_name"
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

              <div>
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Pay</label>
                <span v-if="!isEditMode" class="inline-flex items-center text-xs sm:text-base font-normal px-2 py-1 rounded-lg">
                  {{ selectedJob.salary_compensation }}
                </span>
                <input
                  v-else
                  v-model="selectedJob.salary_compensation"
                  class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
                <span v-if="!isEditMode" class="inline-flex items-center text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg">
                  {{ selectedJob.employment_type }}
                </span>
                    <select
                    v-else
      v-model="selectedJob.employment_type"
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
      v-if="selectedJob.employment_type === 'Other'"
      v-model="selectedJob.other_employment_type"
      type="text"
      placeholder="Please specify job type"
      class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    />
                
              </div>
            </div>
          </div>
          <!-- deadline -->
          <div class="mb-4">
            <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Deadline</label>
                <span v-if="!isEditMode" class="inline-flex items-center bg-gray-200 text-xs font-normal pl-2 pr-4 py-2 rounded-lg">
                  <i class="bx bx-calendar"></i> &nbsp;{{ formatDate(selectedJob.application_deadline) }}
                </span>
                <input
                  v-else
                  type="date"
                  v-model="selectedJob.application_deadline"
                  class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
          </div>
          <!-- job description -->
          <div>
            <div>
              
              <p class="block text-sm font-medium leading-6 text-gray-900">Job Description</p>
              <p v-if="!isEditMode" class="text-xs sm:text-base font-normal text-gray-500">
                {{ selectedJob.job_description }}
              </p>
              <textarea
                v-else
                v-model="selectedJob.job_description"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>

            
            <div class="mt-4">
              <h2 class="block text-sm font-medium leading-6 text-gray-900">Required skills</h2>
              <ul v-if="!isEditMode" class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(candidate, index) in selectedJob.required_qualifications" :key="index">
                  {{ candidate }}
                </li>
              </ul>

              <div v-else>
                <div class="flex">
                  <input
                    type="text"
                    v-model="skillName"
                    class="block w-11/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Add new skill"
                  />
                  <button
                    class="px-2 ml-4 border rounded-md ring-1 ring-inset ring-gray-300"
                    @click="addSkill"
                    :disabled="!skillName"
                  >
                    <i class="bx bx-plus"></i>
                  </button>
                </div>
                <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                  <li
                    v-for="(skill, index) in selectedJob.required_qualifications"
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
            </div>

            <!-- desired skills -->
            <div class="mt-4">
              <h2 class="block text-sm font-medium leading-6 text-gray-900">Desired skills</h2>
              <ul v-if="!isEditMode" class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(candidate, index) in selectedJob.desired_qualifications" :key="index">
                  {{ candidate }}
                </li>
              </ul>

              <div v-else>
                <div class="flex">
                  <input
                    type="text"
                    v-model="candidateName"
                    class="block w-11/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Add new skill"
                  />
                  <button
                    class="px-2 ml-4 border rounded-md ring-1 ring-inset ring-gray-300"
                    @click="addCandidate"
                    :disabled="!candidateName"
                  >
                    <i class="bx bx-plus"></i>
                  </button>
                </div>

                <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                  <li
                    v-for="(skill, index) in selectedJob.desired_qualifications"
                    :key="index"
                    class="flex justify-between items-center border m-2 px-4 rounded-lg"
                  >
                    <span>{{ skill }}</span>
                    <button class="text-red-500" @click="removeCandidate(index)">
                      <i class="bx bx-trash"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-4">
              <h2 class="block text-sm font-medium leading-6 text-gray-900">Benefits</h2>
              <ul v-if="!isEditMode" class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(benefit, index) in selectedJob.benefits" :key="index">
                  {{ benefit }}
                </li>
              </ul>

              <div v-else>
                <div class="flex">
                  <input
                    type="text"
                    v-model="benefitName"
                    class="block w-11/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Add new benefit"
                  />
                  <button
                    class="px-2 ml-4 border rounded-md ring-1 ring-inset ring-gray-300"
                    @click="addBenefit"
                    :disabled="!benefitName"
                  >
                    <i class="bx bx-plus"></i>
                  </button>
                </div>

                <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                  <li
                    v-for="(benefit, index) in selectedJob.benefits"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// company details
import { useEmployerAuth } from "@/stores/employerAuth";
import { useFormatDate } from "@/composables/useFormatDate";
import { useModalStore } from "@/stores/modalStore.js";
import { useMainStore } from "~/stores/main";

const { formatDate } = useFormatDate();
const mainStore = useMainStore();
const modalStore = useModalStore();
const { hideModal, showClosableModal } = useModal();
const employerAuth = useEmployerAuth();
const company = employerAuth.company;

const { selectedJob } = defineProps({
  selectedJob: {
    type: Object,
  },
});

const updateListing = () => {
  hideModal('viewListing');
  let info = "update " + selectedJob.job_title + "?";
  modalStore.changeDialog(info);
  let func = {};
 console.log("payload",JSON.stringify(selectedJob) );
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      console.log("url", mainStore.urlbase + "listing/update/id");
     
      const response = await fetch(
        mainStore.urlbase + "listing/update/id",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: employerAuth.ctoken,
          },
          body: JSON.stringify(selectedJob),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        applicants.value = responseData.data;
      } else {
        console.error(
          "Error fetching listing:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  modalStore.OpenYesOrNOClick(func);
};

const closeModal = (n) => {
  const modalId = n;
  hideModal(modalId);
};

const isEditMode = ref(false);

const toggleEditMode = () => {
  isEditMode.value = !isEditMode.value;
};

const skillName = ref("");
const candidateName = ref("");
const benefitName = ref("");

const addCandidate = () => {
  console.log(selectedJob.desired_qualifications)
  if (candidateName.value.trim() !== "") {
    selectedJob.desired_qualifications.push(candidateName.value.trim());
    candidateName.value = "";
  }
};

const addSkill = () => {
  console.log(selectedJob.required_qualifications)
  if (skillName.value.trim() !== "") {
    selectedJob.required_qualifications.push(skillName.value.trim());
    skillName.value = "";
  }
};

const addBenefit = () => {
  if (benefitName.value.trim() !== "") {
    selectedJob.benefits.push(benefitName.value.trim());
    benefitName.value = "";
  }
};

const removeCandidate = (index) => {
  selectedJob.desired_qualifications.splice(index, 1);
};


const removeSkill = (index) => {
  selectedJob.required_qualifications.splice(index, 1);
};

const removeBenefit = (index) => {
  selectedJob.benefits.splice(index, 1);
};
</script>