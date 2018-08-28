<template>
  <div class="videoSize">
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="100%"
      :before-close="handleClose">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>
<style scoped>
  .videoSize{
    width: 500px;
    height: 700px;
  }
</style>
