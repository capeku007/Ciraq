<template>
  <div>
    <Modals/>
    <div><Header /></div>
    <div><slot /></div>
    <!-- <div><Footer /></div> -->
  </div>
</template> 
<script>
import Modals from "@/components//UI/Modals.vue"
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
  background: #018989;
}
header {
  position: sticky;
  top: 0;
  background-color: white; /* Change the background color as needed */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add a box shadow for a subtle effect */
}

</style>