<template>
  <div class="bottom-sheet">
    <!-- <div
      ref="sheetContent"
      class="content"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd" diabling drag to close
    >   -->
    <div ref="sheetContent" class="content">
      <div
        ref="dragIcon"
        class="header max-h-5 m-0 cursor-grab select-none dragIcon"
        @mousedown="dragStart"
        @touchstart="dragStart"
      >
        <span class="block h-1 w-10 bg-gray-300 rounded-full"></span>
      </div>
      <div class="grid grid-rows-[7.5%_1fr_15%] min-h-[99svh] max-h-[99svh]">
        <div class=""         @mousedown="dragStart"
        @touchstart="dragStart">
          <div class="">
            <ul
              class="flex justify-center items-center rounded-3xl text-center p-1"
            >
              <li
                style="padding: 0.5rem"
                v-for="(tab, index) in tabs"
                :key="index"
                @click="activeTab = index"
                class="text-xs md:text-sm lg:text-base min-w-[45%] mx-auto"
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
        </div>
        <!-- text -->
        <div class="overflow-y-auto">
          <div class="w-full" v-if="activeTab == 0">
            <div class="w-full mt-4 px-2 relative">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                id="program"
              >
                Title
              </label>
              <input
                placeholder="what's on your mind"
                type="text"
                class="border-0 p-2 placeholder-blueGray-300 text-black border-gray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              />
            </div>

            <div class="w-full mt-4 px-2 relative">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                id="program"
              >
                Message
              </label>
              <textarea
                placeholder="write your thoughts here..."
                type="text"
                class="border-0 p-2 placeholder-blueGray-300 text-black border-gray-800 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                rows="12"
              ></textarea>
            </div>
          </div>

          <div class="w-full" v-if="activeTab == 1">
            <div
              class="min-h-[76svh] bg-red-500 flex justify-center items-center"
            >
              <div
                v-if="!showVideo"
                class="grid grid-rows-[1fr] min-h-[74svh] max-h-[74svh] overflow-hidden"
              >
                <VideoRecorder
                  @videoRecorded="handleVideoRecorded"
                  @pictureTaken="handleImgRecorded"
                />
              </div>

              <div
                v-if="showVideo"
                class="min-h-[76svh] bg-red-500 flex justify-center items-center"
              >
                <div
                  class="grid grid-rows-[1fr] min-h-[74svh] max-h-[74svh] overflow-hidden"
                >
                  <div
                    class="relative bg-yellow-200 min-h-[74svh] h-[74svh] max-h-[74svh]"
                  >
                    <video
                      class="rounded-lg h-full w-full object-cover"
                      autoplay
                      :src="recordedVideoUrl"
                      loop
                    ></video>

                    <button
                      @click="cancelRecording"
                      class="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div
                  class="min-h-[76svh] bg-red-500 flex justify-center items-center"
                >
                  <div
                    class="grid grid-rows-[1fr] min-h-[74svh] max-h-[74svh] overflow-hidden"
                  >
                    <div
                      class="relative bg-yellow-200 min-h-[74svh] h-[74svh] max-h-[74svh]"
                    >
                      <img
                        :src="recordedImgUrl"
                        class="rounded-lg h-full w-full object-cover"
                      />

                      <button
                        @click="cancelRecording"
                        class="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
          </div>
        </div>
        <!-- post  -->
        <div class="my-auto">
          <button
            v-if="activeTab == 0"
            class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Post<i class="fa fa-long-arrow-right absolute top-5 right-8"></i>
          </button>

          <button
            v-if="activeTab == 1"
            class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Post<i class="fa fa-long-arrow-right absolute top-5 right-8"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const bottomSheet = ref(null);
const sheetContent = ref(null);
const dragIcon = ref(null);

const tabs = ref(["Text", "Media"]);
const activeTab = ref(1);
const active = ref(false);

const toggleAccordion = () => {
  active.value = !active.value;
};

const showVideo = ref(false);
const showImg = ref(false);
const recordedVideoUrl = ref(null);
const pictureUrl = ref(null);

const handleVideoRecorded = (url) => {
  recordedVideoUrl.value = url;
  showVideo.value = true;
};

