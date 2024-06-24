<template>
  <!-- view job modal -->
  <div
    id="jobInfo"
    tabindex="-1"
    data-modal-target="jobInfo"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]"
  >
    <div
      class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
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

  <!-- edit modal -->
  <div
    id="editProfile"
    tabindex="-1"
    data-modal-target="editProfile"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]"
  >
    <div
      class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <div class="relative bg-white rounded-lg shadow">
        <i
          @click="hideModal('editProfile')"
          class="absolute bx bx-x-circle top-2 right-0 px-4 py-2 text-2xl text-gray-400 hover:text-red-600"
        ></i>
        <div class="p-4 md:p-5">
          <div
            class="flex justify-center items-center max-w-md mx-auto rounded-lg overflow-hidden md:max-w-lg"
          >
            <div class="relative flex flex-wrap w-11/12">
              <div class="w-full">
                <div class="w-full mt-6 px-4 relative">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    BIO
                  </label>
                  <textarea
                    type="text"
                    v-model="user.bio"
                    id="chat"
                    style="resize: none"
                    rows="4"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Your bio..."
                  ></textarea>
                </div>

                <div class="mt-4">
                  <button
                    @click="updateBio()"
                    class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- edit modal -->
  <div
    id="editImg"
    tabindex="-1"
    data-modal-target="editImg"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]"
  >
    <div
      class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <div class="relative bg-white rounded-lg shadow">
        <div class="p-4 md:p-5">
          <div
            class="flex justify-center items-center max-w-md mx-auto rounded-lg overflow-hidden md:max-w-lg"
          >
            <div class="relative flex flex-wrap w-11/12">
              <div class="w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div
    class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl grid grid-rows-[1fr] p-2 h-[85svh] max-h-[85svh] min-h-[85svh] overflow-hidden"
  >
    <div class="parent bg-white">
      <div class="div1">
        <!-- component -->
        <div
          class="min-h-[16svh] max-h-[16svh] w-full flex justify-center items-center px-2 pt-2 sm:pt-4"
        >
          <div class="sm:pl-4 flex w-full items-center mb-4">
            <div class="relative mr-4">
              <div class="absolute right-1 top-1 z-10">
                <input
                  type="file"
                  id="imageUpload"
                  accept=".png, .jpg, .jpeg"
                  class="hidden"
                  @change="onFileChange"
                />
                <label
                  for="imageUpload"
                  class="inline-block w-6 h-6 rounded-full bg-white shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-100 hover:border-gray-300 relative"
                >
                  <i
                    class="bx bx-camera absolute inset-1.5 flex items-center justify-center text-gray-600 text-xs"
                  ></i>
                </label>
              </div>
              <div
                class="w-[4.5rem] h-[4.5rem] sm:w-[5rem] sm:h-[5rem] rounded-full overflow-hidden shadow mx-auto flex justify-center bg-blue-300/20 bg-cover bg-center bg-no-repeat"
              >
                <div
                  :style="{ backgroundImage: `url(${imageSrc})` }"
                  class="w-full h-full bg-cover bg-no-repeat bg-center"
                ></div>
              </div>
            </div>
            <div>
              <p class="text-lg font-bold">
                {{ user.fname }}
                {{ user.lname }}
              </p>
              <p class="text-sm text-gray-600">
                <!-- <span class="mr-3">{{ user.program_offered }}</span> -->
                <!-- <span class="mr-3 border-r border-gray-200 max-h-0"></span> -->
                <span>{{ user.institution_name }}</span>
              </p>
              <p class="text-sm text-gray-600">
                {{ formatDate(user.dob) }} | {{ user.gender }} |
                {{ currentYear(user.start_date) }}
              </p>
              <p class="text-sm text-gray-600"></p>
            </div>
            <div class="ml-auto">
              <button
                @click="showModal('editProfile')"
                class="flex items-center py-1 px-2 rounded-lg text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                <i class="bx bx-edit"></i>
                <span class="hidden sm:inline ml-1">Edit Bio</span>
              </button>
            </div>
          </div>
        </div>

        <!-- scrollable -->
        <div class="h-[63vh] overflow-y-auto w-full px-2">
          <!-- Professional summary -->
          <div class="pb-1 mt-1 bg-white rounded-lg">
            <button
              class="flex items-center justify-between w-full p-1 mt-2 font-medium text-gray-500 gap-3"
            >
              <span class="uppercase sm:pl-4 text-black text-xs font-bold">
                Professional Summary</span
              >
            </button>
            <div
              class="ml-8 accordion-content px-2 text-xs sm:text-sm mt-0 pt-0"
            >
              {{ user.bio }}
            </div>
          </div>

          <!-- Education summary -->
          <div class="pb-1 mt-4 bg-white rounded-lg">
            <button
              class="flex items-center justify-between w-full p-1 mt-2 font-medium text-gray-500 gap-3"
            >
              <span class="uppercase sm:pl-4 text-black text-xs font-bold">
                Education</span
              >
            </button>
            <div
              class="sm:ml-8 ml-4 accordion-content px-2 text-xs sm:text-sm mt-0 pt-0"
            >
              <div class="flex flex-col space-y-4 sm:mr-8 mr-4">
                <div
                  class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
                >
                  <div class="order-1 font-semibold">
                    {{ user.institution_name }} <br />
                    <span class="font-normal text-sm text-gray-600">{{
                      user.program_offered
                    }}</span>
                  </div>
                  <div class="order-2 text-sm text-gray-600 mt-0 sm:mt-0">
                    location <br />
                    <span class="font-medium text-sm text-gray-600">
                      {{ user.start_date }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- tabs -->
          <div class="flex mt-2 px-2">
            <div class="w-full">
              <ul
                class="flex mt-2 sm:pl-4 sticky top-0 z-10 bg-white rounded-lg"
              >
                <li
                  style="padding: 0.2rem"
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="activeTab = index"
                  class="uppercase sm:pl-4 text-black text-xs font-bold"
                  :class="
                    activeTab === index
                      ? 'text-[#132E35] border-b-2 border-[#132E35] pb-1'
                      : 'text-gray-500 border-b-2 pb-1'
                  "
                >
                  {{ tab }}
                </li>
              </ul>

              <div class="w-full bg-white p-2">
                <div class="" v-show="activeTab === 0">
                  <!-- Work History timeLine -->
                  <div class="sm:w-11/12 ml-4">
                    <ol class="relative border-s border-gray-200">
                      <li
                        @click="openWorkHistoryInfo"
                        v-for="(work, index) in user.work_history"
                        :key="index"
                      >
                        <div class="p-4 mb-5 bg-white">
                          <span
                            class="absolute flex w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white"
                          >
                            <i class="bx bxs-briefcase"></i>
                          </span>

                          <div
                            class="flex justify-between mb-2 space-x-3 rtl:space-x-reverse"
                          >
                            <span
                              class="text-sm font-normal leading-none text-gray-400 px-2.5 py-0.5"
                            >
                              {{ formatDate(work.start_date) }}-
                              {{ formatDate(work.start_date) }}
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
                                {{ work.company_name }}
                              </p>
                              <p
                                class="text-base sm:text-lg font-semibold truncate"
                              >
                                {{ work.position }}
                              </p>
                            </div>
                          </div>
                        </div>
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
import { useMainStore } from "~/stores/main";
import { useFormatDate } from "@/composables/useFormatDate";
const { formatDate, currentYear, initialsFromName } = useFormatDate();
const activeTab = ref(0);
const tabs = ref(["Work History", "Projects"]);
const authStore = useAuthStore();
const { showClosableModal, showModal, hideModal } = useModal();
const active = ref(false);
definePageMeta({
  layout: "mobile",
  middleware: ["unauthstd"],
});
useHead({
  title: "Profile",
  meta: [{ name: "my profile", content: "my profile" }],
});

const mainStore = useMainStore();
const userInfo = ref();

const newBio = ref("");

const updateBio = async () => {
  let requestBody = {
    bio: user.bio,
  };
  try {
    const response = await fetch(
      mainStore.urlbase + "user/update-accountinfo",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authStore.token,
        },
        body: JSON.stringify(requestBody),
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to update bio.");
      throw error;
    } else {
      console.log("bio updated successfully:", responseData);
      // Add any additional logic or state updates here
      return responseData;
    }
  } catch (error) {
    console.error("Failed to update profile:", error);
    // Handle the error as needed (e.g., display an error message to the user)
  } finally{
    hideModal('editProfile');
    authStore.fetchUser()
  }
};



