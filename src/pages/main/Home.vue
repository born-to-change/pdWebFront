<template>
  <div id="project">
    <el-button type="primary" @click="addProject">创建项目</el-button>

    <el-dialog title="创建项目" :visible.sync="pro_isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input type="textarea" v-model="project.proName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="project.proDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cancelPro">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="编辑项目" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="editProject.proName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="editProject.proDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePro()">保存</el-button>
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
          <span style="margin-left: 10px">{{ scope.row.proName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>: {{ scope.row.proTime }}</p>
            <p v-show="false">: {{scope.row.userId}}</p>
            <p v-show="false">: {{scope.row.proId}}</p>
            <p>描述: {{ scope.row.proDescription }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.proTime }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<el-button-->
          <!--size="mini"-->
          <!--type="info"-->
          <!--@click="manageProjectFile(scope.$index, scope.row)">管理项目文件</el-button>-->
          <router-link to="/map">
           <el-button
            size="mini"
            type="primary"
            @click="processVideo(scope.$index, scope.row)">行人轨迹检测
           </el-button>
          </router-link>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑信息
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component.vue";
  import axios from 'axios'
  import $ from 'jquery'
  import {timestamp2Date,Date2timestamp} from '../../../src/util/fmtDate.js'

  export default {
    name: 'form',
    components: {
      ElDialog
    },
    data() {
      return {
        projects: [],
        pro_isShow: false,
        dialogFormVisible: false,
        project: {
          proName: '',
          proId: '',
          proTime: '',
          proDescription: '',
          userId: ''
        },
        editProject: {
          proName: '',
          proId: '',
          proTime: '',
          proDescription: '',
          userId: ''
        },
        editIndex: "",

      }
    },
    mounted: function () {
      window.addEventListener('message', function(ev) {
        // if (ev.source !== window.parent) {return;}
        var data = JSON.parse(ev.data)
        localStorage.setItem("userName",data.user_name)
        localStorage.setItem("userId",data.user_id)
        console.info('message from parent:', data);
      }, false);

      var _this = this;
      _this.$axios.post('http://localhost:8081/project/getProjectsByUserId', {
        userId: 1
      }).then(function (response) {
        _this.projects = response.data
        _this.projects.forEach(function (value, index, array) {
          array[index].proTime = timestamp2Date(value.proTime)
          console.log(array[index].proTime)
        })
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      processVideo(index,row){

      },
      addProject() {
        this.pro_isShow = true,
          this.project = {}
        localStorage.setItem('userId', 1)
        this.project.userId = localStorage.getItem('userId')
      },
      onSubmit() {
        this.pro_isShow = false
        console.log(this.project)
        this.dialogFormVisible = false,
          console.log(this.project)
        if (this.projects.length > 4)
          alert("您最多创建5个项目")
        else {
          if (this.project.proName.trim()) {
            this.projects.unshift({
              proName: this.project.proName.trim(),
              proDescription: this.project.proDescription,
              proTime: new Date(),
              userId: this.project.userId
            });
            this.project.proName = '';
          } else {
            alert('项目名不能为空 !-_-');
          }
          axios.post('http://localhost:8081/project/createProject', {
            project: this.projects[0]
          }).then(function (response) {
            console.log(response.data)
          })
            .catch(function (error) {
              console.log(error)
            })
        }
      },
      cancelPro() {
        this.pro_isShow = false

      },
      savePro(index,editProject){
        this.dialogFormVisible=false,
        this.projects[index] = editProject
        var _this = this
        this.dialogFormVisible = false
        this.editProject.proTime = new Date()
        console.log(this.projects[this.editIndex])
        axios.post('http://localhost:8081/project/updateProject', {
          project: _this.editProject
        }).then(function (response) {
          console.log(response.data)

        })
          .catch(function (error) {
            console.log(error)
          })
      },
      cancelPro() {
        this.dialogFormVisible = false
      },
      handleEdit(index, row) {
        var _this = this
        this.editIndex = index
        this.editProject = row
        this.dialogFormVisible = true
        $.ajax({
          type: 'POST',
          url: "http://localhost:8081/project/getProjectByProjectId",
          data: JSON.stringify({proId: row.proId}),
          dataType: "JSON",
          contentType: 'application/json;charset=utf-8',
          success: function (data) {
//            _this.editIndex = index
//            _this.editProject = data
          },
          error: function (jqXHR) {
            return "哎呀呀，出错了" + jqXHR.status;
          }
        });

      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.projects.splice(index, 1),
            $.ajax({
              type: 'POST',
              url: "http://localhost:8081/project/deleteProject",
              data: JSON.stringify({proId: row.proId}),
              dataType: "JSON",
              contentType: 'application/json;charset=utf-8',
              error: function (jqXHR) {
                return "哎呀呀，出错了" + jqXHR.status;
              }
            });
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
