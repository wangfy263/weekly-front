<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" ref="loginForm"></login-form>
          <p class="login-tip">{{loginMsg}}</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      loginMsg: ''
    }
  },
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit (data) {
      this.handleLogin(data).then(res => {
        this.getUserInfo().then(res => {
          console.log(this.$config.homeName)
          this.$router.push({
            name: this.$config.homeName
          })
        })
      }, err => {
        this.loginMsg = err
        this.$refs.loginForm.getCaptcha()
      })
    }
  }
}
</script>
