<template>
    <div style="height: 82vh;overflow: scroll;overflow-x: hidden" v-loading="dataListLoading">
        <div class="table-info">
            <div class="table_name">
                <h4><span>{{item.ch_name}}</span></h4>
                <span>[ ***{{item.eng_data_name}} ]</span>
            </div>
            <div class="collection-list-item-info">
                <p>
                    <span>所属部门：<b>{{item.src_pro}}</b></span>
                    <span>所属系统：<b>{{item.sys_name}}</b></span>
                </p>
                <p>
                    <span>时效：<b>{{item.update_cycle}}</b></span>
                    <span>数据量：<b>{{item.data_range}}</b></span>
                </p>
                <!--<span>更新日期<b>{{item.updated}}</b></span>-->
            </div>
        </div>
        <div class="fld_info">
            <h4 class="base_name">字段信息</h4>
            <el-table :data="columnList" border size="small" style="width: 100%;">
                <el-table-column label="编号" width="50" type="index"></el-table-column>
                <!--<template v-for='(col) in packageTableTitle'>-->
                <el-table-column
                        :show-overflow-tooltip="true"
                        prop="eng_name"
                        width="300%"
                        label="信息项">
                </el-table-column>
                <el-table-column
                        :show-overflow-tooltip="true"
                        width="200%"
                        prop="ch_name"
                        label="信息项中文名">
                </el-table-column>
                <el-table-column
                        :show-overflow-tooltip="true"
                        prop="hive_data_type"
                        label="数据类型">
                </el-table-column>
                <!--<el-table-column-->
                <!--:show-overflow-tooltip="true"-->
                <!--prop=""-->
                <!--label="数据长度">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--:show-overflow-tooltip="true"-->
                <!--prop=""-->
                <!--label="是否主键">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--:show-overflow-tooltip="true"-->
                <!--prop=""-->
                <!--label="是否为空">-->
                <!--</el-table-column>-->
                <el-table-column
                        :show-overflow-tooltip="true"
                        prop=""
                        label="开放条件">
                </el-table-column>
                <!--</template>-->

            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'packageTable',
        data() {
            return {
                dataListLoading: false,
                columnList: [],
                item: {}
            }
        },
        mounted() {
            // this.getFieldData(this.tableInfo.eng_data_name)
        },
        methods: {
            init(obj) {
                this.item = obj
                this.dataListLoading = true
                this.columnList = []
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/mppResource/getTableColumn'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        tableName: obj.eng_data_name,
                        decode: obj.decode,
                        type: 2
                    })
                }).then(({data}) => {
                    if (data && data.code == '0') {
                        this.columnList = data.data
                    }
                    this.dataListLoading = false
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
    .table-info {
        line-height: 35px;
        background-color: #f7f8f9;
        padding: 5px 10px;
        .table_name {
            display: flex;
            font-size: 16px;
            color: #3631df;
            h4 {
                margin: 0;
            }
        }
        span {
            margin-left: 10px;
        }
        .collection-list-item-info {
            border-top: 1px #8f9395 solid;
            margin-top: 5px;
            line-height: 33px;
            p {
                margin: 0;
                span {
                    margin-left: 20px;
                    b {
                        margin-left: 5px;
                    }
                }
                span:nth-child(2) {
                    margin-left: 10%;
                }
            }
        }
    }

    .fld_info {
        margin-top: 12px;
        background-color: #f7f8f9;
        padding: 15px 10px;
        .base_name {
            line-height: 40px;
            font-size: 16px;
            margin: 0;
            width: 110px;
            background-color: blue;
            text-align: center;
            color: #fff;
        }
    }

</style>