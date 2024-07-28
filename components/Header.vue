<template>
  <div class="bg-white min-w-full">
    <nav class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl top">
      <div
        class="flex flex-wrap items-center justify-between mx-auto py-3 px-4"
      >
        <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/assets/logo.png" class="h-8" alt="Ciraq Logo" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap"
            >Ciraq</span
          >
        </a>

        <!-- login menu -->

        <div
          class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
        >
          <div>
            <div class="flex">
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
                  :src="imageSrc"
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
                    >{{ user.fname }} {{ user.lname }}</span
                  >
                  <span
                    class="block text-sm text-gray-500 truncate dark:text-gray-400"
                    >capeku@ciraq.com</span
                  >
                </div>
                <ul class="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <button
                      @click="authStore.logout()"
                      class="block px-4 py-2 text-sm w-full text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>

              <!-- <button
                id="dropdownNotificationButton"
                data-dropdown-toggle="dropdownNotification"
                class="relative inline-flex items-center text-sm mx-4 font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
                type="button"
              >
                <i class="bx bx-bell text-lg"></i>

                <div
                  class="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"
                ></div>
              </button> -->

              <!-- Dropdown menu -->
              <!-- <div
                id="dropdownNotification"
                class="z-20 hidden w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow"
                aria-labelledby="dropdownNotificationButton"
              >
                <div
                  class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50"
                >
                  Notifications
                </div>
                <div class="divide-y divide-gray-100 dark:divide-gray-700">
                  <div class="flex items-center">
                    <div class="relative inline-block shrink-0">
                      <img
                        class="w-12 h-12 rounded-full"
                        src="../assets/knustlogo.png"
                        alt="Jese Leos image"
                      />
                      <span
                        class="absolute bottom-0 right-0 inline-flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full"
                      >
                        <i class="bx bxs-briefcase-alt text-white"></i>
                      </span>
                    </div>
                    <div class="ms-3 text-sm font-normal">
                      <div
                        class="text-sm font-semibold text-gray-900 dark:text-white"
                      >
                        MTN Ghana
                      </div>
                      <div class="text-sm font-normal">
                        shortlisted your application
                      </div>
                      <span
                        class="text-xs font-medium text-blue-600 dark:text-blue-500"
                        >a few seconds ago</span
                      >
                    </div>
                  </div>
                </div>

                <div
                  class="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white"
                >
                  <div class="inline-flex items-center">
                    <img
                      src="/assets/logo.png"
                      class="h-4 mx-4"
                      alt="Ciraq Logo"
                    />
                    Powered by ciraq inc
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from "../stores/authStore";
import profilePlaceholder from '~/assets/images/profilePlace.jpg';
import { io } from "socket.io-client";
import { onMounted } from 'vue';

const authStore = useAuthStore();

const socket = ref(null);

const imageSrc = computed(() =>  profilePlaceholder);

const user = computed(() => authStore.getUser || {
  fname: "Please",
  lname: "Login",
});

const { showClosableModal } = useModal();

onMounted(() => {
  if (authStore.token) {
    socket.value = io("http://localhost:5001/notification", {
      auth: {
        token: authStore.token,
      },
    });

    socket.value.on("connection", () => {
      console.log("Connected to namespace");
    });

    socket.value.on("general", (msg)=>{
      console.log("notification:", msg);
    });

    socket.value.on("friendRequest", (msg)=>{
      console.log("Friend Request:", msg);
    });

  }
});
</script>
<style scoped></style>
