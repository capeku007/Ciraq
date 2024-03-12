import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { useAuthStore } from "./authStore";

export const useListingStore = defineStore("listingStore", {
  state: () => ({
    listings: [],
  }),
  getters: {
    getListings() {
      return this.listings;
    },
  },
  actions: {
    async loadListings() {
      const mainStore = useMainStore();
      const authStore = useAuthStore();
      if (authStore.token) {
        try {
          const response = await fetch(mainStore.urlbase + "api/alllisting", { 
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "Authorization": authStore.token // Access token directly from authStore
            }
          });
          if (response.ok) {
            const responseData = await response.json();
            // Update listings state
            this.listings = responseData;
          } else {
            console.error("Error fetching listings:", response.status, response.statusText);
          }
        } catch (error) {
          console.error("Unable to load listing:", error);
        }
      }
    },
  },
});
