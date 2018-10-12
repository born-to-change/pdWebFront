<template>
  <div class="amap-page-container">
    <!--<img src="../../assets/logo.png"/>-->
    <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
      <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>
      <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index" offset:="marker.offset" :events="marker.events"
                      :visible="marker.visible" :draggable="marker.draggable" :content="marker.content" :vid="index"></el-amap-marker>
      <!--<el-amap-ground-image v-for="groundimage in groundimages" :key="key" :url="groundimage.url" :bounds="groundimage.bounds"-->
                            <!--:events="groundimage.events"></el-amap-ground-image>-->

      <el-amap-polyline :editable="polyline.editable"  :strokeStyle="polyline.strokeStyle"
                        :strokeDasharray="polyline.strokeDasharray" :path="polyline.path"
                        :lineJoin="polyline.lineJoin" :strokeColor="polyline.strokeColor"  :events="polyline.events"></el-amap-polyline>

      <!--<el-amap-text v-for="text in texts" :text="text.text" :key="index" :offset="text.offset" :position="text.position"
      :events="text.events"></el-amap-text>-->
    </el-amap>
  </div>
</template>

<script>
//  const exampleComponents = {
//    props: ['text'],
//    template: `<div>text from  parent: {{text}}</div>`
//  }
  import axios from 'axios'
  import AMap from 'vue-amap'
  export default{
    data() {
      return {
        slotStyle: {
          padding: '2px 8px',
          background: '#122',
          color: '#333',
          border: '1px solid #aaa'
        },
        zoom: 15,
        center: [116.405306, 39.904989],
        markers: [
//          {
//            position: [121.5273285, 31.21515044],
//            content:'<img src="http://172.18.32.192:8082/code/toolimg/startMark.png"/>',
//            events: {
//              click: () => {
//                alert('click marker');
//              },
//              dragend: (e) => {
//                console.log('---event---: dragend')
//                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
//              }
//            },
//            visible: true,
//            draggable: false,
////            template: '<span>1</span>',
//          }
        ],
        renderMarker: {
          position: [121.5273285, 31.21715058],
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
          position: [121.5273285, 31.21315058],
          contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: 'father is here'}}, ['xxxxxxx'])
        },
        slotMarker: {
          position: [121.5073285, 31.21715058]
        },
//        groundimages: [
//          {
//            url: 'http://172.18.32.192:8082/code/toolimg/startMark.png',
//            bounds: [[116.4273285, 39.91515044], [116.4373285, 39.92515044]],
//            events: {
//              click() {
//                alert('click groundimage');
//              }
//            }
//          }
//        ],

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
//          strokeDasharray: [5,2,10,4,20,6,30,8,40,10,50,12,60,14,70,16,80,18,90,20,100,22,110,24,120,26,130,28,140,30,150,32,160
//          ,34,178,36,180,38,190,40,200,50,220,52,240,54,260,56,280,58,300,60,320,62,350,46,380,50,420],
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

        _this.markers[0] = {
          position: lineArr[0],
          offset:(-17,-34),
          content:'<img style="width: 20px;height: 30px" src="http://172.18.32.192:8082/code/toolimg/sMark.png"/>',
        }
        for(var i=1;i<lineArr.length-1;i++){
          _this.markers[i] = { position:lineArr[i],
            content:'<img style="width: 20px;height: 30px" src="http://172.18.32.192:8082/code/toolimg/passMark.png"/>'
        };
        }
        _this.markers[lineArr.length-1] = {
          position: lineArr[lineArr.length-1],
          offset:(-17,-34),
          content:'<img style="width: 20px;height: 30px" src="http://172.18.32.192:8082/code/toolimg/eMark.png"/>',
        }
        console.log(lineArr[4])
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
