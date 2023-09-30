<template>
    <div class="body">
        <div>
            <div>
                <el-text class="type" type="primary" size="large">
                    <img src="@/assets/image/11.png" style="width: 50px; height: 50px; margin-top: 40px" />
                类型
                </el-text>
                <el-button class="typeButton" v-for="index in types.length" @click="type(index)">{{types[index-1]}}</el-button>

            </div>

            <div>
                <el-text class="type" type="primary" size="large">
                    <img src="@/assets/image/12.png" style="width: 50px; height: 50px; margin-top: 40px" />
                年份
                </el-text>
                <el-button class="typeButton" v-for="index in years1.length" @click="time1(index)">{{years1[index-1]}}</el-button>
            </div>

            <div style="margin-left: 192px">
                <el-button class="typeButton" v-for="index in years2.length" @click="time2(index)">{{years2[index-1]}}</el-button>
            </div>

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
    </div>
</template>

<script>
    import {getRandom} from "@/api/movie";
    import {getType} from "@/api/movie";
    import {getByTime} from "@/api/movie";
    export default {
        data() {
            return {
                movieIds : [],
                movieNames : [],
                movieTimes : [],
                movieTypes : [],
                imageUrls : [],
                types : ["武侠","奇幻","动画","战争","悬疑","惊悚","犯罪","科幻","恐怖","爱情","动作","喜剧","剧情"],
                years1 : [2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012],
                years2 : [2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]
            }
        },
        created() {
            this.getRandom()
        },

        methods :  {
            getRandom() {
                getRandom().then(res => {
                    for (let i = 0 ; i < res.data.data.length; i++) {
                        this.movieIds[i] = res.data.data[i].id
                        this.movieNames[i] = res.data.data[i].movieName
                        this.movieTimes[i] = res.data.data[i].movieReleaseTime
                        this.movieTypes[i] = res.data.data[i].movieType
                        this.imageUrls[i] = res.data.data[i].imageUrl
                    }

                })
            },

            type(index) {
                getType(this.types[index-1]).then(res => {
                    console.log(res)
                    for (let i = 0 ; i < res.data.data.length; i++) {
                    this.movieIds[i] = res.data.data[i].id
                    this.movieNames[i] = res.data.data[i].movieName
                    this.movieTimes[i] = res.data.data[i].movieReleaseTime
                    this.movieTypes[i] = res.data.data[i].movieType
                    this.imageUrls[i] = res.data.data[i].imageUrl
                }
                })
            },

            time1(index) {
                getByTime(this.years1[index-1]).then(res => {
                    console.log(res)
                    for (let i = 0 ; i < res.data.data.length; i++) {
                        this.movieIds[i] = res.data.data[i].id
                        this.movieNames[i] = res.data.data[i].movieName
                        this.movieTimes[i] = res.data.data[i].movieReleaseTime
                        this.movieTypes[i] = res.data.data[i].movieType
                        this.imageUrls[i] = res.data.data[i].imageUrl
                    }
                })
            },

            time2(index) {
                getByTime(this.years2[index-1]).then(res => {
                    console.log(res)
                    for (let i = 0 ; i < res.data.data.length; i++) {
                        this.movieIds[i] = res.data.data[i].id
                        this.movieNames[i] = res.data.data[i].movieName
                        this.movieTimes[i] = res.data.data[i].movieReleaseTime
                        this.movieTypes[i] = res.data.data[i].movieType
                        this.imageUrls[i] = res.data.data[i].imageUrl
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

    .typeButton {
        margin-left: 30px;
        margin-top: 30px;
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
        margin-left: 50px;
        margin-top: 50px;
        opacity: 1;
        background: linear-gradient(to bottom right, lightskyblue, pink);

    }

    .body {

        margin-right: 200px;
        margin-left: 200px;

    }
    .time {
        font-size: 12px;
        color: #999;
    }

</style>
