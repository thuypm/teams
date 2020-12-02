<style>
@import "./modal.css";
</style>
<template>
  <transition name="modal-fade">
    <div class="modal-mask">
      <Loading
        :active.sync="isLoading"
        :can-cancel="true"
        :color="'blue'"
        :opacity="0.7"
        :is-full-page="true"
      ></Loading>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <div name="header" style="width: 100%">
              <p class="input-title">Nộp bài</p>
            </div>
          </div>
          <div class="modal-body">
            <slot name="body">
              <div>
                <input
                  type="file"
                  class="form-data"
                  style="width: 100%"
                  placeholder="upload file"
                  @change="filesChange($event.target)"
                />
              </div>
              <hr />
              <p v-if="err" style="text-align: left; color: red">
                <i class="fa fa-exclamation-triangle" style=""></i> {{ err }}
              </p>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button id="cls" class="btn btn-dark" @click="$emit('close')">
                Đóng
              </button>
              <button class="btn btn-primary" @click="submit()">
                Xác nhận
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
export default {
  props: ["selectedEx"],
  name: "submit",
  data() {
    return {
      isLoading: false,
      username: localStorage.username,
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token,
        },
      },
      file: null,
      err: "",
    };
  },
  methods: {
    filesChange(e) {
      (this.err = ""), (this.file = e.files[0]);
    },
    submit() {
      if (!this.file) {
        this.err = "Bạn chưa chọn file nào";
        return;
      }
      this.err = "";
      var formData = new FormData();
      formData.append("username", this.username);
      formData.append("idEx", this.selectedEx.exId);
      formData.append("submit", this.file);
      this.isLoading = true;
      axios
        .post(process.env.API_HOST+"ex/submit", formData, this.axiosConfig)
        .then((res) => {
          this.isLoading = false;
          this.$emit("submit-success", res.data);
        });
    },
  },
};
</script>