<template>
  <VmImageList :data="dataImageList" @delete-ok="deletefn" class="vm-margin"></VmImageList>
</template>

<script>
  import axios from 'axios'
  import VmImageList from '../../components/form/vm-image-list'
  export default {
    name: 'ImageList',
    components: {
      VmImageList
    },
    data: function () {
      return {
        dataImageList: []
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
