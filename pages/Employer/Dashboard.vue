<template>

<!-- MODALS HERE -->
<div
  id="viewApplicantModal"
  data-modal-target="viewApplicantModal"
  aria-hidden="true"
  class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0"
>

      <div
        class="relative w-full  max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
      >
        <div class="relative bg-white rounded-lg shadow">
          <div class="p-4 md:p-5">
            <div
              class="flex justify-center items-center max-w-md mx-auto rounded-lg overflow-hidden md:max-w-lg"
            >
              <div class="relative flex flex-wrap w-11/12">
                <div class="w-full">
                  <div>
                    <div class="flex justify-center items-center text-gray-700">
                      <img class="w-24" src="/assets/logo.png" />
                    </div>

                    <div class="pb-2 pt-8">
                      <div class="flex items-center justify-between">
                        <label for="password" class="px-1 text-sm text-gray-600"
                          >Student email</label
                        >
                      </div>
                      <div class="relative">
                        <input
                          placeholder=""
                          type="email"
                          class="text-md block px-3 py-2 mt-1 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow focus:placeholder-gray-500 focus:bg-white focus:border-[#132E35] focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      class="text-lg font-semibold mt-3 bg-[#132E35] w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                    >
                      
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
  <div class="min-h-[87svh] max-h-[87svh] grid grid-rows-[12svh_1fr]">
    <div class="flex bg-white flex-wrap rounded-lg">
      <div class="w-1/12 p-2">
        <div
          class="flex border-2 rounded-lg py-2 px-4 w-full"
          @click="selectItem(1)"
        >
          <div class="flex-1 min-w-0">
            <p class="text-xs font-normal text-gray-500 truncate">
              Posted Jobs
            </p>
            <p class="text-2xl font-semibold truncate">19</p>
          </div>

          <div class="flex-shrink-0">
            <i
              class="border-2 p-2 rounded-full bx bx-briefcase-alt text-2xl block"
            ></i>
          </div>
        </div>
      </div>
      <div class="w-1/12 p-2">
        <div
          class="flex border-2 rounded-lg py-2 px-4 w-full"
          @click="selectItem(2)"
        >
          <div class="flex-1 min-w-0">
            <p class="text-xs font-normal text-gray-500 truncate">Applicants</p>
            <p class="text-2xl font-semibold truncate">19</p>
          </div>

          <div class="flex-shrink-0">
            <i
              class="border-2 p-2 rounded-full bx bx-briefcase-alt text-2xl block"
            ></i>
          </div>
        </div>
      </div>
      <div class="w-1/12 p-2">
        <div
          class="flex border-2 rounded-lg py-2 px-4 w-full"
          @click="selectItem(3)"
        >
          <div class="flex-1 min-w-0">
            <p class="text-xs font-normal text-gray-500 truncate">
              Shortlisted
            </p>
            <p class="text-2xl font-semibold truncate">19</p>
          </div>

          <div class="flex-shrink-0">
            <i
              class="border-2 p-2 rounded-full bx bx-briefcase-alt text-2xl block"
            ></i>
          </div>
        </div>
      </div>
      <div class="w-1/12 p-2">
        <div
          class="flex border-2 rounded-lg py-2 px-4 w-full"
          @click="selectItem(4)"
        >
          <div class="flex-1 min-w-0">
            <p class="text-xs font-normal text-gray-500 truncate">Hired</p>
            <p class="text-2xl font-semibold truncate">19</p>
          </div>

          <div class="flex-shrink-0">
            <i
              class="border-2 p-2 rounded-full bx bx-briefcase-alt text-2xl block"
            ></i>
          </div>
        </div>
      </div>
      <div class="w-1/12 p-2">
        <div
          class="flex border-2 rounded-lg py-2 px-4 w-full"
          @click="selectItem(5)"
        >
          <div class="flex-1 min-w-0">
            <p class="text-xs font-normal text-gray-500 truncate">
              Interested Students
            </p>
            <p class="text-2xl font-semibold truncate">19</p>
          </div>

          <div class="flex-shrink-0">
            <i
              class="border-2 p-2 rounded-full bx bx-briefcase-alt text-2xl block"
            ></i>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white mt-4 rounded-lg" v-if="showDiv === 1">
      <div>
        <div class="relative overflow-x-auto shadow-md srounded-lg p-2">
          <div
            class="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 bg-white"
          >
            <div class="text-base font-semibold ml-4"> Applicants</div>

            <!-- <label for="table-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div> -->
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
                      @click="viewApplicant()"
                      class="font-medium text-blue-600 hover:underline"
                    >
                      View Profile
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
    <div v-if="showDiv === 2">2</div>
    <div v-if="showDiv === 3">3</div>
    <div v-if="showDiv === 4">4</div>
    <div v-if="showDiv === 5">5</div>


    
  </div>
</template>
<script setup>
import { useAuthStore } from "../stores/authStore";
import { reactive } from "vue";
useHead({
  title: "Dashboard",
  meta: [{ name: "description", content: "Employer hub" }],
});
// Define loginData using reactive
definePageMeta({
  // middleware: ["already-auth"],
  // layout: "employer",
  layout: "company",
});

const showDiv = ref(1);

const selectItem = (index) => {
  showDiv.value = index;
};


const { showClosableModal } = useModal();
const loggedIn = ref(true);
const viewApplicant = () => {
  // Initialize useModal composable
  const modalId = "viewApplicantModal";
  showClosableModal(modalId);
};
onMounted(() => {});

onBeforeUnmount(() => {});
</script>
