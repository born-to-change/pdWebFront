<template>
  <div>

    <VmImageList v-show="isShowPersonImg" :data="dataImageList"  :camImage="camImage" :bindingImg="bindingImg" @delete-ok="deletefn" @get-sequence="getSequenceImages" class="vm-margin"></VmImageList>

    <el-dialog
      title="提示"
      :lock-fullscreen="true"
      :visible.sync="isShowSequenceImg"
      width="70%"
      :before-close="sequenceDialogClose">
      <el-container>
        <ul class="list-unstyled list-inline">
          <li class="imgLi"  v-for="(item,index) in imageList" :key="index"
              :item="item"
              :index="index">
            <img class="img" :src=item @click="selectAsCamImg(item)">
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
  import {timestamp2Date, Date2timestamp} from '../../../src/util/fmtDate.js'
  export default {
    name: 'ImageList',
    components: {
      ElContainer,
      VmImageList
    },
    data: function () {
      return {
        camImage:'http://172.18.32.192:8082/code/toolimg/add.png',
        isShowPersonImg:true,
        isShowSequenceImg:false,
        dataImageList: [],
        bindingImg:'',
        imageList:[]
      }
    },
    mounted: function () {
      var camera = JSON.parse(localStorage.getItem('currentCam'))
      this.bindingImg = camera.selectImageUrl
      var _this = this
      axios.post('http://172.18.32.192:5011/getPersonImage', {
        userName:localStorage.getItem("userName"),
        proId: localStorage.getItem("proId"),
        camName:camera.camName,
        videoTime:Date2timestamp(camera.videoTime),
        videoUrl:camera.videoUrl

      }).then(function (response) {
        _this.dataImageList = response.data
        _this.dataImageList.forEach(function (value, index, array) {
          array[index].desc = timestamp2Date(value.desc)
        })
        console.log(response.data)
      })
        .catch(function (error) {
          console.log(error)
        })
    },

    methods: {
      sequenceDialogClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.isShowSequenceImg = false
            this.isShowPersonImg = true
          })
          .catch(_ => {});
      },
      selectAsCamImg:function (img) {
        var _this = this
        var camera = JSON.parse(localStorage.getItem('currentCam'))
        this.camImage = img
        console.log(img)
        this.isShowSequenceImg = false
        this.isShowPersonImg = true
        axios.post('http://172.18.32.192:8081/image/createImage', {
          cameraId:camera.cameraId,
          imageUrl:img,
          imageTime:Date2timestamp(camera.videoTime)+parseInt(img.split('/')[10].split('.',1)[0])*1000,
          proId:camera.proId,
          camName:camera.camName,
          camLng:camera.camLng,
          camLat:camera.camLat,
          searchImageUrl:camera.selectImageUrl
        }).then(function (response) {
        })
          .catch(function (error) {
            console.log(error)
          })


      },
      getSequenceImages:function (imgName) {
        var _this = this
        var camera = JSON.parse(localStorage.getItem('currentCam'))
        axios.post('http://172.18.32.192:5011/get_sequence', {
          userName:localStorage.getItem("userName"),
          proId: localStorage.getItem("proId"),
          camName:camera.camName,
          imgName: imgName
        }).then(function (response) {
          _this.isShowPersonImg = false
          _this.isShowSequenceImg = true
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
