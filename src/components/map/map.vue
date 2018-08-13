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
        <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
      </el-amap>
    </div>
    <div v-show="isEditCamera" class="locate">
      <el-row>
        <!--<el-button class="bing_video" type="success" plain v-on:click="bingVideo">绑定视频</el-button>-->
        <el-button class="finishLocate" type="warning" plain v-on:click="closeLocate">创建完成</el-button>

      </el-row>
      <mapLocate @addMark="addMarker"></mapLocate>
    </div>
  </div>

</template>

<script>
  import mapLocate from './index.vue'
  export default {
    name: 'amap-page',
    components: {
      mapLocate
    },
    data() {
      return {
        isEditCamera:false,
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
        let marker = {
          position: [dragData.lng,dragData.lat]
        };
        console.log(dragData)
        this.markers.push(marker);
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
