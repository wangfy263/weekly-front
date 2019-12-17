<template>
  <div>
    <Card title="所有分组">
      <p slot="title">
          <Icon type="ios-film-outline"></Icon>
          Teams 所有团队
      </p>
      <a href="#" slot="extra" @click.prevent="oprFlag = !oprFlag">
          <Icon type="ios-loop-strong"></Icon>
          {{oprFlag ? '收起' : '展开'}}
      </a>
      <Row :gutter="20">
        <Col span="6" v-for="(item, index) in infoCardData" :key="index">
          <Card :bordered="false" v-if="index < 4">
              <p slot="title"><Icon :type="item.icon"></Icon>{{item.title}}</p>
              <a href="#" slot="extra" @click="currFlag = currFlag === item.group_id ? 0 : item.group_id ">
                  <Icon type="ios-loop-strong"></Icon>
                  {{ currFlag === item.group_id ? 'Hide' : 'Show'}}
              </a>
              <p>人数：{{item.sum}}</p>
              <p>未提交周报：{{item.no}}</p>
              <p>周报周期：{{weekRange}}</p>
          </Card>
        </Col>
      </Row>
      <Row :gutter="20" style="margin-top:20px" v-show="oprFlag">
        <Col span="6" v-for="(item, index) in infoCardData" :key="index">
          <Card :bordered="false" v-if="index > 3">
              <p slot="title"><Icon :type="item.icon"></Icon>{{item.title}}</p>
              <a href="#" slot="extra" @click="currFlag = currFlag === item.group_id ? 0 : item.group_id ">
                  <Icon type="ios-loop-strong"></Icon>
                  {{ currFlag === item.group_id ? 'Hide' : 'Show'}}
              </a>
              <p>人数：{{item.sum}}</p>
              <p>未提交周报：{{item.no}}</p>
              <p>周报周期：{{weekRange}}</p>
          </Card>
        </Col>
      </Row>
    </Card>
    <Row style="margin-top:20px">
      <Table :columns="proColumns" :data="currList"></Table>
    </Row>
  </div>
</template>

<script>
// import InforCard from '_c/info-card'
// import CountTo from '_c/count-to'
// import { ChartPie, ChartBar } from '_c/charts'
import { findStaff, noticeSomeone } from '@/api/manage'
import { mapGetters } from 'vuex'
import { getWeekRange } from '@/libs/myUtils'
const icons = ['md-stats', 'md-star', 'md-snow', 'md-send']
export default {
  name: 'home',
  // components: {
  //   InforCard,
  //   CountTo,
  //   ChartPie,
  //   ChartBar
  // },
  data () {
    return {
      oprFlag: false,
      allStaffs: [],
      currList: [],
      currFlag: 0,
      infoCardData: [],
      weekRange: getWeekRange(),
      proColumns: [
        {
          title: '姓名',
          key: 'staff_name'
        },
        {
          title: 'noteID',
          key: 'staff_notes_id'
        },
        {
          title: '归属分支',
          key: 'branch_name'
        },
        {
          title: '归属组别',
          key: 'group_name'
        },
        {
          title: '是否提交周报',
          key: 'isSubmit',
          render: (h, params) => {
            return h('Tag', {
              props: {
                color: params.row.isSubmit === 0 ? 'green' : 'red'
              }
            }, params.row.isSubmit === 0 ? '已提交' : '未提交')
          }
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
                  type: params.row.isSubmit === 0 ? 'dashed' : 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    if (params.row.isSubmit !== 0) {
                      this.notice(params.row)
                    }
                  }
                }
              }, '提醒')
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'enumerates', 'userInfo'
    ])
  },
  mounted () {
    this.findStaffs()
  },
  methods: {
    findStaffs () {
      findStaff().then(res => {
        if (res && res.data && res.data.retCode === '000000') {
          this.allStaffs = res.data.data
          this.currList = this.allStaffs.filter(item => {
            if (item.group_id !== 7) {
              return item
            }
          })
          let groups = this.enumerates.groupEnum
          let mapInfo = {}
          groups.forEach((element, index) => {
            if (element.group_type === 0) { // 管理组不显示在首页
              mapInfo[element.group_id] = {
                title: element.group_name,
                sum: 0,
                no: 0,
                group_id: element.group_id,
                icon: icons[index]
              }
            }
          })
          this.currList.forEach(item => {
            if (mapInfo[item.group_id]) { // 管理组成员不填写周报，无需提醒，因此无需显示；
              mapInfo[item.group_id].sum = mapInfo[item.group_id].sum + 1
              if (item.isSubmit) {
                mapInfo[item.group_id].no = mapInfo[item.group_id].no + 1
              }
              if (item.staff_id === this.userInfo.staff_id) {
                this.$store.commit('setIsSubmit', item.isSubmit)
              }
            }
          })
          for (let key in mapInfo) {
            this.infoCardData.push(mapInfo[key])
          }
        }
      })
    },
    notice (staff) {
      noticeSomeone({ email: staff.staff_email }).then(res => {
        if (res.data.retCode === '000000') {
          this.$Message.success('Success! 成功提醒' + staff.staff_name + '!')
        }
      })
    }
  },
  watch: {
    currFlag: function (newVal, oldVal) {
      console.log('newVal:' + newVal)
      if (newVal !== oldVal) {
        this.currList = this.allStaffs.filter((item) => {
          if (newVal === 0 || newVal === item.group_id) {
            return item
          }
        })
      }
    }
  }
}
</script>
