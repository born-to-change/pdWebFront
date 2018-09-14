<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">

      <el-amap-polyline :editable="polyline.editable"  :strokeStyle="polyline.strokeStyle"
                        :strokeDasharray="polyline.strokeDasharray" :path="polyline.path"
                        :lineJoin="polyline.lineJoin" :events="polyline.events"></el-amap-polyline>
    </el-amap>

  </div>
</template>

<script>
  import axios from 'axios'
  import AMap from 'vue-amap'
  export default{
    data() {
      return {
        zoom: 12,
        center: [116.405306, 39.904989],
        polyline: {

          path:'',
          events: {
            click(e) {
              alert('click polyline');
            },
            end: (e) => {
              let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
              console.log(newPath);
            }
          },
          editable: true,
          strokeStyle: "dashed",
          strokeDasharray: [5,7,20,9,30,11,40,13,50,15,60,17,70,19,80,21,100,23,150,26,170,30,200,50,250,60,300,70,350,80,400],
          lineJoin:"round"
        }
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

          lngX =Number(value.camLng);
          latY = Number(value.camLat);
          lineArr.push(new AMap(lngX,latY));
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
