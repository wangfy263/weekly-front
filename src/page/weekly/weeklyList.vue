<template>
  <div>
    <Card title="周报记录查询">
    <Table :columns="proColumns" :data="weeklys"></Table>
    </Card>
  </div>
</template>
<script>
import { findWeekly } from '@/api/weekly'
export default {
  data () {
    return {
      loading: true,
      weeklys: [],
      proColumns: [
        {
          title: '姓名',
          key: 'staff_name'
        },
        {
          title: '项目名称',
          key: 'project_name'
        },
        {
          title: '类别',
          key: 'work_type'
        },
        {
          title: '周期',
          key: 'week_range'
        },
        {
          title: '本周工作',
          key: 'weekly_work'
        },
        {
          title: '下周计划',
          key: 'next_weekly_work'
        },
        {
          title: '操作',
          key: 'action',
          width: 100,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.toDetail(params.row)
                  }
                }
              }, '详情')
            ])
          }
        }
      ]
    }
  },
  mounted () {
    this.findWeeklyByStaff()
  },
  methods: {
    findWeeklyByStaff () {
      findWeekly({}).then(res => {
        if (res.data.retCode === '000000') {
          this.weeklys = res.data.data
        }
      })
    },
    toDetail (row) {
      this.$router.push({ path: `/weeklyDetail/${row.week_range}` })
    }
  }
}
</script>
