<template>
    <div>
        <!--banner-->
        <div class="main-banner">
            <div class="container">
                <div class="main-banner-desc">
                    <h2>公共数据服务</h2>
                    <!--<p>公共服务平台以大数据生态圈为核心，支持PB级数据存储及分析计算<br>汇聚全省政务数据</p>-->
                    <div class = "index-info">
                        <msg-info ref = "instructionsInfo"></msg-info>
                    </div>
                    <!--<button class="button">产品文档</button>-->
                </div>
                <div class="main-banner-img"><img src="~@/assets/img/main-banner-img.png" alt=""></div>
            </div>
        </div>
        <!--模块介绍-->
        <div class="main-column">
            <div class="container">
                <el-row>
                    <el-col :span="8">
                        <div class="main-module-intro-item">
                            <i class="main-module-icon"><img src="~@/assets/img/icon-module-1.png" alt=""></i>
                            <h4>{{newsList[0].title}}</h4>
                            <p class="sub-title">{{newsList[0].sub_title}}</p>
                            <p class="info info1">
                                <msg-info ref = "newsInfo1"></msg-info>
                            </p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="main-module-intro-item">
                            <i class="main-module-icon"><img src="~@/assets/img/icon-module-2.png" alt=""></i>
                            <h4>{{newsList[1].title}}</h4>
                            <p class="sub-title">{{newsList[1].sub_title}}</p>
                            <p class="info info2">
                                <msg-info ref = "newsInfo2"></msg-info>
                            </p>
                             </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="main-module-intro-item">
                            <i class="main-module-icon"><img src="~@/assets/img/icon-module-3.png" alt=""></i>
                            <h4>{{newsList[2].title}}</h4>
                            <p class="sub-title">{{newsList[2].sub_title}}</p>
                            <p class="info info3">
                                <msg-info ref = "newsInfo3"></msg-info>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--应用-->
        <div class="main-column" style="background: #fff;min-height: 104vh">
            <div class="container">
                <div class="main-col-head">
                    <h3>应用/APPLICATION</h3>
                </div>
                <div class="application-list">
                    <el-row :gutter="30">
                        <el-col :span="8" v-for="(item,index) in AppList" class="application-col">
                            <div class="application-item">
                                <h4>{{item.app_name}}</h4>
                                <p>{{item.app_msg}}</p>
                                <div class="application-mask">
                                    <button @click="accessInfo(item)"><i class="el-icon-s-management"></i></button>
                                    <button @click="accessPart(item.app_url)"><i class="el-icon-link"></i></button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <!--目录导航-->
        <div class="main-column">
            <div class="container">
                <el-row :gutter="30">
                    <el-col :span="16">
                        <div class="main-col-head">
                            <h3>目录导航/CONTENTS</h3>
                        </div>
                        <div class="contents-list">
                            <el-tabs v-model="activeName"  @tab-click="handleClickTabs">
                                <el-tab-pane :label="val.label" :name="val.label"
                                             v-for="(val,ind) in collectionList">
                                    <div class="contents-tab-pane">
                                        <el-scrollbar style="height:100%;">
                                            <el-row>
                                                <el-col :span="8" v-for="(item) in resBasic"><span
                                                        class="contents-item">{{item.ch_name}}</span></el-col>
                                            </el-row>
                                        </el-scrollbar>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="main-sidebar-head">
                            <h3>目录情况统计图</h3>
                        </div>
                        <div class="main-sidebar-chart" id="contentsChartLine" style="background: #1989FA;"></div>
                        <div class="main-sidebar-chart" id="contentsChartBar" style="background: #fff;"></div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!--重点项目-->
        <div class="main-column" style="background: #fff;">
            <div class="container">
                <div class="main-col-head">
                    <h3>重点项目/PROJECT</h3>
                </div>
                <div class="project-list">
                    <el-row :gutter="30">
                        <el-col :span="12" v-for="(item,index) in projectList">
                            <div class="project-item">
                                <h4>{{item.title}}</h4>
                                <div class="project-item-info" :id = "'project'+index">
                                    <component-info :info="item.msg"
                                                    :ids="'project'+index"></component-info>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var echarts = require('echarts');
    import MsgInfo from '../../component/msg-info'
    import ComponentInfo from '../../component/component-info'
    export default {
        name: 'Home',
        components:{
            ComponentInfo,MsgInfo
        },
        data() {
            return {
                AppList: [],
                newsList:[{title:'',sub_title:'',msg:''},{title:'',sub_title:'',msg:''},{title:'',sub_title:'',msg:''}],
                activeName: '',
                collectionList:[],
                resBasic: [],
                projectList: [],
                chartLineXdata: ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
                chartLineValue: [820, 332, 901, 934, 1290, 1330, 511, 888, 1330, 733, 890, 1130],
                chartBarXdata: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                chartBarValue: [10, 52, 200, 334, 390, 330, 220],
            }
        },
        mounted() {
            this.createChartBarData()
            this.createChartLineData()
            this.getAppList()
            this.getIndexInfo()
            this.keyProjects()
            this. getSrcTree()
            this.getNews()
        },
        methods: {
            getNews(){
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/cmsNews/getCmsNewsAll'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        news_class: 'news'
                    })
                }).then(({data}) => {
                    if (data && data.code == 0) {
                        this.newsList = data.data
                        this.$nextTick(() => {
                            this.$refs.newsInfo1.init(data.data[0].msg,'.info1')
                            this.$refs.newsInfo2.init(data.data[1].msg,'.info2')
                            this.$refs.newsInfo3.init(data.data[2].msg,".info3")

                        })
                    }
                })
            },
            getAppList() {
                this.AppList = []
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/app/getAppList'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        limit: 300,
                        page: 1,
                    })
                }).then(({data}) => {
                    if (data && data.code == 0) {
                        var list = []
                        data.data.list.forEach(function (val) {
                            if (val.ifShow == 'true' && list.length < 6) {
                                list.push(val)
                            }
                        })
                        this.AppList = list
                    }
                })
            },
            getIndexInfo() {
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/cmsNews/getCmsNewsAll'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        news_class: 'index'
                    })
                }).then(({data}) => {
                    if (data && data.code == 0) {
                        this.$nextTick(() => {
                            this.$refs.instructionsInfo.init(data.data[0].msg,'.index-info')
                        })
                    }
                })
            },
            keyProjects(){
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/cmsNews/getCmsNewsAll'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        news_class: 'xm'
                    })
                }).then(({data}) => {
                    if (data && data.code == 0) {
                        this.projectList = data.data
                    }
                })
            },
            getSrcTree() {
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/mppResource/getSrcClass'),
                    method: 'post',
                }).then(({data}) => {
                    if (data && data.code == '0') {
                        this.collectionList = data.data
                        this.activeName = data.data[0].label
                        this. handleClickTabs()
                    }
                })
            },
            accessInfo(item, id) {
                this.$router.push({
                    path: `/applicationDetails/${id}`,
                    query: {
                        obj: item
                    }
                })
            },
            accessPart(item, index) {
                console.log(item, index)
            },
            handleClickTabs() {
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/mppResource/getTableByMainClass'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        limit: 24,
                        page: 1,
                        main_nm: this.activeName
                    })
                }).then(({data}) => {
                    if (data && data.code == 0) {
                        this.resBasic = data.data.records
                    }
                })
            },
            createChartLineData(){
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/sts/metric/source/collect_main_sjrb'),
                    method: 'post',
                }).then(({data}) => {
                    this.createChartLine(data.data)
                })
            },
            createChartLine(data) {
                var XName = []
                var data1 = []
                for(let i = data.length-1;i>=0;i--){
                    XName.push(data[i].day.substr(5))
                    data1.push(data[i].datQty)
                }
                let chartLine = echarts.init(document.getElementById('contentsChartLine'));
                let option = {
                    title: {
                        text: "接入数据量日趋势",
                        textStyle: {
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#fff',
                        },
                        left: '0%',
                        top:'3%'
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        top: '21%',
                        containLabel: true
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: 'rgba(0,0,0, 0.5)'
                            }
                        } ,
                        formatter: function (val) {
                            return val[0].name+'<br/>&nbsp;&nbsp;&nbsp;&nbsp;'+val[0].seriesName+'：'+val[0].value+'万条'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: XName,
                        axisTick: false,
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: 'rgba(255,255,255, 0.6)',
                            }
                        },
                        axisLine: {
                            show: false
                        },
                    },
                    yAxis: {
                        type: 'value',
                        axisTick: false,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    series: [{
                        name:'接入数据量',
                        data: data1,
                        type: 'line',
                        lineStyle: {
                            normal: {
                                color: '#fff',

                            },
                        },
                        itemStyle: {
                            color: '#fff'
                        },
                        showSymbol: false,
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255,255,255,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(255,255,255,0)'
                            }])
                        },
                    }]
                }
                chartLine.setOption(option)
                window.addEventListener("resize", () => {
                    chartLine.resize()
                })
            },
            createChartBarData() {
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/sts/metric/source/collect_main_bmzb'),
                    method: 'post',
                }).then(({data}) => {
                    this.createChartBar(data.data)
                })
            },
            createChartBar(data) {
                var xData = []
                var data1 = []
                data.forEach(function (val) {
                    xData.push(val.name)
                    data1.push(val.value)
                })
                let chartBar = echarts.init(document.getElementById('contentsChartBar'));
                let option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: 'rgba(0,0,0, 0.5)'
                            }
                        },
                        formatter: function (val) {
                           return val[0].name+'<br/>&nbsp;&nbsp;&nbsp;&nbsp;'+val[0].seriesName+'：'+val[0].value+'万条'
                        }
                    },
                    title: {
                        text: "接入部门Top10",
                        textStyle: {
                            fontSize: 14,
                            fontWeight: '400',
                            color: '#333',
                        },
                        left: '0%',
                        top:'3%'
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        top: '21%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: xData,
                            boundaryGap: false,
                            axisTick: false,
                            axisLabel: {
                                show: true,
                                interval: 1,
                                textStyle: {
                                    color: 'rgba(0,0,0, 0.6)',
                                },
                                formatter: function (params) {
                                    var l = params.length
                                    if(l>5){
                                        var str = ''
                                        for (var i = 0;i<Math.ceil(l / 5)+1;i++) {
                                            if(i<Math.ceil(l / 5)-1){
                                                str = str + params.substring(5*i, 5*(i+1))+'\n'
                                            }else{
                                                str = str + params.substring(5*i, 5*(i+1))
                                            }
                                        }
                                        return str//params.substring(0, Math.ceil(l / 2)) + '\n'+params.substring(Math.ceil(l / 2,l))
                                    }
                                    return params
                                }
                            },
                            axisLine: {
                                show: false
                            },
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        axisTick: false,
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                    },
                    series: [
                        {
                            name: '接入数据量',
                            type: 'bar',
                            barWidth: '30%',
                            data: data1,
                            itemStyle: {
                                normal: {
                                    barBorderRadius: [5, 5, 5, 5],
                                    color: (params) => {
                                        let colors = ['#C1DAE5', '#1F3944', '#00B2FF', '#1989FA', '#7C9AA7', '#C1DAE5', '#1989FA','#00fcff','#58def8','#00ffdb']
                                        return colors[params.dataIndex]
                                    }
                                }
                            },
                        }
                    ]
                };

                chartBar.setOption(option)
                window.addEventListener("resize", () => {
                    chartBar.resize()
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        padding: 0 5%;
    }
    .main-column {
        padding: 50px 0;
        position: relative;
    }

    .main-col-head {
        margin: 0 0 30px;
        padding: 10px 0;
        position: relative;
        > h3 {
            font-size: 24px;
            color: #303133;
            font-weight: 400;
            margin: 0;
        }
    }

    .main-banner {
        position: relative;
        height: 500px;
        margin-bottom: 100px;
        background: url("~@/assets/img/banner-bg.png") no-repeat #fff;
        background-position: left calc(50% + 300px) top -80px;
        &-desc {
            width: 50%;
            padding: 80px 30px;
            z-index: 2;
            position: absolute;
            > h2 {
                font-size: 40px;
                color: #00054E;
                line-height: 1.5em;
                margin: 20px 0;
            }
            .index-info {
                width: 70%;
                font-size: 15px;
                line-height: 2em;
                color: #6D72BF;
            }
            .button {
                padding: 0 60px;
                height: 50px;
                font-size: 15px;
                color: #00054E;
                border: 2px solid #00054E;
                background: none;
                cursor: pointer;
                margin: 30px 0;
                outline: none;
            }
        }
        &-img {
            position: absolute;
            bottom: -100px;
            left: 26%;
            z-index: 1;
        }
    }

    .main-module-intro-item {
        padding: 0 60px;
        margin: 0 0 80px;
        .main-module-icon {
            display: inline-block;
            padding: 10px;
            background: #fff;
            border-radius: 22px;
            overflow: hidden;
            box-shadow: 0 5px 30px rgba(0, 5, 72, .1);
            margin: 0 0 20px;
        }
        h4 {
            font-size: 16px;
            margin: 20px 0;
            color: #051362;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .sub-title {
            font-size: 14px;
            color: #9FA2B5;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 20px 0;
        }
        .info {
            margin: 10px 0;
            line-height: 1.5em;
            font-size: 12px;
            color: #9FA2B5;
        }
    }

    .application-list {
        padding: 30px 0;
    }

    .application-item {
        background: #fff;
        box-shadow: 0 0 60px rgba(0, 0, 0, .1);
        padding: 36px 40px;
        margin: 0 0 30px;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        height: 180px;
        width: 100%;
        &:hover .application-mask {
            top: 0;
            background: rgba(0, 0, 0, .2);
        }
        & > h4 {
            font-size: 30px;
            color: #333;
            margin: 0 0 24px;
        }
        & > p {
            font-size: 12px;
            color: #999;
            line-height: 1.5em;
            height: 4.5em;
            overflow: hidden;
        }
    }

    .application-mask {
        transition: all .5s;
        position: absolute;
        top: 100%;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: rgba(0, 0, 0, 1);
        > button {
            background: rgba(0, 0, 0, .6);
            height: 44px;
            width: 44px;
            border-radius: 22px;
            overflow: hidden;
            text-align: center;
            line-height: 44px;
            border: none;
            color: #fff;
            margin: 0 10px;
            outline: none;
            cursor: pointer;
        }
    }

    .contents-list {
        position: relative;
        .contents-tab-pane {
            height: 320px;
            margin: 0 0 20px;
        }
        .contents-item {
            padding: 10px 0;
            transition: all .5s;
            display: inline-block;
            &:hover {
                color: #1989FA;
            }
        }
        /deep/ .el-tabs__header {
            position: absolute;
            top: -80px;
            right: 30px;
        }
        /deep/ .el-tabs__nav-wrap {
            background: #EBEDF1;
            border-radius: 5px;
            overflow: hidden;
            &:after {
                display: none;
            }
        }
        /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2),
        /deep/ .el-tabs--top .el-tabs__item.is-top:last-child {
            padding: 0 20px;
        }
        /deep/ .el-tabs__active-bar {
            top: 2px;
            height: auto;
            bottom: 2px;
            background: #fff;
            z-index: 0;
            box-sizing: content-box;
            padding: 0 18px;
            margin: 0 0 0 -18px;
            border-radius: 5px;
        }
    }

    /deep/ .el-scrollbar__wrap {
        overflow-x: hidden;
    }

    .main-sidebar-head {
        margin: 0 0 30px;
        padding: 10px 0;
        position: relative;
        h3 {
            font-size: 20px;
            color: #303133;
            margin: 0;
        }
    }

    .main-sidebar-chart {
        height: 150px;
        margin: 0 0 20px;
        padding: 0 10px;
        border-radius: 10px;
        overflow: hidden;
    }

    .project-list {
        padding: 30px 0;
        position: relative;
        .project-item {
            cursor: pointer;
            margin: 0 0 20px;
            border: 1px solid #fff;
            transition: all .5s;
            background: #F5F5F5;
            border-radius: 10px;
            padding: 10px 36px;
            &-info {
                padding: 10px 0;
                font-size: 12px;
                box-sizing: content-box;
                min-height: 16vh;
                line-height: 2em;
                font-weight: 400;
                color: #333;
            }
            h4 {
                font-size: 18px;
                white-space: nowrap;
                margin: 10px 0;
                overflow: hidden;
                color: #000;
                text-overflow: ellipsis;
            }
            &:hover {
                transition: all 1s;
                border: 1px solid #3870DF;
            }
        }
    }
</style>

