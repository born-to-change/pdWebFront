<template>
  <div class="vm-image-list">
    <Row class="image-list-heading vm-panel">
      <div class="panel-heading">
        <img class="camera_image" :src="bindingImg" />
        <img class="camera_image" :src="camImage" alt="选择该摄像头下行人图片" />
        <input name="imgbtn" type="image" src="http://172.18.32.192:8082/code/toolimg/search.png" @click="getTopPerson" class="search-person">
        <el-input-number style="margin-left: 20px" v-model="topNum" @change="handleChange" :min="1" :max="40" label="描述文字"></el-input-number>
        <br>
        <br><span style="margin-left: 110px">目标行人</span>
        <span style="margin-left: 100px">摄像头下行人图片</span>  <span style="margin-left: 200px">检索目标行人</span>
        <span style="margin-left: 50px">返回top行人数</span>

      </div>
      <Row type="flex" align="middle" justify="space-between" class="panel-body">
       <div class="search-bar">
          <Input placeholder="Please enter ..." v-model="keyword" style="width: 300px"></Input>
          <Button type="ghost" @click="search"><i class="fa fa-search"></i></Button>
        </div>
        <Row type="flex" align="middle" class="page">
          <span>Show</span>
          <Input :max="40" :min="1" :number="true" v-model="showNum" class="input-number" @on-change=" updateDataShow "></Input>
          <span class="margin-end">/ Page</span>
          <span class="total">Total {{ data.length }}</span>
          <Page :total="data.length" :current="currentPage" :page-size="showNum" @on-change="pageChange"></Page>
        </Row>
      </Row>
    </Row>
    <Row class="image-list" :gutter="16">
      <Col :lg="2" :sm="4" class="vm-margin" v-for="item in dataShow" :key="item.id">
        <VmCard :editable="true" :title="item.title" :img="item.img" :desc="item.desc" :detailUrl="item.detailUrl" :editUrl="item.editUrl" @delete-ok=" deleteOk(item)" @get-sequence="getSequence(item.title)"></VmCard>
      </Col>
    </Row>
  </div>
</template>

<script>
  import VmCard from './vm-card'
  import axios from 'axios'
  export default {
    name: 'VmImageList',
    components: {
      VmCard
    },
    props: {
      bindingImg:{
        type: String
      },
      camImage:{
        type: String
      },
      // origin data
      data: {
        type: Array,
        default: function () {
          return [
            {
              id: '19920805',
              title: 'Title',
              img: require('../../assets/img/img-1.jpg'),
              desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s ly dummy tly dummy tly dummy tly dummy tly dummy tly dummy t',
              to: '#'
            }
          ]
        }
      }
    },
    data: function () {
      return {
        topNum: 10,
        keyword: '', // keyword for search
        dataShow: [], // data for showing
        showNum: 48, // number of item per page
        currentPage: 1
      }
    },
    methods: {
      updateDataShow: function () {
        let startPage = (this.currentPage - 1) * this.showNum
        let endPage = startPage + this.showNum
        this.dataShow = this.data.slice(startPage, endPage)
      },
      pageChange: function (page) {
        this.currentPage = page
        this.updateDataShow()
      },
      getTopPerson:function(){
        var _this = this
        var camera = JSON.parse(localStorage.getItem('currentCam'))
        axios.post('http://172.18.32.192:5009/jiansuo', {
          size: _this.topNum,
          userName:localStorage.getItem("userName"),
          proId: localStorage.getItem("proId"),
          searchUrl: '/disk1/PersonSearchPrj/files'+_this.bindingImg.split('/file',2)[1],
          camName:camera.camName,
        }).then(function (response) {
          _this.isShowPersonImg = false
         _this.dataShow = response.data
          console.log(response.data)
        })
          .catch(function (error) {
            console.log(error)
          })

      },
      search: function () {
        let that = this
        let tempData = that.data
        that.dataShow = []
        tempData.forEach(function (elem) {
          for (let i in elem) {
            if (elem[i].toString().indexOf(that.keyword) > -1) {
              that.dataShow.push(elem)
              return
            }
          }
        })
      },
      getSequence:function (imgName) {
        this.$emit('get-sequence',imgName)
      },
      deleteOk: function (data) {
        this.$emit('delete-ok', data)
      }
    },
    watch: {
      data: function () {
        this.dataShow = this.data.slice(0, this.showNum) // update dataShow once data changed
      }
    },
    mounted: function () {
      this.dataShow = this.data.slice(0, this.showNum)
    }
  }
</script>

<style scoped>
  .camera_image{
    margin-bottom: 10px;
    margin-left: 100px;
    float: left;
    width: 75px;
    height: 100px;
  }

  .search-person{
    margin-left: 200px;
    width: 100px;
    height: 100px;

  }
</style>
