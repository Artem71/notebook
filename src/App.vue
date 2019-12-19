<template>
  <div id="app" class="container">
    <h1 class="mt-5">Записаная книжка</h1>
    <router-view />
  </div>
</template>

<script>
import Update from './views/Update.vue'

export default {
  components: {Update}
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
