<template>
  <!-- <Signup/> -->
  <div class="py-10 min-h-screen px-2">
    <div
      class="max-w-md mx-auto shadow-lg rounded-lg overflow-hidden md:max-w-lg"
    >
      <div v-show="currentIndex === 0" class="main block">
        <p
          class="flex justify-center items-center h-12 w-full bg-[#d9c179] text-white font-semibold"
        >
          Create Profile
        </p>
        <p
          class="flex justify-center items-center text-lg mt-3 text-gray-800 font-medium"
        >
          Personal Info
        </p>

        <div class="flex w-full gap-px">
          <div class="w-full mt-6 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlfor="grid-password"
            >
              FIRST NAME
            </label>
            <input
              v-model="signUpData.fname"
              @input="filterNumbers"
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="First name"
            />
          </div>
          <div class="w-full mt-6 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlfor="grid-password"
            >
              LAST NAME
            </label>
            <input
              v-model="signUpData.lname"
              @input="filterNumbers"
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Last name"
            />
          </div>
        </div>

        <!-- GENDER -->
        <div class="flex w-full gap-px">
          <div class="w-full mt-4 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              id="gender"
            >
              GENDER
            </label>
            <div class="relative w-full flex justify-between">
              <label class="w-[45%]">
                <input
                  type="radio"
                  value="Male"
                  class="peer hidden"
                  name="framework"
                  v-model="signUpData.gender"
                />

                <div
                  class="hover:bg-gray-50 flex items-center justify-between px-3 py-2.5 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500"
                >
                  <p class="font-medium text-gray-700 text-center">Male</p>
                  <!-- <i class="bx bx-male-sign"></i> -->
                </div>
              </label>

              <label class="w-[45%]">
                <input
                  type="radio"
                  value="Female"
                  class="peer hidden"
                  name="framework"
                  v-model="signUpData.gender"
                />
                <div
                  class="hover:bg-gray-50 flex items-center justify-between px-3 py-2.5 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500"
                >
                  <h2 class="font-medium text-gray-700 text-center">Female</h2>
                  <!-- <i class="bx bx-female-sign"></i> -->
                </div>
              </label>
            </div>
          </div>

          <!-- dDOB -->
          <div class="w-full mt-4 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              id="dob"
            >
              DATE OF BIRTH
            </label>
            <input
              v-model="signUpData.dob"
              type="date"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Last name"
            />
          </div>
        </div>

        <!-- SCH -->
        <div class="flex w-full gap-px">
          <div class="w-full mt-4 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlfor="grid-password"
            >
              SELECT SCHOOL
            </label>
            <button
              id="dropdownSearchButton"
              @click.prevent="toggleDropdown"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            >
              {{ buttonText }}
            </button>

            <!-- Dropdown menu -->
            <div
              v-show="isDropdownOpen"
              id="dropdownSearch"
              class="z-10 bg-white rounded-lg shadow w-60"
            >
              <div class="p-3">
                <label for="input-group-search" class="sr-only">Search</label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                  >
                    <i class="text-[18px] bx bx-search text-gray-500"></i>
                  </div>
                  <input
                    v-model="searchQuery"
                    type="text"
                    id="input-group-search"
                    class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search university"
                  />
                </div>
              </div>
              <ul
                class="h-40 px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                aria-labelledby="dropdownSearchButton"
              >
                <li
                  v-for="university in filteredUniversities"
                  :key="university.name"
                >
                  <div
                    @click.prevent="selectUniversity(university)"
                    class="flex items-center px-4 py-2 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                  >
                    {{ university.abbreviation }}
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- DOB -->
          <div class="w-full mt-4 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              id="program"
            >
              PROGRAMME OF STUDY
            </label>
            <input
              v-model="signUpData.degree_program"
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>

        <!-- Add other input fields for step 1 -->
        <div class="mt-6 flex mb-10 justify-center px-4 relative gap-2">
          <button
          :disabled="!step1Complete"
            @click="goToStep(1)"
            class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Next<i class="fa fa-long-arrow-right absolute top-4 right-8"></i>
          </button>
        </div>

      </div>

      <!-- Step 2: Contact Details -->
      <div v-show="currentIndex === 1" class="main block">
        <p
          class="flex justify-center items-center h-12 w-full bg-[#d9c179] text-white font-semibold"
        >
          Create Profile
        </p>
        <p
          class="flex justify-center items-center text-lg mt-3 text-gray-800 font-medium"
        >
          Contact Info
        </p>

        <div class="flex w-full gap-px">
          <div class="w-full mt-6 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="student-mail"
              :class="{ 'invalid-email': !isValidEmail }"
            >
              STUDENT MAIL
            </label>
            <input
              v-model="signUpData.std_mail"
              @input="validateEmail"
              :class="{ 'invalid-email': !isValidEmail }"
              id="student-mail"
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              :placeholder="studentMailPlaceholder"
            />
          </div>
          <div class="w-full mt-6 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="phone"
            >
              PHONE NUMBER
            </label>
            <input
              v-model="signUpData.tel"
              type="text"
              id="floating-phone-number"
              @input="limitInput"
              maxlength="14"
              placeholder="(051) 232-8383"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>

        <!-- PROFILE IMG -->
        <div class="flex w-full gap-px">
          <div class="w-full mt-4 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              id="gender"
            >
              PROFILE PICTURE
            </label>
            <label
              class="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-3 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
              tabindex="0"
            >
              <span class="flex items-center space-x-2">
                <i class="bx bx-id-card"></i>
                <span class="text-xs font-medium text-gray-600">
                  <span class="text-blue-600 underline">{{
                    uploadedFileName || "Upload Profile image"
                  }}</span>
                </span>
              </span>
              <input
                type="file"
                name="profilepic"
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
                @change="handleImageUpload2"
                class="sr-only"
              />
            </label>
          </div>

          <!-- dDOB -->
          <div class="w-full mt-4 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              id="dob"
            >
              STUDENT ID
            </label>
            <label
              class="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-3 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
              tabindex="0"
            >
              <span class="flex items-center space-x-2">
                <i class="bx bx-id-card"></i>
                <span class="text-xs font-medium text-gray-600">
                  <span class="text-blue-600 underline">{{
                    uploadedFileName1 || "Upload Student ID"
                  }}</span>
                </span>
              </span>
              <input
                id="studentIDUpload"
                name="studentid"
                type="file"
                @change="handleImageUpload1"
                class="sr-only"
              />
            </label>
          </div>
        </div>

        <!-- PASSWORD -->
        <div class="flex w-full gap-px">
          <div class="w-full mt-4 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              id="password1"
            >
            PASSWORD
            </label>
            <input
              v-model="signUpData.p_word"
              :class="{
                'border-red-600 text-red-600':
                  signUpData.p_word !== confirm_p_word && confirm_p_word !== '',
              }"
              type="password"
              @input="validatePassword"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />

            <p v-if="shouldShowErrorMessage" class="text-sm text-red-600">
              Passwords must be 8 characters or more
            </p>
          </div>

          <!-- CONFIRM PASSWORD -->
          <div class="w-full mt-4 px-4 relative">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              id="password"
            >
              CONFIRM PASSWORD
            </label>
            <input
              v-model="confirm_p_word"
              type="password"
              :class="{
                'border-red-600 text-red-600':
                  signUpData.p_word !== confirm_p_word && confirm_p_word !== '',
              }"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
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
        <!-- Add other input fields for step 2 -->
        <div class="mt-6 flex mb-10 justify-center px-4 relative gap-2">
          <button
            @click="goToStep(0)"
            class=" border-2 border-solid border-[#044013] px-3 py-3 text-[#044013] bg-white   rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Previous<i class="fa fa-long-arrow-left absolute top-4 left-8"></i>
          </button>
          <button
          :disabled="shouldShowErrorMessage"
            @click="goToStep(2)"
            class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Next<i class="fa fa-long-arrow-right absolute top-4 right-8"></i>
          </button>
        </div>
      </div>

      <!-- Step 3: Company Details -->
      <div v-show="currentIndex === 2" class="main block">
        <p
          class="flex justify-center items-center h-12 w-full bg-[#d9c179] text-white font-semibold"
        >
          Create Profile
        </p>
        <p
          class="flex justify-center items-center text-lg mt-3 text-gray-800 font-medium"
        >
          Confirmation
        </p>
                 <!-- ... content for step three ... -->
        <div class="mt-9" style="display: flex; justify-content: center">

          <div>
            <h6 class="bold"> Name : {{ signUpData.fname }} {{ signUpData.lname }}</h6>
            
          </div>
                      <h5>
              Date of Birth:
              <span class="text-emerald-800">{{ signUpData.dob }}</span>
            </h5>
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



          </div>
          <div class="flex-1">
            <h5>
              Phone: <span class="text-emerald-800">{{ signUpData.tel }}</span>
            </h5>
            <h5>
              Sex: <span class="text-emerald-800">{{ signUpData.gender }}</span>
            </h5>

            
          </div>
        </div>
        <p class="my-5 text-center text-sm px-4 text-gray-500">
          By clicking "Next",I agree<br />
          to Ciraq's <a class="text-blue-800" href="#">Privacy Policy</a>
        </p>
        <!-- Add other input fields for step 4 -->
        <div class="mt-6 flex mb-10 justify-center px-4 relative gap-2">
          <button
            @click="goToStep(1)"
            class=" border-2 border-solid border-[#044013] px-3 py-3 text-[#044013] bg-white   rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Previous<i class="fa fa-long-arrow-left absolute top-4 left-8"></i>
          </button>
          <button
            @click="submitForm"
            class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Submit Details<i
              class="fa fa-long-arrow-right absolute top-5 right-8"
            ></i>
          </button>
        </div>
      </div>

      <div v-show="currentIndex === 3" class="main block">
        <div>
            <h4 class="flex justify-center items-center mt-5 text-lg text-gray-800 font-medium">Congrats . <span > {{signUpData.fname}}</span></h4> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /> </svg>
                <p class="mt-5 mb-10 text-sm px-4 text-center text-pink-700 font-semibold	tracking-wide">Thanks for creating a profile with Ciraq,your details have been submitted successfully. Check your student mail to verify your account. </p>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "blank",
});
</script>

