import { useAuthStore } from '~/stores/authStore';
import { useUserStore } from '~/stores/userAuth';

export default defineNuxtPlugin(async(nuxtApp)=>{
    const  userStore = useUserStore();
    if(!userStore.user){
        // console.log("please login")
        userStore.setUser()
    }
});