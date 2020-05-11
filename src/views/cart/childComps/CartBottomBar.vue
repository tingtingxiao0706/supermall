<template>
  <div class="bottom-bar">
      <div class="selector">
          <check-button :is-checked="isSelectAll" @click.native="totalSelected" class="item-selector"/>
          <span>全选</span>
      </div>
      <div class="total">
          <span>合计：￥</span>
          <span class="total-price">{{totalPrice}}</span>
      </div>
      <div class="calculate">结算({{cartListLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'

export default {
    name:'CartBottomBar',
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return this.$store.state.cartList.filter(item=>{
                return item.checked;
            }).reduce((total,item)=>{
                return total+item.price*item.count;
            },0).toFixed(2);
        },
        isSelectAll(){
            //return !(this.$store.state.cartList.filter(item=>!item.checked).length);//这种性能不太好，对数组全部遍历
            //使用find函数，一旦找到就不再继续遍历下去
            if(this.$store.state.cartList.length===0) return false;
            return !this.$store.state.cartList.find(item=>!item.checked)
        },
        // checkLength(){
        //     return this.$store.state.cartList.filter(item=>item.checked).length;
        // }
        ...mapGetters(['cartListLength'])
    },
    methods:{
        totalSelected(){
            // this.$store.commit('totalSelected');
            if(this.isSelectAll){
                this.$store.commit('totalUnselected');
            }else{
                this.$store.commit('totalSelected');
            }
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height: 35px;
    position: relative;
    background: #f2efef;
    display: flex;
    line-height: 35px;
}
.selector{
    height: 100%;
    display: flex;
    align-items: center;
    width: 100px;
}
.item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    
}
.total{
    flex: 1;
}
.calculate{
    width: 100px;
    background-color: red;
    color: #fff;
    text-align: center;
}
</style>