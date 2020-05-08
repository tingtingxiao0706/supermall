<template>
  <nav-bar>
      <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
          <div v-for="(title,index) in titles" class="title-item" :key="index" @click="titleClick(index)" :class="{active:index===currentIndex}">
              {{title}}
          </div>
      </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name:'detailNavBar',
    data(){
        return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    components:{
        NavBar
    },
    methods:{
        backClick(){
            this.$router.back()
        },
        titleClick(index){
            this.currentIndex=index;
            this.$emit('titleClick',index);
        }
    }
}
</script>

<style scoped>
    .back img{
        vertical-align: middle;
        width: 18px;
    }
    .title{
        display: flex;
        font-size: 13px;
    }
    .title-item{
        flex:1;
    }
    .title-item.active{
        color: var(--color-tint);
    }
</style>