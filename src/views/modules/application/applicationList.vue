<template>
    <div>
        <div>
            <Breadcrumb></Breadcrumb>
            <div class="application-list-wrap">
                <div class="container">
                    <el-row :gutter="30" class="application-list-row">
                        <el-col :span="8" v-for="(item,index) in AppList" class="application-list-col">
                            <div class="application-list-item">
                                <h4>{{item.app_name}}</h4>
                                <p>{{item.app_msg}}</p>
                                <div class="application-list-mask">
                                    <button @click="accessInfo(item)"><i class="el-icon-s-management"></i></button>
                                    <button @click="accessPart(item.app_url)"><i class="el-icon-link"></i></button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
<!--                    <el-pagination-->
<!--                            background-->
<!--                            layout="prev, pager, next"-->
<!--                            :total="1000">-->
<!--                    </el-pagination>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../../breadcrumb'
    export default {
        name: 'packageList',
        components: {
            Breadcrumb,
        },
        data() {
            return {
                mainViewVisible:true,
                detailsViewVisible:false,
                name:'',
                AppList:[],
            }
        },
        mounted() {
            this.getAppList()
        },
        methods:{
            getAppList(){
                this.AppList = []
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/app/getAppList'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        limit: 300,
                        page: 1,
                    })
                }).then(({data}) => {
                    if(data&&data.code == 0){
                        var list = []
                        data.data.list.forEach(function (val) {
                           if(val.ifShow == 'true'){
                               list.push(val)
                           }
                        })
                        this.AppList = list
                    }
                })
            },
            accessInfo(item,id) {
                this.$router.push({path:`/applicationDetails/${id}`,
                    query: {
                        obj:item
                    }})
            },
            accessPart(url) {
                if(url != '')
                    window.open(url)
                else{
                    this.$message('该系统未配置访问地址')
                }
            },
        }
    }
</script>
<style lang="scss" scoped>
    .container{
        padding: 0 4%;
    }
    .el-pagination {
        text-align: right;
    }
    .application-list-row {
        padding: 0;
        min-height: 60vh;
    }
    .application-list-wrap {
        margin: 0 0 100px;
    }
    .application-list-item {
        background: #fff;
        padding: 36px 40px;
        margin: 0 0 30px;
        position: relative;
        border-radius: 10px;
        overflow: hidden;
        height: 180px;
        width: 100%;
    &:hover .application-list-mask {
         top:0;
         background: rgba(0,0,0,.2);
     }
    &>h4 {
         font-size: 30px;
         color: #333;
         margin: 0 0 24px;
     }
    &>p {
         font-size: 12px;
         color: #999;
         line-height: 1.5em;
         height: 4.5em;
         overflow: hidden;
     }
    }
    .application-list-mask {
        transition: all .5s;
        position: absolute;
        top:100%;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: rgba(0,0,0,.8);
    >button {
        background: rgba(0,0,0,.6);
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
</style>