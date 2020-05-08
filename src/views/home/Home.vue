<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
        @tabClick="tabClick" 
        ref="tabControl1" 
        :titles="['流行','新款','精选']" 
        class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
        ref="bscroll" 
        :probe-type="3" 
        :pull-up-load="true"
        @pullingUp="loadMore"
        @scroll="contentScroll"
        >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommend='recommend'/>
      <feature-view/>
      <tab-control 
        @tabClick="tabClick" 
        ref="tabControl2" 
        :titles="['流行','新款','精选']"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

export default {
  name:'home',
  components:{
    NavBar,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommend:[],
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      itemImgListener:null
    }
  },
  created(){
    //1、请求多个数据
    this.getMultidata();
    //2、请求商品数据
    this.getGoods('pop')
  },
  //由于首页和详情页中的mounted中的代码一样，代码重复，可以使用混入来提高性能，common中的mixin文件
  mounted(){
    //1、监听item中图片加载完成
    //在created中监听可能会导致一个错误：如果scroll组件还没渲染出来，是获取不到scroll的
    //但比较频繁，需要优化,防抖函数
    const refresh=debounce(this.$refs.bscroll.refresh,500);

    //还没创建详情页的写法
    // this.$bus.$on('itemImageLoad',()=>{
    //   //this.$refs.bscroll.refresh();//这样会调用8次
    //   refresh();
    // });

    //解决首页和详情页监听同一个事件
    //方式2：对监听的事件进行保存,然后在离开首页的时候取消这个事件
    //方式2可使用混入，提高性能
    this.itemImgListener=()=>{
      //this.$refs.bscroll.refresh();//这样会调用8次
      refresh();
    };
    this.$bus.$on('itemImageLoad',this.itemImgListener);

    //方式1：路由
    // this.$bus.$on('homeItemImageLoad',()=>{
    //   //this.$refs.bscroll.refresh();//这样会调用8次
    //   refresh();
    // });

    //2、获取tabControl的offsetTop
    //组件没有offsetTop属性
    //所有的组件都有一个属性$el，用于获取组件中的元素
    //this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;//这样获取到的值不正确，因为有些图片还没加载出来
    //一般影响的主要是轮播图的图片加载，所以需要监听轮播图的加载
  },
  activated(){
    this.$refs.bscroll.scrollTo(0,this.saveY,0);
    this.$refs.bscroll.refresh();
  },
  deactivated(){
    //1、保存离开时滚动的位置
    this.saveY=this.$refs.bscroll.getScrollY();

    //2、取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener);
  },
  methods:{
    //事件监听的相关方法
    tabClick(index){
      this.currentType=Object.keys(this.goods)[index];
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    //返回顶部
    backClick(){
      this.$refs.bscroll.scrollTo(0,0);
    },
    //监听scroll的滚动事件
    contentScroll(position){
      //1、判断BackTop是否显示
      this.isShowBackTop=(-position.y)>1000;

      //2、决定tabControl2是否吸顶（position:fixed）
      this.isTabFixed=(-position.y)>this.tabOffsetTop;
    },
    //解决tabControl2吸顶问题，监听图片是否加载完成,获取offsetTop
    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    },
    // 网络请求相关的方法
    getMultidata(){
        getHomeMultidata().then(res=>{
        this.banners=res.data.banner.list;
        this.recommend=res.data.recommend.list;
      });
    },
    getGoods(type){
      let page=this.goods[type].page+1;
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page+=1;

        //完成上拉加载更多
        this.$refs.bscroll.finishPullUp();
      })
    },
    loadMore(){
     this.getGoods(this.currentType);
      //图片是异步加载的，当拉上加载的过程中，图片还没加载完成，导致图片的高度不计算在内，需要手动刷新滚动
     //this.$refs.scroll.refresh();
     //监听图片加载来代替上面的代码
    }
  }
}
</script>

<style scoped>
  #home{
    height: 100vh;
  }
  .home-nav{
    background: var(--color-tint);
    color: #fff;
    /* 由于现在scroll区域的高度是固定的，滚动是在这个scroll内部进行滚动的，下面的固定定位不需要了 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  /* 使用了better-scroll插件后，下面这种不起效果了 */
  /* .tab-control{
    该属性的作用：在没有达到这个top值之前，跟着滚动，position: sticky;，当达到了，position: fixed;
    position: sticky;
    top: 44px;
  } */
  .tab-control{
    position: relative;
    z-index: 9;
  }
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    margin-top: 44px;
  }
</style>