<template>
  <header class="header"></header>
</template>

<script setup>
import {defineProps, reactive} from 'vue'

defineProps({
  msg: String
})

const state = reactive({count: 0})
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 45px;
  flex-shrink: 0;
  background: #f9fafb;
  border-bottom: solid 1px #08080814;
}
</style>
