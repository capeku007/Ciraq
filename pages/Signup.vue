<!-- components/MultiStepForm.vue -->
<template>
  <div>
    <h1
      class="text-lg font-bold text-gray-700 leading-tight text-center mt-12 mb-5"
    >
      User Registration
    </h1>
    <form
      id="signUpForm"
      class="p-12 shadow-md rounded-2xl bg-white mx-auto border-solid border-2 border-gray-100 mb-8"
      @submit.prevent="submitForm"
      enctype="multipart/form-data"
    >
      <!-- start step indicators -->
      <div class="form-header flex gap-3 mb-4 text-xs text-center">
        <span class="stepIndicator flex-1 pb-8 relative">Account Setup</span>
        <span class="stepIndicator flex-1 pb-8 relative">ID Verification</span>
        <span class="stepIndicator flex-1 pb-8 relative">Personal Details</span>
      </div>
      <!-- end step indicators -->
      <!-- step one -->
      <div class="step">
        <p class="text-md text-gray-700 leading-tight text-center mt-8 mb-5">
          Create your account
        </p>

        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="signUpData.fname"
              @input="filterNumbers"
              type="text"
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
            <label
              for="floating_first_name"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >First name</label
            >
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="signUpData.lname"
              @input="filterNumbers"
              type="text"
              id="floating_last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Last name</label
            >
          </div>
        </div>

        <!-- Gender -->
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <div class="relative">
              <span
                class="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400"
              >
                <Icon
                  name="ic:round-mail-outline"
                  class="w-4 h-4 rtl:rotate-[270deg]"
                ></Icon>
              </span>
              <input
                v-model="signUpData.std_mail"
                @input="validateEmail"
                :class="{ 'invalid-email': !isValidEmail }"
                type="text"
                id="floating-mail"
                class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />

              <label
                v-if="isValidEmail"
                for="floating-mail"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >Student mail</label
              >
              <label
                v-else
                for="floating-mail"
                class="absolute text-sm text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >Student mail only
              </label>
            </div>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <div class="relative">
              <span
                class="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400"
              >
                <Icon
                  name="ic:round-mail-outline"
                  class="w-4 h-4 rtl:rotate-[270deg]"
                ></Icon>
              </span>
              <input
                v-model="signUpData.personal_mail"
                @input="validateEmail"
                :class="{ 'invalid-email': !isValidEmail }"
                type="text"
                id="floating-mail"
                class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />

              <label
                v-if="isValidEmail"
                for="floating-mail"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >Personal mail</label
              >
              <label
                v-else
                for="floating-mail"
                class="absolute text-sm text-red-600 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-red-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >Personal mail only
              </label>
            </div>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <select
              id="underline_select"
              v-model="signUpData.institution"
              @change="updateSchoolImage"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option selected>Select School</option>
              <option value="KNUST">KNUST</option>
              <option value="UG">UG</option>
              <option value="UCC">UCC</option>
            </select>
          </div>
        </div>

        <!-- Phone -->
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <div class="relative">
              <span
                class="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400"
              >
                <Icon
                  name="ic:outline-local-phone"
                  class="w-4 h-4 rtl:rotate-[270deg]"
                ></Icon>
              </span>
              <input
                v-model="signUpData.tel"
                type="text"
                id="floating-phone-number"
                @input="limitInput"
                maxlength="14"
                class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                for="floating-phone-number"
                class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >Phone number</label
              >
            </div>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <label for="gender" class="sr-only">Gender</label>
            <select
              v-model="signUpData.gender"
              id="gender"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option selected>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <!-- Password -->
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="signUpData.p_word"
              :class="{
                'border-red-600 text-red-600':
                  signUpData.p_word !== confirm_p_word && confirm_p_word !== '',
              }"
              type="password"
              @input="validatePassword"
              name="floating_password"
              id="floating_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
            />
            <label
              for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Password</label
            >
            <p v-if="shouldShowErrorMessage" class="text-sm text-red-600">
              Passwords must be 8 characters or more
            </p>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="confirm_p_word"
              type="password"
              id="floating_repeat_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              :class="{
                'border-red-600 text-red-600':
                  signUpData.p_word !== confirm_p_word && confirm_p_word !== '',
              }"
              required
            />
            <label
              for="floating_repeat_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Confirm password</label
            >
            <p
              v-if="
                signUpData.p_word !== confirm_p_word && confirm_p_word !== ''
              "
              class="text-sm text-red-600"
            >
              Passwords do not match
            </p>
          </div>
        </div>

        <!-- end of step 1 -->
      </div>

      <!-- step two -->
      <div class="step">
        <div class="container">
          <h1>
            <small>Profile Image</small>
          </h1>
          <div class="avatar-upload">
            <div class="avatar-edit">
              <input
                type="file"
                name="profilepic"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                @change="handleImageUpload2"
              />
              <label for="imageUpload"
                ><Icon
                  name="ic:outline-edit"
                  class="w-5 h-5 rtl:rotate-[270deg]"
                ></Icon>
              </label>
            </div>
            <div class="avatar-preview">
              <div
                :style="{
                  backgroundImage: `url(${stdid_img_name})`,
                }"
                id="imagePreview"
              ></div>
            </div>
          </div>
        </div>

        <!-- ID and Selfie -->
        <div><h5 style="text-align: center; margin: 1rem">ID Upload</h5></div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <div>
            <div class="relative z-0 w-full mb-5 group">
              <div class="relative">
                <span
                  class="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400"
                >
                  <Icon
                    name="ic:outline-school"
                    class="w-4 h-4 rtl:rotate-[270deg]"
                  ></Icon>
                </span>
                <input
                  v-model="signUpData.degree_program"
                  type="text"
                  id="floating_study"
                  class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  for="floating_study"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >Program of study</label
                >
              </div>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <div class="relative">
                <span
                  class="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400"
                >
                  <Icon
                    name="ic:outline-local-phone"
                    class="w-4 h-4 rtl:rotate-[270deg]"
                  ></Icon>
                </span>
                <input
                  v-model="signUpData.std_id"
                  type="text"
                  id="floating_id"
                  class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  for="floating_id"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >ID Number</label
                >
              </div>
            </div>

            <div class="relative z-0 w-full mb-5 group">
              <div class="relative">
                <span
                  class="absolute start-0 bottom-3 text-gray-500 dark:text-gray-400"
                >
                  <!-- <Icon
                    name="ic:outline-local-phone"
                    class="w-4 h-4 rtl:rotate-[270deg]"
                  ></Icon> -->
                </span>
                <input
                  v-model="signUpData.availability_start"
                  type="date"
                  id="startDate"
                  class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  for="startDate"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                  >Start Date</label
                >
              </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
              <div class="relative">
                <input
                  v-model="signUpData.dob"
                  type="date"
                  id="dob"
                  class="block py-2.5 ps-6 pe-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label
                  for="dob"
                  class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:start-6 peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Date of birth</label
                >
              </div>
            </div>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <div class="flex items-center justify-center w-full">
              <label
                for="studentIDUpload"
                class="flex flex-col items-center justify-center w-full h-54 border-2 pt-4 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center">
                  <div
                    :style="{
                      backgroundImage: `url(${profile_img})`,
                    }"
                    class="w-full h-44 bg-cover bg-center mb-2 p-2"
                  ></div>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Front picture</span> of your
                    student ID
                  </p>
                </div>
                <input
                  id="studentIDUpload"
                  name="studentid"
                  type="file"
                  class="hidden"
                  @change="handleImageUpload1"
                />
              </label>
            </div>
          </div>

          <!-- Add your second column content here -->
        </div>
      </div>

      <!-- step three -->
      <div class="step">
        <!-- ... content for step three ... -->
        <div class="mt-9" style="display: flex; justify-content: center">
          <img
            style="margin-right: 20px"
            :src="signUpData.stdid_img_name"
            class="user-img2"
          />

          <div>
            <h6 class="bold">First Name : {{ signUpData.fname }}</h6>
            <p>Last Name : {{ signUpData.lname }}</p>
          </div>
          <!-- ========= log out ====== -->
        </div>

        <div class="flex my-9">
          <div class="flex-1">
            <h5>
              Institution:
              <span class="text-emerald-800">{{ signUpData.institution }}</span>
            </h5>
            <h5>
              Program of Study:
              <span class="text-emerald-800">{{
                signUpData.degree_program
              }}</span>
            </h5>
            <h5>
              ID Number:
              <span class="text-emerald-800">{{ signUpData.std_id }}</span>
            </h5>

            <h5>
              Mail Address:
              <span class="text-emerald-800">{{ signUpData.std_mail }}</span>
            </h5>
          </div>
          <div class="flex-1">
            <h5>
              Phone: <span class="text-emerald-800">{{ signUpData.tel }}</span>
            </h5>
            <h5>
              Sex: <span class="text-emerald-800">{{ signUpData.gender }}</span>
            </h5>
            <h5>
              Date of Birth:
              <span class="text-emerald-800">{{ signUpData.dob }}</span>
            </h5>
            <h5>
              Start Date:
              <span class="text-emerald-800">{{
                signUpData.availability_start
              }}</span>
            </h5>
          </div>
        </div>
      </div>

      <!-- start previous / next buttons -->
      <div class="form-footer flex gap-3 mt-4">
        <button
          ref="prevBtn"
          @click.prevent="nextPrev(-1)"
          class="flex-1 focus:outline-none border border-gray-300 py-2 px-5 rounded-lg shadow-sm text-center text-gray-700 bg-white hover:bg-gray-100 text-lg"
        >
          Previous
        </button>
        <button
          :disabled="shouldShowErrorMessage"
          ref="nextBtn"
          @click.prevent="nextPrev(1)"
          class="flex-1 border border-transparent focus:outline-none p-3 rounded-md text-center text-white bg-indigo-600 hover:bg-indigo-700 text-lg"
        >
          Next
        </button>
      </div>
      <!-- end previous / next buttons -->
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/authStore'

