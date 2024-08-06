import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { useEmployerAuth } from '~/stores/employerAuth';
import { toast } from "vue3-toastify";

export const useCreateStore = defineStore("createListStore", {
  state: () => {
    return {
      uName: null,

    }
  },
  getters: {

    // getUserImage() {
    //   return this.userImage
    // }
  },
  actions: {

    async createListing(formData) {
      const mainStore = useMainStore();
      const employerAuth = useEmployerAuth();
      console.log("Received this, will send this",formData)
      // try {
      //   const response = await fetch(mainStore.urlbase + "listing/create", { 
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: employerAuth.ctoken,
      //     },
      //     method: "POST",
      //     body: JSON.stringify(formData)
      //   });
    
      //   const responseData = await response.json();
      //   console.log(responseData);
      //   if (!response.ok) {
      //     toast(responseData.message, { 
      //       position: "top-right", 
      //       duration: 200, 
      //       type: "error", 
      //       responsive: true,
      //     });
      //     const error = new Error(responseData.message || "Failed to create.");
      //     throw error;
      //   } else {
          
      //     toast(responseData.message, { 
      //       position: "top-right", 
      //       duration: 200, 
      //       type: "success", 
      //       responsive: true,
      //     });
      //     return responseData; 
      //   }
      // } catch (error) {
      //   console.error("Failed to register:", error);
      //   throw error; 
      // }
    },

  },
});  