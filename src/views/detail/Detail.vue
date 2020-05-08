<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav"/>
      <scroll class="content" ref="bscroll">
            <detail-swiper :banners="banners"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info :param-info="paramInfo"/>
            <detail-comment-info :comment-info="commentInfo"/>
            <goods-list :goods="recommends"/>
      </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
    name:'Detail',
    data(){
        return {
            iid:null,
            banners:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            //itemImgListener:null，放入混入中
        }
    },
    //混入
    mixins:[itemListenerMixin],
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Scroll,
        GoodsList
    },
    created(){
        //1、保存传入的iid
        this.iid=this.$route.params.iid;

        //2、请求详情数据
        getDetail(this.iid).then(res=>{
            //1、获取顶部的轮播图数据
            const data=res.result;
            this.banners=data.itemInfo.topImages;

            //2、获取商品信息
            this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);

            //3、创建店铺信息的对象
            this.shop=new Shop(data.shopInfo);

            //4、保存商品详情信息
            this.detailInfo=data.detailInfo;

            //5、获取参数的信息
            this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule);

            //6、获取评论信息
            if(data.rate.cRate!=0){
                this.commentInfo=data.rate.list[0];
            }
        });
        getRecommend().then(res=>{
            this.recommends=res.data.list;
        })
    },
    methods:{
        imageLoad(){
            this.$refs.bscroll.refresh();
        }
    },
    mounted(){
        //方式2可使用混入，首页和详情页代码相同，首页也可使用混入
            const refresh=debounce(this.$refs.bscroll.refresh,500);
            //解决首页和详情页监听同一个事件
            //方式2：对监听的事件进行保存,然后在离开首页的时候取消这个事件
            this.itemImgListener=()=>{
            //this.$refs.bscroll.refresh();//这样会调用8次
            refresh();
            };
            this.$bus.$on('itemImageLoad',this.itemImgListener);

        //方式1：路由
        // this.$bus.$on('detailItemImageLoad',()=>{
        //   //this.$refs.bscroll.refresh();//这样会调用8次
        //   refresh();
        // });
    },
    //detail页面没有进行缓存，所以没有deactivated生命周期函数,所以在destroyed生命周期函数中
    destroyed(){
        this.$bus.$off('itemImageLoad',this.itemImgListener);
    }
}
</script>

<style scoped>
    #detail{
        background-color: #fff;
        z-index: 9;
        position: relative;
        height: 100vh;
    }
    .detail-nav{
        position: relative;
        background-color:#fff;
        z-index: 9;
    }
    .content{
        height: calc(100% - 44px);
    }
</style>