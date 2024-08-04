<template>
  <div class="bg-container">
    <div class="relative flex flex-wrap w-11/12 sm:w-10/12">
      <div class="ciraq-page flex">
        <div class="text">
          <!-- <h1>ciraq</h1> -->
          <p class="ptag text-sm sm:text-2xl">
            Simplifying the Path to Success
          </p>
          <p class="ptag text-sm sm:text-2xl">
            Connecting Aspirations, Verified Opportunities
          </p>
        </div>
        <!-- Student login -->
        <form v-if="!forgotPassword && !mainStore.loginType">
          <p class="text-center text-lg font-semibold mt-2">Students</p>
          <div>
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
                  <p
                    @click="toggleForgotPassword"
                    class="cursor-pointer text-sm tracking-tighter text-[#8FBBBB] border-b-2 border-gray-200 hover:border-gray-400"
                  >
                    Forgot password?
                  </p>
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
              :disabled="authStore.isLoading"
              @click.prevent="loginUser"
              class="text-lg font-semibold mt-3 bg-[#132E35] w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
            >
              <span v-if="authStore.isLoading">Loading...</span>
              <span v-else>Login</span>
            </button>
          </div>
          <p class="mt-6 text-center text-sm text-gray-400">
            Not a member?
            <nuxt-link
              to="/signup"
              class="font-semibold leading-6 text-[#132E35] hover:text-[#044013]"
              >create an account</nuxt-link
            >
          </p>
        </form>

        <form v-if="forgotPassword && !mainStore.loginType">
          <p class="text-center text-lg font-semibold mt-4">Students</p>
          <div class="pb-2 pt-8">
            <div class="flex items-center justify-between">
              <label for="password" class="px-1 text-sm text-gray-600"
                >Student email</label
              >
              <div class="text-sm">
                <p
                  @click="toggleForgotPassword"
                  class="cursor-pointer text-sm tracking-tighter text-[#307283] border-b-2 border-gray-200 hover:border-gray-400"
                >
                  Login
                </p>
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
        <!-- Student login end-->

        <!-- employer login start-->
        <form v-if="!forgotPassword2 && mainStore.loginType" class="mt-4">
          <p class="text-center text-lg font-semibold mt-2">Employers</p>
          <div>
            <div class="py-2">
              <span class="px-1 text-sm text-gray-600">Email</span>
              <input
                v-model="uname2"
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
                    @click="toggleForgotPassword2"
                    class="cursor-pointer text-sm tracking-tighter text-[#8FBBBB] border-b-2 border-gray-200 hover:border-gray-400"
                  >
                    Forgot password?
                  </p>
                </div>
              </div>
              <div class="relative">
                <input
                  v-model="pword2"
                  placeholder=""
                  :type="showPassword2 ? 'text' : 'password'"
                  class="text-md block px-3 py-2 mt-1 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow focus:placeholder-gray-500 focus:bg-white focus:border-[#044013] focus:outline-none"
                />
                <div
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-lg leading-5"
                >
                  <i
                    class="bx bx-hide cursor-pointer text-gray-700"
                    v-if="!showPassword2"
                    @click="togglePasswordVisibility2"
                  ></i>

                  <i
                    class="bx bx-show cursor-pointer text-gray-700"
                    v-else
                    @click="togglePasswordVisibility2"
                  ></i>
                </div>
              </div>
            </div>

            <button
              :disabled="authStore2.isLoading"
              @click.prevent="loginUser2"
              class="text-lg font-semibold mt-3 bg-[#132E35] w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
            >
              <span v-if="authStore2.isLoading">Loading...</span>
              <span v-else>Login</span>
            </button>
          </div>
        </form>

        <form v-if="forgotPassword2 && mainStore.loginType">
          <p class="text-center text-lg font-semibold mt-2">Employers</p>
          <div class="pb-2 pt-8">
            <div class="flex items-center justify-between">
              <label for="password" class="px-1 text-sm text-gray-600"
                >Email</label
              >
              <div class="text-sm">
                <p
                  @click="toggleForgotPassword2"
                  class="cursor-pointer text-sm tracking-tighter text-[#307283] border-b-2 border-gray-200 hover:border-gray-400"
                >
                  Login
                </p>
              </div>
            </div>
            <div class="relative">
              <input
                v-model="resetEmail2"
                placeholder=""
                type="email"
                class="text-md block px-3 py-2 mt-1 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow focus:placeholder-gray-500 focus:bg-white focus:border-[#132E35] focus:outline-none"
              />
            </div>
          </div>

          <button
            @click.prevent="resetPassword2"
            class="text-lg font-semibold mt-3 bg-[#132E35] w-full text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black"
          >
            Reset Password
          </button>
        </form>
        <!-- employer login end-->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../stores/authStore";
