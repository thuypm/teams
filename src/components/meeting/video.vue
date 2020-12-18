<template>
  <div class style>
    <canvas id="canvas" style="display: none"></canvas>
    <div class="flex-fill screen" style="background:black;">
      <img style="object-fit: contain;" v-bind:src="screen" :class="{'card-img-top': true}" />

      <div id="menuCall" style="z-index:2;">
        <span class="btn btn-success">30:20</span>
        <button v-on:click="setVideo(!camera, micro)" type="button" class="btn mn btn-outline-dark">
          <i :class="{'fa-video': camera, 'fa-video-slash': !camera}" class="fa fa-lg"></i>
        </button>
        <button v-on:click="setVideo(camera, !micro)" type="button" class="btn mn btn-outline-dark">
          <i :class="{'fa-microphone': micro, 'fa-microphone-slash': !micro}" class="fa fa-lg"></i>
        </button>
        <button @click="shareScreen" :disabled="!canShareScreen" type="button" class="btn mn btn-outline-dark" >
          <i class="fas fa-desktop fa-lg"></i>
        </button>
        <button
          v-on:click="changeOpt(1)"
          type="button"
          :class="{ 'btn-outline-dark': !chatOpt, 'btn-dark': chatOpt}"
          class="btn mn"
        >
          <i class="fas fa-comments fa-lg"></i>
        </button>
        <button
          v-on:click="changeOpt(2)"
          type="button"
          :class="{ 'btn-outline-dark': !listOpt, 'btn-dark': listOpt}"
          class="btn mn"
        >
          <i class="fa fa-user fa-lg"></i>
        </button>
        <button onclick="location.href = '/';" type="button" class="btn mn btn-danger">
          <i class="fa fa-phone fa-lg"></i>
        </button>
      </div>
    </div>

    <div class="row flex-row">
      <div class="you vid">
        <div v-if="!camera">
          <img :src="API_HOST+'user/'+username+'.jpg'" class="usr_img rounded-circle" />
          <p style="padding-top: 15px; margin:0">{{username}}</p>
        </div>

        <video class="rounded" v-else id="video" :srcObject.prop="videoUser" muted autoplay></video>
      </div>
      <div v-for="(video, i) in listVideo" :key="i" class="vid">
        <video class="rounded" id="video" :srcObject.prop="video.stream" autoplay></video>
      </div>
      <div v-for="(usr) in listFriend" :key="usr.Id" class="vid">
        <div>
          <img
            :src="API_HOST+'user/'+usr.username+'.jpg'"
            class="usr_img rounded-circle"
          />
          <p style="padding-top: 15px; margin:0">{{usr.username}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var Peer = require("simple-peer");
var myPeer = [];
var peer = [];
export default {
  props: ["roomId", "socket"],
  name: "index",
  data() {
    return {
      API_HOST: process.env.API_HOST,
      username: localStorage.username,
      listFriend: [],
      listCli: [],
      camera: false,
      micro: false,
      chatOpt: 0,
      listOpt: 0,
      videoUser: "",
      listVideo: [],
      screen: "",
      canShareScreen: true,
    };
  },
  created() {
    // this.socket.emit('newUser', this.roomId, this.username);
    this.screen = process.env.API_HOST+"user/" + this.username + ".jpg";
    this.socket.on("screen", (Id, video) => {
      if (Id != this.socket.id) {
        this.screen = video;
        };
        this.canShareScreen = false;
    });
    this.socket.on("stopScreen", Id => {
      // console.log("stop");
      if (Id != this.socket.id)
        this.screen = process.env.API_HOST+"user/" + this.username + ".jpg";
          this.canShareScreen = true;
    });
    this.socket.on("exitUser", Id => {
      this.screen=process.env.API_HOST+"user/" + this.username + ".jpg";
      var vt1 = this.listCli.findIndex(e => e.Id == Id);
      this.listCli.splice(vt1, 1);
      var vt2 = this.listFriend.findIndex(e => e.Id == Id);
      if (vt2 != -1) {
        this.listFriend.splice(vt2, 1);
        myPeer.splice(vt2, 1);
        peer.splice(vt2, 1);
      }
      var vt3 = this.listVideo.findIndex(e => e.Id == Id);
      if (vt3 != -1) {
        peer[vt3].destroy();
        this.listVideo.splice(vt3, 1);
        myPeer.splice(vt3, 1);
        peer.splice(vt3, 1);
      }
    });
    this.socket.on("newUser", (listUser, username, Id) => {
      if (Id != this.socket.id) {
        var usr = {
          username: username,
          Id: Id
        };
        this.listCli.push({...usr});
        this.listFriend.push(usr);
         
        if (this.videoUser) {
          var tmp = myPeer.push(
            new Peer({
              initiator: true,
              trickle: false,
              stream: this.videoUser
            })
          );
          myPeer[tmp - 1].on("error", err => {
            myPeer.splice(tmp - 1, 1);
          });
          myPeer[tmp - 1].on("signal", token => {
            this.socket.emit("onVideo", Id, token);
          });
        };
           
      } else {
        this.listFriend = listUser.slice(0, listUser.length);
        this.listCli = listUser.slice(0, listUser.length);
      }
    });
    this.socket.on("onVideo", (token, Id) => {
      if (Id != this.socket.id) {
        const found = this.listFriend.findIndex(element => element.Id == Id);
        this.listFriend.splice(found, 1);
        var i = peer.push(new Peer({ trickle: false }));
        peer[i - 1].signal(token);
        peer[i - 1].on("signal", tk => {
          this.socket.emit("res_video", Id, tk);
        });
        peer[i - 1].on("stream", stream => {
          this.listVideo.push({
            stream: stream,
            Id: Id
          });
        });
        peer[i - 1].on("error", err => {
          peer.splice(i - 1, 1);
          console.log("error", err);
        });
      }
    });
    this.socket.on("res_video", (Id, tk) => {
      if (Id != this.socket.id) {
        var vt = this.listCli.findIndex(element => element.Id == Id);
        myPeer[vt].signal(tk);
        //   var vt2 = this.findIndex(element => element.Id == Id);
      }
    });
    this.socket.on("offVideo", dta => {
      if (this.socket.id != dta.Id) {
        var idx = this.listVideo.findIndex(e => e.Id == dta.Id);
        if (idx != -1) {
          this.listVideo.splice(idx, 1);
          peer.splice(idx, 1);
          this.listFriend.push(dta);
        }
      }
    });
  },
  methods: {
    shareScreen() {
      let captureStream = null;
      captureStream = navigator.mediaDevices.getDisplayMedia({
        audio: false,
        video: true,
        cursor: "always"
      });
      captureStream
        .then(stream => {
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
        .catch(err => console.log(err));
    },
    setVideo(camera, micro) {
      this.camera = camera;
      this.micro = micro;
      if (this.videoUser) {
        this.socket.emit("offVideo", this.socket.id, this.roomId);
        myPeer.forEach((e, index) => {
          e.destroy();
        });
        myPeer = [];
      }
      if (camera || micro)
        navigator.mediaDevices
          .getUserMedia({ audio: micro, video: camera })
          .then(stream => {
            this.videoUser = stream;
            this.listCli.forEach((e, index) => {
              myPeer[index] = new Peer({
                initiator: true,
                trickle: false,
                stream: this.videoUser
              });
              myPeer[index].on("signal", token => {
                this.socket.emit("onVideo", e.Id, token);
                myPeer[index].on("error", err => {
                  myPeer.splice(i - 1, 1);
                });
              });
            });
          })
          .catch(err => console.log(err));
      else {
        this.videoUser.getTracks().forEach(function(track) {
          track.stop();
        });
        this.videoUser = null;
      }
    },
    changeOpt(val) {
      if (val == 1) {
        this.chatOpt = 1 - this.chatOpt;
        this.listOpt = 0;
        this.$emit("changeOpt", this.chatOpt);
      }
      if (val == 2) {
        this.listOpt = 2 - this.listOpt;
        this.chatOpt = 0;
        this.$emit("changeOpt", this.listOpt);
      }
    }
  }
};
</script>
<style scoped>
/* .btn-secondary{
	background: #2e353d;;
}
.btn-outline-secondary:hover{
	background: #2e353d;;
} */
.screen{
	  	  display: flex;
  justify-content: center;
  /* height: 200px; */
  /* height:100% */
 /* height: calc(100% - 300px);*/
  height:calc(100vh - 155px);
 height: -moz-calc(100vh - 155px);
 height: -webkit-calc(100vh - 155px); 
}
.usr_img {
  margin-top: 10px;
  height:70px;
  object-fit: cover;
  width: 70px;
}
.you {
  border: 1px solid red;
}
.vid {
  background: #DADCDE ;
  border-radius: 5px;
  margin: 3px;
  height: 127px;
  width: 180px;
}
.row {
  flex-wrap: nowrap;
  height: 155px;
}
</style>