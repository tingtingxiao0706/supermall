import {ADD_COUNTER,ADD_TO_CART,CHECK_CHANGE} from './mutations_type'

export default {
    [ADD_COUNTER](state,payload){
        payload.count++;
    },
    [ADD_TO_CART](state,payload){
        payload.count=1;
        payload.checked=true;
        state.cartList.push(payload);
    },
    [CHECK_CHANGE](state,payload){
        let product=state.cartList.find(item=>{
            return item.iid==payload.iid;
        });
        product.checked=!product.checked;
    },
    totalSelected(state){
        // for(let item of state.cartList){
        //     item.checked=true;
        // }
        //或者使用forEach
        state.cartList.forEach(item => {
            item.checked=true;
        });
    },
    totalUnselected(state){
        // for(let item of state.cartList){
        //     item.checked=false;
        // }
        state.cartList.forEach(item => {
            item.checked=false;
        });
    }
}