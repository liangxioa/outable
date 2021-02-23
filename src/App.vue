<template>
  <Outable v-model="tableData" @change="onChange()" style="width: 100vw;height: 100vh;"/>
</template>

<script>
import {defineComponent} from "vue";
import Outable from "../packages/index.vue";

export default defineComponent({
  components: {Outable},
  data: () => ({
    tableData: []
  }),
  methods: {
    onChange(tableData) {
      console.log(tableData);
    }
  }
})
</script>
