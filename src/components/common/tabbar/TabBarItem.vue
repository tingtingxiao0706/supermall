<template>
  <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive">
          <slot name="item-icon"></slot>
      </div>
      <div v-else>
          <slot name="item-icon-active"></slot>
      </div>
      <div :style="activeStyle">
          <slot name="item-text"></slot>
      </div>
  </div>
</template>

<script>
export default {
    name:'tabbaritem',
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    data(){
        return {
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path)!==-1;
        },
        activeStyle(){
            return this.isActive?{color:this.activeColor}:{}
        }
    },
    methods:{
        itemClick(){
            this.$router.push(this.path)
        }
    }
}
</script>

<style>
  .tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    font-size: 14px;
    padding-top: 3px;
  }
  .tab-bar-item img{
      width: 24px;
      height: 24px;
      /* img的3像素bug,图片会离div的下边框距离3px,解决方法是给img添加样式display:block;或者使用下面这种方式 */
      vertical-align: middle;
  }
  .active{
      color:#e0620d;
  }
</style>