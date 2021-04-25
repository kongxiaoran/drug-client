<template>
    <div>
        <el-row type="flex" class="row-bg">
            <el-col :span="6"><div class="grid-content bg-purple"> 22<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple-light"><el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                点我打开
            </el-button></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>



    <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :with-header="false">
        <span>我来啦!</span>
    </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "MyDrawer",
        data() {
            return {
                drawer: false,
            };
        }
    };
</script>

<style scoped>

</style>
