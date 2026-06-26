<template>
  <div class="external-overlay-new" v-if="showOverlay">
    <iframe
      :src="url"
      frameborder="0"
      class="overlay-iframe-new"
    ></iframe>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const url = ref('http://127.0.0.1:5500/srcCode/src/assets/outPage.html?type=2');
const showOverlay = ref(false);
const emit = defineEmits(['close'])
function changeshowOverlayNew() {
  showOverlay.value = !showOverlay.value;
}
function messageHandler(event) {
    if (event.origin !== window.location.origin) return;
    if (!event.data || event.data.type !== '2') return;
    changeshowOverlayNew();
    emit('close', { type: event.data.type })
}
window.addEventListener('message', messageHandler);
// 暴露给父组件
defineExpose({
  changeshowOverlayNew
})
</script>

<style scoped>
.external-overlay-new {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: #fff;
}
.overlay-iframe-new {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 10000;
}
</style>