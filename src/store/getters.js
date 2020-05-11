export default {
    cartLength(state){
        return state.cartList.length;
    },
    cartList(state){
        return state.cartList;
    },
    cartListLength(state){
        return state.cartList.filter(item=>item.checked).reduce((total,item)=>{
            return total+item.count;
        },0);
    },
    checkLength(state){
        return state.cartList.filter(item=>item.checked).length;
    }
}