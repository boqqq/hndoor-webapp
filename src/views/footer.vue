<template>
    <div class="footer fixed">
        <div class="container">
            <div class="foot-inner">
                <h1 class="foot-logo"></h1>
<!--                <ul class="foot-nav fixed">-->
<!--                    <li v-for="(item,index) in footNavList">-->
<!--                        <a @click="toggleNav(item.name,item,index)">{{item.title}}</a>-->
<!--                    </li>-->
<!--                </ul>-->
                <p class="copyright">Copyright 2020 - All right Recived</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'Footer',
        data() {
            return {
                footNavList:[
                    { title:'关于' },
                    { title:'用户' },
                    { title:'帮助' },
                    { title:'联系' },
                ],
            }
        }
    }
</script>
