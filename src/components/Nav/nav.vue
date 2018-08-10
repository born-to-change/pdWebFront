<template>
  <div class="ue-bar">
    <div class="ue-bar-warp">
      <div class="ue-bar-logo">
        <a href="#">
          <img src="../../assets/logo.png" width="51" hegith="20" alt="解忧书屋" title="解忧书屋">
        </a>
      </div>
      <div class="ue-bar-nav">
        <ul id="hh">
          <router-link to="/home">
            <li>
              <em class="haha">首页</em>
            </li>
          </router-link >
          <li class="dif"><a href="http://localhost:8087/index">
            <em class="dif">文件管理</em>
          </a></li>
          <li class="dif"><a href="http://localhost:8087/upload">
            <em class="dif">文件上传</em>
          </a></li>
          <li class="dif"><a href="http://localhost:8087/admin">
            <em>用户管理</em>
          </a></li>
          <li class="dif"><a href="http://localhost:8087/mine.html">
            <em class="dif">个人中心</em>
          </a></li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>

export default {

}

</script>

<style lang="css" scoped>

  .dif{
    font-weight: normal;
  }

  *{
    margin: 0;
    padding: 0;
    font-family: "Lantinghei SC","Microsoft Yahei",宋体,Arial,Helvetica,sans-serif;
    font-size: 12px;
    font-style: normal;

  }

  .haha{
    text-align: center;
    border: 0;
    display:inline-block;
    width: 100px;
    color: #8470FF;
    text-decoration: none;
    outline: none;
    padding-top: 25px;
  }
  a{
    color: #8470FF;
    text-decoration: none;
    outline: none;
  }
  li{
    text-align: center;
    border: 0;
    display:inline-block;
    width: 100px;
    color: #8470FF;
    text-decoration: none;
    outline: none;
  }

  div{
    display: block;
  }

  em{
    font-weight: normal;
  }

  .ue-bar{
    background-color: #8470FF;
  }

  .ue-bar-warp{
    width: 980px;
    height: 70px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
  }

  .ue-bar-logo{
    width: 134px;
    height: 70px;
    float: left;
    padding-right: 10px;
    padding-top: 8px;
  }

  .ue-bar-logo a{
    display: inline-block;
    width: 100%;
    height: 100%;
    margin-top: 12px;
  }

  .ue-bar-nav{
    height: 70px;
    float: left;
  }

  .ue-bar-nav li{
    height: 70px;
    float: left;
    margin-right: 20px;
  }

  .ue-bar-nav li *{
    color:#dadada;
    font-size: 14px;
    display: inline-block;
    line-height: 17px;
    vertical-align: top;
  }
  li,ul,img,a,div{
    border: 0;
    list-style: none;
  }
  .ue-bar-nav li a{
    height: 22px;
    line-height: 22px;
    padding: 26px 17px;
  }
  .ue-bar-nav li.active{
    background: #333;
  }
  .ue-bar-nav li :hover{
    height: 70px;
    background: #333;
  }
</style>
