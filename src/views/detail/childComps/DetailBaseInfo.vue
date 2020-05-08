<template>
  <div v-if="Object.keys(goods).length!==0" class="base-info">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
          <span class="n-price">{{goods.newPrice}}</span>
          <span class="o-price">{{goods.oldPrice}}</span>
          <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-service">
          <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
              <img :src="goods.services[index-1].icon" alt="">
              <span>{{goods.services[index-1].name}}</span>
          </span>
      </div>
  </div>
</template>

<script>
export default {
    name:"DetailBaseInfo",
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
    .base-info{
        border-bottom: 5px solid rgba(219, 217, 217, 0.5);
    }
    .info-title{
        padding: 5px;
    }
    .info-price{
        display: flex;
        align-items: center;
        height: 40px;
        margin: 5px 0 10px 10px;
    }
    .n-price{
        font-size: 20px;
        color: var(--color-tint);
    }
    .o-price{
        font-size: 12px;
        text-decoration: line-through;
        padding: 0 5px;
        color: rgb(175, 172, 172);;
    }
    .discount{
        font-size: 12px;
        background: var(--color-tint);
        color: #fff;
        display: inline-block;
        padding: 2px 5px;
        align-self: flex-start;
        text-align: center;
        border-radius: 10px;
    }
    .info-other{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        padding: 10px 8px;
        color: rgb(175, 172, 172);;
        border-bottom: 1px solid rgba(219, 217, 217, 0.5);
    }
    .info-service{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding: 10px 5px;
    }
    .info-service img{
        height: 12px;
        vertical-align: middle;
        padding-right: 2px;
    }
</style>