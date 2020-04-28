<template>
  <div class="back-top">
      <img src="~assets/img/common/top.png" title="返回顶部" alt="">
  </div>
</template>

<script>
export default {
    name:'BackTop'
}
</script>

<style scoped>
    .back-top{
        position: fixed;
        right: 15px;
        bottom: 55px;
    }
    img{
        width: 43px;
        height: 43px;
    }
</style>