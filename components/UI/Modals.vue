<template>
  <div>
    <div
      id="confirmModal"
      tabindex="-1"
      data-modal-target="confirmModal"
       aria-hidden="true"
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

    <!-- TOASTS -->
    <div id="toast" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 left-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    <div class="text-sm font-normal">Top left positioning.</div>
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