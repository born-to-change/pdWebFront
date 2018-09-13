<template>
    <div class="block">
      <div>
        <ul class="list-unstyled list-inline">
          <li class="imgLi"  v-for="(item,index) in imageList" :key="index"
              :item="item"
              :index="index">
            <img class="img" :src=item.fileUrl>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </div>
      <span class="demonstration">完整功能</span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>

</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        imageList:[],
        currentPage4: 1
      };
    },
    mounted: function () {
      var _this = this
      axios.post('http://172.18.32.192:8081/file/getImagesByUserId', {
        userId:localStorage.getItem("userId"),
        proId: localStorage.getItem("proId")
      }).then(function (response) {
        _this.imageList = response.data
      })
        .catch(function (error) {
          console.log(error)
        })
      this.imgListDialogVisible = true
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },

  }
</script>

<style scoped>

  .img{
    width: 128px;
    height: 64px;
  }
  .imgLi{
    float:left;
    /*list-style:none;*/
    margin-left: 5px;
  }
</style>
