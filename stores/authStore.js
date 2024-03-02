import { defineStore } from "pinia";
import { useMainStore } from "./main";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    uName: null,
    token: useCookie("token").value || null,
    user:null
  }),
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
      // Get the cookie object from the useCookie composable
      const cookie = useCookie('token',{maxAge:60*60*24});
    
      // Set the cookie value to data
      cookie.value = data;
    
      // Set the maxAge to a very large value (e.g., 10 years)
      // cookie.maxAge = 60 * 60 * 24 * 365 * 10; // 10 years in seconds
    
      // Get the cookie value and assign it to this.token
      this.token = cookie.value;
    },

    async login(loginData) {
      const mainStore = useMainStore();
      
      try {
        const response = await fetch(mainStore.urlbase + "api/login", { 
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
          this.setUser(responseData.userData[0])
          this.fetchUser( responseData.userData[0])
          this.fetchUserImage(responseData.userData[0])
        } else{
          const error = new Error(responseData.message || "Failed to login.");
          throw error;
        }
      } catch (error) {
        console.error("Failed to login:", error);
        //clear token
        // this.setToken();
        // this.setUser()
      }
    },


    setUser(n){
      if(this.token){
        this.user=n
        // console.log("here's the user", this.user);
      }
      
    },
    //fetch User
    async fetchUser(n) {
      const mainStore = useMainStore();
      if (this.token) {
        console.log("here's your token:", this.token)
        try {
          const response = await fetch(mainStore.urlbase + "api/user/" + n.user_id, {
            method: "GET",
            headers: {
              // Authorization: `Bearer ${useCookie("token").value}`,// Format token as a cookie string
              "Cookie": `token=${this.token}`, // Format token as a cookie string
              withCredentials: true
            }
            
          });
    
          console.log("here is your fetched user", response);
          if (response.ok) {
            // Handle successful response
            console.log("successful fetch", response)
          } else {
            // Handle non-ok response
          }
        } catch (error) {
          console.error("unable to load student image:", error);
        }
      }
    },
    
    //fetch User Image
    async fetchUserImage(n){
      const mainStore = useMainStore();
      if(this.token){
        try {
          // console.log("here's the user profile image name", n.stdid_img_name);
          const responseImg = await mainStore.urlbase + "public/uploads/" + n.stdid_img_name;
          this.userImage =  responseImg
          console.log(this.userImage);
        } catch (error) {
          console.error("unable to load student image:", error);
        }
      }
    },
    

    async signup(formData) {
      const mainStore = useMainStore();
      
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
        } else {
          alert("Account registered. Please check email to verify:", responseData.message);
          return responseData; // Return the responseData after successful registration
        }
      } catch (error) {
        console.error("Failed to register:", error);
        alert("Failed to register:", error);
        throw error; // Rethrow the error to handle it elsewhere if needed
      }
    },

    logout(){
      this.setToken(null)
      this.setUser(null)
    }
  },
});
