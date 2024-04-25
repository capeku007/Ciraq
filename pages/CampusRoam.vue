<template>


  <!-- tabs -->
  <div
    class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl grid grid-rows-[1fr] h-[85svh] max-h-[85svh] min-h-[85svh] overflow-hidden"
  >
    

    <div class="w-full bg-red overflow-hidden p-2 mx-auto">
      <div class="sm:w-11/12 sm:pl-40">
        <!-- Education timeLine -->

        <div class="flex max-h-[85svh] h-[85svh] min-h-[85svh] overflow-hidden">
          <div class="max-h-[85svh] h-[85svh] w-full mx-auto rounded-2xl">
            
              <Roam/>
          </div>
        </div>
      </div>

    </div>
    <div class=""></div>
  </div>
</template>

<script setup>
import Comments from "@/components/Posts/Comments.vue";
import { useAuthStore } from "../stores/authStore";
import { reactive } from "vue";

// Define loginData using reactive
const { showClosableModal } = useModal();
definePageMeta({
  layout: "mobile",
  middleware: ["unauthstd"],
});

const imageUrl = ref("../assets/lonimg.jpeg");

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

const openComments = () => {
  //opne the comments draggable
  const modalId = "bottomModal";
  showClosableModal(modalId);
};
</script>

<style scoped>

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
* {
  scrollbar-width: none !important;
}

</style>