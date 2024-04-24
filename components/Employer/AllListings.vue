<template>
  <div>
    <!-- MODALS HERE -->

    <div
      id="viewListing"
      data-modal-target="viewListing"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
    >
      <div
        class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <!-- TODO: UPDATE TO  -->
        <JobDetails />
      </div>
    </div>
    <!-- MODALS END HERE -->

    <div>
      <div class="relative overflow-x-auto shadow-md srounded-lg p-2">
        <div
          class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
        >
          <div class="text-base font-semibold ml-4">Listing</div>
        </div>
        <div class="overflow-y-auto h-[70svh]">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="sticky top-0 bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">Applicants</th>
                <th scope="col" class="px-6 py-3">Status</th>
                <th scope="col" class="px-6 py-3">Deadline</th>
                <th scope="col" class="px-6 py-3">Manage</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  class="flex items-center px-6 py-3 text-gray-900 whitespace-nowrap"
                  @click="viewListing()"
                >
                  <div class="text-base font-semibold">job.title</div>
                </th>
                <td class="px-6 py-1">React Developer</td>
                <td class="px-6 py-1">Data entry</td>
                <td class="px-6 py-1"></td>
                <td>
                  <div class="flex">
                    
                    <div>
                      <button
                        class="border-0 px-3 py-2 mx-4 text-white bg-red-500 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      >
                        Close Listing
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav
          class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span
            class="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto"
            >Showing
            <span class="font-semibold text-gray-900">1-10</span>
            of
            <span class="font-semibold text-gray-900">1000</span></span
          >
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                >Previous</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >1</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >2</a
              >
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                >3</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >4</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >5</a
              >
            </li>
            <li>
              <a
                href="#"
                class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                >Next</a
              >
            </li>
          </ul>
        </nav>
        <!-- View Applicant -->
      </div>
    </div>
  </div>
</template>

<script setup>
import useModal from "@/composables/useModal";
import { useAuthStore } from "@/stores/authStore";
import { useModalStore } from "@/stores/modalStore.js";

const { hideModal, showClosableModal } = useModal();

const viewListing = () => {
  // Initialize useModal composable
  const modalId = "viewListing";
  showClosableModal(modalId);
};

const modalStore = useModalStore();

const updateApplicant = (n) => {
  // close modal
  const modalId = "updateApplicantStatusModal";
  hideModal(modalId);

  console.log(n);
  let info = n + " username's application?";
  modalStore.changeDialog(info);
  let func = {};

  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
    try {
      console.log("trying to run the function");
      // modalStore.showMessage("test het")
    } catch (error) {
      console.log(error);
    }
  };

  modalStore.OpenYesOrNOClick(func);
};
</script>