<template>
  <div>
    <div :class="[type === 'horizantal' ? 'vm-card-horizantal' : 'vm-card-vertical' , 'vm-panel']">
      <div class="card-img">
        <img :src="img" alt="">
        <div v-if="editable && type == 'vertical'" class="control">
        <span class="edit">
            <i class="fa fa-camera" @click="getSequence"></i>
        </span>
          <span class="delete">
          <i class="fa fa-check" @click="modal=true"></i>
        </span>
        </div>
      </div>
      <div class="card-desc panel-body">
        <h5>{{ title }}</h5>
        <p>{{ desc }}</p>
      </div>
      <Modal
        v-model="modal"
        title="Delete"
        ok-text="OK"
        cancel-text="Cancel"
        v-on:on-ok="deleteOk">
        Are you sure to delete this data?
      </Modal>
    </div>


  </div>

</template>
<script>
  import axios from 'axios'
  export default {
    name: 'VmCard',
    props: {
      type: {
        type: String,
        default: 'vertical'
      },
      editable: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Title'
      },
      img: {
        type: String,
        default: require('../../assets/img/img-1.jpg')
      },
      desc: {
        type: String,
        default: '0'
      },
      detailUrl: {
        type: String,
        default: '#'
      },
      editUrl: {
        type: String,
        default: '#'
      }
    },
    data: function () {
      return {
        modalDelete: false
      }
    },
    methods: {
      getSequence:function () {
       this.$emit('get-sequence')
      },
      deleteOk: function () {
        this.$emit('delete-ok')
      }
    }
  }
</script>
