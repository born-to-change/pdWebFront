<template>
  <div>
    <VmImageList v-show="isShowPersonImg" :data="dataImageList" @delete-ok="deletefn" @get-sequence="getSequenceImages" class="vm-margin"></VmImageList>

    <el-dialog
      title="提示"
      :lock-fullscreen="true"
      :visible.sync="dialogVisible"
      width="70%">
      <el-container>
        <ul class="list-unstyled list-inline">
          <li class="imgLi"  v-for="(item,index) in imageList" :key="index"
              :item="item"
              :index="index">
            <img class="img" :src=item>
          </li>
        </ul>
      </el-container>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>


</template>

<script>
  import axios from 'axios'
  import VmImageList from '../../components/form/vm-image-list'
  import ElContainer from "../../../node_modules/element-ui/packages/container/src/main.vue";
  export default {
    name: 'ImageList',
    components: {
      ElContainer,
      VmImageList
    },
    data: function () {
      return {
        isShowPersonImg:true,
        dialogVisible:false,
        dataImageList: [],
        imageList:[]
      }
    },
    mounted: function () {
      var camera = JSON.parse(localStorage.getItem('currentCam'))
      var _this = this
      axios.post('http://172.18.32.192:5006/getPersonImage', {
        userName:localStorage.getItem("userName"),
        proId: localStorage.getItem("proId"),
        camName:camera.camName

      }).then(function (response) {
        _this.dataImageList = response.data
        console.log(response.data)
      })
        .catch(function (error) {
          console.log(error)
        })
    },

    methods: {
      getSequenceImages:function (imgName) {
        var _this = this
        var camera = JSON.parse(localStorage.getItem('currentCam'))
        axios.post('http://172.18.32.192:5006/get_sequence', {
          userName:localStorage.getItem("userName"),
          proId: localStorage.getItem("proId"),
          camName:camera.camName,
          imgName: imgName
        }).then(function (response) {
          _this.isShowPersonImg = false
          _this.dialogVisible = true
          _this.imageList = response.data
          console.log(response.data)
        })
          .catch(function (error) {
            console.log(error)
          })
      },
      deletefn: function (data) {
        for (let i = 0; i < this.dataImageList.length; i++) {
          if (this.dataImageList[i].id === data.id) {
            this.dataImageList.splice(i, 1)
          }
        }
      }
    },
  }
</script>

<style scoped>
  .dialog-footer{
    margin-top: 10px;
    align-content: center;
  }
  .imgLi{
    float:left;
    /*list-style:none;*/
    margin-left: 5px;
  }
</style>
