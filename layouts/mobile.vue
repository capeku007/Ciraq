<template>
  <div>
    <VitePwaManifest /> <Modals />

    <main>
      <div class="container">
        <!-- <header>
          
        </header>
        
      </div>
      -->
        <header class="header"><Header /></header>
        <main class="body"><slot /></main>
        <footer class="footer"><Footer /></footer>
      </div>
    </main>
  </div>
</template>
<script setup>
import Modals from "@/components/UI/Modals.vue"
</script>


<style >
.container {
  display: grid;
  overflow: hidden;
  min-height: 100svh;
  max-height: 100svh;
grid-template-rows: 7% 1fr 7%; 
    min-height: 100vh; 
    max-height: 100vh; 
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: aquamarine;
}
.header {
  /* grid-area: 1 / 1 / 2 / 2; */
  /* background-color: blue; */
}
.body {
  /* grid-area: 2 / 1 / 3 / 2; */
  overflow-y: auto;
  background-color: cyan;
}
.footer {
  /* grid-area: 3 / 1 / 4 / 2; */
  background-color: yellowgreen;
  overflow: hidden;
}

.bottom-sheet {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
    opacity: 1;
  pointer-events: auto;
  align-items: center;
  flex-direction: column;
  justify-content: flex-end;
  transition: 0.1s linear;
}


.bottom-sheet .content {
  width: 100%;
  position: relative;
  background: #fff;
  max-height: 100svh;
  height: 50svh;
  /* min-height: 30svh; */
  max-width: 1150px;
  padding: 25px 30px;
  transform: translateY(100%);
  border-radius: 12px 12px 0 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
  transition: 0.3s ease;
}
.bottom-sheet .content {
  transform: translateY(0%);
}
.bottom-sheet.dragging .content {
  transition: none;
}
.bottom-sheet.fullscreen .content {
  border-radius: 0;
  overflow-y: hidden;
}
.bottom-sheet .header {
  display: flex;
  justify-content: center;
  margin: 0;
  background-color: blue;
  min-height: 1vh;
  max-height: 1vh;
}

.bottom-sheet .modalBody {
  height: 100%;
  overflow-y: auto;
  padding: 15px 0 40px;
  scrollbar-width: none;
  background-color: aqua;
}
.bottom-sheet .modalBody::-webkit-scrollbar {
  width: 0;
}
.bottom-sheet .modalBody h2 {
  font-size: 1.8rem;
}
.bottom-sheet .modalBody p {
  margin-top: 20px;
  font-size: 1.05rem;
}
</style>