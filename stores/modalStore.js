// store.js
import { defineStore } from 'pinia';
import { Modal } from 'flowbite'; // Import the Modal class if not already imported

export const useModalStore = defineStore('modal', {
  state: () => ({
    dialoginfo: "",
    yesorNoClickFunc: { yesfunc: undefined, nofunc: undefined },
  }),

  actions: {
    changeDialog( payload) {
      this.dialoginfo = payload
      console.log(this.dialoginfo)
    },

    closeModal( ) {
      console.log("close from store")
      const $modalElement = document.querySelectorAll('.cModal');
      if ($modalElement) {
        const modal = new Modal($modalElement);
        modal.hide();
      }
    },

    async OpenYesOrNOClick( payload) {
      console.log("Yes or No click opened")
      // $("#yesorno").modal('show')
      const $modalElement = document.querySelector("#confirmModal");
      if ($modalElement) {
        const modal = new Modal($modalElement);
        modal.show({}, { backdrop: 'static' });
        
      }
      // {backdrop: 'static', keyboard: false},
      this.yesorNoClickFunc = payload;
      console.log(payload)
    },

    async confirm( payload) {
      if (this.yesorNoClickFunc.yesfunc) {
        
        // $("#yesorno").modal('hide')
        const $modalElement = document.querySelector("#confirmModal");
        if ($modalElement) {
          const modal = new Modal($modalElement);
          modal.hide();
        }
        console.log("Confirmed")
        await this.yesorNoClickFunc.yesfunc()
      }
  
    },
  
    async cancel() {
      if (this.yesorNoClickFunc.nofunc) {
        await this.yesorNoClickFunc.nofunc()
      } else {
        const $modalElement = document.querySelector("#confirmModal");
        if ($modalElement) {
          const modal = new Modal($modalElement);
          modal.hide();
        }
        console.log("in cancel no func")
      }
  
  
    },

  },

  getters: {
    getDialogInfo(state){
      return state.dialoginfo
    }
  },
});

