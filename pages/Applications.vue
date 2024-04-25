<template>
  <div
    class="mx-auto max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl grid grid-rows-[1fr] h-[85svh] max-h-[85svh] min-h-[85svh] overflow-hidden"
  >
    <div class=" md:flex no-wrap md:-mx-1">
      <!--  List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showJobList)"
        class="w-full md:w-4/12 md:mx-1 grid grid-rows-[[7svh]_1fr] h-[85svh] max-h-[85svh] min-h-[85svh]"
      >
        <div class="m-2">
          <!-- search input -->
            <select
              class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>All applications</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="offers">Offers</option>
              <option value="declined">Declined</option>
            </select>
        </div>
        <ul class="h-77svh] max-h-[77svh] min-h-[77svh] overflow-y-auto my-auto pb-[10vh]">
          <li v-for="job in listings" :key="job.id" @click="loadListing(job)">
            <div class="card p-4 bg-white">
              <div class="flex items-center space-x-3 rtl:space-x-reverse">
                <div class="flex-shrink-0">
                  <img
                    class="w-10 h-10 rounded-lg"
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
                  class="inline-flex items-center bg-gray-200 text-xs font-normal px-2.5 py-0.5 rounded-lg"
                >
                  {{ job.companyLocation }}
                </span>

                <span
                  class="inline-flex items-center bg-gray-200 text-xs font-normal px-2 py-1 rounded-lg"
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

      <div v-if="!isMobile || (isMobile && !showJobList)" class=" md:w-8/12 md:mx-1 grid grid-rows-[1fr] h-[85svh] max-h-[85svh] min-h-[85svh] overflow-hidden">
        
        <div class="m-2 bg-white rounded-xl overflow-hidden">
          <AppliedListing
            :selectedListing="selectedListing"
            @loadJobsMobile="loadJobsMobile"
          />
        </div>
        <!-- <div></div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "mobile",
  middleware: ["unauthstd"],
});
useHead({
  title: "Applications",
  meta: [{ name: "jobs you've applied for", content: "Student job list" }],
});
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
      console.log(job)
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

.card {
  width: 95%;
  border-radius: 1rem;
  margin: 0.5rem auto;
}
.card:hover {
  cursor: pointer;
}


</style>
