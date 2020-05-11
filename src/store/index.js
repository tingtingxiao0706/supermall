import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

//安装
Vue.use(Vuex)

//创建store对象
//未重构
const store1=new Vuex.Store({
    state:{
        cartList:[]
    },
    mutations:{
        //mutations唯一的目的就是修改state中状态
        //mutations中的每个方法尽可能完成单一的事件比较单一
        /*
            //下面的写法包含两个事情,所以最好将下面的方法写在actions中 
            addCart(state,payload){
                //payload新添加商品

                //查找之前数组中是否有该商品
                //方式1
                // let oldProduct=null;
                // for(let item of state.cartList){
                //     if(item.iid===payload.iid){
                //         oldProduct=item;
                //     }
                // }
                //方式2：find函数
                let oldProduct=state.cartList.find((item)=>{
                    return item.iid===payload.iid
                })

                //判断oldProduct
                if(oldProduct){
                    oldProduct.count+=1;
                }else{
                    payload.count=1;
                    state.cartList.push(payload);
                }
            }
        */
       //将原来的addCart分为两个来写,是mutations里的每个方法都是完成单一的事件
       addCounter(state,payload){
           payload.count++;
       },
       addToCart(state,payload){
        payload.count=1;
        state.cartList.push(payload);
       }
    },
    actions:{
        addCart(context,payload){
            let oldProduct=context.state.cartList.find((item)=>{
                return item.iid===payload.iid
            })

            //判断oldProduct
            if(oldProduct){
                context.commit('addCounter',oldProduct);
            }else{
                context.commit('addToCart',payload);
            }
        }
    }
})

//重构
const state={
        cartList:[]
    }

const store=new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})

//挂载
export default store;