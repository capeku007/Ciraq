// store.js
import { defineStore } from "pinia";
import useModal from '../composables/useModal'; // Import the Modal class if not already imported


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
      const { showModal } = useModal(); // Initialize useModal composable
      const modalId = 'confirmModal';
      showModal(modalId);
      // {backdrop: 'static', keyboard: false},
      this.yesorNoClickFunc = payload;
      console.log(payload);
    },

    async confirm(payload) {
      if (this.yesorNoClickFunc.yesfunc) {
        // $("#yesorno").modal('hide')
        const { hideModal } = useModal(); // Initialize useModal composable
        const modalId = 'confirmModal'; // Assuming this is the ID of your modal
        hideModal(modalId);
        console.log("Confirmed");
        await this.yesorNoClickFunc.yesfunc();
      }
    },

    async cancel() {
      if (this.yesorNoClickFunc.nofunc) {
        await this.yesorNoClickFunc.nofunc();
      } else {
        const { hideModal } = useModal(); // Initialize useModal composable
        const modalId = 'confirmModal'; // Assuming this is the ID of your modal
        hideModal(modalId);
        console.log("in cancel no func");
      }
    },

    async showMessage(payload) {
      this.dialoginfo = payload;
      // show toast and hide after 300ms that will be dismissed
      const { showToast } = useModal(); // Initialize useModal composable
      const toastId = 'toast'; // Assuming this is the ID of your modal
      showToast(toastId);
      console.log(toastId)
  // Hide the toast after 300ms
  setTimeout(() => {
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
