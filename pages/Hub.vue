<template>
  <div
    ref="bottomSheet"
    id="bottomModal"
    tabindex="-1"
    data-modal-target="bottomModal"
    data-modal-placement="bottom"
    aria-hidden="true"
    class="fixed bottom-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <Comments />
  </div>

  <!-- tabs -->
  <div
    class="grid grid-rows-[7.5%_1fr_2%] h-[86svh] max-h-[86svh] min-h-[86svh] overflow-y-hidden"
  >
    <div class="">
      <ul class="flex justify-center items-center rounded-3xl text-center p-1">
        <li
          style="padding: 0.5rem"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="activeTab = index"
          class="text-xs md:text-sm lg:text-base min-w-[30%] mx-auto"
          :class="
            activeTab === index
              ? 'text-white border-b-2 bg-[#132E35] rounded-3xl text-center border-[#132E35] pb-4'
              : 'text-gray-500 border-b-2 pb-4'
          "
        >
          {{ tab }}
        </li>
      </ul>
    </div>

    <div class="w-full bg-red overflow-hidden p-2 mx-auto">
      <div class="sm:w-11/12 sm:pl-40" v-show="activeTab === 0">
        <!-- Education timeLine -->

        <div class="flex max-h-[76svh] h-[76svh] min-h-[86svh] overflow-hidden">
          <div class="max-h-[76svh] h-[76svh] w-full  rounded-2xl">
            <div class="h-[calc(74svh-1rem)] bg-transparent m-4 ">
              <Roam/>
            </div>
          </div>
        </div>
      </div>

      <div class="sm:w-11/12 sm:pl-40" v-show="activeTab === 1">
        <!-- Posts timeLine -->
        <!-- using the list method for now -->
        <ul class="scrollContainer h-[76svh] max-h-[76svh] overflow-hidden">
          <li class="scrollItem bg-white shadow rounded-lg mb-8">
            <div class="grid grid-rows-[10%_1fr_7%] h-[76svh] max-h-[76svh]">
              <!-- profile starts here -->

              <div class="flex flex-row p-2 mx-3">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <img
                      class="w-8 h-8 object-cover rounded-full cursor-pointer sm:w-10 sm:h-10"
                      src="/assets/images/profile-img.jpg"
                      alt="company image"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-gray-900 text-xs font-semibold sm:text-sm">
                      Christian Apeku
                    </p>
                    <p class="text-base font-semibold truncate">
                      <span
                        class="text-gray-800 font-base text-xs mr-1 cursor-pointer"
                      >
                        KNUST
                      </span>
                      <span class="text-gray-400 font-thin text-xs">
                        • 1 day ago
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <!-- profile ends here -->

              <div class="mx-3 px-2">
                <!-- with text and image -->
                <div
                  class="grid grid-rows-[7svh_1fr] gap-y-4 min-h-[63svh] max-h-[63svh] overflow-hidden"
                >
                  <div class="flex">
                    <p class="text-xs sm:text-base font-normal text-gray-900">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Quisquam repudiandae, voluptates deleniti laudantium
                      nostrum illum distinctio fuga ipsa quae praesentium.
                    </p>
                  </div>

                  <div class="image-preview-container">
                    <img
                      v-if="imageUrl"
                      src="../assets/imgg.jpeg"
                      alt="Preview Image"
                      class="preview-image w-full md:w-auto"
                    />
                  </div>
                </div>
              </div>

              <div class="flex justify-between mx-4">
                <button
                  class="flex items-center transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-black"
                >
                  <i class="bx bx-heart"></i> &nbsp;
                  <!-- Assuming this is your icon -->
                  <span class="sm:inline ml-1 text-xs">1,234</span>&nbsp;
                  <span class="sm:inline ml-1 text-xs">likes</span>
                </button>
                <button
                  @click="openComments()"
                  class="flex items-center transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-black"
                >
                  <span class="sm:inline ml-1 text-xs">34</span> &nbsp;
                  <span class="sm:inline ml-1 text-xs">comments</span>

                  <!-- Assuming this is your icon -->
                </button>
              </div>
            </div>
          </li>

          <li class="scrollItem bg-white shadow rounded-lg mb-8">
            <div class="grid grid-rows-[10%_1fr_7%] h-[76svh] max-h-[76svh]">
              <!-- profile starts here -->

              <div class="flex flex-row p-2 mx-3">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <img
                      class="w-8 h-8 object-cover rounded-full cursor-pointer sm:w-10 sm:h-10"
                      src="/assets/images/profile-img.jpg"
                      alt="company image"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-gray-900 text-xs font-semibold sm:text-sm">
                      Christian Apeku
                    </p>
                    <p class="text-base font-semibold truncate">
                      <span
                        class="text-gray-800 font-base text-xs mr-1 cursor-pointer"
                      >
                        KNUST
                      </span>
                      <span class="text-gray-400 font-thin text-xs">
                        • 1 day ago
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <!-- profile ends here -->

              <div class="mx-3 px-2">
                <!-- with text and image -->
                <div
                  class="grid grid-rows-[1fr] gap-y-4 min-h-[63svh] max-h-[63svh] overflow-hidden"
                >
                  <div class="flex justify-center items-center">
                    <p class="text-xs sm:text-base font-normal text-gray-900">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Alias aut ipsa minus et quo facilis optio quisquam
                      tempore, praesentium laborum esse quae soluta deleniti
                      nobis facere. Iusto neque voluptatibus necessitatibus
                      distinctio ipsum. Voluptate eveniet consequatur sequi
                      perferendis fuga ut placeat.
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex justify-between mx-4">
                <button
                  class="flex items-center transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-black"
                >
                  <i class="bx bx-heart"></i> &nbsp;
                  <!-- Assuming this is your icon -->
                  <span class="sm:inline ml-1 text-xs">134</span>&nbsp;
                  <span class="sm:inline ml-1 text-xs">likes</span>
                </button>
                <button
                  @click="openComments()"
                  class="flex items-center transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-black"
                >
                  <span class="sm:inline ml-1 text-xs">4</span> &nbsp;
                  <span class="sm:inline ml-1 text-xs">comments</span>

                  <!-- Assuming this is your icon -->
                </button>
              </div>
            </div>
          </li>
          <li class="scrollItem bg-white shadow rounded-lg mb-8">
            <div class="grid grid-rows-[10%_1fr_7%] h-[76svh] max-h-[76svh]">
              <!-- profile starts here -->

              <div class="flex flex-row p-2 mx-3">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <img
                      class="w-8 h-8 object-cover rounded-full cursor-pointer sm:w-10 sm:h-10"
                      src="/assets/images/profile-img.jpg"
                      alt="company image"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-gray-900 text-xs font-semibold sm:text-sm">
                      Christian Apeku
                    </p>
                    <p class="text-base font-semibold truncate">
                      <span
                        class="text-gray-800 font-base text-xs mr-1 cursor-pointer"
                      >
                        KNUST
                      </span>
                      <span class="text-gray-400 font-thin text-xs">
                        • 1 day ago
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <!-- profile ends here -->

              <div class="mx-3 px-2">
                <!-- with text and image -->
                <div
                  class="grid grid-rows-[1fr] gap-y-4 min-h-[63svh] max-h-[63svh] overflow-hidden"
                >
                  <div
                    class="min-h-[63svh] max-h-[63svh] overflow-hidden flex justify-center items-center"
                  >
                    <video
                      v-if="imageUrl"
                      src="../assets/video.mp4"
                      class="preview-image w-full md:w-auto"
                      controls
                      autoplay
                      loop
                      muted
                    ></video>
                  </div>
                </div>
              </div>

              <div class="flex justify-between mx-4">
                <button
                  class="flex items-center transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-black"
                >
                  <i class="bx bx-heart"></i> &nbsp;
                  <!-- Assuming this is your icon -->
                  <span class="sm:inline ml-1 text-xs">134</span>&nbsp;
                  <span class="sm:inline ml-1 text-xs">likes</span>
                </button>
                <button
                  @click="openComments()"
                  class="flex items-center transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-black"
                >
                  <span class="sm:inline ml-1 text-xs">4</span> &nbsp;
                  <span class="sm:inline ml-1 text-xs">comments</span>

                  <!-- Assuming this is your icon -->
                </button>
              </div>
            </div>
          </li>

          <div>
            <p class="m-10 text-center">end of the line</p>
          </div>
        </ul>
        <div></div>
      </div>

      <div class="sm:w-11/12 sm:pl-40" v-show="activeTab === 2"></div>
    </div>
    <div class=""></div>
  </div>
