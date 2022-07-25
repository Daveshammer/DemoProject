<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        :default-active="path"
        router
        class="el-menu-vertical-demo">
      <el-sub-menu index="1" v-if="user.role === 1">
        <template #title>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/user">
          <span>用户管理</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/book">
        <span>书籍管理</span>
      </el-menu-item>
      <el-menu-item index="/news">
        <span>新闻管理</span>
      </el-menu-item>
<!--      <el-menu-item index="2">-->
<!--        <span>Navigator Two</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      user: {},
      path: this.$route.path //设置当前选择路径高亮
    }
  },
  created() {
    // console.log(this.$route.path)

    let userStr = sessionStorage.getItem("user") || "{}"
    this.user = JSON.parse(userStr)

    //请求服务端，确认当前用户为管理员
    // request.get("/user" + this.user.id).then(res => {
    //   if (res.code == '0') {
    //     this.user = res.data
    //   }
    // })
  }
}
</script>

<style scoped>

</style>