const handleImgRecorded = (url) => {
  pictureUrl.value = url;
  showImg.value = true;
};

const cancelRecording = () => {
  showVideo.value = false;
  recordedVideoUrl.value = null;
};

// modal script down here
let isDragging = false;
let startY, startHeight;

const showBottomSheet = () => {
  if (bottomSheet.value) {
    bottomSheet.value.classList.add("show");
  }
};

const updateSheetHeight = (height) => {
  const maxHeight = 99; // Set maximum height to 80%
  if (sheetContent.value) {
    if (height === 100) {
      height = maxHeight;
    }
    sheetContent.value.style.height = `${height}vh`;
  }
  if (bottomSheet.value) {
    bottomSheet.value.classList.toggle("fullscreen", height === 100);
  }
};

const resetSheetHeight = () => {
  if (sheetContent.value) {
    sheetContent.value.style.height = "auto"; // Set the height back to auto or your default height
  }
};

let touchStartX = null;
const swipeThreshold = 80;
const handleTouchStart = (event) => {
  touchStartX = event.touches[0].clientX; // Set touch start X position
};

const handleTouchEnd = (event) => {
  const touchEndX = event.changedTouches[0].clientX;
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold) {
    // If swipe distance is greater than threshold, call goBack function or your desired action
    hideBottomSheet();
  }
};

const hideBottomSheet = () => {
  const { hideModal } = useModal();
  const modalId = "bottomModal1";
  hideModal(modalId);
  resetSheetHeight(); // Reset sheetContent height when hiding the modal
};

const dragStart = (e) => {
  isDragging = true;
  startY = e.pageY || e.touches?.[0].pageY;
  startHeight = parseInt(sheetContent.value.style.height);
  if (bottomSheet.value) {
    bottomSheet.value.classList.add("dragging");
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
    bottomSheet.value.classList.remove("dragging");
  }
  const sheetHeight = parseInt(sheetContent.value.style.height);
  if (sheetHeight < 25) hideBottomSheet();
  else if (sheetHeight > 75) updateSheetHeight(100);
  else updateSheetHeight(99);
};

onMounted(() => {
  bottomSheet.value = document.getElementById("bottomModal1");
  sheetContent.value = bottomSheet.value?.querySelector(".content");
  dragIcon.value = bottomSheet.value?.querySelector(".dragIcon");

  dragIcon.value?.addEventListener("mousedown", dragStart);
  document.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);

  dragIcon.value?.addEventListener("touchstart", dragStart);
  document.addEventListener("touchmove", dragging);
  document.addEventListener("touchend", dragStop);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", dragging);
  document.removeEventListener("mouseup", dragStop);
  document.removeEventListener("touchmove", dragging);
  document.removeEventListener("touchend", dragStop);
});
</script>


<style scoped>
@media (max-width: 640px) {
  .relative {
    height: auto !important;
  }

  .relative video {
    height: calc(100vw * 16 / 9); /* Maintain 9:16 aspect ratio */
    max-height: 100%; /* Ensure it doesn't exceed the parent container's height */
  }
}
.bottom-sheet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  opacity: 1;
  pointer-events: auto;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  transition: 0.1s linear;
}

.bottom-sheet .content {
  width: 100%;
  position: relative;
  background: #fff;
  max-height: 100svh;
  height: 99svh;
  /* min-height: 99svh; */
  max-width: 1150px;
  padding: 10px 20px;
  transform: translateY(100%);
  border-radius: 12px 12px 0 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
  transition: 0.3s ease;
}
.bottom-sheet .content {
  transform: translateY(0%);
}
.bottom-sheet.dragging .content {
  transition: none;
}
.bottom-sheet.fullscreen .content {
  border-radius: 0;
  overflow-y: hidden;
}
.bottom-sheet .header {
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 1vh;
  max-height: 1vh;
}

.bottom-sheet .modalBody {
  /* height: 100%;
  max-height: 100%;
  overflow-y: hidden;
  padding: .5rem; */
  scrollbar-width: none;
  /* background-color: aqua; */
  margin: 1rem;
}
.bottom-sheet .modalBody::-webkit-scrollbar {
  width: 0;
}
</style>