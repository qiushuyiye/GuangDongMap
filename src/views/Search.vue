<template>
  <div class="searchPage">
    <div class="main">
      <Upload />
    </div>
  </div>
</template>

<script setup>
import Upload from "../components/Upload.vue";
</script>

<style scoped>
.searchPage {
  /* min-height: 88vh; */
}

.main {
  width: 100%;
  padding-bottom: 20px;
}
</style>
