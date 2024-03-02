<template>
<div class="w-11/12 m-auto px-6 h-[81vh] flex justify-center items-center">
  <div class=" bg-blueGray-50">
    <div class="w-full lg:w-8/12 px-4 mx-auto mt-6">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
      >
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
              Create account
            </h6>
            <div class="flex flex-wrap">
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3 flex justify-between">
                  <div class="w-[48%]">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    FIRST NAME
                  </label>
                  <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="First name"
                  />
                  </div>
                  <div class="w-[48%]">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    LAST NAME
                  </label>
                  <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Last name"
                  />
                  </div>
                </div>
              </div>
              
              <div class="w-full lg:w-6/12 px-4">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlfor="grid-password"
                >
                  GENDER
                </label>
                <div class="relative w-full mb-3 flex justify-between">
                  <label class="w-[48%]">
                    <input
                      type="radio"
                      value="1"
                      class="peer hidden"
                      name="framework"
                    />

                    <div
                      class="hover:bg-gray-50 flex items-center justify-between px-3 py-2.5 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500"
                    >
                      <p class="font-medium text-gray-700">Male</p>
                      <i class="bx bx-male-sign"></i>
                    </div>
                  </label>

                  <label class="w-[48%]">
                    <input
                      type="radio"
                      value="1"
                      class="peer hidden"
                      name="framework"
                    />
                    <div
                      class="hover:bg-gray-50 flex items-center justify-between px-3 py-2.5 border-2 rounded-lg cursor-pointer text-sm border-gray-200 group peer-checked:border-blue-500"
                    >
                      <h2 class="font-medium text-gray-700">Female</h2>
                      <i class="bx bx-female-sign"></i>
                    </div>
                  </label>
                </div>
              </div>
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
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
                      <label for="input-group-search" class="sr-only"
                        >Search</label
                      >
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
                          class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
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
              </div>

              <!-- PROGRAM -->
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlfor="grid-password"
                  >
                    PROGRAMME OF STUDY
                  </label>
                  <input
                    type="email"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            <!-- CONTACT INFO -->

            <div class="flex flex-wrap">
              <!-- STUDENT MAIL -->
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="student-mail"
                  >
                    STUDENT MAIL
                  </label>
                  <input
                    id="student-mail"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    :placeholder="studentMailPlaceholder"
                  />
                </div>
              </div>

              <!-- PHONE -->
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
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
              <!-- PASSWORD -->
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="password"
                  >
                    PASSWORD
                  </label>
                  <input
                    v-model="signUpData.tel"
                    type="text"
                    id="password"
                    @input="limitInput"
                    maxlength="14"
                    placeholder="(051) 232-8383"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>
              <!-- CONFIRM PASSWORD -->
              <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="cpassword"
                  >
                    CONFIRM PASSWORD
                  </label>
                  <input
                    v-model="signUpData.tel"
                    type="text"
                    id="cpassword"
                    @input="limitInput"
                    maxlength="14"
                    placeholder="(051) 232-8383"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
              </div>

            </div>

            <div class="flex flex-wrap">
              <div class="w-full lg:w-full px-4">
 <button
                    id="dropdownSearchButton"
                    class="border-0 px-3 py-3  text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    Create account
                  </button>
              </div>
                               
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

</template>


<script>
export default {
  data() {
    return {
      isDropdownOpen: false,
      buttonText: "Dropdown search",
      searchQuery: "",
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
    };
  },
  computed: {
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
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectUniversity(university) {
      this.selectedUniversity = university;
      this.buttonText = university.abbreviation;
      this.isDropdownOpen = false; // Close dropdown after selection
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

      const authStore = useAuthStore();

      console.log("formData", formData);
      try {
        authStore.signup(formData);
      } catch (error) {}
    },
  },
};
</script>