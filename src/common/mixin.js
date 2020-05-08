import {debounce} from './utils'

export const itemListenerMixin={
    data(){
        return {
            itemImgListener:null
        }
    },
    mounted(){
        const refresh=debounce(this.$refs.bscroll.refresh,500);
        this.itemImgListener=()=>{
            //this.$refs.bscroll.refresh();//这样会调用8次
            refresh();
          };
        this.$bus.$on('itemImageLoad',this.itemImgListener);
    }
}