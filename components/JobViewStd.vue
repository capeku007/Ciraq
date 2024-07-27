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
                <p class="text-base sm:text-lg font-semibold">
                  {{ selectedJob.job_title }}
                </p>
                <p class="text-xs sm:text-base font-normal text-gray-500">
                  {{ selectedJob.company_name }}
                </p>
              </div>
            </div>
          <div class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse">
            <span
              class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
            >
              <i class="bx bx-briefcase-alt-2"></i>&nbsp;
              {{ selectedJob.employment_type }}
            </span>

            <span
              class="inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
            >
              <i class="bx bx-map"></i> &nbsp;
              {{ selectedJob.location_name }}
            </span>
            <span
              class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
            >
              <i class="bx bx-money"></i>&nbsp;
              {{ selectedJob.salary_compensation }}
            </span>
          </div>
          </div>
          <!-- job description -->
          <div>
            <div>
              <p class="text-base sm:text-lg font-semibold">Job Description</p>
              <p class="text-xs sm:text-base font-normal text-gray-500">
                {{ selectedJob.job_description }}
              </p>
            </div>

            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">Location</h2>
              <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li>{{ selectedJob.location_name }}</li>
              </ul>
            </div>
            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">Required skills</h2>
              <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(candidate, index) in selectedJob.required_qualifications" :key="index">
                  {{ candidate }}
                </li>
              </ul>
            </div>

            <!-- desired skills -->
            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">Desired skills</h2>
              <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(candidate, index) in selectedJob.desired_qualifications" :key="index">
                  {{ candidate }}
                </li>
              </ul>
            </div>
            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">Benefits</h2>
              <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(benefit, index) in selectedJob.benefits" :key="index">
                  {{ benefit }}
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
import { useEmployerAuth } from "@/stores/employerAuth";
import { useMainStore } from "~/stores/main";

const mainStore = useMainStore();
const employerAuth = useEmployerAuth();
const company = employerAuth.company;

const { selectedJob } = defineProps({
  selectedJob: {
    type: Object,
  },
});
</script>