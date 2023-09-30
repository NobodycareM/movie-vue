<template>
    <div class="main-body">
    <div class="box">
            <div class="search-box">
                <div class="logo">
                    <img  class="log_img" src="@/assets/image/8.png" />
                </div>

                <input type="text" class="search-left" placeholder="请输入要搜索的内容" v-model="text">
                <el-button class="search-right" icon="Search" size="large" circle @click="moviePages(text)"/>
                <el-button class="person" icon="Sunrise" color="#8A2BE2" plain round @click="personal">个人中心</el-button>
            </div>
        </div>
    <div class="body1">
        <div class="text">
            <span>l</span>
            <span>i</span>
            <span>k</span>
            <span>e</span>
        </div>
        <el-row>
            <el-col
                    v-for="(o, index) in 4"
                    :key="o"
                    :span="6"
                    :offset="index > 0 ? 0.5 : 0"
            >
                <el-card class="body-style">
                    <img
                            :src = imageUrls[index]
                            class="image"
                    />
                    <div class="card-body">
                        <span>{{movieNames[index]}}</span>
                        <div class="bottom">
                            <time class="time">{{movieTimes[index]}}</time>
                            <p class="time">{{movieTypes[index]}}</p>
                            <el-button text class="button" @click="moviePage(movieIds[index])">电影详情</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
    <movie-body1></movie-body1>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import movieBody1 from "@/components/main/composes/body1";
    import {getUserAct, getByGA, getUserInfo, getByUserActMovie} from "@/api/user";
    import {getType} from "@/api/movie";

    export default {
        data() {
            return {
                text : "",
                gender : "",
                age : "",
                ga : "",
                movieIds : [],
                movieNames : [],
                movieTimes : [],
                movieTypes : [],
                imageUrls : [],
                info : ""
            }
        },

        computed : {
            ...mapState(['userName']),
        },
        components : {
            movieBody1,
        },
        methods : {
            personal() {
                this.$router.push("personal")
            },
            moviePages(name) {
                if (name === ""){
                    this.$message({
                        type:"info",
                        message:"搜索框内容为空,请重新输入😊",
                        showClose:true
                    })
                }else {
                    this.$router.push({name:'searchMovie', query: {name: name}})
                }

            },

            moviePage(id) {
                this.$router.push({name:'movie', query: {id: id}})
            },

        },
        mounted() {
            if (this.userName == null) {
                this.$router.push("login")
            }
            getUserAct(this.userName).then(res =>{
                console.log(res)
                if(res.data.data.length===0) {
                    getUserInfo(this.userName).then(res =>{
                        console.log(res)
                        this.gender = res.data.data.gender
                        this.age = res.data.data.age
                        this.ga = this.gender + "," + this.age
                        getByGA(this.ga).then(res => {
                            console.log(res)
                            for (let i = 0 ; i < res.data.data.length; i++) {
                                this.movieIds[i] = res.data.data[i].id
                                this.movieNames[i] = res.data.data[i].movieName
                                this.movieTimes[i] = res.data.data[i].movieReleaseTime
                                this.movieTypes[i] = res.data.data[i].movieType
                                this.imageUrls[i] = res.data.data[i].imageUrl
                            }
                        })
                    })
                }else {
                    getByUserActMovie(this.userName).then(res =>{
                        for (let j = 0 ; j < res.data.data.length; j++) {
                            this.movieIds[j] = res.data.data[j].id
                            this.movieNames[j] = res.data.data[j].movieName
                            this.movieTimes[j] = res.data.data[j].movieReleaseTime
                            this.movieTypes[j] = res.data.data[j].movieType
                            this.imageUrls[j] = res.data.data[j].imageUrl
                        }
                    })
                }
            })

        }

    }
</script>
<style lang="less" scoped>
  .main-body{
    background: #F2F2F2;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .logo {
    width:550px;
    height:auto;
    float:left;

    //margin-left: 200px;
  }

  .log_img{
    margin-left: 475px;
    width: 100px;
    margin-top: 9px;
  }

  .text {
    padding-left: 50px;
  }

  .text span {
    animation-delay: 0s;
    color: #444;
    text-shadow: 0 0 0 #444;
    animation: start 1s ease-in-out infinite alternate;
    font-size: 30px;

  }

  @keyframes start {
    to {
      text-shadow: 0 0 5px lightskyblue,
      0 0 5px lightskyblue,
      0 0 10px lightskyblue,
      0 0 18px greenyellow,
      0 0 20px greenyellow,
      0 0 40px greenyellow;
      color: pink;
    }
  }

  .text span:nth-child(1) {
    animation-delay: 0.1s;
  }

  .text span:nth-child(2) {
    animation-delay: 0.2s;
  }

  .text span:nth-child(3) {
    animation-delay: 0.3s;
  }

  .text span:nth-child(4) {
    animation-delay: 0.4s;
  }

  .body1 {
    margin-right: 100px;
    margin-left: 100px;
    margin-top: 10px;
  }

  .box{
    text-align:center;
  }
  .search-box{
    margin:0 auto;
    background: #585558;
    height: 83px;
  }
  .person{
    width: 5%;
    height: 50px;
    margin-top:0;
    margin-left: 200px;
  }
  .search-left{
    text-indent: 20px;
    width: 30%;
    height:50px;
    border:#D5CED7 2px solid;
    margin-top:14px;
    border-bottom-left-radius:25px;
    border-top-left-radius:25px;
    border-bottom-right-radius:25px;
    border-top-right-radius:25px;
    outline:none;
    margin-left: -230px;
  }
  .search-right{
    width:8%;
    height:55px;
    background:#E9CBEF;
    color: #fff;
    border:#D5CED7 2px solid;
    margin-top:0;
    border-bottom-right-radius:127px;
    border-top-right-radius:129px;
    border-bottom-left-radius:127px;
    border-top-left-radius:129px;
    outline:none;
  }

  .type {
    margin-left: 100px;
  }

  .card-body {
    padding: 14px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
  }

  .image {
    width: 100%;
    display: block;
    height: 190px;
  }

  .body-style{
    width: 230px;
    height: 300px;
    padding: 20px;
    margin-left: 80px;
    margin-top: 20px;
    opacity: 1;
    background: linear-gradient(to bottom right, lightskyblue, pink);

  }

  .time {
    font-size: 12px;
    color: #999;
  }


</style>

