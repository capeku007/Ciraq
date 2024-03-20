<template>
<!-- view job modal -->
  <div
    id="jobInfo"
    tabindex="-1"
    data-modal-target="jobInfo"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]"
  >
    <div class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden">
      <div class="relative bg-white rounded-lg shadow">
        <div class="p-4 md:p-5">
          <div class="py-4 sticky top-0 z-10 bg-white rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <img
                  class="w-10 h-10 rounded-lg sm:w-16 sm:h-16"
                  src="../assets/knustlogo.png"
                  alt="company image"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs sm:text-base font-normal text-gray-500">
                  job.company
                </p>
                <p class="text-base sm:text-lg font-semibold">job.title</p>
              </div>
            </div>
            <div
              class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse"
            >
              <span
                class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
              >
                hybrid
              </span>

              <span
                class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2 py-1 rounded-lg"
              >
                intermediate
              </span>
              <span
                class="inline-flex items-center bg-gray-200 text-xs sm:text-base font-normal px-2.5 py-0.5 rounded-lg"
              >
                Part Time
              </span>
            </div>
          </div>
          <!-- job description -->
          <div>
            <div>
              <p class="text-base sm:text-lg font-semibold">Job Description</p>
              <p class="text-xs sm:text-base font-normal text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus distinctio odit, eaque vel fugit excepturi impedit
                atque facere, quia sint repellendus laudantium deserunt incidunt
                quod voluptatem, minima facilis? Beatae sunt harum recusandae
                cum fugit ipsam corrupti quod ipsum modi consequuntur
                perspiciatis dolorem, nesciunt earum reiciendis repellat
                deleniti quam, maiores hic! Fugit earum quidem placeat iusto
                tempora nisi esse, doloribus eveniet itaque aliquid maxime totam
                veniam dignissimos ut cupiditate voluptates deleniti architecto
                consectetur alias minima repudiandae! Dolorum vero magnam ea
                eius.
              </p>
            </div>
            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">
                A Must Have Skill
              </h2>
              <ul
                class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
              >
                <li>Javascript</li>
                <li>Html css</li>
                <li>Figma</li>
              </ul>
            </div>
            <div class="mt-4">
              <h2 class="text-sm sm:text-base font-semibold">
                Candidate Recruitment
              </h2>
              <ul
                class="text-xs sm:text-base font-normal text-gray-500 list-disc list-inside space-y-1"
              >
                <li>Studying computer science or relate subjects</li>
                <li>1-2 years experience in photoshop</li>
                <li>Good communication design and creative skills</li>
                <li>Max Age of 35 years</li>
              </ul>
            </div>
          </div>

          <!-- apply button -->
          <div class="mt-4">
            <!-- <button
              class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            >
              Apply Job
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="h-[81svh] m-2 p-2">
    <div class="parent">
      <div class="div1">
        <!-- component -->
        <div class="h-[16.2vh] w-full flex justify-center items-center">
          <div class="absolute flex justify-center items-center">
            <div class="w-full h-1/2 flex flex-col justify-center items-center">
              <img
                class=" h-15 w-15 rounded-full"
                src="http://ciraq.co/api/public/uploads/1709342552416profilepic.jpg" alt=""
              />
              <h1 class="text-gray-700 font-bold">{{user.fname }} {{user.lname}}</h1>
              <!-- <p class="text-gray-500 text-xs">Year 3</p> -->
            </div>
          </div>

          <div
            class=" w-full flex flex-col justify-around items-center"
          >
            <div class="w-full h-1/2 flex justify-between items-center px-1">
              <div class="flex flex-col justify-center items-center">
                <h1 class="text-xs">{{user.institution}}</h1>
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
                <h1 class="text-xs">{{user.degree_program}}</h1>
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
          <div class="pb-1 mt-1 bg-white rounded-lg">
            <button
              class="flex items-center justify-between w-full p-1 mt-2 font-medium text-gray-500 gap-3"
              :class="{ active: active }"
              @click="toggleAccordion"
            >
              <span class="uppercase sm:pl-4 text-black text-xs font-bold">
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
              {{user}}
            </div>
          </div>

          <!-- tabs -->
          <div class="flex justify-center items-center">
            <div class="h-[60vh] overflow-y-auto w-full">
              <ul
                class="flex justify-center items-center sticky top-0 z-10 bg-white rounded-lg"
              >
                <li
                  style="padding: 0.5rem"
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="activeTab = index"
                  class="text-xs md:text-sm lg:text-base"
                  :class="
                    activeTab === index
                      ? 'text-[#132E35] border-b-2 border-[#132E35] pb-4'
                      : 'text-gray-500 border-b-2 pb-4'
                  "
                >
                  {{ tab }}
                </li>
              </ul>

              <div class="w-full bg-white mt-2 p-2 mx-auto">
                <div class="" v-show="activeTab === 0">
                  <!-- Work History timeLine -->
                  <div class="sm:w-11/12 sm:pl-40">
                    <ol class="relative border-s border-gray-200">
                      <li @click="openWorkHistoryInfo">
                        <div class="p-4 mb-5 bg-white">
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
                              11/11/2022 - 03/27/2024
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
                              <p
                                class="text-base sm:text-lg font-semibold truncate"
                              >
                                job.title
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>

                <div v-show="activeTab === 1">
                  <!-- Education timeLine -->
                  <div class="sm:w-11/12 sm:pl-40">
                    <ol class="relative border-s border-gray-200">
                      <li class="mb-10 ms-6">
                        <span
                          class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
                        >
                          <i class="bx bxs-briefcase"></i>
                        </span>
                        <p
                          class="mb-1 text-base sm:text-lg font-semibold text-gray-900"
                        >
                          Kwame Nkrumah University of Science and Technology
                          KNUST
                        </p>
                        <time
                          class="mb-2 text-xs sm:text-sm font-normal leading-none text-gray-400"
                        >
                          12/22/2020 - 12/11/2024</time
                        >
                        <p class="text-sm font-normal text-gray-500">
                          Bsc Computer Science
                        </p>
                      </li>
                    </ol>
                  </div>
                </div>
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
const { showClosableModal } = useModal();
const active = ref(false);

useHead({
  title: 'Profile',
  meta: [
    { name: "jobs you've applied for", content: 'Student job list' }
  ],
})

const toggleAccordion = () => {
  active.value = !active.value;
};

// user details
const user = authStore.getUser || {
  fname:"John",
  lname:"saint"
};
const userImage = authStore.getUserImage;

const openWorkHistoryInfo = () => {
  // Initialize useModal composable
  const modalId = "jobInfo";
  showClosableModal(modalId);
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

/* ul {
  min-width: 100%;
  text-align: center;
}

/* li {
  display: inline-block;
  cursor: pointer;
  padding: 0.2rem 1rem;
} */

svg {
  transition: transform 0.3s ease;
}

.scrollbar-hidden::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

/* Hide scrollbar for Firefox */
.scrollbar-hidden {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* Hide scrollbar for Chrome */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

</style>
