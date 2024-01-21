<template>
  <JobSearchBar />
  <div>
    <!-- posting -->
    <div class="flex" style="width: 80%; margin: auto; align-items: center">
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

  <!-- search results -->
  <div class="flex px-2.5 w-6xl max-w-6xl mx-auto p-2.5">
    <!-- task listing -->
    <div style="width: 35%">
      <ul>
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
                Cupiditate nam omnis similique, hic, asperiores ab dolores dolor
                perspiciatis ratione delectus pariatur molestiae nesciunt
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="vl mx-3"></div>
    <!-- task details -->
    <div style="width: 64%">
      <div class="card2 p-4 shadow-md">
        <p class="h1">Data Entry Lorem ipsum dolor!</p>
        <div class="jobTitle">
          <div class="img"></div>

          <div class="textBox">
            <div class="textContent">
              <p class="h1">Rigelis Inc</p>
              <!-- <span class="span">12 min ago</span> -->
            </div>
            <p class="p">1 La Bawaleshi rd.</p>
          </div>
        </div>
        <div class="flex justify-between my-2">
          <div class="jobTitle">
            <div>
              <Icon
                name="bx:briefcase-alt"
                class="w-7 h-7 text-gray-500 dark:text-gray-400"
              ></Icon>
            </div>

            <div class="textBox">
              <div class="textContent">
                <p class="p">Days</p>
                <!-- <span class="span">12 min ago</span> -->
              </div>
              <p>Mondays - Fridays</p>
            </div>
          </div>
          <div class="jobTitle">
            <div>
              <Icon
                name="heroicons:building-office-2-solid"
                class="w-7 h-7 text-gray-500 dark:text-gray-400"
              ></Icon>
            </div>

            <div class="textBox">
              <div class="textContent">
                <p class="p">Location</p>
                <!-- <span class="span">12 min ago</span> -->
              </div>
              <p>Onsite</p>
            </div>
          </div>
          <div class="jobTitle">
            <div>
              <Icon
                name="ic:baseline-av-timer"
                class="w-7 h-7 text-gray-500 dark:text-gray-400"
              ></Icon>
            </div>

            <div class="textBox">
              <div class="textContent">
                <p class="p">Duration</p>
                <!-- <span class="span">12 min ago</span> -->
              </div>
              <p>1 month</p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-sm leading-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate
            nam omnis similique, hic, asperiores ab dolores dolor perspiciatis
            ratione delectus pariatur molestiae nesciunt
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
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
};
</script>

<style scoped>
.card {
  width: 100%;
  /* max-width: 400px; */
  border-radius: 1rem;
  border: 1px solid #006565;
}
.card2 {
  width: 100%;
  /* max-width: 70%; */
  border-radius: 1rem;
  border: 1px solid #006565;
  height: 90vh;
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
