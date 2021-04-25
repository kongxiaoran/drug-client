//公共头部
<template>
    <el-container>
        <el-header>
            <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="4"><div class="grid-content bg-purple"  @click="returnIndex">
                    {{sysname}}
                </div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">
                    <el-input v-model="searchkey" placeholder="请输入内容" @keyup.enter.native="search()"></el-input>
                   </div></el-col>
                <el-col :span="2" v-if="!islogin">    <div class="grid-content bg-purple"   @click="openDarawer">
                    登录/注册<login-drawer ref="drawer"></login-drawer>
                </div> </el-col>
                <el-col :span="4" v-if="islogin">    <div class="grid-content bg-purple"   @click="openDarawer">
                  欢迎回来~， {{ userInfos.userName}}
                </div> </el-col>
                <el-col :span="1" v-if="islogin"><div class="grid-content bg-purple"  >
                    <el-menu
                            :default-active="activeIndex2"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            background-color="#A2C1E0"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-submenu index="2">
                            <template slot="title" > <el-avatar :src="userInfos.avatar"></el-avatar></template>
                            <el-menu-item index="2-1" @click="openMy('first')">个人中心</el-menu-item>
                            <el-menu-item index="2-4" @click="layout">退出</el-menu-item>
                        </el-submenu>
                    </el-menu>

                </div></el-col>

            </el-row>
            <!--

                        <el-row class="demo-autocomplete">
                            <el-col :span="2">

                            </el-col>
                            <el-col :span="22">
                            <el-menu :class="el-menu-demo" mode="horizontal" >
                                <el-menu-item index="4" ><router-link to="Home">登录/注册</router-link></el-menu-item>
                                <el-menu-item index="5" ><router-link to="Home"></router-link></el-menu-item>

                            </el-menu>
                            </el-col>
                        </el-row>
            -->

        </el-header>


    </el-container>
</template>

<script>
    import MyDrawer1 from "../components/MyDrawer";
    import loginDrawer from "../components/common/loginDrawer";
    import {getLoginInfo, getSysName} from "../api/api";

    export default {
        name: "headerTop",
        components:{"vdrawer":MyDrawer1,"login-drawer":loginDrawer},
        data() {
            return {
                restaurants: [],
                state: '',
                timeout:  null,
                dialog: false,
                activeIndex: '1',
                activeIndex2: '1',
                islogin:false,
                userInfos:{
                    loginName:'',
                    userName:'',
                    phonenumber:'',
                    avatar:''
                },
                searchkey:'',
            sysname:null//系统商城
        };
        },
        methods: {

            handleSelect(item) {
                console.log(item);
            },

            //获取后台系统名称
            getIndexName() {
                let fromData = {
                    name:'shop_name'
                }
                getSysName(fromData).then(res => {
                    console.log("系统名称",res);

                    this.sysname=res.paramInfo.code;
                })

            },
            //返回首页
            returnIndex() {
                this.$router.push({path:'/'})
            },
            //打开登录drawer
            openDarawer(){
                this.$refs.drawer.openDrawer();
            },
            //获取登录信息
            getInfos(){
                //获取本地缓存session，更新到vuex中
                this.$store.commit('token',sessionStorage.getItem("token"));
                getLoginInfo().then(res => {
                    console.log("返回登录信息",res);
                    this.islogin=res.islogin;
                    if(res.islogin){
                        this.userInfos=res.user;
                    }else{
                        //后台token失效，抹除本地session
                        sessionStorage.removeItem("token");
                    }
                    this.$store.commit('saveIsLogin', res.islogin);
                })
            },
            //退出登录
            layout() {
                console.log("退出登录");
                sessionStorage.removeItem("token");
                this.$router.push({path:'/'})
                location.reload();

            },
            //跳转页面
            openMy(url){
                console.log("跳转页面，页面路径为"+url);
                this.$router.push({name: 'myshop', params: {id: url}})
            },
            //跳转搜索list
            search(){
                console.log("跳转搜索页面，值为"+this.searchkey);
                sessionStorage.setItem("searchKey", this.searchkey)
                let path = this.$route.path
                let newpath = "/search"
                if (path.indexOf(newpath) == -1) {
                    this.$router.push({name: 'search', params: {id: this.searchkey}});
                }else{
                    location.reload();

                }


            },

        },
        mounted() {
            this.getIndexName();
            //存在token就获取登录信息
            if(sessionStorage.getItem("token")!=null){
                this.getInfos();
            }

        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #A2C1E0;
        color: #020D18;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;

    }

    body > .el-container {
        margin-bottom: 20px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    /* 重写el-menu-item 靠右浮动*/
    .el-menu-item{float:right}
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
</style>
