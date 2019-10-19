<template>
  <div style="font-size: 14px">
    <p class="mgb-10">文件名称：
      <Input v-model="fileName" placeholder="可选，自定义导出文件名称" style="width: 350px" />
    </p>
    <p class="mgb-10">周报周期：
      <Select v-model="weekRange" style="width:350px">
        <Option v-for="(item,index) in rangeList" :value="item" :key="index">{{ item }}</Option>
      </Select>
    </p>
    <p class="mgb-10">选择群组：
      <Select v-model="groupId" style="width:350px">
        <Option v-for="(item,index) in groupList" :value="item.group_id" :key="index">{{ item.group_name }}</Option>
      </Select>
    </p>
    <p class="mgb-10">导出文件全名：{{fileName}}@{{groupName}}@{{weekRange}}.xlsx</p>
    <Button type="success" @click="exportExcel()">导出</Button>
    <Button type="info" @click="preview()" style="margin-left: 20px">预览</Button>
  </div>
</template>
<style scoped>
.mgb-10{
  margin-bottom: 10px;
}
</style>

<script>
import { exportExcel, queryGroups } from '@/api/weekly'
import { getWeekRange } from '@/libs/myUtils'
export default {
  data () {
    return {
      fileName: '前端@技术栈 研发&工程人员周状态@2019周报',
      weekRange: getWeekRange(),
      rangeList: [getWeekRange(), getWeekRange(1), getWeekRange(2)],
      groupId: 0,
      groupList: [{ group_id: 0, group_name: '全部' }]
    }
  },
  computed: {
    groupName () {
      let res = this.groupList.find(element => element.group_id === this.groupId)
      return res.group_name
    }
  },
  mounted () {
    this.getGroupList()
  },
  methods: {
    exportExcel () {
      this.$Spin.show()
      let param = { fileName: this.fileName + '@' + this.groupName + '@' + this.weekRange, week_range: this.weekRange }
      if (this.groupId) {
        param.groupId = this.groupId
      }
      exportExcel(param).then(res => {
        if (res.data.retCode === '000000') {
          this.$Spin.hide()
          this.$Message.success('导出成功!')
          window.open(`/${res.data.data.excelName}`, 'download')
        }
      }).catch(e => {
        this.$Spin.hide()
      })
    },
    getGroupList () {
      queryGroups({}).then(res => {
        if (res.data.retCode === '000000') {
          this.groupList = this.groupList.concat(res.data.data)
        }
      })
    },
    preview () {
      this.$router.push({ path: `/weeklyDetail/${this.groupId}/${this.weekRange}` })
    }
  }
}
</script>
