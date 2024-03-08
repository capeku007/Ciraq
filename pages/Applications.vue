<template>

  <div class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl m-2">
    <div class="h-full md:flex no-wrap md:-mx-1">
      <!--  List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showJobList)"
        class="w-full md:w-4/12 md:mx-1"
      >
        <div class="top">
          <!-- search input -->
          <div class="flex items-center max-w-lg mx-auto">
            <label for="voice-search" class="sr-only">Search</label>
            <div class="relative w-full">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <i
                  class="bx bx-search w-4 h-4 text-gray-500"
                  aria-hidden="true"
                ></i>
              </div>
              <input
                type="text"
                id="voice-search"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search applied listings"
                required
              />

              <button
                type="button"
                class="absolute inset-y-0 end-0 flex items-center pe-2"
              >
                <i
                  class="bx bx-search inline-flex items-center py-2.5 px-3 text-sm font-medium text-white bg-blue-700 rounded-3xl border border-blue-700"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>

        </div>
        <ul class="taskList">
          <li v-for="job in listings" :key="job.id" @click="loadListing(job)">
            <div class="card p-4 bg-white">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <div class="flex-shrink-0">
                  <img
                    class="w-10 h-10 rounded-lg "
                    src="../assets/knustlogo.png"
                    alt="company image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-normal text-[#F7B900] truncate">
                    {{ job.company }}
                  </p>
                  <p class="text-base font-semibold truncate">
                    {{ job.title }}
                  </p>
                </div>
                
              </div>
              <div
                class="flex justify-between mt-4 space-x-3 rtl:space-x-reverse"
              >
                <span
                  class="inline-flex items-center bg-gray-200  text-xs font-normal px-2.5 py-0.5 rounded-lg"
                >
                  {{ job.companyLocation }}
                </span>

                <span
                  class="inline-flex items-center bg-gray-200  text-xs font-normal px-2 py-1 rounded-lg"
                >
                  {{ job.location }}
                </span>
                <span
                  class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
                >
                  GH₵ {{ job.pay }}
                </span>
              </div>
              
            </div>
          </li>
        </ul>
      </div>

      <!--  Body (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && !showJobList)"
        class="w-full md:w-8/12 md:mx-1 "
      >
        <div class="card2 m-2 p-2 shadow-md">
          <ListingInfo
            :selectedListing="selectedListing"
            @loadJobsMobile="loadJobsMobile"
          />
        </div>
      </div>


    </div>
  </div>



</template>
<script setup>
definePageMeta({
  layout: "default",
  auth:false
});
useHead({
  title: 'Applications',
  meta: [
    { name: "jobs you've applied for", content: 'Student job list' }
  ],
})
</script>
<script>
import { useAuthStore } from "~/stores/authStore";

