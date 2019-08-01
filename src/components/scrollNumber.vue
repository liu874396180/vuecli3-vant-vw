<template>
  <div class="scrollNumber">
    <div class="box">
        <p class="box-item">
            <span>1</span>
        </p>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  
  data(){
    return{
      counting: false
    }
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>


</style>
