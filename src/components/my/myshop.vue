<template>
    <div>
    <v-banner></v-banner>
    <el-tabs v-model="activeName" @tab-click="handleClick"  type="border-card">
        <el-tab-pane label="我的购物车" name="first"><my-cart/></el-tab-pane>
        <el-tab-pane label="收藏夹" name="second"><my-love/></el-tab-pane>
        <el-tab-pane label="订单中心" name="third"><my-order/></el-tab-pane>
         <el-tab-pane label="修改密码" name="fourth"><my-info/></el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
    import mycart from "../../components/my/mycart";
    import myinfo from "../../components/my/myinfo";
    import mylove from "../../components/my/mylove";
    import myorder from "../../components/my/myorder";
    import banner from "../../components/common/banner";
    export default {
        name: "myshop",
        components:{'my-cart':mycart,'my-info':myinfo,'my-love':mylove,'my-order':myorder,'v-banner':banner},
        data() {
            return {
                activeName: 'first',
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            getShopInfos(){

            }
        },
        activated() {
            console.log("跳转页面传入的参数 ",this.route.params.id);
            this.$route.params.id;
            if(this.route.params.id!=undefined){
                this.activeName=this.route.params.id;
            }

            if ((sessionStorage.getItem("islogin")==null||sessionStorage.getItem("islogin"))) { // 需自定义
                console.log("登录信息校验失败，返回首页")
                this.$router.push({path:'/'})
            }else{
                this.activeName="first";
                this.getShopInfos();
            }
        }
    }
</script>

<style scoped>

</style>
