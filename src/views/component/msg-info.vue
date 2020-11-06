<template>
    <div class = "iten-infos">

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
        mounted(){
        },
        methods: {
            // 页面初始化
            init(info ,ids) {
                var id =ids+ ' .iten-infos'
                var judy = Vue.extend({
                    template: '<div>' + info + '</div>'

                });
                var component = new judy().$mount()
                $(id).empty();
                $(id).append(component.$el)
            },
        }
    }
</script>

<style lang="scss" scoped>
   .iten-infos{
      /*line-height: 1.5;*/
    }
</style>