import { reactive } from "vue";
import { useMainStore } from "../stores/main";
const mainStore = useMainStore();
useHead({
  title: "Login",
  meta: [{ name: "description", content: "Student login" }],
});
// Define loginData using reactive
definePageMeta({
  middleware: ["authstd", "authemp"],
  layout: "login",
});

const uname = ref("");
const pword = ref("");
const error = ref(null);
const isMobile = ref(false);
const showPassword = ref(false);

const uname2 = ref("");
const pword2 = ref("");

const forgotPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleForgotPassword = () => {
  forgotPassword.value = !forgotPassword.value;
};

const showPassword2 = ref(false);

const forgotPassword2 = ref(false);

const togglePasswordVisibility2 = () => {
  showPassword2.value = !showPassword2.value;
};

const toggleForgotPassword2 = () => {
  forgotPassword2.value = !forgotPassword2.value;
};

const handleResize = () => {
  isMobile.value = window.innerWidth < 768; // Adjust the threshold as needed
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
// Define loginUser function
const router = useRouter();
const loginUser = async () => {
  try {
    let loginData = {
      username: uname.value,
      p_word: pword.value,
    };
    authStore.login(loginData);
  } catch (err) {
    this.error = err.message;
  }
};

// Access the authStore instance
const authStore2 = useEmployerAuth();
const loginUser2 = async () => {
  try {
    let loginData = {
      company_email: uname2.value,
      p_word: pword2.value,
    };
    authStore2.login(loginData);
  } catch (err) {
    this.error = err.message;
  }
};
</script>

<style scoped>
.bg-container {
  @apply flex justify-center h-[90vh] max-w-full mx-auto rounded-lg overflow-hidden md:max-w-full;
  background-image: url("../assets/images/background.jpg");
  background-size: cover;
  background-position: center;
}

.bg-container::before {
  content: "";
  position: absolute;
  top: 0;
  margin-top: 80px;
  left: 0;
  width: 100%;
  height: 90vh;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  );
}

.flex {
  display: flex;
  align-items: center;
}

.container {
  padding: 0 15px;
  min-height: 100vh;
  justify-content: center;
  background: #f0f2f5;
}

.ciraq-page {
  justify-content: space-between;
  width: 100%;
}

.ciraq-page .text {
  margin-bottom: 90px;
}

.ciraq-page h1 {
  color: #132e35;
  font-size: 4rem;
  margin-bottom: 10px;
}

.ptag {
  /* font-size: 1.25rem; */
  white-space: nowrap;
  color: #fff;
}

form {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

/* form input {
  height: 55px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 1rem;
  padding: 0 14px;
} */

form input:focus {
  outline: none;
  border-color: #1877f2;
}

::placeholder {
  color: #777;
  font-size: 1.063rem;
}

.link {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 15px;
}

/* .link .login {
  border: none;
  outline: none;
  cursor: pointer;
  background: #132E35;
  padding: 15px 0;
  border-radius: 6px;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  transition: 0.2s ease;
} */

.link .login:hover {
  background: #0d65d9;
}

/* form a {
  text-decoration: none;
} */

/* .link .forgot {
  color: #1877f2;
  font-size: 0.875rem;
} */

/* .link .forgot:hover {
  text-decoration: underline;
} */

/* hr {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 20px;
  margin-top: 20px;
} */

/* .button {
  margin-top: 25px;
  text-align: center;
  margin-bottom: 20px;
}

.button a {
  padding: 15px 20px;
  background: #42b72a;
  border-radius: 6px;
  color: #fff;
  font-size: 1.063rem;
  font-weight: 600;
  transition: 0.2s ease;
}

.button a:hover {
  background: #3ba626;
} */

@media (max-width: 900px) {
  .ciraq-page {
    flex-direction: column;
    text-align: center;
  }

  .ciraq-page .text {
    margin-bottom: 30px;
  }
}

@media (max-width: 460px) {
  .ciraq-page h1 {
    font-size: 3.5rem;
  }

  form {
    padding: 15px;
  }
}
</style>
