
<template>
  <div
    class="container mx-auto my-5 max-w-4xl md:max-w-screen-lg lg:max-w-screen-xl"
  >
    <div>
      <div style="margin:0 1rem"><JobSearchBar /></div>
      <div class="flex" style="position:sticky; width: 80%; margin: auto; align-items: center">
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
        v-if="!isMobile || (isMobile && showMessageList)"
        class="w-full md:w-4/12 md:mx-1"
      >
        <ul class="taskList">

          <li>
            <div class="card p-4 shadow-md">
              <div class="cardTitle">
                <div class="img"></div>
                <div class="textBox">
                  <div class="textContent">
                    <p class="h1">Data Entry Lorem ipsum dolor!</p>
                    <!-- <span class="span">12 min ago</span> -->
                  </div>
                  <p class="p">Rigelis Inc</p>
                </div>
              </div>
              <div class="flex justify-between my-2">
                <span class="payCon">GH₵ 8/hr</span>
                <span class="payCon">On-Site</span>
              </div>
              <div>
                <p class="text-sm leading-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate nam omnis similique,...
                </p>
              </div>
            </div>
          </li>   
          <li>
            <div class="card p-4 shadow-md">
              <div class="cardTitle">
                <div class="img"></div>
                <div class="textBox">
                  <div class="textContent">
                    <p class="h1">Data Entry Lorem ipsum dolor!</p>
                    <!-- <span class="span">12 min ago</span> -->
                  </div>
                  <p class="p">Rigelis Inc</p>
                </div>
              </div>
              <div class="flex justify-between my-2">
                <span class="payCon">GH₵ 8/hr</span>
                <span class="payCon">On-Site</span>
              </div>
              <div>
                <p class="text-sm leading-4">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cupiditate nam omnis similique,...
                </p>
              </div>
            </div>
          </li>   
<p>{{user}}</p>
      
        </ul>
      </div>

      <!-- Message Body (visible on mobile) -->
      <div
        v-if="!isMobile || (isMobile && !showMessageList)"
        class=" w-full md:w-8/12 md:mx-1 right"
      >
        <div class="card2 p-4 shadow-md">
          <ListingInfo  :selectedListing="selectedListing" @loadJobsMobile="loadJobsMobile"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import { useAuthStore } from '~/stores/authStore';

export default {
  data() {
    return {
      name: "",
      location: "",
      searchResults: [],
      // Dummy data for demonstration purposes
      data: [
        { id: 1, title: "Software Engineer", company: "TechCo" },
        { id: 2, title: "Product Manager", company: "InnovateCorp" },
        { id: 3, title: "Data Analyst", company: "DataInsight" },
        // Add more items as needed
      ],
      selectedListing: [{title:"hsasj"}],
      isMobile: false,
      showJobList: true,
    };
  },
  methods: {
        
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
.taskList{
      height: 90vh;
    overflow-y: auto;
}
.card {
  width: 95%;
  /* max-width: 400px; */
  border-radius: 1rem;
  border: 1px solid #006565;
  margin: .5rem auto;
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
  backdrop-filter: blur(10px);
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
