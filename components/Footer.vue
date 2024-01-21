<template>
  <div class="parentCon">
    <div class="footerItem">About</div>
    <div class="footerItem">Privacy</div>
    <div class="footerItem">Terms</div>
  </div>
  <div>
    <p class="footerItem">&copy; 2023 Company Name. All rights reserved.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fdate: null,
      tdate: null,
    };
  },
};
</script>

<style scoped>
.parentCon {
  display: flex;
  justify-content: center;
}

.footerItem {
  margin: 0 3rem;
  font-size: 12px;
  text-align: center;
}
</style>
