<template>
  <!-- edit modal -->
  <div
    id="editCompanyProfile"
    tabindex="-1"
    data-modal-target="editCompanyProfile"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]"
  >
    <div
      class="relative w-full max-w-4xl max-h-full overflow-y-auto scrollbar-hidden"
    >
      <div class="relative bg-white rounded-lg shadow">
         <i
            @click="closeModal('editCompanyProfile')"
            class="absolute bx bx-x-circle top-2 z-50 bg-white right-0 rounded-full pr-2 text-2xl text-gray-400 hover:text-red-600"
          ></i>
        <!-- <div class="p-4 md:p-5">
          <div
            class="flex justify-center items-center mx-auto rounded-lg overflow-hidden"
          >
            <div class="relative flex flex-wrap w-full">
              <div
                class="w-full rounded-sm bg-cover bg-center bg-no-repeat items-center"
                :style="{
                  backgroundImage: `url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')`,
                }"
              >
                <div
                  :style="{ backgroundImage: `url(${profile_img})` }"
                  class="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat"
                >
                  <label
                    for="upload_profile"
                    class="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4 cursor-pointer"
                  >
                    <i class="bx bx-camera"></i>
                    <input
                      type="file"
                      name="profile"
                      id="upload_profile"
                      accept=".png, .jpg, .jpeg"
                      @change="handleImageUpload"
                      class="hidden"
                    />
                  </label>
                </div>
                <div class="flex justify-end">
                  <label
                    for="upload_cover"
                    class="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold cursor-pointer"
                  >
                    <i class="bx bx-camera"></i>
                    <input
                      type="file"
                      name="profile"
                      id="upload_cover"
                      hidden
                      required
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div> -->

      <div class="p-4 md:p-5">
        <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <div class="sm:col-span-4 sm:col-start-1">
          <label
            for="taskTitle"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Address</label
          >
          <div class="mt-1">
            <input
            v-model="company.address"
              type="text"
              name="taskTitle"
              id="taskTitle"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

                <div class="sm:col-span-2 ">
          <label
            for="location"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Headquaters</label
          >
          <div class="mt-1">
            <input
            v-model="company.headquarters"
              type="text"
              name="location"
              id="location"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2 sm:col-start-1">
          <label
            for="location"
            class="block text-sm font-medium leading-6 text-gray-900"
            >City</label
          >
          <div class="mt-1">
            <input
            v-model="company.city"
              type="text"
              name="location"
              id="location"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label
            for="region"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Region / State</label
          >
          <div class="mt-1">
            <input
            v-model="company.state"
              type="text"
              name="region"
              id="region"
              autocomplete="address-level1"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label
            for="jobType"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Country</label
          >
          <div class="mt-1">
            <input
            v-model="company.country"
            required
              type="text"
              name="jobType"
              id="jobType"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <!-- <div class="sm:col-span-2 sm:col-start-1">
          <label
            for="location"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Facebook</label
          >
          <div class="mt-1">
            <input
            v-model="company.website"
              type="text"
              name="location"
              id="location"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label
            for="region"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Instagram</label
          >
          <div class="mt-1">
            <input
            v-model="company.website"
              type="text"
              name="region"
              id="region"
              autocomplete="address-level1"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="sm:col-span-2">
          <label
            for="jobType"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Website</label
          >
          <div class="mt-1">
            <input
            v-model="company.website"
            required
              type="text"
              name="jobType"
              id="jobType"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div> -->
      </div>

            <div class="mt-4 col-span-full">
        <label
          for="aboutJob"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Your story.</label
        >
        <div class="mt-1">
          <textarea
            v-model="company.company_description"
            id="aboutJob"
            name="aboutJob"
            rows="3"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>
            <div class="mt-4 col-span-full">
        <label
          for="aboutJob"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Your mission.</label
        >
        <div class="mt-1">
          <textarea
            v-model="company.mission_statement"
            id="aboutJob"
            name="aboutJob"
            rows="3"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>

        <!-- UPDATE PROFILE -->
        <div class="mt-4">
          <button
            @click="updateProfile()"
            class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          >
            Save Changes
          </button>
        </div>
      </div>
              
      </div>
    </div>
  </div>

  <!-- MODALS END HERE -->


  <div class="bg-white shadow rounded-lg text-gray-900 pb-10 relative">
    <div class="rounded-t-lg h-32 overflow-hidden">
      <img
        class="object-cover object-top w-full"
        
        src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
        alt="Mountain"
      />
      
    </div>
    <div
      class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden"
    >
      <img
        class="object-cover object-center h-32"
        :src="
                      company.company_logo
                        ? `https://ciraq.co/api/public/uploads/profile_images/${company.company_logo}`
                        : companyPlaceholder
                    "
      />
                      <!-- <div
                  :style="{ backgroundImage: `url(${company.company_logo})` }"
                  class="object-cover object-center  h-32 rounded-full "
                >
                  
                </div> -->
    </div>
    <div class="text-center mt-2">
      <h2 class="font-semibold text-lg">{{ company.company_name }}</h2>
      <p class="text-gray-500">
        {{ company.address }}, {{ company.city }}, {{ company.state }}, {{ company.country }}
      </p>
    </div>
    <div class="m-4">
      <h2 class="font-semibold text-lg">Our Story</h2>
      <p class="text-gray-500 text-sm">
        {{ company.company_description }}
      </p>
    </div>    
    <div class="m-4">
      <h2 class="font-semibold text-lg">Our Mission</h2>
      <p class="text-gray-500 text-sm">
        {{ company.mission_statement }}
      </p>
    </div>
    <div class="mx-4 mt-2">
      <p class="font-semibold my-2 text-lg">Company Details</p>
      <div class="flex">
        <div class="w-1/2">
          <h4 class="font-semibold">Headquarters</h4>
          <p>{{ company.headquarters }}</p>
        </div>
        <div class="w-1/2">
          <h4 class="font-semibold">Website</h4>
          <p>{{ company.website }}</p>
        </div>
      </div>
      <div class="flex mt-2">
        <div class="w-1/2">
          <h4 class="font-semibold">Employees</h4>
          <p>{{ company.num_employees }}</p>
        </div>
        <div class="w-1/2">
          <h4 class="font-semibold">Socials</h4>
          <div>
            <i
              class="bx bxl-facebook border-2 border-gray-500 rounded-md p-1 mr-4"
            ></i>
            <i
              class="bx bxl-instagram border-2 border-gray-500 rounded-md p-1"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button
        @click="openEdit()"
        class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      >
        Edit Profile
      </button>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/modalStore.js";
