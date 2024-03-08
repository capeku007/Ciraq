<template>
  <!-- component -->
  <div
    class="fixed bottom-0 left-1/2 transform -translate-x-1/2 inline-flex mx-auto justify-between bg-white w-full"
  >
  <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium py-3 px-4 text-gray-400 flex-grow"
    to="/dashboard"
    :class="{'text-[#132E35]': $route.path === '/dashboard'}"
  >
    <i :class="{'bx bxs-briefcase-alt': $route.path === '/dashboard', 'bx bxs-briefcase-alt': $route.path !== '/dashboard'}"  class="bx bx-briefcase-alt text-2xl block"></i>
    <span class="block text-[10px]">Jobs</span>
    <span class="block rounded-full"></span>
  </nuxt-link>

  <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium py-3 px-4 text-gray-400 flex-grow"
    to="/applications"
    :class="{'text-[#132E35]': $route.path === '/applications'}"
  >
    <i :class="{'bx bxs-envelope': $route.path === '/applications', 'bx bx-mail-send': $route.path !== '/applications'}" class="text-2xl block"></i>
    <span class="block text-[10px]">Applied</span>
    <span class="block rounded-full"></span>
  </nuxt-link>

  <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium py-3 px-4 text-gray-400 flex-grow"
    to="/hub"
    :class="{'text-[#132E35]': $route.path === '/hub'}"
  >
    <i :class="{'bx bxs-group': $route.path === '/hub', 'bx bx-group': $route.path !== '/hub'}" class="text-2xl block"></i>
    <span class="block text-[10px]">Hub</span>
    <span class="block rounded-full"></span>
  </nuxt-link>

  <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium py-3 px-4 text-gray-400 flex-grow"
    to="/messages"
    :class="{'text-[#132E35]': $route.path === '/messages'}"
  >
    <i :class="{'bx bxs-conversation': $route.path === '/messages', 'bx bx-conversation': $route.path !== '/messages'}" class="text-2xl block"></i>
    <span class="block text-[10px]">Chats</span>
    <span class="block rounded-full"></span>
  </nuxt-link>

  <nuxt-link
    class="inline-flex flex-col items-center text-xs font-medium py-3 px-4 text-gray-400 flex-grow"
    to="/viewprofile"
    :class="{'text-[#132E35]': $route.path === '/viewprofile'}"
  >
    <i :class="{'bx bxs-user-circle': $route.path === '/viewprofile', 'bx bx-user-circle': $route.path !== '/viewprofile'}" class="text-2xl block"></i>
    <span class="block text-[10px]">Profile</span>
    <span class="block rounded-full"></span>
  </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fdate: null,
      tdate: null,
    };
  },
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
