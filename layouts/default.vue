<template>
<VitePwaManifest />
  <div class="container">
    <Modals/>
    <div class="header shadow"><Header /></div>
    <div class="main-content"><slot /></div>
    <div class="footer"><Footer/></div>
  </div>
</template>

<style>
body {
  overflow: hidden;
  background-color: #F8F9FA;
}
.container {
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available; 
  overflow: hidden; 
  min-width: 100%;
}

.header {
  flex: 0 0 auto; /* Non-flexible header */
  background-color: white;
  min-height: 8vh;
  max-height: 8vh;
}

.main-content {
  flex: 1; /* Flexible main content */
  max-height: 84vh;
  min-height: 84vh;
  height: -webkit-fill-available; 
  overflow: hidden; 
}

.footer {
  margin-top: auto; /* Position footer at the bottom */
    min-height: 8vh;
  max-height: 8vh;
background-color: #132E35;
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

<script>
import Modals from "@/components/UI/Modals.vue"
import "boxicons/css/boxicons.min.css";
// import Datepicker from 'flowbite-datepicker/Datepicker';
export default {
  data() {
    return {};
  },
  components:{
Modals,
  },
  head: {
    script: [],
  },
  async mounted() {},
  methods: {},
};
</script>

<script setup>
import { onMounted } from "vue";
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

