<template>
  <div class="weekly-detail">
    <Card title="周报详情">
    <Table border :columns="proColumns" :data="pros" class="first-table"></Table>
    <Table border :columns="sumColumns" :data="sums"></Table>
    <Table border :columns="outputColumns" :data="ops"></Table>
    <Table border :columns="interestColumns" :data="ints"></Table>
    <Table border :columns="assistColumns" :data="assists"></Table>
    </Card>
  </div>
</template>
<script>
import { findWeeklyDetail } from '@/api/weekly'
export default {
  data () {
    return {
      pros: [],
      sums: [],
      ops: [],
      ints: [],
      assists: [],
      proColumns: [
        {
          title: '1、参与项目情况',
          align: 'left',
          children: [
            {
              title: '项目类型',
              width: 100,
              key: 'project_type_name'
            },
            {
              title: '归属分支',
              width: 100,
              key: 'branch_name'
            },
            {
              title: '项目名称',
              width: 200,
              key: 'project_name'
            },
            {
              title: '目前阶段',
              width: 100,
              key: 'project_state_name'
            },
            {
              title: '下一步工作计划',
              key: 'next_work'
            },
            {
              title: '填写负责人',
              width: 100,
              key: 'staff_name'
            }
          ]
        }
      ],
      sumColumns: [
        {
          title: '2、个人总结部分',
          align: 'left',
          children: [
            {
              title: '姓名',
              width: 100,
              key: 'staff_name'
            },
            {
              title: '项目名称',
              width: 200,
              key: 'project_name'
            },
            {
              title: '类别',
              width: 100,
              key: 'work_type'
            },
            {
              title: '本周反馈',
              key: 'weekly_work'
            },
            {
              title: '下周计划',
              key: 'next_weekly_work'
            }
          ]
        }
      ],
      outputColumns: [
        {
          title: '3、个人输出物部分',
          align: 'left',
          children: [
            {
              title: '姓名',
              width: 100,
              key: 'staff_name'
            },
            {
              title: '标题',
              key: 'article_name'
            },
            {
              title: '链接地址',
              key: 'article_url'
            }
          ]
        }
      ],
      interestColumns: [
        {
          title: '4、兴趣组部分',
          align: 'left',
          children: [
            {
              title: '姓名',
              width: 100,
              key: 'staff_name'
            },
            {
              title: '兴趣组模块',
              key: 'interest_module'
            },
            {
              title: '技术栈',
              key: 'interest_technic'
            },
            {
              title: '预计投入(人天)',
              width: 100,
              key: 'interest_cost'
            },
            {
              title: '月份',
              width: 100,
              key: 'interest_mouth'
            }
          ]
        }
      ],
      assistColumns: [
        {
          title: '5、前端能开协助部分',
          align: 'left',
          children: [
            {
              title: '列表',
              width: 100,
              key: 'list_name'
            },
            {
              title: '姓名',
              width: 100,
              key: 'staff_name'
            },
            {
              title: '协助分支',
              width: 100,
              key: 'branch_name'
            },
            {
              title: '解决问题',
              key: 'assist_resolve'
            },
            {
              title: '帖子svn地址',
              key: 'assist_url'
            }
          ]
        }
      ],
      week: ''
    }
  },
  created () {
    this.week = this.$route.params.week
  },
  mounted () {
    this.findfindWeeklyDetail()
  },
  methods: {
    findfindWeeklyDetail () {
      findWeeklyDetail({ week: this.week }).then(res => {
        if (res.data.retCode === '000000') {
          this.pros = res.data.data[0]
          this.sums = res.data.data[1]
          this.ops = res.data.data[2]
          this.ints = res.data.data[3]
          this.assists = res.data.data[4]
        }
      })
    }
  }
}
</script>
<style scope>
.weekly-detail table thead tr:first-child {
  font-size: 16px;
}
.weekly-detail table thead tr:first-child th {
  background: white;
}
.weekly-detail table thead tr:nth-child(2) th{
  background: #2db7f5;
  color: white;
}
.weekly-detail .first-table thead tr:nth-child(2) th:last-child {
  background: red;
  color: white;
}
</style>
