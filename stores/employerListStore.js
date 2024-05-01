import { defineStore } from 'pinia';
import { useMainStore } from './main';
import { useEmployerAuth } from './employerAuth';

export const useEmployerListStore = defineStore('employerListStore', {
  state: () => ({
    listings: [],
    listingsLength: 0,
    isLoading: true,
  }),
  getters: {
    getListings: (state) => state.listings,
    getListingsLength: (state) => state.listingsLength,
    getIsLoading: (state) => state.isLoading,
  },
  actions: {
    async loadAllListings() {
      const mainStore = useMainStore();
      const employerAuth = useEmployerAuth();

      try {
        this.isLoading = true;
        const response = await fetch(
          mainStore.urlbase + 'api/listing/all-active-company-listing',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: employerAuth.ctoken,
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          this.listings = responseData.data;
          this.listingsLength = responseData.data.length;
          this.isLoading = false;
          console.log('Successful listing fetch', responseData);
          console.log(' listing fetched', this.listings);
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