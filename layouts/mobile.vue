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