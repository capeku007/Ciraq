import { useAuthStore } from '~/stores/authStore';

export default defineNuxtPlugin(async(nuxtApp)=>{
    const  userStore = useAuthStore();
    if(!userStore.user){
        // console.log("please login")
        await userStore.fetchUser();
    }
});