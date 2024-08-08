<template>
  <div>
    <Modals />
    <div :class="['sidebar', { open: isOpen }]">
      <div class="logo-details">
        <img src="../assets/logo.png" class="icon w-10 h-10 rounded-full mr-4 " alt="ciraq logo">
        <div class="logo_name">Ciraq Hub</div>
        <button class="bx bx-menu mr-2" id="btn" @click="toggleSidebar"></button>
      </div>
      <ul class="nav-list">
        <li  :class="{'active': $route.path === '/employer/dashboard'}">
          <nuxt-link to="/employer/dashboard" >
            <i class="bx bx-home"></i>
            <span class="links_name">Dashboard</span>
          </nuxt-link>
          <span class="tooltip">Dashboard</span>

        </li>
        <li :class="{'active': $route.path === '/employer/new'}">
          <nuxt-link to="/employer/new" >
            <i class="bx bx-message-square-add"></i>
            <span class="links_name">New Listing</span>
          </nuxt-link>
          <span class="tooltip">New Listing</span>
        </li>
        
        <li :class="{'active': $route.path === '/employer/chat'}">
          <nuxt-link to="/employer/chat" >
            <i class="bx bx-conversation"></i>
            <span class="links_name">Chats</span>
          </nuxt-link>
          <span class="tooltip">Chats</span>
        </li>
        <li :class="{'active': $route.path === '/employer/CompanyProfile'}">
          <nuxt-link to="/employer/CompanyProfile" >
            <i class="bx bx-detail"></i>
            <span class="links_name">Company Profile</span>
          </nuxt-link>
          <span class="tooltip">Company Profile</span>
        </li>

        <li class="profile">
          <div class="profile-details">
            <img
                    class="w-10 h-10 rounded-lg"
                    :src="
                      company.company_logo
                        ? `https://ciraq.co/api/public/uploads/profile_images/${company.company_logo}`
                        : companyPlaceholder
                    "
                    alt="company image"
                  />
            <div class="name_job">
              <div class="name">{{company.company_name}}</div>
              <div class="job">{{company.username}}</div>
            </div>
          </div>
          <i @click="signOut" class="bx bx-log-out" id="log_out"></i>
        </li>
      </ul>
    </div>
    <section :class="['home-section', { open: isOpen }]">
      <!-- Add your main content here -->
      <slot />
    </section>
  </div>
</template>

<script setup>
import "boxicons/css/boxicons.min.css";
import Modals from "@/components/UI/Modals.vue";
import { useModalStore } from "@/stores/modalStore.js";
import companyPlaceholder from "~/assets/images/companyPlace.jpg";
const modalStore = useModalStore();
const isOpen = ref(false);

const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};

const signOut = () => {
  
  let info = "Confirm signout?";
    modalStore.changeDialog(info);
  let func = {};
  // IF USER SELECTS YES CONTINUE FUNCTION
  func.yesfunc = async function () {
     try {
        employerAuth.logout()
      } catch (error) {
        throw error; // Rethrow the error to handle it elsewhere if needed
      }
  };

  modalStore.OpenYesOrNOClick(func);
};

// company import
import { useEmployerAuth } from "@/stores/employerAuth";
const employerAuth = useEmployerAuth();
const company = employerAuth.company;

</script>

<style >
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 55px;
  background: #fff;
  padding: 10px;
  z-index: 5;
  transition: all 0.5s ease;
}
.sidebar.open {
  width: 250px;
}
.sidebar .logo-details {
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
}
.sidebar .logo-details .icon {
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar .logo-details .logo_name {
  color: #132E35;
  font-size: 20px;
  font-weight: 600;
  opacity: 0;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details .icon,
.sidebar.open .logo-details .logo_name {
  opacity: 1;
}
.sidebar .logo-details #btn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 22px;
  transition: all 0.4s ease;
  font-size: 23px;
  text-align: center;
  cursor: pointer;
  transition: all 0.5s ease;
}
.sidebar.open .logo-details #btn {
  text-align: right;
}
.sidebar i {
  color: #fff;
  padding-right: 1rem;
  padding-left: .6rem; 
  line-height: 60px;
}
.sidebar .nav-list {
  margin-top: 20px;
  height: 100%;
}
.sidebar li {
  position: relative;
  margin: 8px 0;
  list-style: none;
  height: 35px;
}
.sidebar li .tooltip {
  position: absolute;
  top: -20px;
  left: calc(100% + 15px);
  z-index: 1;
  background: #fff;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 400;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  transition: 0s;
}
.sidebar li:hover .tooltip {
  opacity: 1;
  pointer-events: auto;
  transition: all 0.4s ease;
  top: 50%;
  transform: translateY(-50%);
}
.sidebar.open li .tooltip {
  display: none;
}
.sidebar input {
  font-size: 15px;
  color: #fff;
  font-weight: 400;
  outline: none;
  height: 50px;
  width: 100%;
  width: 50px;
  border: none;
  border-radius: 12px;
  transition: all 0.5s ease;
  background: #132E35;
}
.sidebar.open input {
  padding: 0 20px 0 50px;
  width: 100%;
}

