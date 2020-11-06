<template>
    <div class="mod-static" v-loading="tagListLoading">
        <div class="mod-charts">
            <el-form :inline="true">
                <el-form-item>
                    <el-date-picker v-model="dataForm.startTime" type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择起始日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="dataForm.endTime" type="date" size="small" value-format="yyyy-MM-dd"
                                    placeholder="选择截止日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="queryTagsRecords()" type="success" size="small">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--<el-alert title="勾选的标签各自的时间段对应的人数、以及对应时间段体系的总人数" type="success" center></el-alert>-->
        <div id="lable_records"  v-show="!alertShowFlag" style="margin-top: 1vh">
            <lable-records-item v-for="item in tagData.tags" :key="item.value" :name = "''"
                                :tags="item"></lable-records-item>
        </div>
    </div>
</template>

<script>
    import LableRecordsItem from './lable-records-item'

    export default {
        name: "lable-record",
        components: {
            LableRecordsItem
        },
        data() {
            return {
                dataForm: {
                    cateId: '',
                    ids: [],
                    startTime: '',
                    endTime: ''
                },
                tagData: {
                    sum: 0,
                    tags: []
                },
                alertShowFlag: true,
                tagListLoading: false
            }
        },
        methods: {
            inits(cateId, ids) {
                this.dataForm.cateId = cateId
                this.dataForm.ids = ids
                this.queryTagsRecords()
            },
            queryTagsRecords() {
                this.tagData = {
                    sum: 0,
                    tags: []
                }
                this.alertShowFlag = false
                this.tagListLoading = true
                this.$httpTAGUrl({
                    url: this.$httpTAGUrl.adornTAGUrl('/tag/static/tag/records'),
                    method: 'post',
                    data: this.$httpTAGUrl.adornData({
                        "cateId": this.dataForm.cateId,
                        "tagIds": this.dataForm.ids,
                        "startTime": this.dataForm.startTime,
                        "endTime": this.dataForm.endTime
                    })
                }).then(({data}) => {
                    // alert(JSON.stringify(data))
                    this.tagData = data
                }).finally(() => {
                    this.tagListLoading = false
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .mod-static{
        height: 100%;
        min-height: 74vh;
    }
    /deep/ .mod-charts {
        margin: 10px 3%;
        .el-form-item {
            margin-bottom: 0;
        }
    }

    /deep/ #lable_records {
        background-color: #fff;
        padding: 0 2%;
        .el-loading-mask {

        }
    }
</style>