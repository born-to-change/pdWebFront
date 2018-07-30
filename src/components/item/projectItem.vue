<template>
  <div id="addProject">
    <el-button type="primary" @click="addProject">创建项目</el-button>
    <div id="add-pro-form" v-show="pro_isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="project.projectName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="project.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="cancelPro">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

  export default{
    data(){
      return{
        pro_isShow: false,
        project:{
          projectName:"",
          time:"",
          description:"",
        }
      }
    },
    methods: {
      addProject(){
        this.pro_isShow = true,
          this.project = {}
      },
      onSubmit(){
        this.pro_isShow = false
        this.$emit('addPro', this.project)
      },
      cancelPro(){
        this.pro_isShow = false
      }
    }
  }

</script>

<style scoped>
  #addProject{
    width: 300px;
    height: 400px;
  }

</style>
