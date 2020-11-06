// 详情-共享信息
export default {

  resTypes: [
    {value: 1, name: "数据库"},
    {value: 2, name: "数据库表"},
    {value: 3, name: "数据库表字段"},
    {value: 4, name: "应用系统"},
    {value: 5, name: "应用模块"},
    {value: 6, name: "数据接口"},
    {value: 7, name: "数据资源"},
    {value: 8, name: "设备"}
  ],

  controlDatas: [
    {id: "1", name: "读取资源内容"},
    {id: "2", name: "修改资源内容"},
    {id: "3", name: "执行模块功能"},
    {id: "4", name: "创建下级资源"}
  ],

  authStatus: [
    {value: 0, name: "审核通过", type: "success"},
    {value: 1, name: "创建", type: "warning"},
    {value: 2, name: "审核驳回", type: "danger"}
  ],

  eventStatus: [
    {value: 0, name: "未处理", type: "danger"},
    {value: 1, name: "处理中", type: "warning"},
    {value: 2, name: "已解决", type: "success"}
  ],
}

