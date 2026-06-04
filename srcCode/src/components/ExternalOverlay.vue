<template>
  <div class="external-overlay">
    <iframe
      :src="url"
      frameborder="0"
      class="overlay-iframe"
    ></iframe>
  </div>
</template>

<script setup>
defineProps({
  url: {
    type: String,
    required: true
  },
});

</script>

<style scoped>
.external-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: #fff;
}
.overlay-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  z-index: 10000;
}
</style>