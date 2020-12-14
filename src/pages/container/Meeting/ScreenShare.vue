<template>
  <div class="flex-fill screen" style="background: black">
    <canvas id="canvas" style="display: none"></canvas>
    <div class="fit-image">
      <img
        style="object-fit: cover; width: 170px; height: 170px"
        v-if="!screen"
        v-bind:src="API_HOST + 'user/' + this.username + '.jpg'"
        class="card-img-top rounded-circle"
      />
    </div>
    <img
      style="object-fit: contain"
      v-if="screen"
      v-bind:src="screen"
      :class="{ 'card-img-top': true }"
    />
    <div id="menuCall" style="z-index: 2">
      <span class="btn btn-success">30:20</span>
      <button
        v-on:click="setVideo(!camera, micro)"
        type="button"
        class="btn mn btn-outline-dark"
      >
        <i
          :class="{ 'fa-video': camera, 'fa-video-slash': !camera }"
          class="fa fa-lg"
        ></i>
      </button>
      <button
        v-on:click="setVideo(camera, !micro)"
        type="button"
        class="btn mn btn-outline-dark"
      >
        <i
          :class="{ 'fa-microphone': micro, 'fa-microphone-slash': !micro }"
          class="fa fa-lg"
        ></i>
      </button>
      <button
        @click="shareScreen"
        :disabled="!canShareScreen"
        type="button"
        class="btn mn btn-outline-dark"
      >
        <i class="fas fa-desktop fa-lg"></i>
      </button>
      <button
        v-on:click="changeOpt(1)"
        type="button"
        :class="{ 'btn-outline-dark': !chatOpt, 'btn-dark': chatOpt }"
        class="btn mn"
      >
        <i class="fas fa-comments fa-lg"></i>
      </button>
      <button
        v-on:click="changeOpt(2)"
        type="button"
        :class="{ 'btn-outline-dark': !listOpt, 'btn-dark': listOpt }"
        class="btn mn"
      >
        <i class="fa fa-user fa-lg"></i>
      </button>
      <button
        onclick="location.href = '/';"
        type="button"
        class="btn mn btn-danger"
      >
        <i class="fa fa-phone fa-lg"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["roomId", "socket"],
  name: "index",
  data() {
    return {
      API_HOST: process.env.API_HOST,
      username: localStorage.username,
      camera: false,
      micro: false,
      chatOpt: 0,
      listOpt: 0,
      screen: null,
      canShareScreen: true,
    };
  },
  created() {
    this.socket.on("screen", (Id, video) => {
      if (Id != this.socket.id) {
        this.screen = video;
      }
      this.canShareScreen = false;
    });
    this.socket.on("stopScreen", (Id) => {
      if (Id != this.socket.id)
        this.screen = null;
      this.canShareScreen = true;
    });
  },
  methods: {
    shareScreen() {
      let captureStream = null;
      captureStream = navigator.mediaDevices.getDisplayMedia({
        audio: false,
        video: true,
        cursor: "always",
      });

      captureStream
        .then((stream) => {
          var video = document.createElement("video");
          video.autoplay = true;
          video.srcObject = stream;
          var canvas = document.getElementById("canvas");
          canvas.width = 960;
          canvas.height = 540;
          var context = canvas.getContext("2d");
          context.width = canvas.width;
          context.height = canvas.height;
          var running = setInterval(() => {
            context.drawImage(video, 0, 0, context.width, context.height);
            var vid = canvas.toDataURL("image/webp");
            this.socket.emit("screen", this.roomId, vid);
            if (!stream.active) {
              this.socket.emit("stopScreen", this.roomId);
              clearInterval(running);
            }
          }, 70);
        })
        .catch((err) => console.log(err));
    },
    changeOpt(val) {
      if (val == 1) {
        this.chatOpt = 1 - this.chatOpt;
        this.listOpt = 0;
        this.$emit("change-option", this.chatOpt);
      }
      if (val == 2) {
        this.listOpt = 2 - this.listOpt;
        this.chatOpt = 0;
        this.$emit("change-option", this.listOpt);
      }
    },
  },
};
</script>
<style scoped>
.fit-image {
  margin-top: calc(50vh - 157px);
  margin-top: -moz-calc(50vh - 157px);
  margin-top: -webkit-calc(50vh - 157px);
}
</style>