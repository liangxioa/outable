<template>
  <section class="outable">
    <Header></Header>
    <Table></Table>
    <Footer></Footer>
  </section>
</template>

<script>
import Header from './components/Header.vue'
import Table from './components/Table.vue'
import Footer from './components/Footer.vue'
import {defineComponent} from "vue";

export default defineComponent({
  components: {
    Header, Table, Footer
  }
})
</script>

<style scoped lang="less">
.outable {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
</style>