import { useMainStore } from "@/stores/main.js";
import companyPlaceholder from "~/assets/images/companyPlace.jpg";
const modalStore = useModalStore();
useHead({
  title: "Company Info",
  meta: [{ name: "description", content: "Student login" }],
});

// Define loginData using reactive
definePageMeta({
  middleware: ["unauthemp"],
  layout: "company",
});

// company import
import { useEmployerAuth } from "@/stores/employerAuth";
const employerAuth = useEmployerAuth();
const company = employerAuth.company;


const profile_img = ref(null);
const { showClosableModal, showModal, hideModal } = useModal();

const openEdit = () => {
  // Initialize useModal composable
  const modalId = "editCompanyProfile";
  showModal(modalId);
};

const closeModal = (n) => {
  // Initialize useModal composable
  const modalId = n;
  hideModal(modalId);
};

const mainStore = useMainStore();

const updateProfile = () => {
  console.log(company);

  const selectedProperties = {
    founding_year: company.founding_year,
    company_description: company.company_description,
    headquarters: company.headquarters,
    num_employees: company.num_employees,
    // company_logo: company.company_logo, 
    revenue: company.revenue,
    founded_by: company.founded_by,
    partnerships: company.partnerships,
    mission_statement: company.mission_statement,
    website: company.website,
    company_tel1: company.company_tel1,
    company_tel2: company.company_tel2,
    address: company.address,
    city: company.city,
    state: company.state,
    country: company.country,
    postal_code: company.postal_code,
    latitude: company.latitude,
    longitude: company.longitude,
  };

  console.log(selectedProperties);

  const modalId = "editCompanyProfile";
  hideModal(modalId);

  let info = "Confirm changes?";
  modalStore.changeDialog(info);

  let func = {};

  // IF USER SELECTS YES, CONTINUE FUNCTION
  func.yesfunc = async () => {
    try {
      const response = await fetch(mainStore.urlbase + "company/update-account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: employerAuth.ctoken,
        },
        body: JSON.stringify(selectedProperties),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to update profile.");
        throw error;
      } else {
        console.log("Profile updated successfully:", responseData);
        // Add any additional logic or state updates here
        return responseData;
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile:", error);
      // Handle the error as needed (e.g., display an error message to the user)
    }
  };

  modalStore.OpenYesOrNOClick(func);
};

const handleImageUpload = (event) => {
  const input = event.target;

  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => {
      profile_img.value = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
};
</script>

