import { defineStore } from "pinia";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    urlbase: "http://3.219.43.239/",
  })});