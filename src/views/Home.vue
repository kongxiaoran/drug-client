<template>
  <div>
      <slide-show-index></slide-show-index>

      <goods-list-index/>
  </div>

</template>

<script>

import SlideShowIndex from "../components/SlideShowIndex";
import GoodsListIndex from "../components/GoodsListIndex";
export default {
  name: 'Home',
  components: {"slide-show-index":SlideShowIndex,"goods-list-index":GoodsListIndex},
  data() {
    return {
      fits: ['fill', 'fill', 'fill', 'fill', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

    }
  },
    methods: {

        toGoodsDetils: function (ids,event) {
            console.log("跳转商品详情页,商品id"+ids);
            this.$store.commit('saveCurrentPageInfos',ids)
            this.$router.push({name: 'GoodDetailMain', params: {id: ids}})
        },
    }

}
</script>

<style scoped>

</style>
