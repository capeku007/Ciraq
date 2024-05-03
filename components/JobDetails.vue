<template>
  <div
    id="editListing"
    tabindex="-1"
    data-modal-target="editListing"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]"
  >
    <div
      class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <div class="relative bg-white rounded-lg shadow">
         <i
            @click="closeModal('editListing')"
            class="absolute bx bx-x-circle top-2 z-50 bg-white right-0 rounded-full pr-2 text-2xl text-gray-400 hover:text-red-600"
          ></i>

              <EditJob :selectedEdit="selectedEdit"/>
      </div>
    </div>
  </div>
  <div>
    <div class="relative w-full max-w-4xl overflow-y-auto max-h-[95svh] rounded-2xl scrollbar-none">
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
                  {{ company.company_name }}
                </p>
              </div>
                          <div>
                <button @click="openEdit(selectedJob)" class="px-2 py-1 rounded-md bg-indigo-600 text-white">
                  Edit
                </button>
              </div>
            </div>
            <div class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse">
              <div>
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Location</label>
                <span class="inline-flex items-center text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg">
                  {{ selectedJob.location_name }}
                </span>
              </div>

              <div>
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Pay</label>
                <span class="inline-flex items-center text-xs sm:text-base font-normal px-2 py-1 rounded-lg">
                  {{ selectedJob.salary_compensation }}
                </span>
              </div>

              <div>
                <label for="location" class="block text-sm font-medium leading-6 text-gray-900">Type</label>
                <span class="inline-flex items-center text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg">
                  {{ selectedJob.employment_type }}
                </span>
              </div>
            </div>

          </div>
          <!-- job description -->
          <div class="px-4">
            <div>
              <p class="text-base sm:text-lg font-semibold">Job Description</p>
              <p class="text-xs sm:text-base font-normal text-gray-500">
                {{ selectedJob.job_description }}
              </p>
            </div>

            <div class="mt-8">
              <h2 class="text-sm sm:text-base font-semibold">Location</h2>
              <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li>{{ selectedJob.location_name }}</li>
              </ul>
            </div>
            <div class="mt-8">
              <h2 class="text-sm sm:text-base font-semibold">Required skills</h2>
              <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(candidate, index) in selectedJob.required_qualifications" :key="index">
                  {{ candidate }}
                </li>
              </ul>
            </div>

            <!-- desired skills -->
            <div class="mt-8">
              <h2 class="text-sm sm:text-base font-semibold">Desired skills</h2>
              <ul class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1">
                <li v-for="(candidate, index) in selectedJob.desired_qualifications" :key="index">
                  {{ candidate }}
                </li>
              </ul>
            </div>
            <div class="mt-8">
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
import { useModalStore } from "@/stores/modalStore.js";
import { useMainStore } from "@/stores/main.js";

const { showClosableModal, showModal, hideModal } = useModal();

const modalStore = useModalStore();
const employerAuth = useEmployerAuth();
const company = employerAuth.company;

const { selectedJob } = defineProps({
  selectedJob: {
    type: Object,
  },
});

const closeModal = (n) => {
  // Initialize useModal composable
  const modalId = n;
  hideModal(modalId);
};

const selectedEdit = ref({})
  // Initialize useModal composable


const openEdit =(n)=>{
  selectedEdit.value=n
    const modalId = "editListing";
  showModal(modalId);
}
</script>