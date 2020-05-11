import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'

//监听图片加载，刷新
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

//返回顶部混入
export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop:false
        }
    },
    methods:{
        //返回顶部
        backClick(){
            this.$refs.bscroll.scrollTo(0,0);
        },
        listenShowBackTop(position){
            this.isShowBackTop=(-position.y)>1000;
        }
    }
}