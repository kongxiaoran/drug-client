<template>
    <div>
        <v-banner></v-banner>
        <div>
            <el-divider></el-divider>
            <span>  <el-alert
                    title="下单中~"
                    type="success"
                    :closable="false">
  </el-alert></span>
            <el-divider></el-divider>
        </div>
        <el-steps :active="active" align-center>
            <el-step title="确认商品信息">

            </el-step>
            <el-step title="填写收货地址"></el-step>
            <el-step title="支付"></el-step>
        </el-steps>
        <div v-if="active==0">
            <el-form label-width="80px">

                <h4>名称 {{form.ordername}}</h4>
                <h4>单价：{{form.price}}</h4>
                <el-form-item label="数量">
                    <el-input-number v-model="form.num" @change="handleChange" :min="1"  :max="999" label="描述文字"></el-input-number>
                </el-form-item>
                <h4>总金额：{{form.sumprice}}</h4>

            </el-form>
        </div>
        <div v-if="active==1">
            <el-form  label-width="80px">
                <el-form-item label="收货地址">
                    <el-input v-model="form.adderss"></el-input>
                </el-form-item>
                <el-form-item label="收货人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="active==2">
            <el-button type="success" plain @click="pay">点击支付</el-button>
        </div>
        <el-button style="margin-top: 12px;" @click="back">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
    </div>

</template>

<script>
    import banner from "../common/banner";
    import {getcartList,addpay} from "../../api/api";

    export default {
        name: "pay",
        components:{'v-banner':banner},
        data() {
            return {
                active: 0,
                form:{}
            };
        },

        methods: {
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            back() {
                if (this.active-- < 1) this.active = 0;
            },
            getOrder(){
                //获取到的订单编号
                let searchForm={
                        orderid:this.$route.params.id,
                };
                getcartList(searchForm).then(res => {
                    console.log("返回详情",res.rows)
                        this.form=res.rows.[0];
                })
            },
            handleChange(value) {
                console.log(value);
                this.form.sumprice=Number(value)*Number(this.form.price);
                console.log("总价计算",this.form.sumprice);
            },
            pay() {
                const loading = this.$loading({
                    lock: true,
                    text: '支付中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                addpay(this.form).then(res => {
                    console.log("返回支付结果",res)
                    setTimeout(() => {
                        loading.close();
                        this.$message({
                            message: '支付完成',
                        });
                        this.$router.push({name: 'myshop', params: {id: 'third'}})
                    }, 4000);


                })

            },
        },
        activated() {
            console.log('获取到的订单编号',this.$route.params.id);
            if(this.$route.params.id==undefined){
                this.$message({
                    message: '支付会话失效',
                });
            }else{
                this.getOrder();
            }
        }
    }
</script>

<style scoped>

</style>
