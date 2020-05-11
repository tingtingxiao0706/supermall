import {ADD_COUNTER,ADD_TO_CART} from './mutations_type'

export default {
    addCart(context,payload){
        let oldProduct=context.state.cartList.find((item)=>{
            return item.iid===payload.iid
        })

        //判断oldProduct
        if(oldProduct){
            context.commit(ADD_COUNTER,oldProduct);
        }else{
            context.commit(ADD_TO_CART,payload);
        }
    }
}