<template>
    <div>
        <button @click="textComp">Test Comp</button>
    </div>
</template>

<script setup>


const textComp = async () => {
  try {
    // Trigger the 'signup' action with formData
    await store.dispatch('signup', formData)
    // Handle success
    console.log("tried")
  } catch (error) {
    // Handle error
  }
}
</script>