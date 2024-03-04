<template>
    <div>
        <button @click="textComp">Test Comp</button>
    </div>
</template>

<script setup>


const textComp = async () => {
   try {
        const response = await fetch("http://184.72.72.210/rest/itemreturn/returnsummary/2024-01-19/2024-02-20", { 
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        });
    
        const responseData = await response.json();
        console.log("here's the response data", responseData);

        if (response.ok) {

          // this.fetchUserImage(responseData.userData[0])
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
}
</script>