export default {
  data() {
    return {
      name: "",
      location: "",
      searchResults: [],
      // Dummy data for demonstration purposes
      listings: [
        {
          id: "gh0000001",
          title: "Data Entry",
          pay: "8/hr",
          workDays: "Weekends",
          location: "on site",
          company: "Ciraq Inc.",
          companyLocation: "Accra",
          companyLogo: "../assets/logo.png",
          jobDescription:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nam omnis similique,...",
        },
        {
          id: "gh0000002",
          title: "Customer Support",
          pay: "10/hr",
          workDays: "Mon - Fri",
          location: "on site",
          company: "MTN GH.",
          companyLocation: "Koforidua",
          companyLogo: "../assets/logo.png",
          jobDescription:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nam omnis similique,...",
        },
        {
          id: "gh0000001",
          title: "Data Entry",
          pay: "8/hr",
          workDays: "Weekends",
          location: "on site",
          company: "Ciraq Inc.",
          companyLocation: "Accra",
          companyLogo: "../assets/logo.png",
          jobDescription:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nam omnis similique,...",
        },
        {
          id: "gh0000002",
          title: "Customer Support",
          pay: "10/hr",
          workDays: "Mon - Fri",
          location: "on site",
          company: "MTN GH.",
          companyLocation: "Koforidua",
          companyLogo: "../assets/logo.png",
          jobDescription:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nam omnis similique,...",
        },
        {
          id: "gh0000001",
          title: "Data Entry",
          pay: "8/hr",
          workDays: "Weekends",
          location: "on site",
          company: "Ciraq Inc.",
          companyLocation: "Accra",
          companyLogo: "../assets/logo.png",
          jobDescription:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nam omnis similique,...",
        },
        {
          id: "gh0000002",
          title: "Customer Support",
          pay: "10/hr",
          workDays: "Mon - Fri",
          location: "on site",
          company: "MTN GH.",
          companyLocation: "Koforidua",
          companyLogo: "../assets/logo.png",
          jobDescription:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nam omnis similique,...",
        },
        {
          id: "gh0000001",
          title: "Data Entry",
          pay: "8/hr",
          workDays: "Weekends",
          location: "on site",
          company: "Ciraq Inc.",
          companyLocation: "Accra",
          companyLogo: "../assets/logo.png",
          jobDescription:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nam omnis similique,...",
        },
        {
          id: "gh0000002",
          title: "Customer Support",
          pay: "10/hr",
          workDays: "Mon - Fri",
          location: "on site",
          company: "MTN GH.",
          companyLocation: "Koforidua",
          companyLogo: "../assets/logo.png",
          jobDescription:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate nam omnis similique,...",
        },
      ],
      selectedListing: null,
      isMobile: false,
      showJobList: true,
    };
  },
  methods: {
    loadListing(job) {
      this.selectedListing = job;
      // Toggle between Message List and Message Body on mobile
      if (this.isMobile) {
        this.showJobList = false;
      }
    },
    loadJobsMobile() {
      // Toggle between Message List and Message Body on mobile
      if (this.isMobile) {
        this.showJobList = true;
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth < 768; // Adjust the threshold as needed
      if (!this.isMobile) {
        this.showJobList = true; // Reset to show message list on larger screens
      }
    },
    search() {
      // Perform your search logic here based on the provided criteria
      // In this example, it filters the data array based on title and location
      this.searchResults = this.data.filter((item) => {
        const titleMatch =
          this.name === "" ||
          item.title.toLowerCase().includes(this.name.toLowerCase());
        const locationMatch =
          this.location === "" ||
          item.company.toLowerCase().includes(this.location.toLowerCase());
        return titleMatch && locationMatch;
      });
    },
  },
  mounted() {
    this.isMobile = window.innerWidth < 768; // Adjust the threshold as needed
    window.addEventListener("resize", this.handleResize);
  },

  computed: {
    // Access user from Pinia store
    user() {
      return useAuthStore().user;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.taskList {
  min-height: 71vh;
  max-height: 71vh;
  overflow-y: auto;
  padding-bottom: 20vh;
}
.card {
  width: 95%;
  border-radius: 1rem;
  border: 1px solid #6c707168;
  margin: 0.5rem auto;
}
.card2 {
  min-width: 96%;
  max-width: 96%;
  border-radius: 1rem;
  border: 1px solid #132E35;
  height: 81vh;
  overflow-y: auto;
    padding-bottom: 10vh;
}

.card:hover {
  cursor: pointer;
}

.vl {
  border-left: none;
  height: 500px;
}

.payCon {
  background-color: #bda472;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  color: #fff;
}

.textBox {
  width: calc(100% - 90px);
  margin-left: 10px;
  font-family: "Poppins" sans-serif;
}

.textContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.span {
  font-size: 10px;
}

.cardTitle {
  width: 100%;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
  padding: 0px;
  margin: 0;
}

.card:hover {
  cursor: pointer;
}

.payCon {
  background-color: #bda472;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
  color: #fff;
}

.card:hover > .img {
  transition: 0.5s ease-in-out;
  background: linear-gradient(#9198e5, #712020);
}

.textBox {
  width: calc(100% - 90px);
  margin-left: 10px;
  font-family: "Poppins" sans-serif;
}

.textContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.span {
  font-size: 10px;
}


.top {
  position: relative;
  padding: 10px;
  /* height: 60px; */
}

.top:after {
  position: absolute;
  display: block;
}
</style>