<script>
import { useAuthStore } from "../stores/authStore";
export default {
  data() {
    return {
      uploadedFileName: null,
      uploadedFileName1: null,
      isDropdownOpen: false,
      buttonText: "Select School",
      universities: [
        {
          name: "University of Ghana",
          abbreviation: "UG",
          mailFormat: "username@ug.edu.gh",
        },
        {
          name: "Kwame Nkrumah University of Science and Technology",
          abbreviation: "KNUST",
          mailFormat: "username@st.knust.edu.gh",
        },
        {
          name: "University of Cape Coast",
          abbreviation: "UCC",
          mailFormat: "username@ucc.edu.gh",
        },
        // Add more universities with their mail formats
      ],
      searchQuery: "",
      selectedUniversity: null,

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
      currentIndex: 0,
      formData: {
        firstName: "",
        lastName: "",
        placeOfBirth: "",
        city: "",
        companyName: "",
        jobTitle: "",
        // Add more fields as necessary
      },
    };
  },
  computed: {
step1Complete() {
      const { fname, lname, gender, dob, institution, degree_program } = this.signUpData;

      // Check if any of the required fields are empty
      if (!fname || !lname || !gender || !dob || !institution || !degree_program) {
        return false; // Return false if any field is empty
      }

      // Return true if all fields are filled
      return true;
    },
    step2Complete() {
      const { fname, lname, gender, dob, institution, degree_program } = this.signUpData;

      // Check if any of the required fields are empty
      if (!fname || !lname || !gender || !dob || !institution || !degree_program) {
        return false; // Return false if any field is empty
      }

      // Return true if all fields are filled
      return true;
    },
    filteredUniversities() {
      return this.universities.filter(
        (university) =>
          university.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          university.abbreviation
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
    },
    studentMailPlaceholder() {
      return this.selectedUniversity ? this.selectedUniversity.mailFormat : "";
    },
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
    goToStep(stepIndex) {
      this.currentIndex = stepIndex;
    },

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectUniversity(university) {
      this.selectedUniversity = university;
      this.buttonText= university.abbreviation;
      this.signUpData.institution = university.abbreviation;
      this.isDropdownOpen = false; // Close dropdown after selection
    },

    handleImageUpload1(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        this.stdid_img_name = input.files[0];
        this.uploadedFileName1 = null; // Reset the uploadedFileName
        this.$nextTick(() => {
          this.uploadedFileName1 = input.name; // Set the uploadedFileName with the new file name
        });
      } else {
        this.uploadedFileName1 = null;
      }
    },
    handleImageUpload2(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        this.profile_img = input.files[0];
        this.uploadedFileName = null; // Reset the uploadedFileName
        this.$nextTick(() => {
          this.uploadedFileName = input.name; // Set the uploadedFileName with the new file name
        });
      } else {
        this.uploadedFileName = null;
      }
    },

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
    async submitForm() {
      const formData = new FormData();

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
const authStore = useAuthStore();

  console.log("formData", formData);
  try {
    const responseData = await authStore.signup(formData);
    if (responseData.successful) {
      this.currentIndex = 3;
    } else {
      console.log("failed");
    }
  } catch (error) {
    // Handle errors here if needed
    console.error("Failed to register:", error);
  }
    },
  },
};
</script>

<style scoped>
.invalid-email {
  color: red;
}
</style>