export default {
  data() {
    return {
      // imagePreview: "http://i.pravatar.cc/500?img=7",
      // studentIDPreview: "",
      currentTab: 0,
      formData: {
        fname: "",
        lname: "",
        sch: "Select School",
      },
      stdid_img_name: null,
      profile_img: null,
      signUpData: {
        fname: "",
        mname: "",
        lname: "",
        tel: "",
        p_word: "",
        std_mail: "",
        personal_mail: "",
        std_id: "",
        id_type: "",
        id_number: "",
        registration_date: "",
        is_active: "1",
        skills: "",
        institution: "",
        degree_program: "",
        graduation_year: "",
        gpa: "",
        work_experience: "",
        portfolio_links: "",
        resume_cv_link: "",
        preferred_location: "",
        availability_start: "",
        availability_end: "",
        weekly_hours: "",
        linkedin_profile: "",
        github_profile: "",
        languages_spoken: "",
        refs: "",
        gender: "",
        dob: "",
      },

      confirm_p_word: "",
      isValidEmail: true,
      schoolImages: {
        KNUST: "/assets/knustlogo.png",
        UG: "/assets/ug.jpg",
        UCC: "/assets/ucc.png",
        default: "/assets/knustlogo.png",
      },
      stepValidationReq: false,
    };
  },
  computed: {
    shouldShowErrorMessage() {
      return (
        this.signUpData.p_word.length < 8 ||
        !/[!@#$%^&*(),.?":{}|<>]/.test(this.signUpData.p_word)
      );
    },
    passwordErrorMessage() {
      if (this.signUpData.p_word.length < 8) {
        return "Passwords must be 8 characters or more";
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.signUpData.p_word)) {
        return "Passwords must contain a special character";
      } else {
        return "";
      }
    },

    schoolImage() {
      return this.schoolImages[this.formData.sch] || this.schoolImages.default;
    },
  },
  methods: {
    limitInput() {
      // Remove non-digit characters
      this.signUpData.tel = this.signUpData.tel.replace(/\D/g, "");

      // Format as (XXX) XXX-XXXX
      if (this.signUpData.tel.length > 10) {
        this.signUpData.tel = this.signUpData.tel.slice(0, 10);
      }
      if (this.signUpData.tel.length >= 6) {
        this.signUpData.tel =
          "(" +
          this.signUpData.tel.slice(0, 3) +
          ") " +
          this.signUpData.tel.slice(3, 6) +
          "-" +
          this.signUpData.tel.slice(6, 10);
      } else if (this.signUpData.tel.length >= 3) {
        this.signUpData.tel =
          "(" +
          this.signUpData.tel.slice(0, 3) +
          ") " +
          this.signUpData.tel.slice(3);
      }
    },

    validatePassword() {
      const minLength = 8;
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

      const isValidLength = this.signUpData.p_word.length >= minLength;
      const hasSpecialChar = specialCharRegex.test(this.signUpData.p_word);

      // Update validation logic as needed
      if (!isValidLength || !hasSpecialChar) {
        // Handle invalid password, e.g., display an error message
        // this.stepValidationReq=true;
      } else {
        //  this.stepValidationReq=false;
      }
    },

    filterNumbers() {
      // Remove numeric characters from the input value
      this.signUpData.fname = this.signUpData.fname.replace(/\d/g, "");
      this.signUpData.lname = this.signUpData.lname.replace(/\d/g, "");
    },

    validateEmail() {
      const allowedDomains = ["st.knust.edu.gh", "ug.edu.gh", "yahoo.com"];
      const emailRegex = /\S+@\S+\.\S+/;

      if (emailRegex.test(this.signUpData.std_mail)) {
        const domain = this.signUpData.std_mail.split("@")[1];
        this.isValidEmail = allowedDomains.includes(domain);
      } else {
        this.isValidEmail = false;
      }
    },

    updateSchoolImage() {
      // This method is called when the selected school changes
      // You can add additional logic here if needed
      console.log(this.formData.sch);
      console.log(this.schoolImages);
    },

    handleStudentIDUpload(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const fileSize = input.files[0].size; // in bytes
        const maxSize = 1024 * 1024; // 1 MB limit

        if (fileSize > maxSize) {
          alert(
            "File size exceeds the limit (1 MB). Please choose a smaller file."
          );
          // Optionally, you can clear the input field to prevent further submission
          input.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          this.signUpData.profile_img = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    handleImageUpload1(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        this.stdid_img_name = input.files[0];
        console.log(this.stdid_img_name);
      }
    },
    handleImageUpload2(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        this.profile_img = input.files[0];
      }
    },
    // handleImageUpload(event) {
    //   const input = event.target;
    //   if (input.files && input.files[0]) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       this.signUpData.stdid_img_name = e.target.result;
    //     };
    //     reader.readAsDataURL(input.files[0]);
    //   }
    // },

    showTab(n) {
      const x = this.$el.getElementsByClassName("step");
      x[n].style.display = "block";

      //... and fix the Previous/Next buttons:
      const prevBtn = this.$refs.prevBtn;
      const nextBtn = this.$refs.nextBtn;

      if (n === 0) {
        prevBtn.style.display = "none";
      } else {
        prevBtn.style.display = "inline";
      }

      if (n === x.length - 1) {
        nextBtn.innerHTML = "Submit";
      } else {
        nextBtn.innerHTML = "Next";
      }

      //... and run a function that will display the correct step indicator:
      this.fixStepIndicator(n);
    },

    nextPrev(n) {
      const x = this.$el.getElementsByClassName("step");

      if (n === 1 && !this.validateForm()) return false;

      if (this.currentTab >= x.length - 1) {
        // If it's the last step, call the submitForm function
        this.submitForm();
        return false;
      }

      x[this.currentTab].style.display = "none";
      this.currentTab += n;
      this.showTab(this.currentTab);
    },

    validateForm() {
      // This function deals with validation of the form fields
      const x = this.$el.getElementsByClassName("step");
      const y = x[this.currentTab].getElementsByTagName("input");
      let valid = true;
      // A loop that checks every input field in the current tab:
      for (let i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value.trim() === "") {
          // add an "invalid" class to the field:
          y[i].classList.add("invalid");
          // and set the current valid status to false
          valid = false;
        } else {
          y[i].classList.remove("invalid");
        }
      }
      // If the valid status is true, mark the step as finished and valid:
      if (valid) {
        this.$el
          .getElementsByClassName("stepIndicator")
          [this.currentTab].classList.add("finish");
      }
      return valid; // return the valid status
    },
    fixStepIndicator(n) {
      // This function removes the "active" class of all steps...
      const x = this.$el.getElementsByClassName("stepIndicator");
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("active");
      }
      //... and adds the "active" class on the current step:
      x[n].classList.add("active");
    },
    validateInput(event) {
      // Remove "invalid" class when input is not empty
      const input = event.target;
      if (input.value.trim() !== "") {
        input.classList.remove("invalid");
      }
    },

    async submitForm() {
      const formData = new FormData();

      // console.log("Student ID Image:", this.stdid_img_name);
      // console.log("Profile Image:", this.profile_img);

      for (const key in this.signUpData) {
        if (Object.hasOwnProperty.call(this.signUpData, key)) {
          formData.append(key, this.signUpData[key]);
        }
      }
      const studentIdFile = new File([this.stdid_img_name], "studentid.jpg");
      const profilePicFile = new File([this.profile_img], "profilepic.jpg");

      formData.append("studentid", studentIdFile);
      formData.append("profilepic", profilePicFile);

      for (const entry of formData.entries()) {
  const [name, value] = entry;
  // console.log(`Field Name: ${name}, Field Value: ${value}`);
}

const authStore = useAuthStore()

      console.log("formData", formData);
      try {
        // const response = await useFetch(`http://3.219.43.239/api/register`, {
        //   method: "post",
        //   body: formData,
        // });

        // const data = response.data;

        // if (data) {
        //   console.log(response);
        // }
        authStore.signup(formData)
      } catch (error) {
        // console.log("signup error", error);
      }
    },
  },
  mounted() {
    this.showTab(this.currentTab);
  },
};
</script>
<style scoped>
.invalid-email {
  color: red;
}

