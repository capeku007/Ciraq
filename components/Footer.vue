<template>
  <div
    ref="bottomSheet"
    id="bottomModal1"
    tabindex="-1"
    data-modal-target="bottomModal1"
    data-modal-placement="bottom"
    aria-hidden="true"
    class="fixed bottom-0 left-0 right-0 z-50 hidden w-full p-2 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
      <div class="w-full">
        <CreatePost/>
      </div>
  </div>

  <!-- component -->
  <div
    class="fixed bottom-0 left-1/2 transform -translate-x-1/2 inline-flex mx-auto justify-between bg-white w-full"
  >
  <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
    to="/dashboard"
  >
    <i :class="{'bx bxs-briefcase-alt text-[#132E35]': $route.path === '/dashboard', 'bx bxs-briefcase-alt': $route.path !== '/dashboard'}"  class="bx bx-briefcase-alt text-2xl block"></i>
    <span class="block text-[10px]">Jobs</span>
    <span class="block rounded-full"></span>
  </nuxt-link>

  <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
    to="/applications"
  >
    <i :class="{'bx bxs-envelope text-[#132E35]': $route.path === '/applications', 'bx bx-mail-send': $route.path !== '/applications'}" class="text-2xl block"></i>
    <span class="block text-[10px]">Applied</span>
    <span class="block rounded-full"></span>
  </nuxt-link>

  <!-- <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-1 px-4 text-gray-400 flex-grow"
    to="/hub"
  >
    <i :class="{'bx bxs-group text-[#132E35]': $route.path === '/hub', 'bx bx-group': $route.path !== '/hub'}" class="text-2xl block"></i>
    <span class="block text-[10px]">Hub</span>
    <span class="block rounded-full"></span>
  </nuxt-link> -->

      <button
      v-if="$route.path === '/hub'"
      @click="createPost"
      class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-[#132E35] flex-grow"
    >
      <i class="bx bx-image-add text-2xl block"></i>
      <span class="block text-[10px]">New</span>
      <span class="block rounded-full"></span>
    </button>
    <nuxt-link
      v-else
      class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
      to="/hub"
    >
      <i class="bx bx-group text-2xl block"></i>
      <span class="block text-[10px]">Hub</span>
      <span class="block rounded-full"></span>
    </nuxt-link>

  <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
    to="/messages"
  >
    <i :class="{'bx bxs-conversation text-[#132E35]': $route.path === '/messages', 'bx bx-conversation': $route.path !== '/messages'}" class="text-2xl block"></i>
    <span class="block text-[10px]">Chats</span>
    <span class="block rounded-full"></span>
  </nuxt-link>

  <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
    to="/viewprofile"
  >
    <i :class="{'bx bxs-user-circle text-[#132E35]': $route.path === '/viewprofile', 'bx bx-user-circle': $route.path !== '/viewprofile'}" class="text-2xl block"></i>
    <span class="block text-[10px]">Profile</span>
    <span class="block rounded-full"></span>
  </nuxt-link>
  </div>
</template>

<script setup>
import CreatePost from "@/components/Posts/CreatePost.vue"
const { showClosableModal } = useModal();
const createPost = () => {
  //opne the comments draggable
  const modalId = "bottomModal1";
  showClosableModal(modalId);
};

</script>

<style scoped>
.parentCon {
  display: flex;
  justify-content: center;
}

.footerItem {
  margin: 0 3rem;
  font-size: 12px;
  text-align: center;
}
</style>
