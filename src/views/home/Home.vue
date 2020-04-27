<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content">
      <home-swiper :banner="banner"/>
      <recommend-view :recommend='recommend'/>
      <feature-view/>
      <tab-control class="tab-control" @tabClick="tabClick" :titles="['流行','新款','精选']"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
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

import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  name:'home',
  components:{
    NavBar,
    Scroll,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
  },
  data(){
    return {
      banner:[],
      recommend:[],
      currentType:'pop',
      goods:{
        'pop':{page:1,list:[
          {
            link:'https://item.taobao.com/item.htm?id=615433403623&ns=1&abbucket=17#detail',
            image:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i4/1953544009/O1CN01CiyTIy1fUAQ8cL7TH_!!1953544009.jpg_360x360Q90.jpg_.webp',
            price:69,
            title:'女短袖宽松情侣装夏装显瘦超火反光泫雅风露脐短款上衣',
            cfav:1200
          },{
            link:'https://item.taobao.com/item.htm?id=615433403623&ns=1&abbucket=17#detail',
            image:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i4/1953544009/O1CN01CiyTIy1fUAQ8cL7TH_!!1953544009.jpg_360x360Q90.jpg_.webp',
            price:69,
            title:'女短袖宽松情侣装夏装显瘦超火反光泫雅风露脐短款上衣',
            cfav:1200
          },
          {
            link:'https://item.taobao.com/item.htm?id=615433403623&ns=1&abbucket=17#detail',
            image:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i4/1953544009/O1CN01CiyTIy1fUAQ8cL7TH_!!1953544009.jpg_360x360Q90.jpg_.webp',
            price:69,
            title:'女短袖宽松情侣装夏装显瘦超火反光泫雅风露脐短款上衣',
            cfav:1200
          },
          {
            link:'https://item.taobao.com/item.htm?id=615433403623&ns=1&abbucket=17#detail',
            image:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i4/1953544009/O1CN01CiyTIy1fUAQ8cL7TH_!!1953544009.jpg_360x360Q90.jpg_.webp',
            price:69,
            title:'女短袖宽松情侣装夏装显瘦超火反光泫雅风露脐短款上衣',
            cfav:1200
          }
        ]},
        'new':{page:0,list:[
          {
            link:'https://item.taobao.com/item.htm?id=599913097540&ns=1&abbucket=17',
            image:'http://g-search3.alicdn.com/img/bao/uploaded/i4/i4/894613446/O1CN012MKYsi1bKJONEFe03_!!894613446.jpg_360x360Q90.jpg_.webp',
            price:34.98,
            title:'女春季2020新款韩版洋气少女宽松网红印花长袖条纹上衣潮',
            cfav:1321
          },
          {
            link:'https://item.taobao.com/item.htm?id=599913097540&ns=1&abbucket=17',
            image:'http://g-search3.alicdn.com/img/bao/uploaded/i4/i4/894613446/O1CN012MKYsi1bKJONEFe03_!!894613446.jpg_360x360Q90.jpg_.webp',
            price:34.98,
            title:'女春季2020新款韩版洋气少女宽松网红印花长袖条纹上衣潮',
            cfav:1321
          },
          {
            link:'https://item.taobao.com/item.htm?id=599913097540&ns=1&abbucket=17',
            image:'http://g-search3.alicdn.com/img/bao/uploaded/i4/i4/894613446/O1CN012MKYsi1bKJONEFe03_!!894613446.jpg_360x360Q90.jpg_.webp',
            price:34.98,
            title:'女春季2020新款韩版洋气少女宽松网红印花长袖条纹上衣潮',
            cfav:1321
          },
          {
            link:'https://item.taobao.com/item.htm?id=599913097540&ns=1&abbucket=17',
            image:'http://g-search3.alicdn.com/img/bao/uploaded/i4/i4/894613446/O1CN012MKYsi1bKJONEFe03_!!894613446.jpg_360x360Q90.jpg_.webp',
            price:34.98,
            title:'女春季2020新款韩版洋气少女宽松网红印花长袖条纹上衣潮',
            cfav:1321
          }
        ]},
        'sell':{page:0,list:[
          {
            link:'https://item.taobao.com/item.htm?id=601694006838&ns=1&abbucket=17',
            image:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i3/3624224270/O1CN01eN8hPQ1hPhkwrgAgx_!!3624224270.jpg_360x360Q90.jpg_.webp',
            price:29.98,
            title:'春秋2020新款韩版条纹长袖短款女百搭宽松休闲学生黑色上衣潮',
            cfav:1454
          },
          {
            link:'https://item.taobao.com/item.htm?id=601694006838&ns=1&abbucket=17',
            image:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i3/3624224270/O1CN01eN8hPQ1hPhkwrgAgx_!!3624224270.jpg_360x360Q90.jpg_.webp',
            price:29.98,
            title:'春秋2020新款韩版条纹长袖短款女百搭宽松休闲学生黑色上衣潮',
            cfav:1454
          },
          {
            link:'https://item.taobao.com/item.htm?id=601694006838&ns=1&abbucket=17',
            image:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i3/3624224270/O1CN01eN8hPQ1hPhkwrgAgx_!!3624224270.jpg_360x360Q90.jpg_.webp',
            price:29.98,
            title:'春秋2020新款韩版条纹长袖短款女百搭宽松休闲学生黑色上衣潮',
            cfav:1454
          },
          {
            link:'https://item.taobao.com/item.htm?id=601694006838&ns=1&abbucket=17',
            image:'http://g-search2.alicdn.com/img/bao/uploaded/i4/i3/3624224270/O1CN01eN8hPQ1hPhkwrgAgx_!!3624224270.jpg_360x360Q90.jpg_.webp',
            price:29.98,
            title:'春秋2020新款韩版条纹长袖短款女百搭宽松休闲学生黑色上衣潮',
            cfav:1454
          }
        ]}
      }
    }
  },
  created(){
    //1、请求多个数据
    this.getMultidata();
    //请求商品数据
    //this.getGoods('pop')
  },
  methods:{
    //事件监听的相关方法
    tabClick(index){
      this.currentType=Object.keys(this.goods)[index];
    },
    // 网络请求相关的方法
    getMultidata(){
        getHomeMultidata().then(res=>{
        this.banner=res.data.banner.list;
        this.recommend=res.data.recommend.list;
      });
    },
    getGoods(type){
      let page=this.goods[type].page+1;
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page+=1;
      })
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
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control{
    /* 该属性的作用：在没有达到这个top值之前，跟着滚动，position: sticky;，当达到了，position: fixed; */
    position: sticky;
    top: 44px;
  }
  .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }
</style>