.user-img2 {
  width: 50px;
  border-radius: 50%;
  border: 1px solid #eee;
}
.bold {
  font-weight: 600;
}

#signUpForm {
  max-width: 50vw;
}

#signUpForm .form-header .stepIndicator.active {
  font-weight: 600;
}

#signUpForm .form-header .stepIndicator.finish {
  font-weight: 600;
  color: #5a67d8;
}

#signUpForm .form-header .stepIndicator::before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  z-index: 9;
  width: 20px;
  height: 20px;
  background-color: #c3dafe;
  border-radius: 50%;
  border: 3px solid #ebf4ff;
}

#signUpForm .form-header .stepIndicator.active::before {
  background-color: #a3bffa;
  border: 3px solid #c3dafe;
}

#signUpForm .form-header .stepIndicator.finish::before {
  background-color: #5a67d8;
  border: 3px solid #c3dafe;
}

#signUpForm .form-header .stepIndicator::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 8px;
  width: 100%;
  height: 3px;
  background-color: #f3f3f3;
}

#signUpForm .form-header .stepIndicator.active::after {
  background-color: #a3bffa;
}

#signUpForm .form-header .stepIndicator.finish::after {
  background-color: #5a67d8;
}

#signUpForm .form-header .stepIndicator:last-child:after {
  display: none;
}

