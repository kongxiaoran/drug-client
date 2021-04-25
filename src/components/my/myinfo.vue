<template>
    <div>
    <el-form :model="updateform">
        <h3>{{msg}}</h3>
        <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input   type="password"  v-model="updateform.newPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth">
            <el-input   type="password" v-model="updateform.newPass1" autocomplete="off"></el-input>
        </el-form-item>
    </el-form>
    <div class="demo-drawer__footer">
        <el-button @click="onSubmit">提交</el-button>
    </div>
    </div>
</template>

<script>
    import {updatepass} from "../../api/api";

    export default {
        name: "myinfo",

        data() {
            return {
                updateform: {
                    newPass: '',
                    newPass1: '',
                },
                msg:''
            }
        },
        methods: {

            //修改密码方法
            onSubmit() {
                let send =true;
                if(this.updateform.newPass==''){
                    this.msg='新密码不能为空';
                    return;
                }
                if(this.updateform.newPass.length<6){
                    this.msg='新密码长度不能少于6位';
                    return;
                }
                if(this.updateform.newPass!=this.updateform.newPass1){
                    this.msg='两次密码不一致';
                    return;

                }
                let updateFrom={
                    password:this.updateform.newPass
                };
                updatepass(updateFrom).then(res => {
                    console.log("修改密码完成",res);
                    this.msg='修改密码完成';
                })

            },



        }
    }
</script>

<style scoped>

</style>
