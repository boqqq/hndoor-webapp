<template>
    <div style="user-select: none;">
        <Header></Header>
        <router-view/>
        <Footer></Footer>
    </div>
</template>
<script>
    import RouterConstants from '@/constants/router.js'
    import Header from './header'
    import Footer from './footer'

    export default {
        data() {
            return {
                loading: false
            }
        },
        components: {
            Header,
            Footer
        },
        computed: {
            userId: {
                get() {
                    return this.$store.state.user.id
                },
                set(val) {
                    this.$store.commit('user/updateId', val)
                }
            },
            userName: {
                get() {
                    return this.$store.state.user.name
                },
                set(val) {
                    this.$store.commit('user/updateName', val)
                }
            },
            roleName: {
                get() {
                    return this.$store.state.user.roleName
                },
                set(val) {
                    this.$store.commit('user/updateRoleName', val)
                }
            },
        },
        created() {
            this.getUserInfo()
        },
        methods: {
            // 获取当前管理员信息
            getUserInfo() {
                this.$httpTAG({
                    url: this.$httpTAG.adornUrl(RouterConstants.userUrl),
                    method: 'get',
                    // params: this.$httpTAG.adornParams()
                }).then(({data}) => {
                    this.userId = data.id
                    this.userName = null != data.name ? data.name : data.username
                    this.roleName = data.roleNames
                    sessionStorage.setItem(RouterConstants.permissions, JSON.stringify(data.permissionCodes || '[]'))
                }).finally(res => {
                    this.loading = false
                })
            }
        }
    }
</script>
