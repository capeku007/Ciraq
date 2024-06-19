

<template>
<VitePwaManifest />
  <header id="nav-menu" aria-label="navigation bar">
      <div class="container">
    <div class="nav-start">
      <a class="logo" href="/">
        <img src="../assets/logo.png" width="45" height="45" alt="Inc Logo" />
      </a>
      <nav class="menu">
        <ul class="menu-bar">
          <!-- <li>
            <button class="nav-link dropdown-btn" data-dropdown="dropdown1" aria-haspopup="true" aria-expanded="false" aria-label="browse">
              Browse
              <i class="bx bx-chevron-down" aria-hidden="true"></i>
            </button>
            <div id="dropdown1" class="dropdown">
              <ul role="menu">
                <li role="menuitem">
                  <a class="dropdown-link" href="#best-of-the-day">
                    <img src="https://raw.githubusercontent.com/Evavic44/responsive-navbar-with-dropdown/main/assets/icons/botd.svg" class="icon" />
                    <div>
                      <span class="dropdown-link-title">Best of the day</span>
                      <p>Shorts featured today by curators</p>
                    </div>
                  </a>
                </li>
                <li role="menuitem">
                  <a class="dropdown-link" href="#featured-streams">
                    <img src="https://raw.githubusercontent.com/Evavic44/responsive-navbar-with-dropdown/main/assets/icons/fs.svg" class="icon" />
                    <div>
                      <span class="dropdown-link-title">Featured Streams</span>
                      <p>Leading creatives livestreams</p>
                    </div>
                  </a>
                </li>
                <li role="menuitem">
                  <a class="dropdown-link" href="#subscriptions">
                    <img src="https://raw.githubusercontent.com/Evavic44/responsive-navbar-with-dropdown/main/assets/icons/sp.svg" class="icon" />
                    <div>
                      <span class="dropdown-link-title">Subscriptions</span>
                      <p>Gain exclusive access</p>
                    </div>
                  </a>
                </li>
                <li role="menuitem">
                  <a class="dropdown-link" href="#creative-feed">
                    <img src="https://raw.githubusercontent.com/Evavic44/responsive-navbar-with-dropdown/main/assets/icons/cf.svg" class="icon" />
                    <div>
                      <span class="dropdown-link-title">Creative Feed</span>
                      <p>See trending creations</p>
                    </div>
                  </a>
                </li>
              </ul>

              <ul role="menu">
                <li class="dropdown-title">
                  <span class="dropdown-link-title">Browse by apps</span>
                </li>
                <li role="menuitem">
                  <a class="dropdown-link" href="#adobe-xd">
                    <img src="https://raw.githubusercontent.com/Evavic44/responsive-navbar-with-dropdown/main/assets/icons/xd.svg" />
                    Adobe XD
                  </a>
                </li>
                <li role="menuitem">
                  <a class="dropdown-link" href="#after-effect">
                    <img src="https://raw.githubusercontent.com/Evavic44/responsive-navbar-with-dropdown/main/assets/icons/ae.svg" />
                    After Effect
                  </a>
                </li>
                <li role="menuitem">
                  <a class="dropdown-link" href="#sketch">
                    <img src="https://raw.githubusercontent.com/Evavic44/responsive-navbar-with-dropdown/main/assets/icons/sketch.svg" />
                    Sketch
                  </a>
                </li>
                <li role="menuitem">
                  <a class="dropdown-link" href="#indesign">
                    <img src="https://raw.githubusercontent.com/Evavic44/responsive-navbar-with-dropdown/main/assets/icons/indesign.svg" />
                    Indesign
                  </a>
                </li>
                <li role="menuitem">
                  <a class="dropdown-link" href="#figma">
                    <img src="https://raw.githubusercontent.com/Evavic44/responsive-navbar-with-dropdown/main/assets/icons/figma.svg" />
                    Figma
                  </a>
                </li>
              </ul>
            </div>
          </li> -->

          <li><a class="nav-link" href="#">About</a></li>
          <li><a class="nav-link" href="#">Terms</a></li>
        </ul>
      </nav>
    </div>

    <div class="nav-end">
      <div class="right-container">
              <button
        class="font-medium px-8 py-4 text-sm text-gray-900 rounded-lg cursor-pointer bg-gray-400"
        @click="toggleLoginType"
      >
        {{ mainStore.loginType ? 'Students' : 'Employers' }}
      </button>
      </div>

      <button id="hamburger" aria-label="hamburger" aria-haspopup="true" aria-expanded="false">
        <i class="bx bx-menu" aria-hidden="true"></i>
      </button>
    </div>
  </div>
  </header>

  <main>
    <slot />
  </main>
</template>

<script setup>
const dropdownBtn = ref(null);
const dropdown = ref(null);
const hamburgerBtn = ref(null);
const navMenu = ref(null);
const links = ref(null);

import { useMainStore } from "../stores/main";
const mainStore = useMainStore();

const toggleLoginType = () => {
 mainStore.toggleLoginType();
};

