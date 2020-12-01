<template>
  <div class="row">
    <div
      style="text-align: left; width: 60%; margin-left: 20%; background-color: "
    >
      <ul class="event-list">
        <h4 style="margin-bottom: 20px"><b>Thông báo của bạn</b></h4>
        <li v-for="(notice, id) in notification" :key="id" @click="gotoLink(notice.link)">
          
          <img  v-bind:src="'http://thuypm.tk:3000/user/'+notice.from+'.jpg'"  class="rounded-circle" />
          
          <div class="info">
            <h4 class="title">{{ notice.content }} </h4>
            
            <p class="desc">{{notice.time}}</p>
          </div>
          <div class="social">
            <ul>
              <li class="facebook" style="width: 33%">
                <a><span class="fa fa-times"></span></a>
              </li>
               <span class="fas fa-circle" style="color:red" v-if="!notice.seen"></span>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ['socket'],
  components: {},
  data() {
    return {
      username: localStorage.username,
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token,
        },
      },
      notification: [],
    };
  },
  methods:{
	  gotoLink(link)
	  {
		  window.location.href = link;
	  }
  },
  created() {
    axios
      .post(
        "http://thuypm.tk:3000/user/getUser",
        { username: this.username },
        this.axiosConfig
      )
      .then((res) => {;
        this.notification = res.data.notification;
      });
      
  },
  beforeDestroy()
  {
   this.socket.emit("seenNotice",this.username, "all"); 
  }
};
</script>
<style scoped>
.event-list {
  list-style: none;
  font-family: "Lato", sans-serif;
  margin: 0px;
  margin-top: 0.5%;
  padding: 5%;
}
.event-list > li {
  background-color: rgb(255, 255, 255);
  /* box-shadow: 0px  5px rgb(51, 51, 51); */
  /* box-shadow:  2px 2px 2px rgba(51, 51, 51, 0.7); */
  border-top: 1px solid #1f0127;
  padding: 0px;
  margin: 5px;
}
.event-list > li:hover {
  cursor: pointer;
  background-color: rgb(245, 245, 245);
}

.event-list > li > .info {
  padding-top: 5px;
  text-align: center;
}
.event-list > li > .info > .title {
  font-size: 17pt;
  font-weight: 700;
  margin: 0px;
}
.event-list > li > .info > .desc {
  font-size: 13pt;
  font-weight: 300;
  margin: 0px;
}
.event-list > li > .info > ul,
.event-list > li > .social > ul {
  display: table;
  list-style: none;
  margin: 10px 0px 0px;
  padding: 0px;
  width: 100%;
  text-align: center;
}
.event-list > li > .social > ul {
  margin: 0px;
}
.event-list > li > .info > ul > li,
.event-list > li > .social > ul > li {
  display: table-cell;
  cursor: pointer;
  color: rgb(30, 30, 30);
  font-size: 11pt;
  font-weight: 300;
  padding: 3px 0px;
}
.event-list > li > .info > ul > li > a {
  display: block;
  width: 100%;
  color: rgb(30, 30, 30);
  text-decoration: none;
}
.event-list > li > .social > ul > li {
  padding: 0px;
}
.event-list > li > .social > ul > li > a {
  padding: 3px 0px;
}
.event-list > li > .info > ul > li:hover,
.event-list > li > .social > ul > li:hover {
  color: rgb(30, 30, 30);
  background-color: rgb(200, 200, 200);
}
.facebook a,
.twitter a,
.google-plus a {
  display: block;
  width: 100%;
  color: rgb(75, 110, 168) !important;
}

.facebook:hover a {
  color: rgb(255, 255, 255) !important;
  background-color: #2c3e50 !important;
}
.twitter:hover a {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(79, 213, 248) !important;
}
.google-plus:hover a {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(221, 75, 57) !important;
}

@media (min-width: 768px) {
  .event-list > li {
    position: relative;
    display: block;
    width: 100%;
    height: 70px;
    padding: 6px;
    margin: 5px;
  }
  .event-list > li > time,
  .event-list > li > img {
  }
  .event-list > li > time,
  .event-list > li > img {
    float: left;
  }
  .event-list > li > .info {
    /* background-color: rgb(245, 245, 245); */
    overflow: hidden;
  }
  .event-list > li > time,
  .event-list > li > img {
    width: 58px;
    height: 58px;
    padding: 0px;
  }
  .event-list > li > .info {
    position: relative;
    height: 70px;
    text-align: left;
    padding-right: 40px;
  }
  .event-list > li > .info > .title,
  .event-list > li > .info > .desc {
    padding: 0px 10px;
  }
  .event-list > li > .info > ul {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
  .event-list > li > .social {
    position: absolute;
    top: 0px;
    right: 0px;
    display: block;
    width: 40px;
  }
  .event-list > li > .social > ul > li {
    display: block;
    padding: 0px;
  }
  .event-list > li > .social > ul > li > a {
    display: block;
    width: 40px;
    padding: 10px 0px 9px;
  }
}
</style>

