<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:'homeswiper',
    props:{
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components:{
        Swiper,
        SwiperItem
    },
    data(){
        return {
          isLoad:false
        }
    },
    methods:{
      imageLoad(){
        //轮播图里有很多张图片，但只要发送一次就可以了
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad=true;
        }
      }
    }
}
</script>

<style>

</style>