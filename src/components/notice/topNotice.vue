<template>
  <transition name="popup-fade">
    <div class="top-notice" style="margin-top: 20px">
      <div style="background: purple">
        <h5 style="padding: 5px; color: #fff">
          <b>Chú ý</b>
        </h5>
      </div>
      <h4 style="padding: 10px 5px 5px 5px">{{ content }}</h4>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["content"],
  data() {
    return {};
  },
};
</script>