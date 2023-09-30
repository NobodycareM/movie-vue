<template>
    <div class="main-body">
        <el-card>
            <el-descriptions class="margin-top" title="简介" :column="2" border>
                <template #extra>
                    <el-button type="primary" size="default" @click="operate">操作</el-button>
                </template>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><Picture /></el-icon>
                        头像
                    </template>
                    <img class="img" src="@/assets/image/9.png" alt="" />
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><User /></el-icon>
                        账户名
                    </template>
                    {{ userName }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><User /></el-icon>
                        昵称
                    </template>
                    {{ userName }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><PieChart /></el-icon>
                        年龄
                    </template>
                    {{ age }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><Male /></el-icon>
                        性别
                    </template>
                    <el-tag size="small">{{ gender }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-icon><Iphone /></el-icon>
                        手机号码
                    </template>
                    {{ phone }}
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import { getUserInfo } from "@/api/user.js";
    export default {
        name: "Info",
        computed : {
            ...mapState(['userName'])
        },
        data() {
            return {
                password: "",
                gender: "",
                age : Number,
                phone : ""
            };
        },
        mounted() {
            this.load();
        },
        methods: {
            load() {
                getUserInfo(this.userName)
                    .then((res) => {
                        console.log(res)
                        this.password = res.data.data.password
                        this.gender = res.data.data.gender
                        this.age = res.data.data.age
                        this.phone = res.data.data.phone
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },

            operate() {
                this.$message({
                    type:"info",
                    message:"它只是一个摆件😊",
                    showClose:true
                })
            },
        },
    };
</script>

<style scoped>
    .img {
        width: 80px;
        height: 80px;
    }
</style>