.sidebar li a {
  display: flex;
  height: 100%;
  width: 100%;
  border-radius: 12px;
  padding: 0;
  align-items: center;
  text-decoration: none;
  transition: all 0.4s ease;
  background: #11101d;
}
.sidebar li a:hover {
  background: #fff;
  border:1px solid #132E35;
}


.sidebar li a .links_name {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: 0.4s;
}
.sidebar.open li a .links_name {
  opacity: 1;
  pointer-events: auto;
}
.sidebar li a:hover .links_name,
.sidebar li a:hover i {
  transition: all 0.5s ease;
  color: #132E35;
}
.sidebar li i {
  
  font-size: 14px;
  border-radius: 12px;
}
.sidebar li.profile {
  position: fixed;
  height: 60px;
  width: 55px;
  left: 0;
  bottom: -8px;
  padding: 10px ;
  color: #132E35;
  transition: all 0.5s ease;
  overflow: hidden;
}
.sidebar.open li.profile {
  width: 250px;
}
.sidebar li .profile-details {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}
.sidebar li img {
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}
.sidebar li.profile .name,
.sidebar li.profile .job {
  font-size: 15px;
  font-weight: 400;
  color: #132E35;
  white-space: nowrap;
}
.sidebar li.profile .job {
  font-size: 12px;
}
.sidebar .profile #log_out {
  position: absolute;
  display: none;
  right: 0;
  transform: translateY(-50%);
  top: 50%;
  color: red;
  width: 100%;
  height: 60px;
  line-height: 60px;
  transition: all 0.5s ease;
}
.sidebar.open .profile #log_out {
  display: flex;
  width: 50px;
  background: none;
  color:red;
  font: 800;
  padding-left: 1rem;
  font-size: 24px;
  cursor: pointer;
}
.home-section {
  position: relative;
  padding: 1rem;
  background: #f7f7f7;
  min-height: 100vh;
  top: 0;
  left: 55px;
  width: calc(100% - 55px);
  transition: all 0.5s ease;
}
.sidebar.open ~ .home-section {
  left: 16rem;
  width: calc(100% - 16rem);
}
.home-section .text {
  display: inline-block;
  color: #132E35;
  font-size: 25px;
  font-weight: 500;
  margin: 18px;
}
@media (max-width: 420px) {
  .sidebar li .tooltip {
    display: none;
  }
}

.sidebar li.active a {
  background: #fff;
  border: 1px solid #000;
}

.sidebar li.active a .links_name,
.sidebar li.active a i {
  color: #000;
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
/* For Internet Explorer and Edge */
body {
  scrollbar-face-color: #ebebeb;
  scrollbar-track-color: #f1f1f1;
}

.loader {
  width: 40px;
  height: 20px;
  --c:no-repeat radial-gradient(farthest-side,#000 93%,#0000);
  background:
    var(--c) 0    0,
    var(--c) 50%  0,
    var(--c) 100% 0;
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
  animation: 
    l4-1 1s  linear infinite alternate,
    l4-2 0.5s cubic-bezier(0,200,.8,200) infinite;
}
@keyframes l4-0 {
  0%      {background-position: 0  100%,50% 0   ,100% 0}
  8%,42%  {background-position: 0  0   ,50% 0   ,100% 0}
  50%     {background-position: 0  0   ,50% 100%,100% 0}
  58%,92% {background-position: 0  0   ,50% 0   ,100% 0}
  100%    {background-position: 0  0   ,50% 0   ,100% 100%}
}
@keyframes l4-1 {
  100% {left:calc(100% - 8px)}
}
@keyframes l4-2 {
  100% {top:-0.1px}
}
</style>