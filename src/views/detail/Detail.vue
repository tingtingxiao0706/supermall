<template>
  <div id="detail">
      <detail-nav-bar class="detail-nav" ref="navbar" @titleClick="titleClick"/>
      <scroll class="content" ref="bscroll" :probe-type="3" @scroll="contentScroll">
            <detail-swiper :banners="banners"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"/>
            <goods-list ref="recommend" :goods="recommends"/>
      </scroll>
      <back-top v-show="isShowBackTop" @click.native="backClick"/>
      <detail-bottom-bar @addCart="addToCart"/>
      <!-- <toast :message="message" :show="show"/> -->
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
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'    

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

import {mapActions} from 'vuex'

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
            themeTopYs:[0,1000,2000,3000],
            getThemeTopY:null,
            currentIndex:0,
            message:'',
            show:false
        }
    },
    //混入
    mixins:[itemListenerMixin,backTopMixin],
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        Scroll,
        GoodsList,
        DetailBottomBar,
        // Toast
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

        //3、请求推荐数据
        getRecommend().then(res=>{
            this.recommends=res.data.list;
        })

         /*
            //第一次获取，值不对
            //值不对原因：this.$refs.params.$el没有渲染
            this.themeTopYs=[];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

            //导航跳转
            this.$nextTick(()=>{
                //第二次获取，值不对
                //值不对的原因：图片没有计算在内
                //根据最新数据，最新的DOM是渲染好的
                //但是图片依然是没有加载完（目前获取到的offsetTop不包括图片）
                //offsetTop值不对的时候，都是因为图片的问题
                this.themeTopYs=[];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                console.log(this.themeTopYs);
            })
        */

       //4、给getThemeTopY赋值（对给this.getThemeTopY赋值的操作进行防抖）
        this.getThemeTopY=debounce(()=>{
            this.themeTopYs=[];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE);//解决滚动内容，显示对应的标题
        },100)
    },
    methods:{
        ...mapActions(['addCart']),
        //解决滚动问题
        imageLoad(){
            //直接这样写的话会调用很多次，防抖就相当于无效
            // let refresh=debounce(this.$refs.bscroll.refresh,500);
            // refresh();

            //只调用一次
            this.refresh();
            this.getThemeTopY();
        },
        titleClick(index){
            //获取offsetTop值不能在mounted中，因为数据是异步请求过来的，也不能写在请求数据函数中，因为数据虽然请求过来了，但子组件还没渲染出来
            //方法1：写在updated生命周期函数中,但调用频繁
            //方法2：在请求数据的函数中使用$nextTick钩子函数，下一次轮询执行，值不对
            //方法3：写在图片加载完成的函数中
            this.$refs.bscroll.scrollTo(0,-this.themeTopYs[index],200);
        },
        contentScroll(position){
            //1、获取y值
            const positionY=-position.y;

            //2、positionY与主题中值进行对比
            // for(let i in this.themeTopYs){
                //问题1：es6语法存在的问题，这里的i是字符串，不是number类型
                //问题2：i+1最后一个是undefined
                //问题3：频繁操作
                // if(positionY>this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
                //     this.$refs.navbar.currentIndex=i;
                // }

                let length=this.themeTopYs.length;
                // i=parseInt(i);//将i转换为number类型
                //this.currentIndex!=i解决频繁操作

                //普通写法：不需要给this.themeTopYs再添加一个值
                // if(this.currentIndex!=i && ((i<length-1 && positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])||(i==length-1 && positionY>=this.themeTopYs[i]))){
                //     this.currentIndex=i;
                //     this.$refs.navbar.currentIndex=i;
                //     console.log(i)
                // }
            // }   
            for(let i=0;i<length-1;i++){
                //hack写法：给this.themeTopYs再添加一个值，就是Number.MAX_VALUE。这种写法能提高性能
                if(this.currentIndex!=i && (positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1])){
                    this.currentIndex=i;
                    this.$refs.navbar.currentIndex=i;
                }
            }

            //3、是否返回顶部，使用混入，首页也可以使用混入
            this.listenShowBackTop(position);
        },
        addToCart(){
            //1、获取购物车需要展示的信息
            const product={}
            product.image=this.banners[0];
            product.title=this.goods.title;
            product.desc=this.goods.desc;
            product.price=this.goods.realPrice;
            product.iid=this.iid;
            //2、将商品添加到购物车里（1.promise 2.mapActions)
            // this.$store.dispatch('addCart',product).then(res=>{
            //     console.log(res);
            // })
            //可使用mapActions
            this.addCart(product).then(res=>{

                //toast未封装成插件前的写法
                // this.message=res;
                // this.show=true;

                // setTimeout(()=>{
                //     this.message='';
                //     this.show=false;
                // },1500)

                //toast封装成插件的方式
                this.$toast.show(res,1500);
            })

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
    /*
        //方法2：
        updated(){
            this.themeTopYs=[];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            console.log(this.themeTopYs)
        },
    */
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
        height: calc(100% - 44px - 58px);
    }
</style>