<template>
    <div class="login-body">
        <div class="login-data">
            <div class="login-text">
                <h2>Welcome</h2>
            </div>
            <div class="form-data">
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
                </el-form>
            </div>
            <div class="tool">
                <div>
                    <el-checkbox v-model="checked" @change="remenber">记住密码</el-checkbox>
                </div>
                <div style="margin-top: 6px">
                    <span class="shou" @click="forgetpas">忘记密码？</span>
                </div>
            </div>
            <div class="butt">
                <el-button type="primary" @click.native.prevent="login('form')">登录</el-button>
                <el-button class="shou" @click="register">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from "@/api/login";
    import {mapMutations} from 'vuex'

    export default {
        name: "login",
        data() {

            let checkUsernamePassword=(rule,value,callback)=>{
                let reg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4,20}$/
                if(!reg.test(value)){callback(new Error('必须是由4-20位字母+数字组合'))
                }else{
                    callback()
                }
            }
            return {
                form: {
                    password: "",
                    username: "",
                },
                checked: false,
                rules: {
                    username: [
                        { required: true, message: "请输入用户名", trigger: "blur" },
                        { max: 10, message: "不能大于10个字符", trigger: "blur" },
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                        { validator : checkUsernamePassword, trigger: "blur" },
                    ],
                },
            };
        },
        mounted() {
            if(localStorage.getItem("news")){
                this.form=JSON.parse(localStorage.getItem("news"))
                this.checked=true
            }
        },
        methods: {
            ...mapMutations(['setUsername']),
            loginUsername (name) {
                this.setUsername(name)
            },
            login(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        login(this.form)
                            .then((res) => {
                                console.log(res)
                                if (res.data.code === 20051) {
                                    this.loginUsername(this.form.username)
                                    localStorage.setItem("USERNAME", res.data.username);
                                    this.$message({
                                        message: "登录成功啦",
                                        type: "success",
                                        showClose: true,
                                    });
                                    this.$router.push({name : 'main'});
                                } else if(res.data.code === 20050){
                                    this.$message({
                                        message: "账户名或密码错误",
                                        type: "error",
                                        showClose: true,
                                    });
                                } else if (res.data.code === 20040) {
                                    this.$message({
                                        message: "用户不存在,请先注册",
                                        type: "error",
                                        showClose: true,
                                    });
                                }
                            })
                            .catch((err) => {
                                this.$message({
                                    message: "账户名或密码错误",
                                    type: "error",
                                    showClose: true,
                                });
                            });
                    } else {
                        return false;
                    }
                });
            },
            remenber(data){
                this.checked=data
                if(this.checked){
                    localStorage.setItem("news",JSON.stringify(this.form))
                }else{
                    localStorage.removeItem("news")
                }
            },
            forgetpas() {
                this.$message({
                    type:"info",
                    message:"功能尚未开发额😥",
                    showClose:true
                })
            },
            register() {
                this.$router.push({name : 'register'})
            },
        },
    };
</script>

<style scoped>
    .login-body {
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

    .login-text {
        margin-bottom: 20px;
        line-height: 50px;
        text-align: center;
        font-size: 30px;
        font-weight: bolder;
        color: white;
        text-shadow: 2px 2px 4px #000000;
    }

    .login-data {
        width: 400px;
        height: 300px;
        transform: translate(-50%);
        margin-left: 50%;
    }



    .tool {
        display: flex;
        justify-content: space-between;
        color: #606266;
    }

    .butt {
        margin-top: 10px;
        text-align: center;
    }

    .shou {
        cursor: pointer;
        color: #606266;
    }

    /*ui*/
    /* /deep/ .el-form-item__label {
      font-weight: bolder;
      font-size: 15px;
      text-align: left;
    }

    /deep/ .el-button {
      width: 100%;
      margin-bottom: 10px;

    } */
</style>

