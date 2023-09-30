<template>
    <div class="a">
    <h1>搜索失败,请点击返回按钮重新搜索</h1>
    <el-button type="primary" @click="ret" class="a" size="large">返回主页</el-button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "",
        methods : {
            ret() {
                this.$router.push({name : 'main'})
            }
        },

        computed : {
            ...mapState(['userName']),
        },
        mounted() {
            if (this.userName == null) {
                this.$router.push("login")
            }
        },
    }
</script>

<style scoped>
    .a{
        text-align: center;
    }
</style>
