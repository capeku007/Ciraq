<template>
    <div class=" max-h-[86svh] min-h-[86svh] overflow-hidden">
<div id="googlemaps" class=" max-h-[86svh] min-h-[86svh] overflow-hidden"></div>
<div id="contactform">
  <!-- You can even embed a Google Form here -->
</div>
    </div>
</template>

<script setup>

</script>

<style scoped>
#googlemaps {

  position:absolute;
  top: 0;
  left: 0;
  /* z-index: 0;  */
  background-color: blue;
}

#contactform {
  position: relative;
  /* z-index: 1;  */
  width: 300px;
  margin: 60px auto 0;
  padding: 10px;
  background: black;
  height: auto;
  opacity: .45; /* Set the opacity for a slightly transparent Google Form */
  color: white;
}
</style>