<template>
  <div class="parentContainer">
    <div class="loginImageCon">
      <div>
        <h2 style="text-align: center; font-size:2.5rem">Connect, Get Hired!</h2>

        <img class="loginImg" src="../assets/Group 2.png" alt="" />
      </div>
    </div>
    <div class="loginForm">
      <div class="container">
        <div class="content login-box">
          <h5 style="text-align: center; margin-bottom: 2rem">Ciraq</h5>
          <form>
            <div class="user-box">
              <input v-model="loginData.email" type="text" name="" required="" />
              <label>Student email</label>
            </div>
            <div class="user-box">
              <input v-model="loginData.password" type="password" name="" required="" />
              <label>Password</label>
            </div>
            <div>
              <div><button @click="loginUser()" class="loginBtn">Login</button>
              </div>
              <div>
                <a style="font-size: small" href="#"> Forgot Password? </a>
              </div>
              <div style="display: flex; align-items: flex-end">
                <div style="width: 40%"><hr /></div>
                <div style="width: 20%"><h6>OR</h6></div>
                <div style="width: 40%"><hr /></div>
              </div>

              <div style="font-size: small">
                Don't have an account?
                <span> <nuxt-link to="/signup"> Sign up </nuxt-link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      pageToShow: "dashboard",
      loginData:{
        email:"pboateng773",
        password:"12345"
      }
    };
  },

  async mounted() {},

  methods:{
    async loginUser(event) {
        event.preventDefault();
        console.log(this.loginData)
      try {
        // navigate to dashboard
        const response = await useFetch(`http://3.219.43.239/auth/login`, {
          method: "post",
          body: this.loginData,
        });

        const data = response;
        console.log(response);
        if (data) {
          // this.$router.push("/dashboard");
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.error = 'Login failed. Please check your credentials.';
      }
    },
  }
};
</script>

<style scoped>
.parentContainer {
  display: flex;
}

.loginImageCon {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginForm {
  width: 40%;
  padding: 5rem;
}

.container {
  border-radius: 1px;
  padding: 3rem;
  box-sizing: border-box;
  font-family: sans-serif;
  color: #737373;
  border: 1px solid #006565;
  text-align: center;
  background: white;
  border-radius: 1rem;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  /* color: #fff; */
  margin-bottom: 20px;
  border: none;
  border-bottom: 2px solid #737373;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  /* color: #fff; */
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  /* color: #bdb8b8; */
  font-size: 12px;
}

.loginBtn {
  width: 80%;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  background-color: #006565;
  border: none;
  color: #fff;
}

.loginImg {
  width: 90%;
  margin-left: 2rem;
}
</style>
