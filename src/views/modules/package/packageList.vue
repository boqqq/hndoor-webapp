<template>
    <div>
        <Breadcrumb></Breadcrumb>
        <div class="package-wrap">
            <div class="container">
                <div class="package-list">
                    <el-row v-for="(item,index) in packageList" class="package-item" :gutter="30">
                        <el-col :span="6">
                            <h4 class="package-name">{{item.assembly_name}}</h4>
                            <p class="package-version">{{item.assembly_edition}}</p>
                        </el-col>
                        <el-col :span="18">
                            <!--<p class="package-desc">{{item.desc}}</p>-->
                            <div class="component-info" :id="'component-info'+index">
                                <component-info :info="item.assembly_info"
                                                :ids="'component-info'+index"></component-info>
                            </div>
                        </el-col>
                    </el-row>
                </div>
<!--                <div class="pagination-wrap">-->
<!--                    <el-pagination :total="5" layout="prev, next"></el-pagination>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '../../breadcrumb'
    import ComponentInfo from '../../component/component-info'
    export default {
        name:'packageList',
        data() {
            return {
                packageList:[],
                dataForm: {
                    assembly_id: '',
                    assembly_name:''
                },
            }
        },
        components:{
            Breadcrumb,ComponentInfo
        },
        mounted() {
            this.getAppList()
        },
        methods: {
            getAppList() {
                this.packageList = []
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/cmsCmpt/getCmsCmptList'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        assembly_name: this.dataForm.assembly_name,
                        page: 1,
                        limit: 1000
                    })
                }).then(({data}) => {
                    if (data && data.code == '0') {
                        if (data) {
                            this.packageList = data.data.records
                        } else {
                            this.packageList = []
                        }
                    }
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .container{
        padding: 0 3%;
    }
    .package-wrap {
        margin: 0 0 50px;
        padding: 50px 0;
    }
    .package-list {
        margin: 0 100px;
    }
    .component-info{
        line-height: 1.8em;
    }
    .package-item {
        margin: 0 0 30px;
        transition: all .6s;
        &:hover {
            transition: all .6s;
            background: #0069F4;
            transition: all .6s;
            color: #fff;
            h4,p {
                transition: all .6s;
                color: #fff;
            }
         }
        background: #fff;
        padding: 30px 36px;
        border-radius: 10px;
        .package-name {
            font-size: 24px;
            color: #0069F4;
            margin: 0;
            transition: all .6s;
        }
        .package-version {
            transition: all .6s;
            font-size: 12px;
            color: #333;
            margin: 36px 0 0 ;
        }
        .package-desc {
            transition: all .6s;
            font-size: 14px;
            line-height: 2em;
            color: #333;
            margin: 0;
        }
    }
    .pagination-wrap {
        padding: 50px;
    }
    .el-pagination {
      text-align: center;
    }
    /deep/ .el-pagination button:disabled {
        background: none;
    }
</style>