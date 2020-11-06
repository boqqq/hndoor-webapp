<template>
    <div v-loading="dataListLoading">
        <Breadcrumb></Breadcrumb>
        <div class="collection-wrap">
            <div class="container">
                <el-row :gutter="20">
                    <el-col :span="7">
                        <div class="sidebar-tree">
                            <el-scrollbar view-class="view-box" :native="false" :style="treeHeight">
                                <el-tree :data="treeData" :props="defaultProps" @current-change="handleClickTree"
                                         node-key="code"
                                         accordion
                                         :default-expanded-keys="codes"
                                         style="margin: 0 10px">
                                  <span class="custom-tree-node" slot-scope="{ node, data }">
                                     <span>{{ node.label }}</span>
                                          <span>
                                              <el-button
                                                      type="text"
                                                      size="mini">
                                                  &nbsp;
                                                 {{' '+data.sum}}
                                               </el-button>
                                          </span>
                                  </span>
                                </el-tree>
                            </el-scrollbar>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="collection-list-head fixed">
                            <div class="selectTable">
                                <el-input placeholder="请输入查询关键词" @keyup.enter.native="getTableData()" v-model="itName"
                                          class="input-with-select"
                                          clearable>
                                    <el-button slot="append" @click="getTableData()">查询</el-button>
                                </el-input>
                            </div>
                            <div class="switch-btn" style="display: none;">
                                <button><i class="el-icon-menu"></i></button>
                                <button><i class="el-icon-s-unfold"></i></button>
                            </div>

                        </div>
                        <div class="collection-alert-bar">
                            <h3>资源列表</h3>
                            <div class="collection-alert-tag">{{tableClass}}：<span>共{{tableSum}}个表</span></div>
                            <p class="collection-alert-text"><i
                                    class="el-icon-warning"></i>已选择<span>{{checkedCount}}</span>项</p>
                            <div class="collection-alert-btn">
                                <el-button type="text" size="medium" @click="getDownload">下载</el-button>
                                <el-button type="text" size="medium" @click="allList">全选</el-button>
                                <el-button type="text" size="medium" @click="removeList">清空</el-button>
                            </div>
                        </div>
                        <div class="collection-list-wrap" ref="listWrap" v-loading="dataListLoading1">
                            <el-row :gutter="30" class="collection-list-row" style="min-height:51vh;">
                                <el-col :span="12" v-for="(item,index) in collectionList">
                                    <div class="collection-list-item">
                                        <div class="collection-list-checkbox">
                                            <el-checkbox v-model="item.checked" @change="checkboxChange"></el-checkbox>
                                        </div>
                                        <h4>
                                            <el-tooltip class="item" effect="dark" :content="item.ch_name" placement="top">
                                                <span @click="goCollectionInfo(item)">{{item.ch_name}}</span>
                                            </el-tooltip>
                                            <!--<span @click="goCollectionInfo(item)">{{item.ch_name}}</span>-->
                                        </h4>
                                        <h5><span @click="goCollectionInfo(item)">[***{{item.eng_data_name}}]</span>
                                        </h5>
                                        <div class="collection-list-item-info">
                                            <span>所属部门<b>{{item.src_pro}}</b></span><br/>
                                            <span>所属系统<b>{{item.sys_name}}</b></span><br/>
                                            <span>时效<b>{{item.update_cycle}}</b></span>
                                            <span>数据量<b>{{item.data_range}}</b></span>
                                            <!--<span>更新日期<b>{{item.updated}}</b></span>-->
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-pagination
                                    background
                                    class="pagination"
                                    :total="totalPage"
                                    :page-size="pageSize"
                                    :current-page="currentPage"
                                    :page-sizes="[10, 20, 50, 100]"
                                    :popper-append-to-body="false"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    @size-change="sizeChangeHandle"
                                    @current-change="currentChangeHandle">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <el-dialog title="详情" :visible.sync="collectInfoDialogVisible" width="80%"
                   :before-close="handleCloseDialog" style = "margin-top: -10vh;margin-bottom: -6vh">
            <PackageTable ref="packageTable"></PackageTable>
        </el-dialog>
        <res-download v-if="downloadShow" ref="resDownload" @removerTable="removerTable"></res-download>
    </div>
</template>

