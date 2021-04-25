<template>
    <el-carousel height="200px" direction="vertical" :autoplay="true">
       <!-- <el-carousel-item v-for="(item,index) in bannerList" :key="index">
            <h3 class="medium">
                <el-image :src="item.path" />
            </h3>
        </el-carousel-item>-->
        <el-carousel-item >
            <h3 class="medium">
                <el-image    style="width: 100%; " src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
            </h3>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    export default {
        name: "banner",


        data() {
            return {
                bannerList:[
                    { path:'gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic49.nipic.com%2Ffile%2F20140929%2F8175766_233235698254_2.jpg&refer=http%3A%2F%2Fpic49.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613960141&t=395972248546b9848d3a884bdd64f379'
                    }
                ]
            };
        },
    }

</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
