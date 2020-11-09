<template>
    <div class="header fixed">
        <div class="header-inner" :class="navBarFixed? 'nav-bar-fixed':''">
            <div class="container">
                <h1 class="logo">海南政务大数据公共服务平台</h1>
                <ul class="nav fixed">
                    <li :class="{'active': isActive == index}"  v-for="(item,index) in menuList">
                        <a @click="toggleNav(index,item,index)">{{item.title}}</a>
                        <ul v-if="item.children" class="nav-child" :class="{'child-active':childActive === true}">
                            <li v-for="(t,i) in item.children" @click="toggleNav(index,t)">{{t.title}}</li>
                        </ul>
                    </li>
                </ul>
                <div class="user-bar">
                    <a class="user-login" style="display: none;">登录</a>
                    <el-popover placement="top" width="160" v-model="userPopVisible" trigger="hover">
                        <ul class="user-info">
                            <li style="display: none;">设置</li>
                            <li @click = "logOuts()">退出</li>
                        </ul>
                        <span class="user-name" slot="reference">你好，<a>{{this.$store.state.user.name}}</a></span>
                    </el-popover>
                </div>
                <!--            <div class="search-bar">-->
                <!--                <div class="search-bar-inner">-->
                <!--                    <input type="text" placeholder="搜索关键字">-->
                <!--                    <button class="search-submit" @click="searchSubmit"><i class="el-icon-search"></i></button>-->
                <!--                </div>-->
                <!--            </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import runtimeArgs from '@/runtime-args'
    import {clearLoginInfo} from '../utils/httpTAG'
    export default {
        name:'Header',
        data() {
            return {
                userPopVisible: false,
                navBarFixed:false,
                dynamicMenuRoutes: [],
                childActive:false,
                isActive:0,
                menuList:[
                    {
                        title: '首页',
                        name: 'home',
                        path: '/home',
                        open:true
                    },
                    {
                        title: '应用',
                        name: 'applicationList',
                        path: '/applicationList',
                        open:true
                    },
                    {
                        title: '数据',
                        name: 'dataList',
                        open:true,
                        children:[
                            {
                                title: '共享',
                                name: 'shared',
                                path: 'http://59.212.146.106/',
                                open:true
                            },
                            {
                                title: '归集',
                                name: 'collectionList',
                                path: '/collectionList',
                                open:true
                            }
                        ]
                    },
                    {
                        title: '组件',
                        name: 'packageList',
                        path: '/packageList',
                        open:true
                    },
                    {
                        title: '服务',
                        name: 'serverList',
                        path: 'https://172.21.10.33:9443/storeSso/login.do',
                        open:true
                    },
                    {
                        title: '说明',
                        name: 'manualList',
                        path: '/manualList',
                        open:true
                    },
                    // {
                    //     title: '标签',
                    //     name: 'labelList',
                    //     path: '/labelList',
                    //     open:this.$store.state.user.roleName == runtimeArgs.VUE_APP_USER_LIST?teue:false
                    // },
                ]
            }
        },
        mounted() {
            this.isActive = this.getMenuIndex()
            window.addEventListener("scroll", this.watchScroll);
        },
        destroyed() {
            // 移除滚动条监听
            window.removeEventListener("scroll", this.watchScroll);
        },

        methods:{
            watchScroll() {
                // 滚动的距离
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                scrollTop > 760 ? this.navBarFixed=true : this.navBarFixed=false
            },
            getMenuIndex() {
                let ind =0;
                for (let i = 0; i < this.menuList.length; i++) {
                    if(this.$route.name == this.menuList[i].name) {
                        ind = i
                    }
                    if(this.menuList[i].children) {
                        for (let j = 0; j < this.menuList[i].children.length; j++) {
                            if(this.$route.name == this.menuList[i].children[j].name) {
                                ind = i
                            }
                        }
                    }
                }
                return ind
            },
            toggleNav(n,t) {
                if(t.name == 'serverList'||t.name == 'shared'){
                    window.open(t.path)
                    return
                }
                this.isActive = n
                if (t.children) {
                    return
                } else {
                    this.$router.push(t.path)
                    // if (this.$store.state.user.roleName == runtimeArgs.VUE_APP_USER_LIST && this.menuList[n].open) {
                    //     this.$router.push(t.path)
                    // }else{
                    //     this.$message({
                    //         message: '建设中，暂不对外开放！',
                    //         type: 'info',
                    //         duration: 1000
                    //     })
                    // }
                }
                // if (t.children) {
                //     return
                // } else {
                //     if(t.title=='共享') {
                //         window.location.href='http://www.baidu.com'
                //     } else {
                //         this.$router.push(t.path)
                //     }
                // }
            },
            searchSubmit() {
                console.log('search')
            },
            logOuts() {
                this.$confirm(`确定进行[退出]操作?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$httpTAG({
                        url: this.$httpTAG.adornUrl('/common/user/logout'),
                        method: 'get',
                    }).then(({data}) => {
                        if (data) {
                            clearLoginInfo()
                            location.href = runtimeArgs.VUE_APP_AC_HTTP_LOGOUT
                            // location.reload()
                        }
                    })
                }).catch(() => {
                })
            },
        }
    }
</script>