<template>
  <div class="bg-white rounded-xl p-6 h-[90dvh] overflow-y-auto">
    <div class=" py-4 sticky top-[-1.2rem] z-10 bg-white">
      <div class="flex items-center mb-4">
        <img :src="enquiry.countryFlag" alt="Country flag" class="w-10 h-10 rounded-lg mr-4">
        <h2 class="text-2xl font-bold">{{ enquiry.fieldOfStudy }} in {{ enquiry.country }}</h2>
      </div>
      <div class="mb-6 grid grid-cols-2 gap-4 text-sm">
        <div><span class="font-semibold">Program Level:</span> {{ enquiry.programLevel }}</div>
        <div><span class="font-semibold">School Type:</span> {{ enquiry.schoolType }}</div>
        <div><span class="font-semibold">Created:</span> {{ formatDate(enquiry.createdAt) }}</div>
        <div><span class="font-semibold">Status:</span> {{ enquiry.status }}</div>
      </div>
      <h3 class="text-xl font-semibold mb-4">Agent Bids</h3>
    </div>

    <div class="mb-6">
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="bid in bids" :key="bid.id" class="bg-gray-50 rounded-lg p-4 shadow">
          <h4 class="font-bold text-lg mb-2">{{ bid.agentName }}</h4>
          <p class="text-2xl font-semibold text-green-600 mb-2">${{ bid.amount }} USD</p>
          <p class="mb-2"><span class="font-semibold">Services:</span> {{ bid.services }}</p>
          <p class="mb-2"><span class="font-semibold">Timeline:</span> {{ bid.timeline }}</p>
          <button @click="selectBid(bid)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Select This Agent
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  enquiry: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['bidSelected']);

// Dummy bids data (replace with real data in production)
const bids = ref([
  {
    id: 1,
    agentName: "Global Education Experts",
    amount: 1500,
    services: "Full application support, visa guidance",
    timeline: "4-6 weeks"
  },
  {
    id: 2,
    agentName: "Study Abroad Pro",
    amount: 1200,
    services: "Application support, scholarship search",
    timeline: "5-7 weeks"
  },
  {
    id: 3,
    agentName: "Academic Pathways",
    amount: 1800,
    services: "Comprehensive support package",
    timeline: "3-5 weeks"
  }
]);

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const selectBid = (bid) => {
  emit('bidSelected', bid);
};
</script>