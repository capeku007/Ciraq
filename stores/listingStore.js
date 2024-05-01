import { ref } from 'vue';
import { useMainStore } from './main';
import { useAuthStore } from './authStore';

export function useListingStore() {
  const listings = ref([]);

  const getListings = () => {
    return listings.value;
  };

  const loadAllListings = async () => {
    const mainStore = useMainStore();
    const authStore = useAuthStore();

    if (authStore.token) {
      try {
        const response = await fetch(mainStore.urlbase + 'api/alllisting', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authStore.token, // Access token directly from authStore
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          // Update listings state
          listings.value = responseData;
        } else {
          console.error('Error fetching listings:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Unable to load listing:', error);
      }
    }
  };

  return {
    listings,
    getListings,
    loadAllListings,
  };
}