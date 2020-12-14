<template>
  <div class="nav-side-menu">
    <div class="brand">TEAMS</div>

    <div class="menu-drop">
        <transition name="modal-fade">
        <div class="menu-list-drop" style="display: none">
          
          <ul>
            <router-link :to="{ name: 'notification' }" style="color: #fff">
              <li
                :class="{ active: uri == '/notification' }"
                @click="uri = '/notification'"
              >
                <i class="fa fa-bell"></i>
                <span>Thông báo</span>
                <span class="badge" v-if="numOfNotice">{{
                  numOfNotice > 5 ? "5+" : numOfNotice
                }}</span>
              </li>
            </router-link>
            <router-link :to="{ name: 'chat' }" style="color: #fff">
              <li :class="{ active: uri == '/chat' }" @click="uri = '/chat'">
                <i class="fa fa-comments"></i>
                <span>Trò chuyện</span>
              </li>
            </router-link>
            <router-link :to="{ name: 'allGroup' }" style="color: #fff">
              <li
                :class="{
                  active:
                    uri == '/allGroup' ||
                    uri == '/' ||
                    uri.indexOf('meeting') != -1,
                }"
                @click="uri = '/allGroup'"
              >
                <i class="fa fa-users"></i>
                <span>&nbsp; Nhóm &nbsp;</span>
              </li>
            </router-link>
            <router-link :to="{ name: 'file' }" style="color: #fff">
              <li :class="{ active: uri == '/file' }" @click="uri = '/file'">
                <i class="fa fa-file"></i>

                <span>&nbsp; &nbsp; &nbsp; Tệp &nbsp; &nbsp;</span>
              </li>
            </router-link>
            <router-link :to="{ name: 'exercise' }" style="color: #fff">
              <li
                :class="{
                  active: uri.indexOf('ex') != -1,
                }"
                @click="uri = '/ex'"
              >
                <i class="fa fa-book"></i>

                <span>&nbsp; &nbsp; Bài tập &nbsp;</span>
              </li>
            </router-link>
          </ul>
        </div>
      </transition>
      <div id="drop-menu">
        <b style="font-size: 30px">...</b>
      </div>
    </div>

    <div class="menu-list">
      <ul id="menu-content" class="menu-content collapse out">
        <router-link :to="{ name: 'notification' }" style="color: #fff">
          <li
            :class="{ active: uri == '/notification' }"
            @click="
              uri = '/notification';
              $emit('seen-notice');
            "
            style="position: relative"
          >
            <div>
              <i class="fa fa-bell fa-lg"></i>
              <span class="badge" v-if="numOfNotice">{{
                numOfNotice > 5 ? "5+" : numOfNotice
              }}</span>
            </div>
            <span>Thông báo</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'chat' }" style="color: #fff">
          <li :class="{ active: uri == '/chat' }" @click="uri = '/chat'">
            <div>
              <i class="fa fa-comments fa-lg"></i>
            </div>
            <span>Trò chuyện</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'allGroup' }" style="color: #fff">
          <li
            :class="{
              active:
                uri == '/allGroup' ||
                uri == '/' ||
                uri.indexOf('meeting') != -1,
            }"
            @click="uri = '/allGroup'"
          >
            <div>
              <i class="fa fa-users fa-lg"></i>
            </div>
            <span>Nhóm</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'file' }" style="color: #fff">
          <li :class="{ active: uri == '/file' }" @click="uri = '/file'">
            <div>
              <i class="fa fa-file fa-lg"></i>
            </div>
            <span>Tệp</span>
          </li>
        </router-link>
        <router-link :to="{ name: 'exercise' }" style="color: #fff">
          <li
            :class="{
              active: uri.indexOf('ex') != -1,
            }"
            @click="uri = '/exercise'"
          >
            <div>
              <i class="fa fa-book fa-lg"></i>
            </div>
            <span>Bài tập</span>
          </li>
        </router-link>
      </ul>
    </div>
    <div class="menu-footer">
      <ul>
        <input
          v-on:change="imgChange"
          type="file"
          id="selectAvatar"
          style="display: none"
          accept="image/*"
        />
        <img :src="avatar" class="rounded-circle user_img_msg" />
        <div id="setAvatar">
          <i class="fa fa-camera"></i>
        </div>

        <li class @click="signout()">
          <a href="#">
            <div>
              <i class="fa fa-sign-out-alt fa-lg"></i>
            </div>
            <span>Đăng xuất</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["numOfNotice"],
  data() {
    return {
      uri: "/",
      username: localStorage.username,
      userAvatar: null,
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token,
        },
      },
      avatar: "",
    };
  },
  mounted() {
    // console.log(this.uri);
    document.getElementById("setAvatar").addEventListener("click", () => {
      document.getElementById("selectAvatar").click();
    });
    var hovr = document.getElementsByClassName("menu-drop")[0];
    hovr.addEventListener("mouseover", () => {
      document.getElementsByClassName("menu-list-drop")[0].style.display =
        "block";
      document.getElementById("drop-menu").style.background = "#4f5b69";
    });
    hovr.addEventListener("mouseout", () => {
      document.getElementsByClassName("menu-list-drop")[0].style.display =
        "none";
      document.getElementById("drop-menu").style.background = "none";
    });
  },
  created() {
    this.avatar = process.env.API_HOST + "user/" + this.username + ".jpg";
  },
  methods: {
    imgChange(event) {
      //chọn ảnh tải lên
      const reader = new FileReader();
      var input = event.target.files[0];
      var formData = new FormData();
      formData.append("avatar", input);
      formData.append("username", this.username);
      axios
        .post(process.env.API_HOST + "user/avatar", formData, this.axiosConfig)
        .then((res) => {
          reader.readAsDataURL(input);
          reader.onload = (e) => {
            this.avatar = e.target.result;
          };
          // console.log(res);
        });
    },
    signout() {
      localStorage.clear();
      window.location.href = "/";
    },
  },
};
</script>
<style  scoped>
.badge {
  position: absolute;
  top: 5px;
  right: 10px;
  border-radius: 50%;
  background: red;
  color: white;
}
ul a {
  text-decoration: none;
  color: #fff;
}
.menu-list-drop ul li {
  padding: 3px;
}
.menu-list-drop {
  background: #2e353d;
  z-index: 999;
  position: fixed;
  left: 77px;
}
#setAvatar {
  position: absolute;
  background-color: black;
  color: white;
  /* padding-top: 7px; */
  bottom: 69px;
  border-radius: 0 0 30px 30px;
  right: 6px;
  opacity: 0;
  width: 65px;
  height: 40px;
  -webkit-transition: opacity 1s; /* Safari */
  transition: opacity 1s;
}
#setAvatar:hover {
  opacity: 1;
}
.nav-side-menu {
  width: 77px;
  overflow: auto;
  font-size: 12px;
  font-weight: 200;
  background-color: #2e353d;
  position: fixed;
  top: 0px;
  height: 100vh;
  color: #e1ffff;
}
.user_img_msg {
  object-fit: cover;
  width: 65px;
  height: 65px;
}
.nav-side-menu .brand {
  background-color: #23282e;
  line-height: 50px;
  display: block;
  /* text-align: center; */
  font-size: 14px;
}
.nav-side-menu .toggle-btn {
  display: none;
}
.nav-side-menu ul,
.nav-side-menu li {
  list-style: none;
  padding: 0px;
  margin: 0px;
  line-height: 35px;
  cursor: pointer;
}
.nav-side-menu ul :not(collapsed) .arrow:before,
.nav-side-menu li :not(collapsed) .arrow:before {
  font-family: FontAwesome;
  content: "\f078";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
  /* float: right; */
}
#drop-menu {
  width: 77px;
  height: 75px;
}
/* .menu-drop #drop-menu:hover{
  background-color: #4f5b69;
    -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
  cursor: pointer;
} */
.nav-side-menu ul .active,
.nav-side-menu li .active {
  border-left: 3px solid #d19b3d;
  background-color: #4f5b69;
}
.nav-side-menu ul .sub-menu li.active,
.nav-side-menu li .sub-menu li.active {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li.active a,
.nav-side-menu li .sub-menu li.active a {
  color: #d19b3d;
}
.nav-side-menu ul .sub-menu li,
.nav-side-menu li .sub-menu li {
  background-color: #181c20;
  border: none;
  line-height: 28px;
  border-bottom: 1px solid #23282e;
  margin-left: 0px;
}
.nav-side-menu ul .sub-menu li:hover,
.nav-side-menu li .sub-menu li:hover {
  background-color: #020203;
}
.nav-side-menu ul .sub-menu li:before,
.nav-side-menu li .sub-menu li:before {
  font-family: FontAwesome;
  content: "\f105";
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
}
.nav-side-menu li {
  padding-left: 0px;
  border-left: 3px solid #2e353d;
  border-bottom: 1px solid #23282e;
}
.nav-side-menu li a {
  text-decoration: none;
  color: #e1ffff;
}
.nav-side-menu li a i {
}
.nav-side-menu li:hover {
  border-left: 3px solid #d19b3d;
  background-color: #4f5b69;
  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
}

.brand {
  text-align: left !important;
  font-size: 22px;
  padding-left: 20px;
  line-height: 50px !important;
}

.menu-list {
  /* height:79vh; */
}
.menu-footer {
  /* height:12vh */
  /* top:700px !important; */
  padding-top: calc(100vh - 540px);
}
/* @media (max-width: 767px) {
  .nav-side-menu {
    position: relative;
    margin-bottom: 10px;
  }
} */
.menu-drop {
  display: none;

}
@media (min-width: 767px) {
  .nav-side-menu .menu-list .menu-content {
    display: block;
  }
}
@media (max-height: 540px) {
  .menu-list {
    display: none;
  }
  .menu-footer {
    /* height:12vh */
    /* top:700px !important; */
    padding-top: calc(100vh - 270px);
  }
  .menu-drop {
    display: block;

  }
}
</style>