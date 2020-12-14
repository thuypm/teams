<style>
  @import './modal.css';
</style>
<template>
<transition name="modal-fade">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <div name="header" style="width:100%">
            <p class="input-title">Tên bài tập</p>
            <input
              v-model="selectedEx.name"
              type="text"
              class="form-data"
              style="width: 100%"
              placeholder="Tên bài tập"
            />
          </div>
        </div>
        <div class="modal-body">
          <slot name="body">
            <p class="input-title">Mô tả</p>
            <textarea
              rows="3"
              type="text"
              v-model="selectedEx.description"
              style="width: 100%"
              placeholder="Mô tả"
            />
            <div>
              <p class="input-title">Ngày hết hạn</p>
              <input type="time" v-model="timeExpired" />
              <input type="date" v-model="dateExpired" />
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
  </transition>
</template>

<script>
import axios from "axios";
var timeout;
export default {
  props: ["selectedEx"],
  data() {
    return {
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token,
        },
      },
      dateExpired: (new Date()).toISOString().split('T')[0],
      timeExpired: "23:00",
    };
  },
  created(){
    if(this.selectedEx.deadline)
    {
      var d = new Date(this.selectedEx.deadline);
      this.dateExpired = d.toISOString().split('T')[0];
      this.timeExpired = d.toLocaleString().slice(0,5);
    }
  },
  methods: {
    submit()
    {
     var newEx = {...this.selectedEx};
     var d = new Date(this.dateExpired + "T" + this.timeExpired);
     newEx.deadline = d.getTime();
      this.$emit('Ex', newEx);
    }
  },
};
</script>
<style  scoped>

</style>