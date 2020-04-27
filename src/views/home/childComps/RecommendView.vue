<template>
  <div id="recommend">
        <a v-for="item in recommend" :key="item.link" :href="item.link" class="recommend-link">
            <div class="recommend-item">
                <img :src="item.image" alt="">
                <p class="title">{{item.title}}</p>
            </div>
        </a>
  </div>
</template>

<script>
export default {
    name:'RecommendView',
    props:{
        recommend:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    data(){
        return {}
    }
}
</script>

<style scoped>
    #recommend{
        width: 100%;
        display: flex;
        align-content: center;
        padding: 10px 0 20px 0;
        border-bottom: 8px solid #eee;
        font-size: 12px;
    }
    .recommend-link{
        flex:1;
    }
    .recommend-item{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .recommend-item img{
        height: 65px;
        width: 65px;
        border-radius: 50%;
    }
    .recommend-item .title{
        margin-top: 10px;
    }
</style>