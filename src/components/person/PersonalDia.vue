<template>
    <div>
        <el-dialog
                title="修改个人信息"
                v-model="dialogVisible"
                width="60%"
                :before-close="handleClose">
            <el-form :model="form" :rules="rules" ref="form" label-width="150px">
                <div class="updateinfo">
                    <div class="left">
                        <el-form-item label="头像">
                            <img style="width:150px;height:110px" src="@/assets/image/9.png" />
                        </el-form-item>
                        <el-form-item label="昵称" prop="username">
                            <el-input v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model.number="form.age"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-select placeholder="性别" v-model="form.gender">
                                <el-option label="男" value="男"></el-option>
                                <el-option label="女" value="女"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="right">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="form.password" style="width: 500px"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" prop="phone">
                            <el-input v-model="form.phone" style="width: 500px"></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer" style="margin-left: 650px">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {getUserInfo, upDataUser } from "@/api/user.js";

    export default {
        computed : {
            ...mapState(['userName']),
        },
        name: "PersonalDia",
        data() {
            let checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value > 100) {
                        callback(new Error('必须小于100岁'));
                    } else if (value < 1){
                        callback(new Error('必须大于0岁'));
                    }else {
                        callback()
                    }
                }
            }

            let checkUsernamePassword=(rule,value,callback)=>{
                let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
                if(!reg.test(value)){callback(new Error('必须是由4-20位字母+数字组合'))
                }else{
                    callback()
                }
            }

            return {
                dialogVisible: false,
                form: {
                    username : "",
                    password : "",
                    gender : "",
                    age : Number,
                    phone : ""
                },
                rules: {
                    username: [
                        { required: true, message: "请输入用户名", trigger: "blur" },
                        { max: 10, message: "不能大于10个字符", trigger: "blur" },
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                        { validator : checkUsernamePassword, trigger: "blur" },
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'blur' }
                    ]
                },
            };
        },
        mounted() {
            this.load();
        },

        methods: {
            open() {
                this.dialogVisible = true;
            },
            load() {
                getUserInfo(this.userName)
                    .then((res) => {
                        console.log(res);
                        Object.assign(this.form, res.data.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            submit() {
                upDataUser(this.form)
                    .then((res) => {
                        console.log(res);
                        this.dialogVisible = false;
                        this.$emit("flesh");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            handleClose() {
                this.dialogVisible = false;
            },
        },
    };
</script>

<style scoped>
    .updateinfo {
        height: 350px;
        overflow: auto;
    }
    .left {
        float: left;
    }
    .right {
        overflow: hidden;
    }
</style>
<style>
    .el-dialog,
    .el-pager li {
        background-color: rgba(255, 0, 0, 0.0);
        color: #FFFFFF;
        background-image: url("/src/assets/image/8.jpg");
        background-size: 100%  100%;
    }
</style>
