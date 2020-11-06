<template>
    <div>
        <div class = "pdf_main">
            <pdf :src="url"
            v-for="i in currentPage"
            :key="i"
            :page="i"></pdf>
        </div>
        <!--<a :href = "url" style="font-size: 5vh;color: #fff">24234234423</a>-->
    </div>
</template>

<script>
    import pdf from "vue-pdf";
    import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
    import runtimeArgs from '@/runtime-args'
    export default {
        name: "item-pdf",
        components: {
            pdf
        },
        data() {
            return {
                currentPage: 1000, // pdf文件页码
                pageCount: 1, // pdf文件总页数
                fileType: 'pdf', // 文件类型
                url:""
            };
        },
        methods: {
            // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
            changePdfPage (val) {
                window.open(runtimeArgs.VUE_APP_TAG_SERVER_URL+"/upload/application/4fb5a0691f00477aab344154660c6fbc.pdf")
                if (val === 0 && this.currentPage > 1) {
                    this.currentPage--
                }
                if (val === 1 && this.currentPage) {
                    this.currentPage++
                }
                //this.pdfTask("/pdf/eeqqq.pdf")
            },
            pdfTask(pdfUrl){
                var self = this
                // 传参 CMapReaderFactory
                this.url = pdf.createLoadingTask({url: pdfUrl, CMapReaderFactory})
                console.log('pdf',this.url)
                this.url.promise.then(pdf => {
                    self.currentPage = pdf.numPages
                }).catch((err) => {
                    this.$message({
                        message: '加载失败！',
                        type: 'error',
                        duration: 1000
                    })
                })
            },
        },
        mounted() {
            // alert(this.$route.query.fileUrl)
            //"/pdf/eeqqq.pdf"
            // alert(runtimeArgs.VUE_APP_TAG_SERVER_URL+'/'+this.$route.query.fileUrl)
            this.pdfTask(runtimeArgs.VUE_APP_TAG_SERVER_URL+'/'+this.$route.query.fileUrl)
        }
    }
</script>

<style lang="scss" scoped>
   /*.pdf_main{*/
        /*height: 98vh;*/
        /*padding: 0 2%;*/
    /*}*/
</style>