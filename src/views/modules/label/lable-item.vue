<template>
    <div class="mod-MacroInner">
        <div v-if="tags.isTag == 'CTY'" style="margin-top: 10px; border: 1px #383975 solid;width: 96%;margin-left: 2%;">
            <div style="display: flex">
                <div style="margin-left: 3vw;width: 40%;line-height: 30px;text-align: left;font-size: 16px;margin-top: 5px;">
                    <span style="color:#063eac;padding: 0.5vh 3vh;border: 1px #4dacac solid;border-radius: 2.5vh;background-color: rgb(113, 226, 244);">{{tags.label}}</span>
                </div>
            </div>
            <div :id="tags.value" style="height: 230px; width: 100%;margin-top: 5px;margin-bottom: 5px"></div>
        </div>
        <div v-else>
            <lable-item v-for="item in tags.childrens" :tags="item" :total="total"></lable-item>
        </div>
    </div>
</template>

<script>
    import LableItem from "./lable-item";
    import echarts from 'echarts'
    export default {
        name: "lable-item",
        props: {
            tags: {
                type: Object,
                required: true
            },
            total: {
                required: true
            },
        },
        components: {
            LableItem
        },
        data() {
            return {
                chartType: '1',

            }
        },
        computed: {
            // sumCount: {
            //     get () { return this.$store.state.tag.sumCount }
            // }
        },
        mounted() {
            this.createBarCharts(this.tags.value, this.tags.childrens, this.total)
        },
        methods: {
            rsGs(value) {
                let pattern = /(?=((?!\b)\d{3})+$)/g
                let v = ("" + value).replace(pattern, ', ')
                return v;
            },
            createBarCharts(id, data, total,name) {
                let tagDiv = document.getElementById(id)
                if (tagDiv) {
                    let rotate = 0
                    let childrens = data
                    if (childrens.length > 10) {
                        rotate = 40
                    }

                    let xAxisArray = []
                    let seriesData = []
                    childrens.forEach(v => {
                        xAxisArray.push(v.label)
                        seriesData.push(v.tagNb)
                    })
                    let barWidth = 30
                    if(xAxisArray.length>8){
                        barWidth = '40%'
                    }
                    let sumCount = total
                    let option = {
                        grid: {
                            top: '17%',
                            left: '3%',
                            right: '4%',
                            bottom: '5%',
                            containLabel: true
                        },
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                            formatter: function (params) {
                                let pattern = /(?=((?!\b)\d{3})+$)/g
                                let rs = ("" + params[0].value).replace(pattern, ',')

                                return '标签：' + params[0].name +
                                    '<br/>人数： ' + rs;
                                  //  '<br/>占体系总数比例：' + (null == sumCount ? params[0].value : ((params[0].value / sumCount) * 100).toFixed(2) + '%');
                            },
                            // formatter: '{b}：{c}' + '(人)',
                            textStyle: {
                                color:'#fff'
                            }
                        },
                        xAxis: {
                            data: xAxisArray,
                            axisLine: {
                                lineStyle: {
                                    color: '#0177d4'
                                }
                            },
                            axisLabel: {
                                color: '#030303',
                                // fontSize: 14,
                                rotate: 0,
                                show: true,
                                formatter: function (param) {
                                    var str = ''
                                    if (rotate != 0) {
                                        for (let i = 0; i < param.length; i++) {
                                            if(i<5){
                                                str = str + param.substring(i, i + 1) + '\n'
                                            }
                                        }
                                        if(param.length>5){
                                            str = str + '...'
                                        }
                                    } else {
                                        str = param
                                    }
                                    return str
                                },
                            }
                        },
                        yAxis: {
                            name: "(人)",
                            splitNumber:5,
                            nameTextStyle: {
                                color: '#000',
                                // fontSize: 14
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#0177d4'
                                }
                            },
                            axisLabel: {
                                color: '#000',
                                // fontSize:14
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#0177d4'
                                }
                            },
                            // max: sumCount

                        },
                        series: [{
                            name:name,
                            type: 'bar',
                            barWidth: barWidth,
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#00b0ff'
                                    }, {
                                        offset: 0.8,
                                        color: '#7052f4'
                                    }], false)
                                }
                            },
                            data: seriesData
                        }]
                    };

                    let echartsGraph = echarts.init(tagDiv)
                    echartsGraph.setOption(option, true)
                }
            },
            createLineCharts(id, data, total,name) {
                let tagDiv = document.getElementById(id)
                if (tagDiv) {
                    let rotate = 0
                    let childrens = data
                    if (childrens.length > 10) {
                        rotate = 40
                    }

                    let xAxisArray = []
                    let seriesData = []
                    childrens.forEach(v => {
                        xAxisArray.push(v.label)
                        seriesData.push(v.tagNb)
                    })

                    console.log(total)
                    let sumCount = total
                    let option = {
                        grid: {
                            top: '10%',
                            left: '3%',
                            right: '4%',
                            bottom: '5%',
                            containLabel: true
                        },
                        tooltip: {
                            show: true,
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                            formatter: function (params) {
                                let pattern = /(?=((?!\b)\d{3})+$)/g
                                let rs = ("" + params[0].value).replace(pattern, ',')

                                return '标签：' + params[0].name +
                                    '<br/>人数： ' + rs ;
                                   // '<br/>占体系总数比例：' + (null == sumCount ? params[0].value : ((params[0].value / sumCount) * 100).toFixed(2) + '%');
                            },
                            // formatter: '{b}：{c}' + '(人)',
                            textStyle:{
                                color: '#030303',
                                fontSize:18
                            },
                        },
                        xAxis: {
                            data: xAxisArray,
                            axisLine: {
                                lineStyle: {
                                    color: '#0177d4'
                                }
                            },
                            axisLabel: {
                                color: '#fff',
                                fontSize: 18,
                                rotate: rotate,
                                show: true
                            }
                        },
                        yAxis: {
                            name: "(人)",
                            splitNumber:5,
                            nameTextStyle: {
                                color: '#000',
                                fontSize: 12
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#0177d4'
                                }
                            },
                            axisLabel: {
                                color: '#fff',
                                fontSize: 18
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#0177d4'
                                }
                            },
                            //max: sumCount

                        },
                        series: [{
                            name:name,
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: '#00b0ff'
                                    }, {
                                        offset: 0.8,
                                        color: '#7052f4'
                                    }], false)
                                }
                            },
                            data: seriesData
                        }]
                    };

                    let echartsGraph = echarts.init(tagDiv)
                    echartsGraph.setOption(option, true)
                }
            },
            createPieCharts(id, data, total,name) {
                var color = ['#00c6ff', '#0063ff', '#9800ff', '#ed00ff', '#4bb80b', '#00a0ff', '#fff700', '#ff9300', '#ff0070', '#00ffdb', '#ffc100', '#FF3000', '#418ca5', '#baff00', '#1c414d', '#24695e', '#171779', '#60609f', '#f2ea70', '#86ce66', '#f965ca', '#f87152'];
                let tagDiv = document.getElementById(id)
                var pieData = []
                var legend = []
                for (var i = 0; i < data.length; i++) {
                    var tmp = {
                        name: data[i].label,
                        value: data[i].tagNb
                    }
                    legend.push(data[i].label)
                    pieData.push(tmp)
                }
                var option = {
                    color: color,
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} <br/>占比：{d}%',
                        textStyle:{
                            color: '#030303',
                            fontSize:18
                        },
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        y: "5%",
                        right: "13%",
                        itemWidth: 18,
                        itemHeight: 18,
                        itemGap: 18 / 1.5,
                        textStyle:{
                            color: '#030303',
                            fontSize:18
                        },
                        pageTextStyle: {
                            color: '#fff',
                            fontSize: 18
                        },
                        data:legend,
                        pageIconSize:  18,
                        formatter: function (name) {
                            if (name.length / 10 > 1) {
                                var str = ' ';
                                for (var p = 0; p < Math.ceil(name.length / 10) - 1; p++) {
                                    str = str + name.substring(10 * p, 10 * (p + 1)) + '\n '
                                }
                                str = str + name.substring((Math.ceil(name.length / 10) - 1) * 10, name.length)
                                return str
                            } else {
                                return ' ' + name
                            }
                        }
                    },
                    series: [{
                        name: name,
                        type: 'pie',
                        data: pieData,
                        radius: [0, '75%'],
                        center: ['35%', '50%'],
                        label: {
                            show:false,
                            formatter: '{b}  ',
                        }
                    }],
                }
                let echartsGraph = echarts.init(tagDiv)
                window.onresize = echartsGraph.resize;
                echartsGraph.setOption(option, true)
            },
        }
    }
</script>

<style lang="scss" scoped>
    .btn_chart {
        height: 4vh;
        border: 1px #1a08e8 solid;
        background-color: rgba(2, 20, 89, .3);
        margin-left: 35%;
        margin-top: 0.5vh;
        padding-right: 2vh;
        display: flex;
        .ioc {
            margin-left: 2vh;
            margin-top: 0.5vh;
            color: #1982FC;
            cursor: pointer;
        }
        .ioc:hover {
            color: #fff;
        }
        .ioc_act {
            color: #ffba00;
        }
    }
</style>