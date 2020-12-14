<template>
  <div class="row">
    <div class="col-11custom">
      <div
        class="d-flex justify-content-around"
        style="flex-wrap: wrap; padding-top: 4%"
      >
        <div
          class="card"
          style="width: 18rem"
          v-for="(group, index) in groups"
          :key="index"
        >
          <router-link
            v-if="group.owner != username"
            :to="'/exStudent/' + group._id"
            style="text-decoration: none; color: inherit"
          >
            <!-- <a  v-if="group.owner != username" :href="'/ex/'+group._id"  style="text-decoration: none; color: black"> -->
            <div>
              <img
                class="card-img-top"
                :src="API_HOST+'room/unknown.png'"
                alt="Card image cap"
              />
              <span></span>
            </div>
            <div class="card-body">
              <h5 class="card-title">
                <b>{{ group.name }}</b>
              </h5>
            </div>
            <!-- </a> -->
          </router-link>
          <router-link
            v-else
            :to="'/exAdmin/' + group._id"
            style="text-decoration: none; color: inherit"
          >
            <!-- <a  v-else :href="'/exAdmin/'+group._id"  style="text-decoration: none; color: black"> -->
            <div>
              <img
                class="card-img-top"
                :src="API_HOST+'room/unknown.png'"
                alt="Card image cap"
              />
              <span></span>
            </div>
            <div class="card-body">
              <h5 class="card-title">
                <b>{{ group.name }}</b>
              </h5>
            </div>
            <!-- </a> -->
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      API_HOST: process.env.API_HOST,
      showNotice: "",
      axiosConfig: {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          token: localStorage.token,
        },
      },
      username: localStorage.username,
      // delOption: 1,
      // groupDel: null,
      // indexDel: -1,
      // showModal: false,
      // groupCode: "",
      // groupJoin: Object,
      groups: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      axios
        .post(
          process.env.API_HOST + "user/getAllMeeting",
          { username: this.username },
          this.axiosConfig
        )
        .then((res) => {
          this.groups = res.data.content;
        });
    },
  },
};
</script>
<style  scoped>
.card {
  margin: 2%;
}

.d-flex {
  width: 100%;
}
.card:hover {
  border: 2px solid #d19b3d;
}
</style>