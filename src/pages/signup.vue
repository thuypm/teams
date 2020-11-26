 
<template>
  <div class="row" style=" height: 100vh;">
    <div class="col">
      <div class="card card-container">
        <!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->

        <h1 style="text-align: center">
          <b>SIGN UP</b>
        </h1>
        <form class="form-signin">
          <span id="reauth-email" class="reauth-email"></span>
          <input
            type="text"
            id="username_up"
            class="form-control"
            placeholder="Username"
            v-model="formData.username"
          />
          <input
            type="text"
            id="name"
            class="form-control"
            placeholder="Tên của bạn"
            v-model="formData.name"
          />
          <input
            type="password"
            id="password_up"
            class="form-control"
            placeholder="Password"
            v-model="formData.password"
          />
          <input
            type="password"
            id="repass"
            class="form-control"
            placeholder="Nhập lại Password"
            v-model="formData.rePassword"
          />

          <strong>
            <div
              class=""
              style="text-align: center; padding:5px; border:0; color: red"
              v-show="error == true" 
            >* {{messErr}} *</div>
          </strong>

          <button
            class="btn btn-lg btn-primary btn-block btn-signin"
            id="signup"
            type="button"
            v-on:click="signup"
          >Sign up</button>
        </form>
        <!-- /form -->
        <!-- <a href="#" class="forgot-password">login with google ?</a> -->
        <button
          class="btn btn-lg btn-success btn-block btn-signup"
          id="signin"
          type="button"
          v-on:click="signin"
        >Sign in</button>
      </div>
      <!-- /card-container -->
    </div>
  </div>
</template>
         <script>
import axios from "axios";
export default {
  name: "lol",
  data() {
    return {
      error: false,
      messErr: "",
      formData: {
        username: "",
        password: "",
        rePassword: "",
        name: ""
      }
    };
  },

  methods: {
    signup() {
      if (this.formData.username.length < 5) {
        this.messErr = "username tối thiểu 5 ký tự";
        this.error = true;
        return false;
      }
      if (this.formData.password.length < 5) {
        this.messErr = "password tối thiểu 5 ký tự";
        this.error = true;
        return false;
      }
      if (this.formData.name.length == 0) {
        this.messErr = "tên của bạn đâu ?";
        this.error = true;

        return false;
      }
      if (this.formData.password != this.formData.rePassword) {
        this.messErr = "Nhập lại mật khẩu không đúng";
        this.error = true;

        return false;
      }

      axios
        .post("http://thuypm.tk:3000/signup", {
          username: this.formData.username,
          password: this.formData.password,
          name: this.formData.name
        })
        .then(res => {
          if (res.status == 200)
            if (!res.data.content) {
              this.messErr = "Username đã được sử dụng";
              this.error = true;
            } else {
              this.error = false;
              alert("đăng ký thành công, bây giờ hãy đăng nhập");
              //console.log(res);
              this.$router.push("/signin");
            }
          else {
            alert("có lỗi, vui lòng f5");
          }
        });
    },
    signin() {
      this.$router.push("/signin");
    }
  }
};
</script>

<style scoped>
/*
 * Specific styles of signin component
 */
/*
 * General styles
 */
body,
html {
  height: 100%;
  margin: 0;
}
.row{
  background: #f7f7f7;
}
.card {
  max-width: 350px;
  padding: 40px 40px;
}
.card-container.card {
  padding: 40px 40px;
}
.btn {
  font-weight: 700;
  height: 36px;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

/*
 * Card component
 */
.card {
  background-color: #fff;
  /* just in case there no content*/
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  /* shadows and rounded borders */
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

/*
 * Form styles
 */
.profile-name-card {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0 0;
  min-height: 1em;
}

.reauth-email {
  display: block;
  color: #404040;
  line-height: 2;
  margin-bottom: 10px;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin #inputEmail,
.form-signin #inputPassword {
  direction: ltr;
  height: 44px;
  font-size: 16px;
}

.form-signin input[type="email"],
.form-signin input[type="password"],
.form-signin input[type="text"],
.form-signin button {
  width: 100%;
  display: block;
  margin-bottom: 10px;
  z-index: 1;
  position: relative;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.form-signin .form-control:focus {
  border-color: rgb(104, 145, 162);
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgb(104, 145, 162);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgb(104, 145, 162);
}

.btn.btn-signin {
  /*background-color: #4d90fe; */
  background-color: rgb(104, 145, 162);
  /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
  padding: 0px;
  font-weight: 700;
  font-size: 14px;
  height: 36px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  border: none;
  -o-transition: all 0.218s;
  -moz-transition: all 0.218s;
  -webkit-transition: all 0.218s;
  transition: all 0.218s;
}
.btn.btn-signup {
  /*background-color: #4d90fe; */

  /* background-color: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));*/
  padding: 0px;
  font-weight: 700;
  font-size: 14px;
  height: 36px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  border: none;
  -o-transition: all 0.218s;
  -moz-transition: all 0.218s;
  -webkit-transition: all 0.218s;
  transition: all 0.218s;
}
.btn.btn-signin:hover,
.btn.btn-signin:active,
.btn.btn-signin:focus {
  background-color: #343a40;
}
.btn.btn-signup:hover,
.btn.btn-signup:active,
.btn.btn-signup:focus {
  background-color: #343a40;
}

.forgot-password {
  color: rgb(104, 145, 162);
}

.forgot-password:hover,
.forgot-password:active,
.forgot-password:focus {
  color: rgb(12, 97, 33);
}
</style>
       
   

        