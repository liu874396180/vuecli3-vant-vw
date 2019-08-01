<template>
  <div class="about">
    <scroll-number> s2c </scroll-number>
    <input type="text" placeholder="请输入">
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-loading type="spinner" />
  </div>
</template>
<script>
import scrollNumber from '@/components/scrollNumber.vue';
import { api } from "@/config";
export default {
  components: {
    scrollNumber,
  },
  data(){
    return{
      counting: false,
      value:44
    }
  },
  created(){
    this.$toast("responseData.head.MSG")
    this.immediatelyGet();
  },
  methods:{
    onChange(){},
    async immediatelyGet(){
      
      let params = { PHONE_NUM:13521598547,CHECK_SAFT_CODE_FLAG:"1"}
      let data = await this.$api.testGetCode(params);
      console.log("this.$api.testGetCode-", data);
     
    },
  }
}
</script>

<style lang="less" scoped>

input{
  height:30px;
}
input::-webkit-input-placeholder{
  font-size: 12px;
  color: forestgreen;
  line-height: 33px
}
</style>
