<template>
  <div>
    <VitePwaManifest /> <Modals />

    <main>
      <div class="container">
        <header class="header"><Header /></header>
        <main class="body"><slot /></main>
        <footer class="footer"><Footer /></footer>
      </div>
    </main>
  </div>
</template>
<script setup>
import Modals from "@/components/UI/Modals.vue"
import "boxicons/css/boxicons.min.css";
import {
  initFlowbite,
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
  initAccordions();
  initCarousels();
  initCollapses();
  initDials();
  initDismisses();
  initDrawers();
  initDropdowns();
  initModals();
  initPopovers();
  initTabs();
  initTooltips();
});

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


<style >
.container {
  display: grid;
  overflow: hidden;
  min-height: 100svh;
  max-height: 100svh;
grid-template-rows: 7% 1fr 7%; 
    height: 100vh; 
    height: 100svh; 
    min-height: 100vh; 
    max-height: 100vh; 
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: #f7f7f7;
}
.header {
  /* grid-area: 1 / 1 / 2 / 2; */
  /* background-color: blue; */
    overflow: hidden;
}
.body {
  /* grid-area: 2 / 1 / 3 / 2; */
  height: 85svh;
  min-height: 85svh;
  overflow-y: hidden;
  background-color: #f7f7f7;
  
}
.footer {
  overflow: hidden;
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
  height: 50svh;
  /* min-height: 30svh; */
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
</style>