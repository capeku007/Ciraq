<template>
  <div>
    <div class="relative w-full max-w-4xl overflow-y-auto max-h-[95dvh] rounded-2xl scrollbar-none">
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
                
                <input
                  v-model="selectedEdit.job_title"
                  class="text-base sm:text-lg font-semibold"
                />
                <p class="text-xs sm:text-base font-normal text-gray-500">
                  {{ company.company_name }}
                </p>
              </div>
              <div>
                <button  class="px-2 py-1 rounded-md bg-indigo-600 text-white">
                  Save
                </button>
              </div>
            </div>
            <div class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse">
              <div>
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Location</label>
                
                <input
                  v-model="selectedEdit.location_name"
                  class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Pay</label>
            
                <input
                  v-model="selectedEdit.salary_compensation"
                  class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
                
                <input
                  v-model="selectedEdit.employment_type"
                  class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <!-- job description -->
          <div>
            <div>
              <p class="text-base sm:text-lg font-semibold">Job Description</p>
              
              <textarea
                v-model="selectedEdit.job_description"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>

            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">Location</h2>
              <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li>{{ selectedEdit.location_name }}</li>
              </ul>
            </div>
            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">Required skills</h2>
              <div >
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
                    v-for="(skill, index) in selectedEdit.required_qualifications"
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
              <h2 class="text-sm sm:text-base font-semibold">Desired skills</h2>


              <div>
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
                    v-for="(skill, index) in selectedEdit.desired_qualifications"
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
              <h2 class="text-sm sm:text-base font-semibold">Benefits</h2>


              <div>
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
                    v-for="(benefit, index) in selectedEdit.benefits"
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
const employerAuth = useEmployerAuth();
const company = employerAuth.company;

const { selectedEdit } = defineProps({
  selectedEdit: {
    type: Object,
  },
});

const isEditMode = ref(false);

const skillName = ref("");
const candidateName = ref("");
const benefitName = ref("");


const addCandidate = () => {
  console.log(selectedEdit.desired_qualifications)
  if (candidateName.value.trim() !== "") {
    selectedEdit.desired_qualifications.push(candidateName.value.trim());
    candidateName.value = "";
  }
};

const addSkill = () => {
  console.log(selectedEdit.required_qualifications)
  if (skillName.value.trim() !== "") {
    selectedEdit.required_qualifications.push(skillName.value.trim());
    skillName.value = "";
  }
};

const addBenefit = () => {
  if (benefitName.value.trim() !== "") {
    selectedEdit.benefits.push(benefitName.value.trim());
    benefitName.value = "";
  }
};

const removeCandidate = (index) => {
  selectedEdit.desired_qualifications.splice(index, 1);
};

const removeSkill = (index) => {
  try {
    if (selectedEdit.value && selectedEdit.value.required_qualifications) {
      selectedEdit.required_qualifications.splice(index, 1);
    }
  } catch (error) {
    console.error('Error removing skill:', error);
    // You can also show an error message to the user or log the error to an error tracking service
  }
};

const removeBenefit = (index) => {
  selectedEdit.benefits.splice(index, 1);
};
</script>