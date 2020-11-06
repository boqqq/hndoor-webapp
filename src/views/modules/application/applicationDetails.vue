<template>
    <div>
        <!--banner-->
        <div class="details-banner">
            <div class="container">
                <div class="details-banner-desc">
                    <h2>{{appName}}</h2>
                    <p>{{appMsg}}</p>
<!--                    <button class="button">产品文档</button>-->
                    <button class="button" @click = "toPdf()">操作手册</button>
                </div>
                <div class="details-banner-img"><img src="~@/assets/img/details-banner-img.png" alt=""></div>
            </div>
        </div>
        <div class="details-row">
            <div class="container">
                <div class="details-row-title">
                    <h3>一站式服务</h3>
                </div>
                <div class="pack-suit-bar">
                    <el-row :gutter="30">
                        <el-col :span="8" v-for="(item,index) in packSuitList" :class="suitActive==item.title?'active':''">
                            <div class="pack-suit-col" @mouseenter="switchCol(item)">
                                <h4>{{item.title}}</h4>
                                <p class="nameEn">{{item.nameEn}}</p>
                                <p class="desc">{{item.desc}}</p>
                                <ul class="info-list">
                                    <li v-for="i in item.infoList">{{i.infoDesc}}</li>
                                </ul>
                                <button class="detail-btn">查看详情</button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>

        <div class="details-row">
            <div class="container">
                <div class="details-row-title">
                    <h3>服务平台提供专业技术支持</h3>
                    <p class="desc">科技想象力，服务创造力</p>
                </div>
                <div class="pack-feature-bar">
                    <div class="pack-feature-img"><img src="~@/assets/img/feature-bar-img.png" alt=""></div>
                    <div class="pack-feature-item">
                        <dl v-for="(item,index) in appDetailsFeature">
                            <dt>{{item.title}}</dt>
                            <dd>{{item.desc}}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'applicationDetails',
        data() {
            return {
                suitActive:'查询分析',
                appName:'',
                appMsg:'',
                fileUrl:'',
                detailsBannerDesc:{
                    title:'元数据管理',
                    desc:'元数据管理包括业务词汇表的发展，数据元素和实体的定义，业务规则和算法以及数据特征。最基础的管理是管理业务元数据的收集、组织和维持。'
                },
                packSuitList:[
                    {title:'实时数据采集消费',nameEn:'LogHub',desc:'数据实时采集与消费',
                        infoList:[
                            {infoDesc:'30+采集方式，10+SDK支持'},
                            {infoDesc:'PB级流量，百万QPS弹性伸缩'},
                            {infoDesc:'与开源主流软件社区完美兼容'},
                            {infoDesc:'完善监控信息，管理百万设备'},
                        ]
                    },
                    {title:'查询分析',nameEn:'Search/Analytics',desc:'实时索引、查询、分析、可视化与报警',
                        infoList:[
                            {infoDesc:'秒级分析亿级数据/写入即可查询'},
                            {infoDesc:'完整SQL92支持，所见即所得'},
                            {infoDesc:'交互式仪表盘/告警/报表，支持开源'},
                            {infoDesc:'AIOps分析支持'},
                        ]
                    },
                    {title:'数据投递与仓储',nameEn:'LogShipper',desc:'实时数据ETL数据仓库',
                        infoList:[
                            {infoDesc:'全托管服务，稳定、可靠、弹性'},
                            {infoDesc:'支持压缩、自定义Partition、行列等...'},
                            {infoDesc:'完美支持生态/自研大数据系统'},
                        ]
                    },
                ],
                appDetailsFeature:[
                    {title:'技术',desc:'丰富的技术组件，简单组装即可快速搭建企业级应用，丰富的技术组件，简单组装即可快速搭建企业级应用。'},
                    {title:'融合',desc:'解放业务及技术生产力，推动公共服务底层创新，推动公共服务底层创新。解放业务及技术生产力，推动公共服务底层创新。'},
                    {title:'开放',desc:'符合服务及要求的安全可靠、高可用、高性能的服务能力，符合服务及要求的安全可靠、高可用、高性能的服务能力。'}
                ]
            }
        },
        mounted() {
            this.appName = this.$route.query.obj.app_name
            this.appMsg = this.$route.query.obj.app_msg
            this.fileUrl = this.$route.query.obj.file_url
            // alert(JSON.stringify(this.$route.query.obj))
        },
        methods:{
            switchCol(i) {
                console.log(this.suitActive)
                this.suitActive = i.title
            },
            toPdf(){
                if(this.fileUrl&&this.fileUrl != ''){
                    this.$router.push({path:`/item-pdf`,
                        query: {
                            fileUrl: this.fileUrl
                        }})
                }else{
                    this.$message({
                        message: '无操作手册！',
                        type: 'info',
                        duration: 1000
                    })
                }
                // this.$router.push(`/item-pdf`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        width: 90%;
        margin: 0 5%;
    }
    .details-banner {
        position: relative;
        height: 500px;
        margin-bottom: 100px;
        background: url("~@/assets/img/manual-banner-bg.png") no-repeat #fff;
        background-position: left calc(50% + 500px) top -10px;
    &-desc {
         width: 50%;
         padding: 80px 30px;
    >h2 {
        font-size: 40px;
        color: #00054E;
        line-height: 1.5em;
        margin:20px 0;
    }
    >p {
        font-size: 15px;
        line-height: 2em;
        color: #6D72BF;
        margin: 20px 0;
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
         bottom:-50px;
         left: 40%;
         z-index: 1;
     }
    }
    .details-row {
    padding:50px 0;
    margin:30px 0;
         &-title {
         margin: 30px 0;
         padding: 0 100px;
         position: relative;
         text-align:center;
         >h3 {
             line-height: 1.5em;
             font-size: 30px;
             margin: 20px 0;
         }
         .desc {
             font-size: 14px;
             color: #666;
             line-height: 1.5em;
         }
         }
    }
    .pack-suit-bar {
        padding: 30px 100px;
        position: relative;
    }
    .active .pack-suit-col {
        background: #4588FF;
        height: 500px;
        padding: 30px;
        margin: 0;
        >h4 {
            font-size: 30px;
        }
        * {
            color: #fff !important;
        }
        li {
            &:before {
                 background: #fff !important;
             }
         }
        .detail-btn {
            background: #18C5BF;
        }
    }
    .pack-suit-col {
        transition: all .5s;
        background: #fff;
        height: 460px;
        padding: 30px;
        box-shadow:0 0 50px rgba(0,0,0,.05);
        margin: 30px 0 20px;
        >h4 {
            text-align: center;
            font-size: 24px;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 10px auto;
        }
        .nameEn {
            font-size: 14px;
            font-weight: 600;
            margin: 10px auto;
            text-align: center;
        }
        .desc {
            font-size: 12px;
            margin: 20px auto;
            text-align: center;
        }
        .info-list {
            margin: 50px auto;
            height: 150px;
            overflow: hidden;
            >li {
                &:before {
                    content: '';
                    display: inline-block;
                    height: 6px;
                    width: 6px;
                    border-radius: 6px;
                    background: #333;
                    vertical-align: top;
                    margin: 5px 10px 0 0;
                 }
                padding: 10px;
                color:#666;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .detail-btn {
            border: none;
            height: 40px;
            line-height: 40px;
            padding: 0 50px;
            cursor: pointer;
            background: #EDEDED;
            font-size: 14px;
            color: #666;
            outline: none;
            border-radius: 20px;
            margin: auto;
            display: block;
        }
    }
    .pack-feature-bar {
        position: relative;
        margin: 0 5%;
    }
    .pack-feature-img {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 1;
        right: 0;
        left: 50%;
        bottom: 0;
        top:0;
        mix-blend-mode:multiply;
    }
    .pack-feature-item {
        position: relative;
        margin: 100px 50% 100px 0;
        dl {
            margin: 0 0 50px;
        }
        dt {
            margin: 0 0 10px;
            font-size: 16px;
            line-height: 1.5em;
            color: #666;
        }
        dd {
            margin: 0;
            font-size: 14px;
            line-height: 1.5em;
            color: #666;
        }
    }
</style>