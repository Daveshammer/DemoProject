<template>
  <div style="width: 100%; height: 100vh; background-color: darkslateblue; overflow: hidden">
    <div style="width: 400px; margin: 150px auto">
      <div style="color: #cccccc; font-size: 30px; text-align: center; padding: 30px 0">欢迎登录</div>
      <el-form :model="form" size="normal">
        <el-form-item>
          <el-input prefix-icon="User" v-model="form.username" />
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-lock" v-model="form.password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="login">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Login",
  data() {
    return {
      form: {}
    }
  },
  methods: {
    login() {
      request.post("/api/user/login", this.form).then(res => {
        if (res.code == '0') {
          this.$message({
            type: "success",
            message: "登录成功"
          })
          this.$router.push("/") //登录跳转
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
      })
    },
  }
}
</script>

<style scoped>

</style>