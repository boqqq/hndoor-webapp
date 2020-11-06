<template>
    <div class="mod-MacroInner">
        <div v-if="tags.isTag == 'CTY'" style="margin-top: 20px;padding-bottom: 30px">
            <el-divider content-position="left">{{title}}</el-divider>
            <div :id="tags.value" class = "record_chart"></div>
        </div>
        <div v-else style=" margin-top: 40px;" id = "tagName">
            <lable-records-item v-for="item in tags.childrens" :tags="item" :name = "name!=''?(name+' >>> '+tags.label):tags.label"></lable-records-item>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import LableRecordsItem from './lable-records-item'
    export default {
        name: "lable-records-item",
        components: {
            LableRecordsItem
        },
        props: {
            tags: {
                type: Object,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        data () {
            return {
                title:''
            }
        },
        computed: {
            // sumCount: {
            //     get () { return this.$store.state.tag.sumCount }
            // }
        },
        mounted(){
            this.title = this.name + ' >>> ' +this.tags.label
            this.createEcharts()
        },
        methods: {
            rsGs(value){
                let pattern = /(?=((?!\b)\d{3})+$)/g
                let v = ("" + value).replace(pattern, ', ')
                return v;
            },
            createEcharts(){
                let tagDiv = document.getElementById(this.tags.value)
                var color = ['#00c6ff', '#0063ff', '#ed00ff', '#4bb80b', '#00a0ff', '#fff700', '#ff9300', '#ff0070', '#00ffdb', '#ffc100', '#FF3000','#418ca5','#baff00','#1c414d','#24695e','#171779','#60609f','#f2ea70','#86ce66','#f965ca','#f87152'];
                if(tagDiv){
                    let rotate = 0
                    let childrens = this.tags.childrens

                    let legends = []
                    //各个标签对应的数据
                    let seriesData = []
                    childrens.forEach(v => {
                        legends.push(v.label)
                        let labelDatas = []
                        v.records.forEach(r => {
                            labelDatas.push(r.tagNb)
                        })
                        seriesData.push(
                            {
                                name: v.label,
                                symbol: 'circle',
                                symbolSize: 2,
                                type:'line',
                                smooth: true,
                                lineStyle: {
                                    normal: {
                                    }
                                },
                                data: labelDatas
                            },
                        )
                    })

                    let zrksj = []
                    //x轴对应的数据
                    let xAxisArray = []
                    if(childrens.length > 0){
                        if(childrens[0].records.length > 0){
                            childrens[0].records.forEach(v => {
                                xAxisArray.push(v.createdTs)
                                zrksj.push(v.sum)
                            })
                        }
                    }

                    legends.push("总人数")
                    seriesData.push(
                        {
                            name: "总人数",
                            symbol: 'circle',
                            symbolSize: 2,
                            type:'line',
                            smooth: true,
                            itemStyle: {
                                normal: {
                                    color: '#9800ff',
                                }
                            },
                            lineStyle: {
                                normal: {
                                }
                            },
                            data: zrksj
                        },
                    )

                    //如果x轴数据过多，倾斜显示
                    if(xAxisArray.length > 10){
                        rotate = 40
                    }
                    var gridTop = '19%'
                    // alert(Math.ceil(legends.toString().length))
                    if(legends.toString().length>50){
                        gridTop =  Math.ceil(legends.toString().length/49)*14+'%'
                    }

                    let option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                            },
                            // formatter: '{b}：{c}' + '(人)',
                            textStyle:{
                                color: '#fff',
                                fontSize:14
                            },
                        },
                        color:color,
                        legend: {
                            data: legends,
                            top:'3%',
                            left:'5%',
                            right:'5%',
                            itemWidth: 26,
                            itemHeight: 13,
                            // itemGap: 15,
                            textStyle:{
                                color: '#030303',
                                fontSize:16
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '8%',
                            bottom: '3%',
                            top:gridTop,
                            containLabel: true
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: xAxisArray,
                            axisLine: {
                                lineStyle: {
                                    color: '#303133'
                                }
                            },
                            axisLabel: {
                                color: '#636462',
                                // fontSize: 14,
                                rotate: rotate,
                                show: true
                            }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#303133'
                                }
                            },
                            axisLabel: {
                                color: '#636462',
                                // fontSize: 14
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#303133'
                                }
                            },
                        },
                        series: seriesData
                    };

                    let echartsGraph = echarts.init(tagDiv)
                    echartsGraph.setOption(option, true)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .record_chart{
        height: 300px;
        width: 100%;
    }
/deep/#tagName{
    .el-divider__text.is-left{
        height: 26px;
        line-height: 26px;
        min-width: 80px;
        text-align: center;
        background-color: #4f7fee;
        padding: 0 20px;
        font-size: 16px;
        color: #94fdf3;
        border-radius: 13px;
    }
    .el-divider{
        background-color: #4f7fee;
    }
    .el-divider--horizontal{
        height: 2px;
    }
}
</style>