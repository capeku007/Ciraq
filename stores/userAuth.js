import { defineStore } from "pinia";
import { useMainStore } from "./main";
export const useUserStore = defineStore("userAuth", () => {
  const user = ref();
  const userImage = ref();
  const token = useCookie("userCookie", {
    maxAge: 60 * 60,
  });

  const setToken = (data) => (token.value = data);
  const setUser = (data) => (token.value = data);
  const mainStore = useMainStore();

  const login = async (loginData) => {
    console.log("here's your login data", loginData);
    console.log("here's your url", mainStore.urlbase);

    try {
      const response = await fetch(mainStore.urlbase + "api/login", {
        // Corrected property name
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();
      console.log("here's the response data", responseData);

      if (response.ok) {
        setToken(responseData.token);
        setUser(responseData.userData);
        await fetchUser(responseData.userData);
        // fetchUserImage(responseData.userData[0]);
      } else {
        const error = new Error(responseData.message || "Failed to login.");
        throw error;
      }
    } catch (error) {
      console.error("Failed to login:", error);
      //clear token
      setToken();
      setUser();
      await fetchUser();
      await fetchUserImage();
    }
  };

  const signup = async (formData) => {
    const mainStore = useMainStore();
    // console.log("here's your login data", formData);
    // console.log("here's your url", mainStore.urlbase); 

    try {
      const response = await fetch(mainStore.urlbase + "api/register", {
        // Corrected property name
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to register.");
        throw error;
      } else {
        alert(
          "Account registered Please check email to verify :",
          responseData.message
        );
      }
    } catch (error) {
      console.error("Failed to register:", error);
      alert("Failed to register:", error);
    }
  };

  //fetch User
//fetch User
const fetchUser = async () => {
  if (token.value) {
    try {
      const response = await fetch(mainStore.urlbase + "api/user/" + user.value.username, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token.value,
          "Content-Type": "application/json"
        }
      });

      const responseData = await response.json();
      
      if (response.ok) {
        console.log("User details:", responseData);
        // Assuming responseData is an object containing user details
        user.value = responseData;
      } else {
        const error = new Error(responseData.message || "Failed to fetch user details.");
        throw error;
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      // Handle error as needed
    }
  }
};


  //fetch User Image
  const fetchUserImage = async (n) => {
    const mainStore = useMainStore();
    if (token.value) {
      try {
        console.log("here's the user profile image name", n.stdid_img_name);
        const responseImg =
          (await mainStore.urlbase) + "public/uploads/" + n.stdid_img_name;
        userImage.value = responseImg;
        console.log(this.userImage);
      } catch (error) {
        console.error("unable to load student image:", error);
      }
    }
  };

  const logout = () => {
    setToken();
    setUser();
  };

  return { user, token, logout, login, signup, setToken, setUser };
});
