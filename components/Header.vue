<template>
<div>
    <nav class="top bg-white border-gray-200  ">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-3 px-4"
    >
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="/assets/logo.png"
          class="h-8"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
          >Ciraq</span
        >
      </a>

      <!-- login menu -->

      <div
        class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
      >
        <div>
          <div v-if="loggedIn">
            <button
              type="button"
              class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="w-8 h-8 rounded-full"
                src="/assets/images/profile-img.jpg"
                alt="user photo"
              />
            </button>
            <!-- Dropdown menu -->
            <div
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div class="px-4 py-3">
                <span class="block text-sm text-gray-900 dark:text-white"
                  >Cristian Apeku</span
                >
                <span
                  class="block text-sm text-gray-500 truncate dark:text-gray-400"
                  >capeku@ciraq.com</span
                >
              </div>
              <ul class="py-2" aria-labelledby="user-menu-button" >
                <li >
                  <nuxt-link to="/dashboard" 
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Dashboard</nuxt-link
                  >
                </li>

                <li>
                  <nuxt-link to="/applications"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Applications</nuxt-link
                  >
                </li>

                <li>
                  <nuxt-link to="/notifications"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Notifications</nuxt-link
                  >
                </li>

                <li>
                  <nuxt-link to="/Messages"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Messages</nuxt-link
                  >
                </li>

                <li>
                  <nuxt-link to="/profileview"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Profile</nuxt-link
                  >
                </li>                
                <li>
                  <nuxt-link
                    to="/"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Sign out</nuxt-link
                  >
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <nuxt-link to="/">
              <button class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </nuxt-link>
          </div>
        </div>

      </div>


    </div>
  </nav>
</div>
</template>

<script>
import 'flowbite';
export default {
  data() {
    return {
      fdate: null,
      tdate: null,
      loggedIn: true,
    };
  },
  methods: {},
};
</script>

<style scoped>


</style>
