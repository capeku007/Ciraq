import { defineStore } from "pinia";

export const useMainStore = defineStore("mainStore", {
  state: () => ({
    urlbase: "https://ciraq.co/api/",
    // urlbase: "https://59ae-41-155-39-157.ngrok-free.app/",
    // urlbase: "http://192.168.5.248:5001/",
    dialoginfo: "",
    yesorNoClickFunc: { yesfunc: undefined, nofunc: undefined },
    loginType: false, 
  }),

  actions: {
    toggleLoginType() {
      this.loginType = !this.loginType;
    },
    
    changeDialog( payload) {
      this.dialoginfo = payload
      console.log(this.dialoginfo)
    },

    async OpenYesOrNOClick( payload) {
      console.log("Yes or No click opened")
      // $("#yesorno").modal('show')
      const $modalElement = document.querySelector("#confirmModal");
      if ($modalElement) {
        const modal = new Modal($modalElement);
        modal.show();
      }
      // {backdrop: 'static', keyboard: false},
      yesorNoClickFunc = payload;
      console.log(payload)
    },

    async confirm( payload) {
      if (yesorNoClickFunc.yesfunc) {
        console.log("Confirmed")
        // $("#yesorno").modal('hide')
        const $modalElement = document.querySelector('#confirmModal');
        if ($modalElement) {
          const modal = new Modal($modalElement);
          modal.hide();
        }
        await yesorNoClickFunc.yesfunc()
      }
    },
  
    async cancel( payload) {
      console.log("Cancelled")
      if (yesorNoClickFunc.nofunc) {
        await yesorNoClickFunc.nofunc()
      } else {
        console.log("in cancel no func")
      }
  
  
    },

  },

  getters: {
    
  },
});
