<template>
    <div>
        <div class="manual-wrap">
            <!--banner-->
            <div class="manual-banner">
                <div class="container">
                    <div class="manual-banner-desc">
                        <h2>{{manuInfo.title}}</h2>
                        <p class = "manual">
                            <msg-info ref = "manualInfo"></msg-info>
                        </p>
                    </div>
                    <div class="manual-banner-img"><img src="~@/assets/img/manual-banner-img.png" alt=""></div>
                </div>
            </div>
            <!--目录-->
            <div class="manual-menu">
                <div class="container">
                    <div class="manual-menu-wrap">
                        <el-row :gutter="30">
                            <el-col :span="8" v-for="(item,index) in manualMenu">
                                <div class="manual-menu-item">
                                    <i class="icon"><img :src="item.icon" alt=""></i>
                                    <h4 class="title">{{item.name}}</h4>
                                    <ul class="manual-menu-child" v-if="item.children">
                                        <li class="manual-menu-child-item" v-for="(items,ind) in item.children"
                                            @click="getManualMenu(items)">{{items.title}}
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <div v-if="manualTenantVisible">
                <!--流程-->
                <div class="manual-info">
                    <div class="container">
                        <div class="manual-info-title">
                            <h4>{{name}}</h4>
                            <!--<p>租户申请流程说明内容填充租户申请流程说明内容填充租户申请流程说明内容填充租户申请流程说明内容填充租户申请流程说明内容填充租户申请流程说明内容填充租户申请流程说明内容填充</p>-->
                        </div>
                        <div class="manual-step">
                            <div class="manual-step-item" id="manual-step">
                                <!--<b class="index-icon">{{item.stepIndex}}</b>-->
                                <!--<p>{{item.stepTitle}}</p>-->
                                <component-info ref="instructionsInfo"></component-info>
                            </div>
                        </div>
                    </div>
                </div>
                <!--下载-->
                <div class="manual-download" v-if="downShow">
                    <div class="container">
                        <h4>表单下载</h4>
                        <p class="subtitle"></p>
                        <div class="manual-download-btn">
                            <!--<p >-->
                                <button v-for="(item1,ind) in fileList" :id="'download'+ind" name="download" type="button" size="mini"  @click="download(item1)"
                                        class="btn_download">
                                    {{item1.name}}
                                    <i class="el-icon-download" ></i>
                                </button>
                            <!--</p>-->
                            <!--<button>租户申请单</button>-->
                            <!--<button>租户服务器申请单</button>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import ComponentInfo from '../../component/msg-info'
    import MsgInfo from '../../component/msg-info'

    export default {
        name: 'manualList',
        components: {
            ComponentInfo,
            MsgInfo
        },
        data() {
            return {
                name: '租户申请流程',
                downShow:false,
                info: '',
                manuInfo:{},
                fileList:[],
                manualTenantVisible: true,
                stepTenantList: [
                    {stepTitle: '填写《租户申请单》', stepIndex: '1'},
                    {stepTitle: '填写 《租户服务器申请单》', stepIndex: '2'},
                    {stepTitle: '线下收到反馈，部署客户端，开通账号', stepIndex: '3'},
                    {stepTitle: '通知租户可以开始使用', stepIndex: '4'},
                ],
                manualMenu: [
                    {icon: require('../../../assets/img/manual-menu-icon1.png'), name: '租户申请流程', children: []},
                    {icon: require('../../../assets/img/manual-menu-icon2.png'), name: '资源申请流程', children: []},
                    {
                        icon: require('../../../assets/img/manual-menu-icon3.png'),
                        name: '客户端安装步骤',
                        children: []
                    },
                ]
            }
        },
        mounted() {
            this.getClassTree()
            this.getInfo()
        },
        methods: {
            getInfo(){
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/cmsNews/getCmsNewsAll'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        news_class: 'msg'
                    })
                }).then(({data}) => {
                    if (data && data.code == 0) {
                        this.manuInfo = data.data[0]
                        this.$nextTick(() => {
                            this.$refs.manualInfo.init(data.data[0].msg,'.manual')
                        })
                    }
                })
            },
            download(param) {
                this.$downloadFile({
                    url: '/web/cmsCmpt/downloadFile',
                    data: {fileName:param.name,filePath:param.file_path},//'explain/c186825c52fd41fd965f7402f188f4a7.xls'},//param.file_path},
                    file:param.name
                })
            },
            getClassTree() {
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/sys/sysDict/getDictClass'),
                    method: 'post',
                }).then(({data}) => {
                    if (data && data.data.length > 0) {
                        var that = this
                        data.data.forEach(function (val) {
                            if (val.name == '租户申请流程') {
                                that.manualMenu[0].id = val.parentid
                                that.manualMenu[0].children.push(val)
                            } else if (val.name == '资源申请流程') {
                                that.manualMenu[1].id = val.parentid
                                that.manualMenu[1].children.push(val)
                            } else if (val.name == '客户端安装步骤') {
                                that.manualMenu[2].id = val.parentid
                                that.manualMenu[2].children.push(val)
                            }
                        })
                        if (this.manualMenu[0].children.length > 0) {
                            this.getManualMenu(this.manualMenu[0].children[0])
                        } else {
                            this.getManualMenu()
                        }
                    }
                })
            },
            getManualMenu(item) {
                this.downShow = false
                this.fileList = []
                if(item.files.length>0){
                    this.downShow = true
                    this.fileList = item.files
                }
                this.name = item.title
                this.$nextTick(() => {
                    this.$refs.instructionsInfo.init(item.msg,'#manual-step')
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .container {
        padding: 0 3%;
    }

    .manual-banner {
        position: relative;
        height: 500px;
        margin-bottom: 100px;
        background: url("~@/assets/img/manual-banner-bg.png") no-repeat #fff;
        background-position: left calc(50% + 500px) top -10px;
        &-desc {
            width: 50%;
            padding: 80px 30px;
            > h2 {
                font-size: 40px;
                color: #00054E;
                line-height: 1.5em;
                margin: 20px 0;
            }
            > p {
                font-size: 15px;
                line-height: 2em;
                color: #6D72BF;
                margin: 20px 0;
            }
        }
        &-img {
            position: absolute;
            bottom: -30px;
            left: 36%;
            z-index: 1;
        }
    }

    .manual-menu {
        position: relative;
        z-index: 2;
        margin: -150px 0 0;
        &-wrap {
            background: #fff;
            border-radius: 20px;
            width: 900px;
            margin: auto;
            box-shadow: 0 0 50px rgba(69, 136, 255, .15);
            padding: 20px 80px;
        }
        &-item {
            padding: 10px 0 0 90px;
            position: relative;
            height: 70px;
            .icon {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                border-radius: 35px;
                background: #DFF1FF;
            }
            .title {
                margin: 0;
                font-size: 16px;
                color: #00054E;
                cursor: pointer;
                line-height: 2em;
                &:after {
                    content: '';
                    display: block;
                    height: 3px;
                    width: 1.5em;
                    margin: 5px 0 0;
                    background: #409eff;
                }
            }
            &:hover .manual-menu-child {
                display: block;
            }
            .manual-menu-child {
                display: none;
                position: absolute;
                top: 50px;
                left: 80px;
                z-index: 2;
                padding: 10px;
                min-width: 200px;
                border: 1px solid #eee;
                box-shadow: 0 0 15px rgba(0, 0, 0, .05);
                background: #fff;
                &-item {
                    margin: 5px 0;
                    border-radius: 5px;
                    line-height: 1.5em;
                    font-size: 14px;
                    padding: 5px 10px;
                    cursor: pointer;
                    &:hover {
                        color: #409eff;
                        background: #f8f8f8;
                    }
                }
            }
        }
    }

    .manual-info {
        padding: 30px 0;
        position: relative;
        &-title {
            margin: 30px auto;
            text-align: center;
            > h4 {
                font-size: 36px;
                color: #00054E;
                &:after {
                    content: '';
                    height: 4px;
                    margin: 20px auto;
                    display: block;
                    width: 24px;
                    background: #0055FF;
                }
            }
            > p {
                line-height: 2em;
                font-size: 14px;
                color: #AFAFAF;
            }
        }
    }

    .manual-step {
        padding: 0;
        position: relative;
        &-item {
            &:nth-last-child(1):after {
                display: none;
            }
            width: 900px;
            margin: 0 auto;
            background: #fff;
            padding: 20px 30px;
            position: relative;
            min-height: 30px;
            border-radius: 10px;
            &:after {
                content: '';
                display: block;
                position: absolute;
                bottom: -60px;
                z-index: 1;
                left: 50%;
                width: 1px;
                background: #DEDEDE;
                height: 60px;
            }
            > p {
                font-size: 18px;
                padding: 0 0 0 50px;
                line-height: 30px;
                color: #333;
                margin: 0;
            }
            .index-icon {
                float: left;
                display: block;
                width: 30px;
                height: 30px;
                border-radius: 15px;
                background: #5398FF;
                line-height: 30px;
                text-align: center;
                font-size: 16px;
                color: #fff;
            }
        }
    }

    .manual-download {
        background: #4588FF;
        padding: 50px 0;
        text-align: center;
        margin: 0 0 100px;
        color: #fff;
        h4 {
            font-size: 24px;
            margin: 0 0 20px;
        }
        .subtitle {
            font-size: 14px;
            line-height: 2em;
            margin: 20px 0;
        }
        .manual-download-btn {
            margin: 30px 0;
            /*text-align: left;*/
            padding: 0 3%;
            button {
                background: #fff;
                height: 40px;
                line-height: 40px;
                padding: 0 30px;
                color: #409eff;
                font-size: 16px;
                border-radius: 20px;
                outline: none;
                cursor: pointer;
                margin: 8px 10px;
                border: 1px rgba(1,1,1,0) solid;
                i{
                    margin-left: 10px;
                    font-size: 18px;
                    font-weight: 600;
                }
            }
            button:hover {
                border: 1px #caf7ff solid;
                color: #0850fb;
                background: #fafbff;
            }
        }
    }
</style>