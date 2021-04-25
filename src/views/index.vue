<template>
    <div class="page-component__scroll">
        <div class="el-scrollbar__wrap">
            <header-top></header-top>
            <transition>
                <keep-alive>
                    <router-view :key="$route.path"></router-view>
                </keep-alive>
            </transition>
            <back-to-top/>
            <footer-common/>
        </div>

    </div>
</template>

<script>
    import headertop from "../components/headerTop";
    import FooterCommon from "../components/FooterCommon";
    import BackToTop from "../components/BackToTop";
    // import Home from ""
    import Vue from 'vue';
    export default {
        name: "index",
        components: {"header-top":headertop,"footer-common":FooterCommon,"back-to-top":BackToTop},
        methods:{
            pushMsg(msg){
                consolse.log("推送消息，消息内容为：",this.msg);
                this.$message({
                    message: msg,
                    type: 'success'
                });
            },
            open2() {
                this.$notify({
                    title: '提示',
                    message: '这是一条不会自动关闭的消息',
                    duration: 0
                });
            }
        },
        activated() {
            this.open2();

        }

    }
</script>


<style scoped>
    .page-component__scroll  {
        overflow: auto;
        height: 100%;
    }
    .el-scrollbar__wrap {
        overflow: auto;
        height: 100%;
    }

</style>