const imageSrc = ref('http://i.pravatar.cc/500?img=7'); // Default image URL
const uploadedFileName1 = ref(null);
const stdid_img_name = ref(null);

const onFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      imageSrc.value = event.target.result; // Set the preview image
    };
    reader.readAsDataURL(file);

    stdid_img_name.value = file;
    uploadedFileName1.value = null; // Reset the uploaded file name

    // Wait for the DOM to update
    await nextTick();
    uploadedFileName1.value = file.name; // Set the uploaded file name

    // Prepare the form data
    const formData = new FormData();
    formData.append("studentid", file);

    // Make the API request
    try {

const response = await fetch(
  mainStore.urlbase + "user/update-accountinfo",
  {
    method: "PUT",
    headers: {
      Authorization: authStore.token,
    },
    body: formData,
  }
);

      if (response.data.successful) {
        console.log("Image upload successful");
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  } else {
    imageSrc.value = 'http://i.pravatar.cc/500?img=7'; // Reset to default image
    uploadedFileName1.value = null;
  }
};

const toggleAccordion = () => {
  active.value = !active.value;
};

// user details
const user = authStore.getUser || {
  fname: "John",
  lname: "saint",
};
const userImage = authStore.getUserImage;

const openWorkHistoryInfo = () => {
  // Initialize useModal composable
  const modalId = "jobInfo";
  showClosableModal(modalId);
};
onMounted(() => {
  // Fetch user data and user image when component is mounted
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
