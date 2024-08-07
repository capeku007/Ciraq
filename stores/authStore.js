import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { useEmployerAuth } from '~/stores/employerAuth';
import { toast } from "vue3-toastify";

export const useAuthStore = defineStore("authStore", {
  state: () => {
    // Attempt to fetch user details from localStorage
    const userDetails = localStorage.getItem('userDetails');
    const user = userDetails ? JSON.parse(userDetails) : null;

    return {
      uName: null,
      token: useCookie("token").value || null,
      user,
      isLoading: false, 
    }
  },
  getters: {
    getUser() {
      return this.user;
    },
    getUserImage() {
      return this.userImage
    }
  },
  actions: {
    setToken(data) {
      const cookie = useCookie('token', data, {
        maxAge: 60 * 60 * 24, 
        sameSite: 'None',
      });
      cookie.value = data;
      this.token = cookie.value;
    },

    async login(loginData) {
      const mainStore = useMainStore();

      const authStore = useEmployerAuth();
      const userDetails = localStorage.getItem('companyDetails');
      if (userDetails) {
        authStore.logout();
      }
      try {
        this.isLoading = true; 
        const response = await fetch(mainStore.urlbase + "login", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginData)
        });
    
        const responseData = await response.json();
        console.log("here's the response data", responseData);

        if (response.ok) {
          this.setToken(responseData.token)
          this.fetchUser()
          navigateTo("/dashboard")
          toast("Login successful", { 
            position: "top-right", 
            duration: 200, 
            type: "success", 
            responsive: true,
          });

        } else{
          const error = new Error(responseData.message || "Failed to login.");
          toast(responseData.message, { 
            position: "top-right", 
            duration: 200, 
            type: "error", 
            responsive: true,
          });
          throw error;
        }
      } catch (error) {
        console.error("Failed to login:", error);
      } finally {
        this.isLoading = false; 
      }
    },

    setUser(data){
      console.log("about to set this as user", data)
      if(this.token){
        // Store user details in localStorage
        localStorage.setItem('userDetails', JSON.stringify(data));
        this.user = data;
        location.reload();
      }
    },

    //fetch User
    async fetchUser() {
      const mainStore = useMainStore();
      if (this.token) {
    
        try {
          const response = await fetch(mainStore.urlbase + "user/", {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "Authorization": this.token
            }
          });
    
          if (response.ok) {
            const responseData = await response.json();
            // Handle successful response
            console.log("Successful fetch", responseData);
            this.setUser(responseData.data)
          } else {
            // Handle non-ok response
            console.error("Error fetching user:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Unable to load student:", error);
        }
      }
    },
    

    async signup(formData) {
      const mainStore = useMainStore();
      
      try {
        const response = await fetch(mainStore.urlbase + "register", { 
          method: "POST",
          body: formData
        });
    
        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
          const error = new Error(responseData.message || "Failed to register.");
          throw error;
        } else {
          alert("Account registered. Please check email to verify:", responseData.message);
          return responseData; 
        }
      } catch (error) {
        console.error("Failed to register:", error);
        alert("Failed to register:", error);
        throw error; 
      }
    },

    async logout() {
      try {
        this.setToken(null);
        this.setUser(null);
        
        // Clear IndexedDB
        const { $indexedDB } = useNuxtApp();
        
        // Check if the database is initialized before clearing
        try {
          await $indexedDB.initDB();  // Initialize the database if it's not already
          await $indexedDB.clearDatabase();
        } catch (dbError) {
          console.warn("Could not clear IndexedDB:", dbError);
          // Continue with logout process even if database clearing fails
        }
        
        // Remove user details from localStorage
        localStorage.removeItem('userDetails');
        
        // Wait for 300ms before redirecting
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Navigate to home page
        navigateTo("/");
        // Reload the app
    window.location.reload();
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  },
});  