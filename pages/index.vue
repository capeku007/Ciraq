<template>
  <!-- <div class="parentContainer">
    <div class="loginImageCon">
      <div>
        <h2 style="text-align: center; font-size:2.5rem">Connect, Get Hired!</h2>

        <img class="loginImg" src="../assets/Group 2.png" alt="" />
      </div>
    </div>
    <div class="loginForm">
      <div class="container">
        <div class="content login-box">
          <h5 style="text-align: center; margin-bottom: 2rem">Ciraq</h5>
          <form @submit.prevent="loginUser">
            <div class="user-box">
              <input v-model="uname" type="text" name="" required="" />
              <label>Student email</label>
            </div>
            <div class="user-box">
              <input v-model="pword" type="password" name="" required="" />
              <label>Password</label>
            </div>
            <div>
              <div><button  class="loginBtn">Login</button>
              </div>
              <div>
                <a style="font-size: small" href="#"> Forgot Password? </a>
              </div>
              <div style="display: flex; align-items: flex-end">
                <div style="width: 40%"><hr /></div>
                <div style="width: 20%"><h6>OR</h6></div>
                <div style="width: 40%"><hr /></div>
              </div>

              <div>
                <img :src="authStore.getUserImage" alt="">


              </div>

              <div style="font-size: small">
                Don't have an account?
                <span> <nuxt-link to="/signup"> Sign up </nuxt-link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div> -->

  <div class="centerDiv w-[24rem]">
    <div class="relative flex flex-wrap w-full">
      <div class="w-full">
        <div>
          <div class="flex justify-center items-center text-gray-700">
            <img class="w-24" src="/assets/logo.png" />
          </div>

          <form class="mt-4">
            <div class="mx-auto max-w-lg">
              <div class="py-2">
                <span class="px-1 text-sm text-gray-600">Username</span>
                <input
                v-model="uname"
                  placeholder=""
                  type="text"
                    class="text-md block px-3 py-2 mt-1 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow focus:placeholder-gray-500 focus:bg-white focus:border-[#044013] focus:outline-none"
                />
              </div>
              <div class="py-2">
                <div class="flex items-center justify-between">
                  <label for="password" class="px-1 text-sm text-gray-600"
                    >Password</label
                  >
                  <div class="text-sm">
                    <nuxt-link
                      to="#"
                      class="cursor-pointer text-sm tracking-tighter text-[#8FBBBB] border-b-2 border-gray-200 hover:border-gray-400"
                      >Forgot password?</nuxt-link
                    >
                  </div>
                </div>
                <div class="relative">
                  <input
                  v-model="pword"
                    placeholder=""
                    :type="showPassword ? 'text' : 'password'"
                    class="text-md block px-3 py-2 mt-1 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow focus:placeholder-gray-500 focus:bg-white focus:border-[#044013] focus:outline-none"
                  />
                  <div
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-lg leading-5"
                  >
                    <i
                      class="bx bx-hide cursor-pointer text-gray-700"
                      v-if="!showPassword"
                      @click="togglePasswordVisibility"
                    ></i>

                    <i
                      class="bx bx-show cursor-pointer text-gray-700"
                      v-else
                      @click="togglePasswordVisibility"
                    ></i>
                  </div>
                </div>
              </div>

              <button
              @click.prevent="loginUser"
                class="text-lg font-semibold mt-3 bg-[#044013] w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
              >
                Login
              </button>
            </div>
          </form>
          
    <p class="mt-10 text-center text-sm text-gray-400">
      Not a member?
      <a href="#" class="font-semibold leading-6 text-[#044013] hover:text-[#044013]">create an account</a>
    </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useAuthStore } from "../stores/authStore";
import { reactive } from "vue";

// Define loginData using reactive
definePageMeta({
  middleware: ["already-auth"],
  layout: "blank",
});

const uname = ref("capeku248");
const pword = ref("Godi$Great");
const error = ref(null);
const selectedListing = ref(null);
const isMobile = ref(false);
const showJobList = ref(true);
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  if (!isMobile.value) {
    showJobList.value = true; // Reset to show message list on larger screens
  }
};

onMounted(() => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

// Access the authStore instance
const authStore = useAuthStore();
// authStore.login({
//   username: uname.value,
//   p_word:pword.value,
// })

// Define loginUser function

const loginUser = async () => {
  try {
    let loginData = {
      username: uname.value,
      p_word: pword.value,
    };
    authStore.login(loginData);
    // await navigateTo("/dashboard", {replace:true})
  } catch (err) {
    this.error = err.message;
    alert(this.error);
  }
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
  border: 1px solid #00656570;
}
.parentContainer {
  display: flex;
}

.loginImageCon {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginForm {
  width: 40%;
  padding: 5rem;
}

.container {
  border-radius: 1px;
  padding: 3rem;
  box-sizing: border-box;
  font-family: sans-serif;
  color: #737373;
  border: 1px solid #006565;
  text-align: center;
  background: white;
  border-radius: 1rem;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  /* color: #fff; */
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #737373;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  /* color: #fff; */
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  /* color: #bdb8b8; */
  font-size: 12px;
}

.loginBtn {
  width: 80%;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  background-color: #006565;
  border: none;
  color: #fff;
}

.loginImg {
  width: 90%;
  margin-left: 2rem;
}
</style>
