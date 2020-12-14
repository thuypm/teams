<template>
  <div>
    <ScreenShare
      :socket="socket"
      :roomId="roomId"
      @change-option="(e) => $emit('change-option', e)"
    />
    <div class="row flex-row">
      <div class="you vid">
        <div v-if="!camera">
          <img
            :src="API_HOST + 'user/' + username + '.jpg'"
            class="usr_img rounded-circle"
          />
          <p style="padding-top: 15px; margin: 0">{{ username }}</p>
        </div>
        <video
          class="rounded"
          v-else
          id="video"
          :srcObject.prop="videoUser"
          muted
          autoplay
        ></video>
      </div>
      <Video v-for="(video, i) in listVideo" :key="i" />
      <SilentMember v-for="usr in listFriend" :key="usr.Id" />
    </div>
  </div>
</template>
<script>
import Video from "./Video";
import ScreenShare from "./ScreenShare";
import SilentMember from "./SilentMember";
export default {
  components: {
    Video,
    ScreenShare,
    SilentMember,
  },
  props: ["roomId", "socket"],
  data() {
    return {
      API_HOST: process.env.API_HOST,
      username: localStorage.username,
      listFriend: [],
      listVideo: [],
      listUser: [],
      camera: false,
      micro: false,
    };
  },
  created() {
    //this function will listen when a user join room
    this.socket.on("newUser", (listUser, username, Id) => {
      if (Id != this.socket.id) {
        let newUserObject = {
          username: username,
          Id: Id,
          peer: null,
        };
        // listUser.push({
        //     username: username,
        //     Id: Id,
        // });
        if (this.videoUser) {
          newUserObject.peer = new Peer({
            initiator: true,
            trickle: false,
            stream: this.videoUser,
          });
        }
      }
    });
    //   if (Id != this.socket.id) {
    //     var usr = {
    //       username: username,
    //       Id: Id,
    //     };
    //     this.listCli.push({ ...usr });
    //     this.listFriend.push(usr);
    //     if (this.videoUser) {
    //       var tmp = myPeer.push(
    //         new Peer({
    //           initiator: true,
    //           trickle: false,
    //           stream: this.videoUser,
    //         })
    //       );
    //       myPeer[tmp - 1].on("error", (err) => {
    //         myPeer.splice(tmp - 1, 1);
    //       });
    //       myPeer[tmp - 1].on("signal", (token) => {
    //         this.socket.emit("onVideo", Id, token);
    //       });
    //     }
    //   } else {
    //     this.listFriend = listUser.slice(0, listUser.length);
    //     this.listCli = listUser.slice(0, listUser.length);
    //   }
    // });
  },
  methods: {
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
  },
};
</script>
<style scoped>
.screen {
  display: flex;
  justify-content: center;
  height: calc(100vh - 155px);
  height: -moz-calc(100vh - 155px);
  height: -webkit-calc(100vh - 155px);
}

.usr_img {
  margin-top: 10px;
  height: 70px;
  object-fit: cover;
  width: 70px;
}
.you {
  border: 1px solid red;
}
.vid {
  background: #dadcde;
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