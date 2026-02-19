<template>
  <div class="loading-screen">
    <div class="loader">Loading OS...</div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.loader {
  font-family: monospace;
  font-size: 1.5rem;
  animation: blink 1s infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
</style>
