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
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        // 使用类不太好，如果其他地方也有此类，那会导致其他地方也会有有
        this.bScroll=new BScroll(this.$refs.scroll,{
        probeType:3,
        pullUpload:true,
        click:true
        });
        //监听滚动事件
        this.bScroll.on('scroll',(position)=>{
        })
        //监听上拉加载更多，默认只能进行一次上拉加载更多
        this.bScroll.on('pullingUp',()=>{
            //发送网络请求，请求更多页的数据

            //等数据请求完成，并且将新的数据展示出来后
            bscroll.finishPullUp();
        })
    }
}
</script>

<style>

</style>