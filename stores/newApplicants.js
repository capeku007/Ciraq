import { defineStore } from 'pinia';
import { useMainStore } from './main';
import { useEmployerAuth } from './employerAuth';

export const useApplicantStore = defineStore('newApplicantStore', {
  state: () => ({
    applicants: [],
    applicantsLength: 0,
    isLoading: true,
  }),
  getters: {
    getApplicants: (state) => state.applicants,
    getApplicantsLength: (state) => state.applicantsLength,
    getIsLoading: (state) => state.isLoading,
  },
  actions: {
    async loadNewApplicants() {
      const mainStore = useMainStore();
      const employerAuth = useEmployerAuth();

      try {
        this.isLoading = true;
        const response = await fetch(
            mainStore.urlbase + "api/listing/allcompany-appl",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: employerAuth.ctoken,
              },
            }
          );

        if (response.ok) {
          const responseData = await response.json();
          this.applicants = responseData.data;
          console.log(this.applicants)
          this.applicantsLength = responseData.data.length;
          this.isLoading = false;
        } else {
          console.error(
            'Error fetching listing:',
            response.status,
            response.statusText
          );
          this.isLoading = false;
        }
      } catch (error) {
        console.error('Unable to load listing:', error);
        this.isLoading = false;
      }
    },
  },
});