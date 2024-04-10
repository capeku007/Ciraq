<template>
<VitePwaManifest />
    <div>
      
        <slot/>
    </div>
</template>


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



<style>
.centerDiv {
  /* border: 5px solid; */
margin: auto;
  padding: 10px;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
/* .container {
  display: flex;
  flex-direction: column;
  height: -webkit-fill-available; 
  overflow: hidden; 
} */

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
background-color: blueviolet;
}

/* Custom scrollbar styles */
::-webkit-scrollbar {
  width: 2.5px;
  height: 2.5px;
  opacity: 0; /* Initially hide scrollbar */
  transition: opacity 0.3s ease-in-out;
}

/* Show scrollbar on hover or when active */
::-webkit-scrollbar:hover,
::-webkit-scrollbar:active {
  opacity: 1;
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


