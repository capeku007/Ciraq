<template>
  <div>
    <div
      class="relative w-full max-w-4xl overflow-y-auto max-h-[95svh] rounded-2xl scrollbar-none"
    >
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
                <p
                  v-if="!isEditMode"
                  class="text-base sm:text-lg font-semibold"
                >
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
                <button @click="isEditMode = !isEditMode">
                  {{ isEditMode ? "Save" : "Edit" }}
                </button>
              </div>
            </div>
            <div
              class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse"
            >
              <div>
                <label
                  for="location"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Location</label
                >
                <span
                  class="inline-flex items-center text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
                >
                  <span v-if="!isEditMode">{{
                    selectedJob.location_name
                  }}</span>
                  <input
                    v-else
                    v-model="selectedJob.location_name"
                    class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                  />
                </span>
              </div>

              <div>
                <label
                  for="location"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Pay</label
                >
                <span
                  class="inline-flex items-center text-xs sm:text-base font-normal px-2 py-1 rounded-lg"
                >
                  <span v-if="!isEditMode">{{
                    selectedJob.salary_compensation
                  }}</span>
                  <input
                    v-else
                    v-model="selectedJob.salary_compensation"
                    class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </span>
              </div>

              <div>
                <label
                  for="location"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Type</label
                >
                <span
                  class="inline-flex items-center text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
                >
                  <span v-if="!isEditMode">{{
                    selectedJob.employment_type
                  }}</span>
                  <input
                    v-else
                    v-model="selectedJob.employment_type"
                    class="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </span>
              </div>
            </div>
          </div>
          <!-- job description -->
          <div>
            <div>
              <p class="text-base sm:text-lg font-semibold">Job Description</p>
              <p
                v-if="!isEditMode"
                class="text-xs sm:text-base font-normal text-gray-500"
              >
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
              <h2 class="text-sm sm:text-base font-semibold">Location</h2>
              <ul
                class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
              >
                <li>{{ selectedJob.location_name }}</li>
              </ul>
            </div>
            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">
                Required skills
              </h2>
              <ul  v-if="!isEditMode"
                class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
              >
                <li
                
                  v-for="(
                    candidate, index
                  ) in selectedJob.required_qualifications"
                  :key="index"
                >
                  <span v-if="!isEditMode">{{ candidate }}</span>
                  <input
                    v-else
                    v-model="selectedJob.required_qualifications[index]"
                    class="bg-transparent"
                  />
                </li>
              </ul>

                      <div v-else class=" flex">
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
            v-for="(skill, index) in selectedJob.required_qualifications"
            :key="index"
            class="flex justify-between items-center border m-2 px-4 rounded-lg"
          >
            <span>
              {{ skill }}</span>
            <button class="text-red-500" @click="removeSkill(index)">
              <i class="bx bx-trash"></i>
            </button>
          </li>
        </ul>
            </div>

            <!-- desired skills -->
            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">Desired skills</h2>
              <ul   v-if="!isEditMode"
                class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
              >
                <li
                  v-for="(
                    candidate, index
                  ) in selectedJob.desired_qualifications"
                  :key="index"
                >
                  <span v-if="!isEditMode">{{ candidate }}</span>
                  <input
                    v-else
                    v-model="selectedJob.desired_qualifications[index]"
                    class="bg-transparent"
                  />
                </li>
              </ul>

                                    <div v-else class=" flex">
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
            v-for="(skill, index) in selectedJob.desired_qualifications"
            :key="index"
            class="flex justify-between items-center border m-2 px-4 rounded-lg"
          >
            <span>
              {{ skill }}</span>
            <button class="text-red-500" @click="removeSkill(index)">
              <i class="bx bx-trash"></i>
            </button>
          </li>
        </ul>
            </div>
            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">Benefits</h2>
              <ul
                class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
              >
                <li
                  v-for="(dskill, index) in selectedJob.desired_qualifications"
                  :key="index"
                >
                  <span v-if="!isEditMode">{{ dskill }}</span>
                  <input
                    v-else
                    v-model="selectedJob.desired_qualifications[index]"
                    class="bg-transparent"
                  />
                </li>
              </ul>
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

const { selectedJob } = defineProps({
  selectedJob: {
    type: Object,
  },
});

const isEditMode = ref(false);


</script>