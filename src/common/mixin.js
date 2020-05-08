import {debounce} from './utils'

export const itemListenerMixin={
    data(){
        return {
            itemImgListener:null,
            refresh:null
        }
    },
    mounted(){
        this.refresh=debounce(this.$refs.bscroll.refresh,500);
        this.itemImgListener=()=>{
            //this.$refs.bscroll.refresh();//这样会调用8次
            this.refresh();
          };
        this.$bus.$on('itemImageLoad',this.itemImgListener);
    }
}