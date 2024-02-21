// store.js
import { defineStore } from "pinia";
import { Modal } from "flowbite"; // Import the Modal class if not already imported


export const useModalStore = defineStore("modal", {
  state: () => ({
    dialoginfo: "",
    yesorNoClickFunc: { yesfunc: undefined, nofunc: undefined },
  }),

  actions: {
    changeDialog(payload) {
      this.dialoginfo = payload;
      console.log(this.dialoginfo);
    },

    closeModal() {
      console.log("close from store");
      const $modalElement = document.querySelectorAll(".cModal");
      if ($modalElement) {
        const modal = new Modal($modalElement);
        modal.hide();
      }
    },

    async OpenYesOrNOClick(payload) {
      console.log("Yes or No click opened");
      // $("#yesorno").modal('show')
      const $modalElement = document.querySelector("#confirmModal");
      const options = {
        backdrop: "static",
        backdropClasses:
          "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
        closable: true,
      };
      if ($modalElement) {
        const modal = new Modal($modalElement, options);
        modal.show();
      }
      // {backdrop: 'static', keyboard: false},
      this.yesorNoClickFunc = payload;
      console.log(payload);
    },

    async confirm(payload) {
      if (this.yesorNoClickFunc.yesfunc) {
        // $("#yesorno").modal('hide')
        const $modalElement = document.querySelector("#confirmModal");
        if ($modalElement) {
          const modal = new Modal($modalElement);
          modal.hide();
        }
        console.log("Confirmed");
        await this.yesorNoClickFunc.yesfunc();
      }
    },

    async cancel() {
      if (this.yesorNoClickFunc.nofunc) {
        await this.yesorNoClickFunc.nofunc();
      } else {
        const $modalElement = document.querySelector("#confirmModal");
        if ($modalElement) {
          const modal = new Modal($modalElement);
          modal.hide();
        }
        console.log("in cancel no func");
      }
    },

    async showMessage(payload) {
      this.dialoginfo = payload;
      // show toast and hide after 300ms that will be dismissed
      // Show the toast
  const toastElement = document.getElementById('#toast');
  toastElement.style.display = 'block'; // Make sure the toast is visible

  // Hide the toast after 300ms
  setTimeout(() => {
    toastElement.style.display = 'none';
    this.dialoginfo = ''; // Clear the dialog info after hiding the toast
  }, 300);
      
    },
  },

  getters: {
    getDialogInfo(state) {
      return state.dialoginfo;
    },
  },
});
