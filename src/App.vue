
<template>
  <div id="app">
  
      <router-view style="z-index: 12" />
  </div>
</template>

<script>
export default {
  name: "App",
  data (){
    return {
    }
  }
};
</script>

<style>
/* @import "assets/bootstrap.min.css"; */
@import "bootstrap/dist/css/bootstrap.min.css";
@import "fontawesome/css/all.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

