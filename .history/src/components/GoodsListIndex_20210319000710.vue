<template>
    <div>
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">

            <el-radio-button label="left">商品推荐</el-radio-button>
        </el-radio-group>

        <el-tabs :tab-position="tabPosition" style="height:100%;" v-model="activeName" @tab-click="changeTab">

          <!--  <-->

            <el-tab-pane :label="item.dictLabel"  v-for="(item, index) in typeList" :key="index" :name="item.dictValue" >

                <el-row >
                    <div   v-for="(goods, index) in goodsList" :key="index"  @click="toGoodsDetils(goods.id)" >
                    <el-col :span="4"  >
                        <el-card :body-style="{ padding: '10px' }" >
                                <div >

                                    <el-image
                                            :src="goods.path"
                                            ></el-image>
                                </div>

                            <div style="padding: 14px;">
                                <span>{{goods.name}}</span>

                            </div>
                        </el-card>
                    </el-col>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-row >
                <div class="block">

                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="searchForm.pageNum"
                            :page-sizes="[12, 24, 48, 100]"
                            :page-size="12"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </el-row>
        <!-- </template>-->
        </el-tabs>
    </div>

</template>
<script>
    import {getType,getGoodListByType} from "../api/api";

    export default {
        name: "GoodsListIndex",
        data() {
            return {
                tabPosition: 'left',
                typeList:[],
                activeName: '',
                goodsList:[],
                searchForm:{
                    pageNum:1,
                    type:'',
                    pageSize:12,
                },
                total:0
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log("每页大小改变"+val);
                this.searchForm.pageSize=val;
                this.getGoodList();
            },
            handleCurrentChange(val) {
                console.log("当前页改变"+val);
                this.searchForm.pageNum=val;
                this.getGoodList();
            },
            toGoodsDetils: function (ids,event) {
               /* console.log("跳转商品详情页,商品id"+ids);
                this.$store.commit('saveCurrentPageInfos',ids)
                this.$router.push({name: 'GoodDetailMain', params: {id: ids}})*/
               this.$parent.toGoodsDetils(ids);
            },
            //切换tab页
            changeTab (tab, event){
                let typevalue="";
                if(tab==undefined){
                    console.log(this.activeName, '第一次加载tab页');
                    typevalue=this.activeName;
                }else{
                    console.log(tab.index, '切换tab页');
                    console.log('切换tab页'+this.typeList[tab.index].dictValue);
                    typevalue=this.typeList[tab.index].dictValue;
                }


                this.searchForm.type=typevalue;
                this.getGoodList();
            },
            //获取类目
            getGoodType: function (event) {
                let fromData = {

                }
                getType(fromData).then(res => {
                    this.typeList=res.pageInfo.list;
                    this.activeName=this.typeList[0].dictValue;
                    this.changeTab();
                    console.log(this.typeList)
                })
            },
            //获取商品列表
            getGoodList: function () {
              getGoodListByType(this.searchForm).then(res => {
                    this.goodsList=res.pageInfo.list;
                    this.total=res.pageInfo.total;
                    console.log(this.goodsList)
                })
            },
        },
        activated() {
            //获取类目信息
            this.getGoodType();
        },

    }
</script>

<style scoped>
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }
    /deep/ .el-image {
        width: 60%;
        height: 200px;
    }
    .el-card{

        height: 280px;
    }

    .button {
        padding: 0;
        float: right;
    }


    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
