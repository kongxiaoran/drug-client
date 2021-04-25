<template>
    <div>
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
    </div>
</template>

<script>
    import {getGoodListByType} from "../../api/api";

    export default {
        name: "search",
        data() {
            return {
                tabPosition: 'left',
                typeList:[],
                activeName: '',
                goodsList:[],
                searchForm:{
                    pageNum:1,
                    name:'',
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
                 this.$store.commit('saveCurrentPageInfos',ids)*/
                 this.$router.push({name: 'GoodDetailMain', params: {id: ids}})
               // this.$parent.toGoodsDetils(ids);
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
            console.log("接受的搜索关键字"+ sessionStorage.getItem("searchKey"));


            this.searchForm.name= sessionStorage.getItem("searchKey");
            this.getGoodList();
        },



    }
</script>

<style scoped>
    .el-card{

        height: 290px;
    }
</style>
