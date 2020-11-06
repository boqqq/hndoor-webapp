<template>
    <div class="container">
        <div class="breadcrumb-wrap" style="margin: 6px 20px;">
            <el-breadcrumb separator-class="el-icon-minus">
                <el-breadcrumb-item v-for="(item, index) in routes" :key="index" v-show="item.name" :to="{name: item.name}">{{item.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
    export default {
        name:'breadcrumb',
        data() {
            return {
            }
        },
        watch:{
            $route:{
                handler(newRouter){
                    this.routes=newRouter.matched;
                },
                immediate: true
            }
        },
    }
</script>