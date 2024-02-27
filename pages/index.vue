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

  <div class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl m-2">
    <div class="h-full md:flex no-wrap md:-mx-1">


      <!--  Body (visible on mobile) -->
      <div
  v-if="!isMobile || (isMobile && !showJobList)"
  class="w-full md:w-8/12 mx-auto flex justify-center items-center "
>
  <div class="m-auto p-auto text-center">
    <h2 style="font-size: 2.5rem">
      Connect, Get Hired!
    </h2>
    <img src="../assets/Group 2.png" class="object-cover w-70 mx-auto" />
  </div>
</div>

      <!--  List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showJobList)"
        class="m-auto md:w-4/12 md:mx-1 flex justify-center items-center min-h-[81vh]"
      >
        <div class="shadow-md card p-4">
          <h1
            class="text-xl md:text-2xl font-bold leading-tight mt-2 text-[#044013]"
          >
            Sign in
          </h1>
          <p>Stay updated</p>

          <form class="mt-4" action="#" method="POST">
            <div>
              <label class="block text-gray-700">Email Address</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter Email Address"
                class="w-full p-2 rounded-2xl bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              />
            </div>

            <div class="mt-4 relative">
              <div class="flex justify-between">
                <p class="block text-gray-700">Password</p>
                <p class="block text-[#D9C179] hover:text-[#BDA472]">
                  Forgot Password?
                </p>
              </div>
              <div class="relative">
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Enter Password"
                  minlength="6"
                  class="w-full p-2 rounded-2xl bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none pr-10"
                  required
                />
                <!-- View Password Icon -->
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                >
                  <svg
                    class="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 15a5 5 0 0110 0V20a2 2 0 01-2 2H11a2 2 0 01-2-2v-5"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="w-full block bg-[#BDA472] hover:bg-[#D9C179] text-white font-semibold rounded-2xl px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <hr class="my-6 border-gray-300 w-full" />

          <p class="mt-2 text-center">
            Need an account?
            <a
              href="#"
              class="text-[#D9C179] hover:text-[#BDA472] font-semibold"
              >Create an account</a
            >
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
});

const uname = ref("kkinaata425");
const pword = ref("12345678@");
const error = ref(null);
const selectedListing = ref(null);
const isMobile = ref(false);
const showJobList = ref(true);

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
