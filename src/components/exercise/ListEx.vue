<template>
  <div class="col-3">
    <div class="row-mid" style="min-height: 47%">
      <div class="head-title">
        <span style="" class="title">
          <b>
            Bài tập hiện tại
          </b>
        </span>
        <span class="right-btn">
          <button
            @click="openDialog"
            v-if="admin"
            class="btn btn-outline-success"
          >
            <i class="fa fa-plus"></i>
            Thêm mới
          </button>
        </span>
      </div>
      <div class="single category">
        <ul class="list-unstyled">
          <li
            v-for="(ex, id) in availableEx"
            :key="id"
            @click="selectEx(ex, id, 1)"
            :class="{ active: selectedId == id && selectedTime == 1 }"
          >
            <a title="">{{ ex.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="row-mid">
      <p class="title">
        <b>
          Bài tập đã hết hạn
        </b>
      </p>
      <div class="single category">
        <ul class="list-unstyled">
          <li
            v-for="(ex, id) in expiredEx"
            :key="id"
            @click="selectEx(ex, id, 2)"
            :class="{ active: selectedId == id && selectedTime == 2 }"
          >
            <a title="">{{ ex.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ListEx",
  props: ["listEx", "admin"],
  data() {
    return {
      selectedId: -1,
      selectedTime: -1,
    };
  },
  computed: {
    availableEx: function () {
      var now = new Date().getTime();
      return this.listEx.filter((item) => item.deadline > now);
    },
    expiredEx: function () {
      var now = new Date().getTime();
      return this.listEx.filter((item) => item.deadline < now);
    },
  },
  methods: {
    openDialog() {
      this.$emit("newEx");
    },
    selectEx(ex, id, opts) {
      this.selectedId = id;
      this.selectedTime = opts;
      this.$emit("selectEx", ex, id);
    },
  },
};
</script>
<style scoped>
.right-btn{
    position: absolute; right: 0px;
}
.head-title{
  text-align: left;
  margin-bottom: 15px
}
.row-mid {
  overflow-y: auto;
  height: 50%;
}
.title {
  text-align: left;
  color: black;
  padding: 5px;
}
.single ul {
  margin-bottom: 0;
}
.single li a {
  color: #000;
  font-size: 14px;
  text-transform: uppercase;
  border-bottom: 1px solid #f0f0f0;
  line-height: 40px;
  display: block;
  text-decoration: none;
}
.single li:hover {
  background: #cff0bc;
  cursor: pointer;
}
.single li {
  border-top: 1px solid rgb(189, 185, 185);
}
.active {
  background: #f0f0ff;
}
</style>