<template>
  <div style="padding: 10px">
    <!--    功能区域-->
    <div style="margin: 10px">
      <el-button type="primary" @click="add">新增</el-button>
      <el-button type="primary">导入</el-button>
      <el-button type="primary">导出</el-button>
    </div>

    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入关键字" style="width: 20%" clearable/>
      <el-button type="primary" style="margin-left: 5px" @click="load">查询</el-button>
    </div>
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" sortable/>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="nickName" label="昵称"/>
      <el-table-column prop="age" label="年龄"/>
      <el-table-column prop="sex" label="性别"/>
      <el-table-column prop="address" label="地址"/>
      <el-table-column label="角色">
        <template #default="scope">
          <span v-if="scope.row.role === 1">管理员</span>
          <span v-if="scope.row.role === 2">普通用户</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button link type="text" size="mini" @click="handleEdit(scope.row)"
          >编辑
          </el-button
          >
          <el-popconfirm title="确认删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div style="margin: 10px 0">
      <el-pagination
          v-model:currentPage="currentPage"
          page-size="pageSize"
          :page-sizes="[5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      <el-dialog v-model="dialogVisible" title="Tips" width="30%">
        <el-form label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="form.username" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickName" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="form.sex" label="男">男</el-radio>
            <el-radio v-model="form.sex" label="女">女</el-radio>
            <!--            <el-input v-model="form.sex" style="width: 80%"></el-input>-->
          </el-form-item>
          <el-form-item label="地址">
            <el-input type="textarea" v-model="form.address" style="width: 80%"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="save"
            >Confirm</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      form: {},
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 10,
      search: '',
      tableData: []
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      request.get("/user", {
        params: {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.search
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    save() {
      if (this.form.id) { //更新
        request.put("/user", this.form).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.$message({
              type: "success",
              message: "更新成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.load(); //刷新表格数据
          this.dialogVisible = false; //关闭弹窗
        })
      } else { //新增
        request.post("/user", this.form).then(res => {
          console.log(res)
          if (res.code == '0') {
            this.$message({
              type: "success",
              message: "新增成功"
            })
          } else {
            this.$message({
              type: "error",
              message: res.msg
            })
          }
          this.load(); //刷新表格数据
          this.dialogVisible = false; //关闭弹窗
        })
      }
    },
    add() {
      this.dialogVisible = true;
      this.form = {}
    },
    handleEdit(row) {
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.load();
    },
    // handleDelete(id) {
    //   console.log(id)
    //   request.delete("/user/" + id).then(res => {
    //     if (res.code == '0') {
    //       this.$message({
    //         type: "success",
    //         message: "删除成功"
    //       })
    //     } else {
    //       this.$message({
    //         type: "error",
    //         message: res.msq
    //       })
    //     }
    //     this.load(); //删除后重新加载表格
    //   })
    // },
    handleDelete(id) {
      console.log(id)
      request.delete("/user/" + id).then(res => {
        if (res.code === '0') {
          this.$message({
            type: "success",
            message: "删除成功"
          })
        } else {
          this.$message({
            type: "error",
            message: res.msg
          })
        }
        this.load()  // 删除之后重新加载表格的数据
      })
    },

  }
}
</script>