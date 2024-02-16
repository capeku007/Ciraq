import { defineStore } from "pinia";
import { useMainStore } from "./main";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    uName: null,
    token: null,
    tokenExpiration: null,
  }),
  getters: {
    userName(state) {
      return state.uName;
    },
  },
  actions: {
    async login(loginData) {
      const mainStore = useMainStore();
      console.log("here's your login data", loginData);
      console.log("here's your url", mainStore.urlbase); // Corrected property name
      
      try {
        const response = await fetch(mainStore.urlbase + "api/login", { // Corrected property name
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginData)
        });
    
        const responseData = await response.json();
        console.log(responseData);
        console.log(response);
        if (response.ok) {
          alert('you are in')
        } else{
          const error = new Error(responseData.message || "Failed to login.");
          throw error;
        }
      } catch (error) {
        console.error("Failed to login:", error);
      }
    },
    

    async signup(formData) {
      const mainStore = useMainStore();
      console.log("here's your login data", formData);
      console.log("here's your url", mainStore.urlbase); // Corrected property name
      
      try {
        const response = await fetch(mainStore.urlbase + "api/register", { // Corrected property name
          method: "POST",
          body: formData
        });
    
        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
          const error = new Error(responseData.message || "Failed to register.");
          throw error;
        } else{
          alert("Account registered Please check email to verify :", responseData.message);
        }
      } catch (error) {
        console.error("Failed to register:", error);
        alert("Failed to register:", error);
      }
    },
  },
});
