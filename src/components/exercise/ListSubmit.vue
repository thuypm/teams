<template>
  <div class="col-7" style="text-align: left">
    <div class="">
      <h3 style class="title">
        <b> Danh sách bài nộp </b>
      </h3>
      <div class="list-ex">
        <div class="row" v-if="selectedEx.exId">
          <div class="col-6">
            <h5>
              Tên bài tập: <b>{{ selectedEx.name }}</b>
            </h5>
            <p>
              Mô tả <b>{{ selectedEx.description }}</b>
            </p>
          </div>
          <div class="col-6">
            <h6>
              Hạn nộp: <b>{{ selectedEx.deadline | showTime }}</b>
            </h6>
            <button class="btn btn-primary" @click="editEx" v-if="admin">
              <i class="fas fa-edit" aria-hidden="true"></i> Chỉnh sửa
            </button>
            <button
              class="btn btn-primary"
              @click="$emit('open-submit-form')"
              v-else
            >
              <i class="fas fa-paper-plane" aria-hidden="true"></i> Nộp bài
            </button>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Bài nộp</th>
              <th>Người nộp</th>
              <th>Thời gian nộp</th>
              <th>Điểm</th>
              <th v-if="!admin">Xóa</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="table-secondary"
              v-for="(subm, id) in allSubmission.submission"
              :key="id"
              :class="{ active: selectedId == id }"
              @click="selectSubmit(subm, id)"
            >
              <td>
                <a
                  :href="process.env.API_HOST + subm.file"
                  target="_blank"
                  >{{ subm.file | showFile() }}</a
                >
              </td>
              <td>{{ subm.username }}</td>
              <td>{{ subm.time | showTime() }}
                <span style="color: red" v-if="subm.time > selectedEx.deadline" >(muộn)</span>
              </td>
              <td>{{ subm.point }}</td>
              <td v-if="!admin">
                <button class="btn btn-outline-danger">
                  <i class="fa fa-trash"></i>
                </button>
              </td>
            </tr>
            <!-- <tr class="table-light">
              <td>Light</td>
              <td>Angie</td>
              <td>p</td>
              <td>s</td>
            </tr> -->
          </tbody>
        </table>

        <!-- <ul class="list-group">
              <li class="list-group-item list-group-item-info">
                 <a href="">Link file</a>
                  <p>thuypm{{}}</p>
              </li>
              <li class="list-group-item list-group-item-light">This is a light list group item</li>
              </ul>-->
      </div>
    </div>
    <!-- <hr> -->
  </div>
</template>
<script>
export default {
  name: "ListSubmit",
  props: ["selectedEx", "allSubmission", "admin"],
  data(){
    return{
      selectedId: -1,
    }
  },
  filters: {
    showTime: function (numberTime) {
      var d = new Date(numberTime);
      return d.toLocaleString();
    },
    showFile: function (file) {
      var str = file.slice(file.lastIndexOf("/") + 1);
      if (str.length > 18) {
        var exten = str.slice(str.lastIndexOf("."), str.lastIndexOf(".") + 5);
        var fileName = str.slice(0, 15 - exten.length) + "...";
        str = fileName + exten;
      }
      return str;
    },
  },
  // watch: {
  //   selectedEx: function () {
  //     // alert("select");
  //   },
  // },
  methods: {
    selectSubmit(subm, id)
    {
      this.selectedId = id;
      this.$emit('select-submit', subm, id);
    },
    editEx() {
      this.$emit("editEx");
    },
  },
};
</script>
<style scoped>
.list-ex {
  height: calc(100vh - 50px);
  overflow-y: scroll;
}
.table-secondary,
.table-secondary > td,
.table-secondary > th {
  background-color: #fff;
}
.table-secondary:hover td {
  background-color: #cff0bc;
  cursor: pointer;
}
.active td {
  background-color: #f2f2f2;
}
thead > tr {
  background-color: #f2f2f2;
}
</style>