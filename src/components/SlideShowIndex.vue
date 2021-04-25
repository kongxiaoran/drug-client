//首页轮播图
<template>
    <el-carousel  type="card"  height="600px" trigger="click">
        <el-carousel-item v-for="item in dataList" >
            <el-image  style="width:100%;height:100%;" :src="item.path" @click="toGoodsDetils(item.id)" class="bannerImg"></el-image>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
    import {getReommentShow,getNotice} from "../api/api";

    export default {
        name: "SlideShowIndex",
        data() {
            return {
                dataList:null,
                bannerHeight:null,
                imgHeight: ""
             };
        },
        methods: {

            getReomment: function (event) {
                let fromData = {
                    name:''
                }

                getReommentShow(fromData).then(res => {
                    this.dataList=res.rows;
                    // 获取到图片后，调用this.imgLoad()方法定义图片初始高度
                    //this.imgLoad();
                })
            },
            toGoodsDetils: function (ids,event) {
                /* console.log("跳转商品详情页,商品id"+ids);
                 this.$store.commit('saveCurrentPageInfos',ids)
                 this.$router.push({name: 'GoodDetailMain', params: {id: ids}})*/
                this.$parent.toGoodsDetils(ids);
            },
            sendNotice: function (title,memo) {
                this.$notify({
                    title: title,
                    dangerouslyUseHTMLString: true,
                    message: memo
                });
            },
            getSysNotice: function () {
                let fromData = {
                    noticeType:'2'
                }
                console.log("xxxxxxxxxxx")
                getNotice(fromData).then(res => {
                    this.dataList=res.rows;

                    let _this=this;
                    this.dataList.forEach(function(item){
                        console.log(item.noticeTitle+"----"+item.noticeContent);
                        //this.sendNotice(item.noticeTitle,item.noticeContent);
                        _this.$notify({
                            title: item.noticeTitle,
                            dangerouslyUseHTMLString: true,
                            message: item.noticeContent,
                            type: 'success',
                            duration: 0
                        });
                    })

                })
            },


        },
        created() {
            //获取推荐商品
            this.getReomment();
            this.getSysNotice();


        }
    }
</script>

<style lang="less" scoped>
    .notify-success{
        top: 1.7rem !important;
        right: 0.32rem !important;
        width: 1000rem !important;
        height: 0.96rem !important;
        background: rgba(131, 213, 134, 0.1) !important;
        border-radius: 0.04rem 0px 0px 0.04rem !important;
    }
    .el-notification {
        display: flex!important;
        width: 6300px!important;
        padding: 14px 26px 14px 13px!important;
        border-radius: 8px!important;
        box-sizing: border-box!important;
        border: 1px solid #EBEEF5!important;
        position: fixed!important;
        background-color: #FFF!important;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)!important;
        transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s!important;
        overflow: hidden!important;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 400px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
