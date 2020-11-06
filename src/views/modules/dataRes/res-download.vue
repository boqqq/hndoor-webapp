<template>
    <el-dialog
            :title="'资源下载列表'"
            :close-on-click-modal="false"
            :visible.sync="visible"
            width = "70%">
        <div>
            <div class="dc-table">
                <div class="titleBox">
                    <div class="titleBox1">
                        <span>序号</span>
                        <span>部门</span>
                        <span>表名</span>
                        <span>表中文名</span>
                        <span>时效</span>
                        <span>数据量</span>
                        <span>操作</span>
                    </div>
                </div>
                <div :style="'height:'+itemHeight+'vh'" id="bodyBox">
                    <el-scrollbar style="margin: 0;height: 100%">
                        <div class="bodyBox">
                            <div class="textBox" v-for="(item,index) in srcList" :key="index">
                                <span>{{index+1}}</span>
                                <span>{{item.src_pro}}</span>
                                <span>***{{item.eng_data_name}}</span>
                                <span>{{item.ch_name}}</span>
                                <span>{{item.update_cycle}}</span>
                                <span>{{item.data_range}}</span>
                                <span @click="delTable(item)">删除</span>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <input type="button" size="mini" value="取消" @click="visible = false"
                   class="btn_download">
             <input id="download" name="download" type="button" size="mini" value="导出" @click="download()"
                    class="btn_download">
        </span>
    </el-dialog>
</template>

<script>
    export default {
        name: "res-download",
        data() {
            return {
                visible: false,
                srcList: [],
                itemHeight: 50

            }
        },
        mounted() {
        },
        methods: {
            init(data) {
                this.visible = true
                this.srcList = data
            },
            delTable(item){
                var list = []
                this.srcList.forEach(function (val) {
                    if(val.eng_data_name != item.eng_data_name){
                        list.push(val)
                    }
                })
                this.srcList = list
                if(this.srcList.length<1){
                    this.visible = false
                }
                this.$emit('removerTable', item)
            },
            download() {
                this.$download({
                    url: '/web/cmsCmpt/download',
                    data: {data:this.srcList},
                    file:'资源列表'
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-dialog{
        .el-dialog__body{
            padding: 10px 20px;
        }
        .el-scrollbar__wrap{
            overflow-x: hidden;
        }
        .el-dialog__footer{
            padding: 0px 20px 15px 20px;
        }
        .dialog-footer{
            input{
                width: 7%;
                height: 30px;
                margin-right: 3%;
            }
            input:nth-child(2){
                background-color: #4f4fca;
                border: 0;
                color: #fff;
            }
            #download:hover{
                background-color: #1881ca;
                border: 1px #2573ca solid;
            }
        }
    }
    .dc-table {
        width: 100%;
        .titleBox1{
            display: inline-block;
            width: 100%;
            border-bottom: 1px #b7b1b1  solid;
            border-top: 1px #b7b1b1  solid;
        }
        .titleBox1{
            line-height: 30px;
            font-weight: 700;
        }
        .textBox{
            border-bottom: 1px #b7b1b1  solid;
            span:nth-child(7){
                color: #ff6f4d;
            }
        }
        span{
            line-height: 27px;
            padding: 0 4px;
            display: inline-block;
        }
        span:nth-child(1){
            width: 8%;
            text-align: center;
        }
        span:nth-child(2){
            width: 18%;
        }
        span:nth-child(3){
            width: 22%;
        }
        span:nth-child(4){
            width: 19%;
        }
        span:nth-child(5){
            width: 11%;
        }
        span:nth-child(6){
            width: 11%;
        }
        span:nth-child(7){
            width: 10%;
            text-align: center;
            cursor: pointer;
        }
    }
</style>