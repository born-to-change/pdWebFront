<template>
  <div>
    <ProItem @addPro="addProject">
    </ProItem>

      <el-dialog title="编辑项目" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="项目名称">
            <el-input v-model="editProject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="editProject.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="savePro">保存</el-button>
            <el-button @click="cancelPro">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    <el-table
      :data="projects"
      style="width: 100%">
      <el-table-column
        label="项目名称"
        width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.projectName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>: {{ scope.row.time }}</p>
            <p>描述: {{ scope.row.description }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.time }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            @click="manageProjectFile(scope.$index, scope.row)">管理项目文件</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="processVideo(scope.$index, scope.row)">行人轨迹检测</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑信息</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import ProItem from '../../components/item/projectItem.vue'
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component.vue";
  export default {
   components:{
     ElDialog,
     ProItem
   },
    data() {
      return {
        dialogFormVisible:false,
        editProject:{},
        editIndex:"",
        projects: []
      }
    },
    methods: {
      savePro(index,editProject){
        this.dialogFormVisible=false,
         this.projects[index] = editProject
      },
      cancelPro(){
        this.dialogFormVisible = false
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true,
        this.editProject = row
        this.index = index
      },
      addProject(e){
        if(this.projects.length>4)
          alert("您最多创建5个项目")
        else {
          if(e.projectName.trim()) {
            this.projects.unshift({
              projectName: e.projectName.trim(),
              description:e.description,
              time: new Date()
            });
            e.projectName = '';
          } else {
            alert('项目名不能为空 !-_-');
          }
        }
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.projects.splice(this.projects.findIndex(project => project.index === index), 1),
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>

</style>
