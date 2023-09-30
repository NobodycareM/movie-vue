<template>
    <div class="re-body">
        <div class="re-data">
            <div class="re-text">
                <h2>注册</h2>
            </div>
            <div>
                <el-form ref="form" :model="form" :rules="rules" size="large">
                    <el-form-item prop="username">
                        <el-input
                                v-model="form.username"
                                clearable
                                placeholder="请输入账号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                v-model="form.password"
                                clearable
                                placeholder="请输入密码"
                                show-password
                        ></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-select placeholder="性别" v-model="form.gender">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="age">
                        <el-input
                                v-model.number="form.age"
                                clearable
                                placeholder="请输入年龄"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input
                                v-model="form.phone"
                                clearable
                                placeholder="请输入电话号码"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="butt">
                <el-button type="primary" size="large" @click.native.prevent="register('form')">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {register} from "@/api/register";

    export default {
        name: "register",
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
                form: {
                    username : "",
                    password : "",
                    gender : "",
                    age : "",
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
                }
            }
        },

        methods: {
            register(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        register(this.form)
                            .then((res) => {
                                console.log(res)
                                if (res.data.code === 20061) {

                                    localStorage.setItem("USERNAME", res.data.username);
                                    this.$message({
                                        message: "注册成功啦",
                                        type: "success",
                                        showClose: true,
                                    });
                                    this.$router.push({name : 'login'});
                                } else{
                                    this.$message({
                                        message: "注册失败",
                                        type: "error",
                                        showClose: true,
                                    });
                                }
                            })
                            .catch((err) => {
                                this.$message({
                                    message: "注册失败",
                                    type: "error",
                                    showClose: true,
                                });
                            });
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .re-body {
        width: 100%;
        height: 100%;
        min-width: 1000px;
        background-image: url("/src/assets/image/4.jpg");
        background-size: 100% 100%;
        background-position: center center;
        overflow: auto;
        background-repeat: no-repeat;
        position: fixed;
        line-height: 100%;
        padding-top: 100px;
    }

    .re-text {
        margin-bottom: 20px;
        line-height: 50px;
        text-align: center;
        font-size: 30px;
        font-weight: bolder;
        color: white;
        text-shadow: 2px 2px 4px #000000;
    }

    .re-data {
        width: 400px;
        height: 600px;
        transform: translate(-50%);
        margin-left: 50%;
    }



    .butt {
        margin-top: 10px;
        text-align: center;
    }

    .shou {
        cursor: pointer;
        color: #606266;
    }
</style>
