<template>
  <div class="cart">
      <!-- 导航 -->
      <nav-bar class="nav-bar">
        <div slot="center">购物车({{checkLength}})</div>
      </nav-bar>
      <!-- 商品的列表 -->
      <cart-list/>
      <!-- 底部的汇总 -->
      <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  data(){
    return {
      counter:0
    }
  },
  computed:{
    //使用计算属性，如果多个地方使用到，可以在vuex中的getters中实现
    // cartList(){
    //   return this.$store.state.cartList.length;
    // }
    ...mapGetters(['checkLength'])
  }
}
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>