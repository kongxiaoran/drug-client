<template>
    <div>
        <el-row><el-divider >商品详情</el-divider></el-row>
        <el-row>
            <el-col :span="2"><div class="grid-content bg-purple"/></el-col>
            <el-col :span="8"><div class="grid-content bg-purple">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="(item,index) in picIndexList" :key="index">
                        <el-image :src="item.path" style="width:100%;height:100%;" ></el-image>
                    </el-carousel-item>
                </el-carousel>
            </div></el-col>
            <el-col :span="1"><div class="grid-content bg-purple"/></el-col>

            <el-col :span="10"><div class="grid-content bg-purple-light">
                <el-form ref="form" :model="form" label-width="80px">

                        <h1>{{form.name}}</h1>
                    <h4>{{form.memo}}</h4>
                    <h6>商品总数：{{form.sumcount}} 已售：{{form.cutcount}} </h6>
                    <h6>商品单价：{{form.price}}  </h6>

                    <el-form-item label="数量" v-if="(form.sumcount-form.cutcount)>0">
                        <el-input-number v-model="num" @change="handleChange" :min="1" :max="form.sumcount-form.cutcount" label="描述文字"></el-input-number>
                        <h6 v-if="(form.sumcount-form.cutcount)<=num">该商品最当前最多可购买数量为{{num}}</h6>
                    </el-form-item>
                    <h5 v-if="!IsBuy">该商品已经卖完了，等待补货</h5>


                    <el-form-item>
                        <el-button type="primary" @click="add('02')"  :disabled="!IsBuy" >立即购买</el-button>
                        <el-button @click="add('01')">加入购物车</el-button>
                        <el-button type="warning" icon="el-icon-star-off" circle @click="add('03')" >收藏</el-button>
                    </el-form-item>
                </el-form>
            </div></el-col>
        </el-row>
        <details-info/>
    </div>

</template>

<script>
    import DetailsInfo from "../../components/Goods/DetailsInfo";
    import {getGoodsDetail,getGoodsDetailPic,addCartList} from "../../api/api";
    export default {
        name: "GoodDetailMain",
        components:{"details-info":DetailsInfo,

        },

        data() {
            return {
                form: {
                    name:'',
                    memo:'',
                    sumcount:'',
                    cutcount:'',
                },
                picIndexList:[],
                num:1,
                IsBuy:true,
                state:true,
                goodsid:''

            }
        },
        methods: {
            //创建购物车，订单，收藏
            add(type) {
                console.log('操作!',type);
                console.log('islogin -session!',sessionStorage.getItem("islogin"));
                console.log('islogin -type!',typeof (sessionStorage.getItem("islogin")));
                //判断当前是否哦登录
                if (sessionStorage.getItem("islogin")!='true') {
                    console.log("请先登录")
                    this.$message.error('请先登录');
                }else{

                    let fromData = {
                        goodsid:this.form.id,
                        flag:type,
                        num:this.num
                    };
                    addCartList(fromData).then(res => {
                        console.log("返回成功",res);
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        if(type=='02'){
                            this.$router.push({name: 'pay', params: {id: res.orderid}})
                        }
                    });
                }
            },
            //获取商品详细
            getDetails() {
                let goodsid='';
                console.log("接受的商品id"+this.$route.params.id);
                this.goodsid=this.$route.params.id;
                console.log('session 缓存的商品id',sessionStorage.getItem('goodsid'));
                if(this.$route.params.id==undefined){
                    this.goodsid=sessionStorage.getItem('goodsid');
                }
                if(this.goodsid==null||this.goodsid==''){
                    console.log("接受的商品id为空，自动返回首页");
                    this.$router.push({path:'/'})
                }
                let fromData = {
                    id:this.goodsid
                };

                getGoodsDetail(fromData).then(res => {
                   this.form=res.goodsInfo;
                   //判断库存数量
                   if((this.form.sumcount-this.form.cutcount)<=0){
                       this.IsBuy=false;
                   }
                   //判断是否下架
                   if(this.form.state=='2'){
                       this.state=false;
                       this.IsBuy=false;
                       this.$message({
                           message: '该商品已下架',
                           type: 'success'
                       });
                   }
                });

                let fromData1 = {
                    goodsid:this.$route.params.id,
                    //index_pic(首页图片)  detail_pic(详情图片)
                    type:'index_pic'
                };
                getGoodsDetailPic(fromData1).then(res => {
                    this.picIndexList=res.rows;
                })
            },
            handleChange(value) {
                console.log(value);
            },


        },
        activated() {
            this.getDetails();
            this.num=1;
        }
    }

</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

</style>
