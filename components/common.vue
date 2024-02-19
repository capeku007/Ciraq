<template>
  <div>
    <!-- The Modal -->
    <div
      class="modal fade confirmYNModal"
      id="yesorno"
      style="z-index: 10000000"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header alert alert-info">
            <h4 class="modal-title">Confirm</h4>
            <button type="button" class="close" data-bs-dismiss="modal">
              ×
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <span>{{ this.$store.state.dialoginfo }}</span>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="YesOrNOCancelClick"
            >
              No
            </button>
            <button type="button" class="btn btn-primary" @click="YesOrNOClick">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- okdialog -->
    <div
      class="modal fade"
      id="okdialog"
      style="z-index: 10000003"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Info</h4>
            <button type="button" class="close" data-bs-dismiss="modal">
              ×
            </button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <span>{{ this.$store.state.dialoginfo }}</span>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <!-- <button type="button" class="btn " data-bs-dismiss="modal">Cancel</button> -->
            <button
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- The wait Modal -->
    <div
      class="modal fade"
      id="waitdailog"
      style="z-index: 10000002"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header alert-info">
            <h4 class="modal-title">Please Wait...</h4>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <span>{{ this.$store.state.dialoginfo }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import AddUserForm from '~/components/AddUserForm.vue';

export default {
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    async YesOrNOClick() {
      this.$store.commit("YesOrNOClick");
    },
    async YesOrNOCancelClick() {
      this.$store.commit("YesOrNOCancelClick");
      $("#yesorno").modal("hide");
    },
  },
  computed: {},
};
</script>

<style>
</style>