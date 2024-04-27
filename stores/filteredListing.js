// store/filters.js
import { defineStore } from 'pinia';

export const useFiltersStore = defineStore('filteredListing', {
  state: () => ({
    filterValue: '',
  }),
  actions: {
    setFilterValue(value) {
      this.filterValue = value;
    },
  },
});