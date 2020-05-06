<template>
  <div class="good-item" @click="itemClick">
      <img :src="goodItem.show.img" alt="" @load="imgLoad">
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
    methods:{
        imgLoad(){
            this.$bus.$emit('itemImageLoad');
        },
        itemClick(){
            this.$router.push('/detail/'+this.goodItem.iid);
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