<template>
  <div
    class="flex justify-center items-center h-screen max-w-md mx-auto rounded-lg overflow-hidden md:max-w-lg"
  >
    <div class="relative flex flex-wrap w-11/12">
      <div class="w-full">
        <div>
          <div class="flex justify-center items-center text-gray-700">
            <img class="w-24" src="/assets/logo.png" />
          </div>
            <p class="text-center text-lg font-semibold mt-4">Employer Login</p>
          <div>
            <form v-if="!forgotPassword" class="mt-4">
              <div class="mx-auto max-w-lg">
                <div class="py-2">
                  <span class="px-1 text-sm text-gray-600">Email</span>
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
                      <p
                        
                        @click="toggleForgotPassword"
                        class="cursor-pointer text-sm tracking-tighter text-[#8FBBBB] border-b-2 border-gray-200 hover:border-gray-400"
                        >Forgot password?</p
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
                  class="text-lg font-semibold mt-3 bg-[#132E35] w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
                >
                  Login
                </button>
              </div>
              
            </form>

            <form v-if="forgotPassword">
              <div class="pb-2 pt-8">
                <div class="flex items-center justify-between">
                  <label for="password" class="px-1 text-sm text-gray-600"
                    >Email</label
                  >
                  <div class="text-sm">
                    <p
                      @click="toggleForgotPassword"
                      class="cursor-pointer text-sm tracking-tighter text-[#307283] border-b-2 border-gray-200 hover:border-gray-400"
                      >Login</p
                    >
                  </div>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useEmployerAuth } from "../stores/employerAuth";
import { reactive } from "vue";
useHead({
  title: "Login",
  meta: [{ name: "description", content: "Student login" }],
});
// Define loginData using reactive
definePageMeta({
  middleware: ["authemp"],
  layout: "blank",
});

const uname = ref("prince0420182558d@ktu.edu.gh");
const pword = ref("12345678@");
const error = ref(null);
const selectedListing = ref(null);
const isMobile = ref(false);
const showJobList = ref(true);
const showPassword = ref(false);

const forgotPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleForgotPassword = () => {
  forgotPassword.value = !forgotPassword.value;
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
const authStore = useEmployerAuth();
const router = useRouter();
const loginUser = async () => {
  try {
    let loginData = {
      company_email: uname.value,
      p_word: pword.value,
    };
    authStore.login(loginData);
    // router.push("/dashboard");
  } catch (err) {
    this.error = err.message;
    alert(this.error);
  }
};
</script>

<style scoped>
</style>
