<template>
  <div class="routeMap">
    <el-row>
      <el-button type="primary" plain @click="createCamera">创建摄像头</el-button>
      <el-button type="primary" plain @click="manageCamera">管理摄像头</el-button>
      <el-button type="primary" plain @click="bingImage">绑定检索图片</el-button>
      <el-button type="primary" plain @click="processVideo">处理视频</el-button>
    </el-row>
    <div class="amap-page-container">
      <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
        <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index"
                        :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
      </el-amap>
    </div>
    <div v-show="isEditCamera" class="locate">
      <el-row>
        <!--<el-button class="bing_video" type="success" plain v-on:click="bingVideo">绑定视频</el-button>-->
        <el-button class="finishLocate" type="warning" plain v-on:click="closeLocate">创建完成</el-button>

      </el-row>
      <mapLocate @addMark="addMarker"></mapLocate>
    </div>


    <el-dialog
      title="提示"
      :visible.sync="editCameraDialogVisible"
      width="60%"
      center>
      <el-form :model="cam">
        <el-form-item label="摄像头名称" :label-width="formLabelWidth">
          <el-input v-model="cam.camName" auto-complete="off"></el-input>
          <el-input v-show="false" v-model="cam.videoUrl"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="cam.cameraDescription" placeholder="请填写摄像头备注"></el-input>
        </el-form-item>
      </el-form>
      <span class="demonstration">选择视频文件</span>
      <el-select v-model="fileId" placeholder="请选择">
        <el-option
          v-for="item in videos"
          :key="item.fileId"
          :label="item.fileName"
          :value="item.fileId">
        </el-option>
      </el-select>
      <el-button type="success" round @click="bindingVideo">绑定</el-button>

      <div class="block">
        <span class="demonstration">视频开始时间</span>
        <el-date-picker
          v-model="cam.videoTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
      </div>

      <span slot="footer" class="dialog-footer">
    <el-button @click="cancelCamera">取 消</el-button>
    <el-button type="primary" @click="saveCamera">确 定</el-button>
  </span>
    </el-dialog>
  </div>

</template>

<script>
  import mapLocate from './index.vue'
  import axios from 'axios'
  export default {
    name: 'amap-page',
    components: {
      mapLocate
    },
    data() {
      return {
        fileId:"",
        fileName: '',
        videos:[],
        isEditCamera:false,
        editCameraDialogVisible: false,
        count: 1,
        slotStyle: {
          padding: '2px 8px',
          background: '#eee',
          color: '#333',
          border: '1px solid #aaa'
        },
        zoom: 14,
        center: [116.405306, 39.904989],
        markers: [],
        cam:{
          videoImage:"Na",
          cameraDescription:"",
          camLng:"Na",
          camLat:"Na",
          camName:"",
          videoTime:"Na",
          bingingFileId:"Na",
          videoUrl:""
        },
        renderMarker: {
          position: [116.415306, 39.904089],
          contentRender: (h, instance) => {
            // if use jsx you can write in this
            // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
            return h(
              'div',
              {
                style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
                on: {
                  click: () => {
                    const position = this.renderMarker.position;
                    this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
                  }
                }
              },
              ['marker inner text']
            )
          }
        },
        componentMarker: {
          position: [116.405306, 39.904989],
          contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: 'father is here'}}, ['xxxxxxx'])
        },
        slotMarker: {
          position: [116.405306, 39.904989]
        }
      };
    },
    methods: {
      cancelCamera(){
        this.editCameraDialogVisible = false
      },
      bindingVideo(){
        var _this = this
        axios.post('http://172.18.32.192:8081/file/getFileByFileId', {
          fileId:  this.fileId
        }).then(function (response) {
          var temp = response.data
          _this.cam.videoUrl = temp.fileUrl
         return temp.fileUrl
        })
          .catch(function (error) {
            console.log(error)
          })
      },
      saveCamera(){
        this.editCameraDialogVisible = false
        this.cam.bingingFileId = this.fileId
        axios.post('http://172.18.32.192:8081/camera/createCamera', {
          camera: this.cam
        }).then(function (response) {

        })
          .catch(function (error) {
            console.log(error)
          })

      },
      createCamera(){
        this.isEditCamera = true
      },
      onClick() {
        this.count += 1;
      },
      chnageDraggle() {
        let draggable = this.markers[0].draggable;
        this.markers[0].draggable = !draggable;
      },

      addMarker:function (dragData) {
        var _this = this
        axios.post('http://172.18.32.192:8081/file/getVideosByUserId', {
          userId: localStorage.getItem("userId")
        }).then(function (response) {
          var files = response.data
          _this.videos = files
        })
          .catch(function (error) {
            console.log(error)
          })

         this.editCameraDialogVisible = true
         this.cam.camLng = dragData.lng
         this.cam.camLat = dragData.lat
         this.cam.proId = localStorage.getItem("proId")

        let marker = {
          position: [dragData.lng,dragData.lat]
        };
        console.log(dragData)
        this.markers.splice(0,0,marker);
      },
      removeMarker() {
        if (!this.markers.length) return;
        this.markers.splice(this.markers.length - 1, 1);
      }
    }
  }
</script>
<style scoped>
  .routeMap{
    width: 100%;
  }
  .amap-demo {
    float: left;
    height: 400px;
    width: 600px;
  }
  .locate{
    float: right;
    margin-top: 0px;
  }
  .finishLocate{
    margin-right: 20px;
  }
  .bing_video{
    margin-left: 200px;
  }
</style>
