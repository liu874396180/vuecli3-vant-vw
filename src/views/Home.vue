<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <p>fsdsd</p>
    <b @click="testC">改水电暖</b>
    
  </div>
</template>

<script>
// @ is an alias to /src   ----  : 文件需带后缀
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return{
      msg:"312312314143141413213"
    }
  },
  created(){
    this.$toast('提示文案');
  },
  methods: {
    testC(){
      setTimeout(() => {
        console.log("rr")
      }, 1000);
    },
    swipeleft() {
        console.log('左滑动')
    },
    swiper() {
        // 通过event拿到坐标初始量和移动量
        console.log(event.starDis)
        console.log(event.moveDis)
        console.log('我是移动事件')
    }
}
}
</script>
<style lang="less" scoped>

.home{
  p{
    font-size: 36px;
    position: relative;
    z-index: 8888;
    border-bottom: 0.5px solid #ccc;
  }
  b{
    width:55vw;
    height:90vh
  }
}
</style>
