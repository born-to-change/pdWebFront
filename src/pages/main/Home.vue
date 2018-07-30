<template>
  <div>
    <ProItem @addPro="addProject">
    </ProItem>

    <div id="add-pro-form" v-show="edit_pro_isShow">
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
    </div>
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
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
  export default {
   components:{
     ProItem
   },
    data() {
      return {
        edit_pro_isShow:false,
        editProject:{},
        editIndex:"",
        projects: [{
          projectName: '221312',
          time: '2017-12-2',
          description: '上海市普陀区金沙江路 1518 弄'
        },{
          projectName: '2ww02',
          time: '2018-6-2',
          description: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    },
    methods: {
      savePro(index,editProject){
        this.edit_pro_isShow=false,
         this.projects[index] = editProject
      },
      cancelPro(){
        this.edit_pro_isShow = false
      },
      handleEdit(index, row) {
        this.edit_pro_isShow = true,
        this.editProject = row
        this.index = index
      },
      handleDelete(index, row) {
        this.projects.splice(this.projects.findIndex(project => project.index === index), 1)
      },
      addProject(e){
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
    }
  }
</script>

<style scoped>

</style>
