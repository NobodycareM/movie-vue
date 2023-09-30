<template>
    <div class="search">
        <h2 style="margin-left: 40px; margin-top: 50px">搜索结果</h2>
    </div>
    <el-row>
        <el-col
                v-for="(o, index) in movieNames.length"
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
</template>

<script>
    import {mapState} from 'vuex'
    import {search} from "@/api/movie";
    export default {
        name: "search",

        data() {
            return {
                nameFlied : this.$route.query.name,
                movieIds : [],
                movieNames : [],
                movieTimes : [],
                movieTypes : [],
                imageUrls : [],
            }
        },


        computed : {
            ...mapState(['userName']),
        },
        mounted() {
            this.searchMovie(this.nameFlied)

            if (this.userName == null) {
                this.$router.push("login")
            }
        },

        methods : {
            searchMovie(nameField) {
                search(nameField).then(res =>{
                    console.log(res)
                    if (res.data.data.length!==0) {
                        for (let i = 0; i < res.data.data.length; i++) {
                            this.movieIds[i] = res.data.data[i].id
                            this.movieNames[i] = res.data.data[i].movieName
                            this.movieTimes[i] = res.data.data[i].movieReleaseTime
                            this.movieTypes[i] = res.data.data[i].movieType
                            this.imageUrls[i] = res.data.data[i].imageUrl
                        }
                    }else {
                        this.$router.push({name : 'blankPage'})
                    }
                })
            },
            moviePage(id) {
                this.$router.push({name:'movie', query: {id: id}})
            }
        }
    }
</script>

<style scoped>
    .search{
        width: 100%;
        height: 100px;
    }
    .card-body {
        padding: 14px;
    }

    .body-style{
        width: 230px;
        height: 300px;
        padding: 20px;
        margin-left: 50px;
        opacity: 0.8;
        background: linear-gradient(to bottom right, lightskyblue, pink);

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


    .time {
        font-size: 12px;
        color: #999;
    }

</style>
