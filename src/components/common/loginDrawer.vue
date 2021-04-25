<template>
    <div>
        <el-drawer
                :title="msg"
                :before-close="handleClose"
                :visible.sync="dialog"
                direction="ltr"
                custom-class="demo-drawer"
                ref="drawer"
        >
            <div class="demo-drawer__content">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="登录" name="first">
                        <el-form :model="loginform">
                            <el-form-item label="手机号" :label-width="formLabelWidth">
                                <el-input v-model="loginform.username" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth">
                                <el-input   type="password" v-model="loginform.password" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="demo-drawer__footer">
                            <el-button @click="cancelForm">取 消</el-button>
                            <el-button type="primary" @click="login" :loading="loading">{{ loading ? '登录中 ...' : '确 定'
                                }}
                            </el-button>

                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="注册" name="second">
                        <el-form :model="registerform">
                            <el-form-item label="手机号" :label-width="formLabelWidth">
                                <el-input v-model="registerform.loginName" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="用户名" :label-width="formLabelWidth">
                                <el-input v-model="registerform.userName" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" :label-width="formLabelWidth">
                                <el-input   type="password"  v-model="registerform.password" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" :label-width="formLabelWidth">
                                <el-input   type="password" v-model="registerform.password1" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="demo-drawer__footer">
                            <el-button @click="cancelForm">取 消</el-button>
                            <el-button type="primary" @click="register" :loading="loading">{{ loading ? '提交中 ...' : '注册'
                                }}
                            </el-button>

                        </div>
                    </el-tab-pane>

                </el-tabs>

            </div>
        </el-drawer>

    </div>
</template>

<script>
    import {vueLogin, vueregister, getLoginInfo} from "../../api/api";

    export default {
        name: "loginDrawer",
        data() {
            return {
                table: false,
                dialog: false,
                loading: false,
                activeName: 'first',
                loginform: {
                    username: '',
                    password: ''
                },
                registerform: {
                    loginName: '',
                    userName: '',
                    password: '',
                    password1: '',
                },
                formLabelWidth: '100px',
                timer: null,
                msg: '登录/注册'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                this.$confirm('确定放弃吗？')
                    .then(_ => {

                        this.timer = setTimeout(() => {
                            done();
                            // 动画关闭需要一定的时间
                            setTimeout(() => {
                                this.loading = false;
                            }, 400);
                        }, 200);
                    })
                    .catch(_ => {
                    });
            },
            cancelForm() {
                this.loading = false;
                this.dialog = false;
                clearTimeout(this.timer);
            },
            openDrawer() {
                this.dialog = true;
            },
            login() {
                let fromData = this.loginform;
                vueLogin(fromData).then(res => {
                    if (res.code == 0) {
                        //登录成功，获取token
                        this.$store.commit('saveToken', res.token);
                        //登录成功，关闭drawer
                        this.dialog = false;
                        this.$message({
                            message: '登录成功,登录中',
                            type: 'success'
                        });
                        //刷新页面
                        location.reload();
                    } else {
                        this.msg = res.msg;
                    }
                })
            },

            register() {
                let fromData = this.registerform;

                if (this.registerform.loginName == '') {
                    this.msg = "手机号不能为空"
                    return;
                }
                if (this.registerform.userName == '') {
                    this.msg = "用户名不能为空"
                    return;
                }
                if (this.registerform.password != this.registerform.password1) {
                    this.msg = "两次密码不一致"
                    return;
                }
                if (this.registerform.password == '' || this.registerform.password1 == '') {
                    this.msg = "密码不能为空"
                    return;
                }
                vueregister(fromData).then(res => {
                    //注册成功自动登录
                    if (res.code == 0) {
                        this.loginform.username = this.registerform.loginName;
                        this.loginform.password = this.registerform.password;
                        this.loading = true;
                        this.login();
                    } else {
                        this.msg = res.msg;
                    }

                })
            }
        }
    }
</script>

<style scoped>

</style>
