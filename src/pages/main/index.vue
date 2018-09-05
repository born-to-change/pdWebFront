<template>
  <div >
    <!--<div class="main-content">-->
     <!--<Nav></Nav>-->
      <!--<router-view></router-view>-->
      <!--<p class="vm-author">vue-manager designed by <a href="https://github.com/luosijie" target="_blank">Jesse Luo</a></p>-->
    <!--</div>-->
    <el-container>
      <Nav></Nav>
      <el-main>
        <router-view></router-view>
      </el-main>

      <el-footer>Pedestrian Detection Systems 2018</el-footer>
      <!--<el-header>Header</el-header>-->
      <!--<el-main>Main</el-main>-->
    </el-container>

  </div>


</template>

<script>
  import Nav from '../../components/Nav/nav'
  import ElFooter from "../../../node_modules/element-ui/packages/footer/src/main.vue";
  import ElMain from "../../../node_modules/element-ui/packages/main/src/main.vue";

  export default{

    components:{
      ElMain,
      ElFooter,
      Nav
    },


  }

</script>

<style scoped>

</style>
