<template>
  <div id="hy-swiper">
      <div @mouseover="stopTimer" @mouseleave="startTimer" class="swiper">
          <slot name="slide" ></slot>
      </div>
      <div class="indicator">
          <div v-if="count>1">
              <div v-for="item in getSlideCount" :class="{'active':item==currentIndex-1}" :key="item" class="indi-item"></div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'swiper',
    props:['count'],
    data(){
        return {
            // 问题：为什么在slideCount在created生命周期函数中获取不到，是空的
            //答案：父组件中的要就要传递的  props  属性 是通过 发生ajax请求回来的, 请求的这个过程是需要时间的，但是子组件的渲染要快于ajax请求过程，
            //此时  created 、 mounted  这样的只会执行一次的生命周期钩子，已经执行了，但是 props 还没有流进来（子组件），所以只能拿到默认值。
            slideCount:[],//元素个数
            currentIndex:0,//当前的index
        }
    },
    mounted(){
        this.startTimer();
    },
    methods:{
        play(){
            if(this.currentIndex>this.count-1){
                this.currentIndex=0;
            }
            let slideEl=document.querySelector('.swiper');
            let width=slideEl.offsetWidth;
            slideEl.style.marginLeft=-width*this.currentIndex+'px';
            this.currentIndex+=1;
        },
        startTimer(){
            if (this.timer) {
                window.clearInterval(this.timer)
                this.timer = null
            }
            this.timer=window.setInterval(this.play,1500)
        },
        stopTimer(){
            window.clearInterval(this.timer);
            this.timer=null;
        }
    },
    computed:{
        getSlideCount(){
            let arr=[];
            for(let i=0;i<this.count;i++){
                arr.push(i);
            }
            return arr;
        }
    },
    destroyed(){
        clearInterval(this.timer);
        this.timer=null;
    }
}
</script>

<style scoped>
#hy-swiper{
    overflow: hidden;
    position: relative;
}
.swiper{
    display:flex;
    width: 100%;
    transition: margin-left .3s;
}
.indicator{
    display: flex;
    justify-content: center;
    width: 100%;
    bottom: 8px;
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
}
.indi-item{
    display:inline-block;
    width:10px;
    height:10px;
    margin:0 3px;
    border:1px solid white;
    border-radius:50%;
    cursor:pointer;
}
.indi-item.active{
    background-color: #fff;
}
</style>