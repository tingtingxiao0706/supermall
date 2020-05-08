<template>
  <div class="good-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imgLoad">
      <div class="good-info">
          <p>{{goodItem.title}}</p>
          <span class='sign'>￥</span>
          <span class="price">{{goodItem.price}}</span>
          <span class="collect">{{goodItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props:{
        goodItem:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    filters:{
        getPrice:function(price){
            return price.toFixed(2);
        }
    },
    computed:{
        showImage(){
            return this.goodItem.image||this.goodItem.show.img
        }
    },
    methods:{
        imgLoad(){
            //首页和详情页都需要进行图片监听，但事件总线应该发送到对应的页面，所以需要进行判断
            //方式1：通过路由进行判断
            // if(this.$route.path.indexof('/home')){
            //     this.$bus.$emit('homeItemImageLoad');
            // }else if(this.$route.path.indexof('/detail')){
            //     this.$bus.$emit('DetailItemImageLoad');
            // }

            //方式2：不同的页面监听同一个事件，在页面离开的时候，取消事件
            this.$bus.$emit('itemImageLoad');
            
        },
        itemClick(){
            // if(this.goodItem.iid){
                this.$router.push('/detail/'+this.goodItem.iid)
            // }else{
            //     this.$router.push('/detail/'+this.goodItem.item_id)
            // }
        }
    }
}
</script>

<style scoped>
    .good-item{
        width: 45%;
        font-size: 14px;
        margin-bottom: 10px;
    }
    .good-info{
        padding: 5px;
    }
    p{
        padding-bottom: 5px;
        width: 100%;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    img{
        width: 100%;
    }
    .sign,.price{
        color: var(--color-tint);
    }
    .price{
        margin-right: 20px;
    }
    .collect{
        margin-left: 5px;
        position: relative;
    }
    .collect:before{
        content:'';
        width: 15px;
        height: 15px;
        position: absolute;
        left: -15px;
        background-size: cover;
        background-image:url('~assets/img/common/collect.svg');
    }
</style>