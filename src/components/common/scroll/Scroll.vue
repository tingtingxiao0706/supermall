<template>
  <div class="wrapper" ref="scroll">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            bScroll:null
        }
    },
    mounted(){
        //1、创建BScroll对象
        // 使用类不太好，如果其他地方也有此类，那会导致其他地方也会有
        this.bScroll=new BScroll(this.$refs.scroll,{
            //实时监听和上拉加载更多不一定每个组件都需要，所以不能写固定的
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad,
            click:true
        });
        //2、监听滚动的位置
        if(this.probeType==2||this.probeType==3){
            this.bScroll.on('scroll',(position)=>{
                this.$emit('scroll',position);
            })
        }
        
        //3、监听上拉加载更多，默认只能进行一次上拉加载更多
        if(this.pullUpLoad){
            this.bScroll.on('pullingUp',()=>{
                //发送网络请求，请求更多页的数据
                this.$emit('pullingUp');
                //等数据请求完成，并且将新的数据展示出来后
                //bscroll.finishPullUp();
            })
        }
    },
    methods:{
        scrollTo(x,y,time=500){
            this.bScroll && this.bScroll.scrollTo(x,y,time);
        },
        finishPullUp(){
            this.bScroll && this.bScroll.finishPullUp();
        },
        refresh(){
            this.bScroll && this.bScroll.refresh();
        },
        getScrollY(){
            return this.bScroll ? this.bScroll.y : 0;
        }
    }
}
</script>

<style>

</style>