<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    window.lvshou={};
  }
}
</script>

<style>
html,body{
  margin:0;
}
</style>
