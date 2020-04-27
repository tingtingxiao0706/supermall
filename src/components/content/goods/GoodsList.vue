<template>
  <div class="goods">
    <good-item v-for="(item,index) in goods" :key="index" :goodItem="item"/>
  </div>
</template>

<script>
import GoodItem from './GoodsListItem'
export default {
    name:'GoodsList',
    props:{
      goods:{
        type:Array,
        default:()=>{
          return []
        }
      }
    },
    components:{
      GoodItem
    }
}
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-top: 8px;
  }
</style>