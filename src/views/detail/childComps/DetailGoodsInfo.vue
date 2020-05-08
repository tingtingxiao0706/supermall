<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length!==0">
      <div class="info-desc clear-fix">
          <div class="start"></div>
          <div class="desc">{{detailInfo.desc}}</div>
          <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
          <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">
      </div>
  </div>
</template>

<script>
export default {
    name:'DetailGoodsInfo',
    props:{
        detailInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            counter:0,
            imagesLength:0
        }
    },
    methods:{
        imgLoad(){
            //当所有的图片都加载完成后调用，不要每张图片加载完就触发，对性能不好
            if(++this.counter==this.imagesLength){
                this.$emit('imageLoad');
            }
        }
    },
    watch:{
        detailInfo(){
            //获取图片的数量，在上面的图片加载函数中使用这个数据，避免了每次计算图片的个数
            this.imagesLength=this.detailInfo.detailImage[0].list.length;
        }
    }
}
</script>

<style scoped>
    .goods-info{
        padding: 20px 0;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-list img{
        width: 100%;
    }
    .info-desc{
        padding: 0 15px;
    }
    .desc{
        padding: 15px 0;
    }
    .start,.end{
        width: 90px;
        height: 1px;
        background-color: #a3a3a5;
        position: relative;
    }
    .start{
        float: left;
    }
    .end{
        float:right;
    }
    .start::before,.end:after{
        content:'';
        width: 5px;
        height: 5px;
        position: absolute;
        background-color: #333;
        bottom: 0;
    }
    .end:after{
        right: 0;
    }
    .info-key{
        padding: 10px 20px;
    }
</style>