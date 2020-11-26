<template>
  <div class="card">
    <div class="card-body msg_card_body flex-fill" id="message">
      <div v-for="(message, index) in listMess" :key="index">
        <div class="d-flex justify-content-end mb-4" v-if="message.sender == username">
          <div v-if="message.type=='data:image'" class="msg_cotainer_send">
           <a :href="'http://thuypm.tk:3000/'+ message.content" target="_blank">
            <img :src="'http://thuypm.tk:3000/'+ message.content" style="max-width:160px" alt />
           </a>
            <span class="msg_time_send">{{message.time| DAY()}}</span>
          </div>
          <div v-else class="msg_cotainer_send">
            <a
              :href="'http://thuypm.tk:3000/'+ message.content"
              v-if="message.type!='text'"
              target="_blank"
            >
              <i class="fa fa-file" style="color: white"></i>
              {{message.content | renameFile()}}
            </a>
            <p v-else>{{message.content}}</p>
            <span class="msg_time_send">{{message.time| DAY()}}</span>
          </div>
          <div class="img_cont_msg">
            <img
              v-bind:src="'http://thuypm.tk:3000/user/' + message.sender +'.jpg'"
              class="rounded-circle user_img_msg"
            />
          </div>
        </div>
        <div class="d-flex justify-content-start mb-4" v-else>
          <div class="t_mimg_consg">
            <img
              v-bind:src="'http://thuypm.tk:3000/user/' + message.sender +'.jpg'"
              class="rounded-circle user_img_msg"
            />
          </div>
          <div v-if="message.type=='data:image'" class="msg_cotainer">
            <a :href="'http://thuypm.tk:3000/'+ message.content" target="_blank">
            <img :src="'http://thuypm.tk:3000/'+ message.content" style="max-width:160px" alt />
            </a>
            <span class="msg_time">{{message.time| DAY()}}</span>
          </div>
          <div v-else class="msg_cotainer">
            <a
              :href="'http://thuypm.tk:3000/'+ message.content"
              v-if="message.type!='text'"
              target="_blank"
            >
              <i class="fa fa-file" style="color: black"></i>
              {{message.content | renameFile()}}
            </a>
            <p v-else>{{message.content}}</p>
            <span class="msg_time">{{message.time| DAY()}}</span>
          </div>
          <!-- <div class="msg_cotainer">
            {{message.content}}
            <span class="msg_time">{{message.time| DAY()}}</span>
          </div>-->
        </div>
      </div>
      <div v-show="typing">
        <div class="d-flex justify-content-start mb-4">
          <div class="msg_cotainer" style="background-color: pink">
            <b>Đang nhập.....</b>
          </div>
        </div>
      </div>
    </div>

    <div class="card-footer">
      <div class="input-group">
        <div class="input-group-append" id="chooseFile">
          <span class="input-group-text attach_btn">
            <input v-on:change="fileChange" type="file" id="selectFile" style="display:none" />
            <i class="fa fa-paperclip"></i>
          </span>
        </div>
        <textarea
          name
          class="form-control type_msg"
          placeholder="Type your message..."
          @keyup="areTyping($event)"
          @keyup.enter="send"
          v-model="content"
        ></textarea>
        <div @click="send" class="input-group-append">
          <span class="input-group-text send_btn">
            <i class="fa fa-paper-plane"></i>
          </span>
        </div>
      </div>
      <div
        v-if="fileSend"
        class="preview"
        style="position:absolute;z-index:56; bottom:60px; background: #fff; width:100%;padding:15px 5px 15px 5px "
      >
        <div
          @click="fileSend=null"
          id="removeFile"
          style="color:red; position: absolute; right: 5px; padding:3px;top:0"
        >
          <i class="fa fa-times"></i>
        </div>
        <b>
          <i class="fa fa-file"></i>
          {{fileSend.name}}
        </b>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import io from 'socket.io-client';
