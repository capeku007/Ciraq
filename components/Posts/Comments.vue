<template>
  <div class="bottom-sheet">
    <div
      ref="sheetContent"
      class="content"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <div
        ref="dragIcon"
        class="header max-h-5 cursor-grab select-none dragIcon"
        @mousedown="dragStart"
        @touchstart="dragStart"
      >
        <span class="block h-1 w-10 bg-gray-300 rounded-full"></span>
      </div>
      <div         @mousedown="dragStart"
        @touchstart="dragStart" class="grid grid-rows-[7.5%_1fr_15%] min-h-full max-h-full">
        <div class="">
          <p class="text-gray-900 text-xs font-semibold sm:text-sm text-center">
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
                    :src="person.profile_img ? `https://ciraq.co/api/public/uploads/profile_images/${person.profile_img}` : profilePlaceholder"
  :alt="`${person.fname} ${person.lname}'s profile image`"
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
                        That's awesome. I think our users will really appreciate
                        the improvements.
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
                                    :src="person.profile_img ? `https://ciraq.co/api/public/uploads/profile_images/${person.profile_img}` : profilePlaceholder"
  :alt="`${person.fname} ${person.lname}'s profile image`"
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
</template>

<script setup>
import profilePlaceholder from '~/assets/images/profilePlace.jpg';
const bottomSheet = ref(null);
const sheetContent = ref(null);
const dragIcon = ref(null);
const person = ref({});

let isDragging = false;
let startY, startHeight;

const showBottomSheet = () => {
  if (bottomSheet.value) {
    bottomSheet.value.classList.add("show");
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
    bottomSheet.value.classList.toggle("fullscreen", height === 100);
  }
};

const resetSheetHeight = () => {
  if (sheetContent.value) {
    sheetContent.value.style.height = "auto"; // Set the height back to auto or your default height
  }
};

let touchStartX = null;
const swipeThreshold = 50;
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
  const modalId = "bottomModal";
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
  else updateSheetHeight(50);
};

onMounted(() => {
  bottomSheet.value = document.getElementById("bottomModal");
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
  max-height: 100dvh;
  height: 50dvh;
  /* min-height: 30dvh; */
  max-width: 1150px;
  padding: 25px 30px;
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