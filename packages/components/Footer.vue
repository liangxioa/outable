<template>
  <footer class="footer"></footer>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped lang="less">
.footer {
  width: 100%;
  height: 36px;
  background: #f9fafb;
  border-top: 1px solid #e0e0e0;
  box-sizing: border-box;
}
</style>
