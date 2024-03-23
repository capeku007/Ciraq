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
    <div class="bottom-sheet">
      <div ref="sheetContent" class="content">
        <div
          ref="dragIcon"
          class="header max-h-5 cursor-grab select-none dragIcon"
          @mousedown="dragStart"
          @touchstart="dragStart"
        >
          <span class="block h-1 w-10 bg-gray-300 rounded-full"></span>
        </div>
        <div class="grid grid-rows-[7.5%_1fr_15%] min-h-full max-h-full">
          <div class="">
            <p
              class="text-gray-900 text-xs font-semibold sm:text-sm text-center"
            >
              Comments
            </p>
          </div>
          <!-- comments -->
          <div class="overflow-y-auto">
            <div class="w-full">
              <ul>
                <li class="mb-4">
                  <div class="flex items-start gap-2.5">
                    <img
                      class="w-8 h-8 rounded-full"
                      src="/assets/images/profile-img.jpg"
                      alt="image"
                    />
                    <div class="flex flex-col gap-1 w-full">
                      <div class="flex items-center space-x-2">
                        <span class="text-sm font-semibold text-gray-900"
                          >Bonnie Green</span
                        >
                        <span class="text-sm font-normal text-gray-500"
                          >11:46</span
                        >
                      </div>
                      <div class="flex flex-col leading-1.5">
                        <p
                          class="text-sm font-normal text-gray-900 dark:text-white"
                        >
                          That's awesome. I think our users will really
                          appreciate the improvements.
                        </p>
                      </div>
                      <span
                        class="text-sm font-normal text-gray-500 dark:text-gray-400"
                        >21 likes</span
                      >
                    </div>
                    <button
                      class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 rounded-lg hover:bg-gray-100"
                      type="button"
                    >
                      <i class="bx bx-heart"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- post comment -->
          <div class="my-auto">
            <div class="flex">
              <div class="flex justify-center w-[15%]">
                <img
                  class="w-10 h-10 rounded-full"
                  src="/assets/images/profile-img.jpg"
                  alt="Rounded avatar"
                />
              </div>

              <div class="flex justify-center mx-auto w-[85%]">
                <label for="voice-search" class="sr-only">Search</label>
                <div class="relative w-[90%]">
                  <input
                    type="text"
                    id="comment"
                    class="overflow-y-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl block w-full ps-4 pe-8 p-2.5"
                    placeholder="Add a comment"
                    required
                  />

                  <button
                    type="button"
                    class="absolute inset-y-0 end-2 flex items-center pe-2"
                  >
                    <i
                      class="bx bx-message-square-dots w-4 h-4 text-gray-500"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
        <button @click="showBmodal">show</button>
        <div
          ref="bottomSheet"
          id="bottomModal"
          tabindex="-1"
          data-modal-target="bottomModal"
          data-modal-placement="bottom"
          aria-hidden="true"
          class="fixed bottom-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="bottom-sheet">
            <div ref="sheetContent" class="content">
              <div
                ref="dragIcon"
                class="header max-h-5 bg-red-500 cursor-grab select-none dragIcon"
                @mousedown="dragStart"
                @touchstart="dragStart"
              >
                <span class="block h-1 w-10 bg-gray-200 rounded-full"></span>
              </div>
              <div class="modalBody">
                <h2>Bottom Sheet Modal</h2>
                <p>
                  Create a bottom sheet modal that functions similarly to
                  Facebook modal using HTML CSS and JavaScript. This modal
                  allows the user to view its contents, drag it up or down, and
                  close it. It also works on touch-enabled devices. Lorem Ipsum
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries.
                </p>
              </div>
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
                  <div class="min-h-[63svh] max-h-[63svh] overflow-hidden flex justify-center items-center">

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
import BottomSheetModal from "../components/UI/BottomSheetModal.vue";
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
const activeTab = ref(1);
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