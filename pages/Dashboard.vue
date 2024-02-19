
<template>
  <div
    class=" mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl"
  >
 
    <div class="h-full md:flex no-wrap md:-mx-1">
      <!--  List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showJobList)"
        class="w-full md:w-4/12 md:mx-1"
      >
      <div class="top">
              <div style="margin: 0 1rem"><JobSearchBar /></div>
<div class="flex justify-between my-1 space-x-3 rtl:space-x-reverse">
        <span
          class="inline-flex items-center  text-sm px-2.5 py-0.5"
        >
          recent postings
        </span>

        <span
          class="inline-flex items-center text-sm  px-2.5 py-0.5 rounded-full"
        >
          230 tasks available
        </span>
      </div>
      </div>
        <ul class="taskList">
          <li v-for="job in listings" :key="job.id" @click="loadListing(job)">
            <div class="card p-4 shadow-md">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <div class="flex-shrink-0">
                  <img
                    class="w-10 h-10 rounded-lg shadow"
                    src="../assets/knustlogo.png"
                    alt="company image"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-gray-900 truncate">
                    {{ job.title }}
                  </p>
                  <p class="text-sm text-gray-500 truncate">
                    {{ job.company }}
                  </p>
                </div>
                <span
                  class="inline-flex items-center bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
                >
                  GH₵ {{ job.pay }}
                </span>
              </div>
              <div
                class="flex justify-between my-2 space-x-3 rtl:space-x-reverse"
              >
                <span
                  class="inline-flex items-center bg-[#bda472] text-[#3d2f10] text-sm font-medium px-2.5 py-0.5 rounded-full"
                >
                  {{ job.companyLocation }}
                </span>
                <span
                  class="inline-flex items-center bg-[#bda472] text-black text-sm font-medium px-2.5 py-0.5 rounded-full"
                >
                  {{ job.location }}
                </span>
              </div>
              <div>
                <p class="text-sm leading-4">
                  {{ job.jobDescription }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!--  Body (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && !showJobList)"
        class="w-full md:w-8/12 md:mx-1 right"
      >
        <div class="card2 p-2 shadow-md">
          <ListingInfo
            :selectedListing="selectedListing"
            @loadJobsMobile="loadJobsMobile"
          />
        </div>
      </div>
    </div>
  </div>
</template>

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
        },        {
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
        },        {
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
        },        {
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
        },        {
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
  height: 80vh;
  overflow-y: auto;
}
.card {
  width: 95%;
  /* max-width: 400px; */
  border-radius: 1rem;
  border: 1px solid #006565;
  margin: 0.5rem auto;
}
.card2 {
  width: 100%;
  /* max-width: 70%; */
  border-radius: 1rem;
  border: 1px solid #006565;
  height: 88vh;
  overflow-y: auto;
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
  /* height: 60px; */
}

.top:after {
  position: absolute;
  display: block;
}

.p {
  font-size: 12px;
  font-weight: bold;
}
</style>
