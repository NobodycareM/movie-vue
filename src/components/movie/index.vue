<template>
    <el-card class="body-style">
        <img
                :src = imgUrl
                class="image"
        />
        <div class="card-body">
            <p class="font">电影名：{{movieName}}</p>
            <p class="font">上映时间：{{movieTime}}</p>
            <p class="font">类型：{{movieType}}</p>
            <p class="font">上映地点：{{movieAddress}}</p>
            <p class="font">主演：{{movieActor}}</p>
            <p class="font">导演：{{movieDirector}}</p>
            <p class="font">评分：{{movieScore}}</p>
        </div>
    </el-card>
</template>

<script>
    import {mapState} from 'vuex'
    import {getMovieById} from "@/api/movie";
    import {saveUserAct} from "@/api/user";
    export default {
        name: "",
        data() {
            return {
                movieId : this.$route.query.id,
                movieName : '',
                movieTime : '',
                movieType : '',
                movieAddress : '',
                movieDirector : '',
                movieActor : '',
                movieScore : '',
                imgUrl : '',
            }
        },

        computed : {
            ...mapState(['userName']),
        },
        mounted() {
          this.getMovieById(this.movieId)
          if (this.userName == null) {
                this.$router.push("login")
            }


        },


        methods : {
            getMovieById(id) {
                getMovieById(id).then(res => {
                        this.movieName = res.data.data.movieName
                        this.movieTime = res.data.data.movieReleaseTime
                        this.movieType = res.data.data.movieType
                        this.movieAddress = res.data.data.movieReleaseAddress
                        this.movieDirector = res.data.data.movieDirector
                        this.movieActor = res.data.data.movieActor
                        this.movieScore = res.data.data.movieScore
                        this.imgUrl = res.data.data.imageUrl
                        this.savaAct(this.userName,res.data.data.movieName,res.data.data.movieReleaseTime,res.data.data.movieType)
                })
            },
            savaAct(userName,movieName,movieTime,movieType){
                saveUserAct(userName,movieName,movieTime,movieType)
            }

        }

    }
</script>

<style scoped>

    .font{
        font-size: 30px;
    }
    .body-style{
        width: 1200px;
        height: 800px;
        padding: 20px;
        margin-left: 340px;
        margin-top: 50px;
        opacity: 0.8;
        background: linear-gradient(to bottom right, lightskyblue, pink);

    }

    .card-body {
        width: 500px;
        height: 600px;
        float: left;
        margin-top: 60px;
        padding: 14px;
        text-align: center;
        margin-left: 50px;
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
        float: left;
        width: 35%;
        margin-left: 50px;
        margin-top: 100px;
        display: block;
        height: 400px;
    }


</style>
