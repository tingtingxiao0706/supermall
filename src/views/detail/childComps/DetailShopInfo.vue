<template>
  <div class="shop-info" v-if="Object.keys(shop).length!==0">
      <div class="shop-base">
          <img class="shop-logo" :src="shop.logo" alt="">
          <p class="shop-name">{{shop.name}}</p>
      </div>
      <div class="shop-goods">
          <div class="goods">
              <div class="fans">
                  <p>{{shop.fans}}</p>
                  <p>总销量</p>
              </div>
              <div class="good-count">
                  <p>{{shop.goodsCount}}</p>
                  <p>全部宝贝</p>
              </div>
          </div>
          <div class='score'>
              <div class='desc'>
                  <p>{{shop.score[0].name}}</p>
                  <p :class="shop.score[0].isBetter?'high':'low'">{{shop.score[0].score}}</p>
                  <p :class="shop.score[0].isBetter?'highbg':'lowbg'">{{shop.score[0].isBetter?'高':'低'}}</p>
              </div>
              <div class='price'>
                  <p>{{shop.score[1].name}}</p>
                  <p :class="shop.score[1].isBetter?'high':'low'">{{shop.score[1].score}}</p>
                  <p :class="shop.score[1].isBetter?'highbg':'lowbg'">{{shop.score[1].isBetter?'高':'低'}}</p>
              </div>
              <div class='quality'>
                  <p>{{shop.score[2].name}}</p>
                  <p :class="shop.score[2].isBetter?'high':'low'">{{shop.score[2].score}}</p>
                  <p :class="shop.score[2].isBetter?'highbg':'lowbg'">{{shop.score[2].isBetter?'高':'低'}}</p>
              </div>
          </div>
      </div>
      <div class="welcome"><p>进店逛逛</p></div>
  </div>
</template>

<script>
export default {
    name:'DetailShopInfo',
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style scoped>
    .shop-info{
        border-bottom: 5px solid rgba(219, 217, 217, 0.5);
    }
    .shop-base{
        display: flex;
        align-items: center;
        padding: 10px;
    }
    img{
        height: 70px;
        border: 1px solid rgba(219, 217, 217, 0.5);
        border-radius: 50%;
    }
    .shop-name{
        margin-left: 20px;
    }
    .shop-goods{
        display: flex;
        width: 100%;
        font-size: 12px;
    }
    .goods{
        display: flex;
        width: 50%;
        text-align: center;
        justify-content: space-around;
        align-items: center;
        border-right: 1px solid rgba(219, 217, 217, 0.5);
        height: 60px;
    }
    .goods>div{
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-evenly;
    }
    .score{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        margin: 0 10px;
        width: calc(50% - 20px);

    }
    .desc,.price,.quality{
        display: flex;
        justify-content: space-between;
    }
    .high{
        color: red;
    }

    .low{
        color: green;
    }
    .highbg{
        background: red;
        color: #fff;
    }
    .lowbg{
        background: green;
        color: #fff;
    }
    .welcome{
        display: flex;
        justify-content: center;
        text-align: center;
        margin:10px;
    }
    .welcome p{
        font-size: 13px;
        width: 25%;
        padding: 5px 10px;
        background-color: rgba(219, 217, 217, 0.5);
        border-radius: 10px;
    }
</style>