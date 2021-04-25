<template>
    <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="商品名称">
            <el-input v-model="searchForm.ordername" placeholder="商品名称"></el-input>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="getlist">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                label="名称"
                width="180">
            <template slot-scope="scope">
                <i></i>
                <span style="margin-left: 10px">{{ scope.row.ordername }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="数量"
                width="180">
            <template slot-scope="scope">
                <i ></i>
                <span style="margin-left: 10px">{{ scope.row.num }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="单价"
                width="180">
            <template slot-scope="scope">
                <i ></i>
                <span style="margin-left: 10px">{{ scope.row.price }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="总金额"
                width="180">
            <template slot-scope="scope">
                <i ></i>
                <span style="margin-left: 10px">{{ scope.row.sumprice }}</span>
            </template>
        </el-table-column>
        <el-table-column
                label="状态"
                width="180">
            <template slot-scope="scope"  >
                <i ></i>

                <span style="margin-left: 10px" v-if="scope.row.state=='01'">
                    交易完成
                </span>
                <span style="margin-left: 10px" v-if="scope.row.state=='02'">
                  待发货
                </span>
                <span style="margin-left: 10px" v-if="scope.row.state=='03'">
                  物流配送中
                </span>
                <span style="margin-left: 10px" v-if="scope.row.state=='04'">
                  待支付
                </span>
                <span style="margin-left: 10px" v-if="scope.row.state=='05'">
                    交易完成
                </span><span style="margin-left: 10px" v-if="scope.row.state=='06'">
                  退货完成
                </span>

            </template>
        </el-table-column>

        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">支付</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
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
    </div>
</template>

<script>
    import {getcartList, deleteOrder} from "../../api/api";
    export default {
        name: "mycart",
        data() {
            return {
                tableData: [],
                searchForm:{
                    pageNum:1,
                    flag:'01',
                    pageSize:10,
                    ordername:''
                },
                total:0
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            //跳转支付
            handleEdit(index, row) {
                console.log(index, row);
                this.$router.push({name: 'pay', params: {id: row.orderid}})
            },
            //删除
            handleDelete(index, row) {
                console.log(index, row);
                let deleteFrom={
                    id:row.id
                };
                deleteOrder(deleteFrom).then(res => {
                    console.log("删除完成",res);
                    this.getlist();
                })
            },
            //获取购物车
            getlist() {
                getcartList(this.searchForm).then(res => {
                    this.tableData=res.rows;
                    this.total=res.total;
                    console.log("返回购物车信息",this.tableData)
                })
            },
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


        },
        activated() {
            if (sessionStorage.getItem("islogin")!='true') { // 需自定义
                console.log("登录信息校验失败，返回首页")
                this.$router.push({path:'/'})
            }else{
                this.getlist();
            }
        }

    }
</script>

<style scoped>

</style>
