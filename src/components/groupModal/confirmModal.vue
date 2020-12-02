<template>
  <transition name="modal-fade">
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot name="body">
            <H3 v-if="option==1">Bạn muốn rời nhóm <b>{{group.name}}</b>  ?</H3>
            <H3 v-else>Bạn muốn xóa nhóm <b>{{group.name}}</b> ?</H3>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button id="cls" class="btn btn-dark" @click="$emit('close', false)">Hủy</button>
            <button @click="$emit('confirm-del', false)" class="btn btn-primary">Xác nhận</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
 import axios from 'axios'
 var timeout;
export default {
       props:['group', 'option'],
       data(){
           return{
            axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token
        }
      },
      message: "",
      username: localStorage.username,
           }},
           methods: {
             submit()
             {
               
             }
           }
               

}
     
</script>