</template>

<script setup>
import Comments from "@/components/Posts/Comments.vue";
import { useAuthStore } from "../stores/authStore";
import { reactive } from "vue";

// Define loginData using reactive
const { showClosableModal } = useModal();
definePageMeta({
  layout: "mobile",
  auth: false,
});

const imageUrl = ref("../assets/lonimg.jpeg");

useHead({
  title: "Hub",
  meta: [{ name: "jobs you've applied for", content: "Student job list" }],
});
const tabs = ref(["Roam", "Stories", "Game"]);
const activeTab = ref(0);
const active = ref(false);

const toggleAccordion = () => {
  active.value = !active.value;
};

const showBmodal = () => {
  // Initialize useModal composable
  const modalId = "bottomModal";
  showClosableModal(modalId);
};

const openComments = () => {
  //opne the comments draggable
  const modalId = "bottomModal";
  showClosableModal(modalId);
};
</script>

<style scoped>

.scrollContainer {
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

.scrollItem {
  scroll-snap-align: start;
  overflow: hidden;
}

/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 2.5px;
  height: 2.5px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(80, 80, 80, 0.11);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(94, 94, 94, 0.178);
  background: #bfbfbf;
}
* {
  scrollbar-width: none !important;
}

.image-preview-container {
  height: 53svh;
  min-height: 53svh;
  max-height: 55svh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}
</style>