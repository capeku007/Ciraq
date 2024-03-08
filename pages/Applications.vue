<template>
  <div  style="width: 80%; margin: auto">
    <h2 style="margin:1rem">My Jobs</h2>
    <!-- JOBS -->
    <div class="center-container">
    <div class="radio">
      <input
        type="radio"
        id="1"
        value="1"
        v-model="toggleValue"
        @change="toggleHandler"
      />
      <label for="1" class="radio-label">
        <!-- <i class="bx bx-mail-send"></i> -->
        Applied
      </label>

      <input
        type="radio"
        id="2"
        value="2"
        v-model="toggleValue"
        @change="toggleHandler"
      />
      <label for="2" class="radio-label">
        <!-- <i class="bx bx-shield-plus"></i> -->
        Interview
      </label>

      <input
        type="radio"
        id="3"
        value="3"
        v-model="toggleValue"
        @change="toggleHandler"
      />
      <label for="3" class="radio-label">
        <!-- <i class="bx bx-shield-plus"></i> -->
        Accepted
      </label>
    </div>

    <div class="contentContainer" v-if="toggleValue === '1'">
      
      <!-- list of applied jobs -->
      <div class="flex px-2.5 max-w-6xl mx-auto">
                  <div style="width: 35%">
      <ul>
        <li>
          <div class="card p-4 shadow-md">
            <div style="display:flex">
                <p class="h1">Data Entry Lorem ipsum dolor!</p>
         
            </div>
            <div class="cardTitle">
              <div class="img"></div>
              <div class="textBox">
                <div class="textContent">
                  <p class="h1">Rigelis Inc</p>
                  <!-- <span class="span">12 min ago</span> -->
                </div>
                <p class="p">1 la Bawaleshi Rd</p>
              </div>
            </div>
            <div>
              <p class="text-sm leading-4">
                You applied on 1st Jan. 2024
              </p>
            </div>
            <div class="flex justify-between my-2">
                <button class="appBtn">Applied</button>
              <span class="payCon">GH₵ 8/hr</span>
               <button class="viewMoreBtn">View More</button>
            </div>
            
          </div>
        </li>
      </ul>
    </div>
    <div class="vl mx-3"></div>
    <!-- task details -->
    <div style="width: 64%">
      <div class="card2 p-4 shadow-md">
        
        <p class="h1">Data Entry Lorem ipsum dolo</p>
        <div class="jobTitle">
          <div class="img"></div>

          <div class="textBox">
            <div class="textContent">
              <p class="h1">Rigelis Inc</p>
              <!-- <span class="span">12 min ago</span> -->
            </div>
            <p class="p">1 La Bawaleshi rd.</p>

            
          </div>
          <div class="taskStatusCard p-2 shadow-md"><h3 ><i class="bx bx-mail-send"></i>Task Expired</h3></div>
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

    </div>

    <div class="contentContainer"  v-if="toggleValue === '2'">
      Interview
    </div>    </div>

    <div class="contentContainer"  v-if="toggleValue === '3'">
      Accepted
    </div>
  </div>


</template>
<script>
export default {
  data() {
    return {
      toggleValue: "1",
    };
  },
  methods: {
    toggleHandler() {
      console.log("Toggle state changed:", this.toggleValue);
    },
  },
};
</script>

<style scoped>
.contentContainer {
  border: 3px solid #006565;
  margin: 0 1rem;
  padding:  1rem;
  border-radius: 1rem;
  overflow-y: auto;
  height: 80vh;
}

.radio {
  display: flex;
  justify-content: start;
  padding: 2px;
  border-radius: 5px;
  margin-top: 4px;
  margin-left: 1rem;
  /* border-bottom: 0.1rem solid #006565; */
  width: 90%;
}

.radio input {
  display: none;
}

.radio-label {
  /* width: 43vw; */
  margin: 0 0.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  cursor: pointer;
  line-height: 2.75em;
  border-radius: .5rem .5rem 0rem 0rem;
  height: 3em;
  border: 0.125rem solid rgb(180, 179, 181);
  background: hsl(270, 16%, 93%);
  color: #006565;
  padding: 0 1.618em;
  transition: all 0.25s;
  text-align: center;
  position: relative;
  top: 0.25rem;
  border-bottom: 0.1rem solid #006565;
}

.radio-label:before {
  content: "";
}

.radio-label i {
  margin-right: 5px;
}

.radio input:not(:checked) + .radio-label {
  top: -0.01;
  transition: top 0.2s;
  color: #006565;
}
.radio input:checked + .radio-label {
  color: #fff;
  background: #006565;
  border: 0.1rem solid #006565;
  border-bottom: 0.1rem solid #006565;
  top: 0.24rem;
}

.radio input:not(:checked) + .radio-label:hover {
  top: -0.05rem;
  transition: top 0.25s;
  color: #006565;
  border-bottom: 0.1rem solid #006565;
}

.taskStatusCard {
  width: 50%;
  /* max-width: 400px; */
  border-radius: 1rem;
  border: 1px solid red;
  color: red;
  text-align: center;
}
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
  border-left: 2px solid green;
  height: 500px;
}

.payCon {
      border: 2px solid #bda472;
    color:#bda472;
  background-color: #fff;
  padding: 0.2rem 1rem;
  border-radius: 1rem;
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

.vl {
  border-left: 2px solid green;
  height: 500px;
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

.appBtn{
    background-color: #006565;
    color:#fff;
    border-radius: 1rem;
    padding: .2rem 1rem;
}
.viewMoreBtn{
    border: 2px solid #351F39;
    color:#351F39;
    border-radius: 1rem;
    padding: .2rem 1rem;
}
</style>