// var socket = io.connect('http://thuypm.tk:3000');
var timeout;
export default {
  props: ["roomId", "socket"],
  name: "index",
  components: {},
  data() {
    return {
      isActive: false,
      selectMessID: "",
      friends: [],
      listMess: [],
      numberOfMess: Number,
      content: "",
      username: localStorage.username,
      typing: false,
      fileSend: null,
      page: 0
    };
  },
  mounted() {
    document.getElementById("chooseFile").addEventListener("click", () => {
      document.getElementById("selectFile").click();
    });
    var messageBox = document.getElementById("message");
    messageBox.onscroll = e => {
      // console.log(messageBox.scrollHeight );
      if (messageBox.scrollTop == 0) {
        this.page++;
        this.socket.emit("loadMess", this.roomId, this.page);
      }
    };
  },
  created() {
    this.loadData();

    this.socket.on("room-not-found", () => {
      alert("có lỗi xảy ra hoặc phòng không còn tồn tại");
      window.location.href = "/";
    });
    this.socket.on("loadMess", ibMess => {
      this.typing = false;
      var messageBox = document.getElementById("message");
      var tmp = messageBox.scrollHeight;
      if(ibMess.length)
      {
            this.listMess = ibMess.concat(this.listMess);
      if (this.page == 0)
        this.$nextTick(function() {
          messageBox.scrollTop = messageBox.scrollHeight;
        });
      else
        this.$nextTick(function() {
          messageBox.scrollTop = messageBox.scrollHeight - tmp;
        });
      }
  
    });

    this.socket.on("ib_mess", ibMess => {
      // console.log('new mess');
      this.listMess.push(ibMess);
      this.$nextTick(function() {
        var messageBox = document.getElementById("message");
        messageBox.scrollTop = messageBox.scrollHeight;
      });
    });
  },
  filters: {
    renameFile: function(data) {
      return data.slice(data.lastIndexOf("/") + 1, data.length);
    },
    DAY: function(time) {
      var d = new Date();
      var reTime = new Date(time);
      var time = reTime.getHours() + ":" + reTime.getMinutes();
      var day =
        reTime.getDate() +
        ",th " +
        (reTime.getMonth() + 1) +
        "," +
        reTime.getFullYear();
      return time + "  " + day;
    }
  },
  methods: {
    fileChange(event) {
      var input = event.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(input[0]);
      reader.onload = e => {
        // console.log(event.target.files[0].name);
        this.fileSend = {
          name: event.target.files[0].name,
          content: e.target.result
        };

        // console.log(this.fileSend.content);
      };
    },
    loadData() {
      this.socket.emit("loadMess", this.roomId, 0);
    },
    send() {
      var d = new Date();
      var utc = d.getTime();

      if (this.content.trim() != "" || this.fileSend) {
        if (this.fileSend) {
          this.socket.emit("send_mess", this.roomId, this.fileSend.content, {
            type: "text",
            content: this.content.trim(),
            sender: this.username,
            time: utc
          });
        } else
          this.socket.emit("send_mess", this.roomId, null, {
            type: "text",
            content: this.content.trim(),
            sender: this.username,
            time: utc
          });

        this.content = "";
        this.fileSend = null;
      }
    },
    areTyping(event) {
      // 	var self = this;
      // 	if(event.keyCode != 13 && event.which != 13)
      // {	 socket.emit('typing' , self.username, self.selectMessID, true);
      //     if(timeout)
      //     	clearTimeout(timeout);
      // 		   timeout = setTimeout(function(){
      // 				socket.emit("typing",self.username, self.selectMessID, false)
      // 			}, 3000);
      // 	   }
    }
    // },
  }
};
</script>
<style  scoped>
.card {
  /* height: 700px; */
  height: 100vh;
  /* border-radius: 15px !important; */
  background-color: #f3f4f4;
}
.card-body {
  padding: 0.25rem;
}
p {
  margin: 0;
}
#removeFile:hover {
  cursor: pointer;
  border: 1px solid;
}

.card-body {
  overflow-y: scroll;
}
.type_msg {
  border: 0;
}
.card-footer {
  /* border: 1px solid #2c3e50 */
}
.input-group {
  border-radius: 0;
}
.input-group-text {
  background: #2c3e50;
  color: #fff;
  border-radius: 0;
}
.input-group-text:hover {
  background-color: #435f7a;
}
.user_img_msg {
  object-fit: cover;
  height: 40px;
  width: 40px;
  border: 1.5px solid #f5f6fa;
}
.msg_cotainer {
  min-width: 85px;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  /* border-radius: 5px; */
  background-color: #ffffff;
  padding: 10px;
  position: relative;
}
.msg_cotainer_send {
  min-width: 85px;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  /* border-radius: 5px; */
  background-color: #2c3e50;
  color: #fff;
  padding: 10px;
  position: relative;
}
.msg_time {
  position: absolute;
  left: 0;
  bottom: -15px;
  color: #000;
  font-size: 10px;
}
.msg_time_send {
  position: absolute;
  right: 0;
  bottom: -15px;
  color: #000;
  font-size: 10px;
}
.msg_head {
  position: relative;
}
</style>