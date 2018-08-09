<!--
  描述：拖放地图组件，默认尺寸是 500 * 300

  接收属性参数：
    lat: 纬度
    lng: 经度

  自定义事件：
    drag: 拖放完成事件

  示例：
    <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388"></mapDrag>
-->
<template>
  <div class="m-map">
    <div class="linkage">
      <el-select
        v-model="sheng"
        @change="choseProvince"
        placeholder="省级地区">
        <el-option
          v-for="item in province"
          :key="item.id"
          :label="item.value"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select
        v-model="shi"
        @change="choseCity"
        placeholder="市级地区">
        <el-option
          v-for="item in shi1"
          :key="item.id"
          :label="item.value"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button @click="submitLocation">确定</el-button>
    </div>
    <div class="search" v-if="placeSearch">
      <input type="text" placeholder="请输入关键字" v-model="searchKey">
      <button @click="handleSearch">搜索</button>
      <div id="js-result" v-show="searchKey" class="result"></div>
    </div>
    <div id="js-container" class="map"></div>
  </div>
</template>

<script>
  import remoteLoad from '../../util/remoteLoad.js'
//  import { MapKey,MapCityName as city } from '../../config/config'
  import axios from'axios'
  const MapKey = 'cfd8da5cf010c5f7441834ff5e764f5b';
  // 地图限定城市
  export default {
    props: ['lat', 'lng'],

    data () {
      return {
        searchKey: '',
        placeSearch: null,
        dragStatus: false,
        AMapUI: null,
        AMap: null,
        mapJson:'../static/json/map.json',
        province:'',
        sheng: '',
        shi: '',
        shi1: [],
//        var marker = new AMap.Marker({
//          position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
//          title: '北京'
//        });
//
//// 将创建的点标记添加到已有的地图实例：
//      map.add(marker);
//
//// 移除已创建的 marker
//      map.remove(marker);
      }
    },
    watch: {
      searchKey () {
        if (this.searchKey === '') {
          this.placeSearch.clear()
        }
      }
    },
    methods: {
      submitLocation(){
        this.initMap()
      },
      // 搜索
      handleSearch () {
        if (this.searchKey) {
          this.placeSearch.search(this.searchKey)
        }
      },
      // 实例化地图
      initMap () {
        // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
        let AMapUI = this.AMapUI = window.AMapUI
        let AMap = this.AMap = window.AMap
        AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
          let mapConfig = {
            zoom: 16,
            cityName:this.shi
          }
          var lat = this.lat
          var lng = this.lng
          if (this.lat && this.lng) {
            mapConfig.center = [this.lng, this.lat]
          }
          let map = new AMap.Map('js-container', mapConfig)
          AMap.service('AMap.PlaceSearch', () => {
            this.placeSearch = new AMap.PlaceSearch({
              pageSize: 5,
              pageIndex: 1,
              citylimit: true,
              city: this.shi,
              map: map,
              panel: 'js-result'
            })
          })
//          var marker = new AMap.Marker({
//            position: new AMap.LngLat(lng,lat),
//          });
//          marks.push(marker)
//          console.log(marker)
//          map.add(marks);
          // 启用工具条
          AMap.plugin(['AMap.ToolBar'], function () {
            map.addControl(new AMap.ToolBar({
              position: 'RB'
            }))
          })
          // 创建地图拖拽
          let positionPicker = new PositionPicker({
            mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
            map: map // 依赖地图对象
          })

          // 拖拽完成发送自定义 drag 事件
          positionPicker.on('success', positionResult => {
            // 过滤掉初始化地图后的第一次默认拖放
            if (!this.dragStatus) {
              this.dragStatus = true
            } else {
              this.$emit('drag', positionResult)
            }
          })
          // 启动拖放
          positionPicker.start()

        })
      },
//      submitLocation:function () {
//        MapCityName = this.shi
//      },
      // 加载china地点数据，三级
      getCityData:function(){
        var that = this
        axios.get(this.mapJson).then(function(response){
          if (response.status==200) {
            var data = response.data
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
          }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            // console.log(this.E)
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        // console.log(this.E)
      },
    },
    async created () {
      // 已载入高德地图API，则直接初始化地图
      this.getCityData()
      if (window.AMap && window.AMapUI) {
        this.initMap()
        // 未载入高德地图API，则先载入API再初始化
      } else {
        await remoteLoad(`http://webapi.amap.com/maps?v=1.3&key=${MapKey}`)
        await remoteLoad('http://webapi.amap.com/ui/1.0/main.js')
        this.initMap()
      }
    }
  }
</script>

<style slang="css">
  .m-map{ min-width: 500px; min-height: 300px; position: relative; }
  .m-map .map{ width: 100%; height: 100%; }
  .m-map .search{ position: absolute; top: 30px; left: 10px; width: 285px; z-index: 1; }
  .m-map .search input{ width: 180px; border: 1px solid #ccc; line-height: 20px; padding: 5px; outline: none; }
  /*.m-map .search button{ line-height: 26px; background: #fff; border: 1px solid #ccc; width: 50px; text-align: center; }*/
  .m-map .result{ max-height: 300px; overflow: auto; margin-top: 10px; }
</style>
