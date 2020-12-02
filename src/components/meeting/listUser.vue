<template>
  <div class="card">
    <div style="padding:3px">
      <input v-model="userSearch" @keyup="findUser()" type="text" class="form-control" placeholder="Tìm ai đó" />
    </div>
	    <div v-if="showNotice" class="notice" style="margin-top: 20px">
      <div style="background: #2c3e50">
        <h5 style="padding: 5px;color: #fff"><b>Thông báo</b> </h5>
      </div >
      <h4 style="padding: 10px 5px 5px 5px">{{showNotice}}</h4>
    </div>
    <ul class="contacts">
      <li v-for="(usr, index) in membersView" :key="index" v-bind:id="usr.username" style="margin:0 !important;border-bottom: 1px solid black">
        <div class="d-flex bd-highlight">
          <div class="img_cont">
            <img
              v-bind:src="API_HOST+'/user/'+usr+'.jpg'"
              class="rounded-circle user_img"
            />
            <!-- <span class="online_icon"></span> -->
          </div>
          <div class="user_info" style="padding-top:5px">
            <span>{{usr}}</span>
            <!-- <p>sửa sau</p> -->
          </div>
          <div class="ml-auto" style="padding-top:5px">
            <!-- <button class="btn btn-outline-secondary"><i class="fa fa-microphone" ></i>   </button> -->
            <button
              v-if="owner==username"
              @click="deleteUser(usr, index)"
              class="btn btn-outline-danger"
            >
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
     
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["roomId"],
  data() {
    return {
      API_HOST: process.env.API_HOST,
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token
        }
	  },
	  userSearch: "",
	  showNotice: false,
      micro: false,
      username: localStorage.username,
      owner: "",
	  membersView: [],
	  members: []
    };
  },
  created() {
    this.loadData();
  },

  methods: {
    loadData() {
      axios
        .post(
          process.env.API_HOST+"room/getRoom",
          { roomId: this.roomId },
          this.axiosConfig
        )
        .then(res => {
          // console.log(res.data);
          this.owner = res.data.owner;
		  this.members = res.data.members;
		  this.membersView = res.data.members.slice(0, res.data.members.length);
        });
	},
	findUser()
	{
		this.membersView=[];
				 for (var j=0; j<this.members.length; j++) {
							if (this.members[j].match(this.userSearch)) 
						this.membersView.push(this.members[j]);
   }
	},
	Notice(notice) {
      this.showNotice = notice;
      setTimeout(() => {
        this.showNotice = "";
      }, 2000);
    },
    deleteUser(user, id) {
      var upLen = {
        action: 2,
        roomId: this.roomId,
        username: this.username,
        members: [user]
      };
      axios
        .post(process.env.API_HOST+"room/editRoom", upLen, this.axiosConfig)
        .then(res => {
			if(res.data)
				{
					this.Notice("Đã xóa " + user);
					this.members.splice(id, 1);
				
				}
		});
    }
  }
};
</script>
<style  scoped>
.user_info {
  font-family: "proxima-nova", "Source Sans Pro", sans-serif;
  font-size: 18px;
}
.card{
	height: 100vh;
}
.img_cont {
  position: relative;
  /* height: 70px;
			width: 70px; */
}
/* .online_icon {
  position: absolute;
  height: 10px;
  width: 10px;
  background-color: #4cd137;
  border-radius: 50%;
  bottom: 0em;
  right: 0.3em;
  border: 1.5px solid white;
}
.offline {
  background-color: #c23616 !important;
} */
.user_img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border: 2px solid #fff;
}
.contacts {
  padding: 0;
}
.user_info {
  padding-left: 5px;
}
.contacts li {
  width: 100% !important;
  padding: 5px;
  margin-bottom: 15px !important;
  list-style-type: none;
}
.contacts li:hover {
  background: #F3F4F4
}
</style>