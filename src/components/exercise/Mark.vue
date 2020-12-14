<template>
  <div class="col-2">
    <h3 style="margin-bottom: 10%">
      <b>Cho điểm, đánh giá</b>
    </h3>
    <div>
      <form style="text-align: left" v-if="admin && selectedSubmit">
        <h5>Điểm số</h5>
        <input
          type="text"
          placeholder="Điểm"
          style="width: 100%"
          v-model="selectedSubmit.point"
        />
        <h5 style="padding-top: 20px">
          Đánh giá cho bài tập của <b> {{ selectedSubmit.username }}</b>
        </h5>
        <textarea
          name
          placeholder="Nhận xét"
          style="width: 100%"
          rows="5"
          v-model="selectedSubmit.evaluate"
        ></textarea>
        <button type="button" class="btn btn-success" @click="mark">Cập nhật</button>
      </form>
      <div style="text-align: left" v-if="!admin && selectedSubmit">
        <h5><b> Điểm số: </b>{{ selectedSubmit.point }}</h5>
        <hr />
        <h5 style="padding-top: 20px">
          <b> Đánh giá của GV: </b>{{ selectedSubmit.evaluate }}
        </h5>
        <!-- <p style="color: black">{{selectedSubmit.}}</p> -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "Mark",
  props: ["admin", "selectedSubmit"],
  methods: {
    mark: ()=>{
      // axios.get()
    }
  }
};
</script>
<style scoped>
</style>