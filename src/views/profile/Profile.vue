<template>
  <div>
      <home-swiper :banners="banners"/>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import {getHomeMultidata,getHomeGoods} from 'network/home'


export default {
  name:'Profile',
  components:{
    HomeSwiper
  },
  data(){
    return {
      banners:[]
    }
  },
  created(){
    //1、请求多个数据
    this.getMultidata();
  },
  methods:{
    // 网络请求相关的方法
    getMultidata(){
        getHomeMultidata().then(res=>{
        this.banners=res.data.banner.list;
        this.recommend=res.data.recommend.list;
      });
    },
    //解决tabControl2吸顶问题，监听图片是否加载完成,获取offsetTop
    // swiperImageLoad(){
    //   this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    // },
  }
}
</script>

<style>

</style>