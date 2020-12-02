<template>
  <div class="row">
    <div class="col-1custom" style="z-index: 999">
      <Header :numOfNotice="numOfNotice" @seen-notice="numOfNotice=0" />
    </div>
    <div class="col-11custom">
      <router-view :socket="socket"></router-view>
    </div>
    <div>
      <BottomNotice v-if="showNotice" :notice="showNotice" />
    </div>
  </div>
</template>
<script>
var io = require("socket.io-client");
var socket = io.connect(process.env.API_HOST);
import axios from 'axios';
import header from "../layout/header";
import BottomNotice from "../components/notice/BottomNotice";
export default {
  components: {
    Header: header,
    BottomNotice: BottomNotice,
  },
  data() {
    return {
      socket: socket,
      username: localStorage.username,
         axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token,
        }},
      showNotice: '',
      numOfNotice: 0
    };
  },
  methods:{
      Notice(notice) {
      this.showNotice = notice;
      setTimeout(() => {
        this.showNotice = "";
      }, 4000);
    },
    gotoNotice(){
      location.href = this.showNotice.link;
    }
  },
  created() {
     axios
      .post(
        process.env.API_HOST+"user/getUser",
        { username: this.username },
        this.axiosConfig
      )
      .then((res) => {
        var count=0;
        for(var i of res.data.notification)
          if(!i.seen)
            count++
        this.numOfNotice = count;
      });
    this.socket.emit("getConnect", this.username);
    this.socket.on("notice", (data) => {
      this.numOfNotice++;
      this.Notice(data);
    });
    this.socket.on("seenNotice", (data)=>{
      if(data!== "all")
      this.numOfNotice -= data.length;
      else
      this.numOfNotice=0;
    })
  },
};
</script>
