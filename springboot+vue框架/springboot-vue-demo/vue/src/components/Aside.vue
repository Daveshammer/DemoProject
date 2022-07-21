<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        :default-active="path"
        router
        class="el-menu-vertical-demo">
      <el-sub-menu index="1">
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
      path: this.$route.path //设置当前选择路径高亮
    }
  },
  created() {
    // console.log(this.$route.path)
  }
}
</script>

<style scoped>

</style>