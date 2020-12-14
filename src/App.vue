
<template>
  <div id="app">
      <!-- <Loading
        :active.sync="isLoading"
        :can-cancel="true"
        :color="'#66ff66'"
        :opacity="0.7"
        :loader="'Bars'"
        :background-color="'black'"
        :is-full-page="true"
      ></Loading> -->
      <router-view style="z-index: 12" />
  </div>
</template>

<script>
export default {
  name: "App",
  data (){
    return {
      isLoading: true
    }

  }
};
</script>

<style>
/* @import "assets/bootstrap.min.css"; */
@import "bootstrap/dist/css/bootstrap.min.css";
@import "fontawesome/css/all.css";
.modal-fade-enter-active {
  transition: all .3s ease;
}
.modal-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.modal-fade-enter, .modal-fade-leave-to
/* Trước 2.1.8 thì dùng .slide-fade-leave-active */ {
  transform: translateX(10px);
  opacity: 0;
}

.popup-fade-enter-active {
  transition: all .3s ease;
}
.popup-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.popup-fade-enter, .popup-fade-leave-to
/* Trước 2.1.8 thì dùng .slide-fade-leave-active */ {
  transform: translateX(0px);
  opacity: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

