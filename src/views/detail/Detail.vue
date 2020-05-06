<template>
  <div>
      {{iid}}
  </div>
</template>

<script>
export default {
    name:'Detail',
    data(){
        return {
            iid:''
        }
    },
    created(){
        this.iid=this.$route.params.iid;
    }
}
</script>

<style>

</style>