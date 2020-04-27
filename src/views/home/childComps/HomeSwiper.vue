<template>
  <swiper :count="this.banner.length">
      <swiper-item slot="slide" v-for="(item,index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:'homeswiper',
    props:['banner'],
    components:{
        Swiper,
        SwiperItem
    },
    data(){
        return {
        }
    },
}
</script>

<style>

</style>