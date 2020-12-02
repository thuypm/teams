<template>
  <transition name="popup-fade">
    <div class="bottom-notice" style="margin-top: 20px" @click="gotoNotice()">
      <div style="background: #dc3545">
        <h5 style="padding: ; color: #fff">
          <b>Thông báo</b>
        </h5>
      </div>
      <p style="padding: 2%; text-align: left; font-size: 15px">
        {{ notice.content }}
      </p>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["notice"],
  data() {
    return {};
  },
  methods: {
    gotoNotice() {
      console.log(this.notice);
      location.href = this.notice.link;
    },
  },
};
</script>
<style  scoped>
</style>