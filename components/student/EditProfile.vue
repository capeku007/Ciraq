<template>
  <div>
    <div class="w-full mt-4 px-4">
      <label
        class="uppercase text-blueGray-600 text-xs font-bold mb-2"
        id="gender"
      >
        PROFILE PICTURE
      </label>
      <label
        class="flex cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-3 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
        tabindex="0"
      >
        <span class="flex items-center space-x-2">
          <i class="bx bx-id-card"></i>
          <span class="text-xs font-medium text-gray-600">
            <span class="text-blue-600 underline">{{
              uploadedFileName || "Upload Profile image"
            }}</span>
          </span>
        </span>
        <input
          type="file"
          name="profilepic"
          id="imageUpload"
          accept=".png, .jpg, .jpeg"
          class="sr-only"
          @change="handleImageUpload2"
        />
      </label>
    </div>

    <div class="w-full mt-6 px-4 relative">
      <label
        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlfor="grid-password"
      >
        BIO
      </label>
      <textarea
        type="text"
        v-model="newMessage"
        id="chat"
        style="resize: none"
        rows="4"
        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder="Your message..."
      ></textarea>
    </div>

    <div class="w-full mt-6 px-4 relative">
      <label
        class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlfor="grid-password"
      >
        ALMA MATER
      </label>
      <input
        type="text"
        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder="Senior High School"
      />
      <input
        type="text"
        class="mt-4 border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        placeholder="Program Studied"
      />
    </div>
    <div class="mt-4">
      <button
      
        @click="editApplication()"
        class="border-0 px-3 py-3 text-white bg-[#044013] rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      >
        Save
      </button>
    </div>
  </div>
</template>
<script setup>
const userInfo = ref();

const profileImg = ref(null);
const uploadedFileName = ref(null);
const loading = ref(false);

const handleImageUpload2 = (event) => {
  const input = event.target;
  if (input.files && input.files[0]) {
    profileImg.value = input.files[0];
    uploadedFileName.value = null; // Reset the uploadedFileName
    nextTick(() => {
      uploadedFileName.value = input.name; // Set the uploadedFileName with the new file name
    });
  } else {
    uploadedFileName.value = null;
  }
};




    const editApplication = async () => {
      const formData = new FormData();

      for (const key in userInfo.value) {
        if (Object.hasOwnProperty.call(userInfo.value, key)) {
          formData.append(key, userInfo.value[key]);
        }
      }

      const profilePicFile = new File([profileImg.value], 'profilepic.jpg');

      formData.append('studentid', studentIdFile);
      formData.append('profilepic', profilePicFile);

      const authStore = useAuthStore();

      try {
        // const responseData = await authStore.signup(formData);
        if (responseData.successful) {
         
        } else {
          console.log('failed');
        }
      } catch (error) {
        // Handle errors here if needed
        console.error('Failed to register:', error);
      }
    };
</script>