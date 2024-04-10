<template>
<div class="bg-white min-w-full">
    <nav class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl top  ">
    <div
      class=" flex flex-wrap items-center justify-between mx-auto py-3 px-4"
    >
      <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img
          src="/assets/logo.png"
          class="h-8"
          alt="Flowbite Logo"
        />
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap"
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

                <li>
                  <button @click="edituserPassword"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Edit Password</button
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

  <!-- edit modal -->
  <div
    id="editPassword"
    tabindex="-1"
    data-modal-target="editPassword"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]"
  >
    <div class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden">
      <div class="relative bg-white rounded-lg shadow">
        <div class="p-4 md:p-5">
  <div
    class="flex justify-center items-center max-w-md mx-auto rounded-lg overflow-hidden md:max-w-lg"
  >
    <div class="relative flex flex-wrap w-11/12">
      <div class="w-full">
        <div>
          <div class="flex justify-center items-center text-gray-700">
            <img class="w-24" src="/assets/logo.png" />
          </div>

  
              <div class="pb-2 pt-8">
                <div class="flex items-center justify-between">
                  <label for="password" class="px-1 text-sm text-gray-600"
                    >Student email</label
                  >
                </div>
                <div class="relative">
                  <input
                    v-model="resetEmail"
                    placeholder=""
                    type="email"
                    class="text-md block px-3 py-2 mt-1 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow focus:placeholder-gray-500 focus:bg-white focus:border-[#132E35] focus:outline-none"
                  />
                </div>
              </div>

              <button
                @click.prevent="resetPassword"
                class="text-lg font-semibold mt-3 bg-[#132E35] w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
              >
                Reset Password
              </button>
       
        </div>
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
const { showClosableModal } = useModal();
const loggedIn = ref(true);
const edituserPassword = () => {
  // Initialize useModal composable
  const modalId = "editPassword";
  showClosableModal(modalId);
};
</script>

<style scoped>


</style>
