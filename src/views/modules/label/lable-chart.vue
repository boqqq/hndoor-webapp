<template>
    <div  v-loading="labelListLoading">
        <div class="it_chart" id="top_chart">
            <el-row>
                <el-col :span="12">
                    <div style="height: 45px;margin-left:  3vw;font-size: 22px;font-weight: 500;line-height: 45px;">
                        勾选标签个数与体系总数占比
                    </div>
                    <div style="height: 280px;" id="top_chart1"></div>
                </el-col>
                <el-col :span="12">
                    <div style="height: 45px;margin-left:  3vw;font-size: 22px;font-weight: 500;line-height: 45px;">
                        勾选标签中数量前 {{tagLength}} 标签
                    </div>
                    <div id="progress" style="padding: 0;height: 280px;"></div>
                </el-col>
            </el-row>
        </div>
        <div class="it_chart">
            <p style="margin-left: 3vw;line-height: 6vh;font-size: 22px;font-weight: 500;">勾选标签各自对应数量和占比</p>
            <div style="margin-top: -1vh;padding-bottom: 1vh">
                <lable-item v-for="item in tagData.tags" :key="item.value" :tags="item"
                                 :total="total"></lable-item>
            </div>
        </div>
    </div>
</template>

<script>
    import LableItem from "./lable-item";
    import echarts from 'echarts'
    export default {
        name: "lable-chart",
        data() {
            return {
                labelListLoading: true,
                tagData: {
                    sum: 0,
                    tags: []
                },
                alertShowFlag: true,
                tagListLoading: false,
                total: 0,
                macrosc: {},
                campNm:'',
                showTags:[],
                tagLength:'',
            }
        },
        components: {LableItem},
        computed: {
            // sumCount: {
            //     get () { return this.$store.state.tag.sumCount },
            //     set (val) { this.$store.commit('tag/updateSumCount', val) }
            // }
        },
        mounted() {
        },
        methods: {
            inits(cateId, ids) {
                this.queryStaticTags(cateId, ids)
            },
            queryStaticTags(cateId, ids) {
                this.labelListLoading = true
                this.tagData = {
                    sum: 0,
                    tags: []
                }
                // this.alertShowFlag = false
                // this.tagListLoading = true
                this.$httpTAGUrl({
                    url: this.$httpTAGUrl.adornTAGUrl('/tag/static/tag/list'),
                    method: 'post',
                    data: this.$httpTAGUrl.adornData({
                        "cateId": cateId,
                        "tagIds": ids
                    })
                }).then(({data}) => {
                    this.sumCount = data.sum
                    this.total = data.sum
                    this.macrosc = data
                    this.campNm = data.campaignNb
                    this.setTags(data.tags)
                    this.$nextTick(() => {
                        this.tagData = data
                        this.top_chart1(data);
                        this.labelListLoading = false
                    })
                }).finally(() => {
                    this.tagListLoading = false
                })
            },
            setTags(children){
                this.showTags = [];
                if(null != children && children.length > 0){
                    children.forEach(v => {
                        if(v.isTag == 'CTY'){
                            v.childrens.forEach(k => {
                                this.showTags.push(
                                    {
                                        allName: v.label.replace(/\s+/g,"") + ':' + k.label.replace(/\s+/g,""),
                                        name: k.label.replace(/\s+/g,""),
                                        value: k.tagNb
                                    }
                                )
                            })
                        }else{
                            this.setTags(v.childrens)
                        }
                    })
                    this.setCampaign('progress')
                }
            },
            setCampaign(id){
                let typeNm = this.campNm
                this.showTags.sort(function(a, b){return b.value - a.value});
                let length = this.showTags.length
                if(length > 10){
                    length = 10
                }
                this.tagLength = length
                console.log(this.showTags)
                if (length < 2) {
                    return;
                }
                let echartPro = document.getElementById(id)
                let data = [];
                let mapData = {}
                for(let i=0; i<length; i++){
                    data.push(
                        {
                            name: this.showTags[i].name,
                            value: this.showTags[i].value
                        }
                    )
                    mapData[this.showTags[i].name] = this.showTags[i].allName
                }

                let average = 0.3;

                data = data.sort(function(a, b) {
                    return b.value - a.value
                })

                let yData = [];
                let barData = [];

                for (let i = 0; i < data.length; i++) {
                    barData.push(data[i]);
                    if (data[i].value < average) {
                        yData.push(i + ',' + data[i].name + ',' + 'lower');
                    } else {
                        yData.push(i + ',' + data[i].name)
                    }
                }

                let txSum = this.sumCount

                let option = {
                    tooltip: {
                        show: true,
                        axisPointer: {
                            type: 'shadow',
                        },
                        textStyle:{
                            color: '#fff',
                            // fontSize:16
                        },
                        formatter: function(params) {
                            let value = ((params.data['value'] / txSum) * 100).toFixed(2);
                            return '标签【'+ mapData[params.name] +'】：' + params.data['value'] + '<br\>' + '体系总人数：' + txSum + '<br\>' + '占比：' + value + '%'
                        },
                    },
                    grid: {
                        top: "0%",
                        bottom: "0%",
                        left: "-16%",
                        right: "18%",
                        containLabel: true,
                    },
                    xAxis: {
                        show: false
                    },
                    yAxis: {
                        type: 'category',
                        inverse: true,
                        nameGap: 0,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#606266'
                            }
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                                color: '#606266'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            margin: 117,
                            textStyle: {
                                color: '#606266',
                                align: 'left',
                                fontSize: 14
                            },
                            rich: {
                                a: {
                                    color: '#fff',
                                    backgroundColor: '#f36a5a',
                                    width: 20,
                                    height:  20,
                                    align: 'center',
                                    borderRadius: 18,
                                },
                                b: {
                                    color: '#fff',
                                    backgroundColor: '#001eff',
                                    width: 20,
                                    height:  20,
                                    align: 'center',
                                    borderRadius: 18,
                                }
                            },
                            formatter: function(params) {
                                let paramsArr = params.split(',');
                                let index = paramsArr[0];
                                let name = paramsArr[1];
                                if (paramsArr[2]) {
                                    return [
                                        '{a|' + (parseInt(index) + 1) + '}' + '  ' + (name.length > 5? name.substring(0, 5) + '...' : name)
                                    ].join('\n')
                                } else {
                                    return [
                                        '{b|' + (parseInt(index) + 1) + '}' + '  ' + (name.length > 5? name.substring(0, 5) + '...' : name)
                                    ].join('\n')
                                }
                            }
                        },
                        data: yData
                    },

                    series: [{
                        name: 'barSer',
                        type: 'bar',
                        roam: false,
                        visualMap: false,
                        zlevel: 2,
                        barMaxWidth: 18,
                        barGap: 0,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    let value = parseFloat(params.data['value']);
                                    let colorList = [{
                                        colorStops: [{
                                            offset: 0,
                                            color: '#f36a5a' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#f36a5a' // 100% 处的颜色
                                        }]
                                    },
                                        {
                                            colorStops: [{
                                                offset: 0,
                                                color: '#00C0FA' // 0% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#2F95FA' // 100% 处的颜色
                                            }]
                                        }
                                    ];
                                    if (value < average) {
                                        return colorList[0]
                                    } else {
                                        return colorList[1]
                                    }
                                },
                                barBorderRadius: 15
                            }
                        },
                        data: barData,
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#597FAE',
                                    fontSize: 14,
                                },
                                position: "right",
                                offset: [10, 0],
                                formatter: function(params) {
                                    let value = ((params.data['value'] / txSum) * 100).toFixed(2);
                                    return value + '%'
                                }

                            }
                        }
                    }]
                };
                let echartsGraph = echarts.init(echartPro)
                echartsGraph.setOption(option, true)
            },
            top_chart1(data) {
                var chart = echarts.init(document.getElementById('top_chart1'));
                var option = {
                    title: [{
                        text: (data.campaignNb/data.sum*100).toFixed(2)+'%',
                        x: 'center',
                        y: '34.5%',
                        zlevel: 3, //层级
                        textStyle: {
                            fontWeight: '700',
                            color: '#051bff',
                            fontSize: 35
                        }
                    },
                        {
                            text: '勾选标签与总数占比',
                            subtext: data.campaignNb,
                            x: 'center',
                            y: '50.5%',
                            zlevel: 3, //层级
                            textStyle: {
                                fontWeight: '700',
                                color: '#48cccc',
                                fontSize: 16
                            },
                            subtextStyle: {
                                align: "center",
                                color: '#13fcff',
                                fontSize:26
                            },
                        }
                    ],
                    series: [
                        // 占比环
                        {
                            type: 'pie',
                            clockWise: true,
                            // silent: true,
                            radius: ['50%', '75%'],
                            center: ['50%', '50%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    }
                                }
                            },
                            data: [{
                                value: data.campaignNb,
                                name: '得分占比',
                                itemStyle: {
                                    normal: {
                                        color: {
                                            colorStops: [{
                                                offset: 0,
                                                color: '#10a2ff' // 100% 处的颜色
                                            }, {
                                                offset: 1,
                                                color: '#10a2ff' // 0% 处的颜色
                                            }]
                                        }
                                    }
                                }
                            }, {
                                name: '未得分占比',
                                value: data.sum-data.campaignNb,
                                itemStyle: {
                                    normal: {
                                        color: '#545454'
                                    }, // 默认颜色
                                    emphasis: {
                                        color: '#545454'
                                    } // hover 颜色
                                }
                            }]
                        },
                    ]
                };
                chart.setOption(option, true)
                window.onresize = chart.resize;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .it_chart {
        border: 1px #d0d0db  solid;
        margin: 15px 0 0 0;
        width: 98%;
        margin-left: 1%;
        background-color: #fff;
    }


    /deep/#cahrt_loading{
        .el-loading-mask{
            top:0;
            background-color: rgba(9, 7, 23, 0.9);
        }
    }
</style>