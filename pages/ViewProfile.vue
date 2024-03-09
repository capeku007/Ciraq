<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            This is the default tile!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            This is the default body!
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            This is the default footer!
          </slot>
          <button
            type="button"
            class="btn-green"
            @click="close"
            aria-label="Close modal"
          >
            Close me!
          </button>
        </footer>
      </div>
    </div>
  </transition>
  <div class="h-[81vh] m-2 p-2">
    <div class="parent">
      <div class="div1">
        <!-- component -->
        <div class="h-[16.2vh] w-full flex justify-center items-center">
          <div class="absolute flex justify-center items-center">
            <div class="w-full h-1/2 flex flex-col justify-center items-center">
              <img
                class="object-cover h-20 w-20 rounded-full"
                src="https://images.unsplash.com/photo-1484608856193-968d2be4080e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                alt=""
              />
              <h1 class="text-gray-700 font-bold">Maria R.</h1>
              <!-- <p class="text-gray-500 text-xs">Year 3</p> -->
            </div>
          </div>

          <div
            class="bg-white w-full rounded-3xl flex flex-col justify-around items-center"
          >
            <div class="w-full h-1/2 flex justify-between items-center px-1">
              <div class="flex flex-col justify-center items-center">
                <h1 class="text-xs">KNUST</h1>
                <div class="flex items-center">
                  <button
                    class="flex items-center py-1 px-2 rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300"
                  >
                    <i class="bx bx-edit"></i>
                    <!-- Assuming this is your icon -->
                    <span class="hidden sm:inline ml-1">Edit Account</span>
                  </button>
                </div>
              </div>

              <div class="flex flex-col justify-center items-center">
                <h1 class="text-xs">BA Industrial Art</h1>
                <div class="flex items-center">
                  <button
                    class="flex items-center py-1 px-2 rounded-lg text-[#007ABB] hover:bg-[#007ABB] hover:text-white transition-colors duration-300"
                  >
                    <i class="bx bx-chat"></i>
                    <!-- Assuming this is your icon -->
                    <span class="hidden sm:inline ml-1">Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <div class="border-b border-gray-300 w-8/12"></div>
        </div>
        <!-- scrollable -->
        <div class="h-[64.8vh]">
          <!-- Professional summary -->
          <div class="pb-1 mt-1">
            <button
              class="flex items-center justify-between w-full p-1 mt-2 font-medium  text-gray-500 gap-3"
              :class="{ active: active }"
              @click="toggleAccordion"
            >
              <span class="block uppercase  sm:pl-4  text-black text-xs font-bold">
                 Professional Summary</span
              >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transform transition-transform text-black"
                :class="{ 'rotate-180': active }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              @click="toggleAccordion"
              class="accordion-content px-2 text-xs sm:text-sm mt-0 pt-0"
              v-show="active"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              sed posuere erat. Vestibulum tempor lobortis mi, eget luctus arcu
              tristique id. Ut nec ex sit amet arcu lacinia vestibulum. Sed id
              arcu urna. Cras nec sapien in elit hendrerit sodales. Sed volutpat
              leo eu mauris euismod, at tristique velit fermentum. Nullam tempus
              magna sed ullamcorper luctus. Proin a nulla vel libero fermentum
              fringilla ut id tortor. Integer accumsan, metus in rhoncus
              malesuada, est justo lobortis lacus, nec interdum lacus odio sed
              velit. Quisque hendrerit velit sapien, sed suscipit lorem accumsan
              vel. Aliquam erat volutpat. Sed laoreet purus et felis elementum,
              sed sagittis mi tincidunt. Quisque ac dolor in sem malesuada
              rutrum. Nulla facilisi. Suspendisse fringilla metus sit amet
              ligula mollis, nec venenatis nulla fermentum. end
            </div>
          </div>

          <div class="flex justify-center">
            <div class="border-b border-gray-300 w-8/12"></div>
          </div>

          <!-- tabs -->
          <div class="flex justify-center items-center">
            <div class="h-[60vh] overflow-y-auto w-full">
              <ul
                class="flex justify-center items-center my-1 sticky top-0 z-10 bg-white"
              >
                <li
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="activeTab = index"
                  class="text-xs md:text-sm lg:text-base"
                  :class="
                    activeTab === index
                      ? 'text-[#132E35] border-b-2 border-[#132E35]'
                      : 'text-gray-500 border-b-2'
                  "
                >
                  {{ tab }}
                </li>
              </ul>

              <div class="w-full bg-white p-2 mx-auto">
                <div class="" v-show="activeTab === 0">
                  <!-- Work History timeLine -->
                  <div class="sm:w-11/12 sm:pl-40">
                    <ol class="relative border-s border-gray-200">
                      <li>
                        <div class="card p-4 mb-5 bg-white">
                          <span
                            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
                          >
                            <i class="bx bxs-briefcase"></i>
                          </span>

                                                    <div
                            class="flex justify-between mb-2 space-x-3 rtl:space-x-reverse"
                          >
                            <span
                              class="text-sm font-normal leading-none text-gray-400 px-2.5 py-0.5"
                            >
                              11/11/2022  - 03/27/2024
                            </span>
                          </div>
                          <div
                            class="flex items-center space-x-3 rtl:space-x-reverse"
                          >
                            <div class="flex-shrink-0">
                              <img
                                class="w-10 h-10 rounded-lg sm:w-16 sm:h-16"
                                src="../assets/knustlogo.png"
                                alt="company image"
                              />
                            </div>
                            <div class="flex-1 min-w-0 ml-8">
                              <p
                                class="text-xs sm:text-base font-normal text-gray-500 truncate"
                              >
                                job.company
                              </p>
                              <p class="text-base sm:text-lg font-semibold truncate">
                                job.title
                              </p>
                            </div>
                          </div>
                         
                        </div>
                      </li>

                      <li class="mb-10 ms-6">
                        <span
                          class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
                        >
                          <i class="bx bxs-briefcase"></i>
                        </span>
                        <p class="mb-1 text-lg font-semibold text-gray-900">
                          MTN Ghana Headquarters
                        </p>
                        <time
                          class="block mb-2 text-sm font-normal leading-none text-gray-400"
                        >
                          12/22/2021 - 12/11/2024</time
                        >
                        <p class="text-base font-normal text-gray-500">
                          All of the pages and components are first designed in
                          Figma and we keep a parity between the two versions
                          even as we update the project.
                        </p>
                      </li>
                      <li class="ms-6">
                        <span
                          class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
                        >
                          <svg
                            class="w-2.5 h-2.5 text-blue-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                            />
                          </svg>
                        </span>
                        <h3 class="mb-1 text-lg font-semibold text-gray-900">
                          Flowbite Library v1.2.2
                        </h3>
                        <time
                          class="block mb-2 text-sm font-normal leading-none text-gray-400"
                          >Released on December 2nd, 2021</time
                        >
                        <p class="text-base font-normal text-gray-500">
                          Get started with dozens of web components and
                          interactive elements built on top of Tailwind CSS.
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
                
                <div v-show="activeTab === 1">                <!-- Education timeLine -->
                  <div class="sm:w-11/12 sm:pl-40">
                    <ol class="relative border-s border-gray-200">


                      <li class="mb-10 ms-6">
                        <span
                          class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
                        >
                          <i class="bx bxs-briefcase"></i>
                        </span>
                        <p class="mb-1 text-lg font-semibold text-gray-900">
                          Kwame Nkrumah University of Science and Technology KNUST
                        </p>
                        <time
                          class="block mb-2 text-sm font-normal leading-none text-gray-400"
                        >
                          12/22/2020 - 12/11/2024</time
                        >
                        <p class="text-base font-normal text-gray-500">
                          Bsc Computer Science
                        </p>
                      </li>

                    </ol>
                  </div></div>
                <div v-show="activeTab === 2">
                  <p class="text-center">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/authStore";
const activeTab = ref(0);
const tabs = ref(["Work History", "Education", "Projects"]);
const authStore = useAuthStore();

const userImage = ref(""); // Data property to store user image
const active = ref(false);

const toggleAccordion = () => {
  active.value = !active.value;
};
onMounted(() => {
  // Fetch user data and user image when component is mounted
  authStore.fetchUser().then(() => {
    authStore.fetchUserImage(authStore.getUser); // Call fetchUserImage with the user data
  });
});
</script>

<style scoped>
.parent {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 2 / 2;
  height: 16.2vh;
  max-height: 16.2vh;
  background-color: white;
}

ul {
  min-width: 100%;
  text-align: center;
}

li {
  display: inline-block;
  cursor: pointer;
  padding: 0.2rem 1rem;
}

svg {
  transition: transform 0.3s ease;
}
</style>
