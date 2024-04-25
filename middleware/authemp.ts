// authenticated employer, redirect to login
import { useEmployerAuth } from '~/stores/employerAuth';

export default defineNuxtRouteMiddleware(async (to) => {
  const employerAuth = useEmployerAuth();
  if(!!employerAuth.company){
    return await navigateTo("/employer/dashboard")
  }
});
