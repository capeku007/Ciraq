<template>
  <div class="grid grid-cols-1 gap-y-4 h-[85dvh] overflow-y-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="country" class="block text-sm font-medium leading-6 text-gray-900">Where would you like to study?</label>
        <select
          v-model="formData.country"
          id="country"
          class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Select a country</option>
          <option value="UK">UK</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
        </select>
      </div>

      <div>
        <label for="field" class="block text-sm font-medium leading-6 text-gray-900">Field of Study</label>
        <select
          v-model="formData.fieldOfStudy"
          id="field"
          class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Select a field</option>
          <option value="Health and medicine">Health and medicine</option>
          <option value="Business studies">Business studies</option>
          <option value="Applied and pure sciences">Applied and pure sciences</option>
          <option value="Social studies and media">Social studies and media</option>
          <option value="Engineering and tech">Engineering and tech</option>
          <option value="Computer science and IT">Computer science and IT</option>
        </select>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label for="schoolType" class="block text-sm font-medium leading-6 text-gray-900">School Type</label>
        <select
          v-model="formData.schoolType"
          id="schoolType"
          class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="any">Any</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div>
        <label for="programLevel" class="block text-sm font-medium leading-6 text-gray-900">Program Level</label>
        <select
          v-model="formData.programLevel"
          id="programLevel"
          class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="undergrad">Undergraduate</option>
          <option value="graduate">Graduate</option>
          <option value="postgraduate">Post Graduate</option>
        </select>
      </div>
    </div>

    <div>
      <p class="block text-sm font-medium leading-6 text-gray-900">Do you need a scholarship?</p>
      <div class="mt-1 space-x-4">
        <label class="inline-flex items-center">
          <input type="radio" v-model="formData.needsScholarship" :value="true" class="form-radio">
          <span class="ml-2">Yes</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" v-model="formData.needsScholarship" :value="false" class="form-radio">
          <span class="ml-2">No</span>
        </label>
      </div>
    </div>

    <div>
      <label for="transcript" class="block text-sm font-medium leading-6 text-gray-900">Transcript (PDF)</label>
      <input
        type="file"
        id="transcript"
        accept=".pdf"
        @change="handleFileUpload"
        class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
    </div>

    <div>
      <p class="block text-sm font-medium leading-6 text-gray-900">Do you have a visa?</p>
      <div class="mt-1 space-x-4">
        <label class="inline-flex items-center">
          <input type="radio" v-model="formData.hasVisa" :value="true" class="form-radio">
          <span class="ml-2">Yes</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" v-model="formData.hasVisa" :value="false" class="form-radio">
          <span class="ml-2">No</span>
        </label>
      </div>
    </div>

    <div v-if="formData.hasVisa === false">
      <p class="block text-sm font-medium leading-6 text-gray-900">Do you require help with visa and passport application?</p>
      <div class="mt-1 space-x-4">
        <label class="inline-flex items-center">
          <input type="radio" v-model="formData.needsVisaHelp" :value="true" class="form-radio">
          <span class="ml-2">Yes</span>
        </label>
        <label class="inline-flex items-center">
          <input type="radio" v-model="formData.needsVisaHelp" :value="false" class="form-radio">
          <span class="ml-2">No</span>
        </label>
      </div>
    </div>

    <div>
      <label for="moreInfo" class="block text-sm font-medium leading-6 text-gray-900">More Information</label>
      <textarea
        v-model="formData.moreInfo"
        id="moreInfo"
        rows="4"
        class="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Please provide any additional information or specific requirements..."
      ></textarea>
    </div>

    <div>
      <label class="inline-flex items-center">
        <input type="checkbox" v-model="formData.agreeToTerms" class="form-checkbox">
        <span class="ml-2 text-sm text-gray-700">I agree to the terms and conditions</span>
      </label>
    </div>
    
    <div>
      <button 
        @click="submitForm" 
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        :disabled="!formData.agreeToTerms"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const formData = ref({
  country: '',
  fieldOfStudy: '',
  schoolType: '',
  programLevel: '',
  needsScholarship: null,
  transcript: null,
  hasVisa: null,
  needsVisaHelp: null,
  moreInfo: '',
  agreeToTerms: false
});

const emit = defineEmits(['update:formData']);

watch(formData, (newValue) => {
  emit('update:formData', newValue);
}, { deep: true });

const handleFileUpload = (event) => {
  formData.value.transcript = event.target.files[0];
};

const submitForm = () => {
  if (formData.value.agreeToTerms) {
    // Handle form submission
    console.log('Form submitted:', formData.value);
    // You can emit an event or call a method to handle the submission
  }
};
</script>