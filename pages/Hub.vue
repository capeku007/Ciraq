<template>
  <!-- tabs -->
  <div class="postContainer overflow-hidden">
    <!-- <ul
          class="flex justify-center items-center sticky top-0 z-10 bg-[#EAEAEB] rounded-3xl text-center p-1"
        >         -->
    <!-- <div class="bg-[#F8F9FA]"> -->
    <div class="bg-white">
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

    <div
      class="w-full bg-red overflow-x-hidden overflow-y-hidden bg-[#F8F9FA] p-2 mx-auto pb-[10rem]"
    >
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
            Create a bottom sheet modal that functions similarly to Facebook modal using HTML CSS and JavaScript. This modal allows the user to view its contents, drag it up or down, and close it. It also works on touch-enabled devices. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
          </p>
        </div>
      </div>
    </div>
  </div>
      </div>

      <div class="sm:w-11/12 sm:pl-40" v-show="activeTab === 1">
        <!-- Posts timeLine -->
        <!-- using the list method for now -->
        <ul class="scrollContainer h-[77svh] max-h-[77svh] overflow-hidden">
          <li
            class="scrollItem bg-white shadow rounded-lg h-[77svh] max-h-[77svh] pt-2 mb-4"
          >
            <div class="postItem">
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
                    <p class="text-gray-600 text-xs font-semibold sm:text-sm">
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

              <div class="mb-3 mt-3 mx-3 px-2">
                <!-- with text and image -->
                <div
                  class="grid grid-rows-[15svh_1fr] min-h-[57svh] max-h-[67svh] overflow-hidden"
                >
                  <div class="flex justify-center items-center">
                    <p class="text-xs sm:text-base font-normal text-gray-500">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Alias aut ipsa minus et quo facilis optio quisquam
                      tempore, praesentium laborum esse quae soluta deleniti
                      nobis facere. Iusto neque voluptatibus necessitatibus
                      distinctio ipsum. Voluptate eveniet consequatur sequi
                      perferendis fuga ut placeat.
                    </p>
                  </div>
                  <div class="m-0 h-[42svh]">
                    <img
                      class="w-full h-full object-contain cursor-pointer"
                      src="../assets/Group 2.png"
                    />
                  </div>
                </div>
              </div>

              <div class="flex justify-start mb-1 border-t border-gray-100">
                <div class="flex w-full mt-1 pt-2 pl-5">
                  <button
                    class="flex items-center bg-white transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-gray-400"
                  >
                    <i class="bx bx-like"></i> &nbsp; &nbsp;
                    <!-- Assuming this is your icon -->
                    <span class="sm:inline ml-1">1,234</span>
                  </button>
                </div>
                <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                  <button
                    class="flex items-center bg-white transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-gray-400"
                  >
                    <span class="sm:inline ml-1">34</span> &nbsp; &nbsp;
                    <i class="bx bx-comment"></i>
                    <!-- Assuming this is your icon -->
                  </button>
                </div>
              </div>
            </div>
          </li>

          <li
            class="scrollItem bg-white shadow rounded-lg h-[77svh] max-h-[77svh] pt-2 mb-4"
          >
            <div class="postItem">
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
                    <p class="text-gray-600 text-xs font-semibold sm:text-sm">
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

              <div class="mb-3 mt-3 mx-3 px-2">
                <!-- with text and image -->
                <div
                  class="grid grid-rows-[1fr] min-h-[57svh] max-h-[67svh] overflow-hidden"
                >
                  <div class="flex justify-center items-center">
                    <p class="text-xs sm:text-base font-normal text-gray-500">
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

              <div class="flex justify-start mb-1 border-t border-gray-100">
                <div class="flex w-full mt-1 pt-2 pl-5">
                  <button
                    class="flex items-center bg-white transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-gray-400"
                  >
                    <i class="bx bx-like"></i> &nbsp; &nbsp;
                    <!-- Assuming this is your icon -->
                    <span class="sm:inline ml-1">1,234</span>
                  </button>
                </div>
                <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                  <button
                    class="flex items-center bg-white transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-gray-400"
                  >
                    <span class="sm:inline ml-1">34</span> &nbsp; &nbsp;
                    <i class="bx bx-comment"></i>
                    <!-- Assuming this is your icon -->
                  </button>
                </div>
              </div>
            </div>
          </li>

          <li
            class="scrollItem bg-white shadow rounded-lg h-[77svh] max-h-[77svh] pt-2 mb-4"
          >
            <div class="postItem">
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
                    <p class="text-gray-600 text-xs font-semibold sm:text-sm">
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

              <div class="mb-3 mt-3 mx-3 px-2">
                <!-- with text and image -->
                <div
                  class="grid grid-rows-[1fr] min-h-[57svh] max-h-[67svh] overflow-hidden"
                >
                  <div class="flex justify-center items-center">
                    <div class="m-0 h-[50svh] max-h-[52svh]">
                      <img
                        class="w-full h-full object-contain cursor-pointer"
                        src="../assets/Group 2.png"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-start mb-1 border-t border-gray-100">
                <div class="flex w-full mt-1 pt-2 pl-5">
                  <button
                    class="flex items-center bg-white transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-gray-400"
                  >
                    <i class="bx bx-like"></i> &nbsp; &nbsp;
                    <!-- Assuming this is your icon -->
                    <span class="sm:inline ml-1">1,234</span>
                  </button>
                </div>
                <div class="flex justify-end w-full mt-1 pt-2 pr-5">
                  <button
                    class="flex items-center bg-white transition ease-out duration-300 hover:text-red-500 py-1 px-2 rounded-lg text-gray-400"
                  >
                    <span class="sm:inline ml-1">34</span> &nbsp; &nbsp;
                    <i class="bx bx-comment"></i>
                    <!-- Assuming this is your icon -->
                  </button>
                </div>
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
const bottomSheet = ref(null);
const sheetContent = ref(null);
const dragIcon = ref(null);