onMounted(() => {
  dropdownBtn.value = document.querySelectorAll(".dropdown-btn");
  dropdown.value = document.querySelectorAll(".dropdown");
  hamburgerBtn.value = document.getElementById("hamburger");
  navMenu.value = document.querySelector(".menu");
  links.value = document.querySelectorAll(".dropdown a");

  function setAriaExpandedFalse() {
    dropdownBtn.value.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
  }

  function closeDropdownMenu() {
    dropdown.value.forEach((drop) => {
      drop.classList.remove("active");
      drop.addEventListener("click", (e) => e.stopPropagation());
    });
  }

  function toggleHamburger() {
    navMenu.value.classList.toggle("show");
  }

  dropdownBtn.value.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const dropdownIndex = e.currentTarget.dataset.dropdown;
      const dropdownElement = document.getElementById(dropdownIndex);
      dropdownElement.classList.toggle("active");
      dropdown.value.forEach((drop) => {
        if (drop.id !== btn.dataset["dropdown"]) {
          drop.classList.remove("active");
        }
      });
      e.stopPropagation();
      btn.setAttribute(
        "aria-expanded",
        btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
      );
    });
  });

  links.value.forEach((link) =>
    link.addEventListener("click", () => {
      closeDropdownMenu();
      setAriaExpandedFalse();
      toggleHamburger();
    })
  );

  document.documentElement.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdownMenu();
      setAriaExpandedFalse();
    }
  });

  hamburgerBtn.value.addEventListener("click", toggleHamburger);
});


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

<script>
import Modals from "@/components/UI/Modals.vue"
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

<style scoped>
/* style.css */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

:root {
  --dark-grey: #333333;
  --medium-grey: #636363;
  --light-grey: #eeeeee;
  --ash: #f4f4f4;
  --primary-color: #2b72fb;
  --white: white;
  --border: 1px solid var(--light-grey);
  --shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}

body {
  font-family: inherit;
  background-color: var(--white);
  color: var(--dark-grey);
  letter-spacing: -0.4px;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: inherit;
}

.btn {
  display: block;
  background-color: var(--primary-color);
  color: var(--white);
  text-align: center;
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 5px;
}

.icon {
  padding: 0.5rem;
  background-color: var(--light-grey);
  border-radius: 10px;
}

.logo {
  margin-right: 1.5rem;
}

#nav-menu {
  /* border-bottom: var(--border); */
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 2rem;
  height: 80px;
  padding: 1.2rem 3rem;
}

.menu {
  position: relative;
  background: var(--white);
}

.menu-bar li:first-child .dropdown {
  flex-direction: initial;
  min-width: 480px;
}

.menu-bar li:first-child ul:nth-child(1) {
  border-right: var(--border);
}

.menu-bar li:nth-child(n + 2) ul:nth-child(1) {
  border-bottom: var(--border);
}

.menu-bar .dropdown-link-title {
  font-weight: 600;
}

.menu-bar .nav-link {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: -0.6px;
  padding: 0.3rem;
  min-width: 60px;
  margin: 0 0.6rem;
}

.menu-bar .nav-link:hover,
.dropdown-link:hover {
  color: var(--primary-color);
}

.nav-start,
.nav-end,
.menu-bar,
.right-container,
.right-container .search {
  display: flex;
  align-items: center;
}

.dropdown {
  display: flex;
  flex-direction: column;
  min-width: 230px;
  background-color: var(--white);
  border-radius: 10px;
  position: absolute;
  top: 36px;
  z-index: 1;
  visibility: hidden;
  opacity: 0;
  transform: scale(0.97) translateX(-5px);
  transition: 0.1s ease-in-out;
  box-shadow: var(--shadow);
}

.dropdown.active {
  visibility: visible;
  opacity: 1;
  transform: scale(1) translateX(5px);
}

.dropdown ul {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.2rem;
  font-size: 0.95rem;
}

.dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.15rem;
}

.dropdown-link {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-radius: 7px;
  transition: 0.1s ease-in-out;
}

.dropdown-link p {
  font-size: 0.8rem;
  color: var(--medium-grey);
}

.right-container {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.right-container .search {
  position: relative;
}

.right-container img {
  border-radius: 50%;
}

.search input {
  background-color: var(--ash);
  border: none;
  border-radius: 6px;
  padding: 0.7rem;
  padding-left: 2.4rem;
  font-size: 16px;
  width: 100%;
  border: var(--border);
}

.search .bx-search {
  position: absolute;
  left: 10px;
  top: 50%;
  font-size: 1.3rem;
  transform: translateY(-50%);
  opacity: 0.6;
}

#hamburger {
  display: none;
  padding: 0.1rem;
  margin-left: 1rem;
  font-size: 1.9rem;
}

@media (max-width: 1100px) {
  #hamburger {
    display: block;
  }

  .container {
    padding: 1.2rem;
  }

  .menu {
    display: none;
    position: absolute;
    top: 87px;
    left: 0;
    min-height: 100vh;
    width: 100vw;
  }

  .menu-bar li:first-child ul:nth-child(1) {
    border-right: none;
    border-bottom: var(--border);
  }

  .dropdown {
    display: none;
    min-width: 100%;
    border: none !important;
    border-radius: 5px;
    position: static;
    top: 0;
    left: 0;
    visibility: visible;
    opacity: 1;
    transform: none;
    box-shadow: none;
  }

  .menu.show,
  .dropdown.active {
    display: block;
  }

  .dropdown ul {
    padding-left: 0.3rem;
  }

  .menu-bar {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    row-gap: 1rem;
    padding: 1rem;
  }

  .menu-bar .nav-link {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: 600;
    font-size: 1.2rem;
    margin: 0;
  }

  .menu-bar li:first-child .dropdown {
    min-width: 100%;
  }

  .menu-bar > li:not(:last-child) {
    padding-bottom: 0.5rem;
    border-bottom: var(--border);
  }
}

@media (max-width: 600px) {
  .right-container {
    display: none;
  }
}

</style>


