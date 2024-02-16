import { defineStore } from "pinia";
import { useMainStore } from "./main";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    uName: null,
    token: null,
    tokenExpiration: null,
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
        console.log("here's the response data", responseData);

        if (response.ok) {

          this.setToken(responseData.token)
          document.cookie = `userToken=${responseData.token}; path=/`;
          this.setUser(responseData.userData[0])
          this.fetchUserImage(responseData.userData[0])
        } else{
          const error = new Error(responseData.message || "Failed to login.");
          throw error;
        }
      } catch (error) {
        console.error("Failed to login:", error);
        //clear token
        this.setToken();
        this.setUser()
        await this.fetchUserImage()
      }
    },

    setToken(data){
      this.token=data
      // console.log("here's the token", this.token);
    },    
    setUser(n){
      if(this.token){
        this.user=n
        console.log("here's the user", this.user);
      }
      
    },
    //fetch User Image
    async fetchUserImage(n){
      const mainStore = useMainStore();
      if(this.token){
        try {
          console.log("here's the user profile image name", n.stdid_img_name);
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

    logout(){
      this.setToken(null)
      this.setUser(null)
    }
  },
});
