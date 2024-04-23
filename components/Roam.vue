<template>
  <!-- view profile modal -->
  <div
    id="viewProfile"
    tabindex="-1"
    data-modal-target="viewProfile"
    aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-hidden md:inset-0 h-[calc(100%-1rem)] max-h-[95vh]"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <StudentProfile />
    </div>
  </div>

  <div
    class="grid grid-rows-[1fr_12%] gap-0 max-h-full h-full overflow-y-hidden"
  >
    <div
      class="relative max-w-full overflow-auto rounded-2xl"
      :style="{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
      }"
    >
      <ul
        class="item p-4"
        v-for="(person, index) in people"
        :key="index"
        :style="{
          top: person.top + 'vh',
          left: person.left + 'vw',
          width: 'auto',
          height: itemHeight + 'vh',
        }"
      >
        <li @click="viewProfile">
          <div class="bg-white shadow rounded-lg">
            <div class="flex items-center flex-col">
              <img
                class="w-10 h-10 rounded-full"
                src="/assets/images/profile-img.jpg"
                alt=""
              />
              <div class="font-medium px-4">
                <p>Cristian</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex w-full">
      <div class="w-4/5">

        <button
          id="filterTrig"
          @click="showDrop()"
          class="bg-white border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-30svh overflow-y-auto"
          type="button"
        >
          {{ buttonText }}
        </button>
        <!-- Dropdown menu -->
        <div
          id="dropdownSearch"
          class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700"
        >
          <div class="p-3">
            <label for="input-group-search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search school"
                v-model="searchQuery"
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
          <a
            href="#"
            class="flex items-center p-3 text-xs font-medium text-bg-[#044013] border-t border-gray-200 rounded-b-lg bg-gray-50"
          >
            <img src="/assets/logo.png" class="h-4 mx-4" alt="Ciraq Logo" />
            Powered by ciraq inc
          </a>
        </div>
      </div>

      <!-- end -->

      <div class="w-1/5 mx-2">
        <button
          class="border-0 px-3 py-3 mt-2 mx-auto text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          @click="randomizePositions"
          :disabled="disableRoam"
        >
          Roam
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import backgroundImageUrl from "../assets/Maps.png";
import StudentProfile from "../components/student/StudentProfile.vue";

const { showClosableModal } = useModal();
const { showDropDown, hideDropDown } = useDropDown();

const showDrop = (n, a) => {
  // Initialize useModal composable
  const dropDownId = "dropdownSearch";
  const trigId = "filterTrig";
  showDropDown(dropDownId, trigId);
};

const people = ref([]);
const itemWidth = 20; // Adjust this value to match your desired item width
const itemHeight = 10; // Adjust this value to match your desired item height
const minSpacing = 10; // Minimum spacing between people in vh and vw

const randomizePositions = () => {
  people.value = Array.from({ length: 5 }, () => ({
    top: Math.random() * (60 - itemHeight) + 10, // Adjusted to keep items within 10vh to 70vh range
    left: Math.random() * (80 - itemWidth) + 10, // Adjusted to keep items within 10vw to 80vw range
  }));

  // Check for collisions and adjust positions if needed
  for (let i = 0; i < people.value.length; i++) {
    for (let j = i + 1; j < people.value.length; j++) {
      if (checkCollision(people.value[i], people.value[j])) {
        spacePeople(people.value[i], people.value[j]);
        j = i; // Reset the inner loop to check against the adjusted item
      }
    }
  }
};

const checkCollision = (person1, person2) => {
  return (
    person1.left < person2.left + itemWidth &&
    person1.left + itemWidth > person2.left &&
    person1.top < person2.top + itemHeight &&
    person1.top + itemHeight > person2.top
  );
};

const spacePeople = (person1, person2) => {
  const dx = person2.left - person1.left;
  const dy = person2.top - person1.top;
  const minDistanceX = itemWidth + minSpacing;
  const minDistanceY = itemHeight + minSpacing;

  if (Math.abs(dx) < minDistanceX) {
    const sign = Math.sign(dx);
    person1.left -= (sign * (minDistanceX - Math.abs(dx))) / 2;
    person2.left += (sign * (minDistanceX - Math.abs(dx))) / 2;
  }

  if (Math.abs(dy) < minDistanceY) {
    const sign = Math.sign(dy);
    person1.top -= (sign * (minDistanceY - Math.abs(dy))) / 2;
    person2.top += (sign * (minDistanceY - Math.abs(dy))) / 2;
  }
};

const viewProfile = () => {
  // Initialize useModal composable
  const modalId = "viewProfile";
  showClosableModal(modalId);
};

const campusSearch = ref("All");
const disableRoam = ref(false);
const buttonText = ref("All schools");

// filter the search and show suggested universities for the user to select before enabling the roam button

const universities = [
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
];

const searchQuery = ref("");
const selectedUniversity = ref(null);

const filteredUniversities = computed(() =>
  universities.filter(
    (university) =>
      university.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      university.abbreviation
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  )
);

const selectUniversity = (university) => {
  selectedUniversity.value = university;
  buttonText.value = university.abbreviation;
};

import { onMounted } from "vue";
onMounted(() => {
  randomizePositions();
});
</script>

<style scoped>
option {
  padding: 16px;
  margin: 8px;
}

.item {
  position: absolute;
}
::-webkit-scrollbar {
  width: 2.5px;
  height: 2.5px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(80, 80, 80, 0.11);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(94, 94, 94, 0.178);
  background: #bfbfbf;
}
</style>