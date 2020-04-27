import axios from 'axios'

//方式1：回调函数
// export function request(config,success,failure){
//     //1、创建axios实例
//     const instance=axios.create({
//         baseURL:'http://123.207.32.32:8000/home/multidata',
//         timeout:5000
//     })

//     instance(config).then(res=>{
//         success(res)
//     }).catch(err=>{
//         failure(err)
//     })
// }
//方式2
// export function request(config){
//     //1、创建axios实例
//     const instance=axios.create({
//         baseURL:'http://123.207.32.32:8000/home/multidata',
//         timeout:5000
//     })

//     instance(config.baseConfig).then(res=>{
//         config.success(res)
//     }).catch(err=>{
//         config.failure(err)
//     })
// }

//方式3：推荐使用方式3
// export function request(config){
//     return new Promise((resolve,reject)=>{
//         //1、创建axios实例
//         const instance=axios.create({
//             baseURL:'http://123.207.32.32:8000/home/multidata',
//             timeout:5000
//         })
//         instance(config).then(res=>{
//             resolve(res)
//         }).catch(err=>{
//             reject(err)
//         })
//     })
// }

//方式4：简化方式3
export function request(config){
    //1、创建axios实例
    const instance=axios.create({
        baseURL:'http://123.207.32.32:8000',
        timeout:5000
    })

    //2、axios拦截器
    //请求拦截
    instance.interceptors.request.use(config=>{
        //1、比如config中的一些信息不符合服务器的要求
        //2、比如每次发送网络请求时，都希望界面中显示一个请求的图标
        //3、某些网络请求（比如登录token），必须携带一些特殊的信息
        return config;
    },err=>{
        console.log(err)
    })
    //响应拦截
    instance.interceptors.response.use(response=>{
        return response.data;
    },err=>{
        console.log(err)
    })

    //3、发送真正的网络请求
    return instance(config)
}