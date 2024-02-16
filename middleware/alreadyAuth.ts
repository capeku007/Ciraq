
import { useAuthStore } from '~/stores/authStore';

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  if(authStore.user!=null){
    console.log(authStore.user)
    return await navigateTo("/dashboard")
  }
});
// import { storeToRefs } from 'pinia';
// import { useAuthStore } from '~/stores/authStore';

// export default defineNuxtRouteMiddleware((to) => {
//   // const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
//   const authStore = useAuthStore();
//   const token = authStore.token;
//   let authenticated=false;

//   if (token) {
//     // check if value exists
//     // todo verify if token is valid, before updating the state
//     authenticated= true; // update the state to authenticated
//   }

//   // if token exists and url is /login redirect to homepage
//   if (token && to?.name === '/') {
//     return navigateTo('/dashboard');
//   }

//   // if token doesn't exist redirect to log in
//   if (!token && to?.name !== 'dashboard') {
//     abortNavigation();
//     return navigateTo('/');
//   }
// });