<script>
    import Breadcrumb from '../../breadcrumb'
    import PackageTable from './../../component/packageTable'
    import ResDownload from './res-download'

    export default {
        name: 'packageList',
        components: {
            Breadcrumb,
            PackageTable,
            ResDownload
        },
        data() {
            return {
                collectInfoDialogVisible: false,
                downloadShow: false,
                dataListLoading: true,
                dataListLoading1: false,
                collectionList: [],
                tableNname: '',
                itName: '',
                chName: '',
                codes: [],
                treeHeight: 'height:0px',
                pageIndex: 1,
                //当前页码
                currentPage: 1,
                //每页的数据数量
                pageSize: 10,
                totalPage: 0,
                checkedCount: 0,
                treeData: [],
                treeChecked: '',
                main_nm: '',
                class_code: '',
                sub_code: '',
                sub_level1_code:'',
                tableClass: '',
                tableSum: '',
                // form:{
                //     tableNname:'111',
                //     checked:'222'
                // },
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    code: 'code',
                    count: 'sum'
                },
                //packageTables组件数据
                tableInfo: '',
                //packageTables组件表头
                packageTableTitle: [
                    {titleItem: 'infoItem', titleName: '信息项'},
                    {titleItem: 'infoItemCn', titleName: '信息项中文描述'},
                    {titleItem: 'infoType', titleName: '信息项类型'},
                ],
                checkedList: []
            }
        },
        mounted() {
            // this.getCount(this.collectionList)
            this.getSrcTree()
            this.checkedList = []
        },
        methods: {
            getSrcTree() {
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/mppResource/getSrcClass'),
                    method: 'post',
                }).then(({data}) => {
                    if (data && data.code == '0') {
                        this.treeData = data.data
                        this.main_nm = data.data[0].label
                        this.tableClass = data.data[0].label
                        this.tableSum = data.data[0].sum
                        this.codes.push(data.data[0].code)
                        this.getTableData()
                        // this.treeChecked = data.data.items[0]
                    } else {
                        // this.dataListLoading2 = false
                    }
                    // this.dataListLoading1 = false
                })
            },
            getTableData() {
                this.dataListLoading1 = true
                this.collectionList = []
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl('/web/mppResource/getTableListBy'),
                    method: 'post',
                    data: this.$httpTAG.adornData({
                        tabName: this.itName,
                        main_nm: this.main_nm,
                        class_code: this.class_code,
                        sub_code: this.sub_code,
                        sub_level1_code:this.sub_level1_code,
                        page: this.pageIndex,
                        limit: this.pageSize,
                        type: 2
                    })
                }).then(({data}) => {
                    if (data && data.code == '0') {
                        for (var i = 0; i < data.data.records.length; i++) {
                            data.data.records[i].checked = false
                            data.data.records[i].index = i
                        }
                        this.collectionList = data.data.records
                        this.totalPage = data.data.total
                        this.ifChecked()
                    } else {
                        this.totalPage = 0
                    }
                    this.$nextTick(() => {
                        this.treeHeight = 'height:' + (this.$refs.listWrap.offsetHeight < 430 ? 430 : this.$refs.listWrap.offsetHeight + 50) * 1 + 'px'
                    })
                    this.dataListLoading1 = false
                    this.dataListLoading = false
                })
            },
            ifChecked() {
                if (this.checkedList.length > 0) {
                    var that = this
                    this.collectionList.forEach(function (val1) {
                        that.checkedList.forEach(function (val2) {
                            if (val1.eng_data_name == val2.eng_data_name) {
                                val1.checked = true
                            }
                        })
                    })
                }
            },
            // 每页数情况
            sizeChangeHandle(val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getTableData()
            },
            // 当前页情况
            currentChangeHandle(val) {
                this.pageIndex = val
                this.getTableData()
            },
            handleClickTree(data) {
                this.main_nm = ''
                this.class_code = ''
                this.sub_code = ''
                this.sub_level1_code = ''
                this.itName = ''
                this.tableClass = data.label
                this.tableSum = data.sum
                this.checkedList = []
                this.checkedCount = 0
                if (data.level == '1') {
                    this.main_nm = data.label
                } else if (data.level == '2') {
                    this.class_code = data.code
                } else  if (data.level == '3'){
                    this.sub_code = data.code
                }else{
                    this.sub_level1_code = data.code
                }
                this.treeChecked = data
                this.collectionList = []
                this.totalPage = 0
                this.pageIndex = 1
                if (data.sum == 0) {
                    this.treeHeight = 'height:' + 430 + 'px'
                    return
                }
                this.getTableData()
            },
            goCollectionInfo(item) {
                this.chName = item.ch_name
                this.collectInfoDialogVisible = true
                //this.tableInfo = item
                this.$nextTick(() => {
                    this.$refs.packageTable.init(item)
                })
            },
            handleCloseDialog() {
                this.collectInfoDialogVisible = false
            },
            checkboxChange(p) {
                if (p) {
                    this.checkedCount++
                } else {
                    this.checkedCount--
                }
                this.getCheckedList()
            },
            getCheckedList() {
                for (var i = 0; i < this.collectionList.length; i++) {
                    if (this.collectionList[i].checked) {
                        this.checkedList.push(this.collectionList[i])
                    }
                }
            },
            removerTable(item) {
                this.checkedCount--
                var list = []
                this.checkedList.forEach(function (val2) {
                    if (item != val2) {
                        list.push(val2)
                    }
                })
                this.collectionList.forEach(function (val1) {
                    if (item.eng_data_name == val1.eng_data_name) {
                        val1.checked = false
                    }
                })
                this.checkedList = list
            },
            build(data){
                var temp = {};   //用于name判断重复
                var result = [];  //最后的新数组
                data.map(function (item) {
                    if (!temp[item.eng_data_name]) {
                        result.push(item);
                        temp[item.eng_data_name] = true;
                    }
                });
                return result
            },
            getDownload() {
                this.checkedList = this.build(this.checkedList)
                this.downloadShow = true
                if (this.checkedList.length > 0) {
                    this.$nextTick(() => {
                        this.$refs.resDownload.init(this.checkedList)
                    })
                } else {
                    this.$message({
                        message: '请选择资源！',
                        type: 'warning',
                        duration: 1500,
                    })
                }
            },
            allList(){
                var that = this
                this.collectionList.forEach((x) => {
                    x.checked = true
                    that.checkedList.push(x)
                })
                this.checkedList =  this.build(this.checkedList)
                this.checkedCount = this.checkedList.length
            },
            removeList() {
                this.checkedList = []
                this.checkedCount = 0
                this.collectionList.forEach((x) => {
                    return x.checked = false
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container{
        padding: 0 1%;
    }
    .el-pagination {
        text-align: right;
    }

    .collection-wrap {
        margin: 0 0 100px;
    }

    .collection-list-row {
        padding: 0 0 0px;
    }

    .collection-alert-bar {
        border: 1px solid #D5EBC9;
        background: #F0F9EB;
        padding: 5px 20px;
        display: flex;
        h3 {
            font-size: 16px;
            color: #333;
            margin: 0;
            line-height: 2em;
            width: 20%;
        }
        .collection-alert-tag {
            line-height: 2.3em;
            width: 39%;
            font-weight: 600;
            text-align: right;
            span {
                font-weight: 300;
            }
        }
        &:after {
            display: block;
            content: '';
            clear: both;
        }
        .collection-alert-text {
            margin: 0;
            font-size: 14px;
            color: #666;
            line-height: 2.3em;
            width: 20%;
            text-align: right;
            [class^="el-icon"] {
                color: #1890FF;
                margin: 0 6px;
            }
            > span {
                margin: 0 6px;
                color: #1890FF;
                font-weight: 600;
            }
        }
        .collection-alert-btn {
            /*float: right;*/
            line-height: 2.3em;
            margin-left: 3%;
            width: 20%;
            > button {
                padding: 0;
                margin: 0 10px;
            }
        }
    }

    .collection-list-wrap {
        margin: 30px 0 0;
        position: relative;
        /deep/ .collection-list-checkbox {
            position: absolute;
            top: 16px;
            right: 18px;
            z-index: 1;
            .el-checkbox__inner {
                height: 24px;
                width: 24px;
                border-radius: 12px;
                border: 1px solid #6CB8E6;
            }
            .el-checkbox__inner:hover {
                background-color: #a8ebff;
            }
            .is-checked  .el-checkbox__inner:hover {
                background-color: #6CB8E6;
            }
            .el-checkbox__inner::after {
                width: 9px;
                height: 15px;
                top: 0px;
                border-bottom: 2px #fff solid;
                border-right: 2px #fff solid;
                left: 6px;
            }
        }
        .collection-list-item {
            position: relative;
            border: 1px rgba(22,22,22,0) solid;
            margin: 0 0 30px;
            background: #fff;
            border-radius: 10px;
            padding: 15px 30px;
            > h4 {
                font-size: 18px;
                line-height: 25px;
                height: 25px;
                margin: 10px 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                span {
                    cursor: pointer;
                }
                span:hover {
                    color: blue;
                }
            }
            > h5 {
                font-size: 14px;
                margin: 10px 0;
                font-weight: 400;
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                span {
                    cursor: pointer;
                }
                span:hover {
                    color: blue;
                }
            }
            h5:hover {
                color: blue;
            }
            &-info {
                font-size: 12px;
                margin: 15px 0 0;
                & > span {
                    white-space: nowrap;
                    color: #999;
                    line-height: 1.5em;
                    display: inline-block;
                    margin: 0 20px 5px 0;
                    & > b {
                        color: #333;
                        padding: 0 0 0 5px;
                    }
                }
            }
        }
        .collection-list-item:hover {
            border: 1px #4ff1fd solid;
        }
    }

    .sidebar-tree {
        background: #fff;
        padding: 10px 5px;
        position: relative;
        margin: 0 0 0px;
        border-radius: 10px;
    }

    .collection-list-head {
        /*margin: 0px 20px 10px 20px;*/
        position: relative;
        h3 {
            font-size: 16px;
            color: #333;
            margin: 0;
            line-height: 2em;
        }
        .switch-btn {
            float: right;
            padding: 6px;
            border-radius: 5px;
            background: #fff;
            > button {
                border: none;
                background: none;
                margin: 0 5px;
                outline: none;
                cursor: pointer;
            }
        }
    }

    /deep/ .selectTable {
        position: absolute;
        width: 100%;
        top: -50px;
        .el-input__inner, .el-input-group__append {
            font-size: 18px;
        }
        .el-input-group__append:hover {
            color: blue;
        }
        .el-input-group {
            width: 70%;
        }
        .el-form {
            margin-top: 6px;
            .el-tag--small {
                margin-left: 10px;
                font-size: 1em;
            }
        }
        .el-divider--horizontal {
            margin: 0;
        }
        .el-form-item {
            margin-bottom: 0;
        }
    }

    /deep/ .sidebar-tree {
        .el-scrollbar__wrap {
            overflow-x: hidden;
        }
        .el-tree {
            background-color: #0051ad;
            color: #fff;
            .el-tree-node {
                font-size: 1.3em;
                font-weight: 800;
                .el-tree-node {
                    font-size: 0.95em;
                    font-weight: 600;
                    /*padding: 5px 0;*/
                    .el-tree-node {
                        font-size: 0.88em;
                        font-weight: 500;
                        /*padding: 5px 0;*/
                        .el-tree-node {
                            font-size: 0.90em;
                            font-weight: 300;
                            /*padding: 5px 0;*/
                        }
                    }
                }
            }
            .el-button--text {
                font-size: 0.85em;
                color: #fff;
            }
            /*.is-current{*/
            /*!*background-color: #9dd0d0;*!*/
            /*color: #3e68bd;*/
            /*}*/
            .el-tree-node__content {
                height: 50px;
                padding: 0px 5px;
                border-bottom: 1px rgba(91, 170, 255, .3) solid;
                .el-tree-node__expand-icon {
                    margin-left: 5px;
                    font-size: 1.1em;
                }
            }
            .el-tree-node__content:hover {
                background-color: rgba(157, 208, 208, .5);
            }
            .el-tree-node:focus > .el-tree-node__content {
                background-color: transparent;
            }
            .el-tree-node.is-expanded.is-focusable {
                .el-tree-node__children {
                    background-color: #4157d5;
                    color: #f4f2f2;
                    .el-tree-node__content {
                        height: 40px;
                    }
                    .el-tree-node__children {
                        .el-tree-node__content {
                            height: 33px;
                        }
                        .el-tree-node__children {
                            .el-tree-node__content {
                                height: 30px;
                            }
                        }
                    }
                    .el-tree-node:focus > .el-tree-node__content {
                        background-color: transparent;
                    }
                    .el-tree-node.is-expanded.is-current.is-focusable {
                        /*background-color: red;*/
                    }
                    .el-tree-node__children {
                        background-color: rgba(61, 63, 196, 0.7);
                        .el-tree-node__content {
                            margin-left: -5px;
                        }
                        .el-tree-node__children{
                            background-color: rgba(104, 106, 247, .7);
                        }
                        .el-tree-node.is-current {
                            background-color: rgba(6, 24, 43, 0.7);
                            color: #fff;
                            .el-button--text {
                                color: #fff;
                            }
                            .el-tree-node{

                            }
                        }
                    }
                }
            }
        }
    }

    /deep/ .el-dialog {
        .el-dialog__header {
            padding: 20px 20px 0 30px;
        }
        .el-dialog__body {
            padding: 10px 20px;
        }
    }
</style>