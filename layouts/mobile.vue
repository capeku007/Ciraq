<template>
  <div>
    <VitePwaManifest /> <Modals />

    <main>
      <div class="container">
        <main class="body"><slot /></main>
        <div class=" ">
          <div
            class="fixed bottom-0 h-[10dvh] left-1/2 transform -translate-x-1/2 inline-flex mx-auto justify-between bg-white w-full"
          >
            <nuxt-link
              class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
              to="/dashboard"
            >
              <i
                :class="{
                  'bx bxs-briefcase-alt text-[#132E35]':
                    $route.path === '/dashboard',
                  'bx bxs-briefcase-alt': $route.path !== '/dashboard',
                }"
                class="bx bx-briefcase-alt text-2xl block"
              ></i>
              <span class="block text-[10px]">Jobs</span>
              <span class="block rounded-full"></span>
            </nuxt-link>

            <nuxt-link
              class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
              to="/skillforge"
            >
              <i
                :class="{
                  'bx bx-sitemap text-[#132E35]': $route.path === '/skillforge',
                  'bx bx-sitemap': $route.path !== '/skillforge',
                }"
                class="text-2xl block"
              ></i>
              <span class="block text-[10px]">SkillForge</span>
              <span class="block rounded-full"></span>
            </nuxt-link>

            <nuxt-link
              class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
              to="/CampusRoam"
            >
              <i
                :class="{
                  'bx bxs-group text-[#132E35]': $route.path === '/CampusRoam',
                  'bx bx-group': $route.path !== '/CampusRoam',
                }"
                class="text-2xl block"
              ></i>
              <span class="block text-[10px]">Hub</span>
              <span class="block rounded-full"></span>
            </nuxt-link>

            <nuxt-link
              class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
              to="/messages"
            >
              <i
                :class="{
                  'bx bxs-conversation text-[#132E35]':
                    $route.path === '/messages',
                  'bx bx-conversation': $route.path !== '/messages',
                }"
                class="text-2xl block"
              ></i>
              <span class="block text-[10px]">Chats</span>
              <span class="block rounded-full"></span>
            </nuxt-link>

            <nuxt-link
              class="inline-flex flex-col items-center text-xs font-medium pt-3 pb-2 px-4 text-gray-400 flex-grow"
              to="/myprofile"
            >
              <i
                :class="{
                  'bx bxs-user-circle text-[#132E35]':
                    $route.path === '/myprofile',
                  'bx bx-user-circle': $route.path !== '/myprofile',
                }"
                class="text-2xl block"
              ></i>
              <span class="block text-[10px]">Profile</span>
              <span class="block rounded-full"></span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import Modals from "@/components/UI/Modals.vue";
import "boxicons/css/boxicons.min.css";
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
import { io } from "socket.io-client";
import { useAuthStore } from "../stores/authStore";
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

const authStore = useAuthStore();

const socket = ref(null);

onMounted(() => {
  if (authStore.token) {
    // socket.value = io("http://localhost:5001/notification", {
      socket.value = io("https://ciraq.co/notification", {
      path: "/api/socket.io",
      auth: {
        token: authStore.token,
      },
    });

    socket.value.on("connect", () => {
      console.log("Connected to notification namespace");
    });

    socket.value.on("general", (msg) => {
      console.log("notification:", msg);
    });


    socket.value.on("notification", (msg) => {
      console.log("Friend Request:", msg);
    });

    socket.value.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });
  }
});

onMounted(() => {
  if (authStore.token) {
    socket.value = io("https://ciraq.co/chat", {
      path: "/api/socket.io",
      auth: {
        token: authStore.token,
      },
    });

    // Move all socket event listeners inside this block
    socket.value.on("chatMessage", (message) => {
      // ... rest of the code
      emit('messageSentOrReceived');
    });

    socket.value.on("general", (msg) => {
      console.log(msg);
    });

    socket.value.on("connect_error", (error) => {
      console.log("Connection error:", error);
    });
  } else {
    console.log("No token found can't connect to socket");
  }
});


onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
  }
});
</script>


<style >
input,
select,
textarea {
  font-size: 16px !important;
}

.container {
  display: grid;
  overflow: hidden;
  min-height: 100dvh;
  max-height: 100dvh;
  grid-template-rows: 90dvh 10dvh;
  height: 100dvh;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-columns: 100%;
  background-color: #f7f7f7;
  min-width: 100%;
  max-width: 100%;
}
.header {
  overflow: hidden;
}

.body {
  height: 90dvh;
  min-height: 90dvh;
  overflow-y: hidden;
  background-color: #f7f7f7;
}

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

.loader {
  width: 40px;
  height: 20px;
  --c: no-repeat radial-gradient(farthest-side, #000 93%, #0000);
  background: var(--c) 0 0, var(--c) 50% 0, var(--c) 100% 0;
  background-size: 8px 8px;
  position: relative;
  animation: l4-0 1s linear infinite alternate;
}
.loader:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 12px;
  background: #000;
  left: 0;
  top: 0;
  animation: l4-1 1s linear infinite alternate,
    l4-2 0.5s cubic-bezier(0, 200, 0.8, 200) infinite;
}
@keyframes l4-0 {
  0% {
    background-position: 0 100%, 50% 0, 100% 0;
  }
  8%,
  42% {
    background-position: 0 0, 50% 0, 100% 0;
  }
  50% {
    background-position: 0 0, 50% 100%, 100% 0;
  }
  58%,
  92% {
    background-position: 0 0, 50% 0, 100% 0;
  }
  100% {
    background-position: 0 0, 50% 0, 100% 100%;
  }
}
@keyframes l4-1 {
  100% {
    left: calc(100% - 8px);
  }
}
@keyframes l4-2 {
  100% {
    top: -0.1px;
  }
}
</style>