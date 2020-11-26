<style>
@import "./modal.css";
</style>
<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <input
              v-if="!groupJoin"
              v-model="nameOfGroup"
              type="text"
              class="form-data"
              style="width: 100%"
              placeholder="Tên nhóm"
            />
            <h6 v-if="groupJoin" style="text-align: center">
              Nhóm: <b>{{ groupJoin.name }}</b>
            </h6>
          </slot>
        </div>
        <!-- <div class="modal-body">
                                <slot name="body">
                               {{groupCodeJoin}}
                                </slot>
                            </div> -->
        <div class="modal-body">
          <slot name="body">
            <input
              type="text"
              v-model="userSearch"
              @keyup="findUser()"
              class="form-data"
              placeholder="Thêm người"
            />
            <!-- <button class="btn btn-success" style="width:15%" @click="addUser()" ><i class="fa fa-plus"></i></button> -->
            <div v-if="userSearch" class="arrUsr">
              <p v-if="!notFind">Không tìm thấy hoặc người này đã thêm</p>
              <p
                v-for="(usr, id) in listUserSearch"
                :key="id"
                @click="addUser(usr)"
                class="usr-in"
              >
                {{ usr }}
              </p>
            </div>
            <!-- <div v-if="errFind" style="background-color:pink; padding:5px, margin:3px" > {{errFind}} <i class="fa fa-warning"></i> </div> -->

            <div class="listUser">
              <span
                v-for="(usr, index) in listUserPush"
                :key="index"
                @click="listUserPush.splice(index, 1)"
                class="user-in"
                >{{ usr }} <i class="fa fa-trash"></i
              ></span>
            </div>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button
              id="cls"
              class="btn btn-dark"
              @click="$emit('close', false)"
            >
              Đóng
            </button>
            <button @click="submit()" class="btn btn-primary">Xác nhận</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var timeout;
export default {
  props: ["groupJoin"],

  data() {
    return {
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token,
        },
      },
      listUserSearch: [],
      username: localStorage.username,
      listUserPush: [],
      nameOfGroup: "",
      userSearch: "",
      notFind: 1,
    };
  },
  methods: {
    findUser() {
      this.notFind = 1;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.findServer();
      }, 700);
    },
    findServer() {
      this.listUserSearch = [];
      if (this.userSearch.trim())
        axios
          .post(
            "http://thuypm.tk:3000/user/search",
            { username: this.userSearch },
            this.axiosConfig
          )
          .then((res) => {
            var arr = [];
            for (var i in res.data) {
              if (res.data[i].username != this.username)
                if (!this.groupJoin) {
                  if (this.listUserPush.indexOf(res.data[i].username) == -1)
                    arr.push(res.data[i].username);
                } else if (
                  this.listUserPush.indexOf(res.data[i].username) == -1 &&
                  this.groupJoin.members.indexOf(res.data[i].username) == -1
                )
                  arr.push(res.data[i].username);
            }
            this.listUserSearch = arr;
            this.notFind = arr.length;
          });
      else this.listUserSearch = [];
    },
    addUser(usr) {
      this.userSearch = "";
      this.listUserPush.push(usr);
      this.listUserSearch = [];
    },

    submit() {
      var upLen;
      if (this.groupJoin) {
        upLen = {
          roomId: this.groupJoin._id,
          members: this.listUserPush,
          action: 1,
        };
      } else {
        upLen = {
          owner: this.username,
          name: this.nameOfGroup,
          members: this.listUserPush,
          action: 0,
        };
      }
      axios
        .post("http://thuypm.tk:3000/room/editRoom", upLen, this.axiosConfig)
        .then((res) => {
          if (res.data) {
            this.$emit("editGroup", res.data);
          }
        });
    },
    remove(usr) {
      this.listUserPush.splice(this.listUserPush.indexOf(usr));
    },
  },
};
</script>
