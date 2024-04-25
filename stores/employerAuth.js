import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { useAuthStore } from '~/stores/authStore';

export const useEmployerAuth = defineStore("employerAuth", {
  state: () => {
    // Attempt to fetch user details from localStorage
    const companyDetails = localStorage.getItem('companyDetails');
    const company = companyDetails ? JSON.parse(companyDetails) : null;

    return {
      uName: null,
      ctoken: useCookie("xtoken").value || null,
      company,
    }
  },
  getters: {
    getUser() {
      return this.company;
    },
    getUserImage() {
      return this.userImage
    }
  },
  actions: {
    setToken(data) {
      const cookie = useCookie('xtoken', data, {
        maxAge: 60 * 60 * 24, 
        sameSite: 'None',
      });
      cookie.value = data;
      this.ctoken = cookie.value;
    },

    async login(loginData) {
        const mainStore = useMainStore();
      
        // Check if there's a logged-in user in localStorage
        const  userStore = useAuthStore();
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
          userStore.logout();
        }
      
        try {
          const response = await fetch(mainStore.urlbase + "api/company/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
          });
      
          const responseData = await response.json();
          console.log("here's the response success", responseData.successful);
      
          if (responseData.successful) {
            this.setToken(responseData.token);
            this.fetchUser();
          } else {
            const error = new Error(responseData.message || "Failed to login.");
            throw error;
          }
        } catch (error) {
          console.error("Failed to login:", error);
        }
      },

    setUser(data){
      console.log("about to set this as user", data)
      if(this.ctoken){
        // Store user details in localStorage
        localStorage.setItem('companyDetails', JSON.stringify(data));
        this.company = data;
      }
    },

    //fetch User
    async fetchUser() {

      const mainStore = useMainStore();
      if (this.ctoken) {
    console.log("ctoken", this.ctoken);
        try {
          const response = await fetch(mainStore.urlbase + "api/company/companyinfo", {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "Authorization": this.ctoken
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



    logout(){
      this.setToken(null)
      this.setUser(null)
      // Remove user details from localStorage
      localStorage.removeItem('companyDetails');
    }
  },
});  