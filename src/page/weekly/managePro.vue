<template>
  <div class="manage-project">
    <Card title="团队所辖项目管理">
    <Table :columns="proColumns" :data="projects"></Table>
    </Card>
    <div class="bottom-row">
      <Button type="success" class="bottom-button" @click="save('formValidate')">保存周报内容</Button>
      <span class="message-alert"></span>
    </div>
  </div>
</template>
<style>
    .manage-project .ivu-table .demo-table-info-row td{
        background-color: #2db7f5;
        color: #fff;
    }
    .manage-project .ivu-table .demo-table-error-row td{
        background-color: #ff6600;
        color: #fff;
    }
    .manage-project .ivu-table td.demo-table-info-column{
        background-color: #2db7f5;
        color: #fff;
    }
    .manage-project .ivu-table .demo-table-info-cell-name {
        background-color: #2db7f5;
        color: #fff;
    }
    .manage-project .ivu-table .demo-table-info-cell-age {
        background-color: #ff6600;
        color: #fff;
    }
    .manage-project .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }
    .manage-project .bottom-row {
        position: absolute;
        bottom: 0px;
        left: 256px;
        background: #e8eaec;
        width: 100%;
    }
    .manage-project .bottom-row .bottom-button {
      position: relative;
      bottom: 10px;
      left: 18px;
      margin-top: 20px;
    }
    .manage-project .bottom-row .message-alert {
      position: relative;
      left: 55px;
      /* margin-left: 55px； */
    }
</style>
<script>
import { findProjects } from '@/api/weekly'
export default {
  data () {
    return {
      proColumns: [
        {
          title: '项目类型',
          key: 'type'
        },
        {
          title: '归属分支',
          key: 'branch'
        },
        {
          title: '项目名称',
          key: 'name'
        },
        {
          title: '前端负责人',
          key: 'staffNoteId',
          className: 'demo-table-info-column'
        }
      ],
      projects: []
    }
  },
  mounted () {
    this.findProjects()
  },
  methods: {
    findProjects () {
      findProjects().then(res => {
        if (res.data.retCode === '000000') {
          this.projects = res.data.data
        } else {
          this.$Message.error('Error！ 系统错误，请联系管理员')
        }
      })
    }
  }
}
</script>
