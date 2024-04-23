<template>
  <div class="body bg-[#F3F4F6]">
    <VitePwaManifest /> 
    <div
      class="fixed w-full  z-[1]  "
    >
      <div class="flex ml-auto bg-white  p-2 items-center justify-center h-16 px-10">
        <div class="logo ml-8 flex-none h-full flex items-center justify-center">
        COMPANY NAME
      </div>
      <!-- SPACER -->
      <div class="grow h-full flex items-center justify-center">
        <!-- time and date here -->
        11:45am Accra Ghana
      </div>
      <div
        class="flex-none h-full text-center flex items-center justify-center"
      >
      <!-- profile image -->
        <div class="flex items-center px-3">
          <div class="flex-none flex justify-center">
            <div class="w-8 h-8 flex">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                alt="profile"
                class="shadow rounded-full object-cover"
              />
            </div>
          </div>
          <div class="hidden md:block text-sm md:text-md text-black">
            John Doe
          </div>
        </div>
      </div>
      </div>
    </div>
    <div
      class="side w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-[2] flex h-screen bg-white pr-0 mr-2 "
    >
      <!-- open sidebar button -->
      <div
        class="max-toolbar translate-x-24 scale-x-0 w-full -right-3 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white bg-[#1E293B] absolute top-2 rounded-full h-12"
      >
        <div class="flex pl-4 w-[20%]  items-center">
          <div>
            <img class="w-8 h-8 pl-0 rounded-full" src="../assets/logo.png" alt="">
          </div>
        </div>
        <div
          class="flex items-center w-[80%] group bg-gradient-to-r bg-[#1E293B] pl-10 pr-2 py-1 rounded-full text-white"
        >
          <div class="transform ease-in-out duration-300 mr-12">Ciraq Hub</div>
        </div>
      </div>
      <div
        @click="openNav"
        class="-right-3 transition transform ease-in-out duration-500 flex border-4 border-white bg-white hover:bg-purple-500 absolute top-2 p-1 rounded-full text-white hover:rotate-45"
      >
      <img class="w-8 h-8 rounded-full" src="../assets/logo.png" alt="">
      </div>
<div class="max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]">
  <nuxt-link to="/employer/dashboard" class="hover:ml-4 w-full text-black hover:border-purple-500  border-4 bg-[#fff] p-1 pl-8 rounded-3xl transform ease-in-out duration-300 flex flex-row items-center ">
    <i :class="{'text-white': $route.path === '/employer/dashboard', 'text-[#9c9c9c] hover:text-white': $route.path !== '/employer/dashboard'}" class="bx bx-home"></i>
    <div>Home</div>
  </nuxt-link>
  <nuxt-link to="/employer/new" class="hover:ml-4 w-full text-white hover:text-purple-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center ">
    <i :class="{'text-white': $route.path === '/employer/new', 'text-[#9c9c9c] hover:text-white': $route.path !== '/employer/new'}" class="bx bx-message-square-add"></i>
    <div>New Listing</div>
  </nuxt-link>
  <nuxt-link to="/employer/about" class="hover:ml-4 w-full text-white hover:text-purple-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center ">
    <i :class="{'text-white': $route.path === '/employer/about', 'text-[#9c9c9c] hover:text-white': $route.path !== '/employer/about'}" class='bx bx-detail'></i>
    <div>About</div>
  </nuxt-link>
</div>
<div class="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">
  <nuxt-link to="/employer/dashboard" class="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
    <i :class="{'text-white': $route.path === '/employer/dashboard', 'text-[#9c9c9c] hover:text-white': $route.path !== '/employer/dashboard'}" class="bx bx-home"></i>
  </nuxt-link>
  <nuxt-link to="/employer/new" class="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
    <i :class="{'text-white': $route.path === '/employer/new', 'text-[#9c9c9c] hover:text-white': $route.path !== '/employer/new'}" class="bx bx-message-square-add"></i>
  </nuxt-link>
  <nuxt-link to="/employer/about" class="hover:ml-4 justify-end pr-5 text-white  w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
    <i :class="{'text-white': $route.path === '/employer/about', 'text-[#9c9c9c] hover:text-white': $route.path !== '/employer/about'}" class='bx bx-detail'></i>
  </nuxt-link>
</div>
    </div>
    <!-- CONTENT -->
    <div
      class="z-[50] content ml-12 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 bg-[#F3F4F6]"
    >
        
      <slot /> 
    </div>
  </div>
</template>

<script>
import "boxicons/css/boxicons.min.css";
export default {
  methods: {

    openNav() {
      const sidebar = this.$el.querySelector(".side");
      const maxSidebar = this.$el.querySelector(".max");
      const miniSidebar = this.$el.querySelector(".mini");
      const maxToolbar = this.$el.querySelector(".max-toolbar");
      const logo = this.$el.querySelector(".logo");
      const content = this.$el.querySelector(".content");

      if (sidebar.classList.contains("-translate-x-48")) {
        // max sidebar
        sidebar.classList.remove("-translate-x-48");
        sidebar.classList.add("translate-x-none");
        maxSidebar.classList.remove("hidden");
        maxSidebar.classList.add("flex");
        miniSidebar.classList.remove("flex");
        miniSidebar.classList.add("hidden");
        maxToolbar.classList.add("translate-x-0");
        maxToolbar.classList.remove("translate-x-24", "scale-x-0");
        logo.classList.remove("ml-12");
        content.classList.remove("ml-12");
        content.classList.add("ml-12", "md:ml-60");
      } else {
        // mini sidebar
        sidebar.classList.add("-translate-x-48");
        sidebar.classList.remove("translate-x-none");
        maxSidebar.classList.add("hidden");
        maxSidebar.classList.remove("flex");
        miniSidebar.classList.add("flex");
        miniSidebar.classList.remove("hidden");
        maxToolbar.classList.add("translate-x-24", "scale-x-0");
        maxToolbar.classList.remove("translate-x-0");
        logo.classList.add("ml-12");
        content.classList.remove("ml-12", "md:ml-60");
        content.classList.add("ml-12");
      }
    },
  },
};
</script>