<template>
  <div>
    <Header />
    <slot />
    <footer>
      <Footer />
    </footer>
  </div>
</template> 
<script>
import "boxicons/css/boxicons.min.css";
// import Datepicker from 'flowbite-datepicker/Datepicker';
export default {
  data() {
    return {};
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
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(80, 80, 80, 0.11);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(94, 94, 94, 0.178);
  background: hsl(267, 100%, 82%);
}
</style>