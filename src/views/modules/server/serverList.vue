<template>
    <div>
        <Breadcrumb></Breadcrumb>
        <div class="server-wrap">
            <div class="container">
                <div class="server-head">
                    <h3>服务列表</h3>
                </div>
                <ul class="server-list">
                    <li v-for="(item,index) in packageList" :key="index">
                        <div class="server-card">
                            <div class="thumbnail">
                                <p>{{item.name.substr(0, 1).toUpperCase()}}</p>
                            </div>
                            <div class="server-card-info">
                                <p class="title"><span class="version">{{item.version}}</span>{{item.name}}</p>
                                <p class="premiss">{{item.premiss}}</p>
                                <el-rate class="rate" :colors="serverRateColor" v-model="item.rateVal" disabled></el-rate>
                            </div>
                        </div>
                    </li>
                </ul>
<!--                <el-pagination-->
<!--                        background-->
<!--                        layout="prev, pager, next"-->
<!--                        :total="1000">-->
<!--                </el-pagination>-->
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../../breadcrumb'
    export default {
        name:'serverList',
        components:{
            Breadcrumb
        },
        data() {
            return {
                serverRateColor: ['#99A9BF', '#F7BA2A', '#FF9900'],
                packageList:[
                    { name:'流动人口', version:'v1.1.1', premiss:'Administrator', rateVal:4.6 },
                    { name:'数据源类型查询', version:'v1.1.1', premiss:'Administrator', rateVal:1.6 },
                    { name:'phoneVerfication', version:'v1.1.1', premiss:'Administrator', rateVal:2.6 },
                    { name:'法人数据查询API', version:'v1.1.1', premiss:'Administrator', rateVal:3.6 },
                    { name:'户籍人口增长及增长量', version:'v1.1.1', premiss:'Administrator', rateVal:4.6 }
                ]
            }
        },
    }
</script>
<style lang="scss" scoped>
    $linearList :#0000FF, #4C00FF, #3A74E8, #00B1FF, #6695F3,#0080FF;
    @mixin bg-color() {
        $random-color: random(length($linearList));
        background: nth($linearList, $random-color);
    }
    @for $i from 1 through 50 {
        .server-list>li:nth-child(#{$i}) {
        @for $l from 1 through 20 {
            .thumbnail:nth-child(#{$l}) {
            @include bg-color;
            }
        }
    }
    }
    .el-pagination {
        text-align: right;
    }
    .server-wrap {
        margin: 0 0 100px;
    }
    .server-head {
        margin: 30px 20px;
        h3 {
            font-size: 16px;
            color: #333;
        }
    }
    .server-list {
        &:after {
            content: '';
            display: block;
            clear: both;
         }
        padding: 30px 30px 80px;
        margin: 0 -10px;
        transition: all .5s;
        >li {
            float: left;
        }
    }
    .server-card {
        transition: all .5s;
        &:hover {
            box-shadow: 0 0 30px rgba(0,0,0,.05);
            transition: all .5s;
         }
        width: 260px;
        margin: 0 15px 30px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        .thumbnail {
            margin: 10px auto 0;
            width: 240px;
            height: 240px;
            overflow: hidden;
            text-align: center;
            line-height: 240px;
            >p {
                margin: 0;
                font-size: 90px;
                text-align: center;
                font-weight: bold;
                color: #fff;
            }
        }
        &-info {
            padding: 20px;
            .title {
                font-size: 15px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 1em;
            }
            .version {
                float: right;
                font-size: 12px;
                color: #999;
            }
            .premiss {
                font-size: 12px;
                color: #666;
                margin: 0 0 20px;
            }
            .rate {
                margin: 0 0 10px;
            }
         }
    }
</style>