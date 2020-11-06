<template>
    <div>
        <Breadcrumb></Breadcrumb>
        <div class="label-list">
            <el-row>
                <el-col :span="6">
                    <div id="tree" :style="'height:'+treeHeight">
                        <el-select v-model="labelType"
                                   @change = "tagsList"
                                   size = "small" placeholder="请选择">
                            <el-option
                                    v-for="item in cateOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-scrollbar style="height: 63vh">
                            <el-tree
                                    :data="tag"
                                    show-checkbox
                                    node-key="value"
                                    @check="getStatistical"
                                    :props="defaultProps"
                                    ref="tagTrees">
                                <!--  default-expand-all-->
                            </el-tree>
                        </el-scrollbar>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="statistics">
                        <div v-if="!lableChartLoading&&!lableRecordsLoading" class="tip">请先在左侧勾选需要统计的标签！</div>
                        <div class="tag_menu" v-if="lableChartLoading||lableRecordsLoading">
                            <el-menu
                                    :default-active="activeIndex"
                                    class="el-menu-demo"
                                    mode="horizontal"
                                    @select="handleSelect">
                                <el-menu-item index="1">标签统计</el-menu-item>
                                <el-menu-item index="2">标签趋势</el-menu-item>
                            </el-menu>
                        </div>
                        <div v-if="lableChartLoading" class="it_chart" ref="bottom_chart"
                             style="border: 0;margin-top: -0.5vh">
                            <lable-chart ref="lableChart">
                            </lable-chart>
                        </div>
                        <div v-if="lableRecordsLoading">
                            <lable-records ref="lableRecords">
                            </lable-records>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    import Breadcrumb from '../../breadcrumb'
    import LableChart from "./lable-chart.vue";
    import LableRecords from "./lable-records.vue";

    export default {
        name: "labelList",
        components: {
            Breadcrumb,
            LableChart,
            LableRecords
        },
        data() {
            return {
                lableChartLoading: false,
                lableRecordsLoading: false,
                activeIndex: '1',
                treeHeight: '100%',
                labelType: '',
                checkedSize: 0,
                cateOptions:[],
                tag: [],
                ids: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
            }
        },
        mounted() {
            this.query()
        },
        methods: {
            query() {
                this.activeIndex = '1'
                this.$httpTAGUrl({
                    url: this.$httpTAGUrl.adornTAGUrl("/tag/factory/h50tagcategoryinfo/oneLevel"),
                    method: 'get',
                    params: this.$httpTAGUrl.adornParams({})
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.cateOptions.push(data.list[0])
                        this.labelType = data.list[0].value
                        this.tagsList()
                    }
                })
            },
            handleSelect(val) {
                this.activeIndex = val
                if (val == 1) {
                    this.lableChartLoading = true
                    this.lableRecordsLoading = false
                    this.$nextTick(() => {
                        this.$refs.lableChart.inits(this.labelType, this.ids)
                        this.treeHeight = this.checkedSize * 287 + 477 + 'px';
                    })
                } else {
                    this.lableChartLoading = false
                    this.lableRecordsLoading = true
                    this.ids = this.$refs.tagTrees.getCheckedKeys()
                    this.$nextTick(() => {
                        this.treeHeight = this.checkedSize * 383.7 + 131 + 'px';
                        this.$refs.lableRecords.inits(this.cateId, this.ids)
                    })
                }
            },
            tagsList() {
                this.$httpTAGUrl({
                    url: this.$httpTAGUrl.adornTAGUrl("/tag/factory/h50tagcategoryinfo/allCategorysAndTags"),
                    method: 'get',
                    params: this.$httpTAGUrl.adornParams({
                        key: '',
                        upctgId: this.labelType
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.tag = data.list
                    }
                })
            },
            getLabelSum(data) {
                let h = [];
                if (data.length > 0) {
                    var that = this
                    data.forEach(function (val) {
                        if (val.children == null || val.children.length < 1) {
                            h.push(val.parent)
                        } else {
                            h = h.concat(that.getLabelSum(val.children))
                        }
                    })
                }
                return h
            },
            getStatistical(p, f) {
                this.ids = this.$refs.tagTrees.getCheckedKeys()
                this.activeIndex = '1'
                this.lableChartLoading = true
                this.lableRecordsLoading = false
                var ls = unique(this.getLabelSum(p.children))
                if (f.checkedKeys != '') {
                    this.checkedSize = this.checkedSize + ls.length
                } else {
                    this.checkedSize = this.checkedSize - ls.length
                }

                function unique(arr) {
                    return Array.from(new Set(arr))
                }

                if (this.ids.length > 0) {
                    this.$nextTick(() => {
                        this.$refs.lableChart.inits(this.labelType, this.ids)
                        this.treeHeight = this.checkedSize * 287 + 477 + 'px';
                    })
                } else {
                    this.lableChartLoading = false
                    this.checkedSize = 0
                    this.treeHeight = '100%'
                    this.$message({
                        message: '请先在左侧勾选需要统计的标签',
                        type: 'warning',
                        duration: 1500
                    })
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .label-list {
        padding: 0 5%;
        margin-bottom: 80px;
        .statistics {
            background-color: #fff;
            margin: 0 2%;
            min-height: 74vh;
        }
        /deep/ #tree {
            height: 100%;
            background-color: #fff;
            padding: 14px 20px;
            .el-select{
                width: 100%;
                margin-bottom: 10px;
                .el-input--small{
                    font-size: 1rem;
                }
            }
            .el-scrollbar__wrap {
                overflow-x: hidden;
            }
            .el-tree-node__label{
                font-size: 1rem;
                padding: 5px 0;
            }
            .el-tree-node__content{
                padding: 15px 0;
            }
        }
        .tip {
            text-align: center;
            line-height: 35px;
            font-size: 16px;
            background-color: rgba(94, 255, 0, .1);
            color: #67c23a;
        }
        /deep/ .tag_menu {
            margin: 0 1%;
            .el-menu-item {
                font-size: 20px;
                padding: 0 20px;
                font-weight: 600;
                color: #303133;
            }
            .el-menu-item.is-active {
                color: #57a3f4;
            }
            .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
                /*outline: 0;*/
                color: #57a3f4;
            }
        }
    }
</style>