let isDragging = false;
let startY, startHeight;

const showBottomSheet = () => {
  if (bottomSheet.value) {
    bottomSheet.value.classList.add('show');
  }
};

const updateSheetHeight = (height) => {
  const maxHeight = 80; // Set maximum height to 80%
  if (sheetContent.value) {
    if (height === 100) {
      height = maxHeight;
    }
    sheetContent.value.style.height = `${height}vh`;
  }
  if (bottomSheet.value) {
    bottomSheet.value.classList.toggle('fullscreen', height === 100);
  }
};

const resetSheetHeight = () => {
  if (sheetContent.value) {
    sheetContent.value.style.height = 'auto'; // Set the height back to auto or your default height
  }
};

const hideBottomSheet = () => {
  const { hideModal } = useModal();
  const modalId = 'bottomModal';
  hideModal(modalId);
  resetSheetHeight(); // Reset sheetContent height when hiding the modal
};

const dragStart = (e) => {
  isDragging = true;
  startY = e.pageY || e.touches?.[0].pageY;
  startHeight = parseInt(sheetContent.value.style.height);
  if (bottomSheet.value) {
    bottomSheet.value.classList.add('dragging');
  }
};

const dragging = (e) => {
  if (!isDragging) return;
  const delta = startY - (e.pageY || e.touches?.[0].pageY);
  const newHeight = startHeight + (delta / window.innerHeight) * 100;
  updateSheetHeight(newHeight);
};

const dragStop = () => {
  isDragging = false;
  if (bottomSheet.value) {
    bottomSheet.value.classList.remove('dragging');
  }
  const sheetHeight = parseInt(sheetContent.value.style.height);
  if (sheetHeight < 25) hideBottomSheet();
  else if (sheetHeight > 75) updateSheetHeight(100);
  else updateSheetHeight(50);
};

onMounted(() => {
  bottomSheet.value = document.getElementById('bottomModal');
  sheetContent.value = bottomSheet.value?.querySelector('.content');
  dragIcon.value = bottomSheet.value?.querySelector('.dragIcon');

  dragIcon.value?.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', dragging);
  document.addEventListener('mouseup', dragStop);

  dragIcon.value?.addEventListener('touchstart', dragStart);
  document.addEventListener('touchmove', dragging);
  document.addEventListener('touchend', dragStop);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', dragging);
  document.removeEventListener('mouseup', dragStop);
  document.removeEventListener('touchmove', dragging);
  document.removeEventListener('touchend', dragStop);
});
</script>

<style scoped>
.scrollContainer{
  overflow-y:scroll;
  scroll-snap-type: y mandatory;
}

.scrollItem{
  scroll-snap-align: start;
}
</style>