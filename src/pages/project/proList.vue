<template>
  <div id="edit_project">
    <div class="button-list">
      <el-row>
        <el-button type="primary" @click="uploadImg" round>上传图片</el-button>
        <el-button type="primary" @click="uploadVideo" round>上传视频</el-button>
        <el-button type="primary" @click="uploadCamera" round>定义摄像头</el-button>
      </el-row>
    </div>
    <div id="editImage" v-show="isShowImg">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :limit="100000000"
        :multiple="true"
        :file-list="imgList"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>

    <div id="editVideo" v-show="isShowVideo">
      <el-upload
        class="upload-demo"
        drag
        :action="UploadUrl()"
        :limit="100"
        :before-upload="beforeUploadVideo"
        :multiple="true"
        :file-list="videoList"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将视频拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传mp4文件</div>
      </el-upload>
    </div>


  </div>

</template>

<script>
  export default {
    data() {
      return {
        isShowImg:false,
        isShowVideo:false,
        isShowCamera:false,
        imgList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
          {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        videoList:[
          {name:'',url:''}
        ]
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      uploadImg(){
        this.isShowImg = true,
        this.isShowVideo = false,
        this.isShowCamera = false
      },
      UploadUrl(){
        return ""
      },
      uploadVideo(){
          this.isShowImg = false,
          this.isShowVideo = true,
          this.isShowCamera = false

      },
      uploadCamera(){
          this.isShowImg = false,
          this.isShowVideo = false,
          this.isShowCamera = true

      },
      beforeUploadVideo(file){
        const isLt10M = file.size / 1024 / 1024  < 1024;
        if (['video/mp4', 'video/ogg', 'video/flv','video/avi','video/wmv','video/rmvb'].indexOf(file.type) == -1) {
          this.$message.error('请上传正确的视频格式');
          return false;
        }
        if (!isLt10M) {
          this.$message.error('上传视频大小不能超过10MB哦!');
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .button-list{
    margin: 10px;
    align-content: center;
  }

</style>
