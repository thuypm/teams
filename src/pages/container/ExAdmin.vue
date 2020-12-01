<template>
  <div>
    <ExModal
      v-if="createEx"
      @close="createEx = false"
      :selectedEx="selectedEx"
      @Ex="updateEx"
    />
    <div class="row">
      <ListEx
        :listEx="listEx"
        :admin="true"
        @newEx="
          createEx = true;
          selectedEx = {};
          allSubmission = [];
        "
        @selectEx="selectEx"
      />
      <ListSubmit
        :selectedEx="selectedEx"
        :allSubmission="allSubmission"
        :admin="true"
        @editEx="createEx = true"
        @select-submit="selectSubmit"
      />
      <Mark v-show="selectedSubmit" :admin="true" :selectedSubmit="selectedSubmit"  />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import ExModal from "../../components/groupModal/exModal";
import ListEx from "../../components/exercise/ListEx";
import ListSubmit from "../../components/exercise/ListSubmit";
import Mark from "../../components/exercise/Mark";
export default {
  components: {
    ExModal,
    ListEx,
    ListSubmit,
    Mark,
  },
  data() {
    return {
      showNotice: "",
      createEx: false,
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token,
        },
      },
      username: localStorage.username,
      selectedSubmit: null,
      selectedEx: {},
      listEx: [],
      allSubmission: {},
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    selectSubmit(subm, id) {
      this.selectedSubmit = subm;
    },
    selectEx(ex, id) {
      this.selectedEx = ex;
      // console.log(ex.exId)
      this.selectedSubmit=null;
      axios
        .post(
          "http://thuypm.tk:3000/ex/getEX",
          {
            _id: ex.exId,
            username: this.username,
            roomId: this.$route.params.id,
          },
          this.axiosConfig
        )
        .then((res) => {
          this.allSubmission = res.data;
        });
    },
    updateEx(data) {
      this.createEx = false;
      data.roomId = this.$route.params.id;
      if (data.exId) {
        axios
          .post("http://thuypm.tk:3000/ex/updateEx", data, this.axiosConfig)
          .then((res) => {
            var id = this.listEx.findIndex((val) => {
              val.exId == data;
            });
            this.listEx[id] = data;
          });
      } else {
        axios
          .post("http://thuypm.tk:3000/ex/addEx", data, this.axiosConfig)
          .then((res) => {
            this.listEx.push(res.data);
          });
      }
    },
    loadData() {
      axios
        .post(
          "http://thuypm.tk:3000/ex/getAllEx",
          { _id: this.$route.params.id },
          this.axiosConfig
        )
        .then((res) => {
          if (localStorage.username != res.data.owner) this.$router.push("/");
          this.listEx = res.data.listEx;
        });
    },
  },
};
</script>
<style  scoped>
.single li a:hover {
  color: #666;
}
.single li:last-child a {
  border-bottom: 0;
}
.list-group {
  overflow-y: scroll;
}
h3 {
  font-size: 25px;
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