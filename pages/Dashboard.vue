
<template>
  <div
    class="container mx-auto my-5 max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl"
  >
    <div>
      <div style="margin: 0 1rem"><JobSearchBar /></div>
                    <button
        id="button"
        data-modal-toggle="modal1"
        data-modal-target="modal1"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Show modal
      </button>
          <div
      id="modal1"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3
              class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white"
            >
              Terms of Service
            </h3>
            <button
              id="closeButton"
              data-modal-hide="modal1"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              With less than a month to go before the European Union enacts new
              consumer privacy laws for its citizens, companies around the world
              are updating their terms of service agreements to comply.
            </p>
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              I accept
            </button>
            <button
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
      <div
        class="flex"
        style="position: sticky; width: 80%; margin: auto; align-items: center"
      >
        <div><p>recent postings</p></div>
        <!-- sorting -->
        <div>
          <select style="border: none" name="" id="">
            <option value="">newest</option>
            <option value="">oldest</option>
          </select>
        </div>
        <div><p>230 tasks available</p></div>
      </div>
    </div>
    <div class="h-full md:flex no-wrap md:-mx-1">
      <!-- Messages List (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && showJobList)"
        class="w-full md:w-4/12 md:mx-1"
      >
        <ul class="taskList">
          <li v-for="job in listings" :key="job.id" @click="loadListing(job)">
            <div class="card p-4 shadow-md">
              <div class="cardTitle">
                <div class="img"></div>
                <div class="textBox">
                  <div class="textContent">
                    <p class="h1">{{ job.title }}</p>
                    <!-- <span class="span">12 min ago</span> -->
                  </div>
                  <p class="p">{{ job.company }}</p>
                </div>
              </div>
              <div class="flex justify-between my-2">
                <span class="payCon">GH₵ {{ job.pay }}</span>
                <span class="payCon">{{ job.location }}</span>
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

      <!-- Message Body (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && !showJobList)"
        class="w-full md:w-8/12 md:mx-1 right"
      >
        <div class="card2 p-4 shadow-md">
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
  height: 90vh;
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
  height: 90vh;
  overflow-y: auto;
}

.jobTitle {
  width: 100%;

  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  /* backdrop-filter: blur(10px); */
  transition: 0.5s ease-in-out;
  padding: 0;
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

.img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background: linear-gradient(#d7cfcf, #9198e5);
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

.cardTitle {
  width: 100%;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: left;
  backdrop-filter: blur(10px);
  transition: 0.5s ease-in-out;
  padding: 0;
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

.img {
  width: 50px;
  height: 50px;
  margin-left: 10px;
  border-radius: 10px;
  background: linear-gradient(#d7cfcf, #9198e5);
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

.h1 {
  font-size: 18px;
  font-weight: bold;
}

.p {
  font-size: 12px;
  font-weight: bold;
}
</style>
