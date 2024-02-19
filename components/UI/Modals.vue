<template>
  <div>
    <div
      id="confirmModal"
      tabindex="-1"
      data-modal-target="confirmModal"
      
      class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="p-4 md:p-5 text-center">
            <h3
              class="mt-5 mb-5 text-sm font-normal text-gray-900 dark:text-gray-400"
            >
              {{ dialogInfo }}
            </h3>
            <button
              data-modal-hide="confirmModal"
              type="button"
              @click="confirm()"
              class="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-4 py-2 text-center"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide="confirmModal"
              type="button"
              @click="cancel()"
              class="py-2 px-4 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="confirmModal2"
      data-modal-target="confirmModal2"
      data-fb-modal-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div class="relative w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-start justify-between p-2 border-b rounded-t dark:border-gray-600"
          >
            <h3
              class="text-lg ml-1 font-semibold text-gray-900 lg:text-2xl dark:text-white"
            >
              Confirm Action
            </h3>
            <button
              id="closeButton"
              @click="closeThisModal()"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-red-600 hover:text-white rounded-lg text-sm p-1 ml-auto inline-flex items-center"
            >
              <div class="w-5 h-5">
                <i class="bx bx-x"></i>
              </div>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6">
            <p
              class="text-base leading-relaxed text-gray-500 dark:text-gray-400"
            >
              {{ dialogInfo }}
            </p>
          </div>
          <!-- Modal footer -->
          <div
            class="flex justify-end p-2 space-x-2 border-t border-gray-200 rounded-b"
          >
            <button
              @click="cancel"
              type="button"
              class="text-gray-500 bg-white rounded-lg border text-sm font-medium px-4 py-2 hover:bg-rose-600 hover:text-white"
            >
              Decline
            </button>
            <button
              @click="confirm"
              type="button"
              class="text-white bg-emerald-500 hover:bg-emerald-400 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200"
            >
              I accept
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useModalStore } from "../stores/modalStore.js";
export default {
  data() {
    return {};
  },
  
  async mounted() {},
  methods: {
    closeThisModal() {
      console.log("close from modal");
      const $modalElement = document.querySelector("#confirmModal");
      if ($modalElement) {
        const modal = new Modal($modalElement);
        modal.hide();
      }
    },

    async confirm() {
      const modalStore = useModalStore();
      modalStore.confirm();
    },

    doNothing(){
      console.log("doing nothing")
    },

    async cancel() {
      const modalStore = useModalStore();
      modalStore.cancel();
    },
  },
  computed: {
    dialogInfo() {
      return useModalStore().getDialogInfo;
    },
  },
};
</script>