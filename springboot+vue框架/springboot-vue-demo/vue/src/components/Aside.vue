<template>
  <div>
    <el-menu
        style="width: 200px; min-height: calc(100vh - 50px)"
        default-active="user"
        router
        class="el-menu-vertical-demo">
      <el-sub-menu index="1">
        <template #title>
          <span>系统管理</span>
        </template>
        <el-menu-item index="user">
          <span>用户管理</span>
        </el-menu-item>
<!--        <el-menu-item index="data">-->
<!--          <span>数据管理</span>-->
<!--        </el-menu-item>-->
      </el-sub-menu>
<!--      <el-menu-item index="2">-->
<!--        <span>Navigator Two</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside"
}
</script>

<style scoped>

</style>