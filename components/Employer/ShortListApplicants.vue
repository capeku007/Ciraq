<template>
  <div>
    <!-- MODALS HERE -->
    <div
      id="viewApplicantModal"
      data-modal-target="viewApplicantModal"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
    >
      <div
        class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <div class="relative bg-white rounded-lg shadow">
          <div class="p-4 md:p-5">
            <div class="mx-auto rounded-lg overflow-hidden">
              <div class="relative flex flex-wrap w-11/12">
                <div class="w-full">
                  <ProfileView />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      id="updateApplicantStatusModal"
      data-modal-target="updateApplicantStatusModal"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
    >
      <div
        class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <div class="relative">
          <div class="">
            <div class="mx-auto rounded-lg overflow-hidden">
              <div class="bg-white rounded-2xl p-4 shadow-md mb-12">
                <div class="content">
                  <div class="flex items-center mb-4">
                    <div class="mr-4">
                      <img
                        class="w-24 h-24 rounded-full"
                        src="https://i.postimg.cc/bryMmCQB/profile-image.jpg"
                        alt="Profile Image"
                      />
                    </div>
                    <div>
                      <p class="text-lg font-bold">Ethan Rivers</p>
                      <p class="text-sm text-gray-600">
                        <span class="mr-3">Bsc Industrial Art</span
                        ><span
                          class="mr-3 border-r border-gray-200 max-h-0"
                        ></span
                        ><span>KNUST</span>
                      </p>
                      <p class="text-sm text-gray-600">Year 3</p>
                      <p class="text-sm text-gray-600">No active jobs</p>
                    </div>
                  </div>
                  <div class="text-left mb-6">
                    <!-- <p class="text-lg font-bold mb-2">About</p> -->
                    <p class="text-sm text-gray-600">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Dolores, placeat obcaecati. Eaque fugit eveniet error
                      voluptates totam enim molestias vitae, amet aliquid
                      deleniti ipsa ea.
                    </p>
                  </div>
                  <div class="flex justify-around">
                    <button
                      @click="updateApplicant('Reject')"
                      class="w-2/6 bg-red-600 border text-white px-6 py-2 rounded-lg font-bold"
                    >
                      Reject
                    </button>

                    <button
                      @click="updateApplicant('Hire')"
                      class="w-2/6 bg-green-600 border text-white px-6 py-2 rounded-lg font-bold"
                    >
                      Hire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- MODALS END HERE -->

    <div>
      <div class="relative overflow-x-auto shadow-md srounded-lg p-2">
        <div
          class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
        >
          <div class="text-base font-semibold ml-4">Shortlist</div>
        </div>
        <div class="overflow-y-auto h-[70svh]">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="sticky top-0 bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">Name</th>
                <th scope="col" class="px-6 py-3">School</th>
                <th scope="col" class="px-6 py-3">Listing</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b hover:bg-gray-50">
                <th
                  scope="row"
                  class="flex items-center px-6 py-1 text-gray-900 whitespace-nowrap"
                  @click="viewApplicant()"
                >
                  <img class="w-8 h-8 rounded-full" src="" alt="Jese image" />
                  <div class="ps-3">
                    <div class="text-base font-semibold">Neil Sims</div>
                    <div class="font-normal text-gray-500">
                      neil.sims@flowbite.com
                    </div>
                  </div>
                </th>
                <td class="px-6 py-1">React Developer</td>
                <td class="px-6 py-1">Data entry</td>
                <td class="px-6 py-1">
                  <button
                    type="button"
                    @click="updateApplication()"
                    class="font-medium text-blue-600 hover:underline"
                  >
                    Action
                  </button>
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
const viewApplicant = () => {
  // Initialize useModal composable
  const modalId = "viewApplicantModal";
  showClosableModal(modalId);
};

const updateApplication = () => {
  // Initialize useModal composable
  const modalId = "updateApplicantStatusModal";
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