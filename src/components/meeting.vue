<template>
  <div class="row">
    <!-- <button @click="getNotice()">click đi</button> -->
    <div :class="{'col-10custom': option, 'col-12custom': !option}">
      <Video @changeOpt="option=$event" :socket="socket" :roomId="$route.params.id" />
    </div>
    <div class="col-2custom">
      <Chat v-if="option==1" :socket="socket" :roomId="$route.params.id" />
      <ListUser v-if="option==2" :socket="socket" :roomId="$route.params.id" />
    </div>
  </div>
</template>

<script>

import video from "./meeting/video";
import chat from "./meeting/chat";
import listUser from "./meeting/listUser";
var io = require("socket.io-client");
// import io from 'socket.io-client';
var socket = io.connect("http://thuypm.tk:3000/meeting");
export default {
  name: "index",
  components: {
    Chat: chat,
    Video: video,
    ListUser: listUser
  },
  created() {
    console.log(this.$route.params.id);
    this.socket.emit("join", this.username, this.$route.params.id);
    this.socket.on("room-not-found", () => {
      alert("có lỗi xảy ra hoặc phòng không còn tồn tại");
      window.location.href = "/";
    });
  },
  data() {
    return {
      option: 0,
      socket: socket,
      username: localStorage.username
    };
  },
  methods: {
    getNotice(){
     this.socket.emit("test", "đây là nội dung thông báo", this.$route.params.id)
    }
  }
};
</script>
<style>
.col-2custom {
}

textarea {
  font-family: verdana;
}

#menuCall {
  opacity: 0;
  position: absolute;
  bottom: calc(150px);
  background: #fff;
  padding: 20px 40px 20px 40px;
  border-radius: 2px;
  box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.2), 0 6px 6px 0 rgba(0, 0, 0, 0.19) !important;
  margin-bottom: 20px;
  -webkit-transition: opacity 1s; /* Safari */
  transition: opacity 1s;
}
#menuCall:hover {
  opacity: 1;
}
.card-footer {
  padding: 0;
}

.row .flex-row {
  overflow-x: scroll !important;
  white-space: nowrap;
}
.mn {
  padding-left: 20px;
  padding-right: 20px;
  width: 70px;
}
.rounded {
  width: 180px !important;
  background-color: black;
  height: 125px;
  padding: 0 4px 0 4px;
}
.input-group-append:hover {
  cursor: pointer;
  background: grey;
}
</style>
