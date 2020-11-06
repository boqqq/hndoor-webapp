<template>
    <div class = "iten-info">

    </div>
</template>

<script>
    import Vue from 'vue'
    import $ from 'jquery';
    export default {
        name: "component-info",
        components: {
        },
        data() {
            return {
                index:0
            }
        },
        props: {
            info: {
                type: String,
                default: ''
            },
            ids: {
                type: String,
                default: ''
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            // 页面初始化
            init() {
                var id = '#'+this.ids+' .iten-info'
                var judy = Vue.extend({
                    template: '<div>' + this.info + '</div>'

                });
                var component = new judy().$mount()
                // $(id).empty();
                $(id).append(component.$el)
            },
        }
    }
</script>

<style lang="scss" scoped>
   .iten-info{
      /*line-height: 3.5vh;*/
    }
</style>