<template>
  <div>
    <Nav></Nav>
    <router-view></router-view>

  </div>


</template>

<script>
  import Nav from '../../components/Nav/nav'

  export default{

    components:{
      Nav
    },


  }

</script>

<style scoped>

</style>
