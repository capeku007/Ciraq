import { defineStore } from 'pinia';
import { useMainStore } from './main';
import { useEmployerAuth } from './employerAuth';

export const useApplicantStore = defineStore('newApplicantStore', {
  state: () => ({
    applicants: [],
    applicantsLength: 0,

    shortlistedApplicants: [],
    shortlistedApplicantsLength: 0,

    offeredApplicants: [],
    offeredApplicantsLength: 0,

    hiredApplicants: [],
    hiredApplicantsLength: 0,
    isLoading: true,
  }),
  getters: {
    getApplicants: (state) => state.applicants,
    getApplicantsLength: (state) => state.applicantsLength,    
    
    //shortlists
    getShortlistApplicants: (state) => state.shortlistedApplicants,
    getShortlistsLength: (state) => state.shortlistedApplicantsLength,    

    //offers
    getOfferedApplicants: (state) => state.offeredApplicants,
    getOfferedLength: (state) => state.offeredApplicantsLength,

    //hires
    geHiredApplicants: (state) => state.hiredApplicants,
    getHiredLength: (state) => state.hiredApplicantsLength,

    getIsLoading: (state) => state.isLoading,
  },
  actions: {
    async loadNewApplicants() {
      const mainStore = useMainStore();
      const employerAuth = useEmployerAuth();

      try {
        this.isLoading = true;
        const response = await fetch(
            mainStore.urlbase + "listing/allcompany-appl",
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

    async loadAllShortlists() {
      const mainStore = useMainStore();
      const employerAuth = useEmployerAuth();
    
      try {
        this.isLoading = true;
        const response = await fetch(
          mainStore.urlbase + "listing/allcompany-appl",
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
          this.shortlistedApplicants = responseData.data.filter(
            applicant => applicant.appl_status === "in-review"
          );
          this.shortlistedApplicantsLength = this.shortlistedApplicants.length;
          console.log(this.shortlistedApplicants);
          this.isLoading = false;
        } else {
          console.error(
            'Error fetching listings:',
            response.status,
            response.statusText
          );
          this.isLoading = false;
        }
      } catch (error) {
        console.error('Unable to load listings:', error);
        this.isLoading = false;
      }
    },

    async loadAllSentOffers() {
      const mainStore = useMainStore();
      const employerAuth = useEmployerAuth();
    
      try {
        this.isLoading = true;
        const response = await fetch(
          mainStore.urlbase + "listing/allcompany-appl",
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
          this.offeredApplicants = responseData.data.filter(
            applicant => applicant.appl_status === "offer-extended"
          );
          this.offeredApplicantsLength = this.offeredApplicants.length;
          this.isLoading = false;
        } else {
          console.error(
            'Error fetching listings:',
            response.status,
            response.statusText
          );
          this.isLoading = false;
        }
      } catch (error) {
        console.error('Unable to load listings:', error);
        this.isLoading = false;
      }
    },

    async loadAllHires() {
      const mainStore = useMainStore();
      const employerAuth = useEmployerAuth();
    
      try {
        this.isLoading = true;
        const response = await fetch(
          mainStore.urlbase + "listing/allcompany-appl",
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
          this.hiredApplicants = responseData.data.filter(
            applicant => applicant.appl_status === "accepted"
          );
          this.hiredApplicantsLength = this.hiredApplicants.length;
          this.isLoading = false;
        } else {
          console.error(
            'Error fetching listings:',
            response.status,
            response.statusText
          );
          this.isLoading = false;
        }
      } catch (error) {
        console.error('Unable to load listings:', error);
        this.isLoading = false;
      }
    },
  },
});