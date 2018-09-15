<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">

      <el-amap-polyline :editable="polyline.editable"  :strokeStyle="polyline.strokeStyle"
                        :strokeDasharray="polyline.strokeDasharray" :path="polyline.path"
                        :lineJoin="polyline.lineJoin" :strokeColor="polyline.strokeColor"  :events="polyline.events"></el-amap-polyline>
      <!--<el-amap-text v-for="text in texts" :text="text.text" :key="index" :offset="text.offset" :position="text.position" :events="text.events"></el-amap-text>-->
    </el-amap>

  </div>
</template>

<script>
  import axios from 'axios'
  import AMap from 'vue-amap'
  export default{
    data() {
      return {
        zoom: 15,
        center: [116.405306, 39.904989],
        polyline: {

          path:[],
          events: {
            click(e) {
              alert('click polyline');
            },
            end: (e) => {
              let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
              console.log(newPath);
            }
          },
          strokeColor:'#FF0000',
          editable: true,
          strokeStyle: "dashed",
          strokeDasharray: [5,2,10,4,20,6,30,8,40,10,50,12,60,14,70,16,80,18,90,20,100,22,110,24,120,26,130,28,140,30,150,32,160
          ,34,178,36,180,38,190,40,200,50,220,52,240,54,260,56,280,58,300,60,320,62,350,46,380,50,420],
          lineJoin:"miter"
        },
//        texts: [
//          {
//            position: [121.5273285, 31.21515044],
//            text: 'hello world',
//            offset: [0, 0],
//            events: {
//              click: () => {
//                alert('click text');
//              }
//            }
//          }
//        ]
      };
    },

    mounted: function () {
      var _this = this
      axios.post('http://172.18.32.192:8081/map/getMapCamsByProId', {
        proId: localStorage.getItem("proId")
      }).then(function (response) {
        var lngX ;
        var latY ;
        var lineArr = new Array();
        var imageList = response.data
        imageList.forEach(function (value, index, array) {
          // var mark = new Array();
          lngX = Number(value.camLng);
          latY = Number(value.camLat);
          lineArr.push([lngX,latY]);
        })


//        var imageList = response.data
//          var a = new Array();
//
//          for(var i=0;i<imageList.length;i++){        //一维长度为3
//            a[i] = new Array();
//            for(var j=0;j<2;j++){    //二维长度为5
//              a[i][j] = imageList[i][j];
//
//            }
//          }
        _this.center = lineArr[Math.round(imageList.length/2)]
        _this.polyline.path = lineArr
        console.log(lineArr)
////        _this.center = pathList[0]
      })
        .catch(function (error) {
          console.log(error)
        })

    },
    methods: {
      changeEditable:function () {
        this.polyline.editable = !this.polyline.editable;
      }

    }
  };
</script>

<style scoped>
  .amap-demo {
    height: 600px;
  }
</style>
