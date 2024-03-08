<template>
    <div>                <h1>HUB</h1>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'
import { reactive } from 'vue'

// Define loginData using reactive

definePageMeta({
  layout: "default",
  auth:false
});
const uname=ref("knimo470")
const pword=ref("12345678@")
const error =ref(null)

// Access the authStore instance
const authStore = useAuthStore()
  // authStore.login({
  //   username: uname.value,
  //   p_word:pword.value,
  // })

// Define loginUser function


const loginUser = async () => {
  try {
    let loginData ={
    username: uname.value,
    p_word:pword.value,
  }
  authStore.login(loginData)
  } catch (err) {
    this.error=err.message ;
    alert(this.error)
  }
  

};
</script>