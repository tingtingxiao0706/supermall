<template>
  <div class="cart-list">
      <scroll class="content" ref="bscroll">
          <cart-list-item v-for="(item,index) in cartList" :product="item" :key="index"/>
      </scroll>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
    name:'CartList',
    components:{
        Scroll,
        CartListItem
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated(){
        this.$refs.bscroll.refresh();
    }
}
</script>

<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px - 35px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>