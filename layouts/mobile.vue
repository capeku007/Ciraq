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
  min-height: 100dvh;
  max-height: 100dvh;
grid-template-rows: 7% 1fr 7%; 
    height: 100vh; 
    height: 100dvh; 
    min-height: 100vh; 
    max-height: 100vh; 
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-columns: 100%;
  background-color: #f7f7f7;
    min-width: 100%;
  max-width:100%;
}
.header {

    overflow: hidden;
}

.body {
  height: 85dvh;
  min-height: 85dvh;
  overflow-y: hidden;
  background-color: #f7f7f7;
}
.footer {
  overflow: hidden;
}

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

.loader {
  width: 40px;
  height: 20px;
  --c:no-repeat radial-gradient(farthest-side,#000 93%,#0000);
  background:
    var(--c) 0    0,
    var(--c) 50%  0,
    var(--c) 100% 0;
  background-size: 8px 8px;
  position: relative;
  animation: l4-0 1s linear infinite alternate;
}
.loader:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 12px;
  background: #000;
  left: 0;
  top: 0;
  animation: 
    l4-1 1s  linear infinite alternate,
    l4-2 0.5s cubic-bezier(0,200,.8,200) infinite;
}
@keyframes l4-0 {
  0%      {background-position: 0  100%,50% 0   ,100% 0}
  8%,42%  {background-position: 0  0   ,50% 0   ,100% 0}
  50%     {background-position: 0  0   ,50% 100%,100% 0}
  58%,92% {background-position: 0  0   ,50% 0   ,100% 0}
  100%    {background-position: 0  0   ,50% 0   ,100% 100%}
}
@keyframes l4-1 {
  100% {left:calc(100% - 8px)}
}
@keyframes l4-2 {
  100% {top:-0.1px}
}
</style>