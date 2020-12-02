<template>
 <div class="row">

    <div class="col-11custom">
      <div class="row">
        <div class="col-8" style="text-align: left">
          <div class="row-mid">
            <h3 style class="title">
              <b>
                Bài tập hiện tại
                <i class="fa fa-arrow-right"></i>
              </b>
            </h3>
            <div class="list-ex">
                  <div class="row">
                <div class="col-6">
                  <h5>
                    <b>Tên bài tập{{}}</b>
                  </h5>
                  <p>Mô tả{{}}</p>
                </div>
                <div class="col-6">
                  <h6>Hạn nộp:</h6>
                  <button class="btn btn-primary">
                    <i class="fas fa-edit" aria-hidden="true"></i> Chỉnh sửa
                  </button>
                </div>
              </div>
   
              <table class="table">
                <thead>
                  <tr>
                    <th>Bài nộp</th>
                    <th>Người nộp</th>
                    <th>Điểm</th>
                    <th>Thời gian nộp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-secondary">
                    <td>
                      <a href>File</a>
                    </td>
                    <td>thuypm</td>
                    <td>9</td>
                    <td>6/9/2020</td>
                  </tr>
                  <tr class="table-light">
                    <td>Light</td>
                    <td>Angie</td>
                    <td>p</td>
                    <td>s</td>
                  </tr>
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
          <div class="row-mid">
            <h3 class="title">
              <b>
                Bài tập đã hết bà nó hạn
                <i class="fa fa-arrow-right"></i>
              </b>
            </h3>

            <div class="list-ex">
              <div class="row">
                <div class="col-6">
                  <h5>
                    <b>Tên bài tập{{}}</b>
                  </h5>
                  <p>Mô tả{{}}</p>
                </div>
                <div class="col-6">
                  <h6>Hạn nộp:</h6>
                  <button class="btn btn-primary">
                    <i class="fas fa-edit" aria-hidden="true"></i> Chỉnh sửa
                  </button>
                </div>
              </div>
              <table class="table">
                <thead>
                  <tr>
                    <th>Bài nộp</th>
                    <th>Người nộp</th>
                    <th>Điểm</th>
                    <th>Thời gian nộp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="table-secondary">
                    <td>
                      <a href>File</a>
                    </td>
                    <td>thuypm</td>
                    <td>9</td>
                    <td>6/9/2020</td>
                  </tr>
                  <tr class="table-light">
                    <td>Light</td>
                    <td>Angie</td>
                    <td>p</td>
                    <td>s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col-4" style="padding:10px">
          <h3 style="margin-bottom: 10%">
            <b>Cho điểm, đánh giá</b>
          </h3>
          <div>
            <form action style="text-align: left">
              <h5><b> Điểm số</b></h5>
              <p><b>9{{}}</b></p>
              <h5 style="padding-top: 20px"><b>Đánh giá</b> </h5>
              <p>bạn phải cố gắng hơn</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios";
export default {
  components: {

  },
  data() {
    return {
      showNotice: "",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token
        }
      },
      username: localStorage.username,
      // delOption: 1,
      // groupDel: null,
      // indexDel: -1,
      // showModal: false,
      // groupCode: "",
      // groupJoin: Object,
      groups: []
    };
  },
  created() {
    this.loadData();

  },
  methods: {
    loadData() {
      axios
        .post(
          process.env.API_HOST+"user/getAllMeeting",
          { username: this.username },
          this.axiosConfig
        )
        .then(res => {
          this.groups = res.data.content;
        });
    }
  }
};
</script>
<style  scoped>
.title {
  background: #2c3e50;
  color: white;
  padding: 5px;
}
.table-secondary {
  background-color: #f2f2f2 !important;
}
.col-3 {
  padding: 5px;
}
h3 {
  font-size: 25px;
}
.row-mid {
  height: 50vh;
}
.list-ex {
  height: calc(50vh - 50px);
  overflow-y: scroll;
}
div {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

.d-flex {
  width: 100%;
}
.card:hover {
  border: 2px solid #d19b3d;
}
</style>