#signUpForm input.invalid {
  border: 2px solid #ffaba5;
}

#signUpForm .step {
  display: none;
}
.container {
  max-width: 960px;
  margin: 5px auto;
  padding: 5px;
}

h1 {
  font-size: 20px;
  text-align: center;
}

h1 small {
  display: block;
  font-size: 15px;
  padding-top: 8px;
  color: gray;
}

.avatar-upload {
  position: relative;
  max-width: 205px;
  margin: 10px auto;
}

.avatar-upload .avatar-edit {
  position: absolute;
  right: 12px;
  z-index: 1;
  top: 10px;
}

.avatar-upload .avatar-edit input {
  display: none;
}

.avatar-upload .avatar-edit label {
  display: flex; /* Add flex display */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  width: 34px;
  height: 34px;
  margin-bottom: 0;
  border-radius: 100%;
  background: #ffffff;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;
}

.avatar-upload .avatar-edit label:hover {
  background: #f1f1f1;
  border-color: #d6d6d6;
}

.avatar-upload .avatar-edit label:after {
  font-family: "FontAwesome";
  color: #757575;
}

.avatar-upload .avatar-preview {
  width: 192px;
  height: 192px;
  position: relative;
  border-radius: 100%;
  border: 6px solid #f8f8f8;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

.avatar-upload .avatar-preview > div {
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
