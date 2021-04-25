//公共底部
<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div>

                    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
                    <span>2021  by   QQ2848142215 </span>
                    <el-divider>参考链接</el-divider>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div>
                    <span><el-link href="https://element.eleme.io" target="_blank"
                                   type="primary">element</el-link></span>
                    <el-divider direction="vertical"></el-divider>
                    <span><el-link href="https://cn.vuejs.org/" target="_blank" type="primary">VUE</el-link></span>
                    <el-divider direction="vertical"></el-divider>
                    <span><el-link href="http://www.ruoyi.vip/" target="_blank" type="primary">若依</el-link></span>
                    <el-divider direction="vertical"></el-divider>

                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div>
                    <el-divider content-position="right"></el-divider>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "FooterCommon"
    }
</script>

<style scoped>

</style>
