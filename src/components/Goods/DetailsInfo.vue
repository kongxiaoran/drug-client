<template>
    <div>
        <el-row><el-divider ></el-divider>
        </el-row>
        <el-row>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-tabs v-model="activeName" type="card" @tab-click="changeTab">
            <el-tab-pane label="用户管理" name="first">

                <div  v-for="(item,index) in picList" :key="index" :item="item">
                    <el-image :src="item.path"  style="width:100%;height:100%;"></el-image>
                </div>

            </el-tab-pane>
            <el-tab-pane label="评论" name="second">

                <div class="block">



                    <el-timeline  >
                        <div v-for="(item1,index) in apppriseList"  :key="index" >
                        <el-timeline-item  placement="top">
                            <el-card>
                                <h4>{{item1.memo}}</h4>
                                <p><el-rate
                                        v-model="item1.type-0"
                                        disabled
                                        show-score
                                        text-color="#ff9900"
                                        score-template="" type="number" >
                                </el-rate>{{item1.oprid}} 提交于 {{item1.oprtime}}</p>
                            </el-card>
                        </el-timeline-item>
                        </div>
                    </el-timeline>
                </div>
                <el-row >
                    <div class="block">

                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="searchForm.pageNum"
                                :page-sizes="[10, 20, 30, 100]"
                                :page-size="10"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                        </el-pagination>
                    </div>
                </el-row>
            </el-tab-pane>
        </el-tabs>

        </el-row>
    </div>

</template>

<script>
    import {getGoodsAppraise,getGoodsDetailPic} from "../../api/api";

    export default {
        name: "DetailsInfo",
        data() {
            return {
                activeName:'',
                apppriseList:[],
                picList:[],
                searchForm:{
                    pageNum:1,
                    goodsid:'',
                    pageSize:10,
                },
                total:0
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log("每页大小改变"+val);
                this.searchForm.pageSize=val;
                this.getAppraise();
            },
            handleCurrentChange(val) {
                console.log("当前页改变"+val);
                this.searchForm.pageNum=val;
                this.getAppraise();
            },
            changeTab (tab, event){
                console.log(this.activeName, '第一次加载tab页');
                console.log("接受的商品id"+this.$route.params.id);
                if("second"==this.activeName){
                    console.log('切换详情tab获取评论列表');
                    this.getAppraise()
                }
            },
            getAppraise() {
                console.log("接受的商品id"+this.searchForm.goodsid);
                getGoodsAppraise(this.searchForm).then(res => {
                    this.apppriseList=res.pageInfo.list;
                    this.total=res.total;

                })

            }
        },
        activated() {
            let fromData = {
                goodsid:this.$route.params.id,
                //index_pic(首页图片)  detail_pic(详情图片)
                type:'detail_pic'
            };
            getGoodsDetailPic(fromData).then(res => {
                this.picList=res.pageInfo.list;
            })
            this.searchForm.goodsid=this.$route.params.id;
            this.activeName="first";
        }
    }
</script>

<style scoped>

</style>
